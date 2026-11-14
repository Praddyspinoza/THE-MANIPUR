/* Additive preview-only analytics. Uses the existing evidence index and original district geometry. */
(function () {
  'use strict';
  const heatColours=['#58ed9b','#d3df57','#f5d25e','#f6a456','#72d8c0','#9ecb7d','#e1a4aa','#95d4ed','#ddc389','#54bfb4','#b7aaed','#d4f1a1','#cf8e67','#8bdbbc','#d7d8a0','#9ba8c9'];
  const violenceKind=new Set(['Incident','Reported incident cluster','Armed-group incident','Civilian attack / investigation']);
  function isIndexedViolence(e){
    if(!violenceKind.has(e.kind))return false;
    const topic=e.topic==='Armed violence'||e.topic==='Gender & protection';
    const title=/\b(attack(?:s|ed)?|assault|killed|killing|killings|gunfire|clash(?:es)?|arson|abduction|bomb(?:ing)?|shooting|fatal|encounter|violence|hostage|bodies|deaths|murder)\b/i.test(e.title||'');
    return (topic||title)&&(e.geographicAssociations||[]).some(function(a){return a.role==='reported_incident_location';});
  }
  function linkedTo(e,name){return(e.geographicAssociations||[]).some(function(a){return a.district===name&&a.role==='reported_incident_location';});}
  function activeYear(){
    const slider=document.querySelector('.mv-map [data-mv-control="year"]');
    const label=slider&&slider.getAttribute('aria-valuetext');
    return label&&/^20\d{2}$/.test(label)?label:'all';
  }
  function eventFilter(){
    const f=state.tab==='atlas'?Object.assign({},state.atlas):{};
    const year=activeYear();if(year!=='all')f.year=year;
    return f;
  }
  function analyticsRows(){
    const filter=eventFilter();
    return DISTRICTS.map(function(d){
      const events=localEvents(d.name,filter).filter(function(e){return isIndexedViolence(e)&&linkedTo(e,d.name);});
      return {name:d.name,count:events.length,events:events};
    }).sort(function(a,b){return b.count-a.count||a.name.localeCompare(b.name);});
  }
  function wedgePath(start,end,r){
    const x1=110+r*Math.cos(start-Math.PI/2),y1=110+r*Math.sin(start-Math.PI/2);
    const x2=110+r*Math.cos(end-Math.PI/2),y2=110+r*Math.sin(end-Math.PI/2);
    return 'M110 110 L'+x1.toFixed(3)+' '+y1.toFixed(3)+' A'+r+' '+r+' 0 '+(end-start>Math.PI?1:0)+' 1 '+x2.toFixed(3)+' '+y2.toFixed(3)+' Z';
  }
  function pieMarkup(){
    const rows=analyticsRows(),positive=rows.filter(function(x){return x.count>0;});
    const associations=rows.reduce(function(n,x){return n+x.count;},0);
    const distinct=new Set(rows.flatMap(function(r){return r.events.map(function(e){return e.id;});})).size;
    let angle=0;
    const slices=positive.map(function(r,i){
      const start=angle,end=angle+r.count/associations*Math.PI*2;angle=end;
      const col=heatColours[i%heatColours.length],pct=(r.count/associations*100).toFixed(1);
      const shape=positive.length===1?'<circle cx="110" cy="110" r="92" fill="'+col+'"/>':'<path d="'+wedgePath(start,end,92)+'" fill="'+col+'"/>';
      return '<g class="mv-pie-slice" data-district="'+esc(r.name)+'" tabindex="0" role="button" aria-label="Open '+esc(r.name)+', '+r.count+' indexed district associations">'+shape+'<title>'+esc(r.name)+': '+r.count+' ('+pct+'%)</title></g>';
    }).join('');
    const legend=rows.map(function(r,i){
      return '<button type="button" class="mv-pie-district" data-district="'+esc(r.name)+'"><i style="background:'+heatColours[i%heatColours.length]+'"></i><span>'+esc(r.name)+'</span><b>'+r.count+'</b></button>';
    }).join('');
    return '<section id="mv-violence-share" class="mv-share-panel" aria-labelledby="mv-share-heading">'+
      '<div class="mv-share-heading"><div><small>DISTRICT / VIOLENCE RECORD DISTRIBUTION</small><h3 id="mv-share-heading">Where the indexed violence records are associated</h3><p>Choose a slice or district to open its full intelligence dossier.</p></div><span class="mv-share-total">'+distinct+' <small>distinct entries</small></span></div>'+
      '<div class="mv-pie-layout"><div class="mv-pie-visual"><svg viewBox="0 0 220 220" role="group" aria-label="Pie chart of incident-location district associations"><circle cx="110" cy="110" r="94" fill="#0a241b" stroke="#407f69" stroke-width="1"/>'+slices+'</svg><div class="mv-pie-caption"><strong>'+associations+'</strong><small>district associations</small></div></div><div class="mv-pie-districts">'+legend+'</div></div>'+
      (!associations?'<p class="mv-no-records">No qualifying district-linked violence records match these filters.</p>':'')+
      '<p class="mv-share-foot">Counts represent <strong>district associations in the curated evidence index</strong>, not all acts of violence, deaths, or population risk. One indexed record may concern several districts. Glowing map textures do not mark actual attack coordinates. Chart responds to the map year and atlas filters.</p></section>';
  }
  function showPie(){
    const map=document.querySelector('#workspace .mv-map');
    const panel=map&&map.closest('.panel');if(!panel)return;
    const old=panel.querySelector('#mv-violence-share');
    if(old)old.outerHTML=pieMarkup();else panel.insertAdjacentHTML('beforeend',pieMarkup());
  }
  function districtMap(name,count){
    const d=DISTRICTS.find(function(x){return x.name===name;});if(!d)return '';
    const all=d.polygons.flat(),xs=all.map(function(p){return p[0]*.873;}),ys=all.map(function(p){return p[1];});
    const minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),maxy=Math.max.apply(null,ys);
    const scale=Math.min(245/Math.max(1,maxx-minx),206/Math.max(1,maxy-miny));
    const point=function(p){return [170+(p[0]*.873-(minx+maxx)/2)*scale,123+((miny+maxy)/2-p[1])*scale];};
    const path=d.polygons.map(function(poly){return poly.map(function(p,i){const q=point(p);return (i?'L':'M')+q[0].toFixed(2)+' '+q[1].toFixed(2);}).join(' ')+'Z';}).join(' ');
    return '<svg class="mv-district-closeup" viewBox="0 0 340 250" role="img" aria-label="Indexed district outline of '+esc(name)+'; aggregate illustrative glow only"><defs><radialGradient id="mv-closeheat"><stop offset="0" stop-color="#fff66d" stop-opacity=".85"/><stop offset=".25" stop-color="#26ee8d" stop-opacity=".48"/><stop offset="1" stop-color="#16b973" stop-opacity="0"/></radialGradient><clipPath id="mv-district-clip"><path d="'+path+'"/></clipPath></defs><path d="'+path+'" fill="#083021" stroke="#80ffe0" stroke-width="2"/><g clip-path="url(#mv-district-clip)"><circle class="mv-region-glow" cx="170" cy="123" r="97" fill="url(#mv-closeheat)" opacity="'+(count?'.9':'.14')+'"/></g><path d="'+path+'" fill="none" stroke="#e4ffee" stroke-opacity=".48" stroke-width=".65"/><text x="170" y="230" text-anchor="middle" fill="#b7f7df" font-size="10" letter-spacing="1">'+esc(name.toUpperCase())+' · DISTRICT INDEX OUTLINE</text></svg>';
  }
  function inspectorMarkup(){
    const name=state.district;if(!name)return '';
    const filter={year:state.districtYear,topic:state.districtTopic,kind:V4.districtKind,role:V4.districtRole};
    const events=localEvents(name,filter).filter(function(e){return isIndexedViolence(e)&&linkedTo(e,name);});
    const cards=events.slice(0,3).map(function(e){return '<button type="button" class="mv-region-record" data-event="'+esc(e.id)+'"><time>'+esc(e.date)+'</time><span>'+esc(e.title)+'</span><span aria-hidden="true">↗</span></button>';}).join('');
    return '<section class="mv-region-inspector" aria-labelledby="mv-region-title">'+
      '<div class="mv-region-heading"><div><small>DISTRICT SPATIAL INTELLIGENCE</small><h3 id="mv-region-title">'+esc(name)+' · evidence close-up</h3><p>The original source records and filters remain available below.</p></div><strong>'+events.length+'<small>indexed violence associations</small></strong></div>'+
      '<div class="mv-region-grid"><div class="mv-region-map">'+districtMap(name,events.length)+'</div>'+
      '<div class="mv-region-detail"><small>SUB-DIVISION HEAT-MAP STATUS</small><h4>Verified subdivision geometry unavailable</h4><p>This depicts a <b>district-level aggregate glow</b>, not mapped villages, subdivisions, or attack locations. Reliable subdivision boundaries and geocoded event records are needed before a real subdivision heat map can be published.</p><div class="mv-region-evidence"><strong>District-linked violence records</strong>'+(cards||'<p>None indexed under these filters.</p>')+'</div></div></div></section>';
  }
  function attachInspector(){
    const drawer=document.getElementById('drawer');
    if(!state.district||!drawer||drawer.hidden)return;
    const old=drawer.querySelector('.mv-region-inspector');if(old)old.remove();
    const officials=drawer.querySelector('.new-official-panel');
    if(officials)officials.insertAdjacentHTML('afterend',inspectorMarkup());
    else drawer.querySelector('.drawer-counts')?.insertAdjacentHTML('beforebegin',inspectorMarkup());
  }
  const previousDistrict=renderDistrict;
  renderDistrict=function(){previousDistrict();attachInspector();};
  const previousRoute=route;
  route=function(){previousRoute();showPie();};
  const previousAtlas=renderAtlasBody;
  renderAtlasBody=function(){previousAtlas();showPie();};
  window.MANIPUR_ANALYTICS_REFRESH=showPie;
  document.addEventListener('keydown',function(e){
    const p=e.target.closest&&e.target.closest('.mv-pie-slice');
    if(p&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openDistrict(p.dataset.district);}
  });
  route();
})();