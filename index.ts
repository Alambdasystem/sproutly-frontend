import React from 'react';
import {Platform} from 'react-native';
import { registerRootComponent } from 'expo';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
function NativeApp(){return React.createElement(SafeAreaProvider,null,React.createElement(SafeAreaView,{style:{flex:1,backgroundColor:'#F8F6ED'}},React.createElement(App)));}
function Root(){return React.createElement(ErrorBoundary,null,React.createElement(Platform.OS==='web'?App:NativeApp));}
registerRootComponent(Root);

