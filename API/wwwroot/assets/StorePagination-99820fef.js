import{l as V,m as E,p as U,A as K,_ as r,c as j,j as l,n as O,H as Q,y as k,r as W,o as G,I as X,t as T,x as h,v as H,B as Y,T as Z}from"./index-52948472.js";function D(a){return V("MuiPagination",a)}E("MuiPagination",["root","ul","outlined","text"]);const aa=["boundaryCount","componentName","count","defaultPage","disabled","hideNextButton","hidePrevButton","onChange","page","showFirstButton","showLastButton","siblingCount"];function ta(a={}){const{boundaryCount:t=1,componentName:o="usePagination",count:e=1,defaultPage:u=1,disabled:g=!1,hideNextButton:v=!1,hidePrevButton:i=!1,onChange:d,page:b,showFirstButton:P=!1,showLastButton:C=!1,siblingCount:x=1}=a,c=U(a,aa),[n,B]=K({controlled:b,default:u,name:o,state:"page"}),N=(s,z)=>{b||B(z),d&&d(s,z)},f=(s,z)=>{const w=z-s+1;return Array.from({length:w},(ya,J)=>s+J)},m=f(1,Math.min(t,e)),y=f(Math.max(e-t+1,t+1),e),L=Math.max(Math.min(n-x,e-t-x*2-1),t+2),I=Math.min(Math.max(n+x,t+x*2+2),y.length>0?y[0]-2:e-1),R=[...P?["first"]:[],...i?[]:["previous"],...m,...L>t+2?["start-ellipsis"]:t+1<e-t?[t+1]:[],...f(L,I),...I<e-t-1?["end-ellipsis"]:e-t>t?[e-t]:[],...y,...v?[]:["next"],...C?["last"]:[]],M=s=>{switch(s){case"first":return 1;case"previous":return n-1;case"next":return n+1;case"last":return e;default:return null}},$=R.map(s=>typeof s=="number"?{onClick:z=>{N(z,s)},type:"page",page:s,selected:s===n,disabled:g,"aria-current":s===n?"true":void 0}:{onClick:z=>{N(z,M(s))},type:s,page:M(s),selected:!1,disabled:g||s.indexOf("ellipsis")===-1&&(s==="next"||s==="last"?n>=e:n<=1)});return r({items:$},c)}function oa(a){return V("MuiPaginationItem",a)}const ea=E("MuiPaginationItem",["root","page","sizeSmall","sizeLarge","text","textPrimary","textSecondary","outlined","outlinedPrimary","outlinedSecondary","rounded","ellipsis","firstLast","previousNext","focusVisible","disabled","selected","icon"]),p=ea,_=j(l.jsx("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),"FirstPage"),A=j(l.jsx("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),"LastPage"),F=j(l.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"NavigateBefore"),S=j(l.jsx("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext"),sa=["className","color","component","components","disabled","page","selected","shape","size","slots","type","variant"],q=(a,t)=>{const{ownerState:o}=a;return[t.root,t[o.variant],t[`size${h(o.size)}`],o.variant==="text"&&t[`text${h(o.color)}`],o.variant==="outlined"&&t[`outlined${h(o.color)}`],o.shape==="rounded"&&t.rounded,o.type==="page"&&t.page,(o.type==="start-ellipsis"||o.type==="end-ellipsis")&&t.ellipsis,(o.type==="previous"||o.type==="next")&&t.previousNext,(o.type==="first"||o.type==="last")&&t.firstLast]},na=a=>{const{classes:t,color:o,disabled:e,selected:u,size:g,shape:v,type:i,variant:d}=a,b={root:["root",`size${h(g)}`,d,v,o!=="standard"&&`${d}${h(o)}`,e&&"disabled",u&&"selected",{page:"page",first:"firstLast",last:"firstLast","start-ellipsis":"ellipsis","end-ellipsis":"ellipsis",previous:"previousNext",next:"previousNext"}[i]],icon:["icon"]};return H(b,oa,t)},ia=O("div",{name:"MuiPaginationItem",slot:"Root",overridesResolver:q})(({theme:a,ownerState:t})=>r({},a.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,height:"auto",[`&.${p.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity}},t.size==="small"&&{minWidth:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)})),ra=O(Q,{name:"MuiPaginationItem",slot:"Root",overridesResolver:q})(({theme:a,ownerState:t})=>r({},a.typography.body2,{borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,height:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,[`&.${p.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`&.${p.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity},transition:a.transitions.create(["color","background-color"],{duration:a.transitions.duration.short}),"&:hover":{backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${p.selected}`]:{backgroundColor:(a.vars||a).palette.action.selected,"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:k(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(a.vars||a).palette.action.selected}},[`&.${p.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:k(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)},[`&.${p.disabled}`]:{opacity:1,color:(a.vars||a).palette.action.disabled,backgroundColor:(a.vars||a).palette.action.selected}}},t.size==="small"&&{minWidth:26,height:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"},t.size==="large"&&{minWidth:40,height:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)},t.shape==="rounded"&&{borderRadius:(a.vars||a).shape.borderRadius}),({theme:a,ownerState:t})=>r({},t.variant==="text"&&{[`&.${p.selected}`]:r({},t.color!=="standard"&&{color:(a.vars||a).palette[t.color].contrastText,backgroundColor:(a.vars||a).palette[t.color].main,"&:hover":{backgroundColor:(a.vars||a).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(a.vars||a).palette[t.color].main}},[`&.${p.focusVisible}`]:{backgroundColor:(a.vars||a).palette[t.color].dark}},{[`&.${p.disabled}`]:{color:(a.vars||a).palette.action.disabled}})},t.variant==="outlined"&&{border:a.vars?`1px solid rgba(${a.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${a.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${p.selected}`]:r({},t.color!=="standard"&&{color:(a.vars||a).palette[t.color].main,border:`1px solid ${a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / 0.5)`:k(a.palette[t.color].main,.5)}`,backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / ${a.vars.palette.action.activatedOpacity})`:k(a.palette[t.color].main,a.palette.action.activatedOpacity),"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:k(a.palette[t.color].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${p.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[t.color].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:k(a.palette[t.color].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity)}},{[`&.${p.disabled}`]:{borderColor:(a.vars||a).palette.action.disabledBackground,color:(a.vars||a).palette.action.disabled}})})),la=O("div",{name:"MuiPaginationItem",slot:"Icon",overridesResolver:(a,t)=>t.icon})(({theme:a,ownerState:t})=>r({fontSize:a.typography.pxToRem(20),margin:"0 -8px"},t.size==="small"&&{fontSize:a.typography.pxToRem(18)},t.size==="large"&&{fontSize:a.typography.pxToRem(22)})),ca=W.forwardRef(function(t,o){const e=G({props:t,name:"MuiPaginationItem"}),{className:u,color:g="standard",component:v,components:i={},disabled:d=!1,page:b,selected:P=!1,shape:C="circular",size:x="medium",slots:c={},type:n="page",variant:B="text"}=e,N=U(e,sa),f=r({},e,{color:g,disabled:d,selected:P,shape:C,size:x,type:n,variant:B}),m=X(),y=na(f),I=(m.direction==="rtl"?{previous:c.next||i.next||S,next:c.previous||i.previous||F,last:c.first||i.first||_,first:c.last||i.last||A}:{previous:c.previous||i.previous||F,next:c.next||i.next||S,first:c.first||i.first||_,last:c.last||i.last||A})[n];return n==="start-ellipsis"||n==="end-ellipsis"?l.jsx(ia,{ref:o,ownerState:f,className:T(y.root,u),children:"…"}):l.jsxs(ra,r({ref:o,ownerState:f,component:v,disabled:d,className:T(y.root,u)},N,{children:[n==="page"&&b,I?l.jsx(la,{as:I,ownerState:f,className:y.icon}):null]}))}),da=ca,pa=["boundaryCount","className","color","count","defaultPage","disabled","getItemAriaLabel","hideNextButton","hidePrevButton","onChange","page","renderItem","shape","showFirstButton","showLastButton","siblingCount","size","variant"],ua=a=>{const{classes:t,variant:o}=a;return H({root:["root",o],ul:["ul"]},D,t)},ga=O("nav",{name:"MuiPagination",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:o}=a;return[t.root,t[o.variant]]}})({}),va=O("ul",{name:"MuiPagination",slot:"Ul",overridesResolver:(a,t)=>t.ul})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"});function ba(a,t,o){return a==="page"?`${o?"":"Go to "}page ${t}`:`Go to ${a} page`}const xa=W.forwardRef(function(t,o){const e=G({props:t,name:"MuiPagination"}),{boundaryCount:u=1,className:g,color:v="standard",count:i=1,defaultPage:d=1,disabled:b=!1,getItemAriaLabel:P=ba,hideNextButton:C=!1,hidePrevButton:x=!1,renderItem:c=$=>l.jsx(da,r({},$)),shape:n="circular",showFirstButton:B=!1,showLastButton:N=!1,siblingCount:f=1,size:m="medium",variant:y="text"}=e,L=U(e,pa),{items:I}=ta(r({},e,{componentName:"Pagination"})),R=r({},e,{boundaryCount:u,color:v,count:i,defaultPage:d,disabled:b,getItemAriaLabel:P,hideNextButton:C,hidePrevButton:x,renderItem:c,shape:n,showFirstButton:B,showLastButton:N,siblingCount:f,size:m,variant:y}),M=ua(R);return l.jsx(ga,r({"aria-label":"pagination navigation",className:T(M.root,g),ownerState:R,ref:o},L,{children:l.jsx(va,{className:M.ul,ownerState:R,children:I.map(($,s)=>l.jsx("li",{children:c(r({},$,{color:v,"aria-label":P($.type,$.page,$.selected),shape:n,size:m,variant:y}))},s))})}))}),fa=xa;function Pa({paginationDetails:a,onChange:t}){const{currentPage:o,pageSize:e,totalPages:u,totalCount:g}=a,[v,i]=W.useState(o),d=(o-1)*e+1,b=o*e>a.totalCount?a.totalCount:o*e;function P(C){i(C),t(C)}return l.jsxs(Y,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[l.jsx(Z,{children:`Displaying ${d}-${b} of ${g} products`}),l.jsx(fa,{page:v,count:u,color:"secondary",size:"large",onChange:(C,x)=>P(x)})]})}export{Pa as S};
