(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(34)},32:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);n(19);var i,a=n(1),s=n.n(a),r=n(4),o=n.n(r),c=n(11),l=n(2),u=n(3),h=n(6),d=n(5),v=n(7),p=n(8),m=n(9),f=n(0);!function(e){e[e.AxisX=0]="AxisX",e[e.AxisY=1]="AxisY",e[e.AxisZ=2]="AxisZ",e[e.PlaneYZ=3]="PlaneYZ",e[e.PlaneXZ=4]="PlaneXZ",e[e.PlaneXY=5]="PlaneXY"}(i||(i={}));var y,w=function(e){function t(){var e;Object(l.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).activeMesh=null,e.objectDragDirection=null,e.dragOffset=new f.n,e.plane=new f.i,e.axisX=void 0,e.axisY=void 0,e.axisZ=void 0,e.planeYZ=void 0,e.planeXZ=void 0,e.planeXY=void 0;var n=new f.b(.05,.05,.5);e.axisX=new f.e(n,new f.f({color:16711680})),e.axisX.position.set(.25,0,0),e.axisX.rotation.y=Math.PI/2,e.axisX.userData.direction=i.AxisX,e.axisY=new f.e(n,new f.f({color:65280})),e.axisY.position.set(0,.25,0),e.axisY.rotation.x=Math.PI/2,e.axisY.userData.direction=i.AxisY,e.axisZ=new f.e(n,new f.f({color:255})),e.axisZ.position.set(0,0,.25),e.axisZ.userData.direction=i.AxisZ,e.add(e.axisX),e.add(e.axisY),e.add(e.axisZ);var a=new f.j(.25,.25);return e.planeYZ=new f.e(a,new f.f({color:65535,side:f.c})),e.planeYZ.position.set(0,.25,.25),e.planeYZ.rotation.y=Math.PI/2,e.planeYZ.userData.direction=i.PlaneYZ,e.planeXZ=new f.e(a,new f.f({color:16711935,side:f.c})),e.planeXZ.position.set(.25,0,.25),e.planeXZ.rotation.x=Math.PI/2,e.planeXZ.userData.direction=i.PlaneXZ,e.planeXY=new f.e(a,new f.f({color:16776960,side:f.c})),e.planeXY.position.set(.25,.25,0),e.planeXY.userData.direction=i.PlaneXY,e.add(e.planeYZ),e.add(e.planeXZ),e.add(e.planeXY),e}return Object(v.a)(t,e),Object(u.a)(t,[{key:"getControlFromRaycaster",value:function(e){if(!this.activeMesh)return null;this.position.copy(this.activeMesh.position);var t=e.intersectObjects(this.children),n=!0,i=!1,a=void 0;try{for(var s,r=t[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var o=s.value,c=o.object;if(c.userData.hasOwnProperty("direction"))return this.dragOffset.copy(o.point).sub(this.activeMesh.position),c}}catch(l){i=!0,a=l}finally{try{n||null==r.return||r.return()}finally{if(i)throw a}}return null}},{key:"onClick",value:function(e){var t=this.getControlFromRaycaster(e);return!(!t||!t.userData.hasOwnProperty("direction"))&&(this.objectDragDirection=t.userData.direction,this.onMove(e),!0)}},{key:"onMove",value:function(e){var t=e.ray;if(null!==this.objectDragDirection&&this.activeMesh){var n=this.activeMesh.position,a=this.plane,s=null;switch(this.objectDragDirection){case i.AxisX:a.set(new f.n(0,1,0),-n.y),s=new f.i(new f.n(0,0,1),-n.z);break;case i.AxisY:a.set(new f.n(1,0,0),-n.x),s=new f.i(new f.n(0,0,1),-n.z);break;case i.AxisZ:a.set(new f.n(1,0,0),-n.x),s=new f.i(new f.n(0,1,0),-n.y);break;case i.PlaneXY:a.set(new f.n(0,0,1),-n.z);break;case i.PlaneYZ:a.set(new f.n(1,0,0),-n.x);break;case i.PlaneXZ:a.set(new f.n(0,1,0),-n.y)}s&&Math.abs(s.distanceToPoint(t.origin))>Math.abs(a.distanceToPoint(t.origin))&&a.copy(s);var r=t.intersectPlane(a,new f.n);if(r)switch(r.sub(this.dragOffset),this.objectDragDirection){case i.AxisX:this.activeMesh.position.x=r.x;break;case i.AxisY:this.activeMesh.position.y=r.y;break;case i.AxisZ:this.activeMesh.position.z=r.z;break;default:this.activeMesh.position.copy(r)}}}}]),t}(f.l),g=function(){function e(t){var n=this;Object(l.a)(this,e),this.target=void 0,this.keysPressed=new Set,this.lastKeyUp=new Map,this.reset=function(){n.keysPressed.clear()},this.onKeyDown=function(e){e.preventDefault(),Math.abs(e.timeStamp-(n.lastKeyUp.get(e.key)||0))>=100&&n.keysPressed.add(e.key)},this.onKeyUp=function(e){e.preventDefault(),n.keysPressed.delete(e.key),n.lastKeyUp.set(e.key,e.timeStamp)},this.onClick=function(e){2===e.button&&e.shiftKey&&n.reset()},this.target=t}return Object(u.a)(e,[{key:"listen",value:function(){this.target.addEventListener("blur",this.reset),this.target.addEventListener("contextmenu",this.reset),this.target.addEventListener("keydown",this.onKeyDown),this.target.addEventListener("keyup",this.onKeyUp),document.addEventListener("click",this.onClick)}},{key:"stop",value:function(){this.target.removeEventListener("blur",this.reset),this.target.removeEventListener("contextmenu",this.reset),this.target.removeEventListener("keydown",this.onKeyDown),this.target.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("click",this.onClick),this.reset()}},{key:"isPressed",value:function(e){return this.keysPressed.has(e)}}]),e}();!function(e){e[e.Primary=0]="Primary",e[e.Middle=1]="Middle",e[e.Secondary=2]="Secondary"}(y||(y={}));var b={up:new f.n(0,1,0),down:new f.n(0,-1,0),left:new f.n(-1,0,0),right:new f.n(1,0,0),forwards:new f.n(0,0,-1),backwards:new f.n(0,0,1)},k=function(){function e(t){var n=this;Object(l.a)(this,e),this.options=t,this.target=null,this.rafHandle=0,this.previousTimestamp=0,this.scene=new f.l,this.controls=new w,this.camera=new f.h(75,1,.1,1e3),this.renderer=new f.o,this.canvas=void 0,this.grid=new f.d(10,10),this.smallCube=new f.e,this.outlineMesh=new f.e,this.raycaster=new f.k,this.keys=new g(this.renderer.domElement),this.isDraggingCamera=!1,this.resize=function(){if(n.target){var e=n.target,t=e.offsetWidth,i=e.offsetHeight;n.camera.aspect=t/i,n.camera.updateProjectionMatrix(),n.renderer.setSize(t,i)}},this.animate=function(e){n.rafHandle=window.requestAnimationFrame(n.animate);var t=(e-n.previousTimestamp)/1e3;n.previousTimestamp=e,n.smallCube.rotation.x+=.01,n.smallCube.rotation.y+=.01,n.keys.isPressed("w")&&n.camera.translateOnAxis(b.forwards,2*t),n.keys.isPressed("s")&&n.camera.translateOnAxis(b.backwards,2*t),n.keys.isPressed("a")&&n.camera.translateOnAxis(b.left,2*t),n.keys.isPressed("d")&&n.camera.translateOnAxis(b.right,2*t),n.keys.isPressed(" ")&&(n.camera.position.y+=2*t),n.keys.isPressed("Shift")&&(n.camera.position.y-=2*t),n.keys.isPressed("ArrowLeft")&&n.camera.rotateOnWorldAxis(new f.n(0,1,0),t),n.keys.isPressed("ArrowRight")&&n.camera.rotateOnWorldAxis(new f.n(0,-1,0),t),n.keys.isPressed("ArrowUp")&&n.camera.rotateOnAxis(new f.n(1,0,0),t),n.keys.isPressed("ArrowDown")&&n.camera.rotateOnAxis(new f.n(-1,0,0),t),n.renderer.clear(),n.renderer.render(n.scene,n.camera),n.controls.activeMesh&&(n.controls.position.copy(n.controls.activeMesh.position),n.renderer.clearDepth(),n.renderer.render(n.controls,n.camera))},this.onClick=function(e){},this.onMouseDown=function(e){e.button===y.Secondary&&(n.isDraggingCamera=!0,n.canvas.requestPointerLock()),e.button===y.Primary&&(n.updateRaycaster(e),n.controls.onClick(n.raycaster)?n.canvas.style.cursor="grabbing":n.checkSceneClick(n.raycaster))},this.onMouseUp=function(e){e.button===y.Secondary&&n.isDraggingCamera&&(n.isDraggingCamera=!1,document.exitPointerLock()),e.button===y.Primary&&null!==n.controls.objectDragDirection&&(n.controls.objectDragDirection=null,n.controls.getControlFromRaycaster(n.raycaster)?n.canvas.style.cursor="grab":n.canvas.style.cursor=null)},this.onMouseMove=function(e){n.isDraggingCamera?(e.movementX&&n.camera.rotateOnWorldAxis(new f.n(0,-1,0),e.movementX/100),e.movementY&&n.camera.rotateOnAxis(new f.n(-1,0,0),e.movementY/100)):(n.updateRaycaster(e),null!==n.controls.objectDragDirection?n.controls.onMove(n.raycaster):n.controls.getControlFromRaycaster(n.raycaster)?n.canvas.style.cursor="grab":n.canvas.style.cursor=null)},this.onWheel=function(e){e.preventDefault();var t=e.deltaY;0===e.deltaMode&&(t/=15),n.camera.translateZ(t/10)},this.renderer.autoClear=!1,this.canvas=this.renderer.domElement,this.canvas.tabIndex=-1,this.canvas.addEventListener("click",this.onClick),this.canvas.addEventListener("mousedown",this.onMouseDown),this.canvas.addEventListener("mouseup",this.onMouseUp),this.canvas.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("wheel",this.onWheel),this.canvas.addEventListener("contextmenu",function(e){return e.preventDefault(),e.stopPropagation(),!1},!0);var i=new f.b(1,1,1),a=new f.g,s=new f.e(i,a);s.position.y+=.5,s.name="New cube",this.smallCube.geometry=new f.b(.25,.25,.25),this.smallCube.material=a,this.smallCube.translateX(2),this.smallCube.name="Small cube",this.scene.add(s),this.scene.add(this.smallCube),this.scene.add(this.grid),this.camera.position.z=3,this.camera.position.y=3,this.camera.lookAt(s.position);var r=new f.f({color:16777215,side:f.a});this.outlineMesh.material=r,this.outlineMesh.scale.multiplyScalar(1.05),console.log(this.scene.toJSON())}return Object(u.a)(e,[{key:"attach",value:function(e){this.keys.listen(),this.target=e,e.appendChild(this.canvas),this.resize(),window.requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize),this.canvas.focus()}},{key:"detach",value:function(){window.cancelAnimationFrame(this.rafHandle),window.removeEventListener("resize",this.resize),this.keys.stop(),this.target&&(this.target.removeChild(this.canvas),this.target=null)}},{key:"checkSceneClick",value:function(e){this.controls.activeMesh&&(this.controls.activeMesh.remove(this.outlineMesh),this.controls.activeMesh=null);var t=e.intersectObjects(this.scene.children),n=!0,i=!1,a=void 0;try{for(var s,r=t[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var o=s.value.object;if(o.isMesh)return this.controls.activeMesh=o,this.outlineMesh.geometry=this.controls.activeMesh.geometry,this.controls.activeMesh.add(this.outlineMesh),this.options.onSelect(o),!0}}catch(c){i=!0,a=c}finally{try{n||null==r.return||r.return()}finally{if(i)throw a}}return this.options.onSelect(null),!1}},{key:"updateRaycaster",value:function(e){var t=this.renderer.getSize(new f.m),n=(e.pageX-this.canvas.offsetLeft)/t.x*2-1,i=-(e.pageY-this.canvas.offsetTop)/t.y*2+1;this.raycaster.setFromCamera({x:n,y:i},this.camera)}}]),e}();function x(){var e=Object(p.a)(["\n  flex: 1;\n  height: 100%;\n"]);return x=function(){return e},e}function M(){var e=Object(p.a)(["\n  width: 250px;\n  height: 100%;\n  background: #34495e;\n  color: #fff;\n  padding: 10px 15px;\n"]);return M=function(){return e},e}function P(){var e=Object(p.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: #000;\n  display: flex;\n"]);return P=function(){return e},e}var O=m.a.div(P()),j=m.a.aside(M()),C=m.a.main(x()),A=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={selectedObject:null},n.mainRef=s.a.createRef(),n.sceneCanvas=new k({onSelect:function(e){e?n.setState({selectedObject:{id:e.id,name:e.name,position:e.position,rotation:e.rotation}}):n.setState({selectedObject:null})},onTranslate:function(e){n.setState(function(t){var n=t.selectedObject;return{selectedObject:Object(c.a)({},n,{position:e})}})}}),n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.sceneCanvas.attach(this.mainRef.current)}},{key:"componentWillUnmount",value:function(){this.sceneCanvas.detach()}},{key:"updateName",value:function(e){this.sceneCanvas.controls.activeMesh.name=e,this.setState(function(t){var n=t.selectedObject;return{selectedObject:Object(c.a)({},n,{name:e})}})}},{key:"updatePosition",value:function(e,t,n){this.sceneCanvas.controls.activeMesh.position.set(e,t,n),this.setState(function(i){var a=i.selectedObject;return{selectedObject:Object(c.a)({},a,{position:new f.n(e,t,n)})}})}},{key:"render",value:function(){var e=this,t=this.state.selectedObject;return s.a.createElement(O,null,s.a.createElement(j,null,s.a.createElement("p",null,"Sidebar"),t&&s.a.createElement("div",null,"Selected object with id ",t.id,s.a.createElement("div",null,s.a.createElement("input",{type:"text",value:t.name,onChange:function(t){return e.updateName(t.currentTarget.value)}})),s.a.createElement("div",null,s.a.createElement("input",{type:"number",value:t.position.x,onChange:function(n){return e.updatePosition(n.currentTarget.valueAsNumber,t.position.y,t.position.z)}}),s.a.createElement("input",{type:"number",value:t.position.y,onChange:function(n){return e.updatePosition(t.position.x,n.currentTarget.valueAsNumber,t.position.z)}}),s.a.createElement("input",{type:"number",value:t.position.z,onChange:function(n){return e.updatePosition(t.position.x,t.position.y,n.currentTarget.valueAsNumber)}})))),s.a.createElement(C,{ref:this.mainRef}))}}]),t}(s.a.Component),D=(n(32),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function E(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(s.a.createElement(A,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/audio3d",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/audio3d","/service-worker.js");D?(function(e,t){fetch(e).then(function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):E(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):E(t,e)})}}()}},[[18,2,1]]]);
//# sourceMappingURL=main.53447d76.chunk.js.map