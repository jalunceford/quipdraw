(this.webpackJsonphome=this.webpackJsonphome||[]).push([[0],{102:function(e,t){},116:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(58),r=a.n(o),i=(a(67),a(13)),s=a(14),u=a(16),l=a(15),d=(a(68),a(12)),m=a(3),f=(a(18),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).renderCreate=function(){e.setState({create:!0})},e.renderJoin=function(){e.setState({join:!0})},e.state={create:!1,join:!1},e}return Object(s.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"vert"},c.a.createElement("div",{className:"center"},c.a.createElement("h1",{className:"header1"},"Quipdraw (Jackbox Games please buy us)")),c.a.createElement("div",{className:"center"},c.a.createElement("button",{onClick:this.renderCreate},"Create Room"),this.state.create?c.a.createElement(m.a,{to:"/create"}):null,c.a.createElement("button",{onClick:this.renderJoin},"Join Room"),this.state.join?c.a.createElement(m.a,{to:"/join"}):null)))}}]),a}(c.a.Component)),h=a(60),p=a.n(h)()("http://localhost:4001"),b=a(41);b.initializeApp({apiKey:"AIzaSyCR-CT3Waz5YjcbUczlG3OrzA4Co5Y-xvw",authDomain:"quiplash-drawing-game.firebaseapp.com",databaseURL:"https://quiplash-drawing-game.firebaseio.com",projectId:"quiplash-drawing-game",storageBucket:"quiplash-drawing-game.appspot.com",messagingSenderId:"901366300288",appId:"1:901366300288:web:40d455c6c9b28af2997065",measurementId:"G-SVLHT6Y2WS"});var v=b,E=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).makeId=function(){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZ".length,n=0;n<4;n++)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random()*a));e.setState({code:t})},e.createGroup=function(){if(p.emit("getWords","getWords"),e.state.hasGottenWords){var t=v.firestore();t.collection("rooms").add({code:e.state.code,words:e.state.words}).then((function(){t.collection("rooms").where("code","==",e.state.code).get().then((function(t){t.docs.forEach((function(t){t.ref.collection("players").add({name:e.state.name,score:0}).then((function(){p.emit("createGroup",e.state.code)}))}))}))}))}},e.updateName=function(t){e.setState({name:t.target.value})},e.state={code:"",name:"",hasCreated:!1,words:[],hasGottenWords:!1},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.makeId(),p.on("hasCreatedGroup",(function(){e.setState({hasCreated:!0})})),p.on("hasGottenWords",(function(t){e.setState({words:t}),e.setState({hasGottenWords:!0})}))}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"vert"},c.a.createElement("div",{className:"center"},c.a.createElement("label",{for:"code",id:"l1"},"Room Code:"),c.a.createElement("input",{type:"text",id:"code",value:this.state.code,readonly:!0})),c.a.createElement("div",{className:"center"},c.a.createElement("label",{for:"name",id:"l2"},"Name"),c.a.createElement("input",{type:"text",id:"name",onChange:this.updateName})),c.a.createElement("div",{className:"center"},c.a.createElement("button",{id:"Done1",onClick:this.createGroup},"Done")),this.state.hasCreated&&this.state.hasGottenWords?c.a.createElement(m.a,{to:{pathname:"/room",state:{code:this.state.code,name:this.state.name,hasCreated:this.state.hasCreated}}}):null))}}]),a}(c.a.Component),j=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).joinGroup=function(){var t=v.firestore().collection("rooms").where("code","==",e.state.code);t.get().then((function(a){a.empty?alert("no group with that code exists!"):t.get().then((function(t){t.docs.forEach((function(t){t.ref.collection("players").add({name:e.state.name,score:0}).then((function(){p.emit("joinGroup",e.state.code)}))}))}))}))},e.updateName=function(t){e.setState({name:t.target.value})},e.updateCode=function(t){e.setState({code:t.target.value})},e.state={code:"",name:"",hasJoined:!1},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.on("joinCompleted",(function(){e.setState({hasJoined:!0})}))}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"vert"},c.a.createElement("div",{className:"center"},c.a.createElement("label",{for:"code",id:"l1"},"Room Code:"),c.a.createElement("input",{type:"text",id:"code",onChange:this.updateCode})),c.a.createElement("div",{className:"center"},c.a.createElement("label",{for:"name",id:"l2"},"Name"),c.a.createElement("input",{type:"text",id:"name",onChange:this.updateName})),c.a.createElement("div",{className:"center"},c.a.createElement("button",{id:"Done2",onClick:this.joinGroup},"Done"))),this.state.hasJoined?c.a.createElement(m.a,{to:{pathname:"/room",state:{code:this.state.code,name:this.state.name,hasCreated:!1}}}):null)}}]),a}(c.a.Component),O=a(61),g=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).createGame=function(){var e=v.firestore();e.collection("rooms").where("code","==",n.state.code).get().then((function(t){t.docs.forEach((function(t){for(var a=[],c=0;c<t.data().words.length;c++)a.push({round:c+1,word:t.data().words[c]});var o=e.batch();a.forEach((function(e){var a=t.ref.collection("rounds").doc();o.set(a,e)})),o.commit().then((function(){p.emit("play",n.state.code)}))}))}))},n.state={code:n.props.location.state.code,name:n.props.location.state.name,players:[],groupSize:0,hasReceivedGroupSize:!1,readyToRedirectToGame:!1},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.firestore().collection("rooms").where("code","==",this.state.code).get().then((function(t){t.docs.forEach((function(t){t.ref.collection("players").onSnapshot((function(t){t.docs.forEach((function(t){e.state.players.includes(t.data().name)||e.setState((function(e){return{players:[].concat(Object(O.a)(e.players),[t.data().name])}}))}))}))}))})),p.on("play",(function(t){e.setState({groupSize:t}),e.setState({hasReceivedGroupSize:!0}),e.setState({readyToRedirectToGame:!0})}))}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"center"},c.a.createElement("label",{for:"playersList",id:"label"},"Players who have joined the room:")),c.a.createElement("div",{className:"center"},c.a.createElement("ul",{id:"playersList"},this.state.players.map((function(e,t){return c.a.createElement("li",{key:t},e)})))),c.a.createElement("div",{className:"center"},c.a.createElement("button",{type:"button",id:"play",onClick:this.createGame},"Play")),this.state.readyToRedirectToGame&&this.state.hasReceivedGroupSize?c.a.createElement(m.a,{to:{pathname:"/game",state:{code:this.state.code,name:this.state.name,groupSize:this.state.groupSize,round:1}}}):null)}}]),a}(c.a.Component),S=a(8),w=a.n(S),y=a(17),C=a(2);var N=function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(null),o=Object(n.useState)(!1),r=Object(C.a)(o,2),i=r[0],s=r[1],u=Object(n.useState)(20),l=Object(C.a)(u,2),d=l[0],f=l[1],h=Object(n.useState)(e.location.state.code),b=Object(C.a)(h,2),E=b[0],j=(b[1],Object(n.useState)(e.location.state.name)),O=Object(C.a)(j,2),g=O[0],S=(O[1],Object(n.useState)(e.location.state.round)),N=Object(C.a)(S,2),x=N[0],k=(N[1],Object(n.useState)(!1)),G=Object(C.a)(k,2),R=G[0],z=G[1],W=Object(n.useState)(e.location.state.groupSize),I=Object(C.a)(W,2),D=I[0],M=(I[1],Object(n.useState)()),T=Object(C.a)(M,2),J=T[0],L=T[1];Object(n.useEffect)((function(){console.log(D);var e=0;p.on("picture",(function(){console.log("picture came in"),++e==D&&z(!0)}));var n=t.current;n.width=2*window.innerWidth,n.height=2*window.innerHeight,n.style.width="".concat(window.innerWidth,"px"),n.style.height="".concat(window.innerHeight,"px");var c=n.getContext("2d");c.scale(2,2),c.lineCap="round",c.strokeStyle="black",c.lineWidth=5,a.current=c,function(){var e=Object(y.a)(w.a.mark((function e(){var a,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:a=20,n=setInterval((function(){if(f((function(e){return e-1})),0==(a-=1)){clearInterval(n);var e=t.current.toDataURL();v.firestore().collection("rooms").where("code","==",E).get().then((function(t){t.docs.forEach((function(t){t.ref.collection("rounds").where("round","==",x).get().then((function(t){t.docs.forEach((function(t){t.ref.collection("pictures").add({artist:g,dataURL:e,votes:0}).then((function(){p.emit("picture",E)}))}))}))}))}))}}),1e3);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]);var U=function(){var e=Object(y.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v.firestore().collection("rooms").where("code","==",E).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",x).get().then((function(e){e.docs.forEach((function(e){L(e.data().word)}))}))}))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",null,c.a.createElement("div",{className:"center"},c.a.createElement("h1",{className:"header2"},d),c.a.createElement("h1",{className:"header2"},J),c.a.createElement("button",{onClick:function(){a.current.clearRect(0,0,t.current.width,t.current.height)}},"Clear")),c.a.createElement("canvas",{onMouseDown:function(e){var t=e.nativeEvent,n=t.offsetX,c=t.offsetY;a.current.beginPath(),a.current.moveTo(n,c),s(!0)},onMouseUp:function(){a.current.closePath(),s(!1)},onMouseMove:function(e){var t=e.nativeEvent;if(i){var n=t.offsetX,c=t.offsetY;a.current.lineTo(n,c),a.current.stroke()}},ref:t}),R?c.a.createElement(m.a,{to:{pathname:"/vote",state:{code:E,name:g,round:x,groupSize:D}}}):null)};var x=function(e){var t=Object(n.useState)(e.location.state.code),a=Object(C.a)(t,2),o=a[0],r=(a[1],Object(n.useState)(e.location.state.name)),i=Object(C.a)(r,2),s=i[0],u=(i[1],Object(n.useState)([])),l=Object(C.a)(u,2),d=l[0],f=l[1],h=Object(n.useState)(e.location.state.round),b=Object(C.a)(h,2),E=b[0],j=(b[1],Object(n.useState)(!1)),O=Object(C.a)(j,2),g=O[0],S=O[1],N=Object(n.useState)(e.location.state.groupSize),x=Object(C.a)(N,2),k=x[0],G=(x[1],Object(n.useState)()),R=Object(C.a)(G,2),z=R[0],W=R[1],I=Object(n.useRef)(null),D=Object(n.useState)(20),M=Object(C.a)(D,2),T=M[0],J=M[1],L=Object(n.useState)(),U=Object(C.a)(L,2),Y=U[0],A=U[1],P=Object(n.useState)(),B=Object(C.a)(P,2),H=(B[0],B[1]),V=Object(n.useState)(!1),q=Object(C.a)(V,2),F=q[0],X=q[1],K=Object(n.useState)(!1),Q=Object(C.a)(K,2),Z=Q[0],$=Q[1];Object(n.useEffect)((function(){X(!0);var e=0;p.on("vote",(function(){++e==k&&S(!0)}));var t=v.firestore();(function(){var e=Object(y.a)(w.a.mark((function e(){var a,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee();case 2:return e.next=4,t.collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",E).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("pictures").get().then((function(e){e.docs.forEach((function(e){f((function(t){return t.concat({picture:e.data().dataURL,artist:e.data().artist})}))}))}))}))}))}))}));case 4:a=20,n=setInterval((function(){a-=1,J((function(e){return e-1})),0==a&&(clearInterval(n),S(!0))}),1e3);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var _=function(){var e=Object(y.a)(w.a.mark((function e(){var t,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return X(!1),$(!0),t=d[z.vote].artist,a=v.firestore(),e.next=6,a.collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",E).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("pictures").where("artist","==",t).get().then((function(e){e.docs.forEach((function(e){console.log("vote about to be counted for "+e.data().artist),H(e.data().artist),e.ref.update({votes:v.firestore.FieldValue.increment(1)})}))}))}))}))}))}));case 6:a.collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("players").where("name","==",t).get().then((function(e){e.docs.forEach((function(e){console.log("total vote added to "+t),e.ref.update({score:v.firestore.FieldValue.increment(1)}).then((function(){p.emit("vote",o)}))}))}))}))}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(y.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v.firestore().collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",E).get().then((function(e){e.docs.forEach((function(e){A(e.data().word)}))}))}))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",null,c.a.createElement("div",{className:"center"},c.a.createElement("h1",{className:"header1"},T),c.a.createElement("h1",{className:"header1"},Y)),c.a.createElement("div",{className:"center"},d.map((function(e,t){return c.a.createElement("div",null,c.a.createElement("a",{href:e.picture,download:!0},t))}))),c.a.createElement("div",{className:"center"},F?c.a.createElement("input",{type:"text",id:"vote",onChange:function(e){W({vote:e.target.value})},ref:I}):null,F?c.a.createElement("button",{id:"done",onClick:_},"Done"):null,Z?c.a.createElement("h2",{className:"header3"},"Waiting for other players to submit their votes..."):null),g?c.a.createElement(m.a,{to:{pathname:"/result",state:{code:o,name:s,groupSize:k,round:E}}}):null)};var k=function(e){var t=Object(n.useState)(e.location.state.code),a=Object(C.a)(t,2),o=a[0],r=(a[1],Object(n.useState)(e.location.state.name)),i=Object(C.a)(r,2),s=i[0],u=(i[1],Object(n.useState)()),l=Object(C.a)(u,2),d=l[0],f=l[1],h=Object(n.useState)(),b=Object(C.a)(h,2),E=b[0],j=b[1],O=Object(n.useState)(e.location.state.round),g=Object(C.a)(O,2),S=g[0],N=(g[1],Object(n.useState)(!1)),x=Object(C.a)(N,2),k=x[0],G=x[1],R=Object(n.useState)(!1),z=Object(C.a)(R,2),W=z[0],I=z[1],D=Object(n.useState)(e.location.state.groupSize),M=Object(C.a)(D,2),T=M[0],J=(M[1],Object(n.useState)()),L=Object(C.a)(J,2),U=L[0],Y=L[1];return Object(n.useEffect)((function(){(function(){var e=Object(y.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v.firestore(),e.next=3,t.collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",S).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("pictures").orderBy("votes","desc").limit(1).get().then((function(e){e.docs.forEach((function(e){f(e.data().dataURL),j(e.data().artist)}))}))}))}))}))}));case 3:return e.next=5,t.collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("rounds").where("round","==",S).get().then((function(e){e.docs.forEach((function(e){Y(e.data().word)}))}))}))}));case 5:p.on("nextRound",(function(){G(!0)})),p.on("finalScore",(function(){I(!0)}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),c.a.createElement("div",null,c.a.createElement("div",{className:"center"},c.a.createElement("h1",{className:"header2"},U),c.a.createElement("h1",{className:"header4"},E," wins round ",S,"!"),c.a.createElement("button",{onClick:function(){S+1<=5?p.emit("nextRound",o):p.emit("finalScore",o)}},"Next Round")),c.a.createElement("img",{src:d,id:d}),k?c.a.createElement(m.a,{to:{pathname:"/game",state:{code:o,name:s,groupSize:T,round:S+1}}}):null,W?c.a.createElement(m.a,{to:{pathname:"/final",state:{code:o,name:s,groupSize:T,round:S+1}}}):null)};var G=function(e){var t=Object(n.useState)(e.location.state.code),a=Object(C.a)(t,2),o=a[0],r=(a[1],Object(n.useState)(e.location.state.name)),i=Object(C.a)(r,2),s=(i[0],i[1],Object(n.useState)([])),u=Object(C.a)(s,2),l=u[0],d=u[1],m=Object(n.useState)(),f=Object(C.a)(m,2),h=f[0],p=f[1],b=Object(n.useState)(-1),E=Object(C.a)(b,2),j=E[0],O=E[1];return Object(n.useEffect)((function(){v.firestore().collection("rooms").where("code","==",o).get().then((function(e){e.docs.forEach((function(e){e.ref.collection("players").get().then((function(e){e.docs.forEach((function(e){d((function(t){return t.concat({name:e.data().name,score:e.data().score})})),e.data().score>j&&(O(e.data().score),p(e.data().name))}))}))}))}))}),[]),c.a.createElement("div",null,c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"player"),c.a.createElement("th",null,"total votes"))),c.a.createElement("tbody",null,l.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null,e.score))})))),c.a.createElement("h1",null,h," wins with a score of ",j," total votes!"))},R=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return c.a.createElement(d.a,null,c.a.createElement(m.d,null,c.a.createElement(m.b,{exact:!0,path:"/",component:f}),c.a.createElement(m.b,{exact:!0,path:"/create",component:E}),c.a.createElement(m.b,{exact:!0,path:"/join",component:j}),c.a.createElement(m.b,{exact:!0,path:"/room",component:g}),c.a.createElement(m.b,{exact:!0,path:"/game",component:N}),c.a.createElement(m.b,{exact:!0,path:"/vote",component:x}),c.a.createElement(m.b,{exact:!0,path:"/result",component:k}),c.a.createElement(m.b,{exact:!0,path:"/final",component:G})))}}]),a}(c.a.Component);r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(R,null)),document.getElementById("root"))},18:function(e,t,a){},62:function(e,t,a){e.exports=a(116)},67:function(e,t,a){},68:function(e,t,a){}},[[62,1,2]]]);
//# sourceMappingURL=main.237fb3eb.chunk.js.map