(this.webpackJsonpprism=this.webpackJsonpprism||[]).push([[0],{14:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var r=t(1),i=t.n(r),o=t(7),a=t.n(o),c=t(2),s=t(8),d=t(3),u=t(4),h=t(0),l=(t(14),function(e,n){return Math.floor(Math.random()*(n+1-e))+e}),m=function(){var e=l(50,200),n=l(50,200),t=l(50,200);return new h.b("rgb(".concat(e,", ").concat(n,", ").concat(t,")"))},p=function(e){Object(u.a)(t,e);var n=Object(d.a)(t);function t(e){var r;return Object(c.a)(this,t),(r=n.call(this,e)).ref=i.a.createRef(),r.numCubes=0,r}return Object(s.a)(t,[{key:"renderCube",value:function(e){var n=this;this.numCubes++;var t=new h.a,r=new h.g({color:new h.b(e||m()),opacity:.5,side:h.d,transparent:!0}),i=new h.f(t,r);i.position.x=l(-5,5)+Math.random(),i.position.y=l(-8,-5),i.click=function(){r.visible=!1,i.position.y=1/0},this.scene.add(i);var o=.02*Math.random()+.01;!function e(){requestAnimationFrame(e),i.rotation.x-=.01,i.rotation.y+=.01,i.position.y+=o,i.position.y>6&&(r.visible=!0,r.color=m(),i.position.y=-6,i.position.x=l(-5,5)+Math.random()),n.renderer.render(n.scene,n.camera)}()}},{key:"componentDidMount",value:function(){var e=this;this.scene=new h.j,this.camera=new h.h(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new h.l,this.renderer.setSize(window.innerWidth-10,window.innerHeight-10),this.ref.appendChild(this.renderer.domElement);var n=new h.e(16777215,0,1);this.scene.add(n);var t=new h.c(16777215,1);t.position.set(0,10,0),t.target.position.set(-5,0,0),this.scene.add(t),this.scene.add(t.target),this.camera.position.z=7;for(var r=7;r--;)this.renderCube();var i=new h.i,o=new h.k;this.ref.addEventListener("mousedown",(function(n){n.preventDefault(),o.x=n.clientX/e.renderer.domElement.clientWidth*2-1,o.y=-n.clientY/e.renderer.domElement.clientHeight*2+1,i.setFromCamera(o,e.camera);var t=i.intersectObjects(e.scene.children);t.length>0&&t[0].object.click&&t[0].object.click()}))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{ref:function(n){return e.ref=n}})}}]),t}(r.PureComponent);a.a.render(i.a.createElement(p,null),document.getElementById("root"))},9:function(e,n,t){e.exports=t(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.ff036983.chunk.js.map