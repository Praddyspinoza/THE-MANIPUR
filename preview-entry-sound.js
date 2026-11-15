/* MANIPUR PREVIEW — audio consent gateway, after all existing cinematics.
   This file does not modify footage, research records, district geometry or motion.
   Browser-local user-selected sound only; public soundtrack requires rights/licensing. */
(function(){
 "use strict";
 if(document.getElementById("manipur-entry-sound"))return;

 const overlay=document.createElement("section");
 overlay.id="manipur-entry-sound";
 overlay.className="manipur-entry-sound";
 overlay.hidden=true;
 overlay.setAttribute("role","dialog");
 overlay.setAttribute("aria-modal","true");
 overlay.setAttribute("aria-labelledby","manipur-entry-title");
 overlay.setAttribute("aria-describedby","manipur-entry-description");
 overlay.innerHTML=
  '<div class="manipur-entry-frame">'+
   '<p class="manipur-entry-kicker">MANIPUR / THE EVIDENCE TERMINAL</p>'+
   '<div class="manipur-entry-sound-icon" aria-hidden="true">◈</div>'+
   '<h2 id="manipur-entry-title">Enter the Research Terminal</h2>'+
   '<p id="manipur-entry-description">Choose how you would like to experience the research terminal.</p>'+
   '<div class="manipur-entry-actions">'+
    '<button type="button" id="manipur-enter-with-sound">▶ &nbsp; ENTER WITH SOUND</button>'+
    '<button type="button" id="manipur-enter-silent">ENTER SILENTLY</button>'+
   '</div>'+
   '<p id="manipur-entry-audio-status" class="manipur-entry-audio-status" role="status"></p>'+
   '<p class="manipur-entry-foot">The visuals and research are identical with or without sound.</p>'+
  '</div>';
 document.body.appendChild(overlay);
 const soundButton=overlay.querySelector("#manipur-enter-with-sound");
 const silentButton=overlay.querySelector("#manipur-enter-silent");
 const status=overlay.querySelector("#manipur-entry-audio-status");
 let prompted=false, closed=false, previousOverflow="", checkPending=0;

 function localAudio(){return window.MANIPUR_LOCAL_AUDIO||null;}
 function ambience(){return window.MANIPUR_AMBIENCE||null;}
 function audioPicker(){return document.getElementById("ms-file");}
 function say(text){status.textContent=text;}
 function updateAudioStatus(){
  const a=ambience();
  if(a){say("Original dark investigative ambience is ready. No upload required; tap Enter with Sound to begin.");}
  else{say("This browser has not loaded the ambient audio engine. Enter silently if necessary.");}
 }
 function isCinematicComplete(){
  const opening=document.getElementById("ci-gate");
  const postlude=document.getElementById("mp-coda");
  return (!opening||!opening.isConnected)&&(!postlude||!postlude.isConnected);
 }
 function show(){
  if(prompted||closed||!isCinematicComplete())return;
  prompted=true;
  updateAudioStatus();
  previousOverflow=document.body.style.overflow;
  document.body.style.overflow="hidden";
  overlay.hidden=false;
  soundButton.focus({preventScroll:true});
 }
 function check(){clearTimeout(checkPending);checkPending=setTimeout(show,110);}
 function close(){
  if(closed)return;
  closed=true;
  overlay.hidden=true;
  document.body.style.overflow=previousOverflow;
  overlay.remove();
  // Notify the source-video parallax of the existing consent choice so
  // terminal content is revealed only when the visitor enters.
  document.dispatchEvent(new Event("manipur-terminal-entered"));
 }
 function enterSilently(){
  try{ambience()?.stop?.();localAudio()?.pause?.();}catch(e){}
  close();
 }
 function startSavedSound(){
  const a=localAudio();
  if(!a?.hasFile)return false;
  try{a.play();}catch(e){say("Audio could not start; use the Sound button in the terminal.");}
  close();
  return true;
 }
 function enterWithSound(){
  // The visitor tap unlocks Web Audio. Never request a file upload.
  const score=ambience();
  if(!score){say("Ambient score unavailable in this browser. Choose Enter Silently.");return;}
  let ok=false;try{ok=score.start();}catch(e){}
  if(ok){try{localAudio()?.pause?.();}catch(e){}close();}
  else say("Audio could not start on this device. Check its volume or enter silently.");
 }
 soundButton.addEventListener("click",enterWithSound);
 silentButton.addEventListener("click",enterSilently);
 overlay.addEventListener("keydown",e=>{
  if(e.key==="Escape"){e.preventDefault();enterSilently();}
  if(e.key==="Tab"){
   const buttons=[soundButton,silentButton],focus=buttons.indexOf(document.activeElement);
   if(e.shiftKey&&focus===0){e.preventDefault();silentButton.focus();}
   else if(!e.shiftKey&&focus===1){e.preventDefault();soundButton.focus();}
  }
 });
 const picker=audioPicker();
 document.addEventListener("manipur-original-audio-verified",()=>{
  if(!overlay.isConnected||closed)return;
  if(localAudio()?.hasFile)startSavedSound();
 });
 function mountSoundToggle(){
  if(document.getElementById("manipur-sound-toggle"))return;
  const top=document.querySelector(".topbar");if(!top)return;
  const btn=document.createElement("button");
  btn.id="manipur-sound-toggle";btn.type="button";btn.className="manipur-sound-toggle";
  btn.textContent="◌ SOUND OFF";
  btn.setAttribute("aria-label","Turn original investigative ambience on or off");
  btn.setAttribute("aria-pressed","false");
  const theme=document.getElementById("manipur-theme-switch");
  if(theme)top.insertBefore(btn,theme);else top.appendChild(btn);
  const update=()=>{
   const playing=!!ambience()?.playing;
   btn.textContent=playing?"♫ SOUND ON":"◌ SOUND OFF";
   btn.setAttribute("aria-pressed",String(playing));
   btn.title=playing?"Pause original investigative ambience":"Play original investigative ambience";
  };
  btn.addEventListener("click",()=>{
   const score=ambience();if(!score)return;
   if(score.playing)score.stop();
   else score.start();
   update();
  });
  document.addEventListener("manipur-ambience-change",update);
  update();
 }

 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{mountSoundToggle();check();},{once:true});
 else{mountSoundToggle();check();}
 new MutationObserver(check).observe(document.body,{childList:true,subtree:false});
 window.MANIPUR_ENTRY_SOUND={get shown(){return !overlay.hidden&&overlay.isConnected;},get dismissed(){return closed;},showWhenReady:show};
})();
