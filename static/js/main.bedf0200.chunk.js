(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(38)},36:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);n(21);var a,i=n(1),s=n.n(i),r=n(7),o=n.n(r),c=n(2),l=n(3),u=n(4),h=n(9),d=n(8),v=n(10),m=n(5),p=n(6),y=n(0),f=n(12),b=n.n(f),w=n(16),g=function(){function e(){Object(l.a)(this,e),this.onGamepadConnected=function(e){console.log("Gamepad connected:",e.gamepad)},this.onGamepadDisconnected=function(e){console.log("Gamepad disconnected:",e.gamepad)}}return Object(u.a)(e,[{key:"listen",value:function(){window.addEventListener("gamepadconnected",this.onGamepadConnected),window.addEventListener("gamepaddisconnected",this.onGamepadDisconnected)}},{key:"stop",value:function(){window.removeEventListener("gamepadconnected",this.onGamepadConnected),window.removeEventListener("gamepaddisconnected",this.onGamepadDisconnected)}},{key:"getAxis",value:function(e){var t=navigator.getGamepads(),n=0,a=!0,i=!1,s=void 0;try{for(var r,o=t[Symbol.iterator]();!(a=(r=o.next()).done);a=!0){var c=r.value;if(c&&"standard"===c.mapping)if(e<4){var l=c.axes[e];Math.abs(l)>=.1&&Math.abs(l)>Math.abs(n)&&(n=l)}else if(4===e){var u=c.buttons[6].value,h=c.buttons[7].value-u;Math.abs(h)>Math.abs(n)&&(n=h)}}}catch(d){i=!0,s=d}finally{try{a||null==o.return||o.return()}finally{if(i)throw s}}return n}}]),e}(),x=function(){function e(t){var n=this;Object(l.a)(this,e),this.target=void 0,this.keysPressed=new Set,this.lastKeyUp=new Map,this.reset=function(){n.keysPressed.clear()},this.onKeyDown=function(e){e.preventDefault(),Math.abs(e.timeStamp-(n.lastKeyUp.get(e.key)||0))>=100&&n.keysPressed.add(e.key)},this.onKeyUp=function(e){e.preventDefault(),n.keysPressed.delete(e.key),n.lastKeyUp.set(e.key,e.timeStamp)},this.onClick=function(e){2===e.button&&e.shiftKey&&n.reset()},this.target=t}return Object(u.a)(e,[{key:"listen",value:function(){this.target.addEventListener("blur",this.reset),this.target.addEventListener("contextmenu",this.reset),this.target.addEventListener("keydown",this.onKeyDown),this.target.addEventListener("keyup",this.onKeyUp),document.addEventListener("click",this.onClick)}},{key:"stop",value:function(){this.target.removeEventListener("blur",this.reset),this.target.removeEventListener("contextmenu",this.reset),this.target.removeEventListener("keydown",this.onKeyDown),this.target.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("click",this.onClick),this.reset()}},{key:"isPressed",value:function(e){return this.keysPressed.has(e)}}]),e}();!function(e){e[e.AxisX=0]="AxisX",e[e.AxisY=1]="AxisY",e[e.AxisZ=2]="AxisZ",e[e.PlaneYZ=3]="PlaneYZ",e[e.PlaneXZ=4]="PlaneXZ",e[e.PlaneXY=5]="PlaneXY"}(a||(a={}));var k,M=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this))).options=e,n.activeMesh=null,n.objectDragDirection=null,n.isScaling=!1,n.dragOffset=new y.u,n.lastPoint=new y.u,n.plane=new y.m,n.axisX=void 0,n.axisY=void 0,n.axisZ=void 0,n.scaleX=void 0,n.scaleY=void 0,n.scaleZ=void 0,n.planeYZ=void 0,n.planeXZ=void 0,n.planeXY=void 0;var i={transparent:!0,opacity:.75,side:y.f},s=new y.d(.05,.05,.5);n.axisX=new y.i(s,new y.j(Object(c.a)({},i,{color:16711680}))),n.axisX.position.set(.275,0,0),n.axisX.rotation.y=Math.PI/2,n.axisX.userData.direction=a.AxisX,n.axisY=new y.i(s,new y.j(Object(c.a)({},i,{color:65280}))),n.axisY.position.set(0,.275,0),n.axisY.rotation.x=Math.PI/2,n.axisY.userData.direction=a.AxisY,n.axisZ=new y.i(s,new y.j(Object(c.a)({},i,{color:255}))),n.axisZ.position.set(0,0,.275),n.axisZ.userData.direction=a.AxisZ,n.add(n.axisX),n.add(n.axisY),n.add(n.axisZ);var r=new y.s(.05,16,16);n.scaleX=new y.i(r,new y.j(Object(c.a)({},i,{color:16711680}))),n.scaleX.position.set(.65,0,0),n.scaleX.userData.direction=a.AxisX,n.scaleX.userData.isScale=!0,n.scaleY=new y.i(r,new y.j(Object(c.a)({},i,{color:65280}))),n.scaleY.position.set(0,.65,0),n.scaleY.userData.direction=a.AxisY,n.scaleY.userData.isScale=!0,n.scaleZ=new y.i(r,new y.j(Object(c.a)({},i,{color:255}))),n.scaleZ.position.set(0,0,.65),n.scaleZ.userData.direction=a.AxisZ,n.scaleZ.userData.isScale=!0,n.add(n.scaleX),n.add(n.scaleY),n.add(n.scaleZ);var o=new y.n(.25,.25);return n.planeYZ=new y.i(o,new y.j(Object(c.a)({},i,{color:65535}))),n.planeYZ.position.set(0,.25,.25),n.planeYZ.rotation.y=Math.PI/2,n.planeYZ.userData.direction=a.PlaneYZ,n.planeXZ=new y.i(o,new y.j(Object(c.a)({},i,{color:16711935}))),n.planeXZ.position.set(.25,0,.25),n.planeXZ.rotation.x=Math.PI/2,n.planeXZ.userData.direction=a.PlaneXZ,n.planeXY=new y.i(o,new y.j(Object(c.a)({},i,{color:16776960}))),n.planeXY.position.set(.25,.25,0),n.planeXY.userData.direction=a.PlaneXY,n.add(n.planeYZ),n.add(n.planeXZ),n.add(n.planeXY),n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"getControlFromRaycaster",value:function(e){if(!this.activeMesh)return null;this.position.copy(this.activeMesh.position);var t=e.intersectObjects(this.children),n=!0,a=!1,i=void 0;try{for(var s,r=t[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var o=s.value,c=o.object;if(c.userData.hasOwnProperty("direction"))return this.dragOffset.copy(o.point).sub(this.activeMesh.position),this.lastPoint.copy(o.point),c}}catch(l){a=!0,i=l}finally{try{n||null==r.return||r.return()}finally{if(a)throw i}}return null}},{key:"onClick",value:function(e){var t=this.getControlFromRaycaster(e);return!(!t||!t.userData.hasOwnProperty("direction"))&&(this.objectDragDirection=t.userData.direction,this.isScaling=!!t.userData.isScale,this.onMove(e),!0)}},{key:"onMove",value:function(e){var t=e.ray;if(null!==this.objectDragDirection&&this.activeMesh){var n=this.activeMesh.position,i=this.plane,s=null;switch(this.objectDragDirection){case a.AxisX:i.set(new y.u(0,1,0),-n.y),s=new y.m(new y.u(0,0,1),-n.z);break;case a.AxisY:i.set(new y.u(1,0,0),-n.x),s=new y.m(new y.u(0,0,1),-n.z);break;case a.AxisZ:i.set(new y.u(1,0,0),-n.x),s=new y.m(new y.u(0,1,0),-n.y);break;case a.PlaneXY:i.set(new y.u(0,0,1),-n.z);break;case a.PlaneYZ:i.set(new y.u(1,0,0),-n.x);break;case a.PlaneXZ:i.set(new y.u(0,1,0),-n.y)}s&&Math.abs(s.distanceToPoint(t.origin))>Math.abs(i.distanceToPoint(t.origin))&&i.copy(s);var r=t.intersectPlane(i,new y.u);if(r){if(this.isScaling){switch(this.objectDragDirection){case a.AxisX:this.activeMesh.scale.x=Math.min(Math.max(this.activeMesh.scale.x+(r.x-this.lastPoint.x),.1),10);break;case a.AxisY:this.activeMesh.scale.y=Math.min(Math.max(this.activeMesh.scale.y+(r.y-this.lastPoint.y),.1),10);break;case a.AxisZ:this.activeMesh.scale.z=Math.min(Math.max(this.activeMesh.scale.z+(r.z-this.lastPoint.z),.1),10)}this.options.onScale(this.activeMesh.scale)}else{switch(r.sub(this.dragOffset),this.objectDragDirection){case a.AxisX:this.activeMesh.position.x=r.x;break;case a.AxisY:this.activeMesh.position.y=r.y;break;case a.AxisZ:this.activeMesh.position.z=r.z;break;default:this.activeMesh.position.copy(r)}this.options.onTranslate(this.activeMesh.position)}this.lastPoint.copy(r)}}}}]),t}(y.r);!function(e){e[e.Primary=0]="Primary",e[e.Middle=1]="Middle",e[e.Secondary=2]="Secondary"}(k||(k={}));var j={up:new y.u(0,1,0),down:new y.u(0,-1,0),left:new y.u(-1,0,0),right:new y.u(1,0,0),forwards:new y.u(0,0,-1),backwards:new y.u(0,0,1)},A=function(){function e(t){var n=this;Object(l.a)(this,e),this.options=t,this.target=null,this.rafHandle=0,this.previousTimestamp=0,this.audioContext=new AudioContext,this.listener=new y.b,this.scene=new y.r,this.controls=new M({onTranslate:this.options.onTranslate,onScale:this.options.onScale}),this.camera=new y.l(75,1,.1,1e3),this.renderer=new y.v,this.canvas=void 0,this.grid=new y.h(10,10,16777215,16777215),this.cubeGeometry=new y.d(1,1,1),this.cubeMaterial=new y.k,this.smallCube=new y.i,this.outlineMesh=new y.i,this.raycaster=new y.q,this.keys=new x(this.renderer.domElement),this.gamepads=new g,this.isDraggingCamera=!1,this.resize=function(){if(n.target){var e=n.target,t=e.offsetWidth,a=e.offsetHeight;n.camera.aspect=t/a,n.camera.updateProjectionMatrix(),n.renderer.setPixelRatio(window.devicePixelRatio),n.renderer.setSize(t,a)}},this.animate=function(e){n.rafHandle=window.requestAnimationFrame(n.animate);var t=(e-n.previousTimestamp)/1e3;n.previousTimestamp=e,n.update(t),n.renderer.clear(),n.renderer.render(n.scene,n.camera),n.controls.activeMesh&&(n.controls.position.copy(n.controls.activeMesh.position),n.renderer.clearDepth(),n.renderer.render(n.controls,n.camera))},this.onClick=function(e){},this.onMouseDown=function(e){e.button===k.Secondary&&(n.isDraggingCamera=!0,n.canvas.requestPointerLock()),e.button===k.Primary&&(n.updateRaycaster(e),n.controls.onClick(n.raycaster)?n.canvas.style.cursor="grabbing":n.checkSceneClick(n.raycaster))},this.onMouseUp=function(e){e.button===k.Secondary&&n.isDraggingCamera&&(n.isDraggingCamera=!1,document.exitPointerLock()),e.button===k.Primary&&null!==n.controls.objectDragDirection&&(n.controls.objectDragDirection=null,n.controls.getControlFromRaycaster(n.raycaster)?n.canvas.style.cursor="grab":n.canvas.style.cursor=null)},this.onMouseMove=function(e){n.isDraggingCamera?(e.movementX&&n.camera.rotateOnWorldAxis(new y.u(0,-1,0),e.movementX/100),e.movementY&&n.camera.rotateOnAxis(new y.u(-1,0,0),e.movementY/100)):(n.updateRaycaster(e),null!==n.controls.objectDragDirection?n.controls.onMove(n.raycaster):n.controls.getControlFromRaycaster(n.raycaster)?n.canvas.style.cursor="grab":n.canvas.style.cursor=null)},this.onWheel=function(e){e.preventDefault();var t=e.deltaY;0===e.deltaMode&&(t/=15),n.camera.translateZ(t/10)},this.renderer.autoClear=!1,this.renderer.setClearColor(new y.e(1649238)),this.canvas=this.renderer.domElement,this.canvas.tabIndex=-1,this.canvas.addEventListener("click",this.onClick),this.canvas.addEventListener("mousedown",this.onMouseDown),this.canvas.addEventListener("mouseup",this.onMouseUp),this.canvas.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("wheel",this.onWheel),this.canvas.addEventListener("contextmenu",function(e){return e.preventDefault(),e.stopPropagation(),!1},!0);var a=new y.a(16777215,.5);this.scene.add(a);var i=new y.o(16777215,.5);i.position.set(5,5,0),i.lookAt(0,0,0),this.scene.add(i);var s=new y.i(this.cubeGeometry,this.cubeMaterial);s.position.y+=.5,s.name="New cube",this.smallCube.geometry=this.cubeGeometry,this.smallCube.material=this.cubeMaterial,this.smallCube.translateX(2),this.smallCube.name="Small cube",this.smallCube.scale.set(.25,.25,.25),this.scene.add(s),this.scene.add(this.smallCube),this.scene.add(this.grid),this.camera.position.z=3,this.camera.position.y=3,this.camera.lookAt(s.position);var r=new y.j({color:16777215,side:y.c});this.outlineMesh.material=r,this.outlineMesh.scale.multiplyScalar(1.05),console.log(this.scene.toJSON()),this.camera.add(this.listener)}return Object(u.a)(e,[{key:"attach",value:function(e){this.keys.listen(),this.gamepads.listen(),this.target=e,e.appendChild(this.canvas),this.resize(),window.requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize),this.canvas.focus()}},{key:"detach",value:function(){window.cancelAnimationFrame(this.rafHandle),window.removeEventListener("resize",this.resize),this.target&&(this.target.removeChild(this.canvas),this.target=null),this.keys.stop(),this.gamepads.stop()}},{key:"addCube",value:function(){var e=new y.i(this.cubeGeometry,this.cubeMaterial);e.position.y+=.5,e.name="New cube",this.scene.add(e),this.selectMesh(e)}},{key:"selectMesh",value:function(e){this.controls.activeMesh=e,this.outlineMesh.geometry=this.controls.activeMesh.geometry,this.controls.activeMesh.add(this.outlineMesh),this.options.onSelect(e)}},{key:"addAudioToActiveMesh",value:function(){var e=Object(w.a)(b.a.mark(function e(t){var n,a,i;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.controls.activeMesh){e.next=2;break}return e.abrupt("return");case 2:return(n=this.controls.activeMesh.getObjectByName("audio"))&&(this.controls.activeMesh.remove(n),n.stop()),e.next=6,this.audioContext.decodeAudioData(t);case 6:a=e.sent,(i=new y.p(this.listener)).name="audio",i.setBuffer(a),i.setLoop(!0),i.play(),this.controls.activeMesh.add(i),console.log("Successfully added new audio to selected mesh");case 14:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"update",value:function(e){this.keys.isPressed("w")&&this.camera.translateOnAxis(j.forwards,2*e),this.keys.isPressed("s")&&this.camera.translateOnAxis(j.backwards,2*e),this.keys.isPressed("a")&&this.camera.translateOnAxis(j.left,2*e),this.keys.isPressed("d")&&this.camera.translateOnAxis(j.right,2*e),this.keys.isPressed(" ")&&(this.camera.position.y+=2*e),this.keys.isPressed("Shift")&&(this.camera.position.y-=2*e),this.keys.isPressed("ArrowLeft")&&this.camera.rotateOnWorldAxis(new y.u(0,1,0),e),this.keys.isPressed("ArrowRight")&&this.camera.rotateOnWorldAxis(new y.u(0,-1,0),e),this.keys.isPressed("ArrowUp")&&this.camera.rotateOnAxis(new y.u(1,0,0),e),this.keys.isPressed("ArrowDown")&&this.camera.rotateOnAxis(new y.u(-1,0,0),e);var t=this.gamepads.getAxis(0),n=this.gamepads.getAxis(1),a=this.gamepads.getAxis(2),i=this.gamepads.getAxis(3),s=this.gamepads.getAxis(4);t&&this.camera.translateOnAxis(new y.u(1,0,0),2*e*t),n&&this.camera.translateOnAxis(new y.u(0,0,1),2*e*n),s&&this.camera.translateOnAxis(new y.u(0,1,0),2*e*s),a&&this.camera.rotateOnWorldAxis(new y.u(0,-1,0),e*a),i&&this.camera.rotateOnAxis(new y.u(-1,0,0),e*i)}},{key:"checkSceneClick",value:function(e){this.controls.activeMesh&&(this.controls.activeMesh.remove(this.outlineMesh),this.controls.activeMesh=null);var t=e.intersectObjects(this.scene.children),n=!0,a=!1,i=void 0;try{for(var s,r=t[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var o=s.value.object;if(o.isMesh)return this.selectMesh(o),!0}}catch(c){a=!0,i=c}finally{try{n||null==r.return||r.return()}finally{if(a)throw i}}return this.options.onSelect(null),!1}},{key:"updateRaycaster",value:function(e){var t=this.renderer.getSize(new y.t),n=(e.pageX-this.canvas.offsetLeft)/t.x*2-1,a=-(e.pageY-this.canvas.offsetTop)/t.y*2+1;this.raycaster.setFromCamera({x:n,y:a},this.camera)}}]),e}();function O(){var e=Object(m.a)(["\n  display: block;\n  appearance: none;\n  background: #2c3e50;\n  border-radius: 3px;\n  border: 2px solid #2c3e50;\n  color: #fff;\n  width: 100%;\n  padding: 10px 12px;\n  margin: 5px 0;\n\n  transition: 0.2s ease border-color;\n  :focus {\n    outline: none;\n    border-color: #3498db;\n  }\n"]);return O=function(){return e},e}function C(){var e=Object(m.a)(["\n  margin: 20px 0;\n"]);return C=function(){return e},e}function P(){var e=Object(m.a)(["\n  flex: 1;\n  height: 100%;\n"]);return P=function(){return e},e}function D(){var e=Object(m.a)(["\n  width: 250px;\n  height: 100%;\n  background: #34495e;\n  color: #fff;\n  padding: 10px 15px;\n  overflow-x: hidden;\n  overflow-y: auto;\n"]);return D=function(){return e},e}function E(){var e=Object(m.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: #000;\n  display: flex;\n"]);return E=function(){return e},e}var S=p.a.div(E()),z=p.a.aside(D()),X=p.a.main(P()),Y=p.a.div(C()),Z=p.a.input(O()),L=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(i)))).state={selectedObject:null},n.mainRef=s.a.createRef(),n.sceneCanvas=new A({onSelect:function(e){e?n.setState({selectedObject:{id:e.id,name:e.name,position:e.position,rotation:e.rotation,size:{width:e.scale.x,height:e.scale.y,depth:e.scale.z}}}):n.setState({selectedObject:null})},onTranslate:function(e){n.setState(function(t){var n=t.selectedObject;return{selectedObject:n&&Object(c.a)({},n,{position:e})}})},onScale:function(e){n.setState(function(t){var n=t.selectedObject;return{selectedObject:n&&Object(c.a)({},n,{size:{width:e.x,height:e.y,depth:e.z}})}})}}),n.onAddCubeClick=function(){n.sceneCanvas.addCube()},n.onAudioFileSelected=function(e){var t=e.currentTarget.files;if(t){var a=t.item(0);if(a)if(console.log("Selected file:",a),a.size>5242880)console.log("File too big, aborting");else{var i=new FileReader;i.onload=function(){if(i.result){var t=i.result;n.sceneCanvas.addAudioToActiveMesh(t)}else console.error("Failed reading file:",e)},i.readAsArrayBuffer(a)}}},n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.mainRef.current&&this.sceneCanvas.attach(this.mainRef.current)}},{key:"componentWillUnmount",value:function(){this.sceneCanvas.detach()}},{key:"updateName",value:function(e){this.sceneCanvas.controls.activeMesh&&(this.sceneCanvas.controls.activeMesh.name=e),this.setState(function(t){var n=t.selectedObject;return{selectedObject:n&&Object(c.a)({},n,{name:e})}})}},{key:"updateSize",value:function(e,t,n){this.sceneCanvas.controls.activeMesh&&this.sceneCanvas.controls.activeMesh.scale.set(e,t,n),this.setState(function(a){var i=a.selectedObject;return{selectedObject:i&&Object(c.a)({},i,{size:{width:e,height:t,depth:n}})}})}},{key:"updatePosition",value:function(e,t,n){this.sceneCanvas.controls.activeMesh&&this.sceneCanvas.controls.activeMesh.position.set(e,t,n),this.setState(function(a){var i=a.selectedObject;return{selectedObject:i&&Object(c.a)({},i,{position:new y.u(e,t,n)})}})}},{key:"updateRotation",value:function(e,t,n){this.sceneCanvas.controls.activeMesh&&this.sceneCanvas.controls.activeMesh.rotation.set(e,t,n),this.setState(function(a){var i=a.selectedObject;return{selectedObject:i&&Object(c.a)({},i,{rotation:new y.g(e,t,n)})}})}},{key:"render",value:function(){var e=this,t=this.state.selectedObject;return s.a.createElement(S,null,s.a.createElement(z,null,s.a.createElement("p",null,"Sidebar"),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.onAddCubeClick},"Add cube")),t&&s.a.createElement("div",null,"Selected object with id ",t.id,s.a.createElement(Y,null,s.a.createElement("label",null,"Name"),s.a.createElement(Z,{type:"text",value:t.name,onChange:function(t){return e.updateName(t.currentTarget.value)}})),s.a.createElement(Y,null,s.a.createElement("label",null,"Position (x, y, z)"),s.a.createElement(Z,{type:"number",step:"any",value:t.position.x,onChange:function(n){return e.updatePosition(n.currentTarget.valueAsNumber,t.position.y,t.position.z)}}),s.a.createElement(Z,{type:"number",step:"any",value:t.position.y,onChange:function(n){return e.updatePosition(t.position.x,n.currentTarget.valueAsNumber,t.position.z)}}),s.a.createElement(Z,{type:"number",step:"any",value:t.position.z,onChange:function(n){return e.updatePosition(t.position.x,t.position.y,n.currentTarget.valueAsNumber)}})),s.a.createElement(Y,null,s.a.createElement("label",null,"Euler-Rotation (x, y, z)"),s.a.createElement(Z,{type:"number",step:"any",value:t.rotation.x,onChange:function(n){return e.updateRotation(n.currentTarget.valueAsNumber,t.rotation.y,t.rotation.z)}}),s.a.createElement(Z,{type:"number",step:"any",value:t.rotation.y,onChange:function(n){return e.updateRotation(t.rotation.x,n.currentTarget.valueAsNumber,t.rotation.z)}}),s.a.createElement(Z,{type:"number",step:"any",value:t.rotation.z,onChange:function(n){return e.updateRotation(t.rotation.x,t.rotation.y,n.currentTarget.valueAsNumber)}})),s.a.createElement(Y,null,s.a.createElement("label",null,"Size (width, height, depth)"),s.a.createElement(Z,{type:"number",step:"any",min:.1,max:10,value:t.size.width,onChange:function(n){return e.updateSize(n.currentTarget.valueAsNumber,t.size.height,t.size.depth)}}),s.a.createElement(Z,{type:"number",step:"any",min:.1,max:10,value:t.size.height,onChange:function(n){return e.updateSize(t.size.width,n.currentTarget.valueAsNumber,t.size.depth)}}),s.a.createElement(Z,{type:"number",step:"any",min:.1,max:10,value:t.size.depth,onChange:function(n){return e.updateSize(t.size.width,t.size.height,n.currentTarget.valueAsNumber)}})),s.a.createElement(Y,null,s.a.createElement("label",null,"Audio source (file)"),s.a.createElement(Z,{type:"file",accept:"audio/*",onChange:this.onAudioFileSelected})))),s.a.createElement(X,{ref:this.mainRef}))}}]),t}(s.a.Component);n(36),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=window;!T.AudioContext&&T.webkitAudioContext&&(T.AudioContext=T.webkitAudioContext),o.a.render(s.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,2,1]]]);
//# sourceMappingURL=main.bedf0200.chunk.js.map