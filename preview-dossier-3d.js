/* 3D visual evidence sheets in both original prologue slides.
   These are cinematic "research code" treatments, not classified records.
   They do not modify original film, data or soundtrack. */
(function(){
"use strict";
const gate=document.getElementById("ci-gate");if(!gate)return;
const sheets=[
 {title:"MANIPUR / THE RESEARCH FILE",lines:["ORIGIN 2023  //  CHRONOLOGY 2026","INDEXED DISTRICTS: 16  //  EVENTS: ATTRIBUTED","NO FAKE COORDINATES · NO IMPLIED INCIDENT LOCATIONS","FILE / HUMAN VOICES / IMPACT / ACCOUNTABILITY"]},
 {title:"CONFLICT / INSTITUTIONAL RESPONSE",lines:["INCIDENTS : DATE + PUBLISHER + GEOGRAPHY","ADMINISTRATION : COMPLETED · ORDERED · PROPOSED","CIVIL SOCIETY : VERIFIED AID · ADVOCACY · MONITORING","CRITICAL FIELD : OUTCOME STILL UNVERIFIED"]},
 {title:"CIVILIANS / DISPLACEMENT",lines:["HUMAN STORIES : ATTRIBUTED AND SOURCE-LINKED","RELIEF / AID / EDUCATION / HEALTH","POLICE · COURTS · NGO · INTERNATIONAL REPORTS","DOCUMENTARY MONTAGE / NOT A LIVE ATTACK FEED"]}
];
function markup(){
 return '<div class="ci-dossier-grid"></div><div class="ci-dossier-side">MANIPUR / RESEARCH INTELLIGENCE / EVIDENCE</div><div class="ci-dossier-side right">NON-CLASSIFIED CINEMATIC STYLE / 2023—2026</div>'+
 sheets.map((s,i)=>'<div class="ci-dossier-sheet" style="--delay:'+(i*1.85)+'s;--dur:5.55s">'+
 '<span class="ci-dossier-tag">EVIDENCE SHEET 0'+(i+1)+' / MANIPUR</span><b>'+s.title+'</b>'+
 s.lines.map(t=>'<span class="ci-dossier-line">'+t+'</span>').join("")+'</div>').join("");
}
for(const id of ["ci-s1","ci-s2"]){
 const slide=document.getElementById(id);if(!slide||slide.querySelector(".ci-dossier-backdrop"))continue;
 const bg=document.createElement("div");bg.className="ci-dossier-backdrop";bg.setAttribute("aria-hidden","true");
 bg.innerHTML=markup();
 slide.insertBefore(bg,slide.firstChild);
}
window.MANIPUR_3D_DOSSIER={active:true,scope:"opening and thesis",isIllustrative:true,usesHistoricalSources:true};
})();
