function xt(...o){if(o){let e=[];for(let n=0;n<o.length;n++){let t=o[n];if(!t)continue;let r=typeof t;if(r==="string"||r==="number")e.push(t);else if(r==="object"){let i=Array.isArray(t)?[xt(...t)]:Object.entries(t).map(([a,d])=>d?a:void 0);e=i.length?e.concat(i.filter(a=>!!a)):e}}return e.join(" ").trim()}}function $t(o,e){return o?o.classList?o.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(o.className):!1}function ye(o,e){if(o&&e){let n=t=>{$t(o,t)||(o.classList?o.classList.add(t):o.className+=" "+t)};[e].flat().filter(Boolean).forEach(t=>t.split(" ").forEach(n))}}function zt(){return window.innerWidth-document.documentElement.offsetWidth}function x0(o){typeof o=="string"?ye(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.setProperty(o.variableName,zt()+"px"),ye(document.body,o?.className||"p-overflow-hidden"))}function Ct(o){if(o){let e=document.createElement("a");if(e.download!==void 0){let{name:n,src:t}=o;return e.setAttribute("href",t),e.setAttribute("download",n),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e),!0}}return!1}function $0(o,e){let n=new Blob([o],{type:"application/csv;charset=utf-8;"});window.navigator.msSaveOrOpenBlob?navigator.msSaveOrOpenBlob(n,e+".csv"):Ct({name:e+".csv",src:URL.createObjectURL(n)})||(o="data:text/csv;charset=utf-8,"+o,window.open(encodeURI(o)))}function xe(o,e){if(o&&e){let n=t=>{o.classList?o.classList.remove(t):o.className=o.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")};[e].flat().filter(Boolean).forEach(t=>t.split(" ").forEach(n))}}function z0(o){typeof o=="string"?xe(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.removeProperty(o.variableName),xe(document.body,o?.className||"p-overflow-hidden"))}function Go(o){for(let e of document?.styleSheets)try{for(let n of e?.cssRules)for(let t of n?.style)if(o.test(t))return{name:t,value:n.style.getPropertyValue(t).trim()}}catch{}return null}function dn(o){let e={width:0,height:0};if(o){let[n,t]=[o.style.visibility,o.style.display],r=o.getBoundingClientRect();o.style.visibility="hidden",o.style.display="block",e.width=r.width||o.offsetWidth,e.height=r.height||o.offsetHeight,o.style.display=t,o.style.visibility=n}return e}function ln(){let o=window,e=document,n=e.documentElement,t=e.getElementsByTagName("body")[0],r=o.innerWidth||n.clientWidth||t.clientWidth,i=o.innerHeight||n.clientHeight||t.clientHeight;return{width:r,height:i}}function Ko(o){return o?Math.abs(o.scrollLeft):0}function _t(){let o=document.documentElement;return(window.pageXOffset||Ko(o))-(o.clientLeft||0)}function Bt(){let o=document.documentElement;return(window.pageYOffset||o.scrollTop)-(o.clientTop||0)}function St(o){return o?getComputedStyle(o).direction==="rtl":!1}function C0(o,e,n=!0){var t,r,i,a;if(o){let d=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:dn(o),l=d.height,c=d.width,s=e.offsetHeight,g=e.offsetWidth,p=e.getBoundingClientRect(),b=Bt(),h=_t(),m=ln(),v,C,_="top";p.top+s+l>m.height?(v=p.top+b-l,_="bottom",v<0&&(v=b)):v=s+p.top+b,p.left+c>m.width?C=Math.max(0,p.left+h+g-c):C=p.left+h,St(o)?o.style.insetInlineEnd=C+"px":o.style.insetInlineStart=C+"px",o.style.top=v+"px",o.style.transformOrigin=_,n&&(o.style.marginTop=_==="bottom"?`calc(${(r=(t=Go(/-anchor-gutter$/))==null?void 0:t.value)!=null?r:"2px"} * -1)`:(a=(i=Go(/-anchor-gutter$/))==null?void 0:i.value)!=null?a:"")}}function _0(o,e){o&&(typeof e=="string"?o.style.cssText=e:Object.entries(e||{}).forEach(([n,t])=>o.style[n]=t))}function B0(o,e){return o instanceof HTMLElement?o.offsetWidth:0}function S0(o,e,n=!0,t=void 0){var r;if(o){let i=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:dn(o),a=e.offsetHeight,d=e.getBoundingClientRect(),l=ln(),c,s,g=t??"top";if(!t&&d.top+a+i.height>l.height?(c=-1*i.height,g="bottom",d.top+c<0&&(c=-1*d.top)):c=a,i.width>l.width?s=d.left*-1:d.left+i.width>l.width?s=(d.left+i.width-l.width)*-1:s=0,o.style.top=c+"px",o.style.insetInlineStart=s+"px",o.style.transformOrigin=g,n){let p=(r=Go(/-anchor-gutter$/))==null?void 0:r.value;o.style.marginTop=g==="bottom"?`calc(${p??"2px"} * -1)`:p??""}}}function ie(o){if(o){let e=o.parentNode;return e&&e instanceof ShadowRoot&&e.host&&(e=e.host),e}return null}function R0(o){return!!(o!==null&&typeof o<"u"&&o.nodeName&&ie(o))}function to(o){return typeof Element<"u"?o instanceof Element:o!==null&&typeof o=="object"&&o.nodeType===1&&typeof o.nodeName=="string"}function O0(){if(window.getSelection){let o=window.getSelection()||{};o.empty?o.empty():o.removeAllRanges&&o.rangeCount>0&&o.getRangeAt(0).getClientRects().length>0&&o.removeAllRanges()}}function cn(o,e={}){if(to(o)){let n=(t,r)=>{var i,a;let d=(i=o?.$attrs)!=null&&i[t]?[(a=o?.$attrs)==null?void 0:a[t]]:[];return[r].flat().reduce((l,c)=>{if(c!=null){let s=typeof c;if(s==="string"||s==="number")l.push(c);else if(s==="object"){let g=Array.isArray(c)?n(t,c):Object.entries(c).map(([p,b])=>t==="style"&&(b||b===0)?`${p.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${b}`:b?p:void 0);l=g.length?l.concat(g.filter(p=>!!p)):l}}return l},d)};Object.entries(e).forEach(([t,r])=>{if(r!=null){let i=t.match(/^on(.+)/);i?o.addEventListener(i[1].toLowerCase(),r):t==="p-bind"||t==="pBind"?cn(o,r):(r=t==="class"?[...new Set(n("class",r))].join(" ").trim():t==="style"?n("style",r).join(";").trim():r,(o.$attrs=o.$attrs||{})&&(o.$attrs[t]=r),o.setAttribute(t,r))}})}}function Z0(o,e={},...n){if(o){let t=document.createElement(o);return cn(t,e),t.append(...n),t}}function E0(o,e){if(o){o.style.opacity="0";let n=+new Date,t="0",r=function(){t=`${+o.style.opacity+(new Date().getTime()-n)/e}`,o.style.opacity=t,n=+new Date,+t<1&&("requestAnimationFrame"in window?requestAnimationFrame(r):setTimeout(r,16))};r()}}function Rt(o,e){return to(o)?Array.from(o.querySelectorAll(e)):[]}function Ot(o,e){return to(o)?o.matches(e)?o:o.querySelector(e):null}function j0(o,e){o&&document.activeElement!==o&&o.focus(e)}function I0(o,e){if(to(o)){let n=o.getAttribute(e);return isNaN(n)?n==="true"||n==="false"?n==="true":n:+n}}function sn(o,e=""){let n=Rt(o,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`),t=[];for(let r of n)getComputedStyle(r).display!="none"&&getComputedStyle(r).visibility!="hidden"&&t.push(r);return t}function N0(o,e){let n=sn(o,e);return n.length>0?n[0]:null}function T0(o){if(o){let e=o.offsetHeight,n=getComputedStyle(o);return e-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),e}return 0}function P0(o){if(o){let[e,n]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let t=o.offsetHeight;return o.style.display=n,o.style.visibility=e,t}return 0}function D0(o){if(o){let[e,n]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let t=o.offsetWidth;return o.style.display=n,o.style.visibility=e,t}return 0}function A0(o){var e;if(o){let n=(e=ie(o))==null?void 0:e.childNodes,t=0;if(n)for(let r=0;r<n.length;r++){if(n[r]===o)return t;n[r].nodeType===1&&t++}}return-1}function F0(o,e){let n=sn(o,e);return n.length>0?n[n.length-1]:null}function W0(o,e){let n=o.nextElementSibling;for(;n;){if(n.matches(e))return n;n=n.nextElementSibling}return null}function L0(o){if(o){let e=o.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||Ko(document.documentElement)||Ko(document.body)||0)}}return{top:"auto",left:"auto"}}function M0(o,e){return o?o.offsetHeight:0}function un(o,e=[]){let n=ie(o);return n===null?e:un(n,e.concat([n]))}function U0(o,e){let n=o.previousElementSibling;for(;n;){if(n.matches(e))return n;n=n.previousElementSibling}return null}function Y0(o){let e=[];if(o){let n=un(o),t=/(auto|scroll)/,r=i=>{try{let a=window.getComputedStyle(i,null);return t.test(a.getPropertyValue("overflow"))||t.test(a.getPropertyValue("overflowX"))||t.test(a.getPropertyValue("overflowY"))}catch{return!1}};for(let i of n){let a=i.nodeType===1&&i.dataset.scrollselectors;if(a){let d=a.split(",");for(let l of d){let c=Ot(i,l);c&&r(c)&&e.push(c)}}i.nodeType!==9&&r(i)&&e.push(i)}}return e}function V0(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function X0(o){if(o){let e=o.offsetWidth,n=getComputedStyle(o);return e-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),e}return 0}function H0(o,e,n){let t=o[e];typeof t=="function"&&t.apply(o,[])}function J0(){return/(android)/i.test(navigator.userAgent)}function G0(o){if(o){let e=o.nodeName,n=o.parentElement&&o.parentElement.nodeName;return e==="INPUT"||e==="TEXTAREA"||e==="BUTTON"||e==="A"||n==="INPUT"||n==="TEXTAREA"||n==="BUTTON"||n==="A"||!!o.closest(".p-button, .p-checkbox, .p-radiobutton")}return!1}function K0(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function q0(o,e=""){return to(o)?o.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`):!1}function Q0(o){return!!(o&&o.offsetParent!=null)}function ok(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function ek(o,e="",n){to(o)&&n!==null&&n!==void 0&&o.setAttribute(e,n)}function Zt(){let o=new Map;return{on(e,n){let t=o.get(e);return t?t.push(n):t=[n],o.set(e,t),this},off(e,n){let t=o.get(e);return t&&t.splice(t.indexOf(n)>>>0,1),this},emit(e,n){let t=o.get(e);t&&t.forEach(r=>{r(n)})},clear(){o.clear()}}}var Et=Object.defineProperty,$e=Object.getOwnPropertySymbols,jt=Object.prototype.hasOwnProperty,It=Object.prototype.propertyIsEnumerable,ze=(o,e,n)=>e in o?Et(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,pn=(o,e)=>{for(var n in e||(e={}))jt.call(e,n)&&ze(o,n,e[n]);if($e)for(var n of $e(e))It.call(e,n)&&ze(o,n,e[n]);return o};function H(o){return o==null||o===""||Array.isArray(o)&&o.length===0||!(o instanceof Date)&&typeof o=="object"&&Object.keys(o).length===0}function Nt(o,e,n,t=1){let r=-1,i=H(o),a=H(e);return i&&a?r=0:i?r=t:a?r=-t:typeof o=="string"&&typeof e=="string"?r=n(o,e):r=o<e?-1:o>e?1:0,r}function qo(o,e,n=new WeakSet){if(o===e)return!0;if(!o||!e||typeof o!="object"||typeof e!="object"||n.has(o)||n.has(e))return!1;n.add(o).add(e);let t=Array.isArray(o),r=Array.isArray(e),i,a,d;if(t&&r){if(a=o.length,a!=e.length)return!1;for(i=a;i--!==0;)if(!qo(o[i],e[i],n))return!1;return!0}if(t!=r)return!1;let l=o instanceof Date,c=e instanceof Date;if(l!=c)return!1;if(l&&c)return o.getTime()==e.getTime();let s=o instanceof RegExp,g=e instanceof RegExp;if(s!=g)return!1;if(s&&g)return o.toString()==e.toString();let p=Object.keys(o);if(a=p.length,a!==Object.keys(e).length)return!1;for(i=a;i--!==0;)if(!Object.prototype.hasOwnProperty.call(e,p[i]))return!1;for(i=a;i--!==0;)if(d=p[i],!qo(o[d],e[d],n))return!1;return!0}function Tt(o,e){return qo(o,e)}function bn(o){return typeof o=="function"&&"call"in o&&"apply"in o}function x(o){return!H(o)}function Ce(o,e){if(!o||!e)return null;try{let n=o[e];if(x(n))return n}catch{}if(Object.keys(o).length){if(bn(e))return e(o);if(e.indexOf(".")===-1)return o[e];{let n=e.split("."),t=o;for(let r=0,i=n.length;r<i;++r){if(t==null)return null;t=t[n[r]]}return t}}return null}function Pt(o,e,n){return n?Ce(o,n)===Ce(e,n):Tt(o,e)}function nk(o,e){if(o!=null&&e&&e.length){for(let n of e)if(Pt(o,n))return!0}return!1}function P(o,e=!0){return o instanceof Object&&o.constructor===Object&&(e||Object.keys(o).length!==0)}function gn(o={},e={}){let n=pn({},o);return Object.keys(e).forEach(t=>{let r=t;P(e[r])&&r in o&&P(o[r])?n[r]=gn(o[r],e[r]):n[r]=e[r]}),n}function fn(...o){return o.reduce((e,n,t)=>t===0?n:gn(e,n),{})}function tk(o,e){let n=-1;if(e){for(let t=0;t<e.length;t++)if(e[t]===o){n=t;break}}return n}function rk(o,e){let n=-1;if(x(o))try{n=o.findLastIndex(e)}catch{n=o.lastIndexOf([...o].reverse().find(e))}return n}function F(o,...e){return bn(o)?o(...e):o}function M(o,e=!0){return typeof o=="string"&&(e||o!=="")}function _e(o){return M(o)?o.replace(/(-|_)/g,"").toLowerCase():o}function Dt(o,e="",n={}){let t=_e(e).split("."),r=t.shift();if(r){if(P(o)){let i=Object.keys(o).find(a=>_e(a)===r)||"";return Dt(F(o[i],n),t.join("."),n)}return}return F(o,n)}function ak(o,e=!0){return Array.isArray(o)&&(e||o.length!==0)}function ik(o){return o instanceof Date}function At(o){return x(o)&&!isNaN(o)}function dk(o=""){return x(o)&&o.length===1&&!!o.match(/\S| /)}function lk(){return new Intl.Collator(void 0,{numeric:!0}).compare}function X(o,e){if(e){let n=e.test(o);return e.lastIndex=0,n}return!1}function ck(...o){return fn(...o)}function Be(o){return o&&o.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":").trim()}function sk(o,...e){if(!P(o))return o;let n=pn({},o);return e?.flat().forEach(t=>delete n[t]),n}function uk(o){if(o&&/[\xC0-\xFF\u0100-\u017E]/.test(o)){let e={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let n in e)o=o.replace(e[n],n)}return o}function pk(o,e,n){o&&e!==n&&(n>=o.length&&(n%=o.length,e%=o.length),o.splice(n,0,o.splice(e,1)[0]))}function bk(o,e,n=1,t,r=1){let i=Nt(o,e,t,n),a=n;return(H(o)||H(e))&&(a=r===1?n:r),a*i}function gk(o){return M(o,!1)?o[0].toUpperCase()+o.slice(1):o}function hn(o){return M(o)?o.replace(/(_)/g,"-").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():o}var Oo={};function fk(o="pui_id_"){return Object.hasOwn(Oo,o)||(Oo[o]=0),Oo[o]++,`${o}${Oo[o]}`}function Ft(){let o=[],e=(a,d,l=999)=>{let c=r(a,d,l),s=c.value+(c.key===a?0:l)+1;return o.push({key:a,value:s}),s},n=a=>{o=o.filter(d=>d.value!==a)},t=(a,d)=>r(a).value,r=(a,d,l=0)=>[...o].reverse().find(c=>!0)||{key:a,value:l},i=a=>a&&parseInt(a.style.zIndex,10)||0;return{get:i,set:(a,d,l)=>{d&&(d.style.zIndex=String(e(a,!0,l)))},clear:a=>{a&&(n(i(a)),a.style.zIndex="")},getCurrent:a=>t(a)}}var hk=Ft(),Wt=Object.defineProperty,Lt=Object.defineProperties,Mt=Object.getOwnPropertyDescriptors,Ao=Object.getOwnPropertySymbols,mn=Object.prototype.hasOwnProperty,kn=Object.prototype.propertyIsEnumerable,Se=(o,e,n)=>e in o?Wt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,T=(o,e)=>{for(var n in e||(e={}))mn.call(e,n)&&Se(o,n,e[n]);if(Ao)for(var n of Ao(e))kn.call(e,n)&&Se(o,n,e[n]);return o},Ho=(o,e)=>Lt(o,Mt(e)),D=(o,e)=>{var n={};for(var t in o)mn.call(o,t)&&e.indexOf(t)<0&&(n[t]=o[t]);if(o!=null&&Ao)for(var t of Ao(o))e.indexOf(t)<0&&kn.call(o,t)&&(n[t]=o[t]);return n};function mk(...o){return fn(...o)}var Ut=Zt(),V=Ut,bo=/{([^}]*)}/g,vn=/(\d+\s+[\+\-\*\/]\s+\d+)/g,wn=/var\([^)]+\)/g;function Re(o){return M(o)?o.replace(/[A-Z]/g,(e,n)=>n===0?e:"."+e.toLowerCase()).toLowerCase():o}function Yt(o){return P(o)&&o.hasOwnProperty("$value")&&o.hasOwnProperty("$type")?o.$value:o}function Vt(o){return o.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function Qo(o="",e=""){return Vt(`${M(o,!1)&&M(e,!1)?`${o}-`:o}${e}`)}function yn(o="",e=""){return`--${Qo(o,e)}`}function Xt(o=""){let e=(o.match(/{/g)||[]).length,n=(o.match(/}/g)||[]).length;return(e+n)%2!==0}function xn(o,e="",n="",t=[],r){if(M(o)){let i=o.trim();if(Xt(i))return;if(X(i,bo)){let a=i.replaceAll(bo,d=>{let l=d.replace(/{|}/g,"").split(".").filter(c=>!t.some(s=>X(c,s)));return`var(${yn(n,hn(l.join("-")))}${x(r)?`, ${r}`:""})`});return X(a.replace(wn,"0"),vn)?`calc(${a})`:a}return i}else if(At(o))return o}function Ht(o,e,n){M(e,!1)&&o.push(`${e}:${n};`)}function oo(o,e){return o?`${o}{${e}}`:""}function $n(o,e){if(o.indexOf("dt(")===-1)return o;function n(a,d){let l=[],c=0,s="",g=null,p=0;for(;c<=a.length;){let b=a[c];if((b==='"'||b==="'"||b==="`")&&a[c-1]!=="\\"&&(g=g===b?null:b),!g&&(b==="("&&p++,b===")"&&p--,(b===","||c===a.length)&&p===0)){let h=s.trim();h.startsWith("dt(")?l.push($n(h,d)):l.push(t(h)),s="",c++;continue}b!==void 0&&(s+=b),c++}return l}function t(a){let d=a[0];if((d==='"'||d==="'"||d==="`")&&a[a.length-1]===d)return a.slice(1,-1);let l=Number(a);return isNaN(l)?a:l}let r=[],i=[];for(let a=0;a<o.length;a++)if(o[a]==="d"&&o.slice(a,a+3)==="dt(")i.push(a),a+=2;else if(o[a]===")"&&i.length>0){let d=i.pop();i.length===0&&r.push([d,a])}if(!r.length)return o;for(let a=r.length-1;a>=0;a--){let[d,l]=r[a],c=o.slice(d+3,l),s=n(c,e),g=e(...s);o=o.slice(0,d)+g+o.slice(l+1)}return o}var kk=o=>{var e;let n=go.getTheme(),t=oe(n,o,void 0,"variable"),r=(e=t?.match(/--[\w-]+/g))==null?void 0:e[0],i=oe(n,o,void 0,"value");return{name:r,variable:t,value:i}},po=(...o)=>oe(go.getTheme(),...o),oe=(o={},e,n,t)=>{if(e){let{variable:r,options:i}=go.defaults||{},{prefix:a,transform:d}=o?.options||i||{},l=X(e,bo)?e:`{${e}}`;return t==="value"||H(t)&&d==="strict"?go.getTokenValue(e):xn(l,void 0,a,[r.excludedKeyRegex],n)}return""};function vk(o,...e){if(o instanceof Array){let n=o.reduce((t,r,i)=>{var a;return t+r+((a=F(e[i],{dt:po}))!=null?a:"")},"");return $n(n,po)}return F(o,{dt:po})}function Jt(o,e={}){let n=go.defaults.variable,{prefix:t=n.prefix,selector:r=n.selector,excludedKeyRegex:i=n.excludedKeyRegex}=e,a=[],d=[],l=[{node:o,path:t}];for(;l.length;){let{node:s,path:g}=l.pop();for(let p in s){let b=s[p],h=Yt(b),m=X(p,i)?Qo(g):Qo(g,hn(p));if(P(h))l.push({node:h,path:m});else{let v=yn(m),C=xn(h,m,t,[i]);Ht(d,v,C);let _=m;t&&_.startsWith(t+"-")&&(_=_.slice(t.length+1)),a.push(_.replace(/-/g,"."))}}}let c=d.join("");return{value:d,tokens:a,declarations:c,css:oo(r,c)}}var N={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(o){return{type:"class",selector:o,matched:this.pattern.test(o.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(o){return{type:"attr",selector:`:root${o},:host${o}`,matched:this.pattern.test(o.trim())}}},media:{pattern:/^@media (.*)$/,resolve(o){return{type:"media",selector:o,matched:this.pattern.test(o.trim())}}},system:{pattern:/^system$/,resolve(o){return{type:"system",selector:"@media (prefers-color-scheme: dark)",matched:this.pattern.test(o.trim())}}},custom:{resolve(o){return{type:"custom",selector:o,matched:!0}}}},resolve(o){let e=Object.keys(this.rules).filter(n=>n!=="custom").map(n=>this.rules[n]);return[o].flat().map(n=>{var t;return(t=e.map(r=>r.resolve(n)).find(r=>r.matched))!=null?t:this.rules.custom.resolve(n)})}},_toVariables(o,e){return Jt(o,{prefix:e?.prefix})},getCommon({name:o="",theme:e={},params:n,set:t,defaults:r}){var i,a,d,l,c,s,g;let{preset:p,options:b}=e,h,m,v,C,_,R,B;if(x(p)&&b.transform!=="strict"){let{primitive:O,semantic:ao,extend:q}=p,io=ao||{},{colorScheme:ko}=io,vo=D(io,["colorScheme"]),wo=q||{},{colorScheme:yo}=wo,lo=D(wo,["colorScheme"]),co=ko||{},{dark:xo}=co,$o=D(co,["dark"]),zo=yo||{},{dark:Co}=zo,_o=D(zo,["dark"]),Bo=x(O)?this._toVariables({primitive:O},b):{},So=x(vo)?this._toVariables({semantic:vo},b):{},Ro=x($o)?this._toVariables({light:$o},b):{},me=x(xo)?this._toVariables({dark:xo},b):{},ke=x(lo)?this._toVariables({semantic:lo},b):{},ve=x(_o)?this._toVariables({light:_o},b):{},we=x(Co)?this._toVariables({dark:Co},b):{},[rt,at]=[(i=Bo.declarations)!=null?i:"",Bo.tokens],[it,dt]=[(a=So.declarations)!=null?a:"",So.tokens||[]],[lt,ct]=[(d=Ro.declarations)!=null?d:"",Ro.tokens||[]],[st,ut]=[(l=me.declarations)!=null?l:"",me.tokens||[]],[pt,bt]=[(c=ke.declarations)!=null?c:"",ke.tokens||[]],[gt,ft]=[(s=ve.declarations)!=null?s:"",ve.tokens||[]],[ht,mt]=[(g=we.declarations)!=null?g:"",we.tokens||[]];h=this.transformCSS(o,rt,"light","variable",b,t,r),m=at;let kt=this.transformCSS(o,`${it}${lt}`,"light","variable",b,t,r),vt=this.transformCSS(o,`${st}`,"dark","variable",b,t,r);v=`${kt}${vt}`,C=[...new Set([...dt,...ct,...ut])];let wt=this.transformCSS(o,`${pt}${gt}color-scheme:light`,"light","variable",b,t,r),yt=this.transformCSS(o,`${ht}color-scheme:dark`,"dark","variable",b,t,r);_=`${wt}${yt}`,R=[...new Set([...bt,...ft,...mt])],B=F(p.css,{dt:po})}return{primitive:{css:h,tokens:m},semantic:{css:v,tokens:C},global:{css:_,tokens:R},style:B}},getPreset({name:o="",preset:e={},options:n,params:t,set:r,defaults:i,selector:a}){var d,l,c;let s,g,p;if(x(e)&&n.transform!=="strict"){let b=o.replace("-directive",""),h=e,{colorScheme:m,extend:v,css:C}=h,_=D(h,["colorScheme","extend","css"]),R=v||{},{colorScheme:B}=R,O=D(R,["colorScheme"]),ao=m||{},{dark:q}=ao,io=D(ao,["dark"]),ko=B||{},{dark:vo}=ko,wo=D(ko,["dark"]),yo=x(_)?this._toVariables({[b]:T(T({},_),O)},n):{},lo=x(io)?this._toVariables({[b]:T(T({},io),wo)},n):{},co=x(q)?this._toVariables({[b]:T(T({},q),vo)},n):{},[xo,$o]=[(d=yo.declarations)!=null?d:"",yo.tokens||[]],[zo,Co]=[(l=lo.declarations)!=null?l:"",lo.tokens||[]],[_o,Bo]=[(c=co.declarations)!=null?c:"",co.tokens||[]],So=this.transformCSS(b,`${xo}${zo}`,"light","variable",n,r,i,a),Ro=this.transformCSS(b,_o,"dark","variable",n,r,i,a);s=`${So}${Ro}`,g=[...new Set([...$o,...Co,...Bo])],p=F(C,{dt:po})}return{css:s,tokens:g,style:p}},getPresetC({name:o="",theme:e={},params:n,set:t,defaults:r}){var i;let{preset:a,options:d}=e,l=(i=a?.components)==null?void 0:i[o];return this.getPreset({name:o,preset:l,options:d,params:n,set:t,defaults:r})},getPresetD({name:o="",theme:e={},params:n,set:t,defaults:r}){var i,a;let d=o.replace("-directive",""),{preset:l,options:c}=e,s=((i=l?.components)==null?void 0:i[d])||((a=l?.directives)==null?void 0:a[d]);return this.getPreset({name:d,preset:s,options:c,params:n,set:t,defaults:r})},applyDarkColorScheme(o){return!(o.darkModeSelector==="none"||o.darkModeSelector===!1)},getColorSchemeOption(o,e){var n;return this.applyDarkColorScheme(o)?this.regex.resolve(o.darkModeSelector===!0?e.options.darkModeSelector:(n=o.darkModeSelector)!=null?n:e.options.darkModeSelector):[]},getLayerOrder(o,e={},n,t){let{cssLayer:r}=e;return r?`@layer ${F(r.order||r.name||"primeui",n)}`:""},getCommonStyleSheet({name:o="",theme:e={},params:n,props:t={},set:r,defaults:i}){let a=this.getCommon({name:o,theme:e,params:n,set:r,defaults:i}),d=Object.entries(t).reduce((l,[c,s])=>l.push(`${c}="${s}"`)&&l,[]).join(" ");return Object.entries(a||{}).reduce((l,[c,s])=>{if(P(s)&&Object.hasOwn(s,"css")){let g=Be(s.css),p=`${c}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${p}" ${d}>${g}</style>`)}return l},[]).join("")},getStyleSheet({name:o="",theme:e={},params:n,props:t={},set:r,defaults:i}){var a;let d={name:o,theme:e,params:n,set:r,defaults:i},l=(a=o.includes("-directive")?this.getPresetD(d):this.getPresetC(d))==null?void 0:a.css,c=Object.entries(t).reduce((s,[g,p])=>s.push(`${g}="${p}"`)&&s,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${o}-variables" ${c}>${Be(l)}</style>`:""},createTokens(o={},e,n="",t="",r={}){let i=function(d,l={},c=[]){if(c.includes(this.path))return console.warn(`Circular reference detected at ${this.path}`),{colorScheme:d,path:this.path,paths:l,value:void 0};c.push(this.path),l.name=this.path,l.binding||(l.binding={});let s=this.value;if(typeof this.value=="string"&&bo.test(this.value)){let g=this.value.trim().replace(bo,p=>{var b;let h=p.slice(1,-1),m=this.tokens[h];if(!m)return console.warn(`Token not found for path: ${h}`),"__UNRESOLVED__";let v=m.computed(d,l,c);return Array.isArray(v)&&v.length===2?`light-dark(${v[0].value},${v[1].value})`:(b=v?.value)!=null?b:"__UNRESOLVED__"});s=vn.test(g.replace(wn,"0"))?`calc(${g})`:g}return H(l.binding)&&delete l.binding,c.pop(),{colorScheme:d,path:this.path,paths:l,value:s.includes("__UNRESOLVED__")?void 0:s}},a=(d,l,c)=>{Object.entries(d).forEach(([s,g])=>{let p=X(s,e.variable.excludedKeyRegex)?l:l?`${l}.${Re(s)}`:Re(s),b=c?`${c}.${s}`:s;P(g)?a(g,p,b):(r[p]||(r[p]={paths:[],computed:(h,m={},v=[])=>{if(r[p].paths.length===1)return r[p].paths[0].computed(r[p].paths[0].scheme,m.binding,v);if(h&&h!=="none")for(let C=0;C<r[p].paths.length;C++){let _=r[p].paths[C];if(_.scheme===h)return _.computed(h,m.binding,v)}return r[p].paths.map(C=>C.computed(C.scheme,m[C.scheme],v))}}),r[p].paths.push({path:b,value:g,scheme:b.includes("colorScheme.light")?"light":b.includes("colorScheme.dark")?"dark":"none",computed:i,tokens:r}))})};return a(o,n,t),r},getTokenValue(o,e,n){var t;let r=(d=>d.split(".").filter(l=>!X(l.toLowerCase(),n.variable.excludedKeyRegex)).join("."))(e),i=e.includes("colorScheme.light")?"light":e.includes("colorScheme.dark")?"dark":void 0,a=[(t=o[r])==null?void 0:t.computed(i)].flat().filter(d=>d);return a.length===1?a[0].value:a.reduce((d={},l)=>{let c=l,{colorScheme:s}=c,g=D(c,["colorScheme"]);return d[s]=g,d},void 0)},getSelectorRule(o,e,n,t){return n==="class"||n==="attr"?oo(x(e)?`${o}${e},${o} ${e}`:o,t):oo(o,oo(e??":root,:host",t))},transformCSS(o,e,n,t,r={},i,a,d){if(x(e)){let{cssLayer:l}=r;if(t!=="style"){let c=this.getColorSchemeOption(r,a);e=n==="dark"?c.reduce((s,{type:g,selector:p})=>(x(p)&&(s+=p.includes("[CSS]")?p.replace("[CSS]",e):this.getSelectorRule(p,d,g,e)),s),""):oo(d??":root,:host",e)}if(l){let c={name:"primeui"};P(l)&&(c.name=F(l.name,{name:o,type:t})),x(c.name)&&(e=oo(`@layer ${c.name}`,e),i?.layerNames(c.name))}return e}return""}},go={defaults:{variable:{prefix:"p",selector:":root,:host",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(o={}){let{theme:e}=o;e&&(this._theme=Ho(T({},e),{options:T(T({},this.defaults.options),e.options)}),this._tokens=N.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var o;return((o=this.theme)==null?void 0:o.preset)||{}},get options(){var o;return((o=this.theme)==null?void 0:o.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(o){this.update({theme:o}),V.emit("theme:change",o)},getPreset(){return this.preset},setPreset(o){this._theme=Ho(T({},this.theme),{preset:o}),this._tokens=N.createTokens(o,this.defaults),this.clearLoadedStyleNames(),V.emit("preset:change",o),V.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(o){this._theme=Ho(T({},this.theme),{options:o}),this.clearLoadedStyleNames(),V.emit("options:change",o),V.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(o){this._layerNames.add(o)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(o){return this._loadedStyleNames.has(o)},setLoadedStyleName(o){this._loadedStyleNames.add(o)},deleteLoadedStyleName(o){this._loadedStyleNames.delete(o)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(o){return N.getTokenValue(this.tokens,o,this.defaults)},getCommon(o="",e){return N.getCommon({name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(o="",e){let n={name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return N.getPresetC(n)},getDirective(o="",e){let n={name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return N.getPresetD(n)},getCustomPreset(o="",e,n,t){let r={name:o,preset:e,options:this.options,selector:n,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return N.getPreset(r)},getLayerOrderCSS(o=""){return N.getLayerOrder(o,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(o="",e,n="style",t){return N.transformCSS(o,e,t,n,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(o="",e,n={}){return N.getCommonStyleSheet({name:o,theme:this.theme,params:e,props:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(o,e,n={}){return N.getStyleSheet({name:o,theme:this.theme,params:e,props:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(o){this._loadingStyles.add(o)},onStyleUpdated(o){this._loadingStyles.add(o)},onStyleLoaded(o,{name:e}){this._loadingStyles.size&&(this._loadingStyles.delete(e),V.emit(`theme:${e}:load`,o),!this._loadingStyles.size&&V.emit("theme:load"))}},wk=`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    .p-collapsible-enter-active {
        animation: p-animate-collapsible-expand 0.2s ease-out;
        overflow: hidden;
    }

    .p-collapsible-leave-active {
        animation: p-animate-collapsible-collapse 0.2s ease-out;
        overflow: hidden;
    }

    @keyframes p-animate-collapsible-expand {
        from {
            grid-template-rows: 0fr;
        }
        to {
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-collapsible-collapse {
        from {
            grid-template-rows: 1fr;
        }
        to {
            grid-template-rows: 0fr;
        }
    }

    .p-disabled,
    .p-disabled * {
        cursor: default;
        pointer-events: none;
        user-select: none;
    }

    .p-disabled,
    .p-component:disabled {
        opacity: dt('disabled.opacity');
    }

    .pi {
        font-size: dt('icon.size');
    }

    .p-icon {
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-overlay-mask {
        background: var(--px-mask-background, dt('mask.background'));
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter-active {
        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave-active {
        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;
    }

    @keyframes p-animate-overlay-mask-enter {
        from {
            background: transparent;
        }
        to {
            background: var(--px-mask-background, dt('mask.background'));
        }
    }
    @keyframes p-animate-overlay-mask-leave {
        from {
            background: var(--px-mask-background, dt('mask.background'));
        }
        to {
            background: transparent;
        }
    }

    .p-anchored-overlay-enter-active {
        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-anchored-overlay-leave-active {
        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-anchored-overlay-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-anchored-overlay-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`,yk=`
    .p-toast {
        width: dt('toast.width');
        white-space: pre-line;
        word-break: break-word;
    }

    .p-toast-message {
        margin: 0 0 1rem 0;
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-toast-message-icon {
        flex-shrink: 0;
        font-size: dt('toast.icon.size');
        width: dt('toast.icon.size');
        height: dt('toast.icon.size');
    }

    .p-toast-message-content {
        display: flex;
        align-items: flex-start;
        padding: dt('toast.content.padding');
        gap: dt('toast.content.gap');
        min-height: 0;
        overflow: hidden;
        transition: padding 250ms ease-in;
    }

    .p-toast-message-text {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: dt('toast.text.gap');
    }

    .p-toast-summary {
        font-weight: dt('toast.summary.font.weight');
        font-size: dt('toast.summary.font.size');
    }

    .p-toast-detail {
        font-weight: dt('toast.detail.font.weight');
        font-size: dt('toast.detail.font.size');
    }

    .p-toast-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        background: transparent;
        transition:
            background dt('toast.transition.duration'),
            color dt('toast.transition.duration'),
            outline-color dt('toast.transition.duration'),
            box-shadow dt('toast.transition.duration');
        outline-color: transparent;
        color: inherit;
        width: dt('toast.close.button.width');
        height: dt('toast.close.button.height');
        border-radius: dt('toast.close.button.border.radius');
        margin: -25% 0 0 0;
        right: -25%;
        padding: 0;
        border: none;
        user-select: none;
    }

    .p-toast-close-button:dir(rtl) {
        margin: -25% 0 0 auto;
        left: -25%;
        right: auto;
    }

    .p-toast-message-info,
    .p-toast-message-success,
    .p-toast-message-warn,
    .p-toast-message-error,
    .p-toast-message-secondary,
    .p-toast-message-contrast {
        border-width: dt('toast.border.width');
        border-style: solid;
        backdrop-filter: blur(dt('toast.blur'));
        border-radius: dt('toast.border.radius');
    }

    .p-toast-close-icon {
        font-size: dt('toast.close.icon.size');
        width: dt('toast.close.icon.size');
        height: dt('toast.close.icon.size');
    }

    .p-toast-close-button:focus-visible {
        outline-width: dt('focus.ring.width');
        outline-style: dt('focus.ring.style');
        outline-offset: dt('focus.ring.offset');
    }

    .p-toast-message-info {
        background: dt('toast.info.background');
        border-color: dt('toast.info.border.color');
        color: dt('toast.info.color');
        box-shadow: dt('toast.info.shadow');
    }

    .p-toast-message-info .p-toast-detail {
        color: dt('toast.info.detail.color');
    }

    .p-toast-message-info .p-toast-close-button:focus-visible {
        outline-color: dt('toast.info.close.button.focus.ring.color');
        box-shadow: dt('toast.info.close.button.focus.ring.shadow');
    }

    .p-toast-message-info .p-toast-close-button:hover {
        background: dt('toast.info.close.button.hover.background');
    }

    .p-toast-message-success {
        background: dt('toast.success.background');
        border-color: dt('toast.success.border.color');
        color: dt('toast.success.color');
        box-shadow: dt('toast.success.shadow');
    }

    .p-toast-message-success .p-toast-detail {
        color: dt('toast.success.detail.color');
    }

    .p-toast-message-success .p-toast-close-button:focus-visible {
        outline-color: dt('toast.success.close.button.focus.ring.color');
        box-shadow: dt('toast.success.close.button.focus.ring.shadow');
    }

    .p-toast-message-success .p-toast-close-button:hover {
        background: dt('toast.success.close.button.hover.background');
    }

    .p-toast-message-warn {
        background: dt('toast.warn.background');
        border-color: dt('toast.warn.border.color');
        color: dt('toast.warn.color');
        box-shadow: dt('toast.warn.shadow');
    }

    .p-toast-message-warn .p-toast-detail {
        color: dt('toast.warn.detail.color');
    }

    .p-toast-message-warn .p-toast-close-button:focus-visible {
        outline-color: dt('toast.warn.close.button.focus.ring.color');
        box-shadow: dt('toast.warn.close.button.focus.ring.shadow');
    }

    .p-toast-message-warn .p-toast-close-button:hover {
        background: dt('toast.warn.close.button.hover.background');
    }

    .p-toast-message-error {
        background: dt('toast.error.background');
        border-color: dt('toast.error.border.color');
        color: dt('toast.error.color');
        box-shadow: dt('toast.error.shadow');
    }

    .p-toast-message-error .p-toast-detail {
        color: dt('toast.error.detail.color');
    }

    .p-toast-message-error .p-toast-close-button:focus-visible {
        outline-color: dt('toast.error.close.button.focus.ring.color');
        box-shadow: dt('toast.error.close.button.focus.ring.shadow');
    }

    .p-toast-message-error .p-toast-close-button:hover {
        background: dt('toast.error.close.button.hover.background');
    }

    .p-toast-message-secondary {
        background: dt('toast.secondary.background');
        border-color: dt('toast.secondary.border.color');
        color: dt('toast.secondary.color');
        box-shadow: dt('toast.secondary.shadow');
    }

    .p-toast-message-secondary .p-toast-detail {
        color: dt('toast.secondary.detail.color');
    }

    .p-toast-message-secondary .p-toast-close-button:focus-visible {
        outline-color: dt('toast.secondary.close.button.focus.ring.color');
        box-shadow: dt('toast.secondary.close.button.focus.ring.shadow');
    }

    .p-toast-message-secondary .p-toast-close-button:hover {
        background: dt('toast.secondary.close.button.hover.background');
    }

    .p-toast-message-contrast {
        background: dt('toast.contrast.background');
        border-color: dt('toast.contrast.border.color');
        color: dt('toast.contrast.color');
        box-shadow: dt('toast.contrast.shadow');
    }
    
    .p-toast-message-contrast .p-toast-detail {
        color: dt('toast.contrast.detail.color');
    }

    .p-toast-message-contrast .p-toast-close-button:focus-visible {
        outline-color: dt('toast.contrast.close.button.focus.ring.color');
        box-shadow: dt('toast.contrast.close.button.focus.ring.shadow');
    }

    .p-toast-message-contrast .p-toast-close-button:hover {
        background: dt('toast.contrast.close.button.hover.background');
    }

    .p-toast-top-center {
        transform: translateX(-50%);
    }

    .p-toast-bottom-center {
        transform: translateX(-50%);
    }

    .p-toast-center {
        min-width: 20vw;
        transform: translate(-50%, -50%);
    }

    .p-toast-message-enter-active {
        animation: p-animate-toast-enter 300ms ease-out;
    }

    .p-toast-message-leave-active {
        animation: p-animate-toast-leave 250ms ease-in;
    }

    .p-toast-message-leave-to .p-toast-message-content {
        padding-top: 0;
        padding-bottom: 0;
    }

    @keyframes p-animate-toast-enter {
        from {
            opacity: 0;
            transform: scale(0.6);
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

     @keyframes p-animate-toast-leave {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            margin-bottom: 0;
            grid-template-rows: 0fr;
            transform: translateY(-100%) scale(0.6);
        }
    }
`,xk=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,$k=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`,zk=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\0A0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`,Ck=`
    .p-dialog {
        max-height: 90%;
        transform: scale(1);
        border-radius: dt('dialog.border.radius');
        box-shadow: dt('dialog.shadow');
        background: dt('dialog.background');
        border: 1px solid dt('dialog.border.color');
        color: dt('dialog.color');
        will-change: transform;
    }

    .p-dialog-content {
        overflow-y: auto;
        padding: dt('dialog.content.padding');
    }

    .p-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('dialog.header.padding');
    }

    .p-dialog-title {
        font-weight: dt('dialog.title.font.weight');
        font-size: dt('dialog.title.font.size');
    }

    .p-dialog-footer {
        flex-shrink: 0;
        padding: dt('dialog.footer.padding');
        display: flex;
        justify-content: flex-end;
        gap: dt('dialog.footer.gap');
    }

    .p-dialog-header-actions {
        display: flex;
        align-items: center;
        gap: dt('dialog.header.gap');
    }

    .p-dialog-top .p-dialog,
    .p-dialog-bottom .p-dialog,
    .p-dialog-left .p-dialog,
    .p-dialog-right .p-dialog,
    .p-dialog-topleft .p-dialog,
    .p-dialog-topright .p-dialog,
    .p-dialog-bottomleft .p-dialog,
    .p-dialog-bottomright .p-dialog {
        margin: 1rem;
    }

    .p-dialog-maximized {
        width: 100vw !important;
        height: 100vh !important;
        top: 0px !important;
        left: 0px !important;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
    }

    .p-dialog-maximized .p-dialog-content {
        flex-grow: 1;
    }

    .p-dialog .p-resizable-handle {
        position: absolute;
        font-size: 0.1px;
        display: block;
        cursor: se-resize;
        width: 12px;
        height: 12px;
        right: 1px;
        bottom: 1px;
    }

    .p-dialog-enter-active {
        animation: p-animate-dialog-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-dialog-leave-active {
        animation: p-animate-dialog-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-dialog-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-dialog-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`,_k=`
    .p-confirmdialog .p-dialog-content {
        display: flex;
        align-items: center;
        gap: dt('confirmdialog.content.gap');
    }

    .p-confirmdialog-icon {
        color: dt('confirmdialog.icon.color');
        font-size: dt('confirmdialog.icon.size');
        width: dt('confirmdialog.icon.size');
        height: dt('confirmdialog.icon.size');
    }
`,Bk=`
    .p-tooltip {
        position: absolute;
        display: none;
        max-width: dt('tooltip.max.width');
    }

    .p-tooltip-right,
    .p-tooltip-left {
        padding: 0 dt('tooltip.gutter');
    }

    .p-tooltip-top,
    .p-tooltip-bottom {
        padding: dt('tooltip.gutter') 0;
    }

    .p-tooltip-text {
        white-space: pre-line;
        word-break: break-word;
        background: dt('tooltip.background');
        color: dt('tooltip.color');
        padding: dt('tooltip.padding');
        box-shadow: dt('tooltip.shadow');
        border-radius: dt('tooltip.border.radius');
    }

    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    .p-tooltip-right .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;
        border-right-color: dt('tooltip.background');
    }

    .p-tooltip-left .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');
        border-left-color: dt('tooltip.background');
    }

    .p-tooltip-top .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }

    .p-tooltip-bottom .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }
`,Sk=`
    .p-overlaybadge {
        position: relative;
    }

    .p-overlaybadge .p-badge {
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
        outline-width: dt('overlaybadge.outline.width');
        outline-style: solid;
        outline-color: dt('overlaybadge.outline.color');
    }

    .p-overlaybadge .p-badge:dir(rtl) {
        transform: translate(-50%, -50%);
    }
`,Rk=`
    .p-popover {
        margin-block-start: dt('popover.gutter');
        background: dt('popover.background');
        color: dt('popover.color');
        border: 1px solid dt('popover.border.color');
        border-radius: dt('popover.border.radius');
        box-shadow: dt('popover.shadow');
        will-change: transform;
    }

    .p-popover-content {
        padding: dt('popover.content.padding');
    }

    .p-popover-flipped {
        margin-block-start: calc(dt('popover.gutter') * -1);
        margin-block-end: dt('popover.gutter');
    }

    .p-popover:after,
    .p-popover:before {
        bottom: 100%;
        left: calc(dt('popover.arrow.offset') + dt('popover.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-popover:after {
        border-width: calc(dt('popover.gutter') - 2px);
        margin-left: calc(-1 * (dt('popover.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.background');
    }

    .p-popover:before {
        border-width: dt('popover.gutter');
        margin-left: calc(-1 * dt('popover.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.border.color');
    }

    .p-popover-flipped:after,
    .p-popover-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-popover.p-popover-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('popover.background');
    }

    .p-popover.p-popover-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('popover.border.color');
    }
`,Gt={transitionDuration:"{transition.duration}"},Kt={borderWidth:"0 0 1px 0",borderColor:"{content.border.color}"},qt={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}",padding:"1.125rem",fontWeight:"600",borderRadius:"0",borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",hoverBackground:"{content.background}",activeBackground:"{content.background}",activeHoverBackground:"{content.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},toggleIcon:{color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}"},first:{topBorderRadius:"{content.border.radius}",borderWidth:"0"},last:{bottomBorderRadius:"{content.border.radius}",activeBottomBorderRadius:"0"}},Qt={borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",color:"{text.color}",padding:"0 1.125rem 1.125rem 1.125rem"},or={root:Gt,panel:Kt,header:qt,content:Qt},er={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},nr={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},tr={padding:"{list.padding}",gap:"{list.gap}"},rr={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},ar={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},ir={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},dr={borderRadius:"{border.radius.sm}"},lr={padding:"{list.option.padding}"},cr={light:{chip:{focusBackground:"{surface.200}",focusColor:"{surface.800}"},dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",focusColor:"{surface.0}"},dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"}}},sr={root:er,overlay:nr,list:tr,option:rr,optionGroup:ar,dropdown:ir,chip:dr,emptyMessage:lr,colorScheme:cr},ur={width:"2rem",height:"2rem",fontSize:"1rem",background:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},pr={size:"1rem"},br={borderColor:"{content.background}",offset:"-0.75rem"},gr={width:"3rem",height:"3rem",fontSize:"1.5rem",icon:{size:"1.5rem"},group:{offset:"-1rem"}},fr={width:"4rem",height:"4rem",fontSize:"2rem",icon:{size:"2rem"},group:{offset:"-1.5rem"}},hr={root:ur,icon:pr,group:br,lg:gr,xl:fr},mr={borderRadius:"{border.radius.md}",padding:"0 0.5rem",fontSize:"0.75rem",fontWeight:"700",minWidth:"1.5rem",height:"1.5rem"},kr={size:"0.5rem"},vr={fontSize:"0.625rem",minWidth:"1.25rem",height:"1.25rem"},wr={fontSize:"0.875rem",minWidth:"1.75rem",height:"1.75rem"},yr={fontSize:"1rem",minWidth:"2rem",height:"2rem"},xr={light:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.500}",color:"{surface.0}"},info:{background:"{sky.500}",color:"{surface.0}"},warn:{background:"{orange.500}",color:"{surface.0}"},danger:{background:"{red.500}",color:"{surface.0}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"{green.400}",color:"{green.950}"},info:{background:"{sky.400}",color:"{sky.950}"},warn:{background:"{orange.400}",color:"{orange.950}"},danger:{background:"{red.400}",color:"{red.950}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},$r={root:mr,dot:kr,sm:vr,lg:wr,xl:yr,colorScheme:xr},zr={borderRadius:{none:"0",xs:"2px",sm:"4px",md:"6px",lg:"8px",xl:"12px"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"}},Cr={transitionDuration:"0.2s",focusRing:{width:"1px",style:"solid",color:"{primary.color}",offset:"2px",shadow:"none"},disabledOpacity:"0.6",iconSize:"1rem",anchorGutter:"2px",primary:{50:"{emerald.50}",100:"{emerald.100}",200:"{emerald.200}",300:"{emerald.300}",400:"{emerald.400}",500:"{emerald.500}",600:"{emerald.600}",700:"{emerald.700}",800:"{emerald.800}",900:"{emerald.900}",950:"{emerald.950}"},formField:{paddingX:"0.75rem",paddingY:"0.5rem",sm:{fontSize:"0.875rem",paddingX:"0.625rem",paddingY:"0.375rem"},lg:{fontSize:"1.125rem",paddingX:"0.875rem",paddingY:"0.625rem"},borderRadius:"{border.radius.md}",focusRing:{width:"0",style:"none",color:"transparent",offset:"0",shadow:"none"},transitionDuration:"{transition.duration}"},list:{padding:"0.25rem 0.25rem",gap:"2px",header:{padding:"0.5rem 1rem 0.25rem 1rem"},option:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}"},optionGroup:{padding:"0.5rem 0.75rem",fontWeight:"600"}},content:{borderRadius:"{border.radius.md}"},mask:{transitionDuration:"0.3s"},navigation:{list:{padding:"0.25rem 0.25rem",gap:"2px"},item:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}",gap:"0.5rem"},submenuLabel:{padding:"0.5rem 0.75rem",fontWeight:"600"},submenuIcon:{size:"0.875rem"}},overlay:{select:{borderRadius:"{border.radius.md}",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},popover:{borderRadius:"{border.radius.md}",padding:"0.75rem",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},modal:{borderRadius:"{border.radius.xl}",padding:"1.25rem",shadow:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"},navigation:{shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"}},colorScheme:{light:{surface:{0:"#ffffff",50:"{slate.50}",100:"{slate.100}",200:"{slate.200}",300:"{slate.300}",400:"{slate.400}",500:"{slate.500}",600:"{slate.600}",700:"{slate.700}",800:"{slate.800}",900:"{slate.900}",950:"{slate.950}"},primary:{color:"{primary.500}",contrastColor:"#ffffff",hoverColor:"{primary.600}",activeColor:"{primary.700}"},highlight:{background:"{primary.50}",focusBackground:"{primary.100}",color:"{primary.700}",focusColor:"{primary.800}"},mask:{background:"rgba(0,0,0,0.4)",color:"{surface.200}"},formField:{background:"{surface.0}",disabledBackground:"{surface.200}",filledBackground:"{surface.50}",filledHoverBackground:"{surface.50}",filledFocusBackground:"{surface.50}",borderColor:"{surface.300}",hoverBorderColor:"{surface.400}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.400}",color:"{surface.700}",disabledColor:"{surface.500}",placeholderColor:"{surface.500}",invalidPlaceholderColor:"{red.600}",floatLabelColor:"{surface.500}",floatLabelFocusColor:"{primary.600}",floatLabelActiveColor:"{surface.500}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.700}",hoverColor:"{surface.800}",mutedColor:"{surface.500}",hoverMutedColor:"{surface.600}"},content:{background:"{surface.0}",hoverBackground:"{surface.100}",borderColor:"{surface.200}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},popover:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},modal:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.100}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.100}",activeBackground:"{surface.100}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}}},dark:{surface:{0:"#ffffff",50:"{zinc.50}",100:"{zinc.100}",200:"{zinc.200}",300:"{zinc.300}",400:"{zinc.400}",500:"{zinc.500}",600:"{zinc.600}",700:"{zinc.700}",800:"{zinc.800}",900:"{zinc.900}",950:"{zinc.950}"},primary:{color:"{primary.400}",contrastColor:"{surface.900}",hoverColor:"{primary.300}",activeColor:"{primary.200}"},highlight:{background:"color-mix(in srgb, {primary.400}, transparent 84%)",focusBackground:"color-mix(in srgb, {primary.400}, transparent 76%)",color:"rgba(255,255,255,.87)",focusColor:"rgba(255,255,255,.87)"},mask:{background:"rgba(0,0,0,0.6)",color:"{surface.200}"},formField:{background:"{surface.950}",disabledBackground:"{surface.700}",filledBackground:"{surface.800}",filledHoverBackground:"{surface.800}",filledFocusBackground:"{surface.800}",borderColor:"{surface.600}",hoverBorderColor:"{surface.500}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.300}",color:"{surface.0}",disabledColor:"{surface.400}",placeholderColor:"{surface.400}",invalidPlaceholderColor:"{red.400}",floatLabelColor:"{surface.400}",floatLabelFocusColor:"{primary.color}",floatLabelActiveColor:"{surface.400}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.0}",hoverColor:"{surface.0}",mutedColor:"{surface.400}",hoverMutedColor:"{surface.300}"},content:{background:"{surface.900}",hoverBackground:"{surface.800}",borderColor:"{surface.700}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},popover:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},modal:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.800}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.800}",activeBackground:"{surface.800}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}}}}},_r={primitive:zr,semantic:Cr},Br={borderRadius:"{content.border.radius}"},Sr={root:Br},Rr={padding:"1rem",background:"{content.background}",gap:"0.5rem",transitionDuration:"{transition.duration}"},Or={color:"{text.muted.color}",hoverColor:"{text.color}",borderRadius:"{content.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",hoverColor:"{navigation.item.icon.focus.color}"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Zr={color:"{navigation.item.icon.color}"},Er={root:Rr,item:Or,separator:Zr},jr={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",gap:"0.5rem",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",iconOnlyWidth:"2.5rem",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}",iconOnlyWidth:"2rem"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}",iconOnlyWidth:"3rem"},label:{fontWeight:"500"},raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"},badgeSize:"1rem",transitionDuration:"{form.field.transition.duration}"},Ir={light:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",borderColor:"{surface.100}",hoverBorderColor:"{surface.200}",activeBorderColor:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}",focusRing:{color:"{surface.600}",shadow:"none"}},info:{background:"{sky.500}",hoverBackground:"{sky.600}",activeBackground:"{sky.700}",borderColor:"{sky.500}",hoverBorderColor:"{sky.600}",activeBorderColor:"{sky.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{sky.500}",shadow:"none"}},success:{background:"{green.500}",hoverBackground:"{green.600}",activeBackground:"{green.700}",borderColor:"{green.500}",hoverBorderColor:"{green.600}",activeBorderColor:"{green.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{green.500}",shadow:"none"}},warn:{background:"{orange.500}",hoverBackground:"{orange.600}",activeBackground:"{orange.700}",borderColor:"{orange.500}",hoverBorderColor:"{orange.600}",activeBorderColor:"{orange.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{orange.500}",shadow:"none"}},help:{background:"{purple.500}",hoverBackground:"{purple.600}",activeBackground:"{purple.700}",borderColor:"{purple.500}",hoverBorderColor:"{purple.600}",activeBorderColor:"{purple.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{purple.500}",shadow:"none"}},danger:{background:"{red.500}",hoverBackground:"{red.600}",activeBackground:"{red.700}",borderColor:"{red.500}",hoverBorderColor:"{red.600}",activeBorderColor:"{red.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{red.500}",shadow:"none"}},contrast:{background:"{surface.950}",hoverBackground:"{surface.900}",activeBackground:"{surface.800}",borderColor:"{surface.950}",hoverBorderColor:"{surface.900}",activeBorderColor:"{surface.800}",color:"{surface.0}",hoverColor:"{surface.0}",activeColor:"{surface.0}",focusRing:{color:"{surface.950}",shadow:"none"}}},outlined:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",borderColor:"{primary.200}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",borderColor:"{green.200}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",borderColor:"{sky.200}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",borderColor:"{orange.200}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",borderColor:"{purple.200}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",borderColor:"{red.200}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.700}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.700}"}},text:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.700}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}},dark:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",borderColor:"{surface.800}",hoverBorderColor:"{surface.700}",activeBorderColor:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}",focusRing:{color:"{surface.300}",shadow:"none"}},info:{background:"{sky.400}",hoverBackground:"{sky.300}",activeBackground:"{sky.200}",borderColor:"{sky.400}",hoverBorderColor:"{sky.300}",activeBorderColor:"{sky.200}",color:"{sky.950}",hoverColor:"{sky.950}",activeColor:"{sky.950}",focusRing:{color:"{sky.400}",shadow:"none"}},success:{background:"{green.400}",hoverBackground:"{green.300}",activeBackground:"{green.200}",borderColor:"{green.400}",hoverBorderColor:"{green.300}",activeBorderColor:"{green.200}",color:"{green.950}",hoverColor:"{green.950}",activeColor:"{green.950}",focusRing:{color:"{green.400}",shadow:"none"}},warn:{background:"{orange.400}",hoverBackground:"{orange.300}",activeBackground:"{orange.200}",borderColor:"{orange.400}",hoverBorderColor:"{orange.300}",activeBorderColor:"{orange.200}",color:"{orange.950}",hoverColor:"{orange.950}",activeColor:"{orange.950}",focusRing:{color:"{orange.400}",shadow:"none"}},help:{background:"{purple.400}",hoverBackground:"{purple.300}",activeBackground:"{purple.200}",borderColor:"{purple.400}",hoverBorderColor:"{purple.300}",activeBorderColor:"{purple.200}",color:"{purple.950}",hoverColor:"{purple.950}",activeColor:"{purple.950}",focusRing:{color:"{purple.400}",shadow:"none"}},danger:{background:"{red.400}",hoverBackground:"{red.300}",activeBackground:"{red.200}",borderColor:"{red.400}",hoverBorderColor:"{red.300}",activeBorderColor:"{red.200}",color:"{red.950}",hoverColor:"{red.950}",activeColor:"{red.950}",focusRing:{color:"{red.400}",shadow:"none"}},contrast:{background:"{surface.0}",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{surface.0}",hoverBorderColor:"{surface.100}",activeBorderColor:"{surface.200}",color:"{surface.950}",hoverColor:"{surface.950}",activeColor:"{surface.950}",focusRing:{color:"{surface.0}",shadow:"none"}}},outlined:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",borderColor:"{primary.700}",color:"{primary.color}"},secondary:{hoverBackground:"rgba(255,255,255,0.04)",activeBackground:"rgba(255,255,255,0.16)",borderColor:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",borderColor:"{green.700}",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",borderColor:"{sky.700}",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",borderColor:"{orange.700}",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",borderColor:"{purple.700}",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",borderColor:"{red.700}",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.500}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.600}",color:"{surface.0}"}},text:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",color:"{primary.color}"},secondary:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}}},Nr={root:jr,colorScheme:Ir},Tr={background:"{content.background}",borderRadius:"{border.radius.xl}",color:"{content.color}",shadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"},Pr={padding:"1.25rem",gap:"0.5rem"},Dr={gap:"0.5rem"},Ar={fontSize:"1.25rem",fontWeight:"500"},Fr={color:"{text.muted.color}"},Wr={root:Tr,body:Pr,caption:Dr,title:Ar,subtitle:Fr},Lr={transitionDuration:"{transition.duration}"},Mr={gap:"0.25rem"},Ur={padding:"1rem",gap:"0.5rem"},Yr={width:"2rem",height:"0.5rem",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Vr={light:{indicator:{background:"{surface.200}",hoverBackground:"{surface.300}",activeBackground:"{primary.color}"}},dark:{indicator:{background:"{surface.700}",hoverBackground:"{surface.600}",activeBackground:"{primary.color}"}}},Xr={root:Lr,content:Mr,indicatorList:Ur,indicator:Yr,colorScheme:Vr},Hr={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Jr={width:"2.5rem",color:"{form.field.icon.color}"},Gr={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Kr={padding:"{list.padding}",gap:"{list.gap}",mobileIndent:"1rem"},qr={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",icon:{color:"{list.option.icon.color}",focusColor:"{list.option.icon.focus.color}",size:"0.875rem"}},Qr={color:"{form.field.icon.color}"},oa={root:Hr,dropdown:Jr,overlay:Gr,list:Kr,option:qr,clearIcon:Qr},ea={borderRadius:"{border.radius.sm}",width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},na={size:"0.875rem",color:"{form.field.color}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.75rem"},lg:{size:"1rem"}},ta={root:ea,icon:na},ra={borderRadius:"16px",paddingX:"0.75rem",paddingY:"0.5rem",gap:"0.5rem",transitionDuration:"{transition.duration}"},aa={width:"2rem",height:"2rem"},ia={size:"1rem"},da={size:"1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"}},la={light:{root:{background:"{surface.100}",color:"{surface.800}"},icon:{color:"{surface.800}"},removeIcon:{color:"{surface.800}"}},dark:{root:{background:"{surface.800}",color:"{surface.0}"},icon:{color:"{surface.0}"},removeIcon:{color:"{surface.0}"}}},ca={root:ra,image:aa,icon:ia,removeIcon:da,colorScheme:la},sa={transitionDuration:"{transition.duration}"},ua={width:"1.5rem",height:"1.5rem",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},pa={shadow:"{overlay.popover.shadow}",borderRadius:"{overlay.popover.borderRadius}"},ba={light:{panel:{background:"{surface.800}",borderColor:"{surface.900}"},handle:{color:"{surface.0}"}},dark:{panel:{background:"{surface.900}",borderColor:"{surface.700}"},handle:{color:"{surface.0}"}}},ga={root:sa,preview:ua,panel:pa,colorScheme:ba},fa={size:"2rem",color:"{overlay.modal.color}"},ha={gap:"1rem"},ma={icon:fa,content:ha},ka={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},va={padding:"{overlay.popover.padding}",gap:"1rem"},wa={size:"1.5rem",color:"{overlay.popover.color}"},ya={gap:"0.5rem",padding:"0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}"},xa={root:ka,content:va,icon:wa,footer:ya},$a={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},za={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Ca={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},_a={mobileIndent:"1rem"},Ba={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},Sa={borderColor:"{content.border.color}"},Ra={root:$a,list:za,item:Ca,submenu:_a,submenuIcon:Ba,separator:Sa},Oa=`
    li.p-autocomplete-option,
    div.p-cascadeselect-option-content,
    li.p-listbox-option,
    li.p-multiselect-option,
    li.p-select-option,
    li.p-listbox-option,
    div.p-tree-node-content,
    li.p-datatable-filter-constraint,
    .p-datatable .p-datatable-tbody > tr,
    .p-treetable .p-treetable-tbody > tr,
    div.p-menu-item-content,
    div.p-tieredmenu-item-content,
    div.p-contextmenu-item-content,
    div.p-menubar-item-content,
    div.p-megamenu-item-content,
    div.p-panelmenu-header-content,
    div.p-panelmenu-item-content,
    th.p-datatable-header-cell,
    th.p-treetable-header-cell,
    thead.p-datatable-thead > tr > th,
    .p-treetable thead.p-treetable-thead>tr>th {
        transition: none;
    }
`,Za={transitionDuration:"{transition.duration}"},Ea={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},ja={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{datatable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Ia={fontWeight:"600"},Na={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Ta={borderColor:"{datatable.border.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Pa={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Da={fontWeight:"600"},Aa={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Fa={color:"{primary.color}"},Wa={width:"0.5rem"},La={width:"1px",color:"{primary.color}"},Ma={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},Ua={size:"2rem"},Ya={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Va={inlineGap:"0.5rem",overlaySelect:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},overlayPopover:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}",gap:"0.5rem"},rule:{borderColor:"{content.border.color}"},constraintList:{padding:"{list.padding}",gap:"{list.gap}"},constraint:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",separator:{borderColor:"{content.border.color}"},padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"}},Xa={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},Ha={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},Ja={light:{root:{borderColor:"{content.border.color}"},row:{stripedBackground:"{surface.50}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},row:{stripedBackground:"{surface.950}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},Ga=`
    .p-datatable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,Ka={root:Za,header:Ea,headerCell:ja,columnTitle:Ia,row:Na,bodyCell:Ta,footerCell:Pa,columnFooter:Da,footer:Aa,dropPoint:Fa,columnResizer:Wa,resizeIndicator:La,sortIcon:Ma,loadingIcon:Ua,rowToggleButton:Ya,filter:Va,paginatorTop:Xa,paginatorBottom:Ha,colorScheme:Ja,css:Ga},qa={borderColor:"transparent",borderWidth:"0",borderRadius:"0",padding:"0"},Qa={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",borderRadius:"0"},oi={background:"{content.background}",color:"{content.color}",borderColor:"transparent",borderWidth:"0",padding:"0",borderRadius:"0"},ei={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"1px 0 0 0",padding:"0.75rem 1rem",borderRadius:"0"},ni={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},ti={borderColor:"{content.border.color}",borderWidth:"1px 0 0 0"},ri={root:qa,header:Qa,content:oi,footer:ei,paginatorTop:ni,paginatorBottom:ti},ai={transitionDuration:"{transition.duration}"},ii={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}"},di={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",padding:"0 0 0.5rem 0"},li={gap:"0.5rem",fontWeight:"500"},ci={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},si={color:"{form.field.icon.color}"},ui={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},pi={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},bi={borderColor:"{content.border.color}",gap:"{overlay.popover.padding}"},gi={margin:"0.5rem 0 0 0"},fi={padding:"0.25rem",fontWeight:"500",color:"{content.color}"},hi={hoverBackground:"{content.hover.background}",selectedBackground:"{primary.color}",rangeSelectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{primary.contrast.color}",rangeSelectedColor:"{highlight.color}",width:"2rem",height:"2rem",borderRadius:"50%",padding:"0.25rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},mi={margin:"0.5rem 0 0 0"},ki={padding:"0.375rem",borderRadius:"{content.border.radius}"},vi={margin:"0.5rem 0 0 0"},wi={padding:"0.375rem",borderRadius:"{content.border.radius}"},yi={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}"},xi={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}",gap:"0.5rem",buttonGap:"0.25rem"},$i={light:{dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"},today:{background:"{surface.200}",color:"{surface.900}"}},dark:{dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"},today:{background:"{surface.700}",color:"{surface.0}"}}},zi={root:ai,panel:ii,header:di,title:li,dropdown:ci,inputIcon:si,selectMonth:ui,selectYear:pi,group:bi,dayView:gi,weekDay:fi,date:hi,monthView:mi,month:ki,yearView:vi,year:wi,buttonbar:yi,timePicker:xi,colorScheme:$i},Ci={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",borderRadius:"{overlay.modal.border.radius}",shadow:"{overlay.modal.shadow}"},_i={padding:"{overlay.modal.padding}",gap:"0.5rem"},Bi={fontSize:"1.25rem",fontWeight:"600"},Si={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},Ri={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}",gap:"0.5rem"},Oi={root:Ci,header:_i,title:Bi,content:Si,footer:Ri},Zi={borderColor:"{content.border.color}"},Ei={background:"{content.background}",color:"{text.color}"},ji={margin:"1rem 0",padding:"0 1rem",content:{padding:"0 0.5rem"}},Ii={margin:"0 1rem",padding:"0.5rem 0",content:{padding:"0.5rem 0"}},Ni={root:Zi,content:Ei,horizontal:ji,vertical:Ii},Ti={background:"rgba(255, 255, 255, 0.1)",borderColor:"rgba(255, 255, 255, 0.2)",padding:"0.5rem",borderRadius:"{border.radius.xl}"},Pi={borderRadius:"{content.border.radius}",padding:"0.5rem",size:"3rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Di={root:Ti,item:Pi},Ai={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",shadow:"{overlay.modal.shadow}"},Fi={padding:"{overlay.modal.padding}"},Wi={fontSize:"1.5rem",fontWeight:"600"},Li={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},Mi={padding:"{overlay.modal.padding}"},Ui={root:Ai,header:Fi,title:Wi,content:Li,footer:Mi},Yi={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}"},Vi={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},Xi={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}",padding:"{list.padding}"},Hi={focusBackground:"{list.option.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},Ji={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},Gi={toolbar:Yi,toolbarItem:Vi,overlay:Xi,overlayOption:Hi,content:Ji},Ki={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",padding:"0 1.125rem 1.125rem 1.125rem",transitionDuration:"{transition.duration}"},qi={background:"{content.background}",hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",borderRadius:"{content.border.radius}",borderWidth:"1px",borderColor:"transparent",padding:"0.5rem 0.75rem",gap:"0.5rem",fontWeight:"600",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Qi={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}"},od={padding:"0"},ed={root:Ki,legend:qi,toggleIcon:Qi,content:od},nd={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},td={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"unset",borderWidth:"0",borderRadius:"0",gap:"0.5rem"},rd={highlightBorderColor:"{primary.color}",padding:"0 1.125rem 1.125rem 1.125rem",gap:"1rem"},ad={padding:"1rem",gap:"1rem",borderColor:"{content.border.color}",info:{gap:"0.5rem"}},id={gap:"0.5rem"},dd={height:"0.25rem"},ld={gap:"0.5rem"},cd={root:nd,header:td,content:rd,file:ad,fileList:id,progressbar:dd,basic:ld},sd={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",activeColor:"{form.field.float.label.active.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",positionY:"{form.field.padding.y}",fontWeight:"500",active:{fontSize:"0.75rem",fontWeight:"400"}},ud={active:{top:"-1.25rem"}},pd={input:{paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},active:{top:"{form.field.padding.y}"}},bd={borderRadius:"{border.radius.xs}",active:{background:"{form.field.background}",padding:"0 0.125rem"}},gd={root:sd,over:ud,in:pd,on:bd},fd={borderWidth:"1px",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},hd={background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.100}",hoverColor:"{surface.0}",size:"3rem",gutter:"0.5rem",prev:{borderRadius:"50%"},next:{borderRadius:"50%"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},md={size:"1.5rem"},kd={background:"{content.background}",padding:"1rem 0.25rem"},vd={size:"2rem",borderRadius:"{content.border.radius}",gutter:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},wd={size:"1rem"},yd={background:"rgba(0, 0, 0, 0.5)",color:"{surface.100}",padding:"1rem"},xd={gap:"0.5rem",padding:"1rem"},$d={width:"1rem",height:"1rem",activeBackground:"{primary.color}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},zd={background:"rgba(0, 0, 0, 0.5)"},Cd={background:"rgba(255, 255, 255, 0.4)",hoverBackground:"rgba(255, 255, 255, 0.6)",activeBackground:"rgba(255, 255, 255, 0.9)"},_d={size:"3rem",gutter:"0.5rem",background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.50}",hoverColor:"{surface.0}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Bd={size:"1.5rem"},Sd={light:{thumbnailNavButton:{hoverBackground:"{surface.100}",color:"{surface.600}",hoverColor:"{surface.700}"},indicatorButton:{background:"{surface.200}",hoverBackground:"{surface.300}"}},dark:{thumbnailNavButton:{hoverBackground:"{surface.700}",color:"{surface.400}",hoverColor:"{surface.0}"},indicatorButton:{background:"{surface.700}",hoverBackground:"{surface.600}"}}},Rd={root:fd,navButton:hd,navIcon:md,thumbnailsContent:kd,thumbnailNavButton:vd,thumbnailNavButtonIcon:wd,caption:yd,indicatorList:xd,indicatorButton:$d,insetIndicatorList:zd,insetIndicatorButton:Cd,closeButton:_d,closeButtonIcon:Bd,colorScheme:Sd},Od={color:"{form.field.icon.color}"},Zd={icon:Od},Ed={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",top:"{form.field.padding.y}",fontSize:"0.75rem",fontWeight:"400"},jd={paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},Id={root:Ed,input:jd},Nd={transitionDuration:"{transition.duration}"},Td={icon:{size:"1.5rem"},mask:{background:"{mask.background}",color:"{mask.color}"}},Pd={position:{left:"auto",right:"1rem",top:"1rem",bottom:"auto"},blur:"8px",background:"rgba(255,255,255,0.1)",borderColor:"rgba(255,255,255,0.2)",borderWidth:"1px",borderRadius:"30px",padding:".5rem",gap:"0.5rem"},Dd={hoverBackground:"rgba(255,255,255,0.1)",color:"{surface.50}",hoverColor:"{surface.0}",size:"3rem",iconSize:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ad={root:Nd,preview:Td,toolbar:Pd,action:Dd},Fd={size:"15px",hoverSize:"30px",background:"rgba(255,255,255,0.3)",hoverBackground:"rgba(255,255,255,0.3)",borderColor:"unset",hoverBorderColor:"unset",borderWidth:"0",borderRadius:"50%",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"rgba(255,255,255,0.3)",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Wd={handle:Fd},Ld={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",gap:"0.5rem"},Md={fontWeight:"500"},Ud={size:"1rem"},Yd={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}}},Vd={root:Ld,text:Md,icon:Ud,colorScheme:Yd},Xd={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{transition.duration}"},Hd={hoverBackground:"{content.hover.background}",hoverColor:"{content.hover.color}"},Jd={root:Xd,display:Hd},Gd={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},Kd={borderRadius:"{border.radius.sm}"},qd={light:{chip:{focusBackground:"{surface.200}",color:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",color:"{surface.0}"}}},Qd={root:Gd,chip:Kd,colorScheme:qd},ol={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.icon.color}",borderRadius:"{form.field.border.radius}",padding:"0.5rem",minWidth:"2.5rem"},el={addon:ol},nl={transitionDuration:"{transition.duration}"},tl={width:"2.5rem",borderRadius:"{form.field.border.radius}",verticalPadding:"{form.field.padding.y}"},rl={light:{button:{background:"transparent",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.500}",activeColor:"{surface.600}"}},dark:{button:{background:"transparent",hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.300}",activeColor:"{surface.200}"}}},al={root:nl,button:tl,colorScheme:rl},il={gap:"0.5rem"},dl={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"}},ll={root:il,input:dl},cl={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},sl={root:cl},ul={transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},pl={background:"{primary.color}"},bl={background:"{content.border.color}"},gl={color:"{text.muted.color}"},fl={root:ul,value:pl,range:bl,text:gl},hl={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",borderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",shadow:"{form.field.shadow}",borderRadius:"{form.field.border.radius}",transitionDuration:"{form.field.transition.duration}"},ml={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},kl={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},vl={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},wl={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},yl={padding:"{list.option.padding}"},xl={light:{option:{stripedBackground:"{surface.50}"}},dark:{option:{stripedBackground:"{surface.900}"}}},$l={root:hl,list:ml,option:kl,optionGroup:vl,checkmark:wl,emptyMessage:yl,colorScheme:xl},zl={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",verticalOrientation:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},horizontalOrientation:{padding:"0.5rem 0.75rem",gap:"0.5rem"},transitionDuration:"{transition.duration}"},Cl={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},_l={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Bl={padding:"0",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",shadow:"{overlay.navigation.shadow}",gap:"0.5rem"},Sl={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Rl={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},Ol={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},Zl={borderColor:"{content.border.color}"},El={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},jl={root:zl,baseItem:Cl,item:_l,overlay:Bl,submenu:Sl,submenuLabel:Rl,submenuIcon:Ol,separator:Zl,mobileButton:El},Il={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},Nl={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Tl={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},Pl={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},Dl={borderColor:"{content.border.color}"},Al={root:Il,list:Nl,item:Tl,submenuLabel:Pl,separator:Dl},Fl={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.5rem 0.75rem",transitionDuration:"{transition.duration}"},Wl={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},Ll={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Ml={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",mobileIndent:"1rem",icon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"}},Ul={borderColor:"{content.border.color}"},Yl={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Vl={root:Fl,baseItem:Wl,item:Ll,submenu:Ml,separator:Ul,mobileButton:Yl},Xl={borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},Hl={padding:"0.5rem 0.75rem",gap:"0.5rem",sm:{padding:"0.375rem 0.625rem"},lg:{padding:"0.625rem 0.875rem"}},Jl={fontSize:"1rem",fontWeight:"500",sm:{fontSize:"0.875rem"},lg:{fontSize:"1.125rem"}},Gl={size:"1.125rem",sm:{size:"1rem"},lg:{size:"1.25rem"}},Kl={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},ql={size:"1rem",sm:{size:"0.875rem"},lg:{size:"1.125rem"}},Ql={root:{borderWidth:"1px"}},oc={content:{padding:"0"}},ec={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}},outlined:{color:"{blue.600}",borderColor:"{blue.600}"},simple:{color:"{blue.600}"}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}},outlined:{color:"{green.600}",borderColor:"{green.600}"},simple:{color:"{green.600}"}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}},outlined:{color:"{yellow.600}",borderColor:"{yellow.600}"},simple:{color:"{yellow.600}"}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}},outlined:{color:"{red.600}",borderColor:"{red.600}"},simple:{color:"{red.600}"}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}},outlined:{color:"{surface.500}",borderColor:"{surface.500}"},simple:{color:"{surface.500}"}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}},outlined:{color:"{surface.950}",borderColor:"{surface.950}"},simple:{color:"{surface.950}"}}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}},outlined:{color:"{blue.500}",borderColor:"{blue.500}"},simple:{color:"{blue.500}"}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}},outlined:{color:"{green.500}",borderColor:"{green.500}"},simple:{color:"{green.500}"}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}},outlined:{color:"{yellow.500}",borderColor:"{yellow.500}"},simple:{color:"{yellow.500}"}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}},outlined:{color:"{red.500}",borderColor:"{red.500}"},simple:{color:"{red.500}"}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}},outlined:{color:"{surface.400}",borderColor:"{surface.400}"},simple:{color:"{surface.400}"}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}},outlined:{color:"{surface.0}",borderColor:"{surface.0}"},simple:{color:"{surface.0}"}}}},nc={root:Xl,content:Hl,text:Jl,icon:Gl,closeButton:Kl,closeIcon:ql,outlined:Ql,simple:oc,colorScheme:ec},tc={borderRadius:"{content.border.radius}",gap:"1rem"},rc={background:"{content.border.color}",size:"0.5rem"},ac={gap:"0.5rem"},ic={size:"0.5rem"},dc={size:"1rem"},lc={verticalGap:"0.5rem",horizontalGap:"1rem"},cc={root:tc,meters:rc,label:ac,labelMarker:ic,labelIcon:dc,labelList:lc},sc={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},uc={width:"2.5rem",color:"{form.field.icon.color}"},pc={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},bc={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},gc={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",gap:"0.5rem"},fc={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},hc={color:"{form.field.icon.color}"},mc={borderRadius:"{border.radius.sm}"},kc={padding:"{list.option.padding}"},vc={root:sc,dropdown:uc,overlay:pc,list:bc,option:gc,optionGroup:fc,chip:mc,clearIcon:hc,emptyMessage:kc},wc={gap:"1.125rem"},yc={gap:"0.5rem"},xc={root:wc,controls:yc},$c={gutter:"0.75rem",transitionDuration:"{transition.duration}"},zc={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{content.border.color}",color:"{content.color}",selectedColor:"{highlight.color}",hoverColor:"{content.hover.color}",padding:"0.75rem 1rem",toggleablePadding:"0.75rem 1rem 1.25rem 1rem",borderRadius:"{content.border.radius}"},Cc={background:"{content.background}",hoverBackground:"{content.hover.background}",borderColor:"{content.border.color}",color:"{text.muted.color}",hoverColor:"{text.color}",size:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},_c={color:"{content.border.color}",borderRadius:"{content.border.radius}",height:"24px"},Bc={root:$c,node:zc,nodeToggleButton:Cc,connector:_c},Sc={outline:{width:"2px",color:"{content.background}"}},Rc={root:Sc},Oc={padding:"0.5rem 1rem",gap:"0.25rem",borderRadius:"{content.border.radius}",background:"{content.background}",color:"{content.color}",transitionDuration:"{transition.duration}"},Zc={background:"transparent",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}",width:"2.5rem",height:"2.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ec={color:"{text.muted.color}"},jc={maxWidth:"2.5rem"},Ic={root:Oc,navButton:Zc,currentPageReport:Ec,jumpToPageInput:jc},Nc={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},Tc={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"{content.border.color}",borderWidth:"0",borderRadius:"0"},Pc={padding:"0.375rem 1.125rem"},Dc={fontWeight:"600"},Ac={padding:"0 1.125rem 1.125rem 1.125rem"},Fc={padding:"0 1.125rem 1.125rem 1.125rem"},Wc={root:Nc,header:Tc,toggleableHeader:Pc,title:Dc,content:Ac,footer:Fc},Lc={gap:"0.5rem",transitionDuration:"{transition.duration}"},Mc={background:"{content.background}",borderColor:"{content.border.color}",borderWidth:"1px",color:"{content.color}",padding:"0.25rem 0.25rem",borderRadius:"{content.border.radius}",first:{borderWidth:"1px",topBorderRadius:"{content.border.radius}"},last:{borderWidth:"1px",bottomBorderRadius:"{content.border.radius}"}},Uc={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",gap:"0.5rem",padding:"{navigation.item.padding}",borderRadius:"{content.border.radius}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},Yc={indent:"1rem"},Vc={color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}"},Xc={root:Lc,panel:Mc,item:Uc,submenu:Yc,submenuIcon:Vc},Hc={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:".75rem"},Jc={color:"{form.field.icon.color}"},Gc={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",padding:"{overlay.popover.padding}",shadow:"{overlay.popover.shadow}"},Kc={gap:"0.5rem"},qc={light:{strength:{weakBackground:"{red.500}",mediumBackground:"{amber.500}",strongBackground:"{green.500}"}},dark:{strength:{weakBackground:"{red.400}",mediumBackground:"{amber.400}",strongBackground:"{green.400}"}}},Qc={meter:Hc,icon:Jc,overlay:Gc,content:Kc,colorScheme:qc},os={gap:"1.125rem"},es={gap:"0.5rem"},ns={root:os,controls:es},ts={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},rs={padding:"{overlay.popover.padding}"},as={root:ts,content:rs},is={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:"1.25rem"},ds={background:"{primary.color}"},ls={color:"{primary.contrast.color}",fontSize:"0.75rem",fontWeight:"600"},cs={root:is,value:ds,label:ls},ss={light:{root:{colorOne:"{red.500}",colorTwo:"{blue.500}",colorThree:"{green.500}",colorFour:"{yellow.500}"}},dark:{root:{colorOne:"{red.400}",colorTwo:"{blue.400}",colorThree:"{green.400}",colorFour:"{yellow.400}"}}},us={colorScheme:ss},ps={width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},bs={size:"0.75rem",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.5rem"},lg:{size:"1rem"}},gs={root:ps,icon:bs},fs={gap:"0.25rem",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},hs={size:"1rem",color:"{text.muted.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"},ms={root:fs,icon:hs},ks={light:{root:{background:"rgba(0,0,0,0.1)"}},dark:{root:{background:"rgba(255,255,255,0.3)"}}},vs={colorScheme:ks},ws={transitionDuration:"{transition.duration}"},ys={size:"9px",borderRadius:"{border.radius.sm}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},xs={light:{bar:{background:"{surface.100}"}},dark:{bar:{background:"{surface.800}"}}},$s={root:ws,bar:ys,colorScheme:xs},zs={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Cs={width:"2.5rem",color:"{form.field.icon.color}"},_s={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Bs={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},Ss={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},Rs={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},Os={color:"{form.field.icon.color}"},Zs={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},Es={padding:"{list.option.padding}"},js={root:zs,dropdown:Cs,overlay:_s,list:Bs,option:Ss,optionGroup:Rs,clearIcon:Os,checkmark:Zs,emptyMessage:Es},Is={borderRadius:"{form.field.border.radius}"},Ns={light:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}},dark:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}}},Ts={root:Is,colorScheme:Ns},Ps={borderRadius:"{content.border.radius}"},Ds={light:{root:{background:"{surface.200}",animationBackground:"rgba(255,255,255,0.4)"}},dark:{root:{background:"rgba(255, 255, 255, 0.06)",animationBackground:"rgba(255, 255, 255, 0.04)"}}},As={root:Ps,colorScheme:Ds},Fs={transitionDuration:"{transition.duration}"},Ws={background:"{content.border.color}",borderRadius:"{content.border.radius}",size:"3px"},Ls={background:"{primary.color}"},Ms={width:"20px",height:"20px",borderRadius:"50%",background:"{content.border.color}",hoverBackground:"{content.border.color}",content:{borderRadius:"50%",hoverBackground:"{content.background}",width:"16px",height:"16px",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Us={light:{handle:{content:{background:"{surface.0}"}}},dark:{handle:{content:{background:"{surface.950}"}}}},Ys={root:Fs,track:Ws,range:Ls,handle:Ms,colorScheme:Us},Vs={gap:"0.5rem",transitionDuration:"{transition.duration}"},Xs={root:Vs},Hs={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)"},Js={root:Hs},Gs={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",transitionDuration:"{transition.duration}"},Ks={background:"{content.border.color}"},qs={size:"24px",background:"transparent",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Qs={root:Gs,gutter:Ks,handle:qs},ou={transitionDuration:"{transition.duration}"},eu={background:"{content.border.color}",activeBackground:"{primary.color}",margin:"0 0 0 1.625rem",size:"2px"},nu={padding:"0.5rem",gap:"1rem"},tu={padding:"0",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},ru={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},au={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},iu={padding:"0.875rem 0.5rem 1.125rem 0.5rem"},du={background:"{content.background}",color:"{content.color}",padding:"0",indent:"1rem"},lu={root:ou,separator:eu,step:nu,stepHeader:tu,stepTitle:ru,stepNumber:au,steppanels:iu,steppanel:du},cu={transitionDuration:"{transition.duration}"},su={background:"{content.border.color}"},uu={borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},pu={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},bu={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},gu={root:cu,separator:su,itemLink:uu,itemLabel:pu,itemNumber:bu},fu={transitionDuration:"{transition.duration}"},hu={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},mu={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ku={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},vu={height:"1px",bottom:"-1px",background:"{primary.color}"},wu={root:fu,tablist:hu,item:mu,itemIcon:ku,activeBar:vu},yu={transitionDuration:"{transition.duration}"},xu={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},$u={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},zu={background:"{content.background}",color:"{content.color}",padding:"0.875rem 1.125rem 1.125rem 1.125rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"inset {focus.ring.shadow}"}},Cu={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",width:"2.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},_u={height:"1px",bottom:"-1px",background:"{primary.color}"},Bu={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},Su={root:yu,tablist:xu,tab:$u,tabpanel:zu,navButton:Cu,activeBar:_u,colorScheme:Bu},Ru={transitionDuration:"{transition.duration}"},Ou={background:"{content.background}",borderColor:"{content.border.color}"},Zu={borderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},Eu={background:"{content.background}",color:"{content.color}"},ju={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}"},Iu={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},Nu={root:Ru,tabList:Ou,tab:Zu,tabPanel:Eu,navButton:ju,colorScheme:Iu},Tu={fontSize:"0.875rem",fontWeight:"700",padding:"0.25rem 0.5rem",gap:"0.25rem",borderRadius:"{content.border.radius}",roundedBorderRadius:"{border.radius.xl}"},Pu={size:"0.75rem"},Du={light:{primary:{background:"{primary.100}",color:"{primary.700}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.100}",color:"{green.700}"},info:{background:"{sky.100}",color:"{sky.700}"},warn:{background:"{orange.100}",color:"{orange.700}"},danger:{background:"{red.100}",color:"{red.700}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"color-mix(in srgb, {primary.500}, transparent 84%)",color:"{primary.300}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",color:"{green.300}"},info:{background:"color-mix(in srgb, {sky.500}, transparent 84%)",color:"{sky.300}"},warn:{background:"color-mix(in srgb, {orange.500}, transparent 84%)",color:"{orange.300}"},danger:{background:"color-mix(in srgb, {red.500}, transparent 84%)",color:"{red.300}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},Au={root:Tu,icon:Pu,colorScheme:Du},Fu={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.color}",height:"18rem",padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{form.field.border.radius}"},Wu={gap:"0.25rem"},Lu={margin:"2px 0"},Mu={root:Fu,prompt:Wu,commandResponse:Lu},Uu={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Yu={root:Uu},Vu={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},Xu={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Hu={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Ju={mobileIndent:"1rem"},Gu={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},Ku={borderColor:"{content.border.color}"},qu={root:Vu,list:Xu,item:Hu,submenu:Ju,submenuIcon:Gu,separator:Ku},Qu={minHeight:"5rem"},op={eventContent:{padding:"1rem 0"}},ep={eventContent:{padding:"0 1rem"}},np={size:"1.125rem",borderRadius:"50%",borderWidth:"2px",background:"{content.background}",borderColor:"{content.border.color}",content:{borderRadius:"50%",size:"0.375rem",background:"{primary.color}",insetShadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"}},tp={color:"{content.border.color}",size:"2px"},rp={event:Qu,horizontal:op,vertical:ep,eventMarker:np,eventConnector:tp},ap={width:"25rem",borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},ip={size:"1.125rem"},dp={padding:"{overlay.popover.padding}",gap:"0.5rem"},lp={gap:"0.5rem"},cp={fontWeight:"500",fontSize:"1rem"},sp={fontWeight:"500",fontSize:"0.875rem"},up={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},pp={size:"1rem"},bp={light:{root:{blur:"1.5px"},info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}}}},dark:{root:{blur:"10px"},info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",detailColor:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}}}}},gp={root:ap,icon:ip,content:dp,text:lp,summary:cp,detail:sp,closeButton:up,closeIcon:pp,colorScheme:bp},fp={padding:"0.25rem",borderRadius:"{content.border.radius}",gap:"0.5rem",fontWeight:"500",disabledBackground:"{form.field.disabled.background}",disabledBorderColor:"{form.field.disabled.background}",disabledColor:"{form.field.disabled.color}",invalidBorderColor:"{form.field.invalid.border.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",padding:"0.25rem"},lg:{fontSize:"{form.field.lg.font.size}",padding:"0.25rem"}},hp={disabledColor:"{form.field.disabled.color}"},mp={padding:"0.25rem 0.75rem",borderRadius:"{content.border.radius}",checkedShadow:"0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)",sm:{padding:"0.25rem 0.75rem"},lg:{padding:"0.25rem 0.75rem"}},kp={light:{root:{background:"{surface.100}",checkedBackground:"{surface.100}",hoverBackground:"{surface.100}",borderColor:"{surface.100}",color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}",checkedBorderColor:"{surface.100}"},content:{checkedBackground:"{surface.0}"},icon:{color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}"}},dark:{root:{background:"{surface.950}",checkedBackground:"{surface.950}",hoverBackground:"{surface.950}",borderColor:"{surface.950}",color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}",checkedBorderColor:"{surface.950}"},content:{checkedBackground:"{surface.800}"},icon:{color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}"}}},vp={root:fp,icon:hp,content:mp,colorScheme:kp},wp={width:"2.5rem",height:"1.5rem",borderRadius:"30px",gap:"0.25rem",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},borderWidth:"1px",borderColor:"transparent",hoverBorderColor:"transparent",checkedBorderColor:"transparent",checkedHoverBorderColor:"transparent",invalidBorderColor:"{form.field.invalid.border.color}",transitionDuration:"{form.field.transition.duration}",slideDuration:"0.2s"},yp={borderRadius:"50%",size:"1rem"},xp={light:{root:{background:"{surface.300}",disabledBackground:"{form.field.disabled.background}",hoverBackground:"{surface.400}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.0}",disabledBackground:"{form.field.disabled.color}",hoverBackground:"{surface.0}",checkedBackground:"{surface.0}",checkedHoverBackground:"{surface.0}",color:"{text.muted.color}",hoverColor:"{text.color}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}},dark:{root:{background:"{surface.700}",disabledBackground:"{surface.600}",hoverBackground:"{surface.600}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.400}",disabledBackground:"{surface.900}",hoverBackground:"{surface.300}",checkedBackground:"{surface.900}",checkedHoverBackground:"{surface.900}",color:"{surface.900}",hoverColor:"{surface.800}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}}},$p={root:wp,handle:yp,colorScheme:xp},zp={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.75rem"},Cp={root:zp},_p={maxWidth:"12.5rem",gutter:"0.25rem",shadow:"{overlay.popover.shadow}",padding:"0.5rem 0.75rem",borderRadius:"{overlay.popover.border.radius}"},Bp={light:{root:{background:"{surface.700}",color:"{surface.0}"}},dark:{root:{background:"{surface.700}",color:"{surface.0}"}}},Sp={root:_p,colorScheme:Bp},Rp={background:"{content.background}",color:"{content.color}",padding:"1rem",gap:"2px",indent:"1rem",transitionDuration:"{transition.duration}"},Op={padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.color}",hoverColor:"{text.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},gap:"0.25rem"},Zp={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}"},Ep={borderRadius:"50%",size:"1.75rem",hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedHoverColor:"{primary.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},jp={size:"2rem"},Ip={margin:"0 0 0.5rem 0"},Np=`
    .p-tree-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,Tp={root:Rp,node:Op,nodeIcon:Zp,nodeToggleButton:Ep,loadingIcon:jp,filter:Ip,css:Np},Pp={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Dp={width:"2.5rem",color:"{form.field.icon.color}"},Ap={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Fp={padding:"{list.padding}"},Wp={padding:"{list.option.padding}"},Lp={borderRadius:"{border.radius.sm}"},Mp={color:"{form.field.icon.color}"},Up={root:Pp,dropdown:Dp,overlay:Ap,tree:Fp,emptyMessage:Wp,chip:Lp,clearIcon:Mp},Yp={transitionDuration:"{transition.duration}"},Vp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},Xp={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{treetable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Hp={fontWeight:"600"},Jp={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Gp={borderColor:"{treetable.border.color}",padding:"0.75rem 1rem",gap:"0.5rem"},Kp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",padding:"0.75rem 1rem"},qp={fontWeight:"600"},Qp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},ob={width:"0.5rem"},eb={width:"1px",color:"{primary.color}"},nb={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},tb={size:"2rem"},rb={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ab={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},ib={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},db={light:{root:{borderColor:"{content.border.color}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},lb=`
    .p-treetable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,cb={root:Yp,header:Vp,headerCell:Xp,columnTitle:Hp,row:Jp,bodyCell:Gp,footerCell:Kp,columnFooter:qp,footer:Qp,columnResizer:ob,resizeIndicator:eb,sortIcon:nb,loadingIcon:tb,nodeToggleButton:rb,paginatorTop:ab,paginatorBottom:ib,colorScheme:db,css:lb},sb={mask:{background:"{content.background}",color:"{text.muted.color}"},icon:{size:"2rem"}},ub={loader:sb},pb=Object.defineProperty,bb=Object.defineProperties,gb=Object.getOwnPropertyDescriptors,Oe=Object.getOwnPropertySymbols,fb=Object.prototype.hasOwnProperty,hb=Object.prototype.propertyIsEnumerable,Ze=(o,e,n)=>e in o?pb(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,Ee,Ok=(Ee=((o,e)=>{for(var n in e||(e={}))fb.call(e,n)&&Ze(o,n,e[n]);if(Oe)for(var n of Oe(e))hb.call(e,n)&&Ze(o,n,e[n]);return o})({},_r),bb(Ee,gb({components:{accordion:or,autocomplete:sr,avatar:hr,badge:$r,blockui:Sr,breadcrumb:Er,button:Nr,card:Wr,carousel:Xr,cascadeselect:oa,checkbox:ta,chip:ca,colorpicker:ga,confirmdialog:ma,confirmpopup:xa,contextmenu:Ra,datatable:Ka,dataview:ri,datepicker:zi,dialog:Oi,divider:Ni,dock:Di,drawer:Ui,editor:Gi,fieldset:ed,fileupload:cd,floatlabel:gd,galleria:Rd,iconfield:Zd,iftalabel:Id,image:Ad,imagecompare:Wd,inlinemessage:Vd,inplace:Jd,inputchips:Qd,inputgroup:el,inputnumber:al,inputotp:ll,inputtext:sl,knob:fl,listbox:$l,megamenu:jl,menu:Al,menubar:Vl,message:nc,metergroup:cc,multiselect:vc,orderlist:xc,organizationchart:Bc,overlaybadge:Rc,paginator:Ic,panel:Wc,panelmenu:Xc,password:Qc,picklist:ns,popover:as,progressbar:cs,progressspinner:us,radiobutton:gs,rating:ms,ripple:vs,scrollpanel:$s,select:js,selectbutton:Ts,skeleton:As,slider:Ys,speeddial:Xs,splitbutton:Js,splitter:Qs,stepper:lu,steps:gu,tabmenu:wu,tabs:Su,tabview:Nu,tag:Au,terminal:Mu,textarea:Yu,tieredmenu:qu,timeline:rp,toast:gp,togglebutton:vp,toggleswitch:$p,toolbar:Cp,tooltip:Sp,tree:Tp,treeselect:Up,treetable:cb,virtualscroller:ub},css:Oa})));function mo(o){return o+.5|0}const W=(o,e,n)=>Math.max(Math.min(o,n),e);function so(o){return W(mo(o*2.55),0,255)}function L(o){return W(mo(o*255),0,255)}function A(o){return W(mo(o/2.55)/100,0,1)}function je(o){return W(mo(o*100),0,100)}const j={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ee=[..."0123456789ABCDEF"],mb=o=>ee[o&15],kb=o=>ee[(o&240)>>4]+ee[o&15],Zo=o=>(o&240)>>4===(o&15),vb=o=>Zo(o.r)&&Zo(o.g)&&Zo(o.b)&&Zo(o.a);function wb(o){var e=o.length,n;return o[0]==="#"&&(e===4||e===5?n={r:255&j[o[1]]*17,g:255&j[o[2]]*17,b:255&j[o[3]]*17,a:e===5?j[o[4]]*17:255}:(e===7||e===9)&&(n={r:j[o[1]]<<4|j[o[2]],g:j[o[3]]<<4|j[o[4]],b:j[o[5]]<<4|j[o[6]],a:e===9?j[o[7]]<<4|j[o[8]]:255})),n}const yb=(o,e)=>o<255?e(o):"";function xb(o){var e=vb(o)?mb:kb;return o?"#"+e(o.r)+e(o.g)+e(o.b)+yb(o.a,e):void 0}const $b=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function zn(o,e,n){const t=e*Math.min(n,1-n),r=(i,a=(i+o/30)%12)=>n-t*Math.max(Math.min(a-3,9-a,1),-1);return[r(0),r(8),r(4)]}function zb(o,e,n){const t=(r,i=(r+o/60)%6)=>n-n*e*Math.max(Math.min(i,4-i,1),0);return[t(5),t(3),t(1)]}function Cb(o,e,n){const t=zn(o,1,.5);let r;for(e+n>1&&(r=1/(e+n),e*=r,n*=r),r=0;r<3;r++)t[r]*=1-e-n,t[r]+=e;return t}function _b(o,e,n,t,r){return o===r?(e-n)/t+(e<n?6:0):e===r?(n-o)/t+2:(o-e)/t+4}function de(o){const n=o.r/255,t=o.g/255,r=o.b/255,i=Math.max(n,t,r),a=Math.min(n,t,r),d=(i+a)/2;let l,c,s;return i!==a&&(s=i-a,c=d>.5?s/(2-i-a):s/(i+a),l=_b(n,t,r,s,i),l=l*60+.5),[l|0,c||0,d]}function le(o,e,n,t){return(Array.isArray(e)?o(e[0],e[1],e[2]):o(e,n,t)).map(L)}function ce(o,e,n){return le(zn,o,e,n)}function Bb(o,e,n){return le(Cb,o,e,n)}function Sb(o,e,n){return le(zb,o,e,n)}function Cn(o){return(o%360+360)%360}function Rb(o){const e=$b.exec(o);let n=255,t;if(!e)return;e[5]!==t&&(n=e[6]?so(+e[5]):L(+e[5]));const r=Cn(+e[2]),i=+e[3]/100,a=+e[4]/100;return e[1]==="hwb"?t=Bb(r,i,a):e[1]==="hsv"?t=Sb(r,i,a):t=ce(r,i,a),{r:t[0],g:t[1],b:t[2],a:n}}function Ob(o,e){var n=de(o);n[0]=Cn(n[0]+e),n=ce(n),o.r=n[0],o.g=n[1],o.b=n[2]}function Zb(o){if(!o)return;const e=de(o),n=e[0],t=je(e[1]),r=je(e[2]);return o.a<255?`hsla(${n}, ${t}%, ${r}%, ${A(o.a)})`:`hsl(${n}, ${t}%, ${r}%)`}const Ie={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Ne={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Eb(){const o={},e=Object.keys(Ne),n=Object.keys(Ie);let t,r,i,a,d;for(t=0;t<e.length;t++){for(a=d=e[t],r=0;r<n.length;r++)i=n[r],d=d.replace(i,Ie[i]);i=parseInt(Ne[a],16),o[d]=[i>>16&255,i>>8&255,i&255]}return o}let Eo;function jb(o){Eo||(Eo=Eb(),Eo.transparent=[0,0,0,0]);const e=Eo[o.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const Ib=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Nb(o){const e=Ib.exec(o);let n=255,t,r,i;if(e){if(e[7]!==t){const a=+e[7];n=e[8]?so(a):W(a*255,0,255)}return t=+e[1],r=+e[3],i=+e[5],t=255&(e[2]?so(t):W(t,0,255)),r=255&(e[4]?so(r):W(r,0,255)),i=255&(e[6]?so(i):W(i,0,255)),{r:t,g:r,b:i,a:n}}}function Tb(o){return o&&(o.a<255?`rgba(${o.r}, ${o.g}, ${o.b}, ${A(o.a)})`:`rgb(${o.r}, ${o.g}, ${o.b})`)}const Jo=o=>o<=.0031308?o*12.92:Math.pow(o,1/2.4)*1.055-.055,Q=o=>o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4);function Pb(o,e,n){const t=Q(A(o.r)),r=Q(A(o.g)),i=Q(A(o.b));return{r:L(Jo(t+n*(Q(A(e.r))-t))),g:L(Jo(r+n*(Q(A(e.g))-r))),b:L(Jo(i+n*(Q(A(e.b))-i))),a:o.a+n*(e.a-o.a)}}function jo(o,e,n){if(o){let t=de(o);t[e]=Math.max(0,Math.min(t[e]+t[e]*n,e===0?360:1)),t=ce(t),o.r=t[0],o.g=t[1],o.b=t[2]}}function _n(o,e){return o&&Object.assign(e||{},o)}function Te(o){var e={r:0,g:0,b:0,a:255};return Array.isArray(o)?o.length>=3&&(e={r:o[0],g:o[1],b:o[2],a:255},o.length>3&&(e.a=L(o[3]))):(e=_n(o,{r:0,g:0,b:0,a:1}),e.a=L(e.a)),e}function Db(o){return o.charAt(0)==="r"?Nb(o):Rb(o)}class ne{constructor(e){if(e instanceof ne)return e;const n=typeof e;let t;n==="object"?t=Te(e):n==="string"&&(t=wb(e)||jb(e)||Db(e)),this._rgb=t,this._valid=!!t}get valid(){return this._valid}get rgb(){var e=_n(this._rgb);return e&&(e.a=A(e.a)),e}set rgb(e){this._rgb=Te(e)}rgbString(){return this._valid?Tb(this._rgb):void 0}hexString(){return this._valid?xb(this._rgb):void 0}hslString(){return this._valid?Zb(this._rgb):void 0}mix(e,n){if(e){const t=this.rgb,r=e.rgb;let i;const a=n===i?.5:n,d=2*a-1,l=t.a-r.a,c=((d*l===-1?d:(d+l)/(1+d*l))+1)/2;i=1-c,t.r=255&c*t.r+i*r.r+.5,t.g=255&c*t.g+i*r.g+.5,t.b=255&c*t.b+i*r.b+.5,t.a=a*t.a+(1-a)*r.a,this.rgb=t}return this}interpolate(e,n){return e&&(this._rgb=Pb(this._rgb,e._rgb,n)),this}clone(){return new ne(this.rgb)}alpha(e){return this._rgb.a=L(e),this}clearer(e){const n=this._rgb;return n.a*=1-e,this}greyscale(){const e=this._rgb,n=mo(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=n,this}opaquer(e){const n=this._rgb;return n.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return jo(this._rgb,2,e),this}darken(e){return jo(this._rgb,2,-e),this}saturate(e){return jo(this._rgb,1,e),this}desaturate(e){return jo(this._rgb,1,-e),this}rotate(e){return Ob(this._rgb,e),this}}var Zk=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,Ek=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,jk=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`,Ik=`
    .p-paginator {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: dt('paginator.background');
        color: dt('paginator.color');
        padding: dt('paginator.padding');
        border-radius: dt('paginator.border.radius');
        gap: dt('paginator.gap');
    }

    .p-paginator-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: dt('paginator.gap');
    }

    .p-paginator-content-start {
        margin-inline-end: auto;
    }

    .p-paginator-content-end {
        margin-inline-start: auto;
    }

    .p-paginator-page,
    .p-paginator-next,
    .p-paginator-last,
    .p-paginator-first,
    .p-paginator-prev {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        user-select: none;
        overflow: hidden;
        position: relative;
        background: dt('paginator.nav.button.background');
        border: 0 none;
        color: dt('paginator.nav.button.color');
        min-width: dt('paginator.nav.button.width');
        height: dt('paginator.nav.button.height');
        transition:
            background dt('paginator.transition.duration'),
            color dt('paginator.transition.duration'),
            outline-color dt('paginator.transition.duration'),
            box-shadow dt('paginator.transition.duration');
        border-radius: dt('paginator.nav.button.border.radius');
        padding: 0;
        margin: 0;
    }

    .p-paginator-page:focus-visible,
    .p-paginator-next:focus-visible,
    .p-paginator-last:focus-visible,
    .p-paginator-first:focus-visible,
    .p-paginator-prev:focus-visible {
        box-shadow: dt('paginator.nav.button.focus.ring.shadow');
        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');
        outline-offset: dt('paginator.nav.button.focus.ring.offset');
    }

    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
    .p-paginator-first:not(.p-disabled):hover,
    .p-paginator-prev:not(.p-disabled):hover,
    .p-paginator-next:not(.p-disabled):hover,
    .p-paginator-last:not(.p-disabled):hover {
        background: dt('paginator.nav.button.hover.background');
        color: dt('paginator.nav.button.hover.color');
    }

    .p-paginator-page.p-paginator-page-selected {
        background: dt('paginator.nav.button.selected.background');
        color: dt('paginator.nav.button.selected.color');
    }

    .p-paginator-current {
        color: dt('paginator.current.page.report.color');
    }

    .p-paginator-pages {
        display: flex;
        align-items: center;
        gap: dt('paginator.gap');
    }

    .p-paginator-jtp-input .p-inputtext {
        max-width: dt('paginator.jump.to.page.input.max.width');
    }

    .p-paginator-first:dir(rtl),
    .p-paginator-prev:dir(rtl),
    .p-paginator-next:dir(rtl),
    .p-paginator-last:dir(rtl) {
        transform: rotate(180deg);
    }
`,Nk=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,Tk=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`,Pk=`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`,Dk=`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
        transform-origin: inherit;
        will-change: transform;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }
   
    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`,Ak=`
    .p-inputnumber {
        display: inline-flex;
        position: relative;
    }

    .p-inputnumber-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        cursor: pointer;
        background: dt('inputnumber.button.background');
        color: dt('inputnumber.button.color');
        width: dt('inputnumber.button.width');
        transition:
            background dt('inputnumber.transition.duration'),
            color dt('inputnumber.transition.duration'),
            border-color dt('inputnumber.transition.duration'),
            outline-color dt('inputnumber.transition.duration');
    }

    .p-inputnumber-button:disabled {
        cursor: auto;
    }

    .p-inputnumber-button:not(:disabled):hover {
        background: dt('inputnumber.button.hover.background');
        color: dt('inputnumber.button.hover.color');
    }

    .p-inputnumber-button:not(:disabled):active {
        background: dt('inputnumber.button.active.background');
        color: dt('inputnumber.button.active.color');
    }

    .p-inputnumber-stacked .p-inputnumber-button {
        position: relative;
        flex: 1 1 auto;
        border: 0 none;
    }

    .p-inputnumber-stacked .p-inputnumber-button-group {
        display: flex;
        flex-direction: column;
        position: absolute;
        inset-block-start: 1px;
        inset-inline-end: 1px;
        height: calc(100% - 2px);
        z-index: 1;
    }

    .p-inputnumber-stacked .p-inputnumber-increment-button {
        padding: 0;
        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-decrement-button {
        padding: 0;
        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-horizontal .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-increment-button {
        order: 3;
        border-start-end-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        border-inline-start: 0 none;
    }

    .p-inputnumber-horizontal .p-inputnumber-input {
        order: 2;
        border-radius: 0;
    }

    .p-inputnumber-horizontal .p-inputnumber-decrement-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-inline-end: 0 none;
    }

    .p-floatlabel:has(.p-inputnumber-horizontal) label {
        margin-inline-start: dt('inputnumber.button.width');
    }

    .p-inputnumber-vertical {
        flex-direction: column;
    }

    .p-inputnumber-vertical .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
        padding: dt('inputnumber.button.vertical.padding');
    }

    .p-inputnumber-vertical .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-increment-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-start-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-end: 0 none;
    }

    .p-inputnumber-vertical .p-inputnumber-input {
        order: 2;
        border-radius: 0;
        text-align: center;
    }

    .p-inputnumber-vertical .p-inputnumber-decrement-button {
        order: 3;
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-start: 0 none;
    }

    .p-inputnumber-input {
        flex: 1 1 auto;
    }

    .p-inputnumber-fluid {
        width: 100%;
    }

    .p-inputnumber-fluid .p-inputnumber-input {
        width: 1%;
    }

    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
        width: 100%;
    }

    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-inputnumber-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-stacked .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-horizontal .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }
`,Fk=`
    .p-datatable {
        position: relative;
        display: block;
    }

    .p-datatable-table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
    }

    .p-datatable-scrollable > .p-datatable-table-container {
        position: relative;
    }

    .p-datatable-scrollable-table > .p-datatable-thead {
        inset-block-start: 0;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-tfoot {
        inset-block-end: 0;
        z-index: 1;
    }

    .p-datatable-scrollable .p-datatable-frozen-column {
        position: sticky;
    }

    .p-datatable-scrollable th.p-datatable-frozen-column {
        z-index: 1;
    }

    .p-datatable-scrollable td.p-datatable-frozen-column {
        background: inherit;
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-thead {
        background: dt('datatable.header.cell.background');
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-tfoot,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-flex-scrollable {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .p-datatable-flex-scrollable > .p-datatable-table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .p-datatable-scrollable-table > .p-datatable-tbody > .p-datatable-row-group-header {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th,
    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,
    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {
        overflow: hidden;
        white-space: nowrap;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-datatable-resizable-column:not(.p-datatable-frozen-column) {
        background-clip: padding-box;
        position: relative;
    }

    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-datatable-resizable-column:last-child .p-datatable-column-resizer {
        display: none;
    }

    .p-datatable-column-resizer {
        display: block;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        margin: 0;
        width: dt('datatable.column.resizer.width');
        height: 100%;
        padding: 0;
        cursor: col-resize;
        border: 1px solid transparent;
    }

    .p-datatable-column-header-content {
        display: flex;
        align-items: center;
        gap: dt('datatable.header.cell.gap');
    }

    .p-datatable-column-resize-indicator {
        width: dt('datatable.resize.indicator.width');
        position: absolute;
        z-index: 10;
        display: none;
        background: dt('datatable.resize.indicator.color');
    }

    .p-datatable-row-reorder-indicator-up,
    .p-datatable-row-reorder-indicator-down {
        position: absolute;
        display: none;
    }

    .p-datatable-reorderable-column,
    .p-datatable-reorderable-row-handle {
        cursor: move;
    }

    .p-datatable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .p-datatable-inline-filter {
        display: flex;
        align-items: center;
        width: 100%;
        gap: dt('datatable.filter.inline.gap');
    }

    .p-datatable-inline-filter .p-datatable-filter-element-container {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datatable-filter-overlay {
        background: dt('datatable.filter.overlay.select.background');
        color: dt('datatable.filter.overlay.select.color');
        border: 1px solid dt('datatable.filter.overlay.select.border.color');
        border-radius: dt('datatable.filter.overlay.select.border.radius');
        box-shadow: dt('datatable.filter.overlay.select.shadow');
        min-width: 12.5rem;
    }

    .p-datatable-filter-constraint-list {
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: dt('datatable.filter.constraint.list.padding');
        gap: dt('datatable.filter.constraint.list.gap');
    }

    .p-datatable-filter-constraint {
        padding: dt('datatable.filter.constraint.padding');
        color: dt('datatable.filter.constraint.color');
        border-radius: dt('datatable.filter.constraint.border.radius');
        cursor: pointer;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-filter-constraint-selected {
        background: dt('datatable.filter.constraint.selected.background');
        color: dt('datatable.filter.constraint.selected.color');
    }

    .p-datatable-filter-constraint:not(.p-datatable-filter-constraint-selected):not(.p-disabled):hover {
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint-selected:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.selected.focus.background');
        color: dt('datatable.filter.constraint.selected.focus.color');
    }

    .p-datatable-filter-constraint-separator {
        border-block-start: 1px solid dt('datatable.filter.constraint.separator.border.color');
    }

    .p-datatable-popover-filter {
        display: inline-flex;
        margin-inline-start: auto;
    }

    .p-datatable-filter-overlay-popover {
        background: dt('datatable.filter.overlay.popover.background');
        color: dt('datatable.filter.overlay.popover.color');
        border: 1px solid dt('datatable.filter.overlay.popover.border.color');
        border-radius: dt('datatable.filter.overlay.popover.border.radius');
        box-shadow: dt('datatable.filter.overlay.popover.shadow');
        min-width: 12.5rem;
        padding: dt('datatable.filter.overlay.popover.padding');
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-operator-dropdown {
        width: 100%;
    }

    .p-datatable-filter-rule-list,
    .p-datatable-filter-rule {
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule {
        border-block-end: 1px solid dt('datatable.filter.rule.border.color');
        padding-bottom: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule:last-child {
        border-block-end: 0 none;
        padding-bottom: 0;
    }

    .p-datatable-filter-add-rule-button {
        width: 100%;
    }

    .p-datatable-filter-remove-rule-button {
        width: 100%;
    }

    .p-datatable-filter-buttonbar {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .p-datatable-virtualscroller-spacer {
        display: flex;
    }

    .p-datatable .p-virtualscroller .p-virtualscroller-loading {
        transform: none !important;
        min-height: 0;
        position: sticky;
        inset-block-start: 0;
        inset-inline-start: 0;
    }

    .p-datatable-paginator-top {
        border-color: dt('datatable.paginator.top.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.top.border.width');
    }

    .p-datatable-paginator-bottom {
        border-color: dt('datatable.paginator.bottom.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.bottom.border.width');
    }

    .p-datatable-header {
        background: dt('datatable.header.background');
        color: dt('datatable.header.color');
        border-color: dt('datatable.header.border.color');
        border-style: solid;
        border-width: dt('datatable.header.border.width');
        padding: dt('datatable.header.padding');
    }

    .p-datatable-footer {
        background: dt('datatable.footer.background');
        color: dt('datatable.footer.color');
        border-color: dt('datatable.footer.border.color');
        border-style: solid;
        border-width: dt('datatable.footer.border.width');
        padding: dt('datatable.footer.padding');
    }

    .p-datatable-header-cell {
        padding: dt('datatable.header.cell.padding');
        background: dt('datatable.header.cell.background');
        border-color: dt('datatable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.header.cell.color');
        font-weight: normal;
        text-align: start;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-column-title {
        font-weight: dt('datatable.column.title.font.weight');
    }

    .p-datatable-tbody > tr {
        outline-color: transparent;
        background: dt('datatable.row.background');
        color: dt('datatable.row.color');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-tbody > tr > td {
        text-align: start;
        border-color: dt('datatable.body.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        padding: dt('datatable.body.cell.padding');
    }

    .p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-tbody > tr:has(+ .p-datatable-row-selected) > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr:focus-visible,
    .p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {
        box-shadow: dt('datatable.row.focus.ring.shadow');
        outline: dt('datatable.row.focus.ring.width') dt('datatable.row.focus.ring.style') dt('datatable.row.focus.ring.color');
        outline-offset: dt('datatable.row.focus.ring.offset');
    }

    .p-datatable-tfoot > tr > td {
        text-align: start;
        padding: dt('datatable.footer.cell.padding');
        border-color: dt('datatable.footer.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.footer.cell.color');
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-column-footer {
        font-weight: dt('datatable.column.footer.font.weight');
    }

    .p-datatable-sortable-column {
        cursor: pointer;
        user-select: none;
        outline-color: transparent;
    }

    .p-datatable-column-title,
    .p-datatable-sort-icon,
    .p-datatable-sort-badge {
        vertical-align: middle;
    }

    .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.color');
        font-size: dt('datatable.sort.icon.size');
        width: dt('datatable.sort.icon.size');
        height: dt('datatable.sort.icon.size');
        transition: color dt('datatable.transition.duration');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover {
        background: dt('datatable.header.cell.hover.background');
        color: dt('datatable.header.cell.hover.color');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.hover.color');
    }

    .p-datatable-column-sorted {
        background: dt('datatable.header.cell.selected.background');
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-column-sorted .p-datatable-sort-icon {
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-sortable-column:focus-visible {
        box-shadow: dt('datatable.header.cell.focus.ring.shadow');
        outline: dt('datatable.header.cell.focus.ring.width') dt('datatable.header.cell.focus.ring.style') dt('datatable.header.cell.focus.ring.color');
        outline-offset: dt('datatable.header.cell.focus.ring.offset');
    }

    .p-datatable-hoverable .p-datatable-selectable-row {
        cursor: pointer;
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
        box-shadow: inset 0 2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
        box-shadow: inset 0 -2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-loading-icon {
        font-size: dt('datatable.loading.icon.size');
        width: dt('datatable.loading.icon.size');
        height: dt('datatable.loading.icon.size');
    }

    .p-datatable-gridlines .p-datatable-header {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-footer {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-top {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-bottom {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td {
        border-width: 1px 0 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {
        border-width: 1px 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {
        border-width: 0 0 0 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 0 1px 0 1px;
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
        background: dt('datatable.row.striped.background');
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-striped.p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable.p-datatable-sm .p-datatable-header {
        padding: dt('datatable.header.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-footer {
        padding: dt('datatable.footer.sm.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-header {
        padding: dt('datatable.header.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-footer {
        padding: dt('datatable.footer.lg.padding');
    }

    .p-datatable-row-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datatable.row.toggle.button.size');
        height: dt('datatable.row.toggle.button.size');
        color: dt('datatable.row.toggle.button.color');
        border: 0 none;
        background: transparent;
        cursor: pointer;
        border-radius: dt('datatable.row.toggle.button.border.radius');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
        outline-color: transparent;
        user-select: none;
    }

    .p-datatable-row-toggle-button:enabled:hover {
        color: dt('datatable.row.toggle.button.hover.color');
        background: dt('datatable.row.toggle.button.hover.background');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected .p-datatable-row-toggle-button:hover {
        background: dt('datatable.row.toggle.button.selected.hover.background');
        color: dt('datatable.row.toggle.button.selected.hover.color');
    }

    .p-datatable-row-toggle-button:focus-visible {
        box-shadow: dt('datatable.row.toggle.button.focus.ring.shadow');
        outline: dt('datatable.row.toggle.button.focus.ring.width') dt('datatable.row.toggle.button.focus.ring.style') dt('datatable.row.toggle.button.focus.ring.color');
        outline-offset: dt('datatable.row.toggle.button.focus.ring.offset');
    }

    .p-datatable-row-toggle-icon:dir(rtl) {
        transform: rotate(180deg);
    }
`,Wk=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,Lk=`
    .p-radiobutton {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
    }

    .p-radiobutton-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .p-radiobutton-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid dt('radiobutton.border.color');
        background: dt('radiobutton.background');
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
        transition:
            background dt('radiobutton.transition.duration'),
            color dt('radiobutton.transition.duration'),
            border-color dt('radiobutton.transition.duration'),
            box-shadow dt('radiobutton.transition.duration'),
            outline-color dt('radiobutton.transition.duration');
        outline-color: transparent;
        box-shadow: dt('radiobutton.shadow');
    }

    .p-radiobutton-icon {
        transition-duration: dt('radiobutton.transition.duration');
        background: transparent;
        font-size: dt('radiobutton.icon.size');
        width: dt('radiobutton.icon.size');
        height: dt('radiobutton.icon.size');
        border-radius: 50%;
        backface-visibility: hidden;
        transform: translateZ(0) scale(0.1);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.hover.border.color');
    }

    .p-radiobutton-checked .p-radiobutton-box {
        border-color: dt('radiobutton.checked.border.color');
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.color');
        transform: translateZ(0) scale(1, 1);
        visibility: visible;
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.hover.border.color');
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.hover.color');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.focus.border.color');
        box-shadow: dt('radiobutton.focus.ring.shadow');
        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');
        outline-offset: dt('radiobutton.focus.ring.offset');
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.focus.border.color');
    }

    .p-radiobutton.p-invalid > .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }

    .p-radiobutton.p-variant-filled .p-radiobutton-box {
        background: dt('radiobutton.filled.background');
    }

    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton.p-disabled {
        opacity: 1;
    }

    .p-radiobutton.p-disabled .p-radiobutton-box {
        background: dt('radiobutton.disabled.background');
        border-color: dt('radiobutton.checked.disabled.border.color');
    }

    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.disabled.color');
    }

    .p-radiobutton-sm,
    .p-radiobutton-sm .p-radiobutton-box {
        width: dt('radiobutton.sm.width');
        height: dt('radiobutton.sm.height');
    }

    .p-radiobutton-sm .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.sm.size');
        width: dt('radiobutton.icon.sm.size');
        height: dt('radiobutton.icon.sm.size');
    }

    .p-radiobutton-lg,
    .p-radiobutton-lg .p-radiobutton-box {
        width: dt('radiobutton.lg.width');
        height: dt('radiobutton.lg.height');
    }

    .p-radiobutton-lg .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.lg.size');
        width: dt('radiobutton.icon.lg.size');
        height: dt('radiobutton.icon.lg.size');
    }
`,Mk=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,Uk=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,Yk=`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,Vk=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`,Xk=`
    .p-tree {
        display: block;
        background: dt('tree.background');
        color: dt('tree.color');
        padding: dt('tree.padding');
        position: relative;
    }

    .p-tree-root-children,
    .p-tree-node-children {
        display: flex;
        list-style-type: none;
        flex-direction: column;
        margin: 0;
        gap: dt('tree.gap');
    }

    .p-tree-root-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
    }

    .p-tree-node-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
        padding-inline-start: dt('tree.indent');
    }

    .p-tree-node {
        padding: 0;
        outline: 0 none;
    }

    .p-tree-node-content {
        border-radius: dt('tree.node.border.radius');
        padding: dt('tree.node.padding');
        display: flex;
        align-items: center;
        outline-color: transparent;
        color: dt('tree.node.color');
        gap: dt('tree.node.gap');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
    }

    .p-tree-node-content[data-p-dragging] {
        outline: 1px dashed dt('primary.color');
        outline-offset: -1px;
    }

    .p-tree-node-content[data-pc-section="drag-image"] {
        background: dt('tree.background');
    }

    .p-tree-node:focus-visible > .p-tree-node-content {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover .p-tree-node-icon {
        color: dt('tree.node.icon.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected {
        background: dt('tree.node.selected.background');
        color: dt('tree.node.selected.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button {
        color: inherit;
    }

    .p-tree-node-content.p-tree-node-dragover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content:focus-visible,
    .p-tree-node-content.p-tree-node-contextmenu-selected {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-drop-point {
		outline: 1px solid dt('primary.color');
	}

    .p-tree-node-toggle-button {
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        width: dt('tree.node.toggle.button.size');
        height: dt('tree.node.toggle.button.size');
        color: dt('tree.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('tree.node.toggle.button.border.radius');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            border-color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
        outline-color: transparent;
        padding: 0;
    }

    .p-tree-node-toggle-button:enabled:hover {
        background: dt('tree.node.toggle.button.hover.background');
        color: dt('tree.node.toggle.button.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button:hover {
        background: dt('tree.node.toggle.button.selected.hover.background');
        color: dt('tree.node.toggle.button.selected.hover.color');
    }

    .p-tree-root {
        overflow: auto;
    }

    .p-tree-node-selectable {
        cursor: pointer;
        user-select: none;
    }

    .p-tree-node-leaf > .p-tree-node-content .p-tree-node-toggle-button {
        visibility: hidden;
    }

    .p-tree-node-icon {
        color: dt('tree.node.icon.color');
        transition: color dt('tree.transition.duration');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-icon {
        color: dt('tree.node.icon.selected.color');
    }

    .p-tree-filter {
        margin: dt('tree.filter.margin');
    }

    .p-tree-filter-input {
        width: 100%;
    }

    .p-tree-loading-icon {
        font-size: dt('tree.loading.icon.size');
        width: dt('tree.loading.icon.size');
        height: dt('tree.loading.icon.size');
    }

    .p-tree .p-tree-mask {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-tree-flex-scrollable {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;
    }

    .p-tree-flex-scrollable .p-tree-root {
        flex: 1;
    }
`,Hk=`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.font.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,Jk=`
    .p-treeselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('treeselect.background');
        border: 1px solid dt('treeselect.border.color');
        transition:
            background dt('treeselect.transition.duration'),
            color dt('treeselect.transition.duration'),
            border-color dt('treeselect.transition.duration'),
            outline-color dt('treeselect.transition.duration'),
            box-shadow dt('treeselect.transition.duration');
        border-radius: dt('treeselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('treeselect.shadow');
    }

    .p-treeselect:not(.p-disabled):hover {
        border-color: dt('treeselect.hover.border.color');
    }

    .p-treeselect:not(.p-disabled).p-focus {
        border-color: dt('treeselect.focus.border.color');
        box-shadow: dt('treeselect.focus.ring.shadow');
        outline: dt('treeselect.focus.ring.width') dt('treeselect.focus.ring.style') dt('treeselect.focus.ring.color');
        outline-offset: dt('treeselect.focus.ring.offset');
    }

    .p-treeselect.p-variant-filled {
        background: dt('treeselect.filled.background');
    }

    .p-treeselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('treeselect.filled.hover.background');
    }

    .p-treeselect.p-variant-filled.p-focus {
        background: dt('treeselect.filled.focus.background');
    }

    .p-treeselect.p-invalid {
        border-color: dt('treeselect.invalid.border.color');
    }

    .p-treeselect.p-disabled {
        opacity: 1;
        background: dt('treeselect.disabled.background');
    }

    .p-treeselect-clear-icon {
        align-self: center;
        color: dt('treeselect.clear.icon.color');
        inset-inline-end: dt('treeselect.dropdown.width');
    }

    .p-treeselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('treeselect.dropdown.color');
        width: dt('treeselect.dropdown.width');
        border-start-end-radius: dt('border.radius.md');
        border-end-end-radius: dt('border.radius.md');
    }

    .p-treeselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-treeselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('treeselect.padding.y') / 2);
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('treeselect.padding.y') dt('treeselect.padding.x');
        color: dt('treeselect.color');
    }

    .p-treeselect-label.p-placeholder {
        color: dt('treeselect.placeholder.color');
    }

    .p-treeselect.p-invalid .p-treeselect-label.p-placeholder {
        color: dt('treeselect.invalid.placeholder.color');
    }

    .p-treeselect:has(.p-select-clear-icon) .p-treeselect-label {
        padding-inline-end: dt('treeselect.padding.x');
    }

    .p-treeselect.p-disabled .p-treeselect-label {
        color: dt('treeselect.disabled.color');
    }

    .p-treeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-treeselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('treeselect.overlay.background');
        color: dt('treeselect.overlay.color');
        border: 1px solid dt('treeselect.overlay.border.color');
        border-radius: dt('treeselect.overlay.border.radius');
        box-shadow: dt('treeselect.overlay.shadow');
        overflow: hidden;
        min-width: 100%;
        will-change: transform;
    }

    .p-treeselect-tree-container {
        overflow: auto;
    }

    .p-treeselect-empty-message {
        padding: dt('treeselect.empty.message.padding');
        background: transparent;
    }

    .p-treeselect-fluid {
        display: flex;
    }

    .p-treeselect-overlay .p-tree {
        padding: dt('treeselect.tree.padding');
    }

    .p-treeselect-overlay .p-tree-loading {
        min-height: 3rem;
    }

    .p-treeselect-label .p-chip {
        padding-block-start: calc(dt('treeselect.padding.y') / 2);
        padding-block-end: calc(dt('treeselect.padding.y') / 2);
        border-radius: dt('treeselect.chip.border.radius');
    }

    .p-treeselect-label:has(.p-chip) {
        padding: calc(dt('treeselect.padding.y') / 2) calc(dt('treeselect.padding.x') / 2);
    }

    .p-treeselect-sm .p-treeselect-label {
        font-size: dt('treeselect.sm.font.size');
        padding-block: dt('treeselect.sm.padding.y');
        padding-inline: dt('treeselect.sm.padding.x');
    }

    .p-treeselect-sm .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.sm.font.size');
        width: dt('treeselect.sm.font.size');
        height: dt('treeselect.sm.font.size');
    }

    .p-treeselect-lg .p-treeselect-label {
        font-size: dt('treeselect.lg.font.size');
        padding-block: dt('treeselect.lg.padding.y');
        padding-inline: dt('treeselect.lg.padding.x');
    }

    .p-treeselect-lg .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.lg.font.size');
        width: dt('treeselect.lg.font.size');
        height: dt('treeselect.lg.font.size');
    }
`;function u(o,e,n){function t(d,l){if(d._zod||Object.defineProperty(d,"_zod",{value:{def:l,constr:a,traits:new Set},enumerable:!1}),d._zod.traits.has(o))return;d._zod.traits.add(o),e(d,l);const c=a.prototype,s=Object.keys(c);for(let g=0;g<s.length;g++){const p=s[g];p in d||(d[p]=c[p].bind(d))}}const r=n?.Parent??Object;class i extends r{}Object.defineProperty(i,"name",{value:o});function a(d){var l;const c=n?.Parent?new i:this;t(c,d),(l=c._zod).deferred??(l.deferred=[]);for(const s of c._zod.deferred)s();return c}return Object.defineProperty(a,"init",{value:t}),Object.defineProperty(a,Symbol.hasInstance,{value:d=>n?.Parent&&d instanceof n.Parent?!0:d?._zod?.traits?.has(o)}),Object.defineProperty(a,"name",{value:o}),a}class no extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class Bn extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name="ZodEncodeError"}}const Sn={};function J(o){return Sn}function Rn(o){const e=Object.values(o).filter(t=>typeof t=="number");return Object.entries(o).filter(([t,r])=>e.indexOf(+t)===-1).map(([t,r])=>r)}function te(o,e){return typeof e=="bigint"?e.toString():e}function se(o){return{get value(){{const e=o();return Object.defineProperty(this,"value",{value:e}),e}}}}function ue(o){return o==null}function pe(o){const e=o.startsWith("^")?1:0,n=o.endsWith("$")?o.length-1:o.length;return o.slice(e,n)}function Ab(o,e){const n=(o.toString().split(".")[1]||"").length,t=e.toString();let r=(t.split(".")[1]||"").length;if(r===0&&/\d?e-\d?/.test(t)){const l=t.match(/\d?e-(\d?)/);l?.[1]&&(r=Number.parseInt(l[1]))}const i=n>r?n:r,a=Number.parseInt(o.toFixed(i).replace(".","")),d=Number.parseInt(e.toFixed(i).replace(".",""));return a%d/10**i}const Pe=Symbol("evaluating");function k(o,e,n){let t;Object.defineProperty(o,e,{get(){if(t!==Pe)return t===void 0&&(t=Pe,t=n()),t},set(r){Object.defineProperty(o,e,{value:r})},configurable:!0})}function K(o,e,n){Object.defineProperty(o,e,{value:n,writable:!0,enumerable:!0,configurable:!0})}function U(...o){const e={};for(const n of o){const t=Object.getOwnPropertyDescriptors(n);Object.assign(e,t)}return Object.defineProperties({},e)}function De(o){return JSON.stringify(o)}function Fb(o){return o.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}const On="captureStackTrace"in Error?Error.captureStackTrace:(...o)=>{};function Fo(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}const Wb=se(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{const o=Function;return new o(""),!0}catch{return!1}});function fo(o){if(Fo(o)===!1)return!1;const e=o.constructor;if(e===void 0||typeof e!="function")return!0;const n=e.prototype;return!(Fo(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function Zn(o){return fo(o)?{...o}:Array.isArray(o)?[...o]:o}const Lb=new Set(["string","number","symbol"]);function Uo(o){return o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Y(o,e,n){const t=new o._zod.constr(e??o._zod.def);return(!e||n?.parent)&&(t._zod.parent=o),t}function f(o){const e=o;if(!e)return{};if(typeof e=="string")return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");e.error=e.message}return delete e.message,typeof e.error=="string"?{...e,error:()=>e.error}:e}function Mb(o){return Object.keys(o).filter(e=>o[e]._zod.optin==="optional"&&o[e]._zod.optout==="optional")}const Ub={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function Yb(o,e){const n=o._zod.def,t=n.checks;if(t&&t.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");const i=U(o._zod.def,{get shape(){const a={};for(const d in e){if(!(d in n.shape))throw new Error(`Unrecognized key: "${d}"`);e[d]&&(a[d]=n.shape[d])}return K(this,"shape",a),a},checks:[]});return Y(o,i)}function Vb(o,e){const n=o._zod.def,t=n.checks;if(t&&t.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");const i=U(o._zod.def,{get shape(){const a={...o._zod.def.shape};for(const d in e){if(!(d in n.shape))throw new Error(`Unrecognized key: "${d}"`);e[d]&&delete a[d]}return K(this,"shape",a),a},checks:[]});return Y(o,i)}function Xb(o,e){if(!fo(e))throw new Error("Invalid input to extend: expected a plain object");const n=o._zod.def.checks;if(n&&n.length>0){const i=o._zod.def.shape;for(const a in e)if(Object.getOwnPropertyDescriptor(i,a)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}const r=U(o._zod.def,{get shape(){const i={...o._zod.def.shape,...e};return K(this,"shape",i),i}});return Y(o,r)}function Hb(o,e){if(!fo(e))throw new Error("Invalid input to safeExtend: expected a plain object");const n=U(o._zod.def,{get shape(){const t={...o._zod.def.shape,...e};return K(this,"shape",t),t}});return Y(o,n)}function Jb(o,e){const n=U(o._zod.def,{get shape(){const t={...o._zod.def.shape,...e._zod.def.shape};return K(this,"shape",t),t},get catchall(){return e._zod.def.catchall},checks:[]});return Y(o,n)}function Gb(o,e,n){const r=e._zod.def.checks;if(r&&r.length>0)throw new Error(".partial() cannot be used on object schemas containing refinements");const a=U(e._zod.def,{get shape(){const d=e._zod.def.shape,l={...d};if(n)for(const c in n){if(!(c in d))throw new Error(`Unrecognized key: "${c}"`);n[c]&&(l[c]=o?new o({type:"optional",innerType:d[c]}):d[c])}else for(const c in d)l[c]=o?new o({type:"optional",innerType:d[c]}):d[c];return K(this,"shape",l),l},checks:[]});return Y(e,a)}function Kb(o,e,n){const t=U(e._zod.def,{get shape(){const r=e._zod.def.shape,i={...r};if(n)for(const a in n){if(!(a in i))throw new Error(`Unrecognized key: "${a}"`);n[a]&&(i[a]=new o({type:"nonoptional",innerType:r[a]}))}else for(const a in r)i[a]=new o({type:"nonoptional",innerType:r[a]});return K(this,"shape",i),i}});return Y(e,t)}function eo(o,e=0){if(o.aborted===!0)return!0;for(let n=e;n<o.issues.length;n++)if(o.issues[n]?.continue!==!0)return!0;return!1}function En(o,e){return e.map(n=>{var t;return(t=n).path??(t.path=[]),n.path.unshift(o),n})}function Io(o){return typeof o=="string"?o:o?.message}function G(o,e,n){const t={...o,path:o.path??[]};if(!o.message){const r=Io(o.inst?._zod.def?.error?.(o))??Io(e?.error?.(o))??Io(n.customError?.(o))??Io(n.localeError?.(o))??"Invalid input";t.message=r}return delete t.inst,delete t.continue,e?.reportInput||delete t.input,t}function be(o){return Array.isArray(o)?"array":typeof o=="string"?"string":"unknown"}function ho(...o){const[e,n,t]=o;return typeof e=="string"?{message:e,code:"custom",input:n,inst:t}:{...e}}const jn=(o,e)=>{o.name="$ZodError",Object.defineProperty(o,"_zod",{value:o._zod,enumerable:!1}),Object.defineProperty(o,"issues",{value:e,enumerable:!1}),o.message=JSON.stringify(e,te,2),Object.defineProperty(o,"toString",{value:()=>o.message,enumerable:!1})},In=u("$ZodError",jn),Nn=u("$ZodError",jn,{Parent:Error});function qb(o,e=n=>n.message){const n={},t=[];for(const r of o.issues)r.path.length>0?(n[r.path[0]]=n[r.path[0]]||[],n[r.path[0]].push(e(r))):t.push(e(r));return{formErrors:t,fieldErrors:n}}function Qb(o,e=n=>n.message){const n={_errors:[]},t=r=>{for(const i of r.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map(a=>t({issues:a}));else if(i.code==="invalid_key")t({issues:i.issues});else if(i.code==="invalid_element")t({issues:i.issues});else if(i.path.length===0)n._errors.push(e(i));else{let a=n,d=0;for(;d<i.path.length;){const l=i.path[d];d===i.path.length-1?(a[l]=a[l]||{_errors:[]},a[l]._errors.push(e(i))):a[l]=a[l]||{_errors:[]},a=a[l],d++}}};return t(o),n}const ge=o=>(e,n,t,r)=>{const i=t?Object.assign(t,{async:!1}):{async:!1},a=e._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new no;if(a.issues.length){const d=new(r?.Err??o)(a.issues.map(l=>G(l,i,J())));throw On(d,r?.callee),d}return a.value},fe=o=>async(e,n,t,r)=>{const i=t?Object.assign(t,{async:!0}):{async:!0};let a=e._zod.run({value:n,issues:[]},i);if(a instanceof Promise&&(a=await a),a.issues.length){const d=new(r?.Err??o)(a.issues.map(l=>G(l,i,J())));throw On(d,r?.callee),d}return a.value},Yo=o=>(e,n,t)=>{const r=t?{...t,async:!1}:{async:!1},i=e._zod.run({value:n,issues:[]},r);if(i instanceof Promise)throw new no;return i.issues.length?{success:!1,error:new(o??In)(i.issues.map(a=>G(a,r,J())))}:{success:!0,data:i.value}},og=Yo(Nn),Vo=o=>async(e,n,t)=>{const r=t?Object.assign(t,{async:!0}):{async:!0};let i=e._zod.run({value:n,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new o(i.issues.map(a=>G(a,r,J())))}:{success:!0,data:i.value}},eg=Vo(Nn),ng=o=>(e,n,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return ge(o)(e,n,r)},tg=o=>(e,n,t)=>ge(o)(e,n,t),rg=o=>async(e,n,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return fe(o)(e,n,r)},ag=o=>async(e,n,t)=>fe(o)(e,n,t),ig=o=>(e,n,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return Yo(o)(e,n,r)},dg=o=>(e,n,t)=>Yo(o)(e,n,t),lg=o=>async(e,n,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return Vo(o)(e,n,r)},cg=o=>async(e,n,t)=>Vo(o)(e,n,t),sg=/^[cC][^\s-]{8,}$/,ug=/^[0-9a-z]+$/,pg=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,bg=/^[0-9a-vA-V]{20}$/,gg=/^[A-Za-z0-9]{27}$/,fg=/^[a-zA-Z0-9_-]{21}$/,hg=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,mg=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Ae=o=>o?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${o}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,kg=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,vg="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function wg(){return new RegExp(vg,"u")}const yg=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,xg=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,$g=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,zg=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Cg=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Tn=/^[A-Za-z0-9_-]*$/,_g=/^\+[1-9]\d{6,14}$/,Pn="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",Bg=new RegExp(`^${Pn}$`);function Dn(o){const e="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof o.precision=="number"?o.precision===-1?`${e}`:o.precision===0?`${e}:[0-5]\\d`:`${e}:[0-5]\\d\\.\\d{${o.precision}}`:`${e}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Sg(o){return new RegExp(`^${Dn(o)}$`)}function Rg(o){const e=Dn({precision:o.precision}),n=["Z"];o.local&&n.push(""),o.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const t=`${e}(?:${n.join("|")})`;return new RegExp(`^${Pn}T(?:${t})$`)}const Og=o=>{const e=o?`[\\s\\S]{${o?.minimum??0},${o?.maximum??""}}`:"[\\s\\S]*";return new RegExp(`^${e}$`)},Zg=/^-?\d+$/,Eg=/^-?\d+(?:\.\d+)?$/,jg=/^(?:true|false)$/i,Ig=/^[^A-Z]*$/,Ng=/^[^a-z]*$/,E=u("$ZodCheck",(o,e)=>{var n;o._zod??(o._zod={}),o._zod.def=e,(n=o._zod).onattach??(n.onattach=[])}),An={number:"number",bigint:"bigint",object:"date"},Fn=u("$ZodCheckLessThan",(o,e)=>{E.init(o,e);const n=An[typeof e.value];o._zod.onattach.push(t=>{const r=t._zod.bag,i=(e.inclusive?r.maximum:r.exclusiveMaximum)??Number.POSITIVE_INFINITY;e.value<i&&(e.inclusive?r.maximum=e.value:r.exclusiveMaximum=e.value)}),o._zod.check=t=>{(e.inclusive?t.value<=e.value:t.value<e.value)||t.issues.push({origin:n,code:"too_big",maximum:typeof e.value=="object"?e.value.getTime():e.value,input:t.value,inclusive:e.inclusive,inst:o,continue:!e.abort})}}),Wn=u("$ZodCheckGreaterThan",(o,e)=>{E.init(o,e);const n=An[typeof e.value];o._zod.onattach.push(t=>{const r=t._zod.bag,i=(e.inclusive?r.minimum:r.exclusiveMinimum)??Number.NEGATIVE_INFINITY;e.value>i&&(e.inclusive?r.minimum=e.value:r.exclusiveMinimum=e.value)}),o._zod.check=t=>{(e.inclusive?t.value>=e.value:t.value>e.value)||t.issues.push({origin:n,code:"too_small",minimum:typeof e.value=="object"?e.value.getTime():e.value,input:t.value,inclusive:e.inclusive,inst:o,continue:!e.abort})}}),Tg=u("$ZodCheckMultipleOf",(o,e)=>{E.init(o,e),o._zod.onattach.push(n=>{var t;(t=n._zod.bag).multipleOf??(t.multipleOf=e.value)}),o._zod.check=n=>{if(typeof n.value!=typeof e.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%e.value===BigInt(0):Ab(n.value,e.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:e.value,input:n.value,inst:o,continue:!e.abort})}}),Pg=u("$ZodCheckNumberFormat",(o,e)=>{E.init(o,e),e.format=e.format||"float64";const n=e.format?.includes("int"),t=n?"int":"number",[r,i]=Ub[e.format];o._zod.onattach.push(a=>{const d=a._zod.bag;d.format=e.format,d.minimum=r,d.maximum=i,n&&(d.pattern=Zg)}),o._zod.check=a=>{const d=a.value;if(n){if(!Number.isInteger(d)){a.issues.push({expected:t,format:e.format,code:"invalid_type",continue:!1,input:d,inst:o});return}if(!Number.isSafeInteger(d)){d>0?a.issues.push({input:d,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:o,origin:t,inclusive:!0,continue:!e.abort}):a.issues.push({input:d,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:o,origin:t,inclusive:!0,continue:!e.abort});return}}d<r&&a.issues.push({origin:"number",input:d,code:"too_small",minimum:r,inclusive:!0,inst:o,continue:!e.abort}),d>i&&a.issues.push({origin:"number",input:d,code:"too_big",maximum:i,inclusive:!0,inst:o,continue:!e.abort})}}),Dg=u("$ZodCheckMaxLength",(o,e)=>{var n;E.init(o,e),(n=o._zod.def).when??(n.when=t=>{const r=t.value;return!ue(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag.maximum??Number.POSITIVE_INFINITY;e.maximum<r&&(t._zod.bag.maximum=e.maximum)}),o._zod.check=t=>{const r=t.value;if(r.length<=e.maximum)return;const a=be(r);t.issues.push({origin:a,code:"too_big",maximum:e.maximum,inclusive:!0,input:r,inst:o,continue:!e.abort})}}),Ag=u("$ZodCheckMinLength",(o,e)=>{var n;E.init(o,e),(n=o._zod.def).when??(n.when=t=>{const r=t.value;return!ue(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag.minimum??Number.NEGATIVE_INFINITY;e.minimum>r&&(t._zod.bag.minimum=e.minimum)}),o._zod.check=t=>{const r=t.value;if(r.length>=e.minimum)return;const a=be(r);t.issues.push({origin:a,code:"too_small",minimum:e.minimum,inclusive:!0,input:r,inst:o,continue:!e.abort})}}),Fg=u("$ZodCheckLengthEquals",(o,e)=>{var n;E.init(o,e),(n=o._zod.def).when??(n.when=t=>{const r=t.value;return!ue(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag;r.minimum=e.length,r.maximum=e.length,r.length=e.length}),o._zod.check=t=>{const r=t.value,i=r.length;if(i===e.length)return;const a=be(r),d=i>e.length;t.issues.push({origin:a,...d?{code:"too_big",maximum:e.length}:{code:"too_small",minimum:e.length},inclusive:!0,exact:!0,input:t.value,inst:o,continue:!e.abort})}}),Xo=u("$ZodCheckStringFormat",(o,e)=>{var n,t;E.init(o,e),o._zod.onattach.push(r=>{const i=r._zod.bag;i.format=e.format,e.pattern&&(i.patterns??(i.patterns=new Set),i.patterns.add(e.pattern))}),e.pattern?(n=o._zod).check??(n.check=r=>{e.pattern.lastIndex=0,!e.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:e.format,input:r.value,...e.pattern?{pattern:e.pattern.toString()}:{},inst:o,continue:!e.abort})}):(t=o._zod).check??(t.check=()=>{})}),Wg=u("$ZodCheckRegex",(o,e)=>{Xo.init(o,e),o._zod.check=n=>{e.pattern.lastIndex=0,!e.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:e.pattern.toString(),inst:o,continue:!e.abort})}}),Lg=u("$ZodCheckLowerCase",(o,e)=>{e.pattern??(e.pattern=Ig),Xo.init(o,e)}),Mg=u("$ZodCheckUpperCase",(o,e)=>{e.pattern??(e.pattern=Ng),Xo.init(o,e)}),Ug=u("$ZodCheckIncludes",(o,e)=>{E.init(o,e);const n=Uo(e.includes),t=new RegExp(typeof e.position=="number"?`^.{${e.position}}${n}`:n);e.pattern=t,o._zod.onattach.push(r=>{const i=r._zod.bag;i.patterns??(i.patterns=new Set),i.patterns.add(t)}),o._zod.check=r=>{r.value.includes(e.includes,e.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:e.includes,input:r.value,inst:o,continue:!e.abort})}}),Yg=u("$ZodCheckStartsWith",(o,e)=>{E.init(o,e);const n=new RegExp(`^${Uo(e.prefix)}.*`);e.pattern??(e.pattern=n),o._zod.onattach.push(t=>{const r=t._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),o._zod.check=t=>{t.value.startsWith(e.prefix)||t.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:e.prefix,input:t.value,inst:o,continue:!e.abort})}}),Vg=u("$ZodCheckEndsWith",(o,e)=>{E.init(o,e);const n=new RegExp(`.*${Uo(e.suffix)}$`);e.pattern??(e.pattern=n),o._zod.onattach.push(t=>{const r=t._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(n)}),o._zod.check=t=>{t.value.endsWith(e.suffix)||t.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:e.suffix,input:t.value,inst:o,continue:!e.abort})}}),Xg=u("$ZodCheckOverwrite",(o,e)=>{E.init(o,e),o._zod.check=n=>{n.value=e.tx(n.value)}});class Hg{constructor(e=[]){this.content=[],this.indent=0,this&&(this.args=e)}indented(e){this.indent+=1,e(this),this.indent-=1}write(e){if(typeof e=="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}const t=e.split(`
`).filter(a=>a),r=Math.min(...t.map(a=>a.length-a.trimStart().length)),i=t.map(a=>a.slice(r)).map(a=>" ".repeat(this.indent*2)+a);for(const a of i)this.content.push(a)}compile(){const e=Function,n=this?.args,r=[...(this?.content??[""]).map(i=>`  ${i}`)];return new e(...n,r.join(`
`))}}const Jg={major:4,minor:3,patch:5},$=u("$ZodType",(o,e)=>{var n;o??(o={}),o._zod.def=e,o._zod.bag=o._zod.bag||{},o._zod.version=Jg;const t=[...o._zod.def.checks??[]];o._zod.traits.has("$ZodCheck")&&t.unshift(o);for(const r of t)for(const i of r._zod.onattach)i(o);if(t.length===0)(n=o._zod).deferred??(n.deferred=[]),o._zod.deferred?.push(()=>{o._zod.run=o._zod.parse});else{const r=(a,d,l)=>{let c=eo(a),s;for(const g of d){if(g._zod.def.when){if(!g._zod.def.when(a))continue}else if(c)continue;const p=a.issues.length,b=g._zod.check(a);if(b instanceof Promise&&l?.async===!1)throw new no;if(s||b instanceof Promise)s=(s??Promise.resolve()).then(async()=>{await b,a.issues.length!==p&&(c||(c=eo(a,p)))});else{if(a.issues.length===p)continue;c||(c=eo(a,p))}}return s?s.then(()=>a):a},i=(a,d,l)=>{if(eo(a))return a.aborted=!0,a;const c=r(d,t,l);if(c instanceof Promise){if(l.async===!1)throw new no;return c.then(s=>o._zod.parse(s,l))}return o._zod.parse(c,l)};o._zod.run=(a,d)=>{if(d.skipChecks)return o._zod.parse(a,d);if(d.direction==="backward"){const c=o._zod.parse({value:a.value,issues:[]},{...d,skipChecks:!0});return c instanceof Promise?c.then(s=>i(s,a,d)):i(c,a,d)}const l=o._zod.parse(a,d);if(l instanceof Promise){if(d.async===!1)throw new no;return l.then(c=>r(c,t,d))}return r(l,t,d)}}k(o,"~standard",()=>({validate:r=>{try{const i=og(o,r);return i.success?{value:i.data}:{issues:i.error?.issues}}catch{return eg(o,r).then(a=>a.success?{value:a.data}:{issues:a.error?.issues})}},vendor:"zod",version:1}))}),he=u("$ZodString",(o,e)=>{$.init(o,e),o._zod.pattern=[...o?._zod.bag?.patterns??[]].pop()??Og(o._zod.bag),o._zod.parse=(n,t)=>{if(e.coerce)try{n.value=String(n.value)}catch{}return typeof n.value=="string"||n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:o}),n}}),w=u("$ZodStringFormat",(o,e)=>{Xo.init(o,e),he.init(o,e)}),Gg=u("$ZodGUID",(o,e)=>{e.pattern??(e.pattern=mg),w.init(o,e)}),Kg=u("$ZodUUID",(o,e)=>{if(e.version){const t={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[e.version];if(t===void 0)throw new Error(`Invalid UUID version: "${e.version}"`);e.pattern??(e.pattern=Ae(t))}else e.pattern??(e.pattern=Ae());w.init(o,e)}),qg=u("$ZodEmail",(o,e)=>{e.pattern??(e.pattern=kg),w.init(o,e)}),Qg=u("$ZodURL",(o,e)=>{w.init(o,e),o._zod.check=n=>{try{const t=n.value.trim(),r=new URL(t);e.hostname&&(e.hostname.lastIndex=0,e.hostname.test(r.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:e.hostname.source,input:n.value,inst:o,continue:!e.abort})),e.protocol&&(e.protocol.lastIndex=0,e.protocol.test(r.protocol.endsWith(":")?r.protocol.slice(0,-1):r.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:e.protocol.source,input:n.value,inst:o,continue:!e.abort})),e.normalize?n.value=r.href:n.value=t;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:o,continue:!e.abort})}}}),of=u("$ZodEmoji",(o,e)=>{e.pattern??(e.pattern=wg()),w.init(o,e)}),ef=u("$ZodNanoID",(o,e)=>{e.pattern??(e.pattern=fg),w.init(o,e)}),nf=u("$ZodCUID",(o,e)=>{e.pattern??(e.pattern=sg),w.init(o,e)}),tf=u("$ZodCUID2",(o,e)=>{e.pattern??(e.pattern=ug),w.init(o,e)}),rf=u("$ZodULID",(o,e)=>{e.pattern??(e.pattern=pg),w.init(o,e)}),af=u("$ZodXID",(o,e)=>{e.pattern??(e.pattern=bg),w.init(o,e)}),df=u("$ZodKSUID",(o,e)=>{e.pattern??(e.pattern=gg),w.init(o,e)}),lf=u("$ZodISODateTime",(o,e)=>{e.pattern??(e.pattern=Rg(e)),w.init(o,e)}),cf=u("$ZodISODate",(o,e)=>{e.pattern??(e.pattern=Bg),w.init(o,e)}),sf=u("$ZodISOTime",(o,e)=>{e.pattern??(e.pattern=Sg(e)),w.init(o,e)}),uf=u("$ZodISODuration",(o,e)=>{e.pattern??(e.pattern=hg),w.init(o,e)}),pf=u("$ZodIPv4",(o,e)=>{e.pattern??(e.pattern=yg),w.init(o,e),o._zod.bag.format="ipv4"}),bf=u("$ZodIPv6",(o,e)=>{e.pattern??(e.pattern=xg),w.init(o,e),o._zod.bag.format="ipv6",o._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:o,continue:!e.abort})}}}),gf=u("$ZodCIDRv4",(o,e)=>{e.pattern??(e.pattern=$g),w.init(o,e)}),ff=u("$ZodCIDRv6",(o,e)=>{e.pattern??(e.pattern=zg),w.init(o,e),o._zod.check=n=>{const t=n.value.split("/");try{if(t.length!==2)throw new Error;const[r,i]=t;if(!i)throw new Error;const a=Number(i);if(`${a}`!==i)throw new Error;if(a<0||a>128)throw new Error;new URL(`http://[${r}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:o,continue:!e.abort})}}});function Ln(o){if(o==="")return!0;if(o.length%4!==0)return!1;try{return atob(o),!0}catch{return!1}}const hf=u("$ZodBase64",(o,e)=>{e.pattern??(e.pattern=Cg),w.init(o,e),o._zod.bag.contentEncoding="base64",o._zod.check=n=>{Ln(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:o,continue:!e.abort})}});function mf(o){if(!Tn.test(o))return!1;const e=o.replace(/[-_]/g,t=>t==="-"?"+":"/"),n=e.padEnd(Math.ceil(e.length/4)*4,"=");return Ln(n)}const kf=u("$ZodBase64URL",(o,e)=>{e.pattern??(e.pattern=Tn),w.init(o,e),o._zod.bag.contentEncoding="base64url",o._zod.check=n=>{mf(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:o,continue:!e.abort})}}),vf=u("$ZodE164",(o,e)=>{e.pattern??(e.pattern=_g),w.init(o,e)});function wf(o,e=null){try{const n=o.split(".");if(n.length!==3)return!1;const[t]=n;if(!t)return!1;const r=JSON.parse(atob(t));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||e&&(!("alg"in r)||r.alg!==e))}catch{return!1}}const yf=u("$ZodJWT",(o,e)=>{w.init(o,e),o._zod.check=n=>{wf(n.value,e.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:o,continue:!e.abort})}}),Mn=u("$ZodNumber",(o,e)=>{$.init(o,e),o._zod.pattern=o._zod.bag.pattern??Eg,o._zod.parse=(n,t)=>{if(e.coerce)try{n.value=Number(n.value)}catch{}const r=n.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return n;const i=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:r,inst:o,...i?{received:i}:{}}),n}}),xf=u("$ZodNumberFormat",(o,e)=>{Pg.init(o,e),Mn.init(o,e)}),$f=u("$ZodBoolean",(o,e)=>{$.init(o,e),o._zod.pattern=jg,o._zod.parse=(n,t)=>{if(e.coerce)try{n.value=!!n.value}catch{}const r=n.value;return typeof r=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:o}),n}}),zf=u("$ZodUnknown",(o,e)=>{$.init(o,e),o._zod.parse=n=>n}),Cf=u("$ZodNever",(o,e)=>{$.init(o,e),o._zod.parse=(n,t)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:o}),n)}),_f=u("$ZodDate",(o,e)=>{$.init(o,e),o._zod.parse=(n,t)=>{if(e.coerce)try{n.value=new Date(n.value)}catch{}const r=n.value,i=r instanceof Date;return i&&!Number.isNaN(r.getTime())||n.issues.push({expected:"date",code:"invalid_type",input:r,...i?{received:"Invalid Date"}:{},inst:o}),n}});function Fe(o,e,n){o.issues.length&&e.issues.push(...En(n,o.issues)),e.value[n]=o.value}const Bf=u("$ZodArray",(o,e)=>{$.init(o,e),o._zod.parse=(n,t)=>{const r=n.value;if(!Array.isArray(r))return n.issues.push({expected:"array",code:"invalid_type",input:r,inst:o}),n;n.value=Array(r.length);const i=[];for(let a=0;a<r.length;a++){const d=r[a],l=e.element._zod.run({value:d,issues:[]},t);l instanceof Promise?i.push(l.then(c=>Fe(c,n,a))):Fe(l,n,a)}return i.length?Promise.all(i).then(()=>n):n}});function Wo(o,e,n,t,r){if(o.issues.length){if(r&&!(n in t))return;e.issues.push(...En(n,o.issues))}o.value===void 0?n in t&&(e.value[n]=void 0):e.value[n]=o.value}function Un(o){const e=Object.keys(o.shape);for(const t of e)if(!o.shape?.[t]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${t}": expected a Zod schema`);const n=Mb(o.shape);return{...o,keys:e,keySet:new Set(e),numKeys:e.length,optionalKeys:new Set(n)}}function Yn(o,e,n,t,r,i){const a=[],d=r.keySet,l=r.catchall._zod,c=l.def.type,s=l.optout==="optional";for(const g in e){if(d.has(g))continue;if(c==="never"){a.push(g);continue}const p=l.run({value:e[g],issues:[]},t);p instanceof Promise?o.push(p.then(b=>Wo(b,n,g,e,s))):Wo(p,n,g,e,s)}return a.length&&n.issues.push({code:"unrecognized_keys",keys:a,input:e,inst:i}),o.length?Promise.all(o).then(()=>n):n}const Sf=u("$ZodObject",(o,e)=>{if($.init(o,e),!Object.getOwnPropertyDescriptor(e,"shape")?.get){const d=e.shape;Object.defineProperty(e,"shape",{get:()=>{const l={...d};return Object.defineProperty(e,"shape",{value:l}),l}})}const t=se(()=>Un(e));k(o._zod,"propValues",()=>{const d=e.shape,l={};for(const c in d){const s=d[c]._zod;if(s.values){l[c]??(l[c]=new Set);for(const g of s.values)l[c].add(g)}}return l});const r=Fo,i=e.catchall;let a;o._zod.parse=(d,l)=>{a??(a=t.value);const c=d.value;if(!r(c))return d.issues.push({expected:"object",code:"invalid_type",input:c,inst:o}),d;d.value={};const s=[],g=a.shape;for(const p of a.keys){const b=g[p],h=b._zod.optout==="optional",m=b._zod.run({value:c[p],issues:[]},l);m instanceof Promise?s.push(m.then(v=>Wo(v,d,p,c,h))):Wo(m,d,p,c,h)}return i?Yn(s,c,d,l,t.value,o):s.length?Promise.all(s).then(()=>d):d}}),Rf=u("$ZodObjectJIT",(o,e)=>{Sf.init(o,e);const n=o._zod.parse,t=se(()=>Un(e)),r=p=>{const b=new Hg(["shape","payload","ctx"]),h=t.value,m=R=>{const B=De(R);return`shape[${B}]._zod.run({ value: input[${B}], issues: [] }, ctx)`};b.write("const input = payload.value;");const v=Object.create(null);let C=0;for(const R of h.keys)v[R]=`key_${C++}`;b.write("const newResult = {};");for(const R of h.keys){const B=v[R],O=De(R),q=p[R]?._zod?.optout==="optional";b.write(`const ${B} = ${m(R)};`),q?b.write(`
        if (${B}.issues.length) {
          if (${O} in input) {
            payload.issues = payload.issues.concat(${B}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${O}, ...iss.path] : [${O}]
            })));
          }
        }
        
        if (${B}.value === undefined) {
          if (${O} in input) {
            newResult[${O}] = undefined;
          }
        } else {
          newResult[${O}] = ${B}.value;
        }
        
      `):b.write(`
        if (${B}.issues.length) {
          payload.issues = payload.issues.concat(${B}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${O}, ...iss.path] : [${O}]
          })));
        }
        
        if (${B}.value === undefined) {
          if (${O} in input) {
            newResult[${O}] = undefined;
          }
        } else {
          newResult[${O}] = ${B}.value;
        }
        
      `)}b.write("payload.value = newResult;"),b.write("return payload;");const _=b.compile();return(R,B)=>_(p,R,B)};let i;const a=Fo,d=!Sn.jitless,c=d&&Wb.value,s=e.catchall;let g;o._zod.parse=(p,b)=>{g??(g=t.value);const h=p.value;return a(h)?d&&c&&b?.async===!1&&b.jitless!==!0?(i||(i=r(e.shape)),p=i(p,b),s?Yn([],h,p,b,g,o):p):n(p,b):(p.issues.push({expected:"object",code:"invalid_type",input:h,inst:o}),p)}});function We(o,e,n,t){for(const i of o)if(i.issues.length===0)return e.value=i.value,e;const r=o.filter(i=>!eo(i));return r.length===1?(e.value=r[0].value,r[0]):(e.issues.push({code:"invalid_union",input:e.value,inst:n,errors:o.map(i=>i.issues.map(a=>G(a,t,J())))}),e)}const Of=u("$ZodUnion",(o,e)=>{$.init(o,e),k(o._zod,"optin",()=>e.options.some(r=>r._zod.optin==="optional")?"optional":void 0),k(o._zod,"optout",()=>e.options.some(r=>r._zod.optout==="optional")?"optional":void 0),k(o._zod,"values",()=>{if(e.options.every(r=>r._zod.values))return new Set(e.options.flatMap(r=>Array.from(r._zod.values)))}),k(o._zod,"pattern",()=>{if(e.options.every(r=>r._zod.pattern)){const r=e.options.map(i=>i._zod.pattern);return new RegExp(`^(${r.map(i=>pe(i.source)).join("|")})$`)}});const n=e.options.length===1,t=e.options[0]._zod.run;o._zod.parse=(r,i)=>{if(n)return t(r,i);let a=!1;const d=[];for(const l of e.options){const c=l._zod.run({value:r.value,issues:[]},i);if(c instanceof Promise)d.push(c),a=!0;else{if(c.issues.length===0)return c;d.push(c)}}return a?Promise.all(d).then(l=>We(l,r,o,i)):We(d,r,o,i)}}),Zf=u("$ZodIntersection",(o,e)=>{$.init(o,e),o._zod.parse=(n,t)=>{const r=n.value,i=e.left._zod.run({value:r,issues:[]},t),a=e.right._zod.run({value:r,issues:[]},t);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([l,c])=>Le(n,l,c)):Le(n,i,a)}});function re(o,e){if(o===e)return{valid:!0,data:o};if(o instanceof Date&&e instanceof Date&&+o==+e)return{valid:!0,data:o};if(fo(o)&&fo(e)){const n=Object.keys(e),t=Object.keys(o).filter(i=>n.indexOf(i)!==-1),r={...o,...e};for(const i of t){const a=re(o[i],e[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};r[i]=a.data}return{valid:!0,data:r}}if(Array.isArray(o)&&Array.isArray(e)){if(o.length!==e.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let t=0;t<o.length;t++){const r=o[t],i=e[t],a=re(r,i);if(!a.valid)return{valid:!1,mergeErrorPath:[t,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Le(o,e,n){const t=new Map;let r;for(const d of e.issues)if(d.code==="unrecognized_keys"){r??(r=d);for(const l of d.keys)t.has(l)||t.set(l,{}),t.get(l).l=!0}else o.issues.push(d);for(const d of n.issues)if(d.code==="unrecognized_keys")for(const l of d.keys)t.has(l)||t.set(l,{}),t.get(l).r=!0;else o.issues.push(d);const i=[...t].filter(([,d])=>d.l&&d.r).map(([d])=>d);if(i.length&&r&&o.issues.push({...r,keys:i}),eo(o))return o;const a=re(e.value,n.value);if(!a.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(a.mergeErrorPath)}`);return o.value=a.data,o}const Ef=u("$ZodEnum",(o,e)=>{$.init(o,e);const n=Rn(e.entries),t=new Set(n);o._zod.values=t,o._zod.pattern=new RegExp(`^(${n.filter(r=>Lb.has(typeof r)).map(r=>typeof r=="string"?Uo(r):r.toString()).join("|")})$`),o._zod.parse=(r,i)=>{const a=r.value;return t.has(a)||r.issues.push({code:"invalid_value",values:n,input:a,inst:o}),r}}),jf=u("$ZodTransform",(o,e)=>{$.init(o,e),o._zod.parse=(n,t)=>{if(t.direction==="backward")throw new Bn(o.constructor.name);const r=e.transform(n.value,n);if(t.async)return(r instanceof Promise?r:Promise.resolve(r)).then(a=>(n.value=a,n));if(r instanceof Promise)throw new no;return n.value=r,n}});function Me(o,e){return o.issues.length&&e===void 0?{issues:[],value:void 0}:o}const Vn=u("$ZodOptional",(o,e)=>{$.init(o,e),o._zod.optin="optional",o._zod.optout="optional",k(o._zod,"values",()=>e.innerType._zod.values?new Set([...e.innerType._zod.values,void 0]):void 0),k(o._zod,"pattern",()=>{const n=e.innerType._zod.pattern;return n?new RegExp(`^(${pe(n.source)})?$`):void 0}),o._zod.parse=(n,t)=>{if(e.innerType._zod.optin==="optional"){const r=e.innerType._zod.run(n,t);return r instanceof Promise?r.then(i=>Me(i,n.value)):Me(r,n.value)}return n.value===void 0?n:e.innerType._zod.run(n,t)}}),If=u("$ZodExactOptional",(o,e)=>{Vn.init(o,e),k(o._zod,"values",()=>e.innerType._zod.values),k(o._zod,"pattern",()=>e.innerType._zod.pattern),o._zod.parse=(n,t)=>e.innerType._zod.run(n,t)}),Nf=u("$ZodNullable",(o,e)=>{$.init(o,e),k(o._zod,"optin",()=>e.innerType._zod.optin),k(o._zod,"optout",()=>e.innerType._zod.optout),k(o._zod,"pattern",()=>{const n=e.innerType._zod.pattern;return n?new RegExp(`^(${pe(n.source)}|null)$`):void 0}),k(o._zod,"values",()=>e.innerType._zod.values?new Set([...e.innerType._zod.values,null]):void 0),o._zod.parse=(n,t)=>n.value===null?n:e.innerType._zod.run(n,t)}),Tf=u("$ZodDefault",(o,e)=>{$.init(o,e),o._zod.optin="optional",k(o._zod,"values",()=>e.innerType._zod.values),o._zod.parse=(n,t)=>{if(t.direction==="backward")return e.innerType._zod.run(n,t);if(n.value===void 0)return n.value=e.defaultValue,n;const r=e.innerType._zod.run(n,t);return r instanceof Promise?r.then(i=>Ue(i,e)):Ue(r,e)}});function Ue(o,e){return o.value===void 0&&(o.value=e.defaultValue),o}const Pf=u("$ZodPrefault",(o,e)=>{$.init(o,e),o._zod.optin="optional",k(o._zod,"values",()=>e.innerType._zod.values),o._zod.parse=(n,t)=>(t.direction==="backward"||n.value===void 0&&(n.value=e.defaultValue),e.innerType._zod.run(n,t))}),Df=u("$ZodNonOptional",(o,e)=>{$.init(o,e),k(o._zod,"values",()=>{const n=e.innerType._zod.values;return n?new Set([...n].filter(t=>t!==void 0)):void 0}),o._zod.parse=(n,t)=>{const r=e.innerType._zod.run(n,t);return r instanceof Promise?r.then(i=>Ye(i,o)):Ye(r,o)}});function Ye(o,e){return!o.issues.length&&o.value===void 0&&o.issues.push({code:"invalid_type",expected:"nonoptional",input:o.value,inst:e}),o}const Af=u("$ZodCatch",(o,e)=>{$.init(o,e),k(o._zod,"optin",()=>e.innerType._zod.optin),k(o._zod,"optout",()=>e.innerType._zod.optout),k(o._zod,"values",()=>e.innerType._zod.values),o._zod.parse=(n,t)=>{if(t.direction==="backward")return e.innerType._zod.run(n,t);const r=e.innerType._zod.run(n,t);return r instanceof Promise?r.then(i=>(n.value=i.value,i.issues.length&&(n.value=e.catchValue({...n,error:{issues:i.issues.map(a=>G(a,t,J()))},input:n.value}),n.issues=[]),n)):(n.value=r.value,r.issues.length&&(n.value=e.catchValue({...n,error:{issues:r.issues.map(i=>G(i,t,J()))},input:n.value}),n.issues=[]),n)}}),Ff=u("$ZodPipe",(o,e)=>{$.init(o,e),k(o._zod,"values",()=>e.in._zod.values),k(o._zod,"optin",()=>e.in._zod.optin),k(o._zod,"optout",()=>e.out._zod.optout),k(o._zod,"propValues",()=>e.in._zod.propValues),o._zod.parse=(n,t)=>{if(t.direction==="backward"){const i=e.out._zod.run(n,t);return i instanceof Promise?i.then(a=>No(a,e.in,t)):No(i,e.in,t)}const r=e.in._zod.run(n,t);return r instanceof Promise?r.then(i=>No(i,e.out,t)):No(r,e.out,t)}});function No(o,e,n){return o.issues.length?(o.aborted=!0,o):e._zod.run({value:o.value,issues:o.issues},n)}const Wf=u("$ZodReadonly",(o,e)=>{$.init(o,e),k(o._zod,"propValues",()=>e.innerType._zod.propValues),k(o._zod,"values",()=>e.innerType._zod.values),k(o._zod,"optin",()=>e.innerType?._zod?.optin),k(o._zod,"optout",()=>e.innerType?._zod?.optout),o._zod.parse=(n,t)=>{if(t.direction==="backward")return e.innerType._zod.run(n,t);const r=e.innerType._zod.run(n,t);return r instanceof Promise?r.then(Ve):Ve(r)}});function Ve(o){return o.value=Object.freeze(o.value),o}const Lf=u("$ZodCustom",(o,e)=>{E.init(o,e),$.init(o,e),o._zod.parse=(n,t)=>n,o._zod.check=n=>{const t=n.value,r=e.fn(t);if(r instanceof Promise)return r.then(i=>Xe(i,n,t,o));Xe(r,n,t,o)}});function Xe(o,e,n,t){if(!o){const r={code:"custom",input:n,inst:t,path:[...t._zod.def.path??[]],continue:!t._zod.def.abort};t._zod.def.params&&(r.params=t._zod.def.params),e.issues.push(ho(r))}}var He;class Mf{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...n){const t=n[0];return this._map.set(e,t),t&&typeof t=="object"&&"id"in t&&this._idmap.set(t.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){const n=this._map.get(e);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(e),this}get(e){const n=e._zod.parent;if(n){const t={...this.get(n)??{}};delete t.id;const r={...t,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}}function Uf(){return new Mf}(He=globalThis).__zod_globalRegistry??(He.__zod_globalRegistry=Uf());const uo=globalThis.__zod_globalRegistry;function Yf(o,e){return new o({type:"string",...f(e)})}function Vf(o,e){return new o({type:"string",format:"email",check:"string_format",abort:!1,...f(e)})}function Je(o,e){return new o({type:"string",format:"guid",check:"string_format",abort:!1,...f(e)})}function Xf(o,e){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,...f(e)})}function Hf(o,e){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...f(e)})}function Jf(o,e){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...f(e)})}function Gf(o,e){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...f(e)})}function Kf(o,e){return new o({type:"string",format:"url",check:"string_format",abort:!1,...f(e)})}function qf(o,e){return new o({type:"string",format:"emoji",check:"string_format",abort:!1,...f(e)})}function Qf(o,e){return new o({type:"string",format:"nanoid",check:"string_format",abort:!1,...f(e)})}function oh(o,e){return new o({type:"string",format:"cuid",check:"string_format",abort:!1,...f(e)})}function eh(o,e){return new o({type:"string",format:"cuid2",check:"string_format",abort:!1,...f(e)})}function nh(o,e){return new o({type:"string",format:"ulid",check:"string_format",abort:!1,...f(e)})}function th(o,e){return new o({type:"string",format:"xid",check:"string_format",abort:!1,...f(e)})}function rh(o,e){return new o({type:"string",format:"ksuid",check:"string_format",abort:!1,...f(e)})}function ah(o,e){return new o({type:"string",format:"ipv4",check:"string_format",abort:!1,...f(e)})}function ih(o,e){return new o({type:"string",format:"ipv6",check:"string_format",abort:!1,...f(e)})}function dh(o,e){return new o({type:"string",format:"cidrv4",check:"string_format",abort:!1,...f(e)})}function lh(o,e){return new o({type:"string",format:"cidrv6",check:"string_format",abort:!1,...f(e)})}function ch(o,e){return new o({type:"string",format:"base64",check:"string_format",abort:!1,...f(e)})}function sh(o,e){return new o({type:"string",format:"base64url",check:"string_format",abort:!1,...f(e)})}function uh(o,e){return new o({type:"string",format:"e164",check:"string_format",abort:!1,...f(e)})}function ph(o,e){return new o({type:"string",format:"jwt",check:"string_format",abort:!1,...f(e)})}function bh(o,e){return new o({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...f(e)})}function gh(o,e){return new o({type:"string",format:"date",check:"string_format",...f(e)})}function fh(o,e){return new o({type:"string",format:"time",check:"string_format",precision:null,...f(e)})}function hh(o,e){return new o({type:"string",format:"duration",check:"string_format",...f(e)})}function mh(o,e){return new o({type:"number",checks:[],...f(e)})}function kh(o,e){return new o({type:"number",check:"number_format",abort:!1,format:"safeint",...f(e)})}function vh(o,e){return new o({type:"boolean",...f(e)})}function wh(o){return new o({type:"unknown"})}function yh(o,e){return new o({type:"never",...f(e)})}function xh(o,e){return new o({type:"date",...f(e)})}function Ge(o,e){return new Fn({check:"less_than",...f(e),value:o,inclusive:!1})}function Po(o,e){return new Fn({check:"less_than",...f(e),value:o,inclusive:!0})}function Ke(o,e){return new Wn({check:"greater_than",...f(e),value:o,inclusive:!1})}function Do(o,e){return new Wn({check:"greater_than",...f(e),value:o,inclusive:!0})}function qe(o,e){return new Tg({check:"multiple_of",...f(e),value:o})}function Xn(o,e){return new Dg({check:"max_length",...f(e),maximum:o})}function Lo(o,e){return new Ag({check:"min_length",...f(e),minimum:o})}function Hn(o,e){return new Fg({check:"length_equals",...f(e),length:o})}function $h(o,e){return new Wg({check:"string_format",format:"regex",...f(e),pattern:o})}function zh(o){return new Lg({check:"string_format",format:"lowercase",...f(o)})}function Ch(o){return new Mg({check:"string_format",format:"uppercase",...f(o)})}function _h(o,e){return new Ug({check:"string_format",format:"includes",...f(e),includes:o})}function Bh(o,e){return new Yg({check:"string_format",format:"starts_with",...f(e),prefix:o})}function Sh(o,e){return new Vg({check:"string_format",format:"ends_with",...f(e),suffix:o})}function ro(o){return new Xg({check:"overwrite",tx:o})}function Rh(o){return ro(e=>e.normalize(o))}function Oh(){return ro(o=>o.trim())}function Zh(){return ro(o=>o.toLowerCase())}function Eh(){return ro(o=>o.toUpperCase())}function jh(){return ro(o=>Fb(o))}function Ih(o,e,n){return new o({type:"array",element:e,...f(n)})}function Nh(o,e,n){return new o({type:"custom",check:"custom",fn:e,...f(n)})}function Th(o){const e=Ph(n=>(n.addIssue=t=>{if(typeof t=="string")n.issues.push(ho(t,n.value,e._zod.def));else{const r=t;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),r.input??(r.input=n.value),r.inst??(r.inst=e),r.continue??(r.continue=!e._zod.def.abort),n.issues.push(ho(r))}},o(n.value,n)));return e}function Ph(o,e){const n=new E({check:"custom",...f(e)});return n._zod.check=o,n}function Jn(o){let e=o?.target??"draft-2020-12";return e==="draft-4"&&(e="draft-04"),e==="draft-7"&&(e="draft-07"),{processors:o.processors??{},metadataRegistry:o?.metadata??uo,target:e,unrepresentable:o?.unrepresentable??"throw",override:o?.override??(()=>{}),io:o?.io??"output",counter:0,seen:new Map,cycles:o?.cycles??"ref",reused:o?.reused??"inline",external:o?.external??void 0}}function S(o,e,n={path:[],schemaPath:[]}){var t;const r=o._zod.def,i=e.seen.get(o);if(i)return i.count++,n.schemaPath.includes(o)&&(i.cycle=n.path),i.schema;const a={schema:{},count:1,cycle:void 0,path:n.path};e.seen.set(o,a);const d=o._zod.toJSONSchema?.();if(d)a.schema=d;else{const s={...n,schemaPath:[...n.schemaPath,o],path:n.path};if(o._zod.processJSONSchema)o._zod.processJSONSchema(e,a.schema,s);else{const p=a.schema,b=e.processors[r.type];if(!b)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);b(o,e,p,s)}const g=o._zod.parent;g&&(a.ref||(a.ref=g),S(g,e,s),e.seen.get(g).isParent=!0)}const l=e.metadataRegistry.get(o);return l&&Object.assign(a.schema,l),e.io==="input"&&Z(o)&&(delete a.schema.examples,delete a.schema.default),e.io==="input"&&a.schema._prefault&&((t=a.schema).default??(t.default=a.schema._prefault)),delete a.schema._prefault,e.seen.get(o).schema}function Gn(o,e){const n=o.seen.get(e);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const t=new Map;for(const a of o.seen.entries()){const d=o.metadataRegistry.get(a[0])?.id;if(d){const l=t.get(d);if(l&&l!==a[0])throw new Error(`Duplicate schema id "${d}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);t.set(d,a[0])}}const r=a=>{const d=o.target==="draft-2020-12"?"$defs":"definitions";if(o.external){const g=o.external.registry.get(a[0])?.id,p=o.external.uri??(h=>h);if(g)return{ref:p(g)};const b=a[1].defId??a[1].schema.id??`schema${o.counter++}`;return a[1].defId=b,{defId:b,ref:`${p("__shared")}#/${d}/${b}`}}if(a[1]===n)return{ref:"#"};const c=`#/${d}/`,s=a[1].schema.id??`__schema${o.counter++}`;return{defId:s,ref:c+s}},i=a=>{if(a[1].schema.$ref)return;const d=a[1],{ref:l,defId:c}=r(a);d.def={...d.schema},c&&(d.defId=c);const s=d.schema;for(const g in s)delete s[g];s.$ref=l};if(o.cycles==="throw")for(const a of o.seen.entries()){const d=a[1];if(d.cycle)throw new Error(`Cycle detected: #/${d.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(const a of o.seen.entries()){const d=a[1];if(e===a[0]){i(a);continue}if(o.external){const c=o.external.registry.get(a[0])?.id;if(e!==a[0]&&c){i(a);continue}}if(o.metadataRegistry.get(a[0])?.id){i(a);continue}if(d.cycle){i(a);continue}if(d.count>1&&o.reused==="ref"){i(a);continue}}}function Kn(o,e){const n=o.seen.get(e);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const t=a=>{const d=o.seen.get(a);if(d.ref===null)return;const l=d.def??d.schema,c={...l},s=d.ref;if(d.ref=null,s){t(s);const p=o.seen.get(s),b=p.schema;if(b.$ref&&(o.target==="draft-07"||o.target==="draft-04"||o.target==="openapi-3.0")?(l.allOf=l.allOf??[],l.allOf.push(b)):Object.assign(l,b),Object.assign(l,c),a._zod.parent===s)for(const m in l)m==="$ref"||m==="allOf"||m in c||delete l[m];if(b.$ref)for(const m in l)m==="$ref"||m==="allOf"||m in p.def&&JSON.stringify(l[m])===JSON.stringify(p.def[m])&&delete l[m]}const g=a._zod.parent;if(g&&g!==s){t(g);const p=o.seen.get(g);if(p?.schema.$ref&&(l.$ref=p.schema.$ref,p.def))for(const b in l)b==="$ref"||b==="allOf"||b in p.def&&JSON.stringify(l[b])===JSON.stringify(p.def[b])&&delete l[b]}o.override({zodSchema:a,jsonSchema:l,path:d.path??[]})};for(const a of[...o.seen.entries()].reverse())t(a[0]);const r={};if(o.target==="draft-2020-12"?r.$schema="https://json-schema.org/draft/2020-12/schema":o.target==="draft-07"?r.$schema="http://json-schema.org/draft-07/schema#":o.target==="draft-04"?r.$schema="http://json-schema.org/draft-04/schema#":o.target,o.external?.uri){const a=o.external.registry.get(e)?.id;if(!a)throw new Error("Schema is missing an `id` property");r.$id=o.external.uri(a)}Object.assign(r,n.def??n.schema);const i=o.external?.defs??{};for(const a of o.seen.entries()){const d=a[1];d.def&&d.defId&&(i[d.defId]=d.def)}o.external||Object.keys(i).length>0&&(o.target==="draft-2020-12"?r.$defs=i:r.definitions=i);try{const a=JSON.parse(JSON.stringify(r));return Object.defineProperty(a,"~standard",{value:{...e["~standard"],jsonSchema:{input:Mo(e,"input",o.processors),output:Mo(e,"output",o.processors)}},enumerable:!1,writable:!1}),a}catch{throw new Error("Error converting schema to JSON.")}}function Z(o,e){const n=e??{seen:new Set};if(n.seen.has(o))return!1;n.seen.add(o);const t=o._zod.def;if(t.type==="transform")return!0;if(t.type==="array")return Z(t.element,n);if(t.type==="set")return Z(t.valueType,n);if(t.type==="lazy")return Z(t.getter(),n);if(t.type==="promise"||t.type==="optional"||t.type==="nonoptional"||t.type==="nullable"||t.type==="readonly"||t.type==="default"||t.type==="prefault")return Z(t.innerType,n);if(t.type==="intersection")return Z(t.left,n)||Z(t.right,n);if(t.type==="record"||t.type==="map")return Z(t.keyType,n)||Z(t.valueType,n);if(t.type==="pipe")return Z(t.in,n)||Z(t.out,n);if(t.type==="object"){for(const r in t.shape)if(Z(t.shape[r],n))return!0;return!1}if(t.type==="union"){for(const r of t.options)if(Z(r,n))return!0;return!1}if(t.type==="tuple"){for(const r of t.items)if(Z(r,n))return!0;return!!(t.rest&&Z(t.rest,n))}return!1}const Dh=(o,e={})=>n=>{const t=Jn({...n,processors:e});return S(o,t),Gn(t,o),Kn(t,o)},Mo=(o,e,n={})=>t=>{const{libraryOptions:r,target:i}=t??{},a=Jn({...r??{},target:i,io:e,processors:n});return S(o,a),Gn(a,o),Kn(a,o)},Ah={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Fh=(o,e,n,t)=>{const r=n;r.type="string";const{minimum:i,maximum:a,format:d,patterns:l,contentEncoding:c}=o._zod.bag;if(typeof i=="number"&&(r.minLength=i),typeof a=="number"&&(r.maxLength=a),d&&(r.format=Ah[d]??d,r.format===""&&delete r.format,d==="time"&&delete r.format),c&&(r.contentEncoding=c),l&&l.size>0){const s=[...l];s.length===1?r.pattern=s[0].source:s.length>1&&(r.allOf=[...s.map(g=>({...e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0"?{type:"string"}:{},pattern:g.source}))])}},Wh=(o,e,n,t)=>{const r=n,{minimum:i,maximum:a,format:d,multipleOf:l,exclusiveMaximum:c,exclusiveMinimum:s}=o._zod.bag;typeof d=="string"&&d.includes("int")?r.type="integer":r.type="number",typeof s=="number"&&(e.target==="draft-04"||e.target==="openapi-3.0"?(r.minimum=s,r.exclusiveMinimum=!0):r.exclusiveMinimum=s),typeof i=="number"&&(r.minimum=i,typeof s=="number"&&e.target!=="draft-04"&&(s>=i?delete r.minimum:delete r.exclusiveMinimum)),typeof c=="number"&&(e.target==="draft-04"||e.target==="openapi-3.0"?(r.maximum=c,r.exclusiveMaximum=!0):r.exclusiveMaximum=c),typeof a=="number"&&(r.maximum=a,typeof c=="number"&&e.target!=="draft-04"&&(c<=a?delete r.maximum:delete r.exclusiveMaximum)),typeof l=="number"&&(r.multipleOf=l)},Lh=(o,e,n,t)=>{n.type="boolean"},Mh=(o,e,n,t)=>{n.not={}},Uh=(o,e,n,t)=>{},Yh=(o,e,n,t)=>{if(e.unrepresentable==="throw")throw new Error("Date cannot be represented in JSON Schema")},Vh=(o,e,n,t)=>{const r=o._zod.def,i=Rn(r.entries);i.every(a=>typeof a=="number")&&(n.type="number"),i.every(a=>typeof a=="string")&&(n.type="string"),n.enum=i},Xh=(o,e,n,t)=>{if(e.unrepresentable==="throw")throw new Error("Custom types cannot be represented in JSON Schema")},Hh=(o,e,n,t)=>{if(e.unrepresentable==="throw")throw new Error("Transforms cannot be represented in JSON Schema")},Jh=(o,e,n,t)=>{const r=n,i=o._zod.def,{minimum:a,maximum:d}=o._zod.bag;typeof a=="number"&&(r.minItems=a),typeof d=="number"&&(r.maxItems=d),r.type="array",r.items=S(i.element,e,{...t,path:[...t.path,"items"]})},Gh=(o,e,n,t)=>{const r=n,i=o._zod.def;r.type="object",r.properties={};const a=i.shape;for(const c in a)r.properties[c]=S(a[c],e,{...t,path:[...t.path,"properties",c]});const d=new Set(Object.keys(a)),l=new Set([...d].filter(c=>{const s=i.shape[c]._zod;return e.io==="input"?s.optin===void 0:s.optout===void 0}));l.size>0&&(r.required=Array.from(l)),i.catchall?._zod.def.type==="never"?r.additionalProperties=!1:i.catchall?i.catchall&&(r.additionalProperties=S(i.catchall,e,{...t,path:[...t.path,"additionalProperties"]})):e.io==="output"&&(r.additionalProperties=!1)},Kh=(o,e,n,t)=>{const r=o._zod.def,i=r.inclusive===!1,a=r.options.map((d,l)=>S(d,e,{...t,path:[...t.path,i?"oneOf":"anyOf",l]}));i?n.oneOf=a:n.anyOf=a},qh=(o,e,n,t)=>{const r=o._zod.def,i=S(r.left,e,{...t,path:[...t.path,"allOf",0]}),a=S(r.right,e,{...t,path:[...t.path,"allOf",1]}),d=c=>"allOf"in c&&Object.keys(c).length===1,l=[...d(i)?i.allOf:[i],...d(a)?a.allOf:[a]];n.allOf=l},Qh=(o,e,n,t)=>{const r=o._zod.def,i=S(r.innerType,e,t),a=e.seen.get(o);e.target==="openapi-3.0"?(a.ref=r.innerType,n.nullable=!0):n.anyOf=[i,{type:"null"}]},om=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType},em=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType,n.default=JSON.parse(JSON.stringify(r.defaultValue))},nm=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType,e.io==="input"&&(n._prefault=JSON.parse(JSON.stringify(r.defaultValue)))},tm=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType;let a;try{a=r.catchValue(void 0)}catch{throw new Error("Dynamic catch values are not supported in JSON Schema")}n.default=a},rm=(o,e,n,t)=>{const r=o._zod.def,i=e.io==="input"?r.in._zod.def.type==="transform"?r.out:r.in:r.out;S(i,e,t);const a=e.seen.get(o);a.ref=i},am=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType,n.readOnly=!0},qn=(o,e,n,t)=>{const r=o._zod.def;S(r.innerType,e,t);const i=e.seen.get(o);i.ref=r.innerType},im=u("ZodISODateTime",(o,e)=>{lf.init(o,e),y.init(o,e)});function dm(o){return bh(im,o)}const lm=u("ZodISODate",(o,e)=>{cf.init(o,e),y.init(o,e)});function cm(o){return gh(lm,o)}const sm=u("ZodISOTime",(o,e)=>{sf.init(o,e),y.init(o,e)});function um(o){return fh(sm,o)}const pm=u("ZodISODuration",(o,e)=>{uf.init(o,e),y.init(o,e)});function bm(o){return hh(pm,o)}const Qn=(o,e)=>{In.init(o,e),o.name="ZodError",Object.defineProperties(o,{format:{value:n=>Qb(o,n)},flatten:{value:n=>qb(o,n)},addIssue:{value:n=>{o.issues.push(n),o.message=JSON.stringify(o.issues,te,2)}},addIssues:{value:n=>{o.issues.push(...n),o.message=JSON.stringify(o.issues,te,2)}},isEmpty:{get(){return o.issues.length===0}}})},Gk=u("ZodError",Qn),I=u("ZodError",Qn,{Parent:Error}),gm=ge(I),fm=fe(I),hm=Yo(I),mm=Vo(I),km=ng(I),vm=tg(I),wm=rg(I),ym=ag(I),xm=ig(I),$m=dg(I),zm=lg(I),Cm=cg(I),z=u("ZodType",(o,e)=>($.init(o,e),Object.assign(o["~standard"],{jsonSchema:{input:Mo(o,"input"),output:Mo(o,"output")}}),o.toJSONSchema=Dh(o,{}),o.def=e,o.type=e.type,Object.defineProperty(o,"_def",{value:e}),o.check=(...n)=>o.clone(U(e,{checks:[...e.checks??[],...n.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0}),o.with=o.check,o.clone=(n,t)=>Y(o,n,t),o.brand=()=>o,o.register=((n,t)=>(n.add(o,t),o)),o.parse=(n,t)=>gm(o,n,t,{callee:o.parse}),o.safeParse=(n,t)=>hm(o,n,t),o.parseAsync=async(n,t)=>fm(o,n,t,{callee:o.parseAsync}),o.safeParseAsync=async(n,t)=>mm(o,n,t),o.spa=o.safeParseAsync,o.encode=(n,t)=>km(o,n,t),o.decode=(n,t)=>vm(o,n,t),o.encodeAsync=async(n,t)=>wm(o,n,t),o.decodeAsync=async(n,t)=>ym(o,n,t),o.safeEncode=(n,t)=>xm(o,n,t),o.safeDecode=(n,t)=>$m(o,n,t),o.safeEncodeAsync=async(n,t)=>zm(o,n,t),o.safeDecodeAsync=async(n,t)=>Cm(o,n,t),o.refine=(n,t)=>o.check(w0(n,t)),o.superRefine=n=>o.check(y0(n)),o.overwrite=n=>o.check(ro(n)),o.optional=()=>nn(o),o.exactOptional=()=>d0(o),o.nullable=()=>tn(o),o.nullish=()=>nn(tn(o)),o.nonoptional=n=>b0(o,n),o.array=()=>Km(o),o.or=n=>o0([o,n]),o.and=n=>n0(o,n),o.transform=n=>rn(o,a0(n)),o.default=n=>s0(o,n),o.prefault=n=>p0(o,n),o.catch=n=>f0(o,n),o.pipe=n=>rn(o,n),o.readonly=()=>k0(o),o.describe=n=>{const t=o.clone();return uo.add(t,{description:n}),t},Object.defineProperty(o,"description",{get(){return uo.get(o)?.description},configurable:!0}),o.meta=(...n)=>{if(n.length===0)return uo.get(o);const t=o.clone();return uo.add(t,n[0]),t},o.isOptional=()=>o.safeParse(void 0).success,o.isNullable=()=>o.safeParse(null).success,o.apply=n=>n(o),o)),ot=u("_ZodString",(o,e)=>{he.init(o,e),z.init(o,e),o._zod.processJSONSchema=(t,r,i)=>Fh(o,t,r);const n=o._zod.bag;o.format=n.format??null,o.minLength=n.minimum??null,o.maxLength=n.maximum??null,o.regex=(...t)=>o.check($h(...t)),o.includes=(...t)=>o.check(_h(...t)),o.startsWith=(...t)=>o.check(Bh(...t)),o.endsWith=(...t)=>o.check(Sh(...t)),o.min=(...t)=>o.check(Lo(...t)),o.max=(...t)=>o.check(Xn(...t)),o.length=(...t)=>o.check(Hn(...t)),o.nonempty=(...t)=>o.check(Lo(1,...t)),o.lowercase=t=>o.check(zh(t)),o.uppercase=t=>o.check(Ch(t)),o.trim=()=>o.check(Oh()),o.normalize=(...t)=>o.check(Rh(...t)),o.toLowerCase=()=>o.check(Zh()),o.toUpperCase=()=>o.check(Eh()),o.slugify=()=>o.check(jh())}),_m=u("ZodString",(o,e)=>{he.init(o,e),ot.init(o,e),o.email=n=>o.check(Vf(Bm,n)),o.url=n=>o.check(Kf(Sm,n)),o.jwt=n=>o.check(ph(Mm,n)),o.emoji=n=>o.check(qf(Rm,n)),o.guid=n=>o.check(Je(Qe,n)),o.uuid=n=>o.check(Xf(To,n)),o.uuidv4=n=>o.check(Hf(To,n)),o.uuidv6=n=>o.check(Jf(To,n)),o.uuidv7=n=>o.check(Gf(To,n)),o.nanoid=n=>o.check(Qf(Om,n)),o.guid=n=>o.check(Je(Qe,n)),o.cuid=n=>o.check(oh(Zm,n)),o.cuid2=n=>o.check(eh(Em,n)),o.ulid=n=>o.check(nh(jm,n)),o.base64=n=>o.check(ch(Fm,n)),o.base64url=n=>o.check(sh(Wm,n)),o.xid=n=>o.check(th(Im,n)),o.ksuid=n=>o.check(rh(Nm,n)),o.ipv4=n=>o.check(ah(Tm,n)),o.ipv6=n=>o.check(ih(Pm,n)),o.cidrv4=n=>o.check(dh(Dm,n)),o.cidrv6=n=>o.check(lh(Am,n)),o.e164=n=>o.check(uh(Lm,n)),o.datetime=n=>o.check(dm(n)),o.date=n=>o.check(cm(n)),o.time=n=>o.check(um(n)),o.duration=n=>o.check(bm(n))});function Kk(o){return Yf(_m,o)}const y=u("ZodStringFormat",(o,e)=>{w.init(o,e),ot.init(o,e)}),Bm=u("ZodEmail",(o,e)=>{qg.init(o,e),y.init(o,e)}),Qe=u("ZodGUID",(o,e)=>{Gg.init(o,e),y.init(o,e)}),To=u("ZodUUID",(o,e)=>{Kg.init(o,e),y.init(o,e)}),Sm=u("ZodURL",(o,e)=>{Qg.init(o,e),y.init(o,e)}),Rm=u("ZodEmoji",(o,e)=>{of.init(o,e),y.init(o,e)}),Om=u("ZodNanoID",(o,e)=>{ef.init(o,e),y.init(o,e)}),Zm=u("ZodCUID",(o,e)=>{nf.init(o,e),y.init(o,e)}),Em=u("ZodCUID2",(o,e)=>{tf.init(o,e),y.init(o,e)}),jm=u("ZodULID",(o,e)=>{rf.init(o,e),y.init(o,e)}),Im=u("ZodXID",(o,e)=>{af.init(o,e),y.init(o,e)}),Nm=u("ZodKSUID",(o,e)=>{df.init(o,e),y.init(o,e)}),Tm=u("ZodIPv4",(o,e)=>{pf.init(o,e),y.init(o,e)}),Pm=u("ZodIPv6",(o,e)=>{bf.init(o,e),y.init(o,e)}),Dm=u("ZodCIDRv4",(o,e)=>{gf.init(o,e),y.init(o,e)}),Am=u("ZodCIDRv6",(o,e)=>{ff.init(o,e),y.init(o,e)}),Fm=u("ZodBase64",(o,e)=>{hf.init(o,e),y.init(o,e)}),Wm=u("ZodBase64URL",(o,e)=>{kf.init(o,e),y.init(o,e)}),Lm=u("ZodE164",(o,e)=>{vf.init(o,e),y.init(o,e)}),Mm=u("ZodJWT",(o,e)=>{yf.init(o,e),y.init(o,e)}),et=u("ZodNumber",(o,e)=>{Mn.init(o,e),z.init(o,e),o._zod.processJSONSchema=(t,r,i)=>Wh(o,t,r),o.gt=(t,r)=>o.check(Ke(t,r)),o.gte=(t,r)=>o.check(Do(t,r)),o.min=(t,r)=>o.check(Do(t,r)),o.lt=(t,r)=>o.check(Ge(t,r)),o.lte=(t,r)=>o.check(Po(t,r)),o.max=(t,r)=>o.check(Po(t,r)),o.int=t=>o.check(on(t)),o.safe=t=>o.check(on(t)),o.positive=t=>o.check(Ke(0,t)),o.nonnegative=t=>o.check(Do(0,t)),o.negative=t=>o.check(Ge(0,t)),o.nonpositive=t=>o.check(Po(0,t)),o.multipleOf=(t,r)=>o.check(qe(t,r)),o.step=(t,r)=>o.check(qe(t,r)),o.finite=()=>o;const n=o._zod.bag;o.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,o.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,o.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),o.isFinite=!0,o.format=n.format??null});function qk(o){return mh(et,o)}const Um=u("ZodNumberFormat",(o,e)=>{xf.init(o,e),et.init(o,e)});function on(o){return kh(Um,o)}const Ym=u("ZodBoolean",(o,e)=>{$f.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Lh(o,n,t)});function Qk(o){return vh(Ym,o)}const Vm=u("ZodUnknown",(o,e)=>{zf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Uh()});function en(){return wh(Vm)}const Xm=u("ZodNever",(o,e)=>{Cf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Mh(o,n,t)});function Hm(o){return yh(Xm,o)}const Jm=u("ZodDate",(o,e)=>{_f.init(o,e),z.init(o,e),o._zod.processJSONSchema=(t,r,i)=>Yh(o,t),o.min=(t,r)=>o.check(Do(t,r)),o.max=(t,r)=>o.check(Po(t,r));const n=o._zod.bag;o.minDate=n.minimum?new Date(n.minimum):null,o.maxDate=n.maximum?new Date(n.maximum):null});function ov(o){return xh(Jm,o)}const Gm=u("ZodArray",(o,e)=>{Bf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Jh(o,n,t,r),o.element=e.element,o.min=(n,t)=>o.check(Lo(n,t)),o.nonempty=n=>o.check(Lo(1,n)),o.max=(n,t)=>o.check(Xn(n,t)),o.length=(n,t)=>o.check(Hn(n,t)),o.unwrap=()=>o.element});function Km(o,e){return Ih(Gm,o,e)}const qm=u("ZodObject",(o,e)=>{Rf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Gh(o,n,t,r),k(o,"shape",()=>e.shape),o.keyof=()=>t0(Object.keys(o._zod.def.shape)),o.catchall=n=>o.clone({...o._zod.def,catchall:n}),o.passthrough=()=>o.clone({...o._zod.def,catchall:en()}),o.loose=()=>o.clone({...o._zod.def,catchall:en()}),o.strict=()=>o.clone({...o._zod.def,catchall:Hm()}),o.strip=()=>o.clone({...o._zod.def,catchall:void 0}),o.extend=n=>Xb(o,n),o.safeExtend=n=>Hb(o,n),o.merge=n=>Jb(o,n),o.pick=n=>Yb(o,n),o.omit=n=>Vb(o,n),o.partial=(...n)=>Gb(nt,o,n[0]),o.required=(...n)=>Kb(tt,o,n[0])});function ev(o,e){const n={type:"object",shape:o??{},...f(e)};return new qm(n)}const Qm=u("ZodUnion",(o,e)=>{Of.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Kh(o,n,t,r),o.options=e.options});function o0(o,e){return new Qm({type:"union",options:o,...f(e)})}const e0=u("ZodIntersection",(o,e)=>{Zf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>qh(o,n,t,r)});function n0(o,e){return new e0({type:"intersection",left:o,right:e})}const ae=u("ZodEnum",(o,e)=>{Ef.init(o,e),z.init(o,e),o._zod.processJSONSchema=(t,r,i)=>Vh(o,t,r),o.enum=e.entries,o.options=Object.values(e.entries);const n=new Set(Object.keys(e.entries));o.extract=(t,r)=>{const i={};for(const a of t)if(n.has(a))i[a]=e.entries[a];else throw new Error(`Key ${a} not found in enum`);return new ae({...e,checks:[],...f(r),entries:i})},o.exclude=(t,r)=>{const i={...e.entries};for(const a of t)if(n.has(a))delete i[a];else throw new Error(`Key ${a} not found in enum`);return new ae({...e,checks:[],...f(r),entries:i})}});function t0(o,e){const n=Array.isArray(o)?Object.fromEntries(o.map(t=>[t,t])):o;return new ae({type:"enum",entries:n,...f(e)})}const r0=u("ZodTransform",(o,e)=>{jf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Hh(o,n),o._zod.parse=(n,t)=>{if(t.direction==="backward")throw new Bn(o.constructor.name);n.addIssue=i=>{if(typeof i=="string")n.issues.push(ho(i,n.value,e));else{const a=i;a.fatal&&(a.continue=!1),a.code??(a.code="custom"),a.input??(a.input=n.value),a.inst??(a.inst=o),n.issues.push(ho(a))}};const r=e.transform(n.value,n);return r instanceof Promise?r.then(i=>(n.value=i,n)):(n.value=r,n)}});function a0(o){return new r0({type:"transform",transform:o})}const nt=u("ZodOptional",(o,e)=>{Vn.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>qn(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function nn(o){return new nt({type:"optional",innerType:o})}const i0=u("ZodExactOptional",(o,e)=>{If.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>qn(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function d0(o){return new i0({type:"optional",innerType:o})}const l0=u("ZodNullable",(o,e)=>{Nf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Qh(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function tn(o){return new l0({type:"nullable",innerType:o})}const c0=u("ZodDefault",(o,e)=>{Tf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>em(o,n,t,r),o.unwrap=()=>o._zod.def.innerType,o.removeDefault=o.unwrap});function s0(o,e){return new c0({type:"default",innerType:o,get defaultValue(){return typeof e=="function"?e():Zn(e)}})}const u0=u("ZodPrefault",(o,e)=>{Pf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>nm(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function p0(o,e){return new u0({type:"prefault",innerType:o,get defaultValue(){return typeof e=="function"?e():Zn(e)}})}const tt=u("ZodNonOptional",(o,e)=>{Df.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>om(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function b0(o,e){return new tt({type:"nonoptional",innerType:o,...f(e)})}const g0=u("ZodCatch",(o,e)=>{Af.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>tm(o,n,t,r),o.unwrap=()=>o._zod.def.innerType,o.removeCatch=o.unwrap});function f0(o,e){return new g0({type:"catch",innerType:o,catchValue:typeof e=="function"?e:()=>e})}const h0=u("ZodPipe",(o,e)=>{Ff.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>rm(o,n,t,r),o.in=e.in,o.out=e.out});function rn(o,e){return new h0({type:"pipe",in:o,out:e})}const m0=u("ZodReadonly",(o,e)=>{Wf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>am(o,n,t,r),o.unwrap=()=>o._zod.def.innerType});function k0(o){return new m0({type:"readonly",innerType:o})}const v0=u("ZodCustom",(o,e)=>{Lf.init(o,e),z.init(o,e),o._zod.processJSONSchema=(n,t,r)=>Xh(o,n)});function w0(o,e={}){return Nh(v0,o,e)}function y0(o){return Th(o)}var nv=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,tv=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`,rv=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,av=`
    .p-fileupload input[type='file'] {
        display: none;
    }

    .p-fileupload-advanced {
        border: 1px solid dt('fileupload.border.color');
        border-radius: dt('fileupload.border.radius');
        background: dt('fileupload.background');
        color: dt('fileupload.color');
    }

    .p-fileupload-header {
        display: flex;
        align-items: center;
        padding: dt('fileupload.header.padding');
        background: dt('fileupload.header.background');
        color: dt('fileupload.header.color');
        border-style: solid;
        border-width: dt('fileupload.header.border.width');
        border-color: dt('fileupload.header.border.color');
        border-radius: dt('fileupload.header.border.radius');
        gap: dt('fileupload.header.gap');
    }

    .p-fileupload-content {
        border: 1px solid transparent;
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.content.gap');
        transition: border-color dt('fileupload.transition.duration');
        padding: dt('fileupload.content.padding');
    }

    .p-fileupload-content .p-progressbar {
        width: 100%;
        height: dt('fileupload.progressbar.height');
    }

    .p-fileupload-file-list {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.filelist.gap');
    }

    .p-fileupload-file {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: dt('fileupload.file.padding');
        border-block-end: 1px solid dt('fileupload.file.border.color');
        gap: dt('fileupload.file.gap');
    }

    .p-fileupload-file:last-child {
        border-block-end: 0;
    }

    .p-fileupload-file-info {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.file.info.gap');
    }

    .p-fileupload-file-thumbnail {
        flex-shrink: 0;
    }

    .p-fileupload-file-actions {
        margin-inline-start: auto;
    }

    .p-fileupload-highlight {
        border: 1px dashed dt('fileupload.content.highlight.border.color');
    }

    .p-fileupload-basic .p-message {
        margin-block-end: dt('fileupload.basic.gap');
    }

    .p-fileupload-basic-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: dt('fileupload.basic.gap');
    }
`,iv=`
    .p-datepicker {
        display: inline-flex;
        max-width: 100%;
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-datepicker-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.dropdown.width');
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
        background: dt('datepicker.dropdown.background');
        border: 1px solid dt('datepicker.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('datepicker.dropdown.color');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        outline-color: transparent;
    }

    .p-datepicker-dropdown:not(:disabled):hover {
        background: dt('datepicker.dropdown.hover.background');
        border-color: dt('datepicker.dropdown.hover.border.color');
        color: dt('datepicker.dropdown.hover.color');
    }

    .p-datepicker-dropdown:not(:disabled):active {
        background: dt('datepicker.dropdown.active.background');
        border-color: dt('datepicker.dropdown.active.border.color');
        color: dt('datepicker.dropdown.active.color');
    }

    .p-datepicker-dropdown:focus-visible {
        box-shadow: dt('datepicker.dropdown.focus.ring.shadow');
        outline: dt('datepicker.dropdown.focus.ring.width') dt('datepicker.dropdown.focus.ring.style') dt('datepicker.dropdown.focus.ring.color');
        outline-offset: dt('datepicker.dropdown.focus.ring.offset');
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) {
        position: relative;
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker-input-icon-container {
        cursor: pointer;
        position: absolute;
        top: 50%;
        inset-inline-end: dt('form.field.padding.x');
        margin-block-start: calc(-1 * (dt('icon.size') / 2));
        color: dt('datepicker.input.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-datepicker:has(.p-datepicker-input:disabled) .p-datepicker-input-icon-container {
        cursor: default;
    }

    .p-datepicker-fluid {
        display: flex;
    }

    .p-datepicker-fluid:has(.p-datepicker-dropdown) .p-datepicker-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datepicker .p-datepicker-panel {
        min-width: 100%;
    }

    .p-datepicker-panel {
        width: auto;
        padding: dt('datepicker.panel.padding');
        background: dt('datepicker.panel.background');
        color: dt('datepicker.panel.color');
        border: 1px solid dt('datepicker.panel.border.color');
        border-radius: dt('datepicker.panel.border.radius');
        box-shadow: dt('datepicker.panel.shadow');
    }

    .p-datepicker-panel-inline {
        display: inline-block;
        overflow-x: auto;
        box-shadow: none;
    }

    .p-datepicker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('datepicker.header.padding');
        background: dt('datepicker.header.background');
        color: dt('datepicker.header.color');
        border-block-end: 1px solid dt('datepicker.header.border.color');
    }

    .p-datepicker-next-button:dir(rtl) {
        order: -1;
    }

    .p-datepicker-prev-button:dir(rtl) {
        order: 1;
    }

    .p-datepicker-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: dt('datepicker.title.gap');
        font-weight: dt('datepicker.title.font.weight');
    }

    .p-datepicker-select-year,
    .p-datepicker-select-month {
        border: none;
        background: transparent;
        margin: 0;
        cursor: pointer;
        font-weight: inherit;
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration');
    }

    .p-datepicker-select-month {
        padding: dt('datepicker.select.month.padding');
        color: dt('datepicker.select.month.color');
        border-radius: dt('datepicker.select.month.border.radius');
    }

    .p-datepicker-select-year {
        padding: dt('datepicker.select.year.padding');
        color: dt('datepicker.select.year.color');
        border-radius: dt('datepicker.select.year.border.radius');
    }

    .p-datepicker-select-month:enabled:hover {
        background: dt('datepicker.select.month.hover.background');
        color: dt('datepicker.select.month.hover.color');
    }

    .p-datepicker-select-year:enabled:hover {
        background: dt('datepicker.select.year.hover.background');
        color: dt('datepicker.select.year.hover.color');
    }

    .p-datepicker-select-month:focus-visible,
    .p-datepicker-select-year:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-calendar-container {
        display: flex;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar {
        flex: 1 1 auto;
        border-inline-start: 1px solid dt('datepicker.group.border.color');
        padding-inline-end: dt('datepicker.group.gap');
        padding-inline-start: dt('datepicker.group.gap');
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:first-child {
        padding-inline-start: 0;
        border-inline-start: 0 none;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:last-child {
        padding-inline-end: 0;
    }

    .p-datepicker-day-view {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        margin: dt('datepicker.day.view.margin');
    }

    .p-datepicker-weekday-cell {
        padding: dt('datepicker.week.day.padding');
    }

    .p-datepicker-weekday {
        font-weight: dt('datepicker.week.day.font.weight');
        color: dt('datepicker.week.day.color');
    }

    .p-datepicker-day-cell {
        padding: dt('datepicker.date.padding');
    }

    .p-datepicker-day {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.date.width');
        height: dt('datepicker.date.height');
        border-radius: dt('datepicker.date.border.radius');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border: 1px solid transparent;
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-day:not(.p-datepicker-day-selected):not(.p-disabled):hover {
        background: dt('datepicker.date.hover.background');
        color: dt('datepicker.date.hover.color');
    }

    .p-datepicker-day:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day {
        background: dt('datepicker.today.background');
        color: dt('datepicker.today.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-weeknumber {
        text-align: center;
    }

    .p-datepicker-month-view {
        margin: dt('datepicker.month.view.margin');
    }

    .p-datepicker-month {
        width: 33.3%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.month.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.month.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-month:not(.p-disabled):not(.p-datepicker-month-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-month-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-month:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-year-view {
        margin: dt('datepicker.year.view.margin');
    }

    .p-datepicker-year {
        width: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.year.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.year.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-year:not(.p-disabled):not(.p-datepicker-year-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-year-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-year:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-buttonbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('datepicker.buttonbar.padding');
        border-block-start: 1px solid dt('datepicker.buttonbar.border.color');
    }

    .p-datepicker-buttonbar .p-button {
        width: auto;
    }

    .p-datepicker-time-picker {
        display: flex;
        justify-content: center;
        align-items: center;
        border-block-start: 1px solid dt('datepicker.time.picker.border.color');
        padding: 0;
        gap: dt('datepicker.time.picker.gap');
    }

    .p-datepicker-calendar-container + .p-datepicker-time-picker {
        padding: dt('datepicker.time.picker.padding');
    }

    .p-datepicker-time-picker > div {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: dt('datepicker.time.picker.button.gap');
    }

    .p-datepicker-time-picker span {
        font-size: 1rem;
    }

    .p-datepicker-timeonly .p-datepicker-time-picker {
        border-block-start: 0 none;
    }

    .p-datepicker-time-picker:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.sm.width');
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-input-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.lg.width');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-input-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-datepicker-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-clear-icon {
        inset-inline-end: calc(dt('datepicker.dropdown.width') + dt('form.field.padding.x'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container):has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

    .p-inputgroup .p-datepicker-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child:has(.p-datepicker-dropdown) > .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child .p-datepicker-dropdown {
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
    }
`,dv=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,lv=`
    .p-autocomplete {
        display: inline-flex;
    }

    .p-autocomplete-loader {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-loader {
        inset-inline-end: calc(dt('autocomplete.dropdown.width') + dt('autocomplete.padding.x'));
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input,
    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-input-multiple {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-autocomplete-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('autocomplete.dropdown.width');
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
        background: dt('autocomplete.dropdown.background');
        border: 1px solid dt('autocomplete.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('autocomplete.dropdown.color');
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
    }

    .p-autocomplete-dropdown:not(:disabled):hover {
        background: dt('autocomplete.dropdown.hover.background');
        border-color: dt('autocomplete.dropdown.hover.border.color');
        color: dt('autocomplete.dropdown.hover.color');
    }

    .p-autocomplete-dropdown:not(:disabled):active {
        background: dt('autocomplete.dropdown.active.background');
        border-color: dt('autocomplete.dropdown.active.border.color');
        color: dt('autocomplete.dropdown.active.color');
    }

    .p-autocomplete-dropdown:focus-visible {
        box-shadow: dt('autocomplete.dropdown.focus.ring.shadow');
        outline: dt('autocomplete.dropdown.focus.ring.width') dt('autocomplete.dropdown.focus.ring.style') dt('autocomplete.dropdown.focus.ring.color');
        outline-offset: dt('autocomplete.dropdown.focus.ring.offset');
    }

    .p-autocomplete-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('autocomplete.overlay.background');
        color: dt('autocomplete.overlay.color');
        border: 1px solid dt('autocomplete.overlay.border.color');
        border-radius: dt('autocomplete.overlay.border.radius');
        box-shadow: dt('autocomplete.overlay.shadow');
        min-width: 100%;
    }

    .p-autocomplete-list-container {
        overflow: auto;
    }

    .p-autocomplete-list {
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: dt('autocomplete.list.gap');
        padding: dt('autocomplete.list.padding');
    }

    .p-autocomplete-option {
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('autocomplete.option.padding');
        border: 0 none;
        color: dt('autocomplete.option.color');
        background: transparent;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration');
        border-radius: dt('autocomplete.option.border.radius');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled).p-focus {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option:not(.p-autocomplete-option-selected):not(.p-disabled):hover {
        background: dt('autocomplete.option.focus.background');
        color: dt('autocomplete.option.focus.color');
    }

    .p-autocomplete-option-selected {
        background: dt('autocomplete.option.selected.background');
        color: dt('autocomplete.option.selected.color');
    }

    .p-autocomplete-option-selected.p-focus {
        background: dt('autocomplete.option.selected.focus.background');
        color: dt('autocomplete.option.selected.focus.color');
    }

    .p-autocomplete-option-group {
        margin: 0;
        padding: dt('autocomplete.option.group.padding');
        color: dt('autocomplete.option.group.color');
        background: dt('autocomplete.option.group.background');
        font-weight: dt('autocomplete.option.group.font.weight');
    }

    .p-autocomplete-input-multiple {
        margin: 0;
        list-style-type: none;
        cursor: text;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: calc(dt('autocomplete.padding.y') / 2) dt('autocomplete.padding.x');
        gap: calc(dt('autocomplete.padding.y') / 2);
        color: dt('autocomplete.color');
        background: dt('autocomplete.background');
        border: 1px solid dt('autocomplete.border.color');
        border-radius: dt('autocomplete.border.radius');
        width: 100%;
        transition:
            background dt('autocomplete.transition.duration'),
            color dt('autocomplete.transition.duration'),
            border-color dt('autocomplete.transition.duration'),
            outline-color dt('autocomplete.transition.duration'),
            box-shadow dt('autocomplete.transition.duration');
        outline-color: transparent;
        box-shadow: dt('autocomplete.shadow');
    }

    .p-autocomplete-input-multiple.p-disabled {
        opacity: 1;
        background: dt('autocomplete.disabled.background');
        color: dt('autocomplete.disabled.color');
    }

    .p-autocomplete-input-multiple:not(.p-disabled):hover {
        border-color: dt('autocomplete.hover.border.color');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple:not(.p-disabled) {
        border-color: dt('autocomplete.focus.border.color');
        box-shadow: dt('autocomplete.focus.ring.shadow');
        outline: dt('autocomplete.focus.ring.width') dt('autocomplete.focus.ring.style') dt('autocomplete.focus.ring.color');
        outline-offset: dt('autocomplete.focus.ring.offset');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-multiple {
        border-color: dt('autocomplete.invalid.border.color');
    }

    .p-variant-filled.p-autocomplete-input-multiple {
        background: dt('autocomplete.filled.background');
    }

    .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled):hover {
        background: dt('autocomplete.filled.hover.background');
    }

    .p-autocomplete.p-focus .p-autocomplete-input-multiple.p-variant-filled:not(.p-disabled) {
        background: dt('autocomplete.filled.focus.background');
    }

    .p-autocomplete-chip.p-chip {
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
        border-radius: dt('autocomplete.chip.border.radius');
    }

    .p-autocomplete-input-multiple:has(.p-autocomplete-chip) {
        padding-inline-start: calc(dt('autocomplete.padding.y') / 2);
        padding-inline-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-chip-item.p-focus .p-autocomplete-chip {
        background: dt('autocomplete.chip.focus.background');
        color: dt('autocomplete.chip.focus.color');
    }

    .p-autocomplete-input-chip {
        flex: 1 1 auto;
        display: inline-flex;
        padding-block-start: calc(dt('autocomplete.padding.y') / 2);
        padding-block-end: calc(dt('autocomplete.padding.y') / 2);
    }

    .p-autocomplete-input-chip input {
        border: 0 none;
        outline: 0 none;
        background: transparent;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        width: 100%;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: inherit;
    }

    .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.placeholder.color');
    }

    .p-autocomplete.p-invalid .p-autocomplete-input-chip input::placeholder {
        color: dt('autocomplete.invalid.placeholder.color');
    }

    .p-autocomplete-empty-message {
        padding: dt('autocomplete.empty.message.padding');
    }

    .p-autocomplete-fluid {
        display: flex;
    }

    .p-autocomplete-fluid:has(.p-autocomplete-dropdown) .p-autocomplete-input {
        width: 1%;
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.sm.width');
    }

    .p-autocomplete:has(.p-inputtext-sm) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown {
        width: dt('autocomplete.dropdown.lg.width');
    }

    .p-autocomplete:has(.p-inputtext-lg) .p-autocomplete-dropdown .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-autocomplete-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('autocomplete.padding.x');
    }

    .p-autocomplete:has(.p-autocomplete-dropdown) .p-autocomplete-clear-icon {
        inset-inline-end: calc(dt('autocomplete.padding.x') + dt('autocomplete.dropdown.width'));
    }

    .p-autocomplete:has(.p-autocomplete-clear-icon) .p-autocomplete-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputgroup .p-autocomplete-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child:has(.p-autocomplete-dropdown) > .p-autocomplete-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-autocomplete:last-child .p-autocomplete-dropdown {
        border-start-end-radius: dt('autocomplete.dropdown.border.radius');
        border-end-end-radius: dt('autocomplete.dropdown.border.radius');
    }
`,cv=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`,sv=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`,uv=`
    .p-colorpicker {
        display: inline-block;
        position: relative;
    }

    .p-colorpicker-dragging {
        cursor: pointer;
    }

    .p-colorpicker-preview {
        width: dt('colorpicker.preview.width');
        height: dt('colorpicker.preview.height');
        padding: 0;
        border: 0 none;
        border-radius: dt('colorpicker.preview.border.radius');
        transition:
            background dt('colorpicker.transition.duration'),
            color dt('colorpicker.transition.duration'),
            border-color dt('colorpicker.transition.duration'),
            outline-color dt('colorpicker.transition.duration'),
            box-shadow dt('colorpicker.transition.duration');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-colorpicker-preview:enabled:focus-visible {
        border-color: dt('colorpicker.preview.focus.border.color');
        box-shadow: dt('colorpicker.preview.focus.ring.shadow');
        outline: dt('colorpicker.preview.focus.ring.width') dt('colorpicker.preview.focus.ring.style') dt('colorpicker.preview.focus.ring.color');
        outline-offset: dt('colorpicker.preview.focus.ring.offset');
    }

    .p-colorpicker-panel {
        background: dt('colorpicker.panel.background');
        border: 1px solid dt('colorpicker.panel.border.color');
        border-radius: dt('colorpicker.panel.border.radius');
        box-shadow: dt('colorpicker.panel.shadow');
        width: 193px;
        height: 166px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .p-colorpicker-panel-inline {
        box-shadow: none;
        position: static;
    }

    .p-colorpicker-content {
        position: relative;
    }

    .p-colorpicker-color-selector {
        width: 150px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 8px;
        position: absolute;
    }

    .p-colorpicker-color-background {
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    }

    .p-colorpicker-color-handle {
        position: absolute;
        inset-block-start: 0px;
        inset-inline-start: 150px;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        border-width: 1px;
        border-style: solid;
        margin: -5px 0 0 -5px;
        cursor: pointer;
        opacity: 0.85;
        border-color: dt('colorpicker.handle.color');
    }

    .p-colorpicker-hue {
        width: 17px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 167px;
        position: absolute;
        opacity: 0.85;
        background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
    }

    .p-colorpicker-hue-handle {
        position: absolute;
        inset-block-start: 150px;
        inset-inline-start: 0px;
        width: 21px;
        margin-inline-start: -2px;
        margin-block-start: -5px;
        height: 10px;
        border-width: 2px;
        border-style: solid;
        opacity: 0.85;
        cursor: pointer;
        border-color: dt('colorpicker.handle.color');
    }
`,pv=`
    .p-slider {
        display: block;
        position: relative;
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:focus-visible {
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        inset-block-start: 0;
        inset-inline-start: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        inset-block-start: 50%;
        margin-block-start: calc(-1 * calc(dt('slider.handle.height') / 2));
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
    }

    .p-slider-vertical {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-handle {
        inset-inline-start: 50%;
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
        margin-block-end: calc(-1 * calc(dt('slider.handle.height') / 2));
    }

    .p-slider-vertical .p-slider-range {
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
    }
`,bv=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,gv=`
    .p-listbox {
        display: block;
        background: dt('listbox.background');
        color: dt('listbox.color');
        border: 1px solid dt('listbox.border.color');
        border-radius: dt('listbox.border.radius');
        transition:
            background dt('listbox.transition.duration'),
            color dt('listbox.transition.duration'),
            border-color dt('listbox.transition.duration'),
            box-shadow dt('listbox.transition.duration'),
            outline-color dt('listbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('listbox.shadow');
    }

    .p-listbox.p-disabled {
        opacity: 1;
        background: dt('listbox.disabled.background');
        color: dt('listbox.disabled.color');
    }

    .p-listbox.p-disabled .p-listbox-option {
        color: dt('listbox.disabled.color');
    }

    .p-listbox.p-invalid {
        border-color: dt('listbox.invalid.border.color');
    }

    .p-listbox-header {
        padding: dt('listbox.list.header.padding');
    }

    .p-listbox-filter {
        width: 100%;
    }

    .p-listbox-list-container {
        overflow: auto;
    }

    .p-listbox-list {
        list-style-type: none;
        margin: 0;
        padding: dt('listbox.list.padding');
        outline: 0 none;
        display: flex;
        flex-direction: column;
        gap: dt('listbox.list.gap');
    }

    .p-listbox-option {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        padding: dt('listbox.option.padding');
        border: 0 none;
        border-radius: dt('listbox.option.border.radius');
        color: dt('listbox.option.color');
        transition:
            background dt('listbox.transition.duration'),
            color dt('listbox.transition.duration'),
            border-color dt('listbox.transition.duration'),
            box-shadow dt('listbox.transition.duration'),
            outline-color dt('listbox.transition.duration');
    }

    .p-listbox-striped li:nth-child(even of .p-listbox-option) {
        background: dt('listbox.option.striped.background');
    }

    .p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected {
        background: dt('listbox.option.selected.background');
        color: dt('listbox.option.selected.color');
    }

    .p-listbox:not(.p-disabled) .p-listbox-option.p-listbox-option-selected.p-focus {
        background: dt('listbox.option.selected.focus.background');
        color: dt('listbox.option.selected.focus.color');
    }

    .p-listbox:not(.p-disabled) .p-listbox-option:not(.p-listbox-option-selected):not(.p-disabled).p-focus {
        background: dt('listbox.option.focus.background');
        color: dt('listbox.option.focus.color');
    }

    .p-listbox:not(.p-disabled) .p-listbox-option:not(.p-listbox-option-selected):not(.p-disabled):hover {
        background: dt('listbox.option.focus.background');
        color: dt('listbox.option.focus.color');
    }

    .p-listbox-option-blank-icon {
        flex-shrink: 0;
    }

    .p-listbox-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('listbox.checkmark.gutter.start');
        margin-inline-end: dt('listbox.checkmark.gutter.end');
        color: dt('listbox.checkmark.color');
    }

    .p-listbox-option-group {
        margin: 0;
        padding: dt('listbox.option.group.padding');
        color: dt('listbox.option.group.color');
        background: dt('listbox.option.group.background');
        font-weight: dt('listbox.option.group.font.weight');
    }

    .p-listbox-empty-message {
        padding: dt('listbox.empty.message.padding');
    }

    .p-listbox-fluid {
        width: 100%;
    }
`,an=(o,e)=>e?P(o)&&Object.hasOwn(o,e)?o:{[e]:o}:o,fv=(o,e,n)=>async({values:t,name:r})=>{let{sync:i=!1,raw:a=!1}={};try{let d=await o[i?"parse":"parseAsync"](t,e);return{values:an(a?t:d,r),errors:{}}}catch(d){if(Array.isArray(d?.issues||d?.errors))return{values:an(a?t:void 0,r),errors:(d.issues||d.errors).reduce((l,c)=>{let s=x(c.path)?c.path.join("."):r;return s&&(l[s]||=[],l[s].push(c)),l},{})};throw d}},hv=`
    .p-password {
        display: inline-flex;
        position: relative;
    }

    .p-password .p-password-overlay {
        min-width: 100%;
    }

    .p-password-meter {
        height: dt('password.meter.height');
        background: dt('password.meter.background');
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-label {
        height: 100%;
        width: 0;
        transition: width 1s ease-in-out;
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-weak {
        background: dt('password.strength.weak.background');
    }

    .p-password-meter-medium {
        background: dt('password.strength.medium.background');
    }

    .p-password-meter-strong {
        background: dt('password.strength.strong.background');
    }

    .p-password-fluid {
        display: flex;
    }

    .p-password-fluid .p-password-input {
        width: 100%;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password-overlay {
        padding: dt('password.overlay.padding');
        background: dt('password.overlay.background');
        color: dt('password.overlay.color');
        border: 1px solid dt('password.overlay.border.color');
        box-shadow: dt('password.overlay.shadow');
        border-radius: dt('password.overlay.border.radius');
    }

    .p-password-content {
        display: flex;
        flex-direction: column;
        gap: dt('password.content.gap');
    }

    .p-password-toggle-mask-icon {
        inset-inline-end: dt('form.field.padding.x');
        color: dt('password.icon.color');
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * calc(dt('icon.size') / 2));
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-password-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon):has(.p-password-toggle-mask-icon)  .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

`,mv=`
    .p-floatlabel {
        display: block;
        position: relative;
    }

    .p-floatlabel label {
        position: absolute;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-weight: dt('floatlabel.font.weight');
        inset-inline-start: dt('floatlabel.position.x');
        color: dt('floatlabel.color');
        transition-duration: dt('floatlabel.transition.duration');
    }

    .p-floatlabel:has(.p-textarea) label {
        top: dt('floatlabel.position.y');
        transform: translateY(0);
    }

    .p-floatlabel:has(.p-inputicon:first-child) label {
        inset-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label,
    .p-floatlabel:has(input[placeholder]) label,
    .p-floatlabel:has(textarea[placeholder]) label {
        top: dt('floatlabel.over.active.top');
        transform: translateY(0);
        font-size: dt('floatlabel.active.font.size');
        font-weight: dt('floatlabel.active.font.weight');
    }

    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label {
        color: dt('floatlabel.active.color');
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label {
        color: dt('floatlabel.focus.color');
    }

    .p-floatlabel-in .p-inputtext,
    .p-floatlabel-in .p-textarea,
    .p-floatlabel-in .p-select-label,
    .p-floatlabel-in .p-multiselect-label,
    .p-floatlabel-in .p-multiselect-label:has(.p-chip),
    .p-floatlabel-in .p-autocomplete-input-multiple,
    .p-floatlabel-in .p-cascadeselect-label,
    .p-floatlabel-in .p-treeselect-label {
        padding-block-start: dt('floatlabel.in.input.padding.top');
        padding-block-end: dt('floatlabel.in.input.padding.bottom');
    }

    .p-floatlabel-in:has(input:focus) label,
    .p-floatlabel-in:has(input.p-filled) label,
    .p-floatlabel-in:has(input:-webkit-autofill) label,
    .p-floatlabel-in:has(textarea:focus) label,
    .p-floatlabel-in:has(textarea.p-filled) label,
    .p-floatlabel-in:has(.p-inputwrapper-focus) label,
    .p-floatlabel-in:has(.p-inputwrapper-filled) label,
    .p-floatlabel-in:has(input[placeholder]) label,
    .p-floatlabel-in:has(textarea[placeholder]) label {
        top: dt('floatlabel.in.active.top');
    }

    .p-floatlabel-on:has(input:focus) label,
    .p-floatlabel-on:has(input.p-filled) label,
    .p-floatlabel-on:has(input:-webkit-autofill) label,
    .p-floatlabel-on:has(textarea:focus) label,
    .p-floatlabel-on:has(textarea.p-filled) label,
    .p-floatlabel-on:has(.p-inputwrapper-focus) label,
    .p-floatlabel-on:has(.p-inputwrapper-filled) label,
    .p-floatlabel-on:has(input[placeholder]) label,
    .p-floatlabel-on:has(textarea[placeholder]) label {
        top: 0;
        transform: translateY(-50%);
        border-radius: dt('floatlabel.on.border.radius');
        background: dt('floatlabel.on.active.background');
        padding: dt('floatlabel.on.active.padding');
    }

    .p-floatlabel:has([class^='p-'][class$='-fluid']) {
        width: 100%;
    }

    .p-floatlabel:has(.p-invalid) label {
        color: dt('floatlabel.invalid.color');
    }
`,kv=`
    .p-multiselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('multiselect.background');
        border: 1px solid dt('multiselect.border.color');
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration');
        border-radius: dt('multiselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('multiselect.shadow');
    }

    .p-multiselect:not(.p-disabled):hover {
        border-color: dt('multiselect.hover.border.color');
    }

    .p-multiselect:not(.p-disabled).p-focus {
        border-color: dt('multiselect.focus.border.color');
        box-shadow: dt('multiselect.focus.ring.shadow');
        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');
        outline-offset: dt('multiselect.focus.ring.offset');
    }

    .p-multiselect.p-variant-filled {
        background: dt('multiselect.filled.background');
    }

    .p-multiselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('multiselect.filled.hover.background');
    }

    .p-multiselect.p-variant-filled.p-focus {
        background: dt('multiselect.filled.focus.background');
    }

    .p-multiselect.p-invalid {
        border-color: dt('multiselect.invalid.border.color');
    }

    .p-multiselect.p-disabled {
        opacity: 1;
        background: dt('multiselect.disabled.background');
    }

    .p-multiselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('multiselect.dropdown.color');
        width: dt('multiselect.dropdown.width');
        border-start-end-radius: dt('multiselect.border.radius');
        border-end-end-radius: dt('multiselect.border.radius');
    }

    .p-multiselect-clear-icon {
        align-self: center;
        color: dt('multiselect.clear.icon.color');
        inset-inline-end: dt('multiselect.dropdown.width');
    }

    .p-multiselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-multiselect-label {
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');
        color: dt('multiselect.color');
    }

    .p-multiselect-display-chip .p-multiselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('multiselect.padding.y') / 2);
    }

    .p-multiselect-label.p-placeholder {
        color: dt('multiselect.placeholder.color');
    }

    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }

    .p-multiselect.p-disabled .p-multiselect-label {
        color: dt('multiselect.disabled.color');
    }

    .p-multiselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-multiselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('multiselect.overlay.background');
        color: dt('multiselect.overlay.color');
        border: 1px solid dt('multiselect.overlay.border.color');
        border-radius: dt('multiselect.overlay.border.radius');
        box-shadow: dt('multiselect.overlay.shadow');
        min-width: 100%;
    }

    .p-multiselect-header {
        display: flex;
        align-items: center;
        padding: dt('multiselect.list.header.padding');
    }

    .p-multiselect-header .p-checkbox {
        margin-inline-end: dt('multiselect.option.gap');
    }

    .p-multiselect-filter-container {
        flex: 1 1 auto;
    }

    .p-multiselect-filter {
        width: 100%;
    }

    .p-multiselect-list-container {
        overflow: auto;
    }

    .p-multiselect-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('multiselect.list.padding');
        display: flex;
        flex-direction: column;
        gap: dt('multiselect.list.gap');
    }

    .p-multiselect-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: dt('multiselect.option.gap');
        padding: dt('multiselect.option.padding');
        border: 0 none;
        color: dt('multiselect.option.color');
        background: transparent;
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration');
        border-radius: dt('multiselect.option.border.radius');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option.p-multiselect-option-selected {
        background: dt('multiselect.option.selected.background');
        color: dt('multiselect.option.selected.color');
    }

    .p-multiselect-option.p-multiselect-option-selected.p-focus {
        background: dt('multiselect.option.selected.focus.background');
        color: dt('multiselect.option.selected.focus.color');
    }

    .p-multiselect-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('multiselect.option.group.padding');
        background: dt('multiselect.option.group.background');
        color: dt('multiselect.option.group.color');
        font-weight: dt('multiselect.option.group.font.weight');
    }

    .p-multiselect-empty-message {
        padding: dt('multiselect.empty.message.padding');
    }

    .p-multiselect-label .p-chip {
        padding-block-start: calc(dt('multiselect.padding.y') / 2);
        padding-block-end: calc(dt('multiselect.padding.y') / 2);
        border-radius: dt('multiselect.chip.border.radius');
    }

    .p-multiselect-label:has(.p-chip) {
        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);
    }

    .p-multiselect-fluid {
        display: flex;
        width: 100%;
    }

    .p-multiselect-sm .p-multiselect-label {
        font-size: dt('multiselect.sm.font.size');
        padding-block: dt('multiselect.sm.padding.y');
        padding-inline: dt('multiselect.sm.padding.x');
    }

    .p-multiselect-sm .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.sm.font.size');
        width: dt('multiselect.sm.font.size');
        height: dt('multiselect.sm.font.size');
    }

    .p-multiselect-lg .p-multiselect-label {
        font-size: dt('multiselect.lg.font.size');
        padding-block: dt('multiselect.lg.padding.y');
        padding-inline: dt('multiselect.lg.padding.x');
    }

    .p-multiselect-lg .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.lg.font.size');
        width: dt('multiselect.lg.font.size');
        height: dt('multiselect.lg.font.size');
    }

    .p-floatlabel-in .p-multiselect-filter {
        padding-block-start: dt('multiselect.padding.y');
        padding-block-end: dt('multiselect.padding.y');
    }
`;export{kk as $,cn as A,B0 as B,ne as C,M0 as D,po as E,Dt as F,xt as G,hk as H,$k as I,zk as J,L0 as K,F0 as L,j0 as M,V as N,N0 as O,xe as P,I0 as Q,X0 as R,go as S,R0 as T,Z0 as U,q0 as V,ye as W,z0 as X,Be as Y,Gk as Z,t0 as _,Zt as a,rv as a$,x0 as a0,Ck as a1,ln as a2,_0 as a3,_k as a4,Y0 as a5,Bk as a6,$t as a7,_t as a8,Bt as a9,Fk as aA,Wk as aB,nk as aC,Lk as aD,Rt as aE,pk as aF,A0 as aG,D0 as aH,P0 as aI,St as aJ,$0 as aK,tk as aL,G0 as aM,lk as aN,bk as aO,W0 as aP,U0 as aQ,H0 as aR,Mk as aS,Uk as aT,Yk as aU,Vk as aV,Xk as aW,Hk as aX,Jk as aY,nv as aZ,tv as a_,E0 as aa,ok as ab,Sk as ac,Rk as ad,C0 as ae,Pt as af,uk as ag,Ce as ah,ck as ai,Zk as aj,Ek as ak,jk as al,Ik as am,Nk as an,Tk as ao,Pk as ap,Q0 as aq,Dk as ar,rk as as,sn as at,S0 as au,J0 as av,dk as aw,Ak as ax,O0 as ay,V0 as az,Qk as b,av as b0,iv as b1,ik as b2,dv as b3,lv as b4,cv as b5,sv as b6,uv as b7,pv as b8,bv as b9,gv as ba,sk as bb,hv as bc,mv as bd,kv as be,mk as bf,Ok as bg,ek as c,ov as d,wk as e,vk as f,x as g,fv as h,M as i,ak as j,_e as k,bn as l,F as m,qk as n,ev as o,to as p,yk as q,H as r,Kk as s,K0 as t,fk as u,gk as v,P as w,xk as x,T0 as y,Ot as z};
