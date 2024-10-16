import {AppRegistry} from 'react-native';
import Main from './src/main.tsx';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);