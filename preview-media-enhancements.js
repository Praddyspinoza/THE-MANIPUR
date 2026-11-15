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
{from:5.56,to:6.44,id:"pH9jNjc6ii0",publisher:"Cultural documentary archive",date:"2016",kind:"MANIPUR / CULTURAL PERFORMANCE",title:"Pung Cholom · Manipur's drum tradition",detail:"Cultural performance footage (verify archival embed at source).",url:"https://www.youtube.com/watch?v=pH9jNjc6ii0",start:0},
{from:8.00,to:8.77,id:"0bC6x9fJXhk",publisher:"Aaj Tak (Hindi)",date:"27 JUL 2023",kind:"INDIAN MEDIA / HINDI",title:"मणिपुर: हिंसा और सुरक्षा",detail:"Hindi reporting on Manipur violence and security responses.",url:"https://www.youtube.com/watch?v=0bC6x9fJXhk",start:0},
{from:8.77,to:9.52,id:"RQK9uqZv1To",publisher:"NDTV (English)",date:"11 JUL 2023",kind:"INDIAN MEDIA / ENGLISH",title:"Conflict zones and displaced families",detail:"An NDTV field report on continuing violence and separated communities.",url:"https://www.youtube.com/watch?v=RQK9uqZv1To",start:0},
{from:9.52,to:10.13,id:"QKBNuJNvuCI",publisher:"Sansad TV",date:"9 AUG 2023",kind:"RAHUL GANDHI / LOK SABHA",title:"Rahul Gandhi on Manipur",detail:"Official parliamentary recording; portions later expunged from proceedings.",url:"https://www.youtube.com/watch?v=QKBNuJNvuCI",start:1200},
{from:10.13,to:10.75,id:"dlCQ4YtUvwo",publisher:"Narendra Modi / Official",date:"10 AUG 2023",kind:"NARENDRA MODI / LOK SABHA",title:"Prime Minister on peace in Manipur",detail:"Original no-confidence debate; Manipur chapter begins around 1:32:00.",url:"https://www.youtube.com/watch?v=dlCQ4YtUvwo&t=5520s",start:5520},
{from:10.75,to:11.36,id:"jQlW3qS21kI",publisher:"The Indian Express / ANI",date:"1 JUL 2023",kind:"N. BIREN SINGH / THEN CM",title:"The chief minister on the violence",detail:"His contemporaneous account in a recorded 2023 interview.",url:"https://www.youtube.com/watch?v=jQlW3qS21kI",start:0},
{from:11.36,to:11.96,id:"6DnRaWikqlU",publisher:"Sansad TV",date:"9 AUG 2023",kind:"AMIT SHAH / UNION HOME MINISTER",title:"Home Minister addresses Manipur",detail:"Original full parliamentary remarks, not a cropped viral clip.",url:"https://www.youtube.com/watch?v=6DnRaWikqlU",start:4440}
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
/* Only reveal a remote video once the YouTube player confirms PLAYING.
   An iframe load event alone is not sufficient; it often means a blank shell. */
window.addEventListener("message",event=>{
 if(event.origin!=="https://www.youtube-nocookie.com"&&event.origin!=="https://www.youtube.com")return;
 let data=event.data;
 try{if(typeof data==="string")data=JSON.parse(data);}catch(e){return;}
 if(!data||data.event!=="onStateChange"||Number(data.info)!==1)return;
 const frames=document.querySelectorAll("#fm-montage .fm-cell iframe");
 frames.forEach(frame=>{
  if(frame.contentWindow!==event.source)return;
  const cell=frame.closest(".fm-cell");
  if(cell?.classList.contains("active"))cell.classList.add("video-ready");
 });
});
const creditLink=(s)=>'<span>'+s.publisher+' · '+s.date+' · <a href="'+s.url+'" target="_blank" rel="noopener noreferrer">VIEW ORIGINAL VIDEO ↗</a></span>';
let playing=false,prepared=false,sceneNo=-1,request=0;
function preparedFrames(){
 if(prepared)return;
 prepared=true;
 // One live player at a time: seven simultaneous 1080p embeds can starve iPad
 // memory and network bandwidth, leaving all frames blank. The original
 // publisher thumbnail remains visible beneath each player as a fallback.
}
let liveFrame=-1;
function activateFrame(index){
 if(index===liveFrame)return;
 box.querySelectorAll(".fm-cell").forEach(cell=>cell.classList.remove("video-ready"));
 if(liveFrame>=0){
  const previous=box.querySelectorAll("iframe[data-fm-vid]")[liveFrame];
  if(previous)previous.removeAttribute("src");
 }
 liveFrame=index;
 if(index<0)return;
 const frame=box.querySelectorAll("iframe[data-fm-vid]")[index];
 if(!frame)return;
 const item=segments[index];
 frame.src="https://www.youtube-nocookie.com/embed/"+item.id+
  "?enablejsapi=1&autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist="+item.id+
  "&rel=0&modestbranding=1&start="+(item.start||0);
}
function show(idx){
 if(idx===sceneNo)return;
 sceneNo=idx;
 const active=idx>=0;
 film.classList.toggle("fm-active",active);
 box.querySelectorAll(".fm-cell").forEach((e,k)=>e.classList.toggle("active",k===idx));
 activateFrame(idx);
 if(active){const s=segments[idx];document.getElementById("fm-over").textContent=s.kind;
 document.getElementById("fm-headline").textContent=s.title;
 document.getElementById("fm-detail").textContent=s.detail;
 document.getElementById("fm-credit").innerHTML=creditLink(s);}
}
function update(){
 if(!film.isConnected){cancelAnimationFrame(request);return;}
 const p=parseFloat(document.getElementById("ci-progress")?.style.width)||0;
 const sec=15*p/100;
 /* The opening cultural film stays intact. National-media and leader clips now
    play in the dedicated archival coda where the video can actually buffer. */
 const idx=segments.findIndex(s=>s.from<8&&sec>=s.from&&sec<s.to);
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
