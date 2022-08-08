import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactNode} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Images} from '../../assets/images';
import {NavigatorParamList} from '../../navigation/app-navigator';
import {LayoutView} from '../layout-view';

type BaseScreenProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  isBackButton?: boolean;
};

const SmallTitle = styled(Text)({
  color: '#696969',
  fontWeight: 'bold',
  fontSize: 20,
});

const LargeTitle = styled(Text)({
  fontWeight: 'bold',
  fontSize: 30,
  color: 'whitesmoke',
});

const BackButton = styled(TouchableOpacity)({
  borderRadius: 26,
  backgroundColor: '#FFFFFF',
  padding: 8,
  marginRight: 16,
});

export const BaseScreen = ({
  isBackButton,
  children,
  title,
  subtitle,
}: BaseScreenProps) => {
  const backgroundStyle = {
    backgroundColor: '#252850',
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorParamList>>();

  return (
    <LayoutView flex={1} backgroundColor="#FFFFFF">
      <SafeAreaView style={backgroundStyle}>
        <LayoutView
          marginHorizontal={16}
          marginBottom={8}
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row">
          <LayoutView flexDirection="row" alignItems="center">
            {isBackButton && (
              <BackButton onPress={() => navigation.goBack()}>
                <Images.ArrowLeft size={24} fill="#000000" />
              </BackButton>
            )}
            <LayoutView>
              <SmallTitle>{subtitle}</SmallTitle>
              <LargeTitle>{title}</LargeTitle>
            </LayoutView>
          </LayoutView>
          <Images.Star size={52} fill="#ffd700" />
        </LayoutView>
      </SafeAreaView>
      <LayoutView flex={1} marginTop={16} marginHorizontal={16}>
        {children}
      </LayoutView>
    </LayoutView>
  );
};
