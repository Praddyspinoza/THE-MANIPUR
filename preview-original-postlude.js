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
const entries=[
{from:0,to:.87,key:"bbc",kind:"international",provider:"youtube",video:"E51qy8BIOMU",publisher:"BBC News India",date:"25 JUL 2023",title:"The lives interrupted by conflict.",text:"BBC interviews people affected by the violence and displacement.",url:"https://www.youtube.com/watch?v=E51qy8BIOMU"},
{from:.87,to:1.74,key:"dw",kind:"international",provider:"youtube",video:"cWF66nO3jGk",publisher:"DW News",date:"10 AUG 2023",title:"Thousands forced from their homes.",text:"DW documents the violence, destroyed homes and relief-camp displacement.",url:"https://www.youtube.com/watch?v=uVHRj3whZsA"},
{from:1.74,to:2.61,key:"reuters",kind:"international",provider:"youtube",video:"HU795NkpZeg",publisher:"Reuters",date:"9 AUG 2023",title:"Survivors speak about gender-based violence.",text:"Reuters documents reports of sexual violence and the Supreme Court investigation oversight.",url:"https://www.youtube.com/watch?v=NUvF4oRkJWE"},
{from:2.61,to:3.48,key:"aljazeera",kind:"international",provider:"youtube",video:"TsnvxDn4DtU",publisher:"Al Jazeera English",date:"15 JUN 2023",title:"What has driven the ethnic violence?",text:"Al Jazeera Inside Story examines displacement, conflict and questions about mediation.",url:"https://www.youtube.com/watch?v=B0kENhQibbw"},
{from:3.48,to:4.36,key:"france24",kind:"international",provider:"dailymotion",video:"x9n1kre",publisher:"FRANCE 24 English",date:"2025",title:"An ignored conflict. A divided state.",text:"FRANCE 24 examines reconciliation and displaced lives.",url:"https://www.dailymotion.com/video/x9n1kre"},
{from:4.36,to:5.24,key:"homes",kind:"conflict",provider:"youtube",video:"ge9ReWg_Poc",publisher:"NDTV",date:"15 JUN 2023",title:"Homes set on fire.",text:"Published coverage of house fires and protests in Imphal.",url:"https://www.youtube.com/watch?v=ge9ReWg_Poc"},
{from:5.24,to:6.12,key:"gunfire",kind:"conflict",provider:"youtube",video:"6XwwSFCOgLk",publisher:"NDTV",date:"26 JUL 2023",title:"Gunfire, fear and displacement.",text:"A published nighttime ground report from the conflict zone.",url:"https://www.youtube.com/watch?v=6XwwSFCOgLk"},
{from:6.12,to:7.10,key:"shelter",kind:"conflict",provider:"youtube",video:"deHnJ5DoOMw",publisher:"BBC News India",date:"23 MAY 2026",title:"Families in temporary shelter.",text:"BBC reporting on displaced civilians; audio effects are illustrative.",url:"https://www.youtube.com/watch?v=deHnJ5DoOMw"},
{from:7.10,to:10.40,key:"dossier",kind:"code"}
];
const filmDuration=10.40;
const raw=x=>String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shots=entries.filter(e=>e.kind!=="code");
const coda=document.createElement("section");coda.id="mp-coda";coda.className="mp-coda";coda.hidden=true;
coda.setAttribute("role","region");coda.setAttribute("aria-label","International news and Manipur aftermath: attributed archive montage");
const srcFor=e=>e.provider==="dailymotion"?"https://www.dailymotion.com/thumbnail/video/"+e.video:"https://i.ytimg.com/vi/"+e.video+"/hqdefault.jpg";
coda.innerHTML='<div class="mp-coda-media">'+shots.map((e,i)=>'<div class="mp-coda-shot" data-kind="'+e.kind+'" data-mp-index="'+i+'">'+
 '<div class="mp-coda-video-fallback"></div><img alt="" loading="eager" referrerpolicy="no-referrer" src="'+srcFor(e)+'">'+
 '<iframe title="'+raw(e.publisher)+' archival Manipur news footage" loading="eager" tabindex="-1" aria-hidden="true" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture"></iframe>'+
 '</div>').join("")+'</div>'+
 '<div class="mp-coda-filmgrain" aria-hidden="true"></div>'+
 '<header class="mp-coda-top"><span class="mp-coda-label">MANIPUR / DOCUMENTARY RECORD / 2023–2026</span><div><button id="mp-coda-fx" class="mp-coda-audio-control" type="button" aria-pressed="true">SFX: ON</button> <button id="mp-coda-skip" type="button">Enter terminal ↗</button></div></header>'+
 '<div class="mp-coda-text"><small id="mp-coda-over">INTERNATIONAL REPORTING</small><h2 id="mp-coda-title">Five perspectives. One unfinished conflict.</h2><p id="mp-coda-sub">Source-attributed clips; select the original to hear the complete report.</p></div>'+
 '<div class="mp-coda-credit" id="mp-coda-credit"></div>'+
 '<div class="mp-coda-codeframe" id="mp-coda-code" aria-label="Research dossier transition, decorative CIA-style 3D typography">'+
 '<div class="mp-dossier-stack"><div class="mp-code-lead">THE MANIPUR RESEARCH TERMINAL / CASE STUDY 2023–2026</div><div class="mp-code-title">MANIPUR<span style="font-family:Georgia,serif;font-size:.34em;vertical-align:top"> / 16</span></div>'+
 '<div class="mp-code-sub">IDENTITY · CONFLICT · COLLECTIVE MEMORY</div><div class="mp-code-motif">'+
 '<div class="mp-code-line" style="--delay:0ms">FILE 001 / DISTRICTS & INCIDENT GEOGRAPHY</div>'+
 '<div class="mp-code-line" style="--delay:120ms">FILE 002 / ADMINISTRATIVE RESPONSE & MEASURES</div>'+
 '<div class="mp-code-line" style="--delay:250ms">FILE 003 / DISPLACEMENT & HUMAN STORIES</div>'+
 '<div class="mp-code-line" style="--delay:360ms">FILE 004 / NGO RELIEF & INDEPENDENT MONITORING</div>'+
 '<div class="mp-code-line" style="--delay:480ms">FILE 005 / SOURCES · DATES · ACCOUNTABILITY</div></div>'+
 '<div class="mp-code-auth">AN INTELLIGENCE-STYLE VISUAL MOTIF · NOT AN ACTUAL CIA DOCUMENT</div></div></div>'+
 '<div class="mp-coda-bottom" aria-hidden="true"><span id="mp-coda-progress"></span></div>';
document.body.appendChild(coda);
const $=id=>document.getElementById(id);
let started=false,done=false,last=-1,raf=0,startAt=0,fxOn=true,fxTriggered={};
let previousOverflow='';
/* Only illustrative ambience, never the recorded sound of a Manipur incident.
   CC0 / public-domain sources are linked in credits. Real reporting videos
   remain muted; viewers may open their original sources to hear source audio. */
const FX_SOURCES={
 gun:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Gunshots_8.ogg",volume:.30},
 war:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Dragout_-_War_sounds_%28cc0%29_%28freesound%29.ogg",volume:.19},
 blast:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/Explosions-LS100150.ogg",volume:.24},
 crowd:{src:"https://sfxmint.com/dl/angry-crowd-02.mp3",volume:.125}
};
let audioReady=false;
const sound={
 assets:{},
 init(){
  if(audioReady)return; audioReady=true;
  for(const [key,info] of Object.entries(FX_SOURCES)){
   const audio=new Audio(info.src);
   audio.preload="auto";audio.loop=false;audio.volume=info.volume;
   audio.setAttribute("aria-label","Illustrative soundtrack effect");
   this.assets[key]=audio;
  }
 },
 play(name){
  if(!fxOn)return;
  this.init();
  const x=this.assets[name];if(!x)return;
  try{
   x.pause();x.currentTime=0;
   x.volume=FX_SOURCES[name].volume;
   const p=x.play();if(p&&typeof p.catch==="function")p.catch(()=>{});
  }catch(e){}
 },
 stop(){
  for(const x of Object.values(this.assets)){
   try{x.pause();x.currentTime=0;}catch(e){}
  }
 },
 prime(){
  // Called only on a real click on Explore, to unlock HTML audio when allowed.
  this.init();
  for(const x of Object.values(this.assets)){
   try{
    x.muted=true;
    const p=x.play();
    if(p&&typeof p.then==="function")p.then(()=>{x.pause();x.currentTime=0;x.muted=false;})
       .catch(()=>{x.muted=false;});
    else{x.pause();x.currentTime=0;x.muted=false;}
   }catch(e){x.muted=false;}
  }
 }
};
let embedsPrepared=false;
function loadEmbeds(){
 if(embedsPrepared)return;
 embedsPrepared=true;
 const frames=coda.querySelectorAll(".mp-coda-shot iframe");
 frames.forEach((n,i)=>{
  const e=shots[i];
  if(e.provider==="youtube")
    n.src="https://www.youtube-nocookie.com/embed/"+e.video+"?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist="+e.video+"&rel=0&modestbranding=1";
  else
    n.src="https://www.dailymotion.com/embed/video/"+e.video+"?autoplay=1&mute=1&controls=0&queue-enable=false";
 });
}
function show(index){
 if(index===last)return;last=index;
 const e=entries[index];if(!e)return;
 const isCode=e.kind==="code";
 coda.classList.toggle("mp-coda-dossier",isCode);
 coda.querySelectorAll(".mp-coda-shot").forEach(n=>n.classList.toggle("active",n.dataset.mpIndex===String(index)));
 if(!isCode){
  $("mp-coda-over").textContent=(e.kind==="international"?"INTERNATIONAL BROADCASTER":"CONFLICT / HUMAN IMPACT")+" · "+e.publisher+" · "+e.date;
  $("mp-coda-title").textContent=e.title;$("mp-coda-sub").textContent=e.text;
  $("mp-coda-credit").innerHTML='SOURCE: '+raw(e.publisher)+' · <a class="mp-coda-archive-link" href="'+e.url+'" target="_blank" rel="noopener noreferrer">VIEW ORIGINAL REPORT ↗</a>'+
  '<small class="mp-coda-archive-note">Archived publisher footage. Embedded streams are muted and may be blocked by the provider.</small>'+
  (e.kind==="conflict"?'<small class="mp-coda-archive-note">ILLUSTRATIVE AUDIO — simulated firearm and blast effects and synthetic crowd shouting; NOT sound recorded during any Manipur incident. Open the publisher report for original audio.</small>':'');
 }
 // The houses and gunfire scenes carry louder weapon and explosion effects,
 // with a restrained, explicitly synthetic crowd-shouting layer.
 // Crying infants are deliberately no longer used.
 if(e.key==="homes"&&!fxTriggered.homes){
  fxTriggered.homes=true;sound.play("crowd");sound.play("blast");
 }
 if(e.key==="gunfire"&&!fxTriggered.gunfire){
  fxTriggered.gunfire=true;sound.play("gun");sound.play("war");
 }
 if(e.key==="shelter"&&!fxTriggered.shelter){
  fxTriggered.shelter=true;sound.stop(); // leave displaced families' scene silent
 }
 if(e.key==="dossier")sound.stop();
}
function exit(){
 if(done)return;done=true;cancelAnimationFrame(raf);sound.stop();document.body.style.overflow=previousOverflow;
 coda.querySelectorAll("iframe").forEach(n=>{try{n.src="about:blank";}catch(e){}});
 coda.remove();window.MANIPUR_POSTLUDE={finished:true,played:started,sources:shots.map(e=>({publisher:e.publisher,date:e.date,url:e.url}))};
}
function step(now){
 if(done)return;
 const sec=(now-startAt)/1000;
 let i=entries.findIndex(e=>sec>=e.from&&sec<e.to);
 if(i<0)i=entries.length-1;
 show(i);
 $("mp-coda-progress").style.width=Math.min(100,100*sec/filmDuration).toFixed(2)+"%";
 if(sec>=filmDuration){exit();return;}
 raf=requestAnimationFrame(step);
}
function start(){
 if(started||done)return;
 started=true;coda.hidden=false;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 loadEmbeds();sound.init();
 $("mp-coda-skip").addEventListener("click",exit,{once:true});
 $("mp-coda-fx").addEventListener("click",()=>{
  fxOn=!fxOn;$("mp-coda-fx").textContent="SFX: "+(fxOn?"ON":"OFF");
  $("mp-coda-fx").setAttribute("aria-pressed",String(fxOn));
  if(!fxOn)sound.stop();
 });
 startAt=performance.now();show(0);raf=requestAnimationFrame(step);
 window.MANIPUR_POSTLUDE={finished:false,played:true,sourceCount:shots.length,internationalHouses:5,durationSeconds:filmDuration};
}
/* Prepare CC0 sound cues under the existing Explore-button gesture.
   Keep them muted and paused until the final archival scenes. */
document.getElementById("ci-explore")?.addEventListener("click",function(){
 loadEmbeds();
 sound.init();
 sound.prime();
});
const monitor=new MutationObserver(function(mutations){
 for(const m of mutations){
  for(const n of m.removedNodes){
   if(n.nodeType!==1||n.id!=="ci-gate")continue;
   monitor.disconnect();
   const percent=parseFloat(n.querySelector("#ci-progress")?.style.width||"0");
   if(percent>=99.9)start();else coda.remove();
   return;
  }
 }
});
monitor.observe(document.body,{childList:true});
const card=document.getElementById("ci-credits")?.querySelector(".ci-credits-card");
if(card){
 const sec=document.createElement("section");
 sec.innerHTML='<h3>Global reporting and final sound effects</h3><p>These are dated, directly linked broadcaster reports, not live pictures from November 2026. Sound effects are illustrative and should not be mistaken for original incident recordings.</p><ol>'+
 shots.map(e=>'<li>'+raw(e.publisher)+' · '+raw(e.date)+' — <a href="'+e.url+'" target="_blank" rel="noopener noreferrer">'+raw(e.title)+'</a></li>').join("")+
 '</ol><p>Sound design is illustrative, not original sound from Manipur violence. Public-domain/CC0 sources: <a href="https://commons.wikimedia.org/wiki/File:Gunshots_8.ogg" target="_blank" rel="noopener noreferrer">simulated gunshots (aradlaw, public domain)</a>; <a href="https://commons.wikimedia.org/wiki/File:Dragout_-_War_sounds_(cc0)_(freesound).ogg" target="_blank" rel="noopener noreferrer">simulated war sounds (Dragout, CC0)</a>; <a href="https://commons.wikimedia.org/wiki/File:Explosions-LS100150.ogg" target="_blank" rel="noopener noreferrer">festival explosions (Fg2, public domain)</a>; <a href="https://sfxmint.com/sounds/angry-crowd" target="_blank" rel="noopener noreferrer">AI-generated crowd shouting (SFXMint, CC0)</a>. Child-crying sound effects are not used.</p>';
 card.appendChild(sec);
}
})();
