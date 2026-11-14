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
 function audioPicker(){return document.getElementById("ms-file");}
 function say(text){status.textContent=text;}
 function updateAudioStatus(){
  const a=localAudio();
  if(!a){say("The local audio player is unavailable. Enter silently or use the terminal sound controls.");return;}
  if(a.hasFile){say("Browser-local audio ready. Your soundtrack will start when you select Enter with Sound.");}
  else{say("Only the original recording is supported; public one-click playback requires an authorized hosted copy.");}
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
 }
 function enterSilently(){
  try{localAudio()?.pause?.();}catch(e){}
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
  const a=localAudio();
  if(a?.hasFile){startSavedSound();return;}
  if(a&&!a.storageReady){
   say("Checking this browser for the saved original soundtrack…");
   a.ready.then(()=>{
    if(closed)return;
    if(localAudio()?.hasFile)startSavedSound();
    else say("This browser has no saved soundtrack. Public one-click playback requires an authorized hosted audio file.");
   });
   return;
  }
  say("The original soundtrack is not available in this browser. Public one-click playback requires a licensed hosted audio file. You may enter silently.");
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
  btn.setAttribute("aria-label","Enable or disable personal soundtrack");
  btn.setAttribute("aria-pressed","false");
  const theme=document.getElementById("manipur-theme-switch");
  if(theme)top.insertBefore(btn,theme);else top.appendChild(btn);
  const audio=document.getElementById("manipur-personal-audio");
  const update=()=>{
   const playing=!!audio&&!audio.paused&&!audio.ended;
   btn.textContent=playing?"♫ SOUND ON":"◌ SOUND OFF";
   btn.setAttribute("aria-pressed",String(playing));
   btn.title=playing?"Pause soundtrack":"Play the original Manipur soundtrack when available in this browser";
  };
  btn.addEventListener("click",()=>{
   const a=localAudio();if(!a)return;
   if(a.playing){a.pause();update();return;}
   if(a.hasFile){a.play();update();}
   else{
    const file=audioPicker();
    if(file)file.click();
   }
  });
  audio?.addEventListener("play",update);
  audio?.addEventListener("pause",update);
  audio?.addEventListener("ended",update);
  update();
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{mountSoundToggle();check();},{once:true});
 else{mountSoundToggle();check();}
 new MutationObserver(check).observe(document.body,{childList:true,subtree:false});
 window.MANIPUR_ENTRY_SOUND={get shown(){return !overlay.hidden&&overlay.isConnected;},get dismissed(){return closed;},showWhenReady:show};
})();
