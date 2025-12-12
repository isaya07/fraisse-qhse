import{B as D,X as V,a0 as O,a1 as R,a2 as E,ag as y,af as I,a3 as U,a4 as P,a6 as v,r as B,c as h,o as f,p as w,b,A as p,w as g,ab as T,a,d as j,h as H,i as X,v as L,t as S,u as M,k as z,F as G,I as A}from"./index-d7axL_xv.js";import{b as $,s as K}from"./index-DZQqA5uS.js";var Y=`
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
`,N={root:"p-colorpicker p-component",preview:function(e){var n=e.props;return["p-colorpicker-preview",{"p-disabled":n.disabled}]},panel:function(e){var n=e.instance,r=e.props;return["p-colorpicker-panel",{"p-colorpicker-panel-inline":r.inline,"p-disabled":r.disabled,"p-invalid":n.$invalid}]},colorSelector:"p-colorpicker-color-selector",colorBackground:"p-colorpicker-color-background",colorHandle:"p-colorpicker-color-handle",hue:"p-colorpicker-hue",hueHandle:"p-colorpicker-hue-handle"},Z=D.extend({name:"colorpicker",style:Y,classes:N}),q={name:"BaseColorPicker",extends:$,props:{defaultColor:{type:null,default:"ff0000"},inline:{type:Boolean,default:!1},format:{type:String,default:"hex"},tabindex:{type:String,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},inputId:{type:String,default:null},panelClass:null,overlayClass:null},style:Z,provide:function(){return{$pcColorPicker:this,$parentInstance:this}}},F={name:"ColorPicker",extends:q,inheritAttrs:!1,emits:["change","show","hide"],data:function(){return{overlayVisible:!1}},hsbValue:null,localHue:null,outsideClickListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,scrollHandler:null,resizeListener:null,hueDragging:null,colorDragging:null,selfUpdate:null,picker:null,colorSelector:null,colorHandle:null,hueView:null,hueHandle:null,watch:{modelValue:{immediate:!0,handler:function(e){this.hsbValue=this.toHSB(e),this.selfUpdate?this.selfUpdate=!1:this.updateUI()}}},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindDragListeners(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.picker&&this.autoZIndex&&v.clear(this.picker),this.clearRefs()},mounted:function(){this.updateUI()},methods:{pickColor:function(e){var n=this.colorSelector.getBoundingClientRect(),r=n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),l=n.left+document.body.scrollLeft,i=Math.floor(100*Math.max(0,Math.min(150,(e.pageX||e.changedTouches[0].pageX)-l))/150),s=Math.floor(100*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-r)))/150);this.hsbValue=this.validateHSB({h:this.localHue,s:i,b:s}),this.selfUpdate=!0,this.updateColorHandle(),this.updateInput(),this.updateModel(e)},pickHue:function(e){var n=this.hueView.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0);this.localHue=Math.floor(360*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-n)))/150),this.hsbValue=this.validateHSB({h:this.localHue,s:this.hsbValue.s,b:this.hsbValue.b}),this.selfUpdate=!0,this.updateColorSelector(),this.updateHue(),this.updateModel(e),this.updateInput()},updateModel:function(e){var n=this.d_value;switch(this.format){case"hex":n=this.HSBtoHEX(this.hsbValue);break;case"rgb":n=this.HSBtoRGB(this.hsbValue);break;case"hsb":n=this.hsbValue;break}this.writeValue(n,e),this.$emit("change",{event:e,value:n})},updateColorSelector:function(){if(this.colorSelector){var e=this.validateHSB({h:this.hsbValue.h,s:100,b:100});this.colorSelector.style.backgroundColor="#"+this.HSBtoHEX(e)}},updateColorHandle:function(){this.colorHandle&&(this.colorHandle.style.left=Math.floor(150*this.hsbValue.s/100)+"px",this.colorHandle.style.top=Math.floor(150*(100-this.hsbValue.b)/100)+"px")},updateHue:function(){this.hueHandle&&(this.hueHandle.style.top=Math.floor(150-150*this.hsbValue.h/360)+"px")},updateInput:function(){this.$refs.input&&(this.$refs.input.style.backgroundColor="#"+this.HSBtoHEX(this.hsbValue))},updateUI:function(){this.updateHue(),this.updateColorHandle(),this.updateInput(),this.updateColorSelector()},validateHSB:function(e){return{h:Math.min(360,Math.max(0,e.h)),s:Math.min(100,Math.max(0,e.s)),b:Math.min(100,Math.max(0,e.b))}},validateRGB:function(e){return{r:Math.min(255,Math.max(0,e.r)),g:Math.min(255,Math.max(0,e.g)),b:Math.min(255,Math.max(0,e.b))}},validateHEX:function(e){var n=6-e.length;if(n>0){for(var r=[],l=0;l<n;l++)r.push("0");r.push(e),e=r.join("")}return e},HEXtoRGB:function(e){var n=parseInt(e.indexOf("#")>-1?e.substring(1):e,16);return{r:n>>16,g:(n&65280)>>8,b:n&255}},HEXtoHSB:function(e){return this.RGBtoHSB(this.HEXtoRGB(e))},RGBtoHSB:function(e){var n={h:0,s:0,b:0},r=Math.min(e.r,e.g,e.b),l=Math.max(e.r,e.g,e.b),i=l-r;return n.b=l,n.s=l!==0?255*i/l:0,n.s!==0?e.r===l?n.h=(e.g-e.b)/i:e.g===l?n.h=2+(e.b-e.r)/i:n.h=4+(e.r-e.g)/i:n.h=-1,n.h*=60,n.h<0&&(n.h+=360),n.s*=100/255,n.b*=100/255,n},HSBtoRGB:function(e){var n={r:null,g:null,b:null},r=Math.round(e.h),l=Math.round(e.s*255/100),i=Math.round(e.b*255/100);if(l===0)n={r:i,g:i,b:i};else{var s=i,o=(255-l)*i/255,c=(s-o)*(r%60)/60;r===360&&(r=0),r<60?(n.r=s,n.b=o,n.g=o+c):r<120?(n.g=s,n.b=o,n.r=s-c):r<180?(n.g=s,n.r=o,n.b=o+c):r<240?(n.b=s,n.r=o,n.g=s-c):r<300?(n.b=s,n.g=o,n.r=o+c):r<360?(n.r=s,n.g=o,n.b=s-c):(n.r=0,n.g=0,n.b=0)}return{r:Math.round(n.r),g:Math.round(n.g),b:Math.round(n.b)}},RGBtoHEX:function(e){var n=[e.r.toString(16),e.g.toString(16),e.b.toString(16)];for(var r in n)n[r].length===1&&(n[r]="0"+n[r]);return n.join("")},HSBtoHEX:function(e){return this.RGBtoHEX(this.HSBtoRGB(e))},toHSB:function(e){var n;if(e)switch(this.format){case"hex":n=this.HEXtoHSB(e);break;case"rgb":n=this.RGBtoHSB(e);break;case"hsb":n=e;break}else n=this.HEXtoHSB(this.defaultColor);return n.s===0||n.b===0?n.h=this.localHue:this.localHue=n.h,n},onOverlayEnter:function(e){this.updateUI(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&v.set("overlay",e,this.baseZIndex,this.$primevue.config.zIndex.overlay),this.$attrSelector&&e.setAttribute(this.$attrSelector,""),this.$emit("show")},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.clearRefs(),this.$emit("hide")},onOverlayAfterLeave:function(e){this.autoZIndex&&v.clear(e)},alignOverlay:function(){this.appendTo==="self"?U(this.picker,this.$refs.input):P(this.picker,this.$refs.input)},onInputClick:function(){this.disabled||(this.overlayVisible=!this.overlayVisible)},onInputKeydown:function(e){switch(e.code){case"Space":this.overlayVisible=!this.overlayVisible,e.preventDefault();break;case"Escape":case"Tab":this.overlayVisible=!1;break}},onInputBlur:function(e){var n,r;(n=(r=this.formField).onBlur)===null||n===void 0||n.call(r)},onColorMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onColorDragStart(e))},onColorDragStart:function(e){this.disabled||(this.colorDragging=!0,this.pickColor(e),this.$el.setAttribute("p-colorpicker-dragging","true"),!this.isUnstyled&&y(this.$el,"p-colorpicker-dragging"),e.preventDefault())},onDrag:function(e){this.colorDragging&&(this.pickColor(e),e.preventDefault()),this.hueDragging&&(this.pickHue(e),e.preventDefault())},onDragEnd:function(){this.colorDragging=!1,this.hueDragging=!1,this.$el.setAttribute("p-colorpicker-dragging","false"),!this.isUnstyled&&I(this.$el,"p-colorpicker-dragging"),this.unbindDragListeners()},onHueMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onHueDragStart(e))},onHueDragStart:function(e){this.disabled||(this.hueDragging=!0,this.pickHue(e),!this.isUnstyled&&y(this.$el,"p-colorpicker-dragging"),e.preventDefault())},isInputClicked:function(e){return this.$refs.input&&this.$refs.input.isSameNode(e.target)},bindDragListeners:function(){this.bindDocumentMouseMoveListener(),this.bindDocumentMouseUpListener()},unbindDragListeners:function(){this.unbindDocumentMouseMoveListener(),this.unbindDocumentMouseUpListener()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(n){e.overlayVisible&&e.picker&&!e.picker.contains(n.target)&&!e.isInputClicked(n)&&(e.overlayVisible=!1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new E(this.$refs.container,function(){e.overlayVisible&&(e.overlayVisible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!R()&&(e.overlayVisible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindDocumentMouseMoveListener:function(){this.documentMouseMoveListener||(this.documentMouseMoveListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.documentMouseMoveListener))},unbindDocumentMouseMoveListener:function(){this.documentMouseMoveListener&&(document.removeEventListener("mousemove",this.documentMouseMoveListener),this.documentMouseMoveListener=null)},bindDocumentMouseUpListener:function(){this.documentMouseUpListener||(this.documentMouseUpListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.documentMouseUpListener))},unbindDocumentMouseUpListener:function(){this.documentMouseUpListener&&(document.removeEventListener("mouseup",this.documentMouseUpListener),this.documentMouseUpListener=null)},pickerRef:function(e){this.picker=e},colorSelectorRef:function(e){this.colorSelector=e},colorHandleRef:function(e){this.colorHandle=e},hueViewRef:function(e){this.hueView=e},hueHandleRef:function(e){this.hueHandle=e},clearRefs:function(){this.picker=null,this.colorSelector=null,this.colorHandle=null,this.hueView=null,this.hueHandle=null},onOverlayClick:function(e){O.emit("overlay-click",{originalEvent:e,target:this.$el})}},components:{Portal:V}};function m(t){"@babel/helpers - typeof";return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(t)}function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(t,l).enumerable})),n.push.apply(n,r)}return n}function x(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?C(Object(n),!0).forEach(function(r){Q(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Q(t,e,n){return(e=W(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function W(t){var e=J(t,"string");return m(e)=="symbol"?e:e+""}function J(t,e){if(m(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(m(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var _=["id","tabindex","disabled"];function ee(t,e,n,r,l,i){var s=B("Portal");return f(),h("div",p({ref:"container",class:t.cx("root")},t.ptmi("root")),[t.inline?w("",!0):(f(),h("input",p({key:0,ref:"input",id:t.inputId,type:"text",class:t.cx("preview"),readonly:"",tabindex:t.tabindex,disabled:t.disabled,onClick:e[0]||(e[0]=function(){return i.onInputClick&&i.onInputClick.apply(i,arguments)}),onKeydown:e[1]||(e[1]=function(){return i.onInputKeydown&&i.onInputKeydown.apply(i,arguments)}),onBlur:e[2]||(e[2]=function(){return i.onInputBlur&&i.onInputBlur.apply(i,arguments)})},t.ptm("preview")),null,16,_)),b(s,{appendTo:t.appendTo,disabled:t.inline},{default:g(function(){return[b(T,p({name:"p-connected-overlay",onEnter:i.onOverlayEnter,onLeave:i.onOverlayLeave,onAfterLeave:i.onOverlayAfterLeave},t.ptm("transition")),{default:g(function(){return[t.inline||l.overlayVisible?(f(),h("div",p({key:0,ref:i.pickerRef,class:[t.cx("panel"),t.panelClass,t.overlayClass],onClick:e[11]||(e[11]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)})},x(x({},t.ptm("panel")),t.ptm("overlay"))),[a("div",p({class:t.cx("content")},t.ptm("content")),[a("div",p({ref:i.colorSelectorRef,class:t.cx("colorSelector"),onMousedown:e[3]||(e[3]=function(o){return i.onColorMousedown(o)}),onTouchstart:e[4]||(e[4]=function(o){return i.onColorDragStart(o)}),onTouchmove:e[5]||(e[5]=function(o){return i.onDrag(o)}),onTouchend:e[6]||(e[6]=function(o){return i.onDragEnd()})},t.ptm("colorSelector")),[a("div",p({class:t.cx("colorBackground")},t.ptm("colorBackground")),[a("div",p({ref:i.colorHandleRef,class:t.cx("colorHandle")},t.ptm("colorHandle")),null,16)],16)],16),a("div",p({ref:i.hueViewRef,class:t.cx("hue"),onMousedown:e[7]||(e[7]=function(o){return i.onHueMousedown(o)}),onTouchstart:e[8]||(e[8]=function(o){return i.onHueDragStart(o)}),onTouchmove:e[9]||(e[9]=function(o){return i.onDrag(o)}),onTouchend:e[10]||(e[10]=function(o){return i.onDragEnd()})},t.ptm("hue")),[a("div",p({ref:i.hueHandleRef,class:t.cx("hueHandle")},t.ptm("hueHandle")),null,16)],16)],16)],16)):w("",!0)]}),_:1},16,["onEnter","onLeave","onAfterLeave"])]}),_:1},8,["appendTo","disabled"])],16)}F.render=ee;const te={class:"icon-picker"},ne={class:"w-8 h-8 flex items-center justify-center bg-surface-100 dark:bg-surface-700 rounded text-color-secondary"},re={class:"flex-1 text-color-secondary"},ie={class:"flex flex-col gap-4"},oe={class:"p-input-icon-left w-full"},le={class:"h-[30rem] overflow-y-auto custom-scrollbar p-1"},se={key:0,class:"text-center py-8 text-color-secondary"},ae={key:1,class:"grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2"},ue=["onClick","title"],he=j({__name:"IconPicker",props:{modelValue:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:e}){const n=e,r=H(!1),l=H(""),i=["folder","folder-open","file","file-alt","file-lines","clipboard","clipboard-list","clipboard-check","check","check-circle","check-double","times","times-circle","exclamation","exclamation-circle","exclamation-triangle","info","info-circle","question","question-circle","user","user-circle","users","user-plus","user-check","user-tie","user-graduate","graduation-cap","book","book-open","bookmark","calendar","calendar-alt","calendar-check","calendar-plus","clock","building","home","industry","warehouse","cog","cogs","tools","wrench","hammer","chart-bar","chart-line","chart-pie","chart-area","eye","eye-slash","search","filter","sort","lock","lock-open","key","shield-alt","envelope","paper-plane","inbox","phone","mobile-alt","map-marker-alt","globe","flag","star","heart","thumbs-up","thumbs-down","trash","trash-alt","edit","pen","pencil-alt","save","download","upload","cloud","link","unlink","external-link-alt","list","list-ul","list-ol","list-check","th","th-large","th-list","arrow-right","arrow-left","arrow-up","arrow-down","sync","sync-alt","redo","undo","plus","plus-circle","minus","minus-circle","medkit","first-aid","heartbeat","stethoscope","hard-hat","fire-extinguisher","biohazard"],s=X(()=>{if(!l.value)return i;const c=l.value.toLowerCase();return i.filter(u=>u.toLowerCase().includes(c))}),o=c=>{n("update:modelValue",c),r.value=!1};return(c,u)=>{const k=B("font-awesome-icon");return f(),h("div",te,[a("div",{class:L(["flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors",{"border-primary-500 ring-2 ring-primary-200 dark:ring-primary-900/50":r.value}]),onClick:u[0]||(u[0]=d=>r.value=!0)},[a("div",ne,[b(k,{icon:t.modelValue||"circle-question"},null,8,["icon"])]),a("span",re,S(t.modelValue||"Sélectionner une icône"),1),u[3]||(u[3]=a("i",{class:"pi pi-chevron-down text-color-secondary"},null,-1))],2),b(M(z),{visible:r.value,"onUpdate:visible":u[2]||(u[2]=d=>r.value=d),modal:"",header:"Choisir une icône",style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:g(()=>[a("div",ie,[a("span",oe,[u[4]||(u[4]=a("i",{class:"pi pi-search"},null,-1)),b(M(K),{modelValue:l.value,"onUpdate:modelValue":u[1]||(u[1]=d=>l.value=d),placeholder:"Rechercher une icône...",class:"w-full",autofocus:""},null,8,["modelValue"])]),a("div",le,[s.value.length===0?(f(),h("div",se,[a("p",null,'Aucune icône trouvée pour "'+S(l.value)+'"',1)])):(f(),h("div",ae,[(f(!0),h(G,null,A(s.value,d=>(f(),h("div",{key:d,class:L(["aspect-square flex flex-col items-center justify-center rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 text-color transition-colors gap-1 p-1",{"bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 ring-2 ring-primary-200 dark:ring-primary-500/50":t.modelValue===d}]),onClick:ce=>o(d),title:d},[b(k,{icon:d,class:"text-xl"},null,8,["icon"])],10,ue))),128))]))])])]),_:1},8,["visible"])])}}});export{he as _,F as s};
