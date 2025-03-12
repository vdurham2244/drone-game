System.register(["./three-legacy-6216e3a5.js"],(function(e,n){"use strict";var t;return{setters:[e=>{t=e.T}],execute:function(){let e=!1,n=[];function o(e,t){const o=document.getElementById("errorContainer"),r=document.getElementById("errorTitle"),i=document.getElementById("errorDetails");n.push({title:e,details:t,time:(new Date).toISOString()}),o.style.display="block",r.textContent=e,i.textContent=n.map((e=>`[${e.time}]\n${e.title}\n${e.details}\n`)).join("\n---\n\n");const a=document.getElementById("loadingProgress");a&&(a.style.display="none")}async function r(){try{if(!function(){const e=document.createElement("canvas");try{return!!e.getContext("webgl",{powerPreference:"default",failIfMajorPerformanceCaveat:!1,antialias:!1})}catch(n){return!1}}())return void o("WebGL Error","WebGL is not supported or disabled in your browser");const n=document.createElement("script");n.type="module",n.src="./src/main.ts",n.onerror=e=>{console.error("Failed to load game script:",e),o("Game Loading Error","Failed to load game script. Please check console for details.")},n.onload=()=>{e=!0,document.getElementById("loadingProgress").style.display="none"},document.body.appendChild(n)}catch(n){o("Loading Error",n.message||"Unknown error occurred")}}window.retryLoading=function(){e||(n=[],document.getElementById("errorContainer").style.display="none",document.getElementById("loadingProgress").style.display="block",r())},window.clearAndRetry=function(){localStorage.clear(),sessionStorage.clear();const e=document.cookie.split(";");for(let n=0;n<e.length;n++){const t=e[n],o=t.indexOf("="),r=o>-1?t.substr(0,o):t;document.cookie=r+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}window.location.reload()},window.addEventListener("load",(()=>{try{if(void 0===t)throw new Error("Three.js failed to load");r()}catch(e){o("Loading Error",e.message||"Failed to initialize game")}})),window.addEventListener("error",(function(n){return e||o("JavaScript Error",`${n.message}\nFile: ${n.filename}\nLine: ${n.lineno}\nColumn: ${n.colno}`),!1})),window.addEventListener("unhandledrejection",(function(n){e||o("Loading Error",n.reason?.message||"Unknown error occurred")}))}}}));
//# sourceMappingURL=index-legacy-96d79c04.js.map
