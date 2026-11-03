/* Evidence-linked analytics for the standalone /preview/ map only.
   The display counts curated event records, not casualties or geolocated attacks. */
(function(){
'use strict';
if(typeof DATA==='undefined'||typeof drawMap!=='function'||typeof renderDistrict!=='function')return;
const X={selected:'Kangpokpi',tab:'overview',sub:null};
const escX=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtX=value=>Number(value||0).toLocaleString('en-IN');
const snapX=DATA.metadata&&DATA.metadata.snapshot||'2026-10-22';
const categoriesX=new Set(['Incident','Reported incident cluster','Armed-group incident','Civilian attack / investigation']);
const divisionsX={
 'Kangpokpi':{names:['Kangpokpi','Saikul','Saitu Gamphazol','Tujang Waichong','Champhai','Kangchup Geljang','Bungte Chiru','Island','Lhungtin'],url:'https://kangpokpi.nic.in/subdivision-blocks/'},
 'Churachandpur':{names:['Churachandpur','Tuibuong','Kangvai','Saikot','Sangaikot','Singhat','Henglep','Mualnuam','Samulamlan','Suangdoh'],url:'https://churachandpur.nic.in/administrative-setup/subdivision-blocks/'},
 'Jiribam':{names:['Jiribam','Borobekra'],url:'https://jiribam.nic.in/subdivision-blocks/'},
 'Senapati':{names:['Willong','Mao Maram','Chillivai Phaibung','Song Song','Lairouching','Paomata','Purul','Senapati'],url:'https://senapati.nic.in/about-district/administrative-setup/subdivision-blocks/'},
 'Imphal East':{names:['Porompat','Keirao Bitra','Sawombung'],url:'https://imphaleast.nic.in/subdivision-tehsils/'},
 'Imphal West':{names:['Lamshang','Patsoi','Lamphelpat','Wangoi'],url:'https://imphalwest.nic.in/history/'},
 'Kakching':{names:['Kakching','Waikhong'],url:'https://kakching.nic.in/subdivision-blocks/'},
 'Thoubal':{names:['Lilong','Thoubal'],url:'https://thoubal.nic.in/subdivision-blocks/'},
 'Tengnoupal':{names:['Moreh','Tengnoupal','Machi'],url:'https://tengnoupal.nic.in/sub-divisions-and-blocks/'}
};
const officialPortalX='https://manipur.s3waas.gov.in/';
function violentX(e){return categoriesX.has(e.kind)&&Array.isArray(e.geographicAssociations)&&e.geographicAssociations.some(g=>g.role==='reported_incident_location');}
function districtLinkedX(e,name){return (e.geographicAssociations||[]).some(g=>g.district===name&&g.role==='reported_incident_location');}
function getX(filter,year){
 const applied={...filter};
 if(year&&year!=='all')applied.year=year;
 const filtered=EVENTS.filter(e=>violentX(e)&&Core.eventMatches(e,applied));
 const rows=DISTRICTS.map(d=>({name:d.name,events:filtered.filter(e=>districtLinkedX(e,d.name))})).map(d=>({...d,value:d.events.length})).sort((a,b)=>b.value-a.value||a.name.localeCompare(b.name));
 const total=rows.reduce((v,r)=>v+r.value,0);
 return {rows,filtered,total,year:year&&year!=='all'?year:applied.year||'all',filter:applied};
}
function colorX(i){return ['#ff4939','#ff8b2d','#ffcc22','#e6ff3b','#69f243','#22e5a5','#08bfa7','#168e8c'][Math.min(i,7)];}
function donutX(D){
 const positive=D.rows.filter(r=>r.value>0),slices=positive.slice(0,6);
 const other=positive.slice(6).reduce((v,r)=>v+r.value,0);
 if(other)slices.push({name:'Other districts',value:other});
 const sum=Math.max(D.total,1),circ=2*Math.PI*70;let offset=0;
 const rings=slices.map((r,i)=>{const len=r.value/sum*circ;const out='<circle cx="92" cy="92" r="70" fill="none" stroke="'+colorX(i)+'" stroke-width="23" stroke-dasharray="'+len.toFixed(2)+' '+(circ-len).toFixed(2)+'" stroke-dashoffset="'+(-offset).toFixed(2)+'" transform="rotate(-90 92 92)"><title>'+escX(r.name)+': '+r.value+' district associations</title></circle>';offset+=len;return out;}).join('');
 const legend=slices.map((r,i)=>'<div class="mvi-slice"><i style="background:'+colorX(i)+'"></i><span>'+escX(r.name)+'</span><b>'+((r.value/sum)*100).toFixed(1)+'%</b></div>').join('');
 return '<div class="mvi-donut-wrap"><svg viewBox="0 0 184 184" class="mvi-donut" role="img" aria-label="Distribution of '+D.total+' district-associated indexed conflict entries"><circle cx="92" cy="92" r="70" fill="none" stroke="#143039" stroke-width="23"/>'+rings+'<text x="92" y="91" text-anchor="middle" class="mvi-donut-n">'+fmtX(D.total)+'</text><text x="92" y="109" text-anchor="middle" class="mvi-donut-cap">district links</text></svg><div class="mvi-donut-list">'+legend+'</div></div>';
}
function trendX(D){
 const byYear=D.year==='all',count={};
 D.filtered.forEach(e=>{const key=byYear?e.date.slice(0,4):e.date.slice(5,7);count[key]=(count[key]||0)+1;});
 const keys=byYear?['2023','2024','2025','2026']:Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'));
 const vals=keys.map(k=>count[k]||0),max=Math.max(1,...vals),bars=keys.map((k,i)=>{
 const h=Math.max(2,Math.round(vals[i]/max*84));return '<div class="mvi-trend-col" title="'+escX(k)+': '+vals[i]+' event records"><b style="height:'+h+'%" class="'+(vals[i]?'has-data':'')+'"></b><span>'+escX(byYear?k:k==='01'?'Jan':k==='04'?'Apr':k==='07'?'Jul':k==='10'?'Oct':'·')+'</span></div>';
 }).join('');
 return '<div class="mvi-trend-bars" role="img" aria-label="Curated event entries across '+(byYear?'years':'months')+': '+keys.map((k,i)=>k+' '+vals[i]).join(', ')+'">'+bars+'</div><p class="mvi-footnote">Chronology of entries in this research edition — not a measured violence trend.</p>';
}
function mixX(D){
 const counts={};D.filtered.forEach(e=>{const label=e.kind||'Other';counts[label]=(counts[label]||0)+1;});const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]);const max=Math.max(1,...rows.map(x=>x[1]));return '<div class="mvi-mix">'+rows.map(([label,n],i)=>'<div class="mvi-mix-line"><span>'+escX(label)+'</span><span class="mvi-mix-track"><i style="width:'+(n/max*100).toFixed(1)+'%;background:'+colorX(i)+'"></i></span><b>'+n+'</b></div>').join('')+'</div><p class="mvi-footnote">Record classifications in the curated event chronology; not a survey of all incidents.</p>';
}
function insightsX(D){
 const top=D.rows[0],newest=D.filtered.slice().sort((a,b)=>b.date.localeCompare(a.date))[0];const md=D.filtered.filter(e=>(e.geographicAssociations||[]).filter(g=>g.role==='reported_incident_location').length>1).length;
 return '<div class="mvi-insight"><i>◉</i><span>Largest district-linked index count<strong>'+escX(top?.name||'Not established')+' · '+(top?.value||0)+' associations</strong></span></div><div class="mvi-insight"><i>⌁</i><span>Most recent dated conflict entry<strong>'+(newest?escX(newest.date)+' · '+escX(newest.id):'No matching event')+'</strong></span></div><div class="mvi-insight"><i>◇</i><span>Events linked to multiple districts<strong>'+md+' of '+D.filtered.length+' curated entries</strong></span></div>';
}
function rankX(D){
 const top=D.rows.slice(0,7),max=Math.max(1,...top.map(r=>r.value));
 return '<div class="mvi-ranked">'+top.map((r,i)=>'<button class="mvi-rank '+(X.selected===r.name?'is-active':'')+'" type="button" data-mvi-select="'+escX(r.name)+'" aria-label="Inspect '+escX(r.name)+'"><span class="mvi-rank-label">'+(i+1)+'. '+escX(r.name)+'</span><span class="mvi-rank-track"><i style="width:'+Math.max(r.value?4:0,r.value/max*100).toFixed(1)+'%;background:'+colorX(i)+'"></i></span><b>'+r.value+'</b></button>').join('')+'</div>';
}
function recentX(D){
 return D.filtered.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4).map(e=>'<button type="button" class="mvi-latest" data-event="'+escX(e.id)+'"><span>'+escX(e.date)+'</span><strong>'+escX(e.title)+'</strong><small>'+escX(e.id)+' · '+escX(e.kind)+'</small></button>').join('')||'<p class="mvi-empty">No violence-coded events in this filter. This is not evidence of no violence.</p>';
}
function miniSvgX(name,count,uid){
 const d=DISTRICTS.find(q=>q.name===name);if(!d)return '';
 const points=d.polygons.flat(),minx=Math.min(...points.map(p=>p[0])),maxx=Math.max(...points.map(p=>p[0])),miny=Math.min(...points.map(p=>p[1])),maxy=Math.max(...points.map(p=>p[1]));
 const k=Math.min(290/Math.max(maxx-minx,1),220/Math.max(maxy-miny,1)),dx=(340-(maxx-minx)*k)/2,dy=(250-(maxy-miny)*k)/2;
 const project=p=>[dx+(p[0]-minx)*k,dy+(maxy-p[1])*k];
 const paths=d.polygons.map(poly=>poly.map((p,i)=>{const q=project(p);return (i?'L':'M')+q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' ')+'Z').join(' ');
 const gid='mvi-haze-'+uid,clip='mvi-clip-'+uid;
 return '<svg class="mvi-detail-svg" viewBox="0 0 340 250" role="img" aria-label="Illustrative enlarged outline of '+escX(name)+' district. Glow indicates district-level indexed records only; no sub-division boundaries or incident positions are inferred."><defs><clipPath id="'+clip+'"><path d="'+paths+'"/></clipPath><radialGradient id="'+gid+'"><stop offset="0%" stop-color="'+(count>2?'#ff4639':'#fff02f')+'" stop-opacity="'+(count>0?'0.92':'0.05')+'"/><stop offset="31%" stop-color="#ffed22" stop-opacity="'+(count>0?'0.75':'0')+'"/><stop offset="63%" stop-color="#1bff76" stop-opacity=".55"/><stop offset="100%" stop-color="#01b478" stop-opacity=".08"/></radialGradient></defs><g clip-path="url(#'+clip+')"><rect width="340" height="250" fill="#063524"/><rect class="mvi-mini-haze" width="340" height="250" fill="url(#'+gid+')"/><path d="M0 60H340M0 120H340M0 180H340M70 0V250M140 0V250M210 0V250M280 0V250" fill="none" stroke="#00e99a" opacity=".08"/><circle class="mvi-pulse" cx="170" cy="125" r="35" fill="none" stroke="#fcec48" stroke-width="2" opacity="'+(count>0?'.75':'0')+'"/><circle class="mvi-pulse mvi-delay" cx="170" cy="125" r="60" fill="none" stroke="#2eff9c" stroke-width="1.7" opacity="'+(count>0?'.6':'0')+'"/></g><path d="'+paths+'" fill="none" stroke="#8dffe8" stroke-width="2.2" class="mvi-mini-border"/><text x="170" y="239" class="mvi-mini-caption" text-anchor="middle">DISTRICT OUTLINE · NON-GEOLOCATED GLOW</text></svg>';
}
function divisionsHtmlX(name,D){
 const d=divisionsX[name],prefix='mvi-sub-'+name.replace(/[^a-z]/gi,'').toLowerCase();
 if(!d)return '<p class="mvi-footnote">A verified, current subdivision roster for this district is not yet included. No administrative boundaries or local counts are inferred.</p><a class="mvi-source-link" href="'+officialPortalX+'" target="_blank" rel="noopener noreferrer">Check Manipur district portals ↗</a>';
 const assigned=D?.rows?.find(r=>r.name===name)?.events||[];
 return '<div class="mvi-division-list" role="list">'+d.names.map(n=>{const matched=n.toLowerCase()===name.toLowerCase()?[]:assigned.filter(e=>(e.title||'').toLowerCase().includes(n.toLowerCase()));const content='<span class="mvi-division-dot"></span><span>'+escX(n)+'</span><small>'+(matched.length?'Named in '+matched.length+' event title'+(matched.length===1?'':'s'):'No title-level locality match')+'</small>';return matched.length?'<button type="button" role="listitem" class="mvi-division is-mentioned" data-event="'+escX(matched[0].id)+'" title="Open attributed event record '+escX(matched[0].id)+'">'+content+'</button>':'<div class="mvi-division" role="listitem">'+content+'</div>';}).join('')+'</div><p class="mvi-footnote">Glowing names mean an event title explicitly mentions that place; no subdivision incident totals or boundaries are inferred.</p><a class="mvi-source-link" href="'+escX(d.url)+'" target="_blank" rel="noopener noreferrer">Official subdivision directory ↗</a>';
}
function dossierX(D){
 const name=DISTRICTS.some(d=>d.name===X.selected)?X.selected:D.rows[0]?.name||'Kangpokpi';
 const r=D.rows.find(d=>d.name===name),count=r?r.value:0,last=r?r.events.slice().sort((a,b)=>b.date.localeCompare(a.date)):[];
 const tabs=['overview','subdivisions','records'];
 const buttons=tabs.map(t=>'<button type="button" class="'+(X.tab===t?'active':'')+'" data-mvi-tab="'+t+'" aria-pressed="'+(X.tab===t)+'">'+(t==='records'?'Evidence':t[0].toUpperCase()+t.slice(1))+'</button>').join('');
 const direct=last.slice(0,4).map(e=>'<button class="mvi-local-event" data-event="'+escX(e.id)+'"><span>'+escX(e.date)+'</span><strong>'+escX(e.title)+'</strong><small>'+escX(e.id)+' · original sources linked</small></button>').join('')||'<p class="mvi-empty">No incident-location entries coded to this district in the chosen filters.</p>';
 const map=miniSvgX(name,count,'side');
 let content='';
 if(X.tab==='overview'){
   content='<div class="mvi-selected-count"><div><b>'+count+'</b><span>indexed conflict record associations</span></div><div class="mvi-intensity"><i></i><span>Relative index coverage<br><strong>'+(D.total?((count/Math.max(1,D.rows[0].value))*100).toFixed(0):'0')+'% of highest district</strong></span></div></div>'+map+'<p class="mvi-footnote">Glowing overlay is symbolic, not a plotted incident site. Subdivision assignments require verified location data.</p><div class="mvi-mini-heading">Dated conflict entries</div>'+direct;
 }else if(X.tab==='subdivisions'){
   content=map+'<div class="mvi-mini-heading">Verified subdivision names</div>'+divisionsHtmlX(name,D)+'<p class="mvi-footnote">'+count+' district-associated conflict entries remain unallocated to subdivisions. The source index does not yet provide verified subdistrict coordinates.</p>';
 }else{
   content='<div class="mvi-mini-heading">District-linked source records</div>'+direct+'<p class="mvi-footnote">Select an entry to inspect its underlying evidence and geographical relationship.</p>';
 }
 return '<div class="mvi-dossier-head"><div class="mvi-eyebrow">DISTRICT DRILL-DOWN</div><h3>'+escX(name)+'</h3><p>Selected from the Manipur map</p></div><div class="mvi-tabstrip">'+buttons+'</div><div class="mvi-dossier-body">'+content+'</div><button class="mvi-open-full" type="button" data-mvi-open="'+escX(name)+'">Open full district dossier & officials ↗</button>';
}
const baseDrawX=drawMap;
function renderX(raw,filter,large){
 const yr=(raw.match(/data-map-yr="([^"]+)"/)||[])[1]||'all',D=getX(filter,yr);
 if(!DISTRICTS.some(d=>d.name===X.selected))X.selected=D.rows[0]?.name||'Kangpokpi';
 const title='District shares of indexed conflict events';
 const lhs='<aside class="mvi-side mvi-left"><section class="mvi-card"><div class="mvi-card-title">'+title+'</div>'+donutX(D)+'<p class="mvi-footnote">Pie shares count district associations; an event linked to two districts contributes to both.</p></section><section class="mvi-card"><div class="mvi-card-title">Incident record types</div>'+mixX(D)+'</section><section class="mvi-card"><div class="mvi-card-title">Event-record chronology <small>'+escX(D.year==='all'?'2023–2026':D.year)+'</small></div>'+trendX(D)+'</section><section class="mvi-card"><div class="mvi-card-title">District record ranking <small>Open district ↗</small></div>'+rankX(D)+'</section><section class="mvi-card"><div class="mvi-card-title">Latest indexed conflict entries <small>Not live</small></div>'+recentX(D)+'</section></aside>';
 const rhs='<aside class="mvi-side mvi-right"><section class="mvi-card mvi-dossier">'+dossierX(D)+'</section><section class="mvi-card"><div class="mvi-card-title">Key evidence insights</div>'+insightsX(D)+'</section><section class="mvi-card mvi-risk"><div class="mvi-card-title">Risk outlook / next seven days</div><strong>Not assessed</strong><p>This historical dataset cannot support a credible seven-day violence forecast.</p><div class="mvi-risk-legend"><i></i><span>Visual density reflects indexing, not future risk.</span></div></section><section class="mvi-card mvi-method"><div class="mvi-card-title">Analytical qualification</div><p>Colour and motion illustrate the distribution of source-indexed conflict records. The graphic does not measure casualties, predict escalation, or place violence at precise coordinates.</p><a href="#method">Read the methodology ↗</a></section></aside>';
 const kpis='<div class="mvi-kpis"><div><span>Violence-coded records</span><strong>'+fmtX(D.filtered.length)+'</strong><small>unique source-indexed entries</small></div><div><span>District associations</span><strong>'+fmtX(D.total)+'</strong><small>multi-district entries repeat</small></div><div><span>Districts represented</span><strong>'+D.rows.filter(r=>r.value>0).length+' / 16</strong><small>in this selected evidence</small></div><div><span>Research snapshot</span><strong>'+escX(snapX)+'</strong><small>not a live tracker</small></div></div>';
 return '<div class="mvi-workbench" data-mvi-large="'+(large?'true':'false')+'"><header class="mvi-banner"><div><span class="mvi-eyebrow">MAP ANALYTICS · EXPERIMENTAL PREVIEW</span><h2>Manipur conflict intelligence <i>atlas</i></h2><p>Interactive district evidence, comparative views and subdivision-level verification status.</p></div><div class="mvi-banner-tag"><span></span> VIBRANT EVIDENCE MODE</div></header>'+kpis+'<div class="mvi-main-grid">'+lhs+'<div class="mvi-map-center"><div class="mvi-map-label"><strong>Manipur · luminous evidence heat map</strong><span>Tap a district to inspect its full dossier</span></div>'+raw+'</div>'+rhs+'</div><footer class="mvi-footer"><strong>Scope / methods:</strong> The pie and charts show selected, violence-coded indexed public-source event associations, not an exhaustive census of violence. Particles and district glow are illustrative, never coordinates. Administrative subdivision boundaries and per-subdivision counts are not inferred without verified source data.</footer></div>';
}
drawMap=function(filter={},large=false){return renderX(baseDrawX(filter,large),filter,large);};
const priorDistrictX=renderDistrict;
renderDistrict=function(){
 priorDistrictX();
 const name=state.district;if(!name)return;
 const f={year:state.districtYear||'',topic:state.districtTopic||'',kind:V4.districtKind||'',role:V4.districtRole||''};
 const D=getX(f,'all'),count=D.rows.find(r=>r.name===name)?.value||0;
 const markup='<section class="mvi-drawer-mini"><div class="mvi-eyebrow">ADDITIONAL GEOGRAPHIC VIEW / INDEXED EVIDENCE</div><h3>'+escX(name)+' · district evidence heat map</h3>'+miniSvgX(name,count,'drawer')+'<p>'+count+' incident-location-coded conflict entries in the active dossier filters. The graphic shows the district outline only; no subdivision boundaries or individual violence locations are inferred.</p><h4>Administrative subdivisions</h4>'+divisionsHtmlX(name,D)+'<p class="mvi-footnote">Subdivision-level violence measurement is pending verified geocoded source entries; an empty or unassigned location is not evidence of safety.</p></section>';
 const counts=document.querySelector('#drawer .drawer-counts');
 if(counts)counts.insertAdjacentHTML('afterend',markup);
};
function syncSelectedX(){
 document.querySelectorAll('.mvi-workbench').forEach(w=>{
   const year=w.querySelector('.mv-map')?.dataset.mapYr||'all';
   const D=getX(state.tab==='atlas'?state.atlas:{},year);
   const el=w.querySelector('.mvi-dossier');
   if(el)el.innerHTML=dossierX(D);
   w.querySelectorAll('[data-mvi-select]').forEach(b=>b.classList.toggle('is-active',b.dataset.mviSelect===X.selected));
   w.querySelectorAll('.mv-district-fill').forEach(b=>b.classList.toggle('mvi-selected-district',b.dataset.district===X.selected));
 });
}
document.addEventListener('click',function(e){
 const pick=e.target.closest('[data-mvi-select]');
 if(pick){e.preventDefault();X.selected=pick.dataset.mviSelect;X.tab='overview';syncSelectedX();return;}
 const tab=e.target.closest('[data-mvi-tab]');
 if(tab){e.preventDefault();X.tab=tab.dataset.mviTab;syncSelectedX();return;}
 const open=e.target.closest('[data-mvi-open]');
 if(open){e.preventDefault();X.selected=open.dataset.mviOpen;openDistrict(X.selected);return;}
},true);
document.addEventListener('click',function(e){
 const district=e.target.closest('.mvi-workbench .mv-district-fill,.mvi-workbench .mv-label');
 if(district&&district.dataset.district){X.selected=district.dataset.district;X.tab='overview';syncSelectedX();}
},true);
window.addEventListener('hashchange',function(){X.tab='overview';});
window.MANIPUR_ANALYTICS_REFRESH=function(){
 document.querySelectorAll('.mvi-workbench').forEach(w=>{
  const m=w.querySelector('.mv-map');if(!m)return;
  const filter=state.tab==='atlas'?state.atlas:{};
  const large=m.dataset.mapLarge==='true'||m.classList.contains('large');
  w.outerHTML=renderX(m.outerHTML,filter,large);
 });
 syncSelectedX();
};
route();
syncSelectedX();
})();