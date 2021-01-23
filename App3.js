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
  Image,
  ScrollView,
} from 'react-native';

const App3 = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text>App3</Text>
          {new Array(10).fill(0).map(() => (
            <Image
              source={require('./logo.png')}
              style={{height: 375, width: 375}}
            />
          ))}
          {new Array(10).fill(0).map(() => (
            <Image
              source={require('./video.jpg')}
              style={{height: (375 * 800) / 480, width: 375}}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('App3', () => App3);
