import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetch as streamingFetch} from 'expo/fetch';
import {readJobEvents} from './jobEvents';
export const API_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS==='web' && typeof location!=='undefined' ? location.origin : 'http://localhost:3001');
let token = '';
export async function restoreToken(){if(Platform.OS==='web'){token=await AsyncStorage.getItem('sproutly.session')||'';}else{const secure=await import('expo-secure-store');token=await secure.getItemAsync('sproutly.session')||'';if(!token){const legacy=await AsyncStorage.getItem('sproutly.session');if(legacy){await secure.setItemAsync('sproutly.session',legacy);token=legacy;await AsyncStorage.removeItem('sproutly.session')}}}return !!token;}
export async function setToken(value:string){if(Platform.OS==='web'){if(value)await AsyncStorage.setItem('sproutly.session',value);else await AsyncStorage.removeItem('sproutly.session');}else{const secure=await import('expo-secure-store');if(value)await secure.setItemAsync('sproutly.session',value);else await secure.deleteItemAsync('sproutly.session');await AsyncStorage.removeItem('sproutly.session');}token=value;}
export async function api<T=any>(path:string,method='GET',body?:unknown,headers:Record<string,string>={}):Promise<T>{
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),path==='/voice/transcribe'?75000:20000);
 try{const response=await fetch(`${API_URL}/api/v1${path}`,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...headers},body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'The request could not be completed.');return data;
 }catch(error){if(error instanceof Error&&error.name==='AbortError')throw new Error('The server took too long. Please retry.');throw error;}finally{clearTimeout(timer)}
}
export type Plant={id:string;name:string;species:string;stage:string;location:string;status:string;image:string;mediaId?:string;created:string};
export async function streamCareJob(id:string,onJob:(job:any)=>void,signal?:AbortSignal){
 const controller=new AbortController(),abort=()=>controller.abort();signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();const timer=setTimeout(abort,115000);
 try{return await readJobEvents(await streamingFetch(`${API_URL}/api/v1/care/jobs/${encodeURIComponent(id)}/events`,{headers:{Accept:'text/event-stream',...(token?{Authorization:`Bearer ${token}`}:{})},signal:controller.signal}),onJob)}finally{clearTimeout(timer);signal?.removeEventListener('abort',abort)}
}
export type Data={user:any;plants:Plant[];tasks:any[];journal:any[];stories:any[];assessments:any[];listings:any[];orders:any[];providers:any[];audit:any[]};

