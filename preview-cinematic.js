(function cinemaEntrance(){
"use strict";
if(typeof document==="undefined"||document.getElementById("ci-gate"))return;
if(new URLSearchParams(location.search).get("intro")==="0")return;
const photos=[
["4 Loktak lake Manipur India.jpg","ch_15march","CC BY 2.0"],
["Sangai Brow-antlered Deer Rucervus eldii eldii Manipur by Dr. Raju Kasambe (1).jpg","Dr Raju Kasambe (Manipur Zoological Garden)","CC BY-SA 4.0"],
["Lake atop Phangrei hill (50100576178).jpg","shankar s.","CC BY 2.0"],
["Ima Market, imphal.jpeg","PP Yoonus","CC BY-SA 3.0"],
["City of Imphal.jpg","Ritezh Thoudam","CC BY-SA 3.0"],
["Lai haraoba.JPG","Akkkanksha","CC BY-SA 3.0"],
["Imphal city.jpg","Achumbani","CC BY-SA 3.0"],
["Imphal, Manipur (84).jpeg","PP Yoonus","CC BY-SA 3.0"]
];
const mediaUrl=x=>"https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(x)+"?width=1280";
const mediaPage=x=>"https://commons.wikimedia.org/wiki/File:"+encodeURIComponent(x.replace(/ /g,"_"));
const shots=[
{t:0,i:0,over:"LOKTAK LAKE",title:"The water remembers.",sub:"A living landscape before it becomes a headline.",phase:"land"},
{t:1.35,i:1,over:"THE SANGAI",title:"A rare life.",sub:"An enduring symbol of Manipur's ecological inheritance.",phase:"land"},
{t:2.65,i:2,over:"THE HILLS",title:"Many histories. One land.",sub:"Landscapes, languages and communities.",phase:"land"},
{t:4,i:3,over:"IMA KEITHEL",title:"A market run by mothers.",sub:"The rhythms of everyday life.",phase:"daily"},
{t:4.8,i:4,over:"FOOTBALL / SYMBOLIC",title:"A field of possibility.",sub:"Sport, ambition and ordinary afternoons.",phase:"daily",symbol:"field"},
{t:5.6,i:5,over:"DANCE & CULTURE",title:"A culture that moves.",sub:"Performance, memory and the stories passed on.",phase:"daily"},
{t:6.4,i:7,over:"STUDENTS",title:"A generation becoming.",sub:"Dreams, classrooms and unfinished journeys.",phase:"daily",symbol:"school"},
{t:7.2,i:6,over:"IMPHAL STREETS",title:"The lives between events.",sub:"The ordinary matters to those who live it.",phase:"daily"},
{t:8,i:null,over:"HEADLINES / ARCHIVAL CONTEXT",title:"When the headlines change.",sub:"Violence, displacement and competing claims. Sources matter.",phase:"rupture",symbol:"headlines"},
{t:8.8,i:null,over:"COMMUNICATION BLACKOUT",title:"When connections are cut.",sub:"Internet restrictions and information gaps.",phase:"rupture",symbol:"blackout"},
{t:9.6,i:null,over:"HOMES",title:"When a home is left behind.",sub:"A symbolic depiction of displacement; not a documented site.",phase:"rupture",symbol:"house"},
{t:10.4,i:null,over:"RELIEF CAMPS",title:"Life in temporary shelter.",sub:"Symbolic illustration. Read first-person accounts in the archive.",phase:"rupture",symbol:"camp"},
{t:11.18,i:null,over:"DISTRICTS / GEOGRAPHY",title:"Boundaries are not belonging.",sub:"District outlines are real; separation is a metaphor, not a frontline.",phase:"rupture",symbol:"map"},
{t:12,i:null,over:"",title:"",sub:"",phase:"black"}
];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const starHtml=Array.from({length:130},(_,k)=>{
 const h=(n)=>{const x=Math.sin(k*97.137+n*28.659)*9218.271;return x-Math.floor(x);};
 return '<i class="ci-star" style="--x:'+(h(1)*100).toFixed(1)+'%;--y:'+(h(2)*100).toFixed(1)+'%;--s:'+(0.5+h(3)*1.8).toFixed(1)+'px;--a:'+(0.18+h(4)*.72).toFixed(2)+';--d:'+(2+h(5)*9).toFixed(1)+'s;--delay:-'+(h(6)*9).toFixed(1)+'s"></i>';
}).join("");
const gate=document.createElement("div");gate.className="ci-gate";gate.id="ci-gate";gate.setAttribute("role","region");gate.setAttribute("aria-label","Manipur cinematic entrance");
gate.innerHTML=`
<div class="ci-starfield" aria-hidden="true">${starHtml}</div>
<header class="ci-top"><div class="ci-brand"><span class="ci-brand-mark">M</span><span>MANIPUR <small style="display:block;letter-spacing:.12em;color:#8293a5">AN EVIDENCE TERMINAL</small></span></div><div class="ci-top-actions"><button type="button" class="ci-top-btn" id="ci-credits-open">Credits</button><button type="button" class="ci-top-btn" id="ci-skip">Skip intro ↗</button></div></header>
<section class="ci-screen active" id="ci-s1"><div class="ci-pretitle">MANIPUR / THE PROLOGUE</div><h1 id="ci-h1" class="ci-gate-h1 ci-chrome">MANIPUR</h1><div class="ci-main-choices"><button type="button" class="ci-line ci-chrome" data-ci-enter>A land divided, a story unfinished.</button><button type="button" class="ci-line ci-chrome" data-ci-enter>The cost of being forgotten.</button></div><p class="ci-microcopy">Select either line to continue</p></section>
<section class="ci-screen" id="ci-s2" hidden><div class="ci-thesis-spark"></div><p class="ci-pretitle">THE LAND / THE PEOPLE / THE UNFINISHED WORK</p><div class="ci-thesis"><h2 class="ci-thesis-copy ci-chrome">Beyond the headlines lies Manipur.<span class="ci-accent">A paradigmatic case of identity, conflict, and collective memory.</span></h2></div><button type="button" class="ci-explore" id="ci-explore">Explore the reality ↗</button><p class="ci-microcopy">15-second visual prologue · Sound optional</p></section>
<section class="ci-film" id="ci-film" hidden><div class="ci-film-visual" id="ci-film-visual"><div class="ci-failed"></div></div><div class="ci-film-tint"></div><div class="ci-film-top"><span>MANIPUR / THE PROLOGUE</span><div class="ci-film-actions"><button type="button" id="ci-audio" aria-pressed="true">Sound on</button><button type="button" id="ci-fast-forward">Skip film ↗</button></div></div><div class="ci-film-body" id="ci-film-body"><div class="ci-film-year" id="ci-scene-label"></div><h2 class="ci-film-caption ci-chrome" id="ci-scene-title"></h2><p class="ci-film-detail" id="ci-scene-sub"></p></div><div class="ci-film-final"><h2 class="ci-chrome">What happens when a place becomes a conflict?</h2><small>A QUESTION, NOT A CONCLUSION</small></div><div class="ci-film-source" id="ci-scene-credit"></div><div class="ci-film-progress" aria-hidden="true"><span id="ci-progress"></span></div></section>
<div class="ci-credits" id="ci-credits" role="dialog" aria-modal="true" aria-label="Film credits" hidden><div class="ci-credits-card"><h3>Film & image credits</h3><p>Manipur photographs come from independently licensed Wikimedia Commons files and link directly to their original file pages. Cropping and motion treatments are used for the cinematic montage. The conflict imagery after 8 seconds is symbolic illustration, not footage of a particular attack. No pictured person is presented as a victim.</p><ol>${photos.map(p=>'<li><a href="'+mediaPage(p[0])+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(p[0])+'</a> — '+escapeHtml(p[1])+' / '+escapeHtml(p[2])+'; reframed for this film.</li>').join("")}</ol><p>Sound: <strong>original synthesized bowed-string score</strong>, not an actual Pena recording. There is no claim that a traditional instrumentalist recorded or endorsed this experience. The evidence archive, linked sources and historic event dates are separate from this editorial introduction.</p><button type="button" id="ci-credits-close">Close credits</button></div></div>
<div class="ci-bottom" id="ci-bottom">HUMAN STORIES · CONTEXT · ACCOUNTABILITY</div>`;
document.body.appendChild(gate);document.body.classList.add("ci-locked");
const el=id=>document.getElementById(id);
let playing=false,startAt=0,rafId=0,sceneNo=-1,muted=false,currentTime=0,creditsUp=false,focusBefore=null;
const audio={ctx:null,bus:null,nodes:[],active:false};
function audioStop(){
 if(!audio.ctx)return;
 const now=audio.ctx.currentTime;
 try{audio.bus?.gain.setTargetAtTime(.0001,now,.07)}catch(e){}
 const nodes=audio.nodes.splice(0);
 nodes.forEach(n=>{try{n.stop(now+.23)}catch(e){}});
 audio.active=false;
}
function audioStart(){
 if(muted)return;
 try{
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  if(!audio.ctx)audio.ctx=new C();
  const c=audio.ctx;c.resume();
  const bus=c.createGain();bus.gain.setValueAtTime(.001,c.currentTime);bus.gain.exponentialRampToValueAtTime(.085,c.currentTime+.3);bus.connect(c.destination);audio.bus=bus;
  const drone=c.createOscillator();drone.type="sine";drone.frequency.setValueAtTime(98,c.currentTime);
  drone.connect(bus);drone.start();audio.nodes.push(drone);
  const string=c.createOscillator();string.type="sawtooth";
  const filt=c.createBiquadFilter();filt.type="lowpass";filt.frequency.value=620;
  const voice=c.createGain();voice.gain.value=.09;
  string.connect(filt);filt.connect(voice);voice.connect(bus);string.start();audio.nodes.push(string);
  const notes=[196,220,174.61,196,246.94,220,196,174.61,196,220,164.81,196,220,174.61,196,146.83];
  notes.forEach((note,i)=>{const at=c.currentTime+i*.46;string.frequency.setTargetAtTime(note,at,.08);filt.frequency.setTargetAtTime(680+i%3*130,at,.06);voice.gain.setValueAtTime(.08,at);voice.gain.linearRampToValueAtTime(.21,at+.09);voice.gain.exponentialRampToValueAtTime(.06,at+.39);});
  audio.active=true;
 }catch(e){audio.active=false;el("ci-audio").textContent="Sound unavailable"}
}
function tenseSound(){
 if(audio.active&&audio.ctx){try{audio.bus.gain.setTargetAtTime(.018,audio.ctx.currentTime,.36);for(const n of audio.nodes)n.frequency.setTargetAtTime(75,audio.ctx.currentTime,.7);}catch(e){}}
}
function iconMarkup(type){
 if(type==="field")return '<svg style="position:absolute;right:10%;top:22%;width:44%;height:53%;opacity:.75;filter:drop-shadow(0 0 22px #d9e4f755);transform:perspective(450px) rotateX(27deg) rotateZ(-8deg)" viewBox="0 0 300 170"><rect x="2" y="2" width="296" height="166" fill="#10201985" stroke="#eef3fa" stroke-width="3"/><path d="M150 2V168M2 44H36V125H2M298 44H264V125H298" stroke="#fff" stroke-width="2" fill="none"/><circle cx="150" cy="85" r="31" fill="none" stroke="#fff" stroke-width="2"/></svg>';
 if(type==="school")return '<div style="position:absolute;right:12%;top:26%;font:120px Georgia,serif;color:#f5f5f5;opacity:.2">✦</div>';
 if(type==="headlines")return '<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;background:radial-gradient(ellipse,#152331,#010305 72%);color:#dae1eb;font:clamp(15px,2.5vw,34px)/2 ui-monospace,monospace;letter-spacing:.1em"><div>REPORTS OF VIOLENCE<br><span style="border-top:1px solid #bbc7d5aa">DISPLACEMENT · CONTESTED CLAIMS</span><br>THE ARCHIVE IS NOT A HEADLINE</div></div>';
 if(type==="blackout")return '<div style="position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(ellipse,#18202d,#010304 65%);color:#c8d3e2;font:clamp(21px,3vw,46px) Georgia,serif;text-align:center">NO SIGNAL<br><small style="font:10px ui-monospace,monospace;letter-spacing:.3em">SYMBOLIC</small></div>';
 if(type==="house")return '<div style="position:absolute;inset:0;display:grid;place-items:center;background:#080c11"><svg width="260" height="155" viewBox="0 0 260 155" stroke="#aebbc8" stroke-width="2.4" fill="none"><path d="M25 80L130 7L235 80V146H25Z"/><path d="M101 146V98H159V146"/><path d="M25 80H235" stroke-dasharray="7 6"/></svg></div>';
 if(type==="camp")return '<div style="position:absolute;inset:0;display:grid;place-items:center;background:#080b11"><svg width="340" height="170" viewBox="0 0 340 170" stroke="#9caabc" stroke-width="2" fill="none"><path d="M7 140L60 28L113 140ZM114 140L167 28L220 140ZM221 140L274 28L327 140Z"/><path d="M60 28V140M167 28V140M274 28V140" stroke-dasharray="5 7"/></svg></div>';
 if(type==="map"){
  try{
   if(typeof DISTRICTS==="undefined")throw Error("geometry unavailable");
   const points=DISTRICTS.flatMap(d=>d.polygons.flat()),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
   const mnx=Math.min(...xs),mxx=Math.max(...xs),mny=Math.min(...ys),mxy=Math.max(...ys),scale=Math.min(320/(mxx-mnx),370/(mxy-mny));
   const path=d=>d.polygons.map(poly=>poly.map((p,j)=>(j?"L":"M")+(260+(p[0]-(mnx+mxx)/2)*scale).toFixed(2)+","+(210+((mny+mxy)/2-p[1])*scale).toFixed(2)).join(" ")+"Z").join(" ");
   return '<svg style="position:absolute;inset:10%;width:80%;height:80%;opacity:.55;filter:drop-shadow(0 0 11px #a5bbc8)" viewBox="0 0 520 420">'+DISTRICTS.map((d,i)=>'<path fill="'+(i%3===0?"#6e7882":"#1e2832")+'" stroke="#e6edf2" stroke-width=".85" d="'+path(d)+'"/>').join("")+'</svg>';
  }catch(e){return "";}
 }
 return "";
}
const photoNodes=[];
for(let i=0;i<photos.length;i++){
 const img=document.createElement("img");img.id="ci-p-"+i;img.alt="";img.decoding="async";img.loading="eager";img.src=mediaUrl(photos[i][0]);el("ci-film-visual").appendChild(img);photoNodes.push(img);
}
function scene(n){
 if(sceneNo===n)return;sceneNo=n;const s=shots[n];if(!s)return;
 const film=el("ci-film");film.classList.toggle("issue",s.phase==="rupture");film.classList.toggle("dark",s.phase==="black");
 photoNodes.forEach(img=>img.classList.remove("show"));
 if(s.i!==null){const img=photoNodes[s.i];if(img){if(img.complete&&img.naturalWidth>0)img.classList.add("show");else img.addEventListener("load",()=>{if(sceneNo===n)img.classList.add("show")},{once:true});}}
 el("ci-film-visual").querySelector(".ci-graphic")?.remove();
 if(s.symbol){const g=document.createElement("div");g.className="ci-graphic";g.style.cssText="position:absolute;inset:0;z-index:2;pointer-events:none";g.innerHTML=iconMarkup(s.symbol);el("ci-film-visual").appendChild(g);}
 el("ci-scene-label").textContent=s.over;el("ci-scene-title").textContent=s.title;el("ci-scene-sub").textContent=s.sub;
 el("ci-film-body").style.opacity=s.phase==="black"?"0":"1";
 el("ci-scene-credit").innerHTML=s.i!==null?'<a target="_blank" rel="noopener noreferrer" href="'+mediaPage(photos[s.i][0])+'">PHOTO: '+escapeHtml(photos[s.i][1])+' / '+escapeHtml(photos[s.i][2])+' ↗</a>':s.phase==="black"?"":"SYMBOLIC VISUAL · DOCUMENTARY SOURCES ARE IN THE TERMINAL";
 if(n===8)tenseSound();
 if(n===13)audioStop();
}
function finish(){
 cancelAnimationFrame(rafId);playing=false;audioStop();
 document.body.classList.remove("ci-locked");gate.remove();
 const top=document.querySelector(".topbar");if(top&&!document.getElementById("ci-replay")){const replay=document.createElement("button");replay.id="ci-replay";replay.className="motion-toggle";replay.textContent="Replay prologue";replay.type="button";replay.addEventListener("click",()=>{location.href=location.pathname+"?intro=1"+location.hash});top.appendChild(replay);}
 window.MANIPUR_CINEMA=null;
}
function tick(){
 if(!playing)return;currentTime=(performance.now()-startAt)/1000;
 let idx=0;for(let i=0;i<shots.length;i++)if(currentTime>=shots[i].t)idx=i;
 scene(idx);el("ci-progress").style.width=Math.min(100,currentTime/15*100)+"%";
 if(currentTime>=15){playing=false;setTimeout(finish,120);return;}
 rafId=requestAnimationFrame(tick);
}
function start(){
 if(playing)return;
 if(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){finish();return;}
 el("ci-s2").classList.remove("active");el("ci-s2").hidden=true;el("ci-film").hidden=false;
 requestAnimationFrame(()=>el("ci-film").classList.add("active"));
 el("ci-bottom").style.display="none";sceneNo=-1;playing=true;startAt=performance.now();
 audioStart();rafId=requestAnimationFrame(tick);el("ci-fast-forward").focus({preventScroll:true});
}
function advance(){
 const first=el("ci-s1"),next=el("ci-s2");first.classList.remove("active");first.setAttribute("aria-hidden","true");next.hidden=false;
 requestAnimationFrame(()=>next.classList.add("active"));el("ci-explore").focus({preventScroll:true});
}
function creditsOpen(){creditsUp=true;focusBefore=document.activeElement;const e=el("ci-credits");e.hidden=false;e.classList.add("show");el("ci-credits-close").focus();}
function creditsClose(){creditsUp=false;const e=el("ci-credits");e.hidden=true;e.classList.remove("show");focusBefore?.focus?.();}
gate.querySelectorAll("[data-ci-enter]").forEach(b=>b.addEventListener("click",advance));
el("ci-explore").addEventListener("click",start);el("ci-skip").addEventListener("click",finish);el("ci-fast-forward").addEventListener("click",finish);
el("ci-credits-open").addEventListener("click",creditsOpen);el("ci-credits-close").addEventListener("click",creditsClose);
el("ci-audio").addEventListener("click",()=>{muted=!muted;el("ci-audio").textContent=muted?"Sound off":"Sound on";el("ci-audio").setAttribute("aria-pressed",String(!muted));if(muted)audioStop();else if(playing)audioStart();});
gate.addEventListener("keydown",e=>{if(e.key==="Escape"){if(creditsUp)creditsClose();else finish();}if(creditsUp&&e.key==="Tab"){e.preventDefault();el("ci-credits-close").focus();}});
el("ci-s1").querySelector("[data-ci-enter]")?.focus({preventScroll:true});
window.MANIPUR_CINEMA={version:"2026-11-14",durationSeconds:15,sceneCount:shots.length,photoCount:photos.length,get currentScene(){return sceneNo},get playing(){return playing},skip:finish};
})();