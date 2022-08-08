import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {BaseScreen} from '../../components/base-screen/base-screen';
import {LayoutView} from '../../components/layout-view';
import {FormStarInput, StarInput} from '../../models/star';
import * as E from 'fp-ts/Either';
import {pipe} from 'fp-ts/function';
import {draw} from 'io-ts/lib/Decoder';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../navigation/app-navigator';
import {useContextStar} from '../../contexts/StarContext';

const CustomTextInput = styled(TextInput)<{hasError: boolean}>(props => ({
  borderWidth: 1,
  borderRadius: 24,
  padding: 16,
  borderColor: props.hasError ? 'red' : '#D7DCD5',
  marginBottom: 16,
}));

const CustomButton = styled(TouchableOpacity)({
  borderRadius: 24,
  backgroundColor: '#252850',
  padding: 16,
  alignItems: 'center',
});

const TextCustom = styled(Text)({
  color: '#FFFFFF',
});

const CustomKeyboardAvoidingView = styled(KeyboardAvoidingView)({
  flex: 1,
});

const initialForm: FormStarInput = {
  owner: '',
  repo: '',
};

export const HomeScreen: React.FC<{}> = () => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState<string[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
  const {saveOwner, saveRepo} = useContextStar();

  const setOwner = useCallback(
    (owner: string) => {
      setFormError(state => state.filter(e => e !== 'owner'));
      setForm({...form, owner});
    },
    [form],
  );

  const setRepo = useCallback(
    (repo: string) => {
      setFormError(state => state.filter(e => e !== 'repo'));
      setForm({...form, repo});
    },
    [form],
  );

  const onSearchPress = useCallback(() => {
    const startInput = StarInput.decode(form);
    pipe(
      startInput,
      E.fold(
        // error handler
        left => {
          const requiredFields = ['owner', 'repo'];
          const missingFields = requiredFields.filter(field =>
            draw(left).includes(field),
          );
          Toast.show({
            text1: `Require the following fields: ${missingFields.join(', ')}`,
            type: 'error',
          });
          setFormError(missingFields);
        },
        // success handler
        _right => {
          saveOwner(form.owner);
          saveRepo(form.repo);
          navigation.navigate('stargazers');
        },
      ),
    );
  }, [form, navigation, saveOwner, saveRepo]);

  return (
    <BaseScreen title="Search Stargazers" subtitle="Type owner and repo">
      <CustomKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LayoutView flex={1} justifyContent="center">
          <CustomTextInput
            hasError={formError.includes('owner')}
            placeholderTextColor={
              formError.includes('owner') ? 'red' : undefined
            }
            placeholder="Type owner"
            onChangeText={setOwner}
          />
          <CustomTextInput
            hasError={formError.includes('repo')}
            placeholderTextColor={
              formError.includes('repo') ? 'red' : undefined
            }
            placeholder="Type repo"
            onChangeText={setRepo}
          />
          <CustomButton onPress={onSearchPress}>
            <TextCustom>Search Stargazers</TextCustom>
          </CustomButton>
        </LayoutView>
      </CustomKeyboardAvoidingView>
    </BaseScreen>
  );
};
