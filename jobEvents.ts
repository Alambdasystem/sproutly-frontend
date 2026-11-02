// SSE snapshots are replaceable: reconnecting cannot append a duplicate answer.
export async function readJobEvents(response:{ok:boolean;body:ReadableStream<Uint8Array>|null},onJob:(job:any)=>void){
 if(!response.ok||!response.body)throw new Error('Live updates unavailable.');
 const reader=response.body.getReader(),decoder=new TextDecoder();let pending='',terminal:any=null;
 const frame=(text:string)=>{const data=text.split('\n').filter(l=>l.startsWith('data:')).map(l=>l.slice(5).trimStart()).join('\n');if(!data)return;const job=JSON.parse(data);if(!job.id||!['queued','running','completed','failed'].includes(job.status))return;onJob(job);if(['completed','failed'].includes(job.status))terminal=job};
 try{while(!terminal){const {done,value}=await reader.read();pending+=done?decoder.decode():decoder.decode(value,{stream:true});pending=pending.replace(/\r\n/g,'\n');if(pending.length>300000)throw new Error('Live update exceeded its limit.');let at;while((at=pending.indexOf('\n\n'))>=0){frame(pending.slice(0,at));pending=pending.slice(at+2)}if(done){if(pending.trim())frame(pending);break}}if(!terminal)throw new Error('Live updates interrupted.');return terminal;
 }finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
}
