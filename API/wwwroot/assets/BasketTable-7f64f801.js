import{c as j,j as e,P as p,f as m,u as y,e as v,G as b,aw as B}from"./index-156a389b.js";import{f as c,T as I}from"./format-4be4a461.js";import{T as g,a as u,d as f,b as i,c as s}from"./TableRow-f2a60b18.js";import{L as x}from"./LoadingButton-edbf3716.js";import{D as T}from"./Delete-45ac7e01.js";const k=j(e.jsx("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add"),S=j(e.jsx("path",{d:"M19 13H5v-2h14v2z"}),"Remove");function R(h){const{items:t}=h,r=t.reduce((o,n)=>o+n.price*n.quantity,0)??0,d=r>1e4?0:500,l=r+d;return e.jsx(e.Fragment,{children:e.jsx(g,{component:p,variant:"outlined",children:e.jsx(u,{children:e.jsxs(f,{children:[e.jsxs(i,{children:[e.jsx(s,{colSpan:2,children:"Subtotal"}),e.jsx(s,{align:"right",children:c(r)})]}),e.jsxs(i,{children:[e.jsx(s,{colSpan:2,children:"Delivery fee*"}),e.jsx(s,{align:"right",children:c(d)})]}),e.jsxs(i,{children:[e.jsx(s,{colSpan:2,children:"Total"}),e.jsx(s,{align:"right",children:c(l)})]}),e.jsx(i,{children:e.jsx(s,{children:e.jsx("span",{style:{fontStyle:"italic"},children:"*Orders over $100 qualify for free delivery"})})})]})})})})}function D(h){const t=m(),{updatingProducts:r}=y(n=>n.basket),{items:d,isBasket:l}=h;async function o(n,a=1){await t(B({productId:n,quantity:a}))}return e.jsx(g,{component:p,children:e.jsxs(u,{sx:{minWidth:650},"aria-label":"Basket",children:[e.jsx(I,{children:e.jsxs(i,{children:[e.jsx(s,{}),e.jsx(s,{align:"left",children:"Name"}),e.jsx(s,{align:"left",children:"Brand"}),e.jsx(s,{align:"left",children:"Type"}),e.jsx(s,{align:"center",children:"Quantity"}),e.jsx(s,{align:"right",children:"Price"}),e.jsx(s,{align:"right",children:"Subtotal"}),l&&e.jsx(s,{align:"center"})]})}),e.jsx(f,{children:d.map(n=>e.jsxs(i,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(s,{component:"th",scope:"row",children:e.jsx(v,{component:"img",sx:{maxHeight:{xs:70,md:100}},alt:"Product image",src:n.pictureUrl})}),e.jsx(s,{align:"left",component:"th",scope:"row",children:n.name}),e.jsx(s,{align:"left",children:n.brand}),e.jsx(s,{align:"left",children:n.type}),e.jsxs(s,{align:"center",children:[l&&e.jsx(x,{loading:!!r.find(a=>a===n.productId),onClick:()=>o(n.productId),children:e.jsx(S,{})}),n.quantity,l&&e.jsx(x,{loading:!!r.find(a=>a===n.productId),onClick:()=>t(b({productId:n.productId})),children:e.jsx(k,{})})]}),e.jsx(s,{align:"right",children:c(n.price)}),e.jsx(s,{align:"right",children:c(n.price*n.quantity)}),l&&e.jsx(s,{align:"center",children:e.jsx(x,{loading:!!r.find(a=>a===n.productId),onClick:()=>o(n.productId,n.quantity),sx:{color:"red"},children:e.jsx(T,{})})})]},n.productId))})]})})}export{D as B,R as a};
