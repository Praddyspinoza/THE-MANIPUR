/* Manipur film recut — actual source video, never thumbnail or screenshot stills.
   The original 15-second Manipur prologue and the whole research terminal are unchanged.
   Broadcast order: Manipur -> international -> four political figures -> Indian media.
   Video embeds can be restricted by their owners. All source links remain clickable. */
(function(){
"use strict";
if(new URLSearchParams(location.search).get("intro")==="0"||document.getElementById("mp-coda"))return;
const media=[
["homes","manipur","youtube","ge9ReWg_Poc","NDTV","15 Jun 2023",0,"Homes on fire / conflict coverage"],
["gunfire","manipur","youtube","6XwwSFCOgLk","NDTV","26 Jul 2023",0,"Conflict-zone field report"],
["shelter","manipur","youtube","deHnJ5DoOMw","BBC News India","23 May 2026",0,"Displacement / temporary shelter"],
["bbc","international","youtube","E51qy8BIOMU","BBC News India","25 Jul 2023",0,"International report on Manipur"],
["dw","international","youtube","uVHRj3whZsA","DW News","2023 archive",0,"Manipur conflict report"],
["reuters","international","youtube","NUvF4oRkJWE","Reuters","2023 archive",0,"Reuters report on Manipur"],
["aljazeera","international","youtube","B0kENhQibbw","Al Jazeera English","2023 archive",0,"Manipur conflict / Inside Story"],
["france24","international","dailymotion","x9n1kre","FRANCE 24 English","2025 archive",0,"Report on a divided state"],
["modi","leaders","youtube","dlCQ4YtUvwo","Narendra Modi / Official","10 Aug 2023",5520,"Prime Minister / Lok Sabha"],
["biren","leaders","youtube","jQlW3qS21kI","The Indian Express / ANI","1 Jul 2023",0,"N. Biren Singh / then-Chief Minister"],
["rahul","leaders","youtube","QKBNuJNvuCI","Sansad TV","9 Aug 2023",1200,"Rahul Gandhi / Lok Sabha"],
["shah","leaders","youtube","6DnRaWikqlU","Sansad TV","9 Aug 2023",4440,"Amit Shah / Lok Sabha"],
["hindi","indian","youtube","B9_Bo8SIwr4","Aaj Tak · Hindi","24 Jul 2023",0,"Original Hindi ground report"],
["english","indian","youtube","1-l2SwrzQiA","India Today · English","31 May 2023",0,"English field report from Churachandpur"],
["manipuri","indian","youtube","t0x15LhCBLQ","Impact TV · Manipuri","4 May 2023",0,"4pm Manipuri-language news bulletin"]
].map(a=>({key:a[0],group:a[1],provider:a[2],id:a[3],publisher:a[4],date:a[5],start:a[6],description:a[7],
 url:(a[2]==="dailymotion"?"https://www.dailymotion.com/video/":"https://www.youtube.com/watch?v=")+a[3],
 originalSound:a[0]==="bbc"||a[0]==="manipuri"}));
const sequence=media.concat([{key:"dossier",group:"dossier",duration:3.7},{key:"parallax",group:"parallax",duration:4.2}]);
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const stage=document.createElement("section");stage.id="mp-coda";stage.className="mp-coda";stage.hidden=true;
stage.setAttribute("aria-label","Documentary broadcast footage and evidence desk transition");
stage.innerHTML=
 '<div class="mp-coda-media">'+media.map((m,i)=>'<div class="mp-coda-shot" data-kind="'+m.group+'" data-mp-index="'+i+'">'+
 '<div class="mp-source-wait" role="status"><i class="mp-pulse"></i><small>CONNECTING TO ORIGINAL BROADCAST</small>'+
 '<strong>'+esc(m.publisher)+'</strong><a target="_blank" rel="noopener noreferrer" href="'+esc(m.url)+'">OPEN ORIGINAL VIDEO ↗</a></div>'+
 '<iframe title="'+esc(m.publisher)+' source footage" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen tabindex="-1" referrerpolicy="strict-origin-when-cross-origin"></iframe>'+
 '</div>').join("")+'</div>'+
 '<div class="mp-coda-filmgrain" aria-hidden="true"></div>'+
 '<header class="mp-coda-top"><span class="mp-coda-label">MANIPUR / ARCHIVAL REPORTS / ORIGINAL VIDEO</span>'+
 '<div class="mp-coda-control-bar">'+
 '<button id="mp-coda-keywords" type="button" aria-pressed="true" title="Synthetic keyword narration, not a recording of news anchors">KEYWORDS: ON</button>'+
 '<button id="mp-coda-voices" type="button" aria-pressed="false" title="Original broadcast voices, when available, from BBC and Impact TV only">BBC / IMPACT AUDIO: OFF</button>'+
 '<button id="mp-coda-fx" type="button" aria-pressed="true">SFX: ON</button>'+
 '<button id="mp-coda-skip" type="button">ENTER TERMINAL ↗</button></div></header>'+
 '<div class="mp-coda-credit" id="mp-coda-credit" aria-live="polite"></div>'+
 '<div class="mp-coda-codeframe" id="mp-coda-code" aria-label="Research dossier title sequence"><div class="mp-dossier-stack">'+
 '<div class="mp-code-lead">THE MANIPUR RESEARCH TERMINAL / CASE STUDY 2023–2026</div>'+
 '<div class="mp-code-title">MANIPUR<span style="font-family:Georgia,serif;font-size:.34em;vertical-align:top"> / 16</span></div>'+
 '<div class="mp-code-sub">IDENTITY · CONFLICT · COLLECTIVE MEMORY</div><div class="mp-code-motif">'+
 '<div class="mp-code-line" style="--delay:0ms">FILE 001 / DISTRICTS & INCIDENT GEOGRAPHY</div>'+
 '<div class="mp-code-line" style="--delay:120ms">FILE 002 / ADMINISTRATIVE RESPONSE & MEASURES</div>'+
 '<div class="mp-code-line" style="--delay:250ms">FILE 003 / DISPLACEMENT & HUMAN STORIES</div>'+
 '<div class="mp-code-line" style="--delay:360ms">FILE 004 / NGO RELIEF & INDEPENDENT MONITORING</div>'+
 '<div class="mp-code-line" style="--delay:480ms">FILE 005 / SOURCES · DATES · ACCOUNTABILITY</div></div>'+
 '<div class="mp-code-auth">AN INTELLIGENCE-STYLE VISUAL / NOT A CLASSIFIED RECORD</div></div></div>'+
 '<section class="mp-parallax" id="mp-parallax" aria-label="Parallax interlude before the terminal">'+
 '<div class="mp-depth mp-depth-back"></div><div class="mp-depth mp-depth-mid"></div><div class="mp-depth mp-depth-front"></div>'+
 '<div class="mp-parallax-inner"><small>THE MANIPUR RESEARCH TERMINAL</small>'+
 '<h2>BEYOND THE<br><em>HEADLINES.</em></h2><p>16 DISTRICTS · SOURCES · HUMAN STORIES</p>'+
 '<div class="mp-parallax-rule"></div><small>ENTER THE EVIDENCE DESK</small></div></section>'+
 '<div class="mp-coda-bottom" aria-hidden="true"><span id="mp-coda-progress"></span></div>';
document.body.appendChild(stage);
const $=id=>document.getElementById(id);
const frames=()=>Array.from(stage.querySelectorAll(".mp-coda-shot iframe"));
let started=false,done=false,idx=-1,startedAt=0,playingAt=0,raf=0,sfx=true,keywords=true,origAudio=false;
let priorOverflow="",loaded=new Set(),ready=new Set(),fired=new Set(),speechTimer=0,wordNumber=0,gun=null;
const words=["Manipur","burning","violence","conflict","riots"];
function haltSpeech(){clearTimeout(speechTimer);speechTimer=0;try{speechSynthesis.cancel()}catch(e){}}
function speak(){
 if(done||!started)return;
 const item=sequence[idx],group=item?.group;
 if(keywords&&["international","leaders","indian"].includes(group)&&!(origAudio&&item.originalSound)){
  try{if(typeof SpeechSynthesisUtterance!=="undefined"&&!speechSynthesis.speaking&&!speechSynthesis.pending){
   const word=new SpeechSynthesisUtterance(words[wordNumber++%words.length]);
   word.lang="en-IN";word.rate=.8;word.pitch=.76;word.volume=.48;speechSynthesis.speak(word);
  }}catch(e){}
 }
 speechTimer=setTimeout(speak,1550);
}
function speakBegin(){haltSpeech();if(keywords)speak();}
function command(frame,func,args){
 if(!frame?.src||!frame.contentWindow||!frame.src.includes("youtube-nocookie.com"))return;
 try{frame.contentWindow.postMessage(JSON.stringify({event:"command",func,args:args||[]}),"https://www.youtube-nocookie.com")}catch(e){}
}
function load(n){
 if(n<0||n>=media.length||loaded.has(n))return;
 const entry=media[n],f=frames()[n];if(!f)return;
 loaded.add(n);
 f.src=entry.provider==="youtube"?
 "https://www.youtube-nocookie.com/embed/"+entry.id+"?enablejsapi=1&autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1&origin="+encodeURIComponent(location.origin)+"&start="+entry.start:
 "https://www.dailymotion.com/embed/video/"+entry.id+"?autoplay=1&mute=1&controls=0";
}
function prefetch(n){
 for(let p=n;p<=Math.min(n+2,media.length-1);p++)load(p);
 for(const p of Array.from(loaded))if(p<n-1||p>n+2){
  frames()[p]?.removeAttribute("src");frames()[p]?.closest(".mp-coda-shot")?.classList.remove("video-ready");loaded.delete(p);ready.delete(p);
 }
}
function setAudio(){
 const item=media[idx];if(!item||item.provider!=="youtube")return;
 const frame=frames()[idx],play=origAudio&&item.originalSound;
 command(frame,play?"unMute":"mute",[]);if(play)command(frame,"setVolume",[60]);
}
function sfxCue(key){
 if(!sfx||fired.has(key))return;fired.add(key);
 window.MANIPUR_CINEMATIC_SFX?.burst(key==="homes"?"blast":"gunfire");
 if(key==="gunfire"&&gun)try{gun.currentTime=0;gun.play().catch(()=>{})}catch(e){}
}
function enter(n){
 idx=n;startedAt=performance.now();playingAt=0;
 const item=sequence[n];if(!item){finish();return;}
 stage.classList.toggle("mp-coda-dossier",item.group==="dossier");
 stage.classList.toggle("mp-coda-bridge",item.group==="parallax");
 stage.classList.toggle("mp-coda-news",!["dossier","parallax"].includes(item.group));
 stage.querySelectorAll(".mp-coda-shot").forEach((e,k)=>e.classList.toggle("active",k===n));
 if(item.group==="dossier"||item.group==="parallax"){
  haltSpeech();if(gun)gun.pause();
  $("mp-coda-credit").textContent="";
  if(item.group==="parallax")document.body.classList.add("mp-terminal-ready");
  return;
 }
 prefetch(n);
 const group=item.group==="manipur"?"MANIPUR FOOTAGE":item.group==="international"?"INTERNATIONAL REPORTING":item.group==="leaders"?"PUBLIC STATEMENT":"INDIAN NEWS";
 $("mp-coda-credit").innerHTML='<span>'+esc(group)+' · '+esc(item.publisher)+' · '+esc(item.date)+
 '</span> <a href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">WATCH ORIGINAL REPORT ↗</a>'+
 '<small class="mp-coda-archive-note">Embedded original publisher video · no screenshots · playback subject to publisher restrictions</small>';
 if(["homes","gunfire"].includes(item.key))sfxCue(item.key);
 if(item.group==="manipur")haltSpeech();else if(!speechTimer)speakBegin();
 if(ready.has(n)){command(frames()[n],"seekTo",[item.start||0,true]);command(frames()[n],"playVideo",[]);playingAt=performance.now();}
 setAudio();
}
window.addEventListener("message",event=>{
 if(!["https://www.youtube-nocookie.com","https://www.youtube.com"].includes(event.origin))return;
 let data=event.data;try{if(typeof data==="string")data=JSON.parse(data)}catch(e){return}
 if(!data)return;
 const playing=(data.event==="onStateChange"&&Number(data.info)===1)||
  (data.event==="infoDelivery"&&Number(data.info?.playerState)===1);
 if(!playing)return;
 const fs=frames(),n=fs.findIndex(f=>f.contentWindow===event.source);
 if(n<0||n>=media.length)return;
 ready.add(n);fs[n].closest(".mp-coda-shot")?.classList.add("video-ready");
 if(n===idx){playingAt=playingAt||performance.now();setAudio();}
});
function finish(){
 if(done)return;done=true;cancelAnimationFrame(raf);haltSpeech();
 if(gun)try{gun.pause();gun.currentTime=0}catch(e){}
 document.body.classList.add("mp-terminal-ready");
 frames().forEach(f=>f.removeAttribute("src"));
 document.body.style.overflow=priorOverflow;stage.remove();
 window.MANIPUR_POSTLUDE={finished:true,played:started,edition:"source-video-recut",noScreenshots:true,
  sources:media.map(x=>({publisher:x.publisher,date:x.date,url:x.url,group:x.group}))};
}
function tick(now){
 if(done)return;
 const item=sequence[idx];if(!item){finish();return;}
 const seconds=(now-startedAt)/1000;
 let progress=0;
 if(item.duration){
  progress=Math.min(1,seconds/item.duration);
  if(seconds>=item.duration){enter(idx+1);raf=requestAnimationFrame(tick);return;}
 }else if(ready.has(idx)){
  playingAt=playingAt||now;progress=Math.min(1,(now-playingAt)/4500);
  if(now-playingAt>=4500){enter(idx+1);raf=requestAnimationFrame(tick);return;}
 }else{
  progress=Math.min(1,seconds/4.7);
  if(seconds>=4.7){enter(idx+1);raf=requestAnimationFrame(tick);return;}
 }
 $("mp-coda-progress").style.width=(100*(idx+progress)/sequence.length).toFixed(2)+"%";
 raf=requestAnimationFrame(tick);
}
function start(){
 if(started||done)return;
 started=true;stage.hidden=false;priorOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
 gun=new Audio("https://commons.wikimedia.org/wiki/Special:FilePath/Gunshots_8.ogg");gun.preload="auto";gun.volume=.14;
 enter(0);raf=requestAnimationFrame(tick);
 window.MANIPUR_POSTLUDE={finished:false,played:true,edition:"source-video-recut",sourcesCount:media.length,
  order:["Manipur video","International media","Modi / N. Biren Singh / Rahul Gandhi / Amit Shah","Hindi / English / Manipuri news","Dossier","Parallax"]};
}
$("mp-coda-skip").addEventListener("click",finish);
$("mp-coda-fx").addEventListener("click",function(){sfx=!sfx;this.textContent="SFX: "+(sfx?"ON":"OFF");this.setAttribute("aria-pressed",String(sfx));window.MANIPUR_CINEMATIC_SFX?.setEnabled(sfx);if(!sfx&&gun)gun.pause();});
$("mp-coda-keywords").addEventListener("click",function(){keywords=!keywords;this.textContent="KEYWORDS: "+(keywords?"ON":"OFF");this.setAttribute("aria-pressed",String(keywords));if(keywords)speakBegin();else haltSpeech();});
$("mp-coda-voices").addEventListener("click",function(){
 origAudio=!origAudio;this.textContent="BBC / IMPACT AUDIO: "+(origAudio?"ON":"OFF");
 this.setAttribute("aria-pressed",String(origAudio));setAudio();
 if(origAudio&&media[idx]?.originalSound)haltSpeech();else if(keywords)speakBegin();
});
stage.addEventListener("pointermove",e=>{
 if(!stage.classList.contains("mp-coda-bridge"))return;
 stage.style.setProperty("--px",((e.clientX/innerWidth-.5)*2).toFixed(3));
 stage.style.setProperty("--py",((e.clientY/innerHeight-.5)*2).toFixed(3));
},{passive:true});
document.addEventListener("manipur-terminal-entered",()=>{
 if(!document.body.classList.contains("mp-terminal-ready"))return;
 document.body.classList.remove("mp-terminal-ready");document.body.classList.add("mp-terminal-revealing");
 setTimeout(()=>document.body.classList.remove("mp-terminal-revealing"),1700);
});
document.getElementById("ci-explore")?.addEventListener("click",()=>{
 window.MANIPUR_CINEMATIC_SFX?.arm?.();try{speechSynthesis.resume()}catch(e){}
});
const observer=new MutationObserver(records=>{
 for(const m of records)for(const n of m.removedNodes){
  if(n.nodeType!==1||n.id!=="ci-gate")continue;
  observer.disconnect();
  if(parseFloat(n.querySelector("#ci-progress")?.style.width||"0")>=99.9)start();else stage.remove();
  return;
 }
});
observer.observe(document.body,{childList:true});
const credits=document.getElementById("ci-credits")?.querySelector(".ci-credits-card");
if(credits){
 const el=document.createElement("section");
 el.innerHTML='<h3>Original media montage and voice provenance</h3><p>Original video is embedded from the named publishers; no compressed thumbnails or screenshots are presented. If a source blocks embedding, a neutral slate and a link replace it. Five repeated keywords are browser-generated speech, NOT recorded broadcaster narration. Optional BBC / Impact TV audio comes directly from their own video embeds.</p><ol>'+
 media.map(x=>'<li>'+esc(x.publisher)+' · '+esc(x.date)+' — <a href="'+esc(x.url)+'" rel="noopener noreferrer" target="_blank">'+esc(x.description)+'</a></li>').join("")+
 '</ol><p>Violence sound effects are illustrative, not incident audio.</p>';
 credits.appendChild(el);
}
})();
