/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  NativeModules,
  ScrollView,
  Alert,
  Platform,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  AsyncStorage,
} from 'react-native';
import {
  CachesDirectoryPath,
  downloadFile,
  readdir,
  exists,
} from 'react-native-fs';
import * as ReactNativeZip from 'react-native-zip-archive';

const {AppletManager: iosAppletModule} = NativeModules;
const {AppletModule: androidAppletModule} = NativeModules;

const AppletModule =
  Platform.OS === 'ios' ? iosAppletModule : androidAppletModule;
const jsBundleName =
  Platform.OS === 'ios' ? 'index.ios.bundle' : 'index.android.bundle';

export const title = '哈哈哈';

const App = () => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    DeviceEventEmitter.addListener('DeviceEvent', (e) => {
      console.log('DeviceEventEmitter.addListener', e);
    });
    NativeAppEventEmitter.addListener('NativeAppEvent', (e) => {
      console.log('NativeAppEvent.addListener', e);
    });
  }, []);

  function pushLog(log) {
    setLogs((items) => [...items, log]);
  }

  async function startApplet(componentName) {
    try {
      let bundleZipName = `${componentName}.zip`;
      const fromUrl = `http://192.168.10.83:3000/${componentName}.zip`;
      let toFile = CachesDirectoryPath + '/' + bundleZipName;
      pushLog('fromUrl:' + fromUrl);
      pushLog('toFile:' + toFile);
      await downloadFile({
        fromUrl,
        toFile,
        progress: ({contentLength, bytesWritten}) => {
          pushLog(
            'progress:' + Number(bytesWritten / contentLength).toFixed(2),
          );
        },
      }).promise;
      await ReactNativeZip.unzip(toFile, CachesDirectoryPath);

      const dirList = await readdir('file://' + CachesDirectoryPath + '/App3');
      pushLog('dirList:' + dirList.join(','));
      const jsBundleFile =
        CachesDirectoryPath + '/' + componentName + '/' + jsBundleName;
      let b = await exists(jsBundleFile);
      pushLog(`是否存在:${b} - ` + jsBundleFile);
      if (!b) {
        return;
      }

      AppletModule.startAppletFromJSBundle(componentName, jsBundleFile);
    } catch (error) {
      console.error('捕获错误', error);
      pushLog('捕获错误:' + error.message);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button
          title="startApplet3 local"
          onPress={() => {
            // console.log(NativeModules);
            if (!__DEV__) {
              Alert.alert('温馨提示', '只支持开发模式使用');
              return;
            }
            AppletModule.startAppletFromComponentName('App3');
          }}
        />
        <Button
          title="startApplet3 remote"
          onPress={() => {
            startApplet('App3');
          }}
        />
        <Button
          title="getStorage"
          onPress={() => {
            AsyncStorage.getItem('storage_key').then((res) => {
              console.log('.()', res);
            });
          }}
        />
        <ScrollView>
          {logs.map((item) => (
            <Text>{item}</Text>
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

export default App;
