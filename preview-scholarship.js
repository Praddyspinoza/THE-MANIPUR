(function scholarshipAddon(){
"use strict";
if(typeof SOURCES==="undefined"||typeof BYID==="undefined"||typeof internationalSet!=="function"||typeof international!=="function")return;
const added=[
{
id:"S230",date:"2025-02-14",datePrecision:"day",publisher:"International Crisis Group",
title:"Finding a Way Out of Festering Conflict in India's Manipur — Asia Report No. 346",
url:"https://www.ecoi.net/en/file/local/2121907/346-festering-conflict-india-manipur_0.pdf",
officialUrl:"https://www.crisisgroup.org/sites/default/files/2025-02/346-festering-conflict-india-manipur_0.pdf",
landingUrl:"https://www.ecoi.net/en/document/2121907.html",
category:"International analytical report",topic:"Conflict resolution and institutional response",
summary:"Independent policy analysis based on interviews in Manipur and New Delhi, mapping ethnic fault lines, armed-group dynamics, governance failures and the challenge of credible dialogue. Its recommendations include security-sector action, disarmament and a broadly acceptable peace process.",
note:"The analysis is the International Crisis Group's assessment as of February 2025, not a judicial finding or a statement of current conditions in November 2026. Institutional prescriptions are attributed to the author.",
medium:"32-page report (PDF)",documentType:"Policy and research report",originatingInstitution:"International Crisis Group",publisherRole:"Independent policy analysis",publisherRegion:"International",language:"English",districts:[],
reviewedAt:"2026-11-14",review:"Title, author, publication date, report scope and recommendations checked against original publisher and ecoi.net report listing.",
reviewState:{date:"2026-11-14",depth:"report_summary_reviewed",access:"publisher_and_hosted_report_listing",material:"Full report PDF linked; summary and sections cross-checked",reviewer:"Source research"},
reportingMethods:["Attributed report summary","Interviews conducted by research organisation"],tags:["International","Conflict resolution","Peace process"],primary:true,official:false
},
{
id:"S231",date:"2025-08-20",datePrecision:"day",publisher:"People's Union for Civil Liberties (PUCL)",
title:"Independent People's Tribunal on the Ongoing Ethnic Conflict in Manipur",
url:"https://pucl.org/wp-content/uploads/2025/08/Manipur-Report-FINAL-1.pdf",
landingUrl:"https://pucl.org/manage-reports/independent-peoples-tribunal-on-the-ongoing-ethnic-conflict-in-manipur/",
category:"Independent civil-society tribunal report",topic:"Human rights, testimony and accountability",
summary:"An India-based independent People's Tribunal convened by PUCL and chaired by former Supreme Court judge Kurian Joseph. The report brings together survivor testimony and evidence from visits, examines institutional responses and makes recommendations concerning accountability, rehabilitation and reconciliation.",
note:"This is not a court judgment or an official international inquiry. Findings and allegations belong to the tribunal and contested claims require separate assessment. The tribunal was constituted by PUCL in 2024 and released its report on 20 August 2025.",
medium:"Independent People's Tribunal report (PDF)",documentType:"Civil-society tribunal report",originatingInstitution:"People's Union for Civil Liberties",publisherRole:"Indian independent civil-society tribunal",publisherRegion:"India",language:"English",districts:[],
reviewedAt:"2026-11-14",review:"Publication and authorship verified on PUCL's original report launch page; the published PDF and outline were examined.",
reviewState:{date:"2026-11-14",depth:"publisher_summary_reviewed",access:"publisher_pdf_and_press_release",material:"Original tribunal report and publisher summary",reviewer:"Source research"},
reportingMethods:["Witness testimony reported by tribunal","Field visits and documentary records"],tags:["Civil society","Tribunal","Accountability"],primary:true,official:false
}
];
for(const item of added){
 if(BYID[item.id])continue;
 const s={...item,geographicAssociations:[],originEstablished:true,statementId:null,reportingOriginId:item.publisher,accessed:"2026-11-14",evidenceLinks:[],corrections:[]};
 SOURCES.push(s);BYID[s.id]=s;
}
const originalSet=internationalSet;
internationalSet=function(){
 const existing=originalSet();
 const have=new Set(existing.map(x=>x.id));
 return existing.concat(added.filter(x=>BYID[x.id]&&!have.has(x.id)).map(x=>BYID[x.id]));
};
const originalInternational=international;
international=function(){
 const base=originalInternational();
 const urls={icg:"https://www.ecoi.net/en/file/local/2121907/346-festering-conflict-india-manipur_0.pdf",pucl:"https://pucl.org/wp-content/uploads/2025/08/Manipur-Report-FINAL-1.pdf"};
 const shelf=`<section class="ci-report-shelf" aria-label="Priority research reports">
 <div class="ci-report-heading"><div><span>FOUNDATIONAL RESEARCH / PRIMARY PUBLISHERS</span><h2>Two reports worth reading in full</h2></div><span>DOCUMENTED · DATED · ATTRIBUTED</span></div>
 <div class="ci-report-grid">
  <article class="ci-report"><small>14 FEB 2025 · INTERNATIONAL CRISIS GROUP / ASIA REPORT 346</small><h3>Finding a Way Out of Festering Conflict in India's Manipur</h3><p>An independent, interview-based analysis of conflict dynamics, disarmament, political grievances and pathways to dialogue. This is a dated policy assessment—not a verdict.</p><div class="ci-report-links"><a href="${urls.icg}" target="_blank" rel="noopener noreferrer">Read full report (PDF) ↗</a><button data-source="S230">Provenance and methodology ↗</button></div></article>
  <article class="ci-report"><small>20 AUG 2025 · INDEPENDENT PEOPLE'S TRIBUNAL / PUCL, INDIA</small><h3>Independent People's Tribunal on the Ongoing Ethnic Conflict in Manipur</h3><p>Survivor testimony, a review of public institutions and proposals for justice and reconciliation. It is an independent civil-society initiative, not a judicial commission.</p><div class="ci-report-links"><a href="${urls.pucl}" target="_blank" rel="noopener noreferrer">Read tribunal report (PDF) ↗</a><button data-source="S231">Provenance and methodology ↗</button></div></article>
 </div></section>`;
 const marker='<div class="section-gap">';
 const i=base.indexOf(marker);
 return i>=0?base.slice(0,i)+shelf+base.slice(i):base+shelf;
};
if(typeof state!=="undefined"&&state.tab==="international")route();
window.MANIPUR_INTERNATIONAL_REPORTS={count:2,ids:["S230","S231"],urls:added.map(x=>x.url)};
})();