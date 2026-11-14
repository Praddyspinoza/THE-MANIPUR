/* Extra postlude ONLY, shown after the unchanged classic prologue finishes normally.
   Never runs on Skip. No changes to original cinema scene/timing/sound.
   YouTube publisher embeds are archival, muted, and may be unavailable;
   source thumbnails and direct publisher links remain as verified fallback. */
(function(){
"use strict";
if(typeof document==="undefined")return;
if(new URLSearchParams(location.search).get("intro")==="0")return;
if(document.getElementById("mp-coda"))return;
const clips=[
 {id:"homes",publisher:"NDTV",date:"15 JUN 2023",title:"Homes set on fire.",text:"Reported arson and clashes in Imphal; archive footage, not a current incident.",video:"ge9ReWg_Poc",url:"https://www.youtube.com/watch?v=ge9ReWg_Poc",offset:0},
 {id:"violence",publisher:"News9",date:"27 JUL 2023",title:"Violence and its aftermath.",text:"Reported injuries, burned buses and abandoned homes.",video:"Fd7DL_PLS8A",url:"https://www.youtube.com/watch?v=Fd7DL_PLS8A",offset:0},
 {id:"camps",publisher:"BBC News Hindi",date:"13 OCT 2025",title:"Families in temporary shelter.",text:"Ground reporting with displaced people living in Manipur relief camps.",video:"iTcZspEC0Ds",url:"https://www.youtube.com/watch?v=iTcZspEC0Ds",offset:0}
];
const coda=document.createElement("section");
coda.id="mp-coda";coda.className="mp-coda";coda.hidden=true;
coda.setAttribute("role","region");
coda.setAttribute("aria-label","Four-second sourced archival aftermath montage");
coda.innerHTML='<div class="mp-coda-media">'+clips.map((c,i)=>
 '<div class="mp-coda-shot" data-shot="'+i+'">'+
 '<img loading="eager" alt="" referrerpolicy="no-referrer" src="https://i.ytimg.com/vi/'+c.video+'/hqdefault.jpg">'+
 '<iframe data-publisher-video="'+c.video+'" title="Archive video: '+c.publisher+' — '+c.title+'" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" loading="eager" aria-hidden="true" tabindex="-1"></iframe>'+
 '</div>').join("")+'</div>'+
 '<div class="mp-coda-filmgrain" aria-hidden="true"></div>'+
 '<header class="mp-coda-top"><span class="mp-coda-label">ARCHIVAL NEWS FOOTAGE / MANIPUR · 2023–2025</span><button type="button" id="mp-coda-skip">Enter terminal ↗</button></header>'+
 '<div class="mp-coda-text"><small id="mp-coda-over">A DOCUMENTED HUMANITARIAN CRISIS</small><h2 id="mp-coda-title">Homes set on fire.</h2><p id="mp-coda-sub">Publisher-credited archive reporting.</p></div>'+
 '<div class="mp-coda-credit" id="mp-coda-credit"></div>'+
 '<div class="mp-coda-bottom" aria-hidden="true"><span id="mp-coda-progress"></span></div>';
document.body.appendChild(coda);
const $=id=>document.getElementById(id);
let started=false,raf=0,launch=0,last=-1,done=false,activeFrames=[];
const duration=4.35;
function display(i){
 if(i===last)return;last=i;
 const c=clips[i];
 const shots=coda.querySelectorAll(".mp-coda-shot");
 shots.forEach((n,j)=>n.classList.toggle("active",j===i));
 $("mp-coda-over").textContent=c.publisher+" / "+c.date+" / ORIGINAL REPORTAGE";
 $("mp-coda-title").textContent=c.title;
 $("mp-coda-sub").textContent=c.text;
 $("mp-coda-credit").innerHTML='SOURCE: '+c.publisher+' · '+c.date+' · <a target="_blank" rel="noopener noreferrer" href="'+c.url+'">OPEN ORIGINAL VIDEO ↗</a><br><small>Muted publisher embed where allowed. Original video still is shown if embedding is restricted.</small>';
}
function exit(){
 if(done)return;
 done=true;cancelAnimationFrame(raf);
 coda.hidden=true;
 activeFrames.forEach(n=>{try{n.src="about:blank";}catch(e){}});
 coda.remove();
 if(window.MANIPUR_POSTLUDE)window.MANIPUR_POSTLUDE.finished=true;
}
function frame(now){
 if(done)return;
 const t=(now-launch)/1000;
 const which=t<1.45?0:t<2.89?1:2;
 display(which);
 $("mp-coda-progress").style.width=Math.min(100,100*t/duration)+"%";
 if(t>=duration){exit();return;}
 raf=requestAnimationFrame(frame);
}
function start(){
 if(started)return;
 started=true;
 coda.hidden=false;
 const frames=coda.querySelectorAll("iframe[data-publisher-video]");
 frames.forEach((n,i)=>{
  const c=clips[i];
  n.src="https://www.youtube-nocookie.com/embed/"+c.video+
  "?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&start="+c.offset;
  activeFrames.push(n);
 });
 launch=performance.now();
 $("mp-coda-skip").addEventListener("click",exit,{once:true});
 display(0);
 raf=requestAnimationFrame(frame);
 window.MANIPUR_POSTLUDE={sources:clips.map(c=>({publisher:c.publisher,date:c.date,url:c.url})),durationSeconds:duration,finished:false,skip:exit};
}
const monitor=new MutationObserver(mutations=>{
 for(const mutation of mutations){
  for(const node of mutation.removedNodes){
   if(node.nodeType!==1||node.id!=="ci-gate")continue;
   monitor.disconnect();
   const bar=node.querySelector("#ci-progress");
   const percent=Number.parseFloat(bar?.style.width||"0");
   if(percent>=99.9)start();
   else coda.remove(); // user selected Skip, reduced motion or incomplete prologue
   return;
  }
 }
});
monitor.observe(document.body,{childList:true});
})();
