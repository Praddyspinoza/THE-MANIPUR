/* MANIPUR CLASSIC PREVIEW — attribution-first archival world-news coda.
   Trigger ONLY when the original 15-second cultural prologue finishes normally.
   BBC, DW, Reuters, Al Jazeera, FRANCE 24 + NDTV and BBC conflict coverage.
   Follows with 3D evidence dossier. Nothing in this file modifies the dashboard.
   All publishers are embedded via public players; images are fallbacks for blocked embeds.
   Sound effects are openly licensed and explicitly illustrative; not footage audio.
*/
(function(){
"use strict";
if(new URLSearchParams(location.search).get("intro")==="0")return;
if(document.getElementById("mp-coda"))return;
const reports=[
{key:"dw",kind:"international",provider:"youtube",video:"wt8iw3wizL0",publisher:"DW News",date:"3 JUL 2023",title:"DW report on Manipur",url:"https://www.youtube.com/watch?v=wt8iw3wizL0"},
{key:"reuters",kind:"international",provider:"youtube",video:"xw8DUNG_ung",publisher:"Reuters",date:"28 JUL 2023",title:"Reuters: ethnic conflict in Manipur",url:"https://www.youtube.com/watch?v=xw8DUNG_ung"},
{key:"aljazeera",kind:"international",provider:"youtube",video:"TsnvxDn4DtU",publisher:"Al Jazeera English",date:"15 JUN 2023",title:"Inside Story on Manipur",url:"https://www.youtube.com/watch?v=TsnvxDn4DtU"},
{key:"rahul",kind:"leaders",provider:"youtube",video:"jtIFKIut_V0",publisher:"ThePrint / Rahul Gandhi",date:"9 AUG 2023",title:"Rahul Gandhi speaks on Manipur",url:"https://www.youtube.com/watch?v=jtIFKIut_V0"},
{key:"modi",kind:"leaders",provider:"youtube",video:"BhF9o4sDZ6k",publisher:"India Today / Narendra Modi",date:"20 JUL 2023",title:"Narendra Modi speaks on Manipur",url:"https://www.youtube.com/watch?v=BhF9o4sDZ6k"},
{key:"shah",kind:"leaders",provider:"youtube",video:"qfrsWuWT5BA",publisher:"The Indian Express / Amit Shah",date:"24 JUL 2023",title:"Amit Shah speaks on Manipur",url:"https://www.youtube.com/watch?v=qfrsWuWT5BA"},
{key:"biren",kind:"leaders",provider:"youtube",video:"3R-eHdKVJnU",publisher:"The Indian Express / N. Biren Singh",date:"19 JUL 2023",title:"N. Biren Singh speaks on Manipur",url:"https://www.youtube.com/watch?v=3R-eHdKVJnU"},
{key:"aajtak",kind:"indian",provider:"youtube",video:"cQtCqF6eygw",publisher:"Aaj Tak",date:"30 SEP 2023",title:"Hindi news bulletin on Manipur",url:"https://www.youtube.com/watch?v=cQtCqF6eygw"},
{key:"news9",kind:"indian",provider:"youtube",video:"i-2BZEdYtqU",publisher:"News9",date:"5 MAY 2023",title:"News9 on security and violence",url:"https://www.youtube.com/watch?v=i-2BZEdYtqU"},
{key:"impact",kind:"indian",provider:"youtube",video:"iS2kNb2Npj0",publisher:"Impact TV Manipur",date:"4 MAY 2023",title:"Manipuri language news bulletin",url:"https://www.youtube.com/watch?v=iS2kNb2Npj0"}
];
const VIDEO_SECONDS=71.9; // exact duration of user-supplied clip
const replacementUrl=new URL("manipur-news-replacement-72s.mp4",document.currentScript?.src || location.href).href;
const clips=[{key:"replacement72",kind:"replacement",from:0,to:VIDEO_SECONDS,text:""}];
const entries=clips.concat([
{from:VIDEO_SECONDS,to:VIDEO_SECONDS+2,key:"dossier",kind:"code"},
{from:VIDEO_SECONDS+2,to:VIDEO_SECONDS+4.6,key:"parallax",kind:"parallax"}
]);
const filmDuration=entries[entries.length-1].to;
const raw=x=>String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shots=[{key:"replacement72",kind:"replacement",publisher:"User-provided video montage",date:"",url:replacementUrl}];
const coda=document.createElement("section");coda.id="mp-coda";coda.className="mp-coda";coda.hidden=true;
coda.setAttribute("role","region");coda.setAttribute("aria-label","Manipur news compilation followed by the original editorial dossier");
coda.innerHTML='<div class="mp-coda-media"><div class="mp-coda-shot" data-kind="replacement" data-mp-index="0">'+
 '<video id="mp-coda-user-video" playsinline webkit-playsinline preload="auto" aria-label="Manipur 72-second news montage" style="position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:contain;background:#000"></video>'+
 '</div></div>'+
 '<div class="mp-coda-filmgrain" aria-hidden="true"></div>'+
 '<header class="mp-coda-top"><span class="mp-coda-label">MANIPUR / ARCHIVE FOOTAGE</span><div><button id="mp-coda-fx" class="mp-coda-audio-control" type="button" aria-pressed="true">SFX: ON</button> <button id="mp-coda-skip" type="button">ENTER TERMINAL ↗</button></div></header>'+
 '<div class="mp-coda-text" aria-hidden="true"></div><div class="mp-coda-credit" aria-hidden="true"></div>'+
 '<div class="mp-coda-codeframe" id="mp-coda-code"><div class="mp-dossier-stack">'+
 '<div class="mp-code-lead">THE MANIPUR RESEARCH TERMINAL / CASE STUDY 2023–2026</div>'+
 '<div class="mp-code-title">MANIPUR<span style="font-family:Georgia,serif;font-size:.34em;vertical-align:top"> / 16</span></div>'+
 '<div class="mp-code-sub">IDENTITY · CONFLICT · COLLECTIVE MEMORY</div><div class="mp-code-motif">'+
 '<div class="mp-code-line" style="--delay:0ms">FILE 001 / DISTRICTS & INCIDENT GEOGRAPHY</div>'+
 '<div class="mp-code-line" style="--delay:120ms">FILE 002 / ADMINISTRATIVE RESPONSE & MEASURES</div>'+
 '<div class="mp-code-line" style="--delay:250ms">FILE 003 / DISPLACEMENT & HUMAN STORIES</div>'+
 '<div class="mp-code-line" style="--delay:360ms">FILE 004 / NGO RELIEF & INDEPENDENT MONITORING</div>'+
 '<div class="mp-code-line" style="--delay:480ms">FILE 005 / SOURCES · DATES · ACCOUNTABILITY</div></div>'+
 '<div class="mp-code-auth">STYLISED INTELLIGENCE VISUAL · NOT A CLASSIFIED RECORD</div></div></div>'+
 '<section class="mp-parallax" id="mp-parallax" aria-label="Parallax interlude before opening the terminal">'+
 '<div class="mp-depth mp-depth-back"></div><div class="mp-depth mp-depth-mid"></div><div class="mp-depth mp-depth-front"></div>'+
 '<div class="mp-parallax-inner"><small>MANIPUR / EVIDENCE TERMINAL</small>'+
 '<h2>BEYOND THE<br><em>HEADLINES.</em></h2>'+
 '<p>16 DISTRICTS · RESEARCH · HUMAN STORIES</p>'+
 '<div class="mp-parallax-rule"></div><small>ENTER THE EVIDENCE DESK</small></div></section>'+
 '<div class="mp-coda-bottom" aria-hidden="true"><span id="mp-coda-progress"></span></div>';
document.body.appendChild(coda);
const $=id=>document.getElementById(id);
let started=false,done=false,last=-1,raf=0,startAt=0,fxOn=true,fxTriggered={};
let previousOverflow='';
let audioReady=false;const sound={
gun:null,child:null,
init(){
 if(audioReady)return;audioReady=true;
 this.gun=new Audio("https://commons.wikimedia.org/wiki/Special:FilePath/Gunshots_8.ogg");this.gun.preload="auto";this.gun.volume=.15;
 this.child=null; // infant crying omitted in the restorative preview mix
},
play(name){
 if(!fxOn)return;this.init();
 const x=this[name];if(!x)return;
 try{x.currentTime=0;x.play().catch(()=>{});}catch(e){}
},
stop(){
 for(const x of [this.gun,this.child])if(x){try{x.pause();x.currentTime=0;}catch(e){}}
}
};
/* The cultural prologue is never altered. Warm archive streams while it runs,
   then cut them at the approved rapid, fixed cadence without waiting for
   network callbacks. Off-screen player states may be blocked on some browsers. */
let embedsPrepared=false;const pendingTimers=[];
const video=coda.querySelector("#mp-coda-user-video");
let videoDone=false,postVideoAt=0;
function loadEmbeds(){
 if(embedsPrepared||done||!coda.isConnected)return;
 embedsPrepared=true;coda.hidden=false;coda.classList.add("mp-prewarm");
 video.src=replacementUrl;video.preload="auto";video.load();
 video.addEventListener("error",()=>{video.controls=true;console.error("The replacement video could not load:",replacementUrl);},{once:true});
}
function revealActive(index){
 const e=entries[index];
 coda.querySelector(".mp-coda-shot")?.classList.toggle("active",!!e&&e.kind!=="code"&&e.kind!=="parallax");
}
function show(index){
 if(index===last)return;last=index;
 const e=entries[index];if(!e)return;
 const code=e.kind==="code",bridge=e.kind==="parallax";
 coda.classList.toggle("mp-coda-dossier",code);
 coda.classList.toggle("mp-coda-bridge",bridge);
 coda.classList.toggle("mp-coda-news",!code&&!bridge);
 revealActive(index);
 if(index===0&&!fxTriggered.gun){fxTriggered.gun=true;window.MANIPUR_CINEMATIC_SFX?.burst("gunfire");}
 if(e.key==="aajtak"&&!fxTriggered.lastGun){fxTriggered.lastGun=true;window.MANIPUR_CINEMATIC_SFX?.burst("gunfire");}
 if(bridge){sound.stop();document.body.classList.add("mp-terminal-ready");}
}
function exit(){
 if(done)return;done=true;cancelAnimationFrame(raf);sound.stop();
 pendingTimers.forEach(clearTimeout);
 document.body.classList.add("mp-terminal-ready");
 document.body.style.overflow=previousOverflow;
 try{video.pause();video.removeAttribute("src");video.load();}catch(e){}
 coda.remove();
 window.MANIPUR_POSTLUDE={finished:true,played:started,edition:"approved-evening-fast-cuts",
  sourceCount:reports.length,sources:reports.map(e=>({publisher:e.publisher,date:e.date,url:e.url}))};
}
function step(now){
 if(done)return;
 let sec;
 if(videoDone)sec=VIDEO_SECONDS+(now-postVideoAt)/1000;
 else{
  sec=Math.max(0,Math.min(VIDEO_SECONDS,video.currentTime||0));
  if(video.ended||video.currentTime>=VIDEO_SECONDS-.045){
   videoDone=true;postVideoAt=now;sec=VIDEO_SECONDS;video.pause();
  }
 }
 let i=entries.findIndex(e=>sec>=e.from&&sec<e.to);
 if(i<0)i=entries.length-1;
 show(i);
 if(sec>=7*.96&&!fxTriggered.lastGun){fxTriggered.lastGun=true;window.MANIPUR_CINEMATIC_SFX?.burst("gunfire");}
 $("mp-coda-progress").style.width=Math.min(100,100*sec/filmDuration).toFixed(2)+"%";
 if(sec>=filmDuration){exit();return;}
 raf=requestAnimationFrame(step);
}
function start(){
 if(started||done)return;
 started=true;coda.hidden=false;
 previousOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
 loadEmbeds();coda.classList.remove("mp-prewarm");sound.init();
 $("mp-coda-skip").addEventListener("click",exit,{once:true});
 $("mp-coda-fx").addEventListener("click",()=>{
  fxOn=!fxOn;$("mp-coda-fx").textContent="SFX: "+(fxOn?"ON":"OFF");
  $("mp-coda-fx").setAttribute("aria-pressed",String(fxOn));
  window.MANIPUR_CINEMATIC_SFX?.setEnabled(fxOn);
  if(!fxOn)sound.stop();
 });
 startAt=performance.now();show(0);
 video.muted=false;video.currentTime=0;
 video.play().catch(()=>{video.controls=true;video.style.pointerEvents="auto";});
 raf=requestAnimationFrame(step);
 window.MANIPUR_POSTLUDE={finished:false,played:true,edition:"approved-evening-fast-cuts",
  sourceCount:reports.length,durationSeconds:filmDuration};
}
/* Start source-player warmup only after the visitor chooses Explore.
   The original 15-second Manipur film remains byte-for-byte unchanged. */
document.getElementById("ci-explore")?.addEventListener("click",()=>{
 window.MANIPUR_CINEMATIC_SFX?.arm?.();
 sound.init();
 pendingTimers.push(setTimeout(loadEmbeds,2300));
});
coda.addEventListener("pointermove",event=>{
 if(!coda.classList.contains("mp-coda-bridge"))return;
 const x=event.clientX/innerWidth-.5,y=event.clientY/innerHeight-.5;
 const v=(name,f)=>coda.style.setProperty("--mp-"+name+"-x",(x*f).toFixed(1)+"px");
 const w=(name,f)=>coda.style.setProperty("--mp-"+name+"-y",(y*f).toFixed(1)+"px");
 [["back",-16],["mid",30],["front",55],["copy",-26]].forEach(([name,f])=>{v(name,f);w(name,f)});
},{passive:true});
/* The original sound-consent screen owns the final entrance action.
   Reveal the existing terminal only when that screen is dismissed. */
document.addEventListener("manipur-terminal-entered",()=>{
 if(!document.body.classList.contains("mp-terminal-ready"))return;
 document.body.classList.remove("mp-terminal-ready");
 document.body.classList.add("mp-terminal-revealing");
 setTimeout(()=>document.body.classList.remove("mp-terminal-revealing"),1800);
});
const monitor=new MutationObserver(function(mutations){
 for(const m of mutations){
  for(const n of m.removedNodes){
   if(n.nodeType!==1||n.id!=="ci-gate")continue;
   monitor.disconnect();
   const percent=parseFloat(n.querySelector("#ci-progress")?.style.width||"0");
   if(percent>=99.9)start();else {done=true;pendingTimers.forEach(clearTimeout);coda.remove();}
   return;
  }
 }
});
monitor.observe(document.body,{childList:true});
const card=document.getElementById("ci-credits")?.querySelector(".ci-credits-card");
if(card){
 const sec=document.createElement("section");
 sec.innerHTML='<h3>Archive footage in the rapid news montage</h3>'+
 '<p>The user-supplied 71.9-second compilation replaces the earlier 10-player news montage. This archived source list remains available for research and is not a frame-by-frame credit list for the supplied compilation. The original cultural prologue, editorial dossier and terminal remain unchanged. Synthetic gunshot effects are illustrative, not original incident sound.</p>'+
 '<ol>'+reports.map(e=>'<li>'+raw(e.publisher)+' · '+raw(e.date)+' — <a target="_blank" rel="noopener noreferrer" href="'+e.url+'">'+raw(e.title)+'</a></li>').join("")+'</ol>';
 card.appendChild(sec);
}
})();
