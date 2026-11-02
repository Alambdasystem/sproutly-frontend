import test from 'node:test';import assert from 'node:assert/strict';import {readJobEvents} from './jobEvents.ts';
test('stream snapshots replace partial replies across UTF-8 boundaries and return only terminal results',async()=>{
 const jobs=[{id:'a',status:'running',preview:'Basil 🌱'},{id:'a',status:'running',preview:'Basil 🌱 needs a soil check.'},{id:'a',status:'completed',result:{text:'Check soil.'}}];const bytes=new TextEncoder().encode(jobs.map(j=>'event: job\r\ndata: '+JSON.stringify(j)+'\r\n\r\n').join(''));const seen=[];
 const response=new Response(new ReadableStream({start(c){for(let i=0;i<bytes.length;i+=2)c.enqueue(bytes.slice(i,i+2));c.close()}}));assert.deepEqual(await readJobEvents(response,j=>seen.push(j)),jobs[2]);assert.deepEqual(seen,jobs);
});
test('disconnected and malformed streams fail for saved-job polling recovery instead of fabricating a final answer',async()=>{
 await assert.rejects(()=>readJobEvents(new Response('event: job\ndata: {"id":"a","status":"running","preview":"Partial"}\n\n'),()=>{}),/interrupted/);
 await assert.rejects(()=>readJobEvents(new Response('data: broken\n\n'),()=>{}));
});
