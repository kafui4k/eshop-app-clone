import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from "react-native-toast-message";

// redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

// contextAPI
import Auth from './Context/store/Auth';

// Navigation
import Main from './Navigators/Main';

// screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true); // not advisable to do - in production

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
    
  );
}


export default App;