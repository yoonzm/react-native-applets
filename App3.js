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
          <Text>这是动态更新的内容</Text>
          {new Array(1).fill(0).map(() => (
            <Image
              source={require('./logo.png')}
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
