import React from 'react';
import {View,Image} from 'react-native';
import {T,C,PlantArt} from './ui';
const assets={basil:require('./garden-basil.png'),monstera:require('./garden-monstera.png'),tomato:require('./garden-tomato.png'),seeds:require('./marketplace-seeds.png')};
export default function PlantPhoto({plant,height=180}:{plant:any;height?:number}){
 const species=String(plant.species||'').toLowerCase(),name=String(plant.name||'').toLowerCase();
 const key=plant.type==='Seeds'?'seeds':species.includes('ocimum basilicum')||name==='sweet basil'?'basil':species.includes('monstera deliciosa')?'monstera':species.includes('solanum lycopersicum')||species==='cherry tomato'?'tomato':null;
 if(!key)return <PlantArt kind={plant.image} size={height}/>;
 return <View style={{gap:4}}><Image source={assets[key]} accessibilityLabel={`${key==='seeds'?'Seed assortment':key} — AI-generated demo illustration`} resizeMode="cover" style={{width:'100%',height,borderRadius:16,backgroundColor:C.pale}}/><T style={{fontSize:10,lineHeight:15,color:C.muted}}>AI-generated demo illustration</T></View>;
}
