import{f as d,u as l,af as o,r as h,ag as x,j as e,d as g,P as j,B as p,L as m}from"./index-156a389b.js";import{T as f,f as i}from"./format-4be4a461.js";import{T as u,a as b,b as n,c as s,d as T}from"./TableRow-f2a60b18.js";function y(){const r=d(),a=l(o.selectAll),{status:c}=l(t=>t.orders);return h.useEffect(()=>{r(x())},[r]),c!=="idle"?e.jsx(g,{message:"Loading orders..."}):e.jsx(u,{component:j,children:e.jsxs(b,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(f,{children:e.jsxs(n,{children:[e.jsx(s,{align:"left",children:"Order Id"}),e.jsx(s,{align:"center",children:"Status"}),e.jsx(s,{align:"right",children:"Created"}),e.jsx(s,{align:"right",children:"Subtotal"}),e.jsx(s,{align:"right",children:"Delivery fee"}),e.jsx(s,{align:"right",children:"Total"}),e.jsx(s,{})]})}),e.jsx(T,{children:a==null?void 0:a.map(t=>e.jsxs(n,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(s,{component:"th",align:"left",scope:"row",children:t.id}),e.jsx(s,{component:"th",align:"center",scope:"row",children:t.orderStatus}),e.jsx(s,{align:"right",children:new Date(t.createdTime).toLocaleDateString()}),e.jsx(s,{align:"right",children:i(t.subtotal)}),e.jsx(s,{align:"right",children:i(t.deliveryFee)}),e.jsx(s,{align:"right",children:i(t.total)}),e.jsx(s,{align:"center",children:e.jsx(p,{component:m,to:`/orders/${t.id}`,variant:"text",color:"primary",children:"View"})})]},t.id))})]})})}export{y as default};
