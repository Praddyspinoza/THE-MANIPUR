/* Verified source playback. Manipur 2023 public remarks, one per speaker.
   No deep-faked or synthetically reproduced speech. Official Sansad TV
   and verified publisher videos play with native YouTube audio on click.
   Editorial summaries are clearly distinguished from verbatim quotes.
*/
(function(){
"use strict";
if(document.getElementById("mn-voices-overlay"))return;
const speakers=[
 {id:"rahul",name:"Rahul Gandhi",role:"Congress MP / Opposition",date:"9 August 2023",topic:"The division and violence in Manipur",source:"Sansad TV / Lok Sabha",video:"QKBNuJNvuCI",start:1851,
  summary:"In his no-confidence motion remarks, Gandhi criticised the government's response and argued that Manipur had been divided. Parts of the parliamentary record were subsequently expunged; the original Sansad TV archive is labelled accordingly.",
  quote:"You have divided Manipur into two parts.",quoteNature:"Reported speech excerpt; check original video for full context.",
  original:"https://www.youtube.com/watch?v=QKBNuJNvuCI",reading:"https://www.hindustantimes.com/india-news/rahul-gandhi-lok-sabha-speech-no-confidence-motion-manipur-violence-congresss-jairam-ramesh-101691572218266-amp.html"},
 {id:"modi",name:"Narendra Modi",role:"Prime Minister of India",date:"10 August 2023",topic:"Assurance of peace and accountability",source:"Narendra Modi / official channel",video:"dlCQ4YtUvwo",start:5520,
  summary:"During the no-confidence debate, Modi assured the House that peace would return to Manipur and discussed efforts by the Union and state governments. The video provides the full statement with original voice.",
  quote:"There will be peace again in Manipur.",quoteNature:"English rendering of the reported assurance; listen to the Hindi original.",
  original:"https://www.youtube.com/watch?v=dlCQ4YtUvwo&t=5520s",reading:"https://www.pmindia.gov.in/en/news_updates/pms-reply-to-the-no-confidence-motion-in-lok-sabha-on-10th-august-2023/"},
 {id:"biren",name:"N. Biren Singh",role:"Manipur Chief Minister in 2023",date:"1 July 2023",topic:"Chief minister's account of the unrest",source:"The Indian Express / ANI interview",video:"jQlW3qS21kI",start:0,
  summary:"Then-Chief Minister N. Biren Singh gave his account of possible causes of the violence and defended decisions taken during the crisis. The interview is attributed to its original broadcaster.",
  quote:"It seems pre-planned.",quoteNature:"Brief attributed excerpt from the published interview.",
  original:"https://www.youtube.com/watch?v=jQlW3qS21kI",reading:"https://indianexpress.com/article/india/manipur-news-live-updates-violence-security-forces-biren-singh-governor-8695400/"},
 {id:"shah",name:"Amit Shah",role:"Union Home Minister",date:"9 August 2023",topic:"No-confidence debate and responses to violence",source:"Sansad TV / Lok Sabha",video:"6DnRaWikqlU",start:0,
  summary:"Shah addressed violence and administrative action in Manipur during the Lok Sabha no-confidence debate. Use the full parliamentary footage, not the misleading 2026 out-of-context viral clip.",
  quote:"What happened in Manipur is shameful.",quoteNature:"English rendering of a published paraphrase of the statement.",
  original:"https://www.youtube.com/watch?v=6DnRaWikqlU",reading:"https://www.ptinews.com/fact-detail/edited-2023-video-of-amit-shahs-lok-sabha-speech-falsely-linked-to-manipur-situation/4255839"}
];
let overlay,frame,selected=null,returnFocus=null,open=false,lastTab="";
const escapeHTML=x=>String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function make(){
 overlay=document.createElement("section");
 overlay.id="mn-voices-overlay";overlay.className="mn-voices-overlay";overlay.hidden=true;
 overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label","2023 public statements about Manipur, original voice recordings");
 overlay.innerHTML='<div class="mn-voices-card"><div class="mn-voices-head"><div><small>2023 / PRIMARY VOICES / FOUR PUBLIC OFFICIALS</small><h2>What they actually said about Manipur.</h2><p>Recorded public remarks, with the voice of each speaker from the source video. The short summaries are editorial context, not a reconstructed audio track. Select a speaker to hear the original video with sound.</p></div><button type="button" id="mn-voices-close">✕ CLOSE</button></div>'+
 '<div class="mn-voices-layout"><div class="mn-voices-picks">'+speakers.map(s=>'<button type="button" class="mn-voices-pick" data-mn-person="'+s.id+'"><b>'+escapeHTML(s.name)+'</b><small>'+escapeHTML(s.date)+'</small><span>'+escapeHTML(s.role)+'</span></button>').join("")+'</div>'+
 '<article class="mn-voices-player"><div class="mn-voices-frame" id="mn-voices-player"></div><div class="mn-voices-info" id="mn-voices-info"></div></article></div>'+
 '<div class="mn-voices-disclaimer">No synthetic voice or fabricated quote. The selected source starts from a relevant recorded segment where a reliable location is available; otherwise the unedited recording is offered from the beginning. Publisher controls and mobile autoplay permissions apply.</div></div>';
 document.body.appendChild(overlay);
 frame=document.getElementById("mn-voices-player");
 document.getElementById("mn-voices-close").addEventListener("click",close);
 overlay.addEventListener("click",e=>{if(e.target===overlay)close();const b=e.target.closest("[data-mn-person]");if(b)select(b.dataset.mnPerson);});
 overlay.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
}
function select(id){
 const s=speakers.find(x=>x.id===id);
 if(!s)return;
 selected=s.id;
 overlay.querySelectorAll("[data-mn-person]").forEach(b=>{const active=b.dataset.mnPerson===id;b.classList.toggle("selected",active);b.setAttribute("aria-pressed",String(active));});
 frame.innerHTML='<iframe title="Original 2023 statement by '+escapeHTML(s.name)+'" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen src="https://www.youtube-nocookie.com/embed/'+s.video+'?autoplay=1&mute=0&playsinline=1&controls=1&rel=0&start='+s.start+'"></iframe>';
 document.getElementById("mn-voices-info").innerHTML='<h3>'+escapeHTML(s.name)+' · '+escapeHTML(s.topic)+'</h3>'+
 '<p><strong>'+escapeHTML(s.source)+'</strong> · '+escapeHTML(s.date)+'</p>'+
 '<p>'+escapeHTML(s.summary)+'</p>'+
 '<p><strong>Reported statement:</strong> '+escapeHTML(s.quote)+' <small>'+escapeHTML(s.quoteNature)+'</small></p>'+
 '<div class="mn-voices-links"><a href="'+s.original+'" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL WITH AUDIO ↗</a><a href="'+s.reading+'" target="_blank" rel="noopener noreferrer">CONTEXT / TRANSCRIPT ↗</a></div>';
}
function toggleAudio(off){
 // Avoid competing music. The original film soundtrack retains its own controls.
 try{
   const a=document.getElementById("manipur-personal-audio");
   if(a && !off && window.MANIPUR_LOCAL_AUDIO?.playing){a.dataset.mnWasPlaying="1";a.pause();}
   if(a && off && a.dataset.mnWasPlaying==="1"){a.removeAttribute("data-mn-was-playing");a.play().catch(()=>{});}
 }catch(e){}
}
function show(id){
 if(!overlay)make();
 if(open){if(id)select(id);return;}
 open=true;returnFocus=document.activeElement;
 lastTab=document.body.style.overflow;document.body.style.overflow="hidden";
 overlay.hidden=false;toggleAudio(false);
 select(id||selected||"rahul");
 document.getElementById("mn-voices-close").focus({preventScroll:true});
}
function close(){
 if(!open)return;open=false;
 overlay.hidden=true;frame.innerHTML="";
 document.body.style.overflow=lastTab;
 toggleAudio(true);
 if(returnFocus&&document.contains(returnFocus))returnFocus.focus({preventScroll:true});
}
function addButtons(){
 if(!document.getElementById("mn-open-voices")){
  const top=document.querySelector(".topbar");
  if(top){const b=document.createElement("button");b.type="button";b.id="mn-open-voices";b.className="mn-voices-open";b.textContent="◎ 2023 STATEMENTS / LISTEN";b.addEventListener("click",()=>show());top.appendChild(b);}
 }
 const prologue=document.getElementById("ci-gate");
 if(prologue&&!document.getElementById("mn-voices-prologue")){
  const head=prologue.querySelector(".ci-top-actions");
  if(head){const b=document.createElement("button");b.type="button";b.id="mn-voices-prologue";b.className="ci-top-btn";b.textContent="HEAR 2023 STATEMENTS";b.addEventListener("click",()=>show());head.insertBefore(b,head.firstChild);}
 }
 const post=document.getElementById("mp-coda");
 if(post&&!document.getElementById("mn-voices-postlude")){
  const nav=post.querySelector(".mp-coda-top>div");
  if(nav){const b=document.createElement("button");b.type="button";b.id="mn-voices-postlude";b.textContent="2023 VOICES / AUDIO";b.addEventListener("click",()=>show());nav.insertBefore(b,nav.firstChild);}
 }
}
addButtons();
document.addEventListener("click",e=>{const b=e.target.closest("[data-open-voice]");if(b)show(b.dataset.openVoice);});
const watch=new MutationObserver(addButtons);watch.observe(document.body,{childList:true});
window.MANIPUR_VOICES={speakers:speakers.map(x=>({name:x.name,date:x.date,source:x.source,video:x.original,context:x.reading})),open:show,close:close};
})();
