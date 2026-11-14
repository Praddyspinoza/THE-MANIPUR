/* MANIPUR preview: illustrative synthesized effects only.
   No media, map, archive, research, geometry, design or prologue is replaced.
   Browser-local synthesis avoids bandwidth competition with documentary embeds.
   These effects are NOT audio recorded during Manipur violence. */
(function(){
 "use strict";
 if(window.MANIPUR_CINEMATIC_SFX)return;
 let ctx=null,master=null,armed=false,enabled=true,seed=24713;
 function rnd(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
 function init(){
  if(ctx)return ctx;
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext)return null;
  ctx=new AudioContext();
  master=ctx.createGain();master.gain.value=.12;master.connect(ctx.destination);
  return ctx;
 }
 function noise(time,duration,highpass,lowpass,level){
  if(!ctx||ctx.state!=="running")return;
  const length=Math.max(1,Math.floor(ctx.sampleRate*duration));
  const buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<length;i++)data[i]=(rnd()*2-1);
  const source=ctx.createBufferSource();source.buffer=buffer;
  const hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=highpass;
  const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=lowpass;
  const envelope=ctx.createGain();
  envelope.gain.setValueAtTime(.0001,time);
  envelope.gain.linearRampToValueAtTime(level,time+.008);
  envelope.gain.exponentialRampToValueAtTime(.0001,time+duration);
  source.connect(hp);hp.connect(lp);lp.connect(envelope);envelope.connect(master);
  source.start(time);source.stop(time+duration+.015);
 }
 function bass(time,frequency,duration,level){
  if(!ctx||ctx.state!=="running")return;
  const osc=ctx.createOscillator(),g=ctx.createGain();
  osc.type="sine";
  osc.frequency.setValueAtTime(frequency,time);
  osc.frequency.exponentialRampToValueAtTime(35,time+duration);
  g.gain.setValueAtTime(.0001,time);
  g.gain.linearRampToValueAtTime(level,time+.012);
  g.gain.exponentialRampToValueAtTime(.0001,time+duration);
  osc.connect(g);g.connect(master);osc.start(time);osc.stop(time+duration+.015);
 }
 function burst(kind){
  if(!armed||!enabled||!ctx||ctx.state!=="running")return false;
  const t=ctx.currentTime+.012;
  if(kind==="blast"){
   noise(t,.48,38,1650,.36);bass(t,120,.65,.38);
   noise(t+.12,.62,75,750,.16);
  }else{
   for(let i=0;i<3;i++){
    const when=t+i*.19;
    noise(when,.095,260,4200,.38);
    bass(when,175,.16,.16);
   }
  }
  return true;
 }
 function arm(){
  if(armed)return;
  try{
   const c=init();if(!c)return;
   const p=c.resume();
   if(p&&p.catch)p.catch(()=>{});
   armed=true;
  }catch(e){}
 }
 function update(){
  const fx=document.getElementById("mp-coda-fx");
  enabled=!fx||fx.getAttribute("aria-pressed")!=="false";
 }
 document.addEventListener("click",event=>{
  if(event.target.closest("#ci-explore,#ci-fast-forward,#ci-audio,#mp-coda-fx"))arm();
  if(event.target.closest("#mp-coda-fx"))queueMicrotask(update);
 },{passive:true});
 // Cues on the original short national-media montage (not on the cultural film).
 let previous=-1;
 function tick(){
  const film=document.getElementById("ci-film");
  if(film&&film.isConnected){
   const active=film.classList.contains("active")&&film.classList.contains("fm-active");
   if(active){
    const p=parseFloat(document.getElementById("ci-progress")?.style.width)||0;
    const sec=15*p/100;
    const cue=sec>=10.9&&sec<11.4?3:sec>=9.9&&sec<10.35?2:sec>=8.75&&sec<9.1?1:-1;
    if(cue!==previous&&cue>=0){
     // Political speech clips remain intact; effects are soundtrack illustration.
     burst(cue===2?"blast":"gunfire");
    }
    previous=cue;
   }else previous=-1;
   requestAnimationFrame(tick);
  }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(tick),{once:true});
 else requestAnimationFrame(tick);
 window.MANIPUR_CINEMATIC_SFX={arm,burst,setEnabled(v){enabled=!!v},get enabled(){return enabled},get armed(){return armed}};
})();
