import{c as or,j as a,M as Cr,r as p,R as _r,T as Fe,f as ar,e as z,P as sr,B as cr,h as Tr,i as Ir,k as kr,s as Rr}from"./index-0d088209.js";import{T as Lr,f as zr}from"./format-4907eafe.js";import{u as lr}from"./useProducts-fb303d97.js";import{S as Mr}from"./StorePagination-b36f5389.js";import{u as ur,a as $r}from"./index.esm-f6f5005b.js";import{P as y,c as Hr,a as X,b as Ue,d as Br,S as ee,o as Kr}from"./index.esm-29ccb5bd.js";import{F as fr,I as Wr,S as Ur,a as pr}from"./TextField-e6bdd615.js";import{G as S}from"./Grid-41f2084a.js";import{L as xe}from"./LoadingButton-ca61a93f.js";import{T as qr,a as Nr,b as qe,c as D,d as Vr}from"./TableRow-644c39ba.js";import{D as Gr}from"./Delete-a7c49ade.js";const Yr=or(a.jsx("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit"),Qr=or(a.jsx("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"}),"UploadFile");function Ne(e){var t;const{field:r,fieldState:n}=ur({...e,defaultValue:""});return a.jsxs(fr,{fullWidth:!0,error:!!n.error,children:[a.jsx(Wr,{children:e.label}),a.jsx(Ur,{value:r.value,label:e.label,onChange:r.onChange,children:e.items.map(o=>a.jsx(Cr,{value:o,children:o},o))}),a.jsx(pr,{children:(t=n.error)==null?void 0:t.message})]})}function M(e,r,n,t){function o(i){return i instanceof n?i:new n(function(c){c(i)})}return new(n||(n=Promise))(function(i,c){function u(d){try{l(t.next(d))}catch(h){c(h)}}function g(d){try{l(t.throw(d))}catch(h){c(h)}}function l(d){d.done?i(d.value):o(d.value).then(u,g)}l((t=t.apply(e,r||[])).next())})}function $(e,r){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},t,o,i,c;return c={next:u(0),throw:u(1),return:u(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function u(l){return function(d){return g([l,d])}}function g(l){if(t)throw new TypeError("Generator is already executing.");for(;c&&(c=0,l[0]&&(n=0)),n;)try{if(t=1,o&&(i=l[0]&2?o.return:l[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,l[1])).done)return i;switch(o=0,i&&(l=[l[0]&2,i.value]),l[0]){case 0:case 1:i=l;break;case 4:return n.label++,{value:l[1],done:!1};case 5:n.label++,o=l[1],l=[0];continue;case 7:l=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){n=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){n.label=l[1];break}if(l[0]===6&&n.label<i[1]){n.label=i[1],i=l;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(l);break}i[2]&&n.ops.pop(),n.trys.pop();continue}l=r.call(e,n)}catch(d){l=[6,d],o=0}finally{t=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Ve(e,r){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var t=n.call(e),o,i=[],c;try{for(;(r===void 0||r-- >0)&&!(o=t.next()).done;)i.push(o.value)}catch(u){c={error:u}}finally{try{o&&!o.done&&(n=t.return)&&n.call(t)}finally{if(c)throw c.error}}return i}function Ge(e,r,n){if(n||arguments.length===2)for(var t=0,o=r.length,i;t<o;t++)(i||!(t in r))&&(i||(i=Array.prototype.slice.call(r,0,t)),i[t]=r[t]);return e.concat(i||Array.prototype.slice.call(r))}var Zr=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function q(e,r){var n=Jr(e);if(typeof n.path!="string"){var t=e.webkitRelativePath;Object.defineProperty(n,"path",{value:typeof r=="string"?r:typeof t=="string"&&t.length>0?t:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}function Jr(e){var r=e.name,n=r&&r.lastIndexOf(".")!==-1;if(n&&!e.type){var t=r.split(".").pop().toLowerCase(),o=Zr.get(t);o&&Object.defineProperty(e,"type",{value:o,writable:!1,configurable:!1,enumerable:!0})}return e}var Xr=[".DS_Store","Thumbs.db"];function en(e){return M(this,void 0,void 0,function(){return $(this,function(r){return ne(e)&&rn(e.dataTransfer)?[2,an(e.dataTransfer,e.type)]:nn(e)?[2,tn(e)]:Array.isArray(e)&&e.every(function(n){return"getFile"in n&&typeof n.getFile=="function"})?[2,on(e)]:[2,[]]})})}function rn(e){return ne(e)}function nn(e){return ne(e)&&ne(e.target)}function ne(e){return typeof e=="object"&&e!==null}function tn(e){return je(e.target.files).map(function(r){return q(r)})}function on(e){return M(this,void 0,void 0,function(){var r;return $(this,function(n){switch(n.label){case 0:return[4,Promise.all(e.map(function(t){return t.getFile()}))];case 1:return r=n.sent(),[2,r.map(function(t){return q(t)})]}})})}function an(e,r){return M(this,void 0,void 0,function(){var n,t;return $(this,function(o){switch(o.label){case 0:return e.items?(n=je(e.items).filter(function(i){return i.kind==="file"}),r!=="drop"?[2,n]:[4,Promise.all(n.map(sn))]):[3,2];case 1:return t=o.sent(),[2,Ye(dr(t))];case 2:return[2,Ye(je(e.files).map(function(i){return q(i)}))]}})})}function Ye(e){return e.filter(function(r){return Xr.indexOf(r.name)===-1})}function je(e){if(e===null)return[];for(var r=[],n=0;n<e.length;n++){var t=e[n];r.push(t)}return r}function sn(e){if(typeof e.webkitGetAsEntry!="function")return Qe(e);var r=e.webkitGetAsEntry();return r&&r.isDirectory?mr(r):Qe(e)}function dr(e){return e.reduce(function(r,n){return Ge(Ge([],Ve(r),!1),Ve(Array.isArray(n)?dr(n):[n]),!1)},[])}function Qe(e){var r=e.getAsFile();if(!r)return Promise.reject("".concat(e," is not a File"));var n=q(r);return Promise.resolve(n)}function cn(e){return M(this,void 0,void 0,function(){return $(this,function(r){return[2,e.isDirectory?mr(e):ln(e)]})})}function mr(e){var r=e.createReader();return new Promise(function(n,t){var o=[];function i(){var c=this;r.readEntries(function(u){return M(c,void 0,void 0,function(){var g,l,d;return $(this,function(h){switch(h.label){case 0:if(u.length)return[3,5];h.label=1;case 1:return h.trys.push([1,3,,4]),[4,Promise.all(o)];case 2:return g=h.sent(),n(g),[3,4];case 3:return l=h.sent(),t(l),[3,4];case 4:return[3,6];case 5:d=Promise.all(u.map(cn)),o.push(d),i(),h.label=6;case 6:return[2]}})})},function(u){t(u)})}i()})}function ln(e){return M(this,void 0,void 0,function(){return $(this,function(r){return[2,new Promise(function(n,t){e.file(function(o){var i=q(o,e.fullPath);n(i)},function(o){t(o)})})]})})}var un=function(e,r){if(e&&r){var n=Array.isArray(r)?r:r.split(","),t=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return n.some(function(c){var u=c.trim().toLowerCase();return u.charAt(0)==="."?t.toLowerCase().endsWith(u):u.endsWith("/*")?i===u.replace(/\/.*$/,""):o===u})}return!0};function Ze(e){return dn(e)||pn(e)||yr(e)||fn()}function fn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pn(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function dn(e){if(Array.isArray(e))return De(e)}function Je(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,t)}return n}function Xe(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?Je(Object(n),!0).forEach(function(t){gr(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Je(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function gr(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function U(e,r){return yn(e)||gn(e,r)||yr(e,r)||mn()}function mn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function yr(e,r){if(e){if(typeof e=="string")return De(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return De(e,r)}}function De(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function gn(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var t=[],o=!0,i=!1,c,u;try{for(n=n.call(e);!(o=(c=n.next()).done)&&(t.push(c.value),!(r&&t.length===r));o=!0);}catch(g){i=!0,u=g}finally{try{!o&&n.return!=null&&n.return()}finally{if(i)throw u}}return t}}function yn(e){if(Array.isArray(e))return e}var hn="file-invalid-type",vn="file-too-large",bn="file-too-small",xn="too-many-files",jn=function(r){r=Array.isArray(r)&&r.length===1?r[0]:r;var n=Array.isArray(r)?"one of ".concat(r.join(", ")):r;return{code:hn,message:"File type must be ".concat(n)}},er=function(r){return{code:vn,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},rr=function(r){return{code:bn,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},Dn={code:xn,message:"Too many files"};function hr(e,r){var n=e.type==="application/x-moz-file"||un(e,r);return[n,n?null:jn(r)]}function vr(e,r,n){if(T(e.size))if(T(r)&&T(n)){if(e.size>n)return[!1,er(n)];if(e.size<r)return[!1,rr(r)]}else{if(T(r)&&e.size<r)return[!1,rr(r)];if(T(n)&&e.size>n)return[!1,er(n)]}return[!0,null]}function T(e){return e!=null}function wn(e){var r=e.files,n=e.accept,t=e.minSize,o=e.maxSize,i=e.multiple,c=e.maxFiles,u=e.validator;return!i&&r.length>1||i&&c>=1&&r.length>c?!1:r.every(function(g){var l=hr(g,n),d=U(l,1),h=d[0],O=vr(g,t,o),m=U(O,1),P=m[0],H=u?u(g):null;return h&&P&&!H})}function te(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function re(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function nr(e){e.preventDefault()}function An(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function En(e){return e.indexOf("Edge/")!==-1}function Fn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return An(e)||En(e)}function F(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return function(t){for(var o=arguments.length,i=new Array(o>1?o-1:0),c=1;c<o;c++)i[c-1]=arguments[c];return r.some(function(u){return!te(t)&&u&&u.apply(void 0,[t].concat(i)),te(t)})}}function On(){return"showOpenFilePicker"in window}function Sn(e){if(T(e)){var r=Object.entries(e).filter(function(n){var t=U(n,2),o=t[0],i=t[1],c=!0;return br(o)||(console.warn('Skipped "'.concat(o,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),c=!1),(!Array.isArray(i)||!i.every(xr))&&(console.warn('Skipped "'.concat(o,'" because an invalid file extension was provided.')),c=!1),c}).reduce(function(n,t){var o=U(t,2),i=o[0],c=o[1];return Xe(Xe({},n),{},gr({},i,c))},{});return[{description:"Files",accept:r}]}return e}function Pn(e){if(T(e))return Object.entries(e).reduce(function(r,n){var t=U(n,2),o=t[0],i=t[1];return[].concat(Ze(r),[o],Ze(i))},[]).filter(function(r){return br(r)||xr(r)}).join(",")}function Cn(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function _n(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function br(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function xr(e){return/^.*\.[\w]+$/.test(e)}var Tn=["children"],In=["open"],kn=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],Rn=["refKey","onChange","onClick"];function Ln(e){return $n(e)||Mn(e)||jr(e)||zn()}function zn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Mn(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function $n(e){if(Array.isArray(e))return we(e)}function be(e,r){return Kn(e)||Bn(e,r)||jr(e,r)||Hn()}function Hn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function jr(e,r){if(e){if(typeof e=="string")return we(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return we(e,r)}}function we(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function Bn(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var t=[],o=!0,i=!1,c,u;try{for(n=n.call(e);!(o=(c=n.next()).done)&&(t.push(c.value),!(r&&t.length===r));o=!0);}catch(g){i=!0,u=g}finally{try{!o&&n.return!=null&&n.return()}finally{if(i)throw u}}return t}}function Kn(e){if(Array.isArray(e))return e}function tr(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,t)}return n}function v(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?tr(Object(n),!0).forEach(function(t){Ae(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):tr(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Ae(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function ie(e,r){if(e==null)return{};var n=Wn(e,r),t,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}function Wn(e,r){if(e==null)return{};var n={},t=Object.keys(e),o,i;for(i=0;i<t.length;i++)o=t[i],!(r.indexOf(o)>=0)&&(n[o]=e[o]);return n}var Oe=p.forwardRef(function(e,r){var n=e.children,t=ie(e,Tn),o=wr(t),i=o.open,c=ie(o,In);return p.useImperativeHandle(r,function(){return{open:i}},[i]),_r.createElement(p.Fragment,null,n(v(v({},c),{},{open:i})))});Oe.displayName="Dropzone";var Dr={disabled:!1,getFilesFromEvent:en,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};Oe.defaultProps=Dr;Oe.propTypes={children:y.func,accept:y.objectOf(y.arrayOf(y.string)),multiple:y.bool,preventDropOnDocument:y.bool,noClick:y.bool,noKeyboard:y.bool,noDrag:y.bool,noDragEventsBubbling:y.bool,minSize:y.number,maxSize:y.number,maxFiles:y.number,disabled:y.bool,getFilesFromEvent:y.func,onFileDialogCancel:y.func,onFileDialogOpen:y.func,useFsAccessApi:y.bool,autoFocus:y.bool,onDragEnter:y.func,onDragLeave:y.func,onDragOver:y.func,onDrop:y.func,onDropAccepted:y.func,onDropRejected:y.func,onError:y.func,validator:y.func};var Ee={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function wr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=v(v({},Dr),e),n=r.accept,t=r.disabled,o=r.getFilesFromEvent,i=r.maxSize,c=r.minSize,u=r.multiple,g=r.maxFiles,l=r.onDragEnter,d=r.onDragLeave,h=r.onDragOver,O=r.onDrop,m=r.onDropAccepted,P=r.onDropRejected,H=r.onFileDialogCancel,oe=r.onFileDialogOpen,Se=r.useFsAccessApi,Pe=r.autoFocus,ae=r.preventDropOnDocument,Ce=r.noClick,se=r.noKeyboard,_e=r.noDrag,C=r.noDragEventsBubbling,ce=r.onError,B=r.validator,K=p.useMemo(function(){return Pn(n)},[n]),Te=p.useMemo(function(){return Sn(n)},[n]),le=p.useMemo(function(){return typeof oe=="function"?oe:ir},[oe]),N=p.useMemo(function(){return typeof H=="function"?H:ir},[H]),j=p.useRef(null),E=p.useRef(null),Ar=p.useReducer(Un,Ee),Ie=be(Ar,2),ue=Ie[0],w=Ie[1],Er=ue.isFocused,ke=ue.isFileDialogActive,V=p.useRef(typeof window<"u"&&window.isSecureContext&&Se&&On()),Re=function(){!V.current&&ke&&setTimeout(function(){if(E.current){var f=E.current.files;f.length||(w({type:"closeDialog"}),N())}},300)};p.useEffect(function(){return window.addEventListener("focus",Re,!1),function(){window.removeEventListener("focus",Re,!1)}},[E,ke,N,V]);var I=p.useRef([]),Le=function(f){j.current&&j.current.contains(f.target)||(f.preventDefault(),I.current=[])};p.useEffect(function(){return ae&&(document.addEventListener("dragover",nr,!1),document.addEventListener("drop",Le,!1)),function(){ae&&(document.removeEventListener("dragover",nr),document.removeEventListener("drop",Le))}},[j,ae]),p.useEffect(function(){return!t&&Pe&&j.current&&j.current.focus(),function(){}},[j,Pe,t]);var _=p.useCallback(function(s){ce?ce(s):console.error(s)},[ce]),ze=p.useCallback(function(s){s.preventDefault(),s.persist(),Z(s),I.current=[].concat(Ln(I.current),[s.target]),re(s)&&Promise.resolve(o(s)).then(function(f){if(!(te(s)&&!C)){var b=f.length,x=b>0&&wn({files:f,accept:K,minSize:c,maxSize:i,multiple:u,maxFiles:g,validator:B}),A=b>0&&!x;w({isDragAccept:x,isDragReject:A,isDragActive:!0,type:"setDraggedFiles"}),l&&l(s)}}).catch(function(f){return _(f)})},[o,l,_,C,K,c,i,u,g,B]),Me=p.useCallback(function(s){s.preventDefault(),s.persist(),Z(s);var f=re(s);if(f&&s.dataTransfer)try{s.dataTransfer.dropEffect="copy"}catch{}return f&&h&&h(s),!1},[h,C]),$e=p.useCallback(function(s){s.preventDefault(),s.persist(),Z(s);var f=I.current.filter(function(x){return j.current&&j.current.contains(x)}),b=f.indexOf(s.target);b!==-1&&f.splice(b,1),I.current=f,!(f.length>0)&&(w({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),re(s)&&d&&d(s))},[j,d,C]),G=p.useCallback(function(s,f){var b=[],x=[];s.forEach(function(A){var W=hr(A,K),L=be(W,2),pe=L[0],de=L[1],me=vr(A,c,i),J=be(me,2),ge=J[0],ye=J[1],he=B?B(A):null;if(pe&&ge&&!he)b.push(A);else{var ve=[de,ye];he&&(ve=ve.concat(he)),x.push({file:A,errors:ve.filter(function(Pr){return Pr})})}}),(!u&&b.length>1||u&&g>=1&&b.length>g)&&(b.forEach(function(A){x.push({file:A,errors:[Dn]})}),b.splice(0)),w({acceptedFiles:b,fileRejections:x,type:"setFiles"}),O&&O(b,x,f),x.length>0&&P&&P(x,f),b.length>0&&m&&m(b,f)},[w,u,K,c,i,g,O,m,P,B]),Y=p.useCallback(function(s){s.preventDefault(),s.persist(),Z(s),I.current=[],re(s)&&Promise.resolve(o(s)).then(function(f){te(s)&&!C||G(f,s)}).catch(function(f){return _(f)}),w({type:"reset"})},[o,G,_,C]),k=p.useCallback(function(){if(V.current){w({type:"openDialog"}),le();var s={multiple:u,types:Te};window.showOpenFilePicker(s).then(function(f){return o(f)}).then(function(f){G(f,null),w({type:"closeDialog"})}).catch(function(f){Cn(f)?(N(f),w({type:"closeDialog"})):_n(f)?(V.current=!1,E.current?(E.current.value=null,E.current.click()):_(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):_(f)});return}E.current&&(w({type:"openDialog"}),le(),E.current.value=null,E.current.click())},[w,le,N,Se,G,_,Te,u]),He=p.useCallback(function(s){!j.current||!j.current.isEqualNode(s.target)||(s.key===" "||s.key==="Enter"||s.keyCode===32||s.keyCode===13)&&(s.preventDefault(),k())},[j,k]),Be=p.useCallback(function(){w({type:"focus"})},[]),Ke=p.useCallback(function(){w({type:"blur"})},[]),We=p.useCallback(function(){Ce||(Fn()?setTimeout(k,0):k())},[Ce,k]),R=function(f){return t?null:f},fe=function(f){return se?null:R(f)},Q=function(f){return _e?null:R(f)},Z=function(f){C&&f.stopPropagation()},Fr=p.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,b=f===void 0?"ref":f,x=s.role,A=s.onKeyDown,W=s.onFocus,L=s.onBlur,pe=s.onClick,de=s.onDragEnter,me=s.onDragOver,J=s.onDragLeave,ge=s.onDrop,ye=ie(s,kn);return v(v(Ae({onKeyDown:fe(F(A,He)),onFocus:fe(F(W,Be)),onBlur:fe(F(L,Ke)),onClick:R(F(pe,We)),onDragEnter:Q(F(de,ze)),onDragOver:Q(F(me,Me)),onDragLeave:Q(F(J,$e)),onDrop:Q(F(ge,Y)),role:typeof x=="string"&&x!==""?x:"presentation"},b,j),!t&&!se?{tabIndex:0}:{}),ye)}},[j,He,Be,Ke,We,ze,Me,$e,Y,se,_e,t]),Or=p.useCallback(function(s){s.stopPropagation()},[]),Sr=p.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,b=f===void 0?"ref":f,x=s.onChange,A=s.onClick,W=ie(s,Rn),L=Ae({accept:K,multiple:u,type:"file",style:{display:"none"},onChange:R(F(x,Y)),onClick:R(F(A,Or)),tabIndex:-1},b,E);return v(v({},L),W)}},[E,n,u,Y,t]);return v(v({},ue),{},{isFocused:Er&&!t,getRootProps:Fr,getInputProps:Sr,rootRef:j,inputRef:E,open:R(k)})}function Un(e,r){switch(r.type){case"focus":return v(v({},e),{},{isFocused:!0});case"blur":return v(v({},e),{},{isFocused:!1});case"openDialog":return v(v({},Ee),{},{isFileDialogActive:!0});case"closeDialog":return v(v({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return v(v({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return v(v({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections});case"reset":return v({},Ee);default:return e}}function ir(){}function qn(e){var l;const{field:r,fieldState:n}=ur({...e,defaultValue:null}),t=p.useCallback(d=>{d[0]=Object.assign(d[0],{preview:URL.createObjectURL(d[0])}),r.onChange(d[0])},[r]),{getRootProps:o,getInputProps:i,isDragActive:c}=wr({onDrop:t}),u={display:"flex",border:"dashed 3px #eee",borderColor:"#eee",borderRadius:"4px",paddingTop:"30px",alignItems:"center",height:200,width:500},g={borderColor:"green"};return a.jsxs("div",{...o(),children:[a.jsx("input",{...i()}),a.jsxs(fr,{style:c?{...u,...g}:u,error:!!n.error,children:[a.jsx("input",{...i()}),a.jsx(Qr,{sx:{fontSize:"100px"}}),a.jsx(Fe,{variant:"h4",children:"Drop image here"}),a.jsx(pr,{children:(l=n.error)==null?void 0:l.message})]})]})}const Nn=Hr({name:X().required(),brand:X().required(),type:X().required(),description:X().required(),price:Ue().required().moreThan(100),quantityInStock:Ue().required().min(0),pictureFile:Br().when("pictureUrl",{is:e=>!e,then:e=>e.required("Please provide an image"),otherwise:e=>e.notRequired()})});function Vn({product:e,onCancel:r}){const{control:n,reset:t,watch:o,handleSubmit:i,formState:{isDirty:c,isSubmitting:u}}=$r({resolver:Kr(Nn)}),g=ar(),{brands:l,types:d}=lr(),h=o("pictureFile",null);p.useEffect(()=>(e&&!h&&!c&&t(e),()=>{h&&URL.revokeObjectURL(h.preview)}),[c,e,t,h]);async function O(m){e?await g(Tr(m)):await g(Ir(m)),r()}return a.jsxs(z,{component:sr,sx:{p:4},children:[a.jsx(Fe,{variant:"h4",gutterBottom:!0,sx:{mb:4},children:"Product Details"}),a.jsxs("form",{onSubmit:i(O),children:[a.jsxs(S,{container:!0,spacing:3,children:[a.jsx(S,{item:!0,xs:12,sm:12,children:a.jsx(ee,{control:n,name:"name",label:"Product name"})}),a.jsx(S,{item:!0,xs:12,sm:6,children:a.jsx(Ne,{control:n,items:l,name:"brand",label:"Brand"})}),a.jsx(S,{item:!0,xs:12,sm:6,children:a.jsx(Ne,{control:n,items:d,name:"type",label:"Type"})}),a.jsx(S,{item:!0,xs:12,sm:6,children:a.jsx(ee,{control:n,name:"price",label:"Price",type:"number"})}),a.jsx(S,{item:!0,xs:12,sm:6,children:a.jsx(ee,{control:n,name:"quantityInStock",label:"Quantity in Stock",type:"number"})}),a.jsx(S,{item:!0,xs:12,children:a.jsx(ee,{multiline:!0,rows:4,control:n,name:"description",label:"Description"})}),a.jsx(S,{item:!0,xs:12,children:a.jsxs(z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[a.jsx(qn,{control:n,name:"pictureFile"}),!!h&&a.jsx("img",{src:h.preview,alt:"preview",style:{maxHeight:200}}),!h&&a.jsx("img",{src:e==null?void 0:e.pictureUrl,alt:e==null?void 0:e.name,style:{maxHeight:200}})]})})]}),a.jsxs(z,{display:"flex",justifyContent:"space-between",sx:{mt:3},children:[a.jsx(cr,{variant:"contained",color:"inherit",onClick:r,children:"Cancel"}),a.jsx(xe,{variant:"contained",color:"success",type:"submit",loading:u,children:"Submit"})]})]})]})}function ot(){const{products:e,paginationDetails:r}=lr(),[n,t]=p.useState(!1),[o,i]=p.useState(),[c,u]=p.useState(0),g=ar();function l(m){t(!0),i(m)}async function d(m){try{u(m),await g(kr(m))}catch(P){console.log(P)}finally{u(0)}}function h(){t(!1),i(void 0)}function O(m){g(Rr({pageNumber:m}))}return n?a.jsx(Vn,{product:o,onCancel:h}):a.jsxs(a.Fragment,{children:[a.jsxs(z,{display:"flex",justifyContent:"space-between",children:[a.jsx(Fe,{sx:{p:2},variant:"h4",children:"Inventory"}),a.jsx(cr,{sx:{m:2},size:"large",variant:"contained",onClick:()=>t(!0),children:"Create"})]}),a.jsx(qr,{component:sr,children:a.jsxs(Nr,{sx:{minWidth:650},"aria-label":"simple table",children:[a.jsx(Lr,{children:a.jsxs(qe,{children:[a.jsx(D,{children:"#"}),a.jsx(D,{align:"left",children:"Product"}),a.jsx(D,{align:"right",children:"Price"}),a.jsx(D,{align:"center",children:"Type"}),a.jsx(D,{align:"center",children:"Brand"}),a.jsx(D,{align:"center",children:"Quantity"}),a.jsx(D,{align:"right"})]})}),a.jsx(Vr,{children:e.map(m=>a.jsxs(qe,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[a.jsx(D,{component:"th",scope:"row",children:m.id}),a.jsx(D,{align:"left",children:a.jsxs(z,{display:"flex",alignItems:"center",children:[a.jsx("img",{src:m.pictureUrl,alt:m.name,style:{height:50,marginRight:20}}),a.jsx("span",{children:m.name})]})}),a.jsx(D,{align:"right",children:zr(m.price)}),a.jsx(D,{align:"center",children:m.type}),a.jsx(D,{align:"center",children:m.brand}),a.jsx(D,{align:"center",children:m.quantityInStock}),a.jsxs(D,{align:"right",children:[a.jsx(xe,{startIcon:a.jsx(Yr,{}),onClick:()=>l(m),loading:c===m.id}),a.jsx(xe,{startIcon:a.jsx(Gr,{}),color:"error",onClick:async()=>await d(m.id),loading:c===m.id})]})]},m.id))})]})}),!!r&&a.jsx(z,{sx:{pt:2},children:a.jsx(Mr,{paginationDetails:r,onChange:O})})]})}export{ot as default};
