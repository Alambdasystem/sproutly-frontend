export type SeedDraft={name:string;variety:string;brand:string;growingMethod:string;sowingDate:string;instructions:string};
export type SeedPacket={id:string;name:string;variety?:string;brand?:string;instructions?:string;mediaIds?:string[];revision:number};
export type SeedProject={id:string;name:string;packetId?:string;growingMethod?:string;sowingDate?:string;stage?:string;revision:number;created:string;updated:string};
export const emptySeedDraft:SeedDraft={name:'',variety:'',brand:'',growingMethod:'indoor',sowingDate:'',instructions:''};
export const growingMethods=[['indoor','Indoor'],['outdoor','Outdoor'],['indoor-to-outdoor','Indoor to outdoor'],['container','Container']] as const;
export function seedPayloads(draft:SeedDraft){
 const name=draft.name.trim();if(!name)throw new Error('Enter a seed or project name.');if(name.length>200)throw new Error('Use a name under 200 characters.');
 const date=draft.sowingDate.trim();if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date))throw new Error('Use a valid sowing date in YYYY-MM-DD format, or leave it blank.');
 if(!growingMethods.some(([id])=>id===draft.growingMethod))throw new Error('Choose a growing method.');
 const packet:Record<string,string>={name};for(const k of ['variety','brand','instructions'] as const)if(draft[k].trim())packet[k]=draft[k].trim();
 return{packet,project:{name,growingMethod:draft.growingMethod,...(date?{sowingDate:date}:{})}};
}
