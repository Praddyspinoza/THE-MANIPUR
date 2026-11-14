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
 '<label for="ms-file" role="button" tabindex="0" title="Choose the MP3 you supplied; the file stays on this device">LOAD MP3</label>'+
 '<input class="music-picker" type="file" id="ms-file" accept="audio/mpeg,audio/mp3,audio/ogg,audio/*">'+
 '<label title="Music volume">VOL <input id="ms-volume" aria-label="Personal music volume" type="range" min="0" max="100" value="27"></label>'+
 '<button id="ms-remove" class="music-clear" type="button" aria-label="Remove saved local soundtrack">✕</button>'+
 '<span id="ms-status" class="music-status" role="status">Select your audio file to hear it while browsing; stored only on this device.</span>';
document.body.appendChild(music);
const el=id=>document.getElementById(id);
const audio=document.createElement("audio");
audio.id="manipur-personal-audio";
audio.loop=true;audio.preload="auto";audio.volume=.27;
audio.setAttribute("aria-label","Browser-local uploaded audio");
document.body.appendChild(audio);
let db=null,source=null,chosen=null,wanted=false,started=false,opening=false;
function showState(text){const t=el("ms-status");if(t)t.textContent=text;}
function applyUI(){
 const play=el("ms-play");play.disabled=!chosen;
 play.textContent=audio.paused?"▶":"Ⅱ";
 play.setAttribute("aria-label",audio.paused?"Play soundtrack":"Pause soundtrack");
}
function terminalShown(){return !document.getElementById("ci-gate")&&!document.getElementById("mp-coda");}
function maybeShow(){const visible=terminalShown();music.hidden=!visible;if(visible&&wanted&&chosen&&audio.paused)tryPlay();}
function tryPlay(){
 if(!terminalShown()||!chosen)return;
 const result=audio.play();if(result&&typeof result.then==="function"){result.then(()=>{wanted=true;applyUI();showState("Playing local soundtrack · loop enabled · no server upload")})
 .catch(()=>{applyUI();showState("Tap ▶ to start local soundtrack; browser autoplay requires interaction.");});}
}
function choose(file){
 if(!file||!/^audio\//.test(file.type)&&!/\.(mp3|ogg|m4a|wav)$/i.test(file.name)){showState("Choose an MP3 or other audio file.");return;}
 if(file.size>35*1024*1024){showState("This file is too large to save in this browser; choose a smaller one.");return;}
 chosen=file;
 if(source)URL.revokeObjectURL(source);
 source=URL.createObjectURL(file);audio.src=source;audio.load();
 wanted=true;applyUI();showState("Loaded "+file.name+" · looping audio from this device.");
 if(db){
 try{const tx=db.transaction("files","readwrite");tx.objectStore("files").put({id:"personal-audio",file:file,at:Date.now()});tx.onerror=()=>showState("Playing without browser storage: this device blocked local saving.");}catch(e){}
 }
 if(terminalShown())tryPlay();
}
function openDatabase(){
 if(!("indexedDB" in window))return;
 try{
 const request=indexedDB.open("manipur-personal-audio-v1",1);
 request.onupgradeneeded=()=>{const base=request.result;if(!base.objectStoreNames.contains("files"))base.createObjectStore("files",{keyPath:"id"});};
 request.onsuccess=()=>{
 db=request.result;
 const tx=db.transaction("files","readonly"),r=tx.objectStore("files").get("personal-audio");
 r.onsuccess=()=>{const val=r.result;if(val&&val.file&&!chosen){choose(val.file);wanted=false;showState("Saved personal soundtrack available · tap ▶ to play.");}};
 };
 }catch(e){/* private browsing may disable storage */ }
}
function remove(){
 audio.pause();wanted=false;audio.removeAttribute("src");audio.load();
 if(source){URL.revokeObjectURL(source);source=null;}
 chosen=null;
 if(db){try{db.transaction("files","readwrite").objectStore("files").delete("personal-audio");}catch(e){}}
 applyUI();showState("Local soundtrack cleared from this browser.");
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
document.addEventListener("click",()=>{if(terminalShown()&&wanted&&chosen&&audio.paused)tryPlay();},true);
const monitor=new MutationObserver(maybeShow);
monitor.observe(document.body,{childList:true,subtree:false});
window.addEventListener("pageshow",maybeShow);
openDatabase();
maybeShow();
window.MANIPUR_LOCAL_AUDIO={get hasFile(){return !!chosen},get playing(){return !audio.paused},get fileName(){return chosen?.name||null},play:tryPlay,pause(){audio.pause();wanted=false;},remove:remove};
})();
