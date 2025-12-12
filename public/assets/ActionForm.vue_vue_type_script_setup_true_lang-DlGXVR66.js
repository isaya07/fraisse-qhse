import{B as M,R as X,M as $,Z as U,U as re,l as se,c as p,o as b,a as g,z as A,v as D,p as w,A as v,t as f,al as z,O as V,r as Y,F as de,I as ue,m as ge,ac as ce,w as S,Q as be,aq as pe,ar as he,as as fe,d as me,h as j,i as H,q as ve,j as ye,n as we,b as h,u as m,x as N,s as q}from"./index-d7axL_xv.js";import{b as K,s as Se}from"./index-DZQqA5uS.js";import{s as R}from"./index-C4Jjik4c.js";import{s as ke}from"./index-BrM16FOF.js";import{s as xe}from"./index-BJVb_8vX.js";import{s as F}from"./index-BjfdDptO.js";import{u as De}from"./actionTypes-DJoqH7I9.js";import{u as Le}from"./users-CbvhcKd8.js";import{o as Be,n as W,s as T,Z as Pe}from"./schemas-C8kxHR-7.js";var Ve=`
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
`,Te={root:function(t){var n=t.instance,a=t.props;return["p-togglebutton p-component",{"p-togglebutton-checked":n.active,"p-invalid":n.$invalid,"p-togglebutton-fluid":a.fluid,"p-togglebutton-sm p-inputfield-sm":a.size==="small","p-togglebutton-lg p-inputfield-lg":a.size==="large"}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},Ee=M.extend({name:"togglebutton",style:Ve,classes:Te}),ze={name:"BaseToggleButton",extends:K,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Ee,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function L(e){"@babel/helpers - typeof";return L=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(e)}function Ae(e,t,n){return(t=Oe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Oe(e){var t=Ce(e,"string");return L(t)=="symbol"?t:t+""}function Ce(e,t){if(L(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t);if(L(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Z={name:"ToggleButton",extends:ze,inheritAttrs:!1,emits:["change"],methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{active:this.active,disabled:this.disabled}})},onChange:function(t){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,t),this.$emit("change",t))},onBlur:function(t){var n,a;(n=(a=this.formField).onBlur)===null||n===void 0||n.call(a,t)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return U(this.onLabel)&&U(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:" "},dataP:function(){return $(Ae({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:X}},Ie=["tabindex","disabled","aria-pressed","aria-label","aria-labelledby","data-p-checked","data-p-disabled","data-p"],Me=["data-p"];function $e(e,t,n,a,l,i){var o=re("ripple");return se((b(),p("button",v({type:"button",class:e.cx("root"),tabindex:e.tabindex,disabled:e.disabled,"aria-pressed":e.d_value,onClick:t[0]||(t[0]=function(){return i.onChange&&i.onChange.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onBlur&&i.onBlur.apply(i,arguments)})},i.getPTOptions("root"),{"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"data-p-checked":i.active,"data-p-disabled":e.disabled,"data-p":i.dataP}),[g("span",v({class:e.cx("content")},i.getPTOptions("content"),{"data-p":i.dataP}),[A(e.$slots,"default",{},function(){return[A(e.$slots,"icon",{value:e.d_value,class:D(e.cx("icon"))},function(){return[e.onIcon||e.offIcon?(b(),p("span",v({key:0,class:[e.cx("icon"),e.d_value?e.onIcon:e.offIcon]},i.getPTOptions("icon")),null,16)):w("",!0)]}),g("span",v({class:e.cx("label")},i.getPTOptions("label")),f(i.label),17)]})],16,Me)],16,Ie)),[[o]])}Z.render=$e;var Ke=`
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
`,_e={root:function(t){var n=t.props,a=t.instance;return["p-selectbutton p-component",{"p-invalid":a.$invalid,"p-selectbutton-fluid":n.fluid}]}},Ue=M.extend({name:"selectbutton",style:Ke,classes:_e}),je={name:"BaseSelectButton",extends:K,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Ue,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function He(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Q(e))||t){n&&(e=n);var a=0,l=function(){};return{s:l,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(y){throw y},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var y=n.next();return o=y.done,y},e:function(y){s=!0,i=y},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw i}}}}function Ne(e){return Fe(e)||Re(e)||Q(e)||qe()}function qe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Q(e,t){if(e){if(typeof e=="string")return O(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}function Re(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Fe(e){if(Array.isArray(e))return O(e)}function O(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}var C={name:"SelectButton",extends:je,inheritAttrs:!1,emits:["change"],methods:{getOptionLabel:function(t){return this.optionLabel?V(t,this.optionLabel):t},getOptionValue:function(t){return this.optionValue?V(t,this.optionValue):t},getOptionRenderKey:function(t){return this.dataKey?V(t,this.dataKey):this.getOptionLabel(t)},isOptionDisabled:function(t){return this.optionDisabled?V(t,this.optionDisabled):!1},isOptionReadonly:function(t){if(this.allowEmpty)return!1;var n=this.isSelected(t);return this.multiple?n&&this.d_value.length===1:n},onOptionSelect:function(t,n,a){var l=this;if(!(this.disabled||this.isOptionDisabled(n)||this.isOptionReadonly(n))){var i=this.isSelected(n),o=this.getOptionValue(n),s;if(this.multiple)if(i){if(s=this.d_value.filter(function(c){return!z(c,o,l.equalityKey)}),!this.allowEmpty&&s.length===0)return}else s=this.d_value?[].concat(Ne(this.d_value),[o]):[o];else{if(i&&!this.allowEmpty)return;s=i?null:o}this.writeValue(s,t),this.$emit("change",{event:t,value:s})}},isSelected:function(t){var n=!1,a=this.getOptionValue(t);if(this.multiple){if(this.d_value){var l=He(this.d_value),i;try{for(l.s();!(i=l.n()).done;){var o=i.value;if(z(o,a,this.equalityKey)){n=!0;break}}}catch(s){l.e(s)}finally{l.f()}}}else n=z(this.d_value,a,this.equalityKey);return n}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return $({invalid:this.$invalid})}},directives:{ripple:X},components:{ToggleButton:Z}},We=["aria-labelledby","data-p"];function Xe(e,t,n,a,l,i){var o=Y("ToggleButton");return b(),p("div",v({class:e.cx("root"),role:"group","aria-labelledby":e.ariaLabelledby},e.ptmi("root"),{"data-p":i.dataP}),[(b(!0),p(de,null,ue(e.options,function(s,c){return b(),ge(o,{key:i.getOptionRenderKey(s),modelValue:i.isSelected(s),onLabel:i.getOptionLabel(s),offLabel:i.getOptionLabel(s),disabled:e.disabled||i.isOptionDisabled(s),unstyled:e.unstyled,size:e.size,readonly:i.isOptionReadonly(s),onChange:function(x){return i.onOptionSelect(x,s,c)},pt:e.ptm("pcToggleButton")},ce({_:2},[e.$slots.option?{name:"default",fn:S(function(){return[A(e.$slots,"option",{option:s,index:c},function(){return[g("span",v({ref_for:!0},e.ptm("pcToggleButton").label),f(i.getOptionLabel(s)),17)]})]}),key:"0"}:void 0]),1032,["modelValue","onLabel","offLabel","disabled","unstyled","size","readonly","onChange","pt"])}),128))],16,We)}C.render=Xe;var Ye=`
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
`,Ze={handle:{position:"absolute"},range:{position:"absolute"}},Qe={root:function(t){var n=t.instance,a=t.props;return["p-slider p-component",{"p-disabled":a.disabled,"p-invalid":n.$invalid,"p-slider-horizontal":a.orientation==="horizontal","p-slider-vertical":a.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},Ge=M.extend({name:"slider",style:Ye,classes:Qe,inlineStyles:Ze}),Je={name:"BaseSlider",extends:K,props:{min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Ge,provide:function(){return{$pcSlider:this,$parentInstance:this}}};function B(e){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(e)}function et(e,t,n){return(t=tt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function tt(e){var t=nt(e,"string");return B(t)=="symbol"?t:t+""}function nt(e,t){if(B(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t);if(B(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function it(e){return rt(e)||lt(e)||ot(e)||at()}function at(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ot(e,t){if(e){if(typeof e=="string")return I(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}function lt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function rt(e){if(Array.isArray(e))return I(e)}function I(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}var G={name:"Slider",extends:Je,inheritAttrs:!1,emits:["change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var t=this.$el.getBoundingClientRect();this.initX=t.left+he(),this.initY=t.top+fe(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(t){var n,a=t.touches?t.touches[0].pageX:t.pageX,l=t.touches?t.touches[0].pageY:t.pageY;this.orientation==="horizontal"?pe(this.$el)?n=(this.initX+this.barWidth-a)*100/this.barWidth:n=(a-this.initX)*100/this.barWidth:n=(this.initY+this.barHeight-l)*100/this.barHeight;var i=(this.max-this.min)*(n/100)+this.min;if(this.step){var o=this.range?this.value[this.handleIndex]:this.value,s=i-o;s<0?i=o+Math.ceil(i/this.step-o/this.step)*this.step:s>0&&(i=o+Math.floor(i/this.step-o/this.step)*this.step)}else i=Math.floor(i);this.updateModel(t,i)},updateModel:function(t,n){var a=Math.round(n*100)/100,l;this.range?(l=this.value?it(this.value):[],this.handleIndex==0?(a<this.min?a=this.min:a>=this.max&&(a=this.max),l[0]=a):(a>this.max?a=this.max:a<=this.min&&(a=this.min),l[1]=a)):(a<this.min?a=this.min:a>this.max&&(a=this.max),l=a),this.writeValue(l,t),this.$emit("change",l)},onDragStart:function(t,n){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=n,t.currentTarget.focus())},onDrag:function(t){this.dragging&&this.setValue(t)},onDragEnd:function(t){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:t,value:this.value}))},onBarClick:function(t){this.disabled||be(t.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(t))},onMouseDown:function(t,n){this.bindDragListeners(),this.onDragStart(t,n)},onKeyDown:function(t,n){switch(this.handleIndex=n,t.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(t,n),t.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(t,n),t.preventDefault();break;case"PageDown":this.decrementValue(t,n,!0),t.preventDefault();break;case"PageUp":this.incrementValue(t,n,!0),t.preventDefault();break;case"Home":this.updateModel(t,this.min),t.preventDefault();break;case"End":this.updateModel(t,this.max),t.preventDefault();break}},onBlur:function(t,n){var a,l;(a=(l=this.formField).onBlur)===null||a===void 0||a.call(l,t)},decrementValue:function(t,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,l;this.range?this.step?l=this.value[n]-this.step:l=this.value[n]-1:this.step?l=this.value-this.step:!this.step&&a?l=this.value-10:l=this.value-1,this.updateModel(t,l),t.preventDefault()},incrementValue:function(t,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,l;this.range?this.step?l=this.value[n]+this.step:l=this.value[n]+1:this.step?l=this.value+this.step:!this.step&&a?l=this.value+10:l=this.value+1,this.updateModel(t,l),t.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)},rangeStyle:function(){if(this.range){var t=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,n=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{"inset-inline-start":n+"%",width:t+"%"}:{bottom:n+"%",height:t+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{"inset-inline-start":this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},rangeStartHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}},computed:{value:function(){var t;if(this.range){var n,a,l,i;return[(n=(a=this.d_value)===null||a===void 0?void 0:a[0])!==null&&n!==void 0?n:this.min,(l=(i=this.d_value)===null||i===void 0?void 0:i[1])!==null&&l!==void 0?l:this.max]}return(t=this.d_value)!==null&&t!==void 0?t:this.min},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]!==void 0?this.value[0]<this.min?0:(this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2&&this.value[1]!==void 0?this.value[1]>this.max?100:(this.value[1]-this.min)*100/(this.max-this.min):100},dataP:function(){return $(et({},this.orientation,this.orientation))}}},st=["data-p"],dt=["data-p"],ut=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],gt=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"],ct=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation","data-p"];function bt(e,t,n,a,l,i){return b(),p("div",v({class:e.cx("root"),onClick:t[18]||(t[18]=function(){return i.onBarClick&&i.onBarClick.apply(i,arguments)})},e.ptmi("root"),{"data-p-sliding":!1,"data-p":i.dataP}),[g("span",v({class:e.cx("range"),style:[e.sx("range"),i.rangeStyle()]},e.ptm("range"),{"data-p":i.dataP}),null,16,dt),e.range?w("",!0):(b(),p("span",v({key:0,class:e.cx("handle"),style:[e.sx("handle"),i.handleStyle()],onTouchstartPassive:t[0]||(t[0]=function(o){return i.onDragStart(o)}),onTouchmovePassive:t[1]||(t[1]=function(o){return i.onDrag(o)}),onTouchend:t[2]||(t[2]=function(o){return i.onDragEnd(o)}),onMousedown:t[3]||(t[3]=function(o){return i.onMouseDown(o)}),onKeydown:t[4]||(t[4]=function(o){return i.onKeyDown(o)}),onBlur:t[5]||(t[5]=function(o){return i.onBlur(o)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("handle"),{"data-p":i.dataP}),null,16,ut)),e.range?(b(),p("span",v({key:1,class:e.cx("handle"),style:[e.sx("handle"),i.rangeStartHandleStyle()],onTouchstartPassive:t[6]||(t[6]=function(o){return i.onDragStart(o,0)}),onTouchmovePassive:t[7]||(t[7]=function(o){return i.onDrag(o)}),onTouchend:t[8]||(t[8]=function(o){return i.onDragEnd(o)}),onMousedown:t[9]||(t[9]=function(o){return i.onMouseDown(o,0)}),onKeydown:t[10]||(t[10]=function(o){return i.onKeyDown(o,0)}),onBlur:t[11]||(t[11]=function(o){return i.onBlur(o,0)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[0]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("startHandler"),{"data-p":i.dataP}),null,16,gt)):w("",!0),e.range?(b(),p("span",v({key:2,class:e.cx("handle"),style:[e.sx("handle"),i.rangeEndHandleStyle()],onTouchstartPassive:t[12]||(t[12]=function(o){return i.onDragStart(o,1)}),onTouchmovePassive:t[13]||(t[13]=function(o){return i.onDrag(o)}),onTouchend:t[14]||(t[14]=function(o){return i.onDragEnd(o)}),onMousedown:t[15]||(t[15]=function(o){return i.onMouseDown(o,1)}),onKeydown:t[16]||(t[16]=function(o){return i.onKeyDown(o,1)}),onBlur:t[17]||(t[17]=function(o){return i.onBlur(o,1)}),tabindex:e.tabindex,role:"slider","aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[1]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm("endHandler"),{"data-p":i.dataP}),null,16,ct)):w("",!0)],16,st)}G.render=bt;const pt={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},ht={class:"mb-2 col-span-1 md:col-span-2"},ft={key:0,class:"text-red-500"},mt={class:"mb-2"},vt={key:0,class:"flex items-center gap-2"},yt={key:1},wt={class:"flex items-center gap-2"},St={key:0,class:"text-red-500"},kt={class:"mb-2"},xt={key:0,class:"flex items-center gap-2"},Dt={key:1},Lt={class:"flex items-center gap-2"},Bt={class:"mb-2"},Pt={key:0,class:"text-red-500"},Vt={class:"mb-2"},Tt={key:0,class:"text-red-500"},Et={class:"mb-2"},zt={class:"mb-2"},At={for:"progress",class:"block text-sm font-medium mb-2 text-color-secondary"},Ot={class:"mb-2"},Ct={class:"flex justify-end gap-3 pt-4 border-t border-surface-border"},qt=me({__name:"ActionForm",props:{initialData:{default:()=>({title:"",description:"",action_type_id:null,priority:"",status:"open",assigned_to:null,due_date:null,progress:0,related_to:"",related_id:null})},submitButtonText:{default:"Enregistrer"},loading:{type:Boolean,default:!1}},emits:["submit","cancel"],setup(e,{emit:t}){const n=De(),a=Le(),l=e,i=t,o=d=>d?d instanceof Date?d:new Date(d):null,s=j({title:l.initialData.title||"",description:l.initialData.description||"",action_type_id:l.initialData.action_type_id||null,priority:l.initialData.priority||"",status:l.initialData.status||"open",assigned_to:l.initialData.assigned_to||null,due_date:o(l.initialData.due_date),progress:l.initialData.progress||0,related_to:l.initialData.related_to||"",related_id:l.initialData.related_id||null}),c=j({}),y=Be({title:T().min(1,"Le titre est requis").max(255,"Le titre est trop long"),description:T().optional(),action_type_id:W().int().positive("Le type est requis"),priority:T().min(1,"La priorité est requise"),status:T().min(1,"Le statut est requis"),progress:W().min(0).max(100)}),x=H(()=>(n.types||[]).map(d=>({label:d.name,value:d.id,icon:d.icon,color:d.color}))),P=d=>x.value.find(r=>r.value===d),J=d=>x.value.find(r=>r.value===d)?.label||"",E=H(()=>(a.users||[]).map(d=>({label:`${d.first_name} ${d.last_name}`,value:d.id,firstName:d.first_name,lastName:d.last_name}))),ee=d=>{const r=E.value.find(k=>k.value===d);return r?_(r.firstName,r.lastName):"?"},te=d=>E.value.find(r=>r.value===d)?.label||"",_=(d,r)=>`${d.charAt(0)}${r.charAt(0)}`.toUpperCase(),ne=[{label:"Basse",value:"low",class:"bg-green-100 text-green-700 hover:bg-green-200",activeClass:"bg-green-500 text-white hover:bg-green-600"},{label:"Moyenne",value:"medium",class:"bg-yellow-100 text-yellow-700 hover:bg-yellow-200",activeClass:"bg-yellow-500 text-white hover:bg-yellow-600"},{label:"Haute",value:"high",class:"bg-orange-100 text-orange-700 hover:bg-orange-200",activeClass:"bg-orange-500 text-white hover:bg-orange-600"},{label:"Critique",value:"critical",class:"bg-red-100 text-red-700 hover:bg-red-200",activeClass:"bg-red-500 text-white hover:bg-red-600"}],ie=[{label:"Ouvert",value:"open",class:"bg-blue-100 text-blue-700 hover:bg-blue-200",activeClass:"bg-blue-500 text-white hover:bg-blue-600"},{label:"En cours",value:"in_progress",class:"bg-yellow-100 text-yellow-700 hover:bg-yellow-200",activeClass:"bg-yellow-500 text-white hover:bg-yellow-600"},{label:"Terminé",value:"completed",class:"bg-green-100 text-green-700 hover:bg-green-200",activeClass:"bg-green-500 text-white hover:bg-green-600"},{label:"Annulé",value:"cancelled",class:"bg-gray-100 text-gray-700 hover:bg-gray-200",activeClass:"bg-gray-500 text-white hover:bg-gray-600"}],ae=()=>{c.value={};try{return y.parse(s.value),!0}catch(d){return d instanceof Pe&&d.issues.forEach(r=>{r.path&&(c.value[r.path[0]]=r.message)}),!1}},oe=()=>{if(ae()){const d={...s.value},r={...d};d.due_date instanceof Date?r.due_date=d.due_date.toISOString().split("T")[0]:r.due_date=null,i("submit",r)}},le=()=>{i("cancel")};return ve(()=>l.initialData,d=>{d&&(s.value={title:d.title||"",description:d.description||"",action_type_id:d.action_type_id||null,priority:d.priority||"",status:d.status||"open",assigned_to:d.assigned_to||null,due_date:o(d.due_date),progress:d.progress||0,related_to:d.related_to||"",related_id:d.related_id||null})},{deep:!0}),ye(()=>{n.fetchTypes(),a.fetchUsers(1,100)}),(d,r)=>{const k=Y("font-awesome-icon");return b(),p("form",{onSubmit:we(oe,["prevent"]),class:"flex flex-col gap-6"},[g("div",pt,[g("div",ht,[r[8]||(r[8]=g("label",{for:"title",class:"block text-sm font-medium mb-2 text-color-secondary"},"Titre *",-1)),h(m(Se),{id:"title",modelValue:s.value.title,"onUpdate:modelValue":r[0]||(r[0]=u=>s.value.title=u),placeholder:"Titre de l'action",class:D(["w-full",{"p-invalid":c.value.title}]),size:"large"},null,8,["modelValue","class"]),c.value.title?(b(),p("small",ft,f(c.value.title),1)):w("",!0)]),g("div",mt,[r[9]||(r[9]=g("label",{for:"type",class:"block text-sm font-medium mb-2 text-color-secondary"},"Type *",-1)),h(m(R),{id:"type",modelValue:s.value.action_type_id,"onUpdate:modelValue":r[1]||(r[1]=u=>s.value.action_type_id=u),options:x.value,optionLabel:"label",optionValue:"value",placeholder:"Sélectionnez un type",class:D(["w-full",{"p-invalid":c.value.action_type_id}]),size:"large"},{value:S(u=>[u.value?(b(),p("div",vt,[P(u.value)?(b(),p("div",{key:0,class:"w-8 h-8 rounded flex items-center justify-center text-base",style:N({backgroundColor:P(u.value)?.color+"20",color:P(u.value)?.color})},[h(k,{icon:["fas",P(u.value)?.icon||"tasks"]},null,8,["icon"])],4)):w("",!0),g("div",null,f(J(u.value)),1)])):(b(),p("span",yt,f(u.placeholder),1))]),option:S(u=>[g("div",wt,[g("div",{class:"w-8 h-8 rounded flex items-center justify-center text-base",style:N({backgroundColor:u.option.color+"20",color:u.option.color})},[h(k,{icon:["fas",u.option.icon||"tasks"]},null,8,["icon"])],4),g("div",null,f(u.option.label),1)])]),_:1},8,["modelValue","options","class"]),c.value.action_type_id?(b(),p("small",St,f(c.value.action_type_id),1)):w("",!0)]),g("div",kt,[r[10]||(r[10]=g("label",{for:"assigned_to",class:"block text-sm font-medium mb-2 text-color-secondary"},"Responsable",-1)),h(m(R),{id:"assigned_to",modelValue:s.value.assigned_to,"onUpdate:modelValue":r[2]||(r[2]=u=>s.value.assigned_to=u),options:E.value,optionLabel:"label",optionValue:"value",placeholder:"Sélectionnez un responsable",class:"w-full",size:"large",showClear:"",filter:""},{value:S(u=>[u.value?(b(),p("div",xt,[h(m(F),{label:ee(u.value),shape:"circle",class:"bg-primary-100 text-primary-700 text-xs"},null,8,["label"]),g("div",null,f(te(u.value)),1)])):(b(),p("span",Dt,f(u.placeholder),1))]),option:S(u=>[g("div",Lt,[h(m(F),{label:_(u.option.firstName,u.option.lastName),shape:"circle",class:"bg-primary-100 text-primary-700 text-xs"},null,8,["label"]),g("div",null,f(u.option.label),1)])]),_:1},8,["modelValue","options"])]),g("div",Bt,[r[11]||(r[11]=g("label",{for:"priority",class:"block text-sm font-medium mb-2 text-color-secondary"},"Priorité *",-1)),h(m(C),{modelValue:s.value.priority,"onUpdate:modelValue":r[3]||(r[3]=u=>s.value.priority=u),options:ne,optionLabel:"label",optionValue:"value",class:D(["w-full",{"p-invalid":c.value.priority}]),size:"large",pt:{button:({context:u})=>({class:["flex-1 border-0 transition-colors duration-200",u.active?u.option.activeClass:u.option.class]})}},null,8,["modelValue","class","pt"]),c.value.priority?(b(),p("small",Pt,f(c.value.priority),1)):w("",!0)]),g("div",Vt,[r[12]||(r[12]=g("label",{for:"status",class:"block text-sm font-medium mb-2 text-color-secondary"},"Statut *",-1)),h(m(C),{modelValue:s.value.status,"onUpdate:modelValue":r[4]||(r[4]=u=>s.value.status=u),options:ie,optionLabel:"label",optionValue:"value",class:D(["w-full",{"p-invalid":c.value.status}]),size:"large",pt:{button:({context:u})=>({class:["flex-1 border-0 transition-colors duration-200",u.active?u.option.activeClass:u.option.class]})}},null,8,["modelValue","class","pt"]),c.value.status?(b(),p("small",Tt,f(c.value.status),1)):w("",!0)]),g("div",Et,[r[13]||(r[13]=g("label",{for:"due_date",class:"block text-sm font-medium mb-2 text-color-secondary"},"Échéance",-1)),h(m(xe),{id:"due_date",modelValue:s.value.due_date,"onUpdate:modelValue":r[5]||(r[5]=u=>s.value.due_date=u),dateFormat:"yy-mm-dd",showIcon:"",class:"w-full",size:"large",fluid:""},null,8,["modelValue"])]),g("div",zt,[g("label",At,"Progression ("+f(s.value.progress)+"%)",1),h(m(G),{id:"progress",modelValue:s.value.progress,"onUpdate:modelValue":r[6]||(r[6]=u=>s.value.progress=u),class:"w-full",step:5},null,8,["modelValue"])])]),g("div",Ot,[r[14]||(r[14]=g("label",{for:"description",class:"block text-sm font-medium mb-2 text-color-secondary"},"Description",-1)),h(m(ke),{id:"description",modelValue:s.value.description,"onUpdate:modelValue":r[7]||(r[7]=u=>s.value.description=u),placeholder:"Description détaillée de l'action",rows:"4",class:"w-full"},null,8,["modelValue"])]),g("div",Ct,[h(m(q),{label:"Annuler",text:"",severity:"secondary",onClick:le},{icon:S(()=>[h(k,{icon:"xmark",class:"mr-2"})]),_:1}),h(m(q),{type:"submit",label:e.submitButtonText,loading:e.loading},{icon:S(()=>[h(k,{icon:"floppy-disk",class:"mr-2"})]),_:1},8,["label","loading"])])],32)}}});export{qt as _};
