import React,{useEffect,useState} from 'react';
import {Platform,View} from 'react-native';
import {Button,T,C} from './ui';
export default function InstallApp(){
 const [prompt,setPrompt]=useState<any>(null),[installed,setInstalled]=useState(false),[help,setHelp]=useState('');
 useEffect(()=>{if(Platform.OS!=='web')return;const w=window as any;const media=w.matchMedia('(display-mode: standalone)');const sync=()=>setInstalled(media.matches||!!w.navigator.standalone);const ready=(e:any)=>{e.preventDefault();setPrompt(e)};const done=()=>{setInstalled(true);setPrompt(null);setHelp('')};sync();w.addEventListener('beforeinstallprompt',ready);w.addEventListener('appinstalled',done);media.addEventListener('change',sync);return()=>{w.removeEventListener('beforeinstallprompt',ready);w.removeEventListener('appinstalled',done);media.removeEventListener('change',sync)}},[]);
 if(Platform.OS!=='web'||installed)return null;
 const install=async()=>{if(prompt){try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted')setHelp('Finish installation in your browser.');}catch{setHelp('Open your browser menu and choose Install app or Add to Home screen.')}finally{setPrompt(null)}}else setHelp(/iPhone|iPad/.test(navigator.userAgent)?'In Safari, tap Share, then Add to Home Screen.':'On Android, open this page in Chrome. Tap ⋮, then Install app or Add to Home screen. If you opened it inside another app, choose Open in Chrome first.')};
 return <View style={{gap:8,marginBottom:16}}><Button secondary onPress={install}>Install Sproutly</Button>{!!help&&<T accessibilityLiveRegion="polite" style={{fontSize:13,color:C.muted}}>{help}</T>}<T style={{fontSize:11,color:C.muted}}>Add Sproutly to your home screen. Internet is needed for your garden and plant analysis.</T></View>;
}
