import{_ as l}from"./app-Btv13WWp.js";function f(c={}){const{immediate:d=!1,onNeedRefresh:v,onOfflineReady:i,onRegistered:s,onRegisteredSW:n,onRegisterError:t}=c;let a,r;const o=async(e=!0)=>{await r};async function _(){if("serviceWorker"in navigator){if(a=await l(()=>import("./workbox-window.prod.es5-DFjpnwFp.js"),[]).then(({Workbox:e})=>new e("/sandbox_canvas/sw.js",{scope:"/sandbox_canvas/",type:"classic"})).catch(e=>{t==null||t(e)}),!a)return;a.addEventListener("activated",e=>{(e.isUpdate||e.isExternal)&&window.location.reload()}),a.addEventListener("installed",e=>{e.isUpdate||i==null||i()}),a.register({immediate:d}).then(e=>{n?n("/sandbox_canvas/sw.js",e):s==null||s(e)}).catch(e=>{t==null||t(e)})}}return r=_(),o}export{f as registerSW};