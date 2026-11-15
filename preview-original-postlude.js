/* Manipur film recut — actual source video, never thumbnail or screenshot stills.
   The original 15-second Manipur prologue and the whole research terminal are unchanged.
   Broadcast order: Manipur -> international -> four political figures -> Indian media.
   Video embeds can be restricted by their owners. All source links remain clickable. */
(function(){
"use strict";
if(new URLSearchParams(location.search).get("intro")==="0"||document.getElementById("mp-coda"))return;
const media=[
["bbc","international","youtube","E51qy8BIOMU","BBC News India","25 Jul 2023",0,"Lives interrupted by violence in Manipur"],
["dw","international","youtube","08AnQDLKjm0","DW News","8 Aug 2023",0,"Manipur violence report / displacement"],
["aljazeera","international","youtube","JZe26XpIUfI","Al Jazeera English","29 Jul 2023",0,"Manipur ethnic unrest and concerns about further violence"],
["rahul","leaders","youtube","jtIFKIut_V0","ThePrint / Rahul Gandhi","9 Aug 2023",0,"Rahul Gandhi speaks on Manipur in Parliament"],
["modi","leaders","youtube","9AoKxJMRtXI","Narendra Modi / Official","20 Jul 2023",0,"Modi addresses Manipur incident"],
["shah","leaders","youtube","mU1WJCRHFl8","The Indian Express / Amit Shah","25 Jul 2023",0,"Shah speaks in Parliament about Manipur"],
["biren","leaders","youtube","jQlW3qS21kI","The Indian Express / N. Biren Singh","1 Jul 2023",0,"Then-CM Biren Singh discusses the violence"],
["wea","rights","youtube","O5aF0k22HN0","World Evangelical Alliance · UNHRC side event","19 Sep 2023",0,"NGO-organized Geneva human rights discussion, not official UN footage"],
["hindi","indian","youtube","LJ7axf0crfI","Aaj Tak · Hindi","21 Jul 2023",0,"Hindi coverage: Manipur violence and aftermath"],
["english","indian","youtube","i-2BZEdYtqU","News9 · English","5 May 2023",0,"English bulletin on Manipur security and violence"],
["manipuri","indian","youtube","iS2kNb2Npj0","Impact TV Manipur · Meiteilon","4 May 2023",0,"Official Impact TV Manipuri 2 PM bulletin"]
].map(a=>({key:a[0],group:a[1],provider:a[2],id:a[3],publisher:a[4],date:a[5],start:a[6],description:a[7],
 url:(a[2]==="dailymotion"?"https://www.dailymotion.com/video/":"https://www.youtube.com/watch?v=")+a[3],
 originalSound:a[0]==="bbc"||a[0]==="manipuri"}));
const sequence=media.concat([{key:"dossier",group:"dossier",duration:2.2},{key:"parallax",group:"parallax",duration:2.7}]);
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
const wordsEnglish=["Manipur","violence","riots"];
const wordsHindi=["मणिपुर","हिंसा","दंगे"];
let displayed=-1;
function haltSpeech(){clearTimeout(speechTimer);speechTimer=0;try{speechSynthesis.cancel()}catch(e){}}
function speak(){
 if(done||!started)return;
 const item=sequence[idx],group=item?.group;
 if(keywords&&["international","indian"].includes(group)&&displayed===idx){
  try{
   if(typeof SpeechSynthesisUtterance!=="undefined"&&!speechSynthesis.speaking&&!speechSynthesis.pending){
    const hindi=group==="indian",lex=hindi?wordsHindi:wordsEnglish;
    const word=new SpeechSynthesisUtterance(lex[wordNumber++%lex.length]);
    word.lang=hindi?"hi-IN":"en-IN";word.rate=1.1;word.pitch=.76;word.volume=.64;
    speechSynthesis.speak(word);
   }
  }catch(e){}
 }
 speechTimer=setTimeout(speak,850);
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
 if(entry.provider==="youtube"){
  // The YouTube player will not reliably send state events until the parent
  // registers as a listener. Load != playback: show real frames only on PLAYING.
  f.addEventListener("load",()=>{
   if(!loaded.has(n))return;
   try{f.contentWindow?.postMessage(JSON.stringify({event:"listening",id:"mp-"+n,channel:"widget"}),"https://www.youtube-nocookie.com")}catch(e){}
   command(f,"addEventListener",["onStateChange"]);
   if(n===idx||n===idx+1){command(f,"playVideo",[]);if(n===idx)setAudio();}
  },{once:true});
 }else{
  // Dailymotion is itself the real publisher player, not a thumbnail;
  // leave its own controls available if autoplay is restricted.
  f.style.pointerEvents="auto";
  f.addEventListener("load",()=>setTimeout(()=>{
   if(!loaded.has(n)||done)return;
   ready.add(n);f.closest(".mp-coda-shot")?.classList.add("video-ready");
   if(n===idx)playingAt=playingAt||performance.now();
  },950),{once:true});
 }
}
function prefetch(n){
 // One visible player plus the next player for seamless crossfade on iPad.
 for(let p=n;p<=Math.min(n+1,media.length-1);p++)load(p);
 stage.querySelectorAll(".mp-coda-shot").forEach((el,i)=>el.classList.toggle("mp-buffering",i===n+1));
 for(const p of Array.from(loaded))if(p<n-1||p>n+1){
  frames()[p]?.removeAttribute("src");
  frames()[p]?.closest(".mp-coda-shot")?.classList.remove("video-ready","mp-buffering");
  loaded.delete(p);ready.delete(p);
 }
}
function setAudio(){
 const item=media[idx];if(!item||item.provider!=="youtube")return;
 const frame=frames()[idx],play=!!(item.group==="leaders"||item.group==="rights"||(origAudio&&item.originalSound));
 command(frame,play?"unMute":"mute",[]);if(play)command(frame,"setVolume",[60]);
}
function sfxCue(key){
 if(!sfx||fired.has(key))return;fired.add(key);
 window.MANIPUR_CINEMATIC_SFX?.burst(key==="homes"?"blast":"gunfire");
 if(key==="gunfire"&&gun)try{gun.currentTime=0;gun.play().catch(()=>{})}catch(e){}
}
function reveal(n){
  if(n<0||n>=media.length)return;
  stage.querySelectorAll(".mp-coda-shot").forEach((e,k)=>e.classList.toggle("active",k===n));
  displayed=n;
  if(n===idx&&["international","indian"].includes(sequence[n].group)&&keywords&&!speechTimer)speakBegin();
}
function enter(n){
 idx=n;startedAt=performance.now();playingAt=0;
 const item=sequence[n];if(!item){finish();return;}
 stage.classList.toggle("mp-coda-dossier",item.group==="dossier");
 stage.classList.toggle("mp-coda-bridge",item.group==="parallax");
 stage.classList.toggle("mp-coda-news",!["dossier","parallax"].includes(item.group));
 if(ready.has(n))reveal(n);
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
 if(["international","indian"].includes(item.group)&&ready.has(n))speakBegin();else haltSpeech();
 // A hidden preload is paused. Send a fresh play command on scene activation.
 if(loaded.has(n)&&item.provider==="youtube"){
  command(frames()[n],"seekTo",[item.start||0,true]);
  command(frames()[n],"playVideo",[]);
 }
 if(ready.has(n))playingAt=performance.now();
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
 if(n===idx){
  reveal(n);playingAt=playingAt||performance.now();setAudio();
  if(["international","indian"].includes(media[n].group)&&keywords&&!speechTimer)speakBegin();
 }
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
 }else{
  // Cap every report to a fast cinematic cut; playback never pauses the timeline.
  const duration=item.group==="leaders"?2.55:item.group==="rights"?2.5:2.2;
  progress=Math.min(1,seconds/duration);
  if(seconds>=duration){enter(idx+1);raf=requestAnimationFrame(tick);return;}
 }
 $("mp-coda-progress").style.width=(100*(idx+progress)/sequence.length).toFixed(2)+"%";
 raf=requestAnimationFrame(tick);
}
function start(){
 if(started||done)return;
 started=true;stage.hidden=false;stage.classList.remove("mp-prewarm");priorOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
 gun=new Audio("https://commons.wikimedia.org/wiki/Special:FilePath/Gunshots_8.ogg");gun.preload="auto";gun.volume=.14;
 enter(0);raf=requestAnimationFrame(tick);
 window.MANIPUR_POSTLUDE={finished:false,played:true,edition:"fast-broadcast-sequence",sourcesCount:media.length,
  order:["International reporting","Rahul / Modi / Shah / Biren","Human Rights organizations","Indian reporting (Hindi / English / Manipuri)","Dossier","Parallax"]};
}
$("mp-coda-skip").addEventListener("click",finish);
$("mp-coda-fx").addEventListener("click",function(){sfx=!sfx;this.textContent="SFX: "+(sfx?"ON":"OFF");this.setAttribute("aria-pressed",String(sfx));window.MANIPUR_CINEMATIC_SFX?.setEnabled(sfx);if(!sfx&&gun)gun.pause();});
$("mp-coda-keywords").addEventListener("click",function(){keywords=!keywords;this.textContent="KEYWORDS: "+(keywords?"ON":"OFF");this.setAttribute("aria-pressed",String(keywords));if(keywords)speakBegin();else haltSpeech();});
$("mp-coda-voices").addEventListener("click",function(){
 origAudio=!origAudio;this.textContent="BBC / IMPACT AUDIO: "+(origAudio?"ON":"OFF");
 this.setAttribute("aria-pressed",String(origAudio));setAudio();
 if(origAudio&&media[idx]?.originalSound)haltSpeech();else if(keywords&&["international","indian"].includes(media[idx]?.group))speakBegin();
});
stage.addEventListener("pointermove",e=>{
 if(!stage.classList.contains("mp-coda-bridge"))return;
 const x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;
 // CSS individual translate composes with the existing 3D entrance animations.
 for(const [layer,mult] of [["back",-8],["mid",15],["front",30],["copy",-13]]){
  stage.style.setProperty("--mp-"+layer+"-x",(x*mult).toFixed(1)+"px");
  stage.style.setProperty("--mp-"+layer+"-y",(y*mult).toFixed(1)+"px");
 }
},{passive:true});
document.addEventListener("manipur-terminal-entered",()=>{
 if(!document.body.classList.contains("mp-terminal-ready"))return;
 document.body.classList.remove("mp-terminal-ready");document.body.classList.add("mp-terminal-revealing");
 setTimeout(()=>document.body.classList.remove("mp-terminal-revealing"),1700);
});
document.getElementById("ci-explore")?.addEventListener("click",()=>{
 window.MANIPUR_CINEMATIC_SFX?.arm?.();
 // Browser speech engines need the visitor's original Explore gesture.
 try{speechSynthesis.resume()}catch(e){}
 // Pre-connect only the first publisher player near the original film's end.
 // This preserves every scene, timing, and soundtrack in the 15-second original.
 setTimeout(()=>{
  const film=document.getElementById("ci-film"),gate=document.getElementById("ci-gate");
  if(started||done||!gate?.isConnected||!film?.classList.contains("active"))return;
  stage.hidden=false;stage.classList.add("mp-prewarm");
  const first=stage.querySelector(".mp-coda-shot");
  first?.classList.add("mp-buffering");
  load(0);
 },11700);
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
