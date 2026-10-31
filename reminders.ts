import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reminderPlan} from './reminderPlan';
let chain:Promise<any>=Promise.resolve();
const key=(owner:string)=>'sproutly.reminders.'+owner;
async function notifications(){const n=await import('expo-notifications');n.setNotificationHandler({handleNotification:async()=>({shouldShowBanner:true,shouldShowList:true,shouldPlaySound:true,shouldSetBadge:false})});return n;}
export function clearReminders(){if(Platform.OS==='web')return Promise.resolve();chain=chain.catch(()=>{}).then(async()=>{const n=await notifications();for(const r of await n.getAllScheduledNotificationsAsync())if(r.identifier.startsWith('sproutly:'))await n.cancelScheduledNotificationAsync(r.identifier);});return chain;}
export async function enableReminders(owner:string){
 if(Platform.OS==='web')throw new Error('Background device reminders are available in the Android app.');
 const n=await notifications();if(Platform.OS==='android')await n.setNotificationChannelAsync('plant-care',{name:'Plant care',importance:n.AndroidImportance.DEFAULT});
 const permission=await n.requestPermissionsAsync();if(!permission.granted)throw new Error('Notifications are disabled. You can enable them in your device settings.');await AsyncStorage.setItem(key(owner),'true');
}
export async function disableReminders(owner:string){await AsyncStorage.removeItem(key(owner));await clearReminders();}
export function syncReminders(owner:string,tasks:any[]){
 if(Platform.OS==='web')return Promise.resolve(0);
 const work=async()=>{const n=await notifications(),current=await n.getAllScheduledNotificationsAsync();const enabled=await AsyncStorage.getItem(key(owner))==='true'&&(await n.getPermissionsAsync()).granted;const plan=enabled?reminderPlan(owner,tasks):[];const ids=new Set(plan.map(p=>p.identifier));for(const r of current)if(r.identifier.startsWith('sproutly:')&&(!ids.has(r.identifier)||r.content.data?.due!==plan.find(p=>p.identifier===r.identifier)?.due))await n.cancelScheduledNotificationAsync(r.identifier);
 let count=0;for(const p of plan){const previous=current.find(r=>r.identifier===p.identifier&&r.content.data?.due===p.due&&r.content.body===p.title);if(!previous)await n.scheduleNotificationAsync({identifier:p.identifier,content:{title:'Sproutly reminder',body:p.title,sound:'default',data:{owner,taskId:p.taskId,due:p.due}},trigger:{type:n.SchedulableTriggerInputTypes.DATE,date:new Date(p.due),channelId:'plant-care'}});count++;}return count;};
 chain=chain.catch(()=>{}).then(work);return chain as Promise<number>;
}
