/* Manipur /preview/ progressive enhancement, 2026-11-03.
   Actual subdistrict polygons are requested from a published IAB2024 GIS layer.
   Never infer incidents, subdivision violence totals or precise locations from an illustrative glow. */
(function(){
'use strict';
const API='https://livingatlas.esri.in/server/rest/services/IAB2024/IAB_Subdistrict_2024/MapServer/0/query';
const LAYER='https://livingatlas.esri.in/server/rest/services/IAB2024/IAB_Subdistrict_2024/MapServer/0';
const PALETTE=['#b87f51','#d8bf80','#7ea990','#6b9b9f','#9c8aac','#7dc7a2','#c68c8d','#8fb66d','#4f947e','#d1a667','#7298b9','#9aaf94','#b5957f','#a0afa6','#b0a2c2','#6f9990'];
const geoCache=new Map();
const selections=new Map();
let scheduled=false;
const safe=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function violent(e){
 const types=['Incident','Reported incident cluster','Armed-group incident','Civilian attack / investigation'];
 return types.includes(e.kind)&&(['Armed violence','Gender & protection'].includes(e.topic)||/\b(attack(?:s|ed)?|assault|killed|killing|killings|gunfire|clash(?:es)?|arson|abduction|bomb(?:ing)?|shooting|fatal|encounter|violence|hostage|bodies|deaths|murder)\b/i.test(e.title||''))&&(e.geographicAssociations||[]).some(g=>g.role==='reported_incident_location');
}
function matchingEvents(district,year){
 const filter=typeof state!=='undefined'&&state.tab==='atlas'?{...state.atlas}:{};
 if(year&&year!=='all')filter.year=year;
 const matches=typeof Core!=='undefined'&&Core.eventMatches?e=>Core.eventMatches(e,filter):()=>true;
 return EVENTS.filter(e=>violent(e)&&matches(e)&&(e.geographicAssociations||[]).some(g=>g.district===district&&g.role==='reported_incident_location'));
}
function countsFor(w){
 const year=w.querySelector('.mv-map')?.dataset.mapYr||'all';
 const filter=typeof state!=='undefined'&&state.tab==='atlas'?{...state.atlas}:{};
 if(year!=='all')filter.year=year;
 const matches=typeof Core!=='undefined'&&Core.eventMatches?e=>Core.eventMatches(e,filter):()=>true;
 const events=EVENTS.filter(e=>violent(e)&&matches(e));
 const series=DISTRICTS.map(d=>({name:d.name,value:events.filter(e=>(e.geographicAssociations||[]).some(g=>g.district===d.name&&g.role==='reported_incident_location')).length})).sort((a,b)=>b.value-a.value||a.name.localeCompare(b.name));
 return {series,total:series.reduce((sum,x)=>sum+x.value,0),year,events:events.length};
}
function pie(w){
 const {series,total,year,events}=countsFor(w);
 let paths='',legend='',at=-Math.PI/2;
 series.forEach((r,i)=>{
  if(!r.value)return;
  const color=PALETTE[i%PALETTE.length],angle=2*Math.PI*r.value/total,finish=at+angle;
  const x1=100+88*Math.cos(at),y1=100+88*Math.sin(at),x2=100+88*Math.cos(finish),y2=100+88*Math.sin(finish);
  const geom=angle>=Math.PI*2-.00001?'<circle cx="100" cy="100" r="88" fill="'+color+'"/>':
    '<path d="M100 100L'+x1.toFixed(3)+' '+y1.toFixed(3)+'A88 88 0 '+(angle>Math.PI?1:0)+' 1 '+x2.toFixed(3)+' '+y2.toFixed(3)+'Z" fill="'+color+'" data-mvi-select="'+safe(r.name)+'" tabindex="0" role="button" aria-label="Inspect '+safe(r.name)+'"/>';
  paths+='<g>'+geom+'<title>'+safe(r.name)+' — '+r.value+' associations ('+(100*r.value/total).toFixed(1)+'%)</title></g>';
  legend+='<button type="button" class="mvi-pie-row" data-mvi-select="'+safe(r.name)+'" title="Inspect '+safe(r.name)+'"><i style="background:'+color+'"></i><span>'+safe(r.name)+'</span><b>'+(100*r.value/total).toFixed(1)+'%</b></button>';
  at=finish;
 });
 if(!total)paths='<circle cx="100" cy="100" r="88" fill="#173d30" stroke="#6a9482"/><text x="100" y="104" text-anchor="middle" fill="#e1efe7" font-size="12">No matches</text>';
 return '<div class="mvi-pie-heading"><span>01 / DISTRICT COMPARISON</span><div>District share of violence-linked records</div><p>'+events+' indexed violence-coded events · '+total+' district associations · '+safe(year==='all'?'all years':year)+'. This is a share of reviewed source records, not a census of attacks or victims.</p></div>'+
 '<div class="mvi-pie-content"><svg class="mvi-real-pie" viewBox="0 0 200 200" role="group" aria-label="Full district share pie chart with selectable districts">'+paths+'</svg><div class="mvi-pie-legend">'+legend+'</div></div>';
}
function enhance(w){
 if(!w.querySelector('.mvi-pie-hero')){
  const p=document.createElement('section');p.className='mvi-pie-hero';p.id='mvi-district-pie';
  w.querySelector('.mvi-main-grid')?.before(p);
 }
 const p=w.querySelector('.mvi-pie-hero');
 const data=countsFor(w),key=[data.year,data.events,data.total,typeof state==='undefined'?'':JSON.stringify(state.atlas||{})].join('|');
 if(p&&p.dataset.key!==key){p.dataset.key=key;p.innerHTML=pie(w);}
 const side=w.querySelector('.mvi-left');
 if(side&&!side.querySelector('.mvi-railcard')){
  const panel=document.createElement('section');panel.className='mvi-card mvi-railcard';
  panel.innerHTML='<div class="mvi-card-title">GEOGRAPHIC INTELLIGENCE <small>CONTROL RAIL</small></div><div class="mvi-rail-status"><small>ACTIVE DISTRICT</small><strong data-mvi-active-name>Select a district</strong><small data-mvi-active-year>Research snapshot</small></div>'+
   '<div class="mvi-rail-actions"><button data-mvi-go="sub">Subdivision map</button><button data-mvi-go="pie">Full pie chart</button><button data-mvi-go="heat">Heat layer</button><button data-mvi-go="play">Play timeline</button></div>'+
   '<p class="mvi-rail-source">Source-indexed research only. Motion is illustrative; polygons are administrative geography, never confirmed attack positions.</p>';
  side.prepend(panel);
 }
 const district=w.querySelector('.mvi-dossier-head h3')?.textContent||'Select a district';
 const strong=w.querySelector('[data-mvi-active-name]');if(strong&&strong.textContent!==district)strong.textContent=district;
 const yr=w.querySelector('[data-mvi-active-year]'); const txt='Map period: '+(data.year==='all'?'all years':data.year);
 if(yr&&yr.textContent!==txt)yr.textContent=txt;
}
function rosters(target){
 const items=[...target.querySelectorAll('.mvi-division-list .mvi-division')];
 return [...new Set(items.map(el=>el.querySelector('span:nth-child(2)')?.textContent?.trim()).filter(Boolean))];
}
function mentionEvents(district,place,year){
 const term=norm(place);
 if(!term||term===norm(district))return [];
 const hay=(title)=>' '+norm(title)+' ';
 return matchingEvents(district,year).filter(e=>hay(e.title).includes(' '+term+' '));
}
function createPanel(target,district){
 if(target.querySelector(':scope > .mvi-geo-panel'))return;
 const el=document.createElement('section');el.className='mvi-geo-panel';el.dataset.geoDistrict=district;
 el.innerHTML='<div class="mvi-geo-title"><span>Interactive subdistrict boundaries</span><span class="mvi-geo-badge">GIS / 2024</span></div><p class="mvi-geo-help">Select a polygon or administrative roster entry. Geometry is real where available; colour can represent explicit place mentions in source titles, not actual attack density.</p><div class="mvi-geo-content"><p class="mvi-geo-loading">Loading published subdistrict geometry…</p></div>';
 target.prepend(el);
 load(district).then(features=>{
  if(!el.isConnected||el.dataset.geoDistrict!==district)return;
  draw(el,district,features,rosters(target));
 }).catch(err=>{
  if(!el.isConnected)return;
  const list=rosters(target);
  el.querySelector('.mvi-geo-content').innerHTML='<p class="mvi-geo-status-error">The published GIS layer could not be loaded ('+safe(err.message||'network unavailable')+'). To avoid inventing boundaries, a schematic map has not been substituted. The subdivision roster remains usable below.</p>'+rosterHtml(list,district)+
  '<p class="mvi-geo-disclaimer">Polygon mapping requires access to verified geometry. This is not a statement about actual safety or violence incidence.</p><div class="mvi-geo-toolbar"><button type="button" data-geo-retry="'+safe(district)+'">Retry GIS boundary load</button></div>';
 }).finally(()=>schedule());
}
async function query(where){
 const params=new URLSearchParams({where,outFields:'name,district,state,lgd_subdistrictname',returnGeometry:'true',outSR:'4326',f:'geojson',geometryPrecision:'4',maxAllowableOffset:'0.0015',resultRecordCount:'2000'});
 const controller=new AbortController();const stop=setTimeout(()=>controller.abort(),14000);
 try{
  const response=await fetch(API+'?'+params.toString(),{signal:controller.signal,mode:'cors',credentials:'omit'});
  if(!response.ok)throw new Error('GIS HTTP '+response.status);
  const payload=await response.json();
  if(payload.error)throw new Error(payload.error.message||'GIS query rejected');
  if(!Array.isArray(payload.features))throw new Error('GIS response was not a feature collection');
  return payload.features.filter(f=>f&&f.geometry&&['Polygon','MultiPolygon'].includes(f.geometry.type));
 }finally{clearTimeout(stop);}
}
function load(district){
 if(geoCache.has(district))return geoCache.get(district);
 const work=(async()=>{
  const key=district.replace(/'/g,"''");
  let rows=await query("state = 'Manipur' AND district = '"+key+"'");
  if(!rows.length){
   rows=await query("state = 'Manipur'");
   rows=rows.filter(f=>norm(f.properties?.district)===norm(district));
  }
  if(!rows.length)throw new Error('No matching polygon features for this district');
  return rows;
 })();
 geoCache.set(district,work);
 work.catch(()=>{geoCache.delete(district);});
 return work;
}
function rings(g){
 if(g.type==='Polygon')return g.coordinates||[];
 if(g.type==='MultiPolygon')return (g.coordinates||[]).flatMap(p=>p);
 return [];
}
function getName(f){return f.properties?.name||f.properties?.lgd_subdistrictname||'Unnamed subdivision';}
function rosterHtml(roster,district){
 const selected=selections.get(district)?.name||'';
 if(!roster.length)return '';
 return '<div class="mvi-mini-heading">Official district subdivision roster</div><div class="mvi-geo-roster">'+roster.map(name=>'<button type="button" data-geo-pick="'+safe(name)+'" data-geo-district="'+safe(district)+'" class="'+(selected===name?'is-selected':'')+'">'+safe(name)+'</button>').join('')+'</div>';
}
function draw(el,district,features,roster){
 const canvas=el.querySelector('.mvi-geo-content');if(!canvas)return;
 const polygons=features.map(f=>({name:getName(f),rings:rings(f.geometry)})).filter(f=>f.rings.length);
 const pts=polygons.flatMap(f=>f.rings.flat());
 if(!pts.length){canvas.innerHTML='<p class="mvi-geo-status-error">No usable polygon coordinates were returned.</p>';return;}
 const minx=Math.min(...pts.map(p=>p[0])),maxx=Math.max(...pts.map(p=>p[0])),miny=Math.min(...pts.map(p=>p[1])),maxy=Math.max(...pts.map(p=>p[1]));
 const width=570,height=355,pad=19,scale=Math.min((width-pad*2)/Math.max(.001,maxx-minx),(height-pad*2)/Math.max(.001,maxy-miny));
 const ox=(width-(maxx-minx)*scale)/2,oy=(height-(maxy-miny)*scale)/2;
 const project=p=>[ox+(p[0]-minx)*scale,oy+(maxy-p[1])*scale];
 const selected=selections.get(district)||{name:polygons[0]?.name||'',mode:'mentions',zoom:1};
 selections.set(district,selected);
 const year=el.closest('.mvi-workbench')?.querySelector('.mv-map')?.dataset.mapYr||'all';
 let paths='';
 for(const f of polygons){
  const d=f.rings.map(r=>r.map((p,i)=>{const q=project(p);return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ')+'Z').join(' ');
  const n=mentionEvents(district,f.name,year).length;
  const fill=selected.mode==='mentions'?(n>=3?'#ba8261':n===2?'#9c8f58':n===1?'#357f60':'#114331'):'#18523e';
  paths+='<path class="mvi-geo-area '+(selected.name===f.name?'is-selected':'')+(n?' is-referenced':'')+'" d="'+d+'" fill-rule="evenodd" fill="'+fill+'" data-geo-pick="'+safe(f.name)+'" data-geo-district="'+safe(district)+'" role="button" tabindex="0" aria-label="Select '+safe(f.name)+'; '+n+' explicit title matches"><title>'+safe(f.name)+': '+n+' explicit evidence-title matches (not verified incident locations)</title></path>';
 }
 const scaleZoom=selected.zoom||1,viewX=(width-width/scaleZoom)/2,viewY=(height-height/scaleZoom)/2;
 const viz='<div class="mvi-geo-canvas"><svg class="mvi-geo-svg" viewBox="'+viewX.toFixed(2)+' '+viewY.toFixed(2)+' '+(width/scaleZoom).toFixed(2)+' '+(height/scaleZoom).toFixed(2)+'" role="group" aria-label="Published GIS subdistrict boundaries for '+safe(district)+'">'+paths+'</svg></div>';
 canvas.innerHTML=viz+
 '<div class="mvi-geo-toolbar"><button type="button" data-geo-mode="mentions" data-geo-district="'+safe(district)+'" aria-pressed="'+(selected.mode==='mentions')+'">Named evidence mentions</button>'+
 '<button type="button" data-geo-mode="boundaries" data-geo-district="'+safe(district)+'" aria-pressed="'+(selected.mode==='boundaries')+'">Boundaries only</button>'+
 '<button type="button" data-geo-zoom="in" data-geo-district="'+safe(district)+'">Zoom +</button><button type="button" data-geo-zoom="out" data-geo-district="'+safe(district)+'">Zoom −</button><button type="button" data-geo-zoom="reset" data-geo-district="'+safe(district)+'">Reset</button></div>'+
 '<p class="mvi-geo-disclaimer">Source: <a href="'+LAYER+'" target="_blank" rel="noopener noreferrer">India Administrative Boundaries 2024 subdistrict GIS layer</a> ('+polygons.length+' polygons). Some subdistrict names/boundaries differ from a district’s current administrative subdivision roster. No casualty, attack, or subdivision incident counts are inferred.</p>'+
 rosterHtml(roster,district)+'<div class="mvi-geo-focus"></div>';
 focus(el,district,selected.name,year,polygons);
}
function focus(el,district,name,year,polygons){
 const area=el.querySelector('.mvi-geo-focus');if(!area)return;
 const rows=mentionEvents(district,name,year),mapped=polygons.some(x=>x.name===name);
 area.innerHTML='<strong>'+safe(name||'Select a subdistrict')+'</strong><p>'+(mapped?'Polygon selected from published GIS. ':'Official roster selection; mapped polygon may use a different administrative name. ')+rows.length+' explicit district-linked source-title mention'+(rows.length===1?'':'s')+'. This does not mean '+rows.length+' verified violence incidents within this area.</p>'+
 (rows.length?rows.slice(0,6).map(e=>'<button type="button" data-event="'+safe(e.id)+'"><small>'+safe(e.date)+' · '+safe(e.id)+'</small>'+safe(e.title)+'</button>').join(''):'<p>There are no title-level matches in this edition. That is not evidence that the area was safe.</p>');
}
function mount(){
 for(const w of document.querySelectorAll('.mvi-workbench')){
  enhance(w);
  const body=w.querySelector('.mvi-dossier-body');
  if(body&&w.querySelector('[data-mvi-tab="subdivisions"].active')){
   const district=w.querySelector('.mvi-dossier-head h3')?.textContent?.trim();
   if(district)createPanel(body,district);
  }
 }
 for(const drawer of document.querySelectorAll('.mvi-drawer-mini')){
  const district=drawer.querySelector('h3')?.textContent?.split(' · ')[0]?.trim();
  if(district)createPanel(drawer,district);
 }
}
function schedule(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;mount();});
}
document.addEventListener('click',ev=>{
 const go=ev.target.closest('[data-mvi-go]');
 if(go){
  const w=go.closest('.mvi-workbench');
  if(!w)return;
  const action=go.dataset.mviGo;
  if(action==='sub'){w.querySelector('[data-mvi-tab="subdivisions"]')?.click();w.querySelector('.mvi-dossier')?.scrollIntoView({block:'nearest',behavior:'smooth'});}
  if(action==='pie')w.querySelector('.mvi-pie-hero')?.scrollIntoView({block:'start',behavior:'smooth'});
  if(action==='heat')w.querySelector('[data-mv-action="heat"]')?.click();
  if(action==='play')w.querySelector('[data-mv-action="play"]')?.click();
 }
 const pick=ev.target.closest('[data-geo-pick]');
 const toggle=ev.target.closest('[data-geo-mode]');
 const zoom=ev.target.closest('[data-geo-zoom]');
 const retry=ev.target.closest('[data-geo-retry]');
 if(retry){
  const el=retry.closest('.mvi-geo-panel');if(!el)return;
  const district=retry.dataset.geoRetry,parent=el.parentElement;el.remove();
  if(parent)createPanel(parent,district);
 }
 if(pick||toggle||zoom){
  const el=ev.target.closest('.mvi-geo-panel'),district=(pick||toggle||zoom).dataset.geoDistrict;
  if(!el||!district||!geoCache.has(district))return;
  const v=selections.get(district)||{name:'',mode:'mentions',zoom:1};
  if(pick)v.name=pick.dataset.geoPick;
  if(toggle)v.mode=toggle.dataset.geoMode;
  if(zoom)v.zoom=zoom.dataset.geoZoom==='reset'?1:Math.max(1,Math.min(3.5,v.zoom+(zoom.dataset.geoZoom==='in'?.4:-.4)));
  selections.set(district,v);
  const roster=rosters(el.parentElement);
  geoCache.get(district).then(features=>{if(el.isConnected)draw(el,district,features,roster);});
 }
},false);
document.addEventListener('keydown',ev=>{
 const item=ev.target.closest('[data-geo-pick],[data-mvi-select]');
 if(item&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();item.click();}
});
const target=document.querySelector('#workspace')||document.body;
new MutationObserver(()=>schedule()).observe(target,{childList:true,subtree:true});
window.MANIPUR_PREVIEW_UPGRADE={revision:'2026-11-03-emerald-geometry',refresh:schedule,source:LAYER};
schedule();
})();