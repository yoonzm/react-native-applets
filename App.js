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
} from 'react-native';
import {
  CachesDirectoryPath,
  downloadFile,
  readdir,
  exists,
} from 'react-native-fs';
import * as ReactNativeZip from 'react-native-zip-archive';

const {AppletModule} = NativeModules;

const jsBundleName = 'index.android.bundle';

export const title = '哈哈哈';

const App = () => {
  const [logs, setLogs] = React.useState([]);

  function pushLog(log) {
    setLogs((items) => [...items, log]);
  }

  async function startApplet(componentName) {
    try {
      if (__DEV__) {
        AppletModule.startAppletFromComponentName(componentName);
      } else {
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

        const dirList = await readdir(
          'file://' + CachesDirectoryPath + '/App3',
        );
        pushLog('dirList:' + dirList.join(','));
        const jsBundleFile =
          CachesDirectoryPath + '/' + componentName + '/' + jsBundleName;
        let b = await exists(jsBundleFile);
        pushLog(`是否存在:${b} - ` + jsBundleFile);
        if (!b) {
          return;
        }

        AppletModule.startAppletFromJSBundle(componentName, jsBundleFile);
      }
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
            AppletModule.startAppletFromComponentName('App3');
          }}
        />
        <Button
          title="startApplet3 remote"
          onPress={() => {
            startApplet('App3');
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
