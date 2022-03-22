!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["three"],t):"object"==typeof exports?exports.THREEx=t(require("three")):e.THREEx=t(e.THREE)}(this,(function(e){return(()=>{"use strict";var t={381:t=>{t.exports=e}},n={};function i(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,i),r.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{i.r(o),i.d(o,{DeviceOrientationControls:()=>l,LocationBased:()=>t,WebcamRenderer:()=>r});class e{constructor(){this.EARTH=40075016.68,this.HALF_EARTH=20037508.34}project(e,t){return[this.lonToSphMerc(e),this.latToSphMerc(t)]}unproject(e){return[this.sphMercToLon(e[0]),this.sphMercToLat(e[1])]}lonToSphMerc(e){return e/180*this.HALF_EARTH}latToSphMerc(e){return Math.log(Math.tan((90+e)*Math.PI/360))/(Math.PI/180)*this.HALF_EARTH/180}sphMercToLon(e){return e/this.HALF_EARTH*180}sphMercToLat(e){var t=e/this.HALF_EARTH*180;return 180/Math.PI*(2*Math.atan(Math.exp(t*Math.PI/180))-Math.PI/2)}getID(){return"epsg:3857"}}class t{constructor(t,n){this.scene=t,this.camera=n,this.proj=new e,this.eventHandlers={}}setProjection(e){this.proj=e}startGps(e=0){this.watchPositionId=navigator.geolocation.watchPosition((e=>{this.setWorldPosition(this.camera,e.coords.longitude,e.coords.latitude),this.eventHandlers.gpsupdate&&this.eventHandlers.gpsupdate(e)}),(e=>{alert(`GPS listen error: code ${e}`)}),{enableHighAccuracy:!0,maximumAge:e})}stopGps(){this.watchPositionId&&(navigator.geolocation.clearWatch(this.watchPositionId),this.watchPositionId=null)}fakeGps(e,t,n){this.setWorldPosition(this.camera,e,t,n)}lonLatToWorldCoords(e,t){const n=this.proj.project(e,t);return[n[0],-n[1]]}add(e,t,n,i){this.setWorldPosition(e,t,n,i),this.scene.add(e)}setWorldPosition(e,t,n,i){const o=this.lonLatToWorldCoords(t,n);[e.position.x,e.position.z]=o,void 0!==i&&(e.position.y=i)}setElevation(e){this.camera.position.y=e}on(e,t){this.eventHandlers[e]=t}}var n=i(381);class r{constructor(e,t){let i;this.renderer=e,this.renderer.autoClear=!1,this.sceneWebcam=new n.Scene,void 0===t?(i=document.createElement("video"),i.setAttribute("autoplay",!0),i.setAttribute("playsinline",!0),i.style.display="none",document.body.appendChild(i)):i=document.querySelector(t),this.geom=new n.PlaneBufferGeometry,this.texture=new n.VideoTexture(i),this.material=new n.MeshBasicMaterial({map:this.texture});const o=new n.Mesh(this.geom,this.material);if(this.sceneWebcam.add(o),this.cameraWebcam=new n.OrthographicCamera(-.5,.5,.5,-.5,0,10),navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const e={video:{width:1280,height:720,facingMode:"environment"}};navigator.mediaDevices.getUserMedia(e).then((e=>{console.log("using the webcam successfully..."),i.srcObject=e,i.play()})).catch((e=>{alert(`Webcam error: ${e}`)}))}else alert("sorry - media devices API not supported")}update(){this.renderer.clear(),this.renderer.render(this.sceneWebcam,this.cameraWebcam),this.renderer.clearDepth()}dispose(){this.material.dispose(),this.texture.dispose(),this.geom.dispose()}}const s=new n.Vector3(0,0,1),a=new n.Euler,c=new n.Quaternion,h=new n.Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5)),d={type:"change"};class l extends n.EventDispatcher{constructor(e){super(),!1===window.isSecureContext&&console.error("THREE.DeviceOrientationControls: DeviceOrientationEvent is only available in secure contexts (https)");const t=this,i=new n.Quaternion;this.object=e,this.object.rotation.reorder("YXZ"),this.enabled=!0,this.deviceOrientation={},this.screenOrientation=0,this.alphaOffset=0,this.orientationChangeEventName="ondeviceorientationabsolute"in window?"deviceorientationabsolute":"deviceorientation";const o=function(e){t.deviceOrientation=e},r=function(){t.screenOrientation=window.orientation||0};this.connect=function(){r(),void 0!==window.DeviceOrientationEvent&&"function"==typeof window.DeviceOrientationEvent.requestPermission?window.DeviceOrientationEvent.requestPermission().then((function(e){"granted"==e&&(window.addEventListener("orientationchange",r),window.addEventListener(this.orientationChangeEventName,o))})).catch((function(e){console.error("THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:",e)})):(window.addEventListener("orientationchange",r),window.addEventListener(this.orientationChangeEventName,o)),t.enabled=!0},this.disconnect=function(){window.removeEventListener("orientationchange",r),window.removeEventListener(this.orientationChangeEventName,o),t.enabled=!1},this.update=function(){if(!1===t.enabled)return;const e=t.deviceOrientation;if(e){const o=e.alpha?n.MathUtils.degToRad(e.alpha)+t.alphaOffset:0,r=e.beta?n.MathUtils.degToRad(e.beta):0,l=e.gamma?n.MathUtils.degToRad(e.gamma):0,u=t.screenOrientation?n.MathUtils.degToRad(t.screenOrientation):0;!function(e,t,n,i,o){a.set(n,t,-i,"YXZ"),e.setFromEuler(a),e.multiply(h),e.multiply(c.setFromAxisAngle(s,-o))}(t.object.quaternion,o,r,l,u),8*(1-i.dot(t.object.quaternion))>1e-6&&(i.copy(t.object.quaternion),t.dispatchEvent(d))}},this.dispose=function(){t.disconnect()},this.connect()}}})(),o})()}));
