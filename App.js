import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

// Navigation
import Main from './Navigators/Main';

// screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true); // not advisable to do - in production

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}


export default App;