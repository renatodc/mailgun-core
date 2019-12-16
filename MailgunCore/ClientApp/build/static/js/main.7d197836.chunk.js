(this.webpackJsonpmailguncore=this.webpackJsonpmailguncore||[]).push([[0],{54:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(81),o=n(82),a=n(83);t.reducers={mailbox:a.reducer,counter:o.reducer,weatherForecasts:r.reducer}},56:function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(29),i=n(8),c=n(87),s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={columns:[{name:"sender",title:"From"},{name:"mailDate",title:"Date"}],defaultColumnWidths:[{columnName:"sender",width:240},{columnName:"mailDate",width:110}],selection:[],sorting:[{columnName:"mailDate",direction:"desc"}]},t.changeSorting=function(e){t.setState({sorting:e})},t.changeSelection=function(e){t.setState({selection:e})},t}return r(t,e),t.prototype.render=function(){return o.createElement(o.Fragment,null,o.createElement(c.Grid,{rows:this.props.mailbox,columns:this.state.columns},o.createElement(i.SortingState,{defaultSorting:[{columnName:"mailDate",direction:"desc"}]}),o.createElement(i.IntegratedSorting,null),o.createElement(c.Table,null),o.createElement(c.TableHeaderRow,{showSortingControls:!0})))},t}(o.Component);t.default=a.connect((function(e){return e.mailbox}))(s)},71:function(e,t,n){e.exports=n(88)},81:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.actionCreators={requestWeatherForecasts:function(e){return function(t,n){var r=n();r&&r.weatherForecasts&&e!==r.weatherForecasts.startDateIndex&&(fetch("weatherforecast").then((function(e){return e.json()})).then((function(n){t({type:"RECEIVE_WEATHER_FORECASTS",startDateIndex:e,forecasts:n})})),t({type:"REQUEST_WEATHER_FORECASTS",startDateIndex:e}))}}};var r={forecasts:[],isLoading:!1};t.reducer=function(e,t){if(void 0===e)return r;var n=t;switch(n.type){case"REQUEST_WEATHER_FORECASTS":return{startDateIndex:n.startDateIndex,forecasts:e.forecasts,isLoading:!0};case"RECEIVE_WEATHER_FORECASTS":if(n.startDateIndex===e.startDateIndex)return{startDateIndex:n.startDateIndex,forecasts:n.forecasts,isLoading:!1}}return e}},82:function(e,t,n){"use strict";n.r(t),n.d(t,"actionCreators",(function(){return r})),n.d(t,"reducer",(function(){return o}));var r={increment:function(){return{type:"INCREMENT_COUNT"}},decrement:function(){return{type:"DECREMENT_COUNT"}}},o=function(e,t){if(void 0===e)return{count:0};switch(t.type){case"INCREMENT_COUNT":return{count:e.count+1};case"DECREMENT_COUNT":return{count:e.count-1};default:return e}}},83:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={mailbox:[{id:1,sender:"steve@cratemail.org",recipient:"jane@cratemail.org",mailSubject:"First meeting for Cratemail group",bodyHtml:"thanks for the update",mailDate:"06/06/18 10:15am"},{id:2,sender:"bill@cratemail.org",recipient:"carl@cratemail.org",mailSubject:"First meeting for Cratemail group",bodyHtml:"will forward the info",mailDate:"06/06/18 11:15pm"},{id:3,sender:"jane@cratemail.org",recipient:"admin@cratemail.org",mailSubject:"Second Meeting for Cratemail group",bodyHtml:"need more details",mailDate:"06/07/18 6:55pm"},{id:4,sender:"steve@cratemail.org",recipient:"admin@cratemail.org",mailSubject:"RE: First for Cratemail group",bodyHtml:"please review when you get a chance",mailDate:"06/07/18 8:30pm"},{id:5,sender:"admin@cratemail.org",recipient:"steve@cratemail.org",mailSubject:"RE: First Meeting for Cratemail group",bodyHtml:"appreciate the suggestion",mailDate:"06/09/18 5:15am"}]};t.reducer=function(e,t){return void 0===e&&(e=r),e}},85:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);n(72);var r=n(0),o=n(12),a=n(29),i=n(37),c=n(19),s=n(52),u=n(28),l=n(53),d=n(49),f=n(54);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}n(85);var p=n(56),g=n.n(p),E=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var v=document.getElementsByTagName("base")[0].getAttribute("href"),b=Object(c.a)({basename:v}),w=function(e,t){var n=[l.a,Object(d.a)(e)],r=Object(u.c)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},f.reducers,{router:Object(i.b)(e)})),o=[],a="undefined"===typeof window?null:window;return a&&a.__REDUX_DEVTOOLS_EXTENSION__&&o.push(a.__REDUX_DEVTOOLS_EXTENSION__()),Object(u.e)(r,t,u.d.apply(void 0,[u.a.apply(void 0,n)].concat(o)))}(b);o.render(r.createElement(a.Provider,{store:w},r.createElement(i.a,{history:b},r.createElement((function(){return r.createElement(g.a,null)}),null))),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");E?function(e){fetch(e).then((function(t){var n=t.headers.get("content-type");404===t.status||n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):h(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):h(e)}))}}()}},[[71,1,2]]]);
//# sourceMappingURL=main.7d197836.chunk.js.map