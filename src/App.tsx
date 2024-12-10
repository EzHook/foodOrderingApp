import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigator from './navigation';
import {Provider} from 'react-redux';
import store from './store/store';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Provider store={store}>
        <Navigator />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
