/* Media overlay for ORIGINAL cultural Manipur prologue.
   Keeps Loktak, Sangai, Ima Keithel, sport, culture, students and the original score.
   Adds source-attributed video at the dance and original headline transition.
   YouTube frames are embeds; show verified publisher thumbnails when autoplay is unavailable.
*/
(function(){
"use strict";
if(new URLSearchParams(location.search).get("intro")==="0")return;
const film=document.getElementById("ci-film"),thesis=document.getElementById("ci-s2");
if(!film||!thesis||document.getElementById("fm-montage"))return;
const segments=[
{from:5.56,to:6.44,id:"pH9jNjc6ii0",publisher:"WildFilmsIndia",date:"8 MAR 2016",kind:"CULTURE / SANGAI FESTIVAL",title:"Pung Cholom · the drums of Manipur",detail:"Documentary performance footage, not a depiction of the conflict",url:"https://www.youtube.com/watch?v=pH9jNjc6ii0"},
{from:8.00,to:8.78,id:"_dx1hsT3jFw",publisher:"NDTV India",date:"30 MAY 2023",kind:"INDIAN PRESS / HINDI",title:"मणिपुर: हिंसा और संकट",detail:"Hindi news coverage of unrest and security responses",url:"https://www.youtube.com/watch?v=_dx1hsT3jFw"},
{from:8.78,to:9.55,id:"6XwwSFCOgLk",publisher:"NDTV",date:"26 JUL 2023",kind:"INDIAN PRESS / ENGLISH",title:"The conflict, reported on the ground",detail:"NDTV journalists document nights of gunfire and displacement",url:"https://www.youtube.com/watch?v=6XwwSFCOgLk"},
{from:9.55,to:10.33,id:"HEsoct7UE5g",publisher:"Rahul Gandhi / official channel",date:"9 AUG 2023",kind:"PARLIAMENTARY STATEMENT / OPPOSITION",title:"Rahul Gandhi addresses Manipur",detail:"No-confidence-motion speech in Parliament",url:"https://www.youtube.com/watch?v=HEsoct7UE5g"},
{from:10.33,to:11.10,id:"sCHaML6lcMM",publisher:"Narendra Modi / official channel",date:"20 JUL 2023",kind:"PRIME MINISTER / STATEMENT",title:"Narendra Modi speaks on Manipur",detail:"Public condemnation of the violence against women",url:"https://www.youtube.com/watch?v=sCHaML6lcMM"},
{from:11.10,to:11.96,id:"jQlW3qS21kI",publisher:"The Indian Express / ANI",date:"1 JUL 2023",kind:"THEN-CHIEF MINISTER / STATEMENT",title:"N. Biren Singh speaks on the unrest",detail:"2023 chief minister's televised interview and analysis",url:"https://www.youtube.com/watch?v=jQlW3qS21kI"}
];
const orbit=document.createElement("div");
orbit.className="ci-orbit-system";orbit.setAttribute("aria-hidden","true");
orbit.innerHTML='<div class="ci-orbit"></div><div class="ci-orbit"></div><div class="ci-orbit"></div><div class="ci-orbit"></div>';
thesis.insertBefore(orbit,thesis.firstChild);
const box=document.createElement("div");box.id="fm-montage";box.className="fm-montage";
box.setAttribute("aria-label","Source-attributed cultural performances, Indian television news and public statements");
box.innerHTML=segments.map((s,i)=>
 '<div class="fm-cell" data-fm-index="'+i+'">'+
 '<img referrerpolicy="no-referrer" alt="" loading="eager" src="https://i.ytimg.com/vi/'+s.id+'/hqdefault.jpg">'+
 '<iframe data-fm-vid="'+s.id+'" loading="eager" referrerpolicy="strict-origin-when-cross-origin" title="Source: '+s.publisher+' - '+s.kind+'" tabindex="-1" allow="autoplay; encrypted-media; picture-in-picture" aria-hidden="true"></iframe>'+
 '</div>').join("")+
 '<div class="fm-frame"></div>'+
 '<div class="fm-archive-stamp">DATED SOURCE / ARCHIVE</div>'+
 '<div class="fm-text"><small id="fm-over" class="fm-over"></small><h2 id="fm-headline" class="fm-headline"></h2><p id="fm-detail" class="fm-description"></p></div>'+
 '<div class="fm-credit" id="fm-credit"></div>';
film.appendChild(box);
const creditLink=(s)=>'<span>'+s.publisher+' · '+s.date+' · <a href="'+s.url+'" target="_blank" rel="noopener noreferrer">VIEW ORIGINAL VIDEO ↗</a></span>';
let playing=false,prepared=false,sceneNo=-1,request=0;
function preparedFrames(){
 if(prepared)return;
 prepared=true;
 box.querySelectorAll("iframe[data-fm-vid]").forEach((frame,i)=>{
   let id=segments[i].id;
   frame.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist="+id+"&rel=0&modestbranding=1";
 });
}
function show(idx){
 if(idx===sceneNo)return;
 sceneNo=idx;
 const active=idx>=0;
 film.classList.toggle("fm-active",active);
 box.querySelectorAll(".fm-cell").forEach((e,k)=>e.classList.toggle("active",k===idx));
 if(active){const s=segments[idx];document.getElementById("fm-over").textContent=s.kind;
 document.getElementById("fm-headline").textContent=s.title;
 document.getElementById("fm-detail").textContent=s.detail;
 document.getElementById("fm-credit").innerHTML=creditLink(s);}
}
function update(){
 if(!film.isConnected){cancelAnimationFrame(request);return;}
 const p=parseFloat(document.getElementById("ci-progress")?.style.width)||0;
 const sec=15*p/100;
 const idx=segments.findIndex(s=>sec>=s.from&&sec<s.to);
 show(idx);
 request=requestAnimationFrame(update);
}
document.getElementById("ci-explore")?.addEventListener("click",()=>{
 preparedFrames();
 if(!playing){playing=true;request=requestAnimationFrame(update);}
});
const progress=new MutationObserver(()=>{
 if(film.classList.contains("active")&&!playing){playing=true;preparedFrames();request=requestAnimationFrame(update);}
});
progress.observe(film,{attributes:true,attributeFilter:["class"]});
const credits=document.getElementById("ci-credits");
if(credits){const host=credits.querySelector(".ci-credits-card");
 if(host){const p=document.createElement("section");p.innerHTML='<h3>Original broadcaster and statement footage</h3><p>Archive reports are embedded from their original publishers and muted beneath the original Manipur prologue score. A thumbnail is a fallback if streaming is restricted. Short extracts are not full accounts; open the originals for context.</p><ol>'+segments.map(s=>'<li>'+s.kind+': '+creditLink(s)+'</li>').join("")+'</ol>';
 host.appendChild(p);}
}
window.MANIPUR_CLASSIC_MEDIA={sourceCount:segments.length,segments:segments.map(({from,to,publisher,url,kind})=>({from,to,publisher,url,kind})),hasOriginalPrologue:true};
})();
