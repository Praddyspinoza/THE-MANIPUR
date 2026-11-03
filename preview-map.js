/* Manipur preview map and evidence-linked official statement panels. 
   Map particles are deliberately NON-GEOLOCATED decorative density symbols. */
(function(){
"use strict";
const $mvEscape=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $mvYears=[...new Set(EVENTS.map(e=>String(e.date||"").slice(0,4)).filter(x=>/^20\d{2}$/.test(x)))].sort();
const $mvOptions=["all",...$mvYears];
const $mvState={year:"all",zoom:1,showHeat:true,showLabels:true,expanded:false,playing:false,timer:null};
function $mvPRNG(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function $mvHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function $mvInside(p,polys){let inside=false;for(const poly of polys){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1]) && p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit;}if(hit)inside=true;}return inside;}
function $mvMap(filter={},large=false){
 const baseFilter={...filter}; if($mvState.year!=="all")baseFilter.year=$mvState.year;
 const coords=DISTRICTS.flatMap(d=>d.polygons.flat());const xs=coords.map(p=>p[0]*.873),ys=coords.map(p=>p[1]);
 const minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys);
 const scale=Math.min(485/(maxx-minx),550/(maxy-miny)),ox=(690-(maxx-minx)*scale)/2;
 const project=p=>[ox+(p[0]*.873-minx)*scale,42+(maxy-p[1])*scale];
 const districtCount=DISTRICTS.map(d=>localEvents(d.name,baseFilter).length),maxCount=Math.max(...districtCount,1);
 const selected=$mvState.year==="all"?"ALL YEARS":$mvState.year;
 const regionShift={"Imphal East":[49,-17],"Imphal West":[-52,-12],"Thoubal":[49,16],"Bishnupur":[-56,8],"Kakching":[35,17],"Jiribam":[-31,-6],"Kangpokpi":[-8,-17],"Churachandpur":[-9,-3]};
 let paths="",edges="",heat="",dots="",labels="",defs="",outlinePaths="";
 let total=0;
 DISTRICTS.forEach((d,i)=>{
   const n=districtCount[i];total+=n;
   const polyPoints=d.polygons.map(poly=>poly.map(project));
   const path=polyPoints.map(poly=>poly.map((p,j)=>`${j?"L":"M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ")+"Z").join(" ");
   const level=n/maxCount;
   const base=n===0?"#103427":level>=.67?"#0b9252":level>=.33?"#087847":"#12623e";
   const [cx,cy]=project(d.label);
   const r=58+Math.min(72,n*7);
   const warm=level>=.74?"#ff684a":level>=.4?"#ffe954":"#a0f84e";
   defs+=`<clipPath id="mv-area-${i}"><path d="${path}"/></clipPath><radialGradient id="mv-hot-${i}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0%" stop-color="${warm}" stop-opacity="${Math.min(.96,.34+level*.62)}"/><stop offset="20%" stop-color="#fff052" stop-opacity="${Math.min(.76,.12+level*.67)}"/><stop offset="52%" stop-color="#00ec6e" stop-opacity=".42"/><stop offset="100%" stop-color="#008b46" stop-opacity="0"/></radialGradient>`;
   paths+=`<path class="mv-district-fill" d="${path}" fill="${base}" opacity=".72" data-district="${$mvEscape(d.name)}" tabindex="0" role="button" aria-label="${$mvEscape(d.name)}; ${n} indexed district-associated records; open dossier"><title>${$mvEscape(d.name)} — ${n} indexed entries</title></path>`;
   outlinePaths+=`<path d="${path}"/>`;
   edges+=`<path class="mv-border-line" d="${path}"/>`;
   if(n&&$mvState.showHeat){
     heat+=`<path class="mv-heat-patch" d="${path}" fill="url(#mv-hot-${i})" pointer-events="none"/>`;
     const rand=$mvPRNG($mvHash(d.name+"|"+selected));
     const arr=polyPoints.flat(),bx=Math.min(...arr.map(x=>x[0])),ex=Math.max(...arr.map(x=>x[0])),by=Math.min(...arr.map(x=>x[1])),ey=Math.max(...arr.map(x=>x[1]));
     let count=0,attempts=0,target=Math.min(39,4+Math.ceil(n*3.6));
     while(count<target&&attempts<target*55){attempts++;const x=bx+rand()*(ex-bx),y=by+rand()*(ey-by);if(!$mvInside([x,y],polyPoints))continue;
       const size=.7+rand()*1.65+(level>.68?rand()*1.1:0),shade=rand();
       const color=shade<.58?"#18ff72":shade<.88?"#eafe42":"#ffbe3a",delay=(-rand()*4).toFixed(2);
       dots+=`<circle class="mv-spark" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${size.toFixed(2)}" fill="${color}" style="animation-delay:${delay}s" opacity=".86" pointer-events="none"/>`;count++;
     }
   }
   if($mvState.showLabels){
     const [dx,dy]=regionShift[d.name]||[0,0];
     if(dx||dy)labels+=`<path d="M${cx},${cy}L${cx+dx*.75},${cy+dy*.75}" stroke="#93eacb" stroke-width=".85" opacity=".9" pointer-events="none"/>`;
     labels+=`<text class="mv-label map-label" x="${cx+dx}" y="${cy+dy}" text-anchor="middle" data-district="${$mvEscape(d.name)}" aria-label="Open ${$mvEscape(d.name)} district dossier">${$mvEscape(d.name)}</text>`;
     if(large)labels+=`<text class="mv-label-count" x="${cx+dx}" y="${cy+dy+13}" text-anchor="middle" pointer-events="none">${n} indexed</text>`;
   }
 });
 const zoom=$mvState.zoom,transform=`translate(345 315) scale(${zoom}) translate(-345 -315)`;
 const axisMax=$mvOptions.length-1,yearIndex=Math.max(0,$mvOptions.indexOf($mvState.year));
 return `<div class="map-frame mv-map ${large?"large":""} ${$mvState.expanded?"mv-expanded":""}" data-map-large="${large?"true":"false"}" data-map-yr="${$mvEscape($mvState.year)}">
   <div class="mv-head"><div><span class="mv-kicker">MANIPUR / GEOGRAPHIC EVIDENCE</span><strong>District impact map</strong><small>${$mvEscape(selected)} · ${total} district associations · ${DISTRICTS.length} districts</small></div><span class="mv-head-marker"><i></i> EVIDENCE VIEW</span></div>
   <div class="mv-controls" role="group" aria-label="Map layer and view controls">
      <button type="button" data-mv-action="heat" aria-pressed="${$mvState.showHeat}" aria-label="Toggle heat density layer" title="Toggle density layer">◈</button>
      <button type="button" data-mv-action="labels" aria-pressed="${$mvState.showLabels}" aria-label="Toggle district labels" title="Toggle labels">◎</button>
      <button type="button" data-mv-action="zoom-in" aria-label="Zoom map in" title="Zoom in">+</button>
      <button type="button" data-mv-action="zoom-out" aria-label="Zoom map out" title="Zoom out">−</button>
      <button type="button" data-mv-action="reset" aria-label="Reset map zoom" title="Reset zoom">⌖</button>
      <button type="button" data-mv-action="expand" aria-label="${$mvState.expanded?"Close expanded map":"Expand map"}" title="Expand map">${$mvState.expanded?"⤡":"⤢"}</button>
   </div>
   <div class="mv-mapstage">
     <svg class="map-svg mv-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 630" role="group" aria-label="Manipur district evidence map; colour depicts number of indexed district-associated records, not confirmed incident locations">
      <defs>
       <filter id="mv-terrain-filter" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".012 .018" numOctaves="3" seed="7" result="noise"/><feColorMatrix in="noise" type="matrix" values=".14 0 0 0 -.015 0 .7 0 0 -.08 0 0 .23 0 -.01 0 0 0 .87 0"/></filter>
       <filter id="mv-glow"><feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
       <clipPath id="mv-state-area">${outlinePaths}</clipPath>
       <pattern id="mv-grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#62c7a5" stroke-width=".45" opacity=".17"/></pattern>
       ${defs}
      </defs>
      <rect width="690" height="630" fill="#020c13"/>
      <rect width="690" height="630" fill="url(#mv-grid)" opacity=".34"/>
      <g transform="${transform}" class="mv-zoom-world">
        <g clip-path="url(#mv-state-area)">
           <rect x="20" y="0" width="650" height="622" fill="#071e17"/>
           <rect x="20" y="0" width="650" height="622" filter="url(#mv-terrain-filter)" class="mv-terrain" opacity=".89" pointer-events="none"/>
        </g>
        <g>${paths}</g>
        <g class="mv-hotspot-layer" pointer-events="none">${heat}${dots}</g>
        <g pointer-events="none">${edges}</g>
        <g>${labels}</g>
      </g>
      <g class="mv-compass" pointer-events="none"><text x="627" y="84">N</text><path d="M629 116V92M624 97L629 91L634 97"/></g>
      <text class="mv-map-boundary-note" x="345" y="618" text-anchor="middle">ILLUSTRATIVE BOUNDARIES / NOT A SURVEY-GRADE MAP</text>
     </svg>
   </div>
   <div class="mv-bottom"><div class="mv-rangehead"><span class="mv-legend-label">INDEXED RECORD DENSITY</span><span class="mv-zoom-readout">${Math.round(zoom*100)}% · ${$mvEscape(selected)}</span></div>
      <div class="mv-legend"><span></span><small>FEWER</small><small>MORE</small></div>
      <div class="mv-playback"><button type="button" class="mv-playbutton" data-mv-action="play" aria-label="${$mvState.playing?"Pause time-lapse":"Play time-lapse"}">${$mvState.playing?"Ⅱ":"▶"}</button><label class="mv-sr-only" for="mv-time-range">Indexed evidence year</label><input id="mv-time-range" type="range" data-mv-control="year" min="0" max="${axisMax}" step="1" value="${yearIndex}" aria-valuetext="${$mvEscape(selected)}"/><output class="mv-time-output">${$mvEscape(selected)}</output></div>
      <p class="mv-disclosure">Bright spots are illustrative texture within district boundaries, <b>not geolocated attacks or live violence forecasts.</b> Select any district to open its original dossier.</p>
   </div>
 </div>`;
}
drawMap=$mvMap;
function $mvRefresh(){
 const frames=[...document.querySelectorAll(".mv-map, .new-evidence-map")];
 frames.forEach(el=>{const large=el.dataset.mapLarge==="true"||el.classList.contains("large");const filter=state.tab==="atlas"?state.atlas:{};el.outerHTML=$mvMap(filter,large);});
}
function $mvStop(){if($mvState.timer!==null){clearInterval($mvState.timer);$mvState.timer=null;}$mvState.playing=false;}
document.addEventListener("click",event=>{
 const control=event.target.closest?.("[data-mv-action]");if(!control)return;const key=control.dataset.mvAction;
 if(key==="heat")$mvState.showHeat=!$mvState.showHeat;
 if(key==="labels")$mvState.showLabels=!$mvState.showLabels;
 if(key==="zoom-in")$mvState.zoom=Math.min(2.6,Math.round(($mvState.zoom+.3)*100)/100);
 if(key==="zoom-out")$mvState.zoom=Math.max(1,Math.round(($mvState.zoom-.3)*100)/100);
 if(key==="reset")$mvState.zoom=1;
 if(key==="expand")$mvState.expanded=!$mvState.expanded;
 if(key==="play"){
  if($mvState.playing){$mvStop();}
  else{$mvState.playing=true;$mvState.timer=setInterval(()=>{if(!document.querySelector(".mv-map")||document.hidden){$mvStop();$mvRefresh();return;}const n=$mvOptions.indexOf($mvState.year);$mvState.year=$mvOptions[(n+1)%$mvOptions.length];$mvRefresh();},1550);}
 }
 $mvRefresh();
});
document.addEventListener("input",event=>{
 if(event.target.dataset.mvControl==="year"){$mvState.year=$mvOptions[Number(event.target.value)]||"all";$mvStop();$mvRefresh();}
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&$mvState.expanded){$mvState.expanded=false;$mvRefresh();}
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)$mvStop();});
/* Names are keys to source-attributed records; a directory listing is NOT itself an attributed quote. */
const $mvAliases={
 "yumnam khemchand singh":["yumnam khemchand singh","chief minister khemchand singh","khemchand singh"],
 "govindas konthoujam":["konthoujam govindas singh","govindas konthoujam","home minister govindas konthoujam"],
 "losii dikho":["losii dikho","losii dikho singh"],
 "nemcha kipgen":["nemcha kipgen"],
 "keisham meghachandra singh":["keisham meghachandra singh","k meghachandra singh","congress leader k meghachandra","keisham meghachandra"],
 "thokchom lokeshwar singh":["thokchom lokeshwar singh","th lokeshwar singh"],
 "kangujam ranjit singh":["kangujam ranjit singh","k ranjit singh"],
 "leishiyo keishing":["leishiyo keishing"],
 "sapam ranjan singh":["sapam ranjan singh","dr sapam ranjan singh","mla sapam ranjan singh"],
 "angomcha bimol akoijam":["dr angomcha bimol akoijam","a bimol akoijam","bimol akoijam","angomcha bimol akoijam"],
 "alfred kanngam s arthur":["alfred kanngam s arthur","alfred kanngam arthur","arthur alfred kanngam s"],
 "nongthombam biren singh":["nongthombam biren singh","n biren singh","chief minister n biren singh"],
 "thounaojam basanta kumar singh":["thounaojam basanta kumar singh","th basanta kumar","education minister th basanta kumar"]
};
const $mvCanon=x=>{const n=String(x||"").toLowerCase().replace(/\([^)]*\)/g," ").replace(/\b(ias|ips|mps|dr|shri|professor)\b/g," ").replace(/[^a-z\s]/g," ").replace(/\s+/g," ").trim();for(const [key,aliases] of Object.entries($mvAliases))if(aliases.some(a=>n===a.replace(/[^a-z\s]/g," ").replace(/\s+/g," ").trim()))return key;return n;};
const $mvPublished=[
 {"person":"ksh shivakanta singh","date":"2026-04-19","summary":"At a police briefing about night protests in Imphal, said police had observed incidents involving stones, catapults and petrol bombs; urged residents to avoid violence and cooperate with law enforcement. These are his reported police assessments, not independently adjudicated findings.","publisher":"Imphal Times","url":"https://www.imphaltimes.com/news/sp-imphal-west-raises-concern-over-violent-activities-during-night-protests/amp/"},
 {"person":"pooja elangbam","date":"2026-10-27","summary":"At a Bishnupur security review, called for coordination among police and central security agencies so farmers could safely harvest crops and the coming elections could be conducted peacefully.","publisher":"The Sangai Express / DIO","url":"https://e-pao.net/GP.asp?src=27..281026.oct26"},
 {"person":"pooja elangbam","date":"2025-10-24","summary":"Discussed early rehabilitation of internally displaced families and coordinated protection for farmers harvesting in vulnerable fringe areas.","publisher":"The Sangai Express / DIO","url":"https://e-pao.net/GP.asp?src=21..251025.oct25"},
 {"person":"ksh ravikumar","date":"2026-10-27","summary":"Briefed security officials about multi-layer protection for farmers in Bishnupur's fringe areas and said district police would maintain support for harvesting activities.","publisher":"The Sangai Express / DIO","url":"https://e-pao.net/GP.asp?src=27..281026.oct26"},
 {"person":"hemant kumar","date":"2026-10-12","summary":"During a Kangpokpi election-vulnerability review, called for identifying voters and areas at risk of intimidation, field visits to build confidence, and preventive measures to ensure safe voting.","publisher":"The Sangai Express / DIO","url":"https://e-pao.net/GP.asp?src=16..131026.oct26"},
 {"person":"manoj prabhakar m","date":"2026-02-14","summary":"Praised village defence volunteers for their contribution during Manipur's prevailing law-and-order situation at a Thoubal district event.","publisher":"The Sangai Express","url":"https://e-pao.net/GP.asp?src=18..150226.feb26"},
 {person:"yumnam khemchand singh",date:"2026-08-28",summary:"Said the state's priority was lasting peace and that restoring trust requires sustained dialogue and interaction among communities.",publisher:"Akashvani News",url:"https://newsonair.gov.in/manipur-cm-yumnam-khemchand-singh-calls-for-collective-efforts-to-restore-peace-in-the-state/"},
 {person:"yumnam khemchand singh",date:"2026-09-14",summary:"Said reconciliation and free movement across communities were being pursued through dialogue; defended the BJP's response to the crisis.",publisher:"Times of India",url:"https://timesofindia.indiatimes.com/city/guwahati/bjp-did-not-create-crisis-only-party-working-for-reconciliation-in-manipur-cm/amp_articleshow/134246272.cms"},
 {person:"govindas konthoujam",date:"2026-09-14",summary:"Condemned the attacks in Tamenglong and Noney, called for accountability and said further attacks must not derail efforts towards peace.",publisher:"ThePrint / PTI",url:"https://theprint.in/india/no-act-of-violence-will-be-allowed-to-derail-manipurs-path-towards-peace-state-home-minister/3041956/"},
 {person:"govindas konthoujam",date:"2026-09-03",summary:"Told the Manipur Assembly that 306 deaths and 49 missing-person cases had been recorded through 31 August 2026; these are dated government-reported figures.",publisher:"The New Indian Express / PTI",url:"https://www.newindianexpress.com/amp/story/india/2026/Sep/03/306-killed-in-ethnic-violence-since-may-2023-manipur-home-minister-tells-assembly"},
 {person:"losii dikho",date:"2026-11-01",summary:"Condemned the killing of two young men from Taphou Kuki village and called for peace, security and coexistence with dignity.",publisher:"The Sangai Express",url:"https://www.thesangaiexpress.com/Encyc/2026/11/1/by-our-staff-reporter-imphal-nov-1-deputy-chief-minister-losii-dikho-has-stated-that-people-of-manipur-deserve.html"},
 {person:"losii dikho",date:"2026-09-06",summary:"Warned that Naga legislators could withdraw support if attacks continued, and described any such withdrawal as a step aimed at peace.",publisher:"ThePrint",url:"https://theprint.in/politics/how-can-we-survive-dy-cm-losii-dikho-says-naga-mlas-may-withdraw-support-to-manipur-govt-for-peace/3034685/"},
 {person:"nemcha kipgen",date:"2026-10-17",summary:"Appealed for improved Kuki–Naga relations and rejected hatred and violence during outreach in Kangpokpi.",publisher:"Northeast Now",url:"https://m.nenow.in/article/manipur/manipur-deputy-cm-reaches-out-to-naga-villages-in-kangpokpi-urges-peace/543215"},
 {person:"nemcha kipgen",date:"2026-04-07",summary:"Condemned the killing of two children in Bishnupur, urged restraint over firing in Ukhrul and called for dialogue and civilian protection.",publisher:"The Sangai Express",url:"https://www.thesangaiexpress.com/Encyc/2026/4/8/our-correspondent-kangpokpi-apr-7-deputy-chief-minister-nemcha-kipgen-on-tuesday-expressed-profound-grief-and-.html"},
 {person:"keisham meghachandra singh",date:"2026-09-02",summary:"Called for neutral and equal accountability, with no political protection for violence or selective justice.",publisher:"The New Indian Express / PTI",url:"https://www.newindianexpress.com/india/2026/Sep/02/govt-that-stands-above-community-interests-needed-for-manipur-cong-legislature-party-leader"},
 {person:"angomcha bimol akoijam",date:"2024-07-01",summary:"Criticised the omission of Manipur from the President's Address and drew attention to displaced people and insecurity in his Lok Sabha speech.",publisher:"Lok Sabha corrected debate",url:"https://sansad.in/getFile/debatestextmk/18/I/01.07.2024.pdf?source=loksabhadocs"},
 {person:"alfred kanngam s arthur",date:"2026-04-02",summary:"Raised a special mention in Lok Sabha seeking restoration of peace and normalcy in Manipur. The linked record verifies the parliamentary intervention; no verbatim wording is claimed here.",publisher:"PRS Legislative Research (Parliamentary activity)",url:"https://prsindia.org/mptrack/18th-lok-sabha/alfred-kanngam-s-arthur"},
 {person:"sapam ranjan singh",date:"2026-08-28",summary:"Condemned a bomb attack at his residence, questioned the motive and expressed concern about threats to civilians in residential areas.",publisher:"The Indian Express",url:"https://indianexpress.com/article/india/manipur-bjp-mla-sapam-ranjan-singh-house-bomb-blast-imphal-west-10853738/lite/"}
];
function $mvSourceLink(url,label){if(typeof url!=="string"||!/^https:\/\//.test(url))return"";return`<a href="${$mvEscape(url)}" target="_blank" rel="noopener noreferrer">${$mvEscape(label)} ↗</a>`;}
function $mvStatements(name){
 const canon=$mvCanon(name),rows=[];
 for(const q of DATA.quotes||[]){if($mvCanon(q.speaker)!==canon)continue;const src=DATA.sources.find(s=>s.id===q.source);rows.push({date:q.date,type:"DIRECT QUOTATION / "+(q.verification||"reported"),summary:`“${q.text}”`,publisher:src?.publisher||"Original indexed evidence",url:src?.url||"",context:q.context||""});}
 for(const c of DATA.claims||[]){for(const side of ["A","B"]){if($mvCanon(c["speaker"+side])!==canon)continue;const sourceIds=c["sources"+side]||[];const src=sourceIds.map(x=>DATA.sources.find(s=>s.id===x)).find(Boolean);rows.push({date:c.date,type:"INDEXED PARLIAMENTARY / ASSEMBLY SUMMARY",summary:c["position"+side],publisher:src?.publisher||c.forum||"Public record",url:src?.url||"",context:c.title});}}
 for(const r of $mvPublished){if(r.person===canon)rows.push({...r,type:"ATTRIBUTED REPORTED POSITION",context:"Secondary report; paraphrase, not a verbatim quotation."});}
 const unique=new Map();for(const r of rows){const k=r.date+"|"+r.summary;unique.set(k,r);}const out=[...unique.values()].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,14);
 if(!out.length)return`<div class="mv-no-statement"><strong>No attributable violence-related statement indexed for this name.</strong><p>This is a gap in the reviewed sources, not evidence that the official has made no public statement.</p></div>`;
 return out.map(r=>`<article class="mv-statement-item"><div class="mv-statement-meta"><span>${$mvEscape(r.type)}</span><time datetime="${$mvEscape(r.date)}">${$mvEscape(r.date)}</time></div><p>${$mvEscape(r.summary)}</p>${r.context?`<small>${$mvEscape(r.context)}</small>`:""}<div class="mv-statement-source">${$mvSourceLink(r.url,r.publisher||"Open source")}</div></article>`).join("");
}
const $mvFormerRender=renderDistrict;
renderDistrict=function(){
 $mvFormerRender();
 const p=document.querySelector("#drawer .new-official-panel");if(!p)return;
 const elements=p.querySelectorAll(".new-official > strong, .new-mla-entry strong");
 elements.forEach(node=>{const name=node.textContent.trim();if(!name||name==="Vacant")return;
   const button=document.createElement("button");button.type="button";button.className="mv-name-trigger";button.dataset.mvPerson=name;button.textContent=name;button.setAttribute("aria-label","Show source-linked statements by "+name);node.replaceWith(button);
 });
 const evidence=document.createElement("section");evidence.className="mv-person-evidence";evidence.id="mv-person-evidence";evidence.hidden=true;
 evidence.innerHTML='<div class="mv-person-head"><div><span class="mv-person-kicker">PUBLIC STATEMENT ARCHIVE</span><h4 id="mv-person-title">Select a name</h4></div><button type="button" data-mv-person-close aria-label="Close statement archive">×</button></div><div id="mv-person-results"></div>';
 p.appendChild(evidence);
 const note=document.createElement("p");note.className="mv-name-hint";note.textContent="Tap any listed officer, MLA or MP to inspect sourced statements about the violence.";p.querySelector(".new-official-header")?.appendChild(note);
};
document.addEventListener("click",event=>{
 const nameButton=event.target.closest?.("[data-mv-person]");
 if(nameButton){const panel=nameButton.closest(".new-official-panel"),e=panel?.querySelector("#mv-person-evidence");if(!e)return;
  panel.querySelectorAll(".mv-name-trigger").forEach(b=>b.setAttribute("aria-pressed",String(b===nameButton)));
  e.hidden=false;e.querySelector("#mv-person-title").textContent=nameButton.dataset.mvPerson;
  e.querySelector("#mv-person-results").innerHTML=$mvStatements(nameButton.dataset.mvPerson);
  e.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});
 }
 if(event.target.closest?.("[data-mv-person-close]")){const e=event.target.closest(".mv-person-evidence");if(e)e.hidden=true;}
});
/* Re-render the user's current route with the new map without modifying any other section. */
route();
})();