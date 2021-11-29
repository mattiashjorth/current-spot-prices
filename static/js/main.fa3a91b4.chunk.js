(this["webpackJsonpcurrent-spot-prices"]=this["webpackJsonpcurrent-spot-prices"]||[]).push([[0],{202:function(t,e,r){},347:function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n),c=r(77),i=r.n(c),s=(r(202),r(188)),o=r(21),u=r(16),l=r(370),j=r(371),d=r(372),h=r(373),b=r(374),p=r(369),m=r(375),x=r(3);function f(t){var e=t.data;return Object(x.jsx)("div",{className:"spotprice-list",children:Object(x.jsx)(l.a,{component:j.a,children:Object(x.jsxs)(d.a,{sx:{minWidth:400},size:"small","aria-label":"Spotpriser",children:[Object(x.jsx)(h.a,{children:Object(x.jsxs)(b.a,{children:[Object(x.jsx)(p.a,{align:"right",children:"Datum"}),Object(x.jsx)(p.a,{align:"right",children:"Klockslag"}),Object(x.jsx)(p.a,{align:"right",children:"Spotpris"})]})}),Object(x.jsx)(m.a,{children:e.map((function(t){return Object(x.jsxs)(b.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(x.jsx)(p.a,{align:"right",children:t.timeStampDay}),Object(x.jsx)(p.a,{align:"right",children:t.timeStampHour}),Object(x.jsxs)(p.a,{align:"right",children:[t.value," ",t.unit]})]},t.timeStamp)}))})]})})})}var O=r(41),v=r(361),S=r(362),g=r(191),y=r(366),k=r(186),D=r(187),w=r(178),E=r(88);var A=function(){var t=Object(n.useState)({width:0,height:0}),e=Object(u.a)(t,2),r=e[0],a=e[1];return Object(n.useEffect)((function(){function t(){a({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",t),t(),function(){return window.removeEventListener("resize",t)}}),[]),r};function H(t){var e=t.data,r=t.currentHour,n=a.a.useState(0),c=Object(u.a)(n,2),i=c[0],s=c[1],o=a.a.useState(),l=Object(u.a)(o,2),j=l[0],d=l[1],h="kr/kWh",b=A();function p(t){var e=t.x,r=t.y,n=t.value;return t.index===j?Object(x.jsxs)("text",{x:e,y:r,dy:-30,dx:11,fill:"#DDD",fontWeight:"bold",fontSize:16,textAnchor:"middle",children:[n.toFixed(2)," ",h]}):null}function m(t){var e=t.x,r=t.y,n=t.payload;return Object(x.jsx)("g",{transform:"translate(".concat(e,",").concat(r,")"),children:Object(x.jsx)("text",{x:0,y:0,dy:16,textAnchor:"end",fill:"#DDD",transform:"rotate(-35)",children:n.value})})}function f(t){var e=t.x,r=t.y,n=t.payload;return Object(x.jsx)("g",{transform:"translate(".concat(e,",").concat(r,")"),children:Object(x.jsxs)("text",{x:0,y:0,dy:0,textAnchor:"end",fill:"#DDD",transform:"rotate(-35)",children:[n.value," ",h]})})}a.a.useEffect((function(){s(function(){var t=Math.max.apply(Math,Object(O.a)(e.map((function(t){return t.value}))).concat([0]));return Math.floor(t)+1}())}),[e]),a.a.useEffect((function(){d(e.findIndex((function(t){return t.timeStamp===r.timeStampShort})))}),[r.timeStampShort,e]);var H=function(t){var e=t.active,r=t.payload,n=t.label;return e&&r&&r.length?Object(x.jsxs)("div",{style:{background:"#8884d8",color:"#2e4355",padding:"1px 15px",border:"solid",borderRadius:"15px",fontWeight:"bold",opacity:"0.8"},children:[Object(x.jsx)("p",{children:n}),Object(x.jsxs)("p",{children:[r[0].value.toFixed(2)," ",h]})]}):null};return Object(x.jsx)(v.a,{width:"100%",aspect:1.2,maxHeight:b.height-100,children:Object(x.jsxs)(S.a,{data:e,margin:{top:20,right:50,left:20,bottom:70},children:[Object(x.jsx)(g.a,{type:"monotone",dataKey:"value",stroke:"#8884d8",label:Object(x.jsx)(p,{}),activeDot:{fill:"#2e4355",stroke:"#8884d8",strokeWidth:4,r:9},dot:"",strokeWidth:"4"}),Object(x.jsx)(y.a,{horizontal:"",vertical:"",stroke:"#243240"}),Object(x.jsx)(k.a,{dataKey:"timeStamp",tick:Object(x.jsx)(m,{}),ticks:e.map((function(t){return t.timeStamp})).filter((function(t,e,r){return e%6===0&&0!==e}))}),Object(x.jsx)(D.a,{domain:[0,i],tick:Object(x.jsx)(f,{}),ticks:function(){var t=Object(O.a)(Array(i+1).keys());return t.shift(),t}()}),Object(x.jsx)(w.a,{x:null===r||void 0===r?void 0:r.timeStampShort,stroke:"orange",strokeWidth:"0.5"}),Object(x.jsx)(E.a,{cursor:!1,offset:-100,content:Object(x.jsx)(H,{})})]})})}function N(t){var e,r,a=Object(n.useState)(null),c=Object(u.a)(a,2),i=c[0],s=c[1],o=Object(n.useState)(!1),l=Object(u.a)(o,2),j=l[0],d=l[1],h=Object(n.useState)([]),b=Object(u.a)(h,2),p=b[0],m=b[1],O=Object(n.useState)([]),v=Object(u.a)(O,2),S=v[0],g=v[1],y=Object(n.useState)(9e5),k=Object(u.a)(y,2),D=k[0],w=k[1],E=Object(n.useState)(),A=Object(u.a)(E,2),N=A[0],W=A[1],I=t.match.params.priceArea.toUpperCase();function z(){var t=(new Date).toLocaleString("sv-SE").substring(0,14)+"00:00";return{timeStampFull:t.replace(" ","T"),timeStampShort:t.substring(0,16),day:t.substring(0,10),hour:t.substring(11,16)}}return Object(n.useEffect)((function(){if(!["SN1","SN2","SN3","SN4"].includes(I.toUpperCase()))return d(!0),void s("Not supported price area");var t=function(){fetch(e()).then((function(t){return t.json()})).then((function(t){d(!0),s(null),function(t){var e=t.slice(-48).map((function(t){return{timeStamp:t.TimeStamp,timeStampDay:t.TimeStampDay,timeStampHour:t.TimeStampHour,value:t.Value,unit:t.Unit}}));m(e);var r=e.map((function(t){return{timeStamp:t.timeStampDay+" "+t.timeStampHour,value:Math.round(t.value,0)/100}}));g(r)}(t),w(9e5)}),(function(t){d(!0),s(t),w(15e3)}))},e=function(){var t=r().toLocaleString("sv-SE").split(" ")[0];return"https://jsonp.afeld.me/?url=https://www.vattenfall.se/api/price/spot/pricearea/".concat(t,"/2050-01-01/").concat(I)},r=function(){var t=new Date;return t.setDate(t.getDate()-1),t};t();var n=setInterval((function(){return t()}),D);return function(){return clearInterval(n)}}),[D,t,I]),Object(n.useEffect)((function(){W(z());var t=setInterval((function(){return W(z())}),6e4);return function(){return clearInterval(t)}}),[]),i?Object(x.jsxs)("div",{className:"error-div",children:["Error: ",null!==(e=i.message)&&void 0!==e?e:i]}):j?("/table/:priceArea"===t.match.path?r=Object(x.jsx)(f,{data:p}):"/graph/:priceArea"===t.match.path&&(r=Object(x.jsx)(H,{data:S,currentHour:N})),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("h2",{children:["Aktuella spotpriser ",I]}),r]})):Object(x.jsx)("div",{children:"Loading..."})}var W=function(){return Object(x.jsx)(s.a,{basename:"/current-spot-prices",children:Object(x.jsxs)(o.d,{children:[Object(x.jsx)(o.b,{path:"/table/:priceArea",component:N}),Object(x.jsx)(o.b,{path:"/graph/:priceArea",component:N}),Object(x.jsx)(o.b,{exact:!0,path:"/",children:Object(x.jsx)(o.a,{to:"/graph/sn3"})}),Object(x.jsx)(o.b,{path:"/",children:Object(x.jsx)("div",{className:"error-div",children:"Page not found"})})]})})};i.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(W,{})}),document.getElementById("root"))}},[[347,1,2]]]);
//# sourceMappingURL=main.fa3a91b4.chunk.js.map