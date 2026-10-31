import {useEffect,useState} from 'react';
import {Platform} from 'react-native';

// Android browsers can resize only the visual viewport when the keyboard opens.
export function useViewportHeight(){
 const [height,setHeight]=useState<number|undefined>();
 useEffect(()=>{
  if(Platform.OS!=='web'||typeof window==='undefined')return;
  const viewport=window.visualViewport;
  const update=()=>{
   if(viewport&&Math.abs(viewport.scale-1)>.05)return;
   setHeight(Math.round(viewport?.height||window.innerHeight));
   requestAnimationFrame(()=>{const active=document.activeElement;if(active instanceof HTMLElement&&['INPUT','TEXTAREA'].includes(active.tagName))active.scrollIntoView({block:'nearest',inline:'nearest'})});
  };
  update();window.addEventListener('resize',update);viewport?.addEventListener('resize',update);
  return()=>{window.removeEventListener('resize',update);viewport?.removeEventListener('resize',update)};
 },[]);
 return height;
}
