(this.webpackJsonpkitscon212=this.webpackJsonpkitscon212||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(1),c=n.n(r),i=n(8),a=n.n(i),l=(n(14),n(7)),u=n(2),o=(n(15),n(3)),h=n(9),s=n(16),f="MD5",b="SHA-256",j="SHA-512";function d(t){for(var e=O(t),n=[],r=0;r+1<e.length;r+=2){var c=e[r],i=e[r+1],a=c.substring(0,2),l=c.substring(2,4),u=i.substring(0,2),h=i.substring(2,4);n=[].concat(Object(o.a)(n),[h,u,l,a])}return n}function v(t){for(var e=O(t),n=[],r=0;r+2<e.length;r+=3){var c=e[r].concat(e[r+1],e[r+2]),i=c.substring(0,3),a=c.substring(3,6),l=c.substring(6,9),u=c.substring(9,12);n=[].concat(Object(o.a)(n),[i,a,l,u])}return n}function g(t,e){var n="";if(e===f)n=s(t);else{var r=new h.a(e,"TEXT",{encoding:"UTF8"});r.update(t),n=r.getHash("HEX")}return n}function O(t){return t.split("").map((function(t){return function(t){return parseInt(t,16).toString(2).padStart(4,"0")}(t)}))}function x(t){var e=t.boardHeight,n=t.boardWidth,r=t.input,c=Math.floor(e/2),i=Math.floor(n/2),a=d(r),l=[{x:i,y:c}];return a.forEach((function(t){var r=l[l.length-1].y,c=l[l.length-1].x;l.push(p(c,r,e,n,t))})),l}function p(t,e,n,r,c){var i=c.charAt(0),a=c.charAt(1),l=e,u=t;return"0"===i?l=e+1<n?e+1:e:"1"===i&&(l=e-1>=0?e-1:e),"0"===a?u=t-1>=0?t-1:t:"1"===a&&(u=t+1<r?t+1:t),{x:u,y:l}}function y(t){var e=t.boardHeight,n=t.boardWidth,r=t.input,c=Math.floor(e/2),i=Math.floor(n/2),a=Object(o.a)(v(r)),l=[{x:i,y:c}];return a.forEach((function(t){var r=l[l.length-1].y,c=l[l.length-1].x,i=t.charAt(0),a=t.charAt(1),u="0"===i?2:1,o=t.charAt(2),h="0"===i?1:2;"0"===a?r=r+u<e?r+u:r:"1"===a&&(r=r-u>=0?r-u:r),"0"===o?c=c-h>=0?c-h:c:"1"===o&&(c=c+h<n?c+h:c),l.push({x:c,y:r})})),l}function S(t){var e=t.boardHeight,n=t.boardWidth,r=t.input,c=Math.floor(e/2),i=Math.floor(n/2),a=d(r),l=[{x:i,y:c}];return a.forEach((function(t){var r=l[l.length-1].y,c=l[l.length-1].x;l.push(m(c,r,e,n,t))})),l}function m(t,e,n,r,c){var i=c.charAt(0),a="1"===c.charAt(1)?1:-1,l=e,u=t;return"0"===i&&(l=e+a<n&&e+a>=0?e+a:e),"1"===i&&(u=t+a<r&&t+a>=0?t+a:t),{x:u,y:l}}function R(t){var e=t.boardHeight,n=t.boardWidth,r=t.input,c=Math.floor(e/2),i=Math.floor(n/2),a=v(r),l=[{x:i,y:c}];return a.forEach((function(t){var r=l[l.length-1].y,c=l[l.length-1].x,i=t.charAt(0),a=t.substring(1,3);"0"===i?l.push(m(c,r,e,n,a)):"1"===i&&l.push(p(c,r,e,n,a))})),l}function A(t,e,n){for(var r=Array(t).fill(null).map((function(){return Array(e).fill(0)})),c=n[0].length,i=function(i){n.forEach((function(n){var a=E(n[i],t,e);0===i&&(r[a.y][a.x]=15),i===c-1&&(r[a.y][a.x]=16),r[a.y][a.x]=r[a.y][a.x]<15?r[a.y][a.x]+1:r[a.y][a.x]}))},a=0;a<c;a++)i(a);return r}function E(t,e,n){return{x:t.x,y:e-t.y-1}}var k=n(0),w=[" ",".","o","+","=","*","B","0","X","@","%","&","#","/","^","S","E"],M=function(t){var e=t.height,n=t.width,c=t.paths,i=Object(r.useState)(""),a=Object(u.a)(i,2),l=a[0],h=a[1];return Object(r.useEffect)((function(){if(e>0&&n>0){var t=A(e,n,c),r=["+"].concat(Object(o.a)(Array(n).fill("-")),["+\n"]).join(""),i=t.map((function(t){return["|"].concat(Object(o.a)(t.map((function(t){return w[t]}))),["|\n"])})).flat().join("");h(r.concat(i,r))}}),[c,e,n]),Object(k.jsx)("div",{style:{fontSize:"20px"},children:Object(k.jsx)("pre",{children:l})})};function H(t){var e=t.height,n=t.width,c=t.paths,i=500,a=500,l=Object(r.useRef)(null);Object(r.useEffect)((function(){if(e>0&&n>0){var t=l.current,r=null===t||void 0===t?void 0:t.getContext("2d");if(t&&r){var s=A(e,n,c),f=e>n?490/e:490/n,b=(i-f*n)/2,j=(a-f*e)/2;u(r),o(r,j,b),h(r,s,f,b,j)}}}),[e,n,c]);var u=function(t){t.fillStyle="rgb(256,256,256)",t.fillRect(0,0,i,a),t.beginPath()},o=function(t,e,n){if(t.fillStyle="rgb(255,255,255,0)",t.fillRect(0,0,i,e),t.fillRect(0,a-e,i,e),t.fillRect(0,0,n,a),t.fillRect(i-n,0,n,a),t.fillStyle="rgb(0,0,0)",e>0){var r=i-2*n+10;t.fillRect(n-5,e-5,r,5),t.fillRect(n-5,a-e,r,5)}if(n>0){var c=a-2*e+10;t.fillRect(n-5,e-5,5,c),t.fillRect(i-n,e-5,5,c)}},h=function(t,e,n,r,c){for(var i=function(t){for(var e=-1,n=-1,r=0;r<t.length;r++)for(var c=0;c<t[r].length;c++){var i=t[r][c];0!==i&&15!==i&&16!==i&&((-1===e||i<e)&&(e=i),(-1===n||i>n)&&(n=i))}return{lowestValue:e,highestValue:n}}(e),a=i.highestValue,l=360*Math.random(),u=60/a,o=0;o<e.length;o++)for(var h=0;h<e[o].length;h++){if(0!==e[o][h]){var s=80-u*e[o][h];t.fillStyle="hsl(".concat(l,", 50%, ").concat(s,"%)"),t.fillRect(r+h*n,c+o*n,n,n)}15===e[o][h]&&(t.fillStyle="hsl(".concat(l,", 50%, 80%)"),t.fillRect(r+h*n,c+o*n,n,n)),16===e[o][h]&&(t.fillStyle="hsl(".concat(l,", 50%, 10%)"),t.fillRect(r+h*n,c+o*n,n,n))}};return Object(k.jsxs)("div",{children:[Object(k.jsx)("canvas",{ref:l,width:i,height:a}),Object(k.jsx)("div",{children:Object(k.jsx)("button",{onClick:function(){return function(){if(l&&l.current){var t=l.current.toDataURL("image/png");window.open(t,"_blank")}}()},children:"Save image"})})]})}var C="bishop",W="rook",B="knight",I="king";var N=function(){var t=Object(r.useState)(9),e=Object(u.a)(t,2),n=e[0],c=e[1],i=Object(r.useState)(17),a=Object(u.a)(i,2),o=a[0],h=a[1],s=Object(r.useState)("kitscon"),d=Object(u.a)(s,2),v=d[0],O=d[1],p=Object(r.useState)(C),m=Object(u.a)(p,2),A=m[0],E=m[1],w=Object(r.useState)(f),N=Object(u.a)(w,2),T=N[0],V=N[1],X=Object(r.useState)((function(){return x})),D=Object(u.a)(X,2),J=D[0],K=D[1],U=Object(r.useState)({height:n,width:o,paths:[[]]}),z=Object(u.a)(U,2),F=z[0],L=z[1];return Object(r.useEffect)((function(){A===C?K((function(){return x})):A===W?K((function(){return S})):A===B?K((function(){return y})):A===I&&K((function(){return R}))}),[A]),Object(r.useEffect)((function(){var t=J({boardHeight:n,boardWidth:o,input:g(v,T)});L({height:n,width:o,paths:[t]})}),[n,o,v,T,J]),Object(k.jsxs)("div",{className:"App",children:[Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{children:"Input to be hashed"}),Object(k.jsx)("input",{value:v,onChange:function(t){return O(t.target.value)}})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{children:"Select walk algorithm"}),Object(k.jsxs)("select",{value:A,onChange:function(t){return E(t.target.value)},children:[Object(k.jsx)("option",{value:C,children:"Bishop"}),Object(k.jsx)("option",{value:B,children:"Knight"}),Object(k.jsx)("option",{value:W,children:"Rook"}),Object(k.jsx)("option",{value:I,children:"King"})]})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{children:"Select hashing algorithm"}),Object(k.jsxs)("select",{value:T,onChange:function(t){return V(t.target.value)},children:[Object(k.jsx)("option",{value:f,children:f}),Object(k.jsx)("option",{value:b,children:b}),Object(k.jsx)("option",{value:j,children:j})]})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{children:"Height"}),Object(k.jsx)("input",{type:"number",value:n,min:1,onChange:function(t){return c(Number(t.target.value))}})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{children:"Width"}),Object(k.jsx)("input",{type:"number",value:o,min:1,onChange:function(t){return h(Number(t.target.value))}})]}),Object(k.jsx)(M,Object(l.a)({},F)),Object(k.jsx)(H,Object(l.a)({},F))]})};a.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsx)(N,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.e34d8e27.chunk.js.map