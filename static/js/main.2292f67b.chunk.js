(this.webpackJsonpprism=this.webpackJsonpprism||[]).push([[0],{14:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var r=t(1),i=t.n(r),o=t(7),a=t.n(o),s=t(2),c=t(8),d=t(3),u=t(4),h=t(0),p=(t(14),function(e,n){return Math.floor(Math.random()*(n+1-e))+e}),f=function(){var e=p(50,200),n=p(50,200),t=p(50,200);return new h.b("rgb(".concat(e,", ").concat(n,", ").concat(t,")"))},w=function(e){Object(u.a)(t,e);var n=Object(d.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=n.call(this,e)).ref=i.a.createRef(),r}return Object(c.a)(t,[{key:"renderCube",value:function(e){var n=this,t=new h.a,r=new h.g({color:new h.b(e||f()),opacity:.5,side:h.d,transparent:!0}),i=new h.f(t,r);i.position.x=p(-5,5)+Math.random(),i.position.y=p(-8,-5),this.scene.add(i);var o=.02*Math.random()+.01;!function e(){requestAnimationFrame(e),i.rotation.x-=.01,i.rotation.y+=.01,i.position.y+=o,i.position.y>6&&(i.position.y=-6),n.renderer.render(n.scene,n.camera)}()}},{key:"componentDidMount",value:function(){this.scene=new h.i,this.camera=new h.h(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new h.j,this.renderer.setSize(window.innerWidth-10,window.innerHeight-10),this.ref.appendChild(this.renderer.domElement);var e=new h.e(16777215,0,1);this.scene.add(e);var n=new h.c(16777215,1);n.position.set(0,10,0),n.target.position.set(-5,0,0),this.scene.add(n),this.scene.add(n.target),this.camera.position.z=7;for(var t=7;t--;)this.renderCube()}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{ref:function(n){return e.ref=n}})}}]),t}(r.PureComponent);a.a.render(i.a.createElement(w,null),document.getElementById("root"))},9:function(e,n,t){e.exports=t(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.2292f67b.chunk.js.map