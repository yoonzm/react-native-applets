/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/**
 * 调试模式下还是基于{@link AppRegistry.registerComponent}的方式开发
 * TODO fix APP打包后移除
 */
import './App2';
import './App3';

AppRegistry.registerComponent(appName, () => App);
