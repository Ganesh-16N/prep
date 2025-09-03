/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

// Gemini API Configuration
// ✅ API Key is configured in geminiService.ts
// To enable AI explanations, set your Gemini API key here:
// import geminiService from './src/services/geminiService';
// geminiService.setApiKey('your_gemini_api_key_here');
// 
// Or set the GEMINI_API_KEY environment variable in your .env file

const App = () => {
  return (
    <Provider store={store}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        {/* <SafeAreaProvider> */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="#0A0A0A"
          />
          <AppNavigator />
        {/* </SafeAreaProvider> */}
      {/* </GestureHandlerRootView> */}
    </Provider>
  );
};

export default App;
