function pt(...o){if(o){let n=[];for(let e=0;e<o.length;e++){let t=o[e];if(!t)continue;let r=typeof t;if(r==="string"||r==="number")n.push(t);else if(r==="object"){let d=Array.isArray(t)?[pt(...t)]:Object.entries(t).map(([a,i])=>i?a:void 0);n=d.length?n.concat(d.filter(a=>!!a)):n}}return n.join(" ").trim()}}function bt(o,n){return o?o.classList?o.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(o.className):!1}function vn(o,n){if(o&&n){let e=t=>{bt(o,t)||(o.classList?o.classList.add(t):o.className+=" "+t)};[n].flat().filter(Boolean).forEach(t=>t.split(" ").forEach(e))}}function gt(){return window.innerWidth-document.documentElement.offsetWidth}function P0(o){typeof o=="string"?vn(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.setProperty(o.variableName,gt()+"px"),vn(document.body,o?.className||"p-overflow-hidden"))}function ft(o){if(o){let n=document.createElement("a");if(n.download!==void 0){let{name:e,src:t}=o;return n.setAttribute("href",t),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),!0}}return!1}function F0(o,n){let e=new Blob([o],{type:"application/csv;charset=utf-8;"});window.navigator.msSaveOrOpenBlob?navigator.msSaveOrOpenBlob(e,n+".csv"):ft({name:n+".csv",src:URL.createObjectURL(e)})||(o="data:text/csv;charset=utf-8,"+o,window.open(encodeURI(o)))}function wn(o,n){if(o&&n){let e=t=>{o.classList?o.classList.remove(t):o.className=o.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")};[n].flat().filter(Boolean).forEach(t=>t.split(" ").forEach(e))}}function N0(o){typeof o=="string"?wn(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.removeProperty(o.variableName),wn(document.body,o?.className||"p-overflow-hidden"))}function Xo(o){for(let n of document?.styleSheets)try{for(let e of n?.cssRules)for(let t of e?.style)if(o.test(t))return{name:t,value:e.style.getPropertyValue(t).trim()}}catch{}return null}function te(o){let n={width:0,height:0};if(o){let[e,t]=[o.style.visibility,o.style.display],r=o.getBoundingClientRect();o.style.visibility="hidden",o.style.display="block",n.width=r.width||o.offsetWidth,n.height=r.height||o.offsetHeight,o.style.display=t,o.style.visibility=e}return n}function re(){let o=window,n=document,e=n.documentElement,t=n.getElementsByTagName("body")[0],r=o.innerWidth||e.clientWidth||t.clientWidth,d=o.innerHeight||e.clientHeight||t.clientHeight;return{width:r,height:d}}function Ho(o){return o?Math.abs(o.scrollLeft):0}function ht(){let o=document.documentElement;return(window.pageXOffset||Ho(o))-(o.clientLeft||0)}function mt(){let o=document.documentElement;return(window.pageYOffset||o.scrollTop)-(o.clientTop||0)}function kt(o){return o?getComputedStyle(o).direction==="rtl":!1}function W0(o,n,e=!0){var t,r,d,a;if(o){let i=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:te(o),l=i.height,c=i.width,u=n.offsetHeight,g=n.offsetWidth,p=n.getBoundingClientRect(),b=mt(),h=ht(),w=re(),m,z,_="top";p.top+u+l>w.height?(m=p.top+b-l,_="bottom",m<0&&(m=b)):m=u+p.top+b,p.left+c>w.width?z=Math.max(0,p.left+h+g-c):z=p.left+h,kt(o)?o.style.insetInlineEnd=z+"px":o.style.insetInlineStart=z+"px",o.style.top=m+"px",o.style.transformOrigin=_,e&&(o.style.marginTop=_==="bottom"?`calc(${(r=(t=Xo(/-anchor-gutter$/))==null?void 0:t.value)!=null?r:"2px"} * -1)`:(a=(d=Xo(/-anchor-gutter$/))==null?void 0:d.value)!=null?a:"")}}function L0(o,n){o&&(typeof n=="string"?o.style.cssText=n:Object.entries(n||{}).forEach(([e,t])=>o.style[e]=t))}function U0(o,n){return o instanceof HTMLElement?o.offsetWidth:0}function Y0(o,n,e=!0,t=void 0){var r;if(o){let d=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:te(o),a=n.offsetHeight,i=n.getBoundingClientRect(),l=re(),c,u,g=t??"top";if(!t&&i.top+a+d.height>l.height?(c=-1*d.height,g="bottom",i.top+c<0&&(c=-1*i.top)):c=a,d.width>l.width?u=i.left*-1:i.left+d.width>l.width?u=(i.left+d.width-l.width)*-1:u=0,o.style.top=c+"px",o.style.insetInlineStart=u+"px",o.style.transformOrigin=g,e){let p=(r=Xo(/-anchor-gutter$/))==null?void 0:r.value;o.style.marginTop=g==="bottom"?`calc(${p??"2px"} * -1)`:p??""}}}function tn(o){if(o){let n=o.parentNode;return n&&n instanceof ShadowRoot&&n.host&&(n=n.host),n}return null}function M0(o){return!!(o!==null&&typeof o<"u"&&o.nodeName&&tn(o))}function oo(o){return typeof Element<"u"?o instanceof Element:o!==null&&typeof o=="object"&&o.nodeType===1&&typeof o.nodeName=="string"}function V0(){if(window.getSelection){let o=window.getSelection()||{};o.empty?o.empty():o.removeAllRanges&&o.rangeCount>0&&o.getRangeAt(0).getClientRects().length>0&&o.removeAllRanges()}}function ae(o,n={}){if(oo(o)){let e=(t,r)=>{var d,a;let i=(d=o?.$attrs)!=null&&d[t]?[(a=o?.$attrs)==null?void 0:a[t]]:[];return[r].flat().reduce((l,c)=>{if(c!=null){let u=typeof c;if(u==="string"||u==="number")l.push(c);else if(u==="object"){let g=Array.isArray(c)?e(t,c):Object.entries(c).map(([p,b])=>t==="style"&&(b||b===0)?`${p.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${b}`:b?p:void 0);l=g.length?l.concat(g.filter(p=>!!p)):l}}return l},i)};Object.entries(n).forEach(([t,r])=>{if(r!=null){let d=t.match(/^on(.+)/);d?o.addEventListener(d[1].toLowerCase(),r):t==="p-bind"||t==="pBind"?ae(o,r):(r=t==="class"?[...new Set(e("class",r))].join(" ").trim():t==="style"?e("style",r).join(";").trim():r,(o.$attrs=o.$attrs||{})&&(o.$attrs[t]=r),o.setAttribute(t,r))}})}}function X0(o,n={},...e){if(o){let t=document.createElement(o);return ae(t,n),t.append(...e),t}}function H0(o,n){if(o){o.style.opacity="0";let e=+new Date,t="0",r=function(){t=`${+o.style.opacity+(new Date().getTime()-e)/n}`,o.style.opacity=t,e=+new Date,+t<1&&("requestAnimationFrame"in window?requestAnimationFrame(r):setTimeout(r,16))};r()}}function vt(o,n){return oo(o)?Array.from(o.querySelectorAll(n)):[]}function wt(o,n){return oo(o)?o.matches(n)?o:o.querySelector(n):null}function G0(o,n){o&&document.activeElement!==o&&o.focus(n)}function K0(o,n){if(oo(o)){let e=o.getAttribute(n);return isNaN(e)?e==="true"||e==="false"?e==="true":e:+e}}function de(o,n=""){let e=vt(o,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${n},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`),t=[];for(let r of e)getComputedStyle(r).display!="none"&&getComputedStyle(r).visibility!="hidden"&&t.push(r);return t}function q0(o,n){let e=de(o,n);return e.length>0?e[0]:null}function J0(o){if(o){let n=o.offsetHeight,e=getComputedStyle(o);return n-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),n}return 0}function Q0(o){if(o){let[n,e]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let t=o.offsetHeight;return o.style.display=e,o.style.visibility=n,t}return 0}function om(o){if(o){let[n,e]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let t=o.offsetWidth;return o.style.display=e,o.style.visibility=n,t}return 0}function nm(o){var n;if(o){let e=(n=tn(o))==null?void 0:n.childNodes,t=0;if(e)for(let r=0;r<e.length;r++){if(e[r]===o)return t;e[r].nodeType===1&&t++}}return-1}function em(o,n){let e=de(o,n);return e.length>0?e[e.length-1]:null}function tm(o,n){let e=o.nextElementSibling;for(;e;){if(e.matches(n))return e;e=e.nextElementSibling}return null}function rm(o){if(o){let n=o.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||Ho(document.documentElement)||Ho(document.body)||0)}}return{top:"auto",left:"auto"}}function am(o,n){return o?o.offsetHeight:0}function ie(o,n=[]){let e=tn(o);return e===null?n:ie(e,n.concat([e]))}function dm(o,n){let e=o.previousElementSibling;for(;e;){if(e.matches(n))return e;e=e.previousElementSibling}return null}function im(o){let n=[];if(o){let e=ie(o),t=/(auto|scroll)/,r=d=>{try{let a=window.getComputedStyle(d,null);return t.test(a.getPropertyValue("overflow"))||t.test(a.getPropertyValue("overflowX"))||t.test(a.getPropertyValue("overflowY"))}catch{return!1}};for(let d of e){let a=d.nodeType===1&&d.dataset.scrollselectors;if(a){let i=a.split(",");for(let l of i){let c=wt(d,l);c&&r(c)&&n.push(c)}}d.nodeType!==9&&r(d)&&n.push(d)}}return n}function lm(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function cm(o){if(o){let n=o.offsetWidth,e=getComputedStyle(o);return n-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)+parseFloat(e.borderLeftWidth)+parseFloat(e.borderRightWidth),n}return 0}function sm(o,n,e){let t=o[n];typeof t=="function"&&t.apply(o,[])}function um(){return/(android)/i.test(navigator.userAgent)}function pm(o){if(o){let n=o.nodeName,e=o.parentElement&&o.parentElement.nodeName;return n==="INPUT"||n==="TEXTAREA"||n==="BUTTON"||n==="A"||e==="INPUT"||e==="TEXTAREA"||e==="BUTTON"||e==="A"||!!o.closest(".p-button, .p-checkbox, .p-radiobutton")}return!1}function bm(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function gm(o,n=""){return oo(o)?o.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}function fm(o){return!!(o&&o.offsetParent!=null)}function hm(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function mm(o,n="",e){oo(o)&&e!==null&&e!==void 0&&o.setAttribute(n,e)}function xt(){let o=new Map;return{on(n,e){let t=o.get(n);return t?t.push(e):t=[e],o.set(n,t),this},off(n,e){let t=o.get(n);return t&&t.splice(t.indexOf(e)>>>0,1),this},emit(n,e){let t=o.get(n);t&&t.forEach(r=>{r(e)})},clear(){o.clear()}}}var yt=Object.defineProperty,xn=Object.getOwnPropertySymbols,$t=Object.prototype.hasOwnProperty,zt=Object.prototype.propertyIsEnumerable,yn=(o,n,e)=>n in o?yt(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e,le=(o,n)=>{for(var e in n||(n={}))$t.call(n,e)&&yn(o,e,n[e]);if(xn)for(var e of xn(n))zt.call(n,e)&&yn(o,e,n[e]);return o};function M(o){return o==null||o===""||Array.isArray(o)&&o.length===0||!(o instanceof Date)&&typeof o=="object"&&Object.keys(o).length===0}function Ct(o,n,e,t=1){let r=-1,d=M(o),a=M(n);return d&&a?r=0:d?r=t:a?r=-t:typeof o=="string"&&typeof n=="string"?r=e(o,n):r=o<n?-1:o>n?1:0,r}function Go(o,n,e=new WeakSet){if(o===n)return!0;if(!o||!n||typeof o!="object"||typeof n!="object"||e.has(o)||e.has(n))return!1;e.add(o).add(n);let t=Array.isArray(o),r=Array.isArray(n),d,a,i;if(t&&r){if(a=o.length,a!=n.length)return!1;for(d=a;d--!==0;)if(!Go(o[d],n[d],e))return!1;return!0}if(t!=r)return!1;let l=o instanceof Date,c=n instanceof Date;if(l!=c)return!1;if(l&&c)return o.getTime()==n.getTime();let u=o instanceof RegExp,g=n instanceof RegExp;if(u!=g)return!1;if(u&&g)return o.toString()==n.toString();let p=Object.keys(o);if(a=p.length,a!==Object.keys(n).length)return!1;for(d=a;d--!==0;)if(!Object.prototype.hasOwnProperty.call(n,p[d]))return!1;for(d=a;d--!==0;)if(i=p[d],!Go(o[i],n[i],e))return!1;return!0}function _t(o,n){return Go(o,n)}function ce(o){return typeof o=="function"&&"call"in o&&"apply"in o}function y(o){return!M(o)}function $n(o,n){if(!o||!n)return null;try{let e=o[n];if(y(e))return e}catch{}if(Object.keys(o).length){if(ce(n))return n(o);if(n.indexOf(".")===-1)return o[n];{let e=n.split("."),t=o;for(let r=0,d=e.length;r<d;++r){if(t==null)return null;t=t[e[r]]}return t}}return null}function Bt(o,n,e){return e?$n(o,e)===$n(n,e):_t(o,n)}function km(o,n){if(o!=null&&n&&n.length){for(let e of n)if(Bt(o,e))return!0}return!1}function D(o,n=!0){return o instanceof Object&&o.constructor===Object&&(n||Object.keys(o).length!==0)}function se(o={},n={}){let e=le({},o);return Object.keys(n).forEach(t=>{let r=t;D(n[r])&&r in o&&D(o[r])?e[r]=se(o[r],n[r]):e[r]=n[r]}),e}function ue(...o){return o.reduce((n,e,t)=>t===0?e:se(n,e),{})}function vm(o,n){let e=-1;if(n){for(let t=0;t<n.length;t++)if(n[t]===o){e=t;break}}return e}function wm(o,n){let e=-1;if(y(o))try{e=o.findLastIndex(n)}catch{e=o.lastIndexOf([...o].reverse().find(n))}return e}function P(o,...n){return ce(o)?o(...n):o}function W(o,n=!0){return typeof o=="string"&&(n||o!=="")}function zn(o){return W(o)?o.replace(/(-|_)/g,"").toLowerCase():o}function Rt(o,n="",e={}){let t=zn(n).split("."),r=t.shift();if(r){if(D(o)){let d=Object.keys(o).find(a=>zn(a)===r)||"";return Rt(P(o[d],e),t.join("."),e)}return}return P(o,e)}function xm(o,n=!0){return Array.isArray(o)&&(n||o.length!==0)}function ym(o){return o instanceof Date}function St(o){return y(o)&&!isNaN(o)}function $m(o=""){return y(o)&&o.length===1&&!!o.match(/\S| /)}function zm(){return new Intl.Collator(void 0,{numeric:!0}).compare}function Y(o,n){if(n){let e=n.test(o);return n.lastIndex=0,e}return!1}function Cm(...o){return ue(...o)}function Cn(o){return o&&o.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":").trim()}function _m(o,...n){if(!D(o))return o;let e=le({},o);return n?.flat().forEach(t=>delete e[t]),e}function Bm(o){if(o&&/[\xC0-\xFF\u0100-\u017E]/.test(o)){let n={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let e in n)o=o.replace(n[e],e)}return o}function Rm(o,n,e){o&&n!==e&&(e>=o.length&&(e%=o.length,n%=o.length),o.splice(e,0,o.splice(n,1)[0]))}function Sm(o,n,e=1,t,r=1){let d=Ct(o,n,t,e),a=e;return(M(o)||M(n))&&(a=r===1?e:r),a*d}function Zm(o){return W(o,!1)?o[0].toUpperCase()+o.slice(1):o}function pe(o){return W(o)?o.replace(/(_)/g,"-").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():o}var Bo={};function Em(o="pui_id_"){return Object.hasOwn(Bo,o)||(Bo[o]=0),Bo[o]++,`${o}${Bo[o]}`}function Zt(){let o=[],n=(a,i,l=999)=>{let c=r(a,i,l),u=c.value+(c.key===a?0:l)+1;return o.push({key:a,value:u}),u},e=a=>{o=o.filter(i=>i.value!==a)},t=(a,i)=>r(a).value,r=(a,i,l=0)=>[...o].reverse().find(c=>!0)||{key:a,value:l},d=a=>a&&parseInt(a.style.zIndex,10)||0;return{get:d,set:(a,i,l)=>{i&&(i.style.zIndex=String(n(a,!0,l)))},clear:a=>{a&&(e(d(a)),a.style.zIndex="")},getCurrent:a=>t(a)}}var Im=Zt(),Et=Object.defineProperty,It=Object.defineProperties,Ot=Object.getOwnPropertyDescriptors,To=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable,_n=(o,n,e)=>n in o?Et(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e,O=(o,n)=>{for(var e in n||(n={}))be.call(n,e)&&_n(o,e,n[e]);if(To)for(var e of To(n))ge.call(n,e)&&_n(o,e,n[e]);return o},Mo=(o,n)=>It(o,Ot(n)),A=(o,n)=>{var e={};for(var t in o)be.call(o,t)&&n.indexOf(t)<0&&(e[t]=o[t]);if(o!=null&&To)for(var t of To(o))n.indexOf(t)<0&&ge.call(o,t)&&(e[t]=o[t]);return e};function Om(...o){return ue(...o)}var jt=xt(),U=jt,io=/{([^}]*)}/g,fe=/(\d+\s+[\+\-\*\/]\s+\d+)/g,he=/var\([^)]+\)/g;function Bn(o){return W(o)?o.replace(/[A-Z]/g,(n,e)=>e===0?n:"."+n.toLowerCase()).toLowerCase():o}function Dt(o){return D(o)&&o.hasOwnProperty("$value")&&o.hasOwnProperty("$type")?o.$value:o}function At(o){return o.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function Ko(o="",n=""){return At(`${W(o,!1)&&W(n,!1)?`${o}-`:o}${n}`)}function me(o="",n=""){return`--${Ko(o,n)}`}function Tt(o=""){let n=(o.match(/{/g)||[]).length,e=(o.match(/}/g)||[]).length;return(n+e)%2!==0}function ke(o,n="",e="",t=[],r){if(W(o)){let d=o.trim();if(Tt(d))return;if(Y(d,io)){let a=d.replaceAll(io,i=>{let l=i.replace(/{|}/g,"").split(".").filter(c=>!t.some(u=>Y(c,u)));return`var(${me(e,pe(l.join("-")))}${y(r)?`, ${r}`:""})`});return Y(a.replace(he,"0"),fe)?`calc(${a})`:a}return d}else if(St(o))return o}function Pt(o,n,e){W(n,!1)&&o.push(`${n}:${e};`)}function q(o,n){return o?`${o}{${n}}`:""}function ve(o,n){if(o.indexOf("dt(")===-1)return o;function e(a,i){let l=[],c=0,u="",g=null,p=0;for(;c<=a.length;){let b=a[c];if((b==='"'||b==="'"||b==="`")&&a[c-1]!=="\\"&&(g=g===b?null:b),!g&&(b==="("&&p++,b===")"&&p--,(b===","||c===a.length)&&p===0)){let h=u.trim();h.startsWith("dt(")?l.push(ve(h,i)):l.push(t(h)),u="",c++;continue}b!==void 0&&(u+=b),c++}return l}function t(a){let i=a[0];if((i==='"'||i==="'"||i==="`")&&a[a.length-1]===i)return a.slice(1,-1);let l=Number(a);return isNaN(l)?a:l}let r=[],d=[];for(let a=0;a<o.length;a++)if(o[a]==="d"&&o.slice(a,a+3)==="dt(")d.push(a),a+=2;else if(o[a]===")"&&d.length>0){let i=d.pop();d.length===0&&r.push([i,a])}if(!r.length)return o;for(let a=r.length-1;a>=0;a--){let[i,l]=r[a],c=o.slice(i+3,l),u=e(c,n),g=n(...u);o=o.slice(0,i)+g+o.slice(l+1)}return o}var jm=o=>{var n;let e=lo.getTheme(),t=qo(e,o,void 0,"variable"),r=(n=t?.match(/--[\w-]+/g))==null?void 0:n[0],d=qo(e,o,void 0,"value");return{name:r,variable:t,value:d}},ao=(...o)=>qo(lo.getTheme(),...o),qo=(o={},n,e,t)=>{if(n){let{variable:r,options:d}=lo.defaults||{},{prefix:a,transform:i}=o?.options||d||{},l=Y(n,io)?n:`{${n}}`;return t==="value"||M(t)&&i==="strict"?lo.getTokenValue(n):ke(l,void 0,a,[r.excludedKeyRegex],e)}return""};function Dm(o,...n){if(o instanceof Array){let e=o.reduce((t,r,d)=>{var a;return t+r+((a=P(n[d],{dt:ao}))!=null?a:"")},"");return ve(e,ao)}return P(o,{dt:ao})}function Ft(o,n={}){let e=lo.defaults.variable,{prefix:t=e.prefix,selector:r=e.selector,excludedKeyRegex:d=e.excludedKeyRegex}=n,a=[],i=[],l=[{node:o,path:t}];for(;l.length;){let{node:u,path:g}=l.pop();for(let p in u){let b=u[p],h=Dt(b),w=Y(p,d)?Ko(g):Ko(g,pe(p));if(D(h))l.push({node:h,path:w});else{let m=me(w),z=ke(h,w,t,[d]);Pt(i,m,z);let _=w;t&&_.startsWith(t+"-")&&(_=_.slice(t.length+1)),a.push(_.replace(/-/g,"."))}}}let c=i.join("");return{value:i,tokens:a,declarations:c,css:q(r,c)}}var I={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(o){return{type:"class",selector:o,matched:this.pattern.test(o.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(o){return{type:"attr",selector:`:root${o},:host${o}`,matched:this.pattern.test(o.trim())}}},media:{pattern:/^@media (.*)$/,resolve(o){return{type:"media",selector:o,matched:this.pattern.test(o.trim())}}},system:{pattern:/^system$/,resolve(o){return{type:"system",selector:"@media (prefers-color-scheme: dark)",matched:this.pattern.test(o.trim())}}},custom:{resolve(o){return{type:"custom",selector:o,matched:!0}}}},resolve(o){let n=Object.keys(this.rules).filter(e=>e!=="custom").map(e=>this.rules[e]);return[o].flat().map(e=>{var t;return(t=n.map(r=>r.resolve(e)).find(r=>r.matched))!=null?t:this.rules.custom.resolve(e)})}},_toVariables(o,n){return Ft(o,{prefix:n?.prefix})},getCommon({name:o="",theme:n={},params:e,set:t,defaults:r}){var d,a,i,l,c,u,g;let{preset:p,options:b}=n,h,w,m,z,_,B,R;if(y(p)&&b.transform!=="strict"){let{primitive:j,semantic:bo,extend:go}=p,no=bo||{},{colorScheme:fo}=no,ho=A(no,["colorScheme"]),mo=go||{},{colorScheme:ko}=mo,eo=A(mo,["colorScheme"]),to=fo||{},{dark:vo}=to,wo=A(to,["dark"]),xo=ko||{},{dark:yo}=xo,$o=A(xo,["dark"]),zo=y(j)?this._toVariables({primitive:j},b):{},Co=y(ho)?this._toVariables({semantic:ho},b):{},_o=y(wo)?this._toVariables({light:wo},b):{},fn=y(vo)?this._toVariables({dark:vo},b):{},hn=y(eo)?this._toVariables({semantic:eo},b):{},mn=y($o)?this._toVariables({light:$o},b):{},kn=y(yo)?this._toVariables({dark:yo},b):{},[He,Ge]=[(d=zo.declarations)!=null?d:"",zo.tokens],[Ke,qe]=[(a=Co.declarations)!=null?a:"",Co.tokens||[]],[Je,Qe]=[(i=_o.declarations)!=null?i:"",_o.tokens||[]],[ot,nt]=[(l=fn.declarations)!=null?l:"",fn.tokens||[]],[et,tt]=[(c=hn.declarations)!=null?c:"",hn.tokens||[]],[rt,at]=[(u=mn.declarations)!=null?u:"",mn.tokens||[]],[dt,it]=[(g=kn.declarations)!=null?g:"",kn.tokens||[]];h=this.transformCSS(o,He,"light","variable",b,t,r),w=Ge;let lt=this.transformCSS(o,`${Ke}${Je}`,"light","variable",b,t,r),ct=this.transformCSS(o,`${ot}`,"dark","variable",b,t,r);m=`${lt}${ct}`,z=[...new Set([...qe,...Qe,...nt])];let st=this.transformCSS(o,`${et}${rt}color-scheme:light`,"light","variable",b,t,r),ut=this.transformCSS(o,`${dt}color-scheme:dark`,"dark","variable",b,t,r);_=`${st}${ut}`,B=[...new Set([...tt,...at,...it])],R=P(p.css,{dt:ao})}return{primitive:{css:h,tokens:w},semantic:{css:m,tokens:z},global:{css:_,tokens:B},style:R}},getPreset({name:o="",preset:n={},options:e,params:t,set:r,defaults:d,selector:a}){var i,l,c;let u,g,p;if(y(n)&&e.transform!=="strict"){let b=o.replace("-directive",""),h=n,{colorScheme:w,extend:m,css:z}=h,_=A(h,["colorScheme","extend","css"]),B=m||{},{colorScheme:R}=B,j=A(B,["colorScheme"]),bo=w||{},{dark:go}=bo,no=A(bo,["dark"]),fo=R||{},{dark:ho}=fo,mo=A(fo,["dark"]),ko=y(_)?this._toVariables({[b]:O(O({},_),j)},e):{},eo=y(no)?this._toVariables({[b]:O(O({},no),mo)},e):{},to=y(go)?this._toVariables({[b]:O(O({},go),ho)},e):{},[vo,wo]=[(i=ko.declarations)!=null?i:"",ko.tokens||[]],[xo,yo]=[(l=eo.declarations)!=null?l:"",eo.tokens||[]],[$o,zo]=[(c=to.declarations)!=null?c:"",to.tokens||[]],Co=this.transformCSS(b,`${vo}${xo}`,"light","variable",e,r,d,a),_o=this.transformCSS(b,$o,"dark","variable",e,r,d,a);u=`${Co}${_o}`,g=[...new Set([...wo,...yo,...zo])],p=P(z,{dt:ao})}return{css:u,tokens:g,style:p}},getPresetC({name:o="",theme:n={},params:e,set:t,defaults:r}){var d;let{preset:a,options:i}=n,l=(d=a?.components)==null?void 0:d[o];return this.getPreset({name:o,preset:l,options:i,params:e,set:t,defaults:r})},getPresetD({name:o="",theme:n={},params:e,set:t,defaults:r}){var d,a;let i=o.replace("-directive",""),{preset:l,options:c}=n,u=((d=l?.components)==null?void 0:d[i])||((a=l?.directives)==null?void 0:a[i]);return this.getPreset({name:i,preset:u,options:c,params:e,set:t,defaults:r})},applyDarkColorScheme(o){return!(o.darkModeSelector==="none"||o.darkModeSelector===!1)},getColorSchemeOption(o,n){var e;return this.applyDarkColorScheme(o)?this.regex.resolve(o.darkModeSelector===!0?n.options.darkModeSelector:(e=o.darkModeSelector)!=null?e:n.options.darkModeSelector):[]},getLayerOrder(o,n={},e,t){let{cssLayer:r}=n;return r?`@layer ${P(r.order||r.name||"primeui",e)}`:""},getCommonStyleSheet({name:o="",theme:n={},params:e,props:t={},set:r,defaults:d}){let a=this.getCommon({name:o,theme:n,params:e,set:r,defaults:d}),i=Object.entries(t).reduce((l,[c,u])=>l.push(`${c}="${u}"`)&&l,[]).join(" ");return Object.entries(a||{}).reduce((l,[c,u])=>{if(D(u)&&Object.hasOwn(u,"css")){let g=Cn(u.css),p=`${c}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${p}" ${i}>${g}</style>`)}return l},[]).join("")},getStyleSheet({name:o="",theme:n={},params:e,props:t={},set:r,defaults:d}){var a;let i={name:o,theme:n,params:e,set:r,defaults:d},l=(a=o.includes("-directive")?this.getPresetD(i):this.getPresetC(i))==null?void 0:a.css,c=Object.entries(t).reduce((u,[g,p])=>u.push(`${g}="${p}"`)&&u,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${o}-variables" ${c}>${Cn(l)}</style>`:""},createTokens(o={},n,e="",t="",r={}){let d=function(i,l={},c=[]){if(c.includes(this.path))return console.warn(`Circular reference detected at ${this.path}`),{colorScheme:i,path:this.path,paths:l,value:void 0};c.push(this.path),l.name=this.path,l.binding||(l.binding={});let u=this.value;if(typeof this.value=="string"&&io.test(this.value)){let g=this.value.trim().replace(io,p=>{var b;let h=p.slice(1,-1),w=this.tokens[h];if(!w)return console.warn(`Token not found for path: ${h}`),"__UNRESOLVED__";let m=w.computed(i,l,c);return Array.isArray(m)&&m.length===2?`light-dark(${m[0].value},${m[1].value})`:(b=m?.value)!=null?b:"__UNRESOLVED__"});u=fe.test(g.replace(he,"0"))?`calc(${g})`:g}return M(l.binding)&&delete l.binding,c.pop(),{colorScheme:i,path:this.path,paths:l,value:u.includes("__UNRESOLVED__")?void 0:u}},a=(i,l,c)=>{Object.entries(i).forEach(([u,g])=>{let p=Y(u,n.variable.excludedKeyRegex)?l:l?`${l}.${Bn(u)}`:Bn(u),b=c?`${c}.${u}`:u;D(g)?a(g,p,b):(r[p]||(r[p]={paths:[],computed:(h,w={},m=[])=>{if(r[p].paths.length===1)return r[p].paths[0].computed(r[p].paths[0].scheme,w.binding,m);if(h&&h!=="none")for(let z=0;z<r[p].paths.length;z++){let _=r[p].paths[z];if(_.scheme===h)return _.computed(h,w.binding,m)}return r[p].paths.map(z=>z.computed(z.scheme,w[z.scheme],m))}}),r[p].paths.push({path:b,value:g,scheme:b.includes("colorScheme.light")?"light":b.includes("colorScheme.dark")?"dark":"none",computed:d,tokens:r}))})};return a(o,e,t),r},getTokenValue(o,n,e){var t;let r=(i=>i.split(".").filter(l=>!Y(l.toLowerCase(),e.variable.excludedKeyRegex)).join("."))(n),d=n.includes("colorScheme.light")?"light":n.includes("colorScheme.dark")?"dark":void 0,a=[(t=o[r])==null?void 0:t.computed(d)].flat().filter(i=>i);return a.length===1?a[0].value:a.reduce((i={},l)=>{let c=l,{colorScheme:u}=c,g=A(c,["colorScheme"]);return i[u]=g,i},void 0)},getSelectorRule(o,n,e,t){return e==="class"||e==="attr"?q(y(n)?`${o}${n},${o} ${n}`:o,t):q(o,q(n??":root,:host",t))},transformCSS(o,n,e,t,r={},d,a,i){if(y(n)){let{cssLayer:l}=r;if(t!=="style"){let c=this.getColorSchemeOption(r,a);n=e==="dark"?c.reduce((u,{type:g,selector:p})=>(y(p)&&(u+=p.includes("[CSS]")?p.replace("[CSS]",n):this.getSelectorRule(p,i,g,n)),u),""):q(i??":root,:host",n)}if(l){let c={name:"primeui"};D(l)&&(c.name=P(l.name,{name:o,type:t})),y(c.name)&&(n=q(`@layer ${c.name}`,n),d?.layerNames(c.name))}return n}return""}},lo={defaults:{variable:{prefix:"p",selector:":root,:host",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(o={}){let{theme:n}=o;n&&(this._theme=Mo(O({},n),{options:O(O({},this.defaults.options),n.options)}),this._tokens=I.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var o;return((o=this.theme)==null?void 0:o.preset)||{}},get options(){var o;return((o=this.theme)==null?void 0:o.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(o){this.update({theme:o}),U.emit("theme:change",o)},getPreset(){return this.preset},setPreset(o){this._theme=Mo(O({},this.theme),{preset:o}),this._tokens=I.createTokens(o,this.defaults),this.clearLoadedStyleNames(),U.emit("preset:change",o),U.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(o){this._theme=Mo(O({},this.theme),{options:o}),this.clearLoadedStyleNames(),U.emit("options:change",o),U.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(o){this._layerNames.add(o)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(o){return this._loadedStyleNames.has(o)},setLoadedStyleName(o){this._loadedStyleNames.add(o)},deleteLoadedStyleName(o){this._loadedStyleNames.delete(o)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(o){return I.getTokenValue(this.tokens,o,this.defaults)},getCommon(o="",n){return I.getCommon({name:o,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(o="",n){let e={name:o,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return I.getPresetC(e)},getDirective(o="",n){let e={name:o,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return I.getPresetD(e)},getCustomPreset(o="",n,e,t){let r={name:o,preset:n,options:this.options,selector:e,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return I.getPreset(r)},getLayerOrderCSS(o=""){return I.getLayerOrder(o,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(o="",n,e="style",t){return I.transformCSS(o,n,t,e,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(o="",n,e={}){return I.getCommonStyleSheet({name:o,theme:this.theme,params:n,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(o,n,e={}){return I.getStyleSheet({name:o,theme:this.theme,params:n,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(o){this._loadingStyles.add(o)},onStyleUpdated(o){this._loadingStyles.add(o)},onStyleLoaded(o,{name:n}){this._loadingStyles.size&&(this._loadingStyles.delete(n),U.emit(`theme:${n}:load`,o),!this._loadingStyles.size&&U.emit("theme:load"))}},Am=`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    /* Non vue overlay animations */
    .p-connected-overlay {
        opacity: 0;
        transform: scaleY(0.8);
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-connected-overlay-visible {
        opacity: 1;
        transform: scaleY(1);
    }

    .p-connected-overlay-hidden {
        opacity: 0;
        transform: scaleY(1);
        transition: opacity 0.1s linear;
    }

    /* Vue based overlay animations */
    .p-connected-overlay-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-connected-overlay-leave-to {
        opacity: 0;
    }

    .p-connected-overlay-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-connected-overlay-leave-active {
        transition: opacity 0.1s linear;
    }

    /* Toggleable Content */
    .p-toggleable-content-enter-from,
    .p-toggleable-content-leave-to {
        max-height: 0;
    }

    .p-toggleable-content-enter-to,
    .p-toggleable-content-leave-from {
        max-height: 1000px;
    }

    .p-toggleable-content-leave-active {
        overflow: hidden;
        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
    }

    .p-toggleable-content-enter-active {
        overflow: hidden;
        transition: max-height 1s ease-in-out;
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
        background: dt('mask.background');
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter {
        animation: p-overlay-mask-enter-animation dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave {
        animation: p-overlay-mask-leave-animation dt('mask.transition.duration') forwards;
    }

    @keyframes p-overlay-mask-enter-animation {
        from {
            background: transparent;
        }
        to {
            background: dt('mask.background');
        }
    }
    @keyframes p-overlay-mask-leave-animation {
        from {
            background: dt('mask.background');
        }
        to {
            background: transparent;
        }
    }
`,Tm=`
    .p-toast {
        width: dt('toast.width');
        white-space: pre-line;
        word-break: break-word;
    }

    .p-toast-message {
        margin: 0 0 1rem 0;
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

    .p-toast-message-enter-from {
        opacity: 0;
        transform: translateY(50%);
    }

    .p-toast-message-leave-from {
        max-height: 1000px;
    }

    .p-toast .p-toast-message.p-toast-message-leave-to {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
        overflow: hidden;
    }

    .p-toast-message-enter-active {
        transition:
            transform 0.3s,
            opacity 0.3s;
    }

    .p-toast-message-leave-active {
        transition:
            max-height 0.45s cubic-bezier(0, 1, 0, 1),
            opacity 0.3s,
            margin-bottom 0.3s;
    }
`,Pm=`
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
`,Fm=`
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
`,Nm=`
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
`,Wm=`
    .p-dialog {
        max-height: 90%;
        transform: scale(1);
        border-radius: dt('dialog.border.radius');
        box-shadow: dt('dialog.shadow');
        background: dt('dialog.background');
        border: 1px solid dt('dialog.border.color');
        color: dt('dialog.color');
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

    .p-dialog-enter-active {
        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .p-dialog-leave-active {
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-dialog-enter-from,
    .p-dialog-leave-to {
        opacity: 0;
        transform: scale(0.7);
    }

    .p-dialog-top .p-dialog,
    .p-dialog-bottom .p-dialog,
    .p-dialog-left .p-dialog,
    .p-dialog-right .p-dialog,
    .p-dialog-topleft .p-dialog,
    .p-dialog-topright .p-dialog,
    .p-dialog-bottomleft .p-dialog,
    .p-dialog-bottomright .p-dialog {
        margin: 0.75rem;
        transform: translate3d(0px, 0px, 0px);
    }

    .p-dialog-top .p-dialog-enter-active,
    .p-dialog-top .p-dialog-leave-active,
    .p-dialog-bottom .p-dialog-enter-active,
    .p-dialog-bottom .p-dialog-leave-active,
    .p-dialog-left .p-dialog-enter-active,
    .p-dialog-left .p-dialog-leave-active,
    .p-dialog-right .p-dialog-enter-active,
    .p-dialog-right .p-dialog-leave-active,
    .p-dialog-topleft .p-dialog-enter-active,
    .p-dialog-topleft .p-dialog-leave-active,
    .p-dialog-topright .p-dialog-enter-active,
    .p-dialog-topright .p-dialog-leave-active,
    .p-dialog-bottomleft .p-dialog-enter-active,
    .p-dialog-bottomleft .p-dialog-leave-active,
    .p-dialog-bottomright .p-dialog-enter-active,
    .p-dialog-bottomright .p-dialog-leave-active {
        transition: all 0.3s ease-out;
    }

    .p-dialog-top .p-dialog-enter-from,
    .p-dialog-top .p-dialog-leave-to {
        transform: translate3d(0px, -100%, 0px);
    }

    .p-dialog-bottom .p-dialog-enter-from,
    .p-dialog-bottom .p-dialog-leave-to {
        transform: translate3d(0px, 100%, 0px);
    }

    .p-dialog-left .p-dialog-enter-from,
    .p-dialog-left .p-dialog-leave-to,
    .p-dialog-topleft .p-dialog-enter-from,
    .p-dialog-topleft .p-dialog-leave-to,
    .p-dialog-bottomleft .p-dialog-enter-from,
    .p-dialog-bottomleft .p-dialog-leave-to {
        transform: translate3d(-100%, 0px, 0px);
    }

    .p-dialog-right .p-dialog-enter-from,
    .p-dialog-right .p-dialog-leave-to,
    .p-dialog-topright .p-dialog-enter-from,
    .p-dialog-topright .p-dialog-leave-to,
    .p-dialog-bottomright .p-dialog-enter-from,
    .p-dialog-bottomright .p-dialog-leave-to {
        transform: translate3d(100%, 0px, 0px);
    }

    .p-dialog-left:dir(rtl) .p-dialog-enter-from,
    .p-dialog-left:dir(rtl) .p-dialog-leave-to,
    .p-dialog-topleft:dir(rtl) .p-dialog-enter-from,
    .p-dialog-topleft:dir(rtl) .p-dialog-leave-to,
    .p-dialog-bottomleft:dir(rtl) .p-dialog-enter-from,
    .p-dialog-bottomleft:dir(rtl) .p-dialog-leave-to {
        transform: translate3d(100%, 0px, 0px);
    }

    .p-dialog-right:dir(rtl) .p-dialog-enter-from,
    .p-dialog-right:dir(rtl) .p-dialog-leave-to,
    .p-dialog-topright:dir(rtl) .p-dialog-enter-from,
    .p-dialog-topright:dir(rtl) .p-dialog-leave-to,
    .p-dialog-bottomright:dir(rtl) .p-dialog-enter-from,
    .p-dialog-bottomright:dir(rtl) .p-dialog-leave-to {
        transform: translate3d(-100%, 0px, 0px);
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
`,Lm=`
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
`,Um=`
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
`,Ym=`
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
`,Mm=`
    .p-popover {
        margin-block-start: dt('popover.gutter');
        background: dt('popover.background');
        color: dt('popover.color');
        border: 1px solid dt('popover.border.color');
        border-radius: dt('popover.border.radius');
        box-shadow: dt('popover.shadow');
    }

    .p-popover-content {
        padding: dt('popover.content.padding');
    }

    .p-popover-flipped {
        margin-block-start: calc(dt('popover.gutter') * -1);
        margin-block-end: dt('popover.gutter');
    }

    .p-popover-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-popover-leave-to {
        opacity: 0;
    }

    .p-popover-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-popover-leave-active {
        transition: opacity 0.1s linear;
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
`,Nt={transitionDuration:"{transition.duration}"},Wt={borderWidth:"0 0 1px 0",borderColor:"{content.border.color}"},Lt={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}",padding:"1.125rem",fontWeight:"600",borderRadius:"0",borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",hoverBackground:"{content.background}",activeBackground:"{content.background}",activeHoverBackground:"{content.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},toggleIcon:{color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}"},first:{topBorderRadius:"{content.border.radius}",borderWidth:"0"},last:{bottomBorderRadius:"{content.border.radius}",activeBottomBorderRadius:"0"}},Ut={borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",color:"{text.color}",padding:"0 1.125rem 1.125rem 1.125rem"},Yt={root:Nt,panel:Wt,header:Lt,content:Ut},Mt={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},Vt={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Xt={padding:"{list.padding}",gap:"{list.gap}"},Ht={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},Gt={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},Kt={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},qt={borderRadius:"{border.radius.sm}"},Jt={padding:"{list.option.padding}"},Qt={light:{chip:{focusBackground:"{surface.200}",focusColor:"{surface.800}"},dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",focusColor:"{surface.0}"},dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"}}},or={root:Mt,overlay:Vt,list:Xt,option:Ht,optionGroup:Gt,dropdown:Kt,chip:qt,emptyMessage:Jt,colorScheme:Qt},nr={width:"2rem",height:"2rem",fontSize:"1rem",background:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},er={size:"1rem"},tr={borderColor:"{content.background}",offset:"-0.75rem"},rr={width:"3rem",height:"3rem",fontSize:"1.5rem",icon:{size:"1.5rem"},group:{offset:"-1rem"}},ar={width:"4rem",height:"4rem",fontSize:"2rem",icon:{size:"2rem"},group:{offset:"-1.5rem"}},dr={root:nr,icon:er,group:tr,lg:rr,xl:ar},ir={borderRadius:"{border.radius.md}",padding:"0 0.5rem",fontSize:"0.75rem",fontWeight:"700",minWidth:"1.5rem",height:"1.5rem"},lr={size:"0.5rem"},cr={fontSize:"0.625rem",minWidth:"1.25rem",height:"1.25rem"},sr={fontSize:"0.875rem",minWidth:"1.75rem",height:"1.75rem"},ur={fontSize:"1rem",minWidth:"2rem",height:"2rem"},pr={light:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.500}",color:"{surface.0}"},info:{background:"{sky.500}",color:"{surface.0}"},warn:{background:"{orange.500}",color:"{surface.0}"},danger:{background:"{red.500}",color:"{surface.0}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"{green.400}",color:"{green.950}"},info:{background:"{sky.400}",color:"{sky.950}"},warn:{background:"{orange.400}",color:"{orange.950}"},danger:{background:"{red.400}",color:"{red.950}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},br={root:ir,dot:lr,sm:cr,lg:sr,xl:ur,colorScheme:pr},gr={borderRadius:{none:"0",xs:"2px",sm:"4px",md:"6px",lg:"8px",xl:"12px"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"}},fr={transitionDuration:"0.2s",focusRing:{width:"1px",style:"solid",color:"{primary.color}",offset:"2px",shadow:"none"},disabledOpacity:"0.6",iconSize:"1rem",anchorGutter:"2px",primary:{50:"{emerald.50}",100:"{emerald.100}",200:"{emerald.200}",300:"{emerald.300}",400:"{emerald.400}",500:"{emerald.500}",600:"{emerald.600}",700:"{emerald.700}",800:"{emerald.800}",900:"{emerald.900}",950:"{emerald.950}"},formField:{paddingX:"0.75rem",paddingY:"0.5rem",sm:{fontSize:"0.875rem",paddingX:"0.625rem",paddingY:"0.375rem"},lg:{fontSize:"1.125rem",paddingX:"0.875rem",paddingY:"0.625rem"},borderRadius:"{border.radius.md}",focusRing:{width:"0",style:"none",color:"transparent",offset:"0",shadow:"none"},transitionDuration:"{transition.duration}"},list:{padding:"0.25rem 0.25rem",gap:"2px",header:{padding:"0.5rem 1rem 0.25rem 1rem"},option:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}"},optionGroup:{padding:"0.5rem 0.75rem",fontWeight:"600"}},content:{borderRadius:"{border.radius.md}"},mask:{transitionDuration:"0.15s"},navigation:{list:{padding:"0.25rem 0.25rem",gap:"2px"},item:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}",gap:"0.5rem"},submenuLabel:{padding:"0.5rem 0.75rem",fontWeight:"600"},submenuIcon:{size:"0.875rem"}},overlay:{select:{borderRadius:"{border.radius.md}",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},popover:{borderRadius:"{border.radius.md}",padding:"0.75rem",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},modal:{borderRadius:"{border.radius.xl}",padding:"1.25rem",shadow:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"},navigation:{shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"}},colorScheme:{light:{surface:{0:"#ffffff",50:"{slate.50}",100:"{slate.100}",200:"{slate.200}",300:"{slate.300}",400:"{slate.400}",500:"{slate.500}",600:"{slate.600}",700:"{slate.700}",800:"{slate.800}",900:"{slate.900}",950:"{slate.950}"},primary:{color:"{primary.500}",contrastColor:"#ffffff",hoverColor:"{primary.600}",activeColor:"{primary.700}"},highlight:{background:"{primary.50}",focusBackground:"{primary.100}",color:"{primary.700}",focusColor:"{primary.800}"},mask:{background:"rgba(0,0,0,0.4)",color:"{surface.200}"},formField:{background:"{surface.0}",disabledBackground:"{surface.200}",filledBackground:"{surface.50}",filledHoverBackground:"{surface.50}",filledFocusBackground:"{surface.50}",borderColor:"{surface.300}",hoverBorderColor:"{surface.400}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.400}",color:"{surface.700}",disabledColor:"{surface.500}",placeholderColor:"{surface.500}",invalidPlaceholderColor:"{red.600}",floatLabelColor:"{surface.500}",floatLabelFocusColor:"{primary.600}",floatLabelActiveColor:"{surface.500}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.700}",hoverColor:"{surface.800}",mutedColor:"{surface.500}",hoverMutedColor:"{surface.600}"},content:{background:"{surface.0}",hoverBackground:"{surface.100}",borderColor:"{surface.200}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},popover:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},modal:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.100}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.100}",activeBackground:"{surface.100}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}}},dark:{surface:{0:"#ffffff",50:"{zinc.50}",100:"{zinc.100}",200:"{zinc.200}",300:"{zinc.300}",400:"{zinc.400}",500:"{zinc.500}",600:"{zinc.600}",700:"{zinc.700}",800:"{zinc.800}",900:"{zinc.900}",950:"{zinc.950}"},primary:{color:"{primary.400}",contrastColor:"{surface.900}",hoverColor:"{primary.300}",activeColor:"{primary.200}"},highlight:{background:"color-mix(in srgb, {primary.400}, transparent 84%)",focusBackground:"color-mix(in srgb, {primary.400}, transparent 76%)",color:"rgba(255,255,255,.87)",focusColor:"rgba(255,255,255,.87)"},mask:{background:"rgba(0,0,0,0.6)",color:"{surface.200}"},formField:{background:"{surface.950}",disabledBackground:"{surface.700}",filledBackground:"{surface.800}",filledHoverBackground:"{surface.800}",filledFocusBackground:"{surface.800}",borderColor:"{surface.600}",hoverBorderColor:"{surface.500}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.300}",color:"{surface.0}",disabledColor:"{surface.400}",placeholderColor:"{surface.400}",invalidPlaceholderColor:"{red.400}",floatLabelColor:"{surface.400}",floatLabelFocusColor:"{primary.color}",floatLabelActiveColor:"{surface.400}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.0}",hoverColor:"{surface.0}",mutedColor:"{surface.400}",hoverMutedColor:"{surface.300}"},content:{background:"{surface.900}",hoverBackground:"{surface.800}",borderColor:"{surface.700}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},popover:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},modal:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.800}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.800}",activeBackground:"{surface.800}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}}}}},hr={primitive:gr,semantic:fr},mr={borderRadius:"{content.border.radius}"},kr={root:mr},vr={padding:"1rem",background:"{content.background}",gap:"0.5rem",transitionDuration:"{transition.duration}"},wr={color:"{text.muted.color}",hoverColor:"{text.color}",borderRadius:"{content.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",hoverColor:"{navigation.item.icon.focus.color}"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},xr={color:"{navigation.item.icon.color}"},yr={root:vr,item:wr,separator:xr},$r={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",gap:"0.5rem",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",iconOnlyWidth:"2.5rem",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}",iconOnlyWidth:"2rem"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}",iconOnlyWidth:"3rem"},label:{fontWeight:"500"},raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"},badgeSize:"1rem",transitionDuration:"{form.field.transition.duration}"},zr={light:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",borderColor:"{surface.100}",hoverBorderColor:"{surface.200}",activeBorderColor:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}",focusRing:{color:"{surface.600}",shadow:"none"}},info:{background:"{sky.500}",hoverBackground:"{sky.600}",activeBackground:"{sky.700}",borderColor:"{sky.500}",hoverBorderColor:"{sky.600}",activeBorderColor:"{sky.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{sky.500}",shadow:"none"}},success:{background:"{green.500}",hoverBackground:"{green.600}",activeBackground:"{green.700}",borderColor:"{green.500}",hoverBorderColor:"{green.600}",activeBorderColor:"{green.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{green.500}",shadow:"none"}},warn:{background:"{orange.500}",hoverBackground:"{orange.600}",activeBackground:"{orange.700}",borderColor:"{orange.500}",hoverBorderColor:"{orange.600}",activeBorderColor:"{orange.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{orange.500}",shadow:"none"}},help:{background:"{purple.500}",hoverBackground:"{purple.600}",activeBackground:"{purple.700}",borderColor:"{purple.500}",hoverBorderColor:"{purple.600}",activeBorderColor:"{purple.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{purple.500}",shadow:"none"}},danger:{background:"{red.500}",hoverBackground:"{red.600}",activeBackground:"{red.700}",borderColor:"{red.500}",hoverBorderColor:"{red.600}",activeBorderColor:"{red.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{red.500}",shadow:"none"}},contrast:{background:"{surface.950}",hoverBackground:"{surface.900}",activeBackground:"{surface.800}",borderColor:"{surface.950}",hoverBorderColor:"{surface.900}",activeBorderColor:"{surface.800}",color:"{surface.0}",hoverColor:"{surface.0}",activeColor:"{surface.0}",focusRing:{color:"{surface.950}",shadow:"none"}}},outlined:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",borderColor:"{primary.200}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",borderColor:"{green.200}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",borderColor:"{sky.200}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",borderColor:"{orange.200}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",borderColor:"{purple.200}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",borderColor:"{red.200}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.700}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.700}"}},text:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.700}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}},dark:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",borderColor:"{surface.800}",hoverBorderColor:"{surface.700}",activeBorderColor:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}",focusRing:{color:"{surface.300}",shadow:"none"}},info:{background:"{sky.400}",hoverBackground:"{sky.300}",activeBackground:"{sky.200}",borderColor:"{sky.400}",hoverBorderColor:"{sky.300}",activeBorderColor:"{sky.200}",color:"{sky.950}",hoverColor:"{sky.950}",activeColor:"{sky.950}",focusRing:{color:"{sky.400}",shadow:"none"}},success:{background:"{green.400}",hoverBackground:"{green.300}",activeBackground:"{green.200}",borderColor:"{green.400}",hoverBorderColor:"{green.300}",activeBorderColor:"{green.200}",color:"{green.950}",hoverColor:"{green.950}",activeColor:"{green.950}",focusRing:{color:"{green.400}",shadow:"none"}},warn:{background:"{orange.400}",hoverBackground:"{orange.300}",activeBackground:"{orange.200}",borderColor:"{orange.400}",hoverBorderColor:"{orange.300}",activeBorderColor:"{orange.200}",color:"{orange.950}",hoverColor:"{orange.950}",activeColor:"{orange.950}",focusRing:{color:"{orange.400}",shadow:"none"}},help:{background:"{purple.400}",hoverBackground:"{purple.300}",activeBackground:"{purple.200}",borderColor:"{purple.400}",hoverBorderColor:"{purple.300}",activeBorderColor:"{purple.200}",color:"{purple.950}",hoverColor:"{purple.950}",activeColor:"{purple.950}",focusRing:{color:"{purple.400}",shadow:"none"}},danger:{background:"{red.400}",hoverBackground:"{red.300}",activeBackground:"{red.200}",borderColor:"{red.400}",hoverBorderColor:"{red.300}",activeBorderColor:"{red.200}",color:"{red.950}",hoverColor:"{red.950}",activeColor:"{red.950}",focusRing:{color:"{red.400}",shadow:"none"}},contrast:{background:"{surface.0}",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{surface.0}",hoverBorderColor:"{surface.100}",activeBorderColor:"{surface.200}",color:"{surface.950}",hoverColor:"{surface.950}",activeColor:"{surface.950}",focusRing:{color:"{surface.0}",shadow:"none"}}},outlined:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",borderColor:"{primary.700}",color:"{primary.color}"},secondary:{hoverBackground:"rgba(255,255,255,0.04)",activeBackground:"rgba(255,255,255,0.16)",borderColor:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",borderColor:"{green.700}",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",borderColor:"{sky.700}",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",borderColor:"{orange.700}",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",borderColor:"{purple.700}",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",borderColor:"{red.700}",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.500}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.600}",color:"{surface.0}"}},text:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",color:"{primary.color}"},secondary:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}}},Cr={root:$r,colorScheme:zr},_r={background:"{content.background}",borderRadius:"{border.radius.xl}",color:"{content.color}",shadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"},Br={padding:"1.25rem",gap:"0.5rem"},Rr={gap:"0.5rem"},Sr={fontSize:"1.25rem",fontWeight:"500"},Zr={color:"{text.muted.color}"},Er={root:_r,body:Br,caption:Rr,title:Sr,subtitle:Zr},Ir={transitionDuration:"{transition.duration}"},Or={gap:"0.25rem"},jr={padding:"1rem",gap:"0.5rem"},Dr={width:"2rem",height:"0.5rem",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ar={light:{indicator:{background:"{surface.200}",hoverBackground:"{surface.300}",activeBackground:"{primary.color}"}},dark:{indicator:{background:"{surface.700}",hoverBackground:"{surface.600}",activeBackground:"{primary.color}"}}},Tr={root:Ir,content:Or,indicatorList:jr,indicator:Dr,colorScheme:Ar},Pr={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Fr={width:"2.5rem",color:"{form.field.icon.color}"},Nr={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Wr={padding:"{list.padding}",gap:"{list.gap}",mobileIndent:"1rem"},Lr={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",icon:{color:"{list.option.icon.color}",focusColor:"{list.option.icon.focus.color}",size:"0.875rem"}},Ur={color:"{form.field.icon.color}"},Yr={root:Pr,dropdown:Fr,overlay:Nr,list:Wr,option:Lr,clearIcon:Ur},Mr={borderRadius:"{border.radius.sm}",width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},Vr={size:"0.875rem",color:"{form.field.color}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.75rem"},lg:{size:"1rem"}},Xr={root:Mr,icon:Vr},Hr={borderRadius:"16px",paddingX:"0.75rem",paddingY:"0.5rem",gap:"0.5rem",transitionDuration:"{transition.duration}"},Gr={width:"2rem",height:"2rem"},Kr={size:"1rem"},qr={size:"1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"}},Jr={light:{root:{background:"{surface.100}",color:"{surface.800}"},icon:{color:"{surface.800}"},removeIcon:{color:"{surface.800}"}},dark:{root:{background:"{surface.800}",color:"{surface.0}"},icon:{color:"{surface.0}"},removeIcon:{color:"{surface.0}"}}},Qr={root:Hr,image:Gr,icon:Kr,removeIcon:qr,colorScheme:Jr},oa={transitionDuration:"{transition.duration}"},na={width:"1.5rem",height:"1.5rem",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ea={shadow:"{overlay.popover.shadow}",borderRadius:"{overlay.popover.borderRadius}"},ta={light:{panel:{background:"{surface.800}",borderColor:"{surface.900}"},handle:{color:"{surface.0}"}},dark:{panel:{background:"{surface.900}",borderColor:"{surface.700}"},handle:{color:"{surface.0}"}}},ra={root:oa,preview:na,panel:ea,colorScheme:ta},aa={size:"2rem",color:"{overlay.modal.color}"},da={gap:"1rem"},ia={icon:aa,content:da},la={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},ca={padding:"{overlay.popover.padding}",gap:"1rem"},sa={size:"1.5rem",color:"{overlay.popover.color}"},ua={gap:"0.5rem",padding:"0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}"},pa={root:la,content:ca,icon:sa,footer:ua},ba={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},ga={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},fa={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},ha={mobileIndent:"1rem"},ma={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},ka={borderColor:"{content.border.color}"},va={root:ba,list:ga,item:fa,submenu:ha,submenuIcon:ma,separator:ka},wa={transitionDuration:"{transition.duration}"},xa={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},ya={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{datatable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},$a={fontWeight:"600"},za={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Ca={borderColor:"{datatable.border.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},_a={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Ba={fontWeight:"600"},Ra={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},Sa={color:"{primary.color}"},Za={width:"0.5rem"},Ea={width:"1px",color:"{primary.color}"},Ia={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},Oa={size:"2rem"},ja={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Da={inlineGap:"0.5rem",overlaySelect:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},overlayPopover:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}",gap:"0.5rem"},rule:{borderColor:"{content.border.color}"},constraintList:{padding:"{list.padding}",gap:"{list.gap}"},constraint:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",separator:{borderColor:"{content.border.color}"},padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"}},Aa={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},Ta={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},Pa={light:{root:{borderColor:"{content.border.color}"},row:{stripedBackground:"{surface.50}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},row:{stripedBackground:"{surface.950}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},Fa={root:wa,header:xa,headerCell:ya,columnTitle:$a,row:za,bodyCell:Ca,footerCell:_a,columnFooter:Ba,footer:Ra,dropPoint:Sa,columnResizer:Za,resizeIndicator:Ea,sortIcon:Ia,loadingIcon:Oa,rowToggleButton:ja,filter:Da,paginatorTop:Aa,paginatorBottom:Ta,colorScheme:Pa},Na={borderColor:"transparent",borderWidth:"0",borderRadius:"0",padding:"0"},Wa={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",borderRadius:"0"},La={background:"{content.background}",color:"{content.color}",borderColor:"transparent",borderWidth:"0",padding:"0",borderRadius:"0"},Ua={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"1px 0 0 0",padding:"0.75rem 1rem",borderRadius:"0"},Ya={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},Ma={borderColor:"{content.border.color}",borderWidth:"1px 0 0 0"},Va={root:Na,header:Wa,content:La,footer:Ua,paginatorTop:Ya,paginatorBottom:Ma},Xa={transitionDuration:"{transition.duration}"},Ha={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}"},Ga={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",padding:"0 0 0.5rem 0"},Ka={gap:"0.5rem",fontWeight:"500"},qa={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ja={color:"{form.field.icon.color}"},Qa={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},od={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},nd={borderColor:"{content.border.color}",gap:"{overlay.popover.padding}"},ed={margin:"0.5rem 0 0 0"},td={padding:"0.25rem",fontWeight:"500",color:"{content.color}"},rd={hoverBackground:"{content.hover.background}",selectedBackground:"{primary.color}",rangeSelectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{primary.contrast.color}",rangeSelectedColor:"{highlight.color}",width:"2rem",height:"2rem",borderRadius:"50%",padding:"0.25rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ad={margin:"0.5rem 0 0 0"},dd={padding:"0.375rem",borderRadius:"{content.border.radius}"},id={margin:"0.5rem 0 0 0"},ld={padding:"0.375rem",borderRadius:"{content.border.radius}"},cd={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}"},sd={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}",gap:"0.5rem",buttonGap:"0.25rem"},ud={light:{dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"},today:{background:"{surface.200}",color:"{surface.900}"}},dark:{dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"},today:{background:"{surface.700}",color:"{surface.0}"}}},pd={root:Xa,panel:Ha,header:Ga,title:Ka,dropdown:qa,inputIcon:Ja,selectMonth:Qa,selectYear:od,group:nd,dayView:ed,weekDay:td,date:rd,monthView:ad,month:dd,yearView:id,year:ld,buttonbar:cd,timePicker:sd,colorScheme:ud},bd={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",borderRadius:"{overlay.modal.border.radius}",shadow:"{overlay.modal.shadow}"},gd={padding:"{overlay.modal.padding}",gap:"0.5rem"},fd={fontSize:"1.25rem",fontWeight:"600"},hd={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},md={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}",gap:"0.5rem"},kd={root:bd,header:gd,title:fd,content:hd,footer:md},vd={borderColor:"{content.border.color}"},wd={background:"{content.background}",color:"{text.color}"},xd={margin:"1rem 0",padding:"0 1rem",content:{padding:"0 0.5rem"}},yd={margin:"0 1rem",padding:"0.5rem 0",content:{padding:"0.5rem 0"}},$d={root:vd,content:wd,horizontal:xd,vertical:yd},zd={background:"rgba(255, 255, 255, 0.1)",borderColor:"rgba(255, 255, 255, 0.2)",padding:"0.5rem",borderRadius:"{border.radius.xl}"},Cd={borderRadius:"{content.border.radius}",padding:"0.5rem",size:"3rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},_d={root:zd,item:Cd},Bd={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",shadow:"{overlay.modal.shadow}"},Rd={padding:"{overlay.modal.padding}"},Sd={fontSize:"1.5rem",fontWeight:"600"},Zd={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},Ed={padding:"{overlay.modal.padding}"},Id={root:Bd,header:Rd,title:Sd,content:Zd,footer:Ed},Od={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}"},jd={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},Dd={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}",padding:"{list.padding}"},Ad={focusBackground:"{list.option.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},Td={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},Pd={toolbar:Od,toolbarItem:jd,overlay:Dd,overlayOption:Ad,content:Td},Fd={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",padding:"0 1.125rem 1.125rem 1.125rem",transitionDuration:"{transition.duration}"},Nd={background:"{content.background}",hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",borderRadius:"{content.border.radius}",borderWidth:"1px",borderColor:"transparent",padding:"0.5rem 0.75rem",gap:"0.5rem",fontWeight:"600",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Wd={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}"},Ld={padding:"0"},Ud={root:Fd,legend:Nd,toggleIcon:Wd,content:Ld},Yd={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},Md={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"unset",borderWidth:"0",borderRadius:"0",gap:"0.5rem"},Vd={highlightBorderColor:"{primary.color}",padding:"0 1.125rem 1.125rem 1.125rem",gap:"1rem"},Xd={padding:"1rem",gap:"1rem",borderColor:"{content.border.color}",info:{gap:"0.5rem"}},Hd={gap:"0.5rem"},Gd={height:"0.25rem"},Kd={gap:"0.5rem"},qd={root:Yd,header:Md,content:Vd,file:Xd,fileList:Hd,progressbar:Gd,basic:Kd},Jd={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",activeColor:"{form.field.float.label.active.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",positionY:"{form.field.padding.y}",fontWeight:"500",active:{fontSize:"0.75rem",fontWeight:"400"}},Qd={active:{top:"-1.25rem"}},oi={input:{paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},active:{top:"{form.field.padding.y}"}},ni={borderRadius:"{border.radius.xs}",active:{background:"{form.field.background}",padding:"0 0.125rem"}},ei={root:Jd,over:Qd,in:oi,on:ni},ti={borderWidth:"1px",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},ri={background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.100}",hoverColor:"{surface.0}",size:"3rem",gutter:"0.5rem",prev:{borderRadius:"50%"},next:{borderRadius:"50%"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ai={size:"1.5rem"},di={background:"{content.background}",padding:"1rem 0.25rem"},ii={size:"2rem",borderRadius:"{content.border.radius}",gutter:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},li={size:"1rem"},ci={background:"rgba(0, 0, 0, 0.5)",color:"{surface.100}",padding:"1rem"},si={gap:"0.5rem",padding:"1rem"},ui={width:"1rem",height:"1rem",activeBackground:"{primary.color}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},pi={background:"rgba(0, 0, 0, 0.5)"},bi={background:"rgba(255, 255, 255, 0.4)",hoverBackground:"rgba(255, 255, 255, 0.6)",activeBackground:"rgba(255, 255, 255, 0.9)"},gi={size:"3rem",gutter:"0.5rem",background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.50}",hoverColor:"{surface.0}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},fi={size:"1.5rem"},hi={light:{thumbnailNavButton:{hoverBackground:"{surface.100}",color:"{surface.600}",hoverColor:"{surface.700}"},indicatorButton:{background:"{surface.200}",hoverBackground:"{surface.300}"}},dark:{thumbnailNavButton:{hoverBackground:"{surface.700}",color:"{surface.400}",hoverColor:"{surface.0}"},indicatorButton:{background:"{surface.700}",hoverBackground:"{surface.600}"}}},mi={root:ti,navButton:ri,navIcon:ai,thumbnailsContent:di,thumbnailNavButton:ii,thumbnailNavButtonIcon:li,caption:ci,indicatorList:si,indicatorButton:ui,insetIndicatorList:pi,insetIndicatorButton:bi,closeButton:gi,closeButtonIcon:fi,colorScheme:hi},ki={color:"{form.field.icon.color}"},vi={icon:ki},wi={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",top:"{form.field.padding.y}",fontSize:"0.75rem",fontWeight:"400"},xi={paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},yi={root:wi,input:xi},$i={transitionDuration:"{transition.duration}"},zi={icon:{size:"1.5rem"},mask:{background:"{mask.background}",color:"{mask.color}"}},Ci={position:{left:"auto",right:"1rem",top:"1rem",bottom:"auto"},blur:"8px",background:"rgba(255,255,255,0.1)",borderColor:"rgba(255,255,255,0.2)",borderWidth:"1px",borderRadius:"30px",padding:".5rem",gap:"0.5rem"},_i={hoverBackground:"rgba(255,255,255,0.1)",color:"{surface.50}",hoverColor:"{surface.0}",size:"3rem",iconSize:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Bi={root:$i,preview:zi,toolbar:Ci,action:_i},Ri={size:"15px",hoverSize:"30px",background:"rgba(255,255,255,0.3)",hoverBackground:"rgba(255,255,255,0.3)",borderColor:"unset",hoverBorderColor:"unset",borderWidth:"0",borderRadius:"50%",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"rgba(255,255,255,0.3)",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Si={handle:Ri},Zi={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",gap:"0.5rem"},Ei={fontWeight:"500"},Ii={size:"1rem"},Oi={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}}},ji={root:Zi,text:Ei,icon:Ii,colorScheme:Oi},Di={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{transition.duration}"},Ai={hoverBackground:"{content.hover.background}",hoverColor:"{content.hover.color}"},Ti={root:Di,display:Ai},Pi={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},Fi={borderRadius:"{border.radius.sm}"},Ni={light:{chip:{focusBackground:"{surface.200}",color:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",color:"{surface.0}"}}},Wi={root:Pi,chip:Fi,colorScheme:Ni},Li={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.icon.color}",borderRadius:"{form.field.border.radius}",padding:"0.5rem",minWidth:"2.5rem"},Ui={addon:Li},Yi={transitionDuration:"{transition.duration}"},Mi={width:"2.5rem",borderRadius:"{form.field.border.radius}",verticalPadding:"{form.field.padding.y}"},Vi={light:{button:{background:"transparent",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.500}",activeColor:"{surface.600}"}},dark:{button:{background:"transparent",hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.300}",activeColor:"{surface.200}"}}},Xi={root:Yi,button:Mi,colorScheme:Vi},Hi={gap:"0.5rem"},Gi={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"}},Ki={root:Hi,input:Gi},qi={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Ji={root:qi},Qi={transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ol={background:"{primary.color}"},nl={background:"{content.border.color}"},el={color:"{text.muted.color}"},tl={root:Qi,value:ol,range:nl,text:el},rl={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",borderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",shadow:"{form.field.shadow}",borderRadius:"{form.field.border.radius}",transitionDuration:"{form.field.transition.duration}"},al={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},dl={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},il={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},ll={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},cl={padding:"{list.option.padding}"},sl={light:{option:{stripedBackground:"{surface.50}"}},dark:{option:{stripedBackground:"{surface.900}"}}},ul={root:rl,list:al,option:dl,optionGroup:il,checkmark:ll,emptyMessage:cl,colorScheme:sl},pl={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",verticalOrientation:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},horizontalOrientation:{padding:"0.5rem 0.75rem",gap:"0.5rem"},transitionDuration:"{transition.duration}"},bl={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},gl={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},fl={padding:"0",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",shadow:"{overlay.navigation.shadow}",gap:"0.5rem"},hl={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},ml={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},kl={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},vl={borderColor:"{content.border.color}"},wl={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},xl={root:pl,baseItem:bl,item:gl,overlay:fl,submenu:hl,submenuLabel:ml,submenuIcon:kl,separator:vl,mobileButton:wl},yl={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},$l={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},zl={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},Cl={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},_l={borderColor:"{content.border.color}"},Bl={root:yl,list:$l,item:zl,submenuLabel:Cl,separator:_l},Rl={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.5rem 0.75rem",transitionDuration:"{transition.duration}"},Sl={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},Zl={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},El={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",mobileIndent:"1rem",icon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"}},Il={borderColor:"{content.border.color}"},Ol={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},jl={root:Rl,baseItem:Sl,item:Zl,submenu:El,separator:Il,mobileButton:Ol},Dl={borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},Al={padding:"0.5rem 0.75rem",gap:"0.5rem",sm:{padding:"0.375rem 0.625rem"},lg:{padding:"0.625rem 0.875rem"}},Tl={fontSize:"1rem",fontWeight:"500",sm:{fontSize:"0.875rem"},lg:{fontSize:"1.125rem"}},Pl={size:"1.125rem",sm:{size:"1rem"},lg:{size:"1.25rem"}},Fl={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},Nl={size:"1rem",sm:{size:"0.875rem"},lg:{size:"1.125rem"}},Wl={root:{borderWidth:"1px"}},Ll={content:{padding:"0"}},Ul={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}},outlined:{color:"{blue.600}",borderColor:"{blue.600}"},simple:{color:"{blue.600}"}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}},outlined:{color:"{green.600}",borderColor:"{green.600}"},simple:{color:"{green.600}"}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}},outlined:{color:"{yellow.600}",borderColor:"{yellow.600}"},simple:{color:"{yellow.600}"}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}},outlined:{color:"{red.600}",borderColor:"{red.600}"},simple:{color:"{red.600}"}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}},outlined:{color:"{surface.500}",borderColor:"{surface.500}"},simple:{color:"{surface.500}"}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}},outlined:{color:"{surface.950}",borderColor:"{surface.950}"},simple:{color:"{surface.950}"}}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}},outlined:{color:"{blue.500}",borderColor:"{blue.500}"},simple:{color:"{blue.500}"}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}},outlined:{color:"{green.500}",borderColor:"{green.500}"},simple:{color:"{green.500}"}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}},outlined:{color:"{yellow.500}",borderColor:"{yellow.500}"},simple:{color:"{yellow.500}"}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}},outlined:{color:"{red.500}",borderColor:"{red.500}"},simple:{color:"{red.500}"}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}},outlined:{color:"{surface.400}",borderColor:"{surface.400}"},simple:{color:"{surface.400}"}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}},outlined:{color:"{surface.0}",borderColor:"{surface.0}"},simple:{color:"{surface.0}"}}}},Yl={root:Dl,content:Al,text:Tl,icon:Pl,closeButton:Fl,closeIcon:Nl,outlined:Wl,simple:Ll,colorScheme:Ul},Ml={borderRadius:"{content.border.radius}",gap:"1rem"},Vl={background:"{content.border.color}",size:"0.5rem"},Xl={gap:"0.5rem"},Hl={size:"0.5rem"},Gl={size:"1rem"},Kl={verticalGap:"0.5rem",horizontalGap:"1rem"},ql={root:Ml,meters:Vl,label:Xl,labelMarker:Hl,labelIcon:Gl,labelList:Kl},Jl={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Ql={width:"2.5rem",color:"{form.field.icon.color}"},oc={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},nc={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},ec={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",gap:"0.5rem"},tc={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},rc={color:"{form.field.icon.color}"},ac={borderRadius:"{border.radius.sm}"},dc={padding:"{list.option.padding}"},ic={root:Jl,dropdown:Ql,overlay:oc,list:nc,option:ec,optionGroup:tc,chip:ac,clearIcon:rc,emptyMessage:dc},lc={gap:"1.125rem"},cc={gap:"0.5rem"},sc={root:lc,controls:cc},uc={gutter:"0.75rem",transitionDuration:"{transition.duration}"},pc={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{content.border.color}",color:"{content.color}",selectedColor:"{highlight.color}",hoverColor:"{content.hover.color}",padding:"0.75rem 1rem",toggleablePadding:"0.75rem 1rem 1.25rem 1rem",borderRadius:"{content.border.radius}"},bc={background:"{content.background}",hoverBackground:"{content.hover.background}",borderColor:"{content.border.color}",color:"{text.muted.color}",hoverColor:"{text.color}",size:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},gc={color:"{content.border.color}",borderRadius:"{content.border.radius}",height:"24px"},fc={root:uc,node:pc,nodeToggleButton:bc,connector:gc},hc={outline:{width:"2px",color:"{content.background}"}},mc={root:hc},kc={padding:"0.5rem 1rem",gap:"0.25rem",borderRadius:"{content.border.radius}",background:"{content.background}",color:"{content.color}",transitionDuration:"{transition.duration}"},vc={background:"transparent",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}",width:"2.5rem",height:"2.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},wc={color:"{text.muted.color}"},xc={maxWidth:"2.5rem"},yc={root:kc,navButton:vc,currentPageReport:wc,jumpToPageInput:xc},$c={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},zc={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"{content.border.color}",borderWidth:"0",borderRadius:"0"},Cc={padding:"0.375rem 1.125rem"},_c={fontWeight:"600"},Bc={padding:"0 1.125rem 1.125rem 1.125rem"},Rc={padding:"0 1.125rem 1.125rem 1.125rem"},Sc={root:$c,header:zc,toggleableHeader:Cc,title:_c,content:Bc,footer:Rc},Zc={gap:"0.5rem",transitionDuration:"{transition.duration}"},Ec={background:"{content.background}",borderColor:"{content.border.color}",borderWidth:"1px",color:"{content.color}",padding:"0.25rem 0.25rem",borderRadius:"{content.border.radius}",first:{borderWidth:"1px",topBorderRadius:"{content.border.radius}"},last:{borderWidth:"1px",bottomBorderRadius:"{content.border.radius}"}},Ic={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",gap:"0.5rem",padding:"{navigation.item.padding}",borderRadius:"{content.border.radius}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},Oc={indent:"1rem"},jc={color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}"},Dc={root:Zc,panel:Ec,item:Ic,submenu:Oc,submenuIcon:jc},Ac={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:".75rem"},Tc={color:"{form.field.icon.color}"},Pc={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",padding:"{overlay.popover.padding}",shadow:"{overlay.popover.shadow}"},Fc={gap:"0.5rem"},Nc={light:{strength:{weakBackground:"{red.500}",mediumBackground:"{amber.500}",strongBackground:"{green.500}"}},dark:{strength:{weakBackground:"{red.400}",mediumBackground:"{amber.400}",strongBackground:"{green.400}"}}},Wc={meter:Ac,icon:Tc,overlay:Pc,content:Fc,colorScheme:Nc},Lc={gap:"1.125rem"},Uc={gap:"0.5rem"},Yc={root:Lc,controls:Uc},Mc={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},Vc={padding:"{overlay.popover.padding}"},Xc={root:Mc,content:Vc},Hc={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:"1.25rem"},Gc={background:"{primary.color}"},Kc={color:"{primary.contrast.color}",fontSize:"0.75rem",fontWeight:"600"},qc={root:Hc,value:Gc,label:Kc},Jc={light:{root:{colorOne:"{red.500}",colorTwo:"{blue.500}",colorThree:"{green.500}",colorFour:"{yellow.500}"}},dark:{root:{colorOne:"{red.400}",colorTwo:"{blue.400}",colorThree:"{green.400}",colorFour:"{yellow.400}"}}},Qc={colorScheme:Jc},os={width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},ns={size:"0.75rem",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.5rem"},lg:{size:"1rem"}},es={root:os,icon:ns},ts={gap:"0.25rem",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},rs={size:"1rem",color:"{text.muted.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"},as={root:ts,icon:rs},ds={light:{root:{background:"rgba(0,0,0,0.1)"}},dark:{root:{background:"rgba(255,255,255,0.3)"}}},is={colorScheme:ds},ls={transitionDuration:"{transition.duration}"},cs={size:"9px",borderRadius:"{border.radius.sm}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ss={light:{bar:{background:"{surface.100}"}},dark:{bar:{background:"{surface.800}"}}},us={root:ls,bar:cs,colorScheme:ss},ps={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},bs={width:"2.5rem",color:"{form.field.icon.color}"},gs={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},fs={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},hs={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},ms={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},ks={color:"{form.field.icon.color}"},vs={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},ws={padding:"{list.option.padding}"},xs={root:ps,dropdown:bs,overlay:gs,list:fs,option:hs,optionGroup:ms,clearIcon:ks,checkmark:vs,emptyMessage:ws},ys={borderRadius:"{form.field.border.radius}"},$s={light:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}},dark:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}}},zs={root:ys,colorScheme:$s},Cs={borderRadius:"{content.border.radius}"},_s={light:{root:{background:"{surface.200}",animationBackground:"rgba(255,255,255,0.4)"}},dark:{root:{background:"rgba(255, 255, 255, 0.06)",animationBackground:"rgba(255, 255, 255, 0.04)"}}},Bs={root:Cs,colorScheme:_s},Rs={transitionDuration:"{transition.duration}"},Ss={background:"{content.border.color}",borderRadius:"{content.border.radius}",size:"3px"},Zs={background:"{primary.color}"},Es={width:"20px",height:"20px",borderRadius:"50%",background:"{content.border.color}",hoverBackground:"{content.border.color}",content:{borderRadius:"50%",hoverBackground:"{content.background}",width:"16px",height:"16px",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Is={light:{handle:{content:{background:"{surface.0}"}}},dark:{handle:{content:{background:"{surface.950}"}}}},Os={root:Rs,track:Ss,range:Zs,handle:Es,colorScheme:Is},js={gap:"0.5rem",transitionDuration:"{transition.duration}"},Ds={root:js},As={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)"},Ts={root:As},Ps={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",transitionDuration:"{transition.duration}"},Fs={background:"{content.border.color}"},Ns={size:"24px",background:"transparent",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ws={root:Ps,gutter:Fs,handle:Ns},Ls={transitionDuration:"{transition.duration}"},Us={background:"{content.border.color}",activeBackground:"{primary.color}",margin:"0 0 0 1.625rem",size:"2px"},Ys={padding:"0.5rem",gap:"1rem"},Ms={padding:"0",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},Vs={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},Xs={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},Hs={padding:"0.875rem 0.5rem 1.125rem 0.5rem"},Gs={background:"{content.background}",color:"{content.color}",padding:"0",indent:"1rem"},Ks={root:Ls,separator:Us,step:Ys,stepHeader:Ms,stepTitle:Vs,stepNumber:Xs,steppanels:Hs,steppanel:Gs},qs={transitionDuration:"{transition.duration}"},Js={background:"{content.border.color}"},Qs={borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},ou={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},nu={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},eu={root:qs,separator:Js,itemLink:Qs,itemLabel:ou,itemNumber:nu},tu={transitionDuration:"{transition.duration}"},ru={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},au={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},du={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},iu={height:"1px",bottom:"-1px",background:"{primary.color}"},lu={root:tu,tablist:ru,item:au,itemIcon:du,activeBar:iu},cu={transitionDuration:"{transition.duration}"},su={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},uu={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},pu={background:"{content.background}",color:"{content.color}",padding:"0.875rem 1.125rem 1.125rem 1.125rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"inset {focus.ring.shadow}"}},bu={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",width:"2.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},gu={height:"1px",bottom:"-1px",background:"{primary.color}"},fu={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},hu={root:cu,tablist:su,tab:uu,tabpanel:pu,navButton:bu,activeBar:gu,colorScheme:fu},mu={transitionDuration:"{transition.duration}"},ku={background:"{content.background}",borderColor:"{content.border.color}"},vu={borderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},wu={background:"{content.background}",color:"{content.color}"},xu={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}"},yu={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},$u={root:mu,tabList:ku,tab:vu,tabPanel:wu,navButton:xu,colorScheme:yu},zu={fontSize:"0.875rem",fontWeight:"700",padding:"0.25rem 0.5rem",gap:"0.25rem",borderRadius:"{content.border.radius}",roundedBorderRadius:"{border.radius.xl}"},Cu={size:"0.75rem"},_u={light:{primary:{background:"{primary.100}",color:"{primary.700}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.100}",color:"{green.700}"},info:{background:"{sky.100}",color:"{sky.700}"},warn:{background:"{orange.100}",color:"{orange.700}"},danger:{background:"{red.100}",color:"{red.700}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"color-mix(in srgb, {primary.500}, transparent 84%)",color:"{primary.300}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",color:"{green.300}"},info:{background:"color-mix(in srgb, {sky.500}, transparent 84%)",color:"{sky.300}"},warn:{background:"color-mix(in srgb, {orange.500}, transparent 84%)",color:"{orange.300}"},danger:{background:"color-mix(in srgb, {red.500}, transparent 84%)",color:"{red.300}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},Bu={root:zu,icon:Cu,colorScheme:_u},Ru={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.color}",height:"18rem",padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{form.field.border.radius}"},Su={gap:"0.25rem"},Zu={margin:"2px 0"},Eu={root:Ru,prompt:Su,commandResponse:Zu},Iu={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Ou={root:Iu},ju={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},Du={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Au={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Tu={mobileIndent:"1rem"},Pu={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},Fu={borderColor:"{content.border.color}"},Nu={root:ju,list:Du,item:Au,submenu:Tu,submenuIcon:Pu,separator:Fu},Wu={minHeight:"5rem"},Lu={eventContent:{padding:"1rem 0"}},Uu={eventContent:{padding:"0 1rem"}},Yu={size:"1.125rem",borderRadius:"50%",borderWidth:"2px",background:"{content.background}",borderColor:"{content.border.color}",content:{borderRadius:"50%",size:"0.375rem",background:"{primary.color}",insetShadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"}},Mu={color:"{content.border.color}",size:"2px"},Vu={event:Wu,horizontal:Lu,vertical:Uu,eventMarker:Yu,eventConnector:Mu},Xu={width:"25rem",borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},Hu={size:"1.125rem"},Gu={padding:"{overlay.popover.padding}",gap:"0.5rem"},Ku={gap:"0.5rem"},qu={fontWeight:"500",fontSize:"1rem"},Ju={fontWeight:"500",fontSize:"0.875rem"},Qu={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},op={size:"1rem"},np={light:{root:{blur:"1.5px"},info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}}}},dark:{root:{blur:"10px"},info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",detailColor:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}}}}},ep={root:Xu,icon:Hu,content:Gu,text:Ku,summary:qu,detail:Ju,closeButton:Qu,closeIcon:op,colorScheme:np},tp={padding:"0.25rem",borderRadius:"{content.border.radius}",gap:"0.5rem",fontWeight:"500",disabledBackground:"{form.field.disabled.background}",disabledBorderColor:"{form.field.disabled.background}",disabledColor:"{form.field.disabled.color}",invalidBorderColor:"{form.field.invalid.border.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",padding:"0.25rem"},lg:{fontSize:"{form.field.lg.font.size}",padding:"0.25rem"}},rp={disabledColor:"{form.field.disabled.color}"},ap={padding:"0.25rem 0.75rem",borderRadius:"{content.border.radius}",checkedShadow:"0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)",sm:{padding:"0.25rem 0.75rem"},lg:{padding:"0.25rem 0.75rem"}},dp={light:{root:{background:"{surface.100}",checkedBackground:"{surface.100}",hoverBackground:"{surface.100}",borderColor:"{surface.100}",color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}",checkedBorderColor:"{surface.100}"},content:{checkedBackground:"{surface.0}"},icon:{color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}"}},dark:{root:{background:"{surface.950}",checkedBackground:"{surface.950}",hoverBackground:"{surface.950}",borderColor:"{surface.950}",color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}",checkedBorderColor:"{surface.950}"},content:{checkedBackground:"{surface.800}"},icon:{color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}"}}},ip={root:tp,icon:rp,content:ap,colorScheme:dp},lp={width:"2.5rem",height:"1.5rem",borderRadius:"30px",gap:"0.25rem",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},borderWidth:"1px",borderColor:"transparent",hoverBorderColor:"transparent",checkedBorderColor:"transparent",checkedHoverBorderColor:"transparent",invalidBorderColor:"{form.field.invalid.border.color}",transitionDuration:"{form.field.transition.duration}",slideDuration:"0.2s"},cp={borderRadius:"50%",size:"1rem"},sp={light:{root:{background:"{surface.300}",disabledBackground:"{form.field.disabled.background}",hoverBackground:"{surface.400}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.0}",disabledBackground:"{form.field.disabled.color}",hoverBackground:"{surface.0}",checkedBackground:"{surface.0}",checkedHoverBackground:"{surface.0}",color:"{text.muted.color}",hoverColor:"{text.color}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}},dark:{root:{background:"{surface.700}",disabledBackground:"{surface.600}",hoverBackground:"{surface.600}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.400}",disabledBackground:"{surface.900}",hoverBackground:"{surface.300}",checkedBackground:"{surface.900}",checkedHoverBackground:"{surface.900}",color:"{surface.900}",hoverColor:"{surface.800}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}}},up={root:lp,handle:cp,colorScheme:sp},pp={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.75rem"},bp={root:pp},gp={maxWidth:"12.5rem",gutter:"0.25rem",shadow:"{overlay.popover.shadow}",padding:"0.5rem 0.75rem",borderRadius:"{overlay.popover.border.radius}"},fp={light:{root:{background:"{surface.700}",color:"{surface.0}"}},dark:{root:{background:"{surface.700}",color:"{surface.0}"}}},hp={root:gp,colorScheme:fp},mp={background:"{content.background}",color:"{content.color}",padding:"1rem",gap:"2px",indent:"1rem",transitionDuration:"{transition.duration}"},kp={padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.color}",hoverColor:"{text.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},gap:"0.25rem"},vp={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}"},wp={borderRadius:"50%",size:"1.75rem",hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedHoverColor:"{primary.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},xp={size:"2rem"},yp={margin:"0 0 0.5rem 0"},$p={root:mp,node:kp,nodeIcon:vp,nodeToggleButton:wp,loadingIcon:xp,filter:yp},zp={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Cp={width:"2.5rem",color:"{form.field.icon.color}"},_p={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Bp={padding:"{list.padding}"},Rp={padding:"{list.option.padding}"},Sp={borderRadius:"{border.radius.sm}"},Zp={color:"{form.field.icon.color}"},Ep={root:zp,dropdown:Cp,overlay:_p,tree:Bp,emptyMessage:Rp,chip:Sp,clearIcon:Zp},Ip={transitionDuration:"{transition.duration}"},Op={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},jp={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{treetable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Dp={fontWeight:"600"},Ap={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Tp={borderColor:"{treetable.border.color}",padding:"0.75rem 1rem",gap:"0.5rem"},Pp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",padding:"0.75rem 1rem"},Fp={fontWeight:"600"},Np={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},Wp={width:"0.5rem"},Lp={width:"1px",color:"{primary.color}"},Up={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},Yp={size:"2rem"},Mp={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Vp={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},Xp={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},Hp={light:{root:{borderColor:"{content.border.color}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},Gp={root:Ip,header:Op,headerCell:jp,columnTitle:Dp,row:Ap,bodyCell:Tp,footerCell:Pp,columnFooter:Fp,footer:Np,columnResizer:Wp,resizeIndicator:Lp,sortIcon:Up,loadingIcon:Yp,nodeToggleButton:Mp,paginatorTop:Vp,paginatorBottom:Xp,colorScheme:Hp},Kp={mask:{background:"{content.background}",color:"{text.muted.color}"},icon:{size:"2rem"}},qp={loader:Kp},Jp=Object.defineProperty,Qp=Object.defineProperties,ob=Object.getOwnPropertyDescriptors,Rn=Object.getOwnPropertySymbols,nb=Object.prototype.hasOwnProperty,eb=Object.prototype.propertyIsEnumerable,Sn=(o,n,e)=>n in o?Jp(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e,Zn,Vm=(Zn=((o,n)=>{for(var e in n||(n={}))nb.call(n,e)&&Sn(o,e,n[e]);if(Rn)for(var e of Rn(n))eb.call(n,e)&&Sn(o,e,n[e]);return o})({},hr),Qp(Zn,ob({components:{accordion:Yt,autocomplete:or,avatar:dr,badge:br,blockui:kr,breadcrumb:yr,button:Cr,card:Er,carousel:Tr,cascadeselect:Yr,checkbox:Xr,chip:Qr,colorpicker:ra,confirmdialog:ia,confirmpopup:pa,contextmenu:va,datatable:Fa,dataview:Va,datepicker:pd,dialog:kd,divider:$d,dock:_d,drawer:Id,editor:Pd,fieldset:Ud,fileupload:qd,floatlabel:ei,galleria:mi,iconfield:vi,iftalabel:yi,image:Bi,imagecompare:Si,inlinemessage:ji,inplace:Ti,inputchips:Wi,inputgroup:Ui,inputnumber:Xi,inputotp:Ki,inputtext:Ji,knob:tl,listbox:ul,megamenu:xl,menu:Bl,menubar:jl,message:Yl,metergroup:ql,multiselect:ic,orderlist:sc,organizationchart:fc,overlaybadge:mc,paginator:yc,panel:Sc,panelmenu:Dc,password:Wc,picklist:Yc,popover:Xc,progressbar:qc,progressspinner:Qc,radiobutton:es,rating:as,ripple:is,scrollpanel:us,select:xs,selectbutton:zs,skeleton:Bs,slider:Os,speeddial:Ds,splitbutton:Ts,splitter:Ws,stepper:Ks,steps:eu,tabmenu:lu,tabs:hu,tabview:$u,tag:Bu,terminal:Eu,textarea:Ou,tieredmenu:Nu,timeline:Vu,toast:ep,togglebutton:ip,toggleswitch:up,toolbar:bp,tooltip:hp,tree:$p,treeselect:Ep,treetable:Gp,virtualscroller:qp}})));function uo(o){return o+.5|0}const F=(o,n,e)=>Math.max(Math.min(o,e),n);function ro(o){return F(uo(o*2.55),0,255)}function N(o){return F(uo(o*255),0,255)}function T(o){return F(uo(o/2.55)/100,0,1)}function En(o){return F(uo(o*100),0,100)}const Z={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Jo=[..."0123456789ABCDEF"],tb=o=>Jo[o&15],rb=o=>Jo[(o&240)>>4]+Jo[o&15],Ro=o=>(o&240)>>4===(o&15),ab=o=>Ro(o.r)&&Ro(o.g)&&Ro(o.b)&&Ro(o.a);function db(o){var n=o.length,e;return o[0]==="#"&&(n===4||n===5?e={r:255&Z[o[1]]*17,g:255&Z[o[2]]*17,b:255&Z[o[3]]*17,a:n===5?Z[o[4]]*17:255}:(n===7||n===9)&&(e={r:Z[o[1]]<<4|Z[o[2]],g:Z[o[3]]<<4|Z[o[4]],b:Z[o[5]]<<4|Z[o[6]],a:n===9?Z[o[7]]<<4|Z[o[8]]:255})),e}const ib=(o,n)=>o<255?n(o):"";function lb(o){var n=ab(o)?tb:rb;return o?"#"+n(o.r)+n(o.g)+n(o.b)+ib(o.a,n):void 0}const cb=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function we(o,n,e){const t=n*Math.min(e,1-e),r=(d,a=(d+o/30)%12)=>e-t*Math.max(Math.min(a-3,9-a,1),-1);return[r(0),r(8),r(4)]}function sb(o,n,e){const t=(r,d=(r+o/60)%6)=>e-e*n*Math.max(Math.min(d,4-d,1),0);return[t(5),t(3),t(1)]}function ub(o,n,e){const t=we(o,1,.5);let r;for(n+e>1&&(r=1/(n+e),n*=r,e*=r),r=0;r<3;r++)t[r]*=1-n-e,t[r]+=n;return t}function pb(o,n,e,t,r){return o===r?(n-e)/t+(n<e?6:0):n===r?(e-o)/t+2:(o-n)/t+4}function rn(o){const e=o.r/255,t=o.g/255,r=o.b/255,d=Math.max(e,t,r),a=Math.min(e,t,r),i=(d+a)/2;let l,c,u;return d!==a&&(u=d-a,c=i>.5?u/(2-d-a):u/(d+a),l=pb(e,t,r,u,d),l=l*60+.5),[l|0,c||0,i]}function an(o,n,e,t){return(Array.isArray(n)?o(n[0],n[1],n[2]):o(n,e,t)).map(N)}function dn(o,n,e){return an(we,o,n,e)}function bb(o,n,e){return an(ub,o,n,e)}function gb(o,n,e){return an(sb,o,n,e)}function xe(o){return(o%360+360)%360}function fb(o){const n=cb.exec(o);let e=255,t;if(!n)return;n[5]!==t&&(e=n[6]?ro(+n[5]):N(+n[5]));const r=xe(+n[2]),d=+n[3]/100,a=+n[4]/100;return n[1]==="hwb"?t=bb(r,d,a):n[1]==="hsv"?t=gb(r,d,a):t=dn(r,d,a),{r:t[0],g:t[1],b:t[2],a:e}}function hb(o,n){var e=rn(o);e[0]=xe(e[0]+n),e=dn(e),o.r=e[0],o.g=e[1],o.b=e[2]}function mb(o){if(!o)return;const n=rn(o),e=n[0],t=En(n[1]),r=En(n[2]);return o.a<255?`hsla(${e}, ${t}%, ${r}%, ${T(o.a)})`:`hsl(${e}, ${t}%, ${r}%)`}const In={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},On={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function kb(){const o={},n=Object.keys(On),e=Object.keys(In);let t,r,d,a,i;for(t=0;t<n.length;t++){for(a=i=n[t],r=0;r<e.length;r++)d=e[r],i=i.replace(d,In[d]);d=parseInt(On[a],16),o[i]=[d>>16&255,d>>8&255,d&255]}return o}let So;function vb(o){So||(So=kb(),So.transparent=[0,0,0,0]);const n=So[o.toLowerCase()];return n&&{r:n[0],g:n[1],b:n[2],a:n.length===4?n[3]:255}}const wb=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function xb(o){const n=wb.exec(o);let e=255,t,r,d;if(n){if(n[7]!==t){const a=+n[7];e=n[8]?ro(a):F(a*255,0,255)}return t=+n[1],r=+n[3],d=+n[5],t=255&(n[2]?ro(t):F(t,0,255)),r=255&(n[4]?ro(r):F(r,0,255)),d=255&(n[6]?ro(d):F(d,0,255)),{r:t,g:r,b:d,a:e}}}function yb(o){return o&&(o.a<255?`rgba(${o.r}, ${o.g}, ${o.b}, ${T(o.a)})`:`rgb(${o.r}, ${o.g}, ${o.b})`)}const Vo=o=>o<=.0031308?o*12.92:Math.pow(o,1/2.4)*1.055-.055,K=o=>o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4);function $b(o,n,e){const t=K(T(o.r)),r=K(T(o.g)),d=K(T(o.b));return{r:N(Vo(t+e*(K(T(n.r))-t))),g:N(Vo(r+e*(K(T(n.g))-r))),b:N(Vo(d+e*(K(T(n.b))-d))),a:o.a+e*(n.a-o.a)}}function Zo(o,n,e){if(o){let t=rn(o);t[n]=Math.max(0,Math.min(t[n]+t[n]*e,n===0?360:1)),t=dn(t),o.r=t[0],o.g=t[1],o.b=t[2]}}function ye(o,n){return o&&Object.assign(n||{},o)}function jn(o){var n={r:0,g:0,b:0,a:255};return Array.isArray(o)?o.length>=3&&(n={r:o[0],g:o[1],b:o[2],a:255},o.length>3&&(n.a=N(o[3]))):(n=ye(o,{r:0,g:0,b:0,a:1}),n.a=N(n.a)),n}function zb(o){return o.charAt(0)==="r"?xb(o):fb(o)}class Qo{constructor(n){if(n instanceof Qo)return n;const e=typeof n;let t;e==="object"?t=jn(n):e==="string"&&(t=db(n)||vb(n)||zb(n)),this._rgb=t,this._valid=!!t}get valid(){return this._valid}get rgb(){var n=ye(this._rgb);return n&&(n.a=T(n.a)),n}set rgb(n){this._rgb=jn(n)}rgbString(){return this._valid?yb(this._rgb):void 0}hexString(){return this._valid?lb(this._rgb):void 0}hslString(){return this._valid?mb(this._rgb):void 0}mix(n,e){if(n){const t=this.rgb,r=n.rgb;let d;const a=e===d?.5:e,i=2*a-1,l=t.a-r.a,c=((i*l===-1?i:(i+l)/(1+i*l))+1)/2;d=1-c,t.r=255&c*t.r+d*r.r+.5,t.g=255&c*t.g+d*r.g+.5,t.b=255&c*t.b+d*r.b+.5,t.a=a*t.a+(1-a)*r.a,this.rgb=t}return this}interpolate(n,e){return n&&(this._rgb=$b(this._rgb,n._rgb,e)),this}clone(){return new Qo(this.rgb)}alpha(n){return this._rgb.a=N(n),this}clearer(n){const e=this._rgb;return e.a*=1-n,this}greyscale(){const n=this._rgb,e=uo(n.r*.3+n.g*.59+n.b*.11);return n.r=n.g=n.b=e,this}opaquer(n){const e=this._rgb;return e.a*=1+n,this}negate(){const n=this._rgb;return n.r=255-n.r,n.g=255-n.g,n.b=255-n.b,this}lighten(n){return Zo(this._rgb,2,n),this}darken(n){return Zo(this._rgb,2,-n),this}saturate(n){return Zo(this._rgb,1,n),this}desaturate(n){return Zo(this._rgb,1,-n),this}rotate(n){return hb(this._rgb,n),this}}var Xm=`
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
`,Hm=`
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
`,Gm=`
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
`,Km=`
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
`,qm=`
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
`,Jm=`
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
`,Qm=`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`,ok=`
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
`,nk=`
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
`,ek=`
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
`,tk=`
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
`,rk=`
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
`,ak=`
    .p-tree {
        display: block;
        background: dt('tree.background');
        color: dt('tree.color');
        padding: dt('tree.padding');
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

    .p-tree-loading {
        position: relative;
        height: 100%;
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
`,dk=`
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
`,ik=`
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
`;function s(o,n,e){function t(i,l){var c;Object.defineProperty(i,"_zod",{value:i._zod??{},enumerable:!1}),(c=i._zod).traits??(c.traits=new Set),i._zod.traits.add(o),n(i,l);for(const u in a.prototype)u in i||Object.defineProperty(i,u,{value:a.prototype[u].bind(i)});i._zod.constr=a,i._zod.def=l}const r=e?.Parent??Object;class d extends r{}Object.defineProperty(d,"name",{value:o});function a(i){var l;const c=e?.Parent?new d:this;t(c,i),(l=c._zod).deferred??(l.deferred=[]);for(const u of c._zod.deferred)u();return c}return Object.defineProperty(a,"init",{value:t}),Object.defineProperty(a,Symbol.hasInstance,{value:i=>e?.Parent&&i instanceof e.Parent?!0:i?._zod?.traits?.has(o)}),Object.defineProperty(a,"name",{value:o}),a}class Q extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class $e extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}}const ze={};function V(o){return ze}function Cb(o){const n=Object.values(o).filter(t=>typeof t=="number");return Object.entries(o).filter(([t,r])=>n.indexOf(+t)===-1).map(([t,r])=>r)}function on(o,n){return typeof n=="bigint"?n.toString():n}function ln(o){return{get value(){{const n=o();return Object.defineProperty(this,"value",{value:n}),n}}}}function cn(o){return o==null}function sn(o){const n=o.startsWith("^")?1:0,e=o.endsWith("$")?o.length-1:o.length;return o.slice(n,e)}function _b(o,n){const e=(o.toString().split(".")[1]||"").length,t=n.toString();let r=(t.split(".")[1]||"").length;if(r===0&&/\d?e-\d?/.test(t)){const l=t.match(/\d?e-(\d?)/);l?.[1]&&(r=Number.parseInt(l[1]))}const d=e>r?e:r,a=Number.parseInt(o.toFixed(d).replace(".","")),i=Number.parseInt(n.toFixed(d).replace(".",""));return a%i/10**d}const Dn=Symbol("evaluating");function k(o,n,e){let t;Object.defineProperty(o,n,{get(){if(t!==Dn)return t===void 0&&(t=Dn,t=e()),t},set(r){Object.defineProperty(o,n,{value:r})},configurable:!0})}function H(o,n,e){Object.defineProperty(o,n,{value:e,writable:!0,enumerable:!0,configurable:!0})}function G(...o){const n={};for(const e of o){const t=Object.getOwnPropertyDescriptors(e);Object.assign(n,t)}return Object.defineProperties({},n)}function An(o){return JSON.stringify(o)}const Ce="captureStackTrace"in Error?Error.captureStackTrace:(...o)=>{};function Po(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}const Bb=ln(()=>{if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{const o=Function;return new o(""),!0}catch{return!1}});function co(o){if(Po(o)===!1)return!1;const n=o.constructor;if(n===void 0)return!0;const e=n.prototype;return!(Po(e)===!1||Object.prototype.hasOwnProperty.call(e,"isPrototypeOf")===!1)}function _e(o){return co(o)?{...o}:Array.isArray(o)?[...o]:o}const Rb=new Set(["string","number","symbol"]);function Wo(o){return o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function L(o,n,e){const t=new o._zod.constr(n??o._zod.def);return(!n||e?.parent)&&(t._zod.parent=o),t}function f(o){const n=o;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function Sb(o){return Object.keys(o).filter(n=>o[n]._zod.optin==="optional"&&o[n]._zod.optout==="optional")}const Zb={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function Eb(o,n){const e=o._zod.def,t=G(o._zod.def,{get shape(){const r={};for(const d in n){if(!(d in e.shape))throw new Error(`Unrecognized key: "${d}"`);n[d]&&(r[d]=e.shape[d])}return H(this,"shape",r),r},checks:[]});return L(o,t)}function Ib(o,n){const e=o._zod.def,t=G(o._zod.def,{get shape(){const r={...o._zod.def.shape};for(const d in n){if(!(d in e.shape))throw new Error(`Unrecognized key: "${d}"`);n[d]&&delete r[d]}return H(this,"shape",r),r},checks:[]});return L(o,t)}function Ob(o,n){if(!co(n))throw new Error("Invalid input to extend: expected a plain object");const e=o._zod.def.checks;if(e&&e.length>0)throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");const r=G(o._zod.def,{get shape(){const d={...o._zod.def.shape,...n};return H(this,"shape",d),d},checks:[]});return L(o,r)}function jb(o,n){if(!co(n))throw new Error("Invalid input to safeExtend: expected a plain object");const e={...o._zod.def,get shape(){const t={...o._zod.def.shape,...n};return H(this,"shape",t),t},checks:o._zod.def.checks};return L(o,e)}function Db(o,n){const e=G(o._zod.def,{get shape(){const t={...o._zod.def.shape,...n._zod.def.shape};return H(this,"shape",t),t},get catchall(){return n._zod.def.catchall},checks:[]});return L(o,e)}function Ab(o,n,e){const t=G(n._zod.def,{get shape(){const r=n._zod.def.shape,d={...r};if(e)for(const a in e){if(!(a in r))throw new Error(`Unrecognized key: "${a}"`);e[a]&&(d[a]=o?new o({type:"optional",innerType:r[a]}):r[a])}else for(const a in r)d[a]=o?new o({type:"optional",innerType:r[a]}):r[a];return H(this,"shape",d),d},checks:[]});return L(n,t)}function Tb(o,n,e){const t=G(n._zod.def,{get shape(){const r=n._zod.def.shape,d={...r};if(e)for(const a in e){if(!(a in d))throw new Error(`Unrecognized key: "${a}"`);e[a]&&(d[a]=new o({type:"nonoptional",innerType:r[a]}))}else for(const a in r)d[a]=new o({type:"nonoptional",innerType:r[a]});return H(this,"shape",d),d},checks:[]});return L(n,t)}function J(o,n=0){if(o.aborted===!0)return!0;for(let e=n;e<o.issues.length;e++)if(o.issues[e]?.continue!==!0)return!0;return!1}function Be(o,n){return n.map(e=>{var t;return(t=e).path??(t.path=[]),e.path.unshift(o),e})}function Eo(o){return typeof o=="string"?o:o?.message}function X(o,n,e){const t={...o,path:o.path??[]};if(!o.message){const r=Eo(o.inst?._zod.def?.error?.(o))??Eo(n?.error?.(o))??Eo(e.customError?.(o))??Eo(e.localeError?.(o))??"Invalid input";t.message=r}return delete t.inst,delete t.continue,n?.reportInput||delete t.input,t}function un(o){return Array.isArray(o)?"array":typeof o=="string"?"string":"unknown"}function so(...o){const[n,e,t]=o;return typeof n=="string"?{message:n,code:"custom",input:e,inst:t}:{...n}}const Re=(o,n)=>{o.name="$ZodError",Object.defineProperty(o,"_zod",{value:o._zod,enumerable:!1}),Object.defineProperty(o,"issues",{value:n,enumerable:!1}),o.message=JSON.stringify(n,on,2),Object.defineProperty(o,"toString",{value:()=>o.message,enumerable:!1})},Se=s("$ZodError",Re),Ze=s("$ZodError",Re,{Parent:Error});function Pb(o,n=e=>e.message){const e={},t=[];for(const r of o.issues)r.path.length>0?(e[r.path[0]]=e[r.path[0]]||[],e[r.path[0]].push(n(r))):t.push(n(r));return{formErrors:t,fieldErrors:e}}function Fb(o,n=e=>e.message){const e={_errors:[]},t=r=>{for(const d of r.issues)if(d.code==="invalid_union"&&d.errors.length)d.errors.map(a=>t({issues:a}));else if(d.code==="invalid_key")t({issues:d.issues});else if(d.code==="invalid_element")t({issues:d.issues});else if(d.path.length===0)e._errors.push(n(d));else{let a=e,i=0;for(;i<d.path.length;){const l=d.path[i];i===d.path.length-1?(a[l]=a[l]||{_errors:[]},a[l]._errors.push(n(d))):a[l]=a[l]||{_errors:[]},a=a[l],i++}}};return t(o),e}const pn=o=>(n,e,t,r)=>{const d=t?Object.assign(t,{async:!1}):{async:!1},a=n._zod.run({value:e,issues:[]},d);if(a instanceof Promise)throw new Q;if(a.issues.length){const i=new(r?.Err??o)(a.issues.map(l=>X(l,d,V())));throw Ce(i,r?.callee),i}return a.value},bn=o=>async(n,e,t,r)=>{const d=t?Object.assign(t,{async:!0}):{async:!0};let a=n._zod.run({value:e,issues:[]},d);if(a instanceof Promise&&(a=await a),a.issues.length){const i=new(r?.Err??o)(a.issues.map(l=>X(l,d,V())));throw Ce(i,r?.callee),i}return a.value},Lo=o=>(n,e,t)=>{const r=t?{...t,async:!1}:{async:!1},d=n._zod.run({value:e,issues:[]},r);if(d instanceof Promise)throw new Q;return d.issues.length?{success:!1,error:new(o??Se)(d.issues.map(a=>X(a,r,V())))}:{success:!0,data:d.value}},Nb=Lo(Ze),Uo=o=>async(n,e,t)=>{const r=t?Object.assign(t,{async:!0}):{async:!0};let d=n._zod.run({value:e,issues:[]},r);return d instanceof Promise&&(d=await d),d.issues.length?{success:!1,error:new o(d.issues.map(a=>X(a,r,V())))}:{success:!0,data:d.value}},Wb=Uo(Ze),Lb=o=>(n,e,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return pn(o)(n,e,r)},Ub=o=>(n,e,t)=>pn(o)(n,e,t),Yb=o=>async(n,e,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return bn(o)(n,e,r)},Mb=o=>async(n,e,t)=>bn(o)(n,e,t),Vb=o=>(n,e,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return Lo(o)(n,e,r)},Xb=o=>(n,e,t)=>Lo(o)(n,e,t),Hb=o=>async(n,e,t)=>{const r=t?Object.assign(t,{direction:"backward"}):{direction:"backward"};return Uo(o)(n,e,r)},Gb=o=>async(n,e,t)=>Uo(o)(n,e,t),Kb=/^[cC][^\s-]{8,}$/,qb=/^[0-9a-z]+$/,Jb=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,Qb=/^[0-9a-vA-V]{20}$/,og=/^[A-Za-z0-9]{27}$/,ng=/^[a-zA-Z0-9_-]{21}$/,eg=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,tg=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Tn=o=>o?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${o}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,rg=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,ag="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function dg(){return new RegExp(ag,"u")}const ig=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,lg=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,cg=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,sg=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,ug=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Ee=/^[A-Za-z0-9_-]*$/,pg=/^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,bg=/^\+(?:[0-9]){6,14}[0-9]$/,Ie="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",gg=new RegExp(`^${Ie}$`);function Oe(o){const n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof o.precision=="number"?o.precision===-1?`${n}`:o.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${o.precision}}`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function fg(o){return new RegExp(`^${Oe(o)}$`)}function hg(o){const n=Oe({precision:o.precision}),e=["Z"];o.local&&e.push(""),o.offset&&e.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const t=`${n}(?:${e.join("|")})`;return new RegExp(`^${Ie}T(?:${t})$`)}const mg=o=>{const n=o?`[\\s\\S]{${o?.minimum??0},${o?.maximum??""}}`:"[\\s\\S]*";return new RegExp(`^${n}$`)},kg=/^-?\d+$/,vg=/^-?\d+(?:\.\d+)?/,wg=/^(?:true|false)$/i,xg=/^[^A-Z]*$/,yg=/^[^a-z]*$/,S=s("$ZodCheck",(o,n)=>{var e;o._zod??(o._zod={}),o._zod.def=n,(e=o._zod).onattach??(e.onattach=[])}),je={number:"number",bigint:"bigint",object:"date"},De=s("$ZodCheckLessThan",(o,n)=>{S.init(o,n);const e=je[typeof n.value];o._zod.onattach.push(t=>{const r=t._zod.bag,d=(n.inclusive?r.maximum:r.exclusiveMaximum)??Number.POSITIVE_INFINITY;n.value<d&&(n.inclusive?r.maximum=n.value:r.exclusiveMaximum=n.value)}),o._zod.check=t=>{(n.inclusive?t.value<=n.value:t.value<n.value)||t.issues.push({origin:e,code:"too_big",maximum:n.value,input:t.value,inclusive:n.inclusive,inst:o,continue:!n.abort})}}),Ae=s("$ZodCheckGreaterThan",(o,n)=>{S.init(o,n);const e=je[typeof n.value];o._zod.onattach.push(t=>{const r=t._zod.bag,d=(n.inclusive?r.minimum:r.exclusiveMinimum)??Number.NEGATIVE_INFINITY;n.value>d&&(n.inclusive?r.minimum=n.value:r.exclusiveMinimum=n.value)}),o._zod.check=t=>{(n.inclusive?t.value>=n.value:t.value>n.value)||t.issues.push({origin:e,code:"too_small",minimum:n.value,input:t.value,inclusive:n.inclusive,inst:o,continue:!n.abort})}}),$g=s("$ZodCheckMultipleOf",(o,n)=>{S.init(o,n),o._zod.onattach.push(e=>{var t;(t=e._zod.bag).multipleOf??(t.multipleOf=n.value)}),o._zod.check=e=>{if(typeof e.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof e.value=="bigint"?e.value%n.value===BigInt(0):_b(e.value,n.value)===0)||e.issues.push({origin:typeof e.value,code:"not_multiple_of",divisor:n.value,input:e.value,inst:o,continue:!n.abort})}}),zg=s("$ZodCheckNumberFormat",(o,n)=>{S.init(o,n),n.format=n.format||"float64";const e=n.format?.includes("int"),t=e?"int":"number",[r,d]=Zb[n.format];o._zod.onattach.push(a=>{const i=a._zod.bag;i.format=n.format,i.minimum=r,i.maximum=d,e&&(i.pattern=kg)}),o._zod.check=a=>{const i=a.value;if(e){if(!Number.isInteger(i)){a.issues.push({expected:t,format:n.format,code:"invalid_type",continue:!1,input:i,inst:o});return}if(!Number.isSafeInteger(i)){i>0?a.issues.push({input:i,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:o,origin:t,continue:!n.abort}):a.issues.push({input:i,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:o,origin:t,continue:!n.abort});return}}i<r&&a.issues.push({origin:"number",input:i,code:"too_small",minimum:r,inclusive:!0,inst:o,continue:!n.abort}),i>d&&a.issues.push({origin:"number",input:i,code:"too_big",maximum:d,inst:o})}}),Cg=s("$ZodCheckMaxLength",(o,n)=>{var e;S.init(o,n),(e=o._zod.def).when??(e.when=t=>{const r=t.value;return!cn(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag.maximum??Number.POSITIVE_INFINITY;n.maximum<r&&(t._zod.bag.maximum=n.maximum)}),o._zod.check=t=>{const r=t.value;if(r.length<=n.maximum)return;const a=un(r);t.issues.push({origin:a,code:"too_big",maximum:n.maximum,inclusive:!0,input:r,inst:o,continue:!n.abort})}}),_g=s("$ZodCheckMinLength",(o,n)=>{var e;S.init(o,n),(e=o._zod.def).when??(e.when=t=>{const r=t.value;return!cn(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag.minimum??Number.NEGATIVE_INFINITY;n.minimum>r&&(t._zod.bag.minimum=n.minimum)}),o._zod.check=t=>{const r=t.value;if(r.length>=n.minimum)return;const a=un(r);t.issues.push({origin:a,code:"too_small",minimum:n.minimum,inclusive:!0,input:r,inst:o,continue:!n.abort})}}),Bg=s("$ZodCheckLengthEquals",(o,n)=>{var e;S.init(o,n),(e=o._zod.def).when??(e.when=t=>{const r=t.value;return!cn(r)&&r.length!==void 0}),o._zod.onattach.push(t=>{const r=t._zod.bag;r.minimum=n.length,r.maximum=n.length,r.length=n.length}),o._zod.check=t=>{const r=t.value,d=r.length;if(d===n.length)return;const a=un(r),i=d>n.length;t.issues.push({origin:a,...i?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:t.value,inst:o,continue:!n.abort})}}),Yo=s("$ZodCheckStringFormat",(o,n)=>{var e,t;S.init(o,n),o._zod.onattach.push(r=>{const d=r._zod.bag;d.format=n.format,n.pattern&&(d.patterns??(d.patterns=new Set),d.patterns.add(n.pattern))}),n.pattern?(e=o._zod).check??(e.check=r=>{n.pattern.lastIndex=0,!n.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:n.format,input:r.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:o,continue:!n.abort})}):(t=o._zod).check??(t.check=()=>{})}),Rg=s("$ZodCheckRegex",(o,n)=>{Yo.init(o,n),o._zod.check=e=>{n.pattern.lastIndex=0,!n.pattern.test(e.value)&&e.issues.push({origin:"string",code:"invalid_format",format:"regex",input:e.value,pattern:n.pattern.toString(),inst:o,continue:!n.abort})}}),Sg=s("$ZodCheckLowerCase",(o,n)=>{n.pattern??(n.pattern=xg),Yo.init(o,n)}),Zg=s("$ZodCheckUpperCase",(o,n)=>{n.pattern??(n.pattern=yg),Yo.init(o,n)}),Eg=s("$ZodCheckIncludes",(o,n)=>{S.init(o,n);const e=Wo(n.includes),t=new RegExp(typeof n.position=="number"?`^.{${n.position}}${e}`:e);n.pattern=t,o._zod.onattach.push(r=>{const d=r._zod.bag;d.patterns??(d.patterns=new Set),d.patterns.add(t)}),o._zod.check=r=>{r.value.includes(n.includes,n.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:r.value,inst:o,continue:!n.abort})}}),Ig=s("$ZodCheckStartsWith",(o,n)=>{S.init(o,n);const e=new RegExp(`^${Wo(n.prefix)}.*`);n.pattern??(n.pattern=e),o._zod.onattach.push(t=>{const r=t._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(e)}),o._zod.check=t=>{t.value.startsWith(n.prefix)||t.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:t.value,inst:o,continue:!n.abort})}}),Og=s("$ZodCheckEndsWith",(o,n)=>{S.init(o,n);const e=new RegExp(`.*${Wo(n.suffix)}$`);n.pattern??(n.pattern=e),o._zod.onattach.push(t=>{const r=t._zod.bag;r.patterns??(r.patterns=new Set),r.patterns.add(e)}),o._zod.check=t=>{t.value.endsWith(n.suffix)||t.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:t.value,inst:o,continue:!n.abort})}}),jg=s("$ZodCheckOverwrite",(o,n)=>{S.init(o,n),o._zod.check=e=>{e.value=n.tx(e.value)}});class Dg{constructor(n=[]){this.content=[],this.indent=0,this&&(this.args=n)}indented(n){this.indent+=1,n(this),this.indent-=1}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}const t=n.split(`
`).filter(a=>a),r=Math.min(...t.map(a=>a.length-a.trimStart().length)),d=t.map(a=>a.slice(r)).map(a=>" ".repeat(this.indent*2)+a);for(const a of d)this.content.push(a)}compile(){const n=Function,e=this?.args,r=[...(this?.content??[""]).map(d=>`  ${d}`)];return new n(...e,r.join(`
`))}}const Ag={major:4,minor:1,patch:12},$=s("$ZodType",(o,n)=>{var e;o??(o={}),o._zod.def=n,o._zod.bag=o._zod.bag||{},o._zod.version=Ag;const t=[...o._zod.def.checks??[]];o._zod.traits.has("$ZodCheck")&&t.unshift(o);for(const r of t)for(const d of r._zod.onattach)d(o);if(t.length===0)(e=o._zod).deferred??(e.deferred=[]),o._zod.deferred?.push(()=>{o._zod.run=o._zod.parse});else{const r=(a,i,l)=>{let c=J(a),u;for(const g of i){if(g._zod.def.when){if(!g._zod.def.when(a))continue}else if(c)continue;const p=a.issues.length,b=g._zod.check(a);if(b instanceof Promise&&l?.async===!1)throw new Q;if(u||b instanceof Promise)u=(u??Promise.resolve()).then(async()=>{await b,a.issues.length!==p&&(c||(c=J(a,p)))});else{if(a.issues.length===p)continue;c||(c=J(a,p))}}return u?u.then(()=>a):a},d=(a,i,l)=>{if(J(a))return a.aborted=!0,a;const c=r(i,t,l);if(c instanceof Promise){if(l.async===!1)throw new Q;return c.then(u=>o._zod.parse(u,l))}return o._zod.parse(c,l)};o._zod.run=(a,i)=>{if(i.skipChecks)return o._zod.parse(a,i);if(i.direction==="backward"){const c=o._zod.parse({value:a.value,issues:[]},{...i,skipChecks:!0});return c instanceof Promise?c.then(u=>d(u,a,i)):d(c,a,i)}const l=o._zod.parse(a,i);if(l instanceof Promise){if(i.async===!1)throw new Q;return l.then(c=>r(c,t,i))}return r(l,t,i)}}o["~standard"]={validate:r=>{try{const d=Nb(o,r);return d.success?{value:d.data}:{issues:d.error?.issues}}catch{return Wb(o,r).then(a=>a.success?{value:a.data}:{issues:a.error?.issues})}},vendor:"zod",version:1}}),gn=s("$ZodString",(o,n)=>{$.init(o,n),o._zod.pattern=[...o?._zod.bag?.patterns??[]].pop()??mg(o._zod.bag),o._zod.parse=(e,t)=>{if(n.coerce)try{e.value=String(e.value)}catch{}return typeof e.value=="string"||e.issues.push({expected:"string",code:"invalid_type",input:e.value,inst:o}),e}}),v=s("$ZodStringFormat",(o,n)=>{Yo.init(o,n),gn.init(o,n)}),Tg=s("$ZodGUID",(o,n)=>{n.pattern??(n.pattern=tg),v.init(o,n)}),Pg=s("$ZodUUID",(o,n)=>{if(n.version){const t={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(t===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Tn(t))}else n.pattern??(n.pattern=Tn());v.init(o,n)}),Fg=s("$ZodEmail",(o,n)=>{n.pattern??(n.pattern=rg),v.init(o,n)}),Ng=s("$ZodURL",(o,n)=>{v.init(o,n),o._zod.check=e=>{try{const t=e.value.trim(),r=new URL(t);n.hostname&&(n.hostname.lastIndex=0,n.hostname.test(r.hostname)||e.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:pg.source,input:e.value,inst:o,continue:!n.abort})),n.protocol&&(n.protocol.lastIndex=0,n.protocol.test(r.protocol.endsWith(":")?r.protocol.slice(0,-1):r.protocol)||e.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:e.value,inst:o,continue:!n.abort})),n.normalize?e.value=r.href:e.value=t;return}catch{e.issues.push({code:"invalid_format",format:"url",input:e.value,inst:o,continue:!n.abort})}}}),Wg=s("$ZodEmoji",(o,n)=>{n.pattern??(n.pattern=dg()),v.init(o,n)}),Lg=s("$ZodNanoID",(o,n)=>{n.pattern??(n.pattern=ng),v.init(o,n)}),Ug=s("$ZodCUID",(o,n)=>{n.pattern??(n.pattern=Kb),v.init(o,n)}),Yg=s("$ZodCUID2",(o,n)=>{n.pattern??(n.pattern=qb),v.init(o,n)}),Mg=s("$ZodULID",(o,n)=>{n.pattern??(n.pattern=Jb),v.init(o,n)}),Vg=s("$ZodXID",(o,n)=>{n.pattern??(n.pattern=Qb),v.init(o,n)}),Xg=s("$ZodKSUID",(o,n)=>{n.pattern??(n.pattern=og),v.init(o,n)}),Hg=s("$ZodISODateTime",(o,n)=>{n.pattern??(n.pattern=hg(n)),v.init(o,n)}),Gg=s("$ZodISODate",(o,n)=>{n.pattern??(n.pattern=gg),v.init(o,n)}),Kg=s("$ZodISOTime",(o,n)=>{n.pattern??(n.pattern=fg(n)),v.init(o,n)}),qg=s("$ZodISODuration",(o,n)=>{n.pattern??(n.pattern=eg),v.init(o,n)}),Jg=s("$ZodIPv4",(o,n)=>{n.pattern??(n.pattern=ig),v.init(o,n),o._zod.onattach.push(e=>{const t=e._zod.bag;t.format="ipv4"})}),Qg=s("$ZodIPv6",(o,n)=>{n.pattern??(n.pattern=lg),v.init(o,n),o._zod.onattach.push(e=>{const t=e._zod.bag;t.format="ipv6"}),o._zod.check=e=>{try{new URL(`http://[${e.value}]`)}catch{e.issues.push({code:"invalid_format",format:"ipv6",input:e.value,inst:o,continue:!n.abort})}}}),of=s("$ZodCIDRv4",(o,n)=>{n.pattern??(n.pattern=cg),v.init(o,n)}),nf=s("$ZodCIDRv6",(o,n)=>{n.pattern??(n.pattern=sg),v.init(o,n),o._zod.check=e=>{const t=e.value.split("/");try{if(t.length!==2)throw new Error;const[r,d]=t;if(!d)throw new Error;const a=Number(d);if(`${a}`!==d)throw new Error;if(a<0||a>128)throw new Error;new URL(`http://[${r}]`)}catch{e.issues.push({code:"invalid_format",format:"cidrv6",input:e.value,inst:o,continue:!n.abort})}}});function Te(o){if(o==="")return!0;if(o.length%4!==0)return!1;try{return atob(o),!0}catch{return!1}}const ef=s("$ZodBase64",(o,n)=>{n.pattern??(n.pattern=ug),v.init(o,n),o._zod.onattach.push(e=>{e._zod.bag.contentEncoding="base64"}),o._zod.check=e=>{Te(e.value)||e.issues.push({code:"invalid_format",format:"base64",input:e.value,inst:o,continue:!n.abort})}});function tf(o){if(!Ee.test(o))return!1;const n=o.replace(/[-_]/g,t=>t==="-"?"+":"/"),e=n.padEnd(Math.ceil(n.length/4)*4,"=");return Te(e)}const rf=s("$ZodBase64URL",(o,n)=>{n.pattern??(n.pattern=Ee),v.init(o,n),o._zod.onattach.push(e=>{e._zod.bag.contentEncoding="base64url"}),o._zod.check=e=>{tf(e.value)||e.issues.push({code:"invalid_format",format:"base64url",input:e.value,inst:o,continue:!n.abort})}}),af=s("$ZodE164",(o,n)=>{n.pattern??(n.pattern=bg),v.init(o,n)});function df(o,n=null){try{const e=o.split(".");if(e.length!==3)return!1;const[t]=e;if(!t)return!1;const r=JSON.parse(atob(t));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||n&&(!("alg"in r)||r.alg!==n))}catch{return!1}}const lf=s("$ZodJWT",(o,n)=>{v.init(o,n),o._zod.check=e=>{df(e.value,n.alg)||e.issues.push({code:"invalid_format",format:"jwt",input:e.value,inst:o,continue:!n.abort})}}),Pe=s("$ZodNumber",(o,n)=>{$.init(o,n),o._zod.pattern=o._zod.bag.pattern??vg,o._zod.parse=(e,t)=>{if(n.coerce)try{e.value=Number(e.value)}catch{}const r=e.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return e;const d=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:"Infinity":void 0;return e.issues.push({expected:"number",code:"invalid_type",input:r,inst:o,...d?{received:d}:{}}),e}}),cf=s("$ZodNumber",(o,n)=>{zg.init(o,n),Pe.init(o,n)}),sf=s("$ZodBoolean",(o,n)=>{$.init(o,n),o._zod.pattern=wg,o._zod.parse=(e,t)=>{if(n.coerce)try{e.value=!!e.value}catch{}const r=e.value;return typeof r=="boolean"||e.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:o}),e}}),uf=s("$ZodUnknown",(o,n)=>{$.init(o,n),o._zod.parse=e=>e}),pf=s("$ZodNever",(o,n)=>{$.init(o,n),o._zod.parse=(e,t)=>(e.issues.push({expected:"never",code:"invalid_type",input:e.value,inst:o}),e)}),bf=s("$ZodDate",(o,n)=>{$.init(o,n),o._zod.parse=(e,t)=>{if(n.coerce)try{e.value=new Date(e.value)}catch{}const r=e.value,d=r instanceof Date;return d&&!Number.isNaN(r.getTime())||e.issues.push({expected:"date",code:"invalid_type",input:r,...d?{received:"Invalid Date"}:{},inst:o}),e}});function Pn(o,n,e){o.issues.length&&n.issues.push(...Be(e,o.issues)),n.value[e]=o.value}const gf=s("$ZodArray",(o,n)=>{$.init(o,n),o._zod.parse=(e,t)=>{const r=e.value;if(!Array.isArray(r))return e.issues.push({expected:"array",code:"invalid_type",input:r,inst:o}),e;e.value=Array(r.length);const d=[];for(let a=0;a<r.length;a++){const i=r[a],l=n.element._zod.run({value:i,issues:[]},t);l instanceof Promise?d.push(l.then(c=>Pn(c,e,a))):Pn(l,e,a)}return d.length?Promise.all(d).then(()=>e):e}});function Fo(o,n,e,t){o.issues.length&&n.issues.push(...Be(e,o.issues)),o.value===void 0?e in t&&(n.value[e]=void 0):n.value[e]=o.value}function Fe(o){const n=Object.keys(o.shape);for(const t of n)if(!o.shape?.[t]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${t}": expected a Zod schema`);const e=Sb(o.shape);return{...o,keys:n,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(e)}}function Ne(o,n,e,t,r,d){const a=[],i=r.keySet,l=r.catchall._zod,c=l.def.type;for(const u of Object.keys(n)){if(i.has(u))continue;if(c==="never"){a.push(u);continue}const g=l.run({value:n[u],issues:[]},t);g instanceof Promise?o.push(g.then(p=>Fo(p,e,u,n))):Fo(g,e,u,n)}return a.length&&e.issues.push({code:"unrecognized_keys",keys:a,input:n,inst:d}),o.length?Promise.all(o).then(()=>e):e}const ff=s("$ZodObject",(o,n)=>{if($.init(o,n),!Object.getOwnPropertyDescriptor(n,"shape")?.get){const i=n.shape;Object.defineProperty(n,"shape",{get:()=>{const l={...i};return Object.defineProperty(n,"shape",{value:l}),l}})}const t=ln(()=>Fe(n));k(o._zod,"propValues",()=>{const i=n.shape,l={};for(const c in i){const u=i[c]._zod;if(u.values){l[c]??(l[c]=new Set);for(const g of u.values)l[c].add(g)}}return l});const r=Po,d=n.catchall;let a;o._zod.parse=(i,l)=>{a??(a=t.value);const c=i.value;if(!r(c))return i.issues.push({expected:"object",code:"invalid_type",input:c,inst:o}),i;i.value={};const u=[],g=a.shape;for(const p of a.keys){const h=g[p]._zod.run({value:c[p],issues:[]},l);h instanceof Promise?u.push(h.then(w=>Fo(w,i,p,c))):Fo(h,i,p,c)}return d?Ne(u,c,i,l,t.value,o):u.length?Promise.all(u).then(()=>i):i}}),hf=s("$ZodObjectJIT",(o,n)=>{ff.init(o,n);const e=o._zod.parse,t=ln(()=>Fe(n)),r=p=>{const b=new Dg(["shape","payload","ctx"]),h=t.value,w=B=>{const R=An(B);return`shape[${R}]._zod.run({ value: input[${R}], issues: [] }, ctx)`};b.write("const input = payload.value;");const m=Object.create(null);let z=0;for(const B of h.keys)m[B]=`key_${z++}`;b.write("const newResult = {};");for(const B of h.keys){const R=m[B],j=An(B);b.write(`const ${R} = ${w(B)};`),b.write(`
        if (${R}.issues.length) {
          payload.issues = payload.issues.concat(${R}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${j}, ...iss.path] : [${j}]
          })));
        }
        
        
        if (${R}.value === undefined) {
          if (${j} in input) {
            newResult[${j}] = undefined;
          }
        } else {
          newResult[${j}] = ${R}.value;
        }
        
      `)}b.write("payload.value = newResult;"),b.write("return payload;");const _=b.compile();return(B,R)=>_(p,B,R)};let d;const a=Po,i=!ze.jitless,c=i&&Bb.value,u=n.catchall;let g;o._zod.parse=(p,b)=>{g??(g=t.value);const h=p.value;return a(h)?i&&c&&b?.async===!1&&b.jitless!==!0?(d||(d=r(n.shape)),p=d(p,b),u?Ne([],h,p,b,g,o):p):e(p,b):(p.issues.push({expected:"object",code:"invalid_type",input:h,inst:o}),p)}});function Fn(o,n,e,t){for(const d of o)if(d.issues.length===0)return n.value=d.value,n;const r=o.filter(d=>!J(d));return r.length===1?(n.value=r[0].value,r[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:e,errors:o.map(d=>d.issues.map(a=>X(a,t,V())))}),n)}const mf=s("$ZodUnion",(o,n)=>{$.init(o,n),k(o._zod,"optin",()=>n.options.some(r=>r._zod.optin==="optional")?"optional":void 0),k(o._zod,"optout",()=>n.options.some(r=>r._zod.optout==="optional")?"optional":void 0),k(o._zod,"values",()=>{if(n.options.every(r=>r._zod.values))return new Set(n.options.flatMap(r=>Array.from(r._zod.values)))}),k(o._zod,"pattern",()=>{if(n.options.every(r=>r._zod.pattern)){const r=n.options.map(d=>d._zod.pattern);return new RegExp(`^(${r.map(d=>sn(d.source)).join("|")})$`)}});const e=n.options.length===1,t=n.options[0]._zod.run;o._zod.parse=(r,d)=>{if(e)return t(r,d);let a=!1;const i=[];for(const l of n.options){const c=l._zod.run({value:r.value,issues:[]},d);if(c instanceof Promise)i.push(c),a=!0;else{if(c.issues.length===0)return c;i.push(c)}}return a?Promise.all(i).then(l=>Fn(l,r,o,d)):Fn(i,r,o,d)}}),kf=s("$ZodIntersection",(o,n)=>{$.init(o,n),o._zod.parse=(e,t)=>{const r=e.value,d=n.left._zod.run({value:r,issues:[]},t),a=n.right._zod.run({value:r,issues:[]},t);return d instanceof Promise||a instanceof Promise?Promise.all([d,a]).then(([l,c])=>Nn(e,l,c)):Nn(e,d,a)}});function nn(o,n){if(o===n)return{valid:!0,data:o};if(o instanceof Date&&n instanceof Date&&+o==+n)return{valid:!0,data:o};if(co(o)&&co(n)){const e=Object.keys(n),t=Object.keys(o).filter(d=>e.indexOf(d)!==-1),r={...o,...n};for(const d of t){const a=nn(o[d],n[d]);if(!a.valid)return{valid:!1,mergeErrorPath:[d,...a.mergeErrorPath]};r[d]=a.data}return{valid:!0,data:r}}if(Array.isArray(o)&&Array.isArray(n)){if(o.length!==n.length)return{valid:!1,mergeErrorPath:[]};const e=[];for(let t=0;t<o.length;t++){const r=o[t],d=n[t],a=nn(r,d);if(!a.valid)return{valid:!1,mergeErrorPath:[t,...a.mergeErrorPath]};e.push(a.data)}return{valid:!0,data:e}}return{valid:!1,mergeErrorPath:[]}}function Nn(o,n,e){if(n.issues.length&&o.issues.push(...n.issues),e.issues.length&&o.issues.push(...e.issues),J(o))return o;const t=nn(n.value,e.value);if(!t.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(t.mergeErrorPath)}`);return o.value=t.data,o}const vf=s("$ZodEnum",(o,n)=>{$.init(o,n);const e=Cb(n.entries),t=new Set(e);o._zod.values=t,o._zod.pattern=new RegExp(`^(${e.filter(r=>Rb.has(typeof r)).map(r=>typeof r=="string"?Wo(r):r.toString()).join("|")})$`),o._zod.parse=(r,d)=>{const a=r.value;return t.has(a)||r.issues.push({code:"invalid_value",values:e,input:a,inst:o}),r}}),wf=s("$ZodTransform",(o,n)=>{$.init(o,n),o._zod.parse=(e,t)=>{if(t.direction==="backward")throw new $e(o.constructor.name);const r=n.transform(e.value,e);if(t.async)return(r instanceof Promise?r:Promise.resolve(r)).then(a=>(e.value=a,e));if(r instanceof Promise)throw new Q;return e.value=r,e}});function Wn(o,n){return o.issues.length&&n===void 0?{issues:[],value:void 0}:o}const xf=s("$ZodOptional",(o,n)=>{$.init(o,n),o._zod.optin="optional",o._zod.optout="optional",k(o._zod,"values",()=>n.innerType._zod.values?new Set([...n.innerType._zod.values,void 0]):void 0),k(o._zod,"pattern",()=>{const e=n.innerType._zod.pattern;return e?new RegExp(`^(${sn(e.source)})?$`):void 0}),o._zod.parse=(e,t)=>{if(n.innerType._zod.optin==="optional"){const r=n.innerType._zod.run(e,t);return r instanceof Promise?r.then(d=>Wn(d,e.value)):Wn(r,e.value)}return e.value===void 0?e:n.innerType._zod.run(e,t)}}),yf=s("$ZodNullable",(o,n)=>{$.init(o,n),k(o._zod,"optin",()=>n.innerType._zod.optin),k(o._zod,"optout",()=>n.innerType._zod.optout),k(o._zod,"pattern",()=>{const e=n.innerType._zod.pattern;return e?new RegExp(`^(${sn(e.source)}|null)$`):void 0}),k(o._zod,"values",()=>n.innerType._zod.values?new Set([...n.innerType._zod.values,null]):void 0),o._zod.parse=(e,t)=>e.value===null?e:n.innerType._zod.run(e,t)}),$f=s("$ZodDefault",(o,n)=>{$.init(o,n),o._zod.optin="optional",k(o._zod,"values",()=>n.innerType._zod.values),o._zod.parse=(e,t)=>{if(t.direction==="backward")return n.innerType._zod.run(e,t);if(e.value===void 0)return e.value=n.defaultValue,e;const r=n.innerType._zod.run(e,t);return r instanceof Promise?r.then(d=>Ln(d,n)):Ln(r,n)}});function Ln(o,n){return o.value===void 0&&(o.value=n.defaultValue),o}const zf=s("$ZodPrefault",(o,n)=>{$.init(o,n),o._zod.optin="optional",k(o._zod,"values",()=>n.innerType._zod.values),o._zod.parse=(e,t)=>(t.direction==="backward"||e.value===void 0&&(e.value=n.defaultValue),n.innerType._zod.run(e,t))}),Cf=s("$ZodNonOptional",(o,n)=>{$.init(o,n),k(o._zod,"values",()=>{const e=n.innerType._zod.values;return e?new Set([...e].filter(t=>t!==void 0)):void 0}),o._zod.parse=(e,t)=>{const r=n.innerType._zod.run(e,t);return r instanceof Promise?r.then(d=>Un(d,o)):Un(r,o)}});function Un(o,n){return!o.issues.length&&o.value===void 0&&o.issues.push({code:"invalid_type",expected:"nonoptional",input:o.value,inst:n}),o}const _f=s("$ZodCatch",(o,n)=>{$.init(o,n),k(o._zod,"optin",()=>n.innerType._zod.optin),k(o._zod,"optout",()=>n.innerType._zod.optout),k(o._zod,"values",()=>n.innerType._zod.values),o._zod.parse=(e,t)=>{if(t.direction==="backward")return n.innerType._zod.run(e,t);const r=n.innerType._zod.run(e,t);return r instanceof Promise?r.then(d=>(e.value=d.value,d.issues.length&&(e.value=n.catchValue({...e,error:{issues:d.issues.map(a=>X(a,t,V()))},input:e.value}),e.issues=[]),e)):(e.value=r.value,r.issues.length&&(e.value=n.catchValue({...e,error:{issues:r.issues.map(d=>X(d,t,V()))},input:e.value}),e.issues=[]),e)}}),Bf=s("$ZodPipe",(o,n)=>{$.init(o,n),k(o._zod,"values",()=>n.in._zod.values),k(o._zod,"optin",()=>n.in._zod.optin),k(o._zod,"optout",()=>n.out._zod.optout),k(o._zod,"propValues",()=>n.in._zod.propValues),o._zod.parse=(e,t)=>{if(t.direction==="backward"){const d=n.out._zod.run(e,t);return d instanceof Promise?d.then(a=>Io(a,n.in,t)):Io(d,n.in,t)}const r=n.in._zod.run(e,t);return r instanceof Promise?r.then(d=>Io(d,n.out,t)):Io(r,n.out,t)}});function Io(o,n,e){return o.issues.length?(o.aborted=!0,o):n._zod.run({value:o.value,issues:o.issues},e)}const Rf=s("$ZodReadonly",(o,n)=>{$.init(o,n),k(o._zod,"propValues",()=>n.innerType._zod.propValues),k(o._zod,"values",()=>n.innerType._zod.values),k(o._zod,"optin",()=>n.innerType._zod.optin),k(o._zod,"optout",()=>n.innerType._zod.optout),o._zod.parse=(e,t)=>{if(t.direction==="backward")return n.innerType._zod.run(e,t);const r=n.innerType._zod.run(e,t);return r instanceof Promise?r.then(Yn):Yn(r)}});function Yn(o){return o.value=Object.freeze(o.value),o}const Sf=s("$ZodCustom",(o,n)=>{S.init(o,n),$.init(o,n),o._zod.parse=(e,t)=>e,o._zod.check=e=>{const t=e.value,r=n.fn(t);if(r instanceof Promise)return r.then(d=>Mn(d,e,t,o));Mn(r,e,t,o)}});function Mn(o,n,e,t){if(!o){const r={code:"custom",input:e,inst:t,path:[...t._zod.def.path??[]],continue:!t._zod.def.abort};t._zod.def.params&&(r.params=t._zod.def.params),n.issues.push(so(r))}}class Zf{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...e){const t=e[0];if(this._map.set(n,t),t&&typeof t=="object"&&"id"in t){if(this._idmap.has(t.id))throw new Error(`ID ${t.id} already exists in the registry`);this._idmap.set(t.id,n)}return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){const e=this._map.get(n);return e&&typeof e=="object"&&"id"in e&&this._idmap.delete(e.id),this._map.delete(n),this}get(n){const e=n._zod.parent;if(e){const t={...this.get(e)??{}};delete t.id;const r={...t,...this._map.get(n)};return Object.keys(r).length?r:void 0}return this._map.get(n)}has(n){return this._map.has(n)}}function Ef(){return new Zf}const Oo=Ef();function If(o,n){return new o({type:"string",...f(n)})}function Of(o,n){return new o({type:"string",format:"email",check:"string_format",abort:!1,...f(n)})}function Vn(o,n){return new o({type:"string",format:"guid",check:"string_format",abort:!1,...f(n)})}function jf(o,n){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,...f(n)})}function Df(o,n){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...f(n)})}function Af(o,n){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...f(n)})}function Tf(o,n){return new o({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...f(n)})}function Pf(o,n){return new o({type:"string",format:"url",check:"string_format",abort:!1,...f(n)})}function Ff(o,n){return new o({type:"string",format:"emoji",check:"string_format",abort:!1,...f(n)})}function Nf(o,n){return new o({type:"string",format:"nanoid",check:"string_format",abort:!1,...f(n)})}function Wf(o,n){return new o({type:"string",format:"cuid",check:"string_format",abort:!1,...f(n)})}function Lf(o,n){return new o({type:"string",format:"cuid2",check:"string_format",abort:!1,...f(n)})}function Uf(o,n){return new o({type:"string",format:"ulid",check:"string_format",abort:!1,...f(n)})}function Yf(o,n){return new o({type:"string",format:"xid",check:"string_format",abort:!1,...f(n)})}function Mf(o,n){return new o({type:"string",format:"ksuid",check:"string_format",abort:!1,...f(n)})}function Vf(o,n){return new o({type:"string",format:"ipv4",check:"string_format",abort:!1,...f(n)})}function Xf(o,n){return new o({type:"string",format:"ipv6",check:"string_format",abort:!1,...f(n)})}function Hf(o,n){return new o({type:"string",format:"cidrv4",check:"string_format",abort:!1,...f(n)})}function Gf(o,n){return new o({type:"string",format:"cidrv6",check:"string_format",abort:!1,...f(n)})}function Kf(o,n){return new o({type:"string",format:"base64",check:"string_format",abort:!1,...f(n)})}function qf(o,n){return new o({type:"string",format:"base64url",check:"string_format",abort:!1,...f(n)})}function Jf(o,n){return new o({type:"string",format:"e164",check:"string_format",abort:!1,...f(n)})}function Qf(o,n){return new o({type:"string",format:"jwt",check:"string_format",abort:!1,...f(n)})}function oh(o,n){return new o({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...f(n)})}function nh(o,n){return new o({type:"string",format:"date",check:"string_format",...f(n)})}function eh(o,n){return new o({type:"string",format:"time",check:"string_format",precision:null,...f(n)})}function th(o,n){return new o({type:"string",format:"duration",check:"string_format",...f(n)})}function rh(o,n){return new o({type:"number",checks:[],...f(n)})}function ah(o,n){return new o({type:"number",check:"number_format",abort:!1,format:"safeint",...f(n)})}function dh(o,n){return new o({type:"boolean",...f(n)})}function ih(o){return new o({type:"unknown"})}function lh(o,n){return new o({type:"never",...f(n)})}function ch(o,n){return new o({type:"date",...f(n)})}function Xn(o,n){return new De({check:"less_than",...f(n),value:o,inclusive:!1})}function Do(o,n){return new De({check:"less_than",...f(n),value:o,inclusive:!0})}function Hn(o,n){return new Ae({check:"greater_than",...f(n),value:o,inclusive:!1})}function Ao(o,n){return new Ae({check:"greater_than",...f(n),value:o,inclusive:!0})}function Gn(o,n){return new $g({check:"multiple_of",...f(n),value:o})}function We(o,n){return new Cg({check:"max_length",...f(n),maximum:o})}function No(o,n){return new _g({check:"min_length",...f(n),minimum:o})}function Le(o,n){return new Bg({check:"length_equals",...f(n),length:o})}function sh(o,n){return new Rg({check:"string_format",format:"regex",...f(n),pattern:o})}function uh(o){return new Sg({check:"string_format",format:"lowercase",...f(o)})}function ph(o){return new Zg({check:"string_format",format:"uppercase",...f(o)})}function bh(o,n){return new Eg({check:"string_format",format:"includes",...f(n),includes:o})}function gh(o,n){return new Ig({check:"string_format",format:"starts_with",...f(n),prefix:o})}function fh(o,n){return new Og({check:"string_format",format:"ends_with",...f(n),suffix:o})}function po(o){return new jg({check:"overwrite",tx:o})}function hh(o){return po(n=>n.normalize(o))}function mh(){return po(o=>o.trim())}function kh(){return po(o=>o.toLowerCase())}function vh(){return po(o=>o.toUpperCase())}function wh(o,n,e){return new o({type:"array",element:n,...f(e)})}function xh(o,n,e){return new o({type:"custom",check:"custom",fn:n,...f(e)})}function yh(o){const n=$h(e=>(e.addIssue=t=>{if(typeof t=="string")e.issues.push(so(t,e.value,n._zod.def));else{const r=t;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),r.input??(r.input=e.value),r.inst??(r.inst=n),r.continue??(r.continue=!n._zod.def.abort),e.issues.push(so(r))}},o(e.value,e)));return n}function $h(o,n){const e=new S({check:"custom",...f(n)});return e._zod.check=o,e}const zh=s("ZodISODateTime",(o,n)=>{Hg.init(o,n),x.init(o,n)});function Ch(o){return oh(zh,o)}const _h=s("ZodISODate",(o,n)=>{Gg.init(o,n),x.init(o,n)});function Bh(o){return nh(_h,o)}const Rh=s("ZodISOTime",(o,n)=>{Kg.init(o,n),x.init(o,n)});function Sh(o){return eh(Rh,o)}const Zh=s("ZodISODuration",(o,n)=>{qg.init(o,n),x.init(o,n)});function Eh(o){return th(Zh,o)}const Ue=(o,n)=>{Se.init(o,n),o.name="ZodError",Object.defineProperties(o,{format:{value:e=>Fb(o,e)},flatten:{value:e=>Pb(o,e)},addIssue:{value:e=>{o.issues.push(e),o.message=JSON.stringify(o.issues,on,2)}},addIssues:{value:e=>{o.issues.push(...e),o.message=JSON.stringify(o.issues,on,2)}},isEmpty:{get(){return o.issues.length===0}}})},lk=s("ZodError",Ue),E=s("ZodError",Ue,{Parent:Error}),Ih=pn(E),Oh=bn(E),jh=Lo(E),Dh=Uo(E),Ah=Lb(E),Th=Ub(E),Ph=Yb(E),Fh=Mb(E),Nh=Vb(E),Wh=Xb(E),Lh=Hb(E),Uh=Gb(E),C=s("ZodType",(o,n)=>($.init(o,n),o.def=n,o.type=n.type,Object.defineProperty(o,"_def",{value:n}),o.check=(...e)=>o.clone(G(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]})),o.clone=(e,t)=>L(o,e,t),o.brand=()=>o,o.register=((e,t)=>(e.add(o,t),o)),o.parse=(e,t)=>Ih(o,e,t,{callee:o.parse}),o.safeParse=(e,t)=>jh(o,e,t),o.parseAsync=async(e,t)=>Oh(o,e,t,{callee:o.parseAsync}),o.safeParseAsync=async(e,t)=>Dh(o,e,t),o.spa=o.safeParseAsync,o.encode=(e,t)=>Ah(o,e,t),o.decode=(e,t)=>Th(o,e,t),o.encodeAsync=async(e,t)=>Ph(o,e,t),o.decodeAsync=async(e,t)=>Fh(o,e,t),o.safeEncode=(e,t)=>Nh(o,e,t),o.safeDecode=(e,t)=>Wh(o,e,t),o.safeEncodeAsync=async(e,t)=>Lh(o,e,t),o.safeDecodeAsync=async(e,t)=>Uh(o,e,t),o.refine=(e,t)=>o.check(A0(e,t)),o.superRefine=e=>o.check(T0(e)),o.overwrite=e=>o.check(po(e)),o.optional=()=>Qn(o),o.nullable=()=>oe(o),o.nullish=()=>Qn(oe(o)),o.nonoptional=e=>S0(o,e),o.array=()=>f0(o),o.or=e=>k0([o,e]),o.and=e=>w0(o,e),o.transform=e=>ne(o,$0(e)),o.default=e=>_0(o,e),o.prefault=e=>R0(o,e),o.catch=e=>E0(o,e),o.pipe=e=>ne(o,e),o.readonly=()=>j0(o),o.describe=e=>{const t=o.clone();return Oo.add(t,{description:e}),t},Object.defineProperty(o,"description",{get(){return Oo.get(o)?.description},configurable:!0}),o.meta=(...e)=>{if(e.length===0)return Oo.get(o);const t=o.clone();return Oo.add(t,e[0]),t},o.isOptional=()=>o.safeParse(void 0).success,o.isNullable=()=>o.safeParse(null).success,o)),Ye=s("_ZodString",(o,n)=>{gn.init(o,n),C.init(o,n);const e=o._zod.bag;o.format=e.format??null,o.minLength=e.minimum??null,o.maxLength=e.maximum??null,o.regex=(...t)=>o.check(sh(...t)),o.includes=(...t)=>o.check(bh(...t)),o.startsWith=(...t)=>o.check(gh(...t)),o.endsWith=(...t)=>o.check(fh(...t)),o.min=(...t)=>o.check(No(...t)),o.max=(...t)=>o.check(We(...t)),o.length=(...t)=>o.check(Le(...t)),o.nonempty=(...t)=>o.check(No(1,...t)),o.lowercase=t=>o.check(uh(t)),o.uppercase=t=>o.check(ph(t)),o.trim=()=>o.check(mh()),o.normalize=(...t)=>o.check(hh(...t)),o.toLowerCase=()=>o.check(kh()),o.toUpperCase=()=>o.check(vh())}),Yh=s("ZodString",(o,n)=>{gn.init(o,n),Ye.init(o,n),o.email=e=>o.check(Of(Mh,e)),o.url=e=>o.check(Pf(Vh,e)),o.jwt=e=>o.check(Qf(i0,e)),o.emoji=e=>o.check(Ff(Xh,e)),o.guid=e=>o.check(Vn(Kn,e)),o.uuid=e=>o.check(jf(jo,e)),o.uuidv4=e=>o.check(Df(jo,e)),o.uuidv6=e=>o.check(Af(jo,e)),o.uuidv7=e=>o.check(Tf(jo,e)),o.nanoid=e=>o.check(Nf(Hh,e)),o.guid=e=>o.check(Vn(Kn,e)),o.cuid=e=>o.check(Wf(Gh,e)),o.cuid2=e=>o.check(Lf(Kh,e)),o.ulid=e=>o.check(Uf(qh,e)),o.base64=e=>o.check(Kf(r0,e)),o.base64url=e=>o.check(qf(a0,e)),o.xid=e=>o.check(Yf(Jh,e)),o.ksuid=e=>o.check(Mf(Qh,e)),o.ipv4=e=>o.check(Vf(o0,e)),o.ipv6=e=>o.check(Xf(n0,e)),o.cidrv4=e=>o.check(Hf(e0,e)),o.cidrv6=e=>o.check(Gf(t0,e)),o.e164=e=>o.check(Jf(d0,e)),o.datetime=e=>o.check(Ch(e)),o.date=e=>o.check(Bh(e)),o.time=e=>o.check(Sh(e)),o.duration=e=>o.check(Eh(e))});function ck(o){return If(Yh,o)}const x=s("ZodStringFormat",(o,n)=>{v.init(o,n),Ye.init(o,n)}),Mh=s("ZodEmail",(o,n)=>{Fg.init(o,n),x.init(o,n)}),Kn=s("ZodGUID",(o,n)=>{Tg.init(o,n),x.init(o,n)}),jo=s("ZodUUID",(o,n)=>{Pg.init(o,n),x.init(o,n)}),Vh=s("ZodURL",(o,n)=>{Ng.init(o,n),x.init(o,n)}),Xh=s("ZodEmoji",(o,n)=>{Wg.init(o,n),x.init(o,n)}),Hh=s("ZodNanoID",(o,n)=>{Lg.init(o,n),x.init(o,n)}),Gh=s("ZodCUID",(o,n)=>{Ug.init(o,n),x.init(o,n)}),Kh=s("ZodCUID2",(o,n)=>{Yg.init(o,n),x.init(o,n)}),qh=s("ZodULID",(o,n)=>{Mg.init(o,n),x.init(o,n)}),Jh=s("ZodXID",(o,n)=>{Vg.init(o,n),x.init(o,n)}),Qh=s("ZodKSUID",(o,n)=>{Xg.init(o,n),x.init(o,n)}),o0=s("ZodIPv4",(o,n)=>{Jg.init(o,n),x.init(o,n)}),n0=s("ZodIPv6",(o,n)=>{Qg.init(o,n),x.init(o,n)}),e0=s("ZodCIDRv4",(o,n)=>{of.init(o,n),x.init(o,n)}),t0=s("ZodCIDRv6",(o,n)=>{nf.init(o,n),x.init(o,n)}),r0=s("ZodBase64",(o,n)=>{ef.init(o,n),x.init(o,n)}),a0=s("ZodBase64URL",(o,n)=>{rf.init(o,n),x.init(o,n)}),d0=s("ZodE164",(o,n)=>{af.init(o,n),x.init(o,n)}),i0=s("ZodJWT",(o,n)=>{lf.init(o,n),x.init(o,n)}),Me=s("ZodNumber",(o,n)=>{Pe.init(o,n),C.init(o,n),o.gt=(t,r)=>o.check(Hn(t,r)),o.gte=(t,r)=>o.check(Ao(t,r)),o.min=(t,r)=>o.check(Ao(t,r)),o.lt=(t,r)=>o.check(Xn(t,r)),o.lte=(t,r)=>o.check(Do(t,r)),o.max=(t,r)=>o.check(Do(t,r)),o.int=t=>o.check(qn(t)),o.safe=t=>o.check(qn(t)),o.positive=t=>o.check(Hn(0,t)),o.nonnegative=t=>o.check(Ao(0,t)),o.negative=t=>o.check(Xn(0,t)),o.nonpositive=t=>o.check(Do(0,t)),o.multipleOf=(t,r)=>o.check(Gn(t,r)),o.step=(t,r)=>o.check(Gn(t,r)),o.finite=()=>o;const e=o._zod.bag;o.minValue=Math.max(e.minimum??Number.NEGATIVE_INFINITY,e.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,o.maxValue=Math.min(e.maximum??Number.POSITIVE_INFINITY,e.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,o.isInt=(e.format??"").includes("int")||Number.isSafeInteger(e.multipleOf??.5),o.isFinite=!0,o.format=e.format??null});function sk(o){return rh(Me,o)}const l0=s("ZodNumberFormat",(o,n)=>{cf.init(o,n),Me.init(o,n)});function qn(o){return ah(l0,o)}const c0=s("ZodBoolean",(o,n)=>{sf.init(o,n),C.init(o,n)});function uk(o){return dh(c0,o)}const s0=s("ZodUnknown",(o,n)=>{uf.init(o,n),C.init(o,n)});function Jn(){return ih(s0)}const u0=s("ZodNever",(o,n)=>{pf.init(o,n),C.init(o,n)});function p0(o){return lh(u0,o)}const b0=s("ZodDate",(o,n)=>{bf.init(o,n),C.init(o,n),o.min=(t,r)=>o.check(Ao(t,r)),o.max=(t,r)=>o.check(Do(t,r));const e=o._zod.bag;o.minDate=e.minimum?new Date(e.minimum):null,o.maxDate=e.maximum?new Date(e.maximum):null});function pk(o){return ch(b0,o)}const g0=s("ZodArray",(o,n)=>{gf.init(o,n),C.init(o,n),o.element=n.element,o.min=(e,t)=>o.check(No(e,t)),o.nonempty=e=>o.check(No(1,e)),o.max=(e,t)=>o.check(We(e,t)),o.length=(e,t)=>o.check(Le(e,t)),o.unwrap=()=>o.element});function f0(o,n){return wh(g0,o,n)}const h0=s("ZodObject",(o,n)=>{hf.init(o,n),C.init(o,n),k(o,"shape",()=>n.shape),o.keyof=()=>x0(Object.keys(o._zod.def.shape)),o.catchall=e=>o.clone({...o._zod.def,catchall:e}),o.passthrough=()=>o.clone({...o._zod.def,catchall:Jn()}),o.loose=()=>o.clone({...o._zod.def,catchall:Jn()}),o.strict=()=>o.clone({...o._zod.def,catchall:p0()}),o.strip=()=>o.clone({...o._zod.def,catchall:void 0}),o.extend=e=>Ob(o,e),o.safeExtend=e=>jb(o,e),o.merge=e=>Db(o,e),o.pick=e=>Eb(o,e),o.omit=e=>Ib(o,e),o.partial=(...e)=>Ab(Ve,o,e[0]),o.required=(...e)=>Tb(Xe,o,e[0])});function bk(o,n){const e={type:"object",shape:o??{},...f(n)};return new h0(e)}const m0=s("ZodUnion",(o,n)=>{mf.init(o,n),C.init(o,n),o.options=n.options});function k0(o,n){return new m0({type:"union",options:o,...f(n)})}const v0=s("ZodIntersection",(o,n)=>{kf.init(o,n),C.init(o,n)});function w0(o,n){return new v0({type:"intersection",left:o,right:n})}const en=s("ZodEnum",(o,n)=>{vf.init(o,n),C.init(o,n),o.enum=n.entries,o.options=Object.values(n.entries);const e=new Set(Object.keys(n.entries));o.extract=(t,r)=>{const d={};for(const a of t)if(e.has(a))d[a]=n.entries[a];else throw new Error(`Key ${a} not found in enum`);return new en({...n,checks:[],...f(r),entries:d})},o.exclude=(t,r)=>{const d={...n.entries};for(const a of t)if(e.has(a))delete d[a];else throw new Error(`Key ${a} not found in enum`);return new en({...n,checks:[],...f(r),entries:d})}});function x0(o,n){const e=Array.isArray(o)?Object.fromEntries(o.map(t=>[t,t])):o;return new en({type:"enum",entries:e,...f(n)})}const y0=s("ZodTransform",(o,n)=>{wf.init(o,n),C.init(o,n),o._zod.parse=(e,t)=>{if(t.direction==="backward")throw new $e(o.constructor.name);e.addIssue=d=>{if(typeof d=="string")e.issues.push(so(d,e.value,n));else{const a=d;a.fatal&&(a.continue=!1),a.code??(a.code="custom"),a.input??(a.input=e.value),a.inst??(a.inst=o),e.issues.push(so(a))}};const r=n.transform(e.value,e);return r instanceof Promise?r.then(d=>(e.value=d,e)):(e.value=r,e)}});function $0(o){return new y0({type:"transform",transform:o})}const Ve=s("ZodOptional",(o,n)=>{xf.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType});function Qn(o){return new Ve({type:"optional",innerType:o})}const z0=s("ZodNullable",(o,n)=>{yf.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType});function oe(o){return new z0({type:"nullable",innerType:o})}const C0=s("ZodDefault",(o,n)=>{$f.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType,o.removeDefault=o.unwrap});function _0(o,n){return new C0({type:"default",innerType:o,get defaultValue(){return typeof n=="function"?n():_e(n)}})}const B0=s("ZodPrefault",(o,n)=>{zf.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType});function R0(o,n){return new B0({type:"prefault",innerType:o,get defaultValue(){return typeof n=="function"?n():_e(n)}})}const Xe=s("ZodNonOptional",(o,n)=>{Cf.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType});function S0(o,n){return new Xe({type:"nonoptional",innerType:o,...f(n)})}const Z0=s("ZodCatch",(o,n)=>{_f.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType,o.removeCatch=o.unwrap});function E0(o,n){return new Z0({type:"catch",innerType:o,catchValue:typeof n=="function"?n:()=>n})}const I0=s("ZodPipe",(o,n)=>{Bf.init(o,n),C.init(o,n),o.in=n.in,o.out=n.out});function ne(o,n){return new I0({type:"pipe",in:o,out:n})}const O0=s("ZodReadonly",(o,n)=>{Rf.init(o,n),C.init(o,n),o.unwrap=()=>o._zod.def.innerType});function j0(o){return new O0({type:"readonly",innerType:o})}const D0=s("ZodCustom",(o,n)=>{Sf.init(o,n),C.init(o,n)});function A0(o,n={}){return xh(D0,o,n)}function T0(o){return yh(o)}var gk=`
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
`,fk=`
    .p-message {
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
        height: 100%;
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

    .p-message-enter-from {
        opacity: 0;
    }

    .p-message-enter-active {
        transition: opacity 0.3s;
    }

    .p-message.p-message-leave-from {
        max-height: 1000px;
    }

    .p-message.p-message-leave-to {
        max-height: 0;
        opacity: 0;
        margin: 0;
    }

    .p-message-leave-active {
        overflow: hidden;
        transition:
            max-height 0.45s cubic-bezier(0, 1, 0, 1),
            opacity 0.3s,
            margin 0.3s;
    }

    .p-message-leave-active .p-message-close-button {
        opacity: 0;
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
`,hk=`
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
`,mk=`
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
`,kk=`
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
`,vk=`
    .p-buttongroup {
        display: inline-flex;
    }

    .p-buttongroup .p-button {
        margin: 0;
    }

    .p-buttongroup .p-button:not(:last-child),
    .p-buttongroup .p-button:not(:last-child):hover {
        border-inline-end: 0 none;
    }

    .p-buttongroup .p-button:not(:first-of-type):not(:last-of-type) {
        border-radius: 0;
    }

    .p-buttongroup .p-button:first-of-type:not(:only-of-type) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-buttongroup .p-button:last-of-type:not(:only-of-type) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-buttongroup .p-button:focus {
        position: relative;
        z-index: 1;
    }
`,wk=`
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
`,xk=`
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
`,yk=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border: 1px solid dt('drawer.border.color');
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

    .p-drawer-left .p-drawer-enter-from,
    .p-drawer-left .p-drawer-leave-to {
        transform: translateX(-100%);
    }

    .p-drawer-right .p-drawer-enter-from,
    .p-drawer-right .p-drawer-leave-to {
        transform: translateX(100%);
    }

    .p-drawer-top .p-drawer-enter-from,
    .p-drawer-top .p-drawer-leave-to {
        transform: translateY(-100%);
    }

    .p-drawer-bottom .p-drawer-enter-from,
    .p-drawer-bottom .p-drawer-leave-to {
        transform: translateY(100%);
    }

    .p-drawer-full .p-drawer-enter-from,
    .p-drawer-full .p-drawer-leave-to {
        opacity: 0;
    }

    .p-drawer-full .p-drawer-enter-active,
    .p-drawer-full .p-drawer-leave-active {
        transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
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
`,$k=`
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
`,zk=`
    .p-knob-range {
        fill: none;
        transition: stroke 0.1s ease-in;
    }

    .p-knob-value {
        animation-name: p-knob-dash-frame;
        animation-fill-mode: forwards;
        fill: none;
    }

    .p-knob-text {
        font-size: 1.3rem;
        text-align: center;
    }

    .p-knob svg {
        border-radius: 50%;
        outline-color: transparent;
        transition:
            background dt('knob.transition.duration'),
            color dt('knob.transition.duration'),
            outline-color dt('knob.transition.duration'),
            box-shadow dt('knob.transition.duration');
    }

    .p-knob svg:focus-visible {
        box-shadow: dt('knob.focus.ring.shadow');
        outline: dt('knob.focus.ring.width') dt('knob.focus.ring.style') dt('knob.focus.ring.color');
        outline-offset: dt('knob.focus.ring.offset');
    }

    @keyframes p-knob-dash-frame {
        100% {
            stroke-dashoffset: 0;
        }
    }
`,Ck=`
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
`,_k=`
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
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
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
`,Bk=`
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
`,Rk=`
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
`,Sk=`
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
`,ee=(o,n)=>n?D(o)&&Object.hasOwn(o,n)?o:{[n]:o}:o,Zk=(o,n,e)=>async({values:t,name:r})=>{let{sync:d=!1,raw:a=!1}={};try{let i=await o[d?"parse":"parseAsync"](t,n);return{values:ee(a?t:i,r),errors:{}}}catch(i){if(Array.isArray(i?.issues||i?.errors))return{values:ee(a?t:void 0,r),errors:(i.issues||i.errors).reduce((l,c)=>{let u=y(c.path)?c.path.join("."):r;return u&&(l[u]||=[],l[u].push(c)),l},{})};throw i}},Ek=`
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

`,Ik=`
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
`,Ok=`
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
`,jk=`
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
`;export{jm as $,ae as A,U0 as B,Qo as C,am as D,ao as E,Rt as F,pt as G,Im as H,Fm as I,Nm as J,rm as K,em as L,G0 as M,U as N,q0 as O,wn as P,K0 as Q,cm as R,lo as S,M0 as T,X0 as U,gm as V,vn as W,N0 as X,Cn as Y,lk as Z,x0 as _,xt as a,vk as a$,P0 as a0,Wm as a1,re as a2,L0 as a3,Lm as a4,im as a5,Um as a6,bt as a7,ht as a8,mt as a9,ek as aA,tk as aB,km as aC,rk as aD,vt as aE,Rm as aF,nm as aG,om as aH,Q0 as aI,kt as aJ,F0 as aK,vm as aL,pm as aM,zm as aN,Sm as aO,tm as aP,dm as aQ,sm as aR,ak as aS,dk as aT,ik as aU,gk as aV,fk as aW,hk as aX,mk as aY,kk as aZ,ym as a_,H0 as aa,hm as ab,Ym as ac,Mm as ad,W0 as ae,Bt as af,Bm as ag,$n as ah,Cm as ai,Xm as aj,Hm as ak,Gm as al,Km as am,qm as an,Jm as ao,Qm as ap,fm as aq,ok as ar,wm as as,de as at,Y0 as au,um as av,$m as aw,nk as ax,V0 as ay,lm as az,uk as b,wk as b0,xk as b1,yk as b2,$k as b3,zk as b4,Ck as b5,_k as b6,Bk as b7,Rk as b8,Sk as b9,_m as ba,Ek as bb,Ik as bc,Ok as bd,jk as be,Om as bf,Vm as bg,mm as c,pk as d,Am as e,Dm as f,y as g,Zk as h,W as i,xm as j,zn as k,ce as l,P as m,sk as n,bk as o,oo as p,Tm as q,M as r,ck as s,bm as t,Em as u,Zm as v,D as w,Pm as x,J0 as y,wt as z};
