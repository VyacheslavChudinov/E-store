import{a4 as h,a3 as f,f as j,j as e,$ as b,P as y,e as o,T as w,L as T,a5 as v}from"./index-156a389b.js";import{d as S}from"./LockOutlined-81d0e5b7.js";import{a as L}from"./index.esm-0165358e.js";import{A as q}from"./Avatar-5325436f.js";import{T as i}from"./TextField-3d8a669a.js";import{L as D}from"./LoadingButton-edbf3716.js";import{G as n}from"./Grid-faf68d0e.js";function G(){var r,t;const{register:s,handleSubmit:m,formState:{isSubmitting:l,errors:a,isValid:d}}=L({mode:"onTouched"}),c=h(),u=f(),p=j();async function x(g){try{await p(v(g)),c(u.state.from??"/catalog")}catch{console.log()}}return e.jsx(b,{component:y,maxWidth:"sm",sx:{display:"flex",flexDirection:"column",alignItems:"center",p:"4"},children:e.jsxs(o,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(q,{sx:{m:1,bgcolor:"secondary.main"},children:e.jsx(S,{})}),e.jsx(w,{component:"h1",variant:"h5",children:"Sign in"}),e.jsxs(o,{component:"form",onSubmit:m(x),noValidate:!0,sx:{mt:1},children:[e.jsx(i,{margin:"normal",fullWidth:!0,label:"User Name",autoFocus:!0,autoComplete:"given-name",...s("username",{required:"User name is required"}),error:!!a.username,helperText:(r=a==null?void 0:a.username)==null?void 0:r.message}),e.jsx(i,{margin:"normal",fullWidth:!0,label:"Password",type:"password",autoComplete:"current-password",...s("password",{required:"Password is required"}),error:!!a.password,helperText:(t=a==null?void 0:a.password)==null?void 0:t.message}),e.jsx(D,{loading:l,disabled:!d,type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),e.jsx(n,{container:!0,children:e.jsx(n,{item:!0,sx:{mb:4},children:e.jsx(T,{to:"/register",children:"Don't have an account? Sign Up"})})})]})]})})}export{G as default};