import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {StarProvider} from './src/contexts/StarContext';

import {AppNavigator} from './src/navigation/app-navigator';

export default function App() {
  return (
    <StarProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </StarProvider>
  );
}
