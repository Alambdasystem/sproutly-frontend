import React from 'react';
import {Platform,Pressable} from 'react-native';
import {T,C} from './ui';
export const ANDROID_APK_URL='https://github.com/Alambdasystem/sproutly-frontend/releases/download/v0.1.5-android-pilot/Sproutly-0.1.5.apk';
export default function InstallApp(){
 if(Platform.OS!=='web')return null;
 return <Pressable accessibilityRole="button" accessibilityLabel="Download Android app, APK version 0.1.5" onPress={()=>window.location.assign(ANDROID_APK_URL)} style={{minHeight:44,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:C.border,borderRadius:24,paddingHorizontal:14,backgroundColor:C.white}}><T style={{fontSize:12,fontFamily:'Inter_600SemiBold'}}>Download Android app</T></Pressable>;
}

