import type {RecognitionHandlers,Recognition} from './voiceSession';
export async function createRecognition(h:RecognitionHandlers):Promise<Recognition>{
 const Constructor=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;if(!Constructor)throw new Error('Live dictation is unavailable in this browser. Try Chrome, use recording transcription, or type.');
 const r=new Constructor();r.lang='en-US';r.interimResults=true;r.continuous=false;r.maxAlternatives=1;r.onstart=h.start;r.onresult=(event:any)=>{const results=Array.from(event.results) as any[];h.result(results.map(x=>x[0]?.transcript||'').join(' ').trim(),results.length>0&&results.every(x=>x.isFinal))};r.onend=h.end;r.onerror=(e:any)=>h.error(e.error==='not-allowed'?'Microphone or speech permission was denied. You can type instead.':e.error==='no-speech'?'No speech was detected. Try again or type.':'Live speech stopped ('+(e.error||'speech service unavailable')+'). Your draft is preserved.');
 return{start:()=>r.start(),abort:()=>r.abort(),dispose:()=>{r.onstart=r.onresult=r.onend=r.onerror=null}};
}
