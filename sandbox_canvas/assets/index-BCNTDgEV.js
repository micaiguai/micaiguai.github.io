import{d as u,u as c,w as _,v as f,c as i,m as h,o as d,r as v,a as x,b as r,i as V,e as b,f as t,g}from"./index-D7fs5sRP.js";const y=u({__name:"TheInput",props:{modelValue:{},modelModifiers:{}},emits:["update:modelValue"],setup(a){const e=c(a,"modelValue");return(o,n)=>_((d(),i("input",h({id:"input","onUpdate:modelValue":n[0]||(n[0]=s=>e.value=s),type:"text"},o.$attrs,{p:"x-4 y-2",w:"250px",text:"center",bg:"transparent",border:"~ rounded gray-200 dark:gray-700",outline:"none active:none"}),null,16)),[[f,e.value]])}}),k=t("div",{"i-carbon-campsite":"","inline-block":"","text-4xl":""},null,-1),w=t("p",null,[t("a",{rel:"noreferrer",href:"https://github.com/antfu/vitesse-lite",target:"_blank"}," Vitesse Lite ")],-1),I=t("p",null,[t("em",{"text-sm":"",op75:""},"Opinionated Vite Starter Template")],-1),T=t("div",{"py-4":""},null,-1),B=["disabled"],M=u({name:"IndexPage",__name:"index",setup(a){const e=v(""),o=g();function n(){e.value&&o.push(`/hi/${encodeURIComponent(e.value)}`)}return(s,l)=>{const p=y;return d(),i("div",null,[k,w,I,T,x(p,{modelValue:r(e),"onUpdate:modelValue":l[0]||(l[0]=m=>V(e)?e.value=m:null),placeholder:"What's your name?",autocomplete:"false",onKeydown:b(n,["enter"])},null,8,["modelValue"]),t("div",null,[t("button",{class:"m-3 text-sm btn",disabled:!r(e),onClick:n}," Go ",8,B)])])}}});export{M as default};
