/* Local-only audio support for the uploaded 104s track.
   The file never leaves the visitor's browser; no copyrighted music is hosted
   from this publicly accessible GitHub Pages repo.
   IndexedDB stores a selected file for repeat visits on the same browser.
   Audio begins only after a permitted user gesture and after the classic prologue.
*/
(function(){
"use strict";
if(document.getElementById("manipur-personal-music"))return;
const music=document.createElement("div");music.id="manipur-personal-music";music.className="manipur-music";
music.hidden=true;
music.innerHTML='<div class="music-title">PERSONAL AUDIO<br><span class="music-sub">BROWSER-LOCAL</span></div>'+
 '<button type="button" id="ms-play" aria-label="Play or pause personal audio" disabled>▶</button>'+
 '<label for="ms-file" role="button" tabindex="0" title="Only the original supplied 104-second Manipur soundtrack is accepted; the file stays on this device">LOAD ORIGINAL</label>'+
 '<input class="music-picker" type="file" id="ms-file" accept="audio/mpeg,audio/mp3,audio/ogg,audio/*">'+
 '<label title="Music volume">VOL <input id="ms-volume" aria-label="Personal music volume" type="range" min="0" max="100" value="27"></label>'+
 '<button id="ms-remove" class="music-clear" type="button" aria-label="Remove saved local soundtrack">✕</button>'+
 '<span id="ms-status" class="music-status" role="status">Only the original Manipur soundtrack is accepted. Select the original MP3 on this device.</span>';
document.body.appendChild(music);
const el=id=>document.getElementById(id);
const audio=document.createElement("audio");
audio.id="manipur-personal-audio";
audio.loop=true;audio.preload="auto";audio.volume=.27;
audio.setAttribute("aria-label","Browser-local uploaded audio");
document.body.appendChild(audio);
let db=null,source=null,chosen=null,wanted=false,started=false,opening=false,validationSerial=0;
let storageReady=false,resolveStorage;
const ready=new Promise(resolve=>{resolveStorage=resolve;});
function settled(){if(storageReady)return;storageReady=true;resolveStorage(true);document.dispatchEvent(new Event("manipur-local-audio-ready"));}
const ORIGINAL_SHA256="721da92196590192604c431ef8e27dfdffad3885404441e75549780f295570bb";
const ORIGINAL_BYTES=4779867;
async function isOriginal(file){
 if(!file||file.size!==ORIGINAL_BYTES||!window.crypto?.subtle)return false;
 const buffer=await file.arrayBuffer();
 const digest=await crypto.subtle.digest("SHA-256",buffer);
 const hex=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
 return hex===ORIGINAL_SHA256;
}
function showState(text){const t=el("ms-status");if(t)t.textContent=text;}
function applyUI(){
 const play=el("ms-play");play.disabled=!chosen;
 play.textContent=audio.paused?"▶":"Ⅱ";
 play.setAttribute("aria-label",audio.paused?"Play soundtrack":"Pause soundtrack");
}
function terminalShown(){const gate=document.getElementById("ci-gate"),coda=document.getElementById("mp-coda");return (!gate||!gate.isConnected)&&(!coda||!coda.isConnected||coda.hidden);}
function maybeShow(){const visible=terminalShown();music.hidden=!visible;if(visible&&chosen&&wanted&&audio.paused)tryPlay();}
function tryPlay(){
 if(!terminalShown()||!chosen)return;
 const result=audio.play();if(result&&typeof result.then==="function"){result.then(()=>{wanted=true;applyUI();showState("Playing local soundtrack · loop enabled · no server upload")})
 .catch(()=>{applyUI();showState("Tap ▶ to start local soundtrack; browser autoplay requires interaction.");});}
}
async function choose(file,{restore=false}={}){
 const serial=++validationSerial;
 if(!file||!/^audio\//.test(file.type)&&!/\.(mp3|ogg|m4a|wav)$/i.test(file.name)){showState("Choose an MP3 or other audio file.");return;}
 if(file.size!==ORIGINAL_BYTES){showState("Not the supplied soundtrack. Only the original 104-second recording is accepted.");return;}
 showState("Verifying the original recording…");
 let valid=false;try{valid=await isOriginal(file);}catch(e){}
 if(serial!==validationSerial)return;
 if(!valid){showState("Audio rejected: this file does not match the original supplied recording.");return;}
 chosen=file;
 if(source)URL.revokeObjectURL(source);
 source=URL.createObjectURL(file);audio.src=source;audio.load();
 document.dispatchEvent(new CustomEvent("manipur-original-audio-verified"));
 wanted=!restore;applyUI();
 showState(restore?"Original soundtrack verified in this browser · tap ENTER WITH SOUND to play.":"Verified original soundtrack · tap Play if Safari blocks the first attempt.");
 if(db){
 try{const tx=db.transaction("files","readwrite");tx.objectStore("files").put({id:"personal-audio",file:file,at:Date.now()});tx.onerror=()=>showState("Playing without browser storage: this device blocked local saving.");}catch(e){}
 }
 if(terminalShown()&&!restore)tryPlay();
}
function openDatabase(){
 if(!("indexedDB" in window)){settled();return;}
 try{
 const request=indexedDB.open("manipur-personal-audio-v1",1);
 request.onupgradeneeded=()=>{const base=request.result;if(!base.objectStoreNames.contains("files"))base.createObjectStore("files",{keyPath:"id"});};
 request.onerror=settled;
 request.onblocked=settled;
 request.onsuccess=()=>{
 db=request.result;
 const tx=db.transaction("files","readonly"),r=tx.objectStore("files").get("personal-audio");
 r.onsuccess=async()=>{
  try{
   const val=r.result;
   if(val&&val.file&&!chosen)await choose(val.file,{restore:true});
  }finally{settled();}
 };
 r.onerror=settled;
 };
 }catch(e){/* private browsing may disable storage */ settled();}
}
function remove(){
 validationSerial++;audio.pause();wanted=false;audio.removeAttribute("src");audio.load();
 if(source){URL.revokeObjectURL(source);source=null;}
 chosen=null;
 if(db){try{db.transaction("files","readwrite").objectStore("files").delete("personal-audio");}catch(e){}}
 applyUI();showState("Original soundtrack cleared from this browser.");
}
el("ms-play").addEventListener("click",()=>{
 if(!chosen)return;
 if(!audio.paused){wanted=false;audio.pause();showState("Soundtrack paused.");}
 else{wanted=true;tryPlay();}
 applyUI();
});
el("ms-file").addEventListener("change",e=>{const file=e.target.files?.[0];if(file)choose(file);});
el("ms-volume").addEventListener("input",e=>{audio.volume=Number(e.target.value)/100;});
el("ms-remove").addEventListener("click",remove);
music.querySelector('label[for="ms-file"]').addEventListener("keydown",e=>{
 if(e.key==="Enter"||e.key===" "){e.preventDefault();el("ms-file").click();}
});
audio.addEventListener("play",applyUI);audio.addEventListener("pause",applyUI);
document.addEventListener("click",e=>{if(e.target.closest("#ms-play,#ms-remove,#ms-file,#manipur-personal-music"))return;if(chosen&&audio.paused&&wanted&&terminalShown())tryPlay();},false);
const monitor=new MutationObserver(maybeShow);
monitor.observe(document.body,{childList:true,subtree:false});
window.addEventListener("pageshow",maybeShow);
window.addEventListener("hashchange",maybeShow);
openDatabase();
maybeShow();
window.MANIPUR_LOCAL_AUDIO={get hasFile(){return !!chosen},get playing(){return !audio.paused},get fileName(){return chosen?.name||null},get originalVerified(){return !!chosen},get storageReady(){return storageReady},ready,play:tryPlay,pause(){audio.pause();wanted=false;},remove:remove};
})();

/* Preview-only palette selector: injected after the original research desk is ready. */
(function(){if(document.getElementById("manipur-theme-script"))return;const s=document.createElement("script");s.id="manipur-theme-script";s.src="/THE-MANIPUR/preview-obsidian-choice.js?v=20261114-obsidian2";document.head.appendChild(s);})();
