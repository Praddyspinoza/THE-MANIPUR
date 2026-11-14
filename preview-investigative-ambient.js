/* MANIPUR — original, browser-generated investigative ambience.
   Purpose: a subdued, nonverbal documentary atmosphere on explicit opt-in.
   NOT Mindhunter music; no samples from films, series, news, or third parties.
   No uploads or external audio requests. The sound is created locally on tap.
*/
(function(){
 "use strict";
 if(window.MANIPUR_AMBIENCE)return;
 let ctx=null,master=null,playing=false,ready=false;
 let vol=.23;
 const voices=[],lfo=[];
 function change(){
  document.dispatchEvent(new CustomEvent("manipur-ambience-change",{detail:{playing,volume:vol}}));
 }
 function initialise(){
  if(ready)return true;
  const C=window.AudioContext||window.webkitAudioContext;
  if(!C)return false;
  try{ctx=new C();}catch(e){return false;}
  master=ctx.createGain();master.gain.value=0;
  const compressor=ctx.createDynamicsCompressor();
  compressor.threshold.value=-24;compressor.knee.value=15;
  compressor.ratio.value=2;compressor.attack.value=.015;compressor.release.value=.3;
  master.connect(compressor);compressor.connect(ctx.destination);
  // Gently detuned analog room-tone; new composition, not an existing score.
  for(const [freq,level,wave,rate] of [[54.9,.18,"sine",.055],[82.41,.11,"triangle",.091],[109.8,.055,"sine",.043],[164.81,.02,"triangle",.038]]){
   const osc=ctx.createOscillator(),gain=ctx.createGain(),sweep=ctx.createOscillator(),depth=ctx.createGain();
   osc.type=wave;osc.frequency.value=freq;gain.gain.value=level;
   sweep.type="sine";sweep.frequency.value=rate;depth.gain.value=level*.16;
   sweep.connect(depth);depth.connect(gain.gain);
   osc.connect(gain);gain.connect(master);
   osc.start();sweep.start();
   voices.push(osc);lfo.push(sweep);
  }
  // Low-passed analogue hiss, synthesized rather than sampled.
  const count=ctx.sampleRate*4|0;
  const buf=ctx.createBuffer(1,count,ctx.sampleRate),a=buf.getChannelData(0);
  let seed=138957;
  for(let i=0;i<count;i++){
   seed=(Math.imul(seed,1664525)+1013904223)>>>0;
   a[i]=((seed/4294967296)*2-1)*.19;
  }
  const noise=ctx.createBufferSource(),low=ctx.createBiquadFilter(),ngain=ctx.createGain();
  noise.buffer=buf;noise.loop=true;
  low.type="lowpass";low.frequency.value=255;ngain.gain.value=.045;
  noise.connect(low);low.connect(ngain);ngain.connect(master);noise.start();
  ready=true;
  return true;
 }
 function start(){
  if(!initialise())return false;
  playing=true;
  try{
   const p=ctx.resume();
   const now=ctx.currentTime;
   master.gain.cancelScheduledValues(now);
   master.gain.setTargetAtTime(vol,now,.7);
   if(p&&p.catch)p.catch(()=>{playing=false;change();});
   change();return true;
  }catch(e){playing=false;change();return false;}
 }
 function stop(){
  if(!ctx){playing=false;change();return;}
  playing=false;
  const now=ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setTargetAtTime(.00001,now,.16);
  // Suspend after the fade, allowing click-to-resume without recreating nodes.
  const c=ctx;
  setTimeout(()=>{if(!playing&&c.state==="running")c.suspend().catch(()=>{});},650);
  change();
 }
 function setVolume(v){
  vol=Math.max(0,Math.min(1,Number(v)||0));
  if(ctx&&master&&playing)master.gain.setTargetAtTime(vol,ctx.currentTime,.15);
  change();
 }
 window.MANIPUR_AMBIENCE={start,stop,setVolume,get playing(){return playing},get volume(){return vol},
  label:"Original investigative ambience (nonverbal)",isOriginal:true};
})();
