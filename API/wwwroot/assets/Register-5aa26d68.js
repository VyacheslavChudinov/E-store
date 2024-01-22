import{a4 as A,j as e,$ as j,P as w,e as d,T as E,a0 as b,a6 as v,L as T}from"./index-0d088209.js";import{d as L}from"./LockOutlined-6451247d.js";import{a as S}from"./index.esm-f6f5005b.js";import{A as y}from"./Avatar-23623c98.js";import{T as n}from"./TextField-e6bdd615.js";import{L as R}from"./LoadingButton-ca61a93f.js";import{G as u}from"./Grid-41f2084a.js";const c={EMAIL:/^([A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+)(;[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+)*$/,PASSWORD:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/};function D(){var o,l,m;const{register:t,handleSubmit:p,setError:r,formState:{isSubmitting:g,errors:a,isValid:x}}=S({mode:"onTouched"}),f=A();function h(i){i&&i.forEach(s=>{s.toLowerCase().includes("password")?r("password",{message:s}):s.toLowerCase().includes("email")?r("email",{message:s}):s.toLowerCase().includes("username")&&r("username",{message:s})})}return e.jsx(j,{component:w,maxWidth:"sm",sx:{display:"flex",flexDirection:"column",alignItems:"center",p:"4"},children:e.jsxs(d,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(y,{sx:{m:1,bgcolor:"secondary.main"},children:e.jsx(L,{})}),e.jsx(E,{component:"h1",variant:"h5",children:"Register"}),e.jsxs(d,{component:"form",onSubmit:p(i=>b.Account.register(i).then(()=>{v.success("Registration successful!"),f("/login")}).catch(h)),noValidate:!0,sx:{mt:1},children:[e.jsx(n,{margin:"normal",fullWidth:!0,label:"User name",autoFocus:!0,autoComplete:"given-name",...t("username",{required:"User name is required"}),error:!!a.username,helperText:(o=a==null?void 0:a.username)==null?void 0:o.message}),e.jsx(n,{margin:"normal",fullWidth:!0,label:"Email",autoComplete:"email",...t("email",{required:"Email is required",pattern:{value:c.EMAIL,message:"Not a valid email address"}}),error:!!a.email,helperText:(l=a==null?void 0:a.email)==null?void 0:l.message}),e.jsx(n,{margin:"normal",fullWidth:!0,label:"Password",type:"password",autoComplete:"current-password",...t("password",{required:"Password is required",pattern:{value:c.PASSWORD,message:"Not a valid password"}}),error:!!a.password,helperText:(m=a==null?void 0:a.password)==null?void 0:m.message}),e.jsx(R,{loading:g,disabled:!x,type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Register"}),e.jsx(u,{container:!0,children:e.jsx(u,{item:!0,sx:{mb:4},children:e.jsx(T,{to:"/login",children:"Already have an account? Sign In"})})})]})]})})}export{D as default};
