/* Classic preview prologue — click-anywhere, short analog-intelligence cuts,
   credited publisher video embeds and original continuous non-melodic ambience.
   No copyrighted television soundtrack is reproduced. */
(function(){
"use strict";
if(typeof document==="undefined"||document.getElementById("cx-gate"))return;
if(new URLSearchParams(location.search).get("intro")==="0")return;
const gate=document.createElement("div");
gate.className="cx-gate";gate.id="cx-gate";gate.setAttribute("role","region");gate.setAttribute("aria-label","Manipur documentary prologue");
const media=[
{id:"fire",youtube:"E51qy8BIOMU",title:"BURNED HOMES / LIVES INTERRUPTED",subtitle:"Archived reporting of destroyed homes and dispossession",publisher:"BBC News India",date:"25 JUL 2023",url:"https://www.youtube.com/watch?v=E51qy8BIOMU"},
{id:"clashes",youtube:"u46IG9Q5rCI",title:"VIOLENCE / SECURITY EVACUATIONS",subtitle:"Archived ground coverage of conflict and civilian evacuation",publisher:"NDTV",date:"06 MAY 2023",url:"https://www.youtube.com/watch?v=u46IG9Q5rCI"},
{id:"shelter",youtube:"FHNTO-GyaSE",title:"DISPLACEMENT / THE RELIEF CAMPS",subtitle:"Archived reportage of families living in temporary shelters",publisher:"NDTV",date:"08 MAY 2023",url:"https://www.youtube.com/watch?v=FHNTO-GyaSE"}
];
const clipHtml=media.map(x=>'<div class="cx-media-card" data-id="'+x.id+'"><img alt="" loading="lazy" referrerpolicy="no-referrer" src="https://i.ytimg.com/vi/'+x.youtube+'/hqdefault.jpg"><iframe title="'+x.publisher+': '+x.title+'" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" data-youtube="'+x.youtube+'"></iframe></div>').join("");
gate.innerHTML=
'<div class="cx-top"><div class="cx-sign"><b>M</b><span>MANIPUR / OBSIDIAN INTELLIGENCE DESK</span></div><div class="cx-top-actions"><button id="cx-credits-open" type="button">MEDIA CREDITS</button><button id="cx-skip" type="button">SKIP INTRO ↗</button></div></div>'+
'<section class="cx-screen" id="cx-opening" role="button" tabindex="0" aria-label="Proceed to the Manipur documentary by clicking anywhere on this screen"><p class="cx-pre">MANIPUR / THE PROLOGUE</p><h1 class="cx-title cx-chrome">MANIPUR</h1><div class="cx-choices"><div>A land divided, a story unfinished.</div><div>The cost of being forgotten.</div></div><p class="cx-micro">BEYOND THE HEADLINES / CONFLICT, LIVES, EVIDENCE</p></section>'+
'<section class="cx-screen" id="cx-thesis" hidden aria-live="polite"><p class="cx-pre">THE LAND / THE PEOPLE / THE UNFINISHED WORK</p><div class="cx-words" id="cx-words"><div class="cx-code cx-chrome" style="--delay:0ms">BEYOND THE HEADLINES</div><div class="cx-code cx-chrome" style="--delay:850ms">A PARADIGMATIC CONFLICT</div><div class="cx-code cx-chrome" style="--delay:1700ms">MANIPUR / WHAT REMAINS</div></div><p class="cx-caption">THE INTELLIGENCE IS IN THE EVIDENCE / INCIDENTS · MEASURES · PEOPLE</p></section>'+
'<section class="cx-film" id="cx-film"><div class="cx-filmbg"></div><div class="cx-signals"><pre id="cx-signal-text">/ / AUTHORIZED RESEARCH ARCHIVE      MANIPUR 2023—2026\n/ / SOURCE VALIDATION REQUIRED       INTELLIGENCE VIEW\n\n01 _ INCIDENT / 02 _ RESPONSE / 03 _ HUMAN COST\nRESEARCH FILE  //  16 DISTRICTS  //  PUBLIC EVIDENCE\n\nREPORTED █ █  VERIFIED  ░ ░  OUTCOME PENDING</pre><div id="cx-stamp" class="cx-stamp">ARCHIVE / 23</div></div>'+
'<div class="cx-media">'+clipHtml+'</div>'+
'<div class="cx-cutmask"></div><div class="cx-copy"><small id="cx-scene-label">INDEX / FILE ENTRY</small><h2 id="cx-scene-title">No single headline tells the whole story.</h2><p id="cx-scene-sub">A public record of conflict, displacement and institutional response.</p></div>'+
'<div class="cx-media-credit" id="cx-media-credit"></div><div class="cx-ending"><div><h2 class="cx-chrome">What happens when a place becomes a conflict?</h2><small>A QUESTION, NOT A CONCLUSION</small></div></div>'+
'<div class="cx-progress"><i id="cx-progress-bar"></i></div></section>'+
'<section class="cx-credits" id="cx-credits" role="dialog" aria-modal="true" aria-label="Video and audio provenance"><div class="cx-credits-panel"><h3>Media & sound provenance</h3><p>Intelligence-file animations and digital noise are original stylised effects, not real classified files. The final montage uses independently published documentary video embeds, with fallback credited thumbnails if embedding is blocked. These reports are archive material (May–July 2023), not recordings of the November 2026 incidents.</p><ol>'+
media.map(x=>'<li>'+x.publisher+', '+x.date+': <a target="_blank" rel="noopener noreferrer" href="'+x.url+'">'+x.title+'</a></li>').join("")+
'</ol><p>The continuous dark ambient drone is <b>original procedurally generated noise and synthesizer sound</b>, not the Netflix series Mindhunter soundtrack or a reproduction of its musical themes. It can be disabled at any time using the soundtrack control.</p><p>For further first-person documentary reporting, visit the terminal’s Human Stories and International / NGO Reports tabs.</p><button type="button" id="cx-credits-close">Close credits</button></div></section>';
document.body.appendChild(gate);
document.body.classList.add("cx-locked");
const q=id=>document.getElementById(id);
let stage="front",raf=0,timer=0,filmStart=0,sceneNow="",soundWanted=true,started=false;
const ambient={
ctx:null,master:null,ready:false,nodes:[],
init(){
 if(this.ready){try{this.ctx.resume();this.master.gain.setTargetAtTime(soundWanted?.033:0,this.ctx.currentTime,.09);}catch(e){}return;}
 try{
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  const c=new C();this.ctx=c;
  const master=c.createGain();master.gain.value=.0001;master.connect(c.destination);this.master=master;
  const noiseBuffer=c.createBuffer(1,Math.floor(c.sampleRate*3),c.sampleRate);
  const data=noiseBuffer.getChannelData(0);let z=0;
  for(let i=0;i<data.length;i++){z=(z+((Math.random()*2-1)-z)*.018);data[i]=z*.28;}
  const noise=c.createBufferSource();noise.buffer=noiseBuffer;noise.loop=true;
  const filter=c.createBiquadFilter();filter.type="lowpass";filter.frequency.value=260;filter.Q.value=.7;
  const hiss=c.createGain();hiss.gain.value=.28;noise.connect(filter);filter.connect(hiss);hiss.connect(master);noise.start();this.nodes.push(noise);
  const oscA=c.createOscillator();oscA.type="sine";oscA.frequency.value=49.2;
  const oscB=c.createOscillator();oscB.type="triangle";oscB.frequency.value=73.1;
  const gA=c.createGain();gA.gain.value=.23;const gB=c.createGain();gB.gain.value=.045;
  oscA.connect(gA);oscB.connect(gB);gA.connect(master);gB.connect(master);oscA.start();oscB.start();this.nodes.push(oscA,oscB);
  const lfo=c.createOscillator();lfo.type="sine";lfo.frequency.value=.115;
  const amount=c.createGain();amount.gain.value=115;lfo.connect(amount);amount.connect(filter.frequency);lfo.start();this.nodes.push(lfo);
  c.resume();master.gain.setTargetAtTime(soundWanted?.033:0,c.currentTime,.14);this.ready=true;
 }catch(e){soundWanted=false;updateToggle();}
},
set(enabled){
 soundWanted=enabled;updateToggle();
 if(enabled)this.init();
 if(this.ready){try{this.master.gain.setTargetAtTime(enabled?.033:0,this.ctx.currentTime,.14);}catch(e){}}
},
ping(freq){
 if(!this.ready||!soundWanted)return;
 try{
 const c=this.ctx,o=c.createOscillator(),g=c.createGain(),t=c.currentTime;
 o.type="square";o.frequency.setValueAtTime(freq,t);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.002,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.13);
 o.connect(g);g.connect(this.master);o.start(t);o.stop(t+.14);
 }catch(e){}
}
};
const toggle=document.createElement("button");
toggle.id="cx-ambient-toggle";toggle.type="button";toggle.className="cx-ambient";toggle.setAttribute("aria-label","Turn background ambient sound off");
document.body.appendChild(toggle);
function updateToggle(){toggle.dataset.on=String(soundWanted);toggle.setAttribute("aria-pressed",String(soundWanted));toggle.setAttribute("aria-label",soundWanted?"Turn background ambient sound off":"Turn background ambient sound on");toggle.innerHTML='<i></i> AMBIENT / '+(soundWanted?"ON":"OFF");}
updateToggle();
toggle.addEventListener("click",()=>ambient.set(!soundWanted));
function credits(open){
 q("cx-credits").classList.toggle("open",!!open);
 if(open)q("cx-credits-close").focus();
}
q("cx-credits-open").addEventListener("click",()=>credits(true));
q("cx-credits-close").addEventListener("click",()=>credits(false));
q("cx-credits").addEventListener("click",e=>{if(e.target===q("cx-credits"))credits(false);});
function finish(){
 clearTimeout(timer);cancelAnimationFrame(raf);stage="terminal";q("cx-film").classList.remove("on");
 gate.hidden=true;gate.remove();document.body.classList.remove("cx-locked");
 const top=document.querySelector(".topbar");
 if(top&&!q("cx-replay")){const b=document.createElement("button");b.className="motion-toggle";b.id="cx-replay";b.type="button";b.textContent="Replay prologue";b.addEventListener("click",()=>{location.href=location.pathname+"?intro=1"+location.hash;});top.appendChild(b);}
 window.MANIPUR_CINEMA={edition:"classic-recut",hasOriginalAmbient:true,clipCount:media.length,replay:()=>{location.href=location.pathname+"?intro=1"+location.hash;}};
}
q("cx-skip").addEventListener("click",()=>{ambient.init();finish();});
function startMedia(){
 media.forEach(m=>{
  const f=gate.querySelector('.cx-media-card[data-id="'+m.id+'"] iframe');
  if(f&&!f.src)f.src="https://www.youtube-nocookie.com/embed/"+m.youtube+"?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist="+m.youtube+"&rel=0&modestbranding=1";
 });
}
const filmShots=[
 {at:0,phase:"declassified",label:"RESEARCH FILE / 2023–2026",title:"A place is more than its headlines.",sub:"Track original sources, lived experiences and contested claims.",stamp:"RESTRICTED / 23"},
 {at:1.2,phase:"intercept",label:"DISTRICTS / VERIFIED GEOGRAPHY",title:"Sixteen districts. Thousands of lives.",sub:"A research map. Not a simulation of attack coordinates.",stamp:"SOURCE / REQUIRED"},
 {at:2.35,phase:"headlines",label:"CAUSE / CONSEQUENCE / ACCOUNTABILITY",title:"Question every claim.",sub:"Documented action, announced plans and observed outcomes must remain distinct.",stamp:"CHECK / 26"},
 {at:3.45,phase:"fire",label:"ARCHIVE / BURNED HOMES",title:"Homes, villages, livelihoods.",sub:"Archive footage from a named broadcaster, not a November 2026 live feed.",stamp:"",clip:"fire"},
 {at:4.85,phase:"clashes",label:"ARCHIVE / VIOLENCE AND SECURITY RESPONSE",title:"When violence drives people away.",sub:"Archival journalism on violence and emergency evacuation.",stamp:"",clip:"clashes"},
 {at:6.3,phase:"shelter",label:"ARCHIVE / HUMAN DISPLACEMENT",title:"Life in temporary shelter.",sub:"Reporting from the camps where families sought safety.",stamp:"",clip:"shelter"},
 {at:7.95,phase:"end",label:"",title:"",sub:"",stamp:""}
];
function renderShot(s){
 if(s.phase===sceneNow)return;
 sceneNow=s.phase;
 const film=q("cx-film");film.dataset.scene=s.phase;
 q("cx-scene-label").textContent=s.label;
 q("cx-scene-title").textContent=s.title;
 q("cx-scene-sub").textContent=s.sub;
 q("cx-stamp").textContent=s.stamp;
 ambient.ping(80+filmShots.indexOf(s)*23);
 const m=media.find(x=>x.id===s.clip);
 q("cx-media-credit").innerHTML=m?'ACTUAL PUBLISHER VIDEO / '+m.publisher+' · '+m.date+'<br><a href="'+m.url+'" rel="noopener noreferrer" target="_blank">OPEN ORIGINAL FOOTAGE ↗</a> · EMBED MAY BE BLOCKED BY PLATFORM':'';
}
function tick(t){
 if(stage!=="film")return;
 const seconds=(t-filmStart)/1000;
 let s=filmShots[0];for(let i=0;i<filmShots.length;i++){if(seconds>=filmShots[i].at)s=filmShots[i];}
 renderShot(s);
 q("cx-progress-bar").style.width=Math.min(100,seconds/9.05*100)+"%";
 if(seconds>=9.05){finish();return;}
 raf=requestAnimationFrame(tick);
}
function startFilm(){
 if(stage==="film"||stage==="terminal")return;
 clearTimeout(timer);stage="film";
 q("cx-thesis").hidden=true;q("cx-opening").hidden=true;
 q("cx-film").classList.add("on");sceneNow="";
 startMedia();filmStart=performance.now();raf=requestAnimationFrame(tick);
}
function advance(){
 if(stage==="front"){
  stage="codes";q("cx-opening").hidden=true;q("cx-thesis").hidden=false;
  ambient.init();ambient.ping(123);
  timer=setTimeout(startFilm,3230);
 }else if(stage==="codes"){startFilm();}
}
gate.addEventListener("click",e=>{
 if(e.target.closest("button,a"))return;
 if(stage==="front"||stage==="codes")advance();
});
q("cx-opening").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();advance();}});
gate.addEventListener("keydown",e=>{if(e.key==="Escape"){if(q("cx-credits").classList.contains("open"))credits(false);else finish();}});
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){q("cx-thesis").innerHTML='<h2 class="cx-chrome">Beyond the headlines lies Manipur.</h2><p class="cx-caption">A paradigmatic conflict. Open the evidence terminal to explore.</p>';q("cx-thesis").addEventListener("click",startFilm);}
})();
