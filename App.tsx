import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NoteSuspRootNavigator} from './src/noteSuspNav/NoteSuspRootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <NoteSuspRootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
