import{u as l,ah as q,J as T,f as b,r as x,ax as I,j as t,e as v,T as j,G as A,aw as B}from"./index-52948472.js";import P from"./NotFound-8ff8af5c.js";import{G as a}from"./Grid-058d98bb.js";import{D as k}from"./Divider-d3c96099.js";import{T as C,a as D,d as S,b as c,c as i}from"./TableRow-964b114e.js";import{T as E}from"./TextField-41e114cc.js";import{L as F}from"./LoadingButton-8dde6608.js";function W(){const{basket:u,updatingProducts:m}=l(n=>n.basket),{status:y}=l(n=>n.catalog),{id:d=""}=q(),e=l(n=>T.selectById(n,parseInt(d))),o=b(),[r,h]=x.useState(0),s=u==null?void 0:u.items.find(n=>n.productId===(e==null?void 0:e.id));function f(n){const p=parseInt(n.target.value);p>=0&&h(p)}function g(){if(e){if(!s||r>s.quantity){const n=r-((s==null?void 0:s.quantity)??0);o(A({productId:e==null?void 0:e.id,quantity:n}));return}if(r<s.quantity){const n=s.quantity-r;o(B({productId:s==null?void 0:s.productId,quantity:n}))}}}return x.useEffect(()=>{s&&h(s.quantity)},[s]),x.useEffect(()=>{!d||e||o(I(parseInt(d)))},[o,d,e]),y==="pendingFetchProduct"?t.jsx(v,{message:"Loading Product..."}):e?t.jsxs(a,{container:!0,spacing:6,sx:{mt:"50px"},children:[t.jsx(a,{item:!0,xs:6,children:t.jsx("img",{src:e.pictureUrl,alt:e.name,style:{width:"100%"}})}),t.jsxs(a,{item:!0,xs:6,children:[t.jsx(j,{variant:"h3",children:e.name}),t.jsx(k,{sx:{mb:3}}),t.jsxs(j,{variant:"h4",color:"secondary",children:["$",(e.price/100).toFixed(2)]}),t.jsx(C,{children:t.jsx(D,{children:t.jsxs(S,{children:[t.jsxs(c,{children:[t.jsx(i,{children:"Name"}),t.jsx(i,{children:e.name})]}),t.jsxs(c,{children:[t.jsx(i,{children:"Description"}),t.jsx(i,{children:e.description})]}),t.jsxs(c,{children:[t.jsx(i,{children:"Type"}),t.jsx(i,{children:e.type})]}),t.jsxs(c,{children:[t.jsx(i,{children:"Brand"}),t.jsx(i,{children:e.brand})]}),t.jsxs(c,{children:[t.jsx(i,{children:"Quantity in stock"}),t.jsx(i,{children:e.quantityInStock})]})]})})}),t.jsxs(a,{container:!0,spacing:2,sx:{mt:"10px"},children:[t.jsx(a,{item:!0,xs:6,children:t.jsx(E,{variant:"outlined",type:"number",label:"Quantity in cart",fullWidth:!0,value:r,onChange:f})}),t.jsx(a,{item:!0,xs:6,children:t.jsx(F,{loading:!!m.find(n=>n===e.id),sx:{height:"55px"},color:"primary",size:"large",variant:"contained",fullWidth:!0,onClick:g,disabled:(s==null?void 0:s.quantity)===r||!s&&r===0,children:s?"Update quantity":"Add to cart"})})]})]})]}):t.jsx(P,{})}export{W as default};
