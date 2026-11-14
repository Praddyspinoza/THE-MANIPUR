/* Preview-only appearance selector. Does not touch evidence, media, orbital
   animations, URLs, geometry, chart calculations, video players or sound. */
(function(){
 "use strict";
 const KEY="manipur-preview-theme-20261114";
 const allowed=new Set(["obsidian","silver"]);
 let current="obsidian";
 try{const saved=localStorage.getItem(KEY);if(allowed.has(saved))current=saved;}catch(e){}
 function setTheme(name,save){
   current=allowed.has(name)?name:"obsidian";
   document.documentElement.setAttribute("data-manipur-theme",current);
   document.body?.setAttribute("data-manipur-theme",current);
   const select=document.getElementById("manipur-theme-choice");
   if(select)select.value=current;
   if(save){try{localStorage.setItem(KEY,current);}catch(e){}}
 }
 setTheme(current,false);
 function mount(){
   const top=document.querySelector(".topbar");
   if(!top||document.getElementById("manipur-theme-switch"))return;
   const control=document.createElement("div");
   control.id="manipur-theme-switch";control.className="manipur-theme-switch";
   control.innerHTML='<label for="manipur-theme-choice">THEME</label><select id="manipur-theme-choice" aria-label="Choose terminal colour palette"><option value="obsidian">OBSIDIAN / GOLD</option><option value="silver">OBSIDIAN / SILVER</option></select>';
   const anchor=document.getElementById("deskToggle");
   top.insertBefore(control,anchor||null);
   const select=control.querySelector("select");
   select.value=current;
   select.addEventListener("change",()=>setTheme(select.value,true));
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
 window.MANIPUR_THEME={get current(){return current;},select:name=>setTheme(name,true),choices:["obsidian","silver"]};
})();
