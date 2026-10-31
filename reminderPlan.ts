export function reminderPlan(owner:string,tasks:any[],now=Date.now()){
 return tasks.filter(t=>!t.done&&Number.isFinite(Date.parse(t.due))&&Date.parse(t.due)>now).sort((a,b)=>Date.parse(a.due)-Date.parse(b.due)).slice(0,60).map(t=>({identifier:`sproutly:${owner}:${t.id}`,due:Date.parse(t.due),title:String(t.title).slice(0,200),taskId:t.id,owner}));
}
