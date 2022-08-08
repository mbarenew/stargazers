import {
  NavigationContainer,
  DefaultTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';

import {HomeScreen} from '../screens/home/home-screen';
import {SplashScreen} from '../screens/splash-screen/splash-screen';
import {StargazersScreen} from '../screens/stargazers/stargazers';

export const navigationRef = createNavigationContainerRef();

export type NavigatorParamList = {
  home: undefined;
  splashScreen: undefined;
  stargazers: undefined;
};

const Stack = createStackNavigator<NavigatorParamList>();

const mainStackScreenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const AppStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="splashScreen"
    screenOptions={mainStackScreenOptions}>
    <Stack.Screen component={HomeScreen} name="home" />
    <Stack.Screen component={SplashScreen} name="splashScreen" />
    <Stack.Screen component={StargazersScreen} name="stargazers" />
  </Stack.Navigator>
);

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
