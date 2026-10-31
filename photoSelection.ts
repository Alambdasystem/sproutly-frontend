type PhotoAsset={uri:string;base64?:string|null;mimeType?:string|null};
type Picker={requestCameraPermissionsAsync:()=>Promise<{granted:boolean}>;launchCameraAsync:(options:any)=>Promise<any>;launchImageLibraryAsync:(options:any)=>Promise<any>};
export async function selectPhoto(picker:Picker,camera=false,{quality=.65}:{quality?:number}={}){
 if(camera){const permission=await picker.requestCameraPermissionsAsync();if(!permission.granted)throw new Error('Camera permission denied. Choose Upload photo instead.')}
 const result=await(camera?picker.launchCameraAsync:picker.launchImageLibraryAsync)({mediaTypes:['images'],base64:true,quality,exif:false});
 if(result.canceled)return null;
 const asset:PhotoAsset=result.assets?.[0];
 if(!asset?.base64)throw new Error('Could not read this photo. Please choose another image.');
 if(asset.base64.length>5300000)throw new Error('Choose a smaller image (under 4 MB).');
 const mime=asset.mimeType||'image/jpeg';if(!['image/jpeg','image/png','image/webp'].includes(mime))throw new Error('Choose a JPEG, PNG, or WebP photo.');
 return{uri:asset.uri,data:`data:${mime};base64,${asset.base64}`};
}

