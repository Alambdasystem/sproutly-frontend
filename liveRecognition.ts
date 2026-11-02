import type {RecognitionHandlers,Recognition} from './voiceSession';
export async function createRecognition(h:RecognitionHandlers):Promise<Recognition>{
 let module;try{module=(await import('expo-speech-recognition')).ExpoSpeechRecognitionModule}catch{throw new Error('Install the latest Sproutly Android app for live voice. Recording transcription and typing remain available.')}
 if(!module.isRecognitionAvailable())throw new Error('No speech recognition service is available on this device. Use recording transcription or type.');const permission=await module.requestPermissionsAsync();if(!permission.granted)throw new Error('Microphone or speech recognition permission was denied. You can type instead.');
 const listeners=[module.addListener('start',h.start),module.addListener('result',e=>h.result(e.results[0]?.transcript||'',e.isFinal)),module.addListener('end',h.end),module.addListener('error',e=>h.error('Live speech stopped ('+e.error+'). Your draft is preserved; try recording transcription or type.'))];
 return{start:()=>module.start({lang:'en-US',interimResults:true,continuous:false,maxAlternatives:1,recordingOptions:{persist:false}}),abort:()=>module.abort(),dispose:()=>listeners.forEach(l=>l.remove())};
}
