import{d as p,u as d,p as _,a as k,q as f,r as x,o as r,c as i,e,t as o,f as t,F as b,s as h,b as v,x as y,y as N,z as C}from"./app-Btv13WWp.js";import{u as R}from"./user-_CgFLsgf.js";const V=e("div",{"text-4xl":""},[e("div",{"i-carbon-pedestrian":"","inline-block":""})],-1),g={"text-sm":"","opacity-75":""},w={key:0,"mt-4":"","text-sm":""},B={"opacity-75":""},$=p({__name:"[name]",setup(L){const c=d(),l=_(),s=R(),{t:n}=k();return f(()=>{s.setNewName(l.params.name)}),(E,u)=>{const m=x("RouterLink");return r(),i("div",null,[V,e("p",null,o(t(n)("intro.hi",{name:t(s).savedName})),1),e("p",g,[e("em",null,o(t(n)("intro.dynamic-route")),1)]),t(s).otherNames.length?(r(),i("p",w,[e("span",B,o(t(n)("intro.aka"))+":",1),e("ul",null,[(r(!0),i(b,null,h(t(s).otherNames,a=>(r(),i("li",{key:a},[v(m,{to:`/hi/${a}`,replace:""},{default:y(()=>[C(o(a),1)]),_:2},1032,["to"])]))),128))])])):N("",!0),e("div",null,[e("button",{m:"3 t6","text-sm":"",btn:"",onClick:u[0]||(u[0]=a=>t(c).back())},o(t(n)("button.back")),1)])])}}});export{$ as default};