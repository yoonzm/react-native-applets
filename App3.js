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
  ScrollView,
  Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const App3 = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text>App3</Text>
          {new Array(1).fill(0).map(() => (
            <Image
              source={require('./logo.png')}
              style={{height: deviceWidth, width: deviceWidth}}
            />
          ))}
          {new Array(1).fill(0).map(() => (
            <Image
              source={require('./video.jpg')}
              style={{height: (deviceWidth * 800) / 480, width: deviceWidth}}
            />
          ))}
          {new Array(1).fill(0).map(() => (
            <Image
              source={require('./inpat.png')}
              style={{height: deviceWidth, width: deviceWidth}}
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
