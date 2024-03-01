import{R as D}from"./index-52948472.js";var ae=e=>e.type==="checkbox",te=e=>e instanceof Date,U=e=>e==null;const rt=e=>typeof e=="object";var C=e=>!U(e)&&!Array.isArray(e)&&rt(e)&&!te(e),st=e=>C(e)&&e.target?ae(e.target)?e.target.checked:e.target.value:e,Dt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,it=(e,i)=>e.has(Dt(i)),wt=e=>{const i=e.constructor&&e.constructor.prototype;return C(i)&&i.hasOwnProperty("isPrototypeOf")},pe=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function q(e){let i;const r=Array.isArray(e);if(e instanceof Date)i=new Date(e);else if(e instanceof Set)i=new Set(e);else if(!(pe&&(e instanceof Blob||e instanceof FileList))&&(r||C(e)))if(i=r?[]:{},!r&&!wt(e))i=e;else for(const s in e)e.hasOwnProperty(s)&&(i[s]=q(e[s]));else return e;return i}var le=e=>Array.isArray(e)?e.filter(Boolean):[],k=e=>e===void 0,d=(e,i,r)=>{if(!i||!C(e))return r;const s=le(i.split(/[,[\].]+?/)).reduce((n,l)=>U(n)?n:n[l],e);return k(s)||s===e?k(e[i])?r:e[i]:s},B=e=>typeof e=="boolean";const ge={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},W={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},ut=D.createContext(null),Le=()=>D.useContext(ut),Ht=e=>{const{children:i,...r}=e;return D.createElement(ut.Provider,{value:r},i)};var nt=(e,i,r,s=!0)=>{const n={defaultValues:i._defaultValues};for(const l in e)Object.defineProperty(n,l,{get:()=>{const f=l;return i._proxyFormState[f]!==W.all&&(i._proxyFormState[f]=!s||W.all),r&&(r[f]=!0),e[f]}});return n},M=e=>C(e)&&!Object.keys(e).length,at=(e,i,r,s)=>{r(e);const{name:n,...l}=e;return M(l)||Object.keys(l).length>=Object.keys(i).length||Object.keys(l).find(f=>i[f]===(!s||W.all))},ye=e=>Array.isArray(e)?e:[e],lt=(e,i,r)=>!e||!i||e===i||ye(e).some(s=>s&&(r?s===i:s.startsWith(i)||i.startsWith(s)));function Te(e){const i=D.useRef(e);i.current=e,D.useEffect(()=>{const r=!e.disabled&&i.current.subject&&i.current.subject.subscribe({next:i.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}function St(e){const i=Le(),{control:r=i.control,disabled:s,name:n,exact:l}=e||{},[f,_]=D.useState(r._formState),g=D.useRef(!0),E=D.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),S=D.useRef(n);return S.current=n,Te({disabled:s,next:F=>g.current&&lt(S.current,F.name,l)&&at(F,E.current,r._updateFormState)&&_({...r._formState,...F}),subject:r._subjects.state}),D.useEffect(()=>(g.current=!0,E.current.isValid&&r._updateValid(!0),()=>{g.current=!1}),[r]),nt(f,r,E.current,!1)}var K=e=>typeof e=="string",ot=(e,i,r,s,n)=>K(e)?(s&&i.watch.add(e),d(r,e,n)):Array.isArray(e)?e.map(l=>(s&&i.watch.add(l),d(r,l))):(s&&(i.watchAll=!0),r);function kt(e){const i=Le(),{control:r=i.control,name:s,defaultValue:n,disabled:l,exact:f}=e||{},_=D.useRef(s);_.current=s,Te({disabled:l,subject:r._subjects.values,next:S=>{lt(_.current,S.name,f)&&E(q(ot(_.current,r._names,S.values||r._formValues,!1,n)))}});const[g,E]=D.useState(r._getWatch(s,n));return D.useEffect(()=>r._removeUnmounted()),g}var Re=e=>/^\w*$/.test(e),ft=e=>le(e.replace(/["|']|\]/g,"").split(/\.|\[/)),m=(e,i,r)=>{let s=-1;const n=Re(i)?[i]:ft(i),l=n.length,f=l-1;for(;++s<l;){const _=n[s];let g=r;if(s!==f){const E=e[_];g=C(E)||Array.isArray(E)?E:isNaN(+n[s+1])?{}:[]}e[_]=g,e=e[_]}return e};function jt(e){const i=Le(),{name:r,disabled:s,control:n=i.control,shouldUnregister:l}=e,f=it(n._names.array,r),_=kt({control:n,name:r,defaultValue:d(n._formValues,r,d(n._defaultValues,r,e.defaultValue)),exact:!0}),g=St({control:n,name:r}),E=D.useRef(n.register(r,{...e.rules,value:_,...B(e.disabled)?{disabled:e.disabled}:{}}));return D.useEffect(()=>{const S=n._options.shouldUnregister||l,F=(v,H)=>{const R=d(n._fields,v);R&&(R._f.mount=H)};if(F(r,!0),S){const v=q(d(n._options.defaultValues,r));m(n._defaultValues,r,v),k(d(n._formValues,r))&&m(n._formValues,r,v)}return()=>{(f?S&&!n._state.action:S)?n.unregister(r):F(r,!1)}},[r,n,f,l]),D.useEffect(()=>{d(n._fields,r)&&n._updateDisabledField({disabled:s,fields:n._fields,name:r,value:d(n._fields,r)._f.value})},[s,r,n]),{field:{name:r,value:_,...B(s)||B(g.disabled)?{disabled:g.disabled||s}:{},onChange:D.useCallback(S=>E.current.onChange({target:{value:st(S),name:r},type:ge.CHANGE}),[r]),onBlur:D.useCallback(()=>E.current.onBlur({target:{value:d(n._formValues,r),name:r},type:ge.BLUR}),[r,n]),ref:S=>{const F=d(n._fields,r);F&&S&&(F._f.ref={focus:()=>S.focus(),select:()=>S.select(),setCustomValidity:v=>S.setCustomValidity(v),reportValidity:()=>S.reportValidity()})}},formState:g,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!d(g.errors,r)},isDirty:{enumerable:!0,get:()=>!!d(g.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!d(g.touchedFields,r)},error:{enumerable:!0,get:()=>d(g.errors,r)}})}}var Et=(e,i,r,s,n)=>i?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[s]:n||!0}}:{},ze=e=>({isOnSubmit:!e||e===W.onSubmit,isOnBlur:e===W.onBlur,isOnChange:e===W.onChange,isOnAll:e===W.all,isOnTouch:e===W.onTouched}),Je=(e,i,r)=>!r&&(i.watchAll||i.watch.has(e)||[...i.watch].some(s=>e.startsWith(s)&&/^\.\w+/.test(e.slice(s.length))));const ne=(e,i,r,s)=>{for(const n of r||Object.keys(e)){const l=d(e,n);if(l){const{_f:f,..._}=l;if(f){if(f.refs&&f.refs[0]&&i(f.refs[0],n)&&!s)break;if(f.ref&&i(f.ref,f.name)&&!s)break;ne(_,i)}else C(_)&&ne(_,i)}}};var Ct=(e,i,r)=>{const s=le(d(e,r));return m(s,"root",i[r]),m(e,r,s),e},Ue=e=>e.type==="file",J=e=>typeof e=="function",ve=e=>{if(!pe)return!1;const i=e?e.ownerDocument:0;return e instanceof(i&&i.defaultView?i.defaultView.HTMLElement:HTMLElement)},he=e=>K(e),Me=e=>e.type==="radio",_e=e=>e instanceof RegExp;const Qe={value:!1,isValid:!1},Xe={value:!0,isValid:!0};var ct=e=>{if(Array.isArray(e)){if(e.length>1){const i=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:i,isValid:!!i.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!k(e[0].attributes.value)?k(e[0].value)||e[0].value===""?Xe:{value:e[0].value,isValid:!0}:Xe:Qe}return Qe};const Ye={isValid:!1,value:null};var dt=e=>Array.isArray(e)?e.reduce((i,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:i,Ye):Ye;function Ze(e,i,r="validate"){if(he(e)||Array.isArray(e)&&e.every(he)||B(e)&&!e)return{type:r,message:he(e)?e:"",ref:i}}var ee=e=>C(e)&&!_e(e)?e:{value:e,message:""},et=async(e,i,r,s,n)=>{const{ref:l,refs:f,required:_,maxLength:g,minLength:E,min:S,max:F,pattern:v,validate:H,name:R,valueAsNumber:Fe,mount:oe,disabled:Ae}=e._f,b=d(i,R);if(!oe||Ae)return{};const P=f?f[0]:l,G=V=>{s&&P.reportValidity&&(P.setCustomValidity(B(V)?"":V||""),P.reportValidity())},O={},fe=Me(l),re=ae(l),se=fe||re,Y=(Fe||Ue(l))&&k(l.value)&&k(b)||ve(l)&&l.value===""||b===""||Array.isArray(b)&&!b.length,N=Et.bind(null,R,r,O),ce=(V,A,w,T=z.maxLength,j=z.minLength)=>{const I=V?A:w;O[R]={type:V?T:j,message:I,ref:l,...N(V?T:j,I)}};if(n?!Array.isArray(b)||!b.length:_&&(!se&&(Y||U(b))||B(b)&&!b||re&&!ct(f).isValid||fe&&!dt(f).isValid)){const{value:V,message:A}=he(_)?{value:!!_,message:_}:ee(_);if(V&&(O[R]={type:z.required,message:A,ref:P,...N(z.required,A)},!r))return G(A),O}if(!Y&&(!U(S)||!U(F))){let V,A;const w=ee(F),T=ee(S);if(!U(b)&&!isNaN(b)){const j=l.valueAsNumber||b&&+b;U(w.value)||(V=j>w.value),U(T.value)||(A=j<T.value)}else{const j=l.valueAsDate||new Date(b),I=de=>new Date(new Date().toDateString()+" "+de),ie=l.type=="time",Q=l.type=="week";K(w.value)&&b&&(V=ie?I(b)>I(w.value):Q?b>w.value:j>new Date(w.value)),K(T.value)&&b&&(A=ie?I(b)<I(T.value):Q?b<T.value:j<new Date(T.value))}if((V||A)&&(ce(!!V,w.message,T.message,z.max,z.min),!r))return G(O[R].message),O}if((g||E)&&!Y&&(K(b)||n&&Array.isArray(b))){const V=ee(g),A=ee(E),w=!U(V.value)&&b.length>+V.value,T=!U(A.value)&&b.length<+A.value;if((w||T)&&(ce(w,V.message,A.message),!r))return G(O[R].message),O}if(v&&!Y&&K(b)){const{value:V,message:A}=ee(v);if(_e(V)&&!b.match(V)&&(O[R]={type:z.pattern,message:A,ref:l,...N(z.pattern,A)},!r))return G(A),O}if(H){if(J(H)){const V=await H(b,i),A=Ze(V,P);if(A&&(O[R]={...A,...N(z.validate,A.message)},!r))return G(A.message),O}else if(C(H)){let V={};for(const A in H){if(!M(V)&&!r)break;const w=Ze(await H[A](b,i),P,A);w&&(V={...w,...N(A,w.message)},G(w.message),r&&(O[R]=V))}if(!M(V)&&(O[R]={ref:P,...V},!r))return O}}return G(!0),O};function Ot(e,i){const r=i.slice(0,-1).length;let s=0;for(;s<r;)e=k(e)?s++:e[i[s++]];return e}function pt(e){for(const i in e)if(e.hasOwnProperty(i)&&!k(e[i]))return!1;return!0}function L(e,i){const r=Array.isArray(i)?i:Re(i)?[i]:ft(i),s=r.length===1?e:Ot(e,r),n=r.length-1,l=r[n];return s&&delete s[l],n!==0&&(C(s)&&M(s)||Array.isArray(s)&&pt(s))&&L(e,r.slice(0,-1)),e}var ke=()=>{let e=[];return{get observers(){return e},next:n=>{for(const l of e)l.next&&l.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(l=>l!==n)}}),unsubscribe:()=>{e=[]}}},be=e=>U(e)||!rt(e);function X(e,i){if(be(e)||be(i))return e===i;if(te(e)&&te(i))return e.getTime()===i.getTime();const r=Object.keys(e),s=Object.keys(i);if(r.length!==s.length)return!1;for(const n of r){const l=e[n];if(!s.includes(n))return!1;if(n!=="ref"){const f=i[n];if(te(l)&&te(f)||C(l)&&C(f)||Array.isArray(l)&&Array.isArray(f)?!X(l,f):l!==f)return!1}}return!0}var yt=e=>e.type==="select-multiple",Lt=e=>Me(e)||ae(e),Ee=e=>ve(e)&&e.isConnected,ht=e=>{for(const i in e)if(J(e[i]))return!0;return!1};function Ve(e,i={}){const r=Array.isArray(e);if(C(e)||r)for(const s in e)Array.isArray(e[s])||C(e[s])&&!ht(e[s])?(i[s]=Array.isArray(e[s])?[]:{},Ve(e[s],i[s])):U(e[s])||(i[s]=!0);return i}function gt(e,i,r){const s=Array.isArray(e);if(C(e)||s)for(const n in e)Array.isArray(e[n])||C(e[n])&&!ht(e[n])?k(i)||be(r[n])?r[n]=Array.isArray(e[n])?Ve(e[n],[]):{...Ve(e[n])}:gt(e[n],U(i)?{}:i[n],r[n]):r[n]=!X(e[n],i[n]);return r}var Ce=(e,i)=>gt(e,i,Ve(i)),vt=(e,{valueAsNumber:i,valueAsDate:r,setValueAs:s})=>k(e)?e:i?e===""?NaN:e&&+e:r&&K(e)?new Date(e):s?s(e):e;function Oe(e){const i=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):i.disabled))return Ue(i)?i.files:Me(i)?dt(e.refs).value:yt(i)?[...i.selectedOptions].map(({value:r})=>r):ae(i)?ct(e.refs).value:vt(k(i.value)?e.ref.value:i.value,e)}var Tt=(e,i,r,s)=>{const n={};for(const l of e){const f=d(i,l);f&&m(n,l,f._f)}return{criteriaMode:r,names:[...e],fields:n,shouldUseNativeValidation:s}},ue=e=>k(e)?e:_e(e)?e.source:C(e)?_e(e.value)?e.value.source:e.value:e,Rt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function tt(e,i,r){const s=d(e,r);if(s||Re(r))return{error:s,name:r};const n=r.split(".");for(;n.length;){const l=n.join("."),f=d(i,l),_=d(e,l);if(f&&!Array.isArray(f)&&r!==l)return{name:r};if(_&&_.type)return{name:l,error:_};n.pop()}return{name:r}}var Ut=(e,i,r,s,n)=>n.isOnAll?!1:!r&&n.isOnTouch?!(i||e):(r?s.isOnBlur:n.isOnBlur)?!e:(r?s.isOnChange:n.isOnChange)?e:!0,Mt=(e,i)=>!le(d(e,i)).length&&L(e,i);const Bt={mode:W.onSubmit,reValidateMode:W.onChange,shouldFocusError:!0};function Pt(e={},i){let r={...Bt,...e},s={submitCount:0,isDirty:!1,isLoading:J(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:r.errors||{},disabled:!1},n={},l=C(r.defaultValues)||C(r.values)?q(r.defaultValues||r.values)||{}:{},f=r.shouldUnregister?{}:q(l),_={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},E,S=0;const F={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:ke(),array:ke(),state:ke()},H=e.resetOptions&&e.resetOptions.keepDirtyValues,R=ze(r.mode),Fe=ze(r.reValidateMode),oe=r.criteriaMode===W.all,Ae=t=>u=>{clearTimeout(S),S=setTimeout(t,u)},b=async t=>{if(F.isValid||t){const u=r.resolver?M((await N()).errors):await V(n,!0);u!==s.isValid&&v.state.next({isValid:u})}},P=t=>F.isValidating&&v.state.next({isValidating:t}),G=(t,u=[],a,y,c=!0,o=!0)=>{if(y&&a){if(_.action=!0,o&&Array.isArray(d(n,t))){const h=a(d(n,t),y.argA,y.argB);c&&m(n,t,h)}if(o&&Array.isArray(d(s.errors,t))){const h=a(d(s.errors,t),y.argA,y.argB);c&&m(s.errors,t,h),Mt(s.errors,t)}if(F.touchedFields&&o&&Array.isArray(d(s.touchedFields,t))){const h=a(d(s.touchedFields,t),y.argA,y.argB);c&&m(s.touchedFields,t,h)}F.dirtyFields&&(s.dirtyFields=Ce(l,f)),v.state.next({name:t,isDirty:w(t,u),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})}else m(f,t,u)},O=(t,u)=>{m(s.errors,t,u),v.state.next({errors:s.errors})},fe=t=>{s.errors=t,v.state.next({errors:s.errors,isValid:!1})},re=(t,u,a,y)=>{const c=d(n,t);if(c){const o=d(f,t,k(a)?d(l,t):a);k(o)||y&&y.defaultChecked||u?m(f,t,u?o:Oe(c._f)):I(t,o),_.mount&&b()}},se=(t,u,a,y,c)=>{let o=!1,h=!1;const x={name:t},p=!!(d(n,t)&&d(n,t)._f.disabled);if(!a||y){F.isDirty&&(h=s.isDirty,s.isDirty=x.isDirty=w(),o=h!==x.isDirty);const $=p||X(d(l,t),u);h=!!(!p&&d(s.dirtyFields,t)),$||p?L(s.dirtyFields,t):m(s.dirtyFields,t,!0),x.dirtyFields=s.dirtyFields,o=o||F.dirtyFields&&h!==!$}if(a){const $=d(s.touchedFields,t);$||(m(s.touchedFields,t,a),x.touchedFields=s.touchedFields,o=o||F.touchedFields&&$!==a)}return o&&c&&v.state.next(x),o?x:{}},Y=(t,u,a,y)=>{const c=d(s.errors,t),o=F.isValid&&B(u)&&s.isValid!==u;if(e.delayError&&a?(E=Ae(()=>O(t,a)),E(e.delayError)):(clearTimeout(S),E=null,a?m(s.errors,t,a):L(s.errors,t)),(a?!X(c,a):c)||!M(y)||o){const h={...y,...o&&B(u)?{isValid:u}:{},errors:s.errors,name:t};s={...s,...h},v.state.next(h)}P(!1)},N=async t=>r.resolver(f,r.context,Tt(t||g.mount,n,r.criteriaMode,r.shouldUseNativeValidation)),ce=async t=>{const{errors:u}=await N(t);if(t)for(const a of t){const y=d(u,a);y?m(s.errors,a,y):L(s.errors,a)}else s.errors=u;return u},V=async(t,u,a={valid:!0})=>{for(const y in t){const c=t[y];if(c){const{_f:o,...h}=c;if(o){const x=g.array.has(o.name),p=await et(c,f,oe,r.shouldUseNativeValidation&&!u,x);if(p[o.name]&&(a.valid=!1,u))break;!u&&(d(p,o.name)?x?Ct(s.errors,p,o.name):m(s.errors,o.name,p[o.name]):L(s.errors,o.name))}h&&await V(h,u,a)}}return a.valid},A=()=>{for(const t of g.unMount){const u=d(n,t);u&&(u._f.refs?u._f.refs.every(a=>!Ee(a)):!Ee(u._f.ref))&&me(t)}g.unMount=new Set},w=(t,u)=>(t&&u&&m(f,t,u),!X(Pe(),l)),T=(t,u,a)=>ot(t,g,{..._.mount?f:k(u)?l:K(t)?{[t]:u}:u},a,u),j=t=>le(d(_.mount?f:l,t,e.shouldUnregister?d(l,t,[]):[])),I=(t,u,a={})=>{const y=d(n,t);let c=u;if(y){const o=y._f;o&&(!o.disabled&&m(f,t,vt(u,o)),c=ve(o.ref)&&U(u)?"":u,yt(o.ref)?[...o.ref.options].forEach(h=>h.selected=c.includes(h.value)):o.refs?ae(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(c)?!!c.find(x=>x===h.value):c===h.value)):o.refs[0]&&(o.refs[0].checked=!!c):o.refs.forEach(h=>h.checked=h.value===c):Ue(o.ref)?o.ref.value="":(o.ref.value=c,o.ref.type||v.values.next({name:t,values:{...f}})))}(a.shouldDirty||a.shouldTouch)&&se(t,c,a.shouldTouch,a.shouldDirty,!0),a.shouldValidate&&xe(t)},ie=(t,u,a)=>{for(const y in u){const c=u[y],o=`${t}.${y}`,h=d(n,o);(g.array.has(t)||!be(c)||h&&!h._f)&&!te(c)?ie(o,c,a):I(o,c,a)}},Q=(t,u,a={})=>{const y=d(n,t),c=g.array.has(t),o=q(u);m(f,t,o),c?(v.array.next({name:t,values:{...f}}),(F.isDirty||F.dirtyFields)&&a.shouldDirty&&v.state.next({name:t,dirtyFields:Ce(l,f),isDirty:w(t,o)})):y&&!y._f&&!U(o)?ie(t,o,a):I(t,o,a),Je(t,g)&&v.state.next({...s}),v.values.next({name:t,values:{...f}}),!_.mount&&i()},de=async t=>{const u=t.target;let a=u.name,y=!0;const c=d(n,a),o=()=>u.type?Oe(c._f):st(t),h=x=>{y=Number.isNaN(x)||x===d(f,a,x)};if(c){let x,p;const $=o(),Z=t.type===ge.BLUR||t.type===ge.FOCUS_OUT,At=!Rt(c._f)&&!r.resolver&&!d(s.errors,a)&&!c._f.deps||Ut(Z,d(s.touchedFields,a),s.isSubmitted,Fe,R),we=Je(a,g,Z);m(f,a,$),Z?(c._f.onBlur&&c._f.onBlur(t),E&&E(0)):c._f.onChange&&c._f.onChange(t);const Se=se(a,$,Z,!1),xt=!M(Se)||we;if(!Z&&v.values.next({name:a,type:t.type,values:{...f}}),At)return F.isValid&&b(),xt&&v.state.next({name:a,...we?{}:Se});if(!Z&&we&&v.state.next({...s}),P(!0),r.resolver){const{errors:Ke}=await N([a]);if(h($),y){const mt=tt(s.errors,n,a),Ge=tt(Ke,n,mt.name||a);x=Ge.error,a=Ge.name,p=M(Ke)}}else x=(await et(c,f,oe,r.shouldUseNativeValidation))[a],h($),y&&(x?p=!1:F.isValid&&(p=await V(n,!0)));y&&(c._f.deps&&xe(c._f.deps),Y(a,p,x,Se))}},Be=(t,u)=>{if(d(s.errors,u)&&t.focus)return t.focus(),1},xe=async(t,u={})=>{let a,y;const c=ye(t);if(P(!0),r.resolver){const o=await ce(k(t)?t:c);a=M(o),y=t?!c.some(h=>d(o,h)):a}else t?(y=(await Promise.all(c.map(async o=>{const h=d(n,o);return await V(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!y&&!s.isValid)&&b()):y=a=await V(n);return v.state.next({...!K(t)||F.isValid&&a!==s.isValid?{}:{name:t},...r.resolver||!t?{isValid:a}:{},errors:s.errors,isValidating:!1}),u.shouldFocus&&!y&&ne(n,Be,t?c:g.mount),y},Pe=t=>{const u={...l,..._.mount?f:{}};return k(t)?u:K(t)?d(u,t):t.map(a=>d(u,a))},Ne=(t,u)=>({invalid:!!d((u||s).errors,t),isDirty:!!d((u||s).dirtyFields,t),isTouched:!!d((u||s).touchedFields,t),error:d((u||s).errors,t)}),_t=t=>{t&&ye(t).forEach(u=>L(s.errors,u)),v.state.next({errors:t?s.errors:{}})},Ie=(t,u,a)=>{const y=(d(n,t,{_f:{}})._f||{}).ref;m(s.errors,t,{...u,ref:y}),v.state.next({name:t,errors:s.errors,isValid:!1}),a&&a.shouldFocus&&y&&y.focus&&y.focus()},bt=(t,u)=>J(t)?v.values.subscribe({next:a=>t(T(void 0,u),a)}):T(t,u,!0),me=(t,u={})=>{for(const a of t?ye(t):g.mount)g.mount.delete(a),g.array.delete(a),u.keepValue||(L(n,a),L(f,a)),!u.keepError&&L(s.errors,a),!u.keepDirty&&L(s.dirtyFields,a),!u.keepTouched&&L(s.touchedFields,a),!r.shouldUnregister&&!u.keepDefaultValue&&L(l,a);v.values.next({values:{...f}}),v.state.next({...s,...u.keepDirty?{isDirty:w()}:{}}),!u.keepIsValid&&b()},qe=({disabled:t,name:u,field:a,fields:y,value:c})=>{if(B(t)){const o=t?void 0:k(c)?Oe(a?a._f:d(y,u)._f):c;m(f,u,o),se(u,o,!1,!1,!0)}},De=(t,u={})=>{let a=d(n,t);const y=B(u.disabled);return m(n,t,{...a||{},_f:{...a&&a._f?a._f:{ref:{name:t}},name:t,mount:!0,...u}}),g.mount.add(t),a?qe({field:a,disabled:u.disabled,name:t,value:u.value}):re(t,!0,u.value),{...y?{disabled:u.disabled}:{},...r.progressive?{required:!!u.required,min:ue(u.min),max:ue(u.max),minLength:ue(u.minLength),maxLength:ue(u.maxLength),pattern:ue(u.pattern)}:{},name:t,onChange:de,onBlur:de,ref:c=>{if(c){De(t,u),a=d(n,t);const o=k(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,h=Lt(o),x=a._f.refs||[];if(h?x.find(p=>p===o):o===a._f.ref)return;m(n,t,{_f:{...a._f,...h?{refs:[...x.filter(Ee),o,...Array.isArray(d(l,t))?[{}]:[]],ref:{type:o.type,name:t}}:{ref:o}}}),re(t,!1,void 0,o)}else a=d(n,t,{}),a._f&&(a._f.mount=!1),(r.shouldUnregister||u.shouldUnregister)&&!(it(g.array,t)&&_.action)&&g.unMount.add(t)}}},We=()=>r.shouldFocusError&&ne(n,Be,g.mount),Vt=t=>{B(t)&&(v.state.next({disabled:t}),ne(n,(u,a)=>{let y=t;const c=d(n,a);c&&B(c._f.disabled)&&(y||(y=c._f.disabled)),u.disabled=y},0,!1))},He=(t,u)=>async a=>{a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let y=q(f);if(v.state.next({isSubmitting:!0}),r.resolver){const{errors:c,values:o}=await N();s.errors=c,y=o}else await V(n);L(s.errors,"root"),M(s.errors)?(v.state.next({errors:{}}),await t(y,a)):(u&&await u({...s.errors},a),We(),setTimeout(We)),v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:M(s.errors),submitCount:s.submitCount+1,errors:s.errors})},Ft=(t,u={})=>{d(n,t)&&(k(u.defaultValue)?Q(t,d(l,t)):(Q(t,u.defaultValue),m(l,t,u.defaultValue)),u.keepTouched||L(s.touchedFields,t),u.keepDirty||(L(s.dirtyFields,t),s.isDirty=u.defaultValue?w(t,d(l,t)):w()),u.keepError||(L(s.errors,t),F.isValid&&b()),v.state.next({...s}))},je=(t,u={})=>{const a=t?q(t):l,y=q(a),c=t&&!M(t)?y:l;if(u.keepDefaultValues||(l=a),!u.keepValues){if(u.keepDirtyValues||H)for(const o of g.mount)d(s.dirtyFields,o)?m(c,o,d(f,o)):Q(o,d(c,o));else{if(pe&&k(t))for(const o of g.mount){const h=d(n,o);if(h&&h._f){const x=Array.isArray(h._f.refs)?h._f.refs[0]:h._f.ref;if(ve(x)){const p=x.closest("form");if(p){p.reset();break}}}}n={}}f=e.shouldUnregister?u.keepDefaultValues?q(l):{}:q(c),v.array.next({values:{...c}}),v.values.next({values:{...c}})}g={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!_.mount&&i(),_.mount=!F.isValid||!!u.keepIsValid,_.watch=!!e.shouldUnregister,v.state.next({submitCount:u.keepSubmitCount?s.submitCount:0,isDirty:u.keepDirty?s.isDirty:!!(u.keepDefaultValues&&!X(t,l)),isSubmitted:u.keepIsSubmitted?s.isSubmitted:!1,dirtyFields:u.keepDirtyValues?s.dirtyFields:u.keepDefaultValues&&t?Ce(l,t):{},touchedFields:u.keepTouched?s.touchedFields:{},errors:u.keepErrors?s.errors:{},isSubmitSuccessful:u.keepIsSubmitSuccessful?s.isSubmitSuccessful:!1,isSubmitting:!1})},$e=(t,u)=>je(J(t)?t(f):t,u);return{control:{register:De,unregister:me,getFieldState:Ne,handleSubmit:He,setError:Ie,_executeSchema:N,_getWatch:T,_getDirty:w,_updateValid:b,_removeUnmounted:A,_updateFieldArray:G,_updateDisabledField:qe,_getFieldArray:j,_reset:je,_resetDefaultValues:()=>J(r.defaultValues)&&r.defaultValues().then(t=>{$e(t,r.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:t=>{s={...s,...t}},_disableForm:Vt,_subjects:v,_proxyFormState:F,_setErrors:fe,get _fields(){return n},get _formValues(){return f},get _state(){return _},set _state(t){_=t},get _defaultValues(){return l},get _names(){return g},set _names(t){g=t},get _formState(){return s},set _formState(t){s=t},get _options(){return r},set _options(t){r={...r,...t}}},trigger:xe,register:De,handleSubmit:He,watch:bt,setValue:Q,getValues:Pe,reset:$e,resetField:Ft,clearErrors:_t,unregister:me,setError:Ie,setFocus:(t,u={})=>{const a=d(n,t),y=a&&a._f;if(y){const c=y.refs?y.refs[0]:y.ref;c.focus&&(c.focus(),u.shouldSelect&&c.select())}},getFieldState:Ne}}function $t(e={}){const i=D.useRef(),r=D.useRef(),[s,n]=D.useState({isDirty:!1,isValidating:!1,isLoading:J(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:e.errors||{},disabled:!1,defaultValues:J(e.defaultValues)?void 0:e.defaultValues});i.current||(i.current={...Pt(e,()=>n(f=>({...f}))),formState:s});const l=i.current.control;return l._options=e,Te({subject:l._subjects.state,next:f=>{at(f,l._proxyFormState,l._updateFormState,!0)&&n({...l._formState})}}),D.useEffect(()=>l._disableForm(e.disabled),[l,e.disabled]),D.useEffect(()=>{if(l._proxyFormState.isDirty){const f=l._getDirty();f!==s.isDirty&&l._subjects.state.next({isDirty:f})}},[l,s.isDirty]),D.useEffect(()=>{e.values&&!X(e.values,r.current)?(l._reset(e.values,l._options.resetOptions),r.current=e.values,n(f=>({...f}))):l._resetDefaultValues()},[e.values,l]),D.useEffect(()=>{e.errors&&l._setErrors(e.errors)},[e.errors,l]),D.useEffect(()=>{l._state.mount||(l._updateValid(),l._state.mount=!0),l._state.watch&&(l._state.watch=!1,l._subjects.state.next({...l._formState})),l._removeUnmounted()}),i.current.formState=nt(s,l),i.current}export{Ht as F,$t as a,Le as b,Et as c,d as g,m as s,jt as u};