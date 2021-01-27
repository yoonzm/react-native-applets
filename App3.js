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
  Image,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';

const deviceWidth = 50;

const App3 = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>App3</Text>
        <Text>这是动态更新的内容</Text>
        <Image
          source={require('./logo.png')}
          style={{height: deviceWidth, width: deviceWidth}}
        />
        <Button
          title="DeviceEventEmitter.emit"
          onPress={() => {
            DeviceEventEmitter.emit('DeviceEvent', {
              msg: '哈哈哈',
            });
            NativeAppEventEmitter.emit('NativeAppEvent', {
              msg: '哈哈哈',
            });
          }}
        />
        <Button
          title="setStorage"
          onPress={() => {
            AsyncStorage.setItem('storage_key', '哈哈哈123');
          }}
        />
        <Button
          title="getStorage"
          onPress={() => {
            AsyncStorage.getItem('storage_key').then((res) => {
              Alert.alert('温馨提示', res);
            });
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('App3', () => App3);
