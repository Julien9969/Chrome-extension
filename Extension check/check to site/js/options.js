(()=>{"use strict";var e,t,r,o={88169:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const a=n(r(67294));(0,r(20745).createRoot)(document.getElementById("root")).render(a.default.createElement(a.default.StrictMode,null,a.default.createElement((()=>{const[e,t]=(0,a.useState)(""),[r,o]=(0,a.useState)(""),[l,n]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{chrome.storage.sync.get({favoriteColor:"red",likesColor:!0},(e=>{t(e.favoriteColor),n(e.likesColor)}))}),[]),a.default.createElement(a.default.Fragment,null,a.default.createElement("div",null,"Favorite color: ",a.default.createElement("select",{value:e,onChange:e=>t(e.target.value)},a.default.createElement("option",{value:"red"},"red"),a.default.createElement("option",{value:"green"},"green"),a.default.createElement("option",{value:"blue"},"blue"),a.default.createElement("option",{value:"yellow"},"yellow"))),a.default.createElement("div",null,a.default.createElement("label",null,a.default.createElement("input",{type:"checkbox",checked:l,onChange:e=>n(e.target.checked)}),"I like colors.")),a.default.createElement("div",null,r),a.default.createElement("button",{onClick:()=>{chrome.storage.sync.set({favoriteColor:e,likesColor:l},(()=>{o("Options saved.");const e=setTimeout((()=>{o("")}),1e3);return()=>clearTimeout(e)}))}},"Save"))}),null)))}},l={};function n(e){var t=l[e];if(void 0!==t)return t.exports;var r=l[e]={exports:{}};return o[e].call(r.exports,r,r.exports,n),r.exports}n.m=o,e=[],n.O=(t,r,o,l)=>{if(!r){var a=1/0;for(f=0;f<e.length;f++){for(var[r,o,l]=e[f],u=!0,c=0;c<r.length;c++)(!1&l||a>=l)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(u=!1,l<a&&(a=l));if(u){e.splice(f--,1);var i=o();void 0!==i&&(t=i)}}return t}l=l||0;for(var f=e.length;f>0&&e[f-1][2]>l;f--)e[f]=e[f-1];e[f]=[r,o,l]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,n.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var l=Object.create(null);n.r(l);var a={};t=t||[null,r({}),r([]),r(r)];for(var u=2&o&&e;"object"==typeof u&&!~t.indexOf(u);u=r(u))Object.getOwnPropertyNames(u).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,n.d(l,a),l},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=798,(()=>{var e={798:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,l,[a,u,c]=r,i=0;if(a.some((t=>0!==e[t]))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var f=c(n)}for(t&&t(r);i<a.length;i++)l=a[i],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(f)},r=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0;var a=n.O(void 0,[736],(()=>n(88169)));a=n.O(a)})();