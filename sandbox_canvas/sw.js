if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>o[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-f3e6b16a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"about.html",revision:"ad01c8675ef3f21336dc0993f3fb1fa4"},{url:"assets/_...all_-BigvDVYp.js",revision:null},{url:"assets/_name_-C5HF6cpN.js",revision:null},{url:"assets/_plugin-vue_export-helper-DlAUqK2U.js",revision:null},{url:"assets/404-R6C2rj0Z.js",revision:null},{url:"assets/about-GbCNzrCc.js",revision:null},{url:"assets/app-Bcsd6ZSn.css",revision:null},{url:"assets/app-Btv13WWp.js",revision:null},{url:"assets/ar-HvujSz0t.js",revision:null},{url:"assets/de-tIfILiOM.js",revision:null},{url:"assets/default-QGp50obp.js",revision:null},{url:"assets/en-uqoOIB2y.js",revision:null},{url:"assets/es-DCBmW4A7.js",revision:null},{url:"assets/fr-C-cySWgT.js",revision:null},{url:"assets/home-DAYIAIq1.js",revision:null},{url:"assets/id-Cdl9masJ.js",revision:null},{url:"assets/index-VFLkZSF5.js",revision:null},{url:"assets/it-CZF_x55d.js",revision:null},{url:"assets/ja-bk9vkbha.js",revision:null},{url:"assets/ka-DrXH8DM7.js",revision:null},{url:"assets/ko-D1Wq3H7u.js",revision:null},{url:"assets/pl-x_vaV0QH.js",revision:null},{url:"assets/pt-BR-CJ3Aq30r.js",revision:null},{url:"assets/README-CeFfzMP4.js",revision:null},{url:"assets/route-block-B_A1xBdJ.js",revision:null},{url:"assets/ru-BQt2BLfU.js",revision:null},{url:"assets/tr-CMH1HB1g.js",revision:null},{url:"assets/uk-PdFIL57p.js",revision:null},{url:"assets/user-_CgFLsgf.js",revision:null},{url:"assets/uz-D9sR80nb.js",revision:null},{url:"assets/vi-BsN4yQMQ.js",revision:null},{url:"assets/virtual_pwa-register-DM-oRxRk.js",revision:null},{url:"assets/vue.f36acd1f-Dp3FCRxE.js",revision:null},{url:"assets/workbox-window.prod.es5-DFjpnwFp.js",revision:null},{url:"assets/zh-CN-CME5MBO5.js",revision:null},{url:"hi.html",revision:"c25464b7316cd45ddfce38e86b5ed6bf"},{url:"index.html",revision:"f4fc4344739df320b2081c7a7ca11da8"},{url:"README.html",revision:"c25464b7316cd45ddfce38e86b5ed6bf"},{url:"favicon.svg",revision:"a795ab195c26601ea433babed25a7d0d"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"20bb9b55bd3413111a04a262298ee2f1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
