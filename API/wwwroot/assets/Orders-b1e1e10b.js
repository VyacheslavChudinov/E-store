import{f as o,u as l,af as d,r as h,ag as x,j as e,e as g,P as j,a as p,L as m}from"./index-52948472.js";import{T as f,f as i}from"./format-44d5df09.js";import{T as u,a as b,b as n,c as s,d as T}from"./TableRow-964b114e.js";function y(){const r=o(),a=l(d.selectAll),{status:c}=l(t=>t.orders);return h.useEffect(()=>{r(x())},[r]),c!=="idle"?e.jsx(g,{message:"Loading orders..."}):e.jsx(u,{component:j,sx:{mt:"50px"},children:e.jsxs(b,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(f,{children:e.jsxs(n,{children:[e.jsx(s,{align:"left",children:"Order Id"}),e.jsx(s,{align:"center",children:"Status"}),e.jsx(s,{align:"right",children:"Created"}),e.jsx(s,{align:"right",children:"Subtotal"}),e.jsx(s,{align:"right",children:"Delivery fee"}),e.jsx(s,{align:"right",children:"Total"}),e.jsx(s,{})]})}),e.jsx(T,{children:a==null?void 0:a.map(t=>e.jsxs(n,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(s,{component:"th",align:"left",scope:"row",children:t.id}),e.jsx(s,{component:"th",align:"center",scope:"row",children:t.orderStatus}),e.jsx(s,{align:"right",children:new Date(t.createdTime).toLocaleDateString()}),e.jsx(s,{align:"right",children:i(t.subtotal)}),e.jsx(s,{align:"right",children:i(t.deliveryFee)}),e.jsx(s,{align:"right",children:i(t.total)}),e.jsx(s,{align:"center",children:e.jsx(p,{component:m,to:`/orders/${t.id}`,variant:"text",color:"primary",children:"View"})})]},t.id))})]})})}export{y as default};
