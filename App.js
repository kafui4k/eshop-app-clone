import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, LogBox } from 'react-native';

// screens
import Header from "./Shared/Header";
import ProductContainer from "./screens/Product/ProductContainer";

LogBox.ignoreAllLogs(true); // not advisable to do - in production

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
  },
});

export default App;