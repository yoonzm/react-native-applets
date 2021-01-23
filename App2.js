/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {title} from './App';

const App2 = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text>App2222</Text>
          <Text>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * 此处注册多个组件主要是为了开发时方便
 * 真正打包时以下组件不需要打包至主bundle中，会在真正使用时下载后使用
 */
AppRegistry.registerComponent('App2', () => App2);
