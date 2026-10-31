import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const API_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS==='web' && typeof location!=='undefined' ? location.origin : 'http://localhost:3001');
let token = '';
export async function restoreToken(){ token=await AsyncStorage.getItem('sproutly.session')||'';return !!token; }
export async function setToken(value:string){token=value;if(value)await AsyncStorage.setItem('sproutly.session',value);else await AsyncStorage.removeItem('sproutly.session');}
export async function api<T=any>(path:string,method='GET',body?:unknown,headers:Record<string,string>={}):Promise<T>{
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch(`${API_URL}/api/v1${path}`,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...headers},body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'The request could not be completed.');return data;
 }catch(error){if(error instanceof Error&&error.name==='AbortError')throw new Error('The server took too long. Please retry.');throw error;}finally{clearTimeout(timer)}
}
export type Plant={id:string;name:string;species:string;stage:string;location:string;status:string;image:string;mediaId?:string;created:string};
export type Data={user:any;plants:Plant[];tasks:any[];journal:any[];stories:any[];assessments:any[];listings:any[];orders:any[];providers:any[];audit:any[]};
