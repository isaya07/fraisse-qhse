import{D as g,E as i,ap as f,B as m,C as y,M as v,c as d,o as s,z as w,m as b,p as A,A as h,t as z,v as S,V as E}from"./index-d7axL_xv.js";const N=g("action",{state:()=>({actions:[],currentAction:null,loading:!1,error:null,pagination:{page:1,limit:10,total:0,totalPages:1}}),getters:{actionById:t=>r=>t.actions.find(a=>a.id===r)},actions:{async fetchActions(t=1,r=10,a={}){this.loading=!0,this.error=null;try{const{get:e}=i(),o=new URLSearchParams({page:t.toString(),limit:r.toString()});Object.entries(a).forEach(([p,c])=>{c!=null&&c!==""&&o.append(p,String(c))});const n=await e(`/actions?${o.toString()}`);n.success&&n.data?f(n.data)?(this.actions=n.data.data||[],this.pagination={...this.pagination,page:n.data.current_page||t,limit:n.data.per_page||r,total:n.data.total||this.actions.length,totalPages:n.data.last_page||1}):(this.actions=Array.isArray(n.data)?n.data:[n.data],this.pagination={...this.pagination,page:t,limit:r,total:this.actions.length,totalPages:Math.ceil(this.actions.length/r)}):this.error=n.error||"Failed to fetch actions"}catch(e){this.error="An error occurred while fetching actions",console.error(e)}finally{this.loading=!1}},async fetchActionById(t){this.loading=!0,this.error=null;try{const{get:r}=i(),a=await r(`/actions/${t}`);a.success&&a.data?this.currentAction=a.data:this.error=a.error||"Failed to fetch action"}catch(r){this.error="An error occurred while fetching action",console.error(r)}finally{this.loading=!1}},async createAction(t){this.loading=!0,this.error=null;try{const{post:r}=i(),a=await r("/actions",t);if(a.success&&a.data)this.actions.unshift(a.data),this.currentAction=a.data;else throw this.error=a.error||"Failed to create action",new Error(this.error)}catch(r){throw this.error="An error occurred while creating action",console.error(r),r}finally{this.loading=!1}},async updateAction(t,r){this.loading=!0,this.error=null;try{const{put:a}=i(),e=await a(`/actions/${t}`,r);if(e.success&&e.data){const o=this.actions.findIndex(n=>n.id===t);o!==-1&&(this.actions[o]=e.data),this.currentAction=e.data}else throw this.error=e.error||"Failed to update action",new Error(this.error)}catch(a){throw this.error="An error occurred while updating action",console.error(a),a}finally{this.loading=!1}},async deleteAction(t){this.loading=!0,this.error=null;try{const{del:r}=i(),a=await r(`/actions/${t}`);if(a.success)this.actions=this.actions.filter(e=>e.id!==t),this.currentAction?.id===t&&(this.currentAction=null);else throw this.error=a.error||"Failed to delete action",new Error(this.error)}catch(r){throw this.error="An error occurred while deleting action",console.error(r),r}finally{this.loading=!1}},async updateProgress(t,r){this.loading=!0,this.error=null;try{const{post:a}=i(),e=await a(`/actions/${t}/update-progress`,{progress:r});if(e.success&&e.data){const o=this.actions.findIndex(n=>n.id===t);o!==-1&&(this.actions[o]=e.data),this.currentAction?.id===t&&(this.currentAction=e.data)}else throw this.error=e.error||"Failed to update progress",new Error(this.error)}catch(a){throw this.error="An error occurred while updating progress",console.error(a),a}finally{this.loading=!1}},async addComment(t,r){this.loading=!0,this.error=null;try{const{post:a}=i(),e=await a(`/actions/${t}/comments`,{content:r});if(e.success&&e.data)this.currentAction&&this.currentAction.id===t&&(this.currentAction.comments||(this.currentAction.comments=[]),this.currentAction.comments.push(e.data));else throw this.error=e.error||"Failed to add comment",new Error(this.error)}catch(a){throw this.error="An error occurred while adding comment",console.error(a),a}finally{this.loading=!1}},async linkDocument(t,r){this.loading=!0,this.error=null;try{const{post:a}=i(),e=await a(`/actions/${t}/documents`,{document_id:r});if(e.success&&e.data)this.currentAction=e.data;else throw new Error(e.error||"Failed to link document")}catch(a){throw this.error="Error linking document",a}finally{this.loading=!1}},async unlinkDocument(t,r){this.loading=!0,this.error=null;try{const{del:a}=i(),e=await a(`/actions/${t}/documents/${r}`);if(e.success&&e.data)this.currentAction=e.data;else throw new Error(e.error||"Failed to unlink document")}catch(a){throw this.error="Error unlinking document",a}finally{this.loading=!1}},async linkIndicator(t,r){this.loading=!0,this.error=null;try{const{post:a}=i(),e=await a(`/actions/${t}/indicators`,{indicator_id:r});if(e.success&&e.data)this.currentAction=e.data;else throw new Error(e.error||"Failed to link indicator")}catch(a){throw this.error="Error linking indicator",a}finally{this.loading=!1}},async unlinkIndicator(t,r){this.loading=!0,this.error=null;try{const{del:a}=i(),e=await a(`/actions/${t}/indicators/${r}`);if(e.success&&e.data)this.currentAction=e.data;else throw new Error(e.error||"Failed to unlink indicator")}catch(a){throw this.error="Error unlinking indicator",a}finally{this.loading=!1}},async deleteComment(t){this.loading=!0,this.error=null;try{const{del:r}=i(),a=await r(`/comments/${t}`);if(a.success)this.currentAction&&this.currentAction.comments&&(this.currentAction.comments=this.currentAction.comments.filter(e=>e.id!==t));else throw new Error(a.error||"Failed to delete comment")}catch(r){throw this.error="Error deleting comment",r}finally{this.loading=!1}}}});var k=`
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
`,P={root:function(r){var a=r.props;return["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},$=m.extend({name:"avatar",style:k,classes:P}),F={name:"BaseAvatar",extends:y,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:$,provide:function(){return{$pcAvatar:this,$parentInstance:this}}};function l(t){"@babel/helpers - typeof";return l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},l(t)}function u(t,r,a){return(r=x(r))in t?Object.defineProperty(t,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[r]=a,t}function x(t){var r=B(t,"string");return l(r)=="symbol"?r:r+""}function B(t,r){if(l(t)!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var e=a.call(t,r);if(l(e)!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(r==="string"?String:Number)(t)}var C={name:"Avatar",extends:F,inheritAttrs:!1,emits:["error"],methods:{onError:function(r){this.$emit("error",r)}},computed:{dataP:function(){return v(u(u({},this.shape,this.shape),this.size,this.size))}}},L=["aria-labelledby","aria-label","data-p"],j=["data-p"],D=["data-p"],I=["src","alt","data-p"];function q(t,r,a,e,o,n){return s(),d("div",h({class:t.cx("root"),"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel},t.ptmi("root"),{"data-p":n.dataP}),[w(t.$slots,"default",{},function(){return[t.label?(s(),d("span",h({key:0,class:t.cx("label")},t.ptm("label"),{"data-p":n.dataP}),z(t.label),17,j)):t.$slots.icon?(s(),b(E(t.$slots.icon),{key:1,class:S(t.cx("icon"))},null,8,["class"])):t.icon?(s(),d("span",h({key:2,class:[t.cx("icon"),t.icon]},t.ptm("icon"),{"data-p":n.dataP}),null,16,D)):t.image?(s(),d("img",h({key:3,src:t.image,alt:t.ariaLabel,onError:r[0]||(r[0]=function(){return n.onError&&n.onError.apply(n,arguments)})},t.ptm("image"),{"data-p":n.dataP}),null,16,I)):A("",!0)]})],16,L)}C.render=q;export{C as s,N as u};
