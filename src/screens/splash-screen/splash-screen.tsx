import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import * as Splash from 'react-native-splash-screen';
import styled from 'styled-components/native';
import {NavigatorParamList} from '../../navigation/app-navigator';
import LottieView from 'lottie-react-native';
import {LOADER} from '../../assets/lottie';

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#252850',
  justifyContent: 'center',
  alignItems: 'center',
});

const Loader = styled(LottieView)({
  height: 100,
  width: 100,
});

export const SplashScreen = () => {
  const animator = React.createRef<LottieView>();
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorParamList>>();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!isLoading) {
      navigation.reset({routes: [{name: 'home'}]});
    }
  }, [isLoading, navigation]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2500);
  });

  useEffect(() => {
    Splash.default.hide();
  });

  return (
    <Wrapper>
      <Loader
        loop
        autoPlay
        ref={animator}
        source={LOADER}
        enableMergePathsAndroidForKitKatAndAbove
      />
    </Wrapper>
  );
};
