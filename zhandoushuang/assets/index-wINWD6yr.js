(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Hh(i,e){const t=new Set(i.split(","));return e?n=>t.has(n.toLowerCase()):n=>t.has(n)}const Wt={},vo=[],hi=()=>{},jA=()=>!1,Vc=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Vh=i=>i.startsWith("onUpdate:"),pn=Object.assign,Gh=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},QA=Object.prototype.hasOwnProperty,Tt=(i,e)=>QA.call(i,e),pt=Array.isArray,Ta=i=>kc(i)==="[object Map]",eb=i=>kc(i)==="[object Set]",_t=i=>typeof i=="function",mn=i=>typeof i=="string",Gc=i=>typeof i=="symbol",en=i=>i!==null&&typeof i=="object",pv=i=>(en(i)||_t(i))&&_t(i.then)&&_t(i.catch),tb=Object.prototype.toString,kc=i=>tb.call(i),nb=i=>kc(i).slice(8,-1),ib=i=>kc(i)==="[object Object]",kh=i=>mn(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Aa=Hh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Wc=i=>{const e=Object.create(null);return t=>e[t]||(e[t]=i(t))},rb=/-(\w)/g,bo=Wc(i=>i.replace(rb,(e,t)=>t?t.toUpperCase():"")),sb=/\B([A-Z])/g,Bo=Wc(i=>i.replace(sb,"-$1").toLowerCase()),mv=Wc(i=>i.charAt(0).toUpperCase()+i.slice(1)),_f=Wc(i=>i?`on${mv(i)}`:""),Zr=(i,e)=>!Object.is(i,e),vf=(i,e)=>{for(let t=0;t<i.length;t++)i[t](e)},Rc=(i,e,t)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value:t})},ob=i=>{const e=parseFloat(i);return isNaN(e)?i:e};let Hm;const gv=()=>Hm||(Hm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Wh(i){if(pt(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],r=mn(n)?ub(n):Wh(n);if(r)for(const o in r)e[o]=r[o]}return e}else if(mn(i)||en(i))return i}const ab=/;(?![^(]*\))/g,lb=/:([^]+)/,cb=/\/\*[^]*?\*\//g;function ub(i){const e={};return i.replace(cb,"").split(ab).forEach(t=>{if(t){const n=t.split(lb);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Xh(i){let e="";if(mn(i))e=i;else if(pt(i))for(let t=0;t<i.length;t++){const n=Xh(i[t]);n&&(e+=n+" ")}else if(en(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}const fb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",hb=Hh(fb);function _v(i){return!!i||i===""}/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Si;class db{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Si,!e&&Si&&(this.index=(Si.scopes||(Si.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=Si;try{return Si=this,e()}finally{Si=t}}}on(){Si=this}off(){Si=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function pb(i,e=Si){e&&e.active&&e.effects.push(i)}function mb(){return Si}let Ts;class qh{constructor(e,t,n,r){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,pb(this,r)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,Ps();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(gb(t.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),Ls()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Xr,t=Ts;try{return Xr=!0,Ts=this,this._runnings++,Vm(this),this.fn()}finally{Gm(this),this._runnings--,Ts=t,Xr=e}}stop(){var e;this.active&&(Vm(this),Gm(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function gb(i){return i.value}function Vm(i){i._trackId++,i._depsLength=0}function Gm(i){if(i.deps.length>i._depsLength){for(let e=i._depsLength;e<i.deps.length;e++)vv(i.deps[e],i);i.deps.length=i._depsLength}}function vv(i,e){const t=i.get(e);t!==void 0&&e._trackId!==t&&(i.delete(e),i.size===0&&i.cleanup())}let Xr=!0,ph=0;const xv=[];function Ps(){xv.push(Xr),Xr=!1}function Ls(){const i=xv.pop();Xr=i===void 0?!0:i}function Kh(){ph++}function Yh(){for(ph--;!ph&&mh.length;)mh.shift()()}function yv(i,e,t){if(e.get(i)!==i._trackId){e.set(i,i._trackId);const n=i.deps[i._depsLength];n!==e?(n&&vv(n,i),i.deps[i._depsLength++]=e):i._depsLength++}}const mh=[];function Mv(i,e,t){Kh();for(const n of i.keys()){let r;n._dirtyLevel<e&&(r??(r=i.get(n)===n._trackId))&&(n._shouldSchedule||(n._shouldSchedule=n._dirtyLevel===0),n._dirtyLevel=e),n._shouldSchedule&&(r??(r=i.get(n)===n._trackId))&&(n.trigger(),(!n._runnings||n.allowRecurse)&&n._dirtyLevel!==2&&(n._shouldSchedule=!1,n.scheduler&&mh.push(n.scheduler)))}Yh()}const Sv=(i,e)=>{const t=new Map;return t.cleanup=i,t.computed=e,t},gh=new WeakMap,As=Symbol(""),_h=Symbol("");function Gn(i,e,t){if(Xr&&Ts){let n=gh.get(i);n||gh.set(i,n=new Map);let r=n.get(t);r||n.set(t,r=Sv(()=>n.delete(t))),yv(Ts,r)}}function dr(i,e,t,n,r,o){const a=gh.get(i);if(!a)return;let c=[];if(e==="clear")c=[...a.values()];else if(t==="length"&&pt(i)){const u=Number(n);a.forEach((f,d)=>{(d==="length"||!Gc(d)&&d>=u)&&c.push(f)})}else switch(t!==void 0&&c.push(a.get(t)),e){case"add":pt(i)?kh(t)&&c.push(a.get("length")):(c.push(a.get(As)),Ta(i)&&c.push(a.get(_h)));break;case"delete":pt(i)||(c.push(a.get(As)),Ta(i)&&c.push(a.get(_h)));break;case"set":Ta(i)&&c.push(a.get(As));break}Kh();for(const u of c)u&&Mv(u,4);Yh()}const _b=Hh("__proto__,__v_isRef,__isVue"),Ev=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(Gc)),km=vb();function vb(){const i={};return["includes","indexOf","lastIndexOf"].forEach(e=>{i[e]=function(...t){const n=bt(this);for(let o=0,a=this.length;o<a;o++)Gn(n,"get",o+"");const r=n[e](...t);return r===-1||r===!1?n[e](...t.map(bt)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{i[e]=function(...t){Ps(),Kh();const n=bt(this)[e].apply(this,t);return Yh(),Ls(),n}}),i}function xb(i){const e=bt(this);return Gn(e,"has",i),e.hasOwnProperty(i)}class Tv{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){const r=this._isReadonly,o=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return o;if(t==="__v_raw")return n===(r?o?Ib:Rv:o?wv:bv).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const a=pt(e);if(!r){if(a&&Tt(km,t))return Reflect.get(km,t,n);if(t==="hasOwnProperty")return xb}const c=Reflect.get(e,t,n);return(Gc(t)?Ev.has(t):_b(t))||(r||Gn(e,"get",t),o)?c:kn(c)?a&&kh(t)?c:c.value:en(c)?r?Cv(c):Jh(c):c}}class Av extends Tv{constructor(e=!1){super(!1,e)}set(e,t,n,r){let o=e[t];if(!this._isShallow){const u=wo(o);if(!Cc(n)&&!wo(n)&&(o=bt(o),n=bt(n)),!pt(e)&&kn(o)&&!kn(n))return u?!1:(o.value=n,!0)}const a=pt(e)&&kh(t)?Number(t)<e.length:Tt(e,t),c=Reflect.set(e,t,n,r);return e===bt(r)&&(a?Zr(n,o)&&dr(e,"set",t,n):dr(e,"add",t,n)),c}deleteProperty(e,t){const n=Tt(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&dr(e,"delete",t,void 0),r}has(e,t){const n=Reflect.has(e,t);return(!Gc(t)||!Ev.has(t))&&Gn(e,"has",t),n}ownKeys(e){return Gn(e,"iterate",pt(e)?"length":As),Reflect.ownKeys(e)}}class yb extends Tv{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Mb=new Av,Sb=new yb,Eb=new Av(!0),$h=i=>i,Xc=i=>Reflect.getPrototypeOf(i);function Bl(i,e,t=!1,n=!1){i=i.__v_raw;const r=bt(i),o=bt(e);t||(Zr(e,o)&&Gn(r,"get",e),Gn(r,"get",o));const{has:a}=Xc(r),c=n?$h:t?Qh:Da;if(a.call(r,e))return c(i.get(e));if(a.call(r,o))return c(i.get(o));i!==r&&i.get(e)}function zl(i,e=!1){const t=this.__v_raw,n=bt(t),r=bt(i);return e||(Zr(i,r)&&Gn(n,"has",i),Gn(n,"has",r)),i===r?t.has(i):t.has(i)||t.has(r)}function Hl(i,e=!1){return i=i.__v_raw,!e&&Gn(bt(i),"iterate",As),Reflect.get(i,"size",i)}function Wm(i){i=bt(i);const e=bt(this);return Xc(e).has.call(e,i)||(e.add(i),dr(e,"add",i,i)),this}function Xm(i,e){e=bt(e);const t=bt(this),{has:n,get:r}=Xc(t);let o=n.call(t,i);o||(i=bt(i),o=n.call(t,i));const a=r.call(t,i);return t.set(i,e),o?Zr(e,a)&&dr(t,"set",i,e):dr(t,"add",i,e),this}function qm(i){const e=bt(this),{has:t,get:n}=Xc(e);let r=t.call(e,i);r||(i=bt(i),r=t.call(e,i)),n&&n.call(e,i);const o=e.delete(i);return r&&dr(e,"delete",i,void 0),o}function Km(){const i=bt(this),e=i.size!==0,t=i.clear();return e&&dr(i,"clear",void 0,void 0),t}function Vl(i,e){return function(n,r){const o=this,a=o.__v_raw,c=bt(a),u=e?$h:i?Qh:Da;return!i&&Gn(c,"iterate",As),a.forEach((f,d)=>n.call(r,u(f),u(d),o))}}function Gl(i,e,t){return function(...n){const r=this.__v_raw,o=bt(r),a=Ta(o),c=i==="entries"||i===Symbol.iterator&&a,u=i==="keys"&&a,f=r[i](...n),d=t?$h:e?Qh:Da;return!e&&Gn(o,"iterate",u?_h:As),{next(){const{value:p,done:m}=f.next();return m?{value:p,done:m}:{value:c?[d(p[0]),d(p[1])]:d(p),done:m}},[Symbol.iterator](){return this}}}}function Cr(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function Tb(){const i={get(o){return Bl(this,o)},get size(){return Hl(this)},has:zl,add:Wm,set:Xm,delete:qm,clear:Km,forEach:Vl(!1,!1)},e={get(o){return Bl(this,o,!1,!0)},get size(){return Hl(this)},has:zl,add:Wm,set:Xm,delete:qm,clear:Km,forEach:Vl(!1,!0)},t={get(o){return Bl(this,o,!0)},get size(){return Hl(this,!0)},has(o){return zl.call(this,o,!0)},add:Cr("add"),set:Cr("set"),delete:Cr("delete"),clear:Cr("clear"),forEach:Vl(!0,!1)},n={get(o){return Bl(this,o,!0,!0)},get size(){return Hl(this,!0)},has(o){return zl.call(this,o,!0)},add:Cr("add"),set:Cr("set"),delete:Cr("delete"),clear:Cr("clear"),forEach:Vl(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{i[o]=Gl(o,!1,!1),t[o]=Gl(o,!0,!1),e[o]=Gl(o,!1,!0),n[o]=Gl(o,!0,!0)}),[i,t,e,n]}const[Ab,bb,wb,Rb]=Tb();function Zh(i,e){const t=e?i?Rb:wb:i?bb:Ab;return(n,r,o)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(Tt(t,r)&&r in n?t:n,r,o)}const Cb={get:Zh(!1,!1)},Pb={get:Zh(!1,!0)},Lb={get:Zh(!0,!1)},bv=new WeakMap,wv=new WeakMap,Rv=new WeakMap,Ib=new WeakMap;function Nb(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Db(i){return i.__v_skip||!Object.isExtensible(i)?0:Nb(nb(i))}function Jh(i){return wo(i)?i:jh(i,!1,Mb,Cb,bv)}function Ub(i){return jh(i,!1,Eb,Pb,wv)}function Cv(i){return jh(i,!0,Sb,Lb,Rv)}function jh(i,e,t,n,r){if(!en(i)||i.__v_raw&&!(e&&i.__v_isReactive))return i;const o=r.get(i);if(o)return o;const a=Db(i);if(a===0)return i;const c=new Proxy(i,a===2?n:t);return r.set(i,c),c}function xo(i){return wo(i)?xo(i.__v_raw):!!(i&&i.__v_isReactive)}function wo(i){return!!(i&&i.__v_isReadonly)}function Cc(i){return!!(i&&i.__v_isShallow)}function Pv(i){return xo(i)||wo(i)}function bt(i){const e=i&&i.__v_raw;return e?bt(e):i}function Lv(i){return Object.isExtensible(i)&&Rc(i,"__v_skip",!0),i}const Da=i=>en(i)?Jh(i):i,Qh=i=>en(i)?Cv(i):i;class Iv{constructor(e,t,n,r){this.getter=e,this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new qh(()=>e(this._value),()=>yc(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=n}get value(){const e=bt(this);return(!e._cacheable||e.effect.dirty)&&Zr(e._value,e._value=e.effect.run())&&yc(e,4),Nv(e),e.effect._dirtyLevel>=2&&yc(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Ob(i,e,t=!1){let n,r;const o=_t(i);return o?(n=i,r=hi):(n=i.get,r=i.set),new Iv(n,r,o||!r,t)}function Nv(i){var e;Xr&&Ts&&(i=bt(i),yv(Ts,(e=i.dep)!=null?e:i.dep=Sv(()=>i.dep=void 0,i instanceof Iv?i:void 0)))}function yc(i,e=4,t){i=bt(i);const n=i.dep;n&&Mv(n,e)}function kn(i){return!!(i&&i.__v_isRef===!0)}function Pr(i){return Fb(i,!0)}function Fb(i,e){return kn(i)?i:new Bb(i,e)}class Bb{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:bt(e),this._value=t?e:Da(e)}get value(){return Nv(this),this._value}set value(e){const t=this.__v_isShallow||Cc(e)||wo(e);e=t?e:bt(e),Zr(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Da(e),yc(this,4))}}function zb(i){return kn(i)?i.value:i}const Hb={get:(i,e,t)=>zb(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const r=i[e];return kn(r)&&!kn(t)?(r.value=t,!0):Reflect.set(i,e,t,n)}};function Dv(i){return xo(i)?i:new Proxy(i,Hb)}/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function qr(i,e,t,n){try{return n?i(...n):i()}catch(r){qc(r,e,t)}}function bi(i,e,t,n){if(_t(i)){const o=qr(i,e,t,n);return o&&pv(o)&&o.catch(a=>{qc(a,e,t)}),o}const r=[];for(let o=0;o<i.length;o++)r.push(bi(i[o],e,t,n));return r}function qc(i,e,t,n=!0){const r=e?e.vnode:null;if(e){let o=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const f=o.ec;if(f){for(let d=0;d<f.length;d++)if(f[d](i,a,c)===!1)return}o=o.parent}const u=e.appContext.config.errorHandler;if(u){qr(u,null,10,[i,a,c]);return}}Vb(i,t,r,n)}function Vb(i,e,t,n=!0){console.error(i)}let Ua=!1,vh=!1;const Sn=[];let Oi=0;const yo=[];let Br=null,ys=0;const Uv=Promise.resolve();let ed=null;function Gb(i){const e=ed||Uv;return i?e.then(this?i.bind(this):i):e}function kb(i){let e=Oi+1,t=Sn.length;for(;e<t;){const n=e+t>>>1,r=Sn[n],o=Oa(r);o<i||o===i&&r.pre?e=n+1:t=n}return e}function td(i){(!Sn.length||!Sn.includes(i,Ua&&i.allowRecurse?Oi+1:Oi))&&(i.id==null?Sn.push(i):Sn.splice(kb(i.id),0,i),Ov())}function Ov(){!Ua&&!vh&&(vh=!0,ed=Uv.then(Bv))}function Wb(i){const e=Sn.indexOf(i);e>Oi&&Sn.splice(e,1)}function Xb(i){pt(i)?yo.push(...i):(!Br||!Br.includes(i,i.allowRecurse?ys+1:ys))&&yo.push(i),Ov()}function Ym(i,e,t=Ua?Oi+1:0){for(;t<Sn.length;t++){const n=Sn[t];if(n&&n.pre){if(i&&n.id!==i.uid)continue;Sn.splice(t,1),t--,n()}}}function Fv(i){if(yo.length){const e=[...new Set(yo)].sort((t,n)=>Oa(t)-Oa(n));if(yo.length=0,Br){Br.push(...e);return}for(Br=e,ys=0;ys<Br.length;ys++)Br[ys]();Br=null,ys=0}}const Oa=i=>i.id==null?1/0:i.id,qb=(i,e)=>{const t=Oa(i)-Oa(e);if(t===0){if(i.pre&&!e.pre)return-1;if(e.pre&&!i.pre)return 1}return t};function Bv(i){vh=!1,Ua=!0,Sn.sort(qb);try{for(Oi=0;Oi<Sn.length;Oi++){const e=Sn[Oi];e&&e.active!==!1&&qr(e,null,14)}}finally{Oi=0,Sn.length=0,Fv(),Ua=!1,ed=null,(Sn.length||yo.length)&&Bv()}}function Kb(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||Wt;let r=t;const o=e.startsWith("update:"),a=o&&e.slice(7);if(a&&a in n){const d=`${a==="modelValue"?"model":a}Modifiers`,{number:p,trim:m}=n[d]||Wt;m&&(r=t.map(_=>mn(_)?_.trim():_)),p&&(r=t.map(ob))}let c,u=n[c=_f(e)]||n[c=_f(bo(e))];!u&&o&&(u=n[c=_f(Bo(e))]),u&&bi(u,i,6,r);const f=n[c+"Once"];if(f){if(!i.emitted)i.emitted={};else if(i.emitted[c])return;i.emitted[c]=!0,bi(f,i,6,r)}}function zv(i,e,t=!1){const n=e.emitsCache,r=n.get(i);if(r!==void 0)return r;const o=i.emits;let a={},c=!1;if(!_t(i)){const u=f=>{const d=zv(f,e,!0);d&&(c=!0,pn(a,d))};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}return!o&&!c?(en(i)&&n.set(i,null),null):(pt(o)?o.forEach(u=>a[u]=null):pn(a,o),en(i)&&n.set(i,a),a)}function Kc(i,e){return!i||!Vc(e)?!1:(e=e.slice(2).replace(/Once$/,""),Tt(i,e[0].toLowerCase()+e.slice(1))||Tt(i,Bo(e))||Tt(i,e))}let zi=null,Hv=null;function Pc(i){const e=zi;return zi=i,Hv=i&&i.type.__scopeId||null,e}function Yb(i,e=zi,t){if(!e||i._n)return i;const n=(...r)=>{n._d&&rg(-1);const o=Pc(e);let a;try{a=i(...r)}finally{Pc(o),n._d&&rg(1)}return a};return n._n=!0,n._c=!0,n._d=!0,n}function xf(i){const{type:e,vnode:t,proxy:n,withProxy:r,props:o,propsOptions:[a],slots:c,attrs:u,emit:f,render:d,renderCache:p,data:m,setupState:_,ctx:y,inheritAttrs:T}=i;let x,v;const N=Pc(i);try{if(t.shapeFlag&4){const P=r||n,q=P;x=Di(d.call(q,P,p,o,_,m,y)),v=u}else{const P=e;x=Di(P.length>1?P(o,{attrs:u,slots:c,emit:f}):P(o,null)),v=e.props?u:$b(u)}}catch(P){Ra.length=0,qc(P,i,1),x=bs(Fa)}let S=x;if(v&&T!==!1){const P=Object.keys(v),{shapeFlag:q}=S;P.length&&q&7&&(a&&P.some(Vh)&&(v=Zb(v,a)),S=Ro(S,v))}return t.dirs&&(S=Ro(S),S.dirs=S.dirs?S.dirs.concat(t.dirs):t.dirs),t.transition&&(S.transition=t.transition),x=S,Pc(N),x}const $b=i=>{let e;for(const t in i)(t==="class"||t==="style"||Vc(t))&&((e||(e={}))[t]=i[t]);return e},Zb=(i,e)=>{const t={};for(const n in i)(!Vh(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function Jb(i,e,t){const{props:n,children:r,component:o}=i,{props:a,children:c,patchFlag:u}=e,f=o.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&u>=0){if(u&1024)return!0;if(u&16)return n?$m(n,a,f):!!a;if(u&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const m=d[p];if(a[m]!==n[m]&&!Kc(f,m))return!0}}}else return(r||c)&&(!c||!c.$stable)?!0:n===a?!1:n?a?$m(n,a,f):!0:!!a;return!1}function $m(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const o=n[r];if(e[o]!==i[o]&&!Kc(t,o))return!0}return!1}function jb({vnode:i,parent:e},t){for(;e;){const n=e.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=e.vnode).el=t,e=e.parent;else break}}const Qb=Symbol.for("v-ndc"),ew=i=>i.__isSuspense;function tw(i,e){e&&e.pendingBranch?pt(i)?e.effects.push(...i):e.effects.push(i):Xb(i)}const nw=Symbol.for("v-scx"),iw=()=>Sc(nw),kl={};function yf(i,e,t){return Vv(i,e,t)}function Vv(i,e,{immediate:t,deep:n,flush:r,once:o,onTrack:a,onTrigger:c}=Wt){if(e&&o){const O=e;e=(...U)=>{O(...U),q()}}const u=Nn,f=O=>n===!0?O:mo(O,n===!1?1:void 0);let d,p=!1,m=!1;if(kn(i)?(d=()=>i.value,p=Cc(i)):xo(i)?(d=()=>f(i),p=!0):pt(i)?(m=!0,p=i.some(O=>xo(O)||Cc(O)),d=()=>i.map(O=>{if(kn(O))return O.value;if(xo(O))return f(O);if(_t(O))return qr(O,u,2)})):_t(i)?e?d=()=>qr(i,u,2):d=()=>(_&&_(),bi(i,u,3,[y])):d=hi,e&&n){const O=d;d=()=>mo(O())}let _,y=O=>{_=S.onStop=()=>{qr(O,u,4),_=S.onStop=void 0}},T;if(Jc)if(y=hi,e?t&&bi(e,u,3,[d(),m?[]:void 0,y]):d(),r==="sync"){const O=iw();T=O.__watcherHandles||(O.__watcherHandles=[])}else return hi;let x=m?new Array(i.length).fill(kl):kl;const v=()=>{if(!(!S.active||!S.dirty))if(e){const O=S.run();(n||p||(m?O.some((U,J)=>Zr(U,x[J])):Zr(O,x)))&&(_&&_(),bi(e,u,3,[O,x===kl?void 0:m&&x[0]===kl?[]:x,y]),x=O)}else S.run()};v.allowRecurse=!!e;let N;r==="sync"?N=v:r==="post"?N=()=>Hn(v,u&&u.suspense):(v.pre=!0,u&&(v.id=u.uid),N=()=>td(v));const S=new qh(d,hi,N),P=mb(),q=()=>{S.stop(),P&&Gh(P.effects,S)};return e?t?v():x=S.run():r==="post"?Hn(S.run.bind(S),u&&u.suspense):S.run(),T&&T.push(q),q}function rw(i,e,t){const n=this.proxy,r=mn(i)?i.includes(".")?Gv(n,i):()=>n[i]:i.bind(n,n);let o;_t(e)?o=e:(o=e.handler,t=e);const a=Xa(this),c=Vv(r,o.bind(n),t);return a(),c}function Gv(i,e){const t=e.split(".");return()=>{let n=i;for(let r=0;r<t.length&&n;r++)n=n[t[r]];return n}}function mo(i,e,t=0,n){if(!en(i)||i.__v_skip)return i;if(e&&e>0){if(t>=e)return i;t++}if(n=n||new Set,n.has(i))return i;if(n.add(i),kn(i))mo(i.value,e,t,n);else if(pt(i))for(let r=0;r<i.length;r++)mo(i[r],e,t,n);else if(eb(i)||Ta(i))i.forEach(r=>{mo(r,e,t,n)});else if(ib(i))for(const r in i)mo(i[r],e,t,n);return i}function cs(i,e,t,n){const r=i.dirs,o=e&&e.dirs;for(let a=0;a<r.length;a++){const c=r[a];o&&(c.oldValue=o[a].value);let u=c.dir[n];u&&(Ps(),bi(u,t,8,[i.el,c,i,e]),Ls())}}/*! #__NO_SIDE_EFFECTS__ */function sw(i,e){return _t(i)?pn({name:i.name},e,{setup:i}):i}const Mc=i=>!!i.type.__asyncLoader,kv=i=>i.type.__isKeepAlive;function ow(i,e){Wv(i,"a",e)}function aw(i,e){Wv(i,"da",e)}function Wv(i,e,t=Nn){const n=i.__wdc||(i.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Yc(e,n,t),t){let r=t.parent;for(;r&&r.parent;)kv(r.parent.vnode)&&lw(n,e,t,r),r=r.parent}}function lw(i,e,t,n){const r=Yc(e,i,n,!0);qv(()=>{Gh(n[e],r)},t)}function Yc(i,e,t=Nn,n=!1){if(t){const r=t[i]||(t[i]=[]),o=e.__weh||(e.__weh=(...a)=>{if(t.isUnmounted)return;Ps();const c=Xa(t),u=bi(e,t,i,a);return c(),Ls(),u});return n?r.unshift(o):r.push(o),o}}const mr=i=>(e,t=Nn)=>(!Jc||i==="sp")&&Yc(i,(...n)=>e(...n),t),cw=mr("bm"),Xv=mr("m"),uw=mr("bu"),fw=mr("u"),hw=mr("bum"),qv=mr("um"),dw=mr("sp"),pw=mr("rtg"),mw=mr("rtc");function gw(i,e=Nn){Yc("ec",i,e)}const xh=i=>i?i0(i)?od(i)||i.proxy:xh(i.parent):null,ba=pn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>xh(i.parent),$root:i=>xh(i.root),$emit:i=>i.emit,$options:i=>nd(i),$forceUpdate:i=>i.f||(i.f=()=>{i.effect.dirty=!0,td(i.update)}),$nextTick:i=>i.n||(i.n=Gb.bind(i.proxy)),$watch:i=>rw.bind(i)}),Mf=(i,e)=>i!==Wt&&!i.__isScriptSetup&&Tt(i,e),_w={get({_:i},e){const{ctx:t,setupState:n,data:r,props:o,accessCache:a,type:c,appContext:u}=i;let f;if(e[0]!=="$"){const _=a[e];if(_!==void 0)switch(_){case 1:return n[e];case 2:return r[e];case 4:return t[e];case 3:return o[e]}else{if(Mf(n,e))return a[e]=1,n[e];if(r!==Wt&&Tt(r,e))return a[e]=2,r[e];if((f=i.propsOptions[0])&&Tt(f,e))return a[e]=3,o[e];if(t!==Wt&&Tt(t,e))return a[e]=4,t[e];yh&&(a[e]=0)}}const d=ba[e];let p,m;if(d)return e==="$attrs"&&Gn(i,"get",e),d(i);if((p=c.__cssModules)&&(p=p[e]))return p;if(t!==Wt&&Tt(t,e))return a[e]=4,t[e];if(m=u.config.globalProperties,Tt(m,e))return m[e]},set({_:i},e,t){const{data:n,setupState:r,ctx:o}=i;return Mf(r,e)?(r[e]=t,!0):n!==Wt&&Tt(n,e)?(n[e]=t,!0):Tt(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(o[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:r,propsOptions:o}},a){let c;return!!t[a]||i!==Wt&&Tt(i,a)||Mf(e,a)||(c=o[0])&&Tt(c,a)||Tt(n,a)||Tt(ba,a)||Tt(r.config.globalProperties,a)},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:Tt(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function Zm(i){return pt(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let yh=!0;function vw(i){const e=nd(i),t=i.proxy,n=i.ctx;yh=!1,e.beforeCreate&&Jm(e.beforeCreate,i,"bc");const{data:r,computed:o,methods:a,watch:c,provide:u,inject:f,created:d,beforeMount:p,mounted:m,beforeUpdate:_,updated:y,activated:T,deactivated:x,beforeDestroy:v,beforeUnmount:N,destroyed:S,unmounted:P,render:q,renderTracked:O,renderTriggered:U,errorCaptured:J,serverPrefetch:I,expose:b,inheritAttrs:j,components:pe,directives:$,filters:le}=e;if(f&&xw(f,n,null),a)for(const fe in a){const te=a[fe];_t(te)&&(n[fe]=te.bind(t))}if(r){const fe=r.call(t,t);en(fe)&&(i.data=Jh(fe))}if(yh=!0,o)for(const fe in o){const te=o[fe],Ee=_t(te)?te.bind(t,t):_t(te.get)?te.get.bind(t,t):hi,Se=!_t(te)&&_t(te.set)?te.set.bind(t):hi,Re=Qw({get:Ee,set:Se});Object.defineProperty(n,fe,{enumerable:!0,configurable:!0,get:()=>Re.value,set:We=>Re.value=We})}if(c)for(const fe in c)Kv(c[fe],n,t,fe);if(u){const fe=_t(u)?u.call(t):u;Reflect.ownKeys(fe).forEach(te=>{Aw(te,fe[te])})}d&&Jm(d,i,"c");function xe(fe,te){pt(te)?te.forEach(Ee=>fe(Ee.bind(t))):te&&fe(te.bind(t))}if(xe(cw,p),xe(Xv,m),xe(uw,_),xe(fw,y),xe(ow,T),xe(aw,x),xe(gw,J),xe(mw,O),xe(pw,U),xe(hw,N),xe(qv,P),xe(dw,I),pt(b))if(b.length){const fe=i.exposed||(i.exposed={});b.forEach(te=>{Object.defineProperty(fe,te,{get:()=>t[te],set:Ee=>t[te]=Ee})})}else i.exposed||(i.exposed={});q&&i.render===hi&&(i.render=q),j!=null&&(i.inheritAttrs=j),pe&&(i.components=pe),$&&(i.directives=$)}function xw(i,e,t=hi){pt(i)&&(i=Mh(i));for(const n in i){const r=i[n];let o;en(r)?"default"in r?o=Sc(r.from||n,r.default,!0):o=Sc(r.from||n):o=Sc(r),kn(o)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[n]=o}}function Jm(i,e,t){bi(pt(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function Kv(i,e,t,n){const r=n.includes(".")?Gv(t,n):()=>t[n];if(mn(i)){const o=e[i];_t(o)&&yf(r,o)}else if(_t(i))yf(r,i.bind(t));else if(en(i))if(pt(i))i.forEach(o=>Kv(o,e,t,n));else{const o=_t(i.handler)?i.handler.bind(t):e[i.handler];_t(o)&&yf(r,o,i)}}function nd(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:r,optionsCache:o,config:{optionMergeStrategies:a}}=i.appContext,c=o.get(e);let u;return c?u=c:!r.length&&!t&&!n?u=e:(u={},r.length&&r.forEach(f=>Lc(u,f,a,!0)),Lc(u,e,a)),en(e)&&o.set(e,u),u}function Lc(i,e,t,n=!1){const{mixins:r,extends:o}=e;o&&Lc(i,o,t,!0),r&&r.forEach(a=>Lc(i,a,t,!0));for(const a in e)if(!(n&&a==="expose")){const c=yw[a]||t&&t[a];i[a]=c?c(i[a],e[a]):e[a]}return i}const yw={data:jm,props:Qm,emits:Qm,methods:Ma,computed:Ma,beforeCreate:Cn,created:Cn,beforeMount:Cn,mounted:Cn,beforeUpdate:Cn,updated:Cn,beforeDestroy:Cn,beforeUnmount:Cn,destroyed:Cn,unmounted:Cn,activated:Cn,deactivated:Cn,errorCaptured:Cn,serverPrefetch:Cn,components:Ma,directives:Ma,watch:Sw,provide:jm,inject:Mw};function jm(i,e){return e?i?function(){return pn(_t(i)?i.call(this,this):i,_t(e)?e.call(this,this):e)}:e:i}function Mw(i,e){return Ma(Mh(i),Mh(e))}function Mh(i){if(pt(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function Cn(i,e){return i?[...new Set([].concat(i,e))]:e}function Ma(i,e){return i?pn(Object.create(null),i,e):e}function Qm(i,e){return i?pt(i)&&pt(e)?[...new Set([...i,...e])]:pn(Object.create(null),Zm(i),Zm(e??{})):e}function Sw(i,e){if(!i)return e;if(!e)return i;const t=pn(Object.create(null),i);for(const n in e)t[n]=Cn(i[n],e[n]);return t}function Yv(){return{app:null,config:{isNativeTag:jA,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ew=0;function Tw(i,e){return function(n,r=null){_t(n)||(n=pn({},n)),r!=null&&!en(r)&&(r=null);const o=Yv(),a=new WeakSet;let c=!1;const u=o.app={_uid:Ew++,_component:n,_props:r,_container:null,_context:o,_instance:null,version:e1,get config(){return o.config},set config(f){},use(f,...d){return a.has(f)||(f&&_t(f.install)?(a.add(f),f.install(u,...d)):_t(f)&&(a.add(f),f(u,...d))),u},mixin(f){return o.mixins.includes(f)||o.mixins.push(f),u},component(f,d){return d?(o.components[f]=d,u):o.components[f]},directive(f,d){return d?(o.directives[f]=d,u):o.directives[f]},mount(f,d,p){if(!c){const m=bs(n,r);return m.appContext=o,p===!0?p="svg":p===!1&&(p=void 0),d&&e?e(m,f):i(m,f,p),c=!0,u._container=f,f.__vue_app__=u,od(m.component)||m.component.proxy}},unmount(){c&&(i(null,u._container),delete u._container.__vue_app__)},provide(f,d){return o.provides[f]=d,u},runWithContext(f){const d=wa;wa=u;try{return f()}finally{wa=d}}};return u}}let wa=null;function Aw(i,e){if(Nn){let t=Nn.provides;const n=Nn.parent&&Nn.parent.provides;n===t&&(t=Nn.provides=Object.create(n)),t[i]=e}}function Sc(i,e,t=!1){const n=Nn||zi;if(n||wa){const r=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:wa._context.provides;if(r&&i in r)return r[i];if(arguments.length>1)return t&&_t(e)?e.call(n&&n.proxy):e}}function bw(i,e,t,n=!1){const r={},o={};Rc(o,Zc,1),i.propsDefaults=Object.create(null),$v(i,e,r,o);for(const a in i.propsOptions[0])a in r||(r[a]=void 0);t?i.props=n?r:Ub(r):i.type.props?i.props=r:i.props=o,i.attrs=o}function ww(i,e,t,n){const{props:r,attrs:o,vnode:{patchFlag:a}}=i,c=bt(r),[u]=i.propsOptions;let f=!1;if((n||a>0)&&!(a&16)){if(a&8){const d=i.vnode.dynamicProps;for(let p=0;p<d.length;p++){let m=d[p];if(Kc(i.emitsOptions,m))continue;const _=e[m];if(u)if(Tt(o,m))_!==o[m]&&(o[m]=_,f=!0);else{const y=bo(m);r[y]=Sh(u,c,y,_,i,!1)}else _!==o[m]&&(o[m]=_,f=!0)}}}else{$v(i,e,r,o)&&(f=!0);let d;for(const p in c)(!e||!Tt(e,p)&&((d=Bo(p))===p||!Tt(e,d)))&&(u?t&&(t[p]!==void 0||t[d]!==void 0)&&(r[p]=Sh(u,c,p,void 0,i,!0)):delete r[p]);if(o!==c)for(const p in o)(!e||!Tt(e,p))&&(delete o[p],f=!0)}f&&dr(i,"set","$attrs")}function $v(i,e,t,n){const[r,o]=i.propsOptions;let a=!1,c;if(e)for(let u in e){if(Aa(u))continue;const f=e[u];let d;r&&Tt(r,d=bo(u))?!o||!o.includes(d)?t[d]=f:(c||(c={}))[d]=f:Kc(i.emitsOptions,u)||(!(u in n)||f!==n[u])&&(n[u]=f,a=!0)}if(o){const u=bt(t),f=c||Wt;for(let d=0;d<o.length;d++){const p=o[d];t[p]=Sh(r,u,p,f[p],i,!Tt(f,p))}}return a}function Sh(i,e,t,n,r,o){const a=i[t];if(a!=null){const c=Tt(a,"default");if(c&&n===void 0){const u=a.default;if(a.type!==Function&&!a.skipFactory&&_t(u)){const{propsDefaults:f}=r;if(t in f)n=f[t];else{const d=Xa(r);n=f[t]=u.call(null,e),d()}}else n=u}a[0]&&(o&&!c?n=!1:a[1]&&(n===""||n===Bo(t))&&(n=!0))}return n}function Zv(i,e,t=!1){const n=e.propsCache,r=n.get(i);if(r)return r;const o=i.props,a={},c=[];let u=!1;if(!_t(i)){const d=p=>{u=!0;const[m,_]=Zv(p,e,!0);pn(a,m),_&&c.push(..._)};!t&&e.mixins.length&&e.mixins.forEach(d),i.extends&&d(i.extends),i.mixins&&i.mixins.forEach(d)}if(!o&&!u)return en(i)&&n.set(i,vo),vo;if(pt(o))for(let d=0;d<o.length;d++){const p=bo(o[d]);eg(p)&&(a[p]=Wt)}else if(o)for(const d in o){const p=bo(d);if(eg(p)){const m=o[d],_=a[p]=pt(m)||_t(m)?{type:m}:pn({},m);if(_){const y=ig(Boolean,_.type),T=ig(String,_.type);_[0]=y>-1,_[1]=T<0||y<T,(y>-1||Tt(_,"default"))&&c.push(p)}}}const f=[a,c];return en(i)&&n.set(i,f),f}function eg(i){return i[0]!=="$"&&!Aa(i)}function tg(i){return i===null?"null":typeof i=="function"?i.name||"":typeof i=="object"&&i.constructor&&i.constructor.name||""}function ng(i,e){return tg(i)===tg(e)}function ig(i,e){return pt(e)?e.findIndex(t=>ng(t,i)):_t(e)&&ng(e,i)?0:-1}const Jv=i=>i[0]==="_"||i==="$stable",id=i=>pt(i)?i.map(Di):[Di(i)],Rw=(i,e,t)=>{if(e._n)return e;const n=Yb((...r)=>id(e(...r)),t);return n._c=!1,n},jv=(i,e,t)=>{const n=i._ctx;for(const r in i){if(Jv(r))continue;const o=i[r];if(_t(o))e[r]=Rw(r,o,n);else if(o!=null){const a=id(o);e[r]=()=>a}}},Qv=(i,e)=>{const t=id(e);i.slots.default=()=>t},Cw=(i,e)=>{if(i.vnode.shapeFlag&32){const t=e._;t?(i.slots=bt(e),Rc(e,"_",t)):jv(e,i.slots={})}else i.slots={},e&&Qv(i,e);Rc(i.slots,Zc,1)},Pw=(i,e,t)=>{const{vnode:n,slots:r}=i;let o=!0,a=Wt;if(n.shapeFlag&32){const c=e._;c?t&&c===1?o=!1:(pn(r,e),!t&&c===1&&delete r._):(o=!e.$stable,jv(e,r)),a=e}else e&&(Qv(i,e),a={default:1});if(o)for(const c in r)!Jv(c)&&a[c]==null&&delete r[c]};function Eh(i,e,t,n,r=!1){if(pt(i)){i.forEach((m,_)=>Eh(m,e&&(pt(e)?e[_]:e),t,n,r));return}if(Mc(n)&&!r)return;const o=n.shapeFlag&4?od(n.component)||n.component.proxy:n.el,a=r?null:o,{i:c,r:u}=i,f=e&&e.r,d=c.refs===Wt?c.refs={}:c.refs,p=c.setupState;if(f!=null&&f!==u&&(mn(f)?(d[f]=null,Tt(p,f)&&(p[f]=null)):kn(f)&&(f.value=null)),_t(u))qr(u,c,12,[a,d]);else{const m=mn(u),_=kn(u);if(m||_){const y=()=>{if(i.f){const T=m?Tt(p,u)?p[u]:d[u]:u.value;r?pt(T)&&Gh(T,o):pt(T)?T.includes(o)||T.push(o):m?(d[u]=[o],Tt(p,u)&&(p[u]=d[u])):(u.value=[o],i.k&&(d[i.k]=u.value))}else m?(d[u]=a,Tt(p,u)&&(p[u]=a)):_&&(u.value=a,i.k&&(d[i.k]=a))};a?(y.id=-1,Hn(y,t)):y()}}}const Hn=tw;function Lw(i){return Iw(i)}function Iw(i,e){const t=gv();t.__VUE__=!0;const{insert:n,remove:r,patchProp:o,createElement:a,createText:c,createComment:u,setText:f,setElementText:d,parentNode:p,nextSibling:m,setScopeId:_=hi,insertStaticContent:y}=i,T=(R,D,H,K=null,A=null,M=null,z=void 0,V=null,k=!!D.dynamicChildren)=>{if(R===D)return;R&&!ua(R,D)&&(K=be(R),We(R,A,M,!0),R=null),D.patchFlag===-2&&(k=!1,D.dynamicChildren=null);const{type:W,ref:ue,shapeFlag:ne}=D;switch(W){case $c:x(R,D,H,K);break;case Fa:v(R,D,H,K);break;case Ef:R==null&&N(D,H,K,z);break;case ur:pe(R,D,H,K,A,M,z,V,k);break;default:ne&1?q(R,D,H,K,A,M,z,V,k):ne&6?$(R,D,H,K,A,M,z,V,k):(ne&64||ne&128)&&W.process(R,D,H,K,A,M,z,V,k,Ke)}ue!=null&&A&&Eh(ue,R&&R.ref,M,D||R,!D)},x=(R,D,H,K)=>{if(R==null)n(D.el=c(D.children),H,K);else{const A=D.el=R.el;D.children!==R.children&&f(A,D.children)}},v=(R,D,H,K)=>{R==null?n(D.el=u(D.children||""),H,K):D.el=R.el},N=(R,D,H,K)=>{[R.el,R.anchor]=y(R.children,D,H,K,R.el,R.anchor)},S=({el:R,anchor:D},H,K)=>{let A;for(;R&&R!==D;)A=m(R),n(R,H,K),R=A;n(D,H,K)},P=({el:R,anchor:D})=>{let H;for(;R&&R!==D;)H=m(R),r(R),R=H;r(D)},q=(R,D,H,K,A,M,z,V,k)=>{D.type==="svg"?z="svg":D.type==="math"&&(z="mathml"),R==null?O(D,H,K,A,M,z,V,k):I(R,D,A,M,z,V,k)},O=(R,D,H,K,A,M,z,V)=>{let k,W;const{props:ue,shapeFlag:ne,transition:ge,dirs:Te}=R;if(k=R.el=a(R.type,M,ue&&ue.is,ue),ne&8?d(k,R.children):ne&16&&J(R.children,k,null,K,A,Sf(R,M),z,V),Te&&cs(R,null,K,"created"),U(k,R,R.scopeId,z,K),ue){for(const Me in ue)Me!=="value"&&!Aa(Me)&&o(k,Me,null,ue[Me],M,R.children,K,A,Ie);"value"in ue&&o(k,"value",null,ue.value,M),(W=ue.onVnodeBeforeMount)&&Ni(W,K,R)}Te&&cs(R,null,K,"beforeMount");const he=Nw(A,ge);he&&ge.beforeEnter(k),n(k,D,H),((W=ue&&ue.onVnodeMounted)||he||Te)&&Hn(()=>{W&&Ni(W,K,R),he&&ge.enter(k),Te&&cs(R,null,K,"mounted")},A)},U=(R,D,H,K,A)=>{if(H&&_(R,H),K)for(let M=0;M<K.length;M++)_(R,K[M]);if(A){let M=A.subTree;if(D===M){const z=A.vnode;U(R,z,z.scopeId,z.slotScopeIds,A.parent)}}},J=(R,D,H,K,A,M,z,V,k=0)=>{for(let W=k;W<R.length;W++){const ue=R[W]=V?zr(R[W]):Di(R[W]);T(null,ue,D,H,K,A,M,z,V)}},I=(R,D,H,K,A,M,z)=>{const V=D.el=R.el;let{patchFlag:k,dynamicChildren:W,dirs:ue}=D;k|=R.patchFlag&16;const ne=R.props||Wt,ge=D.props||Wt;let Te;if(H&&us(H,!1),(Te=ge.onVnodeBeforeUpdate)&&Ni(Te,H,D,R),ue&&cs(D,R,H,"beforeUpdate"),H&&us(H,!0),W?b(R.dynamicChildren,W,V,H,K,Sf(D,A),M):z||te(R,D,V,null,H,K,Sf(D,A),M,!1),k>0){if(k&16)j(V,D,ne,ge,H,K,A);else if(k&2&&ne.class!==ge.class&&o(V,"class",null,ge.class,A),k&4&&o(V,"style",ne.style,ge.style,A),k&8){const he=D.dynamicProps;for(let Me=0;Me<he.length;Me++){const Oe=he[Me],we=ne[Oe],Ne=ge[Oe];(Ne!==we||Oe==="value")&&o(V,Oe,we,Ne,A,R.children,H,K,Ie)}}k&1&&R.children!==D.children&&d(V,D.children)}else!z&&W==null&&j(V,D,ne,ge,H,K,A);((Te=ge.onVnodeUpdated)||ue)&&Hn(()=>{Te&&Ni(Te,H,D,R),ue&&cs(D,R,H,"updated")},K)},b=(R,D,H,K,A,M,z)=>{for(let V=0;V<D.length;V++){const k=R[V],W=D[V],ue=k.el&&(k.type===ur||!ua(k,W)||k.shapeFlag&70)?p(k.el):H;T(k,W,ue,null,K,A,M,z,!0)}},j=(R,D,H,K,A,M,z)=>{if(H!==K){if(H!==Wt)for(const V in H)!Aa(V)&&!(V in K)&&o(R,V,H[V],null,z,D.children,A,M,Ie);for(const V in K){if(Aa(V))continue;const k=K[V],W=H[V];k!==W&&V!=="value"&&o(R,V,W,k,z,D.children,A,M,Ie)}"value"in K&&o(R,"value",H.value,K.value,z)}},pe=(R,D,H,K,A,M,z,V,k)=>{const W=D.el=R?R.el:c(""),ue=D.anchor=R?R.anchor:c("");let{patchFlag:ne,dynamicChildren:ge,slotScopeIds:Te}=D;Te&&(V=V?V.concat(Te):Te),R==null?(n(W,H,K),n(ue,H,K),J(D.children||[],H,ue,A,M,z,V,k)):ne>0&&ne&64&&ge&&R.dynamicChildren?(b(R.dynamicChildren,ge,H,A,M,z,V),(D.key!=null||A&&D===A.subTree)&&e0(R,D,!0)):te(R,D,H,ue,A,M,z,V,k)},$=(R,D,H,K,A,M,z,V,k)=>{D.slotScopeIds=V,R==null?D.shapeFlag&512?A.ctx.activate(D,H,K,z,k):le(D,H,K,A,M,z,k):de(R,D,k)},le=(R,D,H,K,A,M,z)=>{const V=R.component=Kw(R,K,A);if(kv(R)&&(V.ctx.renderer=Ke),Yw(V),V.asyncDep){if(A&&A.registerDep(V,xe),!R.el){const k=V.subTree=bs(Fa);v(null,k,D,H)}}else xe(V,R,D,H,A,M,z)},de=(R,D,H)=>{const K=D.component=R.component;if(Jb(R,D,H))if(K.asyncDep&&!K.asyncResolved){fe(K,D,H);return}else K.next=D,Wb(K.update),K.effect.dirty=!0,K.update();else D.el=R.el,K.vnode=D},xe=(R,D,H,K,A,M,z)=>{const V=()=>{if(R.isMounted){let{next:ue,bu:ne,u:ge,parent:Te,vnode:he}=R;{const et=t0(R);if(et){ue&&(ue.el=he.el,fe(R,ue,z)),et.asyncDep.then(()=>{R.isUnmounted||V()});return}}let Me=ue,Oe;us(R,!1),ue?(ue.el=he.el,fe(R,ue,z)):ue=he,ne&&vf(ne),(Oe=ue.props&&ue.props.onVnodeBeforeUpdate)&&Ni(Oe,Te,ue,he),us(R,!0);const we=xf(R),Ne=R.subTree;R.subTree=we,T(Ne,we,p(Ne.el),be(Ne),R,A,M),ue.el=we.el,Me===null&&jb(R,we.el),ge&&Hn(ge,A),(Oe=ue.props&&ue.props.onVnodeUpdated)&&Hn(()=>Ni(Oe,Te,ue,he),A)}else{let ue;const{el:ne,props:ge}=D,{bm:Te,m:he,parent:Me}=R,Oe=Mc(D);if(us(R,!1),Te&&vf(Te),!Oe&&(ue=ge&&ge.onVnodeBeforeMount)&&Ni(ue,Me,D),us(R,!0),ne&&me){const we=()=>{R.subTree=xf(R),me(ne,R.subTree,R,A,null)};Oe?D.type.__asyncLoader().then(()=>!R.isUnmounted&&we()):we()}else{const we=R.subTree=xf(R);T(null,we,H,K,R,A,M),D.el=we.el}if(he&&Hn(he,A),!Oe&&(ue=ge&&ge.onVnodeMounted)){const we=D;Hn(()=>Ni(ue,Me,we),A)}(D.shapeFlag&256||Me&&Mc(Me.vnode)&&Me.vnode.shapeFlag&256)&&R.a&&Hn(R.a,A),R.isMounted=!0,D=H=K=null}},k=R.effect=new qh(V,hi,()=>td(W),R.scope),W=R.update=()=>{k.dirty&&k.run()};W.id=R.uid,us(R,!0),W()},fe=(R,D,H)=>{D.component=R;const K=R.vnode.props;R.vnode=D,R.next=null,ww(R,D.props,K,H),Pw(R,D.children,H),Ps(),Ym(R),Ls()},te=(R,D,H,K,A,M,z,V,k=!1)=>{const W=R&&R.children,ue=R?R.shapeFlag:0,ne=D.children,{patchFlag:ge,shapeFlag:Te}=D;if(ge>0){if(ge&128){Se(W,ne,H,K,A,M,z,V,k);return}else if(ge&256){Ee(W,ne,H,K,A,M,z,V,k);return}}Te&8?(ue&16&&Ie(W,A,M),ne!==W&&d(H,ne)):ue&16?Te&16?Se(W,ne,H,K,A,M,z,V,k):Ie(W,A,M,!0):(ue&8&&d(H,""),Te&16&&J(ne,H,K,A,M,z,V,k))},Ee=(R,D,H,K,A,M,z,V,k)=>{R=R||vo,D=D||vo;const W=R.length,ue=D.length,ne=Math.min(W,ue);let ge;for(ge=0;ge<ne;ge++){const Te=D[ge]=k?zr(D[ge]):Di(D[ge]);T(R[ge],Te,H,null,A,M,z,V,k)}W>ue?Ie(R,A,M,!0,!1,ne):J(D,H,K,A,M,z,V,k,ne)},Se=(R,D,H,K,A,M,z,V,k)=>{let W=0;const ue=D.length;let ne=R.length-1,ge=ue-1;for(;W<=ne&&W<=ge;){const Te=R[W],he=D[W]=k?zr(D[W]):Di(D[W]);if(ua(Te,he))T(Te,he,H,null,A,M,z,V,k);else break;W++}for(;W<=ne&&W<=ge;){const Te=R[ne],he=D[ge]=k?zr(D[ge]):Di(D[ge]);if(ua(Te,he))T(Te,he,H,null,A,M,z,V,k);else break;ne--,ge--}if(W>ne){if(W<=ge){const Te=ge+1,he=Te<ue?D[Te].el:K;for(;W<=ge;)T(null,D[W]=k?zr(D[W]):Di(D[W]),H,he,A,M,z,V,k),W++}}else if(W>ge)for(;W<=ne;)We(R[W],A,M,!0),W++;else{const Te=W,he=W,Me=new Map;for(W=he;W<=ge;W++){const ot=D[W]=k?zr(D[W]):Di(D[W]);ot.key!=null&&Me.set(ot.key,W)}let Oe,we=0;const Ne=ge-he+1;let et=!1,ut=0;const mt=new Array(Ne);for(W=0;W<Ne;W++)mt[W]=0;for(W=Te;W<=ne;W++){const ot=R[W];if(we>=Ne){We(ot,A,M,!0);continue}let Be;if(ot.key!=null)Be=Me.get(ot.key);else for(Oe=he;Oe<=ge;Oe++)if(mt[Oe-he]===0&&ua(ot,D[Oe])){Be=Oe;break}Be===void 0?We(ot,A,M,!0):(mt[Be-he]=W+1,Be>=ut?ut=Be:et=!0,T(ot,D[Be],H,null,A,M,z,V,k),we++)}const vt=et?Dw(mt):vo;for(Oe=vt.length-1,W=Ne-1;W>=0;W--){const ot=he+W,Be=D[ot],B=ot+1<ue?D[ot+1].el:K;mt[W]===0?T(null,Be,H,B,A,M,z,V,k):et&&(Oe<0||W!==vt[Oe]?Re(Be,H,B,2):Oe--)}}},Re=(R,D,H,K,A=null)=>{const{el:M,type:z,transition:V,children:k,shapeFlag:W}=R;if(W&6){Re(R.component.subTree,D,H,K);return}if(W&128){R.suspense.move(D,H,K);return}if(W&64){z.move(R,D,H,Ke);return}if(z===ur){n(M,D,H);for(let ne=0;ne<k.length;ne++)Re(k[ne],D,H,K);n(R.anchor,D,H);return}if(z===Ef){S(R,D,H);return}if(K!==2&&W&1&&V)if(K===0)V.beforeEnter(M),n(M,D,H),Hn(()=>V.enter(M),A);else{const{leave:ne,delayLeave:ge,afterLeave:Te}=V,he=()=>n(M,D,H),Me=()=>{ne(M,()=>{he(),Te&&Te()})};ge?ge(M,he,Me):Me()}else n(M,D,H)},We=(R,D,H,K=!1,A=!1)=>{const{type:M,props:z,ref:V,children:k,dynamicChildren:W,shapeFlag:ue,patchFlag:ne,dirs:ge}=R;if(V!=null&&Eh(V,null,H,R,!0),ue&256){D.ctx.deactivate(R);return}const Te=ue&1&&ge,he=!Mc(R);let Me;if(he&&(Me=z&&z.onVnodeBeforeUnmount)&&Ni(Me,D,R),ue&6)Ae(R.component,H,K);else{if(ue&128){R.suspense.unmount(H,K);return}Te&&cs(R,null,D,"beforeUnmount"),ue&64?R.type.remove(R,D,H,A,Ke,K):W&&(M!==ur||ne>0&&ne&64)?Ie(W,D,H,!1,!0):(M===ur&&ne&384||!A&&ue&16)&&Ie(k,D,H),K&&Et(R)}(he&&(Me=z&&z.onVnodeUnmounted)||Te)&&Hn(()=>{Me&&Ni(Me,D,R),Te&&cs(R,null,D,"unmounted")},H)},Et=R=>{const{type:D,el:H,anchor:K,transition:A}=R;if(D===ur){ce(H,K);return}if(D===Ef){P(R);return}const M=()=>{r(H),A&&!A.persisted&&A.afterLeave&&A.afterLeave()};if(R.shapeFlag&1&&A&&!A.persisted){const{leave:z,delayLeave:V}=A,k=()=>z(H,M);V?V(R.el,M,k):k()}else M()},ce=(R,D)=>{let H;for(;R!==D;)H=m(R),r(R),R=H;r(D)},Ae=(R,D,H)=>{const{bum:K,scope:A,update:M,subTree:z,um:V}=R;K&&vf(K),A.stop(),M&&(M.active=!1,We(z,R,D,H)),V&&Hn(V,D),Hn(()=>{R.isUnmounted=!0},D),D&&D.pendingBranch&&!D.isUnmounted&&R.asyncDep&&!R.asyncResolved&&R.suspenseId===D.pendingId&&(D.deps--,D.deps===0&&D.resolve())},Ie=(R,D,H,K=!1,A=!1,M=0)=>{for(let z=M;z<R.length;z++)We(R[z],D,H,K,A)},be=R=>R.shapeFlag&6?be(R.component.subTree):R.shapeFlag&128?R.suspense.next():m(R.anchor||R.el);let ke=!1;const Je=(R,D,H)=>{R==null?D._vnode&&We(D._vnode,null,null,!0):T(D._vnode||null,R,D,null,null,null,H),ke||(ke=!0,Ym(),Fv(),ke=!1),D._vnode=R},Ke={p:T,um:We,m:Re,r:Et,mt:le,mc:J,pc:te,pbc:b,n:be,o:i};let Q,me;return e&&([Q,me]=e(Ke)),{render:Je,hydrate:Q,createApp:Tw(Je,Q)}}function Sf({type:i,props:e},t){return t==="svg"&&i==="foreignObject"||t==="mathml"&&i==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function us({effect:i,update:e},t){i.allowRecurse=e.allowRecurse=t}function Nw(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function e0(i,e,t=!1){const n=i.children,r=e.children;if(pt(n)&&pt(r))for(let o=0;o<n.length;o++){const a=n[o];let c=r[o];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=r[o]=zr(r[o]),c.el=a.el),t||e0(a,c)),c.type===$c&&(c.el=a.el)}}function Dw(i){const e=i.slice(),t=[0];let n,r,o,a,c;const u=i.length;for(n=0;n<u;n++){const f=i[n];if(f!==0){if(r=t[t.length-1],i[r]<f){e[n]=r,t.push(n);continue}for(o=0,a=t.length-1;o<a;)c=o+a>>1,i[t[c]]<f?o=c+1:a=c;f<i[t[o]]&&(o>0&&(e[n]=t[o-1]),t[o]=n)}}for(o=t.length,a=t[o-1];o-- >0;)t[o]=a,a=e[a];return t}function t0(i){const e=i.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:t0(e)}const Uw=i=>i.__isTeleport,ur=Symbol.for("v-fgt"),$c=Symbol.for("v-txt"),Fa=Symbol.for("v-cmt"),Ef=Symbol.for("v-stc"),Ra=[];let Ti=null;function Ow(i=!1){Ra.push(Ti=i?null:[])}function Fw(){Ra.pop(),Ti=Ra[Ra.length-1]||null}let Ba=1;function rg(i){Ba+=i}function Bw(i){return i.dynamicChildren=Ba>0?Ti||vo:null,Fw(),Ba>0&&Ti&&Ti.push(i),i}function zw(i,e,t,n,r,o){return Bw(rd(i,e,t,n,r,o,!0))}function Hw(i){return i?i.__v_isVNode===!0:!1}function ua(i,e){return i.type===e.type&&i.key===e.key}const Zc="__vInternal",n0=({key:i})=>i??null,Ec=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?mn(i)||kn(i)||_t(i)?{i:zi,r:i,k:e,f:!!t}:i:null);function rd(i,e=null,t=null,n=0,r=null,o=i===ur?0:1,a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&n0(e),ref:e&&Ec(e),scopeId:Hv,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:zi};return c?(sd(u,t),o&128&&i.normalize(u)):t&&(u.shapeFlag|=mn(t)?8:16),Ba>0&&!a&&Ti&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&Ti.push(u),u}const bs=Vw;function Vw(i,e=null,t=null,n=0,r=null,o=!1){if((!i||i===Qb)&&(i=Fa),Hw(i)){const c=Ro(i,e,!0);return t&&sd(c,t),Ba>0&&!o&&Ti&&(c.shapeFlag&6?Ti[Ti.indexOf(i)]=c:Ti.push(c)),c.patchFlag|=-2,c}if(jw(i)&&(i=i.__vccOpts),e){e=Gw(e);let{class:c,style:u}=e;c&&!mn(c)&&(e.class=Xh(c)),en(u)&&(Pv(u)&&!pt(u)&&(u=pn({},u)),e.style=Wh(u))}const a=mn(i)?1:ew(i)?128:Uw(i)?64:en(i)?4:_t(i)?2:0;return rd(i,e,t,n,r,a,o,!0)}function Gw(i){return i?Pv(i)||Zc in i?pn({},i):i:null}function Ro(i,e,t=!1){const{props:n,ref:r,patchFlag:o,children:a}=i,c=e?Ww(n||{},e):n;return{__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&n0(c),ref:e&&e.ref?t&&r?pt(r)?r.concat(Ec(e)):[r,Ec(e)]:Ec(e):r,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==ur?o===-1?16:o|16:o,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:i.transition,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&Ro(i.ssContent),ssFallback:i.ssFallback&&Ro(i.ssFallback),el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce}}function kw(i=" ",e=0){return bs($c,null,i,e)}function Di(i){return i==null||typeof i=="boolean"?bs(Fa):pt(i)?bs(ur,null,i.slice()):typeof i=="object"?zr(i):bs($c,null,String(i))}function zr(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:Ro(i)}function sd(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(pt(e))t=16;else if(typeof e=="object")if(n&65){const r=e.default;r&&(r._c&&(r._d=!1),sd(i,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!(Zc in e)?e._ctx=zi:r===3&&zi&&(zi.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else _t(e)?(e={default:e,_ctx:zi},t=32):(e=String(e),n&64?(t=16,e=[kw(e)]):t=8);i.children=e,i.shapeFlag|=t}function Ww(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const r in n)if(r==="class")e.class!==n.class&&(e.class=Xh([e.class,n.class]));else if(r==="style")e.style=Wh([e.style,n.style]);else if(Vc(r)){const o=e[r],a=n[r];a&&o!==a&&!(pt(o)&&o.includes(a))&&(e[r]=o?[].concat(o,a):a)}else r!==""&&(e[r]=n[r])}return e}function Ni(i,e,t,n=null){bi(i,e,7,[t,n])}const Xw=Yv();let qw=0;function Kw(i,e,t){const n=i.type,r=(e?e.appContext:i.appContext)||Xw,o={uid:qw++,vnode:i,type:n,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new db(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zv(n,r),emitsOptions:zv(n,r),emit:null,emitted:null,propsDefaults:Wt,inheritAttrs:n.inheritAttrs,ctx:Wt,data:Wt,props:Wt,attrs:Wt,slots:Wt,refs:Wt,setupState:Wt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=e?e.root:o,o.emit=Kb.bind(null,o),i.ce&&i.ce(o),o}let Nn=null,Ic,Th;{const i=gv(),e=(t,n)=>{let r;return(r=i[t])||(r=i[t]=[]),r.push(n),o=>{r.length>1?r.forEach(a=>a(o)):r[0](o)}};Ic=e("__VUE_INSTANCE_SETTERS__",t=>Nn=t),Th=e("__VUE_SSR_SETTERS__",t=>Jc=t)}const Xa=i=>{const e=Nn;return Ic(i),i.scope.on(),()=>{i.scope.off(),Ic(e)}},sg=()=>{Nn&&Nn.scope.off(),Ic(null)};function i0(i){return i.vnode.shapeFlag&4}let Jc=!1;function Yw(i,e=!1){e&&Th(e);const{props:t,children:n}=i.vnode,r=i0(i);bw(i,t,r,e),Cw(i,n);const o=r?$w(i,e):void 0;return e&&Th(!1),o}function $w(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=Lv(new Proxy(i.ctx,_w));const{setup:n}=t;if(n){const r=i.setupContext=n.length>1?Jw(i):null,o=Xa(i);Ps();const a=qr(n,i,0,[i.props,r]);if(Ls(),o(),pv(a)){if(a.then(sg,sg),e)return a.then(c=>{og(i,c,e)}).catch(c=>{qc(c,i,0)});i.asyncDep=a}else og(i,a,e)}else r0(i,e)}function og(i,e,t){_t(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:en(e)&&(i.setupState=Dv(e)),r0(i,t)}let ag;function r0(i,e,t){const n=i.type;if(!i.render){if(!e&&ag&&!n.render){const r=n.template||nd(i).template;if(r){const{isCustomElement:o,compilerOptions:a}=i.appContext.config,{delimiters:c,compilerOptions:u}=n,f=pn(pn({isCustomElement:o,delimiters:c},a),u);n.render=ag(r,f)}}i.render=n.render||hi}{const r=Xa(i);Ps();try{vw(i)}finally{Ls(),r()}}}function Zw(i){return i.attrsProxy||(i.attrsProxy=new Proxy(i.attrs,{get(e,t){return Gn(i,"get","$attrs"),e[t]}}))}function Jw(i){const e=t=>{i.exposed=t||{}};return{get attrs(){return Zw(i)},slots:i.slots,emit:i.emit,expose:e}}function od(i){if(i.exposed)return i.exposeProxy||(i.exposeProxy=new Proxy(Dv(Lv(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in ba)return ba[t](i)},has(e,t){return t in e||t in ba}}))}function jw(i){return _t(i)&&"__vccOpts"in i}const Qw=(i,e)=>Ob(i,e,Jc),e1="3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const t1="http://www.w3.org/2000/svg",n1="http://www.w3.org/1998/Math/MathML",Hr=typeof document<"u"?document:null,lg=Hr&&Hr.createElement("template"),i1={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const r=e==="svg"?Hr.createElementNS(t1,i):e==="mathml"?Hr.createElementNS(n1,i):Hr.createElement(i,t?{is:t}:void 0);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>Hr.createTextNode(i),createComment:i=>Hr.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>Hr.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,r,o){const a=t?t.previousSibling:e.lastChild;if(r&&(r===o||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===o||!(r=r.nextSibling)););else{lg.innerHTML=n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i;const c=lg.content;if(n==="svg"||n==="mathml"){const u=c.firstChild;for(;u.firstChild;)c.appendChild(u.firstChild);c.removeChild(u)}e.insertBefore(c,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},r1=Symbol("_vtc");function s1(i,e,t){const n=i[r1];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const cg=Symbol("_vod"),o1=Symbol("_vsh"),a1=Symbol(""),l1=/(^|;)\s*display\s*:/;function c1(i,e,t){const n=i.style,r=mn(t);let o=!1;if(t&&!r){if(e)if(mn(e))for(const a of e.split(";")){const c=a.slice(0,a.indexOf(":")).trim();t[c]==null&&Tc(n,c,"")}else for(const a in e)t[a]==null&&Tc(n,a,"");for(const a in t)a==="display"&&(o=!0),Tc(n,a,t[a])}else if(r){if(e!==t){const a=n[a1];a&&(t+=";"+a),n.cssText=t,o=l1.test(t)}}else e&&i.removeAttribute("style");cg in i&&(i[cg]=o?n.display:"",i[o1]&&(n.display="none"))}const ug=/\s*!important$/;function Tc(i,e,t){if(pt(t))t.forEach(n=>Tc(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))i.setProperty(e,t);else{const n=u1(i,e);ug.test(t)?i.setProperty(Bo(n),t.replace(ug,""),"important"):i[n]=t}}const fg=["Webkit","Moz","ms"],Tf={};function u1(i,e){const t=Tf[e];if(t)return t;let n=bo(e);if(n!=="filter"&&n in i)return Tf[e]=n;n=mv(n);for(let r=0;r<fg.length;r++){const o=fg[r]+n;if(o in i)return Tf[e]=o}return e}const hg="http://www.w3.org/1999/xlink";function f1(i,e,t,n,r){if(n&&e.startsWith("xlink:"))t==null?i.removeAttributeNS(hg,e.slice(6,e.length)):i.setAttributeNS(hg,e,t);else{const o=hb(e);t==null||o&&!_v(t)?i.removeAttribute(e):i.setAttribute(e,o?"":t)}}function h1(i,e,t,n,r,o,a){if(e==="innerHTML"||e==="textContent"){n&&a(n,r,o),i[e]=t??"";return}const c=i.tagName;if(e==="value"&&c!=="PROGRESS"&&!c.includes("-")){const f=c==="OPTION"?i.getAttribute("value")||"":i.value,d=t??"";(f!==d||!("_value"in i))&&(i.value=d),t==null&&i.removeAttribute(e),i._value=t;return}let u=!1;if(t===""||t==null){const f=typeof i[e];f==="boolean"?t=_v(t):t==null&&f==="string"?(t="",u=!0):f==="number"&&(t=0,u=!0)}try{i[e]=t}catch{}u&&i.removeAttribute(e)}function d1(i,e,t,n){i.addEventListener(e,t,n)}function p1(i,e,t,n){i.removeEventListener(e,t,n)}const dg=Symbol("_vei");function m1(i,e,t,n,r=null){const o=i[dg]||(i[dg]={}),a=o[e];if(n&&a)a.value=n;else{const[c,u]=g1(e);if(n){const f=o[e]=x1(n,r);d1(i,c,f,u)}else a&&(p1(i,c,a,u),o[e]=void 0)}}const pg=/(?:Once|Passive|Capture)$/;function g1(i){let e;if(pg.test(i)){e={};let n;for(;n=i.match(pg);)i=i.slice(0,i.length-n[0].length),e[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):Bo(i.slice(2)),e]}let Af=0;const _1=Promise.resolve(),v1=()=>Af||(_1.then(()=>Af=0),Af=Date.now());function x1(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;bi(y1(n,t.value),e,5,[n])};return t.value=i,t.attached=v1(),t}function y1(i,e){if(pt(e)){const t=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{t.call(i),i._stopped=!0},e.map(n=>r=>!r._stopped&&n&&n(r))}else return e}const mg=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,M1=(i,e,t,n,r,o,a,c,u)=>{const f=r==="svg";e==="class"?s1(i,n,f):e==="style"?c1(i,t,n):Vc(e)?Vh(e)||m1(i,e,t,n,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):S1(i,e,n,f))?h1(i,e,n,o,a,c,u):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),f1(i,e,n,f))};function S1(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&mg(e)&&_t(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return mg(e)&&mn(t)?!1:e in i}const E1=pn({patchProp:M1},i1);let gg;function T1(){return gg||(gg=Lw(E1))}const A1=(...i)=>{const e=T1().createApp(...i),{mount:t}=e;return e.mount=n=>{const r=w1(n);if(!r)return;const o=e._component;!_t(o)&&!o.render&&!o.template&&(o.template=r.innerHTML),r.innerHTML="";const a=t(r,!1,b1(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function b1(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function w1(i){return mn(i)?document.querySelector(i):i}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ad="163",R1=0,_g=1,C1=2,s0=1,P1=2,cr=3,pr=0,Vn=1,Fi=2,Kr=0,Mo=1,vg=2,xg=3,yg=4,L1=5,Ms=100,I1=101,N1=102,D1=103,U1=104,O1=200,F1=201,B1=202,z1=203,Ah=204,bh=205,H1=206,V1=207,G1=208,k1=209,W1=210,X1=211,q1=212,K1=213,Y1=214,$1=0,Z1=1,J1=2,Nc=3,j1=4,Q1=5,eR=6,tR=7,o0=0,nR=1,iR=2,Yr=0,rR=1,sR=2,oR=3,aR=4,lR=5,cR=6,uR=7,Mg="attached",fR="detached",a0=300,Co=301,Po=302,wh=303,Rh=304,jc=306,Lo=1e3,kr=1001,Dc=1002,Dn=1003,l0=1004,Sa=1005,jn=1006,Ac=1007,fr=1008,$r=1009,hR=1010,dR=1011,c0=1012,u0=1013,Io=1014,Hi=1015,Uc=1016,f0=1017,h0=1018,qa=1020,pR=35902,mR=1021,gR=1022,Ai=1023,_R=1024,vR=1025,So=1026,za=1027,d0=1028,p0=1029,xR=1030,m0=1031,g0=1033,bf=33776,wf=33777,Rf=33778,Cf=33779,Sg=35840,Eg=35841,Tg=35842,Ag=35843,_0=36196,bg=37492,wg=37496,Rg=37808,Cg=37809,Pg=37810,Lg=37811,Ig=37812,Ng=37813,Dg=37814,Ug=37815,Og=37816,Fg=37817,Bg=37818,zg=37819,Hg=37820,Vg=37821,Pf=36492,Gg=36494,kg=36495,yR=36283,Wg=36284,Xg=36285,qg=36286,Ha=2300,No=2301,Lf=2302,Kg=2400,Yg=2401,$g=2402,MR=2500,SR=0,v0=1,Ch=2,ER=3200,TR=3201,x0=0,AR=1,Gr="",Ln="srgb",gn="srgb-linear",ld="display-p3",Qc="display-p3-linear",Oc="linear",Gt="srgb",Fc="rec709",Bc="p3",Zs=7680,Zg=519,bR=512,wR=513,RR=514,y0=515,CR=516,PR=517,LR=518,IR=519,Ph=35044,Jg="300 es",hr=2e3,zc=2001;class zo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let o=0,a=r.length;o<a;o++)r[o].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jg=1234567;const Ca=Math.PI/180,Do=180/Math.PI;function di(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function un(i,e,t){return Math.max(e,Math.min(t,i))}function cd(i,e){return(i%e+e)%e}function NR(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function DR(i,e,t){return i!==e?(t-i)/(e-i):0}function Pa(i,e,t){return(1-t)*i+t*e}function UR(i,e,t,n){return Pa(i,e,1-Math.exp(-t*n))}function OR(i,e=1){return e-Math.abs(cd(i,e*2)-e)}function FR(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function BR(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function zR(i,e){return i+Math.floor(Math.random()*(e-i+1))}function HR(i,e){return i+Math.random()*(e-i)}function VR(i){return i*(.5-Math.random())}function GR(i){i!==void 0&&(jg=i);let e=jg+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kR(i){return i*Ca}function WR(i){return i*Do}function XR(i){return(i&i-1)===0&&i!==0}function qR(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function KR(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function YR(i,e,t,n,r){const o=Math.cos,a=Math.sin,c=o(t/2),u=a(t/2),f=o((e+n)/2),d=a((e+n)/2),p=o((e-n)/2),m=a((e-n)/2),_=o((n-e)/2),y=a((n-e)/2);switch(r){case"XYX":i.set(c*d,u*p,u*m,c*f);break;case"YZY":i.set(u*m,c*d,u*p,c*f);break;case"ZXZ":i.set(u*p,u*m,c*d,c*f);break;case"XZX":i.set(c*d,u*y,u*_,c*f);break;case"YXY":i.set(u*_,c*d,u*y,c*f);break;case"ZYZ":i.set(u*y,u*_,c*d,c*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const $R={DEG2RAD:Ca,RAD2DEG:Do,generateUUID:di,clamp:un,euclideanModulo:cd,mapLinear:NR,inverseLerp:DR,lerp:Pa,damp:UR,pingpong:OR,smoothstep:FR,smootherstep:BR,randInt:zR,randFloat:HR,randFloatSpread:VR,seededRandom:GR,degToRad:kR,radToDeg:WR,isPowerOfTwo:XR,ceilPowerOfTwo:qR,floorPowerOfTwo:KR,setQuaternionFromProperEuler:YR,normalize:Pt,denormalize:Ei};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(un(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*n-a*r+e.x,this.y=o*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,n,r,o,a,c,u,f){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,a,c,u,f)}set(e,t,n,r,o,a,c,u,f){const d=this.elements;return d[0]=e,d[1]=r,d[2]=c,d[3]=t,d[4]=o,d[5]=u,d[6]=n,d[7]=a,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,a=n[0],c=n[3],u=n[6],f=n[1],d=n[4],p=n[7],m=n[2],_=n[5],y=n[8],T=r[0],x=r[3],v=r[6],N=r[1],S=r[4],P=r[7],q=r[2],O=r[5],U=r[8];return o[0]=a*T+c*N+u*q,o[3]=a*x+c*S+u*O,o[6]=a*v+c*P+u*U,o[1]=f*T+d*N+p*q,o[4]=f*x+d*S+p*O,o[7]=f*v+d*P+p*U,o[2]=m*T+_*N+y*q,o[5]=m*x+_*S+y*O,o[8]=m*v+_*P+y*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],c=e[5],u=e[6],f=e[7],d=e[8];return t*a*d-t*c*f-n*o*d+n*c*u+r*o*f-r*a*u}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],c=e[5],u=e[6],f=e[7],d=e[8],p=d*a-c*f,m=c*u-d*o,_=f*o-a*u,y=t*p+n*m+r*_;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/y;return e[0]=p*T,e[1]=(r*f-d*n)*T,e[2]=(c*n-r*a)*T,e[3]=m*T,e[4]=(d*t-r*u)*T,e[5]=(r*o-c*t)*T,e[6]=_*T,e[7]=(n*u-f*t)*T,e[8]=(a*t-n*o)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,a,c){const u=Math.cos(o),f=Math.sin(o);return this.set(n*u,n*f,-n*(u*a+f*c)+a+e,-r*f,r*u,-r*(-f*a+u*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(If.makeScale(e,t)),this}rotate(e){return this.premultiply(If.makeRotation(-e)),this}translate(e,t){return this.premultiply(If.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const If=new dt;function M0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ZR(){const i=Va("canvas");return i.style.display="block",i}const Qg={};function S0(i){i in Qg||(Qg[i]=!0,console.warn(i))}const e_=new dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),t_=new dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wl={[gn]:{transfer:Oc,primaries:Fc,toReference:i=>i,fromReference:i=>i},[Ln]:{transfer:Gt,primaries:Fc,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Qc]:{transfer:Oc,primaries:Bc,toReference:i=>i.applyMatrix3(t_),fromReference:i=>i.applyMatrix3(e_)},[ld]:{transfer:Gt,primaries:Bc,toReference:i=>i.convertSRGBToLinear().applyMatrix3(t_),fromReference:i=>i.applyMatrix3(e_).convertLinearToSRGB()}},JR=new Set([gn,Qc]),Rt={enabled:!0,_workingColorSpace:gn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!JR.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Wl[e].toReference,r=Wl[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Wl[i].primaries},getTransfer:function(i){return i===Gr?Oc:Wl[i].transfer}};function Eo(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Nf(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Js;class jR{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Js===void 0&&(Js=Va("canvas")),Js.width=e.width,Js.height=e.height;const n=Js.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Js}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let a=0;a<o.length;a++)o[a]=Eo(o[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Eo(t[n]/255)*255):t[n]=Eo(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let QR=0;class E0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:QR++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let a=0,c=r.length;a<c;a++)r[a].isDataTexture?o.push(Df(r[a].image)):o.push(Df(r[a]))}else o=Df(r);n.url=o}return t||(e.images[this.uuid]=n),n}}function Df(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jR.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eC=0;class fn extends zo{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,n=kr,r=kr,o=jn,a=fr,c=Ai,u=$r,f=fn.DEFAULT_ANISOTROPY,d=Gr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eC++}),this.uuid=di(),this.name="",this.source=new E0(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=f,this.format=c,this.internalFormat=null,this.type=u,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==a0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lo:e.x=e.x-Math.floor(e.x);break;case kr:e.x=e.x<0?0:1;break;case Dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Lo:e.y=e.y-Math.floor(e.y);break;case kr:e.y=e.y<0?0:1;break;case Dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=a0;fn.DEFAULT_ANISOTROPY=1;class Ut{constructor(e=0,t=0,n=0,r=1){Ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*o,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*o,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*o,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o;const u=e.elements,f=u[0],d=u[4],p=u[8],m=u[1],_=u[5],y=u[9],T=u[2],x=u[6],v=u[10];if(Math.abs(d-m)<.01&&Math.abs(p-T)<.01&&Math.abs(y-x)<.01){if(Math.abs(d+m)<.1&&Math.abs(p+T)<.1&&Math.abs(y+x)<.1&&Math.abs(f+_+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(f+1)/2,P=(_+1)/2,q=(v+1)/2,O=(d+m)/4,U=(p+T)/4,J=(y+x)/4;return S>P&&S>q?S<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(S),r=O/n,o=U/n):P>q?P<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(P),n=O/r,o=J/r):q<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(q),n=U/o,r=J/o),this.set(n,r,o,t),this}let N=Math.sqrt((x-y)*(x-y)+(p-T)*(p-T)+(m-d)*(m-d));return Math.abs(N)<.001&&(N=1),this.x=(x-y)/N,this.y=(p-T)/N,this.z=(m-d)/N,this.w=Math.acos((f+_+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tC extends zo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new fn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let c=0;c<a;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new E0(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ws extends tC{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class T0 extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nC extends fn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=kr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,a,c){let u=n[r+0],f=n[r+1],d=n[r+2],p=n[r+3];const m=o[a+0],_=o[a+1],y=o[a+2],T=o[a+3];if(c===0){e[t+0]=u,e[t+1]=f,e[t+2]=d,e[t+3]=p;return}if(c===1){e[t+0]=m,e[t+1]=_,e[t+2]=y,e[t+3]=T;return}if(p!==T||u!==m||f!==_||d!==y){let x=1-c;const v=u*m+f*_+d*y+p*T,N=v>=0?1:-1,S=1-v*v;if(S>Number.EPSILON){const q=Math.sqrt(S),O=Math.atan2(q,v*N);x=Math.sin(x*O)/q,c=Math.sin(c*O)/q}const P=c*N;if(u=u*x+m*P,f=f*x+_*P,d=d*x+y*P,p=p*x+T*P,x===1-c){const q=1/Math.sqrt(u*u+f*f+d*d+p*p);u*=q,f*=q,d*=q,p*=q}}e[t]=u,e[t+1]=f,e[t+2]=d,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,o,a){const c=n[r],u=n[r+1],f=n[r+2],d=n[r+3],p=o[a],m=o[a+1],_=o[a+2],y=o[a+3];return e[t]=c*y+d*p+u*_-f*m,e[t+1]=u*y+d*m+f*p-c*_,e[t+2]=f*y+d*_+c*m-u*p,e[t+3]=d*y-c*p-u*m-f*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,o=e._z,a=e._order,c=Math.cos,u=Math.sin,f=c(n/2),d=c(r/2),p=c(o/2),m=u(n/2),_=u(r/2),y=u(o/2);switch(a){case"XYZ":this._x=m*d*p+f*_*y,this._y=f*_*p-m*d*y,this._z=f*d*y+m*_*p,this._w=f*d*p-m*_*y;break;case"YXZ":this._x=m*d*p+f*_*y,this._y=f*_*p-m*d*y,this._z=f*d*y-m*_*p,this._w=f*d*p+m*_*y;break;case"ZXY":this._x=m*d*p-f*_*y,this._y=f*_*p+m*d*y,this._z=f*d*y+m*_*p,this._w=f*d*p-m*_*y;break;case"ZYX":this._x=m*d*p-f*_*y,this._y=f*_*p+m*d*y,this._z=f*d*y-m*_*p,this._w=f*d*p+m*_*y;break;case"YZX":this._x=m*d*p+f*_*y,this._y=f*_*p+m*d*y,this._z=f*d*y-m*_*p,this._w=f*d*p-m*_*y;break;case"XZY":this._x=m*d*p-f*_*y,this._y=f*_*p-m*d*y,this._z=f*d*y+m*_*p,this._w=f*d*p+m*_*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],o=t[8],a=t[1],c=t[5],u=t[9],f=t[2],d=t[6],p=t[10],m=n+c+p;if(m>0){const _=.5/Math.sqrt(m+1);this._w=.25/_,this._x=(d-u)*_,this._y=(o-f)*_,this._z=(a-r)*_}else if(n>c&&n>p){const _=2*Math.sqrt(1+n-c-p);this._w=(d-u)/_,this._x=.25*_,this._y=(r+a)/_,this._z=(o+f)/_}else if(c>p){const _=2*Math.sqrt(1+c-n-p);this._w=(o-f)/_,this._x=(r+a)/_,this._y=.25*_,this._z=(u+d)/_}else{const _=2*Math.sqrt(1+p-n-c);this._w=(a-r)/_,this._x=(o+f)/_,this._y=(u+d)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(un(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,o=e._z,a=e._w,c=t._x,u=t._y,f=t._z,d=t._w;return this._x=n*d+a*c+r*f-o*u,this._y=r*d+a*u+o*c-n*f,this._z=o*d+a*f+n*u-r*c,this._w=a*d-n*c-r*u-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,o=this._z,a=this._w;let c=a*e._w+n*e._x+r*e._y+o*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=a,this._x=n,this._y=r,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const _=1-t;return this._w=_*a+t*this._w,this._x=_*n+t*this._x,this._y=_*r+t*this._y,this._z=_*o+t*this._z,this.normalize(),this}const f=Math.sqrt(u),d=Math.atan2(f,c),p=Math.sin((1-t)*d)/f,m=Math.sin(t*d)/f;return this._w=a*p+this._w*m,this._x=n*p+this._x*m,this._y=r*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,n=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(n_.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(n_.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=e.elements,a=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*a,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*a,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,o=e.x,a=e.y,c=e.z,u=e.w,f=2*(a*r-c*n),d=2*(c*t-o*r),p=2*(o*n-a*t);return this.x=t+u*f+a*p-c*d,this.y=n+u*d+c*f-o*p,this.z=r+u*p+o*d-a*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,o=e.z,a=t.x,c=t.y,u=t.z;return this.x=r*u-o*c,this.y=o*a-n*u,this.z=n*c-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uf.copy(this).projectOnVector(e),this.sub(Uf)}reflect(e){return this.sub(Uf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(un(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Uf=new X,n_=new jr;class gr{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=o.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,xi):xi.fromBufferAttribute(o,a),xi.applyMatrix4(e.matrixWorld),this.expandByPoint(xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xl.copy(n.boundingBox)),Xl.applyMatrix4(e.matrixWorld),this.union(Xl)}const r=e.children;for(let o=0,a=r.length;o<a;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,xi),xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fa),ql.subVectors(this.max,fa),js.subVectors(e.a,fa),Qs.subVectors(e.b,fa),eo.subVectors(e.c,fa),Lr.subVectors(Qs,js),Ir.subVectors(eo,Qs),fs.subVectors(js,eo);let t=[0,-Lr.z,Lr.y,0,-Ir.z,Ir.y,0,-fs.z,fs.y,Lr.z,0,-Lr.x,Ir.z,0,-Ir.x,fs.z,0,-fs.x,-Lr.y,Lr.x,0,-Ir.y,Ir.x,0,-fs.y,fs.x,0];return!Of(t,js,Qs,eo,ql)||(t=[1,0,0,0,1,0,0,0,1],!Of(t,js,Qs,eo,ql))?!1:(Kl.crossVectors(Lr,Ir),t=[Kl.x,Kl.y,Kl.z],Of(t,js,Qs,eo,ql))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ir[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ir[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ir[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ir[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ir[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ir[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ir[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ir[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ir),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ir=[new X,new X,new X,new X,new X,new X,new X,new X],xi=new X,Xl=new gr,js=new X,Qs=new X,eo=new X,Lr=new X,Ir=new X,fs=new X,fa=new X,ql=new X,Kl=new X,hs=new X;function Of(i,e,t,n,r){for(let o=0,a=i.length-3;o<=a;o+=3){hs.fromArray(i,o);const c=r.x*Math.abs(hs.x)+r.y*Math.abs(hs.y)+r.z*Math.abs(hs.z),u=e.dot(hs),f=t.dot(hs),d=n.dot(hs);if(Math.max(-Math.max(u,f,d),Math.min(u,f,d))>c)return!1}return!0}const iC=new gr,ha=new X,Ff=new X;class Wi{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):iC.setFromPoints(e).getCenter(n);let r=0;for(let o=0,a=e.length;o<a;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ha.subVectors(e,this.center);const t=ha.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ha,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ff.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ha.copy(e.center).add(Ff)),this.expandByPoint(ha.copy(e.center).sub(Ff))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rr=new X,Bf=new X,Yl=new X,Nr=new X,zf=new X,$l=new X,Hf=new X;class eu{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=rr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rr.copy(this.origin).addScaledVector(this.direction,t),rr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Bf.copy(e).add(t).multiplyScalar(.5),Yl.copy(t).sub(e).normalize(),Nr.copy(this.origin).sub(Bf);const o=e.distanceTo(t)*.5,a=-this.direction.dot(Yl),c=Nr.dot(this.direction),u=-Nr.dot(Yl),f=Nr.lengthSq(),d=Math.abs(1-a*a);let p,m,_,y;if(d>0)if(p=a*u-c,m=a*c-u,y=o*d,p>=0)if(m>=-y)if(m<=y){const T=1/d;p*=T,m*=T,_=p*(p+a*m+2*c)+m*(a*p+m+2*u)+f}else m=o,p=Math.max(0,-(a*m+c)),_=-p*p+m*(m+2*u)+f;else m=-o,p=Math.max(0,-(a*m+c)),_=-p*p+m*(m+2*u)+f;else m<=-y?(p=Math.max(0,-(-a*o+c)),m=p>0?-o:Math.min(Math.max(-o,-u),o),_=-p*p+m*(m+2*u)+f):m<=y?(p=0,m=Math.min(Math.max(-o,-u),o),_=m*(m+2*u)+f):(p=Math.max(0,-(a*o+c)),m=p>0?o:Math.min(Math.max(-o,-u),o),_=-p*p+m*(m+2*u)+f);else m=a>0?-o:o,p=Math.max(0,-(a*m+c)),_=-p*p+m*(m+2*u)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Bf).addScaledVector(Yl,m),_}intersectSphere(e,t){rr.subVectors(e.center,this.origin);const n=rr.dot(this.direction),r=rr.dot(rr)-n*n,o=e.radius*e.radius;if(r>o)return null;const a=Math.sqrt(o-r),c=n-a,u=n+a;return u<0?null:c<0?this.at(u,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,a,c,u;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,r=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,r=(e.min.x-m.x)*f),d>=0?(o=(e.min.y-m.y)*d,a=(e.max.y-m.y)*d):(o=(e.max.y-m.y)*d,a=(e.min.y-m.y)*d),n>a||o>r||((o>n||isNaN(n))&&(n=o),(a<r||isNaN(r))&&(r=a),p>=0?(c=(e.min.z-m.z)*p,u=(e.max.z-m.z)*p):(c=(e.max.z-m.z)*p,u=(e.min.z-m.z)*p),n>u||c>r)||((c>n||n!==n)&&(n=c),(u<r||r!==r)&&(r=u),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,rr)!==null}intersectTriangle(e,t,n,r,o){zf.subVectors(t,e),$l.subVectors(n,e),Hf.crossVectors(zf,$l);let a=this.direction.dot(Hf),c;if(a>0){if(r)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Nr.subVectors(this.origin,e);const u=c*this.direction.dot($l.crossVectors(Nr,$l));if(u<0)return null;const f=c*this.direction.dot(zf.cross(Nr));if(f<0||u+f>a)return null;const d=-c*Nr.dot(Hf);return d<0?null:this.at(d/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,n,r,o,a,c,u,f,d,p,m,_,y,T,x){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,a,c,u,f,d,p,m,_,y,T,x)}set(e,t,n,r,o,a,c,u,f,d,p,m,_,y,T,x){const v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=r,v[1]=o,v[5]=a,v[9]=c,v[13]=u,v[2]=f,v[6]=d,v[10]=p,v[14]=m,v[3]=_,v[7]=y,v[11]=T,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/to.setFromMatrixColumn(e,0).length(),o=1/to.setFromMatrixColumn(e,1).length(),a=1/to.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,o=e.z,a=Math.cos(n),c=Math.sin(n),u=Math.cos(r),f=Math.sin(r),d=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=a*d,_=a*p,y=c*d,T=c*p;t[0]=u*d,t[4]=-u*p,t[8]=f,t[1]=_+y*f,t[5]=m-T*f,t[9]=-c*u,t[2]=T-m*f,t[6]=y+_*f,t[10]=a*u}else if(e.order==="YXZ"){const m=u*d,_=u*p,y=f*d,T=f*p;t[0]=m+T*c,t[4]=y*c-_,t[8]=a*f,t[1]=a*p,t[5]=a*d,t[9]=-c,t[2]=_*c-y,t[6]=T+m*c,t[10]=a*u}else if(e.order==="ZXY"){const m=u*d,_=u*p,y=f*d,T=f*p;t[0]=m-T*c,t[4]=-a*p,t[8]=y+_*c,t[1]=_+y*c,t[5]=a*d,t[9]=T-m*c,t[2]=-a*f,t[6]=c,t[10]=a*u}else if(e.order==="ZYX"){const m=a*d,_=a*p,y=c*d,T=c*p;t[0]=u*d,t[4]=y*f-_,t[8]=m*f+T,t[1]=u*p,t[5]=T*f+m,t[9]=_*f-y,t[2]=-f,t[6]=c*u,t[10]=a*u}else if(e.order==="YZX"){const m=a*u,_=a*f,y=c*u,T=c*f;t[0]=u*d,t[4]=T-m*p,t[8]=y*p+_,t[1]=p,t[5]=a*d,t[9]=-c*d,t[2]=-f*d,t[6]=_*p+y,t[10]=m-T*p}else if(e.order==="XZY"){const m=a*u,_=a*f,y=c*u,T=c*f;t[0]=u*d,t[4]=-p,t[8]=f*d,t[1]=m*p+T,t[5]=a*d,t[9]=_*p-y,t[2]=y*p-_,t[6]=c*d,t[10]=T*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rC,e,sC)}lookAt(e,t,n){const r=this.elements;return Zn.subVectors(e,t),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),Dr.crossVectors(n,Zn),Dr.lengthSq()===0&&(Math.abs(n.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),Dr.crossVectors(n,Zn)),Dr.normalize(),Zl.crossVectors(Zn,Dr),r[0]=Dr.x,r[4]=Zl.x,r[8]=Zn.x,r[1]=Dr.y,r[5]=Zl.y,r[9]=Zn.y,r[2]=Dr.z,r[6]=Zl.z,r[10]=Zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,a=n[0],c=n[4],u=n[8],f=n[12],d=n[1],p=n[5],m=n[9],_=n[13],y=n[2],T=n[6],x=n[10],v=n[14],N=n[3],S=n[7],P=n[11],q=n[15],O=r[0],U=r[4],J=r[8],I=r[12],b=r[1],j=r[5],pe=r[9],$=r[13],le=r[2],de=r[6],xe=r[10],fe=r[14],te=r[3],Ee=r[7],Se=r[11],Re=r[15];return o[0]=a*O+c*b+u*le+f*te,o[4]=a*U+c*j+u*de+f*Ee,o[8]=a*J+c*pe+u*xe+f*Se,o[12]=a*I+c*$+u*fe+f*Re,o[1]=d*O+p*b+m*le+_*te,o[5]=d*U+p*j+m*de+_*Ee,o[9]=d*J+p*pe+m*xe+_*Se,o[13]=d*I+p*$+m*fe+_*Re,o[2]=y*O+T*b+x*le+v*te,o[6]=y*U+T*j+x*de+v*Ee,o[10]=y*J+T*pe+x*xe+v*Se,o[14]=y*I+T*$+x*fe+v*Re,o[3]=N*O+S*b+P*le+q*te,o[7]=N*U+S*j+P*de+q*Ee,o[11]=N*J+S*pe+P*xe+q*Se,o[15]=N*I+S*$+P*fe+q*Re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],a=e[1],c=e[5],u=e[9],f=e[13],d=e[2],p=e[6],m=e[10],_=e[14],y=e[3],T=e[7],x=e[11],v=e[15];return y*(+o*u*p-r*f*p-o*c*m+n*f*m+r*c*_-n*u*_)+T*(+t*u*_-t*f*m+o*a*m-r*a*_+r*f*d-o*u*d)+x*(+t*f*p-t*c*_-o*a*p+n*a*_+o*c*d-n*f*d)+v*(-r*c*d-t*u*p+t*c*m+r*a*p-n*a*m+n*u*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],c=e[5],u=e[6],f=e[7],d=e[8],p=e[9],m=e[10],_=e[11],y=e[12],T=e[13],x=e[14],v=e[15],N=p*x*f-T*m*f+T*u*_-c*x*_-p*u*v+c*m*v,S=y*m*f-d*x*f-y*u*_+a*x*_+d*u*v-a*m*v,P=d*T*f-y*p*f+y*c*_-a*T*_-d*c*v+a*p*v,q=y*p*u-d*T*u-y*c*m+a*T*m+d*c*x-a*p*x,O=t*N+n*S+r*P+o*q;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return e[0]=N*U,e[1]=(T*m*o-p*x*o-T*r*_+n*x*_+p*r*v-n*m*v)*U,e[2]=(c*x*o-T*u*o+T*r*f-n*x*f-c*r*v+n*u*v)*U,e[3]=(p*u*o-c*m*o-p*r*f+n*m*f+c*r*_-n*u*_)*U,e[4]=S*U,e[5]=(d*x*o-y*m*o+y*r*_-t*x*_-d*r*v+t*m*v)*U,e[6]=(y*u*o-a*x*o-y*r*f+t*x*f+a*r*v-t*u*v)*U,e[7]=(a*m*o-d*u*o+d*r*f-t*m*f-a*r*_+t*u*_)*U,e[8]=P*U,e[9]=(y*p*o-d*T*o-y*n*_+t*T*_+d*n*v-t*p*v)*U,e[10]=(a*T*o-y*c*o+y*n*f-t*T*f-a*n*v+t*c*v)*U,e[11]=(d*c*o-a*p*o-d*n*f+t*p*f+a*n*_-t*c*_)*U,e[12]=q*U,e[13]=(d*T*r-y*p*r+y*n*m-t*T*m-d*n*x+t*p*x)*U,e[14]=(y*c*r-a*T*r-y*n*u+t*T*u+a*n*x-t*c*x)*U,e[15]=(a*p*r-d*c*r+d*n*u-t*p*u-a*n*m+t*c*m)*U,this}scale(e){const t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),o=1-n,a=e.x,c=e.y,u=e.z,f=o*a,d=o*c;return this.set(f*a+n,f*c-r*u,f*u+r*c,0,f*c+r*u,d*c+n,d*u-r*a,0,f*u-r*c,d*u+r*a,o*u*u+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,a){return this.set(1,n,o,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,o=t._x,a=t._y,c=t._z,u=t._w,f=o+o,d=a+a,p=c+c,m=o*f,_=o*d,y=o*p,T=a*d,x=a*p,v=c*p,N=u*f,S=u*d,P=u*p,q=n.x,O=n.y,U=n.z;return r[0]=(1-(T+v))*q,r[1]=(_+P)*q,r[2]=(y-S)*q,r[3]=0,r[4]=(_-P)*O,r[5]=(1-(m+v))*O,r[6]=(x+N)*O,r[7]=0,r[8]=(y+S)*U,r[9]=(x-N)*U,r[10]=(1-(m+T))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let o=to.set(r[0],r[1],r[2]).length();const a=to.set(r[4],r[5],r[6]).length(),c=to.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],yi.copy(this);const f=1/o,d=1/a,p=1/c;return yi.elements[0]*=f,yi.elements[1]*=f,yi.elements[2]*=f,yi.elements[4]*=d,yi.elements[5]*=d,yi.elements[6]*=d,yi.elements[8]*=p,yi.elements[9]*=p,yi.elements[10]*=p,t.setFromRotationMatrix(yi),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,r,o,a,c=hr){const u=this.elements,f=2*o/(t-e),d=2*o/(n-r),p=(t+e)/(t-e),m=(n+r)/(n-r);let _,y;if(c===hr)_=-(a+o)/(a-o),y=-2*a*o/(a-o);else if(c===zc)_=-a/(a-o),y=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=f,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=d,u[9]=m,u[13]=0,u[2]=0,u[6]=0,u[10]=_,u[14]=y,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,r,o,a,c=hr){const u=this.elements,f=1/(t-e),d=1/(n-r),p=1/(a-o),m=(t+e)*f,_=(n+r)*d;let y,T;if(c===hr)y=(a+o)*p,T=-2*p;else if(c===zc)y=o*p,T=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*f,u[4]=0,u[8]=0,u[12]=-m,u[1]=0,u[5]=2*d,u[9]=0,u[13]=-_,u[2]=0,u[6]=0,u[10]=T,u[14]=-y,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const to=new X,yi=new ct,rC=new X(0,0,0),sC=new X(1,1,1),Dr=new X,Zl=new X,Zn=new X,i_=new ct,r_=new jr;class ki{constructor(e=0,t=0,n=0,r=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,o=r[0],a=r[4],c=r[8],u=r[1],f=r[5],d=r[9],p=r[2],m=r[6],_=r[10];switch(t){case"XYZ":this._y=Math.asin(un(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,_),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-un(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(u,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(un(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,_),this._z=Math.atan2(-a,f)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-un(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,_),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-a,f));break;case"YZX":this._z=Math.asin(un(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-un(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return i_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(i_,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return r_.setFromEuler(this),this.setFromQuaternion(r_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class A0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let oC=0;const s_=new X,no=new jr,sr=new ct,Jl=new X,da=new X,aC=new X,lC=new jr,o_=new X(1,0,0),a_=new X(0,1,0),l_=new X(0,0,1),c_={type:"added"},cC={type:"removed"},io={type:"childadded",child:null},Vf={type:"childremoved",child:null};class Yt extends zo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oC++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new X,t=new ki,n=new jr,r=new X(1,1,1);function o(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new dt}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new A0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return no.setFromAxisAngle(e,t),this.quaternion.multiply(no),this}rotateOnWorldAxis(e,t){return no.setFromAxisAngle(e,t),this.quaternion.premultiply(no),this}rotateX(e){return this.rotateOnAxis(o_,e)}rotateY(e){return this.rotateOnAxis(a_,e)}rotateZ(e){return this.rotateOnAxis(l_,e)}translateOnAxis(e,t){return s_.copy(e).applyQuaternion(this.quaternion),this.position.add(s_.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(o_,e)}translateY(e){return this.translateOnAxis(a_,e)}translateZ(e){return this.translateOnAxis(l_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Jl.copy(e):Jl.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sr.lookAt(da,Jl,this.up):sr.lookAt(Jl,da,this.up),this.quaternion.setFromRotationMatrix(sr),r&&(sr.extractRotation(r.matrixWorld),no.setFromRotationMatrix(sr),this.quaternion.premultiply(no.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(c_),io.child=e,this.dispatchEvent(io),io.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cC),Vf.child=e,this.dispatchEvent(Vf),Vf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(c_),io.child=e,this.dispatchEvent(io),io.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,e,aC),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,lC,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++){const c=r[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let f=0,d=u.length;f<d;f++){const p=u[f];o(e.shapes,p)}else o(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,f=this.material.length;u<f;u++)c.push(o(e.materials,this.material[u]));r.material=c}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];r.animations.push(o(e.animations,u))}}if(t){const c=a(e.geometries),u=a(e.materials),f=a(e.textures),d=a(e.images),p=a(e.shapes),m=a(e.skeletons),_=a(e.animations),y=a(e.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),f.length>0&&(n.textures=f),d.length>0&&(n.images=d),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),_.length>0&&(n.animations=_),y.length>0&&(n.nodes=y)}return n.object=r,n;function a(c){const u=[];for(const f in c){const d=c[f];delete d.metadata,u.push(d)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Yt.DEFAULT_UP=new X(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mi=new X,or=new X,Gf=new X,ar=new X,ro=new X,so=new X,u_=new X,kf=new X,Wf=new X,Xf=new X;class Bi{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Mi.subVectors(e,t),r.cross(Mi);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){Mi.subVectors(r,t),or.subVectors(n,t),Gf.subVectors(e,t);const a=Mi.dot(Mi),c=Mi.dot(or),u=Mi.dot(Gf),f=or.dot(or),d=or.dot(Gf),p=a*f-c*c;if(p===0)return o.set(0,0,0),null;const m=1/p,_=(f*u-c*d)*m,y=(a*d-c*u)*m;return o.set(1-_-y,y,_)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ar)===null?!1:ar.x>=0&&ar.y>=0&&ar.x+ar.y<=1}static getInterpolation(e,t,n,r,o,a,c,u){return this.getBarycoord(e,t,n,r,ar)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,ar.x),u.addScaledVector(a,ar.y),u.addScaledVector(c,ar.z),u)}static isFrontFacing(e,t,n,r){return Mi.subVectors(n,t),or.subVectors(e,t),Mi.cross(or).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mi.subVectors(this.c,this.b),or.subVectors(this.a,this.b),Mi.cross(or).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,o){return Bi.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return Bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,o=this.c;let a,c;ro.subVectors(r,n),so.subVectors(o,n),kf.subVectors(e,n);const u=ro.dot(kf),f=so.dot(kf);if(u<=0&&f<=0)return t.copy(n);Wf.subVectors(e,r);const d=ro.dot(Wf),p=so.dot(Wf);if(d>=0&&p<=d)return t.copy(r);const m=u*p-d*f;if(m<=0&&u>=0&&d<=0)return a=u/(u-d),t.copy(n).addScaledVector(ro,a);Xf.subVectors(e,o);const _=ro.dot(Xf),y=so.dot(Xf);if(y>=0&&_<=y)return t.copy(o);const T=_*f-u*y;if(T<=0&&f>=0&&y<=0)return c=f/(f-y),t.copy(n).addScaledVector(so,c);const x=d*y-_*p;if(x<=0&&p-d>=0&&_-y>=0)return u_.subVectors(o,r),c=(p-d)/(p-d+(_-y)),t.copy(r).addScaledVector(u_,c);const v=1/(x+T+m);return a=T*v,c=m*v,t.copy(n).addScaledVector(ro,a).addScaledVector(so,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const b0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ur={h:0,s:0,l:0},jl={h:0,s:0,l:0};function qf(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Rt.workingColorSpace){if(e=cd(e,1),t=un(t,0,1),n=un(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,a=2*n-o;this.r=qf(a,o,e+1/3),this.g=qf(a,o,e),this.b=qf(a,o,e-1/3)}return Rt.toWorkingColorSpace(this,r),this}setStyle(e,t=Ln){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const a=r[1],c=r[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ln){const n=b0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Eo(e.r),this.g=Eo(e.g),this.b=Eo(e.b),this}copyLinearToSRGB(e){return this.r=Nf(e.r),this.g=Nf(e.g),this.b=Nf(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ln){return Rt.fromWorkingColorSpace(Mn.copy(this),e),Math.round(un(Mn.r*255,0,255))*65536+Math.round(un(Mn.g*255,0,255))*256+Math.round(un(Mn.b*255,0,255))}getHexString(e=Ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(Mn.copy(this),t);const n=Mn.r,r=Mn.g,o=Mn.b,a=Math.max(n,r,o),c=Math.min(n,r,o);let u,f;const d=(c+a)/2;if(c===a)u=0,f=0;else{const p=a-c;switch(f=d<=.5?p/(a+c):p/(2-a-c),a){case n:u=(r-o)/p+(r<o?6:0);break;case r:u=(o-n)/p+2;break;case o:u=(n-r)/p+4;break}u/=6}return e.h=u,e.s=f,e.l=d,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=Ln){Rt.fromWorkingColorSpace(Mn.copy(this),e);const t=Mn.r,n=Mn.g,r=Mn.b;return e!==Ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Ur),this.setHSL(Ur.h+e,Ur.s+t,Ur.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ur),e.getHSL(jl);const n=Pa(Ur.h,jl.h,t),r=Pa(Ur.s,jl.s,t),o=Pa(Ur.l,jl.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mn=new it;it.NAMES=b0;let uC=0;class Gi extends zo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uC++}),this.uuid=di(),this.name="",this.type="Material",this.blending=Mo,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ah,this.blendDst=bh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Nc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zs,this.stencilZFail=Zs,this.stencilZPass=Zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mo&&(n.blending=this.blending),this.side!==pr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ah&&(n.blendSrc=this.blendSrc),this.blendDst!==bh&&(n.blendDst=this.blendDst),this.blendEquation!==Ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Nc&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zg&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const a=[];for(const c in o){const u=o[c];delete u.metadata,a.push(u)}return a}if(t){const o=r(e.textures),a=r(e.images);o.length>0&&(n.textures=o),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Vi extends Gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=o0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qt=new X,Ql=new Pe;class Un{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ph,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return S0("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ql.fromBufferAttribute(this,t),Ql.applyMatrix3(e),this.setXY(t,Ql.x,Ql.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),o=Pt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ph&&(e.usage=this.usage),e}}class w0 extends Un{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class R0 extends Un{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wi extends Un{constructor(e,t,n){super(new Float32Array(e),t,n)}}let fC=0;const ui=new ct,Kf=new Yt,oo=new X,Jn=new gr,pa=new gr,cn=new X;class Ri extends zo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fC++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(M0(e)?R0:w0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new dt().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ui.makeRotationFromQuaternion(e),this.applyMatrix4(ui),this}rotateX(e){return ui.makeRotationX(e),this.applyMatrix4(ui),this}rotateY(e){return ui.makeRotationY(e),this.applyMatrix4(ui),this}rotateZ(e){return ui.makeRotationZ(e),this.applyMatrix4(ui),this}translate(e,t,n){return ui.makeTranslation(e,t,n),this.applyMatrix4(ui),this}scale(e,t,n){return ui.makeScale(e,t,n),this.applyMatrix4(ui),this}lookAt(e){return Kf.lookAt(e),Kf.updateMatrix(),this.applyMatrix4(Kf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oo).negate(),this.translate(oo.x,oo.y,oo.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new wi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const o=t[n];Jn.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Jn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Jn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Jn.min),this.boundingBox.expandByPoint(Jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(Jn.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){const c=t[o];pa.setFromBufferAttribute(c),this.morphTargetsRelative?(cn.addVectors(Jn.min,pa.min),Jn.expandByPoint(cn),cn.addVectors(Jn.max,pa.max),Jn.expandByPoint(cn)):(Jn.expandByPoint(pa.min),Jn.expandByPoint(pa.max))}Jn.getCenter(n);let r=0;for(let o=0,a=e.count;o<a;o++)cn.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(cn));if(t)for(let o=0,a=t.length;o<a;o++){const c=t[o],u=this.morphTargetsRelative;for(let f=0,d=c.count;f<d;f++)cn.fromBufferAttribute(c,f),u&&(oo.fromBufferAttribute(e,f),cn.add(oo)),r=Math.max(r,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Un(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),c=[],u=[];for(let J=0;J<n.count;J++)c[J]=new X,u[J]=new X;const f=new X,d=new X,p=new X,m=new Pe,_=new Pe,y=new Pe,T=new X,x=new X;function v(J,I,b){f.fromBufferAttribute(n,J),d.fromBufferAttribute(n,I),p.fromBufferAttribute(n,b),m.fromBufferAttribute(o,J),_.fromBufferAttribute(o,I),y.fromBufferAttribute(o,b),d.sub(f),p.sub(f),_.sub(m),y.sub(m);const j=1/(_.x*y.y-y.x*_.y);isFinite(j)&&(T.copy(d).multiplyScalar(y.y).addScaledVector(p,-_.y).multiplyScalar(j),x.copy(p).multiplyScalar(_.x).addScaledVector(d,-y.x).multiplyScalar(j),c[J].add(T),c[I].add(T),c[b].add(T),u[J].add(x),u[I].add(x),u[b].add(x))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let J=0,I=N.length;J<I;++J){const b=N[J],j=b.start,pe=b.count;for(let $=j,le=j+pe;$<le;$+=3)v(e.getX($+0),e.getX($+1),e.getX($+2))}const S=new X,P=new X,q=new X,O=new X;function U(J){q.fromBufferAttribute(r,J),O.copy(q);const I=c[J];S.copy(I),S.sub(q.multiplyScalar(q.dot(I))).normalize(),P.crossVectors(O,I);const j=P.dot(u[J])<0?-1:1;a.setXYZW(J,S.x,S.y,S.z,j)}for(let J=0,I=N.length;J<I;++J){const b=N[J],j=b.start,pe=b.count;for(let $=j,le=j+pe;$<le;$+=3)U(e.getX($+0)),U(e.getX($+1)),U(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Un(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,_=n.count;m<_;m++)n.setXYZ(m,0,0,0);const r=new X,o=new X,a=new X,c=new X,u=new X,f=new X,d=new X,p=new X;if(e)for(let m=0,_=e.count;m<_;m+=3){const y=e.getX(m+0),T=e.getX(m+1),x=e.getX(m+2);r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,T),a.fromBufferAttribute(t,x),d.subVectors(a,o),p.subVectors(r,o),d.cross(p),c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,x),c.add(d),u.add(d),f.add(d),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(T,u.x,u.y,u.z),n.setXYZ(x,f.x,f.y,f.z)}else for(let m=0,_=t.count;m<_;m+=3)r.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),a.fromBufferAttribute(t,m+2),d.subVectors(a,o),p.subVectors(r,o),d.cross(p),n.setXYZ(m+0,d.x,d.y,d.z),n.setXYZ(m+1,d.x,d.y,d.z),n.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(c,u){const f=c.array,d=c.itemSize,p=c.normalized,m=new f.constructor(u.length*d);let _=0,y=0;for(let T=0,x=u.length;T<x;T++){c.isInterleavedBufferAttribute?_=u[T]*c.data.stride+c.offset:_=u[T]*d;for(let v=0;v<d;v++)m[y++]=f[_++]}return new Un(m,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ri,n=this.index.array,r=this.attributes;for(const c in r){const u=r[c],f=e(u,n);t.setAttribute(c,f)}const o=this.morphAttributes;for(const c in o){const u=[],f=o[c];for(let d=0,p=f.length;d<p;d++){const m=f[d],_=e(m,n);u.push(_)}t.morphAttributes[c]=u}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const f in u)u[f]!==void 0&&(e[f]=u[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const u in n){const f=n[u];e.data.attributes[u]=f.toJSON(e.data)}const r={};let o=!1;for(const u in this.morphAttributes){const f=this.morphAttributes[u],d=[];for(let p=0,m=f.length;p<m;p++){const _=f[p];d.push(_.toJSON(e.data))}d.length>0&&(r[u]=d,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const f in r){const d=r[f];this.setAttribute(f,d.clone(t))}const o=e.morphAttributes;for(const f in o){const d=[],p=o[f];for(let m=0,_=p.length;m<_;m++)d.push(p[m].clone(t));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let f=0,d=a.length;f<d;f++){const p=a[f];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const f_=new ct,ds=new eu,ec=new Wi,h_=new X,ao=new X,lo=new X,co=new X,Yf=new X,tc=new X,nc=new Pe,ic=new Pe,rc=new Pe,d_=new X,p_=new X,m_=new X,sc=new X,oc=new X;class En extends Yt{constructor(e=new Ri,t=new Vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){const c=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(o&&c){tc.set(0,0,0);for(let u=0,f=o.length;u<f;u++){const d=c[u],p=o[u];d!==0&&(Yf.fromBufferAttribute(p,e),a?tc.addScaledVector(Yf,d):tc.addScaledVector(Yf.sub(t),d))}t.add(tc)}return t}raycast(e,t){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ec.copy(n.boundingSphere),ec.applyMatrix4(o),ds.copy(e.ray).recast(e.near),!(ec.containsPoint(ds.origin)===!1&&(ds.intersectSphere(ec,h_)===null||ds.origin.distanceToSquared(h_)>(e.far-e.near)**2))&&(f_.copy(o).invert(),ds.copy(e.ray).applyMatrix4(f_),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let r;const o=this.geometry,a=this.material,c=o.index,u=o.attributes.position,f=o.attributes.uv,d=o.attributes.uv1,p=o.attributes.normal,m=o.groups,_=o.drawRange;if(c!==null)if(Array.isArray(a))for(let y=0,T=m.length;y<T;y++){const x=m[y],v=a[x.materialIndex],N=Math.max(x.start,_.start),S=Math.min(c.count,Math.min(x.start+x.count,_.start+_.count));for(let P=N,q=S;P<q;P+=3){const O=c.getX(P),U=c.getX(P+1),J=c.getX(P+2);r=ac(this,v,e,n,f,d,p,O,U,J),r&&(r.faceIndex=Math.floor(P/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const y=Math.max(0,_.start),T=Math.min(c.count,_.start+_.count);for(let x=y,v=T;x<v;x+=3){const N=c.getX(x),S=c.getX(x+1),P=c.getX(x+2);r=ac(this,a,e,n,f,d,p,N,S,P),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(a))for(let y=0,T=m.length;y<T;y++){const x=m[y],v=a[x.materialIndex],N=Math.max(x.start,_.start),S=Math.min(u.count,Math.min(x.start+x.count,_.start+_.count));for(let P=N,q=S;P<q;P+=3){const O=P,U=P+1,J=P+2;r=ac(this,v,e,n,f,d,p,O,U,J),r&&(r.faceIndex=Math.floor(P/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const y=Math.max(0,_.start),T=Math.min(u.count,_.start+_.count);for(let x=y,v=T;x<v;x+=3){const N=x,S=x+1,P=x+2;r=ac(this,a,e,n,f,d,p,N,S,P),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function hC(i,e,t,n,r,o,a,c){let u;if(e.side===Vn?u=n.intersectTriangle(a,o,r,!0,c):u=n.intersectTriangle(r,o,a,e.side===pr,c),u===null)return null;oc.copy(c),oc.applyMatrix4(i.matrixWorld);const f=t.ray.origin.distanceTo(oc);return f<t.near||f>t.far?null:{distance:f,point:oc.clone(),object:i}}function ac(i,e,t,n,r,o,a,c,u,f){i.getVertexPosition(c,ao),i.getVertexPosition(u,lo),i.getVertexPosition(f,co);const d=hC(i,e,t,n,ao,lo,co,sc);if(d){r&&(nc.fromBufferAttribute(r,c),ic.fromBufferAttribute(r,u),rc.fromBufferAttribute(r,f),d.uv=Bi.getInterpolation(sc,ao,lo,co,nc,ic,rc,new Pe)),o&&(nc.fromBufferAttribute(o,c),ic.fromBufferAttribute(o,u),rc.fromBufferAttribute(o,f),d.uv1=Bi.getInterpolation(sc,ao,lo,co,nc,ic,rc,new Pe)),a&&(d_.fromBufferAttribute(a,c),p_.fromBufferAttribute(a,u),m_.fromBufferAttribute(a,f),d.normal=Bi.getInterpolation(sc,ao,lo,co,d_,p_,m_,new X),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:c,b:u,c:f,normal:new X,materialIndex:0};Bi.getNormal(ao,lo,co,p.normal),d.face=p}return d}class Ho extends Ri{constructor(e=1,t=1,n=1,r=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:a};const c=this;r=Math.floor(r),o=Math.floor(o),a=Math.floor(a);const u=[],f=[],d=[],p=[];let m=0,_=0;y("z","y","x",-1,-1,n,t,e,a,o,0),y("z","y","x",1,-1,n,t,-e,a,o,1),y("x","z","y",1,1,e,n,t,r,a,2),y("x","z","y",1,-1,e,n,-t,r,a,3),y("x","y","z",1,-1,e,t,n,r,o,4),y("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(u),this.setAttribute("position",new wi(f,3)),this.setAttribute("normal",new wi(d,3)),this.setAttribute("uv",new wi(p,2));function y(T,x,v,N,S,P,q,O,U,J,I){const b=P/U,j=q/J,pe=P/2,$=q/2,le=O/2,de=U+1,xe=J+1;let fe=0,te=0;const Ee=new X;for(let Se=0;Se<xe;Se++){const Re=Se*j-$;for(let We=0;We<de;We++){const Et=We*b-pe;Ee[T]=Et*N,Ee[x]=Re*S,Ee[v]=le,f.push(Ee.x,Ee.y,Ee.z),Ee[T]=0,Ee[x]=0,Ee[v]=O>0?1:-1,d.push(Ee.x,Ee.y,Ee.z),p.push(We/U),p.push(1-Se/J),fe+=1}}for(let Se=0;Se<J;Se++)for(let Re=0;Re<U;Re++){const We=m+Re+de*Se,Et=m+Re+de*(Se+1),ce=m+(Re+1)+de*(Se+1),Ae=m+(Re+1)+de*Se;u.push(We,Et,Ae),u.push(Et,ce,Ae),te+=6}c.addGroup(_,te,I),_+=te,m+=fe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Uo(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pn(i){const e={};for(let t=0;t<i.length;t++){const n=Uo(i[t]);for(const r in n)e[r]=n[r]}return e}function dC(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function C0(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const pC={clone:Uo,merge:Pn};var mC=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gC=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jr extends Gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mC,this.fragmentShader=gC,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Uo(e.uniforms),this.uniformsGroups=dC(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class P0 extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=hr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Or=new X,g_=new Pe,__=new Pe;class In extends P0{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(Ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,t){return this.getViewBounds(e,g_,__),t.subVectors(__,g_)}setViewOffset(e,t,n,r,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ca*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const u=a.fullWidth,f=a.fullHeight;o+=a.offsetX*r/u,t-=a.offsetY*n/f,r*=a.width/u,n*=a.height/f}const c=this.filmOffset;c!==0&&(o+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const uo=-90,fo=1;class _C extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(uo,fo,e,t);r.layers=this.layers,this.add(r);const o=new In(uo,fo,e,t);o.layers=this.layers,this.add(o);const a=new In(uo,fo,e,t);a.layers=this.layers,this.add(a);const c=new In(uo,fo,e,t);c.layers=this.layers,this.add(c);const u=new In(uo,fo,e,t);u.layers=this.layers,this.add(u);const f=new In(uo,fo,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,o,a,c,u]=t;for(const f of t)this.remove(f);if(e===hr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===zc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,a,c,u,f,d]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const T=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,c),e.setRenderTarget(n,3,r),e.render(t,u),e.setRenderTarget(n,4,r),e.render(t,f),n.texture.generateMipmaps=T,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(p,m,_),e.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class L0 extends fn{constructor(e,t,n,r,o,a,c,u,f,d){e=e!==void 0?e:[],t=t!==void 0?t:Co,super(e,t,n,r,o,a,c,u,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vC extends ws{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new L0(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ho(5,5,5),o=new Jr({name:"CubemapFromEquirect",uniforms:Uo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Kr});o.uniforms.tEquirect.value=t;const a=new En(r,o),c=t.minFilter;return t.minFilter===fr&&(t.minFilter=jn),new _C(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(o)}}const $f=new X,xC=new X,yC=new dt;class vs{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=$f.subVectors(n,t).cross(xC.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($f),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||yC.getNormalMatrix(e),r=this.coplanarPoint($f).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new Wi,lc=new X;class ud{constructor(e=new vs,t=new vs,n=new vs,r=new vs,o=new vs,a=new vs){this.planes=[e,t,n,r,o,a]}set(e,t,n,r,o,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(r),c[4].copy(o),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hr){const n=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],u=r[3],f=r[4],d=r[5],p=r[6],m=r[7],_=r[8],y=r[9],T=r[10],x=r[11],v=r[12],N=r[13],S=r[14],P=r[15];if(n[0].setComponents(u-o,m-f,x-_,P-v).normalize(),n[1].setComponents(u+o,m+f,x+_,P+v).normalize(),n[2].setComponents(u+a,m+d,x+y,P+N).normalize(),n[3].setComponents(u-a,m-d,x-y,P-N).normalize(),n[4].setComponents(u-c,m-p,x-T,P-S).normalize(),t===hr)n[5].setComponents(u+c,m+p,x+T,P+S).normalize();else if(t===zc)n[5].setComponents(c,p,T,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(e){return ps.center.set(0,0,0),ps.radius=.7071067811865476,ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(lc.x=r.normal.x>0?e.max.x:e.min.x,lc.y=r.normal.y>0?e.max.y:e.min.y,lc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(lc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function I0(){let i=null,e=!1,t=null,n=null;function r(o,a){t(o,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function MC(i){const e=new WeakMap;function t(c,u){const f=c.array,d=c.usage,p=f.byteLength,m=i.createBuffer();i.bindBuffer(u,m),i.bufferData(u,f,d),c.onUploadCallback();let _;if(f instanceof Float32Array)_=i.FLOAT;else if(f instanceof Uint16Array)c.isFloat16BufferAttribute?_=i.HALF_FLOAT:_=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=i.SHORT;else if(f instanceof Uint32Array)_=i.UNSIGNED_INT;else if(f instanceof Int32Array)_=i.INT;else if(f instanceof Int8Array)_=i.BYTE;else if(f instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,f){const d=u.array,p=u._updateRange,m=u.updateRanges;if(i.bindBuffer(f,c),p.count===-1&&m.length===0&&i.bufferSubData(f,0,d),m.length!==0){for(let _=0,y=m.length;_<y;_++){const T=m[_];i.bufferSubData(f,T.start*d.BYTES_PER_ELEMENT,d,T.start,T.count)}u.clearUpdateRanges()}p.count!==-1&&(i.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count),p.count=-1),u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=e.get(c);u&&(i.deleteBuffer(u.buffer),e.delete(c))}function a(c,u){if(c.isGLBufferAttribute){const d=e.get(c);(!d||d.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=e.get(c);if(f===void 0)e.set(c,t(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,c,u),f.version=c.version}}return{get:r,remove:o,update:a}}class tu extends Ri{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const o=e/2,a=t/2,c=Math.floor(n),u=Math.floor(r),f=c+1,d=u+1,p=e/c,m=t/u,_=[],y=[],T=[],x=[];for(let v=0;v<d;v++){const N=v*m-a;for(let S=0;S<f;S++){const P=S*p-o;y.push(P,-N,0),T.push(0,0,1),x.push(S/c),x.push(1-v/u)}}for(let v=0;v<u;v++)for(let N=0;N<c;N++){const S=N+f*v,P=N+f*(v+1),q=N+1+f*(v+1),O=N+1+f*v;_.push(S,P,O),_.push(P,q,O)}this.setIndex(_),this.setAttribute("position",new wi(y,3)),this.setAttribute("normal",new wi(T,3)),this.setAttribute("uv",new wi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tu(e.width,e.height,e.widthSegments,e.heightSegments)}}var SC=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,EC=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TC=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bC=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RC=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,CC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PC=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,LC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,IC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,NC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,DC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,UC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,OC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,FC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,BC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,HC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,GC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,WC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,XC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,KC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,YC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$C=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ZC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jC="gl_FragColor = linearToOutputTexel( gl_FragColor );",QC=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,eP=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tP=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nP=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,iP=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rP=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sP=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oP=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,aP=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lP=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cP=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uP=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,fP=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hP=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dP=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pP=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mP=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gP=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_P=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vP=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xP=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yP=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,MP=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,SP=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EP=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,TP=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,AP=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bP=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wP=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RP=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,CP=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,PP=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LP=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,IP=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NP=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,DP=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,UP=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,OP=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,FP=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,BP=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,zP=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,HP=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,VP=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,GP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kP=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WP=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,XP=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qP=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,KP=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,YP=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$P=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ZP=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,JP=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jP=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,QP=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eL=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tL=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nL=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iL=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rL=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,sL=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,oL=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,aL=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lL=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cL=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uL=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fL=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hL=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dL=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pL=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mL=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gL=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_L=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yL=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ML=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const SL=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,EL=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AL=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wL=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,CL=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,PL=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,LL=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,IL=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,NL=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DL=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,UL=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OL=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,FL=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BL=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zL=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HL=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,VL=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GL=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kL=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,WL=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XL=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qL=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,KL=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YL=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$L=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,JL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,eI=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:SC,alphahash_pars_fragment:EC,alphamap_fragment:TC,alphamap_pars_fragment:AC,alphatest_fragment:bC,alphatest_pars_fragment:wC,aomap_fragment:RC,aomap_pars_fragment:CC,batching_pars_vertex:PC,batching_vertex:LC,begin_vertex:IC,beginnormal_vertex:NC,bsdfs:DC,iridescence_fragment:UC,bumpmap_pars_fragment:OC,clipping_planes_fragment:FC,clipping_planes_pars_fragment:BC,clipping_planes_pars_vertex:zC,clipping_planes_vertex:HC,color_fragment:VC,color_pars_fragment:GC,color_pars_vertex:kC,color_vertex:WC,common:XC,cube_uv_reflection_fragment:qC,defaultnormal_vertex:KC,displacementmap_pars_vertex:YC,displacementmap_vertex:$C,emissivemap_fragment:ZC,emissivemap_pars_fragment:JC,colorspace_fragment:jC,colorspace_pars_fragment:QC,envmap_fragment:eP,envmap_common_pars_fragment:tP,envmap_pars_fragment:nP,envmap_pars_vertex:iP,envmap_physical_pars_fragment:mP,envmap_vertex:rP,fog_vertex:sP,fog_pars_vertex:oP,fog_fragment:aP,fog_pars_fragment:lP,gradientmap_pars_fragment:cP,lightmap_fragment:uP,lightmap_pars_fragment:fP,lights_lambert_fragment:hP,lights_lambert_pars_fragment:dP,lights_pars_begin:pP,lights_toon_fragment:gP,lights_toon_pars_fragment:_P,lights_phong_fragment:vP,lights_phong_pars_fragment:xP,lights_physical_fragment:yP,lights_physical_pars_fragment:MP,lights_fragment_begin:SP,lights_fragment_maps:EP,lights_fragment_end:TP,logdepthbuf_fragment:AP,logdepthbuf_pars_fragment:bP,logdepthbuf_pars_vertex:wP,logdepthbuf_vertex:RP,map_fragment:CP,map_pars_fragment:PP,map_particle_fragment:LP,map_particle_pars_fragment:IP,metalnessmap_fragment:NP,metalnessmap_pars_fragment:DP,morphinstance_vertex:UP,morphcolor_vertex:OP,morphnormal_vertex:FP,morphtarget_pars_vertex:BP,morphtarget_vertex:zP,normal_fragment_begin:HP,normal_fragment_maps:VP,normal_pars_fragment:GP,normal_pars_vertex:kP,normal_vertex:WP,normalmap_pars_fragment:XP,clearcoat_normal_fragment_begin:qP,clearcoat_normal_fragment_maps:KP,clearcoat_pars_fragment:YP,iridescence_pars_fragment:$P,opaque_fragment:ZP,packing:JP,premultiplied_alpha_fragment:jP,project_vertex:QP,dithering_fragment:eL,dithering_pars_fragment:tL,roughnessmap_fragment:nL,roughnessmap_pars_fragment:iL,shadowmap_pars_fragment:rL,shadowmap_pars_vertex:sL,shadowmap_vertex:oL,shadowmask_pars_fragment:aL,skinbase_vertex:lL,skinning_pars_vertex:cL,skinning_vertex:uL,skinnormal_vertex:fL,specularmap_fragment:hL,specularmap_pars_fragment:dL,tonemapping_fragment:pL,tonemapping_pars_fragment:mL,transmission_fragment:gL,transmission_pars_fragment:_L,uv_pars_fragment:vL,uv_pars_vertex:xL,uv_vertex:yL,worldpos_vertex:ML,background_vert:SL,background_frag:EL,backgroundCube_vert:TL,backgroundCube_frag:AL,cube_vert:bL,cube_frag:wL,depth_vert:RL,depth_frag:CL,distanceRGBA_vert:PL,distanceRGBA_frag:LL,equirect_vert:IL,equirect_frag:NL,linedashed_vert:DL,linedashed_frag:UL,meshbasic_vert:OL,meshbasic_frag:FL,meshlambert_vert:BL,meshlambert_frag:zL,meshmatcap_vert:HL,meshmatcap_frag:VL,meshnormal_vert:GL,meshnormal_frag:kL,meshphong_vert:WL,meshphong_frag:XL,meshphysical_vert:qL,meshphysical_frag:KL,meshtoon_vert:YL,meshtoon_frag:$L,points_vert:ZL,points_frag:JL,shadow_vert:jL,shadow_frag:QL,sprite_vert:eI,sprite_frag:tI},Ue={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Ui={basic:{uniforms:Pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new it(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Pn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Pn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Pn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new it(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Pn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Pn([Ue.points,Ue.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Pn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Pn([Ue.common,Ue.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Pn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Pn([Ue.sprite,Ue.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Pn([Ue.common,Ue.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Pn([Ue.lights,Ue.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Ui.physical={uniforms:Pn([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const cc={r:0,b:0,g:0},ms=new ki,nI=new ct;function iI(i,e,t,n,r,o,a){const c=new it(0);let u=o===!0?0:1,f,d,p=null,m=0,_=null;function y(x,v){let N=!1,S=v.isScene===!0?v.background:null;S&&S.isTexture&&(S=(v.backgroundBlurriness>0?t:e).get(S)),S===null?T(c,u):S&&S.isColor&&(T(S,1),N=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||N)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),S&&(S.isCubeTexture||S.mapping===jc)?(d===void 0&&(d=new En(new Ho(1,1,1),new Jr({name:"BackgroundCubeMaterial",uniforms:Uo(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(q,O,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),ms.copy(v.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),d.material.uniforms.envMap.value=S,d.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(nI.makeRotationFromEuler(ms)),d.material.toneMapped=Rt.getTransfer(S.colorSpace)!==Gt,(p!==S||m!==S.version||_!==i.toneMapping)&&(d.material.needsUpdate=!0,p=S,m=S.version,_=i.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(f===void 0&&(f=new En(new tu(2,2),new Jr({name:"BackgroundMaterial",uniforms:Uo(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=S,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.toneMapped=Rt.getTransfer(S.colorSpace)!==Gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),f.material.uniforms.uvTransform.value.copy(S.matrix),(p!==S||m!==S.version||_!==i.toneMapping)&&(f.material.needsUpdate=!0,p=S,m=S.version,_=i.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null))}function T(x,v){x.getRGB(cc,C0(i)),n.buffers.color.setClear(cc.r,cc.g,cc.b,v,a)}return{getClearColor:function(){return c},setClearColor:function(x,v=1){c.set(x),u=v,T(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(x){u=x,T(c,u)},render:y}}function rI(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=m(null);let o=r,a=!1;function c(b,j,pe,$,le){let de=!1;const xe=p($,pe,j);o!==xe&&(o=xe,f(o.object)),de=_(b,$,pe,le),de&&y(b,$,pe,le),le!==null&&e.update(le,i.ELEMENT_ARRAY_BUFFER),(de||a)&&(a=!1,P(b,j,pe,$),le!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(le).buffer))}function u(){return i.createVertexArray()}function f(b){return i.bindVertexArray(b)}function d(b){return i.deleteVertexArray(b)}function p(b,j,pe){const $=pe.wireframe===!0;let le=n[b.id];le===void 0&&(le={},n[b.id]=le);let de=le[j.id];de===void 0&&(de={},le[j.id]=de);let xe=de[$];return xe===void 0&&(xe=m(u()),de[$]=xe),xe}function m(b){const j=[],pe=[],$=[];for(let le=0;le<t;le++)j[le]=0,pe[le]=0,$[le]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:pe,attributeDivisors:$,object:b,attributes:{},index:null}}function _(b,j,pe,$){const le=o.attributes,de=j.attributes;let xe=0;const fe=pe.getAttributes();for(const te in fe)if(fe[te].location>=0){const Se=le[te];let Re=de[te];if(Re===void 0&&(te==="instanceMatrix"&&b.instanceMatrix&&(Re=b.instanceMatrix),te==="instanceColor"&&b.instanceColor&&(Re=b.instanceColor)),Se===void 0||Se.attribute!==Re||Re&&Se.data!==Re.data)return!0;xe++}return o.attributesNum!==xe||o.index!==$}function y(b,j,pe,$){const le={},de=j.attributes;let xe=0;const fe=pe.getAttributes();for(const te in fe)if(fe[te].location>=0){let Se=de[te];Se===void 0&&(te==="instanceMatrix"&&b.instanceMatrix&&(Se=b.instanceMatrix),te==="instanceColor"&&b.instanceColor&&(Se=b.instanceColor));const Re={};Re.attribute=Se,Se&&Se.data&&(Re.data=Se.data),le[te]=Re,xe++}o.attributes=le,o.attributesNum=xe,o.index=$}function T(){const b=o.newAttributes;for(let j=0,pe=b.length;j<pe;j++)b[j]=0}function x(b){v(b,0)}function v(b,j){const pe=o.newAttributes,$=o.enabledAttributes,le=o.attributeDivisors;pe[b]=1,$[b]===0&&(i.enableVertexAttribArray(b),$[b]=1),le[b]!==j&&(i.vertexAttribDivisor(b,j),le[b]=j)}function N(){const b=o.newAttributes,j=o.enabledAttributes;for(let pe=0,$=j.length;pe<$;pe++)j[pe]!==b[pe]&&(i.disableVertexAttribArray(pe),j[pe]=0)}function S(b,j,pe,$,le,de,xe){xe===!0?i.vertexAttribIPointer(b,j,pe,le,de):i.vertexAttribPointer(b,j,pe,$,le,de)}function P(b,j,pe,$){T();const le=$.attributes,de=pe.getAttributes(),xe=j.defaultAttributeValues;for(const fe in de){const te=de[fe];if(te.location>=0){let Ee=le[fe];if(Ee===void 0&&(fe==="instanceMatrix"&&b.instanceMatrix&&(Ee=b.instanceMatrix),fe==="instanceColor"&&b.instanceColor&&(Ee=b.instanceColor)),Ee!==void 0){const Se=Ee.normalized,Re=Ee.itemSize,We=e.get(Ee);if(We===void 0)continue;const Et=We.buffer,ce=We.type,Ae=We.bytesPerElement,Ie=ce===i.INT||ce===i.UNSIGNED_INT||Ee.gpuType===u0;if(Ee.isInterleavedBufferAttribute){const be=Ee.data,ke=be.stride,Je=Ee.offset;if(be.isInstancedInterleavedBuffer){for(let Ke=0;Ke<te.locationSize;Ke++)v(te.location+Ke,be.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let Ke=0;Ke<te.locationSize;Ke++)x(te.location+Ke);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Ke=0;Ke<te.locationSize;Ke++)S(te.location+Ke,Re/te.locationSize,ce,Se,ke*Ae,(Je+Re/te.locationSize*Ke)*Ae,Ie)}else{if(Ee.isInstancedBufferAttribute){for(let be=0;be<te.locationSize;be++)v(te.location+be,Ee.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let be=0;be<te.locationSize;be++)x(te.location+be);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let be=0;be<te.locationSize;be++)S(te.location+be,Re/te.locationSize,ce,Se,Re*Ae,Re/te.locationSize*be*Ae,Ie)}}else if(xe!==void 0){const Se=xe[fe];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(te.location,Se);break;case 3:i.vertexAttrib3fv(te.location,Se);break;case 4:i.vertexAttrib4fv(te.location,Se);break;default:i.vertexAttrib1fv(te.location,Se)}}}}N()}function q(){J();for(const b in n){const j=n[b];for(const pe in j){const $=j[pe];for(const le in $)d($[le].object),delete $[le];delete j[pe]}delete n[b]}}function O(b){if(n[b.id]===void 0)return;const j=n[b.id];for(const pe in j){const $=j[pe];for(const le in $)d($[le].object),delete $[le];delete j[pe]}delete n[b.id]}function U(b){for(const j in n){const pe=n[j];if(pe[b.id]===void 0)continue;const $=pe[b.id];for(const le in $)d($[le].object),delete $[le];delete pe[b.id]}}function J(){I(),a=!0,o!==r&&(o=r,f(o.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:J,resetDefaultState:I,dispose:q,releaseStatesOfGeometry:O,releaseStatesOfProgram:U,initAttributes:T,enableAttribute:x,disableUnusedAttributes:N}}function sI(i,e,t){let n;function r(u){n=u}function o(u,f){i.drawArrays(n,u,f),t.update(f,n,1)}function a(u,f,d){d!==0&&(i.drawArraysInstanced(n,u,f,d),t.update(f,n,d))}function c(u,f,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d;m++)this.render(u[m],f[m]);else{p.multiDrawArraysWEBGL(n,u,0,f,0,d);let m=0;for(let _=0;_<d;_++)m+=f[_];t.update(m,n,1)}}this.setMode=r,this.render=o,this.renderInstances=a,this.renderMultiDraw=c}function oI(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp";const c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const u=t.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,N=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:m,maxAttributes:_,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:v,maxSamples:N}}function aI(i){const e=this;let t=null,n=0,r=!1,o=!1;const a=new vs,c=new dt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const _=p.length!==0||m||n!==0||r;return r=m,n=p.length,_},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=d(p,m,0)},this.setState=function(p,m,_){const y=p.clippingPlanes,T=p.clipIntersection,x=p.clipShadows,v=i.get(p);if(!r||y===null||y.length===0||o&&!x)o?d(null):f();else{const N=o?0:n,S=N*4;let P=v.clippingState||null;u.value=P,P=d(y,m,S,_);for(let q=0;q!==S;++q)P[q]=t[q];v.clippingState=P,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=N}};function f(){u.value!==t&&(u.value=t,u.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(p,m,_,y){const T=p!==null?p.length:0;let x=null;if(T!==0){if(x=u.value,y!==!0||x===null){const v=_+T*4,N=m.matrixWorldInverse;c.getNormalMatrix(N),(x===null||x.length<v)&&(x=new Float32Array(v));for(let S=0,P=_;S!==T;++S,P+=4)a.copy(p[S]).applyMatrix4(N,c),a.normal.toArray(x,P),x[P+3]=a.constant}u.value=x,u.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,x}}function lI(i){let e=new WeakMap;function t(a,c){return c===wh?a.mapping=Co:c===Rh&&(a.mapping=Po),a}function n(a){if(a&&a.isTexture){const c=a.mapping;if(c===wh||c===Rh)if(e.has(a)){const u=e.get(a).texture;return t(u,a.mapping)}else{const u=a.image;if(u&&u.height>0){const f=new vC(u.height);return f.fromEquirectangularTexture(i,a),e.set(a,f),a.addEventListener("dispose",r),t(f.texture,a.mapping)}else return null}}return a}function r(a){const c=a.target;c.removeEventListener("dispose",r);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class fd extends P0{constructor(e=-1,t=1,n=1,r=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-e,a=n+e,c=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,a=o+f*this.view.width,c-=d*this.view.offsetY,u=c-d*this.view.height}this.projectionMatrix.makeOrthographic(o,a,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const go=4,v_=[.125,.215,.35,.446,.526,.582],Ss=20,Zf=new fd,x_=new it;let Jf=null,jf=0,Qf=0,eh=!1;const xs=(1+Math.sqrt(5))/2,ho=1/xs,y_=[new X(1,1,1),new X(-1,1,1),new X(1,1,-1),new X(-1,1,-1),new X(0,xs,ho),new X(0,xs,-ho),new X(ho,0,xs),new X(-ho,0,xs),new X(xs,ho,0),new X(-xs,ho,0)];class M_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Jf=this._renderer.getRenderTarget(),jf=this._renderer.getActiveCubeFace(),Qf=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=T_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=E_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jf,jf,Qf),this._renderer.xr.enabled=eh,e.scissorTest=!1,uc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Co||e.mapping===Po?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jf=this._renderer.getRenderTarget(),jf=this._renderer.getActiveCubeFace(),Qf=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:Uc,format:Ai,colorSpace:gn,depthBuffer:!1},r=S_(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=S_(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cI(o)),this._blurMaterial=uI(o,e,t)}return r}_compileMaterial(e){const t=new En(this._lodPlanes[0],e);this._renderer.compile(t,Zf)}_sceneToCubeUV(e,t,n,r){const c=new In(90,1,t,n),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,m=d.toneMapping;d.getClearColor(x_),d.toneMapping=Yr,d.autoClear=!1;const _=new Vi({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),y=new En(new Ho,_);let T=!1;const x=e.background;x?x.isColor&&(_.color.copy(x),e.background=null,T=!0):(_.color.copy(x_),T=!0);for(let v=0;v<6;v++){const N=v%3;N===0?(c.up.set(0,u[v],0),c.lookAt(f[v],0,0)):N===1?(c.up.set(0,0,u[v]),c.lookAt(0,f[v],0)):(c.up.set(0,u[v],0),c.lookAt(0,0,f[v]));const S=this._cubeSize;uc(r,N*S,v>2?S:0,S,S),d.setRenderTarget(r),T&&d.render(y,c),d.render(e,c)}y.geometry.dispose(),y.material.dispose(),d.toneMapping=m,d.autoClear=p,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Co||e.mapping===Po;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=T_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=E_());const o=r?this._cubemapMaterial:this._equirectMaterial,a=new En(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=e;const u=this._cubeSize;uc(t,0,0,3*u,2*u),n.setRenderTarget(t),n.render(a,Zf)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=y_[(r-1)%y_.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,r,o){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",o),this._halfBlur(a,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,a,c){const u=this._renderer,f=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new En(this._lodPlanes[r],f),m=f.uniforms,_=this._sizeLods[n]-1,y=isFinite(o)?Math.PI/(2*_):2*Math.PI/(2*Ss-1),T=o/y,x=isFinite(o)?1+Math.floor(d*T):Ss;x>Ss&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ss}`);const v=[];let N=0;for(let U=0;U<Ss;++U){const J=U/T,I=Math.exp(-J*J/2);v.push(I),U===0?N+=I:U<x&&(N+=2*I)}for(let U=0;U<v.length;U++)v[U]=v[U]/N;m.envMap.value=e.texture,m.samples.value=x,m.weights.value=v,m.latitudinal.value=a==="latitudinal",c&&(m.poleAxis.value=c);const{_lodMax:S}=this;m.dTheta.value=y,m.mipInt.value=S-n;const P=this._sizeLods[r],q=3*P*(r>S-go?r-S+go:0),O=4*(this._cubeSize-P);uc(t,q,O,3*P,2*P),u.setRenderTarget(t),u.render(p,Zf)}}function cI(i){const e=[],t=[],n=[];let r=i;const o=i-go+1+v_.length;for(let a=0;a<o;a++){const c=Math.pow(2,r);t.push(c);let u=1/c;a>i-go?u=v_[a-i+go-1]:a===0&&(u=0),n.push(u);const f=1/(c-2),d=-f,p=1+f,m=[d,d,p,d,p,p,d,d,p,p,d,p],_=6,y=6,T=3,x=2,v=1,N=new Float32Array(T*y*_),S=new Float32Array(x*y*_),P=new Float32Array(v*y*_);for(let O=0;O<_;O++){const U=O%3*2/3-1,J=O>2?0:-1,I=[U,J,0,U+2/3,J,0,U+2/3,J+1,0,U,J,0,U+2/3,J+1,0,U,J+1,0];N.set(I,T*y*O),S.set(m,x*y*O);const b=[O,O,O,O,O,O];P.set(b,v*y*O)}const q=new Ri;q.setAttribute("position",new Un(N,T)),q.setAttribute("uv",new Un(S,x)),q.setAttribute("faceIndex",new Un(P,v)),e.push(q),r>go&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function S_(i,e,t){const n=new ws(i,e,t);return n.texture.mapping=jc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function uc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function uI(i,e,t){const n=new Float32Array(Ss),r=new X(0,1,0);return new Jr({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function E_(){return new Jr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function T_(){return new Jr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function hd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fI(i){let e=new WeakMap,t=null;function n(c){if(c&&c.isTexture){const u=c.mapping,f=u===wh||u===Rh,d=u===Co||u===Po;if(f||d){let p=e.get(c);const m=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return t===null&&(t=new M_(i)),p=f?t.fromEquirectangular(c,p):t.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,e.set(c,p),p.texture;if(p!==void 0)return p.texture;{const _=c.image;return f&&_&&_.height>0||d&&_&&r(_)?(t===null&&(t=new M_(i)),p=f?t.fromEquirectangular(c):t.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,e.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function r(c){let u=0;const f=6;for(let d=0;d<f;d++)c[d]!==void 0&&u++;return u===f}function o(c){const u=c.target;u.removeEventListener("dispose",o);const f=e.get(u);f!==void 0&&(e.delete(u),f.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function hI(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function dI(i,e,t,n){const r={},o=new WeakMap;function a(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const y in m.attributes)e.remove(m.attributes[y]);for(const y in m.morphAttributes){const T=m.morphAttributes[y];for(let x=0,v=T.length;x<v;x++)e.remove(T[x])}m.removeEventListener("dispose",a),delete r[m.id];const _=o.get(m);_&&(e.remove(_),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function c(p,m){return r[m.id]===!0||(m.addEventListener("dispose",a),r[m.id]=!0,t.memory.geometries++),m}function u(p){const m=p.attributes;for(const y in m)e.update(m[y],i.ARRAY_BUFFER);const _=p.morphAttributes;for(const y in _){const T=_[y];for(let x=0,v=T.length;x<v;x++)e.update(T[x],i.ARRAY_BUFFER)}}function f(p){const m=[],_=p.index,y=p.attributes.position;let T=0;if(_!==null){const N=_.array;T=_.version;for(let S=0,P=N.length;S<P;S+=3){const q=N[S+0],O=N[S+1],U=N[S+2];m.push(q,O,O,U,U,q)}}else if(y!==void 0){const N=y.array;T=y.version;for(let S=0,P=N.length/3-1;S<P;S+=3){const q=S+0,O=S+1,U=S+2;m.push(q,O,O,U,U,q)}}else return;const x=new(M0(m)?R0:w0)(m,1);x.version=T;const v=o.get(p);v&&e.remove(v),o.set(p,x)}function d(p){const m=o.get(p);if(m){const _=p.index;_!==null&&m.version<_.version&&f(p)}else f(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:d}}function pI(i,e,t){let n;function r(p){n=p}let o,a;function c(p){o=p.type,a=p.bytesPerElement}function u(p,m){i.drawElements(n,m,o,p*a),t.update(m,n,1)}function f(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,o,p*a,_),t.update(m,n,_))}function d(p,m,_){if(_===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let T=0;T<_;T++)this.render(p[T]/a,m[T]);else{y.multiDrawElementsWEBGL(n,m,0,o,p,0,_);let T=0;for(let x=0;x<_;x++)T+=m[x];t.update(T,n,1)}}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=d}function mI(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(o/3);break;case i.LINES:t.lines+=c*(o/2);break;case i.LINE_STRIP:t.lines+=c*(o-1);break;case i.LINE_LOOP:t.lines+=c*o;break;case i.POINTS:t.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function gI(i,e,t){const n=new WeakMap,r=new Ut;function o(a,c,u){const f=a.morphTargetInfluences,d=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=d!==void 0?d.length:0;let m=n.get(c);if(m===void 0||m.count!==p){let b=function(){J.dispose(),n.delete(c),c.removeEventListener("dispose",b)};var _=b;m!==void 0&&m.texture.dispose();const y=c.morphAttributes.position!==void 0,T=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,v=c.morphAttributes.position||[],N=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let P=0;y===!0&&(P=1),T===!0&&(P=2),x===!0&&(P=3);let q=c.attributes.position.count*P,O=1;q>e.maxTextureSize&&(O=Math.ceil(q/e.maxTextureSize),q=e.maxTextureSize);const U=new Float32Array(q*O*4*p),J=new T0(U,q,O,p);J.type=Hi,J.needsUpdate=!0;const I=P*4;for(let j=0;j<p;j++){const pe=v[j],$=N[j],le=S[j],de=q*O*4*j;for(let xe=0;xe<pe.count;xe++){const fe=xe*I;y===!0&&(r.fromBufferAttribute(pe,xe),U[de+fe+0]=r.x,U[de+fe+1]=r.y,U[de+fe+2]=r.z,U[de+fe+3]=0),T===!0&&(r.fromBufferAttribute($,xe),U[de+fe+4]=r.x,U[de+fe+5]=r.y,U[de+fe+6]=r.z,U[de+fe+7]=0),x===!0&&(r.fromBufferAttribute(le,xe),U[de+fe+8]=r.x,U[de+fe+9]=r.y,U[de+fe+10]=r.z,U[de+fe+11]=le.itemSize===4?r.w:1)}}m={count:p,texture:J,size:new Pe(q,O)},n.set(c,m),c.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let y=0;for(let x=0;x<f.length;x++)y+=f[x];const T=c.morphTargetsRelative?1:1-y;u.getUniforms().setValue(i,"morphTargetBaseInfluence",T),u.getUniforms().setValue(i,"morphTargetInfluences",f)}u.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:o}}function _I(i,e,t,n){let r=new WeakMap;function o(u){const f=n.render.frame,d=u.geometry,p=e.get(u,d);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),r.get(u)!==f&&(t.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,i.ARRAY_BUFFER),r.set(u,f))),u.isSkinnedMesh){const m=u.skeleton;r.get(m)!==f&&(m.update(),r.set(m,f))}return p}function a(){r=new WeakMap}function c(u){const f=u.target;f.removeEventListener("dispose",c),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:a}}class N0 extends fn{constructor(e,t,n,r,o,a,c,u,f,d){if(d=d!==void 0?d:So,d!==So&&d!==za)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===So&&(n=Io),n===void 0&&d===za&&(n=qa),super(null,r,o,a,c,u,d,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:Dn,this.minFilter=u!==void 0?u:Dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const D0=new fn,U0=new N0(1,1);U0.compareFunction=y0;const O0=new T0,F0=new nC,B0=new L0,A_=[],b_=[],w_=new Float32Array(16),R_=new Float32Array(9),C_=new Float32Array(4);function Vo(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let o=A_[r];if(o===void 0&&(o=new Float32Array(r),A_[r]=o),e!==0){n.toArray(o,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(o,c)}return o}function rn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function sn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function nu(i,e){let t=b_[e];t===void 0&&(t=new Int32Array(e),b_[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function xI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2fv(this.addr,e),sn(t,e)}}function yI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;i.uniform3fv(this.addr,e),sn(t,e)}}function MI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4fv(this.addr,e),sn(t,e)}}function SI(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;C_.set(n),i.uniformMatrix2fv(this.addr,!1,C_),sn(t,n)}}function EI(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;R_.set(n),i.uniformMatrix3fv(this.addr,!1,R_),sn(t,n)}}function TI(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;w_.set(n),i.uniformMatrix4fv(this.addr,!1,w_),sn(t,n)}}function AI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2iv(this.addr,e),sn(t,e)}}function wI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3iv(this.addr,e),sn(t,e)}}function RI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4iv(this.addr,e),sn(t,e)}}function CI(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function PI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2uiv(this.addr,e),sn(t,e)}}function LI(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3uiv(this.addr,e),sn(t,e)}}function II(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4uiv(this.addr,e),sn(t,e)}}function NI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const o=this.type===i.SAMPLER_2D_SHADOW?U0:D0;t.setTexture2D(e||o,r)}function DI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||F0,r)}function UI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||B0,r)}function OI(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||O0,r)}function FI(i){switch(i){case 5126:return vI;case 35664:return xI;case 35665:return yI;case 35666:return MI;case 35674:return SI;case 35675:return EI;case 35676:return TI;case 5124:case 35670:return AI;case 35667:case 35671:return bI;case 35668:case 35672:return wI;case 35669:case 35673:return RI;case 5125:return CI;case 36294:return PI;case 36295:return LI;case 36296:return II;case 35678:case 36198:case 36298:case 36306:case 35682:return NI;case 35679:case 36299:case 36307:return DI;case 35680:case 36300:case 36308:case 36293:return UI;case 36289:case 36303:case 36311:case 36292:return OI}}function BI(i,e){i.uniform1fv(this.addr,e)}function zI(i,e){const t=Vo(e,this.size,2);i.uniform2fv(this.addr,t)}function HI(i,e){const t=Vo(e,this.size,3);i.uniform3fv(this.addr,t)}function VI(i,e){const t=Vo(e,this.size,4);i.uniform4fv(this.addr,t)}function GI(i,e){const t=Vo(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kI(i,e){const t=Vo(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function WI(i,e){const t=Vo(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function XI(i,e){i.uniform1iv(this.addr,e)}function qI(i,e){i.uniform2iv(this.addr,e)}function KI(i,e){i.uniform3iv(this.addr,e)}function YI(i,e){i.uniform4iv(this.addr,e)}function $I(i,e){i.uniform1uiv(this.addr,e)}function ZI(i,e){i.uniform2uiv(this.addr,e)}function JI(i,e){i.uniform3uiv(this.addr,e)}function jI(i,e){i.uniform4uiv(this.addr,e)}function QI(i,e,t){const n=this.cache,r=e.length,o=nu(t,r);rn(n,o)||(i.uniform1iv(this.addr,o),sn(n,o));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||D0,o[a])}function eN(i,e,t){const n=this.cache,r=e.length,o=nu(t,r);rn(n,o)||(i.uniform1iv(this.addr,o),sn(n,o));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||F0,o[a])}function tN(i,e,t){const n=this.cache,r=e.length,o=nu(t,r);rn(n,o)||(i.uniform1iv(this.addr,o),sn(n,o));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||B0,o[a])}function nN(i,e,t){const n=this.cache,r=e.length,o=nu(t,r);rn(n,o)||(i.uniform1iv(this.addr,o),sn(n,o));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||O0,o[a])}function iN(i){switch(i){case 5126:return BI;case 35664:return zI;case 35665:return HI;case 35666:return VI;case 35674:return GI;case 35675:return kI;case 35676:return WI;case 5124:case 35670:return XI;case 35667:case 35671:return qI;case 35668:case 35672:return KI;case 35669:case 35673:return YI;case 5125:return $I;case 36294:return ZI;case 36295:return JI;case 36296:return jI;case 35678:case 36198:case 36298:case 36306:case 35682:return QI;case 35679:case 36299:case 36307:return eN;case 35680:case 36300:case 36308:case 36293:return tN;case 36289:case 36303:case 36311:case 36292:return nN}}class rN{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=FI(t.type)}}class sN{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=iN(t.type)}}class oN{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let o=0,a=r.length;o!==a;++o){const c=r[o];c.setValue(e,t[c.id],n)}}}const th=/(\w+)(\])?(\[|\.)?/g;function P_(i,e){i.seq.push(e),i.map[e.id]=e}function aN(i,e,t){const n=i.name,r=n.length;for(th.lastIndex=0;;){const o=th.exec(n),a=th.lastIndex;let c=o[1];const u=o[2]==="]",f=o[3];if(u&&(c=c|0),f===void 0||f==="["&&a+2===r){P_(t,f===void 0?new rN(c,i,e):new sN(c,i,e));break}else{let p=t.map[c];p===void 0&&(p=new oN(c),P_(t,p)),t=p}}}class bc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),a=e.getUniformLocation(t,o.name);aN(o,a,this)}}setValue(e,t,n,r){const o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,a=t.length;o!==a;++o){const c=t[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(e,u.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,o=e.length;r!==o;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function L_(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const lN=37297;let cN=0;function uN(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let a=r;a<o;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}function fN(i){const e=Rt.getPrimaries(Rt.workingColorSpace),t=Rt.getPrimaries(i);let n;switch(e===t?n="":e===Bc&&t===Fc?n="LinearDisplayP3ToLinearSRGB":e===Fc&&t===Bc&&(n="LinearSRGBToLinearDisplayP3"),i){case gn:case Qc:return[n,"LinearTransferOETF"];case Ln:case ld:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function I_(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+uN(i.getShaderSource(e),a)}else return r}function hN(i,e){const t=fN(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function dN(i,e){let t;switch(e){case rR:t="Linear";break;case sR:t="Reinhard";break;case oR:t="OptimizedCineon";break;case aR:t="ACESFilmic";break;case cR:t="AgX";break;case uR:t="Neutral";break;case lR:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function pN(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ea).join(`
`)}function mN(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gN(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=i.getActiveAttrib(e,r),a=o.name;let c=1;o.type===i.FLOAT_MAT2&&(c=2),o.type===i.FLOAT_MAT3&&(c=3),o.type===i.FLOAT_MAT4&&(c=4),t[a]={type:o.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function Ea(i){return i!==""}function N_(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function D_(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _N=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lh(i){return i.replace(_N,xN)}const vN=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function xN(i,e){let t=ht[e];if(t===void 0){const n=vN.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Lh(t)}const yN=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function U_(i){return i.replace(yN,MN)}function MN(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function O_(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function SN(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===s0?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===P1?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===cr&&(e="SHADOWMAP_TYPE_VSM"),e}function EN(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Co:case Po:e="ENVMAP_TYPE_CUBE";break;case jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function TN(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Po:e="ENVMAP_MODE_REFRACTION";break}return e}function AN(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case o0:e="ENVMAP_BLENDING_MULTIPLY";break;case nR:e="ENVMAP_BLENDING_MIX";break;case iR:e="ENVMAP_BLENDING_ADD";break}return e}function bN(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function wN(i,e,t,n){const r=i.getContext(),o=t.defines;let a=t.vertexShader,c=t.fragmentShader;const u=SN(t),f=EN(t),d=TN(t),p=AN(t),m=bN(t),_=pN(t),y=mN(o),T=r.createProgram();let x,v,N=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ea).join(`
`),x.length>0&&(x+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ea).join(`
`),v.length>0&&(v+=`
`)):(x=[O_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ea).join(`
`),v=[O_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yr?"#define TONE_MAPPING":"",t.toneMapping!==Yr?ht.tonemapping_pars_fragment:"",t.toneMapping!==Yr?dN("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,hN("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ea).join(`
`)),a=Lh(a),a=N_(a,t),a=D_(a,t),c=Lh(c),c=N_(c,t),c=D_(c,t),a=U_(a),c=U_(c),t.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,x=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,v=["#define varying in",t.glslVersion===Jg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=N+x+a,P=N+v+c,q=L_(r,r.VERTEX_SHADER,S),O=L_(r,r.FRAGMENT_SHADER,P);r.attachShader(T,q),r.attachShader(T,O),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function U(j){if(i.debug.checkShaderErrors){const pe=r.getProgramInfoLog(T).trim(),$=r.getShaderInfoLog(q).trim(),le=r.getShaderInfoLog(O).trim();let de=!0,xe=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(de=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,T,q,O);else{const fe=I_(r,q,"vertex"),te=I_(r,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+pe+`
`+fe+`
`+te)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):($===""||le==="")&&(xe=!1);xe&&(j.diagnostics={runnable:de,programLog:pe,vertexShader:{log:$,prefix:x},fragmentShader:{log:le,prefix:v}})}r.deleteShader(q),r.deleteShader(O),J=new bc(r,T),I=gN(r,T)}let J;this.getUniforms=function(){return J===void 0&&U(this),J};let I;this.getAttributes=function(){return I===void 0&&U(this),I};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(T,lN)),b},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cN++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=q,this.fragmentShader=O,this}let RN=0;class CN{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new PN(e),t.set(e,n)),n}}class PN{constructor(e){this.id=RN++,this.code=e,this.usedTimes=0}}function LN(i,e,t,n,r,o,a){const c=new A0,u=new CN,f=new Set,d=[],p=r.logarithmicDepthBuffer,m=r.vertexTextures;let _=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(I){return f.add(I),I===0?"uv":`uv${I}`}function x(I,b,j,pe,$){const le=pe.fog,de=$.geometry,xe=I.isMeshStandardMaterial?pe.environment:null,fe=(I.isMeshStandardMaterial?t:e).get(I.envMap||xe),te=fe&&fe.mapping===jc?fe.image.height:null,Ee=y[I.type];I.precision!==null&&(_=r.getMaxPrecision(I.precision),_!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",_,"instead."));const Se=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,Re=Se!==void 0?Se.length:0;let We=0;de.morphAttributes.position!==void 0&&(We=1),de.morphAttributes.normal!==void 0&&(We=2),de.morphAttributes.color!==void 0&&(We=3);let Et,ce,Ae,Ie;if(Ee){const on=Ui[Ee];Et=on.vertexShader,ce=on.fragmentShader}else Et=I.vertexShader,ce=I.fragmentShader,u.update(I),Ae=u.getVertexShaderID(I),Ie=u.getFragmentShaderID(I);const be=i.getRenderTarget(),ke=$.isInstancedMesh===!0,Je=$.isBatchedMesh===!0,Ke=!!I.map,Q=!!I.matcap,me=!!fe,R=!!I.aoMap,D=!!I.lightMap,H=!!I.bumpMap,K=!!I.normalMap,A=!!I.displacementMap,M=!!I.emissiveMap,z=!!I.metalnessMap,V=!!I.roughnessMap,k=I.anisotropy>0,W=I.clearcoat>0,ue=I.iridescence>0,ne=I.sheen>0,ge=I.transmission>0,Te=k&&!!I.anisotropyMap,he=W&&!!I.clearcoatMap,Me=W&&!!I.clearcoatNormalMap,Oe=W&&!!I.clearcoatRoughnessMap,we=ue&&!!I.iridescenceMap,Ne=ue&&!!I.iridescenceThicknessMap,et=ne&&!!I.sheenColorMap,ut=ne&&!!I.sheenRoughnessMap,mt=!!I.specularMap,vt=!!I.specularColorMap,ot=!!I.specularIntensityMap,Be=ge&&!!I.transmissionMap,B=ge&&!!I.thicknessMap,Le=!!I.gradientMap,Ce=!!I.alphaMap,Ge=I.alphaTest>0,Xe=!!I.alphaHash,It=!!I.extensions;let Ot=Yr;I.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const zt={shaderID:Ee,shaderType:I.type,shaderName:I.name,vertexShader:Et,fragmentShader:ce,defines:I.defines,customVertexShaderID:Ae,customFragmentShaderID:Ie,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:_,batching:Je,instancing:ke,instancingColor:ke&&$.instanceColor!==null,instancingMorph:ke&&$.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:be===null?i.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:gn,alphaToCoverage:!!I.alphaToCoverage,map:Ke,matcap:Q,envMap:me,envMapMode:me&&fe.mapping,envMapCubeUVHeight:te,aoMap:R,lightMap:D,bumpMap:H,normalMap:K,displacementMap:m&&A,emissiveMap:M,normalMapObjectSpace:K&&I.normalMapType===AR,normalMapTangentSpace:K&&I.normalMapType===x0,metalnessMap:z,roughnessMap:V,anisotropy:k,anisotropyMap:Te,clearcoat:W,clearcoatMap:he,clearcoatNormalMap:Me,clearcoatRoughnessMap:Oe,iridescence:ue,iridescenceMap:we,iridescenceThicknessMap:Ne,sheen:ne,sheenColorMap:et,sheenRoughnessMap:ut,specularMap:mt,specularColorMap:vt,specularIntensityMap:ot,transmission:ge,transmissionMap:Be,thicknessMap:B,gradientMap:Le,opaque:I.transparent===!1&&I.blending===Mo&&I.alphaToCoverage===!1,alphaMap:Ce,alphaTest:Ge,alphaHash:Xe,combine:I.combine,mapUv:Ke&&T(I.map.channel),aoMapUv:R&&T(I.aoMap.channel),lightMapUv:D&&T(I.lightMap.channel),bumpMapUv:H&&T(I.bumpMap.channel),normalMapUv:K&&T(I.normalMap.channel),displacementMapUv:A&&T(I.displacementMap.channel),emissiveMapUv:M&&T(I.emissiveMap.channel),metalnessMapUv:z&&T(I.metalnessMap.channel),roughnessMapUv:V&&T(I.roughnessMap.channel),anisotropyMapUv:Te&&T(I.anisotropyMap.channel),clearcoatMapUv:he&&T(I.clearcoatMap.channel),clearcoatNormalMapUv:Me&&T(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&T(I.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&T(I.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&T(I.iridescenceThicknessMap.channel),sheenColorMapUv:et&&T(I.sheenColorMap.channel),sheenRoughnessMapUv:ut&&T(I.sheenRoughnessMap.channel),specularMapUv:mt&&T(I.specularMap.channel),specularColorMapUv:vt&&T(I.specularColorMap.channel),specularIntensityMapUv:ot&&T(I.specularIntensityMap.channel),transmissionMapUv:Be&&T(I.transmissionMap.channel),thicknessMapUv:B&&T(I.thicknessMap.channel),alphaMapUv:Ce&&T(I.alphaMap.channel),vertexTangents:!!de.attributes.tangent&&(K||k),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!de.attributes.uv&&(Ke||Ce),fog:!!le,useFog:I.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:$.isSkinnedMesh===!0,morphTargets:de.morphAttributes.position!==void 0,morphNormals:de.morphAttributes.normal!==void 0,morphColors:de.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:We,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:I.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ke&&I.map.isVideoTexture===!0&&Rt.getTransfer(I.map.colorSpace)===Gt,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===Fi,flipSided:I.side===Vn,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:It&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:It&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return zt.vertexUv1s=f.has(1),zt.vertexUv2s=f.has(2),zt.vertexUv3s=f.has(3),f.clear(),zt}function v(I){const b=[];if(I.shaderID?b.push(I.shaderID):(b.push(I.customVertexShaderID),b.push(I.customFragmentShaderID)),I.defines!==void 0)for(const j in I.defines)b.push(j),b.push(I.defines[j]);return I.isRawShaderMaterial===!1&&(N(b,I),S(b,I),b.push(i.outputColorSpace)),b.push(I.customProgramCacheKey),b.join()}function N(I,b){I.push(b.precision),I.push(b.outputColorSpace),I.push(b.envMapMode),I.push(b.envMapCubeUVHeight),I.push(b.mapUv),I.push(b.alphaMapUv),I.push(b.lightMapUv),I.push(b.aoMapUv),I.push(b.bumpMapUv),I.push(b.normalMapUv),I.push(b.displacementMapUv),I.push(b.emissiveMapUv),I.push(b.metalnessMapUv),I.push(b.roughnessMapUv),I.push(b.anisotropyMapUv),I.push(b.clearcoatMapUv),I.push(b.clearcoatNormalMapUv),I.push(b.clearcoatRoughnessMapUv),I.push(b.iridescenceMapUv),I.push(b.iridescenceThicknessMapUv),I.push(b.sheenColorMapUv),I.push(b.sheenRoughnessMapUv),I.push(b.specularMapUv),I.push(b.specularColorMapUv),I.push(b.specularIntensityMapUv),I.push(b.transmissionMapUv),I.push(b.thicknessMapUv),I.push(b.combine),I.push(b.fogExp2),I.push(b.sizeAttenuation),I.push(b.morphTargetsCount),I.push(b.morphAttributeCount),I.push(b.numDirLights),I.push(b.numPointLights),I.push(b.numSpotLights),I.push(b.numSpotLightMaps),I.push(b.numHemiLights),I.push(b.numRectAreaLights),I.push(b.numDirLightShadows),I.push(b.numPointLightShadows),I.push(b.numSpotLightShadows),I.push(b.numSpotLightShadowsWithMaps),I.push(b.numLightProbes),I.push(b.shadowMapType),I.push(b.toneMapping),I.push(b.numClippingPlanes),I.push(b.numClipIntersection),I.push(b.depthPacking)}function S(I,b){c.disableAll(),b.supportsVertexTextures&&c.enable(0),b.instancing&&c.enable(1),b.instancingColor&&c.enable(2),b.instancingMorph&&c.enable(3),b.matcap&&c.enable(4),b.envMap&&c.enable(5),b.normalMapObjectSpace&&c.enable(6),b.normalMapTangentSpace&&c.enable(7),b.clearcoat&&c.enable(8),b.iridescence&&c.enable(9),b.alphaTest&&c.enable(10),b.vertexColors&&c.enable(11),b.vertexAlphas&&c.enable(12),b.vertexUv1s&&c.enable(13),b.vertexUv2s&&c.enable(14),b.vertexUv3s&&c.enable(15),b.vertexTangents&&c.enable(16),b.anisotropy&&c.enable(17),b.alphaHash&&c.enable(18),b.batching&&c.enable(19),I.push(c.mask),c.disableAll(),b.fog&&c.enable(0),b.useFog&&c.enable(1),b.flatShading&&c.enable(2),b.logarithmicDepthBuffer&&c.enable(3),b.skinning&&c.enable(4),b.morphTargets&&c.enable(5),b.morphNormals&&c.enable(6),b.morphColors&&c.enable(7),b.premultipliedAlpha&&c.enable(8),b.shadowMapEnabled&&c.enable(9),b.useLegacyLights&&c.enable(10),b.doubleSided&&c.enable(11),b.flipSided&&c.enable(12),b.useDepthPacking&&c.enable(13),b.dithering&&c.enable(14),b.transmission&&c.enable(15),b.sheen&&c.enable(16),b.opaque&&c.enable(17),b.pointsUvs&&c.enable(18),b.decodeVideoTexture&&c.enable(19),b.alphaToCoverage&&c.enable(20),I.push(c.mask)}function P(I){const b=y[I.type];let j;if(b){const pe=Ui[b];j=pC.clone(pe.uniforms)}else j=I.uniforms;return j}function q(I,b){let j;for(let pe=0,$=d.length;pe<$;pe++){const le=d[pe];if(le.cacheKey===b){j=le,++j.usedTimes;break}}return j===void 0&&(j=new wN(i,b,I,o),d.push(j)),j}function O(I){if(--I.usedTimes===0){const b=d.indexOf(I);d[b]=d[d.length-1],d.pop(),I.destroy()}}function U(I){u.remove(I)}function J(){u.dispose()}return{getParameters:x,getProgramCacheKey:v,getUniforms:P,acquireProgram:q,releaseProgram:O,releaseShaderCache:U,programs:d,dispose:J}}function IN(){let i=new WeakMap;function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function t(o){i.delete(o)}function n(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function NN(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function F_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function B_(){const i=[];let e=0;const t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function a(p,m,_,y,T,x){let v=i[e];return v===void 0?(v={id:p.id,object:p,geometry:m,material:_,groupOrder:y,renderOrder:p.renderOrder,z:T,group:x},i[e]=v):(v.id=p.id,v.object=p,v.geometry=m,v.material=_,v.groupOrder=y,v.renderOrder=p.renderOrder,v.z=T,v.group=x),e++,v}function c(p,m,_,y,T,x){const v=a(p,m,_,y,T,x);_.transmission>0?n.push(v):_.transparent===!0?r.push(v):t.push(v)}function u(p,m,_,y,T,x){const v=a(p,m,_,y,T,x);_.transmission>0?n.unshift(v):_.transparent===!0?r.unshift(v):t.unshift(v)}function f(p,m){t.length>1&&t.sort(p||NN),n.length>1&&n.sort(m||F_),r.length>1&&r.sort(m||F_)}function d(){for(let p=e,m=i.length;p<m;p++){const _=i[p];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:c,unshift:u,finish:d,sort:f}}function DN(){let i=new WeakMap;function e(n,r){const o=i.get(n);let a;return o===void 0?(a=new B_,i.set(n,[a])):r>=o.length?(a=new B_,o.push(a)):a=o[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function UN(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new it};break;case"SpotLight":t={position:new X,direction:new X,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new X,halfWidth:new X,halfHeight:new X};break}return i[e.id]=t,t}}}function ON(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let FN=0;function BN(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function zN(i){const e=new UN,t=ON(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new X);const r=new X,o=new ct,a=new ct;function c(f,d){let p=0,m=0,_=0;for(let j=0;j<9;j++)n.probe[j].set(0,0,0);let y=0,T=0,x=0,v=0,N=0,S=0,P=0,q=0,O=0,U=0,J=0;f.sort(BN);const I=d===!0?Math.PI:1;for(let j=0,pe=f.length;j<pe;j++){const $=f[j],le=$.color,de=$.intensity,xe=$.distance,fe=$.shadow&&$.shadow.map?$.shadow.map.texture:null;if($.isAmbientLight)p+=le.r*de*I,m+=le.g*de*I,_+=le.b*de*I;else if($.isLightProbe){for(let te=0;te<9;te++)n.probe[te].addScaledVector($.sh.coefficients[te],de);J++}else if($.isDirectionalLight){const te=e.get($);if(te.color.copy($.color).multiplyScalar($.intensity*I),$.castShadow){const Ee=$.shadow,Se=t.get($);Se.shadowBias=Ee.bias,Se.shadowNormalBias=Ee.normalBias,Se.shadowRadius=Ee.radius,Se.shadowMapSize=Ee.mapSize,n.directionalShadow[y]=Se,n.directionalShadowMap[y]=fe,n.directionalShadowMatrix[y]=$.shadow.matrix,S++}n.directional[y]=te,y++}else if($.isSpotLight){const te=e.get($);te.position.setFromMatrixPosition($.matrixWorld),te.color.copy(le).multiplyScalar(de*I),te.distance=xe,te.coneCos=Math.cos($.angle),te.penumbraCos=Math.cos($.angle*(1-$.penumbra)),te.decay=$.decay,n.spot[x]=te;const Ee=$.shadow;if($.map&&(n.spotLightMap[O]=$.map,O++,Ee.updateMatrices($),$.castShadow&&U++),n.spotLightMatrix[x]=Ee.matrix,$.castShadow){const Se=t.get($);Se.shadowBias=Ee.bias,Se.shadowNormalBias=Ee.normalBias,Se.shadowRadius=Ee.radius,Se.shadowMapSize=Ee.mapSize,n.spotShadow[x]=Se,n.spotShadowMap[x]=fe,q++}x++}else if($.isRectAreaLight){const te=e.get($);te.color.copy(le).multiplyScalar(de),te.halfWidth.set($.width*.5,0,0),te.halfHeight.set(0,$.height*.5,0),n.rectArea[v]=te,v++}else if($.isPointLight){const te=e.get($);if(te.color.copy($.color).multiplyScalar($.intensity*I),te.distance=$.distance,te.decay=$.decay,$.castShadow){const Ee=$.shadow,Se=t.get($);Se.shadowBias=Ee.bias,Se.shadowNormalBias=Ee.normalBias,Se.shadowRadius=Ee.radius,Se.shadowMapSize=Ee.mapSize,Se.shadowCameraNear=Ee.camera.near,Se.shadowCameraFar=Ee.camera.far,n.pointShadow[T]=Se,n.pointShadowMap[T]=fe,n.pointShadowMatrix[T]=$.shadow.matrix,P++}n.point[T]=te,T++}else if($.isHemisphereLight){const te=e.get($);te.skyColor.copy($.color).multiplyScalar(de*I),te.groundColor.copy($.groundColor).multiplyScalar(de*I),n.hemi[N]=te,N++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=_;const b=n.hash;(b.directionalLength!==y||b.pointLength!==T||b.spotLength!==x||b.rectAreaLength!==v||b.hemiLength!==N||b.numDirectionalShadows!==S||b.numPointShadows!==P||b.numSpotShadows!==q||b.numSpotMaps!==O||b.numLightProbes!==J)&&(n.directional.length=y,n.spot.length=x,n.rectArea.length=v,n.point.length=T,n.hemi.length=N,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=q,n.spotShadowMap.length=q,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=q+O-U,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=J,b.directionalLength=y,b.pointLength=T,b.spotLength=x,b.rectAreaLength=v,b.hemiLength=N,b.numDirectionalShadows=S,b.numPointShadows=P,b.numSpotShadows=q,b.numSpotMaps=O,b.numLightProbes=J,n.version=FN++)}function u(f,d){let p=0,m=0,_=0,y=0,T=0;const x=d.matrixWorldInverse;for(let v=0,N=f.length;v<N;v++){const S=f[v];if(S.isDirectionalLight){const P=n.directional[p];P.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(x),p++}else if(S.isSpotLight){const P=n.spot[_];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(x),P.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(x),_++}else if(S.isRectAreaLight){const P=n.rectArea[y];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(x),a.identity(),o.copy(S.matrixWorld),o.premultiply(x),a.extractRotation(o),P.halfWidth.set(S.width*.5,0,0),P.halfHeight.set(0,S.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){const P=n.point[m];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(x),m++}else if(S.isHemisphereLight){const P=n.hemi[T];P.direction.setFromMatrixPosition(S.matrixWorld),P.direction.transformDirection(x),T++}}}return{setup:c,setupView:u,state:n}}function z_(i){const e=new zN(i),t=[],n=[];function r(){t.length=0,n.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){e.setup(t,d)}function u(d){e.setupView(t,d)}return{init:r,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a}}function HN(i){let e=new WeakMap;function t(r,o=0){const a=e.get(r);let c;return a===void 0?(c=new z_(i),e.set(r,[c])):o>=a.length?(c=new z_(i),a.push(c)):c=a[o],c}function n(){e=new WeakMap}return{get:t,dispose:n}}class VN extends Gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ER,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class GN extends Gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kN=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WN=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function XN(i,e,t){let n=new ud;const r=new Pe,o=new Pe,a=new Ut,c=new VN({depthPacking:TR}),u=new GN,f={},d=t.maxTextureSize,p={[pr]:Vn,[Vn]:pr,[Fi]:Fi},m=new Jr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:kN,fragmentShader:WN}),_=m.clone();_.defines.HORIZONTAL_PASS=1;const y=new Ri;y.setAttribute("position",new Un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new En(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=s0;let v=this.type;this.render=function(O,U,J){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||O.length===0)return;const I=i.getRenderTarget(),b=i.getActiveCubeFace(),j=i.getActiveMipmapLevel(),pe=i.state;pe.setBlending(Kr),pe.buffers.color.setClear(1,1,1,1),pe.buffers.depth.setTest(!0),pe.setScissorTest(!1);const $=v!==cr&&this.type===cr,le=v===cr&&this.type!==cr;for(let de=0,xe=O.length;de<xe;de++){const fe=O[de],te=fe.shadow;if(te===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(te.autoUpdate===!1&&te.needsUpdate===!1)continue;r.copy(te.mapSize);const Ee=te.getFrameExtents();if(r.multiply(Ee),o.copy(te.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/Ee.x),r.x=o.x*Ee.x,te.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/Ee.y),r.y=o.y*Ee.y,te.mapSize.y=o.y)),te.map===null||$===!0||le===!0){const Re=this.type!==cr?{minFilter:Dn,magFilter:Dn}:{};te.map!==null&&te.map.dispose(),te.map=new ws(r.x,r.y,Re),te.map.texture.name=fe.name+".shadowMap",te.camera.updateProjectionMatrix()}i.setRenderTarget(te.map),i.clear();const Se=te.getViewportCount();for(let Re=0;Re<Se;Re++){const We=te.getViewport(Re);a.set(o.x*We.x,o.y*We.y,o.x*We.z,o.y*We.w),pe.viewport(a),te.updateMatrices(fe,Re),n=te.getFrustum(),P(U,J,te.camera,fe,this.type)}te.isPointLightShadow!==!0&&this.type===cr&&N(te,J),te.needsUpdate=!1}v=this.type,x.needsUpdate=!1,i.setRenderTarget(I,b,j)};function N(O,U){const J=e.update(T);m.defines.VSM_SAMPLES!==O.blurSamples&&(m.defines.VSM_SAMPLES=O.blurSamples,_.defines.VSM_SAMPLES=O.blurSamples,m.needsUpdate=!0,_.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ws(r.x,r.y)),m.uniforms.shadow_pass.value=O.map.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,i.setRenderTarget(O.mapPass),i.clear(),i.renderBufferDirect(U,null,J,m,T,null),_.uniforms.shadow_pass.value=O.mapPass.texture,_.uniforms.resolution.value=O.mapSize,_.uniforms.radius.value=O.radius,i.setRenderTarget(O.map),i.clear(),i.renderBufferDirect(U,null,J,_,T,null)}function S(O,U,J,I){let b=null;const j=J.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(j!==void 0)b=j;else if(b=J.isPointLight===!0?u:c,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const pe=b.uuid,$=U.uuid;let le=f[pe];le===void 0&&(le={},f[pe]=le);let de=le[$];de===void 0&&(de=b.clone(),le[$]=de,U.addEventListener("dispose",q)),b=de}if(b.visible=U.visible,b.wireframe=U.wireframe,I===cr?b.side=U.shadowSide!==null?U.shadowSide:U.side:b.side=U.shadowSide!==null?U.shadowSide:p[U.side],b.alphaMap=U.alphaMap,b.alphaTest=U.alphaTest,b.map=U.map,b.clipShadows=U.clipShadows,b.clippingPlanes=U.clippingPlanes,b.clipIntersection=U.clipIntersection,b.displacementMap=U.displacementMap,b.displacementScale=U.displacementScale,b.displacementBias=U.displacementBias,b.wireframeLinewidth=U.wireframeLinewidth,b.linewidth=U.linewidth,J.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const pe=i.properties.get(b);pe.light=J}return b}function P(O,U,J,I,b){if(O.visible===!1)return;if(O.layers.test(U.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&b===cr)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,O.matrixWorld);const $=e.update(O),le=O.material;if(Array.isArray(le)){const de=$.groups;for(let xe=0,fe=de.length;xe<fe;xe++){const te=de[xe],Ee=le[te.materialIndex];if(Ee&&Ee.visible){const Se=S(O,Ee,I,b);O.onBeforeShadow(i,O,U,J,$,Se,te),i.renderBufferDirect(J,null,$,Se,O,te),O.onAfterShadow(i,O,U,J,$,Se,te)}}}else if(le.visible){const de=S(O,le,I,b);O.onBeforeShadow(i,O,U,J,$,de,null),i.renderBufferDirect(J,null,$,de,O,null),O.onAfterShadow(i,O,U,J,$,de,null)}}const pe=O.children;for(let $=0,le=pe.length;$<le;$++)P(pe[$],U,J,I,b)}function q(O){O.target.removeEventListener("dispose",q);for(const J in f){const I=f[J],b=O.target.uuid;b in I&&(I[b].dispose(),delete I[b])}}}function qN(i){function e(){let B=!1;const Le=new Ut;let Ce=null;const Ge=new Ut(0,0,0,0);return{setMask:function(Xe){Ce!==Xe&&!B&&(i.colorMask(Xe,Xe,Xe,Xe),Ce=Xe)},setLocked:function(Xe){B=Xe},setClear:function(Xe,It,Ot,zt,on){on===!0&&(Xe*=zt,It*=zt,Ot*=zt),Le.set(Xe,It,Ot,zt),Ge.equals(Le)===!1&&(i.clearColor(Xe,It,Ot,zt),Ge.copy(Le))},reset:function(){B=!1,Ce=null,Ge.set(-1,0,0,0)}}}function t(){let B=!1,Le=null,Ce=null,Ge=null;return{setTest:function(Xe){Xe?Ie(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Xe){Le!==Xe&&!B&&(i.depthMask(Xe),Le=Xe)},setFunc:function(Xe){if(Ce!==Xe){switch(Xe){case $1:i.depthFunc(i.NEVER);break;case Z1:i.depthFunc(i.ALWAYS);break;case J1:i.depthFunc(i.LESS);break;case Nc:i.depthFunc(i.LEQUAL);break;case j1:i.depthFunc(i.EQUAL);break;case Q1:i.depthFunc(i.GEQUAL);break;case eR:i.depthFunc(i.GREATER);break;case tR:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ce=Xe}},setLocked:function(Xe){B=Xe},setClear:function(Xe){Ge!==Xe&&(i.clearDepth(Xe),Ge=Xe)},reset:function(){B=!1,Le=null,Ce=null,Ge=null}}}function n(){let B=!1,Le=null,Ce=null,Ge=null,Xe=null,It=null,Ot=null,zt=null,on=null;return{setTest:function(Nt){B||(Nt?Ie(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(Nt){Le!==Nt&&!B&&(i.stencilMask(Nt),Le=Nt)},setFunc:function(Nt,Qn,ei){(Ce!==Nt||Ge!==Qn||Xe!==ei)&&(i.stencilFunc(Nt,Qn,ei),Ce=Nt,Ge=Qn,Xe=ei)},setOp:function(Nt,Qn,ei){(It!==Nt||Ot!==Qn||zt!==ei)&&(i.stencilOp(Nt,Qn,ei),It=Nt,Ot=Qn,zt=ei)},setLocked:function(Nt){B=Nt},setClear:function(Nt){on!==Nt&&(i.clearStencil(Nt),on=Nt)},reset:function(){B=!1,Le=null,Ce=null,Ge=null,Xe=null,It=null,Ot=null,zt=null,on=null}}}const r=new e,o=new t,a=new n,c=new WeakMap,u=new WeakMap;let f={},d={},p=new WeakMap,m=[],_=null,y=!1,T=null,x=null,v=null,N=null,S=null,P=null,q=null,O=new it(0,0,0),U=0,J=!1,I=null,b=null,j=null,pe=null,$=null;const le=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let de=!1,xe=0;const fe=i.getParameter(i.VERSION);fe.indexOf("WebGL")!==-1?(xe=parseFloat(/^WebGL (\d)/.exec(fe)[1]),de=xe>=1):fe.indexOf("OpenGL ES")!==-1&&(xe=parseFloat(/^OpenGL ES (\d)/.exec(fe)[1]),de=xe>=2);let te=null,Ee={};const Se=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),We=new Ut().fromArray(Se),Et=new Ut().fromArray(Re);function ce(B,Le,Ce,Ge){const Xe=new Uint8Array(4),It=i.createTexture();i.bindTexture(B,It),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<Ce;Ot++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(Le,0,i.RGBA,1,1,Ge,0,i.RGBA,i.UNSIGNED_BYTE,Xe):i.texImage2D(Le+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Xe);return It}const Ae={};Ae[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Ae[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ae[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Ie(i.DEPTH_TEST),o.setFunc(Nc),H(!1),K(_g),Ie(i.CULL_FACE),R(Kr);function Ie(B){f[B]!==!0&&(i.enable(B),f[B]=!0)}function be(B){f[B]!==!1&&(i.disable(B),f[B]=!1)}function ke(B,Le){return d[B]!==Le?(i.bindFramebuffer(B,Le),d[B]=Le,B===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Le),B===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Le),!0):!1}function Je(B,Le){let Ce=m,Ge=!1;if(B){Ce=p.get(Le),Ce===void 0&&(Ce=[],p.set(Le,Ce));const Xe=B.textures;if(Ce.length!==Xe.length||Ce[0]!==i.COLOR_ATTACHMENT0){for(let It=0,Ot=Xe.length;It<Ot;It++)Ce[It]=i.COLOR_ATTACHMENT0+It;Ce.length=Xe.length,Ge=!0}}else Ce[0]!==i.BACK&&(Ce[0]=i.BACK,Ge=!0);Ge&&i.drawBuffers(Ce)}function Ke(B){return _!==B?(i.useProgram(B),_=B,!0):!1}const Q={[Ms]:i.FUNC_ADD,[I1]:i.FUNC_SUBTRACT,[N1]:i.FUNC_REVERSE_SUBTRACT};Q[D1]=i.MIN,Q[U1]=i.MAX;const me={[O1]:i.ZERO,[F1]:i.ONE,[B1]:i.SRC_COLOR,[Ah]:i.SRC_ALPHA,[W1]:i.SRC_ALPHA_SATURATE,[G1]:i.DST_COLOR,[H1]:i.DST_ALPHA,[z1]:i.ONE_MINUS_SRC_COLOR,[bh]:i.ONE_MINUS_SRC_ALPHA,[k1]:i.ONE_MINUS_DST_COLOR,[V1]:i.ONE_MINUS_DST_ALPHA,[X1]:i.CONSTANT_COLOR,[q1]:i.ONE_MINUS_CONSTANT_COLOR,[K1]:i.CONSTANT_ALPHA,[Y1]:i.ONE_MINUS_CONSTANT_ALPHA};function R(B,Le,Ce,Ge,Xe,It,Ot,zt,on,Nt){if(B===Kr){y===!0&&(be(i.BLEND),y=!1);return}if(y===!1&&(Ie(i.BLEND),y=!0),B!==L1){if(B!==T||Nt!==J){if((x!==Ms||S!==Ms)&&(i.blendEquation(i.FUNC_ADD),x=Ms,S=Ms),Nt)switch(B){case Mo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vg:i.blendFunc(i.ONE,i.ONE);break;case xg:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yg:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Mo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vg:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case xg:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yg:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}v=null,N=null,P=null,q=null,O.set(0,0,0),U=0,T=B,J=Nt}return}Xe=Xe||Le,It=It||Ce,Ot=Ot||Ge,(Le!==x||Xe!==S)&&(i.blendEquationSeparate(Q[Le],Q[Xe]),x=Le,S=Xe),(Ce!==v||Ge!==N||It!==P||Ot!==q)&&(i.blendFuncSeparate(me[Ce],me[Ge],me[It],me[Ot]),v=Ce,N=Ge,P=It,q=Ot),(zt.equals(O)===!1||on!==U)&&(i.blendColor(zt.r,zt.g,zt.b,on),O.copy(zt),U=on),T=B,J=!1}function D(B,Le){B.side===Fi?be(i.CULL_FACE):Ie(i.CULL_FACE);let Ce=B.side===Vn;Le&&(Ce=!Ce),H(Ce),B.blending===Mo&&B.transparent===!1?R(Kr):R(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const Ge=B.stencilWrite;a.setTest(Ge),Ge&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),M(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Ie(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function H(B){I!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),I=B)}function K(B){B!==R1?(Ie(i.CULL_FACE),B!==b&&(B===_g?i.cullFace(i.BACK):B===C1?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),b=B}function A(B){B!==j&&(de&&i.lineWidth(B),j=B)}function M(B,Le,Ce){B?(Ie(i.POLYGON_OFFSET_FILL),(pe!==Le||$!==Ce)&&(i.polygonOffset(Le,Ce),pe=Le,$=Ce)):be(i.POLYGON_OFFSET_FILL)}function z(B){B?Ie(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function V(B){B===void 0&&(B=i.TEXTURE0+le-1),te!==B&&(i.activeTexture(B),te=B)}function k(B,Le,Ce){Ce===void 0&&(te===null?Ce=i.TEXTURE0+le-1:Ce=te);let Ge=Ee[Ce];Ge===void 0&&(Ge={type:void 0,texture:void 0},Ee[Ce]=Ge),(Ge.type!==B||Ge.texture!==Le)&&(te!==Ce&&(i.activeTexture(Ce),te=Ce),i.bindTexture(B,Le||Ae[B]),Ge.type=B,Ge.texture=Le)}function W(){const B=Ee[te];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ue(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ge(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Te(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function he(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Oe(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function we(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ne(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(B){We.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),We.copy(B))}function mt(B){Et.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Et.copy(B))}function vt(B,Le){let Ce=u.get(Le);Ce===void 0&&(Ce=new WeakMap,u.set(Le,Ce));let Ge=Ce.get(B);Ge===void 0&&(Ge=i.getUniformBlockIndex(Le,B.name),Ce.set(B,Ge))}function ot(B,Le){const Ge=u.get(Le).get(B);c.get(Le)!==Ge&&(i.uniformBlockBinding(Le,Ge,B.__bindingPointIndex),c.set(Le,Ge))}function Be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},te=null,Ee={},d={},p=new WeakMap,m=[],_=null,y=!1,T=null,x=null,v=null,N=null,S=null,P=null,q=null,O=new it(0,0,0),U=0,J=!1,I=null,b=null,j=null,pe=null,$=null,We.set(0,0,i.canvas.width,i.canvas.height),Et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Ie,disable:be,bindFramebuffer:ke,drawBuffers:Je,useProgram:Ke,setBlending:R,setMaterial:D,setFlipSided:H,setCullFace:K,setLineWidth:A,setPolygonOffset:M,setScissorTest:z,activeTexture:V,bindTexture:k,unbindTexture:W,compressedTexImage2D:ue,compressedTexImage3D:ne,texImage2D:Ne,texImage3D:et,updateUBOMapping:vt,uniformBlockBinding:ot,texStorage2D:Oe,texStorage3D:we,texSubImage2D:ge,texSubImage3D:Te,compressedTexSubImage2D:he,compressedTexSubImage3D:Me,scissor:ut,viewport:mt,reset:Be}}function KN(i,e,t,n,r,o,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Pe,d=new WeakMap;let p;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,M){return _?new OffscreenCanvas(A,M):Va("canvas")}function T(A,M,z){let V=1;const k=K(A);if((k.width>z||k.height>z)&&(V=z/Math.max(k.width,k.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const W=Math.floor(V*k.width),ue=Math.floor(V*k.height);p===void 0&&(p=y(W,ue));const ne=M?y(W,ue):p;return ne.width=W,ne.height=ue,ne.getContext("2d").drawImage(A,0,0,W,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+W+"x"+ue+")."),ne}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),A;return A}function x(A){return A.generateMipmaps&&A.minFilter!==Dn&&A.minFilter!==jn}function v(A){i.generateMipmap(A)}function N(A,M,z,V,k=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let W=M;if(M===i.RED&&(z===i.FLOAT&&(W=i.R32F),z===i.HALF_FLOAT&&(W=i.R16F),z===i.UNSIGNED_BYTE&&(W=i.R8)),M===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(W=i.R8UI),z===i.UNSIGNED_SHORT&&(W=i.R16UI),z===i.UNSIGNED_INT&&(W=i.R32UI),z===i.BYTE&&(W=i.R8I),z===i.SHORT&&(W=i.R16I),z===i.INT&&(W=i.R32I)),M===i.RG&&(z===i.FLOAT&&(W=i.RG32F),z===i.HALF_FLOAT&&(W=i.RG16F),z===i.UNSIGNED_BYTE&&(W=i.RG8)),M===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(W=i.RG8UI),z===i.UNSIGNED_SHORT&&(W=i.RG16UI),z===i.UNSIGNED_INT&&(W=i.RG32UI),z===i.BYTE&&(W=i.RG8I),z===i.SHORT&&(W=i.RG16I),z===i.INT&&(W=i.RG32I)),M===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),M===i.RGBA){const ue=k?Oc:Rt.getTransfer(V);z===i.FLOAT&&(W=i.RGBA32F),z===i.HALF_FLOAT&&(W=i.RGBA16F),z===i.UNSIGNED_BYTE&&(W=ue===Gt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function S(A,M){return x(A)===!0||A.isFramebufferTexture&&A.minFilter!==Dn&&A.minFilter!==jn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function P(A){const M=A.target;M.removeEventListener("dispose",P),O(M),M.isVideoTexture&&d.delete(M)}function q(A){const M=A.target;M.removeEventListener("dispose",q),J(M)}function O(A){const M=n.get(A);if(M.__webglInit===void 0)return;const z=A.source,V=m.get(z);if(V){const k=V[M.__cacheKey];k.usedTimes--,k.usedTimes===0&&U(A),Object.keys(V).length===0&&m.delete(z)}n.remove(A)}function U(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const z=A.source,V=m.get(z);delete V[M.__cacheKey],a.memory.textures--}function J(A){const M=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(M.__webglFramebuffer[V]))for(let k=0;k<M.__webglFramebuffer[V].length;k++)i.deleteFramebuffer(M.__webglFramebuffer[V][k]);else i.deleteFramebuffer(M.__webglFramebuffer[V]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[V])}else{if(Array.isArray(M.__webglFramebuffer))for(let V=0;V<M.__webglFramebuffer.length;V++)i.deleteFramebuffer(M.__webglFramebuffer[V]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let V=0;V<M.__webglColorRenderbuffer.length;V++)M.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[V]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const z=A.textures;for(let V=0,k=z.length;V<k;V++){const W=n.get(z[V]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(z[V])}n.remove(A)}let I=0;function b(){I=0}function j(){const A=I;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),I+=1,A}function pe(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function $(A,M){const z=n.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const V=A.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{We(z,A,M);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+M)}function le(A,M){const z=n.get(A);if(A.version>0&&z.__version!==A.version){We(z,A,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+M)}function de(A,M){const z=n.get(A);if(A.version>0&&z.__version!==A.version){We(z,A,M);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+M)}function xe(A,M){const z=n.get(A);if(A.version>0&&z.__version!==A.version){Et(z,A,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+M)}const fe={[Lo]:i.REPEAT,[kr]:i.CLAMP_TO_EDGE,[Dc]:i.MIRRORED_REPEAT},te={[Dn]:i.NEAREST,[l0]:i.NEAREST_MIPMAP_NEAREST,[Sa]:i.NEAREST_MIPMAP_LINEAR,[jn]:i.LINEAR,[Ac]:i.LINEAR_MIPMAP_NEAREST,[fr]:i.LINEAR_MIPMAP_LINEAR},Ee={[bR]:i.NEVER,[IR]:i.ALWAYS,[wR]:i.LESS,[y0]:i.LEQUAL,[RR]:i.EQUAL,[LR]:i.GEQUAL,[CR]:i.GREATER,[PR]:i.NOTEQUAL};function Se(A,M){if(M.type===Hi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===jn||M.magFilter===Ac||M.magFilter===Sa||M.magFilter===fr||M.minFilter===jn||M.minFilter===Ac||M.minFilter===Sa||M.minFilter===fr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,fe[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,fe[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,fe[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,te[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,te[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ee[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Dn||M.minFilter!==Sa&&M.minFilter!==fr||M.type===Hi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Re(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",P));const V=M.source;let k=m.get(V);k===void 0&&(k={},m.set(V,k));const W=pe(M);if(W!==A.__cacheKey){k[W]===void 0&&(k[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),k[W].usedTimes++;const ue=k[A.__cacheKey];ue!==void 0&&(k[A.__cacheKey].usedTimes--,ue.usedTimes===0&&U(M)),A.__cacheKey=W,A.__webglTexture=k[W].texture}return z}function We(A,M,z){let V=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=i.TEXTURE_3D);const k=Re(A,M),W=M.source;t.bindTexture(V,A.__webglTexture,i.TEXTURE0+z);const ue=n.get(W);if(W.version!==ue.__version||k===!0){t.activeTexture(i.TEXTURE0+z);const ne=Rt.getPrimaries(Rt.workingColorSpace),ge=M.colorSpace===Gr?null:Rt.getPrimaries(M.colorSpace),Te=M.colorSpace===Gr||ne===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let he=T(M.image,!1,r.maxTextureSize);he=H(M,he);const Me=o.convert(M.format,M.colorSpace),Oe=o.convert(M.type);let we=N(M.internalFormat,Me,Oe,M.colorSpace,M.isVideoTexture);Se(V,M);let Ne;const et=M.mipmaps,ut=M.isVideoTexture!==!0&&we!==_0,mt=ue.__version===void 0||k===!0,vt=W.dataReady,ot=S(M,he);if(M.isDepthTexture)we=i.DEPTH_COMPONENT16,M.type===Hi?we=i.DEPTH_COMPONENT32F:M.type===Io?we=i.DEPTH_COMPONENT24:M.type===qa&&(we=i.DEPTH24_STENCIL8),mt&&(ut?t.texStorage2D(i.TEXTURE_2D,1,we,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,we,he.width,he.height,0,Me,Oe,null));else if(M.isDataTexture)if(et.length>0){ut&&mt&&t.texStorage2D(i.TEXTURE_2D,ot,we,et[0].width,et[0].height);for(let Be=0,B=et.length;Be<B;Be++)Ne=et[Be],ut?vt&&t.texSubImage2D(i.TEXTURE_2D,Be,0,0,Ne.width,Ne.height,Me,Oe,Ne.data):t.texImage2D(i.TEXTURE_2D,Be,we,Ne.width,Ne.height,0,Me,Oe,Ne.data);M.generateMipmaps=!1}else ut?(mt&&t.texStorage2D(i.TEXTURE_2D,ot,we,he.width,he.height),vt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he.width,he.height,Me,Oe,he.data)):t.texImage2D(i.TEXTURE_2D,0,we,he.width,he.height,0,Me,Oe,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ut&&mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ot,we,et[0].width,et[0].height,he.depth);for(let Be=0,B=et.length;Be<B;Be++)Ne=et[Be],M.format!==Ai?Me!==null?ut?vt&&t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Be,0,0,0,Ne.width,Ne.height,he.depth,Me,Ne.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Be,we,Ne.width,Ne.height,he.depth,0,Ne.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?vt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Be,0,0,0,Ne.width,Ne.height,he.depth,Me,Oe,Ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Be,we,Ne.width,Ne.height,he.depth,0,Me,Oe,Ne.data)}else{ut&&mt&&t.texStorage2D(i.TEXTURE_2D,ot,we,et[0].width,et[0].height);for(let Be=0,B=et.length;Be<B;Be++)Ne=et[Be],M.format!==Ai?Me!==null?ut?vt&&t.compressedTexSubImage2D(i.TEXTURE_2D,Be,0,0,Ne.width,Ne.height,Me,Ne.data):t.compressedTexImage2D(i.TEXTURE_2D,Be,we,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?vt&&t.texSubImage2D(i.TEXTURE_2D,Be,0,0,Ne.width,Ne.height,Me,Oe,Ne.data):t.texImage2D(i.TEXTURE_2D,Be,we,Ne.width,Ne.height,0,Me,Oe,Ne.data)}else if(M.isDataArrayTexture)ut?(mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ot,we,he.width,he.height,he.depth),vt&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Me,Oe,he.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,he.width,he.height,he.depth,0,Me,Oe,he.data);else if(M.isData3DTexture)ut?(mt&&t.texStorage3D(i.TEXTURE_3D,ot,we,he.width,he.height,he.depth),vt&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Me,Oe,he.data)):t.texImage3D(i.TEXTURE_3D,0,we,he.width,he.height,he.depth,0,Me,Oe,he.data);else if(M.isFramebufferTexture){if(mt)if(ut)t.texStorage2D(i.TEXTURE_2D,ot,we,he.width,he.height);else{let Be=he.width,B=he.height;for(let Le=0;Le<ot;Le++)t.texImage2D(i.TEXTURE_2D,Le,we,Be,B,0,Me,Oe,null),Be>>=1,B>>=1}}else if(et.length>0){if(ut&&mt){const Be=K(et[0]);t.texStorage2D(i.TEXTURE_2D,ot,we,Be.width,Be.height)}for(let Be=0,B=et.length;Be<B;Be++)Ne=et[Be],ut?vt&&t.texSubImage2D(i.TEXTURE_2D,Be,0,0,Me,Oe,Ne):t.texImage2D(i.TEXTURE_2D,Be,we,Me,Oe,Ne);M.generateMipmaps=!1}else if(ut){if(mt){const Be=K(he);t.texStorage2D(i.TEXTURE_2D,ot,we,Be.width,Be.height)}vt&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Me,Oe,he)}else t.texImage2D(i.TEXTURE_2D,0,we,Me,Oe,he);x(M)&&v(V),ue.__version=W.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Et(A,M,z){if(M.image.length!==6)return;const V=Re(A,M),k=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);const W=n.get(k);if(k.version!==W.__version||V===!0){t.activeTexture(i.TEXTURE0+z);const ue=Rt.getPrimaries(Rt.workingColorSpace),ne=M.colorSpace===Gr?null:Rt.getPrimaries(M.colorSpace),ge=M.colorSpace===Gr||ue===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Te=M.isCompressedTexture||M.image[0].isCompressedTexture,he=M.image[0]&&M.image[0].isDataTexture,Me=[];for(let B=0;B<6;B++)!Te&&!he?Me[B]=T(M.image[B],!0,r.maxCubemapSize):Me[B]=he?M.image[B].image:M.image[B],Me[B]=H(M,Me[B]);const Oe=Me[0],we=o.convert(M.format,M.colorSpace),Ne=o.convert(M.type),et=N(M.internalFormat,we,Ne,M.colorSpace),ut=M.isVideoTexture!==!0,mt=W.__version===void 0||V===!0,vt=k.dataReady;let ot=S(M,Oe);Se(i.TEXTURE_CUBE_MAP,M);let Be;if(Te){ut&&mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,et,Oe.width,Oe.height);for(let B=0;B<6;B++){Be=Me[B].mipmaps;for(let Le=0;Le<Be.length;Le++){const Ce=Be[Le];M.format!==Ai?we!==null?ut?vt&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le,0,0,Ce.width,Ce.height,we,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le,et,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ut?vt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le,0,0,Ce.width,Ce.height,we,Ne,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le,et,Ce.width,Ce.height,0,we,Ne,Ce.data)}}}else{if(Be=M.mipmaps,ut&&mt){Be.length>0&&ot++;const B=K(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,et,B.width,B.height)}for(let B=0;B<6;B++)if(he){ut?vt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,Me[B].width,Me[B].height,we,Ne,Me[B].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,et,Me[B].width,Me[B].height,0,we,Ne,Me[B].data);for(let Le=0;Le<Be.length;Le++){const Ge=Be[Le].image[B].image;ut?vt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le+1,0,0,Ge.width,Ge.height,we,Ne,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le+1,et,Ge.width,Ge.height,0,we,Ne,Ge.data)}}else{ut?vt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,we,Ne,Me[B]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,et,we,Ne,Me[B]);for(let Le=0;Le<Be.length;Le++){const Ce=Be[Le];ut?vt&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le+1,0,0,we,Ne,Ce.image[B]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+B,Le+1,et,we,Ne,Ce.image[B])}}}x(M)&&v(i.TEXTURE_CUBE_MAP),W.__version=k.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ce(A,M,z,V,k,W){const ue=o.convert(z.format,z.colorSpace),ne=o.convert(z.type),ge=N(z.internalFormat,ue,ne,z.colorSpace);if(!n.get(M).__hasExternalTextures){const he=Math.max(1,M.width>>W),Me=Math.max(1,M.height>>W);k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?t.texImage3D(k,W,ge,he,Me,M.depth,0,ue,ne,null):t.texImage2D(k,W,ge,he,Me,0,ue,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),R(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,k,n.get(z).__webglTexture,0,me(M)):(k===i.TEXTURE_2D||k>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,k,n.get(z).__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ae(A,M,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let V=i.DEPTH_COMPONENT24;if(z||R(M)){const k=M.depthTexture;k&&k.isDepthTexture&&(k.type===Hi?V=i.DEPTH_COMPONENT32F:k.type===Io&&(V=i.DEPTH_COMPONENT24));const W=me(M);R(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W,V,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,W,V,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,V,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const V=me(M);z&&R(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,V,i.DEPTH24_STENCIL8,M.width,M.height):R(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,V,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,A)}else{const V=M.textures;for(let k=0;k<V.length;k++){const W=V[k],ue=o.convert(W.format,W.colorSpace),ne=o.convert(W.type),ge=N(W.internalFormat,ue,ne,W.colorSpace),Te=me(M);z&&R(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,ge,M.width,M.height):R(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,ge,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ge,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const V=n.get(M.depthTexture).__webglTexture,k=me(M);if(M.depthTexture.format===So)R(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0);else if(M.depthTexture.format===za)R(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function be(A){const M=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ie(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]=i.createRenderbuffer(),Ae(M.__webglDepthbuffer[V],A,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Ae(M.__webglDepthbuffer,A,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(A,M,z){const V=n.get(A);M!==void 0&&ce(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&be(A)}function Je(A){const M=A.texture,z=n.get(A),V=n.get(M);A.addEventListener("dispose",q);const k=A.textures,W=A.isWebGLCubeRenderTarget===!0,ue=k.length>1;if(ue||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=M.version,a.memory.textures++),W){z.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ne]=[];for(let ge=0;ge<M.mipmaps.length;ge++)z.__webglFramebuffer[ne][ge]=i.createFramebuffer()}else z.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ne=0;ne<M.mipmaps.length;ne++)z.__webglFramebuffer[ne]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ue)for(let ne=0,ge=k.length;ne<ge;ne++){const Te=n.get(k[ne]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&R(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ne=0;ne<k.length;ne++){const ge=k[ne];z.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ne]);const Te=o.convert(ge.format,ge.colorSpace),he=o.convert(ge.type),Me=N(ge.internalFormat,Te,he,ge.colorSpace,A.isXRRenderTarget===!0),Oe=me(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,Me,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,z.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ae(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Se(i.TEXTURE_CUBE_MAP,M);for(let ne=0;ne<6;ne++)if(M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)ce(z.__webglFramebuffer[ne][ge],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ge);else ce(z.__webglFramebuffer[ne],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);x(M)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let ne=0,ge=k.length;ne<ge;ne++){const Te=k[ne],he=n.get(Te);t.bindTexture(i.TEXTURE_2D,he.__webglTexture),Se(i.TEXTURE_2D,Te),ce(z.__webglFramebuffer,A,Te,i.COLOR_ATTACHMENT0+ne,i.TEXTURE_2D,0),x(Te)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ne=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,V.__webglTexture),Se(ne,M),M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)ce(z.__webglFramebuffer[ge],A,M,i.COLOR_ATTACHMENT0,ne,ge);else ce(z.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,ne,0);x(M)&&v(ne),t.unbindTexture()}A.depthBuffer&&be(A)}function Ke(A){const M=A.textures;for(let z=0,V=M.length;z<V;z++){const k=M[z];if(x(k)){const W=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ue=n.get(k).__webglTexture;t.bindTexture(W,ue),v(W),t.unbindTexture()}}}function Q(A){if(A.samples>0&&R(A)===!1){const M=A.textures,z=A.width,V=A.height;let k=i.COLOR_BUFFER_BIT;const W=[],ue=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=n.get(A),ge=M.length>1;if(ge)for(let Te=0;Te<M.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ne.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let Te=0;Te<M.length;Te++){W.push(i.COLOR_ATTACHMENT0+Te),A.depthBuffer&&W.push(ue);const he=ne.__ignoreDepthValues!==void 0?ne.__ignoreDepthValues:!1;if(he===!1&&(A.depthBuffer&&(k|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&ne.__isTransmissionRenderTarget!==!0&&(k|=i.STENCIL_BUFFER_BIT)),ge&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ne.__webglColorRenderbuffer[Te]),he===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ue]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ue])),ge){const Me=n.get(M[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Me,0)}i.blitFramebuffer(0,0,z,V,0,0,z,V,k,i.NEAREST),u&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,W)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let Te=0;Te<M.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,ne.__webglColorRenderbuffer[Te]);const he=n.get(M[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ne.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,he,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}}function me(A){return Math.min(r.maxSamples,A.samples)}function R(A){const M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function D(A){const M=a.render.frame;d.get(A)!==M&&(d.set(A,M),A.update())}function H(A,M){const z=A.colorSpace,V=A.format,k=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==gn&&z!==Gr&&(Rt.getTransfer(z)===Gt?(V!==Ai||k!==$r)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function K(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(f.width=A.naturalWidth||A.width,f.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(f.width=A.displayWidth,f.height=A.displayHeight):(f.width=A.width,f.height=A.height),f}this.allocateTextureUnit=j,this.resetTextureUnits=b,this.setTexture2D=$,this.setTexture2DArray=le,this.setTexture3D=de,this.setTextureCube=xe,this.rebindTextures=ke,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=R}function YN(i,e){function t(n,r=Gr){let o;const a=Rt.getTransfer(r);if(n===$r)return i.UNSIGNED_BYTE;if(n===f0)return i.UNSIGNED_SHORT_4_4_4_4;if(n===h0)return i.UNSIGNED_SHORT_5_5_5_1;if(n===pR)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hR)return i.BYTE;if(n===dR)return i.SHORT;if(n===c0)return i.UNSIGNED_SHORT;if(n===u0)return i.INT;if(n===Io)return i.UNSIGNED_INT;if(n===Hi)return i.FLOAT;if(n===Uc)return i.HALF_FLOAT;if(n===mR)return i.ALPHA;if(n===gR)return i.RGB;if(n===Ai)return i.RGBA;if(n===_R)return i.LUMINANCE;if(n===vR)return i.LUMINANCE_ALPHA;if(n===So)return i.DEPTH_COMPONENT;if(n===za)return i.DEPTH_STENCIL;if(n===d0)return i.RED;if(n===p0)return i.RED_INTEGER;if(n===xR)return i.RG;if(n===m0)return i.RG_INTEGER;if(n===g0)return i.RGBA_INTEGER;if(n===bf||n===wf||n===Rf||n===Cf)if(a===Gt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===bf)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wf)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rf)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cf)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===bf)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wf)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rf)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cf)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sg||n===Eg||n===Tg||n===Ag)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Sg)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eg)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tg)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ag)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_0)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===bg||n===wg)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===bg)return a===Gt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===wg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rg||n===Cg||n===Pg||n===Lg||n===Ig||n===Ng||n===Dg||n===Ug||n===Og||n===Fg||n===Bg||n===zg||n===Hg||n===Vg)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Rg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ig)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ng)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Dg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ug)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Og)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vg)return a===Gt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pf||n===Gg||n===kg)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Pf)return a===Gt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gg)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kg)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yR||n===Wg||n===Xg||n===qg)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Pf)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Wg)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xg)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qg)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qa?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class $N extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Es extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ZN={type:"move"};class nh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Es,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Es,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Es,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,a=null;const c=this._targetRay,u=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){a=!0;for(const T of e.hand.values()){const x=t.getJointPose(T,n),v=this._getHandJoint(f,T);x!==null&&(v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=x.radius),v.visible=x!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=d.position.distanceTo(p.position),_=.02,y=.005;f.inputState.pinching&&m>_+y?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=_-y&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(ZN)))}return c!==null&&(c.visible=r!==null),u!==null&&(u.visible=o!==null),f!==null&&(f.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Es;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const JN=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jN=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class QN{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new fn,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,r=new Jr({vertexShader:JN,fragmentShader:jN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new En(new tu(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class eD extends zo{constructor(e,t){super();const n=this;let r=null,o=1,a=null,c="local-floor",u=1,f=null,d=null,p=null,m=null,_=null,y=null;const T=new QN,x=t.getContextAttributes();let v=null,N=null;const S=[],P=[],q=new Pe;let O=null;const U=new In;U.layers.enable(1),U.viewport=new Ut;const J=new In;J.layers.enable(2),J.viewport=new Ut;const I=[U,J],b=new $N;b.layers.enable(1),b.layers.enable(2);let j=null,pe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let Ae=S[ce];return Ae===void 0&&(Ae=new nh,S[ce]=Ae),Ae.getTargetRaySpace()},this.getControllerGrip=function(ce){let Ae=S[ce];return Ae===void 0&&(Ae=new nh,S[ce]=Ae),Ae.getGripSpace()},this.getHand=function(ce){let Ae=S[ce];return Ae===void 0&&(Ae=new nh,S[ce]=Ae),Ae.getHandSpace()};function $(ce){const Ae=P.indexOf(ce.inputSource);if(Ae===-1)return;const Ie=S[Ae];Ie!==void 0&&(Ie.update(ce.inputSource,ce.frame,f||a),Ie.dispatchEvent({type:ce.type,data:ce.inputSource}))}function le(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",le),r.removeEventListener("inputsourceschange",de);for(let ce=0;ce<S.length;ce++){const Ae=P[ce];Ae!==null&&(P[ce]=null,S[ce].disconnect(Ae))}j=null,pe=null,T.reset(),e.setRenderTarget(v),_=null,m=null,p=null,r=null,N=null,Et.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(q.width,q.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){o=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){c=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||a},this.setReferenceSpace=function(ce){f=ce},this.getBaseLayer=function(){return m!==null?m:_},this.getBinding=function(){return p},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(ce){if(r=ce,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",le),r.addEventListener("inputsourceschange",de),x.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(q),r.renderState.layers===void 0){const Ae={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};_=new XRWebGLLayer(r,t,Ae),r.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),N=new ws(_.framebufferWidth,_.framebufferHeight,{format:Ai,type:$r,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Ae=null,Ie=null,be=null;x.depth&&(be=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=x.stencil?za:So,Ie=x.stencil?qa:Io);const ke={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:o};p=new XRWebGLBinding(r,t),m=p.createProjectionLayer(ke),r.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),N=new ws(m.textureWidth,m.textureHeight,{format:Ai,type:$r,depthTexture:new N0(m.textureWidth,m.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Je=e.properties.get(N);Je.__ignoreDepthValues=m.ignoreDepthValues}N.isXRRenderTarget=!0,this.setFoveation(u),f=null,a=await r.requestReferenceSpace(c),Et.setContext(r),Et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function de(ce){for(let Ae=0;Ae<ce.removed.length;Ae++){const Ie=ce.removed[Ae],be=P.indexOf(Ie);be>=0&&(P[be]=null,S[be].disconnect(Ie))}for(let Ae=0;Ae<ce.added.length;Ae++){const Ie=ce.added[Ae];let be=P.indexOf(Ie);if(be===-1){for(let Je=0;Je<S.length;Je++)if(Je>=P.length){P.push(Ie),be=Je;break}else if(P[Je]===null){P[Je]=Ie,be=Je;break}if(be===-1)break}const ke=S[be];ke&&ke.connect(Ie)}}const xe=new X,fe=new X;function te(ce,Ae,Ie){xe.setFromMatrixPosition(Ae.matrixWorld),fe.setFromMatrixPosition(Ie.matrixWorld);const be=xe.distanceTo(fe),ke=Ae.projectionMatrix.elements,Je=Ie.projectionMatrix.elements,Ke=ke[14]/(ke[10]-1),Q=ke[14]/(ke[10]+1),me=(ke[9]+1)/ke[5],R=(ke[9]-1)/ke[5],D=(ke[8]-1)/ke[0],H=(Je[8]+1)/Je[0],K=Ke*D,A=Ke*H,M=be/(-D+H),z=M*-D;Ae.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(z),ce.translateZ(M),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert();const V=Ke+M,k=Q+M,W=K-z,ue=A+(be-z),ne=me*Q/k*V,ge=R*Q/k*V;ce.projectionMatrix.makePerspective(W,ue,ne,ge,V,k),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}function Ee(ce,Ae){Ae===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(Ae.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(r===null)return;T.texture!==null&&(ce.near=T.depthNear,ce.far=T.depthFar),b.near=J.near=U.near=ce.near,b.far=J.far=U.far=ce.far,(j!==b.near||pe!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),j=b.near,pe=b.far,U.near=j,U.far=pe,J.near=j,J.far=pe,U.updateProjectionMatrix(),J.updateProjectionMatrix(),ce.updateProjectionMatrix());const Ae=ce.parent,Ie=b.cameras;Ee(b,Ae);for(let be=0;be<Ie.length;be++)Ee(Ie[be],Ae);Ie.length===2?te(b,U,J):b.projectionMatrix.copy(U.projectionMatrix),Se(ce,b,Ae)};function Se(ce,Ae,Ie){Ie===null?ce.matrix.copy(Ae.matrixWorld):(ce.matrix.copy(Ie.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(Ae.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(Ae.projectionMatrix),ce.projectionMatrixInverse.copy(Ae.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=Do*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(m===null&&_===null))return u},this.setFoveation=function(ce){u=ce,m!==null&&(m.fixedFoveation=ce),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=ce)},this.hasDepthSensing=function(){return T.texture!==null};let Re=null;function We(ce,Ae){if(d=Ae.getViewerPose(f||a),y=Ae,d!==null){const Ie=d.views;_!==null&&(e.setRenderTargetFramebuffer(N,_.framebuffer),e.setRenderTarget(N));let be=!1;Ie.length!==b.cameras.length&&(b.cameras.length=0,be=!0);for(let Je=0;Je<Ie.length;Je++){const Ke=Ie[Je];let Q=null;if(_!==null)Q=_.getViewport(Ke);else{const R=p.getViewSubImage(m,Ke);Q=R.viewport,Je===0&&(e.setRenderTargetTextures(N,R.colorTexture,m.ignoreDepthValues?void 0:R.depthStencilTexture),e.setRenderTarget(N))}let me=I[Je];me===void 0&&(me=new In,me.layers.enable(Je),me.viewport=new Ut,I[Je]=me),me.matrix.fromArray(Ke.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Ke.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Q.x,Q.y,Q.width,Q.height),Je===0&&(b.matrix.copy(me.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),be===!0&&b.cameras.push(me)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")){const Je=p.getDepthInformation(Ie[0]);Je&&Je.isValid&&Je.texture&&T.init(e,Je,r.renderState)}}for(let Ie=0;Ie<S.length;Ie++){const be=P[Ie],ke=S[Ie];be!==null&&ke!==void 0&&ke.update(be,Ae,f||a)}T.render(e,b),Re&&Re(ce,Ae),Ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ae}),y=null}const Et=new I0;Et.setAnimationLoop(We),this.setAnimationLoop=function(ce){Re=ce},this.dispose=function(){}}}const gs=new ki,tD=new ct;function nD(i,e){function t(x,v){x.matrixAutoUpdate===!0&&x.updateMatrix(),v.value.copy(x.matrix)}function n(x,v){v.color.getRGB(x.fogColor.value,C0(i)),v.isFog?(x.fogNear.value=v.near,x.fogFar.value=v.far):v.isFogExp2&&(x.fogDensity.value=v.density)}function r(x,v,N,S,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(x,v):v.isMeshToonMaterial?(o(x,v),p(x,v)):v.isMeshPhongMaterial?(o(x,v),d(x,v)):v.isMeshStandardMaterial?(o(x,v),m(x,v),v.isMeshPhysicalMaterial&&_(x,v,P)):v.isMeshMatcapMaterial?(o(x,v),y(x,v)):v.isMeshDepthMaterial?o(x,v):v.isMeshDistanceMaterial?(o(x,v),T(x,v)):v.isMeshNormalMaterial?o(x,v):v.isLineBasicMaterial?(a(x,v),v.isLineDashedMaterial&&c(x,v)):v.isPointsMaterial?u(x,v,N,S):v.isSpriteMaterial?f(x,v):v.isShadowMaterial?(x.color.value.copy(v.color),x.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(x,v){x.opacity.value=v.opacity,v.color&&x.diffuse.value.copy(v.color),v.emissive&&x.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(x.map.value=v.map,t(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.bumpMap&&(x.bumpMap.value=v.bumpMap,t(v.bumpMap,x.bumpMapTransform),x.bumpScale.value=v.bumpScale,v.side===Vn&&(x.bumpScale.value*=-1)),v.normalMap&&(x.normalMap.value=v.normalMap,t(v.normalMap,x.normalMapTransform),x.normalScale.value.copy(v.normalScale),v.side===Vn&&x.normalScale.value.negate()),v.displacementMap&&(x.displacementMap.value=v.displacementMap,t(v.displacementMap,x.displacementMapTransform),x.displacementScale.value=v.displacementScale,x.displacementBias.value=v.displacementBias),v.emissiveMap&&(x.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,x.emissiveMapTransform)),v.specularMap&&(x.specularMap.value=v.specularMap,t(v.specularMap,x.specularMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest);const N=e.get(v),S=N.envMap,P=N.envMapRotation;if(S&&(x.envMap.value=S,gs.copy(P),gs.x*=-1,gs.y*=-1,gs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),x.envMapRotation.value.setFromMatrix4(tD.makeRotationFromEuler(gs)),x.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=v.reflectivity,x.ior.value=v.ior,x.refractionRatio.value=v.refractionRatio),v.lightMap){x.lightMap.value=v.lightMap;const q=i._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=v.lightMapIntensity*q,t(v.lightMap,x.lightMapTransform)}v.aoMap&&(x.aoMap.value=v.aoMap,x.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,x.aoMapTransform))}function a(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,v.map&&(x.map.value=v.map,t(v.map,x.mapTransform))}function c(x,v){x.dashSize.value=v.dashSize,x.totalSize.value=v.dashSize+v.gapSize,x.scale.value=v.scale}function u(x,v,N,S){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.size.value=v.size*N,x.scale.value=S*.5,v.map&&(x.map.value=v.map,t(v.map,x.uvTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function f(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.rotation.value=v.rotation,v.map&&(x.map.value=v.map,t(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,t(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function d(x,v){x.specular.value.copy(v.specular),x.shininess.value=Math.max(v.shininess,1e-4)}function p(x,v){v.gradientMap&&(x.gradientMap.value=v.gradientMap)}function m(x,v){x.metalness.value=v.metalness,v.metalnessMap&&(x.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,x.metalnessMapTransform)),x.roughness.value=v.roughness,v.roughnessMap&&(x.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,x.roughnessMapTransform)),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)}function _(x,v,N){x.ior.value=v.ior,v.sheen>0&&(x.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),x.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(x.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,x.sheenColorMapTransform)),v.sheenRoughnessMap&&(x.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,x.sheenRoughnessMapTransform))),v.clearcoat>0&&(x.clearcoat.value=v.clearcoat,x.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(x.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,x.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(x.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Vn&&x.clearcoatNormalScale.value.negate())),v.iridescence>0&&(x.iridescence.value=v.iridescence,x.iridescenceIOR.value=v.iridescenceIOR,x.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(x.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,x.iridescenceMapTransform)),v.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),v.transmission>0&&(x.transmission.value=v.transmission,x.transmissionSamplerMap.value=N.texture,x.transmissionSamplerSize.value.set(N.width,N.height),v.transmissionMap&&(x.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,x.transmissionMapTransform)),x.thickness.value=v.thickness,v.thicknessMap&&(x.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=v.attenuationDistance,x.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(x.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(x.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=v.specularIntensity,x.specularColor.value.copy(v.specularColor),v.specularColorMap&&(x.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,x.specularColorMapTransform)),v.specularIntensityMap&&(x.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,x.specularIntensityMapTransform))}function y(x,v){v.matcap&&(x.matcap.value=v.matcap)}function T(x,v){const N=e.get(v).light;x.referencePosition.value.setFromMatrixPosition(N.matrixWorld),x.nearDistance.value=N.shadow.camera.near,x.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function iD(i,e,t,n){let r={},o={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function u(N,S){const P=S.program;n.uniformBlockBinding(N,P)}function f(N,S){let P=r[N.id];P===void 0&&(y(N),P=d(N),r[N.id]=P,N.addEventListener("dispose",x));const q=S.program;n.updateUBOMapping(N,q);const O=e.render.frame;o[N.id]!==O&&(m(N),o[N.id]=O)}function d(N){const S=p();N.__bindingPointIndex=S;const P=i.createBuffer(),q=N.__size,O=N.usage;return i.bindBuffer(i.UNIFORM_BUFFER,P),i.bufferData(i.UNIFORM_BUFFER,q,O),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,P),P}function p(){for(let N=0;N<c;N++)if(a.indexOf(N)===-1)return a.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(N){const S=r[N.id],P=N.uniforms,q=N.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let O=0,U=P.length;O<U;O++){const J=Array.isArray(P[O])?P[O]:[P[O]];for(let I=0,b=J.length;I<b;I++){const j=J[I];if(_(j,O,I,q)===!0){const pe=j.__offset,$=Array.isArray(j.value)?j.value:[j.value];let le=0;for(let de=0;de<$.length;de++){const xe=$[de],fe=T(xe);typeof xe=="number"||typeof xe=="boolean"?(j.__data[0]=xe,i.bufferSubData(i.UNIFORM_BUFFER,pe+le,j.__data)):xe.isMatrix3?(j.__data[0]=xe.elements[0],j.__data[1]=xe.elements[1],j.__data[2]=xe.elements[2],j.__data[3]=0,j.__data[4]=xe.elements[3],j.__data[5]=xe.elements[4],j.__data[6]=xe.elements[5],j.__data[7]=0,j.__data[8]=xe.elements[6],j.__data[9]=xe.elements[7],j.__data[10]=xe.elements[8],j.__data[11]=0):(xe.toArray(j.__data,le),le+=fe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,pe,j.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function _(N,S,P,q){const O=N.value,U=S+"_"+P;if(q[U]===void 0)return typeof O=="number"||typeof O=="boolean"?q[U]=O:q[U]=O.clone(),!0;{const J=q[U];if(typeof O=="number"||typeof O=="boolean"){if(J!==O)return q[U]=O,!0}else if(J.equals(O)===!1)return J.copy(O),!0}return!1}function y(N){const S=N.uniforms;let P=0;const q=16;for(let U=0,J=S.length;U<J;U++){const I=Array.isArray(S[U])?S[U]:[S[U]];for(let b=0,j=I.length;b<j;b++){const pe=I[b],$=Array.isArray(pe.value)?pe.value:[pe.value];for(let le=0,de=$.length;le<de;le++){const xe=$[le],fe=T(xe),te=P%q;te!==0&&q-te<fe.boundary&&(P+=q-te),pe.__data=new Float32Array(fe.storage/Float32Array.BYTES_PER_ELEMENT),pe.__offset=P,P+=fe.storage}}}const O=P%q;return O>0&&(P+=q-O),N.__size=P,N.__cache={},this}function T(N){const S={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(S.boundary=4,S.storage=4):N.isVector2?(S.boundary=8,S.storage=8):N.isVector3||N.isColor?(S.boundary=16,S.storage=12):N.isVector4?(S.boundary=16,S.storage=16):N.isMatrix3?(S.boundary=48,S.storage=48):N.isMatrix4?(S.boundary=64,S.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),S}function x(N){const S=N.target;S.removeEventListener("dispose",x);const P=a.indexOf(S.__bindingPointIndex);a.splice(P,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete o[S.id]}function v(){for(const N in r)i.deleteBuffer(r[N]);a=[],r={},o={}}return{bind:u,update:f,dispose:v}}class rD{constructor(e={}){const{canvas:t=ZR(),context:n=null,depth:r=!0,stencil:o=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const _=new Uint32Array(4),y=new Int32Array(4);let T=null,x=null;const v=[],N=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ln,this._useLegacyLights=!1,this.toneMapping=Yr,this.toneMappingExposure=1;const S=this;let P=!1,q=0,O=0,U=null,J=-1,I=null;const b=new Ut,j=new Ut;let pe=null;const $=new it(0);let le=0,de=t.width,xe=t.height,fe=1,te=null,Ee=null;const Se=new Ut(0,0,de,xe),Re=new Ut(0,0,de,xe);let We=!1;const Et=new ud;let ce=!1,Ae=!1;const Ie=new ct,be=new Pe,ke=new X,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ke(){return U===null?fe:1}let Q=n;function me(L,ee){const se=t.getContext(L,ee);return se!==null?se:null}try{const L={alpha:!0,depth:r,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ad}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",Ge,!1),Q===null){const ee="webgl2";if(Q=me(ee,L),Q===null)throw me(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let R,D,H,K,A,M,z,V,k,W,ue,ne,ge,Te,he,Me,Oe,we,Ne,et,ut,mt,vt,ot;function Be(){R=new hI(Q),R.init(),D=new oI(Q,R,e),mt=new YN(Q,R),H=new qN(Q),K=new mI(Q),A=new IN,M=new KN(Q,R,H,A,D,mt,K),z=new lI(S),V=new fI(S),k=new MC(Q),vt=new rI(Q,k),W=new dI(Q,k,K,vt),ue=new _I(Q,W,k,K),Ne=new gI(Q,D,M),Me=new aI(A),ne=new LN(S,z,V,R,D,vt,Me),ge=new nD(S,A),Te=new DN,he=new HN(R),we=new iI(S,z,V,H,ue,m,u),Oe=new XN(S,ue,D),ot=new iD(Q,K,D,H),et=new sI(Q,R,K),ut=new pI(Q,R,K),K.programs=ne.programs,S.capabilities=D,S.extensions=R,S.properties=A,S.renderLists=Te,S.shadowMap=Oe,S.state=H,S.info=K}Be();const B=new eD(S,Q);this.xr=B,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const L=R.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=R.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(L){L!==void 0&&(fe=L,this.setSize(de,xe,!1))},this.getSize=function(L){return L.set(de,xe)},this.setSize=function(L,ee,se=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}de=L,xe=ee,t.width=Math.floor(L*fe),t.height=Math.floor(ee*fe),se===!0&&(t.style.width=L+"px",t.style.height=ee+"px"),this.setViewport(0,0,L,ee)},this.getDrawingBufferSize=function(L){return L.set(de*fe,xe*fe).floor()},this.setDrawingBufferSize=function(L,ee,se){de=L,xe=ee,fe=se,t.width=Math.floor(L*se),t.height=Math.floor(ee*se),this.setViewport(0,0,L,ee)},this.getCurrentViewport=function(L){return L.copy(b)},this.getViewport=function(L){return L.copy(Se)},this.setViewport=function(L,ee,se,oe){L.isVector4?Se.set(L.x,L.y,L.z,L.w):Se.set(L,ee,se,oe),H.viewport(b.copy(Se).multiplyScalar(fe).round())},this.getScissor=function(L){return L.copy(Re)},this.setScissor=function(L,ee,se,oe){L.isVector4?Re.set(L.x,L.y,L.z,L.w):Re.set(L,ee,se,oe),H.scissor(j.copy(Re).multiplyScalar(fe).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(L){H.setScissorTest(We=L)},this.setOpaqueSort=function(L){te=L},this.setTransparentSort=function(L){Ee=L},this.getClearColor=function(L){return L.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(L=!0,ee=!0,se=!0){let oe=0;if(L){let ie=!1;if(U!==null){const Fe=U.texture.format;ie=Fe===g0||Fe===m0||Fe===p0}if(ie){const Fe=U.texture.type,Ve=Fe===$r||Fe===Io||Fe===c0||Fe===qa||Fe===f0||Fe===h0,qe=we.getClearColor(),je=we.getClearAlpha(),Qe=qe.r,tt=qe.g,rt=qe.b;Ve?(_[0]=Qe,_[1]=tt,_[2]=rt,_[3]=je,Q.clearBufferuiv(Q.COLOR,0,_)):(y[0]=Qe,y[1]=tt,y[2]=rt,y[3]=je,Q.clearBufferiv(Q.COLOR,0,y))}else oe|=Q.COLOR_BUFFER_BIT}ee&&(oe|=Q.DEPTH_BUFFER_BIT),se&&(oe|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",Ge,!1),Te.dispose(),he.dispose(),A.dispose(),z.dispose(),V.dispose(),ue.dispose(),vt.dispose(),ot.dispose(),ne.dispose(),B.dispose(),B.removeEventListener("sessionstart",Qn),B.removeEventListener("sessionend",ei),Ki.stop()};function Le(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const L=K.autoReset,ee=Oe.enabled,se=Oe.autoUpdate,oe=Oe.needsUpdate,ie=Oe.type;Be(),K.autoReset=L,Oe.enabled=ee,Oe.autoUpdate=se,Oe.needsUpdate=oe,Oe.type=ie}function Ge(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Xe(L){const ee=L.target;ee.removeEventListener("dispose",Xe),It(ee)}function It(L){Ot(L),A.remove(L)}function Ot(L){const ee=A.get(L).programs;ee!==void 0&&(ee.forEach(function(se){ne.releaseProgram(se)}),L.isShaderMaterial&&ne.releaseShaderCache(L))}this.renderBufferDirect=function(L,ee,se,oe,ie,Fe){ee===null&&(ee=Je);const Ve=ie.isMesh&&ie.matrixWorld.determinant()<0,qe=ru(L,ee,se,oe,ie);H.setMaterial(oe,Ve);let je=se.index,Qe=1;if(oe.wireframe===!0){if(je=W.getWireframeAttribute(se),je===void 0)return;Qe=2}const tt=se.drawRange,rt=se.attributes.position;let Xt=tt.start*Qe,_n=(tt.start+tt.count)*Qe;Fe!==null&&(Xt=Math.max(Xt,Fe.start*Qe),_n=Math.min(_n,(Fe.start+Fe.count)*Qe)),je!==null?(Xt=Math.max(Xt,0),_n=Math.min(_n,je.count)):rt!=null&&(Xt=Math.max(Xt,0),_n=Math.min(_n,rt.count));const Zt=_n-Xt;if(Zt<0||Zt===1/0)return;vt.setup(ie,oe,qe,se,je);let ti,Ht=et;if(je!==null&&(ti=k.get(je),Ht=ut,Ht.setIndex(ti)),ie.isMesh)oe.wireframe===!0?(H.setLineWidth(oe.wireframeLinewidth*Ke()),Ht.setMode(Q.LINES)):Ht.setMode(Q.TRIANGLES);else if(ie.isLine){let at=oe.linewidth;at===void 0&&(at=1),H.setLineWidth(at*Ke()),ie.isLineSegments?Ht.setMode(Q.LINES):ie.isLineLoop?Ht.setMode(Q.LINE_LOOP):Ht.setMode(Q.LINE_STRIP)}else ie.isPoints?Ht.setMode(Q.POINTS):ie.isSprite&&Ht.setMode(Q.TRIANGLES);if(ie.isBatchedMesh)Ht.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else if(ie.isInstancedMesh)Ht.renderInstances(Xt,Zt,ie.count);else if(se.isInstancedBufferGeometry){const at=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Xo=Math.min(se.instanceCount,at);Ht.renderInstances(Xt,Zt,Xo)}else Ht.render(Xt,Zt)};function zt(L,ee,se){L.transparent===!0&&L.side===Fi&&L.forceSinglePass===!1?(L.side=Vn,L.needsUpdate=!0,Us(L,ee,se),L.side=pr,L.needsUpdate=!0,Us(L,ee,se),L.side=Fi):Us(L,ee,se)}this.compile=function(L,ee,se=null){se===null&&(se=L),x=he.get(se),x.init(),N.push(x),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(ee.layers)&&(x.pushLight(ie),ie.castShadow&&x.pushShadow(ie))}),L!==se&&L.traverseVisible(function(ie){ie.isLight&&ie.layers.test(ee.layers)&&(x.pushLight(ie),ie.castShadow&&x.pushShadow(ie))}),x.setupLights(S._useLegacyLights);const oe=new Set;return L.traverse(function(ie){const Fe=ie.material;if(Fe)if(Array.isArray(Fe))for(let Ve=0;Ve<Fe.length;Ve++){const qe=Fe[Ve];zt(qe,se,ie),oe.add(qe)}else zt(Fe,se,ie),oe.add(Fe)}),N.pop(),x=null,oe},this.compileAsync=function(L,ee,se=null){const oe=this.compile(L,ee,se);return new Promise(ie=>{function Fe(){if(oe.forEach(function(Ve){A.get(Ve).currentProgram.isReady()&&oe.delete(Ve)}),oe.size===0){ie(L);return}setTimeout(Fe,10)}R.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let on=null;function Nt(L){on&&on(L)}function Qn(){Ki.stop()}function ei(){Ki.start()}const Ki=new I0;Ki.setAnimationLoop(Nt),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(L){on=L,B.setAnimationLoop(L),L===null?Ki.stop():Ki.start()},B.addEventListener("sessionstart",Qn),B.addEventListener("sessionend",ei),this.render=function(L,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(ee),ee=B.getCamera()),L.isScene===!0&&L.onBeforeRender(S,L,ee,U),x=he.get(L,N.length),x.init(),N.push(x),Ie.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),Et.setFromProjectionMatrix(Ie),Ae=this.localClippingEnabled,ce=Me.init(this.clippingPlanes,Ae),T=Te.get(L,v.length),T.init(),v.push(T),Ns(L,ee,0,S.sortObjects),T.finish(),S.sortObjects===!0&&T.sort(te,Ee),this.info.render.frame++,ce===!0&&Me.beginShadows();const se=x.state.shadowsArray;if(Oe.render(se,L,ee),ce===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1)&&we.render(T,L),x.setupLights(S._useLegacyLights),ee.isArrayCamera){const oe=ee.cameras;for(let ie=0,Fe=oe.length;ie<Fe;ie++){const Ve=oe[ie];Ya(T,L,Ve,Ve.viewport)}}else Ya(T,L,ee);U!==null&&(M.updateMultisampleRenderTarget(U),M.updateRenderTargetMipmap(U)),L.isScene===!0&&L.onAfterRender(S,L,ee),vt.resetDefaultState(),J=-1,I=null,N.pop(),N.length>0?x=N[N.length-1]:x=null,v.pop(),v.length>0?T=v[v.length-1]:T=null};function Ns(L,ee,se,oe){if(L.visible===!1)return;if(L.layers.test(ee.layers)){if(L.isGroup)se=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(ee);else if(L.isLight)x.pushLight(L),L.castShadow&&x.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||Et.intersectsSprite(L)){oe&&ke.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Ie);const Ve=ue.update(L),qe=L.material;qe.visible&&T.push(L,Ve,qe,se,ke.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||Et.intersectsObject(L))){const Ve=ue.update(L),qe=L.material;if(oe&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),ke.copy(L.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),ke.copy(Ve.boundingSphere.center)),ke.applyMatrix4(L.matrixWorld).applyMatrix4(Ie)),Array.isArray(qe)){const je=Ve.groups;for(let Qe=0,tt=je.length;Qe<tt;Qe++){const rt=je[Qe],Xt=qe[rt.materialIndex];Xt&&Xt.visible&&T.push(L,Ve,Xt,se,ke.z,rt)}}else qe.visible&&T.push(L,Ve,qe,se,ke.z,null)}}const Fe=L.children;for(let Ve=0,qe=Fe.length;Ve<qe;Ve++)Ns(Fe[Ve],ee,se,oe)}function Ya(L,ee,se,oe){const ie=L.opaque,Fe=L.transmissive,Ve=L.transparent;x.setupLightsView(se),ce===!0&&Me.setGlobalState(S.clippingPlanes,se),Fe.length>0&&Wo(ie,Fe,ee,se),oe&&H.viewport(b.copy(oe)),ie.length>0&&Ds(ie,ee,se),Fe.length>0&&Ds(Fe,ee,se),Ve.length>0&&Ds(Ve,ee,se),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function Wo(L,ee,se,oe){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget===null){x.state.transmissionRenderTarget=new ws(1,1,{generateMipmaps:!0,type:R.has("EXT_color_buffer_half_float")||R.has("EXT_color_buffer_float")?Uc:$r,minFilter:fr,samples:4,stencilBuffer:o});const Qe=A.get(x.state.transmissionRenderTarget);Qe.__isTransmissionRenderTarget=!0}const Fe=x.state.transmissionRenderTarget;S.getDrawingBufferSize(be),Fe.setSize(be.x,be.y);const Ve=S.getRenderTarget();S.setRenderTarget(Fe),S.getClearColor($),le=S.getClearAlpha(),le<1&&S.setClearColor(16777215,.5),S.clear();const qe=S.toneMapping;S.toneMapping=Yr,Ds(L,se,oe),M.updateMultisampleRenderTarget(Fe),M.updateRenderTargetMipmap(Fe);let je=!1;for(let Qe=0,tt=ee.length;Qe<tt;Qe++){const rt=ee[Qe],Xt=rt.object,_n=rt.geometry,Zt=rt.material,ti=rt.group;if(Zt.side===Fi&&Xt.layers.test(oe.layers)){const Ht=Zt.side;Zt.side=Vn,Zt.needsUpdate=!0,$a(Xt,se,oe,_n,Zt,ti),Zt.side=Ht,Zt.needsUpdate=!0,je=!0}}je===!0&&(M.updateMultisampleRenderTarget(Fe),M.updateRenderTargetMipmap(Fe)),S.setRenderTarget(Ve),S.setClearColor($,le),S.toneMapping=qe}function Ds(L,ee,se){const oe=ee.isScene===!0?ee.overrideMaterial:null;for(let ie=0,Fe=L.length;ie<Fe;ie++){const Ve=L[ie],qe=Ve.object,je=Ve.geometry,Qe=oe===null?Ve.material:oe,tt=Ve.group;qe.layers.test(se.layers)&&$a(qe,ee,se,je,Qe,tt)}}function $a(L,ee,se,oe,ie,Fe){L.onBeforeRender(S,ee,se,oe,ie,Fe),L.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),ie.onBeforeRender(S,ee,se,oe,L,Fe),ie.transparent===!0&&ie.side===Fi&&ie.forceSinglePass===!1?(ie.side=Vn,ie.needsUpdate=!0,S.renderBufferDirect(se,ee,oe,ie,L,Fe),ie.side=pr,ie.needsUpdate=!0,S.renderBufferDirect(se,ee,oe,ie,L,Fe),ie.side=Fi):S.renderBufferDirect(se,ee,oe,ie,L,Fe),L.onAfterRender(S,ee,se,oe,ie,Fe)}function Us(L,ee,se){ee.isScene!==!0&&(ee=Je);const oe=A.get(L),ie=x.state.lights,Fe=x.state.shadowsArray,Ve=ie.state.version,qe=ne.getParameters(L,ie.state,Fe,ee,se),je=ne.getProgramCacheKey(qe);let Qe=oe.programs;oe.environment=L.isMeshStandardMaterial?ee.environment:null,oe.fog=ee.fog,oe.envMap=(L.isMeshStandardMaterial?V:z).get(L.envMap||oe.environment),oe.envMapRotation=oe.environment!==null&&L.envMap===null?ee.environmentRotation:L.envMapRotation,Qe===void 0&&(L.addEventListener("dispose",Xe),Qe=new Map,oe.programs=Qe);let tt=Qe.get(je);if(tt!==void 0){if(oe.currentProgram===tt&&oe.lightsStateVersion===Ve)return Ja(L,qe),tt}else qe.uniforms=ne.getUniforms(L),L.onBuild(se,qe,S),L.onBeforeCompile(qe,S),tt=ne.acquireProgram(qe,je),Qe.set(je,tt),oe.uniforms=qe.uniforms;const rt=oe.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(rt.clippingPlanes=Me.uniform),Ja(L,qe),oe.needsLights=ou(L),oe.lightsStateVersion=Ve,oe.needsLights&&(rt.ambientLightColor.value=ie.state.ambient,rt.lightProbe.value=ie.state.probe,rt.directionalLights.value=ie.state.directional,rt.directionalLightShadows.value=ie.state.directionalShadow,rt.spotLights.value=ie.state.spot,rt.spotLightShadows.value=ie.state.spotShadow,rt.rectAreaLights.value=ie.state.rectArea,rt.ltc_1.value=ie.state.rectAreaLTC1,rt.ltc_2.value=ie.state.rectAreaLTC2,rt.pointLights.value=ie.state.point,rt.pointLightShadows.value=ie.state.pointShadow,rt.hemisphereLights.value=ie.state.hemi,rt.directionalShadowMap.value=ie.state.directionalShadowMap,rt.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,rt.spotShadowMap.value=ie.state.spotShadowMap,rt.spotLightMatrix.value=ie.state.spotLightMatrix,rt.spotLightMap.value=ie.state.spotLightMap,rt.pointShadowMap.value=ie.state.pointShadowMap,rt.pointShadowMatrix.value=ie.state.pointShadowMatrix),oe.currentProgram=tt,oe.uniformsList=null,tt}function Za(L){if(L.uniformsList===null){const ee=L.currentProgram.getUniforms();L.uniformsList=bc.seqWithValue(ee.seq,L.uniforms)}return L.uniformsList}function Ja(L,ee){const se=A.get(L);se.outputColorSpace=ee.outputColorSpace,se.batching=ee.batching,se.instancing=ee.instancing,se.instancingColor=ee.instancingColor,se.instancingMorph=ee.instancingMorph,se.skinning=ee.skinning,se.morphTargets=ee.morphTargets,se.morphNormals=ee.morphNormals,se.morphColors=ee.morphColors,se.morphTargetsCount=ee.morphTargetsCount,se.numClippingPlanes=ee.numClippingPlanes,se.numIntersection=ee.numClipIntersection,se.vertexAlphas=ee.vertexAlphas,se.vertexTangents=ee.vertexTangents,se.toneMapping=ee.toneMapping}function ru(L,ee,se,oe,ie){ee.isScene!==!0&&(ee=Je),M.resetTextureUnits();const Fe=ee.fog,Ve=oe.isMeshStandardMaterial?ee.environment:null,qe=U===null?S.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:gn,je=(oe.isMeshStandardMaterial?V:z).get(oe.envMap||Ve),Qe=oe.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,tt=!!se.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),rt=!!se.morphAttributes.position,Xt=!!se.morphAttributes.normal,_n=!!se.morphAttributes.color;let Zt=Yr;oe.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Zt=S.toneMapping);const ti=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Ht=ti!==void 0?ti.length:0,at=A.get(oe),Xo=x.state.lights;if(ce===!0&&(Ae===!0||L!==I)){const Tn=L===I&&oe.id===J;Me.setState(oe,L,Tn)}let Ft=!1;oe.version===at.__version?(at.needsLights&&at.lightsStateVersion!==Xo.state.version||at.outputColorSpace!==qe||ie.isBatchedMesh&&at.batching===!1||!ie.isBatchedMesh&&at.batching===!0||ie.isInstancedMesh&&at.instancing===!1||!ie.isInstancedMesh&&at.instancing===!0||ie.isSkinnedMesh&&at.skinning===!1||!ie.isSkinnedMesh&&at.skinning===!0||ie.isInstancedMesh&&at.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&at.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&at.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&at.instancingMorph===!1&&ie.morphTexture!==null||at.envMap!==je||oe.fog===!0&&at.fog!==Fe||at.numClippingPlanes!==void 0&&(at.numClippingPlanes!==Me.numPlanes||at.numIntersection!==Me.numIntersection)||at.vertexAlphas!==Qe||at.vertexTangents!==tt||at.morphTargets!==rt||at.morphNormals!==Xt||at.morphColors!==_n||at.toneMapping!==Zt||at.morphTargetsCount!==Ht)&&(Ft=!0):(Ft=!0,at.__version=oe.version);let Ci=at.currentProgram;Ft===!0&&(Ci=Us(oe,ee,ie));let qo=!1,vr=!1,Qr=!1;const an=Ci.getUniforms(),pi=at.uniforms;if(H.useProgram(Ci.program)&&(qo=!0,vr=!0,Qr=!0),oe.id!==J&&(J=oe.id,vr=!0),qo||I!==L){an.setValue(Q,"projectionMatrix",L.projectionMatrix),an.setValue(Q,"viewMatrix",L.matrixWorldInverse);const Tn=an.map.cameraPosition;Tn!==void 0&&Tn.setValue(Q,ke.setFromMatrixPosition(L.matrixWorld)),D.logarithmicDepthBuffer&&an.setValue(Q,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&an.setValue(Q,"isOrthographic",L.isOrthographicCamera===!0),I!==L&&(I=L,vr=!0,Qr=!0)}if(ie.isSkinnedMesh){an.setOptional(Q,ie,"bindMatrix"),an.setOptional(Q,ie,"bindMatrixInverse");const Tn=ie.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),an.setValue(Q,"boneTexture",Tn.boneTexture,M))}ie.isBatchedMesh&&(an.setOptional(Q,ie,"batchingTexture"),an.setValue(Q,"batchingTexture",ie._matricesTexture,M));const xr=se.morphAttributes;if((xr.position!==void 0||xr.normal!==void 0||xr.color!==void 0)&&Ne.update(ie,se,Ci),(vr||at.receiveShadow!==ie.receiveShadow)&&(at.receiveShadow=ie.receiveShadow,an.setValue(Q,"receiveShadow",ie.receiveShadow)),oe.isMeshGouraudMaterial&&oe.envMap!==null&&(pi.envMap.value=je,pi.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),oe.isMeshStandardMaterial&&oe.envMap===null&&ee.environment!==null&&(pi.envMapIntensity.value=ee.environmentIntensity),vr&&(an.setValue(Q,"toneMappingExposure",S.toneMappingExposure),at.needsLights&&su(pi,Qr),Fe&&oe.fog===!0&&ge.refreshFogUniforms(pi,Fe),ge.refreshMaterialUniforms(pi,oe,fe,xe,x.state.transmissionRenderTarget),bc.upload(Q,Za(at),pi,M)),oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(bc.upload(Q,Za(at),pi,M),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&an.setValue(Q,"center",ie.center),an.setValue(Q,"modelViewMatrix",ie.modelViewMatrix),an.setValue(Q,"normalMatrix",ie.normalMatrix),an.setValue(Q,"modelMatrix",ie.matrixWorld),oe.isShaderMaterial||oe.isRawShaderMaterial){const Tn=oe.uniformsGroups;for(let Ko=0,ja=Tn.length;Ko<ja;Ko++){const Yo=Tn[Ko];ot.update(Yo,Ci),ot.bind(Yo,Ci)}}return Ci}function su(L,ee){L.ambientLightColor.needsUpdate=ee,L.lightProbe.needsUpdate=ee,L.directionalLights.needsUpdate=ee,L.directionalLightShadows.needsUpdate=ee,L.pointLights.needsUpdate=ee,L.pointLightShadows.needsUpdate=ee,L.spotLights.needsUpdate=ee,L.spotLightShadows.needsUpdate=ee,L.rectAreaLights.needsUpdate=ee,L.hemisphereLights.needsUpdate=ee}function ou(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(L,ee,se){A.get(L.texture).__webglTexture=ee,A.get(L.depthTexture).__webglTexture=se;const oe=A.get(L);oe.__hasExternalTextures=!0,oe.__autoAllocateDepthBuffer=se===void 0,oe.__autoAllocateDepthBuffer||R.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),oe.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,ee){const se=A.get(L);se.__webglFramebuffer=ee,se.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(L,ee=0,se=0){U=L,q=ee,O=se;let oe=!0,ie=null,Fe=!1,Ve=!1;if(L){const je=A.get(L);je.__useDefaultFramebuffer!==void 0?(H.bindFramebuffer(Q.FRAMEBUFFER,null),oe=!1):je.__webglFramebuffer===void 0?M.setupRenderTarget(L):je.__hasExternalTextures&&M.rebindTextures(L,A.get(L.texture).__webglTexture,A.get(L.depthTexture).__webglTexture);const Qe=L.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Ve=!0);const tt=A.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(tt[ee])?ie=tt[ee][se]:ie=tt[ee],Fe=!0):L.samples>0&&M.useMultisampledRTT(L)===!1?ie=A.get(L).__webglMultisampledFramebuffer:Array.isArray(tt)?ie=tt[se]:ie=tt,b.copy(L.viewport),j.copy(L.scissor),pe=L.scissorTest}else b.copy(Se).multiplyScalar(fe).floor(),j.copy(Re).multiplyScalar(fe).floor(),pe=We;if(H.bindFramebuffer(Q.FRAMEBUFFER,ie)&&oe&&H.drawBuffers(L,ie),H.viewport(b),H.scissor(j),H.setScissorTest(pe),Fe){const je=A.get(L.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+ee,je.__webglTexture,se)}else if(Ve){const je=A.get(L.texture),Qe=ee||0;Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,je.__webglTexture,se||0,Qe)}J=-1},this.readRenderTargetPixels=function(L,ee,se,oe,ie,Fe,Ve){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=A.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Ve!==void 0&&(qe=qe[Ve]),qe){H.bindFramebuffer(Q.FRAMEBUFFER,qe);try{const je=L.texture,Qe=je.format,tt=je.type;if(Qe!==Ai&&mt.convert(Qe)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const rt=tt===Uc&&(R.has("EXT_color_buffer_half_float")||R.has("EXT_color_buffer_float"));if(tt!==$r&&mt.convert(tt)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_TYPE)&&tt!==Hi&&!rt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=L.width-oe&&se>=0&&se<=L.height-ie&&Q.readPixels(ee,se,oe,ie,mt.convert(Qe),mt.convert(tt),Fe)}finally{const je=U!==null?A.get(U).__webglFramebuffer:null;H.bindFramebuffer(Q.FRAMEBUFFER,je)}}},this.copyFramebufferToTexture=function(L,ee,se=0){const oe=Math.pow(2,-se),ie=Math.floor(ee.image.width*oe),Fe=Math.floor(ee.image.height*oe);M.setTexture2D(ee,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,se,0,0,L.x,L.y,ie,Fe),H.unbindTexture()},this.copyTextureToTexture=function(L,ee,se,oe=0){const ie=ee.image.width,Fe=ee.image.height,Ve=mt.convert(se.format),qe=mt.convert(se.type);M.setTexture2D(se,0),Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,se.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,se.unpackAlignment),ee.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,oe,L.x,L.y,ie,Fe,Ve,qe,ee.image.data):ee.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,oe,L.x,L.y,ee.mipmaps[0].width,ee.mipmaps[0].height,Ve,ee.mipmaps[0].data):Q.texSubImage2D(Q.TEXTURE_2D,oe,L.x,L.y,Ve,qe,ee.image),oe===0&&se.generateMipmaps&&Q.generateMipmap(Q.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(L,ee,se,oe,ie=0){const Fe=Math.round(L.max.x-L.min.x),Ve=Math.round(L.max.y-L.min.y),qe=L.max.z-L.min.z+1,je=mt.convert(oe.format),Qe=mt.convert(oe.type);let tt;if(oe.isData3DTexture)M.setTexture3D(oe,0),tt=Q.TEXTURE_3D;else if(oe.isDataArrayTexture||oe.isCompressedArrayTexture)M.setTexture2DArray(oe,0),tt=Q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,oe.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,oe.unpackAlignment);const rt=Q.getParameter(Q.UNPACK_ROW_LENGTH),Xt=Q.getParameter(Q.UNPACK_IMAGE_HEIGHT),_n=Q.getParameter(Q.UNPACK_SKIP_PIXELS),Zt=Q.getParameter(Q.UNPACK_SKIP_ROWS),ti=Q.getParameter(Q.UNPACK_SKIP_IMAGES),Ht=se.isCompressedTexture?se.mipmaps[ie]:se.image;Q.pixelStorei(Q.UNPACK_ROW_LENGTH,Ht.width),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Ht.height),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,L.min.x),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,L.min.y),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,L.min.z),se.isDataTexture||se.isData3DTexture?Q.texSubImage3D(tt,ie,ee.x,ee.y,ee.z,Fe,Ve,qe,je,Qe,Ht.data):oe.isCompressedArrayTexture?Q.compressedTexSubImage3D(tt,ie,ee.x,ee.y,ee.z,Fe,Ve,qe,je,Ht.data):Q.texSubImage3D(tt,ie,ee.x,ee.y,ee.z,Fe,Ve,qe,je,Qe,Ht),Q.pixelStorei(Q.UNPACK_ROW_LENGTH,rt),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Xt),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,_n),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,Zt),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,ti),ie===0&&oe.generateMipmaps&&Q.generateMipmap(tt),H.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?M.setTextureCube(L,0):L.isData3DTexture?M.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?M.setTexture2DArray(L,0):M.setTexture2D(L,0),H.unbindTexture()},this.resetState=function(){q=0,O=0,U=null,H.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ld?"display-p3":"srgb",t.unpackColorSpace=Rt.workingColorSpace===Qc?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class sD extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class oD{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ph,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return S0("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Rn=new X;class dd{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.applyMatrix4(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.applyNormalMatrix(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rn.fromBufferAttribute(this,t),Rn.transformDirection(e),this.setXYZ(t,Rn.x,Rn.y,Rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),o=Pt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Un(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new dd(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const H_=new X,V_=new Ut,G_=new Ut,aD=new X,k_=new ct,fc=new X,ih=new Wi,W_=new ct,rh=new eu;class lD extends En{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Mg,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new gr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fc),this.boundingBox.expandByPoint(fc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fc),this.boundingSphere.expandByPoint(fc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ih.copy(this.boundingSphere),ih.applyMatrix4(r),e.ray.intersectsSphere(ih)!==!1&&(W_.copy(r).invert(),rh.copy(e.ray).applyMatrix4(W_),!(this.boundingBox!==null&&rh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,rh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ut,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Mg?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===fR?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;V_.fromBufferAttribute(r.attributes.skinIndex,e),G_.fromBufferAttribute(r.attributes.skinWeight,e),H_.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){const a=G_.getComponent(o);if(a!==0){const c=V_.getComponent(o);k_.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(aD.copy(H_).applyMatrix4(k_),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class z0 extends Yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class H0 extends fn{constructor(e=null,t=1,n=1,r,o,a,c,u,f=Dn,d=Dn,p,m){super(null,a,c,u,f,d,r,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const X_=new ct,cD=new ct;class pd{constructor(e=[],t=[]){this.uuid=di(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,a=e.length;o<a;o++){const c=e[o]?e[o].matrixWorld:cD;X_.multiplyMatrices(c,t[o]),X_.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new pd(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new H0(t,e,e,Ai,Hi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const o=e.bones[n];let a=t[o];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),a=new z0),this.bones.push(a),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){const a=t[r];e.bones.push(a.uuid);const c=n[r];e.boneInverses.push(c.toArray())}return e}}class Ih extends Un{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const po=new ct,q_=new ct,hc=[],K_=new gr,uD=new ct,ma=new En,ga=new Wi;class fD extends En{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ih(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,uD)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new gr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,po),K_.copy(e.boundingBox).applyMatrix4(po),this.boundingBox.union(K_)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,po),ga.copy(e.boundingSphere).applyMatrix4(po),this.boundingSphere.union(ga)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=n.length+1,a=e*o+1;for(let c=0;c<n.length;c++)n[c]=r[a+c]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(ma.geometry=this.geometry,ma.material=this.material,ma.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ga.copy(this.boundingSphere),ga.applyMatrix4(n),e.ray.intersectsSphere(ga)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,po),q_.multiplyMatrices(n,po),ma.matrixWorld=q_,ma.raycast(e,hc);for(let a=0,c=hc.length;a<c;a++){const u=hc[a];u.instanceId=o,u.object=this,t.push(u)}hc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ih(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new H0(new Float32Array(r*this.count),r,this.count,d0,Hi));const o=this.morphTexture.source.data.data;let a=0;for(let f=0;f<n.length;f++)a+=n[f];const c=this.geometry.morphTargetsRelative?1:1-a,u=r*e;o[u]=c,o.set(n,u+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class V0 extends Gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Y_=new X,$_=new X,Z_=new ct,sh=new eu,dc=new Wi;class md extends Yt{constructor(e=new Ri,t=new V0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)Y_.fromBufferAttribute(t,r-1),$_.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Y_.distanceTo($_);e.setAttribute("lineDistance",new wi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dc.copy(n.boundingSphere),dc.applyMatrix4(r),dc.radius+=o,e.ray.intersectsSphere(dc)===!1)return;Z_.copy(r).invert(),sh.copy(e.ray).applyMatrix4(Z_);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,f=new X,d=new X,p=new X,m=new X,_=this.isLineSegments?2:1,y=n.index,x=n.attributes.position;if(y!==null){const v=Math.max(0,a.start),N=Math.min(y.count,a.start+a.count);for(let S=v,P=N-1;S<P;S+=_){const q=y.getX(S),O=y.getX(S+1);if(f.fromBufferAttribute(x,q),d.fromBufferAttribute(x,O),sh.distanceSqToSegment(f,d,m,p)>u)continue;m.applyMatrix4(this.matrixWorld);const J=e.ray.origin.distanceTo(m);J<e.near||J>e.far||t.push({distance:J,point:p.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,a.start),N=Math.min(x.count,a.start+a.count);for(let S=v,P=N-1;S<P;S+=_){if(f.fromBufferAttribute(x,S),d.fromBufferAttribute(x,S+1),sh.distanceSqToSegment(f,d,m,p)>u)continue;m.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(m);O<e.near||O>e.far||t.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){const c=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const J_=new X,j_=new X;class hD extends md{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)J_.fromBufferAttribute(t,r),j_.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+J_.distanceTo(j_);e.setAttribute("lineDistance",new wi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dD extends md{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class G0 extends Gi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Q_=new ct,Nh=new eu,pc=new Wi,mc=new X;class pD extends Yt{constructor(e=new Ri,t=new G0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pc.copy(n.boundingSphere),pc.applyMatrix4(r),pc.radius+=o,e.ray.intersectsSphere(pc)===!1)return;Q_.copy(r).invert(),Nh.copy(e.ray).applyMatrix4(Q_);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let y=m,T=_;y<T;y++){const x=f.getX(y);mc.fromBufferAttribute(p,x),ev(mc,x,u,r,e,t,this)}}else{const m=Math.max(0,a.start),_=Math.min(p.count,a.start+a.count);for(let y=m,T=_;y<T;y++)mc.fromBufferAttribute(p,y),ev(mc,y,u,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){const c=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}function ev(i,e,t,n,r,o,a){const c=Nh.distanceSqToPoint(i);if(c<t){const u=new X;Nh.closestPointToPoint(i,u),u.applyMatrix4(n);const f=r.ray.origin.distanceTo(u);if(f<r.near||f>r.far)return;o.push({distance:f,distanceToRay:Math.sqrt(c),point:u,index:e,face:null,object:a})}}class Xi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),o=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),o+=n.distanceTo(r),t.push(o),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const o=n.length;let a;t?a=t:a=e*n[o-1];let c=0,u=o-1,f;for(;c<=u;)if(r=Math.floor(c+(u-c)/2),f=n[r]-a,f<0)c=r+1;else if(f>0)u=r-1;else{u=r;break}if(r=u,n[r]===a)return r/(o-1);const d=n[r],m=n[r+1]-d,_=(a-d)/m;return(r+_)/(o-1)}getTangent(e,t){let r=e-1e-4,o=e+1e-4;r<0&&(r=0),o>1&&(o=1);const a=this.getPoint(r),c=this.getPoint(o),u=t||(a.isVector2?new Pe:new X);return u.copy(c).sub(a).normalize(),u}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new X,r=[],o=[],a=[],c=new X,u=new ct;for(let _=0;_<=e;_++){const y=_/e;r[_]=this.getTangentAt(y,new X)}o[0]=new X,a[0]=new X;let f=Number.MAX_VALUE;const d=Math.abs(r[0].x),p=Math.abs(r[0].y),m=Math.abs(r[0].z);d<=f&&(f=d,n.set(1,0,0)),p<=f&&(f=p,n.set(0,1,0)),m<=f&&n.set(0,0,1),c.crossVectors(r[0],n).normalize(),o[0].crossVectors(r[0],c),a[0].crossVectors(r[0],o[0]);for(let _=1;_<=e;_++){if(o[_]=o[_-1].clone(),a[_]=a[_-1].clone(),c.crossVectors(r[_-1],r[_]),c.length()>Number.EPSILON){c.normalize();const y=Math.acos(un(r[_-1].dot(r[_]),-1,1));o[_].applyMatrix4(u.makeRotationAxis(c,y))}a[_].crossVectors(r[_],o[_])}if(t===!0){let _=Math.acos(un(o[0].dot(o[e]),-1,1));_/=e,r[0].dot(c.crossVectors(o[0],o[e]))>0&&(_=-_);for(let y=1;y<=e;y++)o[y].applyMatrix4(u.makeRotationAxis(r[y],_*y)),a[y].crossVectors(r[y],o[y])}return{tangents:r,normals:o,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class gd extends Xi{constructor(e=0,t=0,n=1,r=1,o=0,a=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=o,this.aEndAngle=a,this.aClockwise=c,this.aRotation=u}getPoint(e,t=new Pe){const n=t,r=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const a=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=r;for(;o>r;)o-=r;o<Number.EPSILON&&(a?o=0:o=r),this.aClockwise===!0&&!a&&(o===r?o=-r:o=o-r);const c=this.aStartAngle+e*o;let u=this.aX+this.xRadius*Math.cos(c),f=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const d=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=u-this.aX,_=f-this.aY;u=m*d-_*p+this.aX,f=m*p+_*d+this.aY}return n.set(u,f)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class mD extends gd{constructor(e,t,n,r,o,a){super(e,t,n,n,r,o,a),this.isArcCurve=!0,this.type="ArcCurve"}}function _d(){let i=0,e=0,t=0,n=0;function r(o,a,c,u){i=o,e=c,t=-3*o+3*a-2*c-u,n=2*o-2*a+c+u}return{initCatmullRom:function(o,a,c,u,f){r(a,c,f*(c-o),f*(u-a))},initNonuniformCatmullRom:function(o,a,c,u,f,d,p){let m=(a-o)/f-(c-o)/(f+d)+(c-a)/d,_=(c-a)/d-(u-a)/(d+p)+(u-c)/p;m*=d,_*=d,r(a,c,m,_)},calc:function(o){const a=o*o,c=a*o;return i+e*o+t*a+n*c}}}const gc=new X,oh=new _d,ah=new _d,lh=new _d;class gD extends Xi{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new X){const n=t,r=this.points,o=r.length,a=(o-(this.closed?0:1))*e;let c=Math.floor(a),u=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let f,d;this.closed||c>0?f=r[(c-1)%o]:(gc.subVectors(r[0],r[1]).add(r[0]),f=gc);const p=r[c%o],m=r[(c+1)%o];if(this.closed||c+2<o?d=r[(c+2)%o]:(gc.subVectors(r[o-1],r[o-2]).add(r[o-1]),d=gc),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let y=Math.pow(f.distanceToSquared(p),_),T=Math.pow(p.distanceToSquared(m),_),x=Math.pow(m.distanceToSquared(d),_);T<1e-4&&(T=1),y<1e-4&&(y=T),x<1e-4&&(x=T),oh.initNonuniformCatmullRom(f.x,p.x,m.x,d.x,y,T,x),ah.initNonuniformCatmullRom(f.y,p.y,m.y,d.y,y,T,x),lh.initNonuniformCatmullRom(f.z,p.z,m.z,d.z,y,T,x)}else this.curveType==="catmullrom"&&(oh.initCatmullRom(f.x,p.x,m.x,d.x,this.tension),ah.initCatmullRom(f.y,p.y,m.y,d.y,this.tension),lh.initCatmullRom(f.z,p.z,m.z,d.z,this.tension));return n.set(oh.calc(u),ah.calc(u),lh.calc(u)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new X().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function tv(i,e,t,n,r){const o=(n-e)*.5,a=(r-t)*.5,c=i*i,u=i*c;return(2*t-2*n+o+a)*u+(-3*t+3*n-2*o-a)*c+o*i+t}function _D(i,e){const t=1-i;return t*t*e}function vD(i,e){return 2*(1-i)*i*e}function xD(i,e){return i*i*e}function La(i,e,t,n){return _D(i,e)+vD(i,t)+xD(i,n)}function yD(i,e){const t=1-i;return t*t*t*e}function MD(i,e){const t=1-i;return 3*t*t*i*e}function SD(i,e){return 3*(1-i)*i*i*e}function ED(i,e){return i*i*i*e}function Ia(i,e,t,n,r){return yD(i,e)+MD(i,t)+SD(i,n)+ED(i,r)}class k0 extends Xi{constructor(e=new Pe,t=new Pe,n=new Pe,r=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Pe){const n=t,r=this.v0,o=this.v1,a=this.v2,c=this.v3;return n.set(Ia(e,r.x,o.x,a.x,c.x),Ia(e,r.y,o.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class TD extends Xi{constructor(e=new X,t=new X,n=new X,r=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new X){const n=t,r=this.v0,o=this.v1,a=this.v2,c=this.v3;return n.set(Ia(e,r.x,o.x,a.x,c.x),Ia(e,r.y,o.y,a.y,c.y),Ia(e,r.z,o.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class W0 extends Xi{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class AD extends Xi{constructor(e=new X,t=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new X){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class X0 extends Xi{constructor(e=new Pe,t=new Pe,n=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Pe){const n=t,r=this.v0,o=this.v1,a=this.v2;return n.set(La(e,r.x,o.x,a.x),La(e,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bD extends Xi{constructor(e=new X,t=new X,n=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new X){const n=t,r=this.v0,o=this.v1,a=this.v2;return n.set(La(e,r.x,o.x,a.x),La(e,r.y,o.y,a.y),La(e,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class q0 extends Xi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){const n=t,r=this.points,o=(r.length-1)*e,a=Math.floor(o),c=o-a,u=r[a===0?a:a-1],f=r[a],d=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return n.set(tv(c,u.x,f.x,d.x,p.x),tv(c,u.y,f.y,d.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new Pe().fromArray(r))}return this}}var Dh=Object.freeze({__proto__:null,ArcCurve:mD,CatmullRomCurve3:gD,CubicBezierCurve:k0,CubicBezierCurve3:TD,EllipseCurve:gd,LineCurve:W0,LineCurve3:AD,QuadraticBezierCurve:X0,QuadraticBezierCurve3:bD,SplineCurve:q0});class wD extends Xi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let o=0;for(;o<r.length;){if(r[o]>=n){const a=r[o]-n,c=this.curves[o],u=c.getLength(),f=u===0?0:1-a/u;return c.getPointAt(f,t)}o++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,o=this.curves;r<o.length;r++){const a=o[r],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,u=a.getPoints(c);for(let f=0;f<u.length;f++){const d=u[f];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Dh[r.type]().fromJSON(r))}return this}}class Uh extends wD{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new W0(this.currentPoint.clone(),new Pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const o=new X0(this.currentPoint.clone(),new Pe(e,t),new Pe(n,r));return this.curves.push(o),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,o,a){const c=new k0(this.currentPoint.clone(),new Pe(e,t),new Pe(n,r),new Pe(o,a));return this.curves.push(c),this.currentPoint.set(o,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new q0(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,o,a){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+c,t+u,n,r,o,a),this}absarc(e,t,n,r,o,a){return this.absellipse(e,t,n,n,r,o,a),this}ellipse(e,t,n,r,o,a,c,u){const f=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+f,t+d,n,r,o,a,c,u),this}absellipse(e,t,n,r,o,a,c,u){const f=new gd(e,t,n,r,o,a,c,u);if(this.curves.length>0){const p=f.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(f);const d=f.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class wc extends Uh{constructor(e){super(e),this.uuid=di(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Uh().fromJSON(r))}return this}}const RD={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let o=K0(i,0,r,t,!0);const a=[];if(!o||o.next===o.prev)return a;let c,u,f,d,p,m,_;if(n&&(o=ND(i,e,o,t)),i.length>80*t){c=f=i[0],u=d=i[1];for(let y=t;y<r;y+=t)p=i[y],m=i[y+1],p<c&&(c=p),m<u&&(u=m),p>f&&(f=p),m>d&&(d=m);_=Math.max(f-c,d-u),_=_!==0?32767/_:0}return Ga(o,a,t,c,u,_,0),a}};function K0(i,e,t,n,r){let o,a;if(r===WD(i,e,t,n)>0)for(o=e;o<t;o+=n)a=nv(o,i[o],i[o+1],a);else for(o=t-n;o>=e;o-=n)a=nv(o,i[o],i[o+1],a);return a&&iu(a,a.next)&&(Wa(a),a=a.next),a}function Rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(iu(t,t.next)||Kt(t.prev,t,t.next)===0)){if(Wa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ga(i,e,t,n,r,o,a){if(!i)return;!a&&o&&BD(i,n,r,o);let c=i,u,f;for(;i.prev!==i.next;){if(u=i.prev,f=i.next,o?PD(i,n,r,o):CD(i)){e.push(u.i/t|0),e.push(i.i/t|0),e.push(f.i/t|0),Wa(i),i=f.next,c=f.next;continue}if(i=f,i===c){a?a===1?(i=LD(Rs(i),e,t),Ga(i,e,t,n,r,o,2)):a===2&&ID(i,e,t,n,r,o):Ga(Rs(i),e,t,n,r,o,1);break}}}function CD(i){const e=i.prev,t=i,n=i.next;if(Kt(e,t,n)>=0)return!1;const r=e.x,o=t.x,a=n.x,c=e.y,u=t.y,f=n.y,d=r<o?r<a?r:a:o<a?o:a,p=c<u?c<f?c:f:u<f?u:f,m=r>o?r>a?r:a:o>a?o:a,_=c>u?c>f?c:f:u>f?u:f;let y=n.next;for(;y!==e;){if(y.x>=d&&y.x<=m&&y.y>=p&&y.y<=_&&_o(r,c,o,u,a,f,y.x,y.y)&&Kt(y.prev,y,y.next)>=0)return!1;y=y.next}return!0}function PD(i,e,t,n){const r=i.prev,o=i,a=i.next;if(Kt(r,o,a)>=0)return!1;const c=r.x,u=o.x,f=a.x,d=r.y,p=o.y,m=a.y,_=c<u?c<f?c:f:u<f?u:f,y=d<p?d<m?d:m:p<m?p:m,T=c>u?c>f?c:f:u>f?u:f,x=d>p?d>m?d:m:p>m?p:m,v=Oh(_,y,e,t,n),N=Oh(T,x,e,t,n);let S=i.prevZ,P=i.nextZ;for(;S&&S.z>=v&&P&&P.z<=N;){if(S.x>=_&&S.x<=T&&S.y>=y&&S.y<=x&&S!==r&&S!==a&&_o(c,d,u,p,f,m,S.x,S.y)&&Kt(S.prev,S,S.next)>=0||(S=S.prevZ,P.x>=_&&P.x<=T&&P.y>=y&&P.y<=x&&P!==r&&P!==a&&_o(c,d,u,p,f,m,P.x,P.y)&&Kt(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;S&&S.z>=v;){if(S.x>=_&&S.x<=T&&S.y>=y&&S.y<=x&&S!==r&&S!==a&&_o(c,d,u,p,f,m,S.x,S.y)&&Kt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;P&&P.z<=N;){if(P.x>=_&&P.x<=T&&P.y>=y&&P.y<=x&&P!==r&&P!==a&&_o(c,d,u,p,f,m,P.x,P.y)&&Kt(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function LD(i,e,t){let n=i;do{const r=n.prev,o=n.next.next;!iu(r,o)&&Y0(r,n,n.next,o)&&ka(r,o)&&ka(o,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),Wa(n),Wa(n.next),n=i=o),n=n.next}while(n!==i);return Rs(n)}function ID(i,e,t,n,r,o){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&VD(a,c)){let u=$0(a,c);a=Rs(a,a.next),u=Rs(u,u.next),Ga(a,e,t,n,r,o,0),Ga(u,e,t,n,r,o,0);return}c=c.next}a=a.next}while(a!==i)}function ND(i,e,t,n){const r=[];let o,a,c,u,f;for(o=0,a=e.length;o<a;o++)c=e[o]*n,u=o<a-1?e[o+1]*n:i.length,f=K0(i,c,u,n,!1),f===f.next&&(f.steiner=!0),r.push(HD(f));for(r.sort(DD),o=0;o<r.length;o++)t=UD(r[o],t);return t}function DD(i,e){return i.x-e.x}function UD(i,e){const t=OD(i,e);if(!t)return e;const n=$0(t,i);return Rs(n,n.next),Rs(t,t.next)}function OD(i,e){let t=e,n=-1/0,r;const o=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const m=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(m<=o&&m>n&&(n=m,r=t.x<t.next.x?t:t.next,m===o))return r}t=t.next}while(t!==e);if(!r)return null;const c=r,u=r.x,f=r.y;let d=1/0,p;t=r;do o>=t.x&&t.x>=u&&o!==t.x&&_o(a<f?o:n,a,u,f,a<f?n:o,a,t.x,t.y)&&(p=Math.abs(a-t.y)/(o-t.x),ka(t,i)&&(p<d||p===d&&(t.x>r.x||t.x===r.x&&FD(r,t)))&&(r=t,d=p)),t=t.next;while(t!==c);return r}function FD(i,e){return Kt(i.prev,i,e.prev)<0&&Kt(e.next,i,i.next)<0}function BD(i,e,t,n){let r=i;do r.z===0&&(r.z=Oh(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,zD(r)}function zD(i){let e,t,n,r,o,a,c,u,f=1;do{for(t=i,i=null,o=null,a=0;t;){for(a++,n=t,c=0,e=0;e<f&&(c++,n=n.nextZ,!!n);e++);for(u=f;c>0||u>0&&n;)c!==0&&(u===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,c--):(r=n,n=n.nextZ,u--),o?o.nextZ=r:i=r,r.prevZ=o,o=r;t=n}o.nextZ=null,f*=2}while(a>1);return i}function Oh(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function HD(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function _o(i,e,t,n,r,o,a,c){return(r-a)*(e-c)>=(i-a)*(o-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(o-c)>=(r-a)*(n-c)}function VD(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!GD(i,e)&&(ka(i,e)&&ka(e,i)&&kD(i,e)&&(Kt(i.prev,i,e.prev)||Kt(i,e.prev,e))||iu(i,e)&&Kt(i.prev,i,i.next)>0&&Kt(e.prev,e,e.next)>0)}function Kt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function iu(i,e){return i.x===e.x&&i.y===e.y}function Y0(i,e,t,n){const r=vc(Kt(i,e,t)),o=vc(Kt(i,e,n)),a=vc(Kt(t,n,i)),c=vc(Kt(t,n,e));return!!(r!==o&&a!==c||r===0&&_c(i,t,e)||o===0&&_c(i,n,e)||a===0&&_c(t,i,n)||c===0&&_c(t,e,n))}function _c(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function vc(i){return i>0?1:i<0?-1:0}function GD(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Y0(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ka(i,e){return Kt(i.prev,i,i.next)<0?Kt(i,e,i.next)>=0&&Kt(i,i.prev,e)>=0:Kt(i,e,i.prev)<0||Kt(i,i.next,e)<0}function kD(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,o=(i.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&r<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function $0(i,e){const t=new Fh(i.i,i.x,i.y),n=new Fh(e.i,e.x,e.y),r=i.next,o=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function nv(i,e,t,n){const r=new Fh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Wa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fh(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function WD(i,e,t,n){let r=0;for(let o=e,a=t-n;o<t;o+=n)r+=(i[a]-i[o])*(i[o+1]+i[a+1]),a=o;return r}class To{static area(e){const t=e.length;let n=0;for(let r=t-1,o=0;o<t;r=o++)n+=e[r].x*e[o].y-e[o].x*e[r].y;return n*.5}static isClockWise(e){return To.area(e)<0}static triangulateShape(e,t){const n=[],r=[],o=[];iv(e),rv(n,e);let a=e.length;t.forEach(iv);for(let u=0;u<t.length;u++)r.push(a),a+=t[u].length,rv(n,t[u]);const c=RD.triangulate(n,r);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function iv(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function rv(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class vd extends Ri{constructor(e=new wc([new Pe(.5,.5),new Pe(-.5,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],o=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];a(f)}this.setAttribute("position",new wi(r,3)),this.setAttribute("uv",new wi(o,2)),this.computeVertexNormals();function a(c){const u=[],f=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1;let m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,_=t.bevelThickness!==void 0?t.bevelThickness:.2,y=t.bevelSize!==void 0?t.bevelSize:_-.1,T=t.bevelOffset!==void 0?t.bevelOffset:0,x=t.bevelSegments!==void 0?t.bevelSegments:3;const v=t.extrudePath,N=t.UVGenerator!==void 0?t.UVGenerator:XD;let S,P=!1,q,O,U,J;v&&(S=v.getSpacedPoints(d),P=!0,m=!1,q=v.computeFrenetFrames(d,!1),O=new X,U=new X,J=new X),m||(x=0,_=0,y=0,T=0);const I=c.extractPoints(f);let b=I.shape;const j=I.holes;if(!To.isClockWise(b)){b=b.reverse();for(let me=0,R=j.length;me<R;me++){const D=j[me];To.isClockWise(D)&&(j[me]=D.reverse())}}const $=To.triangulateShape(b,j),le=b;for(let me=0,R=j.length;me<R;me++){const D=j[me];b=b.concat(D)}function de(me,R,D){return R||console.error("THREE.ExtrudeGeometry: vec does not exist"),me.clone().addScaledVector(R,D)}const xe=b.length,fe=$.length;function te(me,R,D){let H,K,A;const M=me.x-R.x,z=me.y-R.y,V=D.x-me.x,k=D.y-me.y,W=M*M+z*z,ue=M*k-z*V;if(Math.abs(ue)>Number.EPSILON){const ne=Math.sqrt(W),ge=Math.sqrt(V*V+k*k),Te=R.x-z/ne,he=R.y+M/ne,Me=D.x-k/ge,Oe=D.y+V/ge,we=((Me-Te)*k-(Oe-he)*V)/(M*k-z*V);H=Te+M*we-me.x,K=he+z*we-me.y;const Ne=H*H+K*K;if(Ne<=2)return new Pe(H,K);A=Math.sqrt(Ne/2)}else{let ne=!1;M>Number.EPSILON?V>Number.EPSILON&&(ne=!0):M<-Number.EPSILON?V<-Number.EPSILON&&(ne=!0):Math.sign(z)===Math.sign(k)&&(ne=!0),ne?(H=-z,K=M,A=Math.sqrt(W)):(H=M,K=z,A=Math.sqrt(W/2))}return new Pe(H/A,K/A)}const Ee=[];for(let me=0,R=le.length,D=R-1,H=me+1;me<R;me++,D++,H++)D===R&&(D=0),H===R&&(H=0),Ee[me]=te(le[me],le[D],le[H]);const Se=[];let Re,We=Ee.concat();for(let me=0,R=j.length;me<R;me++){const D=j[me];Re=[];for(let H=0,K=D.length,A=K-1,M=H+1;H<K;H++,A++,M++)A===K&&(A=0),M===K&&(M=0),Re[H]=te(D[H],D[A],D[M]);Se.push(Re),We=We.concat(Re)}for(let me=0;me<x;me++){const R=me/x,D=_*Math.cos(R*Math.PI/2),H=y*Math.sin(R*Math.PI/2)+T;for(let K=0,A=le.length;K<A;K++){const M=de(le[K],Ee[K],H);be(M.x,M.y,-D)}for(let K=0,A=j.length;K<A;K++){const M=j[K];Re=Se[K];for(let z=0,V=M.length;z<V;z++){const k=de(M[z],Re[z],H);be(k.x,k.y,-D)}}}const Et=y+T;for(let me=0;me<xe;me++){const R=m?de(b[me],We[me],Et):b[me];P?(U.copy(q.normals[0]).multiplyScalar(R.x),O.copy(q.binormals[0]).multiplyScalar(R.y),J.copy(S[0]).add(U).add(O),be(J.x,J.y,J.z)):be(R.x,R.y,0)}for(let me=1;me<=d;me++)for(let R=0;R<xe;R++){const D=m?de(b[R],We[R],Et):b[R];P?(U.copy(q.normals[me]).multiplyScalar(D.x),O.copy(q.binormals[me]).multiplyScalar(D.y),J.copy(S[me]).add(U).add(O),be(J.x,J.y,J.z)):be(D.x,D.y,p/d*me)}for(let me=x-1;me>=0;me--){const R=me/x,D=_*Math.cos(R*Math.PI/2),H=y*Math.sin(R*Math.PI/2)+T;for(let K=0,A=le.length;K<A;K++){const M=de(le[K],Ee[K],H);be(M.x,M.y,p+D)}for(let K=0,A=j.length;K<A;K++){const M=j[K];Re=Se[K];for(let z=0,V=M.length;z<V;z++){const k=de(M[z],Re[z],H);P?be(k.x,k.y+S[d-1].y,S[d-1].x+D):be(k.x,k.y,p+D)}}}ce(),Ae();function ce(){const me=r.length/3;if(m){let R=0,D=xe*R;for(let H=0;H<fe;H++){const K=$[H];ke(K[2]+D,K[1]+D,K[0]+D)}R=d+x*2,D=xe*R;for(let H=0;H<fe;H++){const K=$[H];ke(K[0]+D,K[1]+D,K[2]+D)}}else{for(let R=0;R<fe;R++){const D=$[R];ke(D[2],D[1],D[0])}for(let R=0;R<fe;R++){const D=$[R];ke(D[0]+xe*d,D[1]+xe*d,D[2]+xe*d)}}n.addGroup(me,r.length/3-me,0)}function Ae(){const me=r.length/3;let R=0;Ie(le,R),R+=le.length;for(let D=0,H=j.length;D<H;D++){const K=j[D];Ie(K,R),R+=K.length}n.addGroup(me,r.length/3-me,1)}function Ie(me,R){let D=me.length;for(;--D>=0;){const H=D;let K=D-1;K<0&&(K=me.length-1);for(let A=0,M=d+x*2;A<M;A++){const z=xe*A,V=xe*(A+1),k=R+H+z,W=R+K+z,ue=R+K+V,ne=R+H+V;Je(k,W,ue,ne)}}}function be(me,R,D){u.push(me),u.push(R),u.push(D)}function ke(me,R,D){Ke(me),Ke(R),Ke(D);const H=r.length/3,K=N.generateTopUV(n,r,H-3,H-2,H-1);Q(K[0]),Q(K[1]),Q(K[2])}function Je(me,R,D,H){Ke(me),Ke(R),Ke(H),Ke(R),Ke(D),Ke(H);const K=r.length/3,A=N.generateSideWallUV(n,r,K-6,K-3,K-2,K-1);Q(A[0]),Q(A[1]),Q(A[3]),Q(A[1]),Q(A[2]),Q(A[3])}function Ke(me){r.push(u[me*3+0]),r.push(u[me*3+1]),r.push(u[me*3+2])}function Q(me){o.push(me.x),o.push(me.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return qD(t,n,e)}static fromJSON(e,t){const n=[];for(let o=0,a=e.shapes.length;o<a;o++){const c=t[e.shapes[o]];n.push(c)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Dh[r.type]().fromJSON(r)),new vd(n,e.options)}}const XD={generateTopUV:function(i,e,t,n,r){const o=e[t*3],a=e[t*3+1],c=e[n*3],u=e[n*3+1],f=e[r*3],d=e[r*3+1];return[new Pe(o,a),new Pe(c,u),new Pe(f,d)]},generateSideWallUV:function(i,e,t,n,r,o){const a=e[t*3],c=e[t*3+1],u=e[t*3+2],f=e[n*3],d=e[n*3+1],p=e[n*3+2],m=e[r*3],_=e[r*3+1],y=e[r*3+2],T=e[o*3],x=e[o*3+1],v=e[o*3+2];return Math.abs(c-d)<Math.abs(a-f)?[new Pe(a,1-u),new Pe(f,1-p),new Pe(m,1-y),new Pe(T,1-v)]:[new Pe(c,1-u),new Pe(d,1-p),new Pe(_,1-y),new Pe(x,1-v)]}};function qD(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const o=i[n];t.shapes.push(o.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class xd extends Gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=x0,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _r extends xd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return un(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new it(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new it(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new it(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function xc(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function KD(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function YD(i){function e(r,o){return i[r]-i[o]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function sv(i,e,t){const n=i.length,r=new i.constructor(n);for(let o=0,a=0;a!==n;++o){const c=t[o]*e;for(let u=0;u!==e;++u)r[a++]=i[c+u]}return r}function Z0(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let a=o[n];if(a!==void 0)if(Array.isArray(a))do a=o[n],a!==void 0&&(e.push(o.time),t.push.apply(t,a)),o=i[r++];while(o!==void 0);else if(a.toArray!==void 0)do a=o[n],a!==void 0&&(e.push(o.time),a.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do a=o[n],a!==void 0&&(e.push(o.time),t.push(a)),o=i[r++];while(o!==void 0)}class Ka{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],o=t[n-1];e:{t:{let a;n:{i:if(!(e<r)){for(let c=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(o=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=o)){const c=t[1];e<c&&(n=2,o=c);for(let u=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===u)break;if(r=o,o=t[--n-1],e>=o)break t}a=n,n=0;break n}break e}for(;n<a;){const c=n+a>>>1;e<t[c]?a=c:n=c+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let a=0;a!==r;++a)t[a]=n[o+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class $D extends Ka{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kg,endingEnd:Kg}}intervalChanged_(e,t,n){const r=this.parameterPositions;let o=e-2,a=e+1,c=r[o],u=r[a];if(c===void 0)switch(this.getSettings_().endingStart){case Yg:o=e,c=2*t-n;break;case $g:o=r.length-2,c=t+r[o]-r[o+1];break;default:o=e,c=n}if(u===void 0)switch(this.getSettings_().endingEnd){case Yg:a=e,u=2*n-t;break;case $g:a=1,u=n+r[1]-r[0];break;default:a=e-1,u=t}const f=(n-t)*.5,d=this.valueSize;this._weightPrev=f/(t-c),this._weightNext=f/(u-n),this._offsetPrev=o*d,this._offsetNext=a*d}interpolate_(e,t,n,r){const o=this.resultBuffer,a=this.sampleValues,c=this.valueSize,u=e*c,f=u-c,d=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,_=this._weightNext,y=(n-t)/(r-t),T=y*y,x=T*y,v=-m*x+2*m*T-m*y,N=(1+m)*x+(-1.5-2*m)*T+(-.5+m)*y+1,S=(-1-_)*x+(1.5+_)*T+.5*y,P=_*x-_*T;for(let q=0;q!==c;++q)o[q]=v*a[d+q]+N*a[f+q]+S*a[u+q]+P*a[p+q];return o}}class ZD extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,a=this.sampleValues,c=this.valueSize,u=e*c,f=u-c,d=(n-t)/(r-t),p=1-d;for(let m=0;m!==c;++m)o[m]=a[f+m]*p+a[u+m]*d;return o}}class JD extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class qi{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xc(t,this.TimeBufferType),this.values=xc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xc(e.times,Array),values:xc(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new JD(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ZD(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $D(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ha:t=this.InterpolantFactoryMethodDiscrete;break;case No:t=this.InterpolantFactoryMethodLinear;break;case Lf:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ha;case this.InterpolantFactoryMethodLinear:return No;case this.InterpolantFactoryMethodSmooth:return Lf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let o=0,a=r-1;for(;o!==r&&n[o]<e;)++o;for(;a!==-1&&n[a]>t;)--a;if(++a,o!==0||a!==r){o>=a&&(a=Math.max(a,1),o=a-1);const c=this.getValueSize();this.times=n.slice(o,a),this.values=this.values.slice(o*c,a*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let c=0;c!==o;c++){const u=n[c];if(typeof u=="number"&&isNaN(u)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,c,u),e=!1;break}if(a!==null&&a>u){console.error("THREE.KeyframeTrack: Out of order keys.",this,c,u,a),e=!1;break}a=u}if(r!==void 0&&KD(r))for(let c=0,u=r.length;c!==u;++c){const f=r[c];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,c,f),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Lf,o=e.length-1;let a=1;for(let c=1;c<o;++c){let u=!1;const f=e[c],d=e[c+1];if(f!==d&&(c!==1||f!==e[0]))if(r)u=!0;else{const p=c*n,m=p-n,_=p+n;for(let y=0;y!==n;++y){const T=t[p+y];if(T!==t[m+y]||T!==t[_+y]){u=!0;break}}}if(u){if(c!==a){e[a]=e[c];const p=c*n,m=a*n;for(let _=0;_!==n;++_)t[m+_]=t[p+_]}++a}}if(o>0){e[a]=e[o];for(let c=o*n,u=a*n,f=0;f!==n;++f)t[u+f]=t[c+f];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}qi.prototype.TimeBufferType=Float32Array;qi.prototype.ValueBufferType=Float32Array;qi.prototype.DefaultInterpolation=No;class Go extends qi{}Go.prototype.ValueTypeName="bool";Go.prototype.ValueBufferType=Array;Go.prototype.DefaultInterpolation=Ha;Go.prototype.InterpolantFactoryMethodLinear=void 0;Go.prototype.InterpolantFactoryMethodSmooth=void 0;class J0 extends qi{}J0.prototype.ValueTypeName="color";class Oo extends qi{}Oo.prototype.ValueTypeName="number";class jD extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const o=this.resultBuffer,a=this.sampleValues,c=this.valueSize,u=(n-t)/(r-t);let f=e*c;for(let d=f+c;f!==d;f+=4)jr.slerpFlat(o,0,a,f-c,a,f,u);return o}}class Cs extends qi{InterpolantFactoryMethodLinear(e){return new jD(this.times,this.values,this.getValueSize(),e)}}Cs.prototype.ValueTypeName="quaternion";Cs.prototype.DefaultInterpolation=No;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ko extends qi{}ko.prototype.ValueTypeName="string";ko.prototype.ValueBufferType=Array;ko.prototype.DefaultInterpolation=Ha;ko.prototype.InterpolantFactoryMethodLinear=void 0;ko.prototype.InterpolantFactoryMethodSmooth=void 0;class Fo extends qi{}Fo.prototype.ValueTypeName="vector";class QD{constructor(e="",t=-1,n=[],r=MR){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=di(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,c=n.length;a!==c;++a)t.push(t2(n[a]).scale(r));const o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,a=n.length;o!==a;++o)t.push(qi.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const o=t.length,a=[];for(let c=0;c<o;c++){let u=[],f=[];u.push((c+o-1)%o,c,(c+1)%o),f.push(0,1,0);const d=YD(u);u=sv(u,1,d),f=sv(f,1,d),!r&&u[0]===0&&(u.push(o),f.push(f[0])),a.push(new Oo(".morphTargetInfluences["+t[c].name+"]",u,f).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},o=/^([\w-]*?)([\d]+)$/;for(let c=0,u=e.length;c<u;c++){const f=e[c],d=f.name.match(o);if(d&&d.length>1){const p=d[1];let m=r[p];m||(r[p]=m=[]),m.push(f)}}const a=[];for(const c in r)a.push(this.CreateFromMorphTargetSequence(c,r[c],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,_,y,T){if(_.length!==0){const x=[],v=[];Z0(_,x,v,y),x.length!==0&&T.push(new p(m,x,v))}},r=[],o=e.name||"default",a=e.fps||30,c=e.blendMode;let u=e.length||-1;const f=e.hierarchy||[];for(let p=0;p<f.length;p++){const m=f[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const _={};let y;for(y=0;y<m.length;y++)if(m[y].morphTargets)for(let T=0;T<m[y].morphTargets.length;T++)_[m[y].morphTargets[T]]=-1;for(const T in _){const x=[],v=[];for(let N=0;N!==m[y].morphTargets.length;++N){const S=m[y];x.push(S.time),v.push(S.morphTarget===T?1:0)}r.push(new Oo(".morphTargetInfluence["+T+"]",x,v))}u=_.length*a}else{const _=".bones["+t[p].name+"]";n(Fo,_+".position",m,"pos",r),n(Cs,_+".quaternion",m,"rot",r),n(Fo,_+".scale",m,"scl",r)}}return r.length===0?null:new this(o,u,r,c)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function e2(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Oo;case"vector":case"vector2":case"vector3":case"vector4":return Fo;case"color":return J0;case"quaternion":return Cs;case"bool":case"boolean":return Go;case"string":return ko}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function t2(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=e2(i.type);if(i.times===void 0){const t=[],n=[];Z0(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Wr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class n2{constructor(e,t,n){const r=this;let o=!1,a=0,c=0,u;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){c++,o===!1&&r.onStart!==void 0&&r.onStart(d,a,c),o=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,c),a===c&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return u?u(d):d},this.setURLModifier=function(d){return u=d,this},this.addHandler=function(d,p){return f.push(d,p),this},this.removeHandler=function(d){const p=f.indexOf(d);return p!==-1&&f.splice(p,2),this},this.getHandler=function(d){for(let p=0,m=f.length;p<m;p+=2){const _=f[p],y=f[p+1];if(_.global&&(_.lastIndex=0),_.test(d))return y}return null}}}const i2=new n2;class Is{constructor(e){this.manager=e!==void 0?e:i2,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Is.DEFAULT_MATERIAL_NAME="__DEFAULT";const lr={};class r2 extends Error{constructor(e,t){super(e),this.response=t}}class yd extends Is{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=Wr.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(lr[e]!==void 0){lr[e].push({onLoad:t,onProgress:n,onError:r});return}lr[e]=[],lr[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),c=this.mimeType,u=this.responseType;fetch(a).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const d=lr[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),_=m?parseInt(m):0,y=_!==0;let T=0;const x=new ReadableStream({start(v){N();function N(){p.read().then(({done:S,value:P})=>{if(S)v.close();else{T+=P.byteLength;const q=new ProgressEvent("progress",{lengthComputable:y,loaded:T,total:_});for(let O=0,U=d.length;O<U;O++){const J=d[O];J.onProgress&&J.onProgress(q)}v.enqueue(P),N()}})}}});return new Response(x)}else throw new r2(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(u){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(d=>new DOMParser().parseFromString(d,c));case"json":return f.json();default:if(c===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(c),m=p&&p[1]?p[1].toLowerCase():void 0,_=new TextDecoder(m);return f.arrayBuffer().then(y=>_.decode(y))}}}).then(f=>{Wr.add(e,f);const d=lr[e];delete lr[e];for(let p=0,m=d.length;p<m;p++){const _=d[p];_.onLoad&&_.onLoad(f)}}).catch(f=>{const d=lr[e];if(d===void 0)throw this.manager.itemError(e),f;delete lr[e];for(let p=0,m=d.length;p<m;p++){const _=d[p];_.onError&&_.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class s2 extends Is{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,a=Wr.get(e);if(a!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(a),o.manager.itemEnd(e)},0),a;const c=Va("img");function u(){d(),Wr.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){d(),r&&r(p),o.manager.itemError(e),o.manager.itemEnd(e)}function d(){c.removeEventListener("load",u,!1),c.removeEventListener("error",f,!1)}return c.addEventListener("load",u,!1),c.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),o.manager.itemStart(e),c.src=e,c}}class o2 extends Is{constructor(e){super(e)}load(e,t,n,r){const o=new fn,a=new s2(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(c){o.image=c,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}}class Md extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ch=new ct,ov=new X,av=new X;class Sd{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ud,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ov.setFromMatrixPosition(e.matrixWorld),t.position.copy(ov),av.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(av),t.updateMatrixWorld(),ch.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ch),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ch)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class a2 extends Sd{constructor(){super(new In(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Do*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class l2 extends Md{constructor(e,t,n=0,r=Math.PI/3,o=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.distance=n,this.angle=r,this.penumbra=o,this.decay=a,this.map=null,this.shadow=new a2}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const lv=new ct,_a=new X,uh=new X;class c2 extends Sd{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Ut(2,1,1,1),new Ut(0,1,1,1),new Ut(3,1,1,1),new Ut(1,1,1,1),new Ut(3,0,1,1),new Ut(1,0,1,1)],this._cubeDirections=[new X(1,0,0),new X(-1,0,0),new X(0,0,1),new X(0,0,-1),new X(0,1,0),new X(0,-1,0)],this._cubeUps=[new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,0,1),new X(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),_a.setFromMatrixPosition(e.matrixWorld),n.position.copy(_a),uh.copy(n.position),uh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(uh),n.updateMatrixWorld(),r.makeTranslation(-_a.x,-_a.y,-_a.z),lv.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lv)}}class u2 extends Md{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new c2}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class f2 extends Sd{constructor(){super(new fd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class h2 extends Md{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new f2}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Na{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class d2 extends Is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,a=Wr.get(e);if(a!==void 0){if(o.manager.itemStart(e),a.then){a.then(f=>{t&&t(f),o.manager.itemEnd(e)}).catch(f=>{r&&r(f)});return}return setTimeout(function(){t&&t(a),o.manager.itemEnd(e)},0),a}const c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader;const u=fetch(e,c).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(f){return Wr.add(e,f),t&&t(f),o.manager.itemEnd(e),f}).catch(function(f){r&&r(f),Wr.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});Wr.add(e,u),o.manager.itemStart(e)}}const Ed="\\[\\]\\.:\\/",p2=new RegExp("["+Ed+"]","g"),Td="[^"+Ed+"]",m2="[^"+Ed.replace("\\.","")+"]",g2=/((?:WC+[\/:])*)/.source.replace("WC",Td),_2=/(WCOD+)?/.source.replace("WCOD",m2),v2=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Td),x2=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Td),y2=new RegExp("^"+g2+_2+v2+x2+"$"),M2=["material","materials","bones","map"];class S2{constructor(e,t,n){const r=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Lt{constructor(e,t,n){this.path=t,this.parsedPath=n||Lt.parseTrackName(t),this.node=Lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Lt.Composite(e,t,n):new Lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(p2,"")}static parseTrackName(e){const t=y2.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const o=n.nodeName.substring(r+1);M2.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(o){for(let a=0;a<o.length;a++){const c=o[a];if(c.name===t||c.uuid===t)return c;const u=n(c.children);if(u)return u}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let o=t.propertyIndex;if(e||(e=Lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===f){f=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}const a=e[r];if(a===void 0){const f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+r+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?c=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}u=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(u=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Lt.Composite=S2;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class E2{constructor(){this.type="ShapePath",this.color=new it,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Uh,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,r){return this.currentPath.quadraticCurveTo(e,t,n,r),this}bezierCurveTo(e,t,n,r,o,a){return this.currentPath.bezierCurveTo(e,t,n,r,o,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(v){const N=[];for(let S=0,P=v.length;S<P;S++){const q=v[S],O=new wc;O.curves=q.curves,N.push(O)}return N}function n(v,N){const S=N.length;let P=!1;for(let q=S-1,O=0;O<S;q=O++){let U=N[q],J=N[O],I=J.x-U.x,b=J.y-U.y;if(Math.abs(b)>Number.EPSILON){if(b<0&&(U=N[O],I=-I,J=N[q],b=-b),v.y<U.y||v.y>J.y)continue;if(v.y===U.y){if(v.x===U.x)return!0}else{const j=b*(v.x-U.x)-I*(v.y-U.y);if(j===0)return!0;if(j<0)continue;P=!P}}else{if(v.y!==U.y)continue;if(J.x<=v.x&&v.x<=U.x||U.x<=v.x&&v.x<=J.x)return!0}}return P}const r=To.isClockWise,o=this.subPaths;if(o.length===0)return[];let a,c,u;const f=[];if(o.length===1)return c=o[0],u=new wc,u.curves=c.curves,f.push(u),f;let d=!r(o[0].getPoints());d=e?!d:d;const p=[],m=[];let _=[],y=0,T;m[y]=void 0,_[y]=[];for(let v=0,N=o.length;v<N;v++)c=o[v],T=c.getPoints(),a=r(T),a=e?!a:a,a?(!d&&m[y]&&y++,m[y]={s:new wc,p:T},m[y].s.curves=c.curves,d&&y++,_[y]=[]):_[y].push({h:c,p:T[0]});if(!m[0])return t(o);if(m.length>1){let v=!1,N=0;for(let S=0,P=m.length;S<P;S++)p[S]=[];for(let S=0,P=m.length;S<P;S++){const q=_[S];for(let O=0;O<q.length;O++){const U=q[O];let J=!0;for(let I=0;I<m.length;I++)n(U.p,m[I].p)&&(S!==I&&N++,J?(J=!1,p[I].push(U)):v=!0);J&&p[S].push(U)}}N>0&&v===!1&&(_=p)}let x;for(let v=0,N=m.length;v<N;v++){u=m[v].s,f.push(u),x=_[v];for(let S=0,P=x.length;S<P;S++)u.holes.push(x[S].h)}return f}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ad}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ad);function cv(i,e){if(e===SR)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ch||e===v0){let t=i.getIndex();if(t===null){const a=[],c=i.getAttribute("position");if(c!==void 0){for(let u=0;u<c.count;u++)a.push(u);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Ch)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class T2 extends Is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new C2(t)}),this.register(function(t){return new B2(t)}),this.register(function(t){return new z2(t)}),this.register(function(t){return new H2(t)}),this.register(function(t){return new L2(t)}),this.register(function(t){return new I2(t)}),this.register(function(t){return new N2(t)}),this.register(function(t){return new D2(t)}),this.register(function(t){return new R2(t)}),this.register(function(t){return new U2(t)}),this.register(function(t){return new P2(t)}),this.register(function(t){return new F2(t)}),this.register(function(t){return new O2(t)}),this.register(function(t){return new b2(t)}),this.register(function(t){return new V2(t)}),this.register(function(t){return new G2(t)})}load(e,t,n,r){const o=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const f=Na.extractUrlBase(e);a=Na.resolveURL(f,this.path)}else a=Na.extractUrlBase(e);this.manager.itemStart(e);const c=function(f){r?r(f):console.error(f),o.manager.itemError(e),o.manager.itemEnd(e)},u=new yd(this.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(this.withCredentials),u.load(e,function(f){try{o.parse(f,a,function(d){t(d),o.manager.itemEnd(e)},c)}catch(d){c(d)}},n,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o;const a={},c={},u=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(u.decode(new Uint8Array(e,0,4))===j0){try{a[Mt.KHR_BINARY_GLTF]=new k2(e)}catch(p){r&&r(p);return}o=JSON.parse(a[Mt.KHR_BINARY_GLTF].content)}else o=JSON.parse(u.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const f=new nU(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const p=this.pluginCallbacks[d](f);p.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[p.name]=p,a[p.name]=!0}if(o.extensionsUsed)for(let d=0;d<o.extensionsUsed.length;++d){const p=o.extensionsUsed[d],m=o.extensionsRequired||[];switch(p){case Mt.KHR_MATERIALS_UNLIT:a[p]=new w2;break;case Mt.KHR_DRACO_MESH_COMPRESSION:a[p]=new W2(o,this.dracoLoader);break;case Mt.KHR_TEXTURE_TRANSFORM:a[p]=new X2;break;case Mt.KHR_MESH_QUANTIZATION:a[p]=new q2;break;default:m.indexOf(p)>=0&&c[p]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+p+'".')}}f.setExtensions(a),f.setPlugins(c),f.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}}function A2(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Mt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class b2{constructor(e){this.parser=e,this.name=Mt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const o=t.json,u=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e];let f;const d=new it(16777215);u.color!==void 0&&d.setRGB(u.color[0],u.color[1],u.color[2],gn);const p=u.range!==void 0?u.range:0;switch(u.type){case"directional":f=new h2(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new u2(d),f.distance=p;break;case"spot":f=new l2(d),f.distance=p,u.spot=u.spot||{},u.spot.innerConeAngle=u.spot.innerConeAngle!==void 0?u.spot.innerConeAngle:0,u.spot.outerConeAngle=u.spot.outerConeAngle!==void 0?u.spot.outerConeAngle:Math.PI/4,f.angle=u.spot.outerConeAngle,f.penumbra=1-u.spot.innerConeAngle/u.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+u.type)}return f.position.set(0,0,0),f.decay=2,Vr(f,u),u.intensity!==void 0&&(f.intensity=u.intensity),f.name=t.createUniqueName(u.name||"light_"+e),r=Promise.resolve(f),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,o=n.json.nodes[e],c=(o.extensions&&o.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(u){return n._getNodeRef(t.cache,c,u)})}}class w2{constructor(){this.name=Mt.KHR_MATERIALS_UNLIT}getMaterialType(){return Vi}extendParams(e,t,n){const r=[];e.color=new it(1,1,1),e.opacity=1;const o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){const a=o.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],gn),e.opacity=a[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,Ln))}return Promise.all(r)}}class R2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}}class C2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const c=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(c,c)}return Promise.all(o)}}class P2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(o)}}class L2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[];t.sheenColor=new it(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=r.extensions[this.name];if(a.sheenColorFactor!==void 0){const c=a.sheenColorFactor;t.sheenColor.setRGB(c[0],c[1],c[2],gn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ln)),a.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(o)}}class I2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(o)}}class N2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const c=a.attenuationColor||[1,1,1];return t.attenuationColor=new it().setRGB(c[0],c[1],c[2],gn),Promise.all(o)}}class D2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}}class U2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const c=a.specularColorFactor||[1,1,1];return t.specularColor=new it().setRGB(c[0],c[1],c[2],gn),a.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ln)),Promise.all(o)}}class O2{constructor(e){this.parser=e,this.name=Mt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(o)}}class F2{constructor(e){this.parser=e,this.name=Mt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const o=[],a=r.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(o)}}class B2{constructor(e){this.parser=e,this.name=Mt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const o=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,a)}}class z2{constructor(e){this.parser=e,this.name=Mt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const a=o.extensions[t],c=r.images[a.source];let u=n.textureLoader;if(c.uri){const f=n.options.manager.getHandler(c.uri);f!==null&&(u=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,a.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class H2{constructor(e){this.parser=e,this.name=Mt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;const a=o.extensions[t],c=r.images[a.source];let u=n.textureLoader;if(c.uri){const f=n.options.manager.getHandler(c.uri);f!==null&&(u=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,a.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class V2{constructor(e){this.name=Mt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(c){const u=r.byteOffset||0,f=r.byteLength||0,d=r.count,p=r.byteStride,m=new Uint8Array(c,u,f);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,p,m,r.mode,r.filter).then(function(_){return _.buffer}):a.ready.then(function(){const _=new ArrayBuffer(d*p);return a.decodeGltfBuffer(new Uint8Array(_),d,p,m,r.mode,r.filter),_})})}else return null}}class G2{constructor(e){this.name=Mt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const f of r.primitives)if(f.mode!==fi.TRIANGLES&&f.mode!==fi.TRIANGLE_STRIP&&f.mode!==fi.TRIANGLE_FAN&&f.mode!==void 0)return null;const a=n.extensions[this.name].attributes,c=[],u={};for(const f in a)c.push(this.parser.getDependency("accessor",a[f]).then(d=>(u[f]=d,u[f])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(f=>{const d=f.pop(),p=d.isGroup?d.children:[d],m=f[0].count,_=[];for(const y of p){const T=new ct,x=new X,v=new jr,N=new X(1,1,1),S=new fD(y.geometry,y.material,m);for(let P=0;P<m;P++)u.TRANSLATION&&x.fromBufferAttribute(u.TRANSLATION,P),u.ROTATION&&v.fromBufferAttribute(u.ROTATION,P),u.SCALE&&N.fromBufferAttribute(u.SCALE,P),S.setMatrixAt(P,T.compose(x,v,N));for(const P in u)if(P==="_COLOR_0"){const q=u[P];S.instanceColor=new Ih(q.array,q.itemSize,q.normalized)}else P!=="TRANSLATION"&&P!=="ROTATION"&&P!=="SCALE"&&y.geometry.setAttribute(P,u[P]);Yt.prototype.copy.call(S,y),this.parser.assignFinalMaterial(S),_.push(S)}return d.isGroup?(d.clear(),d.add(..._),d):_[0]}))}}const j0="glTF",va=12,uv={JSON:1313821514,BIN:5130562};class k2{constructor(e){this.name=Mt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,va),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==j0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-va,o=new DataView(e,va);let a=0;for(;a<r;){const c=o.getUint32(a,!0);a+=4;const u=o.getUint32(a,!0);if(a+=4,u===uv.JSON){const f=new Uint8Array(e,va+a,c);this.content=n.decode(f)}else if(u===uv.BIN){const f=va+a;this.body=e.slice(f,f+c)}a+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class W2{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Mt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,c={},u={},f={};for(const d in a){const p=Bh[d]||d.toLowerCase();c[p]=a[d]}for(const d in e.attributes){const p=Bh[d]||d.toLowerCase();if(a[d]!==void 0){const m=n.accessors[e.attributes[d]],_=Ao[m.componentType];f[p]=_.name,u[p]=m.normalized===!0}}return t.getDependency("bufferView",o).then(function(d){return new Promise(function(p,m){r.decodeDracoFile(d,function(_){for(const y in _.attributes){const T=_.attributes[y],x=u[y];x!==void 0&&(T.normalized=x)}p(_)},c,f,gn,m)})})}}class X2{constructor(){this.name=Mt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class q2{constructor(){this.name=Mt.KHR_MESH_QUANTIZATION}}class Q0 extends Ka{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[o+a];return t}interpolate_(e,t,n,r){const o=this.resultBuffer,a=this.sampleValues,c=this.valueSize,u=c*2,f=c*3,d=r-t,p=(n-t)/d,m=p*p,_=m*p,y=e*f,T=y-f,x=-2*_+3*m,v=_-m,N=1-x,S=v-m+p;for(let P=0;P!==c;P++){const q=a[T+P+c],O=a[T+P+u]*d,U=a[y+P+c],J=a[y+P]*d;o[P]=N*q+S*O+x*U+v*J}return o}}const K2=new jr;class Y2 extends Q0{interpolate_(e,t,n,r){const o=super.interpolate_(e,t,n,r);return K2.fromArray(o).normalize().toArray(o),o}}const fi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ao={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fv={9728:Dn,9729:jn,9984:l0,9985:Ac,9986:Sa,9987:fr},hv={33071:kr,33648:Dc,10497:Lo},fh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},$2={CUBICSPLINE:void 0,LINEAR:No,STEP:Ha},hh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Z2(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new xd({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:pr})),i.DefaultMaterial}function _s(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function J2(i,e,t){let n=!1,r=!1,o=!1;for(let f=0,d=e.length;f<d;f++){const p=e[f];if(p.POSITION!==void 0&&(n=!0),p.NORMAL!==void 0&&(r=!0),p.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);const a=[],c=[],u=[];for(let f=0,d=e.length;f<d;f++){const p=e[f];if(n){const m=p.POSITION!==void 0?t.getDependency("accessor",p.POSITION):i.attributes.position;a.push(m)}if(r){const m=p.NORMAL!==void 0?t.getDependency("accessor",p.NORMAL):i.attributes.normal;c.push(m)}if(o){const m=p.COLOR_0!==void 0?t.getDependency("accessor",p.COLOR_0):i.attributes.color;u.push(m)}}return Promise.all([Promise.all(a),Promise.all(c),Promise.all(u)]).then(function(f){const d=f[0],p=f[1],m=f[2];return n&&(i.morphAttributes.position=d),r&&(i.morphAttributes.normal=p),o&&(i.morphAttributes.color=m),i.morphTargetsRelative=!0,i})}function j2(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Q2(i){let e;const t=i.extensions&&i.extensions[Mt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+dh(t.attributes):e=i.indices+":"+dh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+dh(i.targets[n]);return e}function dh(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function zh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function eU(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const tU=new ct;class nU{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new A2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new o2(this.options.manager):this.textureLoader=new d2(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new yd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const c={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};return _s(o,c,r),Vr(c,r),Promise.all(n._invokeAll(function(u){return u.afterRoot&&u.afterRoot(c)})).then(function(){for(const u of c.scenes)u.updateMatrixWorld();e(c)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){const a=t[r].joints;for(let c=0,u=a.length;c<u;c++)e[a[c]].isBone=!0}for(let r=0,o=e.length;r<o;r++){const a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),o=(a,c)=>{const u=this.associations.get(a);u!=null&&this.associations.set(c,u);for(const[f,d]of a.children.entries())o(d,c.children[f])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Mt.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(o,a){n.load(Na.resolveURL(t.uri,r.path),o,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const a=fh[r.type],c=Ao[r.componentType],u=r.normalized===!0,f=new c(r.count*a);return Promise.resolve(new Un(f,a,u))}const o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(a){const c=a[0],u=fh[r.type],f=Ao[r.componentType],d=f.BYTES_PER_ELEMENT,p=d*u,m=r.byteOffset||0,_=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,y=r.normalized===!0;let T,x;if(_&&_!==p){const v=Math.floor(m/_),N="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+v+":"+r.count;let S=t.cache.get(N);S||(T=new f(c,v*_,r.count*_/d),S=new oD(T,_/d),t.cache.add(N,S)),x=new dd(S,u,m%_/d,y)}else c===null?T=new f(r.count*u):T=new f(c,m,r.count*u),x=new Un(T,u,y);if(r.sparse!==void 0){const v=fh.SCALAR,N=Ao[r.sparse.indices.componentType],S=r.sparse.indices.byteOffset||0,P=r.sparse.values.byteOffset||0,q=new N(a[1],S,r.sparse.count*v),O=new f(a[2],P,r.sparse.count*u);c!==null&&(x=new Un(x.array.slice(),x.itemSize,x.normalized));for(let U=0,J=q.length;U<J;U++){const I=q[U];if(x.setX(I,O[U*u]),u>=2&&x.setY(I,O[U*u+1]),u>=3&&x.setZ(I,O[U*u+2]),u>=4&&x.setW(I,O[U*u+3]),u>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return x})}loadTexture(e){const t=this.json,n=this.options,o=t.textures[e].source,a=t.images[o];let c=this.textureLoader;if(a.uri){const u=n.manager.getHandler(a.uri);u!==null&&(c=u)}return this.loadTextureImage(e,o,c)}loadTextureImage(e,t,n){const r=this,o=this.json,a=o.textures[e],c=o.images[t],u=(c.uri||c.bufferView)+":"+a.sampler;if(this.textureCache[u])return this.textureCache[u];const f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=a.name||c.name||"",d.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(d.name=c.uri);const m=(o.samplers||{})[a.sampler]||{};return d.magFilter=fv[m.magFilter]||jn,d.minFilter=fv[m.minFilter]||fr,d.wrapS=hv[m.wrapS]||Lo,d.wrapT=hv[m.wrapT]||Lo,r.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[u]=f,f}loadImageSource(e,t){const n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(p=>p.clone());const a=r.images[e],c=self.URL||self.webkitURL;let u=a.uri||"",f=!1;if(a.bufferView!==void 0)u=n.getDependency("bufferView",a.bufferView).then(function(p){f=!0;const m=new Blob([p],{type:a.mimeType});return u=c.createObjectURL(m),u});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(u).then(function(p){return new Promise(function(m,_){let y=m;t.isImageBitmapLoader===!0&&(y=function(T){const x=new fn(T);x.needsUpdate=!0,m(x)}),t.load(Na.resolveURL(p,o.path),y,void 0,_)})}).then(function(p){return f===!0&&c.revokeObjectURL(u),p.userData.mimeType=a.mimeType||eU(a.uri),p}).catch(function(p){throw console.error("THREE.GLTFLoader: Couldn't load texture",u),p});return this.sourceCache[e]=d,d}assignTexture(e,t,n,r){const o=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),o.extensions[Mt.KHR_TEXTURE_TRANSFORM]){const c=n.extensions!==void 0?n.extensions[Mt.KHR_TEXTURE_TRANSFORM]:void 0;if(c){const u=o.associations.get(a);a=o.extensions[Mt.KHR_TEXTURE_TRANSFORM].extendTexture(a,c),o.associations.set(a,u)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const c="PointsMaterial:"+n.uuid;let u=this.cache.get(c);u||(u=new G0,Gi.prototype.copy.call(u,n),u.color.copy(n.color),u.map=n.map,u.sizeAttenuation=!1,this.cache.add(c,u)),n=u}else if(e.isLine){const c="LineBasicMaterial:"+n.uuid;let u=this.cache.get(c);u||(u=new V0,Gi.prototype.copy.call(u,n),u.color.copy(n.color),u.map=n.map,this.cache.add(c,u)),n=u}if(r||o||a){let c="ClonedMaterial:"+n.uuid+":";r&&(c+="derivative-tangents:"),o&&(c+="vertex-colors:"),a&&(c+="flat-shading:");let u=this.cache.get(c);u||(u=n.clone(),o&&(u.vertexColors=!0),a&&(u.flatShading=!0),r&&(u.normalScale&&(u.normalScale.y*=-1),u.clearcoatNormalScale&&(u.clearcoatNormalScale.y*=-1)),this.cache.add(c,u),this.associations.set(u,this.associations.get(n))),n=u}e.material=n}getMaterialType(){return xd}loadMaterial(e){const t=this,n=this.json,r=this.extensions,o=n.materials[e];let a;const c={},u=o.extensions||{},f=[];if(u[Mt.KHR_MATERIALS_UNLIT]){const p=r[Mt.KHR_MATERIALS_UNLIT];a=p.getMaterialType(),f.push(p.extendParams(c,o,t))}else{const p=o.pbrMetallicRoughness||{};if(c.color=new it(1,1,1),c.opacity=1,Array.isArray(p.baseColorFactor)){const m=p.baseColorFactor;c.color.setRGB(m[0],m[1],m[2],gn),c.opacity=m[3]}p.baseColorTexture!==void 0&&f.push(t.assignTexture(c,"map",p.baseColorTexture,Ln)),c.metalness=p.metallicFactor!==void 0?p.metallicFactor:1,c.roughness=p.roughnessFactor!==void 0?p.roughnessFactor:1,p.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(c,"metalnessMap",p.metallicRoughnessTexture)),f.push(t.assignTexture(c,"roughnessMap",p.metallicRoughnessTexture))),a=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,c)})))}o.doubleSided===!0&&(c.side=Fi);const d=o.alphaMode||hh.OPAQUE;if(d===hh.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,d===hh.MASK&&(c.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&a!==Vi&&(f.push(t.assignTexture(c,"normalMap",o.normalTexture)),c.normalScale=new Pe(1,1),o.normalTexture.scale!==void 0)){const p=o.normalTexture.scale;c.normalScale.set(p,p)}if(o.occlusionTexture!==void 0&&a!==Vi&&(f.push(t.assignTexture(c,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&a!==Vi){const p=o.emissiveFactor;c.emissive=new it().setRGB(p[0],p[1],p[2],gn)}return o.emissiveTexture!==void 0&&a!==Vi&&f.push(t.assignTexture(c,"emissiveMap",o.emissiveTexture,Ln)),Promise.all(f).then(function(){const p=new a(c);return o.name&&(p.name=o.name),Vr(p,o),t.associations.set(p,{materials:e}),o.extensions&&_s(r,p,o),p})}createUniqueName(e){const t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function o(c){return n[Mt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(u){return dv(u,c,t)})}const a=[];for(let c=0,u=e.length;c<u;c++){const f=e[c],d=Q2(f),p=r[d];if(p)a.push(p.promise);else{let m;f.extensions&&f.extensions[Mt.KHR_DRACO_MESH_COMPRESSION]?m=o(f):m=dv(new Ri,f,t),r[d]={primitive:f,promise:m},a.push(m)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,r=this.extensions,o=n.meshes[e],a=o.primitives,c=[];for(let u=0,f=a.length;u<f;u++){const d=a[u].material===void 0?Z2(this.cache):this.getDependency("material",a[u].material);c.push(d)}return c.push(t.loadGeometries(a)),Promise.all(c).then(function(u){const f=u.slice(0,u.length-1),d=u[u.length-1],p=[];for(let _=0,y=d.length;_<y;_++){const T=d[_],x=a[_];let v;const N=f[_];if(x.mode===fi.TRIANGLES||x.mode===fi.TRIANGLE_STRIP||x.mode===fi.TRIANGLE_FAN||x.mode===void 0)v=o.isSkinnedMesh===!0?new lD(T,N):new En(T,N),v.isSkinnedMesh===!0&&v.normalizeSkinWeights(),x.mode===fi.TRIANGLE_STRIP?v.geometry=cv(v.geometry,v0):x.mode===fi.TRIANGLE_FAN&&(v.geometry=cv(v.geometry,Ch));else if(x.mode===fi.LINES)v=new hD(T,N);else if(x.mode===fi.LINE_STRIP)v=new md(T,N);else if(x.mode===fi.LINE_LOOP)v=new dD(T,N);else if(x.mode===fi.POINTS)v=new pD(T,N);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+x.mode);Object.keys(v.geometry.morphAttributes).length>0&&j2(v,o),v.name=t.createUniqueName(o.name||"mesh_"+e),Vr(v,o),x.extensions&&_s(r,v,x),t.assignFinalMaterial(v),p.push(v)}for(let _=0,y=p.length;_<y;_++)t.associations.set(p[_],{meshes:e,primitives:_});if(p.length===1)return o.extensions&&_s(r,p[0],o),p[0];const m=new Es;o.extensions&&_s(r,m,o),t.associations.set(m,{meshes:e});for(let _=0,y=p.length;_<y;_++)m.add(p[_]);return m})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new In($R.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new fd(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const o=r.pop(),a=r,c=[],u=[];for(let f=0,d=a.length;f<d;f++){const p=a[f];if(p){c.push(p);const m=new ct;o!==null&&m.fromArray(o.array,f*16),u.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new pd(c,u)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,a=[],c=[],u=[],f=[],d=[];for(let p=0,m=r.channels.length;p<m;p++){const _=r.channels[p],y=r.samplers[_.sampler],T=_.target,x=T.node,v=r.parameters!==void 0?r.parameters[y.input]:y.input,N=r.parameters!==void 0?r.parameters[y.output]:y.output;T.node!==void 0&&(a.push(this.getDependency("node",x)),c.push(this.getDependency("accessor",v)),u.push(this.getDependency("accessor",N)),f.push(y),d.push(T))}return Promise.all([Promise.all(a),Promise.all(c),Promise.all(u),Promise.all(f),Promise.all(d)]).then(function(p){const m=p[0],_=p[1],y=p[2],T=p[3],x=p[4],v=[];for(let N=0,S=m.length;N<S;N++){const P=m[N],q=_[N],O=y[N],U=T[N],J=x[N];if(P===void 0)continue;P.updateMatrix&&P.updateMatrix();const I=n._createAnimationTracks(P,q,O,U,J);if(I)for(let b=0;b<I.length;b++)v.push(I[b])}return new QD(o,void 0,v)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){const a=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&a.traverse(function(c){if(c.isMesh)for(let u=0,f=r.weights.length;u<f;u++)c.morphTargetInfluences[u]=r.weights[u]}),a})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),a=[],c=r.children||[];for(let f=0,d=c.length;f<d;f++)a.push(n.getDependency("node",c[f]));const u=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(a),u]).then(function(f){const d=f[0],p=f[1],m=f[2];m!==null&&d.traverse(function(_){_.isSkinnedMesh&&_.bind(m,tU)});for(let _=0,y=p.length;_<y;_++)d.add(p[_]);return d})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const o=t.nodes[e],a=o.name?r.createUniqueName(o.name):"",c=[],u=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return u&&c.push(u),o.camera!==void 0&&c.push(r.getDependency("camera",o.camera).then(function(f){return r._getNodeRef(r.cameraCache,o.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){c.push(f)}),this.nodeCache[e]=Promise.all(c).then(function(f){let d;if(o.isBone===!0?d=new z0:f.length>1?d=new Es:f.length===1?d=f[0]:d=new Yt,d!==f[0])for(let p=0,m=f.length;p<m;p++)d.add(f[p]);if(o.name&&(d.userData.name=o.name,d.name=a),Vr(d,o),o.extensions&&_s(n,d,o),o.matrix!==void 0){const p=new ct;p.fromArray(o.matrix),d.applyMatrix4(p)}else o.translation!==void 0&&d.position.fromArray(o.translation),o.rotation!==void 0&&d.quaternion.fromArray(o.rotation),o.scale!==void 0&&d.scale.fromArray(o.scale);return r.associations.has(d)||r.associations.set(d,{}),r.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,o=new Es;n.name&&(o.name=r.createUniqueName(n.name)),Vr(o,n),n.extensions&&_s(t,o,n);const a=n.nodes||[],c=[];for(let u=0,f=a.length;u<f;u++)c.push(r.getDependency("node",a[u]));return Promise.all(c).then(function(u){for(let d=0,p=u.length;d<p;d++)o.add(u[d]);const f=d=>{const p=new Map;for(const[m,_]of r.associations)(m instanceof Gi||m instanceof fn)&&p.set(m,_);return d.traverse(m=>{const _=r.associations.get(m);_!=null&&p.set(m,_)}),p};return r.associations=f(o),o})}_createAnimationTracks(e,t,n,r,o){const a=[],c=e.name?e.name:e.uuid,u=[];Fr[o.path]===Fr.weights?e.traverse(function(m){m.morphTargetInfluences&&u.push(m.name?m.name:m.uuid)}):u.push(c);let f;switch(Fr[o.path]){case Fr.weights:f=Oo;break;case Fr.rotation:f=Cs;break;case Fr.position:case Fr.scale:f=Fo;break;default:switch(n.itemSize){case 1:f=Oo;break;case 2:case 3:default:f=Fo;break}break}const d=r.interpolation!==void 0?$2[r.interpolation]:No,p=this._getArrayFromAccessor(n);for(let m=0,_=u.length;m<_;m++){const y=new f(u[m]+"."+Fr[o.path],t.array,p,d);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=zh(t.constructor),r=new Float32Array(t.length);for(let o=0,a=t.length;o<a;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof Cs?Y2:Q0;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function iU(i,e,t){const n=e.attributes,r=new gr;if(n.POSITION!==void 0){const c=t.json.accessors[n.POSITION],u=c.min,f=c.max;if(u!==void 0&&f!==void 0){if(r.set(new X(u[0],u[1],u[2]),new X(f[0],f[1],f[2])),c.normalized){const d=zh(Ao[c.componentType]);r.min.multiplyScalar(d),r.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const o=e.targets;if(o!==void 0){const c=new X,u=new X;for(let f=0,d=o.length;f<d;f++){const p=o[f];if(p.POSITION!==void 0){const m=t.json.accessors[p.POSITION],_=m.min,y=m.max;if(_!==void 0&&y!==void 0){if(u.setX(Math.max(Math.abs(_[0]),Math.abs(y[0]))),u.setY(Math.max(Math.abs(_[1]),Math.abs(y[1]))),u.setZ(Math.max(Math.abs(_[2]),Math.abs(y[2]))),m.normalized){const T=zh(Ao[m.componentType]);u.multiplyScalar(T)}c.max(u)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(c)}i.boundingBox=r;const a=new Wi;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function dv(i,e,t){const n=e.attributes,r=[];function o(a,c){return t.getDependency("accessor",a).then(function(u){i.setAttribute(c,u)})}for(const a in n){const c=Bh[a]||a.toLowerCase();c in i.attributes||r.push(o(n[a],c))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(c){i.setIndex(c)});r.push(a)}return Rt.workingColorSpace!==gn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Rt.workingColorSpace}" not supported.`),Vr(i,e),iU(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?J2(i,e.targets,t):i})}var xa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Hc={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */Hc.exports;(function(i,e){(function(){var t,n="4.17.21",r=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",a="Expected a function",c="Invalid `variable` option passed into `_.template`",u="__lodash_hash_undefined__",f=500,d="__lodash_placeholder__",p=1,m=2,_=4,y=1,T=2,x=1,v=2,N=4,S=8,P=16,q=32,O=64,U=128,J=256,I=512,b=30,j="...",pe=800,$=16,le=1,de=2,xe=3,fe=1/0,te=9007199254740991,Ee=17976931348623157e292,Se=NaN,Re=4294967295,We=Re-1,Et=Re>>>1,ce=[["ary",U],["bind",x],["bindKey",v],["curry",S],["curryRight",P],["flip",I],["partial",q],["partialRight",O],["rearg",J]],Ae="[object Arguments]",Ie="[object Array]",be="[object AsyncFunction]",ke="[object Boolean]",Je="[object Date]",Ke="[object DOMException]",Q="[object Error]",me="[object Function]",R="[object GeneratorFunction]",D="[object Map]",H="[object Number]",K="[object Null]",A="[object Object]",M="[object Promise]",z="[object Proxy]",V="[object RegExp]",k="[object Set]",W="[object String]",ue="[object Symbol]",ne="[object Undefined]",ge="[object WeakMap]",Te="[object WeakSet]",he="[object ArrayBuffer]",Me="[object DataView]",Oe="[object Float32Array]",we="[object Float64Array]",Ne="[object Int8Array]",et="[object Int16Array]",ut="[object Int32Array]",mt="[object Uint8Array]",vt="[object Uint8ClampedArray]",ot="[object Uint16Array]",Be="[object Uint32Array]",B=/\b__p \+= '';/g,Le=/\b(__p \+=) '' \+/g,Ce=/(__e\(.*?\)|\b__t\)) \+\n'';/g,Ge=/&(?:amp|lt|gt|quot|#39);/g,Xe=/[&<>"']/g,It=RegExp(Ge.source),Ot=RegExp(Xe.source),zt=/<%-([\s\S]+?)%>/g,on=/<%([\s\S]+?)%>/g,Nt=/<%=([\s\S]+?)%>/g,Qn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ei=/^\w*$/,Ki=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ns=/[\\^$.*+?()[\]{}|]/g,Ya=RegExp(Ns.source),Wo=/^\s+/,Ds=/\s/,$a=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Us=/\{\n\/\* \[wrapped with (.+)\] \*/,Za=/,? & /,Ja=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,ru=/[()=,{}\[\]\/\s]/,su=/\\(\\)?/g,ou=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,L=/\w*$/,ee=/^[-+]0x[0-9a-f]+$/i,se=/^0b[01]+$/i,oe=/^\[object .+?Constructor\]$/,ie=/^0o[0-7]+$/i,Fe=/^(?:0|[1-9]\d*)$/,Ve=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,qe=/($^)/,je=/['\n\r\u2028\u2029\\]/g,Qe="\\ud800-\\udfff",tt="\\u0300-\\u036f",rt="\\ufe20-\\ufe2f",Xt="\\u20d0-\\u20ff",_n=tt+rt+Xt,Zt="\\u2700-\\u27bf",ti="a-z\\xdf-\\xf6\\xf8-\\xff",Ht="\\xac\\xb1\\xd7\\xf7",at="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Xo="\\u2000-\\u206f",Ft=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",Ci="A-Z\\xc0-\\xd6\\xd8-\\xde",qo="\\ufe0e\\ufe0f",vr=Ht+at+Xo+Ft,Qr="['’]",an="["+Qe+"]",pi="["+vr+"]",xr="["+_n+"]",Tn="\\d+",Ko="["+Zt+"]",ja="["+ti+"]",Yo="[^"+Qe+vr+Tn+Zt+ti+Ci+"]",au="\\ud83c[\\udffb-\\udfff]",ex="(?:"+xr+"|"+au+")",Ad="[^"+Qe+"]",lu="(?:\\ud83c[\\udde6-\\uddff]){2}",cu="[\\ud800-\\udbff][\\udc00-\\udfff]",Os="["+Ci+"]",bd="\\u200d",wd="(?:"+ja+"|"+Yo+")",tx="(?:"+Os+"|"+Yo+")",Rd="(?:"+Qr+"(?:d|ll|m|re|s|t|ve))?",Cd="(?:"+Qr+"(?:D|LL|M|RE|S|T|VE))?",Pd=ex+"?",Ld="["+qo+"]?",nx="(?:"+bd+"(?:"+[Ad,lu,cu].join("|")+")"+Ld+Pd+")*",ix="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",rx="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Id=Ld+Pd+nx,sx="(?:"+[Ko,lu,cu].join("|")+")"+Id,ox="(?:"+[Ad+xr+"?",xr,lu,cu,an].join("|")+")",ax=RegExp(Qr,"g"),lx=RegExp(xr,"g"),uu=RegExp(au+"(?="+au+")|"+ox+Id,"g"),cx=RegExp([Os+"?"+ja+"+"+Rd+"(?="+[pi,Os,"$"].join("|")+")",tx+"+"+Cd+"(?="+[pi,Os+wd,"$"].join("|")+")",Os+"?"+wd+"+"+Rd,Os+"+"+Cd,rx,ix,Tn,sx].join("|"),"g"),ux=RegExp("["+bd+Qe+_n+qo+"]"),fx=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,hx=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],dx=-1,Vt={};Vt[Oe]=Vt[we]=Vt[Ne]=Vt[et]=Vt[ut]=Vt[mt]=Vt[vt]=Vt[ot]=Vt[Be]=!0,Vt[Ae]=Vt[Ie]=Vt[he]=Vt[ke]=Vt[Me]=Vt[Je]=Vt[Q]=Vt[me]=Vt[D]=Vt[H]=Vt[A]=Vt[V]=Vt[k]=Vt[W]=Vt[ge]=!1;var Bt={};Bt[Ae]=Bt[Ie]=Bt[he]=Bt[Me]=Bt[ke]=Bt[Je]=Bt[Oe]=Bt[we]=Bt[Ne]=Bt[et]=Bt[ut]=Bt[D]=Bt[H]=Bt[A]=Bt[V]=Bt[k]=Bt[W]=Bt[ue]=Bt[mt]=Bt[vt]=Bt[ot]=Bt[Be]=!0,Bt[Q]=Bt[me]=Bt[ge]=!1;var px={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},mx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gx={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},_x={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},vx=parseFloat,xx=parseInt,Nd=typeof xa=="object"&&xa&&xa.Object===Object&&xa,yx=typeof self=="object"&&self&&self.Object===Object&&self,hn=Nd||yx||Function("return this")(),fu=e&&!e.nodeType&&e,es=fu&&!0&&i&&!i.nodeType&&i,Dd=es&&es.exports===fu,hu=Dd&&Nd.process,ni=function(){try{var Y=es&&es.require&&es.require("util").types;return Y||hu&&hu.binding&&hu.binding("util")}catch{}}(),Ud=ni&&ni.isArrayBuffer,Od=ni&&ni.isDate,Fd=ni&&ni.isMap,Bd=ni&&ni.isRegExp,zd=ni&&ni.isSet,Hd=ni&&ni.isTypedArray;function Wn(Y,ae,re){switch(re.length){case 0:return Y.call(ae);case 1:return Y.call(ae,re[0]);case 2:return Y.call(ae,re[0],re[1]);case 3:return Y.call(ae,re[0],re[1],re[2])}return Y.apply(ae,re)}function Mx(Y,ae,re,ze){for(var nt=-1,At=Y==null?0:Y.length;++nt<At;){var tn=Y[nt];ae(ze,tn,re(tn),Y)}return ze}function ii(Y,ae){for(var re=-1,ze=Y==null?0:Y.length;++re<ze&&ae(Y[re],re,Y)!==!1;);return Y}function Sx(Y,ae){for(var re=Y==null?0:Y.length;re--&&ae(Y[re],re,Y)!==!1;);return Y}function Vd(Y,ae){for(var re=-1,ze=Y==null?0:Y.length;++re<ze;)if(!ae(Y[re],re,Y))return!1;return!0}function yr(Y,ae){for(var re=-1,ze=Y==null?0:Y.length,nt=0,At=[];++re<ze;){var tn=Y[re];ae(tn,re,Y)&&(At[nt++]=tn)}return At}function Qa(Y,ae){var re=Y==null?0:Y.length;return!!re&&Fs(Y,ae,0)>-1}function du(Y,ae,re){for(var ze=-1,nt=Y==null?0:Y.length;++ze<nt;)if(re(ae,Y[ze]))return!0;return!1}function kt(Y,ae){for(var re=-1,ze=Y==null?0:Y.length,nt=Array(ze);++re<ze;)nt[re]=ae(Y[re],re,Y);return nt}function Mr(Y,ae){for(var re=-1,ze=ae.length,nt=Y.length;++re<ze;)Y[nt+re]=ae[re];return Y}function pu(Y,ae,re,ze){var nt=-1,At=Y==null?0:Y.length;for(ze&&At&&(re=Y[++nt]);++nt<At;)re=ae(re,Y[nt],nt,Y);return re}function Ex(Y,ae,re,ze){var nt=Y==null?0:Y.length;for(ze&&nt&&(re=Y[--nt]);nt--;)re=ae(re,Y[nt],nt,Y);return re}function mu(Y,ae){for(var re=-1,ze=Y==null?0:Y.length;++re<ze;)if(ae(Y[re],re,Y))return!0;return!1}var Tx=gu("length");function Ax(Y){return Y.split("")}function bx(Y){return Y.match(Ja)||[]}function Gd(Y,ae,re){var ze;return re(Y,function(nt,At,tn){if(ae(nt,At,tn))return ze=At,!1}),ze}function el(Y,ae,re,ze){for(var nt=Y.length,At=re+(ze?1:-1);ze?At--:++At<nt;)if(ae(Y[At],At,Y))return At;return-1}function Fs(Y,ae,re){return ae===ae?Bx(Y,ae,re):el(Y,kd,re)}function wx(Y,ae,re,ze){for(var nt=re-1,At=Y.length;++nt<At;)if(ze(Y[nt],ae))return nt;return-1}function kd(Y){return Y!==Y}function Wd(Y,ae){var re=Y==null?0:Y.length;return re?vu(Y,ae)/re:Se}function gu(Y){return function(ae){return ae==null?t:ae[Y]}}function _u(Y){return function(ae){return Y==null?t:Y[ae]}}function Xd(Y,ae,re,ze,nt){return nt(Y,function(At,tn,Dt){re=ze?(ze=!1,At):ae(re,At,tn,Dt)}),re}function Rx(Y,ae){var re=Y.length;for(Y.sort(ae);re--;)Y[re]=Y[re].value;return Y}function vu(Y,ae){for(var re,ze=-1,nt=Y.length;++ze<nt;){var At=ae(Y[ze]);At!==t&&(re=re===t?At:re+At)}return re}function xu(Y,ae){for(var re=-1,ze=Array(Y);++re<Y;)ze[re]=ae(re);return ze}function Cx(Y,ae){return kt(ae,function(re){return[re,Y[re]]})}function qd(Y){return Y&&Y.slice(0,Zd(Y)+1).replace(Wo,"")}function Xn(Y){return function(ae){return Y(ae)}}function yu(Y,ae){return kt(ae,function(re){return Y[re]})}function $o(Y,ae){return Y.has(ae)}function Kd(Y,ae){for(var re=-1,ze=Y.length;++re<ze&&Fs(ae,Y[re],0)>-1;);return re}function Yd(Y,ae){for(var re=Y.length;re--&&Fs(ae,Y[re],0)>-1;);return re}function Px(Y,ae){for(var re=Y.length,ze=0;re--;)Y[re]===ae&&++ze;return ze}var Lx=_u(px),Ix=_u(mx);function Nx(Y){return"\\"+_x[Y]}function Dx(Y,ae){return Y==null?t:Y[ae]}function Bs(Y){return ux.test(Y)}function Ux(Y){return fx.test(Y)}function Ox(Y){for(var ae,re=[];!(ae=Y.next()).done;)re.push(ae.value);return re}function Mu(Y){var ae=-1,re=Array(Y.size);return Y.forEach(function(ze,nt){re[++ae]=[nt,ze]}),re}function $d(Y,ae){return function(re){return Y(ae(re))}}function Sr(Y,ae){for(var re=-1,ze=Y.length,nt=0,At=[];++re<ze;){var tn=Y[re];(tn===ae||tn===d)&&(Y[re]=d,At[nt++]=re)}return At}function tl(Y){var ae=-1,re=Array(Y.size);return Y.forEach(function(ze){re[++ae]=ze}),re}function Fx(Y){var ae=-1,re=Array(Y.size);return Y.forEach(function(ze){re[++ae]=[ze,ze]}),re}function Bx(Y,ae,re){for(var ze=re-1,nt=Y.length;++ze<nt;)if(Y[ze]===ae)return ze;return-1}function zx(Y,ae,re){for(var ze=re+1;ze--;)if(Y[ze]===ae)return ze;return ze}function zs(Y){return Bs(Y)?Vx(Y):Tx(Y)}function mi(Y){return Bs(Y)?Gx(Y):Ax(Y)}function Zd(Y){for(var ae=Y.length;ae--&&Ds.test(Y.charAt(ae)););return ae}var Hx=_u(gx);function Vx(Y){for(var ae=uu.lastIndex=0;uu.test(Y);)++ae;return ae}function Gx(Y){return Y.match(uu)||[]}function kx(Y){return Y.match(cx)||[]}var Wx=function Y(ae){ae=ae==null?hn:Hs.defaults(hn.Object(),ae,Hs.pick(hn,hx));var re=ae.Array,ze=ae.Date,nt=ae.Error,At=ae.Function,tn=ae.Math,Dt=ae.Object,Su=ae.RegExp,Xx=ae.String,ri=ae.TypeError,nl=re.prototype,qx=At.prototype,Vs=Dt.prototype,il=ae["__core-js_shared__"],rl=qx.toString,Ct=Vs.hasOwnProperty,Kx=0,Jd=function(){var s=/[^.]+$/.exec(il&&il.keys&&il.keys.IE_PROTO||"");return s?"Symbol(src)_1."+s:""}(),sl=Vs.toString,Yx=rl.call(Dt),$x=hn._,Zx=Su("^"+rl.call(Ct).replace(Ns,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ol=Dd?ae.Buffer:t,Er=ae.Symbol,al=ae.Uint8Array,jd=ol?ol.allocUnsafe:t,ll=$d(Dt.getPrototypeOf,Dt),Qd=Dt.create,ep=Vs.propertyIsEnumerable,cl=nl.splice,tp=Er?Er.isConcatSpreadable:t,Zo=Er?Er.iterator:t,ts=Er?Er.toStringTag:t,ul=function(){try{var s=os(Dt,"defineProperty");return s({},"",{}),s}catch{}}(),Jx=ae.clearTimeout!==hn.clearTimeout&&ae.clearTimeout,jx=ze&&ze.now!==hn.Date.now&&ze.now,Qx=ae.setTimeout!==hn.setTimeout&&ae.setTimeout,fl=tn.ceil,hl=tn.floor,Eu=Dt.getOwnPropertySymbols,ey=ol?ol.isBuffer:t,np=ae.isFinite,ty=nl.join,ny=$d(Dt.keys,Dt),nn=tn.max,vn=tn.min,iy=ze.now,ry=ae.parseInt,ip=tn.random,sy=nl.reverse,Tu=os(ae,"DataView"),Jo=os(ae,"Map"),Au=os(ae,"Promise"),Gs=os(ae,"Set"),jo=os(ae,"WeakMap"),Qo=os(Dt,"create"),dl=jo&&new jo,ks={},oy=as(Tu),ay=as(Jo),ly=as(Au),cy=as(Gs),uy=as(jo),pl=Er?Er.prototype:t,ea=pl?pl.valueOf:t,rp=pl?pl.toString:t;function w(s){if($t(s)&&!st(s)&&!(s instanceof yt)){if(s instanceof si)return s;if(Ct.call(s,"__wrapped__"))return sm(s)}return new si(s)}var Ws=function(){function s(){}return function(l){if(!qt(l))return{};if(Qd)return Qd(l);s.prototype=l;var h=new s;return s.prototype=t,h}}();function ml(){}function si(s,l){this.__wrapped__=s,this.__actions__=[],this.__chain__=!!l,this.__index__=0,this.__values__=t}w.templateSettings={escape:zt,evaluate:on,interpolate:Nt,variable:"",imports:{_:w}},w.prototype=ml.prototype,w.prototype.constructor=w,si.prototype=Ws(ml.prototype),si.prototype.constructor=si;function yt(s){this.__wrapped__=s,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Re,this.__views__=[]}function fy(){var s=new yt(this.__wrapped__);return s.__actions__=On(this.__actions__),s.__dir__=this.__dir__,s.__filtered__=this.__filtered__,s.__iteratees__=On(this.__iteratees__),s.__takeCount__=this.__takeCount__,s.__views__=On(this.__views__),s}function hy(){if(this.__filtered__){var s=new yt(this);s.__dir__=-1,s.__filtered__=!0}else s=this.clone(),s.__dir__*=-1;return s}function dy(){var s=this.__wrapped__.value(),l=this.__dir__,h=st(s),g=l<0,E=h?s.length:0,C=AM(0,E,this.__views__),F=C.start,G=C.end,Z=G-F,_e=g?G:F-1,ve=this.__iteratees__,ye=ve.length,De=0,He=vn(Z,this.__takeCount__);if(!h||!g&&E==Z&&He==Z)return Rp(s,this.__actions__);var $e=[];e:for(;Z--&&De<He;){_e+=l;for(var ft=-1,Ze=s[_e];++ft<ye;){var xt=ve[ft],St=xt.iteratee,Yn=xt.type,wn=St(Ze);if(Yn==de)Ze=wn;else if(!wn){if(Yn==le)continue e;break e}}$e[De++]=Ze}return $e}yt.prototype=Ws(ml.prototype),yt.prototype.constructor=yt;function ns(s){var l=-1,h=s==null?0:s.length;for(this.clear();++l<h;){var g=s[l];this.set(g[0],g[1])}}function py(){this.__data__=Qo?Qo(null):{},this.size=0}function my(s){var l=this.has(s)&&delete this.__data__[s];return this.size-=l?1:0,l}function gy(s){var l=this.__data__;if(Qo){var h=l[s];return h===u?t:h}return Ct.call(l,s)?l[s]:t}function _y(s){var l=this.__data__;return Qo?l[s]!==t:Ct.call(l,s)}function vy(s,l){var h=this.__data__;return this.size+=this.has(s)?0:1,h[s]=Qo&&l===t?u:l,this}ns.prototype.clear=py,ns.prototype.delete=my,ns.prototype.get=gy,ns.prototype.has=_y,ns.prototype.set=vy;function Yi(s){var l=-1,h=s==null?0:s.length;for(this.clear();++l<h;){var g=s[l];this.set(g[0],g[1])}}function xy(){this.__data__=[],this.size=0}function yy(s){var l=this.__data__,h=gl(l,s);if(h<0)return!1;var g=l.length-1;return h==g?l.pop():cl.call(l,h,1),--this.size,!0}function My(s){var l=this.__data__,h=gl(l,s);return h<0?t:l[h][1]}function Sy(s){return gl(this.__data__,s)>-1}function Ey(s,l){var h=this.__data__,g=gl(h,s);return g<0?(++this.size,h.push([s,l])):h[g][1]=l,this}Yi.prototype.clear=xy,Yi.prototype.delete=yy,Yi.prototype.get=My,Yi.prototype.has=Sy,Yi.prototype.set=Ey;function $i(s){var l=-1,h=s==null?0:s.length;for(this.clear();++l<h;){var g=s[l];this.set(g[0],g[1])}}function Ty(){this.size=0,this.__data__={hash:new ns,map:new(Jo||Yi),string:new ns}}function Ay(s){var l=Rl(this,s).delete(s);return this.size-=l?1:0,l}function by(s){return Rl(this,s).get(s)}function wy(s){return Rl(this,s).has(s)}function Ry(s,l){var h=Rl(this,s),g=h.size;return h.set(s,l),this.size+=h.size==g?0:1,this}$i.prototype.clear=Ty,$i.prototype.delete=Ay,$i.prototype.get=by,$i.prototype.has=wy,$i.prototype.set=Ry;function is(s){var l=-1,h=s==null?0:s.length;for(this.__data__=new $i;++l<h;)this.add(s[l])}function Cy(s){return this.__data__.set(s,u),this}function Py(s){return this.__data__.has(s)}is.prototype.add=is.prototype.push=Cy,is.prototype.has=Py;function gi(s){var l=this.__data__=new Yi(s);this.size=l.size}function Ly(){this.__data__=new Yi,this.size=0}function Iy(s){var l=this.__data__,h=l.delete(s);return this.size=l.size,h}function Ny(s){return this.__data__.get(s)}function Dy(s){return this.__data__.has(s)}function Uy(s,l){var h=this.__data__;if(h instanceof Yi){var g=h.__data__;if(!Jo||g.length<r-1)return g.push([s,l]),this.size=++h.size,this;h=this.__data__=new $i(g)}return h.set(s,l),this.size=h.size,this}gi.prototype.clear=Ly,gi.prototype.delete=Iy,gi.prototype.get=Ny,gi.prototype.has=Dy,gi.prototype.set=Uy;function sp(s,l){var h=st(s),g=!h&&ls(s),E=!h&&!g&&Rr(s),C=!h&&!g&&!E&&Ys(s),F=h||g||E||C,G=F?xu(s.length,Xx):[],Z=G.length;for(var _e in s)(l||Ct.call(s,_e))&&!(F&&(_e=="length"||E&&(_e=="offset"||_e=="parent")||C&&(_e=="buffer"||_e=="byteLength"||_e=="byteOffset")||Qi(_e,Z)))&&G.push(_e);return G}function op(s){var l=s.length;return l?s[Ou(0,l-1)]:t}function Oy(s,l){return Cl(On(s),rs(l,0,s.length))}function Fy(s){return Cl(On(s))}function bu(s,l,h){(h!==t&&!_i(s[l],h)||h===t&&!(l in s))&&Zi(s,l,h)}function ta(s,l,h){var g=s[l];(!(Ct.call(s,l)&&_i(g,h))||h===t&&!(l in s))&&Zi(s,l,h)}function gl(s,l){for(var h=s.length;h--;)if(_i(s[h][0],l))return h;return-1}function By(s,l,h,g){return Tr(s,function(E,C,F){l(g,E,h(E),F)}),g}function ap(s,l){return s&&Li(l,ln(l),s)}function zy(s,l){return s&&Li(l,Bn(l),s)}function Zi(s,l,h){l=="__proto__"&&ul?ul(s,l,{configurable:!0,enumerable:!0,value:h,writable:!0}):s[l]=h}function wu(s,l){for(var h=-1,g=l.length,E=re(g),C=s==null;++h<g;)E[h]=C?t:lf(s,l[h]);return E}function rs(s,l,h){return s===s&&(h!==t&&(s=s<=h?s:h),l!==t&&(s=s>=l?s:l)),s}function oi(s,l,h,g,E,C){var F,G=l&p,Z=l&m,_e=l&_;if(h&&(F=E?h(s,g,E,C):h(s)),F!==t)return F;if(!qt(s))return s;var ve=st(s);if(ve){if(F=wM(s),!G)return On(s,F)}else{var ye=xn(s),De=ye==me||ye==R;if(Rr(s))return Lp(s,G);if(ye==A||ye==Ae||De&&!E){if(F=Z||De?{}:Zp(s),!G)return Z?gM(s,zy(F,s)):mM(s,ap(F,s))}else{if(!Bt[ye])return E?s:{};F=RM(s,ye,G)}}C||(C=new gi);var He=C.get(s);if(He)return He;C.set(s,F),Am(s)?s.forEach(function(Ze){F.add(oi(Ze,l,h,Ze,s,C))}):Em(s)&&s.forEach(function(Ze,xt){F.set(xt,oi(Ze,l,h,xt,s,C))});var $e=_e?Z?Ku:qu:Z?Bn:ln,ft=ve?t:$e(s);return ii(ft||s,function(Ze,xt){ft&&(xt=Ze,Ze=s[xt]),ta(F,xt,oi(Ze,l,h,xt,s,C))}),F}function Hy(s){var l=ln(s);return function(h){return lp(h,s,l)}}function lp(s,l,h){var g=h.length;if(s==null)return!g;for(s=Dt(s);g--;){var E=h[g],C=l[E],F=s[E];if(F===t&&!(E in s)||!C(F))return!1}return!0}function cp(s,l,h){if(typeof s!="function")throw new ri(a);return la(function(){s.apply(t,h)},l)}function na(s,l,h,g){var E=-1,C=Qa,F=!0,G=s.length,Z=[],_e=l.length;if(!G)return Z;h&&(l=kt(l,Xn(h))),g?(C=du,F=!1):l.length>=r&&(C=$o,F=!1,l=new is(l));e:for(;++E<G;){var ve=s[E],ye=h==null?ve:h(ve);if(ve=g||ve!==0?ve:0,F&&ye===ye){for(var De=_e;De--;)if(l[De]===ye)continue e;Z.push(ve)}else C(l,ye,g)||Z.push(ve)}return Z}var Tr=Op(Pi),up=Op(Cu,!0);function Vy(s,l){var h=!0;return Tr(s,function(g,E,C){return h=!!l(g,E,C),h}),h}function _l(s,l,h){for(var g=-1,E=s.length;++g<E;){var C=s[g],F=l(C);if(F!=null&&(G===t?F===F&&!Kn(F):h(F,G)))var G=F,Z=C}return Z}function Gy(s,l,h,g){var E=s.length;for(h=lt(h),h<0&&(h=-h>E?0:E+h),g=g===t||g>E?E:lt(g),g<0&&(g+=E),g=h>g?0:wm(g);h<g;)s[h++]=l;return s}function fp(s,l){var h=[];return Tr(s,function(g,E,C){l(g,E,C)&&h.push(g)}),h}function dn(s,l,h,g,E){var C=-1,F=s.length;for(h||(h=PM),E||(E=[]);++C<F;){var G=s[C];l>0&&h(G)?l>1?dn(G,l-1,h,g,E):Mr(E,G):g||(E[E.length]=G)}return E}var Ru=Fp(),hp=Fp(!0);function Pi(s,l){return s&&Ru(s,l,ln)}function Cu(s,l){return s&&hp(s,l,ln)}function vl(s,l){return yr(l,function(h){return er(s[h])})}function ss(s,l){l=br(l,s);for(var h=0,g=l.length;s!=null&&h<g;)s=s[Ii(l[h++])];return h&&h==g?s:t}function dp(s,l,h){var g=l(s);return st(s)?g:Mr(g,h(s))}function An(s){return s==null?s===t?ne:K:ts&&ts in Dt(s)?TM(s):FM(s)}function Pu(s,l){return s>l}function ky(s,l){return s!=null&&Ct.call(s,l)}function Wy(s,l){return s!=null&&l in Dt(s)}function Xy(s,l,h){return s>=vn(l,h)&&s<nn(l,h)}function Lu(s,l,h){for(var g=h?du:Qa,E=s[0].length,C=s.length,F=C,G=re(C),Z=1/0,_e=[];F--;){var ve=s[F];F&&l&&(ve=kt(ve,Xn(l))),Z=vn(ve.length,Z),G[F]=!h&&(l||E>=120&&ve.length>=120)?new is(F&&ve):t}ve=s[0];var ye=-1,De=G[0];e:for(;++ye<E&&_e.length<Z;){var He=ve[ye],$e=l?l(He):He;if(He=h||He!==0?He:0,!(De?$o(De,$e):g(_e,$e,h))){for(F=C;--F;){var ft=G[F];if(!(ft?$o(ft,$e):g(s[F],$e,h)))continue e}De&&De.push($e),_e.push(He)}}return _e}function qy(s,l,h,g){return Pi(s,function(E,C,F){l(g,h(E),C,F)}),g}function ia(s,l,h){l=br(l,s),s=em(s,l);var g=s==null?s:s[Ii(li(l))];return g==null?t:Wn(g,s,h)}function pp(s){return $t(s)&&An(s)==Ae}function Ky(s){return $t(s)&&An(s)==he}function Yy(s){return $t(s)&&An(s)==Je}function ra(s,l,h,g,E){return s===l?!0:s==null||l==null||!$t(s)&&!$t(l)?s!==s&&l!==l:$y(s,l,h,g,ra,E)}function $y(s,l,h,g,E,C){var F=st(s),G=st(l),Z=F?Ie:xn(s),_e=G?Ie:xn(l);Z=Z==Ae?A:Z,_e=_e==Ae?A:_e;var ve=Z==A,ye=_e==A,De=Z==_e;if(De&&Rr(s)){if(!Rr(l))return!1;F=!0,ve=!1}if(De&&!ve)return C||(C=new gi),F||Ys(s)?Kp(s,l,h,g,E,C):SM(s,l,Z,h,g,E,C);if(!(h&y)){var He=ve&&Ct.call(s,"__wrapped__"),$e=ye&&Ct.call(l,"__wrapped__");if(He||$e){var ft=He?s.value():s,Ze=$e?l.value():l;return C||(C=new gi),E(ft,Ze,h,g,C)}}return De?(C||(C=new gi),EM(s,l,h,g,E,C)):!1}function Zy(s){return $t(s)&&xn(s)==D}function Iu(s,l,h,g){var E=h.length,C=E,F=!g;if(s==null)return!C;for(s=Dt(s);E--;){var G=h[E];if(F&&G[2]?G[1]!==s[G[0]]:!(G[0]in s))return!1}for(;++E<C;){G=h[E];var Z=G[0],_e=s[Z],ve=G[1];if(F&&G[2]){if(_e===t&&!(Z in s))return!1}else{var ye=new gi;if(g)var De=g(_e,ve,Z,s,l,ye);if(!(De===t?ra(ve,_e,y|T,g,ye):De))return!1}}return!0}function mp(s){if(!qt(s)||IM(s))return!1;var l=er(s)?Zx:oe;return l.test(as(s))}function Jy(s){return $t(s)&&An(s)==V}function jy(s){return $t(s)&&xn(s)==k}function Qy(s){return $t(s)&&Ul(s.length)&&!!Vt[An(s)]}function gp(s){return typeof s=="function"?s:s==null?zn:typeof s=="object"?st(s)?xp(s[0],s[1]):vp(s):Bm(s)}function Nu(s){if(!aa(s))return ny(s);var l=[];for(var h in Dt(s))Ct.call(s,h)&&h!="constructor"&&l.push(h);return l}function eM(s){if(!qt(s))return OM(s);var l=aa(s),h=[];for(var g in s)g=="constructor"&&(l||!Ct.call(s,g))||h.push(g);return h}function Du(s,l){return s<l}function _p(s,l){var h=-1,g=Fn(s)?re(s.length):[];return Tr(s,function(E,C,F){g[++h]=l(E,C,F)}),g}function vp(s){var l=$u(s);return l.length==1&&l[0][2]?jp(l[0][0],l[0][1]):function(h){return h===s||Iu(h,s,l)}}function xp(s,l){return Ju(s)&&Jp(l)?jp(Ii(s),l):function(h){var g=lf(h,s);return g===t&&g===l?cf(h,s):ra(l,g,y|T)}}function xl(s,l,h,g,E){s!==l&&Ru(l,function(C,F){if(E||(E=new gi),qt(C))tM(s,l,F,h,xl,g,E);else{var G=g?g(Qu(s,F),C,F+"",s,l,E):t;G===t&&(G=C),bu(s,F,G)}},Bn)}function tM(s,l,h,g,E,C,F){var G=Qu(s,h),Z=Qu(l,h),_e=F.get(Z);if(_e){bu(s,h,_e);return}var ve=C?C(G,Z,h+"",s,l,F):t,ye=ve===t;if(ye){var De=st(Z),He=!De&&Rr(Z),$e=!De&&!He&&Ys(Z);ve=Z,De||He||$e?st(G)?ve=G:Jt(G)?ve=On(G):He?(ye=!1,ve=Lp(Z,!0)):$e?(ye=!1,ve=Ip(Z,!0)):ve=[]:ca(Z)||ls(Z)?(ve=G,ls(G)?ve=Rm(G):(!qt(G)||er(G))&&(ve=Zp(Z))):ye=!1}ye&&(F.set(Z,ve),E(ve,Z,g,C,F),F.delete(Z)),bu(s,h,ve)}function yp(s,l){var h=s.length;if(h)return l+=l<0?h:0,Qi(l,h)?s[l]:t}function Mp(s,l,h){l.length?l=kt(l,function(C){return st(C)?function(F){return ss(F,C.length===1?C[0]:C)}:C}):l=[zn];var g=-1;l=kt(l,Xn(Ye()));var E=_p(s,function(C,F,G){var Z=kt(l,function(_e){return _e(C)});return{criteria:Z,index:++g,value:C}});return Rx(E,function(C,F){return pM(C,F,h)})}function nM(s,l){return Sp(s,l,function(h,g){return cf(s,g)})}function Sp(s,l,h){for(var g=-1,E=l.length,C={};++g<E;){var F=l[g],G=ss(s,F);h(G,F)&&sa(C,br(F,s),G)}return C}function iM(s){return function(l){return ss(l,s)}}function Uu(s,l,h,g){var E=g?wx:Fs,C=-1,F=l.length,G=s;for(s===l&&(l=On(l)),h&&(G=kt(s,Xn(h)));++C<F;)for(var Z=0,_e=l[C],ve=h?h(_e):_e;(Z=E(G,ve,Z,g))>-1;)G!==s&&cl.call(G,Z,1),cl.call(s,Z,1);return s}function Ep(s,l){for(var h=s?l.length:0,g=h-1;h--;){var E=l[h];if(h==g||E!==C){var C=E;Qi(E)?cl.call(s,E,1):zu(s,E)}}return s}function Ou(s,l){return s+hl(ip()*(l-s+1))}function rM(s,l,h,g){for(var E=-1,C=nn(fl((l-s)/(h||1)),0),F=re(C);C--;)F[g?C:++E]=s,s+=h;return F}function Fu(s,l){var h="";if(!s||l<1||l>te)return h;do l%2&&(h+=s),l=hl(l/2),l&&(s+=s);while(l);return h}function gt(s,l){return ef(Qp(s,l,zn),s+"")}function sM(s){return op($s(s))}function oM(s,l){var h=$s(s);return Cl(h,rs(l,0,h.length))}function sa(s,l,h,g){if(!qt(s))return s;l=br(l,s);for(var E=-1,C=l.length,F=C-1,G=s;G!=null&&++E<C;){var Z=Ii(l[E]),_e=h;if(Z==="__proto__"||Z==="constructor"||Z==="prototype")return s;if(E!=F){var ve=G[Z];_e=g?g(ve,Z,G):t,_e===t&&(_e=qt(ve)?ve:Qi(l[E+1])?[]:{})}ta(G,Z,_e),G=G[Z]}return s}var Tp=dl?function(s,l){return dl.set(s,l),s}:zn,aM=ul?function(s,l){return ul(s,"toString",{configurable:!0,enumerable:!1,value:ff(l),writable:!0})}:zn;function lM(s){return Cl($s(s))}function ai(s,l,h){var g=-1,E=s.length;l<0&&(l=-l>E?0:E+l),h=h>E?E:h,h<0&&(h+=E),E=l>h?0:h-l>>>0,l>>>=0;for(var C=re(E);++g<E;)C[g]=s[g+l];return C}function cM(s,l){var h;return Tr(s,function(g,E,C){return h=l(g,E,C),!h}),!!h}function yl(s,l,h){var g=0,E=s==null?g:s.length;if(typeof l=="number"&&l===l&&E<=Et){for(;g<E;){var C=g+E>>>1,F=s[C];F!==null&&!Kn(F)&&(h?F<=l:F<l)?g=C+1:E=C}return E}return Bu(s,l,zn,h)}function Bu(s,l,h,g){var E=0,C=s==null?0:s.length;if(C===0)return 0;l=h(l);for(var F=l!==l,G=l===null,Z=Kn(l),_e=l===t;E<C;){var ve=hl((E+C)/2),ye=h(s[ve]),De=ye!==t,He=ye===null,$e=ye===ye,ft=Kn(ye);if(F)var Ze=g||$e;else _e?Ze=$e&&(g||De):G?Ze=$e&&De&&(g||!He):Z?Ze=$e&&De&&!He&&(g||!ft):He||ft?Ze=!1:Ze=g?ye<=l:ye<l;Ze?E=ve+1:C=ve}return vn(C,We)}function Ap(s,l){for(var h=-1,g=s.length,E=0,C=[];++h<g;){var F=s[h],G=l?l(F):F;if(!h||!_i(G,Z)){var Z=G;C[E++]=F===0?0:F}}return C}function bp(s){return typeof s=="number"?s:Kn(s)?Se:+s}function qn(s){if(typeof s=="string")return s;if(st(s))return kt(s,qn)+"";if(Kn(s))return rp?rp.call(s):"";var l=s+"";return l=="0"&&1/s==-fe?"-0":l}function Ar(s,l,h){var g=-1,E=Qa,C=s.length,F=!0,G=[],Z=G;if(h)F=!1,E=du;else if(C>=r){var _e=l?null:yM(s);if(_e)return tl(_e);F=!1,E=$o,Z=new is}else Z=l?[]:G;e:for(;++g<C;){var ve=s[g],ye=l?l(ve):ve;if(ve=h||ve!==0?ve:0,F&&ye===ye){for(var De=Z.length;De--;)if(Z[De]===ye)continue e;l&&Z.push(ye),G.push(ve)}else E(Z,ye,h)||(Z!==G&&Z.push(ye),G.push(ve))}return G}function zu(s,l){return l=br(l,s),s=em(s,l),s==null||delete s[Ii(li(l))]}function wp(s,l,h,g){return sa(s,l,h(ss(s,l)),g)}function Ml(s,l,h,g){for(var E=s.length,C=g?E:-1;(g?C--:++C<E)&&l(s[C],C,s););return h?ai(s,g?0:C,g?C+1:E):ai(s,g?C+1:0,g?E:C)}function Rp(s,l){var h=s;return h instanceof yt&&(h=h.value()),pu(l,function(g,E){return E.func.apply(E.thisArg,Mr([g],E.args))},h)}function Hu(s,l,h){var g=s.length;if(g<2)return g?Ar(s[0]):[];for(var E=-1,C=re(g);++E<g;)for(var F=s[E],G=-1;++G<g;)G!=E&&(C[E]=na(C[E]||F,s[G],l,h));return Ar(dn(C,1),l,h)}function Cp(s,l,h){for(var g=-1,E=s.length,C=l.length,F={};++g<E;){var G=g<C?l[g]:t;h(F,s[g],G)}return F}function Vu(s){return Jt(s)?s:[]}function Gu(s){return typeof s=="function"?s:zn}function br(s,l){return st(s)?s:Ju(s,l)?[s]:rm(wt(s))}var uM=gt;function wr(s,l,h){var g=s.length;return h=h===t?g:h,!l&&h>=g?s:ai(s,l,h)}var Pp=Jx||function(s){return hn.clearTimeout(s)};function Lp(s,l){if(l)return s.slice();var h=s.length,g=jd?jd(h):new s.constructor(h);return s.copy(g),g}function ku(s){var l=new s.constructor(s.byteLength);return new al(l).set(new al(s)),l}function fM(s,l){var h=l?ku(s.buffer):s.buffer;return new s.constructor(h,s.byteOffset,s.byteLength)}function hM(s){var l=new s.constructor(s.source,L.exec(s));return l.lastIndex=s.lastIndex,l}function dM(s){return ea?Dt(ea.call(s)):{}}function Ip(s,l){var h=l?ku(s.buffer):s.buffer;return new s.constructor(h,s.byteOffset,s.length)}function Np(s,l){if(s!==l){var h=s!==t,g=s===null,E=s===s,C=Kn(s),F=l!==t,G=l===null,Z=l===l,_e=Kn(l);if(!G&&!_e&&!C&&s>l||C&&F&&Z&&!G&&!_e||g&&F&&Z||!h&&Z||!E)return 1;if(!g&&!C&&!_e&&s<l||_e&&h&&E&&!g&&!C||G&&h&&E||!F&&E||!Z)return-1}return 0}function pM(s,l,h){for(var g=-1,E=s.criteria,C=l.criteria,F=E.length,G=h.length;++g<F;){var Z=Np(E[g],C[g]);if(Z){if(g>=G)return Z;var _e=h[g];return Z*(_e=="desc"?-1:1)}}return s.index-l.index}function Dp(s,l,h,g){for(var E=-1,C=s.length,F=h.length,G=-1,Z=l.length,_e=nn(C-F,0),ve=re(Z+_e),ye=!g;++G<Z;)ve[G]=l[G];for(;++E<F;)(ye||E<C)&&(ve[h[E]]=s[E]);for(;_e--;)ve[G++]=s[E++];return ve}function Up(s,l,h,g){for(var E=-1,C=s.length,F=-1,G=h.length,Z=-1,_e=l.length,ve=nn(C-G,0),ye=re(ve+_e),De=!g;++E<ve;)ye[E]=s[E];for(var He=E;++Z<_e;)ye[He+Z]=l[Z];for(;++F<G;)(De||E<C)&&(ye[He+h[F]]=s[E++]);return ye}function On(s,l){var h=-1,g=s.length;for(l||(l=re(g));++h<g;)l[h]=s[h];return l}function Li(s,l,h,g){var E=!h;h||(h={});for(var C=-1,F=l.length;++C<F;){var G=l[C],Z=g?g(h[G],s[G],G,h,s):t;Z===t&&(Z=s[G]),E?Zi(h,G,Z):ta(h,G,Z)}return h}function mM(s,l){return Li(s,Zu(s),l)}function gM(s,l){return Li(s,Yp(s),l)}function Sl(s,l){return function(h,g){var E=st(h)?Mx:By,C=l?l():{};return E(h,s,Ye(g,2),C)}}function Xs(s){return gt(function(l,h){var g=-1,E=h.length,C=E>1?h[E-1]:t,F=E>2?h[2]:t;for(C=s.length>3&&typeof C=="function"?(E--,C):t,F&&bn(h[0],h[1],F)&&(C=E<3?t:C,E=1),l=Dt(l);++g<E;){var G=h[g];G&&s(l,G,g,C)}return l})}function Op(s,l){return function(h,g){if(h==null)return h;if(!Fn(h))return s(h,g);for(var E=h.length,C=l?E:-1,F=Dt(h);(l?C--:++C<E)&&g(F[C],C,F)!==!1;);return h}}function Fp(s){return function(l,h,g){for(var E=-1,C=Dt(l),F=g(l),G=F.length;G--;){var Z=F[s?G:++E];if(h(C[Z],Z,C)===!1)break}return l}}function _M(s,l,h){var g=l&x,E=oa(s);function C(){var F=this&&this!==hn&&this instanceof C?E:s;return F.apply(g?h:this,arguments)}return C}function Bp(s){return function(l){l=wt(l);var h=Bs(l)?mi(l):t,g=h?h[0]:l.charAt(0),E=h?wr(h,1).join(""):l.slice(1);return g[s]()+E}}function qs(s){return function(l){return pu(Om(Um(l).replace(ax,"")),s,"")}}function oa(s){return function(){var l=arguments;switch(l.length){case 0:return new s;case 1:return new s(l[0]);case 2:return new s(l[0],l[1]);case 3:return new s(l[0],l[1],l[2]);case 4:return new s(l[0],l[1],l[2],l[3]);case 5:return new s(l[0],l[1],l[2],l[3],l[4]);case 6:return new s(l[0],l[1],l[2],l[3],l[4],l[5]);case 7:return new s(l[0],l[1],l[2],l[3],l[4],l[5],l[6])}var h=Ws(s.prototype),g=s.apply(h,l);return qt(g)?g:h}}function vM(s,l,h){var g=oa(s);function E(){for(var C=arguments.length,F=re(C),G=C,Z=Ks(E);G--;)F[G]=arguments[G];var _e=C<3&&F[0]!==Z&&F[C-1]!==Z?[]:Sr(F,Z);if(C-=_e.length,C<h)return kp(s,l,El,E.placeholder,t,F,_e,t,t,h-C);var ve=this&&this!==hn&&this instanceof E?g:s;return Wn(ve,this,F)}return E}function zp(s){return function(l,h,g){var E=Dt(l);if(!Fn(l)){var C=Ye(h,3);l=ln(l),h=function(G){return C(E[G],G,E)}}var F=s(l,h,g);return F>-1?E[C?l[F]:F]:t}}function Hp(s){return ji(function(l){var h=l.length,g=h,E=si.prototype.thru;for(s&&l.reverse();g--;){var C=l[g];if(typeof C!="function")throw new ri(a);if(E&&!F&&wl(C)=="wrapper")var F=new si([],!0)}for(g=F?g:h;++g<h;){C=l[g];var G=wl(C),Z=G=="wrapper"?Yu(C):t;Z&&ju(Z[0])&&Z[1]==(U|S|q|J)&&!Z[4].length&&Z[9]==1?F=F[wl(Z[0])].apply(F,Z[3]):F=C.length==1&&ju(C)?F[G]():F.thru(C)}return function(){var _e=arguments,ve=_e[0];if(F&&_e.length==1&&st(ve))return F.plant(ve).value();for(var ye=0,De=h?l[ye].apply(this,_e):ve;++ye<h;)De=l[ye].call(this,De);return De}})}function El(s,l,h,g,E,C,F,G,Z,_e){var ve=l&U,ye=l&x,De=l&v,He=l&(S|P),$e=l&I,ft=De?t:oa(s);function Ze(){for(var xt=arguments.length,St=re(xt),Yn=xt;Yn--;)St[Yn]=arguments[Yn];if(He)var wn=Ks(Ze),$n=Px(St,wn);if(g&&(St=Dp(St,g,E,He)),C&&(St=Up(St,C,F,He)),xt-=$n,He&&xt<_e){var jt=Sr(St,wn);return kp(s,l,El,Ze.placeholder,h,St,jt,G,Z,_e-xt)}var vi=ye?h:this,nr=De?vi[s]:s;return xt=St.length,G?St=BM(St,G):$e&&xt>1&&St.reverse(),ve&&Z<xt&&(St.length=Z),this&&this!==hn&&this instanceof Ze&&(nr=ft||oa(nr)),nr.apply(vi,St)}return Ze}function Vp(s,l){return function(h,g){return qy(h,s,l(g),{})}}function Tl(s,l){return function(h,g){var E;if(h===t&&g===t)return l;if(h!==t&&(E=h),g!==t){if(E===t)return g;typeof h=="string"||typeof g=="string"?(h=qn(h),g=qn(g)):(h=bp(h),g=bp(g)),E=s(h,g)}return E}}function Wu(s){return ji(function(l){return l=kt(l,Xn(Ye())),gt(function(h){var g=this;return s(l,function(E){return Wn(E,g,h)})})})}function Al(s,l){l=l===t?" ":qn(l);var h=l.length;if(h<2)return h?Fu(l,s):l;var g=Fu(l,fl(s/zs(l)));return Bs(l)?wr(mi(g),0,s).join(""):g.slice(0,s)}function xM(s,l,h,g){var E=l&x,C=oa(s);function F(){for(var G=-1,Z=arguments.length,_e=-1,ve=g.length,ye=re(ve+Z),De=this&&this!==hn&&this instanceof F?C:s;++_e<ve;)ye[_e]=g[_e];for(;Z--;)ye[_e++]=arguments[++G];return Wn(De,E?h:this,ye)}return F}function Gp(s){return function(l,h,g){return g&&typeof g!="number"&&bn(l,h,g)&&(h=g=t),l=tr(l),h===t?(h=l,l=0):h=tr(h),g=g===t?l<h?1:-1:tr(g),rM(l,h,g,s)}}function bl(s){return function(l,h){return typeof l=="string"&&typeof h=="string"||(l=ci(l),h=ci(h)),s(l,h)}}function kp(s,l,h,g,E,C,F,G,Z,_e){var ve=l&S,ye=ve?F:t,De=ve?t:F,He=ve?C:t,$e=ve?t:C;l|=ve?q:O,l&=~(ve?O:q),l&N||(l&=~(x|v));var ft=[s,l,E,He,ye,$e,De,G,Z,_e],Ze=h.apply(t,ft);return ju(s)&&tm(Ze,ft),Ze.placeholder=g,nm(Ze,s,l)}function Xu(s){var l=tn[s];return function(h,g){if(h=ci(h),g=g==null?0:vn(lt(g),292),g&&np(h)){var E=(wt(h)+"e").split("e"),C=l(E[0]+"e"+(+E[1]+g));return E=(wt(C)+"e").split("e"),+(E[0]+"e"+(+E[1]-g))}return l(h)}}var yM=Gs&&1/tl(new Gs([,-0]))[1]==fe?function(s){return new Gs(s)}:pf;function Wp(s){return function(l){var h=xn(l);return h==D?Mu(l):h==k?Fx(l):Cx(l,s(l))}}function Ji(s,l,h,g,E,C,F,G){var Z=l&v;if(!Z&&typeof s!="function")throw new ri(a);var _e=g?g.length:0;if(_e||(l&=~(q|O),g=E=t),F=F===t?F:nn(lt(F),0),G=G===t?G:lt(G),_e-=E?E.length:0,l&O){var ve=g,ye=E;g=E=t}var De=Z?t:Yu(s),He=[s,l,h,g,E,ve,ye,C,F,G];if(De&&UM(He,De),s=He[0],l=He[1],h=He[2],g=He[3],E=He[4],G=He[9]=He[9]===t?Z?0:s.length:nn(He[9]-_e,0),!G&&l&(S|P)&&(l&=~(S|P)),!l||l==x)var $e=_M(s,l,h);else l==S||l==P?$e=vM(s,l,G):(l==q||l==(x|q))&&!E.length?$e=xM(s,l,h,g):$e=El.apply(t,He);var ft=De?Tp:tm;return nm(ft($e,He),s,l)}function Xp(s,l,h,g){return s===t||_i(s,Vs[h])&&!Ct.call(g,h)?l:s}function qp(s,l,h,g,E,C){return qt(s)&&qt(l)&&(C.set(l,s),xl(s,l,t,qp,C),C.delete(l)),s}function MM(s){return ca(s)?t:s}function Kp(s,l,h,g,E,C){var F=h&y,G=s.length,Z=l.length;if(G!=Z&&!(F&&Z>G))return!1;var _e=C.get(s),ve=C.get(l);if(_e&&ve)return _e==l&&ve==s;var ye=-1,De=!0,He=h&T?new is:t;for(C.set(s,l),C.set(l,s);++ye<G;){var $e=s[ye],ft=l[ye];if(g)var Ze=F?g(ft,$e,ye,l,s,C):g($e,ft,ye,s,l,C);if(Ze!==t){if(Ze)continue;De=!1;break}if(He){if(!mu(l,function(xt,St){if(!$o(He,St)&&($e===xt||E($e,xt,h,g,C)))return He.push(St)})){De=!1;break}}else if(!($e===ft||E($e,ft,h,g,C))){De=!1;break}}return C.delete(s),C.delete(l),De}function SM(s,l,h,g,E,C,F){switch(h){case Me:if(s.byteLength!=l.byteLength||s.byteOffset!=l.byteOffset)return!1;s=s.buffer,l=l.buffer;case he:return!(s.byteLength!=l.byteLength||!C(new al(s),new al(l)));case ke:case Je:case H:return _i(+s,+l);case Q:return s.name==l.name&&s.message==l.message;case V:case W:return s==l+"";case D:var G=Mu;case k:var Z=g&y;if(G||(G=tl),s.size!=l.size&&!Z)return!1;var _e=F.get(s);if(_e)return _e==l;g|=T,F.set(s,l);var ve=Kp(G(s),G(l),g,E,C,F);return F.delete(s),ve;case ue:if(ea)return ea.call(s)==ea.call(l)}return!1}function EM(s,l,h,g,E,C){var F=h&y,G=qu(s),Z=G.length,_e=qu(l),ve=_e.length;if(Z!=ve&&!F)return!1;for(var ye=Z;ye--;){var De=G[ye];if(!(F?De in l:Ct.call(l,De)))return!1}var He=C.get(s),$e=C.get(l);if(He&&$e)return He==l&&$e==s;var ft=!0;C.set(s,l),C.set(l,s);for(var Ze=F;++ye<Z;){De=G[ye];var xt=s[De],St=l[De];if(g)var Yn=F?g(St,xt,De,l,s,C):g(xt,St,De,s,l,C);if(!(Yn===t?xt===St||E(xt,St,h,g,C):Yn)){ft=!1;break}Ze||(Ze=De=="constructor")}if(ft&&!Ze){var wn=s.constructor,$n=l.constructor;wn!=$n&&"constructor"in s&&"constructor"in l&&!(typeof wn=="function"&&wn instanceof wn&&typeof $n=="function"&&$n instanceof $n)&&(ft=!1)}return C.delete(s),C.delete(l),ft}function ji(s){return ef(Qp(s,t,lm),s+"")}function qu(s){return dp(s,ln,Zu)}function Ku(s){return dp(s,Bn,Yp)}var Yu=dl?function(s){return dl.get(s)}:pf;function wl(s){for(var l=s.name+"",h=ks[l],g=Ct.call(ks,l)?h.length:0;g--;){var E=h[g],C=E.func;if(C==null||C==s)return E.name}return l}function Ks(s){var l=Ct.call(w,"placeholder")?w:s;return l.placeholder}function Ye(){var s=w.iteratee||hf;return s=s===hf?gp:s,arguments.length?s(arguments[0],arguments[1]):s}function Rl(s,l){var h=s.__data__;return LM(l)?h[typeof l=="string"?"string":"hash"]:h.map}function $u(s){for(var l=ln(s),h=l.length;h--;){var g=l[h],E=s[g];l[h]=[g,E,Jp(E)]}return l}function os(s,l){var h=Dx(s,l);return mp(h)?h:t}function TM(s){var l=Ct.call(s,ts),h=s[ts];try{s[ts]=t;var g=!0}catch{}var E=sl.call(s);return g&&(l?s[ts]=h:delete s[ts]),E}var Zu=Eu?function(s){return s==null?[]:(s=Dt(s),yr(Eu(s),function(l){return ep.call(s,l)}))}:mf,Yp=Eu?function(s){for(var l=[];s;)Mr(l,Zu(s)),s=ll(s);return l}:mf,xn=An;(Tu&&xn(new Tu(new ArrayBuffer(1)))!=Me||Jo&&xn(new Jo)!=D||Au&&xn(Au.resolve())!=M||Gs&&xn(new Gs)!=k||jo&&xn(new jo)!=ge)&&(xn=function(s){var l=An(s),h=l==A?s.constructor:t,g=h?as(h):"";if(g)switch(g){case oy:return Me;case ay:return D;case ly:return M;case cy:return k;case uy:return ge}return l});function AM(s,l,h){for(var g=-1,E=h.length;++g<E;){var C=h[g],F=C.size;switch(C.type){case"drop":s+=F;break;case"dropRight":l-=F;break;case"take":l=vn(l,s+F);break;case"takeRight":s=nn(s,l-F);break}}return{start:s,end:l}}function bM(s){var l=s.match(Us);return l?l[1].split(Za):[]}function $p(s,l,h){l=br(l,s);for(var g=-1,E=l.length,C=!1;++g<E;){var F=Ii(l[g]);if(!(C=s!=null&&h(s,F)))break;s=s[F]}return C||++g!=E?C:(E=s==null?0:s.length,!!E&&Ul(E)&&Qi(F,E)&&(st(s)||ls(s)))}function wM(s){var l=s.length,h=new s.constructor(l);return l&&typeof s[0]=="string"&&Ct.call(s,"index")&&(h.index=s.index,h.input=s.input),h}function Zp(s){return typeof s.constructor=="function"&&!aa(s)?Ws(ll(s)):{}}function RM(s,l,h){var g=s.constructor;switch(l){case he:return ku(s);case ke:case Je:return new g(+s);case Me:return fM(s,h);case Oe:case we:case Ne:case et:case ut:case mt:case vt:case ot:case Be:return Ip(s,h);case D:return new g;case H:case W:return new g(s);case V:return hM(s);case k:return new g;case ue:return dM(s)}}function CM(s,l){var h=l.length;if(!h)return s;var g=h-1;return l[g]=(h>1?"& ":"")+l[g],l=l.join(h>2?", ":" "),s.replace($a,`{
/* [wrapped with `+l+`] */
`)}function PM(s){return st(s)||ls(s)||!!(tp&&s&&s[tp])}function Qi(s,l){var h=typeof s;return l=l??te,!!l&&(h=="number"||h!="symbol"&&Fe.test(s))&&s>-1&&s%1==0&&s<l}function bn(s,l,h){if(!qt(h))return!1;var g=typeof l;return(g=="number"?Fn(h)&&Qi(l,h.length):g=="string"&&l in h)?_i(h[l],s):!1}function Ju(s,l){if(st(s))return!1;var h=typeof s;return h=="number"||h=="symbol"||h=="boolean"||s==null||Kn(s)?!0:ei.test(s)||!Qn.test(s)||l!=null&&s in Dt(l)}function LM(s){var l=typeof s;return l=="string"||l=="number"||l=="symbol"||l=="boolean"?s!=="__proto__":s===null}function ju(s){var l=wl(s),h=w[l];if(typeof h!="function"||!(l in yt.prototype))return!1;if(s===h)return!0;var g=Yu(h);return!!g&&s===g[0]}function IM(s){return!!Jd&&Jd in s}var NM=il?er:gf;function aa(s){var l=s&&s.constructor,h=typeof l=="function"&&l.prototype||Vs;return s===h}function Jp(s){return s===s&&!qt(s)}function jp(s,l){return function(h){return h==null?!1:h[s]===l&&(l!==t||s in Dt(h))}}function DM(s){var l=Nl(s,function(g){return h.size===f&&h.clear(),g}),h=l.cache;return l}function UM(s,l){var h=s[1],g=l[1],E=h|g,C=E<(x|v|U),F=g==U&&h==S||g==U&&h==J&&s[7].length<=l[8]||g==(U|J)&&l[7].length<=l[8]&&h==S;if(!(C||F))return s;g&x&&(s[2]=l[2],E|=h&x?0:N);var G=l[3];if(G){var Z=s[3];s[3]=Z?Dp(Z,G,l[4]):G,s[4]=Z?Sr(s[3],d):l[4]}return G=l[5],G&&(Z=s[5],s[5]=Z?Up(Z,G,l[6]):G,s[6]=Z?Sr(s[5],d):l[6]),G=l[7],G&&(s[7]=G),g&U&&(s[8]=s[8]==null?l[8]:vn(s[8],l[8])),s[9]==null&&(s[9]=l[9]),s[0]=l[0],s[1]=E,s}function OM(s){var l=[];if(s!=null)for(var h in Dt(s))l.push(h);return l}function FM(s){return sl.call(s)}function Qp(s,l,h){return l=nn(l===t?s.length-1:l,0),function(){for(var g=arguments,E=-1,C=nn(g.length-l,0),F=re(C);++E<C;)F[E]=g[l+E];E=-1;for(var G=re(l+1);++E<l;)G[E]=g[E];return G[l]=h(F),Wn(s,this,G)}}function em(s,l){return l.length<2?s:ss(s,ai(l,0,-1))}function BM(s,l){for(var h=s.length,g=vn(l.length,h),E=On(s);g--;){var C=l[g];s[g]=Qi(C,h)?E[C]:t}return s}function Qu(s,l){if(!(l==="constructor"&&typeof s[l]=="function")&&l!="__proto__")return s[l]}var tm=im(Tp),la=Qx||function(s,l){return hn.setTimeout(s,l)},ef=im(aM);function nm(s,l,h){var g=l+"";return ef(s,CM(g,zM(bM(g),h)))}function im(s){var l=0,h=0;return function(){var g=iy(),E=$-(g-h);if(h=g,E>0){if(++l>=pe)return arguments[0]}else l=0;return s.apply(t,arguments)}}function Cl(s,l){var h=-1,g=s.length,E=g-1;for(l=l===t?g:l;++h<l;){var C=Ou(h,E),F=s[C];s[C]=s[h],s[h]=F}return s.length=l,s}var rm=DM(function(s){var l=[];return s.charCodeAt(0)===46&&l.push(""),s.replace(Ki,function(h,g,E,C){l.push(E?C.replace(su,"$1"):g||h)}),l});function Ii(s){if(typeof s=="string"||Kn(s))return s;var l=s+"";return l=="0"&&1/s==-fe?"-0":l}function as(s){if(s!=null){try{return rl.call(s)}catch{}try{return s+""}catch{}}return""}function zM(s,l){return ii(ce,function(h){var g="_."+h[0];l&h[1]&&!Qa(s,g)&&s.push(g)}),s.sort()}function sm(s){if(s instanceof yt)return s.clone();var l=new si(s.__wrapped__,s.__chain__);return l.__actions__=On(s.__actions__),l.__index__=s.__index__,l.__values__=s.__values__,l}function HM(s,l,h){(h?bn(s,l,h):l===t)?l=1:l=nn(lt(l),0);var g=s==null?0:s.length;if(!g||l<1)return[];for(var E=0,C=0,F=re(fl(g/l));E<g;)F[C++]=ai(s,E,E+=l);return F}function VM(s){for(var l=-1,h=s==null?0:s.length,g=0,E=[];++l<h;){var C=s[l];C&&(E[g++]=C)}return E}function GM(){var s=arguments.length;if(!s)return[];for(var l=re(s-1),h=arguments[0],g=s;g--;)l[g-1]=arguments[g];return Mr(st(h)?On(h):[h],dn(l,1))}var kM=gt(function(s,l){return Jt(s)?na(s,dn(l,1,Jt,!0)):[]}),WM=gt(function(s,l){var h=li(l);return Jt(h)&&(h=t),Jt(s)?na(s,dn(l,1,Jt,!0),Ye(h,2)):[]}),XM=gt(function(s,l){var h=li(l);return Jt(h)&&(h=t),Jt(s)?na(s,dn(l,1,Jt,!0),t,h):[]});function qM(s,l,h){var g=s==null?0:s.length;return g?(l=h||l===t?1:lt(l),ai(s,l<0?0:l,g)):[]}function KM(s,l,h){var g=s==null?0:s.length;return g?(l=h||l===t?1:lt(l),l=g-l,ai(s,0,l<0?0:l)):[]}function YM(s,l){return s&&s.length?Ml(s,Ye(l,3),!0,!0):[]}function $M(s,l){return s&&s.length?Ml(s,Ye(l,3),!0):[]}function ZM(s,l,h,g){var E=s==null?0:s.length;return E?(h&&typeof h!="number"&&bn(s,l,h)&&(h=0,g=E),Gy(s,l,h,g)):[]}function om(s,l,h){var g=s==null?0:s.length;if(!g)return-1;var E=h==null?0:lt(h);return E<0&&(E=nn(g+E,0)),el(s,Ye(l,3),E)}function am(s,l,h){var g=s==null?0:s.length;if(!g)return-1;var E=g-1;return h!==t&&(E=lt(h),E=h<0?nn(g+E,0):vn(E,g-1)),el(s,Ye(l,3),E,!0)}function lm(s){var l=s==null?0:s.length;return l?dn(s,1):[]}function JM(s){var l=s==null?0:s.length;return l?dn(s,fe):[]}function jM(s,l){var h=s==null?0:s.length;return h?(l=l===t?1:lt(l),dn(s,l)):[]}function QM(s){for(var l=-1,h=s==null?0:s.length,g={};++l<h;){var E=s[l];g[E[0]]=E[1]}return g}function cm(s){return s&&s.length?s[0]:t}function eS(s,l,h){var g=s==null?0:s.length;if(!g)return-1;var E=h==null?0:lt(h);return E<0&&(E=nn(g+E,0)),Fs(s,l,E)}function tS(s){var l=s==null?0:s.length;return l?ai(s,0,-1):[]}var nS=gt(function(s){var l=kt(s,Vu);return l.length&&l[0]===s[0]?Lu(l):[]}),iS=gt(function(s){var l=li(s),h=kt(s,Vu);return l===li(h)?l=t:h.pop(),h.length&&h[0]===s[0]?Lu(h,Ye(l,2)):[]}),rS=gt(function(s){var l=li(s),h=kt(s,Vu);return l=typeof l=="function"?l:t,l&&h.pop(),h.length&&h[0]===s[0]?Lu(h,t,l):[]});function sS(s,l){return s==null?"":ty.call(s,l)}function li(s){var l=s==null?0:s.length;return l?s[l-1]:t}function oS(s,l,h){var g=s==null?0:s.length;if(!g)return-1;var E=g;return h!==t&&(E=lt(h),E=E<0?nn(g+E,0):vn(E,g-1)),l===l?zx(s,l,E):el(s,kd,E,!0)}function aS(s,l){return s&&s.length?yp(s,lt(l)):t}var lS=gt(um);function um(s,l){return s&&s.length&&l&&l.length?Uu(s,l):s}function cS(s,l,h){return s&&s.length&&l&&l.length?Uu(s,l,Ye(h,2)):s}function uS(s,l,h){return s&&s.length&&l&&l.length?Uu(s,l,t,h):s}var fS=ji(function(s,l){var h=s==null?0:s.length,g=wu(s,l);return Ep(s,kt(l,function(E){return Qi(E,h)?+E:E}).sort(Np)),g});function hS(s,l){var h=[];if(!(s&&s.length))return h;var g=-1,E=[],C=s.length;for(l=Ye(l,3);++g<C;){var F=s[g];l(F,g,s)&&(h.push(F),E.push(g))}return Ep(s,E),h}function tf(s){return s==null?s:sy.call(s)}function dS(s,l,h){var g=s==null?0:s.length;return g?(h&&typeof h!="number"&&bn(s,l,h)?(l=0,h=g):(l=l==null?0:lt(l),h=h===t?g:lt(h)),ai(s,l,h)):[]}function pS(s,l){return yl(s,l)}function mS(s,l,h){return Bu(s,l,Ye(h,2))}function gS(s,l){var h=s==null?0:s.length;if(h){var g=yl(s,l);if(g<h&&_i(s[g],l))return g}return-1}function _S(s,l){return yl(s,l,!0)}function vS(s,l,h){return Bu(s,l,Ye(h,2),!0)}function xS(s,l){var h=s==null?0:s.length;if(h){var g=yl(s,l,!0)-1;if(_i(s[g],l))return g}return-1}function yS(s){return s&&s.length?Ap(s):[]}function MS(s,l){return s&&s.length?Ap(s,Ye(l,2)):[]}function SS(s){var l=s==null?0:s.length;return l?ai(s,1,l):[]}function ES(s,l,h){return s&&s.length?(l=h||l===t?1:lt(l),ai(s,0,l<0?0:l)):[]}function TS(s,l,h){var g=s==null?0:s.length;return g?(l=h||l===t?1:lt(l),l=g-l,ai(s,l<0?0:l,g)):[]}function AS(s,l){return s&&s.length?Ml(s,Ye(l,3),!1,!0):[]}function bS(s,l){return s&&s.length?Ml(s,Ye(l,3)):[]}var wS=gt(function(s){return Ar(dn(s,1,Jt,!0))}),RS=gt(function(s){var l=li(s);return Jt(l)&&(l=t),Ar(dn(s,1,Jt,!0),Ye(l,2))}),CS=gt(function(s){var l=li(s);return l=typeof l=="function"?l:t,Ar(dn(s,1,Jt,!0),t,l)});function PS(s){return s&&s.length?Ar(s):[]}function LS(s,l){return s&&s.length?Ar(s,Ye(l,2)):[]}function IS(s,l){return l=typeof l=="function"?l:t,s&&s.length?Ar(s,t,l):[]}function nf(s){if(!(s&&s.length))return[];var l=0;return s=yr(s,function(h){if(Jt(h))return l=nn(h.length,l),!0}),xu(l,function(h){return kt(s,gu(h))})}function fm(s,l){if(!(s&&s.length))return[];var h=nf(s);return l==null?h:kt(h,function(g){return Wn(l,t,g)})}var NS=gt(function(s,l){return Jt(s)?na(s,l):[]}),DS=gt(function(s){return Hu(yr(s,Jt))}),US=gt(function(s){var l=li(s);return Jt(l)&&(l=t),Hu(yr(s,Jt),Ye(l,2))}),OS=gt(function(s){var l=li(s);return l=typeof l=="function"?l:t,Hu(yr(s,Jt),t,l)}),FS=gt(nf);function BS(s,l){return Cp(s||[],l||[],ta)}function zS(s,l){return Cp(s||[],l||[],sa)}var HS=gt(function(s){var l=s.length,h=l>1?s[l-1]:t;return h=typeof h=="function"?(s.pop(),h):t,fm(s,h)});function hm(s){var l=w(s);return l.__chain__=!0,l}function VS(s,l){return l(s),s}function Pl(s,l){return l(s)}var GS=ji(function(s){var l=s.length,h=l?s[0]:0,g=this.__wrapped__,E=function(C){return wu(C,s)};return l>1||this.__actions__.length||!(g instanceof yt)||!Qi(h)?this.thru(E):(g=g.slice(h,+h+(l?1:0)),g.__actions__.push({func:Pl,args:[E],thisArg:t}),new si(g,this.__chain__).thru(function(C){return l&&!C.length&&C.push(t),C}))});function kS(){return hm(this)}function WS(){return new si(this.value(),this.__chain__)}function XS(){this.__values__===t&&(this.__values__=bm(this.value()));var s=this.__index__>=this.__values__.length,l=s?t:this.__values__[this.__index__++];return{done:s,value:l}}function qS(){return this}function KS(s){for(var l,h=this;h instanceof ml;){var g=sm(h);g.__index__=0,g.__values__=t,l?E.__wrapped__=g:l=g;var E=g;h=h.__wrapped__}return E.__wrapped__=s,l}function YS(){var s=this.__wrapped__;if(s instanceof yt){var l=s;return this.__actions__.length&&(l=new yt(this)),l=l.reverse(),l.__actions__.push({func:Pl,args:[tf],thisArg:t}),new si(l,this.__chain__)}return this.thru(tf)}function $S(){return Rp(this.__wrapped__,this.__actions__)}var ZS=Sl(function(s,l,h){Ct.call(s,h)?++s[h]:Zi(s,h,1)});function JS(s,l,h){var g=st(s)?Vd:Vy;return h&&bn(s,l,h)&&(l=t),g(s,Ye(l,3))}function jS(s,l){var h=st(s)?yr:fp;return h(s,Ye(l,3))}var QS=zp(om),eE=zp(am);function tE(s,l){return dn(Ll(s,l),1)}function nE(s,l){return dn(Ll(s,l),fe)}function iE(s,l,h){return h=h===t?1:lt(h),dn(Ll(s,l),h)}function dm(s,l){var h=st(s)?ii:Tr;return h(s,Ye(l,3))}function pm(s,l){var h=st(s)?Sx:up;return h(s,Ye(l,3))}var rE=Sl(function(s,l,h){Ct.call(s,h)?s[h].push(l):Zi(s,h,[l])});function sE(s,l,h,g){s=Fn(s)?s:$s(s),h=h&&!g?lt(h):0;var E=s.length;return h<0&&(h=nn(E+h,0)),Ol(s)?h<=E&&s.indexOf(l,h)>-1:!!E&&Fs(s,l,h)>-1}var oE=gt(function(s,l,h){var g=-1,E=typeof l=="function",C=Fn(s)?re(s.length):[];return Tr(s,function(F){C[++g]=E?Wn(l,F,h):ia(F,l,h)}),C}),aE=Sl(function(s,l,h){Zi(s,h,l)});function Ll(s,l){var h=st(s)?kt:_p;return h(s,Ye(l,3))}function lE(s,l,h,g){return s==null?[]:(st(l)||(l=l==null?[]:[l]),h=g?t:h,st(h)||(h=h==null?[]:[h]),Mp(s,l,h))}var cE=Sl(function(s,l,h){s[h?0:1].push(l)},function(){return[[],[]]});function uE(s,l,h){var g=st(s)?pu:Xd,E=arguments.length<3;return g(s,Ye(l,4),h,E,Tr)}function fE(s,l,h){var g=st(s)?Ex:Xd,E=arguments.length<3;return g(s,Ye(l,4),h,E,up)}function hE(s,l){var h=st(s)?yr:fp;return h(s,Dl(Ye(l,3)))}function dE(s){var l=st(s)?op:sM;return l(s)}function pE(s,l,h){(h?bn(s,l,h):l===t)?l=1:l=lt(l);var g=st(s)?Oy:oM;return g(s,l)}function mE(s){var l=st(s)?Fy:lM;return l(s)}function gE(s){if(s==null)return 0;if(Fn(s))return Ol(s)?zs(s):s.length;var l=xn(s);return l==D||l==k?s.size:Nu(s).length}function _E(s,l,h){var g=st(s)?mu:cM;return h&&bn(s,l,h)&&(l=t),g(s,Ye(l,3))}var vE=gt(function(s,l){if(s==null)return[];var h=l.length;return h>1&&bn(s,l[0],l[1])?l=[]:h>2&&bn(l[0],l[1],l[2])&&(l=[l[0]]),Mp(s,dn(l,1),[])}),Il=jx||function(){return hn.Date.now()};function xE(s,l){if(typeof l!="function")throw new ri(a);return s=lt(s),function(){if(--s<1)return l.apply(this,arguments)}}function mm(s,l,h){return l=h?t:l,l=s&&l==null?s.length:l,Ji(s,U,t,t,t,t,l)}function gm(s,l){var h;if(typeof l!="function")throw new ri(a);return s=lt(s),function(){return--s>0&&(h=l.apply(this,arguments)),s<=1&&(l=t),h}}var rf=gt(function(s,l,h){var g=x;if(h.length){var E=Sr(h,Ks(rf));g|=q}return Ji(s,g,l,h,E)}),_m=gt(function(s,l,h){var g=x|v;if(h.length){var E=Sr(h,Ks(_m));g|=q}return Ji(l,g,s,h,E)});function vm(s,l,h){l=h?t:l;var g=Ji(s,S,t,t,t,t,t,l);return g.placeholder=vm.placeholder,g}function xm(s,l,h){l=h?t:l;var g=Ji(s,P,t,t,t,t,t,l);return g.placeholder=xm.placeholder,g}function ym(s,l,h){var g,E,C,F,G,Z,_e=0,ve=!1,ye=!1,De=!0;if(typeof s!="function")throw new ri(a);l=ci(l)||0,qt(h)&&(ve=!!h.leading,ye="maxWait"in h,C=ye?nn(ci(h.maxWait)||0,l):C,De="trailing"in h?!!h.trailing:De);function He(jt){var vi=g,nr=E;return g=E=t,_e=jt,F=s.apply(nr,vi),F}function $e(jt){return _e=jt,G=la(xt,l),ve?He(jt):F}function ft(jt){var vi=jt-Z,nr=jt-_e,zm=l-vi;return ye?vn(zm,C-nr):zm}function Ze(jt){var vi=jt-Z,nr=jt-_e;return Z===t||vi>=l||vi<0||ye&&nr>=C}function xt(){var jt=Il();if(Ze(jt))return St(jt);G=la(xt,ft(jt))}function St(jt){return G=t,De&&g?He(jt):(g=E=t,F)}function Yn(){G!==t&&Pp(G),_e=0,g=Z=E=G=t}function wn(){return G===t?F:St(Il())}function $n(){var jt=Il(),vi=Ze(jt);if(g=arguments,E=this,Z=jt,vi){if(G===t)return $e(Z);if(ye)return Pp(G),G=la(xt,l),He(Z)}return G===t&&(G=la(xt,l)),F}return $n.cancel=Yn,$n.flush=wn,$n}var yE=gt(function(s,l){return cp(s,1,l)}),ME=gt(function(s,l,h){return cp(s,ci(l)||0,h)});function SE(s){return Ji(s,I)}function Nl(s,l){if(typeof s!="function"||l!=null&&typeof l!="function")throw new ri(a);var h=function(){var g=arguments,E=l?l.apply(this,g):g[0],C=h.cache;if(C.has(E))return C.get(E);var F=s.apply(this,g);return h.cache=C.set(E,F)||C,F};return h.cache=new(Nl.Cache||$i),h}Nl.Cache=$i;function Dl(s){if(typeof s!="function")throw new ri(a);return function(){var l=arguments;switch(l.length){case 0:return!s.call(this);case 1:return!s.call(this,l[0]);case 2:return!s.call(this,l[0],l[1]);case 3:return!s.call(this,l[0],l[1],l[2])}return!s.apply(this,l)}}function EE(s){return gm(2,s)}var TE=uM(function(s,l){l=l.length==1&&st(l[0])?kt(l[0],Xn(Ye())):kt(dn(l,1),Xn(Ye()));var h=l.length;return gt(function(g){for(var E=-1,C=vn(g.length,h);++E<C;)g[E]=l[E].call(this,g[E]);return Wn(s,this,g)})}),sf=gt(function(s,l){var h=Sr(l,Ks(sf));return Ji(s,q,t,l,h)}),Mm=gt(function(s,l){var h=Sr(l,Ks(Mm));return Ji(s,O,t,l,h)}),AE=ji(function(s,l){return Ji(s,J,t,t,t,l)});function bE(s,l){if(typeof s!="function")throw new ri(a);return l=l===t?l:lt(l),gt(s,l)}function wE(s,l){if(typeof s!="function")throw new ri(a);return l=l==null?0:nn(lt(l),0),gt(function(h){var g=h[l],E=wr(h,0,l);return g&&Mr(E,g),Wn(s,this,E)})}function RE(s,l,h){var g=!0,E=!0;if(typeof s!="function")throw new ri(a);return qt(h)&&(g="leading"in h?!!h.leading:g,E="trailing"in h?!!h.trailing:E),ym(s,l,{leading:g,maxWait:l,trailing:E})}function CE(s){return mm(s,1)}function PE(s,l){return sf(Gu(l),s)}function LE(){if(!arguments.length)return[];var s=arguments[0];return st(s)?s:[s]}function IE(s){return oi(s,_)}function NE(s,l){return l=typeof l=="function"?l:t,oi(s,_,l)}function DE(s){return oi(s,p|_)}function UE(s,l){return l=typeof l=="function"?l:t,oi(s,p|_,l)}function OE(s,l){return l==null||lp(s,l,ln(l))}function _i(s,l){return s===l||s!==s&&l!==l}var FE=bl(Pu),BE=bl(function(s,l){return s>=l}),ls=pp(function(){return arguments}())?pp:function(s){return $t(s)&&Ct.call(s,"callee")&&!ep.call(s,"callee")},st=re.isArray,zE=Ud?Xn(Ud):Ky;function Fn(s){return s!=null&&Ul(s.length)&&!er(s)}function Jt(s){return $t(s)&&Fn(s)}function HE(s){return s===!0||s===!1||$t(s)&&An(s)==ke}var Rr=ey||gf,VE=Od?Xn(Od):Yy;function GE(s){return $t(s)&&s.nodeType===1&&!ca(s)}function kE(s){if(s==null)return!0;if(Fn(s)&&(st(s)||typeof s=="string"||typeof s.splice=="function"||Rr(s)||Ys(s)||ls(s)))return!s.length;var l=xn(s);if(l==D||l==k)return!s.size;if(aa(s))return!Nu(s).length;for(var h in s)if(Ct.call(s,h))return!1;return!0}function WE(s,l){return ra(s,l)}function XE(s,l,h){h=typeof h=="function"?h:t;var g=h?h(s,l):t;return g===t?ra(s,l,t,h):!!g}function of(s){if(!$t(s))return!1;var l=An(s);return l==Q||l==Ke||typeof s.message=="string"&&typeof s.name=="string"&&!ca(s)}function qE(s){return typeof s=="number"&&np(s)}function er(s){if(!qt(s))return!1;var l=An(s);return l==me||l==R||l==be||l==z}function Sm(s){return typeof s=="number"&&s==lt(s)}function Ul(s){return typeof s=="number"&&s>-1&&s%1==0&&s<=te}function qt(s){var l=typeof s;return s!=null&&(l=="object"||l=="function")}function $t(s){return s!=null&&typeof s=="object"}var Em=Fd?Xn(Fd):Zy;function KE(s,l){return s===l||Iu(s,l,$u(l))}function YE(s,l,h){return h=typeof h=="function"?h:t,Iu(s,l,$u(l),h)}function $E(s){return Tm(s)&&s!=+s}function ZE(s){if(NM(s))throw new nt(o);return mp(s)}function JE(s){return s===null}function jE(s){return s==null}function Tm(s){return typeof s=="number"||$t(s)&&An(s)==H}function ca(s){if(!$t(s)||An(s)!=A)return!1;var l=ll(s);if(l===null)return!0;var h=Ct.call(l,"constructor")&&l.constructor;return typeof h=="function"&&h instanceof h&&rl.call(h)==Yx}var af=Bd?Xn(Bd):Jy;function QE(s){return Sm(s)&&s>=-te&&s<=te}var Am=zd?Xn(zd):jy;function Ol(s){return typeof s=="string"||!st(s)&&$t(s)&&An(s)==W}function Kn(s){return typeof s=="symbol"||$t(s)&&An(s)==ue}var Ys=Hd?Xn(Hd):Qy;function eT(s){return s===t}function tT(s){return $t(s)&&xn(s)==ge}function nT(s){return $t(s)&&An(s)==Te}var iT=bl(Du),rT=bl(function(s,l){return s<=l});function bm(s){if(!s)return[];if(Fn(s))return Ol(s)?mi(s):On(s);if(Zo&&s[Zo])return Ox(s[Zo]());var l=xn(s),h=l==D?Mu:l==k?tl:$s;return h(s)}function tr(s){if(!s)return s===0?s:0;if(s=ci(s),s===fe||s===-fe){var l=s<0?-1:1;return l*Ee}return s===s?s:0}function lt(s){var l=tr(s),h=l%1;return l===l?h?l-h:l:0}function wm(s){return s?rs(lt(s),0,Re):0}function ci(s){if(typeof s=="number")return s;if(Kn(s))return Se;if(qt(s)){var l=typeof s.valueOf=="function"?s.valueOf():s;s=qt(l)?l+"":l}if(typeof s!="string")return s===0?s:+s;s=qd(s);var h=se.test(s);return h||ie.test(s)?xx(s.slice(2),h?2:8):ee.test(s)?Se:+s}function Rm(s){return Li(s,Bn(s))}function sT(s){return s?rs(lt(s),-te,te):s===0?s:0}function wt(s){return s==null?"":qn(s)}var oT=Xs(function(s,l){if(aa(l)||Fn(l)){Li(l,ln(l),s);return}for(var h in l)Ct.call(l,h)&&ta(s,h,l[h])}),Cm=Xs(function(s,l){Li(l,Bn(l),s)}),Fl=Xs(function(s,l,h,g){Li(l,Bn(l),s,g)}),aT=Xs(function(s,l,h,g){Li(l,ln(l),s,g)}),lT=ji(wu);function cT(s,l){var h=Ws(s);return l==null?h:ap(h,l)}var uT=gt(function(s,l){s=Dt(s);var h=-1,g=l.length,E=g>2?l[2]:t;for(E&&bn(l[0],l[1],E)&&(g=1);++h<g;)for(var C=l[h],F=Bn(C),G=-1,Z=F.length;++G<Z;){var _e=F[G],ve=s[_e];(ve===t||_i(ve,Vs[_e])&&!Ct.call(s,_e))&&(s[_e]=C[_e])}return s}),fT=gt(function(s){return s.push(t,qp),Wn(Pm,t,s)});function hT(s,l){return Gd(s,Ye(l,3),Pi)}function dT(s,l){return Gd(s,Ye(l,3),Cu)}function pT(s,l){return s==null?s:Ru(s,Ye(l,3),Bn)}function mT(s,l){return s==null?s:hp(s,Ye(l,3),Bn)}function gT(s,l){return s&&Pi(s,Ye(l,3))}function _T(s,l){return s&&Cu(s,Ye(l,3))}function vT(s){return s==null?[]:vl(s,ln(s))}function xT(s){return s==null?[]:vl(s,Bn(s))}function lf(s,l,h){var g=s==null?t:ss(s,l);return g===t?h:g}function yT(s,l){return s!=null&&$p(s,l,ky)}function cf(s,l){return s!=null&&$p(s,l,Wy)}var MT=Vp(function(s,l,h){l!=null&&typeof l.toString!="function"&&(l=sl.call(l)),s[l]=h},ff(zn)),ST=Vp(function(s,l,h){l!=null&&typeof l.toString!="function"&&(l=sl.call(l)),Ct.call(s,l)?s[l].push(h):s[l]=[h]},Ye),ET=gt(ia);function ln(s){return Fn(s)?sp(s):Nu(s)}function Bn(s){return Fn(s)?sp(s,!0):eM(s)}function TT(s,l){var h={};return l=Ye(l,3),Pi(s,function(g,E,C){Zi(h,l(g,E,C),g)}),h}function AT(s,l){var h={};return l=Ye(l,3),Pi(s,function(g,E,C){Zi(h,E,l(g,E,C))}),h}var bT=Xs(function(s,l,h){xl(s,l,h)}),Pm=Xs(function(s,l,h,g){xl(s,l,h,g)}),wT=ji(function(s,l){var h={};if(s==null)return h;var g=!1;l=kt(l,function(C){return C=br(C,s),g||(g=C.length>1),C}),Li(s,Ku(s),h),g&&(h=oi(h,p|m|_,MM));for(var E=l.length;E--;)zu(h,l[E]);return h});function RT(s,l){return Lm(s,Dl(Ye(l)))}var CT=ji(function(s,l){return s==null?{}:nM(s,l)});function Lm(s,l){if(s==null)return{};var h=kt(Ku(s),function(g){return[g]});return l=Ye(l),Sp(s,h,function(g,E){return l(g,E[0])})}function PT(s,l,h){l=br(l,s);var g=-1,E=l.length;for(E||(E=1,s=t);++g<E;){var C=s==null?t:s[Ii(l[g])];C===t&&(g=E,C=h),s=er(C)?C.call(s):C}return s}function LT(s,l,h){return s==null?s:sa(s,l,h)}function IT(s,l,h,g){return g=typeof g=="function"?g:t,s==null?s:sa(s,l,h,g)}var Im=Wp(ln),Nm=Wp(Bn);function NT(s,l,h){var g=st(s),E=g||Rr(s)||Ys(s);if(l=Ye(l,4),h==null){var C=s&&s.constructor;E?h=g?new C:[]:qt(s)?h=er(C)?Ws(ll(s)):{}:h={}}return(E?ii:Pi)(s,function(F,G,Z){return l(h,F,G,Z)}),h}function DT(s,l){return s==null?!0:zu(s,l)}function UT(s,l,h){return s==null?s:wp(s,l,Gu(h))}function OT(s,l,h,g){return g=typeof g=="function"?g:t,s==null?s:wp(s,l,Gu(h),g)}function $s(s){return s==null?[]:yu(s,ln(s))}function FT(s){return s==null?[]:yu(s,Bn(s))}function BT(s,l,h){return h===t&&(h=l,l=t),h!==t&&(h=ci(h),h=h===h?h:0),l!==t&&(l=ci(l),l=l===l?l:0),rs(ci(s),l,h)}function zT(s,l,h){return l=tr(l),h===t?(h=l,l=0):h=tr(h),s=ci(s),Xy(s,l,h)}function HT(s,l,h){if(h&&typeof h!="boolean"&&bn(s,l,h)&&(l=h=t),h===t&&(typeof l=="boolean"?(h=l,l=t):typeof s=="boolean"&&(h=s,s=t)),s===t&&l===t?(s=0,l=1):(s=tr(s),l===t?(l=s,s=0):l=tr(l)),s>l){var g=s;s=l,l=g}if(h||s%1||l%1){var E=ip();return vn(s+E*(l-s+vx("1e-"+((E+"").length-1))),l)}return Ou(s,l)}var VT=qs(function(s,l,h){return l=l.toLowerCase(),s+(h?Dm(l):l)});function Dm(s){return uf(wt(s).toLowerCase())}function Um(s){return s=wt(s),s&&s.replace(Ve,Lx).replace(lx,"")}function GT(s,l,h){s=wt(s),l=qn(l);var g=s.length;h=h===t?g:rs(lt(h),0,g);var E=h;return h-=l.length,h>=0&&s.slice(h,E)==l}function kT(s){return s=wt(s),s&&Ot.test(s)?s.replace(Xe,Ix):s}function WT(s){return s=wt(s),s&&Ya.test(s)?s.replace(Ns,"\\$&"):s}var XT=qs(function(s,l,h){return s+(h?"-":"")+l.toLowerCase()}),qT=qs(function(s,l,h){return s+(h?" ":"")+l.toLowerCase()}),KT=Bp("toLowerCase");function YT(s,l,h){s=wt(s),l=lt(l);var g=l?zs(s):0;if(!l||g>=l)return s;var E=(l-g)/2;return Al(hl(E),h)+s+Al(fl(E),h)}function $T(s,l,h){s=wt(s),l=lt(l);var g=l?zs(s):0;return l&&g<l?s+Al(l-g,h):s}function ZT(s,l,h){s=wt(s),l=lt(l);var g=l?zs(s):0;return l&&g<l?Al(l-g,h)+s:s}function JT(s,l,h){return h||l==null?l=0:l&&(l=+l),ry(wt(s).replace(Wo,""),l||0)}function jT(s,l,h){return(h?bn(s,l,h):l===t)?l=1:l=lt(l),Fu(wt(s),l)}function QT(){var s=arguments,l=wt(s[0]);return s.length<3?l:l.replace(s[1],s[2])}var eA=qs(function(s,l,h){return s+(h?"_":"")+l.toLowerCase()});function tA(s,l,h){return h&&typeof h!="number"&&bn(s,l,h)&&(l=h=t),h=h===t?Re:h>>>0,h?(s=wt(s),s&&(typeof l=="string"||l!=null&&!af(l))&&(l=qn(l),!l&&Bs(s))?wr(mi(s),0,h):s.split(l,h)):[]}var nA=qs(function(s,l,h){return s+(h?" ":"")+uf(l)});function iA(s,l,h){return s=wt(s),h=h==null?0:rs(lt(h),0,s.length),l=qn(l),s.slice(h,h+l.length)==l}function rA(s,l,h){var g=w.templateSettings;h&&bn(s,l,h)&&(l=t),s=wt(s),l=Fl({},l,g,Xp);var E=Fl({},l.imports,g.imports,Xp),C=ln(E),F=yu(E,C),G,Z,_e=0,ve=l.interpolate||qe,ye="__p += '",De=Su((l.escape||qe).source+"|"+ve.source+"|"+(ve===Nt?ou:qe).source+"|"+(l.evaluate||qe).source+"|$","g"),He="//# sourceURL="+(Ct.call(l,"sourceURL")?(l.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++dx+"]")+`
`;s.replace(De,function(Ze,xt,St,Yn,wn,$n){return St||(St=Yn),ye+=s.slice(_e,$n).replace(je,Nx),xt&&(G=!0,ye+=`' +
__e(`+xt+`) +
'`),wn&&(Z=!0,ye+=`';
`+wn+`;
__p += '`),St&&(ye+=`' +
((__t = (`+St+`)) == null ? '' : __t) +
'`),_e=$n+Ze.length,Ze}),ye+=`';
`;var $e=Ct.call(l,"variable")&&l.variable;if(!$e)ye=`with (obj) {
`+ye+`
}
`;else if(ru.test($e))throw new nt(c);ye=(Z?ye.replace(B,""):ye).replace(Le,"$1").replace(Ce,"$1;"),ye="function("+($e||"obj")+`) {
`+($e?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(G?", __e = _.escape":"")+(Z?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+ye+`return __p
}`;var ft=Fm(function(){return At(C,He+"return "+ye).apply(t,F)});if(ft.source=ye,of(ft))throw ft;return ft}function sA(s){return wt(s).toLowerCase()}function oA(s){return wt(s).toUpperCase()}function aA(s,l,h){if(s=wt(s),s&&(h||l===t))return qd(s);if(!s||!(l=qn(l)))return s;var g=mi(s),E=mi(l),C=Kd(g,E),F=Yd(g,E)+1;return wr(g,C,F).join("")}function lA(s,l,h){if(s=wt(s),s&&(h||l===t))return s.slice(0,Zd(s)+1);if(!s||!(l=qn(l)))return s;var g=mi(s),E=Yd(g,mi(l))+1;return wr(g,0,E).join("")}function cA(s,l,h){if(s=wt(s),s&&(h||l===t))return s.replace(Wo,"");if(!s||!(l=qn(l)))return s;var g=mi(s),E=Kd(g,mi(l));return wr(g,E).join("")}function uA(s,l){var h=b,g=j;if(qt(l)){var E="separator"in l?l.separator:E;h="length"in l?lt(l.length):h,g="omission"in l?qn(l.omission):g}s=wt(s);var C=s.length;if(Bs(s)){var F=mi(s);C=F.length}if(h>=C)return s;var G=h-zs(g);if(G<1)return g;var Z=F?wr(F,0,G).join(""):s.slice(0,G);if(E===t)return Z+g;if(F&&(G+=Z.length-G),af(E)){if(s.slice(G).search(E)){var _e,ve=Z;for(E.global||(E=Su(E.source,wt(L.exec(E))+"g")),E.lastIndex=0;_e=E.exec(ve);)var ye=_e.index;Z=Z.slice(0,ye===t?G:ye)}}else if(s.indexOf(qn(E),G)!=G){var De=Z.lastIndexOf(E);De>-1&&(Z=Z.slice(0,De))}return Z+g}function fA(s){return s=wt(s),s&&It.test(s)?s.replace(Ge,Hx):s}var hA=qs(function(s,l,h){return s+(h?" ":"")+l.toUpperCase()}),uf=Bp("toUpperCase");function Om(s,l,h){return s=wt(s),l=h?t:l,l===t?Ux(s)?kx(s):bx(s):s.match(l)||[]}var Fm=gt(function(s,l){try{return Wn(s,t,l)}catch(h){return of(h)?h:new nt(h)}}),dA=ji(function(s,l){return ii(l,function(h){h=Ii(h),Zi(s,h,rf(s[h],s))}),s});function pA(s){var l=s==null?0:s.length,h=Ye();return s=l?kt(s,function(g){if(typeof g[1]!="function")throw new ri(a);return[h(g[0]),g[1]]}):[],gt(function(g){for(var E=-1;++E<l;){var C=s[E];if(Wn(C[0],this,g))return Wn(C[1],this,g)}})}function mA(s){return Hy(oi(s,p))}function ff(s){return function(){return s}}function gA(s,l){return s==null||s!==s?l:s}var _A=Hp(),vA=Hp(!0);function zn(s){return s}function hf(s){return gp(typeof s=="function"?s:oi(s,p))}function xA(s){return vp(oi(s,p))}function yA(s,l){return xp(s,oi(l,p))}var MA=gt(function(s,l){return function(h){return ia(h,s,l)}}),SA=gt(function(s,l){return function(h){return ia(s,h,l)}});function df(s,l,h){var g=ln(l),E=vl(l,g);h==null&&!(qt(l)&&(E.length||!g.length))&&(h=l,l=s,s=this,E=vl(l,ln(l)));var C=!(qt(h)&&"chain"in h)||!!h.chain,F=er(s);return ii(E,function(G){var Z=l[G];s[G]=Z,F&&(s.prototype[G]=function(){var _e=this.__chain__;if(C||_e){var ve=s(this.__wrapped__),ye=ve.__actions__=On(this.__actions__);return ye.push({func:Z,args:arguments,thisArg:s}),ve.__chain__=_e,ve}return Z.apply(s,Mr([this.value()],arguments))})}),s}function EA(){return hn._===this&&(hn._=$x),this}function pf(){}function TA(s){return s=lt(s),gt(function(l){return yp(l,s)})}var AA=Wu(kt),bA=Wu(Vd),wA=Wu(mu);function Bm(s){return Ju(s)?gu(Ii(s)):iM(s)}function RA(s){return function(l){return s==null?t:ss(s,l)}}var CA=Gp(),PA=Gp(!0);function mf(){return[]}function gf(){return!1}function LA(){return{}}function IA(){return""}function NA(){return!0}function DA(s,l){if(s=lt(s),s<1||s>te)return[];var h=Re,g=vn(s,Re);l=Ye(l),s-=Re;for(var E=xu(g,l);++h<s;)l(h);return E}function UA(s){return st(s)?kt(s,Ii):Kn(s)?[s]:On(rm(wt(s)))}function OA(s){var l=++Kx;return wt(s)+l}var FA=Tl(function(s,l){return s+l},0),BA=Xu("ceil"),zA=Tl(function(s,l){return s/l},1),HA=Xu("floor");function VA(s){return s&&s.length?_l(s,zn,Pu):t}function GA(s,l){return s&&s.length?_l(s,Ye(l,2),Pu):t}function kA(s){return Wd(s,zn)}function WA(s,l){return Wd(s,Ye(l,2))}function XA(s){return s&&s.length?_l(s,zn,Du):t}function qA(s,l){return s&&s.length?_l(s,Ye(l,2),Du):t}var KA=Tl(function(s,l){return s*l},1),YA=Xu("round"),$A=Tl(function(s,l){return s-l},0);function ZA(s){return s&&s.length?vu(s,zn):0}function JA(s,l){return s&&s.length?vu(s,Ye(l,2)):0}return w.after=xE,w.ary=mm,w.assign=oT,w.assignIn=Cm,w.assignInWith=Fl,w.assignWith=aT,w.at=lT,w.before=gm,w.bind=rf,w.bindAll=dA,w.bindKey=_m,w.castArray=LE,w.chain=hm,w.chunk=HM,w.compact=VM,w.concat=GM,w.cond=pA,w.conforms=mA,w.constant=ff,w.countBy=ZS,w.create=cT,w.curry=vm,w.curryRight=xm,w.debounce=ym,w.defaults=uT,w.defaultsDeep=fT,w.defer=yE,w.delay=ME,w.difference=kM,w.differenceBy=WM,w.differenceWith=XM,w.drop=qM,w.dropRight=KM,w.dropRightWhile=YM,w.dropWhile=$M,w.fill=ZM,w.filter=jS,w.flatMap=tE,w.flatMapDeep=nE,w.flatMapDepth=iE,w.flatten=lm,w.flattenDeep=JM,w.flattenDepth=jM,w.flip=SE,w.flow=_A,w.flowRight=vA,w.fromPairs=QM,w.functions=vT,w.functionsIn=xT,w.groupBy=rE,w.initial=tS,w.intersection=nS,w.intersectionBy=iS,w.intersectionWith=rS,w.invert=MT,w.invertBy=ST,w.invokeMap=oE,w.iteratee=hf,w.keyBy=aE,w.keys=ln,w.keysIn=Bn,w.map=Ll,w.mapKeys=TT,w.mapValues=AT,w.matches=xA,w.matchesProperty=yA,w.memoize=Nl,w.merge=bT,w.mergeWith=Pm,w.method=MA,w.methodOf=SA,w.mixin=df,w.negate=Dl,w.nthArg=TA,w.omit=wT,w.omitBy=RT,w.once=EE,w.orderBy=lE,w.over=AA,w.overArgs=TE,w.overEvery=bA,w.overSome=wA,w.partial=sf,w.partialRight=Mm,w.partition=cE,w.pick=CT,w.pickBy=Lm,w.property=Bm,w.propertyOf=RA,w.pull=lS,w.pullAll=um,w.pullAllBy=cS,w.pullAllWith=uS,w.pullAt=fS,w.range=CA,w.rangeRight=PA,w.rearg=AE,w.reject=hE,w.remove=hS,w.rest=bE,w.reverse=tf,w.sampleSize=pE,w.set=LT,w.setWith=IT,w.shuffle=mE,w.slice=dS,w.sortBy=vE,w.sortedUniq=yS,w.sortedUniqBy=MS,w.split=tA,w.spread=wE,w.tail=SS,w.take=ES,w.takeRight=TS,w.takeRightWhile=AS,w.takeWhile=bS,w.tap=VS,w.throttle=RE,w.thru=Pl,w.toArray=bm,w.toPairs=Im,w.toPairsIn=Nm,w.toPath=UA,w.toPlainObject=Rm,w.transform=NT,w.unary=CE,w.union=wS,w.unionBy=RS,w.unionWith=CS,w.uniq=PS,w.uniqBy=LS,w.uniqWith=IS,w.unset=DT,w.unzip=nf,w.unzipWith=fm,w.update=UT,w.updateWith=OT,w.values=$s,w.valuesIn=FT,w.without=NS,w.words=Om,w.wrap=PE,w.xor=DS,w.xorBy=US,w.xorWith=OS,w.zip=FS,w.zipObject=BS,w.zipObjectDeep=zS,w.zipWith=HS,w.entries=Im,w.entriesIn=Nm,w.extend=Cm,w.extendWith=Fl,df(w,w),w.add=FA,w.attempt=Fm,w.camelCase=VT,w.capitalize=Dm,w.ceil=BA,w.clamp=BT,w.clone=IE,w.cloneDeep=DE,w.cloneDeepWith=UE,w.cloneWith=NE,w.conformsTo=OE,w.deburr=Um,w.defaultTo=gA,w.divide=zA,w.endsWith=GT,w.eq=_i,w.escape=kT,w.escapeRegExp=WT,w.every=JS,w.find=QS,w.findIndex=om,w.findKey=hT,w.findLast=eE,w.findLastIndex=am,w.findLastKey=dT,w.floor=HA,w.forEach=dm,w.forEachRight=pm,w.forIn=pT,w.forInRight=mT,w.forOwn=gT,w.forOwnRight=_T,w.get=lf,w.gt=FE,w.gte=BE,w.has=yT,w.hasIn=cf,w.head=cm,w.identity=zn,w.includes=sE,w.indexOf=eS,w.inRange=zT,w.invoke=ET,w.isArguments=ls,w.isArray=st,w.isArrayBuffer=zE,w.isArrayLike=Fn,w.isArrayLikeObject=Jt,w.isBoolean=HE,w.isBuffer=Rr,w.isDate=VE,w.isElement=GE,w.isEmpty=kE,w.isEqual=WE,w.isEqualWith=XE,w.isError=of,w.isFinite=qE,w.isFunction=er,w.isInteger=Sm,w.isLength=Ul,w.isMap=Em,w.isMatch=KE,w.isMatchWith=YE,w.isNaN=$E,w.isNative=ZE,w.isNil=jE,w.isNull=JE,w.isNumber=Tm,w.isObject=qt,w.isObjectLike=$t,w.isPlainObject=ca,w.isRegExp=af,w.isSafeInteger=QE,w.isSet=Am,w.isString=Ol,w.isSymbol=Kn,w.isTypedArray=Ys,w.isUndefined=eT,w.isWeakMap=tT,w.isWeakSet=nT,w.join=sS,w.kebabCase=XT,w.last=li,w.lastIndexOf=oS,w.lowerCase=qT,w.lowerFirst=KT,w.lt=iT,w.lte=rT,w.max=VA,w.maxBy=GA,w.mean=kA,w.meanBy=WA,w.min=XA,w.minBy=qA,w.stubArray=mf,w.stubFalse=gf,w.stubObject=LA,w.stubString=IA,w.stubTrue=NA,w.multiply=KA,w.nth=aS,w.noConflict=EA,w.noop=pf,w.now=Il,w.pad=YT,w.padEnd=$T,w.padStart=ZT,w.parseInt=JT,w.random=HT,w.reduce=uE,w.reduceRight=fE,w.repeat=jT,w.replace=QT,w.result=PT,w.round=YA,w.runInContext=Y,w.sample=dE,w.size=gE,w.snakeCase=eA,w.some=_E,w.sortedIndex=pS,w.sortedIndexBy=mS,w.sortedIndexOf=gS,w.sortedLastIndex=_S,w.sortedLastIndexBy=vS,w.sortedLastIndexOf=xS,w.startCase=nA,w.startsWith=iA,w.subtract=$A,w.sum=ZA,w.sumBy=JA,w.template=rA,w.times=DA,w.toFinite=tr,w.toInteger=lt,w.toLength=wm,w.toLower=sA,w.toNumber=ci,w.toSafeInteger=sT,w.toString=wt,w.toUpper=oA,w.trim=aA,w.trimEnd=lA,w.trimStart=cA,w.truncate=uA,w.unescape=fA,w.uniqueId=OA,w.upperCase=hA,w.upperFirst=uf,w.each=dm,w.eachRight=pm,w.first=cm,df(w,function(){var s={};return Pi(w,function(l,h){Ct.call(w.prototype,h)||(s[h]=l)}),s}(),{chain:!1}),w.VERSION=n,ii(["bind","bindKey","curry","curryRight","partial","partialRight"],function(s){w[s].placeholder=w}),ii(["drop","take"],function(s,l){yt.prototype[s]=function(h){h=h===t?1:nn(lt(h),0);var g=this.__filtered__&&!l?new yt(this):this.clone();return g.__filtered__?g.__takeCount__=vn(h,g.__takeCount__):g.__views__.push({size:vn(h,Re),type:s+(g.__dir__<0?"Right":"")}),g},yt.prototype[s+"Right"]=function(h){return this.reverse()[s](h).reverse()}}),ii(["filter","map","takeWhile"],function(s,l){var h=l+1,g=h==le||h==xe;yt.prototype[s]=function(E){var C=this.clone();return C.__iteratees__.push({iteratee:Ye(E,3),type:h}),C.__filtered__=C.__filtered__||g,C}}),ii(["head","last"],function(s,l){var h="take"+(l?"Right":"");yt.prototype[s]=function(){return this[h](1).value()[0]}}),ii(["initial","tail"],function(s,l){var h="drop"+(l?"":"Right");yt.prototype[s]=function(){return this.__filtered__?new yt(this):this[h](1)}}),yt.prototype.compact=function(){return this.filter(zn)},yt.prototype.find=function(s){return this.filter(s).head()},yt.prototype.findLast=function(s){return this.reverse().find(s)},yt.prototype.invokeMap=gt(function(s,l){return typeof s=="function"?new yt(this):this.map(function(h){return ia(h,s,l)})}),yt.prototype.reject=function(s){return this.filter(Dl(Ye(s)))},yt.prototype.slice=function(s,l){s=lt(s);var h=this;return h.__filtered__&&(s>0||l<0)?new yt(h):(s<0?h=h.takeRight(-s):s&&(h=h.drop(s)),l!==t&&(l=lt(l),h=l<0?h.dropRight(-l):h.take(l-s)),h)},yt.prototype.takeRightWhile=function(s){return this.reverse().takeWhile(s).reverse()},yt.prototype.toArray=function(){return this.take(Re)},Pi(yt.prototype,function(s,l){var h=/^(?:filter|find|map|reject)|While$/.test(l),g=/^(?:head|last)$/.test(l),E=w[g?"take"+(l=="last"?"Right":""):l],C=g||/^find/.test(l);E&&(w.prototype[l]=function(){var F=this.__wrapped__,G=g?[1]:arguments,Z=F instanceof yt,_e=G[0],ve=Z||st(F),ye=function(xt){var St=E.apply(w,Mr([xt],G));return g&&De?St[0]:St};ve&&h&&typeof _e=="function"&&_e.length!=1&&(Z=ve=!1);var De=this.__chain__,He=!!this.__actions__.length,$e=C&&!De,ft=Z&&!He;if(!C&&ve){F=ft?F:new yt(this);var Ze=s.apply(F,G);return Ze.__actions__.push({func:Pl,args:[ye],thisArg:t}),new si(Ze,De)}return $e&&ft?s.apply(this,G):(Ze=this.thru(ye),$e?g?Ze.value()[0]:Ze.value():Ze)})}),ii(["pop","push","shift","sort","splice","unshift"],function(s){var l=nl[s],h=/^(?:push|sort|unshift)$/.test(s)?"tap":"thru",g=/^(?:pop|shift)$/.test(s);w.prototype[s]=function(){var E=arguments;if(g&&!this.__chain__){var C=this.value();return l.apply(st(C)?C:[],E)}return this[h](function(F){return l.apply(st(F)?F:[],E)})}}),Pi(yt.prototype,function(s,l){var h=w[l];if(h){var g=h.name+"";Ct.call(ks,g)||(ks[g]=[]),ks[g].push({name:l,func:h})}}),ks[El(t,v).name]=[{name:"wrapper",func:t}],yt.prototype.clone=fy,yt.prototype.reverse=hy,yt.prototype.value=dy,w.prototype.at=GS,w.prototype.chain=kS,w.prototype.commit=WS,w.prototype.next=XS,w.prototype.plant=KS,w.prototype.reverse=YS,w.prototype.toJSON=w.prototype.valueOf=w.prototype.value=$S,w.prototype.first=w.prototype.head,Zo&&(w.prototype[Zo]=qS),w},Hs=Wx();es?((es.exports=Hs)._=Hs,fu._=Hs):hn._=Hs}).call(xa)})(Hc,Hc.exports);var ya=Hc.exports;class rU extends vd{constructor(e,t={}){const n=t.font;if(n===void 0)super();else{const r=n.generateShapes(e,t.size);t.depth===void 0&&t.height!==void 0&&console.warn("THREE.TextGeometry: .height is now depreciated. Please use .depth instead"),t.depth=t.depth!==void 0?t.depth:t.height!==void 0?t.height:50,t.bevelThickness===void 0&&(t.bevelThickness=10),t.bevelSize===void 0&&(t.bevelSize=8),t.bevelEnabled===void 0&&(t.bevelEnabled=!1),super(r,t)}this.type="TextGeometry"}}class sU extends Is{constructor(e){super(e)}load(e,t,n,r){const o=this,a=new yd(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){const u=o.parse(JSON.parse(c));t&&t(u)},n,r)}parse(e){return new oU(e)}}class oU{constructor(e){this.isFont=!0,this.type="Font",this.data=e}generateShapes(e,t=100){const n=[],r=aU(e,t,this.data);for(let o=0,a=r.length;o<a;o++)n.push(...r[o].toShapes());return n}}function aU(i,e,t){const n=Array.from(i),r=e/t.resolution,o=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*r,a=[];let c=0,u=0;for(let f=0;f<n.length;f++){const d=n[f];if(d===`
`)c=0,u-=o;else{const p=lU(d,r,c,u,t);c+=p.offsetX,a.push(p.path)}}return a}function lU(i,e,t,n,r){const o=r.glyphs[i]||r.glyphs["?"];if(!o){console.error('THREE.Font: character "'+i+'" does not exists in font family '+r.familyName+".");return}const a=new E2;let c,u,f,d,p,m,_,y;if(o.o){const T=o._cachedOutline||(o._cachedOutline=o.o.split(" "));for(let x=0,v=T.length;x<v;)switch(T[x++]){case"m":c=T[x++]*e+t,u=T[x++]*e+n,a.moveTo(c,u);break;case"l":c=T[x++]*e+t,u=T[x++]*e+n,a.lineTo(c,u);break;case"q":f=T[x++]*e+t,d=T[x++]*e+n,p=T[x++]*e+t,m=T[x++]*e+n,a.quadraticCurveTo(p,m,f,d);break;case"b":f=T[x++]*e+t,d=T[x++]*e+n,p=T[x++]*e+t,m=T[x++]*e+n,_=T[x++]*e+t,y=T[x++]*e+n,a.bezierCurveTo(p,m,_,y,f,d);break}}return{offsetX:o.ha*e,path:a}}const cU={class:"app-wrapper"},uU=sw({__name:"App",setup(i){const e=Pr(),t=Pr(),n=Pr(),r=Pr(),o=Pr([]),a=Pr(),c=Pr([]),u=Pr();Xv(async()=>{var P;t.value=new sD,r.value=new rD,n.value=new In(75,window.innerWidth/window.innerHeight,.1,1e3),n.value.position.z=50,n.value.position.y=0,n.value.position.x=0,r.value.setClearColor("purple"),r.value.setSize(window.innerWidth,window.innerHeight),(P=e.value)==null||P.appendChild(r.value.domElement);const v=new sU;u.value=await v.loadAsync("./assets/fonts/type1.json");const S=await new T2().loadAsync("./assets/models/machine.gltf");a.value=S,a.value.scene.scale.set(.03,.03,.03),t.value.add(a.value.scene),m()});function f(v){v!=null&&v.length&&v.forEach(N=>{N instanceof En&&(N.material=new Vi({color:x()})),f(N.children)})}function d(){const v=new Ho(6,6,6),N=new Vi({color:x()}),S=new En(v,N),P=20;return S.position.x=ya.random(-P,P,!0),S.position.y=ya.random(-P,P,!0),S}function p(){const v=new rU("zhan dou shuang !!!",{font:u.value,size:10,depth:1,curveSegments:.1}),N=new Vi({color:x()}),S=new En(v,N),P=20;return S.position.x=ya.random(-P,P,!0),S.position.y=ya.random(-P,P,!0),S}function m(){requestAnimationFrame(m),T(),o.value.forEach(v=>{v.rotation.x+=.1,v.rotation.y+=.1}),c.value.forEach(v=>{v.rotation.x+=.01,v.rotation.y+=.01}),a.value.scene.rotation.x+=.01,a.value.scene.rotation.y+=.01,r.value.render(t.value,n.value)}function _(){var N;const v=d();o.value.push(v),(N=t.value)==null||N.add(v)}function y(){var N;const v=p();c.value.push(v),(N=t.value)==null||N.add(v)}const T=ya.throttle(()=>{var v;_(),y(),f(a.value.scene.children),(v=r.value)==null||v.setClearColor(x())},600);function x(){for(var v="0123456789ABCDEF",N="#",S=0;S<6;S++)N+=v[Math.floor(Math.random()*16)];return N}return(v,N)=>(Ow(),zw("div",cU,[rd("div",{class:"scene-wrapper",ref_key:"sceneWrapperDom",ref:e},null,512)]))}}),fU=(i,e)=>{const t=i.__vccOpts||i;for(const[n,r]of e)t[n]=r;return t},hU=fU(uU,[["__scopeId","data-v-a7936610"]]);A1(hU).mount("#app");
