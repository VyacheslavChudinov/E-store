import{l as y,m as v,n as p,P as H,r as x,o as M,p as b,_ as n,j as a,t as R,v as S,T as g,f as P,u as U,G as T,B as k,L as I}from"./index-156a389b.js";import{A as _}from"./Avatar-5325436f.js";import{L as B}from"./LoadingButton-edbf3716.js";function E(e){return y("MuiCard",e)}v("MuiCard",["root"]);const L=["className","raised"],O=e=>{const{classes:t}=e;return S({root:["root"]},E,t)},z=p(H,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),D=x.forwardRef(function(t,o){const s=M({props:t,name:"MuiCard"}),{className:c,raised:i=!1}=s,d=b(s,L),r=n({},s,{raised:i}),l=O(r);return a.jsx(z,n({className:R(l.root,c),elevation:i?8:void 0,ref:o,ownerState:r},d))}),F=D;function G(e){return y("MuiCardActions",e)}v("MuiCardActions",["root","spacing"]);const W=["disableSpacing","className"],V=e=>{const{classes:t,disableSpacing:o}=e;return S({root:["root",!o&&"spacing"]},G,t)},q=p("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.disableSpacing&&t.spacing]}})(({ownerState:e})=>n({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),J=x.forwardRef(function(t,o){const s=M({props:t,name:"MuiCardActions"}),{disableSpacing:c=!1,className:i}=s,d=b(s,W),r=n({},s,{disableSpacing:c}),l=V(r);return a.jsx(q,n({className:R(l.root,i),ownerState:r,ref:o},d))}),K=J;function Q(e){return y("MuiCardContent",e)}v("MuiCardContent",["root"]);const X=["className","component"],Y=e=>{const{classes:t}=e;return S({root:["root"]},Q,t)},Z=p("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),ee=x.forwardRef(function(t,o){const s=M({props:t,name:"MuiCardContent"}),{className:c,component:i="div"}=s,d=b(s,X),r=n({},s,{component:i}),l=Y(r);return a.jsx(Z,n({as:i,className:R(l.root,c),ownerState:r,ref:o},d))}),te=ee;function se(e){return y("MuiCardHeader",e)}const oe=v("MuiCardHeader",["root","avatar","action","content","title","subheader"]),$=oe,ae=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],re=e=>{const{classes:t}=e;return S({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},se,t)},ne=p("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>n({[`& .${$.title}`]:t.title,[`& .${$.subheader}`]:t.subheader},t.root)})({display:"flex",alignItems:"center",padding:16}),ie=p("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(e,t)=>t.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),ce=p("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(e,t)=>t.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),de=p("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(e,t)=>t.content})({flex:"1 1 auto"}),le=x.forwardRef(function(t,o){const s=M({props:t,name:"MuiCardHeader"}),{action:c,avatar:i,className:d,component:r="div",disableTypography:l=!1,subheader:j,subheaderTypographyProps:w,title:u,titleTypographyProps:A}=s,N=b(s,ae),m=n({},s,{component:r,disableTypography:l}),C=re(m);let h=u;h!=null&&h.type!==g&&!l&&(h=a.jsx(g,n({variant:i?"body2":"h5",className:C.title,component:"span",display:"block"},A,{children:h})));let f=j;return f!=null&&f.type!==g&&!l&&(f=a.jsx(g,n({variant:i?"body2":"body1",className:C.subheader,color:"text.secondary",component:"span",display:"block"},w,{children:f}))),a.jsxs(ne,n({className:R(C.root,d),as:r,ref:o,ownerState:m},N,{children:[i&&a.jsx(ie,{className:C.avatar,ownerState:m,children:i}),a.jsxs(de,{className:C.content,ownerState:m,children:[h,f]}),c&&a.jsx(ce,{className:C.action,ownerState:m,children:c})]}))}),pe=le;function me(e){return y("MuiCardMedia",e)}v("MuiCardMedia",["root","media","img"]);const ue=["children","className","component","image","src","style"],Ce=e=>{const{classes:t,isMediaComponent:o,isImageComponent:s}=e;return S({root:["root",o&&"media",s&&"img"]},me,t)},ge=p("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{isMediaComponent:s,isImageComponent:c}=o;return[t.root,s&&t.media,c&&t.img]}})(({ownerState:e})=>n({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),he=["video","audio","picture","iframe","img"],fe=["picture","img"],ye=x.forwardRef(function(t,o){const s=M({props:t,name:"MuiCardMedia"}),{children:c,className:i,component:d="div",image:r,src:l,style:j}=s,w=b(s,ue),u=he.indexOf(d)!==-1,A=!u&&r?n({backgroundImage:`url("${r}")`},j):j,N=n({},s,{component:d,isMediaComponent:u,isImageComponent:fe.indexOf(d)!==-1}),m=Ce(N);return a.jsx(ge,n({className:R(m.root,i),as:d,role:!u&&r?"img":void 0,ref:o,style:A,ownerState:N,src:u?r||l:void 0},w,{children:c}))}),ve=ye;function Re({product:e}){const t=P(),{updatingProducts:o}=U(s=>s.basket);return a.jsxs(F,{children:[a.jsx(pe,{avatar:a.jsx(_,{sx:{bgcolor:"secondary.main"},children:e.name.charAt(0).toUpperCase()}),title:e.name,titleTypographyProps:{sx:{fontWeight:"bold",color:"primary.main"}}}),a.jsx(ve,{sx:{height:140,backgroundSize:"contain",bgcolor:"primary.light"},image:e.pictureUrl,title:e.name}),a.jsxs(te,{children:[a.jsxs(g,{gutterBottom:!0,color:"secondary",variant:"h5",children:["$",(e.price/100).toFixed(2)]}),a.jsxs(g,{variant:"body2",color:"text.secondary",children:[e.brand," / ",e.type]})]}),a.jsxs(K,{children:[a.jsx(B,{loading:!!o.find(s=>s===e.id),size:"small",onClick:()=>t(T({productId:e.id})),children:"Add to card"}),a.jsx(k,{size:"small",component:I,to:`/catalog/${e.id}`,children:"View"})]})]})}export{F as C,Re as P,pe as a,te as b,K as c};
