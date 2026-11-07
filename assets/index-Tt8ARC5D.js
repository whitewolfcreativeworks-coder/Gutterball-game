(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,O=1020,k=35902,A=35899,j=1021,ee=1022,M=1023,te=1026,N=1027,ne=1028,re=1029,ie=1030,ae=1031,oe=1033,se=33776,ce=33777,le=33778,P=33779,ue=35840,de=35841,fe=35842,pe=35843,me=36196,he=37492,ge=37496,_e=37488,ve=37489,ye=37490,be=37491,xe=37808,Se=37809,Ce=37810,we=37811,Te=37812,Ee=37813,De=37814,Oe=37815,ke=37816,Ae=37817,je=37818,Me=37819,Ne=37820,Pe=37821,F=36492,Fe=36494,Ie=36495,Le=36283,I=36284,Re=36285,L=36286,R=2300,ze=2301,Be=2302,Ve=2303,He=2400,Ue=2401,We=2402,Ge=3200,Ke=`srgb`,qe=`srgb-linear`,Je=`linear`,Ye=`srgb`,Xe=7680,Ze=35044,Qe=2e3;function $e(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function et(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function tt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function nt(){let e=tt(`canvas`);return e.style.display=`block`,e}var rt={};function it(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function at(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=at(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=at(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ot(...e){let t=e.join(` `);t in rt||(rt[t]=!0,z(...e))}function st(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ct={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},lt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ut=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),dt=1234567,ft=Math.PI/180,pt=180/Math.PI;function mt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ut[e&255]+ut[e>>8&255]+ut[e>>16&255]+ut[e>>24&255]+`-`+ut[t&255]+ut[t>>8&255]+`-`+ut[t>>16&15|64]+ut[t>>24&255]+`-`+ut[n&63|128]+ut[n>>8&255]+`-`+ut[n>>16&255]+ut[n>>24&255]+ut[r&255]+ut[r>>8&255]+ut[r>>16&255]+ut[r>>24&255]).toLowerCase()}function ht(e,t,n){return Math.max(t,Math.min(n,e))}function gt(e,t){return(e%t+t)%t}function _t(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function vt(e,t,n){return e===t?0:(n-e)/(t-e)}function yt(e,t,n){return(1-n)*e+n*t}function bt(e,t,n,r){return yt(e,t,1-Math.exp(-n*r))}function xt(e,t=1){return t-Math.abs(gt(e,t*2)-t)}function St(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ct(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function wt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Tt(e,t){return e+Math.random()*(t-e)}function Et(e){return e*(.5-Math.random())}function Dt(e){e!==void 0&&(dt=e);let t=dt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ot(e){return e*ft}function kt(e){return e*pt}function At(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function jt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Mt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Nt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Pt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ft(e,t){if(t.constructor===Float32Array)return e;let n=Pt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function It(e,t){if(t.constructor===Float32Array)return e;let n=Pt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Lt={DEG2RAD:ft,RAD2DEG:pt,generateUUID:mt,clamp:ht,euclideanModulo:gt,mapLinear:_t,inverseLerp:vt,lerp:yt,damp:bt,pingpong:xt,smoothstep:St,smootherstep:Ct,randInt:wt,randFloat:Tt,randFloatSpread:Et,seededRandom:Dt,degToRad:Ot,radToDeg:kt,isPowerOfTwo:At,ceilPowerOfTwo:jt,floorPowerOfTwo:Mt,setQuaternionFromProperEuler:Nt,normalize:It,denormalize:Ft};o=Symbol.iterator;var V=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=V,e.prototype.isVector2=!0;var Rt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var H=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zt.copy(this).projectOnVector(e),this.sub(zt)}reflect(e){return this.sub(zt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=H,t.prototype.isVector3=!0;var zt=new H,Bt=new Rt,U=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return ot(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Vt.makeScale(e,t)),this}rotate(e){return ot(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Vt.makeRotation(-e)),this}translate(e,t){return ot(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Vt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=U,n.prototype.isMatrix3=!0;var Vt=new U,Ht=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ut=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wt(){let e={enabled:!0,workingColorSpace:qe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Kt(e.r),e.g=Kt(e.g),e.b=Kt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=qt(e.r),e.g=qt(e.g),e.b=qt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Je:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[qe]:{primaries:t,whitePoint:r,transfer:Je,toXYZ:Ht,fromXYZ:Ut,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:r,transfer:Ye,toXYZ:Ht,fromXYZ:Ut,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),e}var Gt=Wt();function Kt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function qt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Jt,Yt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Jt===void 0&&(Jt=tt(`canvas`)),Jt.width=e.width,Jt.height=e.height;let t=Jt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Jt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=tt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Kt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Kt(t[e]/255)*255):t[e]=Kt(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Xt=0,Zt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Xt++}),this.uuid=mt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Qt(r[t].image)):e.push(Qt(r[t]))}else e=Qt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Qt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Yt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var $t=0,en=new H,tn=class e extends lt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=M,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$t++}),this.uuid=mt(),this.name=``,this.source=new Zt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(en).x}get height(){return this.source.getSize(en).y}get depth(){return this.source.getSize(en).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null,tn.DEFAULT_MAPPING=300,tn.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var nn=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=nn,r.prototype.isVector4=!0;var rn=class extends lt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new nn(0,0,e,t),this.scissorTest=!1,this.viewport=new nn(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new tn({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Zt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},an=class extends rn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},on=class extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},sn=class extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},W=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/cn.setFromMatrixColumn(e,0).length(),i=1/cn.setFromMatrixColumn(e,1).length(),a=1/cn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(un,e,dn)}lookAt(e,t,n){let r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),fn.crossVectors(n,mn),fn.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),fn.crossVectors(n,mn)),fn.normalize(),pn.crossVectors(mn,fn),r[0]=fn.x,r[4]=pn.x,r[8]=mn.x,r[1]=fn.y,r[5]=pn.y,r[9]=mn.y,r[2]=fn.z,r[6]=pn.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],N=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*N,i[12]=a*w+o*O+s*ee+c*ne,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*N,i[13]=l*w+u*O+d*ee+f*ne,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*N,i[14]=p*w+m*O+h*ee+g*ne,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*N,i[15]=_*w+v*O+y*ee+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=cn.set(r[0],r[1],r[2]).length(),o=cn.set(r[4],r[5],r[6]).length(),s=cn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ln.copy(this);let c=1/a,l=1/o,u=1/s;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=l,ln.elements[5]*=l,ln.elements[6]*=l,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,t.setFromRotationMatrix(ln),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Qe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Qe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=W,i.prototype.isMatrix4=!0;var cn=new H,ln=new W,un=new H(0,0,0),dn=new H(1,1,1),fn=new H,pn=new H,mn=new H,hn=new W,gn=new Rt,_n=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ht(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ht(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gn.setFromEuler(this),this.setFromQuaternion(gn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER=`XYZ`;var vn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},yn=0,bn=new H,xn=new Rt,Sn=new W,Cn=new H,wn=new H,Tn=new H,En=new Rt,Dn=new H(1,0,0),On=new H(0,1,0),kn=new H(0,0,1),An={type:`added`},jn={type:`removed`},Mn={type:`childadded`,child:null},Nn={type:`childremoved`,child:null},Pn=class e extends lt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yn++}),this.uuid=mt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new _n,r=new Rt,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new W},normalMatrix:{value:new U}}),this.matrix=new W,this.matrixWorld=new W,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xn.setFromAxisAngle(e,t),this.quaternion.multiply(xn),this}rotateOnWorldAxis(e,t){return xn.setFromAxisAngle(e,t),this.quaternion.premultiply(xn),this}rotateX(e){return this.rotateOnAxis(Dn,e)}rotateY(e){return this.rotateOnAxis(On,e)}rotateZ(e){return this.rotateOnAxis(kn,e)}translateOnAxis(e,t){return bn.copy(e).applyQuaternion(this.quaternion),this.position.add(bn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dn,e)}translateY(e){return this.translateOnAxis(On,e)}translateZ(e){return this.translateOnAxis(kn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cn.copy(e):Cn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),wn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(wn,Cn,this.up):Sn.lookAt(Cn,wn,this.up),this.quaternion.setFromRotationMatrix(Sn),r&&(Sn.extractRotation(r.matrixWorld),xn.setFromRotationMatrix(Sn),this.quaternion.premultiply(xn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jn),Nn.child=e,this.dispatchEvent(Nn),Nn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,e,Tn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,En,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Pn.DEFAULT_UP=new H(0,1,0),Pn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fn=class extends Pn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},In={type:`move`},Ln=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(In)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Rn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Bn={h:0,s:0,l:0};function Vn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ke){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Gt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Gt.workingColorSpace){if(e=gt(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Vn(i,r,e+1/3),this.g=Vn(i,r,e),this.b=Vn(i,r,e-1/3)}return Gt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ke){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ke){let n=Rn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kt(e.r),this.g=Kt(e.g),this.b=Kt(e.b),this}copyLinearToSRGB(e){return this.r=qt(e.r),this.g=qt(e.g),this.b=qt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ke){return Gt.workingToColorSpace(Hn.copy(this),e),Math.round(ht(Hn.r*255,0,255))*65536+Math.round(ht(Hn.g*255,0,255))*256+Math.round(ht(Hn.b*255,0,255))}getHexString(e=Ke){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gt.workingColorSpace){Gt.workingToColorSpace(Hn.copy(this),t);let n=Hn.r,r=Hn.g,i=Hn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Gt.workingColorSpace){return Gt.workingToColorSpace(Hn.copy(this),t),e.r=Hn.r,e.g=Hn.g,e.b=Hn.b,e}getStyle(e=Ke){Gt.workingToColorSpace(Hn.copy(this),e);let t=Hn.r,n=Hn.g,r=Hn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Bn);let n=yt(zn.h,Bn.h,t),r=yt(zn.s,Bn.s,t),i=yt(zn.l,Bn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Hn=new G;G.NAMES=Rn;var Un=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new G(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Wn=class extends Pn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gn=new H,Kn=new H,qn=new H,Jn=new H,Yn=new H,Xn=new H,Zn=new H,Qn=new H,$n=new H,er=new H,tr=new nn,nr=new nn,rr=new nn,ir=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Gn.subVectors(e,t),r.cross(Gn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Gn.subVectors(r,t),Kn.subVectors(n,t),qn.subVectors(e,t);let a=Gn.dot(Gn),o=Gn.dot(Kn),s=Gn.dot(qn),c=Kn.dot(Kn),l=Kn.dot(qn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Jn)!==null&&Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Jn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Jn.x),s.addScaledVector(a,Jn.y),s.addScaledVector(o,Jn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return tr.setScalar(0),nr.setScalar(0),rr.setScalar(0),tr.fromBufferAttribute(e,t),nr.fromBufferAttribute(e,n),rr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(tr,i.x),a.addScaledVector(nr,i.y),a.addScaledVector(rr,i.z),a}static isFrontFacing(e,t,n,r){return Gn.subVectors(n,t),Kn.subVectors(e,t),Gn.cross(Kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Gn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Yn.subVectors(r,n),Xn.subVectors(i,n),Qn.subVectors(e,n);let s=Yn.dot(Qn),c=Xn.dot(Qn);if(s<=0&&c<=0)return t.copy(n);$n.subVectors(e,r);let l=Yn.dot($n),u=Xn.dot($n);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Yn,a);er.subVectors(e,i);let f=Yn.dot(er),p=Xn.dot(er);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Xn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Zn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Zn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Yn,a).addScaledVector(Xn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ar=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=sr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,sr):sr.fromBufferAttribute(r,t),sr.applyMatrix4(e.matrixWorld),this.expandByPoint(sr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),cr.copy(e.boundingBox)),cr.applyMatrix4(e.matrixWorld),this.union(cr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sr),sr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),gr.subVectors(this.max,hr),lr.subVectors(e.a,hr),ur.subVectors(e.b,hr),dr.subVectors(e.c,hr),fr.subVectors(ur,lr),pr.subVectors(dr,ur),mr.subVectors(lr,dr);let t=[0,-fr.z,fr.y,0,-pr.z,pr.y,0,-mr.z,mr.y,fr.z,0,-fr.x,pr.z,0,-pr.x,mr.z,0,-mr.x,-fr.y,fr.x,0,-pr.y,pr.x,0,-mr.y,mr.x,0];return!yr(t,lr,ur,dr,gr)||(t=[1,0,0,0,1,0,0,0,1],!yr(t,lr,ur,dr,gr))?!1:(_r.crossVectors(fr,pr),t=[_r.x,_r.y,_r.z],yr(t,lr,ur,dr,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(or)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},or=[new H,new H,new H,new H,new H,new H,new H,new H],sr=new H,cr=new ar,lr=new H,ur=new H,dr=new H,fr=new H,pr=new H,mr=new H,hr=new H,gr=new H,_r=new H,vr=new H;function yr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){vr.fromArray(e,a);let o=i.x*Math.abs(vr.x)+i.y*Math.abs(vr.y)+i.z*Math.abs(vr.z),s=t.dot(vr),c=n.dot(vr),l=r.dot(vr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var br=new H,xr=new V,Sr=0,Cr=class extends lt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ze,this.updateRanges=[],this.gpuType=w,this.version=0,this._normalizationScale=e===void 0?void 0:Pt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix4(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyNormalMatrix(e),this.setXYZ(t,br.x,br.y,br.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.transformDirection(e),this.setXYZ(t,br.x,br.y,br.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Ft(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?It(e,this.array):Math.round(e*t)}},wr=class extends Cr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Tr=class extends Cr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Er=class extends Cr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dr=new ar,Or=new H,kr=new H,Ar=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Dr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Or,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(kr)),this.expandByPoint(Or.copy(e.center).sub(kr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},jr=0,Mr=new W,Nr=new Pn,Pr=new H,Fr=new ar,Ir=new ar,Lr=new H,Rr=class e extends lt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jr++}),this.uuid=mt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new($e(e)?Tr:wr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new U().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mr.makeRotationFromQuaternion(e),this.applyMatrix4(Mr),this}rotateX(e){return Mr.makeRotationX(e),this.applyMatrix4(Mr),this}rotateY(e){return Mr.makeRotationY(e),this.applyMatrix4(Mr),this}rotateZ(e){return Mr.makeRotationZ(e),this.applyMatrix4(Mr),this}translate(e,t,n){return Mr.makeTranslation(e,t,n),this.applyMatrix4(Mr),this}scale(e,t,n){return Mr.makeScale(e,t,n),this.applyMatrix4(Mr),this}lookAt(e){return Nr.lookAt(e),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Er(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fr.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(this.boundingBox.min,Fr.min),this.boundingBox.expandByPoint(Lr),Lr.addVectors(this.boundingBox.max,Fr.max),this.boundingBox.expandByPoint(Lr)):(this.boundingBox.expandByPoint(Fr.min),this.boundingBox.expandByPoint(Fr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);else if(e){let n=this.boundingSphere.center;if(Fr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ir.setFromBufferAttribute(n),this.morphTargetsRelative?(Lr.addVectors(Fr.min,Ir.min),Fr.expandByPoint(Lr),Lr.addVectors(Fr.max,Ir.max),Fr.expandByPoint(Lr)):(Fr.expandByPoint(Ir.min),Fr.expandByPoint(Ir.max))}Fr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Lr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Lr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Lr.fromBufferAttribute(a,t),o&&(Pr.fromBufferAttribute(e,t),Lr.add(Pr)),r=Math.max(r,n.distanceToSquared(Lr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Cr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let l=new H,u=new H,d=new H,f=new V,p=new V,m=new V,h=new H,g=new H;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new H,b=new H,x=new H,S=new H;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Cr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lr.fromBufferAttribute(e,t),Lr.normalize(),e.setXYZ(t,Lr.x,Lr.y,Lr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Cr(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ze,this.updateRanges=[],this.version=0,this.uuid=mt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Br(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Br(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Br(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=mt()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var Vr=new H,Hr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:Pt(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vr.fromBufferAttribute(this,t),Vr.applyMatrix4(e),this.setXYZ(t,Vr.x,Vr.y,Vr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vr.fromBufferAttribute(this,t),Vr.applyNormalMatrix(e),this.setXYZ(t,Vr.x,Vr.y,Vr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vr.fromBufferAttribute(this,t),Vr.transformDirection(e),this.setXYZ(t,Vr.x,Vr.y,Vr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){it(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Cr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){it(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?Ft(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?It(e,this.data.array):Math.round(e*t)}},Ur=new H,Wr=new H,Gr=new U,Kr=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ur.subVectors(n,t).cross(Wr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ur),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Gr.getNormalMatrix(e),r=this.coplanarPoint(Ur).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},qr=0,Jr=class extends lt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qr++}),this.uuid=mt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xe,this.stencilZFail=Xe,this.stencilZPass=Xe,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Kr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Yr=class extends Jr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xr,Zr=new H,Qr=new H,$r=new H,ei=new V,ti=new V,ni=new W,ri=new H,ii=new H,ai=new H,oi=new V,si=new V,ci=new V,li=class extends Pn{constructor(e=new Yr){if(super(),this.isSprite=!0,this.type=`Sprite`,Xr===void 0){Xr=new Rr;let e=new zr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Xr.setIndex([0,1,2,0,2,3]),Xr.setAttribute(`position`,new Hr(e,3,0,!1)),Xr.setAttribute(`uv`,new Hr(e,2,3,!1))}this.geometry=Xr,this.material=e,this.center=new V(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&B(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Qr.setFromMatrixScale(this.matrixWorld),ni.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$r.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qr.multiplyScalar(-$r.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ui(ri.set(-.5,-.5,0),$r,a,Qr,r,i),ui(ii.set(.5,-.5,0),$r,a,Qr,r,i),ui(ai.set(.5,.5,0),$r,a,Qr,r,i),oi.set(0,0),si.set(1,0),ci.set(1,1);let o=e.ray.intersectTriangle(ri,ii,ai,!1,Zr);if(o===null&&(ui(ii.set(-.5,.5,0),$r,a,Qr,r,i),si.set(0,1),o=e.ray.intersectTriangle(ri,ai,ii,!1,Zr),o===null))return;let s=e.ray.origin.distanceTo(Zr);s<e.near||s>e.far||t.push({distance:s,point:Zr.clone(),uv:ir.getInterpolation(Zr,ri,ii,ai,oi,si,ci,new V),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function ui(e,t,n,r,i,a){ei.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?ti.copy(ei):(ti.x=a*ei.x-i*ei.y,ti.y=i*ei.x+a*ei.y),e.copy(t),e.x+=ti.x,e.y+=ti.y,e.applyMatrix4(ni)}var di=new H,fi=new H,pi=new H,mi=new H,hi=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){fi.copy(e).add(t).multiplyScalar(.5),pi.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(fi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(pi),o=mi.dot(this.direction),s=-mi.dot(pi),c=mi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(fi).addScaledVector(pi,d),f}intersectSphere(e,t){if(e.radius<0)return null;di.subVectors(e.center,this.origin);let n=di.dot(this.direction),r=di.dot(di)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,N=C/w,ne=1/w,re=T-te*D,ie=E-N*D,ae=O-te*A,oe=k-N*A,se=j-te*M,ce=ee-N*M,le=se*oe-ce*ae,P=re*ce-ie*se,ue=ae*ie-oe*re;if(r){if(le<0||P<0||ue<0)return null}else if((le<0||P<0||ue<0)&&(le>0||P>0||ue>0))return null;let de=le+P+ue;if(de===0)return null;let fe=ne*(le*D+P*A+ue*M);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gi=class extends Jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},_i=new W,vi=new hi,yi=new Ar,bi=new H,xi=new H,Si=new H,Ci=new H,wi=new H,Ti=new H,Ei=new H,Di=new H,K=class extends Pn{constructor(e=new Rr,t=new gi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ti.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(wi.fromBufferAttribute(s,e),a?Ti.addScaledVector(wi,r):Ti.addScaledVector(wi.sub(t),r))}t.add(Ti)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yi.copy(n.boundingSphere),yi.applyMatrix4(i),vi.copy(e.ray).recast(e.near),yi.containsPoint(vi.origin)===!1&&(vi.intersectSphere(yi,bi)===null||vi.origin.distanceToSquared(bi)>(e.far-e.near)**2)||(_i.copy(i).invert(),vi.copy(e.ray).applyMatrix4(_i),(n.boundingBox===null||vi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ki(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ki(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ki(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ki(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Oi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Di.copy(s),Di.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Di);return l<n.near||l>n.far?null:{distance:l,point:Di.clone(),object:e}}function ki(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,xi),e.getVertexPosition(c,Si),e.getVertexPosition(l,Ci);let u=Oi(e,t,n,r,xi,Si,Ci,Ei);if(u){let e=new H;ir.getBarycoord(Ei,xi,Si,Ci,e),i&&(u.uv=ir.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=ir.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=ir.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};ir.getNormal(xi,Si,Ci,t.normal),u.face=t,u.barycoord=e}return u}var Ai=class extends tn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ji=class extends Cr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Mi=new W,Ni=new W,Pi=[],Fi=new ar,Ii=new W,Li=new K,Ri=new Ar,zi=class extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ji(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ii)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ar),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),Fi.copy(e.boundingBox).applyMatrix4(Mi),this.boundingBox.union(Fi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ar),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),Ri.copy(e.boundingSphere).applyMatrix4(Mi),this.boundingSphere.union(Ri)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Li.geometry=this.geometry,Li.material=this.material,Li.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ri.copy(this.boundingSphere),Ri.applyMatrix4(n),e.ray.intersectsSphere(Ri)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Mi),Ni.multiplyMatrices(n,Mi),Li.matrixWorld=Ni,Li.raycast(e,Pi);for(let e=0,n=Pi.length;e<n;e++){let n=Pi[e];n.instanceId=i,n.object=this,t.push(n)}Pi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ji(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ai(new Float32Array(r*this.count),r,this.count,ne,w));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Bi=new Ar,Vi=new V(.5,.5),Hi=new H,Ui=class{constructor(e=new Kr,t=new Kr,n=new Kr,r=new Kr,i=new Kr,a=new Kr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476+Vi.distanceTo(e.center),Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Hi.x=r.normal.x>0?e.max.x:e.min.x,Hi.y=r.normal.y>0?e.max.y:e.min.y,Hi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wi=new W,Gi=class e{constructor(){this.coordinateSystem=Qe,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Wi.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Ui),n[e].setFromProjectionMatrix(Wi,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Ui),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Ki=class extends Jr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},qi=new H,Ji=new H,Yi=new W,Xi=new hi,Zi=new Ar,Qi=new H,$i=new H,ea=class extends Pn{constructor(e=new Rr,t=new Ki){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)qi.fromBufferAttribute(t,e-1),Ji.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=qi.distanceTo(Ji);e.setAttribute(`lineDistance`,new Er(n,1))}else z(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zi.copy(n.boundingSphere),Zi.applyMatrix4(r),Zi.radius+=i,e.ray.intersectsSphere(Zi)===!1)return;Yi.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(Yi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ta(this,e,Xi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ta(this,e,Xi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ta(this,e,Xi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ta(this,e,Xi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ta(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(qi.fromBufferAttribute(s,i),Ji.fromBufferAttribute(s,a),n.distanceSqToSegment(qi,Ji,Qi,$i)>r)return;Qi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Qi);if(!(c<t.near||c>t.far))return{distance:c,point:$i.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var na=new H,ra=new H,ia=class extends ea{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)na.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+na.distanceTo(ra);e.setAttribute(`lineDistance`,new Er(n,1))}else z(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},aa=class extends Jr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},oa=new W,sa=new hi,ca=new Ar,la=new H,ua=class extends Pn{constructor(e=new Rr,t=new aa){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(r),ca.radius+=i,e.ray.intersectsSphere(ca)===!1)return;oa.copy(r).invert(),sa.copy(e.ray).applyMatrix4(oa);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);la.fromBufferAttribute(l,n),da(la,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)la.fromBufferAttribute(l,a),da(la,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function da(e,t,n,r,i,a,o){let s=sa.distanceSqToPoint(e);if(s<n){let n=new H;sa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var fa=class extends tn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pa=class extends tn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ma=class extends tn{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=te,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ha=class extends ma{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=te){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ga=class extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},_a=class e extends Rr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Er(c,3)),this.setAttribute(`normal`,new Er(l,3)),this.setAttribute(`uv`,new Er(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},va=class e extends Rr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new H,l=new V;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Er(a,3)),this.setAttribute(`normal`,new Er(o,3)),this.setAttribute(`uv`,new Er(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ya=class e extends Rr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Er(u,3)),this.setAttribute(`normal`,new Er(d,3)),this.setAttribute(`uv`,new Er(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new V,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ba=class e extends ya{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},xa=class e extends Rr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Er(i,3)),this.setAttribute(`normal`,new Er(i.slice(),3)),this.setAttribute(`uv`,new Er(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new H,r=new H,i=new H;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new H;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new H;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new H,t=new H,n=new H,r=new H,o=new V,s=new V,c=new V;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Sa=new H,Ca=new H,wa=new H,Ta=new ir,Ea=class extends Rr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=1e4,r=Math.cos(ft*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u=new Map,d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=Ta;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),Ta.getNormal(wa),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=Ta[c[e]],o=Ta[c[t]],f=`${n}_${i}`,p=`${i}_${n}`,m=u.get(p);m?(wa.dot(m.normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u.set(p,null)):u.has(f)||u.set(f,{index0:s[e],index1:s[t],normal:wa.clone()})}}for(let e of u.values())if(e){let{index0:t,index1:n}=e;Sa.fromBufferAttribute(a,t),Ca.fromBufferAttribute(a,n),d.push(Sa.x,Sa.y,Sa.z),d.push(Ca.x,Ca.y,Ca.z)}this.setAttribute(`position`,new Er(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Da=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){z(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new V:new H);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new H,r=[],i=[],a=[],o=new H,s=new W;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new H)}i[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(ht(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(ht(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Oa=class extends Da{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new V){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ka=class extends Oa{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Aa(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ja=new H,Ma=new H,Na=new Aa,Pa=new Aa,Fa=new Aa,Ia=class extends Da{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new H){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ma.subVectors(r[0],r[1]).add(r[0]),c=Ma);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ja.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ja),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Na.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Pa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Fa.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Na.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Pa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Fa.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Na.calc(s),Pa.calc(s),Fa.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function La(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ra(e,t){let n=1-e;return n*n*t}function za(e,t){return 2*(1-e)*e*t}function Ba(e,t){return e*e*t}function Va(e,t,n,r){return Ra(e,t)+za(e,n)+Ba(e,r)}function Ha(e,t){let n=1-e;return n*n*n*t}function Ua(e,t){let n=1-e;return 3*n*n*e*t}function Wa(e,t){return 3*(1-e)*e*e*t}function Ga(e,t){return e*e*e*t}function Ka(e,t,n,r,i){return Ha(e,t)+Ua(e,n)+Wa(e,r)+Ga(e,i)}var qa=class extends Da{constructor(e=new V,t=new V,n=new V,r=new V){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ka(e,r.x,i.x,a.x,o.x),Ka(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ja=class extends Da{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ka(e,r.x,i.x,a.x,o.x),Ka(e,r.y,i.y,a.y,o.y),Ka(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ya=class extends Da{constructor(e=new V,t=new V){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends Da{constructor(e=new H,t=new H){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Za=class extends Da{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Va(e,r.x,i.x,a.x),Va(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends Da{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Va(e,r.x,i.x,a.x),Va(e,r.y,i.y,a.y),Va(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$a=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:Ia,CubicBezierCurve:qa,CubicBezierCurve3:Ja,EllipseCurve:Oa,LineCurve:Ya,LineCurve3:Xa,QuadraticBezierCurve:Za,QuadraticBezierCurve3:Qa,SplineCurve:class extends Da{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new V){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(La(o,s.x,c.x,l.x,u.x),La(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new V().fromArray(n))}return this}}}),eo=class e extends xa{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},to=class e extends Rr{constructor(e=[new V(0,-.5),new V(.5,0),new V(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=ht(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new H,d=new V,f=new H,p=new H,m=new H,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new Er(a,3)),this.setAttribute(`uv`,new Er(o,2)),this.setAttribute(`normal`,new Er(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},no=class e extends Rr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Er(p,3)),this.setAttribute(`normal`,new Er(m,3)),this.setAttribute(`uv`,new Er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ro=class e extends Rr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new H,p=new V;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Er(s,3)),this.setAttribute(`normal`,new Er(c,3)),this.setAttribute(`uv`,new Er(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},io=class e extends Rr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new H,d=new H,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Er(p,3)),this.setAttribute(`normal`,new Er(m,3)),this.setAttribute(`uv`,new Er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ao=class e extends Rr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new H,f=new H,p=new H;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Er(c,3)),this.setAttribute(`normal`,new Er(l,3)),this.setAttribute(`uv`,new Er(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},oo=class e extends Rr{constructor(e=new Qa(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new H,s=new H,c=new V,l=new H,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Er(u,3)),this.setAttribute(`normal`,new Er(d,3)),this.setAttribute(`uv`,new Er(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new $a[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function so(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(lo(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(lo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function co(e){let t={};for(let n=0;n<e.length;n++){let r=so(e[n]);for(let e in r)t[e]=r[e]}return t}function lo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function uo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function fo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}var po={clone:so,merge:co},mo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ho=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,go=class extends Jr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mo,this.fragmentShader=ho,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=so(e.uniforms),this.uniformsGroups=uo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new nn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new W().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},_o=class extends go{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},vo=class extends Jr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yo=class extends vo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new V(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return ot(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){ot(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},bo=class extends Jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ge,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xo=class extends Jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function So(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Co(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var wo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},To=class extends wo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:He,endingEnd:He}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ue:i=e,o=2*t-n;break;case We:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ue:a=e,s=2*n-t;break;case We:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Eo=class extends wo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Do=class extends wo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Oo=class extends wo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=jo(n,t,g,y,r);i[p]=ko(x,o,_,b,m)}return i}};function ko(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ao(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function jo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ko(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ao(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Mo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=So(t,this.TimeBufferType),this.values=So(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:So(e.times,Array),values:So(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Co(e.settings)&&(n.settings={inTangents:So(e.settings.inTangents,Array),outTangents:So(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Do(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Oo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case R:t=this.InterpolantFactoryMethodDiscrete;break;case ze:t=this.InterpolantFactoryMethodLinear;break;case Be:t=this.InterpolantFactoryMethodSmooth;break;case Ve:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return R;case this.InterpolantFactoryMethodLinear:return ze;case this.InterpolantFactoryMethodSmooth:return Be;case this.InterpolantFactoryMethodBezier:return Ve}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Co(this.settings)&&(No(this.settings.inTangents,e),No(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Co(this.settings)&&(Po(this.settings.inTangents,e),Po(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&et(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Be,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Co(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function No(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Po(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Mo.prototype.ValueTypeName=``,Mo.prototype.TimeBufferType=Float32Array,Mo.prototype.ValueBufferType=Float32Array,Mo.prototype.DefaultInterpolation=ze;var Fo=class extends Mo{constructor(e,t,n){super(e,t,n)}};Fo.prototype.ValueTypeName=`bool`,Fo.prototype.ValueBufferType=Array,Fo.prototype.DefaultInterpolation=R,Fo.prototype.InterpolantFactoryMethodLinear=void 0,Fo.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}};Io.prototype.ValueTypeName=`color`;var Lo=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}};Lo.prototype.ValueTypeName=`number`;var Ro=class extends wo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Rt.slerpFlat(i,0,a,c-o,a,c,s);return i}},zo=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ro(this.times,this.values,this.getValueSize(),e)}};zo.prototype.ValueTypeName=`quaternion`,zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends Mo{constructor(e,t,n){super(e,t,n)}};Bo.prototype.ValueTypeName=`string`,Bo.prototype.ValueBufferType=Array,Bo.prototype.DefaultInterpolation=R,Bo.prototype.InterpolantFactoryMethodLinear=void 0,Bo.prototype.InterpolantFactoryMethodSmooth=void 0;var Vo=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}};Vo.prototype.ValueTypeName=`vector`;var Ho=class extends Pn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Uo=class extends Ho{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Wo=new W,Go=new H,Ko=new H,qo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new W,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Go.setFromMatrixPosition(e.matrixWorld),t.position.copy(Go),Ko.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ko),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Wo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Jo=new H,Yo=new Rt,Xo=new H,Zo=class extends Pn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new W,this.projectionMatrix=new W,this.projectionMatrixInverse=new W,this.coordinateSystem=Qe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jo,Yo,Xo),Xo.x===1&&Xo.y===1&&Xo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jo,Yo,Xo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Jo,Yo,Xo),Xo.x===1&&Xo.y===1&&Xo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jo,Yo,Xo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qo=new H,$o=new V,es=new V,ts=class extends Zo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ft*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pt*2*Math.atan(Math.tan(ft*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qo.x,Qo.y).multiplyScalar(-e/Qo.z),Qo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qo.x,Qo.y).multiplyScalar(-e/Qo.z)}getViewSize(e,t){return this.getViewBounds(e,$o,es),t.subVectors(es,$o)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ft*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ns=class extends qo{constructor(){super(new ts(90,1,.5,500)),this.isPointLightShadow=!0}},rs=class extends Ho{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ns}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},is=class extends Zo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},as=class extends qo{constructor(){super(new is(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},os=class extends Ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Pn.DEFAULT_UP),this.updateMatrix(),this.target=new Pn,this.shadow=new as}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ss=-90,cs=1,ls=class extends Pn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ts(ss,cs,e,t);r.layers=this.layers,this.add(r);let i=new ts(ss,cs,e,t);i.layers=this.layers,this.add(i);let a=new ts(ss,cs,e,t);a.layers=this.layers,this.add(a);let o=new ts(ss,cs,e,t);o.layers=this.layers,this.add(o);let s=new ts(ss,cs,e,t);s.layers=this.layers,this.add(s);let c=new ts(ss,cs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},us=class extends ts{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},ds=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=fs.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function fs(){this._document.hidden===!1&&this.reset()}var ps=`\\[\\]\\.:\\/`,ms=RegExp(`[\\[\\]\\.:\\/]`,`g`),hs=`[^\\[\\]\\.:\\/]`,gs=`[^`+ps.replace(`\\.`,``)+`]`,_s=`((?:WC+[\\/:])*)`.replace(`WC`,hs),vs=`(WCOD+)?`.replace(`WCOD`,gs),ys=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,hs),bs=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,hs),xs=RegExp(`^`+_s+vs+ys+bs+`$`),Ss=[`material`,`materials`,`bones`,`map`],Cs=class{constructor(e,t,n){let r=n||ws.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ws=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ms,``)}static parseTrackName(e){let t=xs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ss.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ws.Composite=Cs,ws.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ws.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ws.prototype.GetterByBindingType=[ws.prototype._getValue_direct,ws.prototype._getValue_array,ws.prototype._getValue_arrayElement,ws.prototype._getValue_toArray],ws.prototype.SetterByBindingTypeAndVersioning=[[ws.prototype._setValue_direct,ws.prototype._setValue_direct_setNeedsUpdate,ws.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_array,ws.prototype._setValue_array_setNeedsUpdate,ws.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_arrayElement,ws.prototype._setValue_arrayElement_setNeedsUpdate,ws.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_fromArray,ws.prototype._setValue_fromArray_setNeedsUpdate,ws.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function Ts(e,t,n,r){let i=Es(r);switch(n){case j:return e*t;case ne:return e*t/i.components*i.byteLength;case re:return e*t/i.components*i.byteLength;case ie:return e*t*2/i.components*i.byteLength;case ae:return e*t*2/i.components*i.byteLength;case ee:return e*t*3/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case oe:return e*t*4/i.components*i.byteLength;case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case le:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:case pe:return Math.max(e,16)*Math.max(t,8)/4;case ue:case fe:return Math.max(e,8)*Math.max(t,8)/2;case me:case he:case _e:case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ge:case ye:case be:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Se:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ce:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Te:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ee:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case De:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Oe:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ae:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case je:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Me:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ne:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Pe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case F:case Fe:case Ie:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Le:case I:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Re:case L:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Es(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case k:case A:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ds(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Os(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ks={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},As={basic:{uniforms:co([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:ks.meshbasic_vert,fragmentShader:ks.meshbasic_frag},lambert:{uniforms:co([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:ks.meshlambert_vert,fragmentShader:ks.meshlambert_frag},phong:{uniforms:co([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ks.meshphong_vert,fragmentShader:ks.meshphong_frag},standard:{uniforms:co([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ks.meshphysical_vert,fragmentShader:ks.meshphysical_frag},toon:{uniforms:co([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new G(0)}}]),vertexShader:ks.meshtoon_vert,fragmentShader:ks.meshtoon_frag},matcap:{uniforms:co([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:ks.meshmatcap_vert,fragmentShader:ks.meshmatcap_frag},points:{uniforms:co([q.points,q.fog]),vertexShader:ks.points_vert,fragmentShader:ks.points_frag},dashed:{uniforms:co([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ks.linedashed_vert,fragmentShader:ks.linedashed_frag},depth:{uniforms:co([q.common,q.displacementmap]),vertexShader:ks.depth_vert,fragmentShader:ks.depth_frag},normal:{uniforms:co([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:ks.meshnormal_vert,fragmentShader:ks.meshnormal_frag},sprite:{uniforms:co([q.sprite,q.fog]),vertexShader:ks.sprite_vert,fragmentShader:ks.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ks.background_vert,fragmentShader:ks.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:ks.backgroundCube_vert,fragmentShader:ks.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ks.cube_vert,fragmentShader:ks.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ks.equirect_vert,fragmentShader:ks.equirect_frag},distance:{uniforms:co([q.common,q.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ks.distance_vert,fragmentShader:ks.distance_frag},shadow:{uniforms:co([q.lights,q.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:ks.shadow_vert,fragmentShader:ks.shadow_frag}};As.physical={uniforms:co([As.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new U},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:ks.meshphysical_vert,fragmentShader:ks.meshphysical_frag};var js={r:0,b:0,g:0},Ms=new W,Ns=new U;Ns.set(-1,0,0,0,1,0,0,0,1);function Ps(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new K(new _a(1,1,1),new go({name:`BackgroundCubeMaterial`,uniforms:so(As.backgroundCube.uniforms),vertexShader:As.backgroundCube.vertexShader,fragmentShader:As.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ms.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ns),l.material.toneMapped=Gt.getTransfer(i.colorSpace)!==Ye,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new K(new no(2,2),new go({name:`BackgroundMaterial`,uniforms:so(As.background.uniforms),vertexShader:As.background.vertexShader,fragmentShader:As.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Gt.getTransfer(i.colorSpace)!==Ye,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(js,fo(e)),n.buffers.color.setClear(js.r,js.g,js.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Fs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Is(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ls(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&z(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Rs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Kr,s=new U,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var zs=class extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new fa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new _a(5,5,5),i=new go({name:`CubemapFromEquirect`,uniforms:so(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new K(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new ls(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Bs=256,Vs=3,Hs=20,Us=256,Ws=16,Gs=3,Ks=new H,qs=new G,Js=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ls(1,10,null),this._boxMesh=new K(new _a(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ks}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(qs));let h=new ls(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Bs,Mt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Bs:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ys(e,!1,!1),n=Math.log2(e)-Vs;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ys(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=tc()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ec()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Zs(),this._integrationMaterial=Qs());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Ws);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Gs)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Us*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=$s());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Ys(e,t,n){return new zs(e,{minFilter:_,generateMipmaps:t,type:T,colorSpace:qe,depthBuffer:n})}function Xs(e,t,n){return new go({name:e,uniforms:t,vertexShader:ks.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Zs(){return Xs(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Us}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qs(){return Xs(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ws}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $s(){return Xs(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Hs}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ec(){return Xs(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tc(){return Xs(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function nc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new zs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Js(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Js(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function rc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&ot(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ic(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Tr:wr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function ac(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function oc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function sc(e,t,n){let r=new WeakMap,i=new nn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new on(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new V(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function cc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var lc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function uc(e,t,n,r,i,a){let o=new an(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Rr;u.setAttribute(`position`,new Er([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Er([0,2,0,0,2,0],2));let d=new _o({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new K(u,d),p=new is(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new an(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new an(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new ma(t,n),a===!0&&(l.format=N,l.type=O)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Gt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=lc[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var dc=new tn,fc=new ma(1,1),pc=new ha(1),mc=new on,hc=new sn,gc=new fa,_c=[],vc=[],yc=new Float32Array(16),bc=new Float32Array(9),xc=new Float32Array(4);function Sc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=_c[i];if(a===void 0&&(a=new Float32Array(i),_c[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Cc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function wc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Tc(e,t){let n=vc[t];n===void 0&&(n=new Int32Array(t),vc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ec(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cc(n,t))return;e.uniform2fv(this.addr,t),wc(n,t)}}function Oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Cc(n,t))return;e.uniform3fv(this.addr,t),wc(n,t)}}function kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cc(n,t))return;e.uniform4fv(this.addr,t),wc(n,t)}}function Ac(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),wc(n,t)}else{if(Cc(n,r))return;xc.set(r),e.uniformMatrix2fv(this.addr,!1,xc),wc(n,r)}}function jc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),wc(n,t)}else{if(Cc(n,r))return;bc.set(r),e.uniformMatrix3fv(this.addr,!1,bc),wc(n,r)}}function Mc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Cc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),wc(n,t)}else{if(Cc(n,r))return;yc.set(r),e.uniformMatrix4fv(this.addr,!1,yc),wc(n,r)}}function Nc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cc(n,t))return;e.uniform2iv(this.addr,t),wc(n,t)}}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cc(n,t))return;e.uniform3iv(this.addr,t),wc(n,t)}}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cc(n,t))return;e.uniform4iv(this.addr,t),wc(n,t)}}function Lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Cc(n,t))return;e.uniform2uiv(this.addr,t),wc(n,t)}}function zc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Cc(n,t))return;e.uniform3uiv(this.addr,t),wc(n,t)}}function Bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Cc(n,t))return;e.uniform4uiv(this.addr,t),wc(n,t)}}function Vc(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Hc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Vc(fc):dc,n.setTexture2D(t||a,i)}function Uc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||hc,i)}function Wc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Vc(pc):gc,n.setTextureCube(t||a,i)}function Gc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||mc,i)}function Kc(e){switch(e){case 5126:return Ec;case 35664:return Dc;case 35665:return Oc;case 35666:return kc;case 35674:return Ac;case 35675:return jc;case 35676:return Mc;case 5124:case 35670:return Nc;case 35667:case 35671:return Pc;case 35668:case 35672:return Fc;case 35669:case 35673:return Ic;case 5125:return Lc;case 36294:return Rc;case 36295:return zc;case 36296:return Bc;case 35678:case 36198:case 36298:case 36306:case 35682:return Hc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Wc;case 36289:case 36303:case 36311:case 36292:return Gc}}function qc(e,t){e.uniform1fv(this.addr,t)}function Jc(e,t){let n=Sc(t,this.size,2);e.uniform2fv(this.addr,n)}function Yc(e,t){let n=Sc(t,this.size,3);e.uniform3fv(this.addr,n)}function Xc(e,t){let n=Sc(t,this.size,4);e.uniform4fv(this.addr,n)}function Zc(e,t){let n=Sc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Qc(e,t){let n=Sc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $c(e,t){let n=Sc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function el(e,t){e.uniform1iv(this.addr,t)}function tl(e,t){e.uniform2iv(this.addr,t)}function nl(e,t){e.uniform3iv(this.addr,t)}function rl(e,t){e.uniform4iv(this.addr,t)}function il(e,t){e.uniform1uiv(this.addr,t)}function al(e,t){e.uniform2uiv(this.addr,t)}function ol(e,t){e.uniform3uiv(this.addr,t)}function sl(e,t){e.uniform4uiv(this.addr,t)}function cl(e,t,n){let r=this.cache,i=t.length,a=Tc(n,i);Cc(r,a)||(e.uniform1iv(this.addr,a),wc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Vc(fc):dc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ll(e,t,n){let r=this.cache,i=t.length,a=Tc(n,i);Cc(r,a)||(e.uniform1iv(this.addr,a),wc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||hc,a[e])}function ul(e,t,n){let r=this.cache,i=t.length,a=Tc(n,i);Cc(r,a)||(e.uniform1iv(this.addr,a),wc(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Vc(pc):gc;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function dl(e,t,n){let r=this.cache,i=t.length,a=Tc(n,i);Cc(r,a)||(e.uniform1iv(this.addr,a),wc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||mc,a[e])}function fl(e){switch(e){case 5126:return qc;case 35664:return Jc;case 35665:return Yc;case 35666:return Xc;case 35674:return Zc;case 35675:return Qc;case 35676:return $c;case 5124:case 35670:return el;case 35667:case 35671:return tl;case 35668:case 35672:return nl;case 35669:case 35673:return rl;case 5125:return il;case 36294:return al;case 36295:return ol;case 36296:return sl;case 35678:case 36198:case 36298:case 36306:case 35682:return cl;case 35679:case 36299:case 36307:return ll;case 35680:case 36300:case 36308:case 36293:return ul;case 36289:case 36303:case 36311:case 36292:return dl}}var pl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kc(t.type)}},ml=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fl(t.type)}},hl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function _l(e,t){e.seq.push(t),e.map[t.id]=t}function vl(e,t,n){let r=e.name,i=r.length;for(gl.lastIndex=0;;){let a=gl.exec(r),o=gl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){_l(n,l===void 0?new pl(s,e,t):new ml(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new hl(s),_l(n,e)),n=e}}}var yl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);vl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function bl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var xl=37297,Sl=0;function Cl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var wl=new U;function Tl(e){Gt._getMatrix(wl,Gt.workingColorSpace,e);let t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(e)){case Je:return[t,`LinearTransferOETF`];case Ye:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function El(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Cl(e.getShaderSource(t),r)}return i}function Dl(e,t){let n=Tl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Ol={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function kl(e,t){let n=Ol[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Al=new H;function jl(){return Gt.getLuminanceCoefficients(Al),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Al.x.toFixed(4)}, ${Al.y.toFixed(4)}, ${Al.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ml(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fl).join(`
`)}function Nl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Pl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fl(e){return e!==``}function Il(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Ll(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rl=/^[ \t]*#include +<([\w\d./]+)>/gm;function zl(e){return e.replace(Rl,Bl)}function Bl(e,t){let n=ks[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return zl(n)}var Vl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(e){return e.replace(Vl,Ul)}function Ul(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Wl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Gl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Kl(e){return Gl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ql={302:`ENVMAP_MODE_REFRACTION`};function Jl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ql[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yl[e.combine]||`ENVMAP_BLENDING_NONE`}function Zl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Kl(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Jl(n),d=Xl(n),f=Ml(n),p=Nl(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fl).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fl).join(`
`),g.length>0&&(g+=`
`)):(h=[Wl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fl).join(`
`),g=[Wl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ks.tonemapping_pars_fragment,n.toneMapping===0?``:kl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ks.colorspace_pars_fragment,Dl(`linearToOutputTexel`,n.outputColorSpace),jl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fl).join(`
`)),o=zl(o),o=Il(o,n),o=Ll(o,n),s=zl(s),s=Il(s,n),s=Ll(s,n),o=Hl(o),s=Hl(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=bl(i,i.VERTEX_SHADER,v),x=bl(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=El(i,b,`vertex`),n=El(i,x,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new yl(i,m),w=Pl(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,xl)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Sl++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Ql=0,$l=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new eu(e),t.set(e,n)),n}},eu=class{constructor(e){this.id=Ql++,this.code=e,this.usedTimes=0}};function tu(e){return e===1030||e===37490||e===36285}function nu(e,t,n,r,i,a){let o=new vn,s=new $l,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=As[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,te=!!i.map,N=!!i.matcap,ne=!!b,re=ne&&b.isPMREMTexture===!0,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.diffuseRoughness>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=de&&!!i.anisotropyMap,be=fe&&!!i.clearcoatMap,xe=fe&&!!i.clearcoatNormalMap,Se=fe&&!!i.clearcoatRoughnessMap,Ce=pe&&!!i.diffuseRoughnessMap,we=ge&&!!i.iridescenceMap,Te=ge&&!!i.iridescenceThicknessMap,Ee=_e&&!!i.sheenColorMap,De=_e&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=ve&&!!i.transmissionMap,Me=ve&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,F=i.alphaTest>0,Fe=!!i.alphaHash,Ie=!!i.extensions,Le=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Le=e.toneMapping);let I=re?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Re={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Gt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:N,envMap:ne,envMapMode:ne&&b.mapping,envMapPMREM:re,envMapMaxLod:re?I.length-1:null,envMapSize:re?I[0].width:null,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&tu(i.normalMap.format),metalnessMap:P,roughnessMap:ue,anisotropy:de,anisotropyMap:ye,clearcoat:fe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,diffuseRoughness:pe,diffuseRoughnessMap:Ce,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:_e,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:ve,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:F,alphaHash:Fe,combine:i.combine,mapUv:te&&p(i.map.channel),aoMapUv:ie&&p(i.aoMap.channel),lightMapUv:ae&&p(i.lightMap.channel),bumpMapUv:oe&&p(i.bumpMap.channel),normalMapUv:se&&p(i.normalMap.channel),displacementMapUv:ce&&p(i.displacementMap.channel),emissiveMapUv:le&&p(i.emissiveMap.channel),metalnessMapUv:P&&p(i.metalnessMap.channel),roughnessMapUv:ue&&p(i.roughnessMap.channel),anisotropyMapUv:ye&&p(i.anisotropyMap.channel),clearcoatMapUv:be&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Ce&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:we&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&p(i.sheenRoughnessMap.channel),specularMapUv:Oe&&p(i.specularMap.channel),specularColorMapUv:ke&&p(i.specularColorMap.channel),specularIntensityMapUv:Ae&&p(i.specularIntensityMap.channel),transmissionMapUv:je&&p(i.transmissionMap.channel),thicknessMapUv:Me&&p(i.thicknessMap.channel),alphaMapUv:Pe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(se||de),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(te||Pe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&Gt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ie&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ie&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=As[t];n=po.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Zl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function ru(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function iu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function au(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ou(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||iu),r.length>1&&r.sort(t||au),i.length>1&&i.sort(t||au)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function su(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ou,e.set(t,[i])):n>=r.length?(i=new ou,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function cu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new G};break;case`SpotLight`:n={position:new H,direction:new H,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function lu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var uu=0;function du(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function fu(e){let t=new cu,n=lu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new W,o=new W;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(du);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=uu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function pu(e){let t=new fu(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function mu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new pu(e),t.set(n,[a])):r>=i.length?(a=new pu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var hu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_u=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],vu=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],yu=new W,bu=new H,xu=new H;function Su(e,t,n){let r=new Ui,i=new V,a=new V,o=new nn,s=new bo,c=new xo,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new go({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:hu,fragmentShader:gu}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Rr;g.setAttribute(`position`,new Cr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new K(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new an(i.x,i.y,{format:ie,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ma(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=te,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new zs(i.x),d.map.depthTexture=new ha(i.x,C)):(d.map=new an(i.x,i.y),d.map.depthTexture=new ma(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=te,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let y=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),bu.setFromMatrixPosition(l.matrixWorld),e.position.copy(bu),xu.copy(e.position),xu.add(_u[t]),e.up.copy(vu[t]),e.lookAt(xu),e.updateMatrixWorld(),n.makeTranslation(-bu.x,-bu.y,-bu.z),yu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(yu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,y,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new an(i.x,i.y,{format:ie,type:T}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=x(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Cu(e,t){function n(){let t=!1,n=new nn,r=null,i=new nn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ct[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(N)[1]),M=te>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new nn().fromArray(ie),se=new nn().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),P(e.CULL_FACE),ge(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(P(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(M&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?P(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+ee-1),ne!==t&&(e.activeTexture(t),ne=t)}function we(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+ee-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Le(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function I(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function L(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function R(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:Pe,texImage3D:F,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:Re,uniformBlockBinding:L,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:Le,viewport:I,reset:R}}function wu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new V,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):tt(`canvas`)}function D(e,t,n){let r=1,i=R(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Je:Gt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function ee(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function M(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=new WeakRef(e);r.get(e).__ref=t,C.add(t),w.register(e,t,t)}function ne(e){let t=r.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function re(e){ae(e.target)}function ie(e){oe(e.target)}function ae(e){e.removeEventListener(`dispose`,re),ne(e),ce(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function oe(e){e.removeEventListener(`dispose`,ie),ne(e),P(e)}function se(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?oe(t):ae(t))}C.clear(),b.clear()}function ce(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&le(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function le(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function P(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&ae(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ue=0;function de(){ue=0}function fe(){return ue}function pe(e){ue=e}function me(){let e=ue;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ue+=1,e}function he(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ge(t,i){let a=r.get(t);if(t.isVideoTexture&&Re(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{De(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function _e(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?De(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ve(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?De(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ye(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?Oe(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let be={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},xe={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},Se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function Ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,be[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,be[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,be[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,xe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,xe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,Se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function we(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,re),te(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=he(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&le(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Te(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Ee(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Te(n.start,r.width,4),c=Te(t.start,r.width,4);n.start<=i+1&&a===c&&Te(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function De(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=we(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Gt.getPrimaries(Gt.workingColorSpace),r=o.colorSpace===``?null:Gt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=L(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);Ce(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=M(o,t);if(o.isDepthTexture)p=ee(o.format===N,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&Ee(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=Ts(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=Ts(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=R(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=R(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Oe(t,o,s){if(o.image.length!==6)return;let c=we(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Gt.getPrimaries(Gt.workingColorSpace),r=o.colorSpace===``?null:Gt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=L(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=M(o,h);Ce(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=ee(o.format===N,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=R(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ke(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Le(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=ee(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Le(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Le(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function je(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ye(i.depthTexture,0):ge(i.depthTexture,0);let u=c.__webglTexture,d=Le(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Me(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)je(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?je(i.__webglFramebuffer[0],t,0):je(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ae(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ae(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ne(t,n,i){let a=r.get(t);n!==void 0&&ke(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Me(t)}function Pe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,ie),te(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&I(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Le(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ae(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),Ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ke(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ke(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),Ce(c,a),ke(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),Ce(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ke(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ke(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Me(t)}function F(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let Fe=[];function Ie(t){if(t.samples>0){if(I(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Fe.length=0,Fe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Fe.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Fe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Le(e){return Math.min(i.maxSamples,e.samples)}function I(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Re(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function L(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Gt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function R(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=me,this.resetTextureUnits=de,this.getTextureUnits=fe,this.setTextureUnits=pe,this.setTexture2D=ge,this.setTexture2DArray=_e,this.setTexture3D=ve,this.setTextureCube=ye,this.rebindTextures=Ne,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ke,this.useMultisampledRTT=I,this.dispose=se}function Tu(e,t){function n(n,r=``){let i,a=Gt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Eu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Du=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ou=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ga(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new go({vertexShader:Eu,fragmentShader:Du,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new no(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ku=class extends lt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Ou,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new V,T=null,E=null,D=new ts;D.viewport=new nn;let k=new ts;k.viewport=new nn;let A=[D,k],j=new us,ee=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Ln,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Ln,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Ln,x[e]=t),t.getHandSpace()};function re(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}ee=null,ne=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?N:te,a=_.stencil?O:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new an(d.textureWidth,d.textureHeight,{format:M,type:v,depthTexture:new ma(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new an(f.framebufferWidth,f.framebufferHeight,{format:M,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=k.near=D.near=t,j.far=k.far=D.far=n,(ee!==j.near||ne!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),ee=j.near,ne=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;oe(j,i);for(let e=0;e<a.length;e++)oe(a[e],i);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),se(e,j,i)};function se(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=pt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let ce=null;function le(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new ts,o.layers.enable(n),o.viewport=new nn,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ga,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ce&&ce(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let P=new Ds;P.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}},Au=new W,ju=new U;ju.set(-1,0,0,0,1,0,0,0,1);function Mu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,fo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Au.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(ju),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Nu(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Pu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fu=null;function Iu(){return Fu===null&&(Fu=new Ai(Pu,16,16,ie,T),Fu.name=`DFG_LUT`,Fu.minFilter=h,Fu.magFilter=h,Fu.wrapS=u,Fu.wrapT=u,Fu.generateMipmaps=!1,Fu.needsUpdate=!0),Fu}var Lu=class{constructor(e={}){let{canvas:t=nt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([oe,ae,re]),g=new Set([v,C,x,O,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},w=null,k=null,A=[],j=[],ee=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,te=!1,N=null,ne=null,ie=null,se=null;this._outputColorSpace=Ke;let ce=0,le=0,P=null,ue=-1,de=null,fe=new nn,pe=new nn,me=null,he=new G(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new nn(0,0,_e,ve),Ce=new nn(0,0,_e,ve),we=!1,Te=new Ui,Ee=new Gi,De=!1,Oe=!1,ke=new W,Ae=new H,je=new nn,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return P===null?ye:1}let F=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,I,Re,L,R,ze,Be,Ve,He,Ue,We,Ge,qe,Je,Ye,Xe,Ze,$e,et,tt,rt,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,lt,!1),t.addEventListener(`webglcontextrestored`,ut,!1),t.addEventListener(`webglcontextcreationerror`,dt,!1),F===null){let t=`webgl2`;if(F=Fe(t,e),F===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ot()}catch(e){throw t.removeEventListener(`webglcontextlost`,lt,!1),t.removeEventListener(`webglcontextrestored`,ut,!1),t.removeEventListener(`webglcontextcreationerror`,dt,!1),B(`WebGLRenderer: `+e.message),e}function ot(){Ie=new rc(F),Ie.init(),tt=new Tu(F,Ie),Le=new Ls(F,Ie,e,tt),I=new Cu(F,Ie),Le.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),ne=F.createFramebuffer(),ie=F.createFramebuffer(),se=F.createFramebuffer(),Re=new oc(F),L=new ru,R=new wu(F,Ie,I,L,Le,tt,Re),ze=new nc(M),Be=new Os(F),rt=new Fs(F,Be),Ve=new ic(F,Be,Re,rt),He=new cc(F,Ve,Be,rt,Re),Ze=new sc(F,Le,R),Je=new Rs(L),Ue=new nu(M,ze,Ie,Le,rt,Je),We=new Mu(M,L),Ge=new su,qe=new mu(Ie),Xe=new Ps(M,ze,I,He,p,s),Ye=new Su(M,He,Le),at=new Nu(F,Re,Le,I),$e=new Is(F,Ie,Re),et=new ac(F,Ie,Re),Re.programs=Ue.programs,M.capabilities=Le,M.extensions=Ie,M.properties=L,M.renderLists=Ge,M.shadowMap=Ye,M.state=I,M.info=Re}m!==1009&&(ee=new uc(m,t.width,t.height,o,r,i));let ct=new ku(M,F);this.xr=ct,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){ct.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ee!==null&&ee.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ee.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(fe.copy(Se).multiplyScalar(Pe()).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(pe.copy(Ce).multiplyScalar(Pe()).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=h.has(t)}if(e){let e=P.texture.type,t=g.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,F.clearBufferuiv(F.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,F.clearBufferiv(F.COLOR,0,b))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,lt,!1),t.removeEventListener(`webglcontextrestored`,ut,!1),t.removeEventListener(`webglcontextcreationerror`,dt,!1),Xe.dispose(),Ge.dispose(),qe.dispose(),R.dispose(),L.dispose(),ze.dispose(),He.dispose(),Ve.dispose(),rt.dispose(),at.dispose(),Ue.dispose(),ct.dispose(),ct.removeEventListener(`sessionstart`,vt),ct.removeEventListener(`sessionend`,yt),bt.stop()};function lt(e){e.preventDefault(),it(`WebGLRenderer: Context Lost.`),te=!0}function ut(){it(`WebGLRenderer: Context Restored.`),te=!1;let e=Re.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;ot(),Re.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function dt(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ft(e){let t=e.target;t.removeEventListener(`dispose`,ft),pt(t)}function pt(e){mt(e),L.remove(e)}function mt(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=jt(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=Be.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ht(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),De===!0&&Je.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Dt(e,t,r),e.side=0,e.needsUpdate=!0,Dt(e,t,r),e.side=2):Dt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),k=qe.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),N!==null&&N.updateLights(k.state.lightsArray),Oe=this.localClippingEnabled,De=Je.init(this.clippingPlanes,Oe),De===!0&&Je.setGlobalState(this.clippingPlanes,t),N!==null&&Ye.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ht(o,n,t,e),r.add(o)}else ht(i,n,t,e),r.add(i)}}),k=j.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let gt=null;function _t(e){gt&&gt(e)}function vt(){bt.stop()}function yt(){bt.start()}let bt=new Ds;bt.setAnimationLoop(_t),typeof self<`u`&&bt.setContext(self),this.setAnimationLoop=function(e){gt=e,ct.setAnimationLoop(e),e===null?bt.stop():bt.start()},ct.addEventListener(`sessionstart`,vt),ct.addEventListener(`sessionend`,yt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(te===!0)return;N!==null&&N.renderStart(e,t);let n=ct.enabled===!0&&ct.isPresenting===!0,r=ee!==null&&(P===null||n)&&ee.begin(M,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ee===null||ee.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(t),t=ct.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,P),k=qe.get(e,j.length),k.init(t),k.state.textureUnits=R.getTextureUnits(),j.push(k),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Ee.setFromArrayCamera(t):Te.setFromProjectionMatrix(ke,Qe,t.reversedDepth),Oe=this.localClippingEnabled,De=Je.init(this.clippingPlanes,Oe),w=Ge.get(e,A.length),w.init(),A.push(w),this.info.render.frame++,ct.enabled===!0&&ct.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&xt(e,t,-1/0,M.sortObjects)}xt(e,t,0,M.sortObjects),w.finish(),N!==null&&N.updateLights(k.state.lightsArray),M.sortObjects===!0&&w.sort(be,xe),Ne=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Ne&&Xe.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),De===!0&&Je.beginShadows();let i=k.state.shadowsArray;if(Ye.render(i,e,t),De===!0&&Je.endShadows(),(r&&ee.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ct(n,r,e,a)}Ne&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];St(w,e,n,n.viewport)}}else r.length>0&&Ct(n,r,e,t),Ne&&Xe.render(e),St(w,e,t)}P!==null&&le===0&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),r&&ee.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),rt.resetDefaultState(),ue=-1,de=null,j.pop(),j.length>0?(k=j[j.length-1],R.setTextureUnits(k.state.textureUnits),De===!0&&Je.setGlobalState(M.clippingPlanes,k.state.camera)):k=null,A.pop(),w=A.length>0?A[A.length-1]:null,N!==null&&N.renderEnd()};function xt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=He.update(e),a=e.material;a.visible&&w.push(e,i,a,n,je.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,je.z,s,t)}}else a.visible&&w.push(e,i,a,n,je.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)xt(i[e],t,n,r)}function St(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),De===!0&&Je.setGlobalState(M.clippingPlanes,n),r&&I.viewport(fe.copy(r)),i.length>0&&wt(i,t,n),a.length>0&&wt(a,t,n),o.length>0&&wt(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function Ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new an(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),c=M.getActiveCubeFace(),l=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(he),ge=M.getClearAlpha(),ge<1&&M.setClearColor(16777215,.5),M.clear(),Ne&&Xe.render(n);let u=M.toneMapping;M.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),De===!0&&Je.setGlobalState(M.clippingPlanes,r),wt(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Tt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}M.setRenderTarget(s,c,l),M.setClearColor(he,ge),d!==void 0&&(r.viewport=d),M.toneMapping=u}function wt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Tt(o,t,n,s,l,c)}}function Tt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function Et(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Dt(e,t,n){t.isScene!==!0&&(t=Me);let r=L.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ft),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return At(e,s),d}else s.uniforms=Ue.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,M),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Je.uniform),At(e,s),r.needsLights=Nt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Et(k.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Ot(e,t,n,r,i){let a=L.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Dt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function kt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=yl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function At(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function jt(e,t,n,r,i){t.isScene!==!0&&(t=Me),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Gt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=k.state.lights;if(De===!0&&(Oe===!0||e!==de)){let t=e===de&&r.id===ue;Je.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Je.numPlanes||v.numIntersection!==Je.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Et(k.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||x===!0)&&(C=x===!0?Ot(r,t,i,s,h):Dt(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,C,v));let w=!1,T=!1,E=!1,D=C.getUniforms(),O=v.uniforms;if(I.useProgram(C.program)&&(w=!0,T=!0,E=!0),r.id!==ue&&(ue=r.id,T=!0),w||de!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(F,`projectionMatrix`,e.projectionMatrix),D.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(F,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&D.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,T=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(F,`sunShadowMap`,y.state.sunShadowMap,R),y.state.directionalShadowMap.length>0&&D.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&D.setValue(F,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&D.setValue(F,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){D.setOptional(F,i,`bindMatrix`),D.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(D.setOptional(F,i,`batchingTexture`),D.setValue(F,`batchingTexture`,i._matricesTexture,R),D.setOptional(F,i,`batchingIdTexture`),D.setValue(F,`batchingIdTexture`,i._indirectTexture,R),D.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ze.update(i,n,C),(T||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Iu()),T){if(D.setValue(F,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&Mt(O,E),a&&r.fog===!0&&We.refreshFogUniforms(O,a),We.refreshMaterialUniforms(O,r,ye,ve,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=S,t=0;for(let n of k.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}yl.upload(F,kt(v),O,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(yl.upload(F,kt(v),O,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(F,`center`,i.center),D.setValue(F,`modelViewMatrix`,i.modelViewMatrix),D.setValue(F,`normalMatrix`,i.normalMatrix),D.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,C),at.bind(n,C)}}return C}function Mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Nt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,I.viewport(fe),I.scissor(pe),I.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=ne),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(fe),I.scissor(pe),I.setScissorTest(me),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ue=-1};function Pt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=Pt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,tt.convert(c),tt.convert(l),a)}finally{let e=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=Pt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,tt.convert(l),tt.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await st(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=tt.convert(t.format),_=tt.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,ie),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ce=0,le=0,P=null,I.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Gt._getUnpackColorSpace()}},Ru={a:2.8,rc:3.6,H:6.6,th:.32,lip:.45},zu=2.6;function Bu(e){return e.a+e.rc}function Vu(e,t,n){let r=Math.abs(e),i=n.a+n.rc,a;a=r<=n.a?Math.abs(t):Math.hypot(r-n.a,t);{let e=r-n.a,o=t-n.rc;a=e>=0&&o<=0?Math.min(a,Math.abs(Math.hypot(e,o)-n.rc)):Math.min(a,Math.hypot(r-n.a,t),Math.hypot(r-i,t-n.rc))}a=t>=n.rc?Math.min(a,Math.abs(r-i)):Math.min(a,Math.hypot(r-i,t-n.rc));let o;return o=r<=n.a?t>0:r<i?t>=n.rc||Math.hypot(r-n.a,t-n.rc)<n.rc:!1,o?a:-a}function Hu(e,t,n,r=!1,i=!1,a=!1,o=0,s=n.H,c=n.H){let l=e<0?s:c,u=Vu(e,t,n),d=Math.max(u,-u-n.th);i?d=Math.max(d,t-l):(a||o<=0&&Uu(l,n)>.5)&&(d=Math.max(d,t-(l+zu)));let f=n.a+n.rc,p=o*Math.PI/2;if(o>0){let r=Math.abs(e),i=t-l,a=Math.hypot(r,i),o=Math.atan2(i,r),s;if(o>=0&&o<=p)s=Math.max(f-a,a-(f+n.th));else{let e=e=>{let t=Math.cos(e),a=Math.sin(e),o=Math.max(f,Math.min(f+n.th,r*t+i*a));return Math.hypot(r-t*o,i-a*o)};s=Math.min(e(0),e(p))}d=Math.min(d,s)}let m=o>0?0:Ku(l,n);if(m>0){let r=Gu*m,i=Math.abs(e)-(f-Wu),a=t-l,o=Math.hypot(i,a),s=Math.atan2(a,i),c;if(s>=0&&s<=r)c=Math.max(Wu-o,o-(Wu+n.th));else{let e=e=>{let t=Math.cos(e),r=Math.sin(e),o=Math.max(Wu,Math.min(Wu+n.th,i*t+a*r));return Math.hypot(i-t*o,a-r*o)};c=Math.min(e(0),e(r))}d=Math.min(d,c)}let h=n.lip*(1-o)*(1-m)*(1-Uu(l,n));if(n.lip>0&&h>.01){let r=Math.abs(e),i=t-l,a=Math.cos(p),o=Math.sin(p),s=r*a+i*o,c=-r*o+i*a,u=f-h/2+n.th/2,m=Math.min(.14,n.th/2-.01),g=Math.abs(s-u)-(h/2+n.th/2)+m,_=Math.abs(c-n.th/2)-n.th/2+m,v=Math.hypot(Math.max(g,0),Math.max(_,0))+Math.min(Math.max(g,_),0)-m;d=Math.min(d,v)}if(r){let r=f+n.th,i=Math.max(n.H-t,Math.abs(e)-r,t-(n.H+n.th*2.5));d=Math.min(d,i)}return d}function Uu(e,t){return Math.max(0,Math.min(1,(e-t.H-.2)/.8))}var Wu=2.4,Gu=110*Math.PI/180;function Ku(e,t){return 0}function qu(e,t,n,r=0){let i=Vu(e,t,n);return r>=.999&&t>n.H?Math.min(i,n.a+n.rc-Math.hypot(e,t-n.H)):i}function Ju(e,t,n=12,r=14,i=e.H,a=e.H){let o=e.a+e.rc,s=t*Math.PI/2,c=i=>{let a=t>0?0:Ku(i,e),c=e.lip*(1-t)*(1-a)*(1-Uu(i,e)),l=[];l.push([0,0,0,1]),l.push([e.a,0,0,1]);for(let t=1;t<n;t++){let r=-Math.PI/2+t/n*(Math.PI/2),i=Math.cos(r),a=Math.sin(r);l.push([e.a+e.rc*i,e.rc+e.rc*a,-i,-a])}if(l.push([o,e.rc,-1,0]),l.push([o,i,-1,0]),a>0){let e=Gu*a,t=o-Wu;for(let n=1;n<=r;n++){let a=n/r*e,o=Math.cos(a),s=Math.sin(a);l.push([t+Wu*o,i+Wu*s,-o,-s])}let n=l[l.length-1];l.push([n[0]-c,n[1],0,-1])}else{for(let e=1;e<=r;e++){let t=e/r*s,n=Math.cos(t),a=Math.sin(t);l.push([o*n,i+o*a,-n,-a])}let e=Math.cos(s),t=Math.sin(s);l.push([o*e-e*c,i+o*t-t*c,t,-e])}return l},l=c(a),u=c(i),d=[],f=[];for(let e=u.length-1;e>=1;e--){let t=u[e];d.push([-t[0],t[1]]),f.push([-t[2],t[3]])}for(let e of l)d.push([e[0],e[1]]),f.push([e[2],e[3]]);return{pts:d,nrm:f}}function Yu(e){"@babel/helpers - typeof";return Yu=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Yu(e)}function Xu(e,t){if(Yu(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Yu(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Zu(e){var t=Xu(e,`string`);return Yu(t)==`symbol`?t:t+``}function J(e,t,n){return(t=Zu(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Qu={half:24,depth:10,curve:.005,lip:2.5},$u=class{constructor(e){J(this,`ds`,.5),J(this,`n`,void 0),J(this,`length`,void 0),J(this,`profile`,void 0),J(this,`P`,void 0),J(this,`T`,void 0),J(this,`U`,void 0),J(this,`R`,void 0),J(this,`tunnel`,void 0),J(this,`angles`,void 0),J(this,`gap`,void 0),J(this,`openSky`,void 0),J(this,`tubeK`,void 0),J(this,`warpCap`,void 0),J(this,`lift`,void 0),J(this,`wallL`,void 0),J(this,`wallXL`,void 0),J(this,`wallXR`,void 0),J(this,`widen`,void 0),J(this,`wallR`,void 0),J(this,`fxMode`,void 0),J(this,`obstacles`,void 0),J(this,`pads`,[]),J(this,`padHit`,void 0),J(this,`ghost`,void 0),J(this,`holoUsed`,void 0),J(this,`netOn`,void 0),J(this,`netY`,void 0),J(this,`hints`,void 0),J(this,`checkpoints`,void 0),J(this,`segmentStarts`,[]),J(this,`layout`,void 0),J(this,`profScratch`,{...Ru}),J(this,`time`,0),this.layout={...e,segments:id(e.segments)},e=this.layout,this.profile=e.profile??Ru;let t=e.segments.reduce((e,t)=>e+t.len,0);this.n=Math.floor(t/this.ds)+1,this.length=(this.n-1)*this.ds,this.P=new Float64Array(this.n*3),this.T=new Float64Array(this.n*3),this.U=new Float64Array(this.n*3),this.R=new Float64Array(this.n*3),this.tunnel=new Uint8Array(this.n),this.angles=new Float64Array(this.n*3),this.gap=new Uint8Array(this.n),this.openSky=new Uint8Array(this.n),this.fxMode=new Float32Array(this.n*3),this.tubeK=new Float32Array(this.n),this.warpCap=new Float32Array(this.n),this.lift=new Float32Array(this.n),this.wallXL=new Float32Array(this.n),this.wallXR=new Float32Array(this.n),this.widen=new Float32Array(this.n).fill(1),this.build();{let e=this.tubeK.slice();for(let t=0;t<this.n;t++){let n=0,r=0;for(let i=t-24;i<=t+24;i++)n+=e[Math.max(0,Math.min(this.n-1,i))],r++;let i=n/r;this.tubeK[t]=i<.002?0:i>.998?1:i*i*(3-2*i)}}this.wallL=new Float32Array(this.n).fill(this.profile.H),this.wallR=new Float32Array(this.n).fill(this.profile.H);{let e=this.widen.slice(),t=Math.round(15/this.ds);for(let n=0;n<this.n;n++){let r=0,i=0;for(let a=Math.max(0,n-t);a<=Math.min(this.n-1,n+t);a++)r+=e[a],i++;this.widen[n]=r/i}}this.raiseCornerWalls();{let e=this.fxMode.slice();for(let t=0;t<this.n;t++){let n=0,r=0,i=0,a=0;for(let o=Math.max(0,t-16);o<=Math.min(this.n-1,t+16);o++)n+=e[o*3],r+=e[o*3+1],i+=e[o*3+2],a++;this.fxMode[t*3]=n/a,this.fxMode[t*3+1]=r/a,this.fxMode[t*3+2]=i/a}}let n=e=>{if(!e)return 0;let t=this.segmentStarts.find(t=>t.label===e);if(!t)throw Error(`Unknown segment label ${e}`);return t.s};this.obstacles=e.obstacles.map((e,t)=>({...e,s:n(e.at)+e.s,y:e.y??0,kind:e.kind??`block`,move:e.move??{amp:.35,period:9+t%5*1.3,phase:t*1.7}})),this.netOn=new Uint8Array(this.n),this.netY=new Float32Array(this.n).fill(-Qu.depth),this.placeNet([]),this.ghost=new Uint8Array(this.obstacles.length),this.holoUsed=new Uint8Array(this.obstacles.length),this.placePads(),this.padHit=new Uint8Array(this.pads.length),this.hints=e.hints.map(e=>({...e,s:n(e.at)+e.s})).sort((e,t)=>e.s-t.s);let r=e.checkpointEvery??160;this.checkpoints=[6];for(let e=r;e<this.length-40;e+=r){let t=e;for(;t<this.length-40&&(this.gap[this.idx(t)]||this.isSteepOrInverted(t));)t+=5;t<this.length-40&&this.checkpoints.push(t)}}placePads(){let e=this.obstacles.map((e,t)=>t).sort((e,t)=>this.obstacles[e].s-this.obstacles[t].s),t=[];for(let n of e){let e=t[t.length-1];e&&this.obstacles[n].s-this.obstacles[e[e.length-1]].s<90?e.push(n):t.push([n])}let n=-1e9,r=this.profile;for(let e=0;e<t.length;e++){let i=t[e],a=this.obstacles[i[0]].s,o=this.obstacles[i[i.length-1]].s,s=Math.abs(Math.sin((a+1)*12.9898)*43758.5453)%1,c=(e+ +(s>.5))%2==0?1:-1,l=r.rc+.6+s*.9,u=2.2,d=e=>{if(e<15||e-5<n+10)return!1;for(let t=e-5;t<=e+5;t+=this.ds){let e=this.idx(t);if(this.tubeK[e]>0||this.tunnel[e]||this.gap[e]||this.widen[e]>1.001||this.isSteepOrInverted(t)||(c>0?this.wallR[e]:this.wallL[e])<l+u/2+.3)return!1}return!0},f=-1;for(let e=70;e<=140&&f<0;e+=5)d(a-e)&&(f=a-e);for(let e=65;e>=40&&f<0;e-=5)d(a-e)&&(f=a-e);for(let e=145;e<=300&&f<0;e+=5)d(a-e)&&(f=a-e);for(let e=35;e>=20&&f<0;e-=5)d(a-e)&&(f=a-e);n=o+5,f<0||this.pads.push({s:f,side:c,y:l,len:5,tall:u,obs:i})}}placeNet(e){let t=this.n,n=this.ds,r=new Uint8Array(t);for(let e=0;e<t;e++){let i=e*3;if(this.U[i+1]<.85)continue;let a=Math.max(0,e-8),o=Math.min(t-1,e+8),s=this.T[o*3]-this.T[a*3],c=this.T[o*3+2]-this.T[a*3+2],l=this.T[o*3+1]-this.T[a*3+1];Math.hypot(s,l,c)/((o-a)*n||1)>1/(Qu.half+12)||(r[e]=1)}let i=new Map,a=e=>{for(let t=0;t<e.n;t+=6){let n=`${Math.floor(e.P[t*3]/20)},${Math.floor(e.P[t*3+2]/20)}`,r=i.get(n);r||i.set(n,r=[]),r.push({t:e,i:t})}};a(this);for(let t of e)a(t);let o=Qu.half+6;for(let e=0;e<t;e+=4){if(!r[e])continue;let a=e*3,s=this.P[a],c=this.P[a+1],l=this.P[a+2],u=Math.floor(s/20),d=Math.floor(l/20),f=!1;for(let t=-2;t<=2&&!f;t++)for(let r=-2;r<=2&&!f;r++)for(let p of i.get(`${u+t},${d+r}`)??[]){if(p.t===this&&Math.abs(p.i-e)*n<60)continue;let t=p.i*3,r=p.t.P[t]-s,i=p.t.P[t+1]-c,u=p.t.P[t+2]-l,d=r*this.T[a]+i*this.T[a+1]+u*this.T[a+2],m=r*this.R[a]+i*this.R[a+1]+u*this.R[a+2],h=r*this.U[a]+i*this.U[a+1]+u*this.U[a+2];if(Math.abs(d)<14&&Math.abs(m)<o&&h<3&&h>this.netY[e]-8){f=!0;break}}if(f)for(let n=Math.max(0,e-24);n<Math.min(t,e+24);n++)r[n]=0}this.netOn.fill(0);let s=-1;for(let e=0;e<=t;e++){let i=e<t&&r[e]===1;if(i&&s<0&&(s=e),!i&&s>=0){let t=s+Math.round(6/n),r=e-1-Math.round(6/n);if((r-t)*n>=40)for(let e=t;e<=r;e++)this.netOn[e]=1;s=-1}}}fitNetToGround(e){for(let t=0;t<this.n;t++){let n=t*3,r=this.P[n+1]-e(this.P[n],this.P[n+2]);this.netY[t]=-Math.min(Qu.depth,Math.max(1.4,r-.8))}let t=Float32Array.from(this.netY);for(let e=0;e<3;e++)for(let e=1;e<this.n-1;e++)t[e]=(t[e-1]+2*t[e]+t[e+1])/4;for(let e=0;e<this.n;e++)this.netY[e]=Math.max(this.netY[e],t[e])}netAt(e){return this.netOn[this.idx(e)]===1}netYAt(e){let t=Math.max(0,Math.min(this.n-1.001,e/this.ds)),n=Math.floor(t),r=t-n;return this.netY[n]+(this.netY[n+1]-this.netY[n])*r}netSurface(e,t){let n=Math.min(Math.abs(t),Qu.half),r=Math.max(0,n-(Qu.half-3))/3;return this.netYAt(e)+Qu.curve*n*n+Qu.lip*r*r}resetHolograms(){this.ghost.fill(0),this.holoUsed.fill(0),this.padHit.fill(0)}padAt(e,t,n,r){for(let i=0;i<this.pads.length;i++){let a=this.pads[i];if(!(Math.abs(e-a.s)>a.len/2+r)&&!(t*a.side<=0||Math.abs(n-a.y)>a.tall/2+r*.5)&&!(Math.abs(Math.abs(t)-(this.halfWidthAt(e)-r))>.7))return i}return-1}triggerPad(e){this.padHit[e]=1;for(let t of this.pads[e].obs)this.ghost[t]=1}hologramAt(e,t,n,r){for(let i=0;i<this.obstacles.length;i++){if(!this.ghost[i]||this.holoUsed[i])continue;let a=this.obstacles[i],o=e-a.s;if(!(o>a.ls+2||o<-a.ls-2)&&ed(o,t-this.obstacleX(a),n-(a.y+a.h/2),a.ls/2,a.w/2,a.h/2,.06)<r)return i}return-1}raiseCornerWalls(){let e=this.n,t=this.ds,n=new Float32Array(e),r=new Float32Array(e);for(let i=2;i<e-2;i++){if(this.tubeK[i]>.02||this.tunnel[i]||this.gap[i])continue;let e=(this.angles[(i+2)*3]-this.angles[(i-2)*3])/(4*t);if(Math.abs(e)<.05)continue;let a=Math.abs(e)*Math.PI/180,o=Math.atan(4624*a/9.81)*180/Math.PI,s=this.angles[i*3+2]*Math.sign(e),c=Math.max(0,Math.min(1,(o-s-40)/30))*12;e>0?r[i]=c:n[i]=c}let i=t=>{let n=new Float32Array(e),r=new Float32Array(e);for(let r=0;r<e;r++){let i=0;for(let n=Math.max(0,r-28);n<=Math.min(e-1,r+28);n++)i=Math.max(i,t[n]);n[r]=i}for(let t=0;t<e;t++){let i=0,a=0;for(let r=Math.max(0,t-20);r<=Math.min(e-1,t+20);r++)i+=n[r],a++;r[t]=i/a}return r};for(let t=0;t<e;t++)n[t]=Math.max(n[t],this.wallXL[t]),r[t]=Math.max(r[t],this.wallXR[t]);let a=i(n),o=i(r);for(let t=0;t<e;t++){let e=1-Math.min(1,this.tubeK[t]*20);this.tunnel[t]||(this.wallL[t]=this.profile.H+a[t]*e,this.wallR[t]=this.profile.H+o[t]*e)}}profileAt(e){let t=this.widenAt(e);return t<1.0005?this.profile:{...this.profile,a:this.profile.a*t}}widenAt(e){let t=Math.max(0,Math.min(this.n-1.001,e/this.ds)),n=Math.floor(t),r=t-n;return this.widen[n]+(this.widen[n+1]-this.widen[n])*r}profileAtFast(e){let t=this.widenAt(e);if(t<1.0005)return this.profile;let n=this.profScratch;return n.a=this.profile.a*t,n.rc=this.profile.rc,n.H=this.profile.H,n.th=this.profile.th,n.lip=this.profile.lip,n}halfWidthAt(e){let t=this.profileAt(e);return t.a+t.rc}wallsAt(e){return[this.wallAt(this.wallL,e),this.wallAt(this.wallR,e)]}wallAt(e,t){let n=Math.max(0,Math.min(this.n-1.001,t/this.ds)),r=Math.floor(n),i=n-r;return e[r]+(e[r+1]-e[r])*i}idx(e){return Math.max(0,Math.min(this.n-1,Math.round(e/this.ds)))}isSteepOrInverted(e){let t=this.idx(e);return this.U[t*3+1]<.85}build(){let e=new Rt,t=new Rt,n=new Rt,r=new Rt,i=new H(0,1,0),a=new H(1,0,0),o=new H(0,0,1),s=new H,c=new H,l=new H,u=new H(...this.layout.startPos??[0,0,0]),[d,f,p]=this.layout.startAngles??[0,0,0],m=0,h=0,g=0,_=e=>e*e*e*(e*(e*6-15)+10),v=!1,y=[0,0,0],b=(e,t,n)=>{this.openSky[e]=+!!v,this.fxMode[e*3]=y[0],this.fxMode[e*3+1]=y[1],this.fxMode[e*3+2]=y[2],this.angles[e*3]=x,this.angles[e*3+1]=S,this.angles[e*3+2]=C,this.P[e*3]=u.x,this.P[e*3+1]=u.y,this.P[e*3+2]=u.z,this.T[e*3]=s.x,this.T[e*3+1]=s.y,this.T[e*3+2]=s.z,this.U[e*3]=c.x,this.U[e*3+1]=c.y,this.U[e*3+2]=c.z,this.R[e*3]=l.x,this.R[e*3+1]=l.y,this.R[e*3+2]=l.z,this.tunnel[e]=+!!t,this.gap[e]=+!!n},x=d,S=f,C=p,w=(u,d,f)=>{x=u,S=d,C=f;let p=Math.PI/180;e.setFromAxisAngle(i,u*p),t.setFromAxisAngle(a,d*p),n.setFromAxisAngle(o,f*p),r.copy(e).multiply(t).multiply(n),s.set(0,0,-1).applyQuaternion(r),c.set(0,1,0).applyQuaternion(r),l.set(1,0,0).applyQuaternion(r)};w(d,f,p),b(0,!1,!1),this.tubeK[0]=+!!this.layout.segments[0]?.tube,g=1;for(let e of this.layout.segments){this.segmentStarts.push({s:h,label:e.label});let t=d,n=f,r=p,i=e.yaw??0,a=e.pitch??f,o=e.bank??p,c=e.loop?360:0,x=(e.roll??0)*360,S=e.shift??0;m=0;let C=Math.round(e.len/this.ds);for(let d=1;d<=C&&g<this.n;d++){let f=d/C,p=(d-.5)/C;w(t+i*_(p),n+(a-n+c)*_(p),r+(o-r+x)*_(p)),u.addScaledVector(s,this.ds);let T=S*_(f);u.addScaledVector(l,T-m),m=T,w(t+i*_(f),n+(a-n+c)*_(f),r+(o-r+x)*_(f)),v=!!e.openSky||!!this.layout.openStart,y=[e.fx?.flow??0,e.fx?.pulse??0,e.fx?.twist??0],this.tubeK[g]=+!!e.tube,this.warpCap[g]=e.warp??0,this.lift[g]=e.lift??0,this.wallXL[g]=e.wall?.L??0,this.wallXR[g]=e.wall?.R??0,this.widen[g]=e.widen??1,b(g,!!e.tunnel,!!e.gap),g++,h+=this.ds}d=t+i,f=a,p=o}for(;g<this.n;g++)u.addScaledVector(s,this.ds),this.tubeK[g]=this.tubeK[g-1],b(g,!1,!1)}sample(e,t,n,r,i){let a=Math.max(0,Math.min(this.n-1,e))*3;t.set(this.P[a],this.P[a+1],this.P[a+2]),n?.set(this.T[a],this.T[a+1],this.T[a+2]),r?.set(this.U[a],this.U[a+1],this.U[a+2]),i?.set(this.R[a],this.R[a+1],this.R[a+2])}frameAtS(e,t,n,r,i){let a=Math.max(0,Math.min(this.n-1.0001,e/this.ds)),o=Math.floor(a),s=a-o,c=o*3,l=(o+1)*3,u=(e,t)=>t.set(e[c]+(e[l]-e[c])*s,e[c+1]+(e[l+1]-e[c+1])*s,e[c+2]+(e[l+2]-e[c+2])*s);u(this.P,t),u(this.T,n).normalize(),u(this.U,r).normalize(),u(this.R,i).normalize()}isTunnel(e){return this.tunnel[this.idx(e)]===1}tubeAt(e){let t=Math.max(0,Math.min(this.n-1.0001,e/this.ds)),n=Math.floor(t),r=t-n;return this.tubeK[n]+(this.tubeK[n+1]-this.tubeK[n])*r}isTube(e){return this.tubeAt(e)>.7}channelDepthLocal(e,t,n){let r=this.layout.openStart?0:-2,i=this.layout.openEnd?this.length:this.length+2;return e<r||e>i?-1e6:qu(t,n,this.profileAtFast(e),this.tubeAt(e))}isGap(e){return this.gap[this.idx(e)]===1}obstacleX(e,t=this.time){return e.move?e.x+e.move.amp*Math.sin(2*Math.PI*t/e.move.period+(e.move.phase??0)):e.x}obstacleVX(e){if(!e.move)return 0;let t=2*Math.PI/e.move.period;return e.move.amp*t*Math.cos(t*this.time+(e.move.phase??0))}nearestObstacleVX(e,t,n){let r=1e6,i=0;for(let a=0;a<this.obstacles.length;a++){if(this.ghost[a])continue;let o=this.obstacles[a],s=e-o.s;if(Math.abs(s)>o.ls+3)continue;let c=ed(s,t-this.obstacleX(o),n-(o.y+o.h/2),o.ls/2,o.w/2,o.h/2,.06);c<r&&(r=c,i=this.obstacleVX(o))}return i}sdfLocal(e,t,n,r=!0,i=!1){let a=1e6,o=this.layout.openStart?0:-2,s=this.layout.openEnd?this.length:this.length+2;if(e>=o&&e<=s&&!this.isGap(e)){let r=this.idx(e);a=Hu(t,n,this.profileAtFast(e),this.isTunnel(e),i,this.openSky[r]===1,this.tubeAt(e),this.wallAt(this.wallL,e),this.wallAt(this.wallR,e))}else if(!i&&e>=o&&e<=s&&this.isGap(e)){let e=this.profile.a+this.profile.rc;a=Math.max(Math.abs(t)-(e+this.profile.th),e-Math.abs(t))}let c=this.profile.a+this.profile.rc+.8;if(!this.layout.openStart&&e<.5&&(a=Math.min(a,Math.max(e-.5,-e-2,Math.abs(t)-c,n-4))),!this.layout.openEnd&&e>this.length-.5&&(a=Math.min(a,Math.max(this.length-.5-e,e-this.length-2,Math.abs(t)-c,n-4))),!i&&e>=0&&e<=this.length&&this.netOn[this.idx(e)]===1){let r=Math.abs(t);if(r<=Qu.half){let i=this.netSurface(e,t),o=2*Qu.curve*r+(r>Qu.half-3?2*Qu.lip*(r-(Qu.half-3))/9:0);a=Math.min(a,Math.abs(n-i)/Math.sqrt(1+o*o)-.2)}else a=Math.min(a,Math.hypot(r-Qu.half,n-this.netSurface(e,Qu.half))-.2)}if(r)for(let r=0;r<this.obstacles.length;r++){if(this.ghost[r])continue;let i=this.obstacles[r],o=e-i.s;o>i.ls+2||o<-i.ls-2||(a=Math.min(a,ed(o,t-this.obstacleX(i),n-(i.y+i.h/2),i.ls/2,i.w/2,i.h/2,.06)))}return a}nearestObstacleDist(e,t,n){let r=1e6;for(let i=0;i<this.obstacles.length;i++){if(this.ghost[i])continue;let a=this.obstacles[i],o=e-a.s;Math.abs(o)>a.ls+3||(r=Math.min(r,ed(o,t-this.obstacleX(a),n-(a.y+a.h/2),a.ls/2,a.w/2,a.h/2,.06)))}return r}};function ed(e,t,n,r,i,a,o){let s=Math.abs(e)-r+o,c=Math.abs(t)-i+o,l=Math.abs(n)-a+o;return Math.hypot(Math.max(s,0),Math.max(c,0),Math.max(l,0))+Math.min(Math.max(s,c,l),0)-o}var td=class{constructor(e){J(this,`track`,void 0),J(this,`hint`,0),J(this,`P`,new H),J(this,`T`,new H),J(this,`U`,new H),J(this,`R`,new H),J(this,`s`,0),J(this,`x`,0),J(this,`y`,0),J(this,`along`,0),J(this,`c`,new H),J(this,`t`,new H),this.track=e}reset(e){this.hint=Math.round(e/this.track.ds)}copyFrom(e){this.hint=e.hint,this.s=e.s,this.x=e.x,this.y=e.y,this.along=e.along,this.P.copy(e.P),this.T.copy(e.T),this.U.copy(e.U),this.R.copy(e.R)}relocate(e,t,n){let r=this.track,i=0,a=1/0;for(let o=0;o<r.n;o+=4){let s=o*3,c=(e-r.P[s])**2+(t-r.P[s+1])**2+(n-r.P[s+2])**2;c<a&&(a=c,i=o)}this.hint=i}project(e,t,n){let r=this.track,i=i=>{let a=i*3;return(e-r.P[a])*r.T[a]+(t-r.P[a+1])*r.T[a+1]+(n-r.P[a+2])*r.T[a+2]},a=Math.max(0,Math.min(r.n-2,this.hint)),o=0;for(;a>0&&i(a)<0&&o++<400;)a--;for(o=0;a<r.n-2&&i(a+1)>0&&o++<400;)a++;let s=i(a),c=i(a+1),l=s-c===0?0:s/(s-c);a===0&&s<0&&(l=s/r.ds),a===r.n-2&&c>0&&(l=1+c/r.ds);let u=Math.max(0,Math.min(1,l));this.hint=a,this.s=(a+l)*r.ds,r.frameAtS((a+u)*r.ds,this.P,this.T,this.U,this.R),this.c.set(e,t,n).sub(this.P),this.along=this.c.dot(this.T),this.x=this.c.dot(this.R),this.y=this.c.dot(this.U)}toWorld(e,t,n,r){return r.copy(this.P).addScaledVector(this.T,e).addScaledVector(this.R,t).addScaledVector(this.U,n)}},nd=class{fitNets(e){for(let t of this.all)e&&t.fitNetToGround(e),t.placeNet(this.all.filter(e=>e!==t))}constructor(e){J(this,`main`,void 0),J(this,`branches`,[]),J(this,`all`,void 0),J(this,`junctions`,[]),J(this,`rejoinError`,[]),J(this,`startS`,[0]),this.main=new $u({...e,finishLine:!0});for(let t of e.branches??[]){let e=t.from?this.branches.findIndex(e=>e.layout.id===t.from)+1:0;if(t.from&&e===0)throw Error(`Unknown parent route ${t.from} (list parents before their children)`);let n=e===0?this.main:this.branches[e-1],r=n.segmentStarts.find(e=>e.label===t.at);if(!r)throw Error(`Unknown branch anchor ${t.at}`);let i=r.s+t.s,a=new H,o=new H,s=new H,c=new H;n.frameAtS(i,a,o,s,c);let l=Math.round(i/n.ds)*3,u=n.angles,d=a.clone().addScaledVector(c,t.offset[0]).addScaledVector(s,t.offset[1]),f=new $u({id:t.id,name:t.name,segments:t.segments,obstacles:t.obstacles??[],hints:t.hints??[],startPos:[d.x,d.y,d.z],startAngles:[u[l]+(t.yawOffset??0),t.startPitch??u[l+1]+(t.pitchOffset??0),t.startBank??u[l+2]],openStart:!0,openEnd:!t.toFinish,finishLine:!!t.toFinish,checkpointEvery:t.toFinish?220:1e9}),p=this.branches.length+1;if(this.startS.push(this.startS[e]+i),t.toFinish)for(let e=Math.round(i/n.ds);e<Math.min(n.n,Math.round((i+420)/n.ds));e++)n.tubeK[e]===0&&!n.tunnel[e]&&(n.openSky[e]=1);let m=-1;if(t.rejoin&&!t.toFinish){if(t.rejoin===`auto`){let e=(f.n-1)*3,t=1/0;for(let r=Math.round(i/n.ds)+20;r<n.n;r++){let i=(n.P[r*3]-f.P[e])**2+(n.P[r*3+1]-f.P[e+1])**2+(n.P[r*3+2]-f.P[e+2])**2;i<t&&(t=i,m=r*n.ds)}}else{let e=t.rejoin,r=n.segmentStarts.find(t=>t.label===e.at);if(!r)throw Error(`Unknown rejoin anchor ${e.at}`);m=r.s+e.s}n.frameAtS(m,a,o,s,c);let e=(f.n-1)*3,r=a.x-f.P[e],l=a.y-f.P[e+1],u=a.z-f.P[e+2];this.rejoinError.push(Math.hypot(r,l,u));for(let e=0;e<f.n;e++){let t=e/(f.n-1),n=t*t*t*(t*(t*6-15)+10);f.P[e*3]+=r*n,f.P[e*3+1]+=l*n,f.P[e*3+2]+=u*n}}if(t.junction){let r,a;if(t.junction===`auto`){let e=e=>{let t=1/0,r=e*3,a=Math.max(0,Math.round(i/n.ds)-40);for(let e=a;e<n.n;e+=2){let i=(n.P[e*3]-f.P[r])**2+(n.P[e*3+1]-f.P[r+1])**2+(n.P[e*3+2]-f.P[r+2])**2;i<t&&(t=i)}return Math.sqrt(t)},o=0;for(;o<f.n-1&&e(o)<15;)o+=4;let s=f.n-1;for(;s>0&&e(s)<15;)s-=4;t.toFinish&&(s=f.n-1),r=Math.min(f.length*.45,o*f.ds+4),a=Math.min(f.length*.45,(f.n-1-s)*f.ds+4)}else r=a=t.junction;t.mergeOnly||this.junctions.push({a:e,b:p,aS:[i-2,i+r+2],bS:[0,r]}),m>=0&&this.junctions.push({a:e,b:p,aS:[m-a-2,m+2],bS:[f.length-a,f.length]})}this.branches.push(f)}this.all=[this.main,...this.branches],this.fitNets()}},rd={turnR:45,crestR:60,sagR:40,bankRate:2,maxDown:-55,peak:1.875,loopLen:190,rollLen:160};function id(e){let t=Math.PI/180,n=0,r=0;return e.map(e=>{let i=e.pitch??n,a={...e};if(!e.exact&&e.loop&&(a.len=Math.max(e.len,rd.loopLen)),!e.exact&&e.roll&&(a.len=Math.max(e.len,rd.rollLen*Math.abs(e.roll))),!e.loop&&!e.roll&&!e.exact){let o=e.steep?i:Math.max(rd.maxDown,i);a.pitch=e.pitch===void 0?void 0:o;let s=o-n,c=e.bank??r,l=Math.max(rd.peak*Math.abs(e.yaw??0)*t*rd.turnR,rd.peak*Math.abs(s)*t*(s<0?rd.crestR:rd.sagR),Math.abs(c-r)/rd.bankRate);l>e.len&&(a.len=Math.ceil(l))}return n=a.pitch??n,r=e.bank??r,a})}var ad=(e,t,n,r)=>({turbidity:e,rayleigh:t,elevation:n,azimuth:r}),od={wood:{id:`wood`,name:`Wood`,muStatic:.55,muKinetic:.38,rollingResistance:.012,restitution:.32,restitutionThreshold:1.2,spinDamping:.6,compliance:.35,seamSpacing:2.4,medium:`none`,acoustic:{rollBands:[[95,1.6,1],[210,2.5,.75],[460,3.5,.35],[1100,4,.12]],rumbleHz:70,rollGain:.9,brightness:.35,slideHz:1400,slideQ:1.2,slideGain:.55,impactModes:[[180,.16],[410,.09],[760,.05],[1350,.03]],impactNoise:.45,seamGain:.55,reverb:.18},haptic:{rollTexture:.5,seamPulse:9,impactScale:1},visual:{surface:`wood`,tint:12617808,roughness:.62,metalness:0,sky:ad(4,1.6,34,200),fog:12177366,fogDensity:.0042,ground:4284474,scenery:`forest`}},concrete:{id:`concrete`,name:`Concrete`,muStatic:.75,muKinetic:.55,rollingResistance:.022,restitution:.25,restitutionThreshold:1,spinDamping:.9,compliance:.1,seamSpacing:6,medium:`none`,acoustic:{rollBands:[[70,1.2,1],[320,1,.6],[2400,.8,.55],[5200,1,.3]],rumbleHz:55,rollGain:1,brightness:.7,slideHz:2600,slideQ:.6,slideGain:.8,impactModes:[[140,.06],[620,.04],[1900,.02]],impactNoise:.75,seamGain:.4,reverb:.3},haptic:{rollTexture:.75,seamPulse:7,impactScale:1.1},visual:{surface:`concrete`,tint:11841962,roughness:.9,metalness:0,sky:ad(8,1.2,15,200),fog:13158080,fogDensity:.0038,ground:7105124,scenery:`city`}},metal:{id:`metal`,name:`Sheet Metal`,muStatic:.35,muKinetic:.22,rollingResistance:.006,restitution:.45,restitutionThreshold:1,spinDamping:.3,compliance:.05,seamSpacing:3,medium:`none`,acoustic:{rollBands:[[340,6,.6],[880,9,.55],[2100,10,.4],[4300,8,.25]],rumbleHz:90,rollGain:.8,brightness:.8,slideHz:3200,slideQ:3,slideGain:.7,impactModes:[[520,.5],[1240,.35],[2710,.22],[4400,.12]],impactNoise:.15,seamGain:.7,reverb:.35},haptic:{rollTexture:.35,seamPulse:6,impactScale:1.2},visual:{surface:`metal`,tint:11187391,roughness:.28,metalness:.95,sky:ad(10,.8,8,250),fog:9082536,fogDensity:.0045,ground:2896184,scenery:`industrial`}},ice:{id:`ice`,name:`Ice`,muStatic:.06,muKinetic:.03,rollingResistance:.003,restitution:.2,restitutionThreshold:1.4,spinDamping:.05,compliance:.05,seamSpacing:0,medium:`none`,acoustic:{rollBands:[[2200,2,.4],[5200,2.5,.3]],rumbleHz:60,rollGain:.35,brightness:.9,slideHz:5200,slideQ:1.5,slideGain:.6,impactModes:[[900,.12],[2300,.08],[4100,.05]],impactNoise:.5,seamGain:0,reverb:.4},haptic:{rollTexture:.08,seamPulse:0,impactScale:1},visual:{surface:`ice`,tint:5210030,roughness:.06,metalness:.1,transparent:!0,opacity:.88,sky:ad(2,2.5,12,120),fog:14543346,fogDensity:.004,ground:15265523,scenery:`glacier`}},water:{id:`water`,name:`Water`,muStatic:.4,muKinetic:.3,rollingResistance:.01,restitution:.15,restitutionThreshold:1.5,spinDamping:1.5,compliance:.6,seamSpacing:0,medium:`water`,mediumParams:{depth:1.35,flow:14,drag:1.4,buoyancy:.28},acoustic:{rollBands:[[300,.8,.6],[900,1,.5],[2600,1.2,.35]],rumbleHz:50,rollGain:.5,brightness:.4,slideHz:1800,slideQ:.8,slideGain:.4,impactModes:[[350,.08],[800,.05]],impactNoise:.9,seamGain:0,reverb:.25},haptic:{rollTexture:.3,seamPulse:0,impactScale:.6},visual:{surface:`aqueduct`,tint:14273970,roughness:.7,metalness:0,sky:ad(3,1.8,35,140),fog:11065574,fogDensity:.0035,ground:3111498,scenery:`tropical`,water:4175817}},glass:{id:`glass`,name:`Glass`,muStatic:.45,muKinetic:.3,rollingResistance:.004,restitution:.5,restitutionThreshold:.9,spinDamping:.2,compliance:.02,seamSpacing:8,medium:`none`,acoustic:{rollBands:[[1800,8,.3],[3600,10,.25]],rumbleHz:120,rollGain:.4,brightness:1,slideHz:4200,slideQ:5,slideGain:.45,impactModes:[[1650,.6],[3900,.4],[6100,.25]],impactNoise:.05,seamGain:.5,reverb:.3},haptic:{rollTexture:.12,seamPulse:5,impactScale:1.3},visual:{surface:`glass`,tint:13627381,roughness:.02,metalness:0,transparent:!0,opacity:.35,sky:ad(2,1.2,28,90),fog:13940890,fogDensity:.0028,ground:10185541,scenery:`canyon`}},rubber:{id:`rubber`,name:`Rubber`,muStatic:1.05,muKinetic:.85,rollingResistance:.03,restitution:.62,restitutionThreshold:.6,spinDamping:1.2,compliance:.8,seamSpacing:0,medium:`none`,acoustic:{rollBands:[[60,1,1],[180,1.5,.4]],rumbleHz:45,rollGain:.55,brightness:.1,slideHz:1900,slideQ:12,slideGain:.6,squeak:.9,impactModes:[[75,.12],[150,.07]],impactNoise:.3,seamGain:0,reverb:.15},haptic:{rollTexture:.25,seamPulse:0,impactScale:.85},visual:{surface:`rubber`,tint:5725032,roughness:.8,metalness:0,sky:ad(10,1.2,5,200),fog:3811930,fogDensity:.0035,ground:1842483,scenery:`neon`}},sand:{id:`sand`,name:`Sand`,muStatic:.7,muKinetic:.6,rollingResistance:.05,restitution:.05,restitutionThreshold:2,spinDamping:1.5,compliance:.9,seamSpacing:0,medium:`sand`,mediumParams:{sinkDrag:.06,looseFactor:2.2,firmHalfWidth:1.1},acoustic:{rollBands:[[1600,.6,.6],[4200,.7,.45]],rumbleHz:40,rollGain:.6,brightness:.7,slideHz:3e3,slideQ:.5,slideGain:.5,impactModes:[[120,.04]],impactNoise:1,seamGain:0,reverb:.1},haptic:{rollTexture:.55,seamPulse:0,impactScale:.5},visual:{surface:`sand`,tint:14728060,roughness:.95,metalness:0,sky:ad(6,1,40,180),fog:15257504,fogDensity:.003,ground:14198888,scenery:`desert`}},mud:{id:`mud`,name:`Mud`,muStatic:.9,muKinetic:.5,rollingResistance:.06,restitution:.03,restitutionThreshold:2.5,spinDamping:2,compliance:.95,seamSpacing:0,medium:`mud`,mediumParams:{viscous:.35,gripVariation:.55},acoustic:{rollBands:[[110,1.5,.9],[380,2,.6]],rumbleHz:50,rollGain:.7,brightness:.2,slideHz:700,slideQ:2,slideGain:.7,impactModes:[[90,.1],[260,.06]],impactNoise:.9,seamGain:0,reverb:.12},haptic:{rollTexture:.6,seamPulse:0,impactScale:.55},visual:{surface:`mud`,tint:6965808,roughness:.55,metalness:0,sky:ad(12,2.5,18,210),fog:8161900,fogDensity:.006,ground:3033636,scenery:`jungle`}},stone:{id:`stone`,name:`Polished Stone`,muStatic:.4,muKinetic:.28,rollingResistance:.005,restitution:.4,restitutionThreshold:1,spinDamping:.3,compliance:.02,seamSpacing:5,medium:`none`,acoustic:{rollBands:[[260,3,.7],[1300,4,.4],[3400,4,.2]],rumbleHz:80,rollGain:.6,brightness:.6,slideHz:2800,slideQ:2,slideGain:.5,impactModes:[[700,.14],[1900,.08],[3600,.05]],impactNoise:.3,seamGain:.45,reverb:.45},haptic:{rollTexture:.15,seamPulse:6,impactScale:1.2},visual:{surface:`marble`,tint:13616046,roughness:.12,metalness:0,sky:ad(3,1.4,30,130),fog:15129800,fogDensity:.0032,ground:12101768,scenery:`temple`}},grating:{id:`grating`,name:`Steel Grating`,muStatic:.5,muKinetic:.35,rollingResistance:.018,restitution:.4,restitutionThreshold:.8,spinDamping:.5,compliance:.1,seamSpacing:.3,medium:`grating`,mediumParams:{barSpacing:.3,kick:.05},acoustic:{rollBands:[[620,4,.5],[1900,5,.45],[3700,6,.3]],rumbleHz:100,rollGain:.6,brightness:.8,slideHz:3400,slideQ:2.5,slideGain:.6,impactModes:[[640,.3],[1580,.2],[3300,.12]],impactNoise:.2,seamGain:.8,reverb:.3},haptic:{rollTexture:.2,seamPulse:5,impactScale:1.1},visual:{surface:`grating`,tint:9211795,roughness:.45,metalness:.85,transparent:!0,sky:ad(14,.6,10,260),fog:5922662,fogDensity:.005,ground:2040358,scenery:`industrial`}},snow:{id:`snow`,name:`Snow`,muStatic:.35,muKinetic:.18,rollingResistance:.035,restitution:.05,restitutionThreshold:2.5,spinDamping:.9,compliance:.95,seamSpacing:0,medium:`snow`,mediumParams:{powderDrag:.09,packedHalfWidth:1.4},acoustic:{rollBands:[[900,.8,.5],[2600,.9,.35]],rumbleHz:40,rollGain:.5,brightness:.5,slideHz:2200,slideQ:.7,slideGain:.4,impactModes:[[110,.05]],impactNoise:1,seamGain:0,reverb:.2},haptic:{rollTexture:.3,seamPulse:0,impactScale:.5},visual:{surface:`snow`,tint:10728650,roughness:.92,metalness:0,sky:ad(3,2.2,20,150),fog:15134195,fogDensity:.005,ground:15791352,scenery:`alpine`}}},sd=[`wood`,`concrete`,`metal`,`ice`,`water`,`glass`,`rubber`,`sand`,`mud`,`stone`,`grating`,`snow`],cd={magnetBoostAccel:58,magnetBoostCap:180,magnetDrain:.035,magnetRegen:.6,gutterCruise:150,tubeFlowCap:160,tubeFlowAccel:50,driveAccel:[0,6,10],driveCap:[0,70,110],jumpSpeed:11,magnetAccel:160,maxSpeed:260},ld={radius:1.15,mass:1,gravity:9.81,steerAccel:20,steerDirectFrac:.72,airSteerAccel:13,driveAccel:[0,2.6,3.6],driveCap:[0,30,38],airDrag:6e-4,jumpSpeed:8.6,jumpCooldown:.55,coyoteTime:.12,magnetPressG:4.2,magnetBoostAccel:30,magnetBoostCap:115,magnetAccel:115,magnetRange:60,magnetDrain:.1,magnetRegen:.45,magnetMinRestart:.05,tubeFlowAccel:24,tubeFlowCap:72,gutterCruise:62,turboDuration:7,turboChargeTime:1,maxSpeed:160},ud=new H,dd=new H,fd=new H,pd=new H,md=new H,hd=new H,gd=new H,_d=new H,vd=new Rt,yd=.2,bd=new H(0,1,0),xd=class e{get mainProj(){return this.projs[0]}constructor(e,t,n={}){J(this,`p`,new H),J(this,`v`,new H),J(this,`w`,new H),J(this,`q`,new Rt),J(this,`tune`,void 0),J(this,`proj`,void 0),J(this,`track`,void 0),J(this,`tracks`,void 0),J(this,`projs`,void 0),J(this,`junctions`,[]),J(this,`activeIndex`,0),J(this,`pushCombo`,0),J(this,`comboTimer`,0),J(this,`turboCharge`,0),J(this,`turboArmed`,!1),J(this,`turboArmTimer`,0),J(this,`turboTime`,0),J(this,`material`,void 0),J(this,`n`,new H(0,1,0)),J(this,`contact`,!1),J(this,`contactSource`,`track`),J(this,`sinceContact`,1),J(this,`airborne`,!0),J(this,`airborneTime`,0),J(this,`normalAccel`,0),J(this,`slipSpeed`,0),J(this,`spinPrevN`,new H),J(this,`spinPrevValid`,!1),J(this,`lastClack`,-1),J(this,`steerSmooth`,0),J(this,`rollingState`,`airborne`),J(this,`jumpTimer`,0),J(this,`magnetActive`,!1),J(this,`magnetEngaged`,!1),J(this,`magnetEnergy`,1),J(this,`magnetForce`,0),J(this,`magnetTarget`,new H),J(this,`netLift`,!1),J(this,`netTime`,0),J(this,`liftTime`,0),J(this,`liftSide`,1),J(this,`magnetHasTarget`,!1),J(this,`magnetSuppress`,0),J(this,`boosting`,!1),J(this,`pushTimer`,0),J(this,`brakeLeft`,0),J(this,`nudgeTimer`,0),J(this,`sinceBrake`,99),J(this,`airJumpsLeft`,0),J(this,`magnetRamp`,0),J(this,`wasMagnetAirborne`,!1),J(this,`submersion`,0),J(this,`inTunnel`,!1),J(this,`lastSeamIndex`,-1),J(this,`driveLevel`,1),J(this,`t`,0),J(this,`events`,[]),J(this,`I`,void 0),J(this,`predict`,!1),J(this,`liftPath`,[]),J(this,`liftDur`,1.2),J(this,`liftVf`,14),this.tune={...ld,...n},this.material=t,e instanceof $u?this.tracks=[e]:Array.isArray(e)?this.tracks=e:(this.tracks=e.all,this.junctions=e.junctions??[]),this.projs=this.tracks.map(e=>new td(e)),this.track=this.tracks[0],this.proj=this.projs[0],this.I=.4*this.tune.mass*this.tune.radius*this.tune.radius}copyStateFrom(t){let n=this,r=t;for(let t of Object.keys(r)){if(e.NO_COPY.has(t))continue;let i=r[t],a=n[t];i instanceof H&&a instanceof H||i instanceof Rt&&a instanceof Rt?a.copy(i):Array.isArray(i)?n[t]=i.map(e=>Array.isArray(e)?[...e]:e):typeof i==`object`&&i||(n[t]=i)}t.projs.forEach((e,t)=>this.projs[t].copyFrom(e)),this.track=this.tracks[this.activeIndex],this.proj=this.projs[this.activeIndex],this.events.length=0}placeAt(e,t=0,n=0,r=0){let i=new H,a=new H,o=new H,s=new H;this.activeIndex=Math.min(r,this.tracks.length-1),this.track=this.tracks[this.activeIndex],this.proj=this.projs[this.activeIndex],this.track.frameAtS(e,i,a,o,s),this.p.copy(i).addScaledVector(o,this.tune.radius+.002).addScaledVector(s,n),this.v.copy(a).multiplyScalar(t),this.w.copy(o).cross(this.v).multiplyScalar(1/this.tune.radius),this.n.copy(o),this.netLift=!1,this.netTime=0,this.proj.reset(e),this.proj.project(this.p.x,this.p.y,this.p.z);for(let e=0;e<this.projs.length;e++)e!==this.activeIndex&&(this.projs[e].relocate(this.p.x,this.p.y,this.p.z),this.projs[e].project(this.p.x,this.p.y,this.p.z));this.contact=!0,this.airborne=!1,this.sinceContact=0,this.airborneTime=0,this.magnetEnergy=1,this.magnetActive=!1,this.magnetEngaged=!1,this.jumpTimer=0,this.lastSeamIndex=-1,this.rollingState=`rolling`,this.spinPrevValid=!1,this.steerSmooth=0,this.brakeLeft=0,this.sinceBrake=99,this.pushCombo=0,this.comboTimer=0,this.turboCharge=0,this.turboArmed=!1,this.turboTime=0}turboMul(){return 1+Math.min(1,this.turboTime)}emit(e,t,n,r){this.events.push({type:e,t:this.t,intensity:Math.max(0,Math.min(1,t)),magnitude:n,source:r,material:this.material.id})}sdfAndNormal(e,t=!0,n=!1){let r=this.sdfTrack(this.activeIndex,e,t,n);if(!this.junctions.length)return r;let i=this.activeIndex,a=this.proj.s;for(let o of this.junctions){let s=-1,c=null;if(o.a===i&&a>=o.aS[0]&&a<=o.aS[1]?(s=o.b,c=o.bS):o.b===i&&a>=o.bS[0]&&a<=o.bS[1]&&(s=o.a,c=o.aS),s<0||!c)continue;let l=this.projs[s];l.project(this.p.x,this.p.y,this.p.z);let u=this.tracks[s].length;if(l.s<Math.max(.3,c[0])||l.s>Math.min(u-.3,c[1])||Math.abs(l.along)>3)continue;let d=this.depthTrack(i,gd,!1),f=this.depthTrack(s,_d,!1),p=this.sdfTrack(s,pd,t,n),m=Math.max(r,f),h=Math.max(p,d);return m<=h?(f>r&&this.depthTrack(s,e,!0),m):(d>p?this.depthTrack(i,e,!0):e.copy(pd),h)}return r}depthTrack(e,t,n){let r=this.projs[e],i=this.tracks[e],a=(e,t,n)=>i.channelDepthLocal(e,t,n),o=a(r.s,r.x,r.y);if(!n)return o;let s=.01,c=(a(r.s+s,r.x,r.y)-a(r.s-s,r.x,r.y))/(2*s),l=(a(r.s,r.x+s,r.y)-a(r.s,r.x-s,r.y))/(2*s),u=(a(r.s,r.x,r.y+s)-a(r.s,r.x,r.y-s))/(2*s);t.set(0,0,0).addScaledVector(r.T,c).addScaledVector(r.R,l).addScaledVector(r.U,u);let d=t.length();return d>1e-6?t.multiplyScalar(1/d):t.copy(r.U),o}sdfTrack(e,t,n,r){let i=this.projs[e],a=this.tracks[e],o=i.s,s=i.x,c=i.y,l=(e,t,i)=>a.sdfLocal(e,t,i,n,r),u=l(o,s,c),d=.01,f=(l(o+d,s,c)-l(o-d,s,c))/(2*d),p=(l(o,s+d,c)-l(o,s-d,c))/(2*d),m=(l(o,s,c+d)-l(o,s,c-d))/(2*d);t.set(0,0,0).addScaledVector(i.T,f).addScaledVector(i.R,p).addScaledVector(i.U,m);let h=t.length();return h>1e-6?t.multiplyScalar(1/h):t.copy(i.U),u}step(e,t){for(let t of this.tracks)t.time+=e;let n=this.tune,r=n.mass,i=n.radius,a=this.material;this.t+=e,this.driveLevel=t.driveLevel,this.selectTrack();let o=this.proj,s=this.sinceContact<=n.coyoteTime,c=(this.track.isTunnel(o.s)||this.track.isTube(o.s))&&Math.abs(o.x)<this.track.halfWidthAt(o.s)+.5;c!==this.inTunnel&&(this.emit(c?`TUNNEL_ENTER`:`TUNNEL_EXIT`,1),this.inTunnel=c);let l=ud.set(0,-n.gravity,0),u=this.v.length();l.addScaledVector(this.v,-n.airDrag*u),this.updateMedium(l,e);let d=this.n,f=dd.copy(o.T).addScaledVector(d,-o.T.dot(d));f.lengthSq()<1e-6&&f.copy(o.T),f.normalize();let p=fd.copy(o.R).addScaledVector(d,-o.R.dot(d));if(p.lengthSq()<1e-6&&p.copy(o.R),p.normalize(),this.track.tubeAt(o.s)>.5&&(p.copy(f).cross(d),p.lengthSq()<1e-6&&p.copy(o.R),p.normalize()),s){let r=this.v.dot(p),a=1+Math.max(0,Math.min(1.6,(u-18)/28)),s=9+Math.min(10,u*.12),c=this.track.profileAt(o.s).a,m=this.track.tubeAt(o.s),h=Math.max(m,Math.min(1,Math.max(0,(Math.abs(o.x)-c*.45)/(c*.55+this.track.profile.rc*.5)))),g=h*h*(3-2*h);this.steerSmooth+=(t.steer-this.steerSmooth)*Math.min(1,e*(5+20*g));let _=this.steerSmooth,v=Math.max(0,Math.min(1,1-(Math.sign(_)*r-s)/5)),y=_*n.steerAccel*a*v*(.6+.4*g);l.addScaledVector(p,y*n.steerDirectFrac);let b=1-Math.max(0,Math.min(1,(Math.abs(o.x)-c*.6)/(c*.5)));l.addScaledVector(p,-r*.5*b*(1-Math.min(1,Math.abs(_))));let x=y*(1-n.steerDirectFrac)*3.5/i*e,S=new H().copy(d).cross(p);this.w.addScaledVector(S,x);let C=Math.max(0,Math.min(2,t.driveLevel|0)),w=this.v.dot(f),T=Math.max(0,Math.min(1,(n.driveCap[C]*this.turboMul()-w)/6)),E=n.driveAccel[C]*T;if(E>0){l.addScaledVector(f,E*.3);let t=new H().copy(d).cross(f);this.w.addScaledVector(t,E*.7*3.5/i*e)}}else{let r=this.track.tubeAt(o.s)>.5,i=(this.magnetActive?1.4:1)*(1+Math.max(0,Math.min(.6,(u-18)/40)));{let e=r?p:o.R,a=this.v.length(),s=e.x,c=e.y,u=e.z,d=a>.001?(s*this.v.x+c*this.v.y+u*this.v.z)/a:0,f=t.steer*n.airSteerAccel*i;l.x+=(s-(a>.001?d*this.v.x/a:0))*f,l.y+=(c-(a>.001?d*this.v.y/a:0))*f,l.z+=(u-(a>.001?d*this.v.z/a:0))*f}if(!r&&Math.abs(t.steer)>.02){let n=this.v.x,r=this.v.z;if(Math.hypot(n,r)>2){let a=Math.sign(o.R.x*-r+o.R.z*n)||1,s={x:n,z:r},c=t.steer*.7*i*e*a,l=Math.cos(c),u=Math.sin(c),d=s.x*l-s.z*u,f=s.x*u+s.z*l;this.v.x=d,this.v.z=f}}}{let e=this.track.tubeAt(o.s),t=this.v.dot(o.T),r=this.turboMul(),i=!1;for(let e of this.junctions)e.bS[0]===0&&(this.activeIndex===e.a&&o.s>e.aS[0]-60&&o.s<e.aS[1]&&(i=!0),this.activeIndex===e.b&&o.s<e.bS[1]&&(i=!0));if(e>.3){let a=this.track.warpCap[Math.max(0,Math.min(this.track.n-1,Math.round(o.s/this.track.ds)))]||n.tubeFlowCap,s=Math.max(0,Math.min(1,((i?Math.min(28,a):a)*r-t)/10));l.addScaledVector(o.T,n.tubeFlowAccel*(r>1?1.6:1)*s*Math.min(1,(e-.3)/.5))}else t>n.gutterCruise*r&&!this.boosting&&l.addScaledVector(o.T,-(t-n.gutterCruise*r)*.9);if(r>1&&e<=.3){let e=Math.max(0,Math.min(1,(n.gutterCruise*r-t)/10));l.addScaledVector(o.T,16*e*(r-1))}}{let e=this.track.lift[Math.max(0,Math.min(this.track.n-1,Math.round(o.s/this.track.ds)))];if(e>0&&this.sinceContact<.1){let t=this.v.dot(o.T);l.addScaledVector(o.T,Math.max(-40,Math.min(30,(e-t)*6))+n.gravity*Math.max(0,o.T.y)),l.addScaledVector(o.R,-o.x*3-this.v.dot(o.R)*2);let r=Math.floor(o.s/1.2);r!==this.lastClack&&(this.lastClack=r,this.emit(`LIFT_CLACK`,.6,t))}}if(this.pushTimer-=e,this.comboTimer-=e,this.comboTimer<=0&&!this.turboArmed&&(this.pushCombo=0,this.turboCharge=0),this.turboArmed&&(this.turboArmTimer-=e,this.turboArmTimer<=0&&(this.turboArmed=!1,this.pushCombo=0,this.turboCharge=0)),this.turboTime>0&&(this.turboTime-=e,this.turboTime<=0&&(this.turboTime=0,this.emit(`TURBO_END`,1))),t.push&&t.push>0&&s&&this.pushTimer<=0){let e=ud.copy(f);if(this.turboArmed)this.turboArmed=!1,this.pushCombo=0,this.turboCharge=0,this.turboTime=n.turboDuration,this.v.addScaledVector(e,14),this.w.addScaledVector(new H().copy(d).cross(e),14/i),this.emit(`TURBO_START`,1,14);else{this.pushCombo=Math.min(3,this.pushCombo+1),this.comboTimer=6;let n=(4+5*Math.min(1,t.push))*(1+.2*(this.pushCombo-1));this.v.addScaledVector(e,n),this.w.addScaledVector(new H().copy(d).cross(e),n/i),this.emit(`PUSH`,Math.min(1,t.push),n)}this.pushTimer=.25}if(this.sinceBrake+=e,t.brake&&t.brake>0&&s){let e=u*(.12+.08*Math.min(1,t.brake))+2.5;this.brakeLeft=Math.min(u+1,this.brakeLeft+e),this.sinceBrake=0,this.turboTime>0&&(this.turboTime=0,this.emit(`TURBO_END`,1)),this.emit(`BRAKE`,Math.min(1,t.brake),e)}if(this.brakeLeft>0){if(!s)this.brakeLeft=Math.max(0,this.brakeLeft-30*e);else{let t=this.v.length(),n=Math.min(this.brakeLeft,38*e,t);if(this.brakeLeft-=n,t>1e-6){let e=(t-n)/t;this.v.multiplyScalar(e),this.w.multiplyScalar(e)}this.v.length()<.4&&(this.brakeLeft=0)}}if(this.nudgeTimer-=e,t.nudge&&Math.abs(t.nudge)>.05&&this.nudgeTimer<=0){let e=new H().copy(o.R).addScaledVector(d,s?-o.R.dot(d):0);s&&this.track.tubeAt(o.s)>.5&&e.copy(f).cross(d),e.lengthSq()<1e-6&&e.copy(o.R),e.normalize();let n=(s?3.2+3.2*Math.min(1,Math.abs(t.nudge)):1.6+1.4*Math.min(1,Math.abs(t.nudge)))*Math.sign(t.nudge);this.v.addScaledVector(e,n),s&&this.w.addScaledVector(new H().copy(d).cross(e),n/i),this.nudgeTimer=s?.12:.25,this.emit(`NUDGE`,Math.min(1,Math.abs(t.nudge)),n)}if(this.jumpTimer-=e,t.jump&&s&&this.jumpTimer<=0){let e=n.jumpSpeed+Math.min(3.5,Math.max(0,u-20)*.06);this.v.addScaledVector(d,e),this.jumpTimer=n.jumpCooldown,this.sinceContact=n.coyoteTime+.01,this.magnetSuppress=.22,this.airJumpsLeft=1,this.emit(`JUMP`,1,e)}else if(t.jump&&!s&&this.airJumpsLeft>0&&this.jumpTimer<=n.jumpCooldown-.12){this.airJumpsLeft--;let e=ud.copy(o.U).multiplyScalar(.6).addScaledVector(bd,.4).normalize(),t=this.v.dot(e);this.v.addScaledVector(e,Math.max(0,-t)*.9+n.jumpSpeed*1.05),this.w.addScaledVector(o.R,18),this.magnetSuppress=.18,this.jumpTimer=n.jumpCooldown,this.emit(`DOUBLE_JUMP`,1,n.jumpSpeed*1.05)}this.magnetSuppress-=e,this.updateMagnet(l,t,e),this.updateNetLift(l,e),this.v.addScaledVector(l,e);{let e=this.v.length();e>n.maxSpeed&&this.v.multiplyScalar(n.maxSpeed/e)}this.p.addScaledVector(this.v,e),this.applyNetLift(e),this.selectTrack();let m=!1,h=0,g=`track`,_=0;for(let t=0;t<3;t++){let t=ud,n=this.sdfAndNormal(t),s=i-n;if(s<=0)break;let c=this.track.nearestObstacleDist(o.s,o.x,o.y)<=n+.02?`obstacle`:`track`;m=!0,this.p.addScaledVector(t,s);let l=c===`obstacle`?this.track.nearestObstacleVX(o.s,o.x,o.y):0,u=this.v.dot(t)-l*o.R.dot(t);if(u<0){-u>h&&(h=-u,g=c);let n=-(1+(this.magnetActive&&c===`track`?0:-u>a.restitutionThreshold?c===`obstacle`?Math.max(a.restitution,.35):a.restitution:0))*r*u;if(this.v.addScaledVector(t,n/r),_+=n,this.spinPrevValid&&this.sinceContact>.02){let e=this.spinPrevN.dot(t);e<.999999&&e>-.995&&(vd.setFromUnitVectors(this.spinPrevN,t),this.w.applyQuaternion(vd)),this.spinPrevN.copy(t)}this.frictionImpulse(t,n,e)}this.n.copy(t),this.contactSource=c,this.proj.project(this.p.x,this.p.y,this.p.z)}m||this.sdfAndNormal(ud,!0)<i+.015&&this.v.dot(ud)<.2&&(m=!0,this.n.copy(ud));let v=_/(r*e);if(this.normalAccel+=(v-this.normalAccel)*Math.min(1,e*30),m){if(this.spinPrevValid){let e=this.spinPrevN.dot(this.n);e>.5&&e<.999999&&(vd.setFromUnitVectors(this.spinPrevN,this.n),this.w.applyQuaternion(vd))}this.spinPrevN.copy(this.n),this.spinPrevValid=!0,this.sinceContact=0,this.rollingResistance(e);let t=this.w.dot(this.n);this.w.addScaledVector(this.n,-t*Math.min(1,a.spinDamping*e))}else this.sinceContact+=e;let y=this.sinceContact>.06;y&&!this.airborne?(this.airborne=!0,this.emit(`AIRBORNE_START`,Math.min(1,u/30),u)):!y&&this.airborne&&(this.airborne=!1,this.emit(`AIRBORNE_END`,Math.min(1,h/10),h),(this.magnetActive||this.wasMagnetAirborne)&&this.emit(`MAGNETIC_CAPTURE`,1,h),this.wasMagnetAirborne=!1),this.airborneTime=this.airborne?this.airborneTime+e:0,h>1&&this.emit(`COLLISION_IMPACT`,Math.min(1,h/12),h,g),this.contact=m;{let e=this.track,t=this.proj;if(e.pads.length&&!this.predict){let r=e.padAt(t.s,t.x,t.y,i);r>=0&&!e.padHit[r]&&(e.triggerPad(r),this.emit(`TRIGGER_PAD`,1,e.pads[r].obs.length));let a=e.hologramAt(t.s,t.x,t.y,i);if(a>=0){e.holoUsed[a]=1;let r=this.v.dot(t.T);r>0&&this.v.addScaledVector(t.T,Math.max(0,Math.min(6,n.gutterCruise*2-r))),this.turboTime=Math.max(this.turboTime,2.2),this.emit(`HOLO_BOOST`,1,r)}}}let b=`airborne`;if(m){let e=dd.copy(this.w).cross(fd.copy(this.n).multiplyScalar(-i)).add(this.v);e.addScaledVector(this.n,-e.dot(this.n)),this.slipSpeed=e.length(),b=this.slipSpeed<.25?`rolling`:this.slipSpeed<2.5?`sliding`:`skidding`}else this.slipSpeed=0;if(b!==this.rollingState&&(b===`rolling`?this.emit(`ROLLING_CONTACT`,1):b!==`airborne`&&this.rollingState!==`sliding`&&this.rollingState!==`skidding`&&this.emit(`SLIDING_CONTACT`,Math.min(1,this.slipSpeed/5),this.slipSpeed),this.rollingState=b),m&&this.contactSource===`track`&&a.seamSpacing>0){let e=Math.floor(o.s/a.seamSpacing);if(e!==this.lastSeamIndex&&this.lastSeamIndex>=0){let e=Math.min(1,u/25*(.5+Math.min(1.5,this.normalAccel/n.gravity)*.5));if(this.emit(`SURFACE_SEAM_CROSSING`,e,u),a.medium===`grating`){let e=(a.mediumParams?.kick??.05)*Math.min(u,30);this.v.addScaledVector(this.n,e*(.6+.4*Math.random()))}}this.lastSeamIndex=e}let x=this.w.length();x>1e-6&&(vd.setFromAxisAngle(ud.copy(this.w).multiplyScalar(1/x),x*e),this.q.premultiply(vd).normalize())}beamTrack(){if(this.tracks.length===1)return 0;let e=this.activeIndex,t=1/0;for(let n=0;n<this.tracks.length;n++){let r=this.projs[n],i=this.tracks[n];n!==this.activeIndex&&r.project(this.p.x,this.p.y,this.p.z),Math.abs(r.along)>3||i.isGap(r.s)||Math.abs(r.x)>i.halfWidthAt(r.s)+2||r.y<-.5||r.y<t&&(t=r.y,e=n)}return e}selectTrack(){let e=this.p.x,t=this.p.y,n=this.p.z;if(this.tracks.length===1){this.proj.project(e,t,n);return}let r=this.activeIndex,i=1/0;for(let a=0;a<this.tracks.length;a++){let o=this.projs[a];if(o.project(e,t,n),Math.abs(o.along)>3||Math.abs(o.x)>30||Math.abs(o.y)>40)continue;let s=this.tracks[a].sdfLocal(o.s,o.x,o.y,!1,!0);this.tracks[a].isGap(o.s)&&Math.abs(o.x)<this.tracks[a].halfWidthAt(o.s)+1.5&&o.y>-8&&o.y<25&&(s=Math.min(s,.5)),this.tracks[a].channelDepthLocal(o.s,o.x,o.y)<-.05&&(s+=4),a===this.activeIndex&&(s-=.3),s<i&&(i=s,r=a)}r!==this.activeIndex&&(this.activeIndex=r,this.track=this.tracks[r],this.proj=this.projs[r],this.lastSeamIndex=-1)}frictionImpulse(e,t,n){let r=this.tune.mass,i=this.tune.radius,a=this.material,o=dd.copy(e).multiplyScalar(-i),s=fd.copy(this.w).cross(o).add(this.v);s.addScaledVector(e,-s.dot(e));let c=s.length();if(c<1e-6)return;let l=r/(1+r*i*i/this.I)*c,u=this.gripMultiplier(),d=a.muStatic*u*t,f;f=l<=d?l:a.muKinetic*u*t;let p=s.multiplyScalar(-1/c);this.v.addScaledVector(p,f/r);let m=new H().copy(o).cross(p).multiplyScalar(f/this.I);this.w.add(m)}gripMultiplier(){let e=this.material;if(e.medium===`mud`){let t=e.mediumParams?.gripVariation??.5,n=this.proj.s;return 1-t*(.5+.5*Math.sin(n*.23)*Math.sin(n*.071+1.3))}let t=this.magnetActive&&this.sinceContact<=.05?1.8:1;return e.medium===`water`?(1-.5*this.submersion)*t:t}rollingResistance(e){let t=this.material,n=this.proj,r=t.rollingResistance,i=0,a=Math.abs(n.x);if(t.medium===`sand`){let e=a>(t.mediumParams?.firmHalfWidth??1.1);r*=e?t.mediumParams?.looseFactor??2:1,i+=(t.mediumParams?.sinkDrag??.05)*(e?1.6:1)}else t.medium===`mud`?i+=t.mediumParams?.viscous??.3:t.medium===`snow`&&(a>(t.mediumParams?.packedHalfWidth??1.4)?i+=t.mediumParams?.powderDrag??.08:i+=.015);let o=dd.copy(this.v).addScaledVector(this.n,-this.v.dot(this.n)),s=o.length();if(s<1e-4)return;let c=Math.max(this.normalAccel,0),l=Math.min(s,(r*c+i*s)*e);this.v.addScaledVector(o,-l/s);let u=new H().copy(this.n).cross(o).multiplyScalar(-l/s/this.tune.radius);this.w.add(u)}updateMedium(e,t){let n=this.material,r=this.proj,i=0;if(n.medium===`water`&&!this.track.isGap(r.s)&&Math.abs(r.x)<this.track.halfWidthAt(r.s)){let a=n.mediumParams?.depth??1.2,o=this.tune.radius;if(i=Math.max(0,Math.min(1,(a-(r.y-o))/(2*o))),i>0){let a=n.mediumParams?.flow??8,o=n.mediumParams?.drag??1.5,s=n.mediumParams?.buoyancy??.25;e.addScaledVector(bd,this.tune.gravity*s*i);let c=new H().copy(r.T).multiplyScalar(a).sub(this.v);e.addScaledVector(c,o*i*.5),this.w.multiplyScalar(1-Math.min(.5,2*i*t))}}i>.05&&this.submersion<=.05&&this.emit(`WATER_ENTRY`,Math.min(1,this.v.length()/12),this.v.length()),i<=.05&&this.submersion>.05&&this.emit(`WATER_EXIT`,.6),this.submersion=i}updateMagnet(e,t,n){let r=this.tune,i=t.magnet&&this.magnetSuppress<=0,a=this.sinceContact>.03;i&&!this.magnetEngaged&&(a||this.magnetEnergy>r.magnetMinRestart)&&(this.magnetEngaged=!0),i||(this.magnetEngaged=!1),this.magnetEngaged&&!a&&this.magnetEnergy<=0&&(this.magnetEngaged=!1);let o=this.magnetEngaged;o||(this.magnetRamp=0);let s=o&&!this.magnetActive;if(o!==this.magnetActive&&(this.emit(o?`MAGNET_ENGAGED`:`MAGNET_RELEASED`,1),this.magnetActive=o),this.magnetHasTarget=!1,this.magnetForce=0,this.boosting=!1,o){this.magnetEnergy=Math.max(0,this.magnetEnergy-r.magnetDrain*(a?1.6:1)*n);let t=new H,i=this.sdfAndNormal(t,!1,!0),o=this.sinceContact<=.03,c=o?this.activeIndex:this.beamTrack(),l=this.tracks[c],u=this.projs[c],d=l.profileAt(u.s),f=Bu(d),p=l.tubeAt(u.s)>.85,[m,h]=l.wallsAt(u.s);o&&(t.copy(this.n),i=0);let g=!o&&l.isTunnel(u.s)&&u.y>d.H&&Math.abs(u.x)<f+d.th,_=!o&&!p&&!g&&(Math.abs(u.x)>f-this.tune.radius*.5||u.y>(u.x<0?m:h));if(g&&Math.abs(u.along)<3){this.magnetTarget.copy(u.P).addScaledVector(u.R,Math.max(-f+1,Math.min(f-1,u.x))).addScaledVector(u.U,d.H+d.th*2.5),t.copy(this.p).sub(this.magnetTarget);let e=t.length();e>1e-4?t.multiplyScalar(1/e):t.copy(u.U),i=Math.max(0,e-this.tune.radius)}else if(!p&&!_&&!o&&Math.abs(u.along)<3&&!l.isGap(u.s)){let e=u.x*yd,n=Math.abs(e),r=n<=d.a?0:d.rc-Math.sqrt(Math.max(0,d.rc*d.rc-(Math.min(n,f)-d.a)**2));this.magnetTarget.copy(u.P).addScaledVector(u.R,e).addScaledVector(u.U,r),t.copy(this.p).sub(this.magnetTarget);let a=t.length();a>1e-4?t.multiplyScalar(1/a):t.copy(u.U),i=Math.max(0,a-this.tune.radius)}if(_&&Math.abs(u.along)<3&&!l.isGap(u.s)){let e=Math.max(-(f-1.6),Math.min(f-1.6,u.x*yd)),n=Math.abs(u.x)>f&&u.y<Math.max(m,h)+1.5;this.magnetTarget.copy(u.P).addScaledVector(u.R,n?Math.sign(u.x)*(f-1):e).addScaledVector(u.U,n?Math.max(m,h)+3:.05),t.copy(this.p).sub(this.magnetTarget),i=t.length(),i>1e-4?t.multiplyScalar(1/i):t.copy(u.U),i=Math.max(0,i-this.tune.radius)}if(i<r.magnetRange){if(!_&&!g&&(o||p)&&this.magnetTarget.copy(this.p).addScaledVector(t,-i),this.magnetHasTarget=!0,this.sinceContact<=.03){e.addScaledVector(t,-r.magnetPressG*r.gravity);{let n=md.set(0,-r.gravity,0);n.addScaledVector(t,-n.dot(t));let i=hd.copy(this.proj.T).addScaledVector(t,-this.proj.T.dot(t));i.lengthSq()>1e-6&&(i.normalize(),n.addScaledVector(i,-n.dot(i))),e.addScaledVector(n,-.9)}let i=this.v.dot(t);i>0&&this.v.addScaledVector(t,-i*Math.min(1,n*25));let a=new H().copy(this.proj.T).addScaledVector(t,-this.proj.T.dot(t));if(a.lengthSq()>1e-6){a.normalize();let i=this.v.dot(a),o=Math.max(0,Math.min(1,(r.magnetBoostCap*this.turboMul()-i)/8));e.addScaledVector(a,r.magnetBoostAccel*o),this.w.addScaledVector(new H().copy(t).cross(a),r.magnetBoostAccel*o*n/this.tune.radius),this.boosting=o>.05||this.turboTime>0,this.pushCombo>=3&&!this.turboArmed&&this.turboTime<=0&&(this.turboCharge+=n,this.comboTimer=Math.max(this.comboTimer,.5),this.turboCharge>=r.turboChargeTime&&(this.turboArmed=!0,this.turboArmTimer=4,this.emit(`TURBO_ARMED`,1)))}this.magnetForce=.85}else{this.wasMagnetAirborne=!0;let a=1-Sd(r.magnetRange*.55,r.magnetRange,i);s&&this.v.addScaledVector(t,-Math.min(9,3+i*.3)),this.magnetRamp=Math.min(1,this.magnetRamp+n/.05);let o=r.magnetAccel*a*(.6+.4*this.magnetRamp),c=this.v.dot(t),l=-c,u=8+4.5*Math.max(0,i);l>u?e.addScaledVector(t,Math.min(320,(l-u)*22)):e.addScaledVector(t,-o),c>0&&e.addScaledVector(t,-c*7*a);{let n=md.copy(this.proj.R).addScaledVector(t,-this.proj.R.dot(t));n.lengthSq()>1e-6&&(n.normalize(),e.addScaledVector(n,-this.v.dot(n)*3.5*a))}this.magnetForce=Math.min(1,o/r.magnetAccel)}}}else this.magnetEnergy=this.sinceContact<=.05?Math.min(1,this.magnetEnergy+r.magnetRegen*n):Math.min(1,this.magnetEnergy+r.magnetRegen*.35*n)}updateNetLift(e,t){let n=this.track,r=this.proj;if(this.netLift)return;let i=n.netAt(r.s)&&r.y<n.netYAt(r.s)+3.2&&r.y<-.3&&Math.abs(r.along)<2;if(i&&this.sinceContact<.08){let e=this.v.dot(r.T),n=1-Math.exp(-7*t);this.v.addScaledVector(r.T,e*n).multiplyScalar(1-n)}if(i&&this.sinceContact<.25&&this.netTime===0&&(this.emit(`NET_CATCH`,1),this.netTime=1e-6),this.netTime>0){if(!i&&this.sinceContact>.5){this.netTime=0;return}this.netTime+=t,this.netTime>.6&&this.startNetLift()}}startNetLift(){let e=this.track,t=this.proj,n=e.profileAt(t.s),r=n.a+n.rc,[i,a]=e.wallsAt(t.s),o=Math.max(i,a),s=t.x>=0?1:-1,c=Math.max(14,Math.min(40,this.v.dot(t.T))),l=t.s,u=this.tune.radius,d=s*Math.max(r+3.5,Math.abs(t.x)*.8);this.liftPath=[[l,t.x,t.y],[l+c*.25,d,t.y+2],[l+c*.55,s*(r+3),o+3.2],[l+c*.85,s*1.5,o+1.6],[l+c*1.15,0,u+.05]],this.liftDur=1.15,this.liftVf=c,this.netLift=!0,this.liftTime=0,this.liftSide=s,this.emit(`MAGNET_ENGAGED`,1)}liftPoint(e,t){let n=this.liftPath,r=n.length-1,i=Math.max(0,Math.min(.9999,e))*r,a=Math.floor(i),o=i-a,s=e=>n[Math.max(0,Math.min(r,e))],c=e=>{let t=s(a-1)[e],n=s(a)[e],r=s(a+1)[e],i=s(a+2)[e];return .5*(2*n+(-t+r)*o+(2*t-5*n+4*r-i)*o*o+(-t+3*n-3*r+i)*o*o*o)},l=c(0),u=c(1),d=c(2),f=new H,p=new H,m=new H,h=new H;return this.track.frameAtS(l,f,p,m,h),t.copy(f).addScaledVector(h,u).addScaledVector(m,d)}applyNetLift(e){if(!this.netLift)return;this.liftTime+=e;let t=this.liftTime/this.liftDur,n=this.liftPoint(t,new H);this.v.subVectors(n,this.p).multiplyScalar(1/Math.max(e,1e-4)),this.p.copy(n);let r=this.liftPath[this.liftPath.length-1];if(this.magnetHasTarget=!0,this.magnetForce=1,this.liftPointLocal(r,this.magnetTarget),t>=1){let e=new H,t=new H,n=new H,i=new H;this.track.frameAtS(r[0],e,t,n,i),this.v.copy(t).multiplyScalar(this.liftVf).addScaledVector(n,-1),this.netLift=!1,this.netTime=0,this.emit(`MAGNETIC_CAPTURE`,1)}}liftPointLocal(e,t){let n=new H,r=new H,i=new H,a=new H;return this.track.frameAtS(e[0],n,r,i,a),t.copy(n).addScaledVector(a,e[1]).addScaledVector(i,e[2])}followGhost(e,t){let n=dd.subVectors(e,this.p).multiplyScalar(1/Math.max(t,.001));n.length()>150&&n.copy(this.v),this.v.lerp(n,.6),this.p.copy(e),this.t+=t,this.selectTrack();let r=this.sdfAndNormal(ud),i=this.tune.radius;this.contact=r<i+.12,this.contact&&this.n.copy(ud),this.w.copy(this.n).cross(this.v).multiplyScalar(1/i),this.airborne=!this.contact,this.airborneTime=this.airborne?this.airborneTime+t:0,this.magnetActive=!1,this.boosting=!1,this.slipSpeed=0}snapshot(){let e=this.proj;return{t:this.t,speed:this.v.length(),angularSpeed:this.w.length(),contact:this.contact,rollingState:this.rollingState,normalAccel:this.normalAccel,slipSpeed:this.slipSpeed,material:this.material.id,airborneTime:this.airborneTime,magnetActive:this.magnetActive,magnetForce:this.magnetForce,magnetEnergy:this.magnetEnergy,boosting:this.boosting,pushCombo:this.pushCombo,turboArmed:this.turboArmed,turboActive:this.turboTime>0,submersion:this.submersion,inTunnel:this.inTunnel,lateral:e.x,height:e.y,s:e.s,driveLevel:this.driveLevel}}};J(xd,`NO_COPY`,new Set([`tracks`,`projs`,`proj`,`track`,`tune`,`material`,`I`,`events`,`junctions`,`predict`]));function Sd(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}var Cd=class{constructor(e,t,n={}){J(this,`ball`,void 0),J(this,`phase`,`ready`),J(this,`time`,0),J(this,`falls`,0),J(this,`checkpointIndex`,0),J(this,`respawnTimer`,0),J(this,`stuckTimer`,0),J(this,`outsideTimer`,0),J(this,`underTimer`,0),J(this,`lastGood`,{track:0,s:0,v:0}),J(this,`finishTime`,0),J(this,`fixedDt`,1/240),J(this,`acc`,0),J(this,`pendingEvents`,[]),J(this,`onPhase`,void 0),J(this,`track`,void 0),J(this,`course`,void 0),J(this,`finishRoute`,0),this.course=e instanceof nd?e:{main:e,branches:[],all:[e]},this.track=this.course.main,this.ball=new xd(this.course,t,n),this.reset()}reset(){this.phase=`ready`,this.time=0,this.falls=0,this.checkpointIndex=0;for(let e of this.course.all)e.resetHolograms();this.ball.placeAt(this.track.checkpoints[0],0),this.lastGood={track:0,s:this.track.checkpoints[0],v:0}}launch(){if(this.phase!==`ready`)return;this.track;let e=this.ball;e.v.addScaledVector(e.proj.T,7),e.w.copy(e.n).cross(e.v).multiplyScalar(1/e.tune.radius),this.setPhase(`running`)}setPhase(e){this.phase=e,this.onPhase?.(e)}update(e,t){let n=Math.min(e,.1),r=0;if(this.phase===`ready`)return 0;if(this.phase===`respawning`){if(this.respawnTimer-=n,this.respawnTimer<=0){let e=this.lastGood,t=this.course.all[e.track]??this.track,n=Math.max(4,Math.min(t.length-70,e.s)),r=0;for(;r++<200&&n<t.length-70&&(t.isGap(n)||t.isGap(n+8)||t.isSteepOrInverted(n));)n+=3;t.isGap(n)||t.isSteepOrInverted(n)?(n=this.track.checkpoints[this.checkpointIndex],this.ball.placeAt(n,22,0,0)):this.ball.placeAt(n,Math.max(22,Math.min(60,e.v)),0,e.track),this.outsideTimer=0,this.underTimer=0,this.stuckTimer=0,this.setPhase(`running`)}return 0}for(this.acc+=n,t.jump;this.acc>=this.fixedDt;){this.acc-=this.fixedDt;let e=r===0?t:{...t,jump:!1,push:0};if(this.ball.step(this.fixedDt,e),r++,this.phase===`running`&&(this.time+=this.fixedDt),this.rules(),this.phase===`respawning`)break}return this.ball.events.length&&(this.pendingEvents.push(...this.ball.events),this.ball.events.length=0),r}rules(){let e=this.ball,t=e.proj,n=e.mainProj,r=e.activeIndex===0,i=this.track;for(;r&&this.checkpointIndex+1<i.checkpoints.length&&n.s>i.checkpoints[this.checkpointIndex+1]+3;)this.checkpointIndex++;let a=i.length-62,o=e.track,s=r||!!o.layout.finishLine;if(this.phase===`running`&&(r&&n.s>a||!r&&s&&t.s>o.length-62)&&(this.finishRoute=e.activeIndex,this.finishTime=this.time,this.setPhase(`finished`)),this.phase===`finished`){e.v.multiplyScalar(1-.6*this.fixedDt),e.w.multiplyScalar(1-.6*this.fixedDt);return}if(e.contact&&Number.isFinite(e.v.x)&&Math.abs(t.along)<3&&e.track.channelDepthLocal(t.s,t.x,t.y)>.3&&!e.track.isGap(t.s)&&(this.lastGood={track:e.activeIndex,s:t.s,v:e.v.length()}),!Number.isFinite(e.p.x+e.p.y+e.p.z+e.v.x+e.v.y+e.v.z)){this.fail();return}let c=e.track.halfWidthAt(t.s),l=Math.abs(t.x)>c+1.5&&t.y<e.track.profile.H-1,u=t.y<-40||Math.abs(t.x)>60||Math.abs(t.along)>60,d=Math.abs(t.x)>c+.6&&t.y<e.track.profile.H;this.outsideTimer=d?this.outsideTimer+this.fixedDt:0;let f=!1;for(let t=0;t<e.tracks.length&&!f;t++){let n=e.projs[t];Math.abs(n.along)<3&&e.tracks[t].channelDepthLocal(n.s,n.x,n.y)>-.3&&(f=!0)}if(e.netLift||e.track.netAt(t.s)&&Math.abs(t.x)<Qu.half+3&&t.y>e.track.netYAt(t.s)-3&&Math.abs(t.along)<3){this.underTimer=0,this.outsideTimer=0,this.stuckTimer=0;return}let p=!f&&(t.y<-2.5||t.y<-.8&&!e.track.isGap(t.s));if(this.underTimer=p?this.underTimer+this.fixedDt:0,this.underTimer>.25){this.underTimer=0,this.fail();return}let m=e.v.dot(t.U)<-1;l&&m&&e.airborneTime>3.5&&!e.magnetActive||u||e.airborneTime>12||this.outsideTimer>5&&e.contact?(this.outsideTimer=0,this.fail()):(e.v.length()<.6&&e.sinceBrake>6?this.stuckTimer+=this.fixedDt:this.stuckTimer=0,this.stuckTimer>1.5&&(this.stuckTimer=0,this.fail()))}fail(){this.falls++,this.respawnTimer=.18,this.setPhase(`respawning`)}get progress(){let e=this.ball,t=e.track;if(e.activeIndex===0||!t.layout.finishLine)return Math.max(0,Math.min(1,e.mainProj.s/(this.track.length-62)));let n=this.course.startS?.[e.activeIndex]??0;return Math.max(0,Math.min(1,(n+e.proj.s)/(n+t.length-62)))}},wd=class{constructor(e){J(this,`track`,void 0),J(this,`lastTargetX`,0),this.track=e}decide(e){let t=e.track??this.track,n=e.proj,r=n.s,i=Math.max(4,e.v.length()),a=e.v.dot(n.R),o=0,s=!1,c=Math.min(45,i*1.6),l=n=>{for(let a=0;a<t.obstacles.length;a++){if(t.ghost[a])continue;let o=t.obstacles[a],s=o.s-r;if(s<-1||s>c)continue;let l=t.obstacleX(o,t.time+Math.max(0,s)/i);if(Math.abs(n-l)<o.w/2+e.tune.radius+(o.move?.9:.45))return s}return-1},u=(t.profile.a+t.profile.rc)/4.2,d=[0,-2.2,2.2,-3.2,3.2,-1.2,1.2].map(e=>e*u),f=0,p=-1e9;for(let e of d){let t=l(e),n=(t<0?100:t)-Math.abs(e-this.lastTargetX)*.8-Math.abs(e)*.3;n>p&&(p=n,f=e)}o=f,this.lastTargetX=o,l(n.x)>=0&&l(n.x)<i*.32&&p<100&&(s=!0);for(let e=0;e<i*.35;e+=1)if(t.isGap(r+e)){s=!0;break}let m=!1;for(let e=-5;e<25;e+=5){let n=Math.round((r+e)/t.ds),i=Math.max(0,Math.min(t.n-1,n))*3;if(t.U[i+1]<.55){m=!0;break}}return e.airborne&&e.airborneTime>.25&&(m=!0),e.magnetEnergy<.08&&(m=!1),{steer:Math.max(-1,Math.min(1,(o-n.x)*.55-a*.35)),jump:s,magnet:m,driveLevel:i<14?2:1}}},Td={peaks:0,hills:1,mesas:2,skyline:3,dunes:4,stacks:5,temple:6,cranes:7},Ed={wood:{zenith:3108792,sunColor:16773328,sunSize:1,clouds:.42,cloudColor:16777215,cloudDark:10135736,wind:6,style:`hills`,farStyle:`peaks`,ridge:[9415108,5207144,2902579],ridgeHeight:.09,snow:.8},concrete:{zenith:5930918,sunColor:16767400,sunSize:1.4,clouds:.35,cloudColor:15787740,cloudDark:9079956,wind:4,style:`skyline`,farStyle:`hills`,ridge:[10987952,8159369,5001304],ridgeHeight:.1,lights:.25,lightColor:16765578},metal:{zenith:2762832,sunColor:16751184,sunSize:1.8,clouds:.3,cloudColor:14721152,cloudDark:3813448,wind:3,style:`stacks`,farStyle:`hills`,ridge:[7101038,4601932,2300970],ridgeHeight:.13,lights:.6,lightColor:16742970,glow:.5,glowColor:16738858},ice:{zenith:862802,sunColor:14677247,sunSize:1.2,clouds:.15,cloudColor:14674678,cloudDark:7110808,wind:2,style:`peaks`,ridge:[11060444,8035516,5008524],ridgeHeight:.12,snow:1,stars:.35,aurora:1},water:{zenith:1931464,sunColor:16777215,sunSize:1,clouds:.55,cloudColor:16777215,cloudDark:10532036,wind:7,style:`hills`,farStyle:`peaks`,ridge:[9091272,3967588,1989178],ridgeHeight:.08},glass:{zenith:3947128,sunColor:16756848,sunSize:1.6,clouds:.3,cloudColor:16758944,cloudDark:8015984,wind:3,style:`mesas`,ridge:[12094084,9064520,4991526],ridgeHeight:.11,glow:.6,glowColor:16742472},rubber:{zenith:526360,sunColor:15263999,sunSize:1.5,clouds:.12,cloudColor:5917322,cloudDark:1313828,wind:2,style:`skyline`,farStyle:`skyline`,ridge:[2760776,1709108,789020],ridgeHeight:.12,stars:1,moon:1,lights:1,lightColor:16726744,glow:1,glowColor:16722902},sand:{zenith:5016260,sunColor:16774360,sunSize:1.8,clouds:.08,cloudColor:16775404,cloudDark:14205088,wind:9,style:`dunes`,farStyle:`mesas`,ridge:[14205088,13672552,11565632],ridgeHeight:.06},mud:{zenith:3819080,sunColor:14213320,sunSize:1.4,clouds:.85,cloudColor:10134676,cloudDark:2896944,wind:10,style:`hills`,farStyle:`hills`,ridge:[6978156,3821624,1846298],ridgeHeight:.1,lightning:7},stone:{zenith:3963064,sunColor:16771264,sunSize:1.1,clouds:.25,cloudColor:16774376,cloudDark:11575440,wind:4,style:`temple`,farStyle:`hills`,ridge:[12892324,10127984,6969924],ridgeHeight:.09},grating:{zenith:3159100,sunColor:16758912,sunSize:1.6,clouds:.5,cloudColor:9079440,cloudDark:2763826,wind:5,style:`cranes`,farStyle:`skyline`,ridge:[5922406,3817030,1711138],ridgeHeight:.14,lights:.8,lightColor:16724e3,glow:.35,glowColor:16748624},snow:{zenith:1329306,sunColor:16777215,sunSize:1,clouds:.25,cloudColor:16777215,cloudDark:11057356,wind:8,style:`peaks`,ridge:[12111072,9086144,5929112],ridgeHeight:.14,snow:1}},Dd=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // always at the far plane
}`,Od=`
uniform vec3 uZen, uHor, uSunDir, uSunCol, uCloudCol, uCloudDark, uR0, uR1, uR2, uLightCol, uGlowCol;
uniform float uSunSize, uClouds, uWind, uTime, uRidgeH, uSnow, uStars, uMoon, uAurora, uFlash, uLights, uGlow;
uniform int uStyle, uFarStyle;
varying vec3 vDir;

float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < OCT; i++) { s += a * vn(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
// seamless noise around the horizon: sample on a circle of azimuth
float ring(float az, float freq, float seed) { return fbm(vec2(cos(az), sin(az)) * freq + seed); }

// ridge height (radians above horizon) for a style; .y = 1 where lights can show
vec2 ridge(int style, float az, float seed, float H) {
  float n = ring(az, 3.0, seed);
  if (style == 0) { // jagged peaks
    float r = ring(az, 7.0, seed + 3.0);
    float k = 1.0 - abs(2.0 * ring(az, 5.0, seed + 9.0) - 1.0); // ridged noise
    return vec2(H * (0.25 + 0.55 * k * k + 0.25 * r), 0.0);
  }
  if (style == 1) return vec2(H * (0.25 + 0.6 * n + 0.08 * ring(az, 40.0, seed)), 0.0); // rounded, tree-fuzzed hills
  if (style == 2) { // mesas: flat tops, cliff sides
    float m = smoothstep(0.48, 0.53, n);
    return vec2(H * (0.15 + 0.15 * ring(az, 9.0, seed) + 0.75 * m), 0.0);
  }
  if (style == 4) return vec2(H * (0.35 + 0.175 * sin(az * 9.0 + 3.0 * n) + 0.3 * n), 0.0); // dunes
  // cell-based silhouettes: skyline, stacks, temples, cranes
  float cells = style == 3 ? 220.0 : style == 5 ? 90.0 : style == 6 ? 70.0 : 120.0;
  float u = (az + 3.14159265) / 6.2831853 * cells;
  float ci = floor(u), cf = fract(u);
  float r = h11(ci + seed * 13.0);
  float base = H * (0.12 + 0.2 * n);
  if (style == 3) { // skyline: blocks and towers
    float tall = r > 0.82 ? 1.0 + 1.4 * h11(ci + 5.0) : 0.35 + 0.6 * r;
    float edge = step(0.08, cf) * step(cf, 0.92);
    return vec2(base + H * 0.9 * tall * edge * smoothstep(0.25, 0.45, n + 0.2), edge);
  }
  if (style == 5) { // smokestacks and sheds
    float shed = H * 0.35 * step(0.3, r) * step(0.05, cf) * step(cf, 0.95);
    float stack = r > 0.7 ? H * (1.2 + 0.8 * h11(ci + 2.0)) * step(0.42, cf) * step(cf, 0.58) : 0.0;
    return vec2(base + max(shed, stack), stack > 0.0 ? 1.0 : 0.0);
  }
  if (style == 6) { // temple hills with stepped pyramids
    float pyr = r > 0.8 ? H * (0.9 + 0.5 * h11(ci + 3.0)) * max(0.0, 1.0 - abs(cf - 0.5) * 2.4) : 0.0;
    pyr = floor(pyr / (H * 0.12) + 0.5) * H * 0.12;
    return vec2(max(H * (0.2 + 0.45 * n), base + pyr), 0.0);
  }
  // cranes / gantries: thin lattice masts over low sheds
  float mast = r > 0.55 ? H * (1.1 + 0.9 * h11(ci + 4.0)) : 0.0;
  float m = step(abs(cf - 0.5), 0.03 + 0.05 * (1.0 - cf)) * mast;
  return vec2(base + H * 0.3 * step(0.4, r) * step(0.05, cf) * step(cf, 0.95) + m, mast > 0.0 ? 1.0 : 0.0);
}

void main() {
  vec3 d = normalize(vDir);
  float y = d.y;
  float az = atan(d.z, d.x);
  vec3 sun = normalize(uSunDir);
  float sd = max(dot(d, sun), 0.0);

  // ---- sky gradient ----
  vec3 c = mix(uHor, uZen, pow(clamp(y, 0.0, 1.0), 0.32)); // colour comes in quickly above the haze band
  c += uGlowCol * uGlow * exp(-max(y, 0.0) * 14.0) * 0.6;            // horizon band
  c += uSunCol * pow(sd, 6.0) * 0.18 * (1.0 - uMoon);                 // sun haze

  // ---- night: stars ----
  if (uStars > 0.0 && y > 0.0) {
    vec2 g = vec2(az * 160.0, asin(y) * 160.0);
    float st = h21(floor(g));
    float tw = 0.6 + 0.4 * sin(uTime * 3.0 + st * 40.0);
    float dotm = 1.0 - smoothstep(0.08, 0.3, length(fract(g) - 0.5));
    c += vec3(0.9, 0.9, 1.0) * step(0.994, st) * tw * uStars * smoothstep(0.02, 0.2, y) * dotm * 1.5;
  }
  // ---- aurora ----
  if (uAurora > 0.0 && y > 0.05) {
    float band = ring(az + uTime * 0.01, 2.0, 4.0);
    float h = 0.25 + 0.25 * band;
    float a = asin(y);
    float curtain = exp(-(a - h) * (a - h) * 81.0) * (0.5 + 0.5 * sin(az * 30.0 + uTime * 0.6 + band * 12.0));
    c += mix(vec3(0.1, 1.0, 0.55), vec3(0.4, 0.3, 1.0), smoothstep(0.0, 0.25, a - h)) * curtain * 0.55 * uAurora;
  }
  // ---- sun or moon disc ----
  float rad = 0.012 * uSunSize;
  float disc = smoothstep(cos(rad), cos(rad * 0.85), dot(d, sun));
  if (uMoon > 0.0) {
    float crater = 0.85 + 0.15 * vn(d.xy * 900.0);
    c = mix(c, vec3(0.92, 0.92, 1.0) * crater * 1.4, disc);
    c += vec3(0.5, 0.5, 0.8) * pow(sd, 120.0) * 0.4;
  } else {
    c += uSunCol * (disc * 5.0 + pow(sd, 400.0) * 1.2);
  }

  // ---- clouds: a drifting layer projected onto a high plane ----
  if (uClouds > 0.0 && y > 0.01) {
    vec2 p = d.xz / (y + 0.06) * 1.4 + vec2(uTime * uWind * 0.004, uTime * uWind * 0.0015);
    float n = fbm(p);
    float cov = smoothstep(1.0 - uClouds * 0.95 - 0.1, 1.0 - uClouds * 0.95 + 0.25, n);
    float thick = fbm(p * 1.7 + 3.0);
    vec3 cc = mix(uCloudDark, uCloudCol, clamp(0.35 + 0.9 * (n - thick * 0.5) + pow(sd, 3.0) * 0.4, 0.0, 1.0));
    cc += uSunCol * pow(sd, 8.0) * 0.35 * (1.0 - cov);  // silver lining
    cc *= 1.0 + uFlash * 2.5;                            // lightning lights the clouds from inside
    c = mix(c, cc, cov * smoothstep(0.01, 0.12, y));
  }
  if (uFlash > 0.0) c += vec3(0.6, 0.65, 0.8) * uFlash * 0.25;

  // ---- distant ridgelines: far, middle, near ----
  float ang = asin(clamp(y, -1.0, 1.0));
  vec2 sunH = normalize(vec2(sun.x, sun.z) + 1e-5);
  vec2 dH = normalize(vec2(d.x, d.z) + 1e-5);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    int st = i == 2 ? uStyle : uFarStyle;
    vec3 col = i == 0 ? uR0 : i == 1 ? uR1 : uR2;
    vec2 rh = ridge(st, az + fi * 1.7, 11.0 + fi * 23.0, uRidgeH * (i == 0 ? 0.85 : i == 1 ? 0.7 : 1.0));
    if (ang < rh.x) {
      // lit toward the sun
      col *= 0.85 + 0.3 * pow(max(dot(dH, sunH), 0.0), 2.0);
      if (i == 0 && uSnow > 0.0) col = mix(col, vec3(0.95, 0.97, 1.0), uSnow * smoothstep(rh.x * 0.62, rh.x * 0.78, ang));
      // lit windows and warning lights
      if (uLights > 0.0 && rh.y > 0.0) {
        float sc = 2400.0 / (fi + 1.0);
        vec2 w = vec2(az * sc, ang * sc);
        float lit = step(0.72, h21(floor(w))) * step(0.3, fract(w.x)) * step(0.3, fract(w.y));
        float tip = (st == 7 || st == 5) ? smoothstep(rh.x * 0.9, rh.x, ang) * 3.0 * step(0.5, fract(uTime * 0.7 + h11(floor(w.x * 0.05)))) : 1.0;
        col += uLightCol * lit * uLights * tip * 1.4;
      }
      // haze toward the base, melting into the fog
      col = mix(uHor, col, smoothstep(-0.005, rh.x * 0.6 + 0.004, ang) * (0.55 + 0.15 * fi));
      c = col;
    }
  }
  // below the horizon: the fog colour (the real terrain fades into it)
  c = mix(c, uHor, smoothstep(0.0, -0.04, ang));
  gl_FragColor = vec4(c, 1.0);
}`,kd=class{constructor(e,t,n,r=`high`){J(this,`mesh`,void 0),J(this,`material`,void 0),J(this,`flash`,0),J(this,`nextFlash`,3),J(this,`lightning`,void 0);let i=e.farStyle??(e.style===`skyline`||e.style===`stacks`||e.style===`cranes`?`hills`:`peaks`),a=e=>new G(e);this.material=new go({side:1,depthWrite:!1,depthTest:!1,fog:!1,uniforms:{uZen:{value:a(e.zenith)},uHor:{value:a(e.horizon??t)},uSunDir:{value:n.clone()},uSunCol:{value:a(e.sunColor)},uSunSize:{value:e.sunSize},uCloudCol:{value:a(e.cloudColor)},uCloudDark:{value:a(e.cloudDark)},uClouds:{value:e.clouds},uWind:{value:e.wind},uR0:{value:a(e.ridge[0])},uR1:{value:a(e.ridge[1])},uR2:{value:a(e.ridge[2])},uRidgeH:{value:e.ridgeHeight},uStyle:{value:Td[e.style]},uFarStyle:{value:Td[i]},uSnow:{value:e.snow??0},uStars:{value:e.stars??0},uMoon:{value:e.moon??0},uAurora:{value:e.aurora??0},uFlash:{value:0},uLights:{value:e.lights??0},uLightCol:{value:a(e.lightColor??16777215)},uGlow:{value:e.glow??0},uGlowCol:{value:a(e.glowColor??16777215)},uTime:{value:0}},defines:{OCT:r===`high`?5:3},vertexShader:Dd,fragmentShader:Od}),this.mesh=new K(new io(3e3,64,32),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3,this.mesh.name=`skyDome`,this.lightning=e.lightning??0}update(e,t,n){this.mesh.position.copy(n);let r=this.material.uniforms;if(r.uTime.value=t,this.lightning>0){this.nextFlash-=e,this.nextFlash<=0&&(this.flash=1,this.nextFlash=60/this.lightning*(.4+Math.random()*1.2)),this.flash=Math.max(0,this.flash-e*5);let t=this.flash>.55||this.flash>.15&&this.flash<.35?this.flash:this.flash*.3;return r.uFlash.value=t,t}return 0}};function Ad(e,t){let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)}function jd(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Ad(n,r),l=Ad(n+1,r),u=Ad(n,r+1),d=Ad(n+1,r+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function Md(e,t){let n=0,r=.5,i=1;for(let a=0;a<5;a++)n+=jd(e*i,t*i)*r,r*=.5,i*=2.03;return n}function Nd(e,t,n,r,i){let a=Array.isArray(n)?n:[n],o=new Fn,s=r.visual,c=Ed[r.id]??Ed.wood,l=Lt.degToRad(90-s.sky.elevation),u=Lt.degToRad(s.sky.azimuth),d=new H().setFromSphericalCoords(1,l,u),f=d.clone();f.y<.24&&(f.y=.24,f.normalize());let p=new kd(c,s.fog,f,i),m=new Js(t),h=new Wn,g=new G(s.fog).lerp(new G(c.zenith),.6),_=new G(s.fog),v=new G(s.ground).multiplyScalar(.6),y=new go({side:1,depthWrite:!1,uniforms:{uZ:{value:g},uH:{value:_},uG:{value:v},uSun:{value:d.clone()},uSunI:{value:s.sky.elevation<2?2:14}},vertexShader:`varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uZ, uH, uG, uSun; uniform float uSunI; varying vec3 vD;
      void main(){ vec3 d = normalize(vD); float y = d.y;
        vec3 c = y > 0.0 ? mix(uH, uZ, pow(y, 0.6)) : mix(uH * 0.9, uG, pow(-y, 0.35));
        float s = max(dot(d, normalize(uSun)), 0.0);
        c += vec3(1.0, 0.95, 0.85) * (pow(s, 900.0) * uSunI + pow(s, 12.0) * 0.25);
        gl_FragColor = vec4(c, 1.0); }`});h.add(new K(new io(100,48,24),y));let b=m.fromScene(h,0).texture;m.dispose(),e.environment=b,e.environmentIntensity=1,o.add(p.mesh),e.fog=new Un(s.fog,s.fogDensity*.55),e.background=new G(s.fog);let x=s.sky.elevation<2,S=new os(x?9085183:16773596,x?.6:3.2);if(S.position.copy(d).multiplyScalar(80),S.castShadow=i===`high`,S.castShadow){S.shadow.mapSize.set(2048,2048);let e=S.shadow.camera;e.left=-28,e.right=28,e.top=28,e.bottom=-28,e.near=1,e.far=220,S.shadow.bias=-4e-4,S.shadow.normalBias=.03}o.add(S,S.target);let C=new Uo(x?3162272:14412543,new G(s.ground).lerp(new G(s.tint),.5),x?.5:.8);o.add(C);let w=[],T=1e9,E=-1e9,D=1e9,O=-1e9,k=1e9;for(let e of a)for(let t=0;t<e.n;t+=8){let n=t*3,r=e.P[n],i=e.P[n+1],a=e.P[n+2];w.push([r,i,a]),T=Math.min(T,r),E=Math.max(E,r),D=Math.min(D,a),O=Math.max(O,a),k=Math.min(k,i)}let A=T-600,j=D-600,ee=Math.ceil((E-T+1200)/40),M=Math.ceil((O-D+1200)/40),te=Array.from({length:ee*M},()=>[]);w.forEach((e,t)=>{let n=Math.floor((e[0]-A)/40),r=Math.floor((e[2]-j)/40);te[r*ee+n]?.push(t)});let N=(e,t)=>{let n=Math.floor((e-A)/40),r=Math.floor((t-j)/40),i=0xe8d4a51000,a=1/0,o=k;for(let s=0;s<6;s++){for(let c=-s;c<=s;c++)for(let l=-s;l<=s;l++){if(Math.max(Math.abs(l),Math.abs(c))!==s)continue;let u=te[(r+c)*ee+(n+l)];if(u)for(let n of u){let r=w[n],s=(r[0]-e)**2+(r[2]-t)**2;s<i&&(i=s,o=r[1]),s<900&&r[1]<a&&(a=r[1])}}if(i<(s*40)**2)break}if(i>=0xe8d4a51000){let n=Math.max(T-e,0,e-E),r=Math.max(D-t,0,t-O);return[Math.max(240,Math.hypot(n,r)),k]}return[Math.sqrt(i),Number.isFinite(a)?a:o]},ne=Fd(s.scenery),re=(e,t)=>{let[n,r]=N(e,t),i=Md(e*.004,t*.004),a=k-30+i*ne.mountain+Math.min(Math.max(0,n-120),1100)*ne.rise,o=r-ne.clearance-i*10,s=Lt.smoothstep(n,30,220);return o*(1-s)+Math.max(o,a)*s},ie=Math.max(E-T,O-D)+3600,ae=i===`high`?260:170,oe=new no(ie,ie,ae,ae);oe.rotateX(-Math.PI/2);let se=(T+E)/2,ce=(D+O)/2,le=oe.attributes.position,P=new Float32Array(le.count*3),ue=new G(s.ground),de=new G(ne.altColor??s.ground);for(let e=0;e<le.count;e++){let t=le.getX(e)+se,n=le.getZ(e)+ce,r=re(t,n);le.setXYZ(e,t,r,n);let i=Lt.clamp(Md(t*.02,n*.02)*1.4-.2,0,1),a=ue.clone().lerp(de,i);P[e*3]=a.r,P[e*3+1]=a.g,P[e*3+2]=a.b}oe.setAttribute(`color`,new Cr(P,3));let fe=Pd[s.scenery];if(fe){let e=[];for(let t=0;t<le.count;t+=7)e.push(le.getY(t));e.sort((e,t)=>e-t);let t=e[Math.floor(e.length*fe.fill)],n=new no(ie,ie,1,1);n.rotateX(-Math.PI/2);let r=new K(n,new vo({color:fe.color,roughness:fe.rough,metalness:.35,envMapIntensity:1.2}));r.position.set(se,t,ce),r.name=`lake`,o.add(r)}oe.computeVertexNormals();let pe=new K(oe,new vo({vertexColors:!0,roughness:.95,metalness:0}));pe.receiveShadow=!0,pe.name=`terrain`,o.add(pe);{let e=Id(s.scenery,re,N,[T-500,E+500,D-500,O+500],i);e.name=`scenery`,o.add(e)}return e.add(o),{group:o,sun:S,envMap:b,groundHeight:re,sunDir:d,sky:p,hemi:C}}var Pd={forest:{color:2906738,rough:.08,fill:.16},tropical:{color:1745080,rough:.05,fill:.3},jungle:{color:4868652,rough:.12,fill:.22},glacier:{color:12375786,rough:.25,fill:.14}};function Fd(e){switch(e){case`forest`:return{clearance:26,mountain:260,rise:.35,altColor:6126142};case`glacier`:case`alpine`:return{clearance:30,mountain:380,rise:.5,altColor:13227746};case`desert`:case`canyon`:return{clearance:40,mountain:200,rise:.25,altColor:12023882};case`tropical`:case`jungle`:return{clearance:22,mountain:180,rise:.3,altColor:3500851};case`neon`:return{clearance:40,mountain:80,rise:.1,altColor:1053733};default:return{clearance:35,mountain:120,rise:.2,altColor:5921370}}}function Id(e,t,n,r,i){let a=new Fn,o=i===`high`?3200:1500,s=new W,c=new Rt,l=new H,u=new H,d=12345,f=()=>(d=d*1664525+1013904223>>>0,d/4294967296),p=(e,i,a,o,d=0,p=1,m=0)=>{let h=0;for(let g=0;g<e.count*6&&h<e.count;g++){let g=r[0]+f()*(r[1]-r[0]),_=r[2]+f()*(r[3]-r[2]),[v,y]=n(g,_),b=a+f()*(o-a);if(v<i+m*b||v>260&&f()<.7*p)continue;let x=t(g,_);x>y-3&&v<25||v<34+m*b&&x+20*b>y-10||(u.set(g,x+d*b,_),c.setFromAxisAngle(new H(0,1,0),f()*Math.PI*2),l.set(b,b*(.8+f()*.5),b),s.compose(u,c,l),e.setMatrixAt(h++,s))}e.count=h,e.instanceMatrix.needsUpdate=!0};if(e===`forest`||e===`alpine`||e===`glacier`||e===`jungle`||e===`tropical`){let t=e!==`tropical`&&e!==`jungle`,n=e===`alpine`||e===`glacier`?3099194:e===`forest`?3037740:3111466,r=t?new ba(2.6,9,7):new eo(3.4,0);r.translate(0,t?8.5:8,0);let c=new ya(.35,.5,t?5:8,6);c.translate(0,t?2.5:4,0);let l=new zi(r,new vo({color:n,roughness:.9,flatShading:!0}),o),u=new zi(c,new vo({color:4928288,roughness:1}),o);p(l,10,.8,1.9);for(let e=0;e<l.count;e++)l.getMatrixAt(e,s),u.setMatrixAt(e,s);if(u.count=l.count,u.instanceMatrix.needsUpdate=!0,l.castShadow=i===`high`,e===`alpine`||e===`glacier`){let e=new ba(1.4,3.5,7);e.translate(0,11.3,0);let t=new zi(e,new vo({color:16054523,roughness:.9,flatShading:!0}),l.count);for(let e=0;e<l.count;e++)l.getMatrixAt(e,s),t.setMatrixAt(e,s);a.add(t)}a.add(l,u);let d=new zi(new eo(1.5,0),new vo({color:7828332,roughness:1,flatShading:!0}),400);p(d,8,.6,3,.2),a.add(d)}else if(e===`city`||e===`industrial`||e===`temple`||e===`neon`){let t=e===`temple`?14274493:e===`neon`?1317424:e===`city`?10262672:3883080,n=e===`temple`?new ya(1.4,1.6,18,12):new _a(10,30,10);n.translate(0,e===`temple`?9:15,0);let r=new zi(n,new vo({color:t,roughness:.8,metalness:e===`industrial`?.6:0,emissive:e===`neon`?2756688:0}),e===`temple`?900:600);if(p(r,12,e===`temple`?.8:.6,e===`temple`?1.4:3.2,0,1,e===`temple`?2:8),a.add(r),e===`neon`){let e=new zi(new _a(10.4,.4,10.4),new vo({color:16722902,emissive:16722902,emissiveIntensity:2}),r.count);for(let t=0;t<r.count;t++)r.getMatrixAt(t,s),s.multiply(new W().makeTranslation(0,22,0)),e.setMatrixAt(t,s);a.add(e)}}else if(e===`desert`||e===`canyon`){let e=new ya(6,9,40,7);e.translate(0,18,0);let t=new zi(e,new vo({color:11757883,roughness:1,flatShading:!0}),260);p(t,14,.6,2.4,0,1,10);let n=new zi(new ya(.4,.5,4,6).translate(0,2,0),new vo({color:5208634,roughness:.9}),500);p(n,8,.7,1.6),a.add(t,n)}return a}var Ld=2.4;function Rd(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function zd(e,t,n){let r=Rd(n),i=new Float32Array(t*t).map(()=>r());return(e,n)=>{let r=e*t%t,a=n*t%t,o=Math.floor(r),s=Math.floor(a),c=r-o,l=a-s,u=c*c*(3-2*c),d=l*l*(3-2*l),f=(e,n)=>i[(n+t)%t*t+(e+t)%t],p=f(o,s)+(f(o+1,s)-f(o,s))*u;return p+(f(o,s+1)+(f(o+1,s+1)-f(o,s+1))*u-p)*d}}function Bd(e,t,n){let r=0,i=.5,a=0;for(let o of e)r+=o(t,n)*i,a+=i,i*=.5;return r/a}function Vd(e,t,n){let r=new Float32Array(t*t),i=new Float32Array(t*t*3),a=new Float32Array(t*t),o,s=[zd(t,8,11),zd(t,16,12),zd(t,32,13),zd(t,64,14)],c=[zd(t,4,21),zd(t,8,22)],l=Rd(e.length*977),u=Array.from({length:64},()=>l()),d=(e,t,n,o)=>{r[e]=t,i[e*3]=n[0],i[e*3+1]=n[1],i[e*3+2]=n[2],a[e]=o},f=(e,t=n)=>[t[0]*e,t[1]*e,t[2]*e];e===`grating`&&(o=new Float32Array(t*t));for(let r=0;r<t;r++)for(let i=0;i<t;i++){let a=i/t,l=r/t,p=r*t+i,m=Bd(s,a,l);switch(e){case`wood`:{let e=Math.floor(a*8),t=a*8-e,n=u[e],r=Bd(c,a*2+n,l*.5)*3.2,i=(Math.sin((t*5.5+r+n*9)*Math.PI*2)*.5+.5)**6,o=s[3](a,l*.25)**4,h=Math.min(1,Math.min(t,1-t)*70),g=Math.min(1,Math.min(l,1-l)*90),_=(.86+(n-.5)*.28-i*.12-o*.1+(m-.5)*.12)*(.4+.6*h*g);d(p,.5+i*.04-(1-h)*.5-(1-g)*.5+m*.03,f(_),.5+i*.15+(1-h)*.3);break}case`concrete`:{let e=s[3](a,l)**6,t=Math.min(1,Math.min(l,1-l)*120),n=.8+(m-.5)*.35-e*.4;d(p,m*.4-e*.5-(1-t)*.3,f(n*(.8+.2*t)),.85+e*.1);break}case`metal`:{let e=s[3](a*.05,l*1)*.5+Hd(l,300)*.5,t=a*4%1,n=Math.min(1,Math.min(l,1-l)*90)*Math.min(1,Math.min(t,1-t)*90),r=Math.hypot(a*16%1-.5,Math.min(l,1-l)*16-.4),i=r<.18?1-r/.18:0,o=.85+e*.15-(1-n)*.4+i*.25;d(p,e*.1-(1-n)*.6+i*.6,f(o),.25+e*.12+(1-n)*.3);break}case`ice`:{let e=(1-Math.abs(Bd(c,a*2,l*2)*2-1))**18,t=.92+(m-.5)*.15+e*.25;d(p,-e*.5+m*.15,f(t),.04+e*.25+m*.05);break}case`aqueduct`:{let e=a*6%1,t=(l*6+Math.floor(a*6)%2*.5)%1,n=Math.min(1,Math.min(e,1-e,t,1-t)*40),r=.75+m*.3,i=n<1?f(.6):[.32*r+.4,.62*r,.66*r];d(p,n*.4+m*.1,i,.4+(1-n)*.4);break}case`glass`:{let e=a*2%1,t=Math.min(1,Math.min(l*3%1,1-l*3%1)*120)*Math.min(1,Math.min(e,1-e)*120);d(p,-(1-t)*.4,f(1),.03+(1-t)*.3);break}case`rubber`:{let e=+(Math.sin((a*12+l*4)*Math.PI*2)>.6),t=.9+(m-.5)*.2+e*.12;d(p,e*.25+m*.1,f(t),.8-e*.1);break}case`sand`:{let e=Math.sin((l*18+Bd(c,a,l)*4)*Math.PI*2)*.5+.5,t=s[3](a*4%1,l*4%1),n=.88+e*.1+(t-.5)*.15;d(p,e*.3+t*.15,f(n),.95);break}case`mud`:{let e=Bd(c,a,l),t=.7+m*.4-(e>.55?.15:0);d(p,m*.5+(e>.55?-.1:0),f(t),e>.55?.15:.7);break}case`marble`:{let e=(1-Math.abs(Math.sin((a*3+l*2+Bd(s,a,l)*4)*Math.PI)))**14,t=Math.min(1,Math.min(l*2%1,1-l*2%1)*150),r=.95-e*.35+(m-.5)*.06;d(p,-(1-t)*.4-e*.02,[n[0]*r,n[1]*r*.98,n[2]*r*.95],.08+e*.1+(1-t)*.3);break}case`grating`:{let e=a*16%1,t=l*8%1,n=e<.22||t<.18,r=.8+m*.3;d(p,n?.5:0,f(n?r:.2),n?.45:1),o[p]=+!!n;break}case`snow`:{let e=s[3](a,l)**12,t=.94+(m-.5)*.08+e*.1;d(p,m*.4,f(t),.9-e*.5);break}default:d(p,m,f(1),.5)}}return{h:r,c:i,r:a,a:o}}function Hd(e,t){return(Math.sin(e*t*1.3)*Math.sin(e*t*.37+1.7)+1)*.5}function Ud(e,t){let n=typeof OffscreenCanvas<`u`?new OffscreenCanvas(e,e):Object.assign(document.createElement(`canvas`),{width:e,height:e}),r=n.getContext(`2d`),i=r.createImageData(e,e);for(let n=0;n<e*e;n++)t(n,i.data,n*4);return r.putImageData(i,0,0),n}function Wd(e,t){let n=new pa(e);return n.wrapS=n.wrapT=l,n.colorSpace=t?Ke:qe,n.anisotropy=8,n.needsUpdate=!0,n}var Gd=new Map;function Kd(e,t,n=512){let r=`${e}:${t}:${n}`,i=Gd.get(r);if(i)return i;let a=Vd(e,n,[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]),o=e=>Math.max(0,Math.min(255,Math.round(e*255))),s=Wd(Ud(n,(e,t,n)=>{t[n]=o(a.c[e*3]),t[n+1]=o(a.c[e*3+1]),t[n+2]=o(a.c[e*3+2]),t[n+3]=255}),!0),c=Wd(Ud(n,(e,t,r)=>{let i=e%n,s=e/n|0,c=a.h[s*n+(i-1+n)%n],l=a.h[s*n+(i+1)%n],u=a.h[(s-1+n)%n*n+i],d=a.h[(s+1)%n*n+i],f=(c-l)*3,p=(u-d)*3,m=1,h=Math.hypot(f,p,m);f/=h,p/=h,m/=h,t[r]=o(f*.5+.5),t[r+1]=o(p*.5+.5),t[r+2]=o(m*.5+.5),t[r+3]=255}),!1),l=Wd(Ud(n,(e,t,n)=>{let r=o(a.r[e]);t[n]=r,t[n+1]=r,t[n+2]=r,t[n+3]=255}),!1),u;a.a&&(u=Wd(Ud(n,(e,t,n)=>{let r=o(a.a[e]);t[n]=r,t[n+1]=r,t[n+2]=r,t[n+3]=255}),!1));let d={map:s,normalMap:c,roughnessMap:l,alphaMap:u};return Gd.set(r,d),d}function qd(e){let t=e=>{let t=typeof OffscreenCanvas<`u`?new OffscreenCanvas(512,256):Object.assign(document.createElement(`canvas`),{width:512,height:256}),n=t.getContext(`2d`),r=n.createImageData(512,256);for(let t=0;t<256;t++)for(let n=0;n<512;n++){let[i,a,o,s]=e(n/512,t/256),c=(t*512+n)*4;r.data[c]=i,r.data[c+1]=a,r.data[c+2]=o,r.data[c+3]=s}return n.putImageData(r,0,0),t},n=e=>+(Math.abs(e-.5)<.012),r=(e,t)=>+(Math.hypot((e-.25)*2,t-.5)<.045||Math.hypot((e-.75)*2,t-.5)<.045);if(e===`rolypoly`){let e=t((e,t)=>{let n=(t*9%1<.12?.45:1)*(.75+.25*Math.sin(e*Math.PI*40)*.1);return[Math.round(88*n),Math.round(84*n),Math.round(96*n),255]}),n=t((e,t)=>{let n=t*9%1<.12?200:110;return[n,n,n,255]});return{map:Wd(e,!0),roughnessMap:Wd(n,!1)}}let i={steel:[235,238,242],gold:[255,205,120],copper:[240,160,120],obsidian:[70,72,80],aurora:[180,230,255]},a=i[e]??i.steel,o=t((e,t)=>{let i=n(t)+r(e,t)?.55:1;return[Math.round(a[0]*i),Math.round(a[1]*i),Math.round(a[2]*i),255]}),s=t((e,t)=>{let i=(Math.sin(t*900)*.5+.5)*14,a=n(t)+r(e,t),o=18+i+(a?120:0);return[o,o,o,255]});return{map:Wd(o,!0),roughnessMap:Wd(s,!1)}}var Jd={wood:{kind:0,a:16760928,b:16734736,scale:.12,flow:.55,strength:.55,c:[.52,.62],psy:.55},concrete:{kind:1,a:8385535,b:2776319,scale:.1,flow:.5,strength:1.1,c:[0,0],psy:.12,edge:.5},metal:{kind:2,a:10476799,b:11554047,scale:.13,flow:.8,strength:.8,c:[.12,-.08],psy:.35},ice:{kind:3,a:4186367,b:6958335,scale:.14,flow:.45,strength:.7,c:[0,0],psy:.25,edge:1},water:{kind:4,a:10484991,b:1732095,scale:.11,flow:.9,strength:.6,c:[0,0],psy:.25},glass:{kind:5,a:16735432,b:2817988,scale:.12,flow:.6,strength:1,c:[0,0],psy:.85,edge:.65},rubber:{kind:6,a:16722902,b:2879743,scale:.12,flow:.8,strength:.5,c:[0,0],psy:1},sand:{kind:7,a:16765803,b:16738843,scale:.11,flow:.4,strength:.65,c:[0,0],psy:.12,edge:.6},mud:{kind:8,a:9305946,b:1937258,scale:.12,flow:.5,strength:.75,c:[0,0],psy:.15},stone:{kind:9,a:16770984,b:12092970,scale:.11,flow:.4,strength:1.05,c:[-.745,.113],psy:.08,edge:.7},grating:{kind:10,a:16756794,b:16730650,scale:.1,flow:.9,strength:.85,c:[0,0],psy:.12},snow:{kind:11,a:8369407,b:6966527,scale:.12,flow:.5,strength:.55,c:[0,0],psy:.2,edge:1}},Yd=`
uniform float uFxTime;
uniform float uFxIntensity;
uniform float uFxSpeed;
uniform vec3 uFxA;
uniform vec3 uFxB;
uniform float uFxScale;
uniform float uFxFlow;
uniform vec2 uFxC;
uniform float uFxCenter;
uniform float uFxTravel;
uniform float uFxRing; // distance all the way round the closed pipe
uniform float uFxPsy;
uniform float uFxBallDark;
uniform float uFxEdge;
varying vec2 vFxUv;
varying vec4 vFxMode;
// CONTRAST (light worlds): contour lines where the floor meets the curve and the
// curve meets the wall, a soft shadow in the curve, and thin bands across the
// gutter every 8 m so you feel the surface rushing by. Returns (lines, bands, shade).
vec3 fxEdges() {
  float ac = abs(vFxUv.x - uFxCenter);
  float l1 = 1.0 - smoothstep(0.0, 0.22, abs(ac - 2.8));
  float l2 = 1.0 - smoothstep(0.0, 0.22, abs(ac - 8.45));
  float bands = 1.0 - smoothstep(0.0, 0.3, abs(fract(vFxUv.y / 8.0) - 0.5) * 8.0 - 3.7);
  float shade = smoothstep(2.8, 5.5, ac) * (1.0 - smoothstep(6.5, 8.45, ac));
  return vec3(max(l1, l2), bands, shade);
}

vec2 fxMirror(vec2 p) { return abs(mod(p, 4.0) - 2.0) - 1.0; }

// ---- shared helpers (all written from public mathematics) ----
const float FX_PI = 3.14159265;
// integer hash: "lowbias32" mixing function (C. Wellons, public domain)
uint fxHu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
vec2 fxHash2(vec2 c) {
  uint h = fxHu(uint(int(c.x) + 4096) * 1973u ^ fxHu(uint(int(c.y) + 4096) * 9277u));
  return vec2(float(h & 0xffffu), float(h >> 16)) / 65535.0;
}
float fxNoise(vec2 p) { // value noise
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = fxHash2(i).x, b = fxHash2(i + vec2(1, 0)).x, c = fxHash2(i + vec2(0, 1)).x, d = fxHash2(i + vec2(1, 1)).x;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fxFbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * fxNoise(p); p = p * 2.03 + 7.1; a *= 0.5; } return v; }
float fxSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0); return length(pa - ba * h); }
// anti-aliased line of half-width w around distance d (fw = pixel footprint in d units)
float fxLine(float d, float w, float fw) { return 1.0 - smoothstep(w - fw, w + fw, d); }
vec2 fxCmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
// Hilbert curve index <-> cell on a 32x32 grid (standard bit algorithm)
int fxHxy2d(ivec2 c) {
  int x = c.x, y = c.y, d = 0;
  for (int s = 16; s > 0; s /= 2) {
    int rx = (x & s) > 0 ? 1 : 0, ry = (y & s) > 0 ? 1 : 0;
    d += s * s * ((3 * rx) ^ ry);
    if (ry == 0) { if (rx == 1) { x = 31 - x; y = 31 - y; } int t = x; x = y; y = t; }
  }
  return d;
}
ivec2 fxHd2xy(int d) {
  int x = 0, y = 0, t = d;
  for (int s = 1; s < 32; s *= 2) {
    int rx = 1 & (t / 2), ry = 1 & (t ^ rx);
    if (ry == 0) { if (rx == 1) { x = s - 1 - x; y = s - 1 - y; } int tt = x; x = y; y = tt; }
    x += s * rx; y += s * ry; t /= 4;
  }
  return ivec2(x, y);
}

/*
 * One pattern per world: the world's mathematical substrate (see docs/WORLD_MATH.md).
 * Input p is a mirror-tiled coordinate in [-1, 1]^2; output is a glow 0..~1.
 */
float fxPattern(vec2 p) {
  vec2 fwp = fwidth(p);
  float fw = max(fwp.x, fwp.y) + 1e-5;
  float t = uFxTime;
#if FX_KIND == 0
  // WOOD — Kali set: p <- |p| / (p.p) - c, glowing orbit-trap filaments
  vec2 c = uFxC + 0.05 * vec2(sin(t * 0.31), cos(t * 0.23));
  float trap = 10.0;
  for (int i = 0; i < 7; i++) {
    p = abs(p) / max(dot(p, p), 1e-3) - c;
    trap = min(trap, abs(p.x * p.y) * 4.0 + abs(length(p) - 1.0) * 0.5);
  }
  return pow(clamp(1.0 - trap * 2.2, 0.0, 1.0), 1.5);
#elif FX_KIND == 1
  // CONCRETE — Sierpinski carpet (2-D Menger sponge): at each 1/3 level the
  // centre square is a void. Glowing void edges, darker void interiors, and an
  // endless zoom into the sponge (scale x3 per cycle, seamless).
  float z = fract(t * 0.06);
  vec2 q = (p * 0.5 + 0.5) * pow(3.0, z);
  float glow = 0.0, inside = 0.0, alive = 1.0, sc = 1.0;
  for (int i = 0; i < 3; i++) {
    q *= 3.0; sc *= 3.0;
    vec2 cell = mod(floor(q), 3.0);
    vec2 f = fract(q) - 0.5;
    float hole = step(abs(cell.x - 1.0), 0.1) * step(abs(cell.y - 1.0), 0.1);
    float e = 0.5 - max(abs(f.x), abs(f.y));               // distance to the cell's edge (cell units)
    float lod = clamp(1.6 - fw * sc * 7.0, 0.0, 1.0);       // fade levels finer than ~2 px
    float lvl = 1.0 / (1.0 + float(i) * 0.5);
    glow += alive * hole * lod * lvl * (fxLine(e, 0.035, fw * sc * 1.5) + 0.35 * exp(-e * 10.0));
    inside = max(inside, alive * hole * lod * 0.07);
    alive *= 1.0 - hole;
  }
  return clamp(glow + inside + alive * 0.03, 0.0, 1.2);
#elif FX_KIND == 2
  // SHEET METAL — 2-D Mandelbox: box fold, sphere fold, scale and translate;
  // orbit traps banded into brushed, riveted chrome.
  vec2 zz = p * 2.4, c0 = zz;
  float trap = 1e9, ang = 0.15 * sin(t * 0.09);
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  for (int i = 0; i < 9; i++) {
    zz = clamp(zz, -1.0, 1.0) * 2.0 - zz;
    float r2 = dot(zz, zz);
    if (r2 < 0.25) zz *= 4.0; else if (r2 < 1.0) zz /= r2;
    zz = rot * zz * -1.85 + c0 * 0.85 + uFxC;
    trap = min(trap, min(abs(zz.x), abs(zz.y)) * 0.6 + abs(length(zz) - 1.4) * 0.12);
  }
  float band = 0.5 + 0.5 * cos(log(trap + 1e-3) * 4.0 - t * 0.6);
  return clamp(exp(-trap * 5.0) * 1.1 + band * 0.25 * exp(-trap * 1.5), 0.0, 1.2);
#elif FX_KIND == 3
  // ICE — hexagonal frost: six-fold (D6) symmetry, a main arm with side
  // branches at 60 degrees, shrinking by half each generation (branch IFS).
  float a = atan(p.y, p.x), r = length(p);
  a = abs(mod(a + FX_PI / 6.0, FX_PI / 3.0) - FX_PI / 6.0);
  vec2 w = r * vec2(cos(a), sin(a));
  float grow = 0.75 + 0.25 * sin(t * 0.4);                   // crystals grow and recede
  float d = fxSeg(w, vec2(0.0), vec2(0.95 * grow, 0.0));
  float sc = 1.0;
  vec2 n = vec2(-0.8660254, 0.5);                            // normal of the 60-degree branch line
  for (int i = 0; i < 5; i++) {
    w.y = abs(w.y);
    vec2 o = vec2(0.32, 0.0);
    float k = dot(w - o, n);
    if (k > 0.0) w -= 2.0 * k * n;                           // fold the side branch onto the arm
    w = (w - o) * 2.0; sc *= 2.0;
    d = min(d, fxSeg(w, vec2(0.0), vec2(0.9 * grow, 0.0)) / sc);
  }
  // LIVE STARS: inside each crystal a kaleidoscopic fractal (folded inversions)
  // drifts and morphs as you pass, framed by the frost arms
  vec2 kz = p * 2.2;
  float kf = 0.0;
  vec2 kc = vec2(0.52 + 0.08 * sin(t * 0.37), 0.47 + 0.08 * cos(t * 0.29));
  for (int i = 0; i < 7; i++) {
    kz = abs(kz) / max(dot(kz, kz), 1e-3) - kc;
    kf += exp(-abs(length(kz) - 0.8) * 6.0);
  }
  float inside = exp(-d * 9.0) * smoothstep(1.05 * grow, 0.6 * grow, r);
  return clamp(fxLine(d, 0.004, fw * 1.2) + exp(-d * 45.0) * 0.55 + inside * (0.18 + 0.14 * kf) + fxFbm(p * 6.0) * 0.08, 0.0, 1.3);
#elif FX_KIND == 4
  // WATER — iterated flow warp and caustic ridges (bright where the warped
  // field folds over itself), drifting like light through moving water.
  vec2 q = p * 5.0;
  float cst = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    q += 0.6 * vec2(sin(q.y * 1.3 + t * 0.9 + fi), cos(q.x * 1.1 - t * 0.7 + fi * 1.7)) / (1.0 + fi * 0.3);
    float rid = abs(sin(q.x * 1.7 + q.y * 0.6) * cos(q.y * 1.5 - q.x * 0.4));
    cst += exp(-rid * 9.0);
  }
  return clamp(cst * 0.26 - 0.2, 0.0, 1.2);
#elif FX_KIND == 5
  // GLASS — Apollonian gasket by repeated circle inversion (packed circles
  // inside circles); rims glow like edges of glass. It breathes slowly.
  vec2 zz = p * 1.25;
  float sc = 1.0, kk = 1.12 + 0.06 * sin(t * 0.25);
  for (int i = 0; i < 8; i++) {
    zz = -1.0 + 2.0 * fract(0.5 * zz + 0.5);
    float r2 = max(dot(zz, zz), 1e-4);
    float k = kk / r2;
    zz *= k; sc *= k;
  }
  float d = 0.25 * abs(zz.y) / sc;
  // where circles shrink below a pixel (the gasket's dense dust) fade to a dim average, not solid white
  float dens = clamp(log(sc * fw * 6.0 + 1.0) * 0.7, 0.0, 1.0);
  return clamp((fxLine(d, 0.003, fw * 1.2) + exp(-d * 90.0) * 0.35) * mix(1.0, 0.35, dens), 0.0, 1.2);
#elif FX_KIND == 6
  // RUBBER — Turing (reaction-diffusion-like) labyrinth: a band-passed noise
  // field cut into stripes of near-constant width that slowly crawl.
  float v = fxFbm(p * 2.6 + vec2(t * 0.05, 0.0)) - 0.62 * fxFbm(p * 5.3 + 3.7 - vec2(0.0, t * 0.04));
  float st = sin(v * 30.0 + t * 0.3);
  float fwS = fwidth(st) + 1e-3;
  return smoothstep(0.35 - fwS, 0.35 + fwS, st) * 0.8 + 0.12 * exp(-abs(st - 0.35) * 4.0);   // thinner bright stripes on dark
#elif FX_KIND == 7
  // SAND — ten-fold girih star (all angles multiples of 36 deg, Hankin rays)
  // over wind ripples with a gentle windward and steep lee slope.
  float r = length(p), a = atan(p.y, p.x);
  float seg = FX_PI / 5.0;
  a = abs(mod(a, seg) - seg * 0.5);
  vec2 q = r * vec2(cos(a), sin(a));
  // star polygons: vertex at the wedge edge (18 deg) joined to the vertex 3 (and 2) steps away
  vec2 v0 = 0.88 * vec2(cos(0.31416), sin(0.31416));
  float s1 = min(fxSeg(q, v0, 0.88 * vec2(0.0, -1.0)), fxSeg(q, v0, 0.88 * vec2(cos(2.1991), sin(2.1991))));
  vec2 u0 = 0.5 * vec2(cos(0.31416), sin(0.31416));
  float s2 = min(fxSeg(q, u0, 0.5 * vec2(cos(-0.94248), sin(-0.94248))), fxSeg(q, u0, 0.5 * vec2(cos(1.5708), sin(1.5708))));
  float star = min(min(s1, s2), abs(r - 0.93));
  float lines = fxLine(star, 0.007, fw * 1.2) + exp(-star * 45.0) * 0.3;
  float ph = p.x * 16.0 + 2.2 * sin(p.y * 3.1 + t * 0.2) - t * 0.8;
  float rip = fract(ph / 6.2832); rip = rip < 0.75 ? rip / 0.75 : (1.0 - rip) / 0.25;   // asymmetric dune profile
  return clamp(lines * 0.9 + pow(rip, 3.0) * 0.32, 0.0, 1.2);
#elif FX_KIND == 8
  // MUD — Voronoi cracks (F2 - F1), with a finer crack level inside each clay
  // plate; cracks widen and close as the mud dries (seed points never move).
  vec2 g = p * 3.0, ip = floor(g), fp = fract(g);
  float f1 = 8.0, f2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 o = vec2(float(i), float(j));
    float dd = length(o + fxHash2(ip + o) * 0.9 + 0.05 - fp);
    if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
  }
  vec2 g2 = p * 8.3, ip2 = floor(g2), fp2 = fract(g2);
  float h1 = 8.0, h2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 o = vec2(float(i), float(j));
    float dd = length(o + fxHash2(ip2 + o + 91.0) - fp2);
    if (dd < h1) { h2 = h1; h1 = dd; } else if (dd < h2) h2 = dd;
  }
  float wd = 0.035 + 0.02 * sin(t * 0.45);
  float big = fxLine(f2 - f1, wd, fw * 3.0 * 1.5);
  float small = fxLine(h2 - h1, wd * 0.6, fw * 8.3 * 1.5) * 0.5;
  return clamp(big + small * 0.8, 0.0, 1.2);
#elif FX_KIND == 9
  // POLISHED STONE — Julia set marble: distance estimate 0.5|z|log|z|/|z'|
  // draws thin veins; turbulence in c makes it flow like polished stone.
  vec2 zz = p * 1.45 + 0.08 * vec2(fxFbm(p * 2.0), fxFbm(p * 2.0 + 5.0));
  vec2 dz = vec2(1.0, 0.0);
  vec2 c = uFxC + 0.025 * vec2(cos(t * 0.17), sin(t * 0.13));
  float m2 = 0.0;
  for (int i = 0; i < 28; i++) {
    dz = 2.0 * fxCmul(zz, dz);
    zz = fxCmul(zz, zz) + c;
    m2 = dot(zz, zz);
    if (m2 > 1e4) break;
  }
  if (m2 <= 1e4) return 0.04;                                // inside the set: deep stone
  float d = 0.25 * sqrt(m2 / max(dot(dz, dz), 1e-12)) * log(m2);
  // veins: the set's edge plus nested equidistant veins around it (bands of log-distance)
  float lv = log(d + 1e-5) * 2.2;
  float bands = abs(fract(lv) - 0.5) * 2.0;
  return clamp(exp(-d * 40.0) * 0.9 + fxLine(d, 0.002, fw) * 0.6 + (1.0 - smoothstep(0.0, 0.12, bands)) * 0.3 * exp(-d * 3.0), 0.0, 1.2);
#elif FX_KIND == 10
  // STEEL GRATING — Hilbert space-filling curve drawn as circuit traces, with
  // pulses of light running along the curve like data.
  vec2 q = (p * 0.5 + 0.5) * 32.0;
  ivec2 cell = clamp(ivec2(floor(q)), ivec2(0), ivec2(31));
  vec2 f = fract(q) - 0.5;
  int d = fxHxy2d(cell);
  vec2 da = vec2(fxHd2xy(max(d - 1, 0)) - cell), db = vec2(fxHd2xy(min(d + 1, 1023)) - cell);
  float dist = min(fxSeg(f, vec2(0.0), da * 0.5), fxSeg(f, vec2(0.0), db * 0.5));
  float trace = fxLine(dist, 0.17, fw * 32.0 * 1.2);
  float pulse = pow(fract(float(d) / 90.0 - t * 0.45), 5.0);
  return clamp(trace * (0.45 + 0.75 * pulse) + exp(-dist * 4.0) * 0.3, 0.0, 1.2);
#else
  // SNOW — Koch snowflake: six-fold symmetry, each edge folded into the Koch
  // curve (+60, -120, +60 degree turns at 1/3 scale); a soft swirl glows behind.
  float a = atan(p.y, p.x), r = length(p);
  a = abs(mod(a + FX_PI / 6.0, FX_PI / 3.0) - FX_PI / 6.0);
  vec2 w = r * vec2(cos(a), sin(a));
  float R = 0.62, hw = R * 0.57735;
  vec2 zz = vec2(w.y / hw, (w.x - R) / hw);              // edge coordinates: along, outward
  float sc = 1.0;
  float ang = 1.0471976 * (1.0 + 0.06 * sin(t * 0.3));       // fold angle morphs around 60 deg
  vec2 n = vec2(-sin(ang), cos(ang));
  for (int i = 0; i < 5; i++) {
    zz.x = abs(zz.x);
    vec2 o = vec2(1.0 / 3.0, 0.0);
    float k = dot(zz - o, n);
    if (k > 0.0) zz -= 2.0 * k * n;
    zz = (zz - vec2(2.0 / 3.0, 0.0)) * 3.0; sc *= 3.0;
  }
  float d = length(zz - vec2(clamp(zz.x, -1.0, 1.0), 0.0)) / sc * hw;
  float swirl = 0.5 + 0.5 * sin(r * 9.0 - t * 0.8 + 3.0 * atan(p.y, p.x));
  return clamp(fxLine(d, 0.004, fw * 1.2) + exp(-d * 60.0) * 0.35 + swirl * 0.1, 0.0, 1.2);
#endif
}

// rotate a colour's hue (radians) around the grey axis
vec3 fxHue(vec3 c, float a) {
  const vec3 k = vec3(0.57735);
  float ca = cos(a);
  return c * ca + cross(k, c) * sin(a) + k * dot(k, c) * (1.0 - ca);
}

vec3 fxColor() {
  // metres from the floor centre (walls are far from it)
  float across = (vFxUv.x - uFxCenter);
  float tube = vFxMode.w;
  float wall = max(smoothstep(1.4, 3.8, abs(across)), tube * mix(0.35, 0.6, uFxBallDark));   // calmer floor under a bright ball
  // every section moves: a baseline rush toward you, much stronger in tubes
  float flowK = vFxMode.x - mix(0.7, 1.6, tube);
  float push = max(vFxMode.y, tube * 0.6);
  float twist = vFxMode.z + tube * 1.2 * sin(uFxTime * 0.23);
  float breathe = sin(uFxTime * 2.4 + vFxUv.y * 0.04);
  float zoom = 1.0 + push * 0.35 * breathe;

  // LAYER 1: the main fractal, streaming with the ride and spiralling (helical twist)
  float along = vFxUv.y - uFxTime * uFxFlow - uFxTravel * flowK;
  // across-scale chosen so the pattern wraps seamlessly all the way round a pipe
  float kx = 4.0 * 2.0 * max(1.0, floor(uFxRing * uFxScale / 8.0 + 0.5)) / uFxRing;
  vec2 p1 = vec2((across + uFxTime * twist * 1.6 + along * twist * 0.04) * kx, along * uFxScale) * zoom;
  float f1 = fxPattern(fxMirror(p1));
  // LAYER 2: a bigger, slower layer drifting the other way (parallax depth, like
  // the stacked projection layers of a dome show)
  vec2 p2 = vec2((across - uFxTime * twist * 1.6) * kx * 0.5, (vFxUv.y * 0.55 - uFxTravel * flowK * 0.4 + uFxTime * 0.5) * uFxScale) / zoom;
  float f2 = fxPattern(fxMirror(p2 + 0.37));
  // contrast: crush the gaps between features to black, keep the features bright
  // contrast pairing with the ball: a BRIGHT ball needs dark, high-contrast walls;
  // a DARK ball can sit against lighter, softer patterns
  f1 = pow(clamp(f1, 0.0, 1.4), mix(2.2, 1.3, uFxBallDark));
  float f = clamp(f1 + f2 * f2 * mix(0.18, 0.3, tube), 0.0, 1.4);   // the deep layer sits dim, behind
  // relief: shade the pattern from its own slope so features look raised (3-D emboss)
  vec2 gr = vec2(dFdx(f1), dFdy(f1));
  float relief = clamp(0.5 + dot(gr, vec2(0.7, -0.7)) * 5.0, 0.0, 1.0);

  // psychedelic colour: hue cycles in time, along the course and through the
  // pattern itself (full spectrum in tubes, a gentle shimmer in the open)
  vec3 col = mix(uFxB, uFxA, clamp(f1, 0.0, 1.0));
  col = mix(col, mix(uFxA, uFxB, 0.5) * 1.2, clamp(f2, 0.0, 1.0) * 0.4);
  float psy = uFxPsy * mix(0.6, 1.0, tube);
  col = fxHue(col, psy * (uFxTime * 0.9 + vFxUv.y * 0.025 - uFxTravel * 0.01 + f1 * 2.5 + cos(across * 6.2832 / uFxRing) * 1.5));
  col = max(col, 0.0) * (0.45 + 1.1 * relief);
  col = mix(col, vec3(1.0), 0.22 * uFxBallDark);   // pastel lift: lighter designs only when the ball is dark

  // WARP RINGS: bright bands around the pipe rushing at you with your speed
  float ring = pow(0.5 + 0.5 * sin((vFxUv.y + uFxTravel * 1.0) * 0.45 + uFxTime * 3.0), 10.0) * (0.25 + tube * 1.1);
  vec3 ringCol = fxHue(mix(uFxA, uFxB, 0.3), (uFxTime * 1.3 + vFxUv.y * 0.05) * uFxPsy);

  float pulse = (0.85 + 0.15 * sin(uFxTime * 2.0 + vFxUv.y * 0.6)) * (1.0 + push * 0.45 * breathe);
  float wallLit = max(wall, uFxEdge * 0.45);   // light worlds: the fractal lights the floor too
  float k = (0.04 + 0.96 * wallLit) * f * pulse * (0.75 + 0.5 * uFxSpeed) * (1.0 + 0.9 * tube);
  vec3 fxE2 = fxEdges();
  float core = pow(fxE2.x, 6.0);  // a thin neon core inside each dark contour line
  vec3 em = (col * k + ringCol * ring * (0.4 + 0.6 * uFxSpeed) * (0.3 + 0.7 * wall) + mix(uFxA, uFxB, 0.4) * core * uFxEdge * 0.35) * uFxIntensity * 2.2;
  // soft ceiling: bright features stay saturated colour instead of blowing out to white
  float pk = max(em.r, max(em.g, em.b));
  return em / (1.0 + pk * 0.8);
}
`;function Xd(e,t,n,r,i=43){let a=new G(t.a),o=new G(t.b);e.defines={...e.defines??{},FX_KIND:t.kind},e.onBeforeCompile=e=>{Object.assign(e.uniforms,r,{uFxA:{value:a},uFxB:{value:o},uFxScale:{value:t.scale},uFxFlow:{value:t.flow},uFxC:{value:t.c},uFxCenter:{value:n},uFxRing:{value:i},uFxPsy:{value:t.psy},uFxEdge:{value:t.edge??.25}}),e.vertexShader=`attribute vec2 fxuv;
attribute vec4 fxmode;
varying vec2 vFxUv;
varying vec4 vFxMode;
`+e.vertexShader.replace(`#include <uv_vertex>`,`#include <uv_vertex>
 vFxUv = fxuv; vFxMode = fxmode;`),e.fragmentShader=Yd+e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
 float fxLum = max(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11)), 1e-3); diffuseColor.rgb *= mix(1.0, min(1.0, 0.045 / fxLum), vFxMode.w);
 diffuseColor.a = mix(diffuseColor.a, 1.0, vFxMode.w); // see-through gutters become projection screens inside tubes
 vec3 fxE = fxEdges(); diffuseColor.rgb *= 1.0 - uFxEdge * (0.7 * fxE.x + 0.35 * fxE.y + 0.28 * fxE.z);`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
 reflectedLight.indirectSpecular *= 1.0 - 0.9 * vFxMode.w; reflectedLight.directSpecular *= 1.0 - 0.7 * vFxMode.w;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
 totalEmissiveRadiance += fxColor();`).replace(`#include <transmission_fragment>`,ks.transmission_fragment.replace(`material.transmission = transmission;`,`material.transmission = transmission * (1.0 - vFxMode.w);`))},e.customProgramCacheKey=()=>`fx${t.kind}`,e.needsUpdate=!0}function Zd(e,t,n,r=!1,i,a,o=`high`){let s=new Fn,c=t.visual,l=Kd(c.surface,c.tint),u=c.transparent&&c.surface===`glass`,d=u&&o===`high`?new yo({color:16777215,roughness:.04,metalness:0,transmission:1,thickness:.9,ior:1.5,attenuationColor:new G(c.tint).multiplyScalar(.55),attenuationDistance:2.2,clearcoat:1,clearcoatRoughness:.03,specularIntensity:1,side:2,normalMap:l.normalMap,envMapIntensity:1.4}):u?new yo({color:c.tint,roughness:c.roughness,metalness:0,transmission:0,transparent:!0,opacity:c.opacity??.4,side:2,normalMap:l.normalMap,depthWrite:!0,envMapIntensity:.35}):new vo({map:l.map,normalMap:l.normalMap,roughnessMap:l.roughnessMap,roughness:1,metalness:c.metalness,transparent:!!c.transparent&&c.surface!==`grating`,opacity:c.opacity??1,alphaTest:l.alphaMap?.5:0,side:2});l.alphaMap&&(d.alphaMap=l.alphaMap),l.map&&d.color?.set(16777215);let f=e.profile,p=new Map,m=(e,t=f.H,n=f.H,r=1)=>{let i=Math.round(e*200),a=Math.round(t*4),o=Math.round(n*4),s=Math.round(r*50),c=`${i}|${a}|${o}|${s}`,l=p.get(c);if(l)return l;let{pts:u,nrm:d}=Ju(s===50?f:{...f,a:f.a*(s/50)},i/200,12,14,a/4,o/4),m=u.map((e,t)=>[e[0]-d[t][0]*f.th,e[1]-d[t][1]*f.th]),h=[],g=0;for(let e=0;e<u.length;e++)e>0&&(g+=Math.hypot(u[e][0]-u[e-1][0],u[e][1]-u[e-1][1])),h.push({x:u[e][0],y:u[e][1],nx:d[e][0],ny:d[e][1],u:g,part:0});let _=h[Math.floor(u.length/2)].u;for(let e of h)e.u-=_;g-=_;let v=m[m.length-1];h.push({x:u[u.length-1][0],y:u[u.length-1][1],nx:0,ny:1,u:g,part:1}),h.push({x:v[0],y:v[1],nx:0,ny:1,u:g+f.th,part:1}),g+=f.th;for(let e=m.length-1;e>=0;e--)e<m.length-1&&(g+=Math.hypot(m[e][0]-m[e+1][0],m[e][1]-m[e+1][1])),h.push({x:m[e][0],y:m[e][1],nx:-d[e][0],ny:-d[e][1],u:g,part:1});return h.push({x:m[0][0],y:m[0][1],nx:0,ny:1,u:g,part:1}),h.push({x:u[0][0],y:u[0][1],nx:0,ny:1,u:g+f.th,part:1}),p.set(c,h),h},h=Ju(f,0,12,14).pts.length,g=(i??[]).map(e=>({...e,proj:new td(e.other)})),_=(e,t,n,r)=>{for(let i of g)if(!(r<i.s0||r>i.s1)&&(i.proj.relocate(e,t,n),i.proj.project(e,t,n),!(Math.abs(i.proj.along)>1.5||i.proj.s<.2||i.proj.s>i.other.length-.2)&&i.other.channelDepthLocal(i.proj.s,i.proj.x,i.proj.y)>.03))return!0;return!1},v=new H,y=new H,b=new H,x=new H,S=[],C=[],w=[],T=[],E=[],D=[],O=[],k=[],A=[],j=[],ee=m(0).length,M=-1,te=(t,n,r)=>{let i=S.length/3,a=O.length/3,o=0,s=[];for(let i=t;i<=n;i+=r){e.sample(i,v,y,b,x);let t=i*e.ds,n=m(e.tubeK[i],e.wallL[i],e.wallR[i],e.widen[i]);s.push(t);for(let r=0;r<ee;r++){let a=n[r],o=v.x+x.x*a.x+b.x*a.y,s=v.y+x.y*a.x+b.y*a.y,c=v.z+x.z*a.x+b.z*a.y,l=x.x*a.nx+b.x*a.ny,u=x.y*a.nx+b.y*a.ny,d=x.z*a.nx+b.z*a.ny;a.part===0?(S.push(o,s,c),C.push(l,u,d),w.push((a.u+24)/Ld,t/Ld),E.push(a.u,t),D.push(e.fxMode[i*3],e.fxMode[i*3+1],e.fxMode[i*3+2],e.tubeK[i])):(O.push(o,s,c),k.push(l,u,d),A.push((a.u+24)/Ld,t/Ld))}o++}let c=ee-h,l=(e,t,n,r,i,a)=>{if(!g.length)return!0;let o=(n-t)*3,s=(r-t)*3,c=(i-t)*3,l=t*3,u=(e[l+o]+e[l+s]+e[l+c])/3,d=(e[l+o+1]+e[l+s+1]+e[l+c+1])/3,f=(e[l+o+2]+e[l+s+2]+e[l+c+2])/3;return!_(u,d,f,a)};for(let e=0;e<o-1;e++){let t=(s[e]+s[e+1])/2,n=g.some(e=>t>=e.s0-1&&t<=e.s1+1);for(let r=0;r<h-1;r++){let a=i+e*h+r,o=a+1,s=a+h,c=s+1;(!n||l(S,i,a,o,s,t))&&T.push(a,o,s),(!n||l(S,i,o,c,s,t))&&T.push(o,c,s)}for(let r=0;r<c-1;r++){let i=a+e*c+r,o=i+1,s=i+c,u=s+1;(!n||l(O,a,i,o,s,t))&&j.push(i,o,s),(!n||l(O,a,o,u,s,t))&&j.push(o,u,s)}}};for(let t=0;t<e.n;t++){let n=e.gap[t]===1;if(!n&&M<0&&(M=t),(n||t===e.n-1)&&M>=0){let r=n?t-1:t,i=M;for(;i<r;){let t=e.tubeK[i]>0&&e.tubeK[i]<1||g.some(t=>i*e.ds>=t.s0-2&&i*e.ds<=t.s1+2),n=i;for(;n<r&&(e.tubeK[n]>0&&e.tubeK[n]<1||g.some(t=>n*e.ds>=t.s0-2&&n*e.ds<=t.s1+2))===t;)n++;let a=t?1:2,o=n-(n-i)%a;o<=i&&(o=n,a=1),te(i,o,a),i=o}M=-1}}let N=new Rr;N.setAttribute(`position`,new Cr(new Float32Array(S),3)),N.setAttribute(`normal`,new Cr(new Float32Array(C),3)),N.setAttribute(`uv`,new Cr(new Float32Array(w),2)),N.setAttribute(`fxuv`,new Cr(new Float32Array(E),2)),N.setAttribute(`fxmode`,new Cr(new Float32Array(D),4)),N.setIndex(T),N.computeTangents?.();let ne=new K(N,d);ne.receiveShadow=!0,ne.name=`gutterSurface`,s.add(ne);let re=Jd[t.id]??Jd.wood,ie={uFxTime:{value:0},uFxIntensity:{value:.5},uFxSpeed:{value:0},uFxTravel:{value:0},uFxBallDark:{value:0}},ae=m(1).filter(e=>e.part===0);Xd(d,re,0,ie,ae[ae.length-1].u-ae[0].u),s.userData.fx=ie,s.userData.fxStrength=re.strength;let oe=new Rr;oe.setAttribute(`position`,new Cr(new Float32Array(O),3)),oe.setAttribute(`normal`,new Cr(new Float32Array(k),3)),oe.setAttribute(`uv`,new Cr(new Float32Array(A),2)),oe.setIndex(j);let se=new G(c.tint).multiplyScalar(c.surface===`wood`?.62:.8),ce=new vo({color:c.surface===`glass`?12577008:se,map:c.surface===`glass`?null:l.map,roughness:Math.min(1,c.roughness+.2),metalness:c.metalness,transparent:!!c.transparent,opacity:c.surface===`glass`?.25:c.opacity??1,side:2,alphaTest:l.alphaMap?.5:0,depthWrite:c.surface!==`glass`});l.alphaMap&&(ce.alphaMap=l.alphaMap);let le=new K(oe,ce);if(le.castShadow=c.surface!==`glass`,le.receiveShadow=!0,s.add(le),t.medium===`water`){let n=$d(e,t);s.add(n),s.userData.water=n.userData.water}s.add(Qd(e,t,re)),s.add(tf(e,t,n,a??[e])),s.add(nf(e,t)),s.add(rf(e,t)),e.pads.length&&s.add(sf(e));{let n=of(e,t);n&&s.add(n)}let P=df(e);if(P&&(s.add(P),s.userData.chain=P.material),!r||e.layout.finishLine){s.add(mf(e,r?2:3,r?e.layout.name.toUpperCase():`START`,t)),s.add(mf(e,e.length-62,`FINISH`,t));for(let n of e.layout.signs??[]){let r=e.segmentStarts.find(e=>e.label===n.at);r&&s.add(mf(e,r.s+n.s,n.text,t))}for(let t=1;t<e.checkpoints.length;t++)e.tubeAt(e.checkpoints[t])===0&&s.add(hf(e,e.checkpoints[t]))}else s.add(mf(e,2,e.layout.name.toUpperCase(),t));return s}function Qd(e,t,n){let r=e.profile,i=Bu(r)+r.th*.5,a=new ao(1,.05,6,28,Math.PI),o=new vo({color:t.visual.surface===`wood`?8016432:new G(t.visual.tint).multiplyScalar(.7),emissive:new G(n.a),emissiveIntensity:.55,roughness:.6,metalness:t.visual.metalness}),s=new H,c=new H,l=new H,u=new H,d=[];for(let t=20;t<e.length-70;t+=7){let n=Math.round(t/e.ds);if(e.gap[n]||e.tunnel[n]||e.openSky[n]||e.tubeK[n]>0||Math.max(e.wallL[n],e.wallR[n])>r.H+.4||e.widen[n]>1.02||(e.sample(n,s,c,l,u),l.y<.45))continue;let a=new W().makeBasis(u,l,c.clone().negate());a.scale(new H(i,2.6,1)),a.setPosition(s.clone().addScaledVector(l,r.H+r.th)),d.push(a)}let f=new zi(a,o,d.length);return d.forEach((e,t)=>f.setMatrixAt(t,e)),f.instanceMatrix.needsUpdate=!0,f.name=`ribs`,f}function $d(e,t){let n=t.mediumParams?.depth??1.2,r=[],i=[],a=[],o=[],s=[],c=new H,l=new H,u=new H,d=new H,f=0;for(let t=0;t<e.n;t+=2){if(e.gap[t]){f=-1;continue}e.sample(t,c,l,u,d);let p=e.profileAt(t*e.ds),m=n>=p.rc?p.a+p.rc:p.a+Math.sqrt(p.rc*p.rc-(p.rc-n)**2);for(let s of[-1,1])r.push(c.x+d.x*m*s+u.x*n,c.y+d.y*m*s+u.y*n,c.z+d.z*m*s+u.z*n),i.push(s<0?0:1,t*e.ds),a.push(l.x,l.y,l.z),o.push(u.x,u.y,u.z);let h=r.length/3-2;f>0&&s.push(h-2,h,h-1,h-1,h,h+1),f=f<0?1:f+1}let p=new Rr;p.setAttribute(`position`,new Cr(new Float32Array(r),3)),p.setAttribute(`uv`,new Cr(new Float32Array(i),2)),p.setAttribute(`aTan`,new Cr(new Float32Array(a),3)),p.setAttribute(`normal`,new Cr(new Float32Array(o),3)),p.setIndex(s);let m=Ed[t.id]??Ed.water,h=new H().setFromSphericalCoords(1,(90-t.visual.sky.elevation)*Math.PI/180,t.visual.sky.azimuth*Math.PI/180),g=new G(t.visual.water??4175817),_=new go({transparent:!0,depthWrite:!1,side:2,fog:!0,uniforms:{...q.fog,uTime:{value:0},uDeep:{value:g.clone().multiplyScalar(.35).lerp(new G(340042),.4)},uShallow:{value:g.clone().lerp(new G(10483174),.35)},uZenith:{value:new G(m.zenith)},uHorizon:{value:new G(m.horizon??t.visual.fog)},uSun:{value:h},uSunCol:{value:new G(m.sunColor)},uWidth:{value:6}},vertexShader:`
      attribute vec3 aTan;
      varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW;
      #include <fog_pars_vertex>
      void main() {
        vUv = uv;
        vN = normalize(mat3(modelMatrix) * normal);
        vT = normalize(mat3(modelMatrix) * aTan);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      uniform float uTime, uWidth;
      uniform vec3 uDeep, uShallow, uZenith, uHorizon, uSun, uSunCol;
      varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW;
      #include <fog_pars_fragment>
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
      // wave height: a few travelling wave trains flowing downstream, plus fine ripples
      float H(vec2 q) {
        float t = uTime;
        float h = 0.0;
        h += 0.10 * sin(q.y * 0.55 - t * 3.2 + sin(q.x * 0.9) * 1.5);
        h += 0.06 * sin(q.y * 1.3 + q.x * 0.7 - t * 4.1);
        h += 0.05 * sin(q.y * 0.9 - q.x * 1.1 - t * 2.7);
        h += 0.045 * (vn(q * vec2(1.6, 0.7) - vec2(0.0, t * 2.4)) - 0.5);
        h += 0.02 * (vn(q * vec2(4.0, 2.2) - vec2(t * 0.3, t * 5.0)) - 0.5);
        return h;
      }
      void main() {
        vec2 q = vec2((vUv.x - 0.5) * 2.0 * uWidth, vUv.y);   // metres: across, along
        float e = 0.08;
        float hx = (H(q + vec2(e, 0.0)) - H(q - vec2(e, 0.0))) / (2.0 * e);
        float hy = (H(q + vec2(0.0, e)) - H(q - vec2(0.0, e))) / (2.0 * e);
        vec3 N0 = normalize(vN), T = normalize(vT), Rr = normalize(cross(T, N0));
        vec3 N = normalize(N0 - Rr * hx * 2.2 - T * hy * 2.2);
        vec3 V = normalize(cameraPosition - vW);
        if (dot(N, V) < 0.0) N = -N;
        float ndv = clamp(dot(N, V), 0.0, 1.0);
        float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
        vec3 Rf = reflect(-V, N);
        vec3 skyC = mix(uHorizon, uZenith, pow(clamp(Rf.y, 0.0, 1.0), 0.4));
        float spec = pow(max(dot(Rf, normalize(uSun)), 0.0), 260.0) * 6.0 + pow(max(dot(Rf, normalize(uSun)), 0.0), 30.0) * 0.25;
        // body: shallow and bright at the banks, deep in the middle; caustic shimmer
        float across = abs(vUv.x - 0.5) * 2.0;
        vec3 body = mix(uDeep, uShallow, smoothstep(0.35, 1.0, across));
        float caus = pow(vn(q * 1.7 + vec2(0.0, -uTime * 1.5)) * vn(q * 2.3 + vec2(uTime * 0.4, -uTime * 2.0)), 2.0);
        body += uShallow * caus * 0.6;
        vec3 col = mix(body, skyC, fres) + uSunCol * spec;
        // foam: along the banks and on the crests, churned by the flow
        float hh = H(q);
        float fn = vn(q * vec2(2.5, 1.2) - vec2(0.0, uTime * 3.0));
        float foam = smoothstep(0.82, 0.98, across + fn * 0.12) + smoothstep(0.12, 0.2, hh + fn * 0.06) * 0.6;
        col = mix(col, vec3(0.95, 0.98, 1.0), clamp(foam, 0.0, 1.0) * 0.85);
        float alpha = clamp(0.62 + fres * 0.35 + foam * 0.3, 0.0, 0.95);
        gl_FragColor = vec4(col, alpha);
        #include <fog_fragment>
      }`}),v=new K(p,_);return v.name=`liquid`,v.renderOrder=2,v.userData.water=_,v}function ef(e){let t=new Map;for(let n of e)for(let e=0;e<n.n;e+=2){let r=`${Math.floor(n.P[e*3]/12)},${Math.floor(n.P[e*3+2]/12)}`,i=t.get(r);i||t.set(r,i=[]),i.push([n,e])}return(e,n,r,i,a,o)=>{let s=Math.floor(r/12),c=Math.floor(i/12);for(let l=-1;l<=1;l++)for(let u=-1;u<=1;u++){let d=t.get(`${s+u},${c+l}`);if(d)for(let[t,s]of d){if(t===e&&Math.abs(s*t.ds-n)<25)continue;let c=(t.tubeK[s]>0?t.profile.H+t.profile.a+t.profile.rc:t.profile.H)/2,l=t.P[s*3]+t.U[s*3]*c,u=t.P[s*3+1]+t.U[s*3+1]*c,d=t.P[s*3+2]+t.U[s*3+2]*c,f=Math.max(t.profile.a+t.profile.rc,c)+1.5;if(Math.hypot(l-r,d-i)<f&&u+f>a&&u-f<o)return!1}}return!0}}function tf(e,t,n,r){let i=ef(r),a=new Fn,o=t.visual.surface===`wood`?new _a(.35,1,.35):new ya(.35,.45,1,10),s=new vo({color:t.visual.surface===`wood`?6965804:t.visual.surface===`glass`?14674154:new G(t.visual.tint).multiplyScalar(.55).getHex(),roughness:.8,metalness:t.visual.metalness*.6}),c=Math.ceil(e.length/9)*2,l=new zi(o,s,c),u=new zi(new _a(1,.3,.3),s,Math.ceil(e.length/9)*3),d=0,f=0,p=new H,m=new H,h=new H,g=new H,_=new W,v=new Rt,y=new H,b=new H,x=Bu(e.profile)+e.profile.th*.5;for(let t=10;t<e.length;t+=9){let r=Math.round(t/e.ds);if(e.gap[r]||(e.sample(r,p,m,h,g),h.y<.6))continue;let a=p.clone().addScaledVector(h,-e.profile.th);for(let r of[-1,1]){if(h.y<.93)break;let o=a.clone().addScaledVector(g,r*(x-.6)),s=n(o.x,o.z),u=o.y-s;u<.5||u>400||i(e,t,o.x,o.z,s,o.y-.5)&&(b.set(o.x,s+u/2,o.z),v.identity(),y.set(1,u,1),_.compose(b,v,y),d<c&&l.setMatrixAt(d++,_))}if(h.y<.93){let r=n(a.x,a.z),o=a.y-r;o>.5&&o<400&&d<c&&i(e,t,a.x,a.z,r,a.y-.5)&&(b.set(a.x,r+o/2,a.z),v.identity(),y.set(1.3,o,1.3),_.compose(b,v,y),l.setMatrixAt(d++,_))}let o=new W().makeBasis(g,h,m.clone().negate());if(v.setFromRotationMatrix(o),y.set(x*2+.4,1,1),_.compose(a.clone().addScaledVector(h,-.2),v,y),f<u.count&&u.setMatrixAt(f++,_),h.y>.93){let r=n(p.x,p.z),a=new Rt().setFromAxisAngle(new H(0,1,0),Math.atan2(-g.z,g.x));for(let n=10;n<p.y-r-4&&!(f>=u.count);n+=12)i(e,t,p.x,p.z,p.y-n-1,p.y-n+1)&&(_.compose(new H(p.x,p.y-n,p.z),a,y),u.setMatrixAt(f++,_))}}return l.count=d,u.count=f,l.castShadow=!0,l.instanceMatrix.needsUpdate=!0,u.instanceMatrix.needsUpdate=!0,a.add(l,u),a}function nf(e,t){let n=new Fn,r=e.profile,i=Bu(r)+r.th,a=r.H+r.th*2.5,o=Kd(t.visual.surface,t.visual.tint),s=new vo({map:o.map,normalMap:o.normalMap,roughnessMap:o.roughnessMap,roughness:1,color:14205088,side:2}),c=new vo({color:t.visual.surface===`wood`?4861976:5592405,roughness:.95,side:2}),l=new vo({color:4861976,roughness:.9}),u=new H,d=new H,f=new H,p=new H,m=[],h=[],g=[],_=[],v=[],y=new _a(.3,1,.3),b=new _a(.18,.5,1),x=[],S=[],C=-1,w=-1,T=[-i,-i*.5,0,i*.5,i];for(let t=0;t<e.n;t+=2){if(!e.tunnel[t]){C=-1,w=-1;continue}e.sample(t,u,d,f,p);let n=t*e.ds,o=m.length/3;for(let e of T)m.push(u.x+p.x*e+f.x*a,u.y+p.y*e+f.y*a,u.z+p.z*e+f.z*a),h.push((e+i)/Ld,n/Ld);if(C>=0)for(let e=0;e<T.length-1;e++){let t=C+e,n=o+e;g.push(t,t+1,n,t+1,n+1,n)}C=o;let s=_.length/3;for(let e of[-i,i])_.push(u.x+p.x*e+f.x*r.H,u.y+p.y*e+f.y*r.H,u.z+p.z*e+f.z*r.H);w>=0&&v.push(w,w+1,s,w+1,s+1,s),w=s;let c=new W().makeBasis(p,f,d.clone().negate());if(t/2%4==0)for(let e of[-1,1]){let t=c.clone().scale(new H(1,a-r.H*.5,1));t.setPosition(u.clone().addScaledVector(p,e*(i+.1)).addScaledVector(f,(a+r.H*.5)*.5)),x.push(t)}for(let t of[-1,1]){let n=c.clone().scale(new H(1,1,e.ds*2.05));n.setPosition(u.clone().addScaledVector(p,t*(i-.1)).addScaledVector(f,a+.25)),S.push(n)}}if(m.length){let e=new Rr;e.setAttribute(`position`,new Cr(new Float32Array(m),3)),e.setAttribute(`uv`,new Cr(new Float32Array(h),2)),e.setIndex(g),e.computeVertexNormals();let t=new K(e,s);t.castShadow=!0,t.receiveShadow=!0,n.add(t);let r=new Rr;r.setAttribute(`position`,new Cr(new Float32Array(_),3)),r.setIndex(v),r.computeVertexNormals(),n.add(new K(r,c));let i=new zi(y,l,x.length);x.forEach((e,t)=>i.setMatrixAt(t,e)),n.add(i);let a=new zi(b,l,S.length);S.forEach((e,t)=>a.setMatrixAt(t,e)),n.add(a)}return n}function rf(e,t){let n=new Fn,r=Jd[t.id]??Jd.wood,i={h:0,s:0,l:0};new G(r.a).getHSL(i);let a=new G().setHSL((i.h+.5)%1,1,.52),o=new gi({color:a,fog:!1}),s=new gi({color:a.clone().lerp(new G(16777215),.35),fog:!1}),c=new gi({color:0,side:1,fog:!1}),l=new H,u=new H,d=new H,f=new H,p=[],m=new gi({color:328965,fog:!1}),h=new gi({color:3401983,transparent:!0,opacity:.28,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),g=new gi({color:3401983,transparent:!0,opacity:.08,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),_=new Ki({color:11206655,transparent:!0,opacity:.9,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),v=[],y=[o,o,s,o,o,o];for(let t=0;t<e.obstacles.length;t++){let r=e.obstacles[t];e.frameAtS(r.s,l,u,d,f);let i=new _a(r.w,r.h,r.ls),a=new K(i,y),o=new W().makeBasis(f,d,u.clone().negate());a.quaternion.setFromRotationMatrix(o),a.position.copy(l).addScaledVector(f,r.x).addScaledVector(d,r.y+r.h/2),a.castShadow=!0,a.name=`obstacle`;let h=new K(new _a(r.w+.36,r.h+.36,r.ls+.36),c);a.add(h);let g=new ia(new Ea(i),_);if(g.visible=!1,a.add(g),a.userData.holo={k:t,hull:h,edges:g,state:0},v.push(a),n.add(a),r.move&&(a.userData.mover={ob:r,base:a.position.clone(),R:f.clone()},p.push(a)),r.move&&Math.abs(r.move.amp)>1){let e=r.w+2*Math.abs(r.move.amp)+.6,t=new K(new _a(e,.06,r.ls+.8),m);t.quaternion.copy(a.quaternion),t.position.copy(l).addScaledVector(f,r.x).addScaledVector(d,r.y+.04),n.add(t);for(let t of[-1,1]){let i=new K(new _a(.25,.5,r.ls+.8),s);i.quaternion.copy(a.quaternion),i.position.copy(l).addScaledVector(f,r.x+e/2*t).addScaledVector(d,r.y+.25),n.add(i)}}}return n.userData.movers=p,n.userData.holo={meshes:v,solid:y,holo:h,holoUsed:g,holoEdge:_},n}var af=null;function of(e,t){if(!af){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);t.strokeStyle=`#fff`,t.lineWidth=3,t.beginPath(),t.moveTo(0,0),t.lineTo(64,64),t.moveTo(64,0),t.lineTo(0,64),t.stroke(),t.fillStyle=`#fff`;for(let[e,n]of[[0,0],[64,0],[0,64],[64,64],[32,32]])t.beginPath(),t.arc(e,n,4,0,7),t.fill();af=new pa(e),af.wrapS=af.wrapT=l}let n=Jd[t.id]??Jd.wood,r=[],i=[],a=[],o=new H,s=new H,c=new H,u=new H,d=[];for(let e=0;e<=16;e++)d.push(-Qu.half+2*Qu.half*e/16);let f=-1;for(let t=0;t<e.n;t+=4){if(!e.netOn[t]){f=-1;continue}let n=t*e.ds;e.frameAtS(n,o,s,c,u);let l=r.length/3;for(let t of d){let a=o.clone().addScaledVector(u,t).addScaledVector(c,e.netSurface(n,t));r.push(a.x,a.y,a.z),i.push(t/2.2,n/2.2)}if(f>=0)for(let e=0;e<d.length-1;e++){let t=f+e,n=l+e;a.push(t,n,t+1,t+1,n,n+1)}f=l}if(!a.length)return null;let p=new Rr;p.setAttribute(`position`,new Cr(new Float32Array(r),3)),p.setAttribute(`uv`,new Cr(new Float32Array(i),2)),p.setIndex(a);let m=new K(p,new gi({map:af,color:new G(n.a).lerp(new G(16777215),.35),transparent:!0,opacity:.5,blending:2,depthWrite:!1,side:2}));return m.name=`safetyNet`,m}function sf(e){let t=new Fn,n=uf(),r=lf??(lf=cf()),i=new gi({map:n,color:16756768,transparent:!0,opacity:.9,blending:2,depthWrite:!1,side:2,fog:!1,toneMapped:!1}),a=new gi({map:n,color:4255999,transparent:!0,opacity:1,blending:2,depthWrite:!1,side:2,fog:!1,toneMapped:!1}),o=new H,s=new H,c=new H,l=new H,u=[];return e.pads.forEach((n,a)=>{e.frameAtS(n.s,o,s,c,l);let d=e.halfWidthAt(n.s),f=new K(new no(n.len,n.tall),i),p=new W().makeBasis(s.clone().multiplyScalar(-n.side),c,l.clone().multiplyScalar(-n.side));f.quaternion.setFromRotationMatrix(p),f.position.copy(o).addScaledVector(l,n.side*(d-.05)).addScaledVector(c,n.y),f.userData.pad=a,f.renderOrder=2,u.push(f),t.add(f);let m=e.profileAt(n.s),h=m.a+m.rc*Math.PI/2+(n.y-m.rc),g=e=>({sj:n.s-36+e*11,u:m.a*.35+(h-n.tall*.3-m.a*.35)*(e/3)**.85}),_=(t,r,i,a)=>{let u=e.profileAt(t);e.frameAtS(t,o,s,c,l);let d,f,p,m,h=u.rc*Math.PI/2;if(r<=u.a)d=r,f=0,p=0,m=1;else if(r<=u.a+h){let e=(r-u.a)/u.rc;d=u.a+u.rc*Math.sin(e),f=u.rc-u.rc*Math.cos(e),p=-Math.sin(e),m=Math.cos(e)}else d=u.a+u.rc,f=u.rc+(r-u.a-h),p=-1,m=0;i.copy(o).addScaledVector(l,n.side*d).addScaledVector(c,f),a.copy(l).multiplyScalar(n.side*p).addScaledVector(c,m).normalize(),i.addScaledVector(a,.04)},v=[],y=new H,b=new H,x=new H,S=new H;for(let n=0;n<3;n++){let{sj:i,u:a}=g(n),o=Math.round(i/e.ds);if(i<2||e.tubeK[o]>0||e.tunnel[o]||e.isGap(i))continue;let s=g(n+1);_(s.sj,s.u,x,S),_(i,a,y,b);let c=x.sub(y);c.addScaledVector(b,-c.dot(b)).normalize();let l=new H().crossVectors(c,b),u=new K(new no(2.2,2.2),new gi({map:r,color:16756768,transparent:!0,opacity:.5,blending:2,depthWrite:!1,side:2,fog:!1,toneMapped:!1}));u.quaternion.setFromRotationMatrix(new W().makeBasis(l,c,b)),u.position.copy(y),u.userData.j=n,v.push(u),t.add(u)}f.userData.chevs=v}),t.userData.pads={meshes:u,idle:i,lit:a},t}function cf(){let e=document.createElement(`canvas`);e.width=128,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,128,128),t.strokeStyle=`#fff`,t.lineWidth=20,t.lineCap=`round`,t.lineJoin=`round`,t.beginPath(),t.moveTo(22,92),t.lineTo(64,40),t.lineTo(106,92),t.stroke();let n=new pa(e);return n.colorSpace=Ke,n}var lf=null;function uf(){let e=document.createElement(`canvas`);e.width=256,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,256,128),t.strokeStyle=`#fff`,t.lineJoin=`round`,t.lineWidth=8,t.strokeRect(10,10,236,108),t.lineWidth=10,t.beginPath(),t.moveTo(128,22),t.lineTo(172,64),t.lineTo(128,106),t.lineTo(84,64),t.closePath(),t.stroke(),t.fillStyle=`#fff`,t.beginPath(),t.moveTo(128,44),t.lineTo(150,64),t.lineTo(128,84),t.lineTo(106,64),t.closePath(),t.fill(),t.lineWidth=8;for(let[e,n]of[[40,1],[62,1],[216,-1],[194,-1]])t.beginPath(),t.moveTo(e-10*n,40),t.lineTo(e+10*n,64),t.lineTo(e-10*n,88),t.stroke();let n=new pa(e);return n.colorSpace=Ke,n}function df(e){let t=[],n=[],r=[],i=new H,a=new H,o=new H,s=new H,c=!1,l=0;for(let u=0;u<e.n;u+=2){if(!(e.lift[u]>0)){c=!1;continue}e.frameAtS(u*e.ds,i,a,o,s);let d=t.length/3;for(let r of[-.6,.6]){let a=i.clone().addScaledVector(s,r).addScaledVector(o,.035);t.push(a.x,a.y,a.z),n.push(r<0?0:1,u*e.ds)}c&&r.push(l,l+1,d,l+1,d+1,d),l=d,c=!0}if(!r.length)return null;let u=new Rr;u.setAttribute(`position`,new Cr(new Float32Array(t),3)),u.setAttribute(`uv`,new Cr(new Float32Array(n),2)),u.setIndex(r);let d=new K(u,new go({uniforms:{uScroll:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform float uScroll; varying vec2 vUv;
      void main(){
        float s = vUv.y - uScroll;
        float link = step(0.5, fract(s / 0.6));                 // alternating links
        float dog = step(0.92, fract(s / 4.8));                 // a bright dog every few metres
        float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
        vec3 c = mix(vec3(0.05), vec3(0.16), link) + vec3(1.0, 0.75, 0.15) * dog * 1.6;
        gl_FragColor = vec4(c * edge, 1.0);
      }`,side:2}));return d.name=`liftChain`,d}function ff(e,t){let n=e.userData?.chain,r=e.userData?.water;r&&(r.uniforms.uTime.value=t.time),n&&(n.uniforms.uScroll.value=t.time*20),e.traverse(e=>{let n=e.userData?.holo;if(n&&n.meshes){let e=t.time;n.holo.opacity=.22+.08*Math.sin(e*9)+.05*Math.sin(e*23.7),n.holoEdge.opacity=.75+.25*Math.sin(e*13);for(let e of n.meshes){let r=e.userData.holo,i=t.ghost[r.k]?t.holoUsed[r.k]?2:1:0;i!==r.state&&(r.state=i,e.material=i===0?n.solid:i===1?n.holo:n.holoUsed,r.hull.visible=i===0,r.edges.visible=i===1,e.castShadow=i===0)}}let r=e.userData?.pads;if(r){r.idle.opacity=.6+.35*(.5+.5*Math.sin(t.time*5));for(let e of r.meshes){let n=t.padHit[e.userData.pad]===1;e.material=n?r.lit:r.idle;for(let r of e.userData.chevs)r.visible=!n,n||(r.material.opacity=.35+.6*Math.max(0,Math.sin(t.time*5-r.userData.j*1.1)))}}let i=e.userData?.movers;if(i)for(let e of i){let n=e.userData.mover;e.position.copy(n.base).addScaledVector(n.R,t.obstacleX(n.ob)-n.ob.x)}})}function pf(e){let t=document.createElement(`canvas`);t.width=1024,t.height=160;let n=t.getContext(`2d`);if(n.fillStyle=e===`FINISH`?`#1b1b1b`:`#2b4a2a`,n.fillRect(0,0,1024,160),e===`FINISH`){for(let e=0;e<1024;e+=40)for(let t=0;t<160;t+=40)(e+t)/40%2==0&&(n.fillStyle=`#f2f2f2`,n.fillRect(e,t,40,40));n.fillStyle=`rgba(0,0,0,0.75)`,n.fillRect(280,20,464,120)}n.fillStyle=`#ffffff`,n.font=`bold 96px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,512,84);let r=new pa(t);return r.colorSpace=Ke,r}function mf(e,t,n,r){let i=new Fn,a=new H,o=new H,s=new H,c=new H;e.frameAtS(t,a,o,s,c);let l=Bu(e.profile)+.6,u=new vo({color:4861976,roughness:.8}),d=e.profile.H+3.2;for(let e of[-1,1]){let t=new K(new _a(.5,d,.5),u);t.position.copy(a).addScaledVector(c,e*l).addScaledVector(s,d/2),t.quaternion.setFromRotationMatrix(new W().makeBasis(c,s,o.clone().negate())),t.castShadow=!0,i.add(t)}let f=new K(new no(l*2+.5,1.4),new vo({map:pf(n),side:2,roughness:.7,emissive:1118481}));return f.position.copy(a).addScaledVector(s,d-.7),f.quaternion.setFromRotationMatrix(new W().makeBasis(c,s,o.clone().negate())),i.add(f),i}function hf(e,t){let n=new Fn,r=new H,i=new H,a=new H,o=new H;e.frameAtS(t,r,i,a,o);let s=Bu(e.profile)+.4,c=new vo({color:3526911,emissive:682634,roughness:.4});for(let t of[-1,1]){let l=new K(new ya(.12,.12,2.2,8),c);l.position.copy(r).addScaledVector(o,t*s).addScaledVector(a,e.profile.H+1.1),l.quaternion.setFromRotationMatrix(new W().makeBasis(o,a,i.clone().negate())),n.add(l)}return n}var gf={wood:`plinko`,rubber:`plinko`,grating:`plinko`,concrete:`dominoes`,stone:`dominoes`,sand:`dominoes`,metal:`hoop`,mud:`hoop`,glass:`chimes`,ice:`chimes`,water:`funnel`,snow:`funnel`},_f=16,vf=[100,500,1e3,2500,1e4,2500,1e3,500,100],yf=[659.3,587.3,523.3,587.3,659.3,659.3,659.3,587.3,587.3,587.3,659.3,784,784],bf=class{constructor(e,t,n,r,i,a){J(this,`scene`,void 0),J(this,`track`,void 0),J(this,`ball`,void 0),J(this,`kind`,void 0),J(this,`audio`,void 0),J(this,`colors`,void 0),J(this,`group`,new Fn),J(this,`done`,!1),J(this,`score`,0),J(this,`t`,0),J(this,`phase`,`rollout`),J(this,`O`,new H),J(this,`X`,new H),J(this,`Y`,new H(0,1,0)),J(this,`Z`,new H),J(this,`s`,0),J(this,`v`,14),J(this,`flight`,{from:new H,vel:new H,T:.9,t:0}),J(this,`ballPos`,new H),J(this,`ballVel`,new H),J(this,`camPos`,new H),J(this,`camLook`,new H),J(this,`camFrom`,new H),J(this,`lookFrom`,new H),J(this,`camBlend`,0),J(this,`celebrateT`,0),J(this,`confetti`,void 0),J(this,`r`,void 0),J(this,`st`,{}),J(this,`confettiMesh`,void 0),this.scene=e,this.track=t,this.ball=n,this.kind=r,this.audio=i,this.colors=a,this.r=n.tune.radius;let o=new H,s=new H,c=new H,l=new H;t.frameAtS(t.length-3,o,s,c,l),this.Z.set(s.x,0,s.z).normalize(),this.X.crossVectors(this.Y,this.Z).normalize(),this.O.copy(o),this.s=n.mainProj.s,this.v=Math.max(16,Math.min(26,n.v.length())),this.confetti=new xf(this.group),this.confettiMesh=this.confetti.mesh,this.group.name=`finale`,e.add(this.group),this.build(),this.clearGround()}clearGround(){let e=this.W(0,0,32),t=this.O.y-75,n=new W,r=new H,i=new Rt,a=new H;this.scene.traverse(o=>{let s=o;if(s.name===`terrain`&&s.geometry){let n=s.geometry.attributes.position,r=!1;for(let i=0;i<n.count;i++){let a=Math.hypot(n.getX(i)-e.x,n.getZ(i)-e.z);if(a>110)continue;let o=a<55?1:1-(a-55)/55,s=t,c=n.getY(i);c>s&&(n.setY(i,c+(s-c)*o*o*(3-2*o)),r=!0)}r&&(n.needsUpdate=!0,s.geometry.computeVertexNormals())}else if(o.isInstancedMesh){let s=o;if(s.parent?.name!==`scenery`)return;let c=!1;for(let o=0;o<s.count;o++)s.getMatrixAt(o,n),n.decompose(r,i,a),Math.hypot(r.x-e.x,r.z-e.z)<110&&r.y>t-5&&r.y<this.O.y+5&&(n.compose(r,i,a.set(0,0,0)),s.setMatrixAt(o,n),c=!0);c&&(s.instanceMatrix.needsUpdate=!0)}})}W(e,t,n,r=new H){return r.copy(this.O).addScaledVector(this.X,e).addScaledVector(this.Y,t).addScaledVector(this.Z,n)}place(e,t,n,r){this.W(t,n,r,e.position);let i=new W().makeBasis(this.X,this.Y,this.Z);return e.quaternion.setFromRotationMatrix(i),this.group.add(e),e}mat(e,t=0){return new vo({color:e,roughness:.45,metalness:.1,emissive:e,emissiveIntensity:t})}toyColor(e){return new G().setHSL((e*.13+.02)%1,.85,.55)}platform(e,t,n,r,i){let a=this.place(new K(new _a(r,.8,i),this.mat(2764602)),e,t-.4,n);for(let[a,o]of[[-r/2+1,-i/2+1],[r/2-1,-i/2+1],[-r/2+1,i/2-1],[r/2-1,i/2-1]]){let r=new K(new ya(.35,.35,120,6),this.mat(1711396));this.place(r,e+a,t-60.8,n+o)}return a}label(e,t=`#ffffff`,n=6){if(typeof document>`u`)return new Fn;let r=document.createElement(`canvas`);r.width=256,r.height=128;let i=r.getContext(`2d`);i.font=`bold 84px system-ui, sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.lineWidth=10,i.strokeStyle=`rgba(0,0,0,0.85)`,i.strokeText(e,128,66),i.fillStyle=t,i.fillText(e,128,66);let a=new pa(r);a.colorSpace=Ke;let o=new li(new Yr({map:a,depthTest:!1,transparent:!0}));return o.scale.set(n,n/2,1),o.renderOrder=10,o}build(){let e=this.kind;e===`plinko`?this.buildPlinko():e===`dominoes`?this.buildDominoes():e===`hoop`?this.buildHoop():e===`chimes`?this.buildChimes():this.buildFunnel()}buildPlinko(){let e=3.4,t=new K(new _a(40,42.599999999999994,.6),this.mat(1053728));this.place(t,0,-4-9*e/2-3,30.6);let n=[],r=this.mat(this.colors.a,.6);for(let t=0;t<9;t++){let i=t%2?8:9;for(let a=0;a<i;a++){let o=(a-(i-1)/2)*4,s=-6-t*e;n.push(new V(o,s));let c=new K(new ya(.35,.35,2.4,10),r);c.rotation.x=Math.PI/2;let l=new Fn;l.add(c),this.place(l,o,s,29.4)}}let i=[];for(let e=0;e<=9;e++){let t=(e-4.5)*4;i.push(t),this.place(new K(new _a(.3,4,2.4),this.mat(14673647)),t,-39.099999999999994,29.4)}this.place(new K(new _a(36.4,.5,2.4),this.mat(14673647)),0,-41.349999999999994,29.4);let a=[];vf.forEach((e,t)=>{let n=new K(new _a(3.6,3.8,.2),this.mat(this.toyColor(t),.15));this.place(n,(t-4)*4,-39.099999999999994,30.2),a.push(n);let r=this.label(e>=1e3?`${e/1e3}K`:String(e),`#ffffff`,3.2);this.place(r,(t-4)*4,-43.3,28.5)});for(let t of[-18.3,18.3])this.place(new K(new _a(.6,38.599999999999994,2.4),this.mat(14673647)),t,-4-9*e/2-2,29.4);this.st={zb:30,top:-4,dx:4,pegs:n,dividers:i,slotTop:-37.099999999999994,floor:-41.099999999999994,slots:a,still:0,lastClink:0,landed:-1},this.entry(new H((Math.random()-.5)*3,-2.5,28.5))}buildDominoes(){this.platform(0,-6,40,30,60);let e=[],t=new H(0,-6,22),n=0;e.push(t.clone());for(let r=0;r<=1;r+=5e-4){let i=new H(8*Math.sin(r*Math.PI*2),-6,22+r*34);n+=i.distanceTo(t),t=i,n>=2.1&&(e.push(i.clone()),n=0)}let r=[];e.forEach((t,n)=>{let i=e[Math.min(e.length-1,n+1)],a=e[Math.max(0,n-1)],o=new H().subVectors(i,a).normalize(),s=new Fn,c=new K(new _a(2.2,3.4,.45),this.mat(this.toyColor(n)));c.position.set(0,1.7,-.22),s.add(c),this.place(s,t.x,t.y,t.z),s.rotateY(Math.atan2(o.x,o.z)),r.push({m:s,dir:o,t0:-1,fallen:!1,q0:s.quaternion.clone()})});let i=e[e.length-1],a=new H(i.x,-5.1,i.z+4.5),o=new Fn,s=new K(new _a(2,.4,9),this.mat(16763955));o.add(s),this.place(o,a.x,a.y,a.z),o.rotateX(.25),this.place(new K(new ya(.2,.9,1.8,3),this.mat(4475480)),a.x,-5.9,a.z);let c=new K(new io(.7,20,14),new vo({color:16765770,metalness:.9,roughness:.2,emissive:4465152})),l=new H(a.x,a.y+.9-4.2*Math.sin(.25)+0,a.z+4.2);this.place(c,l.x,l.y,l.z);let u=new H(a.x*.3,-4,a.z+16),d=new K(new ya(2.4,1.8,3.2,20,1,!0),new vo({color:3837183,side:2,roughness:.4}));this.place(d,u.x,u.y,u.z);let f=this.makeBell(1.6);this.place(f,u.x,u.y+6,u.z+.5),this.st={y:-6,pts:e,dominoes:r,saw:o,sawPivot:a,gold:c,goldStart:l,bucketPos:u,bell:f,knocked:!1,launched:-1},this.entry(new H(0,-6+this.r,12))}makeBell(e){let t=[];for(let n=0;n<=12;n++){let r=n/12;t.push(new V(e*(.35+.65*r**2.2)+(n===12?e*.12:0),e*2*(1-r)))}let n=new Fn,r=new K(new to(t,24),new vo({color:15251530,metalness:.95,roughness:.25,side:2}));return r.position.y=-e*2,n.add(r),n}buildHoop(){this.platform(0,-8,30,18,46);let e=new H(0,-6.8,18),t=new Fn;t.add(new K(new _a(2.4,.5,14),this.mat(16734842))),this.place(t,e.x,e.y,e.z),t.rotateX(.28),this.place(new K(new ya(.2,1.1,2,3),this.mat(4475480)),e.x,-7.8,e.z);let n=new K(new io(.75,20,14),new vo({color:16765770,metalness:.9,roughness:.2,emissive:4465152})),r=new H(0,e.y+.95-6.3*Math.sin(.28),e.z+6.3);this.place(n,r.x,r.y,r.z);let i=new H(0,-4,44),a=new H(0,9,(r.z+i.z)/2),o=new K(new ao(2.2,.18,10,32),this.mat(16742938,.4));this.place(o,a.x,a.y,a.z),this.place(new K(new ya(.2,.2,a.y- -8,8),this.mat(14673647)),3.2,(a.y+-8)/2,a.z);let s=new K(new ya(2.2,1.6,2.6,20,1,!0),new vo({color:4776058,side:2,roughness:.5}));this.place(s,i.x,i.y,i.z),this.place(new K(new ya(.2,.2,4,8),this.mat(14673647)),0,-6,i.z),this.st={y:-8,piv:e,saw:t,gold:n,goldStart:r,basket:i,apex:a,hoop:o,landed:!1,launchT:-1},this.entry(new H(0,e.y+.95+6.3*Math.sin(.28)+this.r-.3,e.z-6.3))}buildChimes(){let e=yf.length,t=[];for(let n=0;n<e;n++){let e=new H(n%2?1.4:-1.4,-3-n*1.7,9+n*3.1),r=new K(new _a(5.2-n*.15,.45,2.2),this.mat(this.toyColor(n),.25));this.place(r,e.x,e.y,e.z);for(let t of[-1,1])this.place(new K(new ya(.12,.12,1.2,6),this.mat(14673647)),e.x+t*(2.2-n*.07),e.y-.8,e.z);t.push({m:r,p:e,glow:0})}let n=t[e-1].p,r=new H(0,n.y-1.5,n.z+6),i=this.makeBell(2.2);this.place(i,r.x,r.y+4.4,r.z),this.platform(0,n.y-6,n.z+2,16,70),this.st={bars:t,k:-1,hopT:0,bell:i,bellPos:r,rung:!1},this.entry(new H(t[0].p.x,t[0].p.y+.22+this.r,t[0].p.z))}buildFunnel(){let e=new H(0,-12,32),t=2.2,n=[];for(let e=0;e<=24;e++){let r=e/24,i=t+13.8*r;n.push(new V(i,-9*(1-r)**1.8))}let r=new K(new to(n,64),new vo({color:this.colors.a,roughness:.25,metalness:.6,side:2,emissive:this.colors.b,emissiveIntensity:.15}));this.place(r,e.x,e.y,e.z);let i=new K(new ao(16,.4,10,64),this.mat(16765770,.3));i.rotation.x=Math.PI/2;let a=new Fn;a.add(i),this.place(a,e.x,e.y,e.z),this.platform(e.x,e.y-9-2,e.z,10,10);let o=16-this.r-.3;this.st={c:e,R:16,rh:t,depth:9,R0:o,theta:Math.PI,rr:o,L:15*o,t:0,fell:!1},this.entry(new H(e.x-.01,e.y+this.r*.7,e.z-o))}entry(e){this.st.entry=e.clone()}update(e){this.t+=e;let t=this.ball;if(this.phase===`rollout`){this.s+=this.v*e,this.v=Math.max(13,this.v-2*e);let n=new H,r=new H,i=new H,a=new H;if(this.track.frameAtS(Math.min(this.s,this.track.length-3),n,r,i,a),t.p.copy(n).addScaledVector(i,this.r),t.v.copy(r).multiplyScalar(this.v),this.s>=this.track.length-3){this.phase=`flight`,this.toLocal(t.p,this.flight.from);let e=this.st.entry,n=this.flight.T=this.kind===`plinko`||this.kind===`funnel`?1.1:.9;this.flight.vel.copy(e).sub(this.flight.from).addScaledVector(this.Y,.5*_f*n*n).multiplyScalar(1/n),this.flight.t=0,this.camFrom.copy(this.ballCamPos()),this.lookFrom.copy(t.p)}}else if(this.phase===`flight`){this.flight.t+=e;let t=Math.min(this.flight.T,this.flight.t);this.ballPos.copy(this.flight.from).addScaledVector(this.flight.vel,t).addScaledVector(this.Y,-.5*_f*t*t),this.ballVel.copy(this.flight.vel).addScaledVector(this.Y,-16*t),this.flight.t>=this.flight.T&&(this.phase=`machine`,this.machineStart())}else this.phase===`machine`?this.machine(e):(this.celebrateT+=e,this.celebrateT>2.6&&(this.done=!0));this.phase!==`rollout`&&(this.W(this.ballPos.x,this.ballPos.y,this.ballPos.z,t.p),t.v.set(0,0,0).addScaledVector(this.X,this.ballVel.x).addScaledVector(this.Y,this.ballVel.y).addScaledVector(this.Z,this.ballVel.z));let n=t.v.length();if(n>.05){let r=new H().crossVectors(this.Y,t.v).normalize();r.lengthSq()>.5&&t.q.premultiply(new Rt().setFromAxisAngle(r,n/this.r*e))}t.magnetActive=!1,t.magnetHasTarget=!1,this.confetti.update(e),this.updateCamera(e)}toLocal(e,t){let n=new H().subVectors(e,this.O);return t.set(n.dot(this.X),n.dot(this.Y),n.dot(this.Z))}celebrate(e,t=!0){this.phase=`celebrate`,this.celebrateT=0;let n=this.W(e.x,e.y,e.z);this.confetti.burst(n,t?260:120,this.Y),this.audio.fanfare(),this.audio.pop(!0),setTimeout(()=>{this.confetti.burst(this.W(e.x-4,e.y+6,e.z),120,this.Y),this.audio.pop()},350),setTimeout(()=>{this.confetti.burst(this.W(e.x+4,e.y+7,e.z),120,this.Y),this.audio.pop()},650)}machineStart(){this.audio.clink(Math.min(1,this.ballVel.length()/14)),this.kind===`plinko`&&this.ballVel.set(this.ballVel.x*.3+(Math.random()-.5)*2,-2,0),this.kind===`dominoes`&&this.ballVel.set(0,0,9),this.kind===`chimes`&&(this.st.k=0,this.st.hopT=0,this.hitBar(0)),this.kind===`hoop`&&(this.st.landed=!0,this.st.launchT=0,this.audio.clack2(1))}machine(e){let t=this.st;switch(this.kind){case`plinko`:{let n=e/6,r=this.r+.35;for(let e=0;e<6;e++){this.ballVel.y-=32*n,this.ballPos.x+=this.ballVel.x*n,this.ballPos.y+=this.ballVel.y*n;for(let e of t.pegs){let n=this.ballPos.x-e.x,i=this.ballPos.y-e.y,a=Math.hypot(n,i);if(a<r&&a>1e-4){let e=n/a,o=i/a;this.ballPos.x+=e*(r-a),this.ballPos.y+=o*(r-a);let s=this.ballVel.x*e+this.ballVel.y*o;s<0&&(this.ballVel.x-=1.6*s*e,this.ballVel.y-=1.6*s*o,this.ballVel.x+=(Math.random()-.5)*1.2+(Math.abs(e)<.15?Math.random()<.5?-1.5:1.5:0),this.t-t.lastClink>.06&&(t.lastClink=this.t,this.audio.clink(Math.min(1,-s/10))))}}{let e=4.5*t.dx;Math.abs(this.ballPos.x)>e-this.r&&(this.ballPos.x=Math.sign(this.ballPos.x)*(e-this.r),this.ballVel.x*=-.5)}if(this.ballPos.y<t.slotTop)for(let e of t.dividers){let t=this.ballPos.x-e;Math.abs(t)<this.r+.15&&(this.ballPos.x=e+Math.sign(t||1)*(this.r+.15),this.ballVel.x*=-.4)}this.ballPos.y<t.floor+this.r&&(this.ballPos.y=t.floor+this.r,this.ballVel.y<-2&&this.audio.clink(Math.min(1,-this.ballVel.y/12)),this.ballVel.y*=-.35,this.ballVel.x*=.8)}if(t.stall=Math.hypot(this.ballVel.x,this.ballVel.y)<1.2&&this.ballPos.y>t.slotTop?(t.stall??0)+e:0,t.stall>.3&&(t.stall=0,this.ballVel.set(-Math.sign(this.ballPos.x||1)*(3+Math.random()*2),3,0),this.audio.clink(.3)),t.still=Math.hypot(this.ballVel.x,this.ballVel.y)<.6&&this.ballPos.y<t.floor+this.r+.2?t.still+e:0,t.still>.4||this.t>30){let e=Math.max(0,Math.min(8,Math.floor(this.ballPos.x/t.dx+4.5)));this.score=vf[e],t.slots[e].material.emissiveIntensity=2.5;let n=this.label(`+${this.score}`,`#ffe14a`,10);this.place(n,(e-4)*t.dx,t.slotTop+6,t.zb-3),this.ballVel.set(0,0,0),this.celebrate(new H((e-4)*t.dx,t.slotTop+2,t.zb-3),this.score>=2500)}break}case`dominoes`:{let n=t.pts[0];if(t.knocked||(this.ballPos.addScaledVector(this.ballVel,e),this.ballPos.y=t.y+this.r,this.ballPos.z>n.z-this.r-.3&&(t.knocked=!0,t.wave=0,this.ballVel.set(0,0,0),this.audio.clink(.6))),t.knocked){t.wave+=e;let n=t.dominoes;n.forEach((e,n)=>{let r=n*.085;if(t.wave>=r){e.t0<0&&(e.t0=t.wave,this.audio.clack2(.5+.5*Math.random()));let n=Math.min(1,(t.wave-e.t0)/.22);e.m.quaternion.copy(e.q0),e.m.rotateX(1.25*n*n)}});let r=(n.length-1)*.085+.22;if(t.wave>r&&t.launched<0){t.launched=0,t.saw.rotateX(-.5),this.audio.clack2(1);let e=t.goldStart,n=t.bucketPos.clone().add(new H(0,1,0)),r=1.3;t.goldVel=n.clone().sub(e).addScaledVector(new H(0,1,0),.5*_f*r*r).multiplyScalar(1/r),t.goldT=r}if(t.launched>=0){t.launched+=e;let n=Math.min(t.goldT,t.launched),r=t.goldStart.clone().addScaledVector(t.goldVel,n).add(new H(0,-.5*_f*n*n,0));this.W(r.x,r.y,r.z,t.gold.position),t.goldLocal=r,t.launched>=t.goldT&&!t.rung&&(t.rung=!0,this.audio.bell(392),t.bellSwing=1,this.celebrate(t.bucketPos.clone().add(new H(0,4,0))))}}break}case`hoop`:{t.launchT+=e;let n=Math.min(1,t.launchT/.15);t.saw.rotation.set(0,0,0);let r=new W().makeBasis(this.X,this.Y,this.Z);if(t.saw.quaternion.setFromRotationMatrix(r),t.saw.rotateX(.28-.56*n),this.ballPos.y=t.piv.y+.95+6.3*Math.sin(.28-.56*n)+this.r-.3,!t.goldVel){let e=t.goldStart,n=t.basket.clone().add(new H(0,.6,0)),r=t.apex,i=Math.sqrt(32*(r.y-e.y));t.goldT=i/_f+Math.sqrt(2*Math.max(.1,r.y-n.y)/_f),t.goldVel=new H(0,i,(n.z-e.z)/t.goldT),this.audio.clack2(1)}let i=Math.min(t.goldT,Math.max(0,t.launchT-.08)),a=t.goldStart.clone().addScaledVector(t.goldVel,i).add(new H(0,-.5*_f*i*i,0));this.W(a.x,a.y,a.z,t.gold.position),!t.swished&&a.z>t.apex.z&&(t.swished=!0,this.audio.pop(),t.hoop.material.emissiveIntensity=2),i>=t.goldT&&this.celebrate(t.basket.clone().add(new H(0,3,0)));break}case`chimes`:{let n=t.bars;for(let t of n)t.glow=Math.max(0,t.glow-e*2),t.m.material.emissiveIntensity=.25+t.glow*2;t.hopT+=e;let r=t.k,i=n[r].p.clone().add(new H(0,.22+this.r,0)),a=r>=n.length-1,o=a?t.bellPos.clone().add(new H(0,.5,-1.4)):n[r+1].p.clone().add(new H(0,.22+this.r,0)),s=a?.55:.36,c=Math.min(1,t.hopT/s),l=o.clone().sub(i).add(new H(0,.5*_f*s*s,0)).multiplyScalar(1/s),u=c*s;this.ballPos.copy(i).addScaledVector(l,u).add(new H(0,-.5*_f*u*u,0)),this.ballVel.copy(l).add(new H(0,-16*u,0)),c>=1&&(a?t.rung||(t.rung=!0,this.audio.bell(262),this.celebrate(t.bellPos.clone().add(new H(0,6,0))),this.ballVel.set(0,0,0)):(t.k=r+1,t.hopT=0,this.hitBar(r+1)));break}case`funnel`:{t.t+=e;let n=t.c;if(!t.fell){t.rr=Math.max(t.rh,t.rr-(1.7+30/(t.rr*t.rr))*e);let r=t.L/(t.rr*t.rr);t.theta+=r*e;let i=(t.rr-t.rh)/(t.R-t.rh),a=n.y-t.depth*(1-i)**1.8+this.r*.7,o=n.x+Math.sin(t.theta)*t.rr,s=n.z+Math.cos(t.theta)*t.rr;this.ballVel.set((o-this.ballPos.x)/e,(a-this.ballPos.y)/e,(s-this.ballPos.z)/e),this.ballPos.set(o,a,s),this.audio.whir(1-i),t.rr<=t.rh+.05&&(t.fell=!0,t.fallT=0,this.audio.clink(.8))}else if(t.fallT+=e,this.ballVel.set(0,-16*t.fallT,0),this.ballPos.addScaledVector(this.ballVel,e),t.fallT>.5&&this.phase===`machine`){this.celebrate(new H(n.x,n.y+4,n.z));for(let e=0;e<4;e++)setTimeout(()=>{this.confetti.burst(this.W(n.x+(Math.random()-.5)*20,n.y+18+Math.random()*8,n.z+(Math.random()-.5)*10),160,this.Y,!0),this.audio.pop(!0)},200+e*300)}break}}}hitBar(e){let t=this.st;t.bars[e].glow=1,this.audio.chime(yf[e%yf.length])}ballCamPos(){return this.ball.p.clone().addScaledVector(this.Z,-9).addScaledVector(this.Y,3.5)}machineCam(e,t){let n=this.st,r=this.ballPos;switch(this.kind){case`plinko`:{let i=Math.max(n.floor+4,Math.min(n.top-3,r.y)),a=Math.max(-12,Math.min(12,r.x*.85));this.W(a,i+3,n.zb-26,e),this.W(a,i-1,n.zb,t);break}case`dominoes`:{let r=n.dominoes,i=0;for(let e=0;e<r.length;e++)r[e].t0>=0&&(i=e);let a=n.launched>=0&&n.goldLocal?n.goldLocal:n.pts[Math.min(i+2,n.pts.length-1)];this.W(a.x-14,n.y+12,a.z-14,e),this.W(a.x,n.y+1,a.z,t);break}case`hoop`:this.W(-17,n.y+14,n.piv.z-10,e),this.W(0,n.y+10,(n.piv.z+n.basket.z)/2+2,t);break;case`chimes`:this.W(-16,r.y+7,r.z-12,e),this.W(0,r.y-2,r.z+4,t);break;case`funnel`:this.W(0,n.c.y+24,n.c.z-26,e),this.W(0,n.c.y-3,n.c.z,t)}}updateCamera(e){let t=new H,n=new H;if(this.phase===`rollout`)t.copy(this.ballCamPos()),n.copy(this.ball.p).addScaledVector(this.Z,6),this.camBlend=0;else{this.camBlend=Math.min(1,this.camBlend+e/1.4);let r=this.camBlend*this.camBlend*(3-2*this.camBlend);this.machineCam(t,n),t.lerpVectors(this.camFrom,t,r),n.lerpVectors(this.lookFrom,n,r)}this.camPos.lengthSq()===0&&(this.camPos.copy(t),this.camLook.copy(n));let r=Math.min(1,e*5);this.camPos.lerp(t,r),this.camLook.lerp(n,r)}applyCamera(e){e.position.copy(this.camPos),e.up.set(0,1,0),e.lookAt(this.camLook),Math.abs(e.fov-62)>.1&&(e.fov+=(62-e.fov)*.1,e.updateProjectionMatrix())}dispose(){this.scene.remove(this.group),this.group.traverse(e=>{let t=e;t.geometry?.dispose();let n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let e of n)e.map?.dispose?.(),e.dispose()})}},xf=class{constructor(e){J(this,`mesh`,void 0),J(this,`parts`,[]),J(this,`m`,new W),J(this,`q`,new Rt),J(this,`s`,new H),J(this,`max`,900);let t=new no(.5,.3);this.mesh=new zi(t,new gi({side:2,toneMapped:!1}),this.max),this.mesh.count=0,this.mesh.frustumCulled=!1;let n=new G;for(let e=0;e<this.max;e++)this.mesh.setColorAt(e,n.setHSL(Math.random(),1,.6));e.add(this.mesh)}burst(e,t,n,r=!1){for(let i=0;i<t&&this.parts.length<this.max;i++){let t=new H(Math.random()-.5,Math.random()*(r?1:.8)+(r?-.5:.6),Math.random()-.5).normalize();this.parts.push({p:e.clone(),v:t.multiplyScalar((r?14:10)*(.5+Math.random())).addScaledVector(n,r?0:4),r:new H(Math.random()*6,Math.random()*6,Math.random()*6),w:new H(Math.random()*8-4,Math.random()*8-4,Math.random()*8-4),life:r?1.6:3.5,spark:r})}}update(e){this.parts=this.parts.filter(t=>(t.life-=e)>0),this.parts.forEach((t,n)=>{t.v.y-=(t.spark?9:6)*e,t.v.multiplyScalar(1-(t.spark?.6:1.6)*e),t.p.addScaledVector(t.v,e),t.r.addScaledVector(t.w,e),this.q.setFromAxisAngle(this.s.copy(t.r).normalize(),t.r.length());let r=Math.min(1,t.life*2)*(t.spark?.7:1);this.m.compose(t.p,this.q,this.s.set(r,r,r)),this.mesh.setMatrixAt(n,this.m)}),this.mesh.count=this.parts.length,this.mesh.instanceMatrix.needsUpdate=!0}},Sf=5.2,Cf=14;function wf(e){return 10+26*Math.max(0,Math.min(1,e))**.9}var Tf=class extends Da{constructor(e,t){super(),J(this,`turns`,void 0),J(this,`radius`,void 0),this.turns=e,this.radius=t}getPoint(e,t=new H){let n=e*this.turns*Math.PI*2;return t.set(Math.cos(n)*this.radius,Math.sin(n)*this.radius,e)}},Ef=class{constructor(e,t,n,r,i,a){J(this,`scene`,void 0),J(this,`ball`,void 0),J(this,`audio`,void 0),J(this,`haptics`,void 0),J(this,`phase`,`ready`),J(this,`pull`,0),J(this,`power`,0),J(this,`done`,!1),J(this,`target`,0),J(this,`keyHeld`,!1),J(this,`auto`,!1),J(this,`releaseT`,0),J(this,`releaseFrom`,0),J(this,`lastNotch`,0),J(this,`t`,0),J(this,`group`,new Fn),J(this,`base`,new H),J(this,`T`,new H),J(this,`U`,new H),J(this,`R`,new H),J(this,`s0`,void 0),J(this,`rod`,new Fn),J(this,`spring`,void 0),J(this,`housingD`,void 0),J(this,`lights`,[]),J(this,`camPosV`,new H),J(this,`camLookV`,new H),J(this,`camInit`,!1),this.scene=e,this.ball=n,this.audio=r,this.haptics=i;let o=t.main;this.s0=o.checkpoints[0];let s=new H;o.frameAtS(this.s0,s,this.T,this.U,this.R);let c=n.tune.radius;this.base.copy(s).addScaledVector(this.U,c),this.housingD=-c-3-1.1,this.build(a,c);let l=new va(.42,20);for(let e=0;e<10;e++){let t=this.s0+3+e*2.6,n=new H,r=new H,i=new H,a=new H;o.frameAtS(t,n,r,i,a);let s=new gi({color:new G().setHSL(.33-e/9*.33,1,.55),transparent:!0,opacity:.15,blending:2,depthWrite:!1,toneMapped:!1,side:2}),c=new K(l,s);c.quaternion.setFromRotationMatrix(new W().makeBasis(a,r,i)),c.position.copy(n).addScaledVector(i,.05),this.group.add(c),this.lights.push(s)}e.add(this.group),this.update(0)}axis(e,t){return t.copy(this.base).addScaledVector(this.T,e)}build(e,t){let n=new vo({color:15659254,roughness:.15,metalness:1}),r=new vo({color:1776418,roughness:.5,metalness:.6}),i=new vo({color:14685230,roughness:.25,metalness:.2,emissive:new G(4194312)}),a=new W().makeBasis(this.R.clone().negate(),this.U,this.T),o=new K(new ya(.78,.78,.5,24),new vo({color:1118481,roughness:.8}));o.rotation.x=Math.PI/2,o.position.z=-.25,this.rod.add(o);let s=new K(new ya(.62,.62,.18,24),n);s.rotation.x=Math.PI/2,s.position.z=-.58,this.rod.add(s);let c=new K(new ya(.2,.2,Sf,12),n);c.rotation.x=Math.PI/2,c.position.z=-.5-Sf/2,this.rod.add(c);let l=new K(new ya(.42,.55,.6,16),i);l.rotation.x=Math.PI/2,l.position.z=-5.7,this.rod.add(l);let u=new K(new io(.85,24,16),i);u.scale.z=.8,u.position.z=-6.45,this.rod.add(u),this.rod.quaternion.setFromRotationMatrix(a),this.group.add(this.rod);let d=this.housingD,f=new Fn,p=new K(new _a(1.6,1.6,1.1),n);f.add(p);let m=new K(new ya(.4,.4,1.16,16),r);m.rotation.x=Math.PI/2,f.add(m);let h=Math.max(.12,t-.8+.05),g=new K(new _a(2.2,h,1.4),r);g.position.y=-t+h/2,f.add(g);let _=new K(new _a(1.64,.26,1.14),new vo({color:new G(e),emissive:new G(e),emissiveIntensity:.7}));_.position.y=.5,f.add(_),f.quaternion.setFromRotationMatrix(a),this.axis(d,f.position),this.group.add(f);let v=new oo(new Tf(9,.5),220,.075,6,!1);this.spring=new K(v,n),this.spring.quaternion.setFromRotationMatrix(a),this.group.add(this.spring)}setPull(e){(this.phase===`ready`||this.phase===`pulling`)&&(this.target=Math.max(0,Math.min(1,e)),this.phase=`pulling`)}holdKey(e){e?(this.keyHeld=!0,this.phase=this.phase===`ready`?`pulling`:this.phase):this.keyHeld&&(this.keyHeld=!1,this.release())}release(){this.phase===`pulling`&&(this.pull<.04?(this.phase=`ready`,this.target=0,this.pull=0):(this.phase=`release`,this.releaseT=0,this.releaseFrom=this.pull,this.power=this.pull))}fire(){this.phase===`ready`&&(this.auto=!0,this.phase=`pulling`,this.target=.85)}update(e){if(this.t+=e,this.phase===`pulling`)this.keyHeld&&(this.target=Math.min(1,this.target+e*.9)),this.pull+=(this.target-this.pull)*Math.min(1,e*14),this.auto&&this.pull>this.target-.02&&(this.auto=!1,this.release());else if(this.phase===`release`){this.releaseT+=e;let t=Math.min(1,this.releaseT/.06);this.pull=this.releaseFrom*(1-t*t),t>=1&&(this.phase=`done`,this.done=!0,this.audio.plungerRelease(this.power),this.haptics.tap(30+40*this.power,.6+.4*this.power,3))}let t=Math.floor(this.pull*Cf+1e-6);this.phase===`pulling`&&t!==this.lastNotch&&(t>this.lastNotch&&(this.audio.plungerTick(this.pull),this.haptics.tap(6,.25+.5*this.pull,1)),this.lastNotch=t),this.phase!==`pulling`&&(this.lastNotch=t);let n=-this.ball.tune.radius-.02-this.pull*3;this.axis(n,this.rod.position);let r=n-.68,i=this.housingD+.65;this.axis(i,this.spring.position),this.spring.scale.set(1,1,Math.max(.2,r-i)),this.phase!==`done`&&this.ball.placeAt(this.s0-this.pull*3,0);let a=this.phase===`release`||this.phase===`done`?this.power:this.pull;this.lights.forEach((e,t)=>{e.opacity=a*10>t+.5?.95:.12+.06*Math.sin(this.t*4-t*.6)}),this.updateCamera(e)}updateCamera(e){let t=this.axis(-17.5-this.pull*2,new H).addScaledVector(this.U,6.2).addScaledVector(this.R,3.2),n=this.axis(7,new H).addScaledVector(this.U,.2);this.camInit||(this.camPosV.copy(t),this.camLookV.copy(n),this.camInit=!0);let r=1-Math.exp(-e*6);this.camPosV.lerp(t,r),this.camLookV.lerp(n,r)}get camPos(){return this.camPosV}get camLook(){return this.camLookV}applyCamera(e){e.position.copy(this.camPosV),e.up.set(0,1,0),e.lookAt(this.camLookV);let t=(e.aspect<.8?72:60)-this.pull*8;Math.abs(e.fov-t)>.05&&(e.fov+=(t-e.fov)*.2,e.updateProjectionMatrix())}dispose(){this.scene.remove(this.group),this.group.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()})}},Df=class e{constructor(){J(this,`lastTargetX`,0),J(this,`pushT`,0),J(this,`airT`,0),J(this,`padK`,-1),J(this,`brakeT`,0),J(this,`pace`,.6),J(this,`insane`,!1),J(this,`lastP`,new H(NaN,0,0)),J(this,`lastTrack`,-1),J(this,`cautiousTo`,-1),J(this,`trick`,``),J(this,`trickHold`,0)}clone(){let t=new e;return t.lastTargetX=this.lastTargetX,t.pushT=this.pushT,t.airT=this.airT,t.padK=this.padK,t.brakeT=this.brakeT,t.trick=this.trick,t.trickHold=this.trickHold,t.lastP.copy(this.lastP),t.lastTrack=this.lastTrack,t.cautiousTo=this.cautiousTo,t.pace=this.pace,t.insane=this.insane,t}crashed(e){this.cautiousTo=e.proj.s+600,this.lastTrack=e.activeIndex}say(e,t=.9){e!==``&&(this.trick=e,this.trickHold=t)}safeSpeed(e,t){let n=e.track,r=e.proj.s,i=this.insane?180:130;for(let e=0;e<t&&i>20;e+=5){let t=r+e;if(t>n.length)break;let a=n.idx(t-6),o=n.idx(t+6),s=n.T[o*3]-n.T[a*3],c=n.T[o*3+1]-n.T[a*3+1],l=n.T[o*3+2]-n.T[a*3+2],u=Math.hypot(s,c,l)/12,d=!n.openSky[n.idx(t)],f=this.insane?150:14+80*this.pace**1.3+(d?260*this.pace**2:0);u>1e-4&&n.tubeAt(t)<.5&&(i=Math.min(i,Math.sqrt(f/u)+e*.08)),n.isGap(t)&&(i=Math.min(i,(this.insane?90:46+6*this.pace)+e*.05)),n.openSky[n.idx(t)]&&(i=Math.min(i,(this.insane?85:44+26*this.pace)+e*.05))}return i}flyOffSpeed(e,t){let n=e.track,r=e.proj.s,i=999;for(let e=0;e<t;e+=5){let t=r+e;if(t>n.length)break;if(n.isSteepOrInverted(t)||n.tubeAt(t)>.5||n.isGap(t))return 999;if(!n.openSky[n.idx(t)])continue;let a=n.idx(t-6),o=n.idx(t+6),s=Math.hypot(n.T[o*3]-n.T[a*3],n.T[o*3+1]-n.T[a*3+1],n.T[o*3+2]-n.T[a*3+2])/12;s>.008&&(i=Math.min(i,Math.sqrt((30+60*this.pace)/s)+e*.08))}return i}decide(e,t){let n=e.track,r=e.proj,i=r.s,a=Math.max(4,e.v.length()),o=e.v.dot(r.R),s=n.halfWidthAt(i);this.pushT-=t,this.airT-=t,this.brakeT-=t,this.trickHold-=t,this.trickHold<=0&&(this.trick=``);let c=n.tubeAt(i)>.5;Number.isFinite(this.lastP.x)&&this.lastP.distanceTo(e.p)>15&&(this.cautiousTo=i+500,this.lastTrack=e.activeIndex),this.lastP.copy(e.p);let l=e.activeIndex===this.lastTrack&&i<this.cautiousTo,u=Math.min(55,a*1.7),d=t=>{for(let r=0;r<n.obstacles.length;r++){if(n.ghost[r])continue;let o=n.obstacles[r],s=o.s-i;if(s<-1||s>u)continue;let c=n.obstacleX(o,n.time+Math.max(0,s)/a);if(Math.abs(t-c)<o.w/2+e.tune.radius+(o.move?.9:.5))return s}return-1},f=null;for(let e=0;e<n.obstacles.length;e++){if(!n.ghost[e]||n.holoUsed[e])continue;let t=n.obstacles[e],r=t.s-i;if(r>0&&r<u){f=n.obstacleX(t,n.time+r/a);break}}let p=s/4.2,m=[0,-2.2,2.2,-3.2,3.2,-1.2,1.2].map(e=>e*p),h=0,g=-1e9;for(let e of m){let t=d(e),n=(t<0?100:t)-Math.abs(e-this.lastTargetX)*.8-Math.abs(e)*.3-(f===null?0:Math.abs(e-f)*3);n>g&&(g=n,h=e)}let _=f!==null&&d(f)<0?f:h;f!==null&&_===f?this.say(`HOLOGRAM`):Math.abs(h)>.5&&d(0)>=0&&this.say(`DODGE`,.5);let v=!1;for(let e=0;e<Math.max(60,a*2);e+=3)if(n.isGap(i+e)){v=!0;break}v&&d(0)<0&&(_=0);let y=0;if(!c&&!v&&!l&&this.pace>=.25)for(let t=0;t<n.pads.length;t++){if(n.padHit[t])continue;let o=n.pads[t],c=o.s-i;if(c<-o.len||c>Math.max(45,a*1.9)||d(o.side*(s-1.5))>=0&&d(o.side*(s-1.5))<c)continue;let l=o.y*Math.max(.3,Math.min(1,1-(c-8)/Math.max(20,a*1.2))),u=e.v.dot(r.U);y=o.side*Math.max(-1,Math.min(1,.45+.55*(l-r.y)-.3*u)),this.padK=t;break}let b=!1;for(let e=0;e<a*.3;e+=1)if(n.isGap(i+e)){let t=0;for(;t<80&&n.isGap(i+e+t);)t+=1;let r=4.9*(t/a)**2;if((this.insane||this.pace>=.7)&&r<.45){this.say(`GAP`);break}b=!0,this.say(`GAP`);break}if(d(r.x)>=0&&d(r.x)<a*.3&&g<100&&(b=!0),!b&&!l&&(this.insane||this.pace>=.5&&this.pace<.85)&&y===0&&e.contact&&this.airT<=0&&a>24&&!c&&Math.abs(r.x)<s*.4){let e=n.idx(i),t=n.idx(i+10),a=new H(n.T[t*3]-n.T[e*3],n.T[t*3+1]-n.T[e*3+1],n.T[t*3+2]-n.T[e*3+2]).dot(r.U),o=!0;for(let e=0;e<60&&o;e+=4){let t=i+e;(n.tubeAt(t)>.05||n.isTunnel(t)||n.isGap(t)||n.isSteepOrInverted(t)||n.openSky[n.idx(t)])&&(o=!1)}a<-.07&&o&&d(r.x)<0&&(b=!0,this.airT=3,this.say(`AIR`,1.2))}let x=!1;for(let e=-5;e<25;e+=5){let t=Math.max(0,Math.min(n.n-1,Math.round((i+e)/n.ds)));if(n.U[t*3+1]<.55){x=!0;break}}x&&this.say(`GRIP`,.4);let S=!1;for(let e=-4;e<30;e+=2)if(n.isGap(i+e)){S=!0;break}e.airborne&&e.airborneTime>.4-.25*this.pace&&y===0&&!S&&(x=!0,this.say(`BEAM`,.5)),!e.contact&&this.pace>=.7&&y===0&&!S&&r.y<4.5&&r.y>-.5&&Math.abs(r.x)<s&&(x=!0);let C=0,w=(()=>{let e=n.idx(i),t=n.idx(i+40);return n.T[e*3]*n.T[t*3]+n.T[e*3+1]*n.T[t*3+1]+n.T[e*3+2]*n.T[t*3+2]>.96})(),T=Math.min(l&&!this.insane?30:999,this.safeSpeed(e,Math.max(120,a*3.5))),E=this.insane?w&&!c:!l&&this.pace>=.4&&this.safeSpeed(e,480)>=70-15*this.pace&&w&&!c,D=this.insane?110:26+60*this.pace,O=0;!this.insane&&this.pace<=.6&&e.contact&&this.brakeT<=0&&a>this.flyOffSpeed(e,Math.max(80,a*2.5))+9&&(O=.7,this.brakeT=.45,this.say(`BRAKE`,.6)),e.contact&&y===0&&!x&&this.pace>=.15&&(e.turboArmed&&E?(C=1,this.say(`TURBO`,1.4)):e.pushCombo>=3&&e.turboTime<=0&&E?x=!0:this.pushT<=0&&a<Math.min(D,T-3)&&e.turboTime<=0&&(C=Math.min(1,.5+this.pace),this.pushT=.6-.25*this.pace,this.trick||this.say(`PUSH`,.4)));let k=c&&this.pace>=.7?999:T,A=r.y<(c?3.6:3.2);!x&&e.contact&&A&&y===0&&(this.insane||this.pace>=.2)&&d(r.x)<0&&a<Math.min(k-(this.insane?0:4*(1-this.pace)),this.insane?999:25+95*this.pace)&&e.magnetEnergy>(this.insane?.08:e.magnetActive?.25-.22*this.pace:.4-.34*this.pace)&&(x=!0,this.say(`GAS`,.4)),x&&e.magnetEnergy<.08&&!e.airborne&&(x=!1);let j;if(y!==0)j=y,this.trick&&this.trick!==`PUSH`||this.say(`PAD`,.6);else{if(this.pace>=.5&&!c&&!v&&f===null&&d(0)<0){let e=n.idx(i),t=n.idx(i+15),a=(n.T[t*3]-n.T[e*3])*r.R.x+(n.T[t*3+1]-n.T[e*3+1])*r.R.y+(n.T[t*3+2]-n.T[e*3+2])*r.R.z;Math.abs(a)>.06&&(_=-Math.sign(a)*s*.4*Math.min(1,Math.abs(a)/.2)*this.pace,this.trick||this.say(`CARVE`,.4))}j=Math.max(-1,Math.min(1,(_-r.x)*.55-o*(v?.7:.35)))}return this.lastTargetX=_,{steer:j,jump:b,magnet:!O&&x,driveLevel:2,push:O?0:C,brake:O}}},Of=class e{constructor(e,t){J(this,`max`,void 0),J(this,`mesh`,void 0),J(this,`geo`,new Rr),J(this,`pos`,void 0),J(this,`dir`,void 0),J(this,`side`,void 0),J(this,`col`,void 0),J(this,`mat`,void 0),this.max=e;let n=e*2;this.pos=new Float32Array(n*3),this.dir=new Float32Array(n*3),this.side=new Float32Array(n),this.col=new Float32Array(n*4);for(let t=0;t<e;t++)this.side[t*2]=-1,this.side[t*2+1]=1;let r=[];for(let t=0;t<e-1;t++){let e=t*2;r.push(e,e+1,e+2,e+1,e+3,e+2)}this.geo.setIndex(r),this.geo.setAttribute(`position`,new Cr(this.pos,3)),this.geo.setAttribute(`dir`,new Cr(this.dir,3)),this.geo.setAttribute(`side`,new Cr(this.side,1)),this.geo.setAttribute(`color`,new Cr(this.col,4)),this.geo.setDrawRange(0,0),this.mat=new go({uniforms:{uWidth:{value:t},uTime:{value:0}},vertexShader:`attribute vec3 dir; attribute float side; attribute vec4 color; uniform float uWidth;
        varying vec4 vColor; varying float vSide;
        void main(){
          vec3 toCam = normalize(cameraPosition - position);
          vec3 s = cross(dir, toCam);
          float l = length(s);
          s = l > 1e-4 ? s / l : vec3(1.0, 0.0, 0.0);
          vec3 p = position + s * side * uWidth * (0.7 + 0.6 * color.a);
          vColor = color; vSide = side;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`varying vec4 vColor; varying float vSide;
        void main(){
          float e = 1.0 - abs(vSide);
          gl_FragColor = vec4(vColor.rgb * (0.55 + 0.9 * e * e), vColor.a * smoothstep(0.0, 0.7, e));
        }`,transparent:!0,blending:2,depthWrite:!1}),this.mesh=new K(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4}static color(e,t,n){let r=Math.max(0,Math.min(1,(e-15)/45)),i,a,o;if(r<.5){let e=r/.5;i=.2+.8*e,a=.9-.6*e,o=1-.1*e}else{let e=(r-.5)/.5;i=1,a=.3+.55*e,o=.9-.6*e}t&&(i=i*.6+.4,a=a*.6+.4,o=o*.6+.4),n[0]=i,n[1]=a,n[2]=o}set(t,n,r,i=1){let a=Math.min(this.max,t.length-n);if(a<2){this.geo.setDrawRange(0,0);return}let o=[0,0,0],s=new H;for(let c=0;c<a;c++){let l=t[n+c],u=t[n+Math.min(a-1,c+1)].p,d=t[n+Math.max(0,c-1)].p;s.subVectors(u,d),s.lengthSq()<1e-8&&s.set(0,0,-1),s.normalize(),e.color(l.speed,l.air,o);let f=c/(a-1),p=(r===`ahead`?Math.min(1,f*6)*(1-f)**.7:f**1.5)*i*(l.air?1:.8);for(let e=0;e<2;e++){let t=c*2+e;this.pos[t*3]=l.p.x,this.pos[t*3+1]=l.p.y,this.pos[t*3+2]=l.p.z,this.dir[t*3]=s.x,this.dir[t*3+1]=s.y,this.dir[t*3+2]=s.z,this.col[t*4]=o[0],this.col[t*4+1]=o[1],this.col[t*4+2]=o[2],this.col[t*4+3]=p}}for(let e of[`position`,`dir`,`color`])this.geo.getAttribute(e).needsUpdate=!0;this.geo.setDrawRange(0,(a-1)*6)}hide(){this.geo.setDrawRange(0,0)}dispose(){this.geo.dispose(),this.mat.dispose()}},kf=class{setPalette(e,t,n){this.colA.set(e),this.colB.set(t),this.psy=n}constructor(){J(this,`mesh`,void 0),J(this,`n`,220),J(this,`sRel`,void 0),J(this,`ang`,void 0),J(this,`rad`,void 0),J(this,`pos`,void 0),J(this,`col`,void 0),J(this,`P`,new H),J(this,`T`,new H),J(this,`U`,new H),J(this,`R`,new H),J(this,`level`,0),J(this,`hue`,0),J(this,`colA`,new G(16777215)),J(this,`colB`,new G(16777215)),J(this,`psy`,1),this.sRel=new Float32Array(this.n),this.ang=new Float32Array(this.n),this.rad=new Float32Array(this.n);for(let e=0;e<this.n;e++)this.respawn(e,Math.random()*90-10);this.pos=new Float32Array(this.n*6),this.col=new Float32Array(this.n*6);let e=new Rr;e.setAttribute(`position`,new Cr(this.pos,3)),e.setAttribute(`color`,new Cr(this.col,3)),this.mesh=new ia(e,new Ki({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,opacity:0})),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}respawn(e,t){this.sRel[e]=t,this.ang[e]=Math.random()*Math.PI*2,this.rad[e]=1.6+Math.random()**.6*4.2}update(e,t,n,r,i,a){let o=Math.max(e.tubeAt(t),e.tubeAt(t+25)*.8);this.level+=((o>.3?Math.min(1,(n-8)/30):0)*a-this.level)*Math.min(1,r*3);let s=this.mesh.material;if(s.opacity=this.level*.9,this.mesh.visible=this.level>.01,!this.mesh.visible)return;this.hue=i*.12%1;let c=e.profile.H,l=Math.min(9,.6+n*.11),u=new G;for(let i=0;i<this.n;i++){this.sRel[i]-=n*r,this.sRel[i]<-8&&this.respawn(i,70+Math.random()*20);let a=t+this.sRel[i];e.frameAtS(a,this.P,this.T,this.U,this.R);let o=Math.cos(this.ang[i])*this.rad[i],s=c+Math.sin(this.ang[i])*this.rad[i]*.95,d=this.P.x+this.R.x*o+this.U.x*s,f=this.P.y+this.R.y*o+this.U.y*s,p=this.P.z+this.R.z*o+this.U.z*s,m=i*6;this.pos[m]=d,this.pos[m+1]=f,this.pos[m+2]=p,this.pos[m+3]=d+this.T.x*l,this.pos[m+4]=f+this.T.y*l,this.pos[m+5]=p+this.T.z*l;let h=Math.max(0,Math.min(1,(90-this.sRel[i])/30))*Math.max(0,Math.min(1,(this.sRel[i]+8)/6));if(u.copy(this.colA).lerp(this.colB,i%7/6),this.psy>0){let e={h:0,s:0,l:0};u.getHSL(e),u.setHSL((e.h+(this.hue+i*.013)*this.psy)%1,Math.max(.6,e.s),Math.min(.7,Math.max(.5,e.l)))}u.multiplyScalar(h),this.col[m]=u.r,this.col[m+1]=u.g,this.col[m+2]=u.b,this.col[m+3]=u.r*.15,this.col[m+4]=u.g*.15,this.col[m+5]=u.b*.15}this.mesh.geometry.attributes.position.needsUpdate=!0,this.mesh.geometry.attributes.color.needsUpdate=!0}},Af=[`lasers`,`fireworks`,`haunted`,`pinball`];function jf(e,t){let n=[];for(let t of e.all){let e=-1;for(let r=0;r<=t.n;r++){let i=r<t.n&&t.tubeK[r]>.9;if(i&&e<0&&(e=r),!i&&e>=0){let i=e*t.ds,a=(r-1)*t.ds;a-i>=90&&n.push({track:t,s0:i,s1:a}),e=-1}}}let r=0;for(let e of t)r=r*31+e.charCodeAt(0)>>>0;let i=[];return n.forEach((e,t)=>{(n.length<=2?t===n.length-1:t%3==1)&&i.length<3&&i.push({...e,theme:Af[(r+i.length)%Af.length]})}),i}var Mf=class{constructor(e,t,n){J(this,`scene`,void 0),J(this,`tubes`,void 0),J(this,`group`,new Fn),J(this,`laserGroups`,[]),J(this,`bursts`,[]),J(this,`holos`,[]),J(this,`spawnT`,0),J(this,`P`,new H),J(this,`T`,new H),J(this,`U`,new H),J(this,`R`,new H),J(this,`tex`,{}),J(this,`active`,null),this.scene=e,this.tubes=jf(t,n);for(let e of this.tubes)e.theme===`lasers`&&this.buildLasers(e);if(this.tubes.some(e=>e.theme===`fireworks`))for(let e=0;e<7;e++)this.bursts.push(this.makeBurst());if(this.tubes.some(e=>e.theme===`haunted`||e.theme===`pinball`)){this.tex.haunted=[`ghost`,`eyes`,`skull`,`bat`,`boo`].map(Pf),this.tex.pinball=[`JACKPOT`,`1000`,`BONUS`,`EXTRA BALL`,`500`,`MULTIBALL`,`★`,`▲▲▲`,`SUPER`,`5000`].map(Ff);for(let e=0;e<12;e++){let e=new Yr({transparent:!0,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),t=new li(e);t.visible=!1,this.group.add(t),this.holos.push({spr:t,mat:e,age:0,life:0,base:new H,kind:`haunted`})}}e.add(this.group)}axisAt(e,t,n){return e.frameAtS(t,this.P,this.T,this.U,this.R),n.copy(this.P).addScaledVector(this.U,e.profile.H)}radius(e,t){return e.halfWidthAt(t)}buildLasers(e){let t=new Fn;t.visible=!1;let n=[],r=[16719968,3211120,2795775,16769072,13648127],i=0;for(let a=e.s0+14;a<e.s1-8;a+=26,i++){let o=this.axisAt(e.track,a,new H),s=this.radius(e.track,a)*.96,c=new Fn;c.quaternion.setFromRotationMatrix(new W().makeBasis(this.R.clone().negate(),this.U,this.T)),c.position.copy(o);for(let e=0;e<3;e++){let t=r[(i+e)%r.length],a=new K(new _a(s*2,.07,.07),new gi({color:t,transparent:!0,opacity:.95,blending:2,depthWrite:!1,fog:!1,toneMapped:!1})),o=new K(new _a(s*2,.45,.45),new gi({color:t,transparent:!0,opacity:.18,blending:2,depthWrite:!1,fog:!1,toneMapped:!1})),l=new Fn;l.add(a,o),l.userData={phase:e*Math.PI/3+i*.7,speed:(e%2?-1:1)*(.9+.35*((i+e)%3)),tilt:.35*Math.sin(i+e)},c.add(l),n.push(l)}t.add(c)}this.group.add(t),this.laserGroups.push({tube:e,g:t,beams:n})}makeBurst(){let e=new Float32Array(330),t=new Float32Array(110);for(let n=0;n<110;n++){let r=Math.random()*2-1,i=Math.random()*Math.PI*2,a=Math.sqrt(1-r*r);e[n*3]=a*Math.cos(i),e[n*3+1]=r,e[n*3+2]=a*Math.sin(i),t[n]=.7+Math.random()*.3}let n=new Rr;n.setAttribute(`position`,new Cr(e,3)),n.setAttribute(`spd`,new Cr(t,1));let r=new go({uniforms:{uAge:{value:0},uLife:{value:1.2},uSize:{value:4.5},uColor:{value:new G(1,.5,.2)},uColor2:{value:new G(1,1,1)}},vertexShader:`attribute float spd; uniform float uAge, uSize, uLife; varying float vF; varying float vS;
        void main(){
          float k = 1.0 - exp(-uAge * 3.2);
          vec3 p = position * spd * k * uSize;
          p.y -= 1.6 * uAge * uAge;                    // the sparks droop as they fade
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.2 + 2.2 * spd) * 90.0 / -mv.z * (1.0 - 0.5 * uAge / uLife);
          vF = 1.0 - uAge / uLife; vS = spd;
        }`,fragmentShader:`uniform vec3 uColor, uColor2; varying float vF; varying float vS;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = dot(c, c); if (d > 0.25) discard;
          float tw = 0.6 + 0.4 * step(0.5, fract(vS * 37.0 + vF * 9.0));
          gl_FragColor = vec4(mix(uColor2, uColor, 0.75 + 0.25 * (1.0 - vF)) * tw * 1.4, (1.0 - d * 4.0) * vF * vF); }`,transparent:!0,blending:2,depthWrite:!1}),i=new ua(n,r);return i.visible=!1,i.frustumCulled=!1,this.group.add(i),{pts:i,mat:r,age:0,life:1.2}}update(e,t,n,r){let i=e.track,a=e.proj.s,o=null;for(let e of this.tubes)e.track===i&&a>e.s0-6&&a<e.s1+4&&(o=e);this.active=o?.theme??null;for(let e of this.laserGroups){let t=e.tube.track===i&&a>e.tube.s0-80&&a<e.tube.s1+10;if(e.g.visible=t,t)for(let t of e.beams){let e=t.userData;t.rotation.set(0,e.tilt*Math.sin(n*.8+e.phase),e.phase+n*e.speed);let r=.75+.25*Math.sin(n*23+e.phase*5);t.scale.set(1,r,r)}}if(this.spawnT-=t,o&&this.spawnT<=0){let e=o.theme===`fireworks`?.42:o.theme===`pinball`?.38:o.theme===`haunted`?.55:1e9;if(e<1e9){this.spawnT=e*(.7+Math.random()*.6);let t=a+22+Math.random()*30;t<o.s1-4&&(o.theme===`fireworks`?this.spawnBurst(o.track,t,r):this.spawnHolo(o.track,t,o.theme,r))}}for(let e of this.bursts)e.pts.visible&&(e.age+=t,e.mat.uniforms.uAge.value=e.age,e.age>e.life&&(e.pts.visible=!1));for(let e of this.holos){if(!e.spr.visible)continue;e.age+=t;let n=e.age/e.life;if(n>=1){e.spr.visible=!1;continue}let r=Math.min(1,e.age/.12)*Math.min(1,(1-n)/.25);if(e.kind===`haunted`){let t=Math.random()<.12?.15:1;e.mat.opacity=r*t*.85,e.spr.position.copy(e.base).addScaledVector(this.R,Math.random()<.08?(Math.random()-.5)*.8:0)}else{e.mat.opacity=r;let t=1+.35*Math.max(0,1-e.age/.15);e.spr.scale.copy(e.spr.userData.scale).multiplyScalar(t)}}}wallPoint(e,t,n,r,i){let a=this.axisAt(e,t,i),o=this.radius(e,t)*r;return a.addScaledVector(this.R,Math.cos(n)*o).addScaledVector(this.U,Math.sin(n)*o)}spawnBurst(e,t,n){let r=this.bursts.find(e=>!e.pts.visible);if(!r)return;let i=Math.random()*Math.PI*2;this.wallPoint(e,t,i,Math.random()*.45,r.pts.position),r.age=0,r.life=1.1+Math.random()*.5,r.mat.uniforms.uLife.value=r.life,r.mat.uniforms.uSize.value=4.2+Math.random()*2.4,r.mat.uniforms.uColor.value.setHSL(Math.random(),1,.55),r.mat.uniforms.uColor2.value.setHSL(Math.random(),1,.7),r.pts.visible=!0,n?.(`firework`)}spawnHolo(e,t,n,r){let i=this.holos.find(e=>!e.spr.visible);if(!i)return;let a=this.tex[n===`haunted`?`haunted`:`pinball`];i.mat.map=a[Math.floor(Math.random()*a.length)],i.mat.color.set(n===`haunted`?12124134:16777215),i.mat.needsUpdate=!0,i.kind=n;let o=Math.PI*(.15+Math.random()*.7);this.wallPoint(e,t,o,.78,i.base),i.spr.position.copy(i.base);let s=n===`haunted`?3.4+Math.random()*2:4.2+Math.random()*1.6;i.spr.scale.set(s*(n===`pinball`?2:1),s,1),i.spr.userData.scale=i.spr.scale.clone(),i.age=0,i.life=n===`haunted`?1.1+Math.random()*.6:.9,i.spr.visible=!0,r?.(n)}dispose(){this.scene.remove(this.group),this.group.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()})}};function Nf(e,t=256,n=256){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`);e(i,t,n),i.globalCompositeOperation=`destination-out`,i.fillStyle=`rgba(0,0,0,0.35)`;for(let e=0;e<n;e+=4)i.fillRect(0,e,t,1.5);let a=new pa(r);return a.colorSpace=Ke,a}function Pf(e){return Nf((t,n,r)=>{t.fillStyle=`#fff`,t.strokeStyle=`#fff`,t.shadowColor=`#7fffd0`,t.shadowBlur=16,t.lineWidth=8;let i=n/2;if(e===`ghost`){t.beginPath(),t.moveTo(i-70,210),t.lineTo(i-70,110),t.arc(i,110,70,Math.PI,0),t.lineTo(i+70,210);for(let e=0;e<4;e++)t.lineTo(i+70-(e+.5)*35,e%2?210:185);t.closePath(),t.globalAlpha=.55,t.fill(),t.globalAlpha=1,t.fillStyle=`#000`,t.shadowBlur=0,t.beginPath(),t.ellipse(i-25,105,11,17,0,0,Math.PI*2),t.ellipse(i+25,105,11,17,0,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(i,150,14,18,0,0,Math.PI*2),t.fill()}else if(e===`eyes`){for(let e of[-45,45])t.beginPath(),t.ellipse(i+e,128,30,20,0,0,Math.PI*2),t.fill();t.fillStyle=`#000`,t.shadowBlur=0;for(let e of[-45,45])t.beginPath(),t.ellipse(i+e+6,128,8,16,0,0,Math.PI*2),t.fill()}else if(e===`skull`){t.globalAlpha=.7,t.beginPath(),t.arc(i,110,72,Math.PI*.85,Math.PI*2.15),t.lineTo(i+40,200),t.lineTo(i-40,200),t.closePath(),t.fill(),t.globalAlpha=1,t.fillStyle=`#000`,t.shadowBlur=0,t.beginPath(),t.arc(i-28,112,18,0,Math.PI*2),t.arc(i+28,112,18,0,Math.PI*2),t.fill(),t.beginPath(),t.moveTo(i,135),t.lineTo(i-10,158),t.lineTo(i+10,158),t.closePath(),t.fill();for(let e=-2;e<=2;e++)t.fillRect(i+e*14-4,178,8,18)}else e===`bat`?(t.beginPath(),t.moveTo(i,120),t.quadraticCurveTo(i-40,70,i-110,95),t.quadraticCurveTo(i-80,115,i-85,140),t.quadraticCurveTo(i-50,125,i-30,150),t.lineTo(i,140),t.lineTo(i+30,150),t.quadraticCurveTo(i+50,125,i+85,140),t.quadraticCurveTo(i+80,115,i+110,95),t.quadraticCurveTo(i+40,70,i,120),t.fill()):(t.font=`bold 110px system-ui, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`BOO`,i,r/2))})}function Ff(e){return Nf((t,n,r)=>{t.strokeStyle=`hsl(${e.length*47%360},100%,60%)`,t.lineWidth=10,t.shadowColor=t.strokeStyle,t.shadowBlur=24,t.strokeRect(14,14,n-28,r-28),t.fillStyle=`#fff`,t.font=`900 ${e.length>6?70:e.length>3?92:120}px system-ui, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(e,n/2,r/2+4,n-50)},512,256)}var If=28,Lf=10,Rf=3,zf=72,Bf=60,Vf=class{constructor(){J(this,`group`,new Fn),J(this,`core`,void 0),J(this,`coreGeo`,void 0),J(this,`coreMat`,void 0),J(this,`strands`,[]),J(this,`particles`,void 0),J(this,`pMat`,void 0),J(this,`impact`,void 0),J(this,`impactGlow`,void 0),J(this,`phase`,new Float32Array(Bf)),J(this,`color`,new G(4712191)),J(this,`ctrl`,new H),J(this,`initialised`,!1),this.coreGeo=new Rr;let e=new Float32Array(957),t=new Float32Array(638),n=[];for(let e=0;e<=If;e++)for(let r=0;r<=Lf;r++){let i=e*11+r;if(t[i*2]=r/Lf,t[i*2+1]=e/If,e<If&&r<Lf){let e=i,t=i+1,r=i+Lf+1,a=r+1;n.push(e,r,t,t,r,a)}}this.coreGeo.setAttribute(`position`,new Cr(e,3)),this.coreGeo.setAttribute(`uv`,new Cr(t,2)),this.coreGeo.setIndex(n),this.coreMat=new go({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uColor:{value:this.color},uLevel:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform float uTime; uniform vec3 uColor; uniform float uLevel; varying vec2 vUv;
        void main(){
          // energy pulses travelling from the surface (v=0) up to the ball (v=1)
          float flow = 0.5 + 0.5 * sin(vUv.y * 34.0 - uTime * 22.0);
          float flow2 = 0.5 + 0.5 * sin(vUv.y * 11.0 - uTime * 9.0 + vUv.x * 6.283);
          float edge = pow(1.0 - abs(vUv.x * 2.0 - 1.0), 0.6);
          float ends = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
          float a = (0.35 + 0.65 * flow * flow2) * (0.45 + 0.55 * edge) * ends * uLevel;
          gl_FragColor = vec4(uColor * (1.0 + 1.6 * flow) + vec3(0.6) * flow * uLevel, a);
        }`}),this.core=new K(this.coreGeo,this.coreMat),this.core.frustumCulled=!1,this.group.add(this.core);for(let e=0;e<Rf;e++){let e=new Rr;e.setAttribute(`position`,new Cr(new Float32Array(216),3));let t=new ea(e,new Ki({color:this.color,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));t.frustumCulled=!1,this.strands.push(t),this.group.add(t)}let r=new Rr;r.setAttribute(`position`,new Cr(new Float32Array(180),3));for(let e=0;e<Bf;e++)this.phase[e]=Math.random();this.pMat=new go({transparent:!0,depthWrite:!1,blending:2,uniforms:{uColor:{value:this.color},uLevel:{value:0}},vertexShader:`uniform float uLevel; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = clamp(90.0 / -mv.z, 2.0, 14.0) * uLevel; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform vec3 uColor; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(uColor * 1.6 + 0.4, a); }`}),this.particles=new ua(r,this.pMat),this.particles.frustumCulled=!1,this.group.add(this.particles),this.impact=new K(new ro(.35,.8,40),new gi({color:this.color,transparent:!0,opacity:.9,blending:2,depthWrite:!1,side:2})),this.impactGlow=new K(new va(1.6,40),new go({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uColor:{value:this.color},uLevel:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform vec3 uColor; uniform float uLevel; varying vec2 vUv; void main(){ float r = length(vUv - 0.5) * 2.0; gl_FragColor = vec4(uColor, pow(max(0.0, 1.0 - r), 2.0) * uLevel); }`})),this.group.add(this.impact,this.impactGlow),this.group.visible=!1}bez(e,t,n,r,i){let a=1-r;return i.set(0,0,0).addScaledVector(e,a*a).addScaledVector(t,2*a*r).addScaledVector(n,r*r)}update(e,t,n,r,i,a,o,s){if(this.group.visible=i>.02,!this.group.visible){this.initialised=!1;return}let c=e.distanceTo(t),l=new H().addVectors(e,t).multiplyScalar(.5),u=r.clone().multiplyScalar(-Math.min(.12,.6/Math.max(1,r.length()))*Math.min(1,c/3)),d=l.add(u);this.initialised||(this.ctrl.copy(d),this.initialised=!0),this.ctrl.lerp(d,Math.min(1,s*10));let f=this.coreGeo.attributes.position,p=new H,m=new H,h=new H,g=new H,_=new H,v=Math.abs(n.y)<.9?new H(0,1,0):new H(1,0,0);for(let r=0;r<=If;r++){let s=r/If;this.bez(t,this.ctrl,e,s,p),this.bez(t,this.ctrl,e,Math.min(1,s+.02),m),h.subVectors(m,p),h.lengthSq()<1e-8&&h.copy(n),h.normalize(),g.crossVectors(h,v).normalize(),_.crossVectors(h,g).normalize();let c=(.55*(1-s)+a*.55*s)*(.85+.15*Math.sin(o*18-s*12))*(.6+.4*i);for(let e=0;e<=Lf;e++){let t=e/Lf*Math.PI*2,n=r*11+e;f.setXYZ(n,p.x+(g.x*Math.cos(t)+_.x*Math.sin(t))*c,p.y+(g.y*Math.cos(t)+_.y*Math.sin(t))*c,p.z+(g.z*Math.cos(t)+_.z*Math.sin(t))*c)}}f.needsUpdate=!0;for(let n=0;n<Rf;n++){let r=this.strands[n].geometry.attributes.position;for(let s=0;s<zf;s++){let l=s/71;this.bez(t,this.ctrl,e,l,p),this.bez(t,this.ctrl,e,Math.min(1,l+.02),m),h.subVectors(m,p).normalize(),g.crossVectors(h,v).normalize(),_.crossVectors(h,g).normalize();let u=l*c*2.2-o*9+n/Rf*Math.PI*2,d=(.9*(1-l)+a*1.15*l)*(.7+.3*i);r.setXYZ(s,p.x+(g.x*Math.cos(u)+_.x*Math.sin(u))*d,p.y+(g.y*Math.cos(u)+_.y*Math.sin(u))*d,p.z+(g.z*Math.cos(u)+_.z*Math.sin(u))*d)}r.needsUpdate=!0,this.strands[n].material.opacity=.35+.6*i}let y=this.particles.geometry.attributes.position;for(let n=0;n<Bf;n++){this.phase[n]=(this.phase[n]+s*(.9+.8*i)*(.6+n%7*.08))%1;let r=this.phase[n];this.bez(t,this.ctrl,e,r,p);let a=n*2.39996+o*3,c=.45*(1-r);y.setXYZ(n,p.x+Math.cos(a)*c*.7,p.y+Math.sin(a)*c*.7,p.z+Math.sin(a*1.3)*c*.7)}y.needsUpdate=!0,this.coreMat.uniforms.uTime.value=o,this.coreMat.uniforms.uLevel.value=i,this.pMat.uniforms.uLevel.value=i;let b=n.clone().normalize(),x=new H(0,0,1);this.impact.position.copy(t).addScaledVector(b,.03),this.impact.quaternion.setFromUnitVectors(x,b),this.impact.scale.setScalar((.7+i*.8)*(1+.2*Math.sin(o*16))),this.impact.material.opacity=.4+.5*i,this.impactGlow.position.copy(t).addScaledVector(b,.02),this.impactGlow.quaternion.copy(this.impact.quaternion),this.impactGlow.scale.setScalar(.8+i),this.impactGlow.material.uniforms.uLevel.value=i*.9}},Hf={cyan:4712191,magenta:16732120,gold:16762954,lime:9305946},Uf={coldBelow:55,whiteAt:150,heatRate:.8,coolRate:.22,airCool:.45};function Wf(e,t){let n=Math.max(0,Math.min(1,e)),r=[[0,.35,.02,0],[.3,.85,.08,.01],[.55,1,.36,.04],[.78,1,.75,.25],[1,1,.97,.9]];for(let e=1;e<r.length;e++)if(n<=r[e][0]){let i=r[e-1],a=r[e],o=(n-i[0])/(a[0]-i[0]);return t.setRGB(i[1]+(a[1]-i[1])*o,i[2]+(a[2]-i[2])*o,i[3]+(a[3]-i[3])*o)}return t.setRGB(1,.97,.9)}var Gf=new G(2237998),Kf=class{setWorldBrightness(e){this.worldLum=e}get darkness(){return this.darkMix}constructor(e){J(this,`group`,new Fn),J(this,`ball`,void 0),J(this,`beam`,void 0),J(this,`beamMat`,void 0),J(this,`ring`,void 0),J(this,`light`,void 0),J(this,`glow`,void 0),J(this,`trail`,void 0),J(this,`trailPts`,[]),J(this,`beamColor`,new G(Hf.cyan)),J(this,`tether`,new Vf),J(this,`beamLevel`,0),J(this,`captureFlash`,0),J(this,`outline`,void 0),J(this,`worldLum`,.3),J(this,`darkMix`,0),J(this,`heat`,0),J(this,`heatCol`,new G),J(this,`heatGlow`,void 0),J(this,`heatLight`,void 0),J(this,`sparks`,void 0),J(this,`sparkVel`,void 0),J(this,`sparkLife`,void 0),J(this,`sparkNext`,0),J(this,`radius`,.75);let t=new io(e,64,48),n=qd(`steel`),r=new yo({color:16777215,metalness:1,roughness:1,map:n.map,roughnessMap:n.roughnessMap,clearcoat:.6,clearcoatRoughness:.05,envMapIntensity:1.25});this.ball=new K(t,r),this.ball.castShadow=!0,this.group.add(this.ball),this.outline=new K(new io(e*1.045,48,32),new gi({color:0,side:1,fog:!1})),this.ball.add(this.outline);let i=new ya(1,1,1,24,1,!0);i.translate(0,.5,0),this.beamMat=new go({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uColor:{value:this.beamColor},uLevel:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform float uTime; uniform vec3 uColor; uniform float uLevel; varying vec2 vUv;
        void main(){
          float bands = 0.55 + 0.45 * sin(vUv.y * 40.0 - uTime * 28.0);
          float rim = pow(1.0 - abs(sin(vUv.x * 3.14159)), 2.0) * 0.6 + 0.4;
          float fade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          float a = bands * rim * fade * uLevel * 0.85;
          gl_FragColor = vec4(uColor * (1.2 + bands), a);
        }`}),this.beam=new K(i,this.beamMat),this.beam.visible=!1,this.beam.frustumCulled=!1,this.group.add(this.beam),this.ring=new K(new ro(.25,.7,32),new yo({color:0,emissive:this.beamColor,emissiveIntensity:3,transparent:!0,opacity:.8,side:2,depthWrite:!1})),this.ring.visible=!1,this.group.add(this.ring),this.glow=new K(new io(e*1.35,24,16),new go({transparent:!0,depthWrite:!1,blending:2,uniforms:{uColor:{value:this.beamColor},uLevel:{value:0}},vertexShader:`varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,fragmentShader:`uniform vec3 uColor; uniform float uLevel; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.5); gl_FragColor = vec4(uColor, f * uLevel); }`})),this.group.add(this.glow),this.heatGlow=new K(new io(e*1.28,24,16),new go({transparent:!0,depthWrite:!1,blending:2,uniforms:{uColor:{value:new G},uLevel:{value:0},uTime:{value:0}},vertexShader:`varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,fragmentShader:`uniform vec3 uColor; uniform float uLevel; uniform float uTime; varying vec3 vN; varying vec3 vV;
        void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 1.6); float shimmer = 0.85 + 0.15 * sin(uTime * 23.0 + vN.y * 9.0);
          gl_FragColor = vec4(uColor, f * uLevel * shimmer); }`})),this.heatGlow.visible=!1,this.group.add(this.heatGlow),this.heatLight=new rs(16736288,0,14,2),this.group.add(this.heatLight);let a=new Rr;a.setAttribute(`position`,new Cr(new Float32Array(420),3)),a.setAttribute(`color`,new Cr(new Float32Array(420),3)),this.sparkVel=new Float32Array(420),this.sparkLife=new Float32Array(140),this.sparks=new ua(a,new aa({size:.16,vertexColors:!0,transparent:!0,depthWrite:!1,blending:2})),this.sparks.frustumCulled=!1,this.group.add(this.sparks),this.light=new rs(this.beamColor,0,9,2),this.group.add(this.light),this.group.add(this.tether.group),this.radius=e}setSkin(e){let t=qd(e),n=this.ball.material;n.map=t.map,n.roughnessMap=t.roughnessMap,n.metalness=e===`rolypoly`?.15:1,n.clearcoat=e===`rolypoly`?.9:.6,n.needsUpdate=!0}setBeamColor(e){this.beamColor.set(Hf[e]??Hf.cyan),this.tether.color.copy(this.beamColor)}setTrail(e,t=10479871){if(e&&!this.trail){let e=new Rr;e.setAttribute(`position`,new Cr(new Float32Array(270),3)),this.trail=new ea(e,new Ki({color:t,transparent:!0,opacity:.7})),this.trail.frustumCulled=!1,this.group.add(this.trail)}else!e&&this.trail&&(this.group.remove(this.trail),this.trail=void 0)}flashCapture(){this.captureFlash=1}update(e,t,n){{let n=e.track.tubeAt(e.proj.s),r=Math.max(0,Math.min(1,(this.worldLum-.33)/.18))*(1-n);this.darkMix+=(r-this.darkMix)*Math.min(1,t*4);let i=this.ball.material;i.color.setRGB(1,1,1).lerp(Gf,this.darkMix),i.envMapIntensity=1.25-.75*this.darkMix}this.ball.position.copy(e.p),this.ball.quaternion.copy(e.q),this.updateHeat(e,t,n),this.glow.position.copy(e.p),this.light.position.copy(e.p);let r=e.magnetActive||e.netLift?.4+.6*e.magnetForce:0;this.beamLevel+=(r-this.beamLevel)*Math.min(1,t*14),this.captureFlash=Math.max(0,this.captureFlash-t*3);let i=this.beamLevel+this.captureFlash*.8;if(this.beamMat.uniforms.uTime.value=n,this.beamMat.uniforms.uLevel.value=i,this.glow.material.uniforms.uLevel.value=Math.min(1,i*1.2),this.light.intensity=i*28,this.beam.visible=!1,this.ring.visible=!1,e.magnetHasTarget||i<.02){let r=new H().subVectors(e.p,e.magnetTarget);r.lengthSq()<1e-6&&r.copy(e.n),r.normalize(),this.tether.update(e.p,e.magnetTarget,r,e.v,e.magnetHasTarget?Math.min(1,i):0,this.radius,n,t)}if(this.trail){this.trailPts.unshift(e.p.clone()),this.trailPts.length>90&&this.trailPts.pop();let t=this.trail.geometry.attributes.position;for(let e=0;e<90;e++){let n=this.trailPts[Math.min(e,this.trailPts.length-1)];t.setXYZ(e,n.x,n.y,n.z)}t.needsUpdate=!0}}updateHeat(e,t,n){let r=e.v.length(),i=e.contact?Math.max(0,Math.min(1,(r-Uf.coldBelow)/(Uf.whiteAt-Uf.coldBelow))):0;i>this.heat?this.heat+=(i-this.heat)*Math.min(1,t*Uf.heatRate):this.heat+=(i-this.heat)*Math.min(1,t*(e.contact?Uf.coolRate:Uf.airCool));let a=this.heat,o=this.ball.material,s=a<.04?0:((a-.04)/.96)**1.3;if(Wf(a,this.heatCol),o.emissive.copy(this.heatCol),o.emissiveIntensity=s*(1.2+2.6*a),s>0&&(o.envMapIntensity*=1-.7*a*a),this.heatGlow.visible=s>.02,this.heatGlow.visible){this.heatGlow.position.copy(e.p);let t=this.heatGlow.material.uniforms;t.uColor.value.copy(this.heatCol),t.uLevel.value=Math.min(1,s*1.3),t.uTime.value=n}this.heatLight.position.copy(e.p),this.heatLight.color.copy(this.heatCol),this.heatLight.intensity=s*40;let c=this.sparks.geometry.getAttribute(`position`),l=this.sparks.geometry.getAttribute(`color`),u=this.sparkLife.length;if(e.contact&&a>.55)for(this.sparkNext+=t*(a-.5)*360;this.sparkNext>=1;){--this.sparkNext;let t=0,n=1e9;for(let e=0;e<u;e++)this.sparkLife[e]<n&&(n=this.sparkLife[e],t=e);let r=this.radius;c.setXYZ(t,e.p.x-e.n.x*r*.9,e.p.y-e.n.y*r*.9,e.p.z-e.n.z*r*.9);let i=6+8*a;this.sparkVel[t*3]=-e.v.x*.25+(Math.random()-.5)*i+e.n.x*(2+Math.random()*4),this.sparkVel[t*3+1]=-e.v.y*.25+(Math.random()-.5)*i+e.n.y*(2+Math.random()*4),this.sparkVel[t*3+2]=-e.v.z*.25+(Math.random()-.5)*i+e.n.z*(2+Math.random()*4),this.sparkLife[t]=.25+Math.random()*.35}else this.sparkNext=0;let d=!1;for(let e=0;e<u;e++){if(this.sparkLife[e]<=0){l.setXYZ(e,0,0,0);continue}d=!0,this.sparkLife[e]-=t,this.sparkVel[e*3+1]-=9.8*t,c.setXYZ(e,c.getX(e)+this.sparkVel[e*3]*t,c.getY(e)+this.sparkVel[e*3+1]*t,c.getZ(e)+this.sparkVel[e*3+2]*t);let n=Math.max(0,Math.min(1,this.sparkLife[e]/.4));l.setXYZ(e,n,n*(.45+.5*a),n*.25*a)}this.sparks.visible=d,d&&(c.needsUpdate=!0,l.needsUpdate=!0)}},qf=class{constructor(e){J(this,`group`,new Fn),J(this,`core`,void 0),J(this,`halo`,void 0),this.core=new gi({color:12577023,transparent:!0,opacity:.35,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),this.halo=new gi({color:6273279,transparent:!0,opacity:.12,blending:2,depthWrite:!1,fog:!1,toneMapped:!1}),this.group.add(new K(new io(e,24,16),this.core)),this.group.add(new K(new io(e*1.6,16,12),this.halo)),this.group.visible=!1,this.group.renderOrder=3}update(e,t,n){if(!e){this.group.visible=!1;return}this.group.visible=!0,this.group.position.copy(e);let r=Math.min(1,Math.max(0,(n.distanceTo(e)-4)/6));this.core.opacity=(.26+.08*Math.sin(t*6))*r,this.halo.opacity=.12*r}},Jf=class{constructor(){J(this,`pts`,[]),J(this,`next`,0),J(this,`lastT`,-1),J(this,`last`,new H)}reset(){this.pts=[],this.next=0,this.lastT=-1}sample(e,t){let n=this.lastT<0||this.last.distanceTo(t)>12;for(;e>=this.next;){let r=n||e<=this.lastT?1:(this.next-this.lastT)/(e-this.lastT);this.pts.push(this.last.x+(t.x-this.last.x)*r,this.last.y+(t.y-this.last.y)*r,this.last.z+(t.z-this.last.z)*r),this.next+=1/20}this.lastT=e,this.last.copy(t)}get length(){return this.pts.length/3}finish(e,t,n){return{course:e,time:t,date:Date.now(),falls:n,pts:new Float32Array(this.pts)}}};function Yf(e,t,n){let r=e.pts.length/3;if(r===0)return n.set(0,0,0);let i=Math.max(0,Math.min(r-1,t*20)),a=Math.min(r-2,Math.floor(i)),o=i-Math.max(0,a);if(r<2)return n.set(e.pts[0],e.pts[1],e.pts[2]);let s=(t,n)=>e.pts[Math.max(0,Math.min(r-1,t))*3+n],c=o*o,l=c*o,u=e=>{let t=s(a-1,e),n=s(a,e),r=s(a+1,e),i=s(a+2,e);return Math.abs(r-n)>12?o<.5?n:r:.5*(2*n+(-t+r)*o+(2*t-5*n+4*r-i)*c+(-t+3*n-3*r+i)*l)};return n.set(u(0),u(1),u(2))}var Xf=.02,Zf=-32768;function Qf(e){let t=e.pts.length/3,n=new DataView(new ArrayBuffer(12+t*18)),r=0,i=e=>{n.setFloat32(r,e,!0),r+=4},a=e=>{n.setInt16(r,e,!0),r+=2},o=0,s=0,c=0;for(let n=0;n<t;n++){let t=e.pts[n*3],r=e.pts[n*3+1],l=e.pts[n*3+2],u=Math.round((t-o)/Xf),d=Math.round((r-s)/Xf),f=Math.round((l-c)/Xf);n===0||Math.max(Math.abs(u),Math.abs(d),Math.abs(f))>32e3?(n>0&&(a(Zf),a(Zf),a(Zf)),i(t),i(r),i(l),o=t,s=r,c=l):(a(u),a(d),a(f),o+=u*Xf,s+=d*Xf,c+=f*Xf)}let l=new Uint8Array(n.buffer,0,r),u=``;for(let e=0;e<l.length;e+=32768)u+=String.fromCharCode(...l.subarray(e,e+32768));return btoa(u)}function $f(e,t){let n=atob(e),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);let i=new DataView(r.buffer),a=[],o=0,s=0,c=0,l=0,u=!0;for(;o<r.length;){if(u)s=i.getFloat32(o,!0),c=i.getFloat32(o+4,!0),l=i.getFloat32(o+8,!0),o+=12,u=!1;else{let e=i.getInt16(o,!0),t=i.getInt16(o+2,!0),n=i.getInt16(o+4,!0);o+=6,e===Zf&&t===Zf&&n===Zf?(s=i.getFloat32(o,!0),c=i.getFloat32(o+4,!0),l=i.getFloat32(o+8,!0),o+=12):(s+=e*Xf,c+=t*Xf,l+=n*Xf)}a.push(s,c,l)}return{...t,pts:new Float32Array(a)}}var ep=class{constructor(e=typeof localStorage<`u`?localStorage:null){J(this,`storage`,void 0),this.storage=e}key(e){return`gb.runs.${e}`}read(e){try{let t=JSON.parse(this.storage?.getItem(this.key(e))??`[]`);return Array.isArray(t)?t:[]}catch{return[]}}write(e,t){try{return this.storage?.setItem(this.key(e),JSON.stringify(t)),!0}catch{return!1}}list(e){return this.read(e).map(({data:e,...t})=>t)}load(e,t){let n=this.read(e).find(e=>e.date===t);if(!n)return null;try{let{data:e,...t}=n;return $f(e,t)}catch{return null}}save(e){let t=this.read(e.course).filter(t=>t.date!==e.date),n={course:e.course,time:e.time,date:e.date,falls:e.falls,data:Qf(e)};t.push(n),t.sort((e,t)=>e.time-t.time);let r=t.slice(0,10),i=r.indexOf(n)+1;return i===0?0:this.write(e.course,r)?i:0}qualifies(e,t){let n=this.read(e);return n.length<10||t<n[n.length-1].time}isSaved(e,t){return this.read(e).some(e=>e.date===t)}remove(e,t){this.write(e,this.read(e).filter(e=>e.date!==t))}};function tp(e,t,n){let r=Math.max(-1,Math.min(1,e.dot(t))),i=Math.acos(r);if(i<=n||i<1e-5)return!1;let a=t.clone().addScaledVector(e,-r);return a.lengthSq()<1e-10?!1:(a.normalize(),t.copy(e).multiplyScalar(Math.cos(n)).addScaledVector(a,Math.sin(n)),!0)}var np=class{constructor(e){J(this,`cam`,void 0),J(this,`pos`,new H),J(this,`look`,new H),J(this,`up`,new H(0,1,0)),J(this,`initialised`,!1),J(this,`P`,new H),J(this,`T`,new H),J(this,`U`,new H),J(this,`R`,new H),J(this,`P2`,new H),J(this,`T2`,new H),J(this,`U2`,new H),J(this,`R2`,new H),J(this,`airPull`,0),J(this,`lastV`,new H),J(this,`latG`,0),J(this,`vertG`,0),J(this,`dip`,0),J(this,`fovPunch`,0),J(this,`magPull`,0),J(this,`t`,0),J(this,`shake`,0),J(this,`fx`,.8),J(this,`baseFov`,80),J(this,`compact`,0),J(this,`autoTarget`,0),J(this,`autoK`,0),J(this,`freeK`,0),J(this,`freeDir`,new H(0,0,-1)),this.cam=new ts(80,e,.1,6e3)}resize(e){this.cam.aspect=e,this.baseFov=e<.75?84:e<1.2?76:66,this.cam.updateProjectionMatrix()}snap(){this.initialised=!1}adopt(e,t,n){this.pos.copy(e),this.look.copy(t),this.up.set(0,1,0),this.lastV.copy(n),this.latG=0,this.vertG=0,this.freeK=0,this.initialised=!0}punch(e){this.fovPunch=Math.max(this.fovPunch,e)}update(e,t,n){this.t+=n;let r=this.fx,i=Math.max(0,e.proj.s);t.frameAtS(i,this.P,this.T,this.U,this.R);let a=e.v.length(),o=new H().subVectors(e.v,this.lastV).multiplyScalar(1/Math.max(n,.001));this.lastV.copy(e.v),this.initialised||o.set(0,0,0);let s=o.dot(this.R);this.latG+=(Math.max(-40,Math.min(40,s))-this.latG)*Math.min(1,n*4);let c=e.contact?Math.max(-1,Math.min(3,e.normalAccel/9.81-1)):-.6;this.vertG+=(c-this.vertG)*Math.min(1,n*5);let l=this.U.y<.35,u=l?.95:.85,d=new H(0,1,0).lerp(this.U,u).normalize(),f=t.tubeAt(i),p=t.profile.H,m=-e.proj.x,h=p-e.proj.y,g=Math.hypot(m,h)||1;if(m/=g,h/=g,f>.001){let e=this.R.clone().multiplyScalar(m).addScaledVector(this.U,h).normalize();d.lerp(e,f).normalize()}let _=Math.max(-.22,Math.min(.22,-this.latG*.012))*r;d.applyQuaternion(new Rt().setFromAxisAngle(this.T,_)),this.autoK+=(this.autoTarget-this.autoK)*Math.min(1,n*1.5);let v=6.6-.6*this.compact+Math.min(3.5,a*.07)+4*this.autoK;this.airPull+=(+!!e.airborne-this.airPull)*Math.min(1,n*2.5);let y=(-this.vertG*.45+this.airPull*1.2)*r;this.dip+=(y-this.dip)*Math.min(1,n*6);let b=3+this.dip+2.6*this.autoK;t.frameAtS(Math.max(0,i-v),this.P2,this.T2,this.U2,this.R2);let x=e.proj.x*.6,S=Math.max(0,e.proj.y-.75)*.55,C=new H(0,1,0).lerp(this.U2,u).normalize(),w=this.P2.clone().addScaledVector(this.R2,x).addScaledVector(this.U2,S).addScaledVector(C,b);if(f>.001){let t=this.P2.clone().addScaledVector(this.R2,e.proj.x+m*3).addScaledVector(this.U2,e.proj.y+h*3);w.lerp(t,f)}let T=Math.min(16,6+a*.3)+8*this.autoK;t.frameAtS(i+T,this.P2,this.T2,this.U2,this.R2);let E=this.P2.clone().addScaledVector(this.U2,.9).addScaledVector(this.R2,e.proj.x*.3);if(f>.001){let t=this.P2.clone().addScaledVector(this.R2,e.proj.x*.7).addScaledVector(this.U2,p+(e.proj.y-p)*.7);E.lerp(t,f)}let D=e.p.clone().lerp(E,.5);{let t=e.proj,r=e.track,i=r.profileAt(t.s),o=i.a+i.rc,[s,c]=r.wallsAt(t.s),l=Math.max(s,c),u=r.isTunnel(t.s)&&t.y>i.H-.2,f=r.tubeAt(t.s)>.85&&r.channelDepthLocal(t.s,t.x,t.y)<-.05,p=Math.abs(t.x)>o+.3,m=!e.contact&&t.y>l+5,h=Math.abs(t.along)>2.5,g=u||f||p||m||h?1:0;if(this.freeK+=(g-this.freeK)*Math.min(1,n*(g?6:2.5)),this.freeK>.001){let t=new H(e.v.x,0,e.v.z);t.lengthSq()>4?this.freeDir.lerp(t.normalize(),Math.min(1,n*3)).normalize():this.freeDir.lerp(new H(this.T.x,0,this.T.z).normalize(),Math.min(1,n*2)).normalize();let r=e.p.clone().addScaledVector(this.freeDir,-(8+Math.min(4,a*.06))).add(new H(0,3.6,0)),i=e.p.clone().addScaledVector(this.freeDir,3),o=this.freeK*this.freeK*(3-2*this.freeK);w.lerp(r,o),D.lerp(i,o),d.lerp(new H(0,1,0),o).normalize()}}if(!this.initialised)this.pos.copy(w),this.look.copy(D),this.up.copy(d),this.initialised=!0;else{let e=1-Math.exp(-n*10),t=1-Math.exp(-n*13),r=1-Math.exp(-n*(l?2.6:f>.5?6:5)),i=this.up.clone(),o=this.look.clone().sub(this.pos).normalize();this.pos.lerp(w,e),this.look.lerp(D,t),this.up.lerp(d,r),this.up.lengthSq()<.09&&this.up.addScaledVector(this.R,.5),this.up.normalize();let s=Math.max(0,Math.min(1,(a-40)/80));if(s>0){tp(i,this.up,(5.5-3.9*s)*n);let e=this.look.clone().sub(this.pos),t=e.length();t>.001&&(e.multiplyScalar(1/t),tp(o,e,(9-5*s)*n)&&this.look.copy(this.pos).addScaledVector(e,t))}}this.pos.distanceTo(e.p)>14&&this.pos.lerp(w,.5),this.cam.position.copy(this.pos);let O=Math.min(1,a/32),k=(e.contact?.012+.05*O*O:.004)*r+this.shake*.14;if(k>0){let e=this.t,t=Math.sin(e*61.3)*.6+Math.sin(e*97.1+1.3)*.4,n=Math.sin(e*73.7+.7)*.6+Math.sin(e*113.9+2.1)*.4;this.cam.position.addScaledVector(this.R,t*k).addScaledVector(this.up,n*k)}this.shake=Math.max(0,this.shake-n*4),this.cam.up.copy(this.up),this.cam.lookAt(this.look),this.fovPunch=Math.max(0,this.fovPunch-n*18);let A=e.magnetActive&&!e.contact&&e.magnetHasTarget?7*e.magnetForce:0;this.magPull+=(A-this.magPull)*Math.min(1,n*8);let j=f*Math.min(16,Math.max(0,a-38)*.5)+(e.turboMul()-1)*10,ee=this.baseFov-5*this.compact+(Math.min(18,Math.max(0,a-10)*.75)+j+this.fovPunch-this.magPull)*(.4+.6*r);Math.abs(this.cam.fov-ee)>.05&&(this.cam.fov+=(ee-this.cam.fov)*Math.min(1,n*4),this.cam.updateProjectionMatrix())}},rp={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},ip=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ap=new is(-1,1,1,-1,0,1),op=new class extends Rr{constructor(){super(),this.setAttribute(`position`,new Er([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Er([0,2,0,0,2,0],2))}},sp=class{constructor(e){this._mesh=new K(op,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ap)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},cp=class extends ip{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof go?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=po.clone(e.uniforms),this.material=new go({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new sp(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},lp=class extends ip{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},up=class extends ip{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},dp=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new V);this._width=n.width,this._height=n.height,t=new an(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:T}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cp(rp),this.copyPass.material.blending=0,this.timer=new ds}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}lp!==void 0&&(r instanceof lp?n=!0:r instanceof up&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new V);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},fp=class extends ip{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new G}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},pp={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},mp=class extends ip{constructor(){super(),this.isOutputPass=!0,this.uniforms=po.clone(pp.uniforms),this.material=new _o({name:pp.name,uniforms:this.uniforms,vertexShader:pp.vertexShader,fragmentShader:pp.fragmentShader}),this._fsQuad=new sp(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Gt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},hp={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new G(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},gp=class e extends ip{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new V(256,256):new V(e.x,e.y),this.clearColor=new G(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new an(i,a,{type:T,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new an(i,a,{type:T,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new an(i,a,{type:T,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=hp;this.highPassUniforms=po.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new go({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new V(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1),new H(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=po.clone(rp.uniforms),this.blendMaterial=new go({uniforms:this.copyUniforms,vertexShader:rp.vertexShader,fragmentShader:rp.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new G,this._oldClearAlpha=1,this._basic=new gi,this._fsQuad=new sp(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new V(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new go({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new V(.5,.5)},direction:{value:new V(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new go({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};gp.BlurDirectionX=new V(1,0),gp.BlurDirectionY=new V(0,1);var _p={uniforms:{tDiffuse:{value:null},uAmount:{value:0},uCenter:{value:new V(.5,.55)},uVignette:{value:.3},uTint:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uAmount; uniform vec2 uCenter; uniform float uVignette; uniform float uTint;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uCenter;
      float r = length(d);
      // blur grows toward the edges; centre stays crisp
      float k = uAmount * smoothstep(0.12, 0.75, r) * 0.09;
      vec3 acc = vec3(0.0);
      for (int i = 0; i < 8; i++) {
        float f = float(i) / 7.0;
        vec2 uv = vUv - d * k * f;
        // chromatic fringe: channels sampled at slightly different radii
        acc.r += texture2D(tDiffuse, uv + d * k * 0.12).r;
        acc.g += texture2D(tDiffuse, uv).g;
        acc.b += texture2D(tDiffuse, uv - d * k * 0.12).b;
      }
      vec3 col = acc / 8.0;
      float vig = 1.0 - uVignette * smoothstep(0.35, 0.95, r * 1.25);
      col *= vig;
      // grade: deeper blacks and a little more punch
      col = max(col - 0.015, 0.0) * 1.04;
      col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
      col += vec3(0.05, 0.35, 0.45) * uTint * smoothstep(0.4, 1.0, r * 1.25) * 0.35;
      gl_FragColor = vec4(col, 1.0);
    }`},vp=class{constructor(e,t,n){J(this,`renderer`,void 0),J(this,`composer`,void 0),J(this,`pass`,void 0),J(this,`renderPass`,void 0),J(this,`bloom`,void 0),this.renderer=e,this.composer=new dp(e),this.composer.renderTarget1.texture.type=T,this.composer.renderTarget2.texture.type=T,this.renderPass=new fp(t,n),this.pass=new cp(_p),this.composer.addPass(this.renderPass),this.composer.addPass(new cp({uniforms:{tDiffuse:{value:null}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D tDiffuse; varying vec2 vUv;
        void main(){ vec4 c = texture2D(tDiffuse, vUv);
          if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0);
          gl_FragColor = vec4(clamp(c.rgb, 0.0, 48.0), 1.0); }`})),this.bloom=new gp(new V(256,256),.32,.25,.96),this.composer.addPass(this.bloom),this.composer.addPass(this.pass),this.composer.addPass(new mp)}setScene(e,t){this.renderPass.scene=e,this.renderPass.camera=t}setSize(e,t){this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(e,t)}render(e,t,n){let r=this.pass.uniforms;r.uAmount.value=e,r.uVignette.value=t,r.uTint.value=n,this.composer.render()}},yp=class{constructor(){J(this,`listeners`,[])}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}publish(e,t){for(let n of this.listeners)n(e,t)}},bp=typeof location<`u`&&new URLSearchParams(location.search).has(`fixed`),xp=class e{constructor(t,n,r,i){J(this,`canvas`,void 0),J(this,`audio`,void 0),J(this,`haptics`,void 0),J(this,`input`,void 0),J(this,`renderer`,void 0),J(this,`scene`,new Wn),J(this,`quality`,void 0),J(this,`world`,void 0),J(this,`trackGroup`,void 0),J(this,`ballView`,void 0),J(this,`camera`,void 0),J(this,`post`,void 0),J(this,`lastRib`,-1),J(this,`blur`,0),J(this,`run`,void 0),J(this,`track`,void 0),J(this,`courseGeo`,void 0),J(this,`branchGroups`,[]),J(this,`streaks`,void 0),J(this,`tubeThemes`,void 0),J(this,`fogBase`,void 0),J(this,`fogDark`,new G(0)),J(this,`fogMix`,0),J(this,`hemiBase`,-1),J(this,`material`,void 0),J(this,`course`,void 0),J(this,`mode`,`attract`),J(this,`autopilot`,void 0),J(this,`bus`,new yp),J(this,`hintIndex`,0),J(this,`previewTimer`,0),J(this,`last`,performance.now()),J(this,`time`,0),J(this,`paused`,!1),J(this,`cb`,{}),J(this,`finale`,void 0),J(this,`finaleReported`,!1),J(this,`cosmetics`,{skin:`steel`,beam:`cyan`,trail:!1}),J(this,`fractalLevel`,.6),J(this,`speedFx`,.8),J(this,`frameTimes`,[]),J(this,`fps`,60),J(this,`dprCap`,Math.min(devicePixelRatio,2)),J(this,`dpr`,Math.min(devicePixelRatio,1.6)),J(this,`perfTimer`,0),J(this,`routeHint`,new Map),J(this,`dtLast`,1/60),J(this,`ghostRec`,new Jf),J(this,`lastRun`,null),J(this,`ghost`,null),J(this,`ghostOn`,!0),J(this,`replay`,null),J(this,`replayT`,0),J(this,`ghostView`,void 0),J(this,`ghostP`,new H),J(this,`auto`,!1),J(this,`autoUsed`,!1),J(this,`pro`,new Df),J(this,`predBall`,void 0),J(this,`predPts`,[]),J(this,`predTimer`,0),J(this,`trailPts`,[]),J(this,`trailTimer`,0),J(this,`lineAhead`,new Of(140,.32)),J(this,`lineBehind`,new Of(100,.22)),J(this,`fallsSeen`,0),J(this,`autoPace`,(()=>{try{let e=Number(localStorage.getItem(`gb.autoPace`));return Number.isFinite(e)&&localStorage.getItem(`gb.autoPace`)!==null?e:.6}catch{return .6}})()),J(this,`insane`,!1),J(this,`timeScale`,1),J(this,`intro`,null),J(this,`noSnap`,!1),J(this,`introEnabled`,!0),J(this,`frame`,t=>{requestAnimationFrame(this.frame);let n=bp?1/60:Math.min(.05,(t-this.last)/1e3);if(this.last=t,this.dtLast=n,this.frameTimes.push(n),this.frameTimes.length>60&&(this.frameTimes.shift(),this.fps=1/(this.frameTimes.reduce((e,t)=>e+t,0)/this.frameTimes.length)),!bp&&(this.perfTimer+=n,this.perfTimer>2)){this.perfTimer=0;let e=this.fps<50?Math.max(1,this.dpr-.2):this.fps>58.5?Math.min(this.dprCap,this.dpr+.1):this.dpr;Math.abs(e-this.dpr)>.01&&(this.dpr=e,this.renderer.setPixelRatio(this.dpr),this.resize())}if(!this.run||!this.track||!this.ballView)return;{let e=this.run.ball,t=e.track,r=e.v.length(),i=!1;if(r>75&&this.mode===`play`&&!this.replay)for(let n=-5;n<=25&&!i;n+=5)t.isSteepOrInverted(e.proj.s+n)&&t.U[t.idx(e.proj.s+n)*3+1]<.2&&(i=!0);let a=i?Math.max(.55,1-(r-75)/120):1;this.timeScale+=(a-this.timeScale)*Math.min(1,n*(a<this.timeScale?6:2.5))}n*=this.timeScale,this.time+=n;let r;this.mode===`play`?(r=this.input.sample(n),this.auto&&this.run.phase===`running`&&!this.intro&&!this.replay&&!this.paused&&(r=this.pro.decide(this.run.ball,n),this.autoUsed=!0)):r=this.autopilot.decide(this.run.ball),this.intro?(this.paused||this.intro.update(n),this.intro.done&&this.skipIntro()):this.finale?(this.paused||this.finale.update(n),this.finale.done&&!this.finaleReported&&(this.finaleReported=!0,this.cb.onFinaleDone?.(this.finale.score,this.finale.kind))):!this.paused&&this.replay?(this.replayT+=n,this.run.time=this.replayT,Yf(this.replay,this.replayT,this.ghostP),this.run.ball.followGhost(this.ghostP,n),this.replayT>this.replay.time+1&&(this.replay=null,this.cb.onReplayDone?.())):this.paused||(this.run.update(n,r),this.mode===`play`&&(this.run.phase===`running`||this.run.phase===`respawning`)&&this.ghostRec.sample(this.run.time,this.run.ball.p),this.mode!==`play`&&this.run.phase===`finished`&&(this.run.reset(),this.run.launch(),this.run.ball.placeAt(6,12)),this.mode!==`play`&&this.run.phase===`ready`&&this.run.launch());let i=this.run.ball;{let e=this.ghost,t=this.run.phase===`ready`?0:this.run.time,n=e&&this.ghostOn&&this.mode===`play`&&!this.replay&&!this.finale&&!this.intro&&t<e.time+1.5;this.ghostView?.update(n?Yf(e,t,this.ghostP):null,this.time,this.camera.cam.position)}let a=this.run.pendingEvents.splice(0);if(!this.paused&&!this.finale&&this.bus.publish(i.snapshot(),a),this.finale&&this.audio.quiet(),i.boosting&&!this.paused?this.camera.punch(7*this.speedFx):this.audio.quiet(),this.showHints(i.activeIndex===0?i.mainProj.s:i.proj.s,i.activeIndex),this.mode===`play`&&!e.padHintShown){let t=i.track;for(let n=0;n<t.pads.length;n++){let r=t.pads[n].s-i.proj.s;if(r>20&&r<75&&!t.padHit[n]){e.padHintShown=!0,this.cb.onHint?.(t.pads[n].side>0?`CLIMB THE RIGHT WALL ▶ HIT THE GLOWING PAD`:`◀ CLIMB THE LEFT WALL — HIT THE GLOWING PAD`);break}}}this.ballView.update(i,n,this.time),this.trackGroup&&ff(this.trackGroup,this.track),this.branchGroups.forEach((e,t)=>ff(e,this.courseGeo.branches[t]));let o=this.trackGroup?.userData.fx;if(o){o.uFxTime.value=this.time,o.uFxTravel.value+=i.v.length()*n,o.uFxBallDark.value=this.ballView.darkness,o.uFxIntensity.value=this.fractalLevel*(this.trackGroup.userData.fxStrength??.6)*(i.turboTime>0?1.3:1),o.uFxSpeed.value+=(Math.min(1,i.v.length()/30)-o.uFxSpeed.value)*Math.min(1,n*3);for(let e of this.branchGroups){let t=e.userData.fx;t&&(t.uFxTime.value=o.uFxTime.value,t.uFxIntensity.value=o.uFxIntensity.value,t.uFxSpeed.value=o.uFxSpeed.value,t.uFxTravel.value=o.uFxTravel.value,t.uFxBallDark.value=o.uFxBallDark.value)}}if(this.camera.fx=this.speedFx,this.intro?this.intro.applyCamera(this.camera.cam):this.finale?this.finale.applyCamera(this.camera.cam):this.camera.update(i,i.track,n),this.run.falls!==this.fallsSeen&&(this.run.falls>this.fallsSeen&&this.auto&&this.pro.crashed(i),this.fallsSeen=this.run.falls),this.camera.autoTarget=this.auto&&this.run.phase===`running`&&!this.replay?1:0,this.updateAutoVisuals(this.paused?0:n),this.streaks?.update(i.track,i.proj.s,i.v.length(),n,this.time,.5+.5*this.speedFx),!this.intro&&!this.finale&&this.tubeThemes?.update(i,this.paused?0:n,this.time,this.mode===`play`&&!this.paused?e=>this.audio.themeSound(e):void 0),this.fogBase&&this.scene.fog instanceof Un){let e=Math.max(i.track.tubeAt(i.proj.s),i.track.tubeAt(i.proj.s+10));this.fogMix+=(e-this.fogMix)*Math.min(1,n*3),this.scene.fog.color.copy(this.fogBase.color).lerp(this.fogDark,this.fogMix),this.scene.fog.density=this.fogBase.density+(.011-this.fogBase.density)*this.fogMix*(this.fogBase.density<.011)}let s=Math.floor(i.proj.s/7);if(s!==this.lastRib&&(this.lastRib>=0&&this.mode!==`attract`&&!this.paused&&!i.track.isTunnel(i.proj.s)&&this.audio.whoosh(Math.min(1,i.v.length()/30)),this.lastRib=s),this.world){let e=this.world.sun;e.target.position.copy(i.p),e.position.copy(i.p).addScaledVector(this.world.sunDir,90);let t=this.world.sky.update(n,performance.now()/1e3,this.camera.cam.position);this.hemiBase<0&&(this.hemiBase=this.world.hemi.intensity),this.world.hemi.intensity=this.hemiBase*(1+t*2.2)}let c=i.v.length();this.blur+=(Math.max(0,Math.min(1,(c-12)/22))-this.blur)*Math.min(1,n*3),this.quality===`high`&&this.speedFx>.01?this.post.render(this.blur*this.speedFx,(.18+.32*this.blur)*this.speedFx,+!!i.magnetActive):this.renderer.render(this.scene,this.camera.cam),this.mode===`preview`&&!this.paused&&(this.previewTimer-=n,this.previewTimer<=0&&(this.previewTimer=1e9,this.cb.onPreviewEnd?.())),this.cb.onHud?.({speedKmh:i.v.length()*3.6,progress:this.run.progress,time:this.run.time,magnetEnergy:i.magnetEnergy,magnetActive:i.magnetActive,pushCombo:i.pushCombo,turboArmed:i.turboArmed,turboActive:i.turboTime>0,driveLevel:this.mode===`play`?this.input.driveLevel:r.driveLevel,falls:this.run.falls,phase:this.run.phase,airborne:i.airborne,mode:this.mode})}),this.canvas=t,this.audio=n,this.haptics=r,this.input=i,matchMedia(`(pointer: coarse)`).matches,this.quality=new URLSearchParams(location.search).get(`quality`)??localStorage.getItem(`gb.quality`)??`high`,this.renderer=new Lu({canvas:t,antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6)),this.renderer.outputColorSpace=Ke,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=.88,this.renderer.shadowMap.enabled=this.quality===`high`,this.renderer.shadowMap.type=2,this.camera=new np(innerWidth/innerHeight),this.post=new vp(this.renderer,this.scene,this.camera.cam),this.resize(),addEventListener(`resize`,()=>this.resize()),this.bus.subscribe((e,t)=>this.onSensory(e,t)),requestAnimationFrame(this.frame)}setQuality(e){this.quality=e,localStorage.setItem(`gb.quality`,e),this.renderer.shadowMap.enabled=e===`high`,this.dprCap=e===`high`?Math.min(devicePixelRatio,2):Math.min(devicePixelRatio,1.25),this.dpr=Math.min(this.dpr,this.dprCap),this.renderer.setPixelRatio(this.dpr),this.course&&this.load(this.course,this.mode)}resize(){let e=this.canvas.parentElement,t=e?.clientWidth||innerWidth,n=e?.clientHeight||innerHeight;this.renderer.setSize(t,n,!1),this.camera.resize(t/n),this.post?.setSize(t,n)}disposeScene(){this.scene.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose();let n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let e of n){for(let t of Object.values(e))t instanceof tn&&t.__shared;e.dispose()}}),this.scene=new Wn}load(e,t){this.finale=void 0,this.disposeScene(),this.course=e,this.mode=t,this.material=od[e.materialId],this.courseGeo=new nd(e.layout()),this.track=this.courseGeo.main,this.lastRib=-1,this.world=Nd(this.scene,this.renderer,this.courseGeo.all,this.material,this.quality),this.courseGeo.fitNets(this.world.groundHeight),this.hemiBase=-1;let n=this.courseGeo,r=e=>n.junctions.flatMap(t=>t.a===e?[{s0:t.aS[0],s1:t.aS[1],other:n.all[t.b]}]:t.b===e?[{s0:t.bS[0],s1:t.bS[1],other:n.all[t.a]}]:[]);this.trackGroup=Zd(this.track,this.material,this.world.groundHeight,!1,r(0),n.all,this.quality),this.scene.add(this.trackGroup),this.branchGroups=n.branches.map((e,t)=>{let i=Zd(e,this.material,this.world.groundHeight,!0,r(t+1),n.all,this.quality);return this.scene.add(i),i}),this.post.setScene(this.scene,this.camera.cam),this.run=new Cd(this.courseGeo,this.material),this.run.onPhase=t=>{this.cb.onPhase?.(t),t===`respawning`&&(this.camera.shake=.3),t===`running`&&!this.noSnap&&this.camera.snap(),t===`finished`&&this.mode===`play`&&!this.replay&&(this.lastRun=this.ghostRec.finish(e.id,this.run.finishTime,this.run.falls),this.startFinale())},this.ballView=new Kf(this.run.ball.tune.radius);{let e=this.material.visual,t=e=>{let t=new G(e);return .3*t.r+.59*t.g+.11*t.b};this.ballView.setWorldBrightness(Math.max(t(e.tint),e.transparent?t(e.fog):0))}this.scene.fog instanceof Un&&(this.fogBase={color:this.scene.fog.color.clone(),density:this.scene.fog.density});{let e=Jd[this.material.id]??Jd.wood;this.fogDark=new G(e.b).multiplyScalar(.035)}this.streaks=new kf;{let e=Jd[this.material.id]??Jd.wood;this.streaks.setPalette(e.a,e.b,e.psy)}if(this.scene.add(this.streaks.mesh),this.tubeThemes=new Mf(this.scene,this.courseGeo,e.id),this.applyCosmetics(),this.scene.add(this.ballView.group),this.ghostView=new qf(this.run.ball.tune.radius),this.scene.add(this.ghostView.group),this.scene.add(this.lineAhead.mesh,this.lineBehind.mesh),this.predBall=void 0,this.predPts=[],this.trailPts=[],this.fallsSeen=0,this.autoUsed=!1,this.applyTuning(),this.lineAhead.hide(),this.lineBehind.hide(),this.lastRun?.course!==e.id&&(this.lastRun=null,this.ghost=null),this.replay=null,this.autopilot=t===`play`?void 0:new wd(this.track),this.hintIndex=0,this.routeHint.clear(),this.previewTimer=t===`preview`?18:0,this.audio.configure(this.material),this.haptics.configure(this.material),this.camera.snap(),this.input.driveLevel=1,t!==`play`){let e=t===`preview`?Math.min(this.track.length*.12,220):6;this.run.launch(),this.run.ball.placeAt(e,16)}this.paused=!1,this.intro=null,t===`play`&&this.startIntro()}applyCosmetics(){this.ballView&&(this.ballView.setSkin(this.cosmetics.skin),this.ballView.setBeamColor(this.cosmetics.beam),this.ballView.setTrail(this.cosmetics.trail))}launch(){return this.mode!==`play`||!this.run||this.run.phase!==`ready`||this.paused?!1:this.intro?(this.intro.fire(),!0):(this.input.calibrate(),this.run.launch(),this.ghostRec.reset(),!0)}startFinale(){if(!this.run||!this.track||!this.course||!this.material)return;this.endFinale();let e=Jd[this.material.id]??Jd.wood,t=this.run.ball.track.layout.finishLine?this.run.ball.track:this.track;this.finale=new bf(this.scene,t,this.run.ball,gf[this.course.id]??`plinko`,this.audio,{a:e.a,b:e.b}),this.finaleReported=!1}endFinale(){this.finale?.dispose(),this.finale=void 0}skipFinale(){this.finale&&!this.finaleReported&&(this.finaleReported=!0,this.cb.onFinaleDone?.(this.finale.score,this.finale.kind))}restart(e=!1){this.run&&this.track&&(this.endFinale(),this.replay=null,this.ghostRec.reset(),this.autoUsed=!1,this.fallsSeen=0,this.trailPts=[],this.predPts=[],this.pro=new Df,this.pro.pace=this.autoPace,this.pro.insane=this.insane,!e&&this.lastRun&&(this.ghost=this.lastRun),this.camera.cam.fov=80,this.camera.cam.updateProjectionMatrix(),this.run.reset(),this.hintIndex=0,this.routeHint.clear(),this.camera.snap(),this.input.driveLevel=1,this.cb.onPhase?.(`ready`),this.showHints(0),this.startIntro())}showHints(e,t=0){if(!this.track||this.mode!==`play`)return;let n=t===0?this.track:this.courseGeo?.all[t];if(!n)return;let r=n.hints;if(t!==0){let n=this.routeHint.get(t)??0;for(;n<r.length&&e>=r[n].s;)this.cb.onHint?.(r[n].text),n++;this.routeHint.set(t,n)}else for(;this.hintIndex<r.length&&e>=r[this.hintIndex].s;)this.cb.onHint?.(r[this.hintIndex].text),this.hintIndex++}onSensory(e,t){if(this.mode===`attract`)this.audio.quiet();else{this.audio.update(e,t,this.dtLast),this.mode===`play`&&this.haptics.update(e,t,this.dtLast);for(let e of t)e.type===`MAGNETIC_CAPTURE`&&(this.ballView?.flashCapture(),this.camera.shake=Math.max(this.camera.shake,.55*this.speedFx),this.camera.punch(9)),e.type===`MAGNET_ENGAGED`&&(this.camera.shake=Math.max(this.camera.shake,.25*this.speedFx)),(e.type===`COLLISION_IMPACT`||e.type===`AIRBORNE_END`)&&e.intensity>.3&&(this.camera.shake=Math.max(this.camera.shake,e.intensity*.7*this.speedFx),this.camera.punch(e.intensity*6)),e.type===`JUMP`&&this.camera.punch(4),e.type===`DOUBLE_JUMP`&&this.camera.punch(8),e.type===`TURBO_ARMED`&&(this.camera.punch(6),this.mode===`play`&&this.cb.onHint?.(`TURBO READY — FLICK!`)),e.type===`TRIGGER_PAD`&&(this.camera.punch(3),this.mode===`play`&&this.cb.onHint?.(`HOLOGRAMS! ROLL THROUGH THEM FOR A BOOST`)),e.type===`HOLO_BOOST`&&(this.camera.punch(10),this.camera.shake=Math.max(this.camera.shake,.3*this.speedFx)),e.type===`TURBO_START`&&(this.camera.punch(16),this.camera.shake=Math.max(this.camera.shake,.6*this.speedFx))}}raceGhost(e){this.ghost=e,this.ghostOn=!0,this.restart(!0)}watch(e){this.restart(!0),this.endIntro(),this.replay=e,this.replayT=0,this.run?.launch()}stopReplay(){this.replay=null}get autoTrick(){return this.auto?this.pro.trick:``}setAutoPace(e){this.autoPace=Math.max(0,Math.min(1,e)),this.pro.pace=this.autoPace;try{localStorage.setItem(`gb.autoPace`,String(this.autoPace))}catch{}}setInsane(e){this.insane=e,e&&!this.auto&&this.setAuto(!0),this.pro.insane=e,this.applyTuning()}applyTuning(){if(!this.run)return;let e=this.run.ball.tune,t={...ld,...this.insane&&this.auto?cd:{}};for(let n of Object.keys(t)){let r=t[n];e[n]=Array.isArray(r)?[...r]:r}this.predBall=void 0}setAuto(e){this.auto=e,!e&&this.insane&&(this.insane=!1),this.pro=new Df,this.pro.pace=this.autoPace,this.pro.insane=this.insane,this.applyTuning(),this.predPts=[],this.trailPts=[],this.predTimer=0,e||(this.lineAhead.hide(),this.lineBehind.hide())}predictLine(){if(!this.run||!this.courseGeo||!this.material)return;let e=this.run.ball;this.predBall||(this.predBall=new xd(this.courseGeo,this.material,e.tune));let t=this.predBall,n=this.courseGeo.all.map(e=>e.time);t.copyStateFrom(e),t.predict=!0;let r=this.pro.clone(),i=this.insane?1/120:1/75,a=this.insane?170:135,o=[];for(let e=0;e<a;e++){let n=r.decide(t,i);if(t.step(i,n),t.events.length=0,!Number.isFinite(t.p.x))break;e%(this.insane?3:2)==0&&o.push({p:t.p.clone(),speed:t.v.length(),air:t.airborne})}this.courseGeo.all.forEach((e,t)=>{e.time=n[t]}),this.predPts=o}updateAutoVisuals(e){if(!this.run)return;let t=this.run.ball;if(!this.auto||this.run.phase!==`running`||this.finale||this.intro||this.replay){this.lineAhead.hide(),this.lineBehind.hide();return}this.predTimer-=e,this.predTimer<=0&&(this.predTimer=.22,this.predictLine());let n=0,r=1/0;for(let e=0;e<Math.min(30,this.predPts.length);e++){let i=this.predPts[e].p.distanceToSquared(t.p);i<r&&(r=i,n=e)}this.lineAhead.set(this.predPts,n,`ahead`),this.trailTimer-=e,this.trailTimer<=0&&(this.trailTimer=1/30,this.trailPts.push({p:t.p.clone(),speed:t.v.length(),air:t.airborne}),this.trailPts.length>100&&this.trailPts.shift());let i=this.trailPts[this.trailPts.length-2];i&&i.p.distanceTo(t.p)>20&&(this.trailPts=this.trailPts.slice(-1)),this.lineBehind.set(this.trailPts,0,`behind`,.8)}startIntro(){if(this.endIntro(),!this.introEnabled||this.mode!==`play`||!this.run||!this.courseGeo||!this.material)return;let e=Jd[this.material.id]??Jd.wood;this.intro=new Ef(this.scene,this.courseGeo,this.run.ball,this.audio,this.haptics,e.a)}endIntro(){this.intro?.dispose(),this.intro=null}skipIntro(){if(!this.intro||!this.run)return;let e=this.intro,t=e.done?e.power:.7,n=e.done;this.endIntro(),this.run.reset(),this.input.calibrate(),this.noSnap=n,this.run.launch(),this.noSnap=!1;let r=this.run.ball;r.v.addScaledVector(r.proj.T,wf(t)-7),r.w.copy(r.n).cross(r.v).multiplyScalar(1/r.tune.radius),n?this.camera.adopt(this.camera.cam.position,e.camLook,r.v):this.camera.snap(),this.ghostRec.reset()}};J(xp,`padHintShown`,!1);var Sp=[{id:`off`,name:`Off (sounds only)`},{id:`ambient`,name:`Ambient`},{id:`techno`,name:`Techno`},{id:`house`,name:`House`},{id:`rave`,name:`Rave (drum & bass)`},{id:`reggae`,name:`Reggae`},{id:`rock`,name:`Rock & roll`}],Cp=440,wp=e=>Cp*2**((e-69)/12),Tp={techno:[[45,[0,3,7,10]],[45,[0,3,7,10]],[41,[0,4,7,11]],[43,[0,4,7,10]]],house:[[45,[0,3,7,10]],[50,[0,3,7,10]],[43,[0,4,7,10]],[48,[0,4,7,11]]],rave:[[45,[0,3,7]],[41,[0,4,7]],[48,[0,4,7]],[43,[0,4,7]]],reggae:[[45,[0,3,7]],[50,[0,3,7]],[45,[0,3,7]],[52,[0,4,7]]],rock:[[45,[0,7,12]],[41,[0,7,12]],[48,[0,7,12]],[43,[0,7,12]]]},Ep={techno:128,house:124,rave:172,reggae:76,rock:124},Dp={techno:.9,house:.9,rave:.8,reggae:1.35,rock:.75},Op=class{constructor(e,t){J(this,`ctx`,void 0),J(this,`genre`,`off`),J(this,`level`,.5),J(this,`bus`,void 0),J(this,`filt`,void 0),J(this,`out`,void 0),J(this,`noise`,void 0),J(this,`dist`,void 0),J(this,`distIn`,void 0),J(this,`timer`,0),J(this,`step`,0),J(this,`nextT`,0),J(this,`intensity`,.5),this.ctx=e,this.bus=e.createGain(),this.filt=e.createBiquadFilter(),this.filt.type=`lowpass`,this.filt.frequency.value=6e3,this.filt.Q.value=.6,this.out=e.createGain(),this.out.gain.value=0,this.bus.connect(this.filt).connect(this.out).connect(t);let n=e.sampleRate;this.noise=e.createBuffer(1,n,e.sampleRate);let r=this.noise.getChannelData(0);for(let e=0;e<n;e++)r[e]=Math.random()*2-1;this.distIn=e.createGain(),this.dist=e.createWaveShaper();let i=new Float32Array(1024);for(let e=0;e<1024;e++){let t=e/1023*2-1;i[e]=Math.tanh(t*6)*.8}this.dist.curve=i,this.dist.oversample=`2x`;let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=3200,a.Q.value=.9;let o=e.createGain();o.gain.value=.35,this.distIn.connect(this.dist).connect(a).connect(o).connect(this.bus)}setGenre(e){this.genre=e;let t=e!==`off`&&e!==`ambient`,n=this.ctx.currentTime;this.out.gain.cancelScheduledValues(n),this.out.gain.setTargetAtTime(t?this.gainFor(e):0,n,.3),t&&!this.timer&&(this.step=0,this.nextT=n+.1,this.timer=window.setInterval(()=>this.schedule(),25)),!t&&this.timer&&(clearInterval(this.timer),this.timer=0)}setLevel(e){this.level=e,this.genre!==`off`&&this.genre!==`ambient`&&this.out.gain.setTargetAtTime(this.gainFor(this.genre),this.ctx.currentTime,.2)}setIntensity(e){this.intensity=Math.max(0,Math.min(1,e)),this.filt.frequency.setTargetAtTime(1400+16e3*this.intensity*this.intensity,this.ctx.currentTime,.3)}gainFor(e){return .22*this.level*(Dp[e]??1)}schedule(){let e=60/(Ep[this.genre]??120)/4;for(;this.nextT<this.ctx.currentTime+.12;){this.playStep(this.step,this.nextT,e);let t=this.genre===`reggae`?.16:this.genre===`house`?.06:0;this.nextT+=e*(this.step%2==0?1+t:1-t),this.step++}}playStep(e,t,n){let r=e%16,i=Math.floor(e/16),a=i%32,o=a>=24&&a<28,s=i%8==7&&r>=12,c=Tp[this.genre]??Tp.techno,[l,u]=c[Math.floor(i/(this.genre===`reggae`?1:2))%c.length],d=this.intensity;switch(this.genre){case`techno`:!o&&r%4==0&&this.kick(t,1),o||r!==4&&r!==12||this.clap(t,.7),r%4==2?this.hat(t,!0,.35):(d>.35||r%2==0)&&this.hat(t,!1,.18+r%2*.1),s&&this.snare(t,.4+.1*(r-12)),r!==3&&r!==11&&this.acid(t,wp(l-12+[0,0,12,0,3,0,7,12,0,10,0,3,0,12,7,5][r]),n*.9,r%4==0?1:.6,.5+.5*Math.sin(i*.4)),r===14&&i%2==1&&this.stab(t,u.map(e=>wp(l+12+e)),.25,.12,`sawtooth`),o&&r===0&&this.pad(t,u.map(e=>wp(l+12+e)),n*16,.08);break;case`house`:!o&&r%4==0&&this.kick(t,.95),o||r!==4&&r!==12||this.clap(t,.6),r%4==2&&this.hat(t,!0,.3),d>.25&&this.hat(t,!1,.08+r%2*.06),s&&this.clap(t,.3+.1*(r-12)),[0,3,6,10,13].includes(r)&&this.stab(t,u.map(e=>wp(l+12+e)),n*1.6,.11,`triangle`),r%4==2&&this.bass(t,wp(l-12+(r%8==2?0:12)),n*1.8,.5,`square`);break;case`rave`:o||r!==0&&r!==10||this.kick(t,1),o||r!==4&&r!==12||this.snare(t,.8),!o&&r===7&&i%2&&this.snare(t,.3),r%2==0&&this.hat(t,!1,.16),d>.5&&r%2==1&&this.hat(t,!1,.08),s&&this.snare(t,.35+.1*(r-12)),r===0&&this.reese(t,wp(l-12),n*15,.5),r%2==0&&a>=8&&this.lead(t,wp(l+12+u[0]+[0,7,12,7,3,7,12,15][r/2%8]),n*1.5,.06),o&&r===0&&this.pad(t,u.map(e=>wp(l+12+e)),n*16,.09);break;case`reggae`:{!o&&r===8&&(this.kick(t,.9),this.rim(t,.6)),r%2==0&&this.hat(t,!1,r%4==2?.14:.09),s&&this.rim(t,.3+.08*(r-12)),(r===4||r===12)&&this.skank(t,u.map(e=>wp(l+12+e)),.09),r%4==3&&this.organ(t,u.map(e=>wp(l+e)),n*.8,.05);let e=[0,null,null,0,7,null,10,null,12,null,10,7,null,5,3,null][r];e!==null&&this.bass(t,wp(l-12+e),n*1.6,.7,`sine`);break}case`rock`:o||r!==0&&r!==8&&r!==10||this.kick(t,.95),o||r!==4&&r!==12||this.snare(t,.85),r%2==0&&this.hat(t,r===14,.14),s&&this.snare(t,.45+.1*(r-12)),r%2==0&&this.guitar(t,u.map(e=>wp(l+e)),r===0?n*6:n*1.2,r===0?.55:.4),r%2==0&&this.bass(t,wp(l-12),n*1.5,.5,`sawtooth`)}}env(e,t,n,r){let i=this.ctx.createGain();return i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),e+n),i.gain.exponentialRampToValueAtTime(1e-4,e+n+r),i}osc(e,t,n,r,i,a=0){let o=this.ctx.createOscillator();return o.type=e,o.frequency.value=t,o.detune.value=a,o.connect(i),o.start(n),o.stop(n+r+.05),o}noiseHit(e,t,n){let r=this.ctx.createBufferSource();r.buffer=this.noise,r.connect(n),r.start(e,Math.random()*.5,t+.05)}kick(e,t){let n=this.ctx.createOscillator();n.type=`sine`,n.frequency.setValueAtTime(150,e),n.frequency.exponentialRampToValueAtTime(42,e+.12);let r=this.env(e,.9*t,.002,.32);n.connect(r).connect(this.bus),n.start(e),n.stop(e+.4)}snare(e,t){let n=this.ctx.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1800,n.Q.value=.8;let r=this.env(e,.45*t,.001,.16);this.noiseHit(e,.2,n),n.connect(r).connect(this.bus);let i=this.env(e,.25*t,.001,.08);this.osc(`triangle`,190,e,.1,i),i.connect(this.bus)}clap(e,t){let n=this.ctx.createBiquadFilter();n.type=`bandpass`,n.frequency.value=1200,n.Q.value=1.2,n.connect(this.bus);for(let r=0;r<3;r++){let i=this.env(e+r*.011,.35*t,.001,r===2?.14:.01);this.noiseHit(e+r*.011,.15,i),i.connect(n)}}rim(e,t){let n=this.env(e,.3*t,.001,.05);this.osc(`square`,820,e,.06,n),n.connect(this.bus)}hat(e,t,n){let r=this.ctx.createBiquadFilter();r.type=`highpass`,r.frequency.value=7500;let i=this.env(e,n*.5,.001,t?.22:.035);this.noiseHit(e,t?.25:.05,r),r.connect(i).connect(this.bus)}bass(e,t,n,r,i){let a=this.ctx.createBiquadFilter();a.type=`lowpass`,a.frequency.value=i===`sine`?900:700,a.Q.value=2;let o=this.env(e,.42*r,.004,n);this.osc(i,t,e,n,a),a.connect(o).connect(this.bus)}acid(e,t,n,r,i){let a=this.ctx.createBiquadFilter();a.type=`lowpass`,a.Q.value=14,a.frequency.setValueAtTime(300+2600*i*r,e),a.frequency.exponentialRampToValueAtTime(220,e+n);let o=this.env(e,.22*r,.003,n);this.osc(`sawtooth`,t,e,n,a),a.connect(o).connect(this.bus)}reese(e,t,n,r){let i=this.ctx.createBiquadFilter();i.type=`lowpass`,i.frequency.value=420,i.Q.value=3;let a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(.3*r,e+.05),a.gain.setValueAtTime(.3*r,e+n*.8),a.gain.exponentialRampToValueAtTime(1e-4,e+n),this.osc(`sawtooth`,t,e,n,i,-14),this.osc(`sawtooth`,t,e,n,i,14),i.connect(a).connect(this.bus)}stab(e,t,n,r,i){let a=this.ctx.createBiquadFilter();a.type=`lowpass`,a.frequency.value=2400;let o=this.env(e,r,.004,n);for(let r of t)this.osc(i,r,e,n,a,(Math.random()-.5)*10);a.connect(o).connect(this.bus)}pad(e,t,n,r){let i=this.ctx.createBiquadFilter();i.type=`lowpass`,i.frequency.setValueAtTime(400,e),i.frequency.linearRampToValueAtTime(3e3,e+n);let a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(r,e+n*.4),a.gain.exponentialRampToValueAtTime(1e-4,e+n);for(let r of t)this.osc(`sawtooth`,r,e,n,i,-8),this.osc(`sawtooth`,r,e,n,i,8);i.connect(a).connect(this.bus)}lead(e,t,n,r){let i=this.env(e,r,.005,n);this.osc(`square`,t,e,n,i),this.osc(`sawtooth`,t*1.005,e,n,i),i.connect(this.bus)}skank(e,t,n){let r=this.ctx.createBiquadFilter();r.type=`bandpass`,r.frequency.value=1400,r.Q.value=1.2;let i=this.env(e,n*2,.002,.09);for(let n of t)this.osc(`square`,n,e,.1,r);r.connect(i).connect(this.bus)}organ(e,t,n,r){let i=this.env(e,r,.005,n);for(let r of t)this.osc(`sine`,r*2,e,n,i),this.osc(`sine`,r*4,e,n,i);i.connect(this.bus)}guitar(e,t,n,r){let i=this.env(e,r,.003,n);for(let r of t)this.osc(`sawtooth`,r,e,n,i,-6),this.osc(`sawtooth`,r,e,n,i,6);i.connect(this.distIn)}},kp=class{constructor(){J(this,`ctx`,void 0),J(this,`enabled`,!0),J(this,`musicOn`,!0),J(this,`genre`,`ambient`),J(this,`musicLevel`,.5),J(this,`box`,void 0),J(this,`volume`,.9),J(this,`master`,void 0),J(this,`muffle`,void 0),J(this,`dry`,void 0),J(this,`wet`,void 0),J(this,`reverb`,void 0),J(this,`noise`,void 0),J(this,`roll`,void 0),J(this,`slide`,void 0),J(this,`wind`,void 0),J(this,`hum`,void 0),J(this,`ambience`,void 0),J(this,`music`,void 0),J(this,`mat`,void 0),J(this,`voices`,0),J(this,`lastSeam`,0),J(this,`birdTimer`,3),J(this,`musicTimer`,0),J(this,`chord`,0),J(this,`bubbleTimer`,0),J(this,`whooshSide`,1)}async unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e){this.enabled=!1;return}this.ctx=new e({latencyHint:`interactive`}),this.buildGraph()}this.ctx.state!==`running`&&await this.ctx.resume().catch(()=>{})}buildGraph(){let e=this.ctx;this.master=e.createGain(),this.master.gain.value=this.volume;let t=e.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=4,t.attack.value=.003,t.release.value=.15,this.muffle=e.createBiquadFilter(),this.muffle.type=`lowpass`,this.muffle.frequency.value=2e4,this.master.connect(this.muffle).connect(t).connect(e.destination),this.dry=e.createGain(),this.dry.connect(this.master),this.wet=e.createGain(),this.wet.gain.value=.2,this.reverb=e.createConvolver(),this.reverb.buffer=this.makeIR(2.4),this.wet.connect(this.reverb).connect(this.master),this.box=new Op(e,this.master),this.box.setLevel(this.musicLevel),this.box.setGenre(this.genre);let n=e.sampleRate*3;this.noise=e.createBuffer(1,n,e.sampleRate);let r=this.noise.getChannelData(0),i=0,a=0,o=0;for(let e=0;e<n;e++){let t=Math.random()*2-1;i=.99765*i+t*.099,a=.963*a+t*.2965,o=.57*o+t*1.0526,r[e]=(i+a+o+t*.1848)*.18}}makeIR(e){let t=this.ctx,n=Math.floor(t.sampleRate*e),r=t.createBuffer(2,n,t.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e);for(let e=0;e<n;e++){let r=e/n;t[e]=(Math.random()*2-1)*(1-r)**3.2*(e<40?e/40:1)}}return r}noiseSrc(){let e=this.ctx.createBufferSource();return e.buffer=this.noise,e.loop=!0,e.loopStart=Math.random()*1,e.loopEnd=3,e}send(e,t=1){if(e.connect(this.dry),t>0){let n=this.ctx.createGain();n.gain.value=t,e.connect(n).connect(this.wet)}}configure(e){if(!this.ctx){this.mat=e;return}this.stopLayers(),this.mat=e;let t=this.ctx,n=e.acoustic;{let e=this.noiseSrc(),r=t.createBiquadFilter();r.type=`lowpass`,r.frequency.value=n.rumbleHz*1.6,r.Q.value=2.5;let i=t.createGain();i.gain.value=0;let a=t.createGain();a.gain.value=0;let o=t.createBiquadFilter();o.type=`lowpass`,o.frequency.value=2e3;let s=[];for(let[r,i,a]of n.rollBands){let n=t.createBiquadFilter();n.type=`bandpass`,n.frequency.value=r,n.Q.value=i;let c=t.createGain();c.gain.value=a*2.2,e.connect(n).connect(c).connect(o),s.push(n)}let c=t.createGain();c.gain.value=1;let l=t.createOscillator();l.frequency.value=5;let u=t.createGain();u.gain.value=.18,l.connect(u).connect(c.gain),o.connect(a).connect(c),e.connect(r).connect(i).connect(c);let d=t.createGain();d.gain.value=1,c.connect(d),this.send(d,1),e.start(),l.start(),this.roll={src:e,rumble:r,rumbleGain:i,bands:s,bandGain:a,tone:o,am:c,amOsc:l,amDepth:u,out:d}}{let e=this.noiseSrc(),r=t.createBiquadFilter();r.type=`bandpass`,r.frequency.value=n.slideHz,r.Q.value=n.slideQ;let i=t.createGain();i.gain.value=0,e.connect(r).connect(i);let a=t.createOscillator();a.type=`sawtooth`,a.frequency.value=900;let o=t.createBiquadFilter();o.type=`bandpass`,o.frequency.value=1900,o.Q.value=8;let s=t.createGain();s.gain.value=0,a.connect(o).connect(s),this.send(i,1),this.send(s,1),e.start(),a.start(),this.slide={src:e,filt:r,gain:i,squeal:a,squealFilt:o,squealGain:s}}{let e=this.noiseSrc(),n=t.createBiquadFilter();n.type=`bandpass`,n.frequency.value=400,n.Q.value=.6;let r=t.createGain();r.gain.value=0,e.connect(n).connect(r),this.send(r,.3),e.start(),this.wind={src:e,filt:n,gain:r}}{let e=t.createOscillator();e.type=`sawtooth`,e.frequency.value=55;let n=t.createOscillator();n.type=`square`,n.frequency.value=110.6;let r=t.createBiquadFilter();r.type=`lowpass`,r.frequency.value=500,r.Q.value=6;let i=t.createGain();i.gain.value=0;let a=t.createOscillator();a.frequency.value=7;let o=t.createGain();o.gain.value=180,a.connect(o).connect(r.frequency);let s=t.createGain();s.gain.value=.35,e.connect(r),n.connect(s).connect(r),r.connect(i),this.send(i,.5),e.start(),n.start(),a.start(),this.hum={o1:e,o2:n,filt:r,gain:i,lfo:a,lfoGain:o}}{let e=this.noiseSrc(),n=t.createBiquadFilter();n.type=`lowpass`,n.frequency.value=600;let r=t.createGain();r.gain.value=.03,e.connect(n).connect(r).connect(this.master),e.start(),this.ambience={src:e,filt:n,gain:r}}this.startMusic(),this.wet.gain.value=n.reverb}startMusic(){let e=this.ctx,t=e.createGain();t.gain.value=this.genre===`ambient`?.05:0;let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=900,n.Q.value=.7;let r=[];for(let t=0;t<4;t++){let i=e.createOscillator();i.type=t%2?`triangle`:`sawtooth`,i.detune.value=(t-1.5)*7;let a=e.createGain();a.gain.value=.25,i.connect(a).connect(n),i.start(),r.push(i)}n.connect(t),this.send(t,.8),this.music={gain:t,voices:r,filt:n},this.setChord(0)}setChord(e){if(!this.music||!this.ctx)return;let t=[[146.8,220,293.7,370],[123.5,185,246.9,293.7],[98,146.8,196,246.9],[110,164.8,220,277.2]],n=t[e%t.length],r=this.ctx.currentTime;this.music.voices.forEach((e,t)=>e.frequency.setTargetAtTime(n[t],r,1.2))}setMusic(e){this.setGenre(e?`ambient`:`off`)}setGenre(e){this.genre=e,this.musicOn=e!==`off`,this.music&&this.ctx&&this.music.gain.gain.setTargetAtTime(e===`ambient`?.05:0,this.ctx.currentTime,.4),this.box?.setGenre(e)}setMusicLevel(e){this.musicLevel=e,this.box?.setLevel(e)}setVolume(e){this.volume=e,this.master&&this.ctx&&this.master.gain.setTargetAtTime(e,this.ctx.currentTime,.05)}stopLayers(){let e=e=>{try{e?.stop()}catch{}};e(this.roll?.src),e(this.roll?.amOsc),e(this.slide?.src),e(this.slide?.squeal),e(this.wind?.src),e(this.hum?.o1),e(this.hum?.o2),e(this.hum?.lfo),e(this.ambience?.src),this.music?.voices.forEach(t=>e(t)),this.roll=this.slide=this.wind=this.hum=this.ambience=this.music=void 0}quiet(){if(!this.ctx)return;let e=this.ctx.currentTime;this.roll?.out.gain.setTargetAtTime(0,e,.05),this.slide?.gain.gain.setTargetAtTime(0,e,.05),this.slide?.squealGain.gain.setTargetAtTime(0,e,.05),this.wind?.gain.gain.setTargetAtTime(0,e,.1),this.hum?.gain.gain.setTargetAtTime(0,e,.05)}update(e,t,n){if(!this.ctx||!this.enabled||!this.roll||!this.mat)return;let r=this.ctx.currentTime,i=this.mat.acoustic,a=.03,o=e.speed,s=Math.min(1,o/28);this.box?.setIntensity(o/55);let c=Math.max(0,Math.min(2.5,e.normalAccel/9.81)),l=Math.sqrt(c),u=+!!e.contact,d=e.rollingState===`rolling`?1:e.rollingState===`sliding`?.7:e.rollingState===`skidding`?.35:0,f=i.rollGain*s**.75*l*d*u;this.roll.bandGain.gain.setTargetAtTime(f*.9,r,a),this.roll.rumbleGain.gain.setTargetAtTime(f*1.4*(.5+.5*l),r,a),this.roll.out.gain.setTargetAtTime(1,r,a),this.roll.tone.frequency.setTargetAtTime(300+i.brightness*7e3*s*(.6+.4*l)+200*s,r,a),this.roll.rumble.frequency.setTargetAtTime(i.rumbleHz*(1.2+s*1.2),r,a);let p=e.angularSpeed/(2*Math.PI);this.roll.amOsc.frequency.setTargetAtTime(Math.max(.5,Math.min(40,p)),r,a);let m=Math.min(1,e.slipSpeed/4)*u;this.slide.gain.gain.setTargetAtTime(i.slideGain*m*(.4+.6*l)*1.6,r,a),this.slide.filt.frequency.setTargetAtTime(i.slideHz*(.8+.5*m),r,a),i.squeak&&(this.slide.squealGain.gain.setTargetAtTime(i.squeak*.12*Math.max(0,m-.15)*l,r,a),this.slide.squeal.frequency.setTargetAtTime(700+e.slipSpeed*140,r,a));let h=+!e.contact,g=+!!e.inTunnel;this.wind.gain.gain.setTargetAtTime(Math.min(.62,(o/30)**2*(.22+.25*h+.18*g)),r,.08),this.wind.filt.frequency.setTargetAtTime(250+o*(g?48:35),r,.08);let _=e.magnetActive?e.boosting?.3:.12+.16*e.magnetForce:0;this.hum.gain.gain.setTargetAtTime(_,r,.04),this.hum.filt.frequency.setTargetAtTime(e.boosting?900+o*45:350+e.magnetForce*1200,r,.05),this.hum.o1.frequency.setTargetAtTime(e.boosting?60+o*2.2:52+e.magnetForce*14,r,.05);let v=i.reverb+(e.inTunnel?.55:0);this.wet.gain.setTargetAtTime(v,r,.25),this.muffle.frequency.setTargetAtTime(e.submersion>.75?900:2e4,r,.08),this.birdTimer-=n,this.birdTimer<=0&&(this.birdTimer=2+Math.random()*6,[`wood`,`snow`,`mud`,`water`].includes(this.mat.id)&&!e.inTunnel&&this.bird()),this.musicTimer-=n,this.musicTimer<=0&&(this.musicTimer=6,this.setChord(++this.chord)),e.submersion>.1&&(this.bubbleTimer-=n*(.5+o/6),this.bubbleTimer<=0&&(this.bubbleTimer=.05+Math.random()*.25,this.bubble()));for(let n of t)this.onEvent(n,e)}onEvent(e,t){switch(e.type){case`COLLISION_IMPACT`:this.impact(e.intensity,e.source===`obstacle`?1.15:1);break;case`AIRBORNE_END`:e.intensity>.08&&this.impact(e.intensity*.9,.85);break;case`SURFACE_SEAM_CROSSING`:{let t=this.ctx.currentTime;t-this.lastSeam>.025&&(this.lastSeam=t,this.seam(e.intensity));break}case`LIFT_CLACK`:this.clack();break;case`TRIGGER_PAD`:this.chime(1318.5,.16),setTimeout(()=>this.chime(1975.5,.12),70);break;case`HOLO_BOOST`:this.whoosh(.9),this.sweep(300,1400,.3,.12,`triangle`),this.sweep(600,2800,.22,.05,`sine`);break;case`TURBO_ARMED`:this.sweep(400,1600,.35,.16,`triangle`),this.sweep(800,2400,.3,.1,`sine`);break;case`TURBO_START`:this.sweep(80,1800,.6,.28,`sawtooth`),this.sweep(50,30,.6,.3,`sine`);break;case`TURBO_END`:this.sweep(900,200,.4,.1,`triangle`);break;case`MAGNET_ENGAGED`:this.sweep(120,900,.28,.2,`sawtooth`),this.sweep(60,240,.25,.16,`sine`);break;case`MAGNET_RELEASED`:this.sweep(520,160,.12,.08,`triangle`);break;case`MAGNETIC_CAPTURE`:this.sweep(1400,260,.16,.18,`square`),this.sweep(110,40,.3,.24,`sine`);break;case`JUMP`:this.sweep(260,520,.1,.06,`sine`);break;case`NUDGE`:this.whoosh(.35+.4*e.intensity),this.impact(.12+.15*e.intensity,.5);break;case`BRAKE`:this.brakeScrape(.4+.5*e.intensity);break;case`PUSH`:this.impact(.25+.3*e.intensity,.6),this.whoosh(.5+.5*e.intensity);break;case`DOUBLE_JUMP`:this.sweep(420,1100,.16,.08,`triangle`),this.sweep(840,2200,.12,.03,`sine`);break;case`WATER_ENTRY`:this.splash(e.intensity);break;case`WATER_EXIT`:this.splash(.3)}}impact(e,t){if(this.voices>10||!this.mat)return;let n=this.ctx,r=this.mat.acoustic,i=n.currentTime,a=Math.min(1,e**.8)*.9*t,o=n.createGain();o.gain.value=a,this.send(o,1.2);let s=n.createBufferSource();s.buffer=this.noise,s.playbackRate.value=.8+Math.random()*.6;let c=n.createBiquadFilter();c.type=`bandpass`,c.frequency.value=(r.impactModes[0]?.[0]??300)*(2+Math.random()),c.Q.value=.9;let l=n.createGain(),u=.04+(1-this.mat.compliance)*.03;l.gain.setValueAtTime(r.impactNoise*1.4,i),l.gain.exponentialRampToValueAtTime(.001,i+u),s.connect(c).connect(l).connect(o),s.start(i,Math.random()*2,u+.02);let d=u;for(let[t,a]of r.impactModes){let s=n.createOscillator();s.type=`sine`,s.frequency.value=t*(.94+Math.random()*.12)*(1+(1-e)*.05);let c=n.createGain(),l=a*(.7+e*.6);c.gain.setValueAtTime((1-r.impactNoise*.5)*.5/r.impactModes.length*2,i),c.gain.exponentialRampToValueAtTime(8e-4,i+l),s.connect(c).connect(o),s.start(i),s.stop(i+l+.02),d=Math.max(d,l)}this.voices++,setTimeout(()=>{this.voices--,o.disconnect()},(d+.1)*1e3)}plungerTick(e){if(!this.ctx||!this.noise)return;let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noise;let i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=2600+e*1800,i.Q.value=8;let a=t.createGain();a.gain.setValueAtTime(.16,n),a.gain.exponentialRampToValueAtTime(.001,n+.03),r.connect(i).connect(a),this.send(a,.25),r.start(n,Math.random()*2,.04);let o=t.createOscillator();o.type=`triangle`,o.frequency.setValueAtTime(420+e*520,n),o.frequency.exponentialRampToValueAtTime(380+e*480,n+.06);let s=t.createGain();s.gain.setValueAtTime(.035,n),s.gain.exponentialRampToValueAtTime(8e-4,n+.07),o.connect(s),this.send(s,.2),o.start(n),o.stop(n+.08)}plungerRelease(e){if(!this.ctx||!this.noise)return;let t=this.ctx,n=t.currentTime,r=.3+.7*e,i=t.createGain();i.gain.value=r,this.send(i,.5);let a=t.createBufferSource();a.buffer=this.noise;let o=t.createBiquadFilter();o.type=`lowpass`,o.frequency.value=1400;let s=t.createGain();s.gain.setValueAtTime(.7,n),s.gain.exponentialRampToValueAtTime(.001,n+.09),a.connect(o).connect(s).connect(i),a.start(n,Math.random()*2,.1);let c=t.createOscillator();c.type=`sine`,c.frequency.setValueAtTime(160,n),c.frequency.exponentialRampToValueAtTime(55,n+.14);let l=t.createGain();l.gain.setValueAtTime(.6,n),l.gain.exponentialRampToValueAtTime(.001,n+.16),c.connect(l).connect(i),c.start(n),c.stop(n+.18);for(let[e,r,a]of[[1240,.35,.12],[1873,.28,.08],[2731,.2,.05],[3610,.14,.03]]){let o=t.createOscillator();o.type=`sine`,o.frequency.value=e*(.98+Math.random()*.04);let s=t.createGain();s.gain.setValueAtTime(a,n),s.gain.exponentialRampToValueAtTime(5e-4,n+r),o.connect(s).connect(i),o.start(n),o.stop(n+r+.02)}let u=t.createOscillator();u.type=`triangle`,u.frequency.setValueAtTime(300+e*120,n),u.frequency.exponentialRampToValueAtTime(95,n+.55);let d=t.createOscillator();d.frequency.value=26;let f=t.createGain();f.gain.setValueAtTime(40,n),f.gain.exponentialRampToValueAtTime(1,n+.55),d.connect(f).connect(u.frequency);let p=t.createGain();p.gain.setValueAtTime(1e-4,n),p.gain.exponentialRampToValueAtTime(.12,n+.01),p.gain.exponentialRampToValueAtTime(5e-4,n+.6);let m=t.createBiquadFilter();m.type=`lowpass`,m.frequency.value=1800,u.connect(m).connect(p).connect(i),u.start(n),d.start(n),u.stop(n+.62),d.stop(n+.62),setTimeout(()=>i.disconnect(),900)}themeSound(e){if(this.ctx){if(e===`firework`){this.pop(!0);for(let e=1;e<=3;e++)setTimeout(()=>this.pop(!1),90+e*70+Math.random()*60)}else if(e===`haunted`)this.sweep(220+Math.random()*60,110,.9,.05,`sine`),this.sweep(330+Math.random()*80,160,.8,.025,`triangle`);else if(e===`pinball`){let e=[1046.5,1318.5,1568,2093][Math.floor(Math.random()*4)];this.chime(e,.12),setTimeout(()=>this.chime(e*1.5,.08),60)}}}clack(){let e=this.ctx,t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise;let r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.value=2200+Math.random()*300,r.Q.value=6;let i=e.createGain();i.gain.setValueAtTime(.18,t),i.gain.exponentialRampToValueAtTime(.001,t+.035),n.connect(r).connect(i),this.send(i,.3),n.start(t,Math.random()*2,.05);let a=e.createOscillator();a.type=`square`,a.frequency.setValueAtTime(180,t);let o=e.createGain();o.gain.setValueAtTime(.05,t),o.gain.exponentialRampToValueAtTime(.001,t+.03),a.connect(o),this.send(o,.2),a.start(t),a.stop(t+.04)}seam(e){if(!this.mat||this.mat.acoustic.seamGain<=0)return;let t=this.ctx,n=this.mat.acoustic,r=t.currentTime,i=t.createBufferSource();i.buffer=this.noise;let a=t.createBiquadFilter();a.type=`bandpass`,a.frequency.value=(n.rollBands[1]?.[0]??400)*(1.6+Math.random()*.4),a.Q.value=3;let o=t.createGain();o.gain.setValueAtTime(n.seamGain*Math.min(1,e)*.7,r),o.gain.exponentialRampToValueAtTime(.001,r+.02),i.connect(a).connect(o),this.send(o,.6),i.start(r,Math.random()*2,.04)}sweep(e,t,n,r,i){let a=this.ctx,o=a.currentTime,s=a.createOscillator();s.type=i,s.frequency.setValueAtTime(e,o),s.frequency.exponentialRampToValueAtTime(t,o+n);let c=a.createGain();c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(r,o+.015),c.gain.exponentialRampToValueAtTime(1e-4,o+n);let l=a.createBiquadFilter();l.type=`lowpass`,l.frequency.value=3e3,s.connect(l).connect(c),this.send(c,.5),s.start(o),s.stop(o+n+.02)}bird(){let e=this.ctx,t=e.currentTime,n=2+Math.floor(Math.random()*4),r=2200+Math.random()*1800,i=e.createGain();i.gain.value=.025;let a=e.createStereoPanner?e.createStereoPanner():null;a?(a.pan.value=Math.random()*2-1,i.connect(a).connect(this.wet),a.connect(this.master)):i.connect(this.master);for(let a=0;a<n;a++){let n=e.createOscillator();n.type=`sine`;let o=t+a*.13;n.frequency.setValueAtTime(r,o),n.frequency.exponentialRampToValueAtTime(r*(1.3+Math.random()*.4),o+.07);let s=e.createGain();s.gain.setValueAtTime(1e-4,o),s.gain.exponentialRampToValueAtTime(1,o+.01),s.gain.exponentialRampToValueAtTime(1e-4,o+.09),n.connect(s).connect(i),n.start(o),n.stop(o+.1)}}bubble(){let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`sine`;let r=400+Math.random()*900;n.frequency.setValueAtTime(r,t),n.frequency.exponentialRampToValueAtTime(r*1.8,t+.05);let i=e.createGain();i.gain.setValueAtTime(.04,t),i.gain.exponentialRampToValueAtTime(1e-4,t+.06),n.connect(i),this.send(i,.4),n.start(t),n.stop(t+.07)}splash(e){let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noise;let i=t.createBiquadFilter();i.type=`bandpass`,i.frequency.value=1200,i.Q.value=.5;let a=t.createGain();a.gain.setValueAtTime(.5*e+.1,n),a.gain.exponentialRampToValueAtTime(.001,n+.5),r.connect(i).connect(a),this.send(a,.8),r.start(n,0,.55)}whoosh(e){if(!this.ctx||e<.05)return;let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noise,r.playbackRate.value=1.2;let i=t.createBiquadFilter();i.type=`bandpass`,i.Q.value=1.2,i.frequency.setValueAtTime(2400,n),i.frequency.exponentialRampToValueAtTime(500,n+.22);let a=t.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(.16*e,n+.03),a.gain.exponentialRampToValueAtTime(1e-4,n+.25);let o=a;if(t.createStereoPanner){let e=t.createStereoPanner();e.pan.value=.4*this.whooshSide,this.whooshSide*=-1,a.connect(e),o=e}r.connect(i).connect(a),o.connect(this.dry),r.start(n,Math.random()*2,.3)}brakeScrape(e){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noise,r.playbackRate.value=.8;let i=t.createBiquadFilter();i.type=`bandpass`,i.Q.value=3,i.frequency.setValueAtTime(1800,n),i.frequency.exponentialRampToValueAtTime(260,n+.38);let a=t.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(.22*e,n+.04),a.gain.exponentialRampToValueAtTime(1e-4,n+.42),r.connect(i).connect(a).connect(this.dry),r.start(n,Math.random()*2,.45)}clink(e){this.ctx&&this.mat&&this.impact(Math.min(1,e),.9)}clack2(e=.6){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,r=t.createOscillator();r.type=`triangle`,r.frequency.value=900+Math.random()*500;let i=t.createGain();i.gain.setValueAtTime(.16*e,n),i.gain.exponentialRampToValueAtTime(.001,n+.05),r.connect(i),this.send(i,.3),r.start(n),r.stop(n+.06)}chime(e,t=.25){if(!this.ctx)return;let n=this.ctx,r=n.currentTime;for(let[i,a,o]of[[1,1,1.4],[2.76,.35,.5],[5.4,.15,.25]]){let s=n.createOscillator();s.type=`sine`,s.frequency.value=e*i;let c=n.createGain();c.gain.setValueAtTime(t*a,r),c.gain.exponentialRampToValueAtTime(5e-4,r+o),s.connect(c),this.send(c,.6),s.start(r),s.stop(r+o+.05)}}bell(e=330){if(!this.ctx)return;let t=this.ctx,n=t.currentTime;for(let[r,i,a]of[[.5,.5,4],[1,.8,3.5],[1.19,.4,2.8],[1.56,.3,2.2],[2,.35,2],[2.66,.2,1.5],[3,.15,1.2]]){let o=t.createOscillator();o.type=`sine`,o.frequency.value=e*r;let s=t.createGain();s.gain.setValueAtTime(.2*i,n),s.gain.exponentialRampToValueAtTime(5e-4,n+a),o.connect(s),this.send(s,.9),o.start(n),o.stop(n+a+.05)}}whir(e){!this.ctx||Math.random()>.5||this.sweep(200+900*e,220+1e3*e,.08,.03+.04*e,`triangle`)}pop(e=!1){if(!this.ctx)return;let t=this.ctx,n=t.currentTime,r=t.createBufferSource();r.buffer=this.noise;let i=t.createBiquadFilter();i.type=`lowpass`,i.frequency.value=e?1200:3e3;let a=t.createGain();a.gain.setValueAtTime(e?.5:.2,n),a.gain.exponentialRampToValueAtTime(.001,n+(e?.8:.15)),r.connect(i).connect(a),this.send(a,.8),r.start(n,Math.random(),1)}fanfare(){this.ctx&&[523.3,659.3,784,1046.5].forEach((e,t)=>setTimeout(()=>this.chime(e,.22),t*110))}ui(e=`tap`){this.ctx&&(e===`reward`?this.sweep(440,1320,.35,.12,`triangle`):this.sweep(e===`tap`?900:600,e===`tap`?1200:900,.06,.05,`sine`))}},Ap=class{constructor(){J(this,`tier`,`basic`)}pulse(e,t){let n=Math.max(4,Math.round(e*(.4+.6*t))),r=navigator.userActivation;if(!r||r.hasBeenActive)try{navigator.vibrate(n)}catch{}}},jp=class{constructor(){J(this,`tier`,`tick`),J(this,`label`,void 0),J(this,`last`,0);let e=document.createElement(`input`);e.type=`checkbox`,e.setAttribute(`switch`,``),e.id=`gb-haptic-switch`,e.style.cssText=`position:fixed;left:-100px;top:-100px;opacity:0;pointer-events:none;`,this.label=document.createElement(`label`),this.label.htmlFor=e.id,this.label.style.cssText=`position:fixed;left:-100px;top:-100px;opacity:0;pointer-events:none;`,document.body.append(e,this.label)}pulse(e,t){let n=performance.now();t<.35||n-this.last<70||(this.last=n,this.label.click())}},Mp=class{constructor(){J(this,`tier`,`none`)}pulse(){}};function Np(){let e=window.__GUTTERBALL_NATIVE_HAPTICS__;if(e)return e;if(typeof navigator<`u`&&typeof navigator.vibrate==`function`)return new Ap;let t=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1,n=/iPad/.test(navigator.userAgent)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1;return t&&!n?new jp:new Mp}var Pp=class{constructor(e){J(this,`enabled`,!0),J(this,`intensity`,1),J(this,`driver`,void 0),J(this,`mat`,void 0),J(this,`budget`,1),J(this,`rollTimer`,0),J(this,`lastPulseAt`,0),J(this,`busyUntil`,0),this.driver=e??Np()}configure(e){this.mat=e}get tier(){return this.enabled?this.driver.tier:`none`}tap(e,t,n=2){this.fire(e,t,n)}fire(e,t,n){if(!this.enabled||this.driver.tier===`none`)return;let r=performance.now();if(r<this.busyUntil&&n<2)return;let i=e/1e3;this.budget<i&&n<3||(this.budget-=i,this.busyUntil=r+e+12,this.lastPulseAt=r,this.driver.pulse(e,Math.min(1,t*this.intensity)))}update(e,t,n){if(this.budget=Math.min(.3,this.budget+n*.25),!this.mat)return;let r=this.mat.haptic;for(let e of t)switch(e.type){case`COLLISION_IMPACT`:e.intensity>.08&&this.fire(12+30*e.intensity*r.impactScale,e.intensity,3);break;case`AIRBORNE_END`:e.intensity>.1&&this.fire(10+24*e.intensity*r.impactScale,e.intensity,3);break;case`MAGNETIC_CAPTURE`:this.fire(40,1,3);break;case`TURBO_ARMED`:this.fire(20,.7,2);break;case`TURBO_START`:this.fire(70,1,3);break;case`MAGNET_ENGAGED`:this.fire(22,.8,2);break;case`JUMP`:this.fire(10,.5,2);break;case`NUDGE`:this.fire(10+8*e.intensity,.7,2);break;case`BRAKE`:this.fire(18+12*e.intensity,.3,2);break;case`PUSH`:this.fire(12+10*e.intensity,.6,2);break;case`DOUBLE_JUMP`:this.fire(16,.7,2);break;case`SURFACE_SEAM_CROSSING`:r.seamPulse>0&&e.intensity>.15&&this.fire(r.seamPulse,e.intensity,1);break;case`WATER_ENTRY`:this.fire(30,.6,2);break;case`HOLO_BOOST`:this.fire(30,.8,2);break;case`LIFT_CLACK`:this.fire(6,.35,1)}if(e.contact&&r.rollTexture>.05&&e.speed>3){let t=r.rollTexture*Math.min(1,e.speed/25)*Math.min(1.5,Math.sqrt(Math.max(0,e.normalAccel)/9.81)),i=e.rollingState===`rolling`?1:1.4;this.rollTimer-=n*t*i*9,this.rollTimer<=0&&(this.rollTimer=.6+Math.random()*.8,this.fire(5+4*t,t,0))}e.inTunnel&&e.speed>42&&performance.now()-this.lastPulseAt>180-Math.min(80,(e.speed-42)*3)&&this.fire(6,Math.min(.7,(e.speed-42)/40),0),e.magnetActive&&e.magnetForce>.3&&performance.now()-this.lastPulseAt>110&&this.fire(8,Math.min(1,e.magnetForce*.9),0)}test(){this.fire(40,1,3)}},Fp=180/Math.PI;function Ip(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r);return[e*i-t*a,e*a+t*i]}function Lp(e,t,n,r){let[i,a]=Ip(e,t,r);return{roll:Math.atan2(-i,Math.hypot(a,n))*Fp,pitch:Math.atan2(a,n)*Fp}}function Rp(e){return((e+180)%360+360)%360-180}function zp(e,t,n,r,i=.72){let a=Math.abs(e);if(a<=t)return 0;let o=Math.max(t+1,n/Math.max(.2,r)),s=Math.min(1,(a-t)/(o-t));return Math.sign(e)*s**+i}var Bp={sensitivity:1.8,deadzone:.6,maxTilt:16,jumpThreshold:7,magnetThreshold:9,invertSteer:!1,keepView:!0};function Vp(){let e=window.orientation;if(typeof e==`number`)return e;let t=screen.orientation;return t&&typeof t.angle==`number`?t.angle>180?t.angle-360:t.angle:0}var Hp=class{constructor(e){J(this,`el`,void 0),J(this,`mode`,`keyboard`),J(this,`settings`,{...Bp}),J(this,`sensorAvailable`,!1),J(this,`sensorPermission`,`unknown`),J(this,`driveLevel`,1),J(this,`displayRotation`,0),J(this,`onLaunch`,void 0),J(this,`onDriveChange`,void 0),J(this,`onRestart`,void 0),J(this,`onPause`,void 0),J(this,`keys`,new Set),J(this,`steerSmooth`,0),J(this,`jumpQueued`,!1),J(this,`hasMotion`,!1),J(this,`hasOrientation`,!1),J(this,`g`,[0,0,0]),J(this,`motionSign`,/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1?-1:1),J(this,`signVotes`,0),J(this,`signLocked`,!1),J(this,`lockAngle`,0),J(this,`roll`,0),J(this,`pitch`,0),J(this,`roll0`,0),J(this,`pitch0`,60),J(this,`beta`,0),J(this,`gamma`,0),J(this,`pitchHistory`,[]),J(this,`jumpArmed`,!0),J(this,`magnetTilt`,!1),J(this,`lastTiltAt`,0),J(this,`magnetBlockUntil`,0),J(this,`magnetSince`,0),J(this,`enabled`,!0),J(this,`brakeQueued`,0),J(this,`nudgeQueued`,0),J(this,`pushQueued`,0),J(this,`touches`,new Map),J(this,`onThumbTap`,void 0),J(this,`mouseStart`,null),this.el=e,window.addEventListener(`keydown`,e=>this.onKey(e,!0)),window.addEventListener(`keyup`,e=>this.onKey(e,!1)),e.addEventListener(`touchstart`,e=>this.onTouchStart(e),{passive:!1}),e.addEventListener(`touchmove`,e=>this.onTouchMove(e),{passive:!1}),e.addEventListener(`touchend`,e=>this.onTouchEnd(e),{passive:!1}),e.addEventListener(`touchcancel`,e=>this.onTouchEnd(e),{passive:!1}),e.addEventListener(`pointerdown`,e=>{e.pointerType===`mouse`&&this.onMouseDown(e)}),window.addEventListener(`pointerup`,e=>{e.pointerType===`mouse`&&this.onMouseUp(e)}),window.addEventListener(`deviceorientation`,e=>this.onOrientation(e)),window.addEventListener(`devicemotion`,e=>this.onMotion(e)),matchMedia(`(pointer: coarse)`).matches&&(this.mode=`tilt`)}async requestSensors(){let e=window.DeviceOrientationEvent,t=window.DeviceMotionEvent;if(!e&&!t)return this.sensorPermission=`denied`,!1;try{let n=[];t&&typeof t.requestPermission==`function`&&n.push(t.requestPermission()),e&&typeof e.requestPermission==`function`&&n.push(e.requestPermission());let r=await Promise.all(n.map(e=>e.catch(()=>`denied`)));this.sensorPermission=r.length===0||r.some(e=>e===`granted`)?`granted`:`denied`}catch{this.sensorPermission=`denied`}return this.sensorPermission===`granted`&&(await new Promise(e=>setTimeout(e,300)),this.hasMotion||this.hasOrientation)?(this.mode=`tilt`,this.calibrate(),!0):!1}calibrate(){this.lockAngle=Vp(),this.updateTilt(),this.roll0=this.roll,this.pitch0=this.pitch,this.pitchHistory.length=0,this.jumpArmed=!0,this.magnetTilt=!1}onMotion(e){let t=e.accelerationIncludingGravity;if(!t||t.x==null||t.y==null||t.z==null)return;let n=this.motionSign,r=t.x*n,i=t.y*n,a=t.z*n;this.hasMotion||(this.g=[r,i,a],this.hasMotion=!0,this.sensorAvailable=!0);let o=.35;this.g[0]+=(r-this.g[0])*o,this.g[1]+=(i-this.g[1])*o,this.g[2]+=(a-this.g[2])*o,this.updateTilt(),this.afterTilt()}onOrientation(e){if(e.beta!=null&&e.gamma!=null){if(this.beta=e.beta,this.gamma=e.gamma,this.hasOrientation||(this.hasOrientation=!0,this.sensorAvailable=!0),this.hasMotion&&!this.signLocked&&this.lockAngle===0&&Math.abs(e.gamma)>8&&Math.abs(e.gamma)<50&&Math.abs(e.beta)<60){let t=Lp(this.g[0],this.g[1],this.g[2],0).roll;Math.abs(t)>5&&(this.signVotes+=Math.sign(t)===Math.sign(e.gamma)?1:-1,this.signVotes<=-12&&(this.motionSign*=-1,this.g=this.g.map(e=>-e),this.signVotes=0,this.signLocked=!0,this.calibrate()),this.signVotes>=12&&(this.signLocked=!0))}this.hasMotion||(this.updateTilt(),this.afterTilt())}}updateTilt(){if(this.hasMotion){let e=Lp(this.g[0],this.g[1],this.g[2],this.lockAngle);this.roll=e.roll,this.pitch=e.pitch}else this.hasOrientation&&(this.roll=this.gamma,this.pitch=this.beta)}afterTilt(){let e=performance.now(),t=Rp(this.pitch-this.pitch0);for(this.pitchHistory.push([e,t]);this.pitchHistory.length&&e-this.pitchHistory[0][0]>380;)this.pitchHistory.shift();if(this.mode!==`tilt`)return;let n=this.pitchHistory[0]?.[1]??t;if(this.jumpArmed&&t>this.settings.jumpThreshold&&t-n>this.settings.jumpThreshold*.35&&(this.jumpQueued=!0,this.jumpArmed=!1,this.magnetBlockUntil=e+450,this.magnetTilt=!1),!this.jumpArmed&&t<this.settings.jumpThreshold*.65&&(this.jumpArmed=!0,this.pitchHistory.length=0),t<-this.settings.magnetThreshold&&e>this.magnetBlockUntil?(this.magnetSince||(this.magnetSince=e),!this.magnetTilt&&e-this.magnetSince>80&&(this.magnetTilt=!0)):this.magnetSince=0,this.magnetTilt&&t>-this.settings.magnetThreshold*.45&&(this.magnetTilt=!1),!this.magnetTilt&&this.jumpArmed&&Math.abs(t)<4){let t=this.lastTiltAt?Math.min(.1,(e-this.lastTiltAt)/1e3):0;this.pitch0+=Rp(this.pitch-this.pitch0)*Math.min(1,t/4)}this.lastTiltAt=e}onKey(e,t){if(!this.enabled)return;let n=e.key.toLowerCase();t&&!this.keys.has(n)&&(n===` `&&(this.jumpQueued=!0),(n===`arrowup`||n===`w`)&&this.swipe(1),(n===`arrowdown`||n===`s`)&&this.swipe(-1),n===`q`&&this.swipe(0,.7,-1),n===`e`&&this.swipe(0,.7,1),n===`r`&&this.onRestart?.(),(n===`escape`||n===`p`)&&this.onPause?.(),n===`enter`&&this.onLaunch?.(),n===`c`&&this.calibrate()),[`arrowleft`,`arrowright`,`arrowup`,`arrowdown`,` `].includes(n)&&e.preventDefault(),t?this.keys.add(n):this.keys.delete(n),t&&this.mode!==`tilt`&&(this.mode=`keyboard`)}swipe(e,t=.6,n=0){if(e>0&&Math.abs(n)<.4&&this.onLaunch&&this.onLaunch()===!0)return;let r=Math.max(-1,Math.min(1,e));r>.35&&(this.pushQueued=Math.max(this.pushQueued,t*Math.min(1,(r-.2)/.6))),r<-.35&&(this.brakeQueued=Math.max(this.brakeQueued,t*Math.min(1,(-r-.2)/.6))),Math.abs(n)>.35&&(this.nudgeQueued=Math.max(-1,Math.min(1,this.nudgeQueued+Math.sign(n)*Math.min(1,(Math.abs(n)-.2)/.6)*Math.max(.5,t))))}onTouchStart(e){if(this.enabled){e.preventDefault();for(let t of Array.from(e.changedTouches))this.touches.set(t.identifier,{x:t.clientX,y:t.clientY,t:performance.now()})}}onTouchMove(e){e.preventDefault()}onTouchEnd(e){e.preventDefault();for(let t of Array.from(e.changedTouches)){let e=this.touches.get(t.identifier);if(this.touches.delete(t.identifier),!e||!this.enabled)continue;let[n,r]=this.rot(t.clientX-e.x,t.clientY-e.y),i=performance.now()-e.t,a=Math.hypot(n,r);if(a>40&&i<(r>Math.abs(n)?1200:700)){let e=a/Math.max(1,i),t=-r/a,o=n/a,s=t<-.7?Math.max(.35,Math.min(1,1.2-e*.6)):Math.max(.15,Math.min(1,(e-.25)/1.6));this.swipe(t,s,o)}else i<300&&Math.hypot(n,r)<24&&this.isEdgeTap(e.x,e.y)&&(this.swipe(1,.75),this.onThumbTap?.())}}isEdgeTap(e,t){let n=window.innerWidth,r=window.innerHeight,[i,a]=this.rot(e-n/2,t-r/2),o=Math.abs(this.displayRotation)%180==90,s=o?r:n;return a<-(o?n:r)*.36?!1:Math.abs(i)>s*.27}rot(e,t){let n=-this.displayRotation*Math.PI/180,r=Math.cos(n),i=Math.sin(n);return[e*r-t*i,e*i+t*r]}onMouseDown(e){this.mouseStart={x:e.clientX,y:e.clientY,t:performance.now()}}onMouseUp(e){if(!this.mouseStart)return;let t=e.clientY-this.mouseStart.y,n=e.clientX-this.mouseStart.x,r=Math.hypot(n,t);r>60&&this.swipe(-t/r,.6,n/r),this.mouseStart=null}sample(e){let t=0,n=!1;this.mode===`tilt`&&(t=zp(Rp(this.roll-this.roll0),this.settings.deadzone,this.settings.maxTilt,this.settings.sensitivity),n=this.magnetTilt);let r=this.keys.has(`arrowleft`)||this.keys.has(`a`),i=this.keys.has(`arrowright`)||this.keys.has(`d`);(r||i)&&(t=!!i-+!!r),(this.keys.has(`shift`)||this.keys.has(`m`)||this.keys.has(`f`))&&(n=!0),this.settings.invertSteer&&(t=-t),t=Math.max(-1,Math.min(1,t));let a=this.mode===`keyboard`?10:30;this.steerSmooth+=(t-this.steerSmooth)*Math.min(1,e*a);let o=this.jumpQueued;this.jumpQueued=!1;let s=this.pushQueued;this.pushQueued=0;let c=this.brakeQueued;this.brakeQueued=0;let l=this.nudgeQueued;return this.nudgeQueued=0,this.settings.invertSteer&&(l=-l),{steer:this.steerSmooth,magnet:n,jump:o,driveLevel:this.driveLevel,push:s,brake:c,nudge:l}}tiltReadout(){let e=Rp(this.roll-this.roll0);return{pitch:Rp(this.pitch-this.pitch0),roll:e,steer:zp(e,this.settings.deadzone,this.settings.maxTilt,this.settings.sensitivity),has:this.hasMotion||this.hasOrientation,source:this.hasMotion?`gravity`:this.hasOrientation?`orientation`:`none`}}},Up=(e,t)=>Math.max(-55,Math.min(55,e/Math.max(20,t)*60*2.2));function Wp(e,t=e.fit){let[n,r,i,a,o,s]=t,[c,l]=e.lens;return[{exact:!0,len:e.deckLen,pitch:e.pitch,widen:e.widen??1.7,label:`${e.id}Deck`,fx:{pulse:1}},{exact:!0,len:30,pitch:e.pitch,tube:!0,fx:{flow:-1.5}},{exact:!0,len:c,yaw:n,pitch:r,bank:Up(n,c),tube:!0,label:`${e.id}Tube`,fx:e.fx??{twist:1.2,flow:-1}},{exact:!0,len:l,yaw:i,pitch:a,bank:Up(i,l),tube:!0,fx:{flow:-2}},{exact:!0,len:40,pitch:o,bank:(e.mergeBank??0)*.5,tube:!0,fx:{flow:1}},{exact:!0,len:70,yaw:s,pitch:o,bank:e.mergeBank??0,label:`${e.id}Merge`}]}function Gp(e){return{id:e.id,name:e.name,at:e.at,s:e.s,offset:e.offset,yawOffset:e.yawOffset,startPitch:e.pitch,startBank:0,segments:Wp(e),rejoin:e.merge,junction:`auto`,mergeOnly:!0}}var Kp={wood:[{id:`skyTreetop`,name:`Treetop Line`,at:`camels`,s:120,offset:[4,17.5],yawOffset:0,pitch:8,deckLen:120,merge:{at:`finish`,s:50},lens:[100,115],fit:[85.12,-28.1,-92.42,-23.2,-4.97,7.4]}],rubber:[{id:`skyHook`,name:`Skyhook`,at:`tower2`,s:238,offset:[2.2,22],yawOffset:-8,pitch:-11,deckLen:90,merge:{at:`finish`,s:30},lens:[120,125],fit:[92.29,-17.5,28.85,-22.65,-5.26,-23.14]}]},qp=e=>(Kp[e]??[]).map(Gp),Jp=(e,t=-68,n=0,r={})=>{let i=e*Math.sin(26*Math.PI/180),a=n||Math.max(50,i*1.15);return[{len:26,pitch:26,lift:20,label:r.label,fx:{pulse:.5}},{len:e,pitch:26,lift:20,fx:{pulse:.5}},{len:22,pitch:-4,lift:16,openSky:!0,fx:{pulse:1}},{len:34,pitch:-36,openSky:!0,fx:{pulse:1,flow:-2}},{len:a,pitch:t,openSky:!0,fx:{flow:-3,twist:.5}},{len:60,pitch:-6,fx:{flow:-1.5}}]},Y=(e,t,n={})=>[{len:e,pitch:t,...n}],Yp=(e,t,n=-4,r={})=>[{len:e,pitch:t,...r},{len:Math.max(20,e*.4),pitch:n}],Xp=(e,t,n,r={pulse:1})=>[{len:e*.45,pitch:t,fx:r},{len:e*.55,pitch:n}],Zp=(e,t,n,r=-6)=>[{len:e*t/2,pitch:r-4,fx:{pulse:1}},{len:e*t/2+16,pitch:r-2}],Qp=(e,t,n,r,i={})=>[{len:e,yaw:t,bank:Math.sign(t)*Math.abs(n),pitch:r,...i},{len:24,bank:0,pitch:r,...i.tube?{tube:!0}:{}}],$p=(e,t,n,r)=>[{len:e,yaw:t,bank:-Math.sign(t)*Math.abs(n),pitch:r,fx:{twist:-Math.sign(t)}},{len:24,bank:0,pitch:r}],em=(e,t,n,r,i=1,a={})=>[{len:2*Math.PI*t*e,yaw:360*e*i,bank:n*i,pitch:r,fx:{twist:1.5*i,flow:-1},...a},{len:30,bank:0,pitch:r,...a.tube?{tube:!0}:{}}],tm=(e,t=52,n=14,r=-6,i={})=>[{len:t,yaw:180*e,bank:n*e,pitch:r,fx:{twist:2*e},...i},{len:12,bank:0,pitch:r}],nm=(e,t,n,r,i,a=1,o={})=>{let s=[],c=a;for(let a=0;a<e;a++)s.push({len:n,yaw:t*c*(a===0||a===e-1?1:2),bank:r*c,pitch:i,fx:{twist:c},...o}),c=-c;return s.push({len:20,bank:0,pitch:i,...o}),s},rm=(e,t,n,r,i=1)=>[{len:30,bank:n*i*.5,pitch:r},{len:t,yaw:e*i,bank:n*i,pitch:r,fx:{twist:2*i,flow:-1.5}},{len:36,bank:0,pitch:r}],im=(e,t,n={})=>[{len:18,pitch:-2},{len:e,loop:!0,shift:t,pitch:-2,fx:{pulse:.8,twist:1},...n},{len:22,pitch:-5}],am=(e,t,n,r=13)=>{let i=[],a=e,o=r;for(let e=0;e<n;e++)i.push({len:14,pitch:-3},{len:a,loop:!0,shift:o,pitch:-3,fx:{pulse:1,twist:o>0?1:-1}}),a=Math.max(34,a*t),o=-o;return i.push({len:24,pitch:-6}),i},om=(e,t,n=1,r={})=>[{len:e,pitch:t,roll:n,fx:{twist:2.5},...r}],sm=(e,t,n=20,r={})=>[{len:e,loop:!0,yaw:n,shift:t,pitch:-6,fx:{twist:-2,pulse:.6},...r},{len:30,pitch:-7}],cm=(e,t,n=9,r={})=>[{len:22,pitch:-10},{len:14+e*.1,pitch:n,label:r.label,fx:{flow:-1}},{len:t,pitch:-10,gap:!0},{len:32,pitch:-9,fx:{flow:-1}}],lm=(e,t)=>e*4+t+30,um=(e,t,n,r,i,a=1,o={})=>{let s=[],c=Math.max(2,Math.round(e*4));for(let l=0;l<c;l++){let u=t+(n-t)*(l/(c-1)),d=e/c;s.push({len:2*Math.PI*u*d,yaw:360*d*a,bank:r*a*(.8+.2*l/(c-1)),pitch:i-l*.6,fx:{twist:(1.5+l*.3)*a,flow:-1-l*.2},...o})}return s.push({len:30,bank:0,pitch:i,...o.tube?{tube:!0}:{}}),s},dm=(e,t,n,r=12,i={})=>[{len:e,yaw:t,bank:Math.sign(t)*r,pitch:n,fx:{twist:Math.sign(t)*.8,flow:-.5},...i},{len:20,bank:0,pitch:n,...i}],fm=(e,t,n)=>[{len:24,pitch:n,tube:!0,fx:{flow:-1.5}},{len:e,yaw:t,bank:Math.sign(t)*8,pitch:n,tube:!0,fx:{twist:Math.sign(t)*2.2,flow:-2}},{len:26,bank:0,pitch:n,tube:!0,fx:{flow:-1}}],pm=(e,t=80,n=70)=>[{len:t*.5,yaw:45*e,bank:n*e,pitch:-6,fx:{twist:e,pulse:.8}},{len:t*.5,yaw:45*e,bank:n*e,pitch:-9,fx:{flow:-1.5}},{len:26,bank:0,pitch:-6}],mm=(e,t,n,r={})=>[{len:2*Math.PI*e*.75,yaw:270,bank:t,pitch:n,fx:{twist:1.5,flow:-1},...r},{len:28,bank:0,pitch:n,...r},{len:2*Math.PI*e*.75,yaw:-270,bank:-t,pitch:n,fx:{twist:-1.5,flow:-1},...r},{len:30,bank:0,pitch:n,...r.tube?{tube:!0}:{}}],hm=(e,t=16,n=-28,r=18)=>{let i=[];for(let a=0;a<e;a++)i.push({len:t,pitch:n,fx:{flow:-1}},{len:r,pitch:-3,fx:{pulse:1}});return i},gm=(e,t,n,r={})=>[{len:e*.35,yaw:t,bank:0,pitch:n,tube:!0,fx:{twist:1.5,flow:-2},...r},{len:e*.3,pitch:n-3,tube:!0,fx:{pulse:1,flow:-2.5},...r},{len:e*.35,yaw:-t,bank:0,pitch:n,tube:!0,fx:{twist:-1.5,flow:-2},...r},{len:20,pitch:n,tube:!0}],_m=(e,t,n,r=14,i=22,a=2.6)=>{let o=[];for(let s=0;s<n;s++){let n=r+s*i,c=s%2?1:-1;t===`zigzag`?o.push({at:e,s:n,x:3.5*c,ls:2.1,w:5.2,h:1.7}):t===`posts`?o.push({at:e,s:n,x:2.4*c,ls:1.3,w:2,h:2.3,kind:`post`}):t===`sliders`?o.push({at:e,s:n,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:a,period:3+s%3*.5,phase:s*2.1}}):t===`gates`?o.push({at:e,s:n,x:-4.2,ls:2,w:4.4,h:2,kind:`gate`},{at:e,s:n,x:4.2,ls:2,w:4.4,h:2,kind:`gate`}):o.push({at:e,s:n,x:-4.6,ls:1.4,w:1.8,h:2.6,kind:`post`},{at:e,s:n,x:4.6,ls:1.4,w:1.8,h:2.6,kind:`post`})}return o},vm=(e,t=28,n=60,r=50,i=-5)=>{let a=e>0?{R:t}:{L:t};return[{len:24,pitch:i,fx:{flow:-1}},{len:r,yaw:n*e,bank:0,pitch:i+2,wall:a,fx:{pulse:1,twist:e}},{len:30,pitch:i,wall:a,fx:{flow:1}},{len:30,pitch:i}]},ym=(e=1,t=2.2)=>[{len:40,pitch:-9,widen:t,fx:{flow:-1}},{len:2*Math.PI*44*.7,yaw:252*e,bank:44*e,pitch:-12,widen:t,exact:!0,fx:{twist:2*e,flow:-1.5,pulse:.5}},{len:2*Math.PI*36*.7,yaw:252*e,bank:54*e,pitch:-15,widen:t,exact:!0,fx:{twist:2.6*e,flow:-2,pulse:.6}},{len:120,yaw:72*e,bank:26*e,pitch:-12,widen:1.6,exact:!0,fx:{flow:-2,twist:e}},{len:70,yaw:0,bank:0,pitch:-10,fx:{flow:-2}},{len:30,pitch:-10},{len:40,pitch:-58,tube:!0,fx:{flow:-3,twist:2}},{len:40,pitch:-8,tube:!0,fx:{flow:-2}},{len:30,pitch:-6}],bm=(e,t=26,n=7,r=-7)=>[{len:e*t/2,pitch:r-4,fx:{pulse:1}},{len:e*t/2+18,pitch:r-2,fx:{flow:-.5}}],xm=(e,t=120,n=62,r=-6)=>[{len:20,bank:n*.5*e,pitch:r},{len:140,yaw:t*e,bank:n*e,pitch:r,fx:{twist:1.5*e}},{len:26,bank:0,pitch:r}],Sm=(e=26,t=13,n=-20)=>[{len:38,pitch:-8,fx:{flow:-1}},{len:e+24,pitch:-11,fx:{pulse:.6}},{len:26,pitch:-7}],Cm=(e=14,t=5)=>[{len:22,pitch:-9},{len:16,pitch:t,openSky:!0,fx:{pulse:1}},{len:e,pitch:-14,gap:!0,openSky:!0},{len:30,pitch:-12,openSky:!0,fx:{flow:-1}},{len:24,pitch:-7}],wm=(e=1)=>[...bm(6),...xm(e),...bm(4,24,6),...Sm(),...xm(-e),...Cm()],Tm={id:`wood`,name:`Timberline Run`,checkpointEvery:190,segments:[{len:24,pitch:-3,tube:!0,label:`start`,fx:{flow:-.5}},{len:40,pitch:-12,tube:!0,label:`launchDrop`,fx:{flow:-1.5,twist:1}},{len:30,pitch:-12,tube:!0,label:`launchSplit`,fx:{pulse:1}},{len:153,pitch:-13.4,tube:!0,label:`plunge`,fx:{flow:-2.5,twist:1.2}},{len:142,pitch:-6.3,tube:!0,label:`plungeRun`,fx:{twist:-2,pulse:.5}},{len:45,pitch:-4.04,tube:!0,label:`launchMerge`,fx:{pulse:1}},{len:30,pitch:-7,tube:!0},{len:40,pitch:-3,label:`launchOut`,fx:{flow:1}},{len:70,pitch:-26,label:`firstDrop`,fx:{flow:-1.5}},{len:35,pitch:-3},{len:30,pitch:12,label:`hill1`,fx:{pulse:1}},{len:26,pitch:-18},{len:25,pitch:-5},{len:125,yaw:110,bank:55,pitch:-9,label:`firstTurn`,fx:{twist:1,flow:-.5}},{len:30,bank:0,pitch:-6},{len:55,pitch:-7,label:`barrier`,fx:{flow:1}},{len:135,yaw:-150,bank:-62,pitch:-10,label:`rightTurn`,fx:{twist:-1.2,flow:-.5}},{len:30,bank:0,pitch:-7},{len:60,pitch:-8,label:`offset`,fx:{pulse:.7}},{len:60,pitch:-8,label:`slalom`,fx:{flow:1,pulse:.4}},{len:22,pitch:-10},{len:14,pitch:9,label:`kicker`,fx:{flow:-1}},{len:9,pitch:-8,gap:!0,label:`gap1`},{len:30,pitch:-10,label:`landing1`,fx:{flow:-1}},{len:75,yaw:45,bank:25,pitch:-7,tunnel:!0,label:`bridge`,fx:{flow:-2}},{len:75,yaw:-45,bank:-25,pitch:-7,tunnel:!0},{len:25,bank:0,pitch:-6,tunnel:!0},{len:70,pitch:-34,label:`steepDrop`,fx:{flow:-2}},{len:32,pitch:-5},{len:160,yaw:180,bank:75,pitch:-8,label:`wallRide`,fx:{twist:1.5}},{len:50,yaw:10,bank:0,pitch:-7},{len:95,loop:!0,yaw:25,shift:-12,pitch:-6,label:`corkscrew`,fx:{twist:-2,pulse:.6}},{len:40,pitch:-8},{len:230,yaw:-450,bank:-48,pitch:-11,tube:!0,label:`spiral`,fx:{twist:2,flow:-1.5}},{len:45,bank:0,yaw:0,pitch:-8},{len:40,pitch:-6,openSky:!0,label:`forkRun`,exact:!0,fx:{pulse:1}},{len:18,pitch:7,openSky:!0,label:`highKicker`,exact:!0,fx:{pulse:1}},{len:40,pitch:-18,openSky:!0,label:`valley`,exact:!0,fx:{flow:-1}},{len:70,pitch:-10},{len:40,pitch:8,label:`hill2`,fx:{pulse:1}},{len:30,pitch:-16},{len:90,pitch:-8,label:`rejoin`,fx:{flow:1}},{len:70,pitch:-22,label:`preLoop`,fx:{flow:-2}},{len:25,pitch:-2},{len:80,loop:!0,shift:11.5,pitch:-2,label:`loop`,fx:{pulse:.8,twist:1}},{len:30,pitch:-6},{len:30,pitch:12,label:`hill3`,fx:{pulse:1}},{len:25,pitch:-20},{len:22,pitch:-9},{len:15,pitch:10,label:`kicker2`,fx:{flow:-1}},{len:14,pitch:-12,gap:!0,shift:1.2,label:`gap2`},{len:35,pitch:-9,label:`landing2`},{len:360,pitch:-7,label:`woodFork`,fx:{flow:1}},{len:30,pitch:-7,label:`burrowIn`,fx:{flow:-1}},{len:45,pitch:-12,tube:!0,label:`burrow`,fx:{twist:1.5,flow:-1.5}},{len:30,pitch:-12,tube:!0,label:`burrowSplit`,fx:{pulse:1}},{len:153,pitch:-13.4,tube:!0,label:`darkLine`,fx:{flow:-2.5,twist:-1}},{len:142,pitch:-6.3,tube:!0,label:`darkRun`,fx:{twist:2,pulse:.5}},{len:45,pitch:-4.04,tube:!0,label:`burrowMerge`,fx:{pulse:1}},{len:30,pitch:-7,tube:!0},{len:40,pitch:-8,label:`burrowOut`,fx:{flow:1}},{len:60,pitch:-8,fx:{flow:1}},{len:24,pitch:-8,tube:!0,label:`millSweep`,fx:{flow:-1.5}},{len:150,yaw:95,bank:8,pitch:-8,tube:!0,fx:{twist:2.2,flow:-2}},{len:26,bank:0,pitch:-8,tube:!0},{len:150,yaw:-95,bank:-12,pitch:-8,label:`millSweep2`,fx:{twist:-.8,flow:-.5}},{len:20,bank:0,pitch:-7},{len:16,pitch:-26,label:`flume`,fx:{flow:-1}},{len:18,pitch:-3,fx:{pulse:1}},{len:16,pitch:-26,fx:{flow:-1}},{len:18,pitch:-3,fx:{pulse:1}},{len:16,pitch:-26,fx:{flow:-1}},{len:18,pitch:-3,fx:{pulse:1}},{len:90,pitch:-7,label:`logs`,fx:{flow:1}},...vm(1).map((e,t)=>t===0?{...e,label:`woodVert`}:e),{len:380,yaw:360,bank:50,pitch:-10,tube:!0,label:`funnel`,fx:{twist:1.8,flow:-1.2}},{len:30,bank:0,pitch:-8,tube:!0},{len:80,yaw:-40,bank:-20,pitch:-7,tunnel:!0,label:`shed`,fx:{flow:-2}},{len:80,yaw:40,bank:20,pitch:-7,tunnel:!0,fx:{flow:-2}},{len:20,bank:0,pitch:-7,tunnel:!0},{len:26,pitch:26,lift:20,label:`bigLift`,fx:{pulse:.5}},{len:80,pitch:26,lift:20,fx:{pulse:.5}},{len:22,pitch:-4,lift:16,openSky:!0,fx:{pulse:1}},{len:34,pitch:-36,openSky:!0,fx:{pulse:1,flow:-2}},{len:55,pitch:-66,openSky:!0,fx:{flow:-3,twist:.5}},{len:60,pitch:-6,fx:{flow:-1.5}},...[...bm(4,26,6),...Sm(22,11,-18)].map((e,t)=>t===0?{...e,label:`trail`}:e),{len:30,pitch:11,label:`camels`,fx:{pulse:1}},{len:36,pitch:-16},{len:28,pitch:10,fx:{pulse:1}},{len:34,pitch:-15},{len:26,pitch:9,fx:{pulse:1}},{len:40,pitch:-12},{len:30,pitch:-8},{len:125,yaw:55,bank:40,pitch:-8,label:`finale`,fx:{flow:-1,twist:.6}},{len:95,yaw:-55,bank:-40,pitch:-8,label:`finale2`,fx:{flow:-1,twist:-.6}},{len:55,bank:0,pitch:-4,label:`finish`,fx:{flow:1}},{len:60,pitch:3,label:`runout`}],obstacles:[{at:`barrier`,s:28,x:0,ls:1.75,w:5.13,h:1.76,kind:`barrier`},{at:`offset`,s:14,x:-3.58,ls:2.25,w:5.4,h:1.62},{at:`offset`,s:40,x:3.58,ls:2.25,w:5.4,h:1.62},{at:`slalom`,s:10,x:-2.3,ls:1.25,w:2.03,h:2.29,kind:`post`},{at:`slalom`,s:27,x:2.3,ls:1.25,w:2.03,h:2.29,kind:`post`},{at:`slalom`,s:44,x:-2.3,ls:1.25,w:2.03,h:2.29,kind:`post`},{at:`logs`,s:16,x:-3.5,ls:2.1,w:5.2,h:1.7},{at:`logs`,s:40,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:2.6,period:3.4}},{at:`logs`,s:64,x:-3.5,ls:2.1,w:5.2,h:1.7},{at:`finale`,s:30,x:-4.22,ls:2,w:4.32,h:1.89,kind:`gate`},{at:`finale`,s:30,x:4.22,ls:2,w:4.32,h:1.89,kind:`gate`},{at:`finale`,s:66,x:0,ls:1.75,w:4.05,h:1.35,kind:`barrier`},{at:`finale`,s:100,x:-3.2,ls:2,w:4.86,h:1.62},{at:`finale2`,s:22,x:3.2,ls:2,w:4.86,h:1.62},{at:`finale2`,s:55,x:0,ls:1.75,w:5.4,h:1.62,kind:`barrier`}],hints:[{at:`start`,s:0,text:`Swipe up to launch — swipe again to push`},{at:`launchDrop`,s:4,text:`The pipe splits! Hold LEFT hard for Daybreak`},{at:`plunge`,s:20,text:`The Plunge`},{at:`firstDrop`,s:4,text:`Hold on!`},{at:`spiral`,s:0,text:`Spiral tube!`},{at:`hill1`,s:20,text:`Airtime!`},{at:`firstTurn`,s:10,text:`Tilt to steer through the bank`},{at:`barrier`,s:0,text:`Barrier — go around, or tilt the top toward you to JUMP`},{at:`slalom`,s:0,text:`Weave between the posts`},{at:`kicker`,s:-14,text:`Gap! JUMP`},{at:`bridge`,s:5,text:`Double-jump up and ride the roof!`},{at:`steepDrop`,s:2,text:`Big drop — hold the MAGNET to boost`},{at:`wallRide`,s:0,text:`Near-vertical bank — MAGNET grip`},{at:`corkscrew`,s:0,text:`Corkscrew!`},{at:`forkRun`,s:0,text:`HIGH ROAD ahead: jump off the ramp (double-jump if you are slow)`},{at:`preLoop`,s:10,text:`Loop — hold MAGNET at the top`},{at:`kicker2`,s:-20,text:`Big jump: JUMP, then MAGNET to pull back in`},{at:`woodFork`,s:0,text:`THE BIG FORK: drift LEFT for the Ridge Route, stay for the Burrow`},{at:`burrowIn`,s:0,text:`The Burrow — the walls close over you`},{at:`burrowIn`,s:22,text:`Steer hard to roll up the wall and over the top`},{at:`burrow`,s:6,text:`The pipe splits! Hold RIGHT hard for the Skylight`},{at:`darkLine`,s:10,text:`The Dark Line`},{at:`millSweep`,s:0,text:`The Sawmill: a pipe corner. Fast enough and you go over the top`},{at:`flume`,s:0,text:`Log flume`},{at:`logs`,s:0,text:`Log pile: time the sliding log`},{at:`woodVert`,s:0,text:`Vert wall: ride it up and drop back in`},{at:`funnel`,s:0,text:`Sawdust funnel`},{at:`shed`,s:0,text:`Drying shed`},{at:`bigLift`,s:0,text:`The Big One: up the lift hill...`},{at:`trail`,s:0,text:`Logging trail: pump the rollers, jump the tabletop`},{at:`camels`,s:0,text:`Camelbacks: airtime!`},{at:`finale`,s:0,text:`Final run`},{at:`finish`,s:15,text:`Finish!`}],signs:[{at:`woodFork`,s:-30,text:`◀ RIDGE ROUTE`}],branches:[{id:`daybreak`,name:`Daybreak`,at:`launchSplit`,s:4,offset:[0,0],junction:63,rejoin:{at:`launchMerge`,s:45},segments:[{len:70,yaw:31.3,pitch:-4.8,tube:!0,warp:34,label:`dayIn`,fx:{twist:1.5}},{len:60,yaw:-31.3,pitch:-6.1,tube:!0,warp:34,fx:{flow:-1.5}},{len:29.3,pitch:-6,label:`dayOpen`,fx:{flow:1}},{len:16,pitch:6,openSky:!0,label:`dayKick`,fx:{pulse:1}},{len:20,pitch:-13.8,openSky:!0,fx:{flow:-1}},{len:65.8,yaw:-25.6,bank:-25,pitch:-10.2,label:`daySwing`,fx:{twist:-1}},{len:89.8,yaw:25.6,bank:0,pitch:-21.8,tube:!0,label:`dayDive`,fx:{flow:-2.5}},{len:30,pitch:-4.04,tube:!0,fx:{pulse:1}}],hints:[]},{id:`skylight`,name:`Skylight`,at:`burrowSplit`,s:4,offset:[0,0],junction:63,rejoin:{at:`burrowMerge`,s:45},segments:[{len:70,yaw:-31.3,pitch:-4.8,tube:!0,warp:34,label:`skyIn`,fx:{twist:1.5}},{len:60,yaw:31.3,pitch:-6.1,tube:!0,warp:34,fx:{flow:-1.5}},{len:29.3,pitch:-6,label:`skyOpen`,fx:{flow:1}},{len:16,pitch:6,openSky:!0,label:`skyKick`,fx:{pulse:1}},{len:20,pitch:-13.8,openSky:!0,fx:{flow:-1}},{len:65.8,yaw:25.6,bank:25,pitch:-10.2,label:`skySwing`,fx:{twist:-1}},{len:89.8,yaw:-25.6,bank:0,pitch:-21.8,tube:!0,label:`skyDive`,fx:{flow:-2.5}},{len:30,pitch:-4.04,tube:!0,fx:{pulse:1}}],hints:[]},{id:`highroad`,name:`High Road`,at:`highKicker`,s:62,offset:[0,10.5],pitchOffset:-3.5,segments:[{exact:!0,len:20,pitch:-3,label:`catch`,fx:{pulse:1}},{exact:!0,len:45,yaw:55,bank:45,pitch:-9,label:`swingOut`,fx:{twist:1.2}},{exact:!0,len:20,pitch:8,label:`crest`},{exact:!0,len:18,pitch:-10},{exact:!0,len:90,yaw:-110,bank:-55,pitch:-9,label:`swingBack`,fx:{twist:-1.2,flow:-1}},{exact:!0,len:20,pitch:6},{exact:!0,len:18,pitch:-10},{exact:!0,len:45,yaw:55,bank:45,pitch:-9,label:`returnArc`,fx:{twist:1}},{exact:!0,len:25,bank:0,pitch:-16,label:`dropOff`,fx:{flow:-2}}],hints:[]},{id:`ridge`,name:`Ridge Route`,at:`woodFork`,s:2,offset:[0,0],junction:`auto`,toFinish:!0,segments:[{len:70,yaw:22,pitch:-7,fx:{pulse:.6}},{len:70,yaw:-22,pitch:-9},{len:160,pitch:-9,openSky:!0,label:`alongside`,fx:{flow:1}},{len:90,yaw:45,bank:12,pitch:-10},{len:30,bank:0,pitch:-10},...bm(5,26,6).map((e,t)=>t===0?{...e,label:`ridgeRollers`}:e),...xm(1),...Sm(),...fm(150,-90,-8),{len:130,pitch:-7,label:`ridgeLogs`,fx:{flow:1}},...vm(-1).map((e,t)=>t===0?{...e,label:`ridgeVert`}:e),...ym(1).map((e,t)=>t===0?{...e,label:`ridgeBowl`}:e),...gm(220,-30,-8),...Cm(13),...Jp(70,-64,0,{label:`ridgeLift`}),{len:55,bank:0,pitch:-4,label:`finish`,fx:{flow:1}},{len:60,pitch:3,label:`runout`}],obstacles:[{at:`ridgeLogs`,s:20,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:2.6,period:3.2}},{at:`ridgeLogs`,s:60,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:2.6,period:3.8,phase:2}},{at:`ridgeLogs`,s:100,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:2.6,period:3.5,phase:4}}],hints:[{at:`alongside`,s:0,text:`RIDGE ROUTE: the high road to the finish`},{at:`ridgeRollers`,s:0,text:`Pump the rollers`},{at:`ridgeLogs`,s:0,text:`Rolling logs!`},{at:`ridgeVert`,s:0,text:`Vert wall`},{at:`ridgeBowl`,s:0,text:`The ridge bowl`}]},...qp(`wood`)]},Em=()=>[{len:24,pitch:-3,label:`start`,tube:!0,fx:{flow:-.5}},{len:46,pitch:-11,tube:!0,fx:{flow:-2,twist:1}}],Dm=()=>[{len:55,bank:0,pitch:-4,label:`finish`,fx:{flow:1}},{len:60,pitch:3,label:`runout`}],X=(e,t,n)=>({at:e,s:t,text:n}),Z=(e,t)=>(e[0]={...e[0],label:t},e),Om=e=>[{len:22,pitch:-6},{len:16,pitch:1,openSky:!0,fx:{pulse:1}},{len:e,pitch:-2,gap:!0,openSky:!0},{len:60,pitch:-4,openSky:!0,fx:{flow:-1}},{len:30,pitch:-7}],km=X(`start`,0,`Swipe up, or tap the screen edges, to launch`),Am=(e,t)=>[{len:70,yaw:22*e,pitch:t,fx:{pulse:.6}},{len:70,yaw:-22*e,pitch:t-2},{len:160,pitch:t-2,openSky:!0,label:`alongside`,fx:{flow:1}},{len:90,yaw:45*e,bank:12*e,pitch:t-3},{len:30,bank:0,pitch:t-3}],jm=(e,t,n,r,i=[],a=[],o)=>({id:e,name:t,at:n,s:2,offset:[0,0],junction:`auto`,toFinish:!0,from:o,segments:[...r,...Dm()],obstacles:i,hints:a}),Mm=(e,t,n)=>({at:e,s:-30,text:n>0?`◀ ${t.toUpperCase()}`:`${t.toUpperCase()} ▶`});function Nm(){let e=()=>[{len:16,pitch:-30},{len:14,pitch:-2,fx:{pulse:1}}],t=(e,t=-6)=>[{len:95,yaw:90*e,bank:10*e,pitch:t,fx:{twist:e}},{len:26,bank:0,pitch:t}];return{id:`concrete`,name:`Storm Drain`,checkpointEvery:200,segments:[...Em(),...Z([...e(),...e(),...e()],`spillway`),...Z(Y(90,-6,{tube:!0,fx:{flow:-1}}),`culvert`),...Z(t(1),`corner1`),...Y(40,-6),...Z([...t(-1),...t(1,-7)],`chicane`),...Y(30,-7),...Z(om(80,-8,1,{tube:!0}),`tumble`),...Y(30,-8,{tube:!0}),...Z(Yp(40,-55,-6),`shaft`),...Z(em(1,30,20,-10,1,{tube:!0}),`boxHelix`),...Y(40,-6),...Z(Y(lm(34,50),-7,{fx:{pulse:.8,flow:-1}}),`sponge`),...Y(40,-7),...Y(30,-6),...Z(Y(120,-5,{fx:{flow:1}}),`aqueduct`),...e(),...e(),...Z(Yp(40,-24,-6),`works`),...Z(ym(-1),`drainFunnel`),...Y(30,-7),...Z(Y(130,-6,{fx:{flow:1}}),`filterBeds`),...Z(vm(1),`skate1`),...Z(vm(-1),`skate2`),...Z(gm(220,40,-7),`sewerMain`),...Z(fm(150,-100,-7),`weir`),...Z(hm(5,14,-30,16),`longSpill`),...Z([...t(-1),...t(1)],`chicane2`),...Y(30,-7),...Z(Y(120,-6),`outfall`),...Jp(70,-70,0,{label:`outfallShaft`}),...Dm()],obstacles:[{at:`culvert`,s:40,x:-3.4,ls:2.2,w:5.2,h:1.7},{at:`culvert`,s:70,x:3.4,ls:2.2,w:5.2,h:1.7},{at:`aqueduct`,s:40,x:0,ls:1.8,w:5.2,h:1.7,kind:`barrier`},{at:`aqueduct`,s:85,x:-3.6,ls:2,w:4.8,h:1.7},..._m(`filterBeds`,`sliders`,4,16,28),..._m(`outfall`,`gates`,3,20,34)],hints:[km,X(`works`,0,`Act II: the Treatment Works`),X(`drainFunnel`,0,`THE BOWL: roll round, drop down the drain`),X(`skate1`,0,`Vert wall: ride it up!`),X(`sewerMain`,0,`Sewer main`),X(`weir`,0,`The weir: ride the high wall`),X(`longSpill`,0,`Long spillway`),X(`spillway`,0,`Spillway steps: each one bleeds speed`),X(`corner1`,-10,`Box corner: turn in early`),X(`tumble`,0,`Square tumble`),X(`shaft`,0,`Shaft drop!`),X(`sponge`,-30,`THE SPONGE: left, centre or right`),X(`aqueduct`,0,`Aqueduct`)],signs:[Mm(`sponge`,`Sewer Express`,1)],branches:[jm(`routeSewer`,`Sewer Express`,`sponge`,[...Am(1,-7),...Z(gm(260,35,-8),`sewerA`),...fm(150,-90,-8),...Z(Y(150,-7),`sewerYard`),...vm(-1),...vm(1),...Z(ym(1),`sewerBowl`),...hm(4,16,-28,16),...gm(220,-30,-8),...Jp(60,-60,0,{label:`sewerLift`})],[..._m(`sewerYard`,`sliders`,4,18,30)],[X(`alongside`,0,`SEWER EXPRESS: pipes all the way down`),X(`sewerYard`,0,`Junction yard: sliders`),X(`sewerBowl`,0,`The settling bowl`)])]}}function Pm(){return{id:`metal`,name:`Foundry Loops`,checkpointEvery:220,segments:[...Em(),...Z(Y(80,-6,{tube:!0,fx:{flow:-3}}),`launch`),...Z(Xp(70,40,-45,{pulse:1}),`tophat`),...Y(30,-6),...Z(Yp(50,-24,-3),`dropIn`),...im(100,13),...Qp(90,160,40,-6,{tube:!0,fx:{twist:2}}),...Z(Yp(40,-22,-3),`pair`),...im(80,-13),...im(72,13),...Y(30,-6),...Z([{len:40,pitch:-6,bank:180,tube:!0,fx:{twist:2}},{len:70,pitch:-6,tube:!0,fx:{flow:-2}},{len:40,pitch:-6,bank:0,tube:!0}],`ceiling`),...Y(30,-6),...Z(Y(lm(34,150),-6,{fx:{pulse:.6}}),`twins`),...Y(30,-6,{tube:!0,fx:{flow:-3}}),...Z(Y(60,-6,{tube:!0,fx:{flow:-3}}),`relaunch`),...sm(90,-12,20,{tube:!0}),...Z(om(70,-6,1,{tube:!0}),`zeroG`),...Y(30,-6,{tube:!0}),...Yp(50,-24,-3),...im(95,13),...Y(30,-6),...Z(pm(1),`mill`),...Z(pm(-1),`mill2`),...Z(Yp(50,-26,-3),`millDrop`),...Z(am(96,.8,3,13),`rollers`),...Z(mm(36,60,-10,{tube:!0}),`pretzel`),...Z(Y(60,-6,{tube:!0,fx:{flow:-3}}),`boost2`),...Jp(80,-72,0,{label:`liftMill`}),...Y(30,-6),...Z(fm(160,110,-6),`conveyor`),...Z(ym(-1),`sheetFunnel`),...Z(om(80,-6,2,{tube:!0}),`doubleRoll`),...Y(30,-6,{tube:!0}),...Yp(50,-24,-3),...im(90,-13),...Dm()],obstacles:[..._m(`relaunch`,`sliders`,2,18,24)],hints:[km,X(`mill`,0,`Act II: the Rolling Mill. Wave turns`),X(`rollers`,0,`Loop rollers`),X(`pretzel`,0,`The pretzel`),X(`sheetFunnel`,0,`Sheet-metal funnel`),X(`liftMill`,0,`Lift hill... hold on`),X(`doubleRoll`,0,`Double roll`),X(`launch`,0,`Magnetic launch!`),X(`tophat`,0,`Top hat: MAGNET at the crest`),X(`pair`,0,`Paired loops`),X(`ceiling`,0,`Inverted: hold the MAGNET`),X(`twins`,-20,`DUELLING TWINS: pick a mirror`),X(`relaunch`,0,`Relaunch!`),X(`zeroG`,0,`Zero-g roll`)],signs:[Mm(`twins`,`Magnet Mile`,-1)],branches:[jm(`routeMagnet`,`Magnet Mile`,`twins`,[...Am(-1,-6),...Z(Yp(50,-24,-3),`magDrop`),...am(100,.78,4,-13),...Z(om(80,-6,2,{tube:!0}),`magRoll`),...Y(30,-6,{tube:!0}),...Z(Y(140,-6),`magYard`),...fm(170,100,-6),...Z(Cm(14),`magGap`),...ym(-1),...Yp(50,-24,-3),...im(95,-13)],[..._m(`magYard`,`sliders`,4,16,28)],[X(`alongside`,0,`MAGNET MILE: loops on loops`),X(`magRoll`,0,`Double roll`),X(`magGap`,-10,`Gap: JUMP, then MAGNET`)])]}}function Fm(){return{id:`ice`,name:`Glacier Bobsleigh`,checkpointEvery:220,segments:[...Em(),...Z(nm(5,28,42,30,-6),`labyrinth`),...Qp(120,100,65,-7),...Qp(120,-100,65,-7),...Z([{len:60,yaw:45,bank:30,pitch:-7},{len:230,yaw:-270,bank:-72,pitch:-8,fx:{twist:-2}},{len:60,yaw:45,bank:30,pitch:-7},{len:24,bank:0,pitch:-7}],`omega`),...Z(Y(lm(40,60),-7,{fx:{flow:-1}}),`dendrite`),...Z(sm(100,-12,25,{tube:!0}),`iceCave`),...Y(30,-7,{tube:!0}),...Z(nm(6,40,40,40,-8,-1,{tube:!0}),`labyrinth2`),...Z(rm(330,230,78,-8),`kreisel`),...Z(Y(lm(34,40),-8,{fx:{flow:-1}}),`fan`),...Y(40,-3),...Z(fm(160,-90,-8),`crevasse`),...Z(um(1.75,36,18,60,-9,1,{tube:!0}),`iceFunnel`),...Y(30,-7),...Z(Zp(5,24,4,-7),`seracs`),...Z(ym(1),`iceBowl`),...Z(nm(5,34,40,34,-8),`labyrinth3`),...Z([{len:60,yaw:-45,bank:-30,pitch:-7},{len:230,yaw:270,bank:72,pitch:-8,fx:{twist:2}},{len:60,yaw:-45,bank:-30,pitch:-7},{len:24,bank:0,pitch:-7}],`omega2`),...Z(dm(140,80,-7),`moraine`),...dm(140,-80,-7),...Z(gm(200,-35,-7),`blueTunnel`),...Dm()],obstacles:[],hints:[km,X(`crevasse`,0,`Act II: the Crevasse`),X(`iceFunnel`,0,`ICE FUNNEL`),X(`seracs`,0,`Seracs`),X(`iceBowl`,0,`Ice bowl`),X(`omega2`,0,`Reverse omega`),X(`blueTunnel`,0,`Blue tunnel`),X(`labyrinth`,0,`Labyrinth: drift through the S-curves`),X(`omega`,0,`Omega curve`),X(`dendrite`,-10,`Frost needle: break right`),X(`iceCave`,0,`Ice cave`),X(`kreisel`,0,`THE KREISEL: ride the wall`),X(`fan`,-10,`Dendrite fan: three lines`)],signs:[Mm(`dendrite`,`Crevasse Run`,-1)],branches:[jm(`routeCrevasse`,`Crevasse Run`,`dendrite`,[...Am(-1,-7),...Z(nm(5,26,110,30,-8,1,{tube:!0}),`crevA`),...Z(ym(-1),`crevBowl`),...Z(bm(5,26,6),`seracs2`),...xm(1),...Sm(),...gm(240,40,-8),...vm(1),...Jp(70,-65,0,{label:`crevLift`})],[],[X(`alongside`,0,`CREVASSE RUN: into the ice`),X(`crevBowl`,0,`Ice bowl`),X(`seracs2`,0,`Pump the seracs`)])]}}function Im(){let e=(e,t,n)=>{let r=[],i=1;for(let a=0;a<e;a++)r.push({len:n,yaw:t*i*(a===0||a===e-1?1:2),bank:12*i,pitch:-5,fx:{flow:1.5}}),i=-i;return r.push({len:20,bank:0,pitch:-5}),r};return{id:`water`,name:`River Run`,checkpointEvery:220,segments:[...Em(),...Z(Y(60,-3,{fx:{flow:2}}),`source`),...Z(e(5,55,85),`meanders`),...Z(Zp(6,26,4,-7),`rapids`),...Z(Y(lm(36,90),-6,{fx:{flow:2}}),`braids`),...Y(30,-6),...Z(em(1,34,35,-9,1,{tube:!0}),`flume`),...Z(e(3,70,100),`oxbow`),...Z(Yp(45,-40,-4),`waterfall`),...Z(Y(80,-3,{fx:{flow:1}}),`basin`),...Z(e(4,50,80),`delta`),...Z(Zp(7,24,5,-7),`rapids2`),...Z(mm(32,40,-8,{tube:!0}),`flumes`),...Z(gm(220,45,-6),`cave`),...Z(fm(150,-90,-6),`bend`),...Z(hm(4,18,-32,20),`cascades`),...Z(ym(-1),`whirlpool`),...Z(Y(100,-4,{fx:{flow:2}}),`estuary`),...Jp(70,-70,0,{label:`bigFalls`}),...Dm()],obstacles:[..._m(`estuary`,`sliders`,3,20,26),{at:`basin`,s:40,x:0,ls:2,w:5,h:1.6,kind:`barrier`}],hints:[km,X(`delta`,0,`Act II: the delta`),X(`rapids2`,0,`White water!`),X(`flumes`,0,`Flume pretzel`),X(`cave`,0,`The cave`),X(`cascades`,0,`Cascades`),X(`whirlpool`,0,`WHIRLPOOL: round and round and down`),X(`bigFalls`,0,`Up to the big falls...`),X(`source`,0,`Ride the current`),X(`meanders`,0,`Meanders: the flow pushes you wide`),X(`rapids`,0,`Rapids!`),X(`braids`,-10,`Braided channels: find the fast one`),X(`flume`,0,`Flume`),X(`waterfall`,0,`Waterfall!`)],signs:[Mm(`braids`,`Whitewater`,-1)],branches:[jm(`routeWhite`,`Whitewater`,`braids`,[...Am(-1,-6),...Z(bm(7,24,5,-7),`rapidsX`),...dm(150,-70,-6),...dm(150,-60,-6),...Z(Y(130,-5,{fx:{flow:2}}),`logJam`),...ym(1),...Z(gm(240,-40,-7),`underground`),...hm(4,18,-30,20),...Jp(70,-70,0,{label:`whiteFalls`})],[..._m(`logJam`,`sliders`,4,16,26)],[X(`alongside`,0,`WHITEWATER: the wild channel`),X(`rapidsX`,0,`Rapids!`),X(`logJam`,0,`Log jam`),X(`underground`,0,`Underground river`)])]}}function Lm(){return{id:`glass`,name:`Apollonian Skyway`,checkpointEvery:230,segments:[...Em(),...Z(Y(70,-4,{openSky:!1,fx:{flow:.5}}),`ridge`),...Z(Yp(60,-26,-3),`bigDrop`),...im(115,13),...Z(gm(200,30,-6),`bridge`),...Z(Yp(40,-20,-3),`preview`),...im(85,-13),...im(62,13),...Y(30,-8),...Z(Yp(60,-28,-3),`gasketDrop`),...Z(am(118,.72,5,-13),`gasket`),...Z(em(1,34,50,-9,-1,{tube:!0}),`tangentHelix`),...$p(90,70,20,-8),...Z(Yp(55,-26,-3),`finale`),...im(110,13),...Y(30,-6),...Z([...Xp(90,12,-14),...Xp(84,11,-14),...Xp(78,10,-14)],`floaters`),...Z(fm(170,100,-6),`prismBend`),...Z(ym(1),`crystalBowl`),...Jp(90,-70,0,{label:`skyLift`}),...Z(am(108,.75,4,13),`gasket2`),...Z(mm(30,55,-8,{tube:!0}),`crystal`),...Z(om(80,-6,1,{tube:!0}),`prismRoll`),...Y(30,-6,{tube:!0}),...Z(pm(-1),`glassWave`),...Dm()],obstacles:[],hints:[km,X(`floaters`,0,`Act II: Prism Heights. Floaters`),X(`skyLift`,0,`Sky lift: here comes the drop`),X(`gasket2`,0,`The second gasket`),X(`crystal`,0,`Crystal pretzel`),X(`crystalBowl`,0,`Crystal bowl`),X(`prismRoll`,0,`Prism roll`),X(`ridge`,0,`The skyway: hold your line`),X(`bigDrop`,0,`Big loop`),X(`preview`,0,`Two tangent loops`),X(`gasketDrop`,0,`THE GASKET: loops inside loops, shrinking`),X(`finale`,0,`Final loop`)]}}function Rm(){let e=(e,t=!1)=>{let n=[],r=1;for(let i=0;i<e;i++)n.push({len:90,yaw:40*r*(i===0||i===e-1?1:2),bank:(t?20:35)*r,pitch:-8,tube:t,fx:{twist:r*1.5}}),r=-r;return n.push({len:18,bank:0,pitch:-7,tube:t}),n},t=[...Em(),...Z(e(6,!0),`worm`),...Z(cm(30,12,12),`trampoline`),...Z(Qp(140,160,82,-8),`gripWall`),...Z(Zp(5,22,9,-8),`ejectors`),...Z(Y(lm(30,50),-8,{fx:{pulse:1}}),`mitosis`),...Y(30,-8),...Z(e(4,!0),`worm2`),...Z(Y(lm(24,30),-8,{fx:{pulse:1}}),`mitosis2`),...Z(Y(110,-7),`spots`),...Z(cm(30,14,12),`finalBounce`),...Z(e(5),`worm3`),...Z(cm(30,12,12),`tramp2`),...Z(cm(30,13,12),`tramp3`),...Z(Y(140,-7),`bumpers`),...Z(vm(1),`rampL`),...Z(vm(-1),`rampR`),...Z(em(1.25,40,50,-10,1,{tube:!0}),`spinBowl`),...Z([...bm(8,22,8),...xm(1)],`pumpTrack`),...Jp(60,-65,0,{label:`tower2`}),...Z(pm(1),`rubberWave`),...Z(Y(110,-7),`slalom`),...Dm()],n=[];for(let e=0;e<6;e++)n.push({at:`spots`,s:14+e*15,x:(e%3-1)*3.6,ls:1.4,w:1.8,h:2.2,kind:`post`});return{id:`rubber`,name:`Neon Rebound`,checkpointEvery:220,segments:t,obstacles:[...n,..._m(`bumpers`,`sliders`,5),..._m(`slalom`,`posts`,4,16,22)],hints:[km,X(`worm3`,0,`Act II: the Bounce House`),X(`tramp2`,0,`Double trampoline!`),X(`bumpers`,0,`Bumpers`),X(`rampL`,0,`Vert ramps!`),X(`spinBowl`,0,`SPIN BOWL`),X(`pumpTrack`,0,`Pump track!`),X(`slalom`,0,`Post slalom`),X(`worm`,0,`Rebound labyrinth`),X(`trampoline`,0,`Trampoline!`),X(`gripWall`,0,`Grip the wall`),X(`mitosis`,-10,`MITOSIS: the channel divides`),X(`spots`,0,`Bumper field`)],signs:[Mm(`mitosis`,`Trampoline Park`,-1)],branches:[jm(`routeBounce`,`Trampoline Park`,`mitosis`,[...Am(-1,-8),...Z(bm(8,22,8),`bouncePump`),...xm(-1),...Z(cm(30,12,12),`trampA`),...cm(30,13,12),...vm(1),...vm(-1),...Z(Y(140,-7),`bounceField`),...em(1.25,40,50,-10,-1,{tube:!0}),...Sm(),...Cm(14)],[..._m(`bounceField`,`sliders`,5)],[X(`alongside`,0,`TRAMPOLINE PARK`),X(`trampA`,-10,`Trampolines!`),X(`bounceField`,0,`Bumper sliders`)])]}}function zm(){let e=()=>[{len:50,pitch:-5,fx:{flow:.6}},{len:30,pitch:-12,fx:{flow:-2}},{len:20,pitch:-7}],t=e=>e.flatMap(e=>[{len:22,yaw:36*e,bank:18*e,pitch:-8},{len:18,bank:0,pitch:-8}]);return{id:`sand`,name:`Dune Run`,checkpointEvery:220,segments:[...Em(),...Z(Yp(50,-30,-6),`slipFace`),...Z([...e(),...e(),...e()],`dunes`),...Z(t([1,1,-1,-1,-1,1]),`ruins`),...Z(em(.85,30,40,-12,1,{tube:!0}),`tower`),...Z(Y(110,-9,{fx:{flow:1}}),`scour`),...Z(Yp(70,-32,-8),`greatFace`),...Z(Y(lm(34,50),-8,{fx:{pulse:1}}),`courtyard`),...Y(30,-8),...Z(cm(30,13,10),`horns`),...Z(Yp(60,-30,-5),`lastFace`),...Z(gm(220,-40,-8),`slotCanyon`),...Z(fm(150,90,-7),`canyonBend`),...fm(150,-90,-7),...Z(vm(-1),`duneWall`),...Z(t([-1,-1,1,1,1,-1]),`ruins2`),...Z([...e(),...e(),...e(),...e()],`dunes2`),...Z([...bm(5,28,7),...xm(1),...Sm()],`duneBMX`),...Z(Y(120,-8),`oasis`),...Z(em(1,32,40,-11,-1,{tube:!0}),`minaret`),...Z(hm(3,18,-30,18),`stepwell`),...Jp(70,-62,0,{label:`finalFace`}),...Dm()],obstacles:[..._m(`oasis`,`posts`,4,16,24),{at:`scour`,s:100,x:0,ls:2.1,w:3.6,h:1.7,move:{amp:2.6,period:3.4}},{at:`scour`,s:40,x:-3.4,ls:2,w:5,h:1.7},{at:`scour`,s:75,x:3.4,ls:2,w:5,h:1.7}],hints:[km,X(`slotCanyon`,0,`Act II: the slot canyon`),X(`canyonBend`,0,`Ride the high wall`),X(`dunes2`,0,`Dune sea`),X(`duneBMX`,0,`Dune BMX: pump and jump`),X(`duneWall`,0,`Dune wall: ride it up`),X(`minaret`,0,`Minaret`),X(`stepwell`,0,`Stepwell`),X(`dunes`,0,`Dunes: keep your momentum`),X(`ruins`,0,`Ruins: 36-degree kinks`),X(`greatFace`,0,`The great slip face`),X(`courtyard`,-10,`STAR COURTYARD: three exits`),X(`horns`,-8,`Dune horns: JUMP`)],signs:[Mm(`courtyard`,`Oasis Road`,-1)],branches:[jm(`routeOasis`,`Oasis Road`,`courtyard`,[...Am(-1,-8),...Z([...e(),...e(),...e()],`oasisDunes`),...xm(1),...Z(Cm(16),`wadi`),...Sm(),...Z(gm(240,35,-8),`kasbah`),...ym(-1),...Z(Y(130,-7),`souk`),...Jp(70,-62,0,{label:`oasisFace`})],[..._m(`souk`,`posts`,5,14,22)],[X(`alongside`,0,`OASIS ROAD`),X(`wadi`,-10,`Wadi: JUMP`),X(`kasbah`,0,`The kasbah`),X(`souk`,0,`The souk`)])]}}function Bm(){return{id:`mud`,name:`Crack Delta`,checkpointEvery:200,segments:[...Em(),...Z(Y(80,-10,{fx:{flow:-.5}}),`trench`),...Z(Y(lm(26,24),-11),`fork1`),...Z(Yp(30,-40,-10),`sinkhole`),...Z([{len:26,pitch:-16},{len:26,pitch:8,fx:{pulse:1}},{len:20,pitch:-10}],`sump`),...Z(Y(160,-16,{tube:!0,fx:{flow:-2}}),`mudslide`),...Z(Y(lm(26,24),-12),`delta1`),...Z(Y(lm(26,24),-12),`delta2`),...Z(Y(lm(26,24),-12),`delta3`),...Z([{len:30,pitch:-26},{len:14,pitch:-4},{len:30,pitch:-26},{len:20,pitch:-8}],`doubleDip`),...Z(wm(1),`motocross`),...Z(hm(5,16,-30,18),`paddies`),...Z(fm(140,90,-10),`gully`),...fm(140,-90,-10),...Z(ym(1),`sinkFunnel`),...Z(Y(130,-12),`boulders`),...Z([{len:26,pitch:-16},{len:26,pitch:8,fx:{pulse:1}},{len:20,pitch:-10}],`sump2`),...Z(gm(220,40,-12),`burrow`),...Jp(60,-60,0,{label:`ridge`}),...Z(Y(200,-16,{tube:!0,fx:{flow:-2}}),`landslide`),...Dm()],obstacles:[..._m(`boulders`,`sliders`,4,16,28),{at:`trench`,s:50,x:0,ls:1.8,w:5,h:1.5,kind:`barrier`}],hints:[km,X(`motocross`,0,`MOTOCROSS: pump the rollers, carve the berms, jump the gully`),X(`paddies`,0,`Terraces`),X(`sinkFunnel`,0,`SINKHOLE: round and down`),X(`boulders`,0,`Boulders`),X(`burrow`,0,`Mud burrow`),X(`landslide`,0,`LANDSLIDE!`),X(`fork1`,-10,`Crack fork: pick a side`),X(`sinkhole`,0,`Sinkhole!`),X(`sump`,0,`Sump: break free`),X(`mudslide`,0,`Mudslide`),X(`delta1`,-10,`THE CRACK DELTA: fork after fork`)],signs:[Mm(`fork1`,`Mudslide`,1)],branches:[jm(`routeSlide`,`Mudslide`,`fork1`,[...Am(1,-11),...Z(Y(160,-16,{tube:!0,fx:{flow:-2}}),`slideA`),...wm(-1),...Z(Y(240,-10),`swampFork`),...ym(1),...Jp(60,-60,0,{label:`slideLift`})],[],[X(`alongside`,0,`MUDSLIDE: down the gully`),X(`slideA`,0,`The slide`),X(`swampFork`,-20,`Fork again: drift RIGHT for the Swamp`)]),jm(`routeSwamp`,`Swamp`,`swampFork`,[...Am(-1,-10),...Z(bm(6,26,7,-9),`bog`),...xm(1),...Z(gm(220,35,-10),`mangrove`),...Z(Y(130,-9),`stumps`),...vm(-1),...Cm(14)],[..._m(`stumps`,`sliders`,4,16,28)],[X(`alongside`,0,`THE SWAMP`),X(`mangrove`,0,`Mangrove tunnel`),X(`stumps`,0,`Stumps`)],`routeSlide`)]}}function Vm(){let e=[...Em(),...Z(Y(60,-1,{fx:{pulse:1}}),`lip`),...Z([{len:70,pitch:-72,fx:{flow:-3}},{len:60,pitch:-6}],`radialDive`),...Z(Qp(240,180,55,-5,{fx:{twist:1.5}}),`sweep`),...Z([...Xp(80,10,-12),...Xp(76,9,-12),...Xp(70,8,-12)],`floaters`),...Y(40,-6),...Z(Y(lm(36,60),-6),`pinch`),...Z([{len:50,pitch:-50,fx:{flow:-2}},{len:40,pitch:-5}],`dive2`),...Z(Qp(170,-180,30,-5,{tube:!0,fx:{twist:-2}}),`innerSweep`),...Z(Xp(60,12,-14),`speedHill`),...Zp(4,24,6,-6),...Z(Y(60,-5),`finalGate`),...Jp(90,-75,0,{label:`templeLift`}),...Z(Y(150,-5),`colonnade`),...Z(pm(1),`templeWave`),...Z(pm(-1),`templeWave2`),...Z([{len:60,pitch:-60,fx:{flow:-3}},{len:50,pitch:-5}],`dive3`),...Z(fm(200,140,-5),`nave`),...Z(vm(1),`altarWall`),...Z(em(1.5,36,50,-10,-1,{tube:!0}),`spiralStair`),...Z([...Xp(80,10,-12),...Xp(74,9,-12)],`floaters2`),...Z(gm(220,-40,-6),`crypt`),...Dm()],t=(e,t)=>[{at:e,s:t,x:-4.2,ls:2,w:4.6,h:2.2,kind:`gate`},{at:e,s:t,x:4.2,ls:2,w:4.6,h:2.2,kind:`gate`}];return{id:`stone`,name:`Temple Dive`,checkpointEvery:230,segments:e,obstacles:[..._m(`colonnade`,`colonnade`,5,14,28),..._m(`colonnade`,`sliders`,4,28,28,1.6),...t(`pinch`,30),...t(`pinch`,90),...t(`finalGate`,30)],hints:[km,X(`templeLift`,0,`Act II: the temple lift`),X(`colonnade`,0,`The Colonnade`),X(`templeWave`,0,`Wave turns`),X(`dive3`,0,`THE THIRD DIVE`),X(`nave`,0,`The nave`),X(`altarWall`,0,`Vert wall`),X(`spiralStair`,0,`Spiral stair`),X(`crypt`,0,`The crypt`),X(`lip`,0,`The lip...`),X(`radialDive`,0,`THE RADIAL DIVE`),X(`floaters`,0,`Floater hills`),X(`pinch`,0,`Pinch gates, or take the outer lobe`),X(`innerSweep`,0,`Inner sweep`),X(`finalGate`,0,`Final gate`)],signs:[Mm(`pinch`,`Catacombs`,1)],branches:[jm(`routeCatacomb`,`Catacombs`,`pinch`,[...Am(1,-6),...Z(gm(260,-35,-7),`catacombA`),...em(1.5,36,50,-10,1,{tube:!0}),...Z(Y(140,-6),`ossuary`),...vm(-1),...Z(ym(1),`well`),...gm(220,30,-7),...Jp(80,-72,0,{label:`catacombDive`})],[..._m(`ossuary`,`colonnade`,4,14,30),..._m(`ossuary`,`sliders`,3,28,30,1.6)],[X(`alongside`,0,`THE CATACOMBS`),X(`ossuary`,0,`Ossuary`),X(`well`,0,`The well`)])]}}function Hm(){return{id:`grating`,name:`Hilbert Works`,checkpointEvery:200,segments:[...Em(),...Z(gm(200,30,-6),`rhythm`),...Z(tm(1,230,12,-6),`hairpin1`),...Y(40,-6),...Z([{len:18,pitch:-28},{len:14,pitch:-3},{len:18,pitch:-28},{len:18,pitch:-5}],`mouseDrops`),...Z([...tm(-1,230),...Y(30,-7),...tm(1,230)],`chain`),...Y(30,-7),...Z(em(1,26,30,-12,-1,{tube:!0}),`stair`),...Z([...tm(1,230,14,-9),...Y(24,-12),...tm(-1,230,14,-9),...Y(24,-12),...tm(1,230,14,-9)],`stack`),...Y(20,-8),...Z(cm(30,11,9),`hatch`),...Z(Y(160,-6,{fx:{flow:2}}),`rattle`),...tm(1,230),...Jp(60,-55,0,{label:`mouseLift`}),...Z(Y(150,-6),`catwalk`),...Z(tm(-1,230),`chain2`),...Y(30,-7),...Z(hm(4,16,-28,14),`ladder`),...Y(30,-12),...Z(em(1,28,30,-12,1,{tube:!0}),`stair2`),...Z(cm(30,11,9),`hatch2`),...Z(cm(30,12,9),`hatch3`),...Z(fm(150,-120,-6),`gantry`),...Z(vm(-1),`bulkhead`),...Z(Y(130,-6,{fx:{flow:2}}),`rattle2`),...Dm()],obstacles:[..._m(`catwalk`,`zigzag`,6,14,22),..._m(`rattle2`,`sliders`,4,18,26),{at:`rattle`,s:50,x:-3.5,ls:2,w:5,h:1.7},{at:`rattle`,s:100,x:3.5,ls:2,w:5,h:1.7}],hints:[km,X(`mouseLift`,0,`Act II: the mouse lift`),X(`catwalk`,0,`Catwalks`),X(`chain2`,0,`Switchbacks`),X(`ladder`,0,`Ladder drops`),X(`hatch2`,-10,`Double hatch: JUMP, JUMP`),X(`gantry`,0,`Gantry sweep`),X(`bulkhead`,0,`Bulkhead: ride it up`),X(`rhythm`,0,`Feel the rhythm`),X(`hairpin1`,-6,`Hairpin! Ride the outer wall`),X(`chain`,0,`Switchback chain`),X(`stack`,0,`THE HILBERT STACK`),X(`hatch`,-10,`Gap: JUMP`)]}}function Um(){return{id:`snow`,name:`Koch Alpine`,checkpointEvery:220,segments:[...Em(),...Z(Y(90,-6,{fx:{flow:.5}}),`groomed`),...Z(nm(4,22,110,22,-7),`slalom`),...Y(20,-7),...Z(Zp(6,20,4,-7),`moguls`),...Z(Y(90,-8,{tube:!0,fx:{flow:-1.5}}),`drift`),...Y(20,-8),...Z([...dm(170,55,-7),...dm(170,-70,-7),...dm(170,55,-7)],`kochCascade`),...Y(20,-7),...Z(em(1,36,35,-10,1,{tube:!0}),`peakHelix`),...Z([{len:80,pitch:-26,fx:{flow:-2}},{len:20,pitch:9,openSky:!0,fx:{pulse:1}},{len:34,pitch:-24,gap:!0,openSky:!0},{len:60,pitch:-24,fx:{flow:-1}},{len:40,pitch:-6}],`skiJump`),...Z([...bm(5,24,6),...xm(-1),...Y(70,-7),...Om(12),...Y(40,-7),...xm(1)],`boardercross`),...Z(Y(150,-7),`trees`),...Z(nm(4,20,100,20,-8),`slalom2`),...Z(gm(220,40,-9),`couloir`),...Z(mm(34,40,-9,{tube:!0}),`cornice`),...Z(Zp(6,22,4,-7),`moguls2`),...Jp(70,-60,0,{label:`chairlift`}),...Z(fm(160,-100,-8),`traverse`),...Z(vm(1),`halfpipe`),...Z([{len:60,pitch:-22,fx:{flow:-2}},{len:18,pitch:8,openSky:!0,fx:{pulse:1}},{len:22,pitch:-20,gap:!0,openSky:!0},{len:50,pitch:-20,fx:{flow:-1}},{len:30,pitch:-6}],`kicker`),...Dm()],obstacles:[..._m(`trees`,`posts`,6,14,22),{at:`groomed`,s:50,x:-3.3,ls:2,w:5,h:1.6}],hints:[km,X(`boardercross`,0,`Act II: boardercross. Pump the rollers`),X(`trees`,0,`Tree slalom`),X(`couloir`,0,`The couloir`),X(`cornice`,0,`Cornice pretzel`),X(`halfpipe`,0,`Half-pipe wall!`),X(`kicker`,0,`Kicker: JUMP, then MAGNET`),X(`slalom`,0,`Slalom: carve the long turns`),X(`moguls`,0,`Moguls`),X(`kochCascade`,0,`Giant slalom: ride the high line`),X(`skiJump`,0,`THE SKI JUMP: jump, then MAGNET to land`)]}}var Wm=e=>()=>{let t=e();return{...t,branches:[...t.branches??[],...qp(t.id)]}},Gm=Object.fromEntries(Object.entries({concrete:Nm,metal:Pm,ice:Fm,water:Im,glass:Lm,rubber:Rm,sand:zm,mud:Bm,stone:Vm,grating:Hm,snow:Um}).map(([e,t])=>[e,Wm(t)])),Km={coursePriceUsd:.99,preferredAdMaxSeconds:25,rewardThresholdSeconds:75,rewardDurationDays:7,minCreditSeconds:1,dailyCapSeconds:1800,maxSessionsPerHour:60,sessionTimeoutSeconds:45,simulatedRateMicrosPerSecond:2e3},qm={wood:[`Natural rolling, warm resonance`,`Steering, wall rides, jumps and the magnet`],concrete:[`Rigid, abrasive contact`,`Gritty rumble and precise narrow passages`],metal:[`Ringing steel and spectacular loops`,`Magnet traction through inversions`],ice:[`Low friction, long drifts`,`Drift control — recovery is hard`],water:[`Currents, buoyancy, splashes`,`Ride the flow through aqueducts`],glass:[`Transparent heights`,`Bright, sharp, exposed precision`],rubber:[`Grip and rebound`,`Traction-heavy cornering and bounces`],sand:[`Granular drag`,`Stay on the firm line to keep momentum`],mud:[`Sticky, viscous, unpredictable grip`,`Fight resistance and sudden slips`],stone:[`Polished, hard, precise`,`Fast technical temple runs`],grating:[`Rhythmic chatter and bounce`,`Stay stable over thousands of bars`],snow:[`Compression and soft drag`,`Packed lanes are fast, powder slows you`]},Jm=sd.map(e=>{let t=e===`wood`,n=qm[e];return{id:e,materialId:e,world:od[e].name,name:t?Tm.name:Gm[e]().name,tagline:n[0],previewFocus:n[1],free:t,productId:t?null:`com.gutterball.course.${e}`,displayPriceUsd:t?null:Km.coursePriceUsd,status:`designed`,layout:t?()=>Tm:Gm[e]}});function Ym(e){return Jm.find(t=>t.id===e)}function Xm(e){return e.free?`FREE`:`$${(e.displayPriceUsd??Km.coursePriceUsd).toFixed(2)}`}var Zm=`gb.dev.simulatedEntitlements.v1`;function Qm(e){let t=2166136261,n=`gutterball-dev-simulator-key|`+e;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16).padStart(8,`0`)}var $m=class{constructor(e){J(this,`kind`,`dev-simulator`),J(this,`isProduction`,!1),J(this,`store`,void 0),J(this,`failNext`,!1),this.store=e??(typeof localStorage<`u`?localStorage:eh())}read(){try{return JSON.parse(this.store.getItem(Zm)??`[]`)}catch{return[]}}write(e){this.store.setItem(Zm,JSON.stringify(e))}async purchase(e,t){if(await new Promise(e=>setTimeout(e,350)),this.failNext)return this.failNext=!1,{ok:!1,error:`Simulated store error — nothing was charged.`};let n=this.read(),r=n.find(t=>t.productId===e&&this.verify(t));if(r)return{ok:!0,entitlement:r,alreadyOwned:!0};let i=Date.now(),a=`${t}|${e}|${i}`,o={courseId:t,productId:e,source:`simulated`,grantedAt:i,receipt:`SIM.${a}.${Qm(a)}`};return n.push(o),this.write(n),{ok:!0,entitlement:o}}async restore(){return this.read().filter(e=>this.verify(e))}verify(e){if(e.source!==`simulated`||!e.receipt)return!1;let t=/^SIM\.(.+)\.([0-9a-f]{8})$/.exec(e.receipt);if(!t)return!1;let[n,r,i]=t[1].split(`|`);return n===e.courseId&&r===e.productId&&Number(i)===e.grantedAt&&Qm(t[1])===t[2]}reset(){this.store.removeItem(Zm)}};function eh(){let e=new Map;return{getItem:t=>e.get(t)??null,setItem:(t,n)=>{e.set(t,n)},removeItem:t=>{e.delete(t)}}}var th=class{constructor(e,t){J(this,`provider`,void 0),J(this,`freeCourses`,void 0),J(this,`owned`,new Map),J(this,`listeners`,[]),this.provider=e,this.freeCourses=t}async init(){await this.refresh()}async refresh(){this.owned.clear();for(let e of this.freeCourses)this.owned.set(e,{courseId:e,productId:`free`,source:`free`,grantedAt:0});for(let e of await this.provider.restore())this.provider.verify(e)&&this.owned.set(e.courseId,e);this.listeners.forEach(e=>e())}isEntitled(e){return this.owned.has(e)}entitlement(e){return this.owned.get(e)}async purchase(e,t){if(this.isEntitled(e))return{ok:!0,alreadyOwned:!0,entitlement:this.owned.get(e)};let n=await this.provider.purchase(t,e);if(n.ok&&n.entitlement&&this.provider.verify(n.entitlement))this.owned.set(e,n.entitlement);else if(n.ok)return{ok:!1,error:`Purchase could not be verified.`};return this.listeners.forEach(e=>e()),n}async restore(){return await this.refresh(),[...this.owned.values()].filter(e=>e.source!==`free`)}onChange(e){this.listeners.push(e)}},nh=[{id:`skin-rolypoly`,name:`Roly-Poly Shell`,kind:`skin`,value:`rolypoly`,weight:20},{id:`skin-gold`,name:`Gold Chrome Ball`,kind:`skin`,value:`gold`,weight:18},{id:`skin-copper`,name:`Copper Ball`,kind:`skin`,value:`copper`,weight:18},{id:`skin-obsidian`,name:`Obsidian Ball`,kind:`skin`,value:`obsidian`,weight:12},{id:`beam-magenta`,name:`Magenta Tractor Beam`,kind:`beam`,value:`magenta`,weight:12},{id:`beam-gold`,name:`Gold Tractor Beam`,kind:`beam`,value:`gold`,weight:10},{id:`trail-aurora`,name:`Aurora Rolling Trail`,kind:`trail`,value:`aurora`,weight:10}],rh=class extends Error{constructor(e,t){super(t),J(this,`code`,void 0),this.code=e}},ih=class{constructor(e,t,n,r=Math.random){J(this,`clock`,void 0),J(this,`storage`,void 0),J(this,`random`,void 0),J(this,`st`,void 0),J(this,`creatives`,void 0),this.clock=t,this.storage=n,this.random=r,this.creatives=new Map(e.map(e=>[e.adId,e])),this.st=n?.load()??{sessions:{},ledger:[],rewards:[],idempotency:{},nextLedgerId:1,nextSession:1,sessionStarts:{}}}persist(){this.storage?.save(this.st)}append(e){let t={...e,id:this.st.nextLedgerId++,ts:this.clock.now(),simulated:!0};return this.st.ledger.push(Object.freeze(t)),t}get ledger(){return this.st.ledger}sweep(){let e=this.clock.now();for(let t of Object.values(this.st.sessions))(t.state===`PLAYING`||t.state===`PAUSED`||t.state===`CREATED`)&&e-t.lastHeartbeatServer>Km.sessionTimeoutSeconds*1e3&&(t.state=`STOPPED`,t.suspicious.push(`timeout`),this.settleInternal(t))}activeSession(e){return this.sweep(),Object.values(this.st.sessions).find(t=>t.playerId===e&&[`CREATED`,`PLAYING`,`PAUSED`].includes(t.state))}createSession(e,t){var n;let r=this.creatives.get(t);if(!r)throw new rh(`UNKNOWN_AD`,`Unknown advertisement`);if(this.activeSession(e))throw new rh(`SESSION_ACTIVE`,`Another viewing session is already active`);let i=this.clock.now(),a=((n=this.st.sessionStarts)[e]??(n[e]=[])).filter(e=>i-e<36e5);a.push(i),this.st.sessionStarts[e]=a;let o={sessionId:`S${this.st.nextSession++}-${Math.floor(this.random()*1e9).toString(36)}`,playerId:e,adId:t,campaignId:r.campaignId,state:`CREATED`,createdAt:i,lastHeartbeatServer:i,lastMediaMs:0,maxMediaMs:0,eligibleMs:0,playWallMs:0,heartbeats:0,suspicious:[]};return a.length>Km.maxSessionsPerHour&&o.suspicious.push(`rate`),this.st.sessions[o.sessionId]=o,this.persist(),{...o}}get(e,t){let n=this.st.sessions[e];if(!n||n.playerId!==t)throw new rh(`INVALID_SESSION`,`Invalid session`);return n}heartbeat(e,t,n,r){this.sweep();let i=this.get(e,t);if(![`CREATED`,`PLAYING`,`PAUSED`].includes(i.state))throw new rh(`SESSION_CLOSED`,`Session is ${i.state}`);let a=this.creatives.get(i.adId),o=this.clock.now(),s=Math.max(0,o-i.lastHeartbeatServer),c=Math.max(0,Math.min(a.durationMs,n)),l=c-i.lastMediaMs;if(r&&i.state===`PLAYING`){i.playWallMs+=s,l<0&&i.suspicious.push(`seek-back`);let e=Math.max(0,c-i.maxMediaMs),t=Math.max(0,i.playWallMs+50-i.eligibleMs),n=Math.min(e,t);i.eligibleMs=Math.min(a.durationMs,i.eligibleMs+n),i.maxMediaMs=Math.max(i.maxMediaMs,i.maxMediaMs+n),c>i.playWallMs*1.25+1500&&!i.suspicious.includes(`impossible-advance`)&&i.suspicious.push(`impossible-advance`)}return i.lastMediaMs=c,i.lastHeartbeatServer=o,i.heartbeats++,i.state=r?`PLAYING`:`PAUSED`,this.persist(),{...i}}stop(e,t,n,r){let i=this.get(e,t);if(i.settlement)return i.settlement;[`PLAYING`,`PAUSED`,`CREATED`].includes(i.state)&&this.heartbeat(e,t,n,i.state===`PLAYING`);let a=this.creatives.get(i.adId);return i.state=r&&i.maxMediaMs>=a.durationMs-300?`COMPLETED`:`STOPPED`,this.settleInternal(i)}settle(e,t){let n=this.get(e,t);if(n.settlement)return n.settlement;if(![`STOPPED`,`COMPLETED`].includes(n.state))throw new rh(`NOT_STOPPED`,`Session still active`);return this.settleInternal(n)}settleInternal(e){if(e.settlement)return e.settlement;let t=this.creatives.get(e.adId);e.state=`PENDING_VALIDATION`;let n=[],r=!0;e.suspicious.includes(`impossible-advance`)&&(r=!1,n.push(`Media advanced faster than real time`)),e.suspicious.includes(`rate`)&&(r=!1,n.push(`Session start rate exceeded — held for review`));let i=Math.floor(e.eligibleMs);i<Km.minCreditSeconds*1e3&&(i=0,n.push(`Below minimum eligible duration`));let a=Math.floor(this.clock.now()/864e5)*864e5,o=this.st.ledger.filter(t=>t.type===`PLAYER_CREDIT`&&t.playerId===e.playerId&&t.ts>=a).reduce((e,t)=>e+(t.ms??0),0),s=Math.max(0,Km.dailyCapSeconds*1e3-o);i>s&&(i=s,n.push(`Daily viewing cap reached`)),r||(i=0);let c=i,l=Math.round(c*t.rateMicrosPerSecond/1e3),u={sessionId:e.sessionId,outcome:r?`SETTLED`:`INVALIDATED`,creditedMs:i,billableMs:c,rateMicrosPerSecond:t.rateMicrosPerSecond,chargeMicros:l,completed:e.maxMediaMs>=t.durationMs-300,reasons:n,settledAt:this.clock.now()};return r&&i>0&&(this.append({type:`PLAYER_CREDIT`,playerId:e.playerId,sessionId:e.sessionId,campaignId:e.campaignId,ms:i}),this.append({type:`ADVERTISER_CHARGE`,playerId:e.playerId,sessionId:e.sessionId,campaignId:e.campaignId,ms:c,micros:l})),e.state=r?`SETTLED`:`INVALIDATED`,e.settlement=u,this.persist(),u}reverse(e,t){let n=this.st.ledger.filter(t=>t.sessionId===e&&(t.type===`PLAYER_CREDIT`||t.type===`ADVERTISER_CHARGE`));if(!this.st.ledger.some(t=>t.type===`REVERSAL`&&t.sessionId===e)&&n.length){for(let r of n)this.append({type:`REVERSAL`,playerId:r.playerId,sessionId:e,campaignId:r.campaignId,ms:r.type===`PLAYER_CREDIT`?-(r.ms??0):void 0,micros:r.micros?-r.micros:void 0,ref:r.id,note:t});this.persist()}}balanceMs(e){return this.st.ledger.filter(t=>t.playerId===e&&(t.type===`PLAYER_CREDIT`||t.type===`REDEMPTION`||t.type===`REVERSAL`&&t.ms!==void 0)).reduce((e,t)=>e+(t.ms??0),0)}totalCreditedMs(e){return this.st.ledger.filter(t=>t.playerId===e&&t.type===`PLAYER_CREDIT`).reduce((e,t)=>e+(t.ms??0),0)}redeem(e,t){let n=this.st.idempotency[`redeem:${t}`];if(n)return n;let r=Km.rewardThresholdSeconds*1e3;if(this.balanceMs(e)<r)throw new rh(`INSUFFICIENT`,`Not enough eligible viewing time`);let i=nh.reduce((e,t)=>e+t.weight,0),a=this.random()*i,o=nh[0];for(let e of nh)if(a-=e.weight,a<=0){o=e;break}let s=this.append({type:`REDEMPTION`,playerId:e,ms:-r,rewardId:o.id}),c=this.clock.now(),l=this.append({type:`REWARD_ISSUED`,playerId:e,rewardId:o.id,ref:s.id}),u={rewardId:o.id,def:o,issuedAt:c,expiresAt:c+Km.rewardDurationDays*864e5,ledgerId:l.id};return this.st.rewards.push(u),this.st.idempotency[`redeem:${t}`]=u,this.persist(),u}activeRewards(e){let t=this.clock.now(),n=new Set(this.st.ledger.filter(t=>t.type===`REWARD_ISSUED`&&t.playerId===e).map(e=>e.id));return this.st.rewards.filter(e=>n.has(e.ledgerId)&&e.expiresAt>t)}campaignReport(e){let t=Object.values(this.st.sessions).filter(t=>t.campaignId===e),n=t.filter(e=>e.settlement),r=this.st.ledger.filter(t=>t.campaignId===e&&(t.type===`ADVERTISER_CHARGE`||t.type===`REVERSAL`&&t.micros!==void 0)),i=this.st.ledger.filter(t=>t.campaignId===e&&t.type===`ADVERTISER_CHARGE`).reduce((e,t)=>e+(t.ms??0),0),a=n.filter(e=>e.settlement.outcome===`SETTLED`&&e.settlement.completed).length,o=n.filter(e=>e.settlement.outcome===`SETTLED`&&!e.settlement.completed&&e.settlement.creditedMs>0).length;return{campaignId:e,started:t.length,completedViews:a,partialViews:o,invalidated:n.filter(e=>e.settlement.outcome===`INVALIDATED`).length,billableSeconds:i/1e3,avgWatchSeconds:n.length?n.reduce((e,t)=>e+t.settlement.creditedMs,0)/n.length/1e3:0,chargesMicros:r.reduce((e,t)=>e+(t.micros??0),0),simulated:!0}}reconcile(){let e=[],t=new Set;for(let n of Object.values(this.st.sessions)){if(!n.settlement||n.settlement.outcome!==`SETTLED`||n.settlement.creditedMs===0)continue;let r=this.st.ledger.filter(e=>e.sessionId===n.sessionId&&e.type===`PLAYER_CREDIT`),i=this.st.ledger.filter(e=>e.sessionId===n.sessionId&&e.type===`ADVERTISER_CHARGE`);r.length!==1||i.length!==1?e.push(`${n.sessionId}: expected exactly one credit and one charge`):r[0].ms!==i[0].ms||r[0].ms!==n.settlement.creditedMs?e.push(`${n.sessionId}: credit/charge duration mismatch`):i[0].micros!==n.settlement.chargeMicros&&e.push(`${n.sessionId}: charge mismatch`),t.has(n.sessionId)&&e.push(`${n.sessionId}: duplicate`),t.add(n.sessionId)}return{ok:e.length===0,issues:e}}resetAll(){this.st={sessions:{},ledger:[],rewards:[],idempotency:{},nextLedgerId:1,nextSession:1,sessionStarts:{}},this.persist()}},ah=[{adId:`sample-acorn`,campaignId:`camp-acorn`,advertiser:`Acorn & Pine Outfitters (fictional)`,title:`Trail Boots — Sample Spot`,durationMs:2e4,rateMicrosPerSecond:Km.simulatedRateMicrosPerSecond,sample:!0},{adId:`sample-nimbus`,campaignId:`camp-nimbus`,advertiser:`Nimbus Fizz (fictional)`,title:`Sparkling Cloud Soda — Sample Spot`,durationMs:15e3,rateMicrosPerSecond:Km.simulatedRateMicrosPerSecond,sample:!0},{adId:`sample-orbit`,campaignId:`camp-orbit`,advertiser:`Orbit Audio (fictional)`,title:`Headphones — Sample Spot`,durationMs:25e3,rateMicrosPerSecond:Km.simulatedRateMicrosPerSecond,sample:!0},{adId:`sample-tidal`,campaignId:`camp-tidal`,advertiser:`Tidal Bikes (fictional)`,title:`E-Bike Launch — Sample Spot`,durationMs:12e3,rateMicrosPerSecond:Km.simulatedRateMicrosPerSecond,sample:!0}];function oh(){let e=localStorage.getItem(`gb.dev.playerId`);return e||(e=`dev-`+Math.random().toString(36).slice(2,10),localStorage.setItem(`gb.dev.playerId`,e)),e}function sh(){let e=`gb.dev.adServerState.v1`;return new ih(ah,{now:()=>Date.now()},{load:()=>{try{return JSON.parse(localStorage.getItem(e)??`null`)}catch{return null}},save:t=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{}}})}var ch=class{constructor(e,t){J(this,`server`,void 0),J(this,`playerId`,void 0),J(this,`state`,`idle`),J(this,`mediaMs`,0),J(this,`sessionId`,void 0),J(this,`creative`,void 0),J(this,`serverEligibleMs`,0),J(this,`lastSettlement`,void 0),J(this,`error`,void 0),J(this,`hb`,void 0),J(this,`lastTick`,0),J(this,`onUpdate`,void 0),this.server=e,this.playerId=t,document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.state===`playing`&&this.pause()});let n=e.activeSession(t);if(n)try{this.lastSettlement=e.stop(n.sessionId,t,n.lastMediaMs,!1)}catch{}}start(e){if(this.state!==`playing`&&this.state!==`paused`){this.error=void 0;try{let t=this.server.createSession(this.playerId,e.adId);this.sessionId=t.sessionId,this.creative=e,this.mediaMs=0,this.serverEligibleMs=0,this.lastSettlement=void 0,this.server.heartbeat(t.sessionId,this.playerId,0,!0),this.state=`playing`,this.lastTick=performance.now(),this.hb=window.setInterval(()=>this.heartbeat(),1e3)}catch(e){this.error=e instanceof rh?e.message:String(e)}this.onUpdate?.()}}tick(){let e=performance.now(),t=e-this.lastTick;this.lastTick=e,this.state===`playing`&&this.creative&&(this.mediaMs=Math.min(this.creative.durationMs,this.mediaMs+t),this.mediaMs>=this.creative.durationMs&&this.finish(!0))}heartbeat(){if(!(!this.sessionId||this.state!==`playing`&&this.state!==`paused`)){try{let e=this.server.heartbeat(this.sessionId,this.playerId,this.mediaMs,this.state===`playing`);this.serverEligibleMs=e.eligibleMs}catch(e){this.error=String(e.message)}this.onUpdate?.()}}pause(){this.state===`playing`&&(this.heartbeat(),this.state=`paused`,this.heartbeat(),this.onUpdate?.())}resume(){this.state===`paused`&&(this.state=`playing`,this.lastTick=performance.now(),this.heartbeat(),this.onUpdate?.())}stop(){this.finish(!1)}finish(e){if(this.sessionId){clearInterval(this.hb);try{this.state===`paused`&&(this.state=`playing`),this.lastSettlement=this.server.stop(this.sessionId,this.playerId,this.mediaMs,e)}catch(e){this.error=String(e.message)}this.state=`ended`,this.sessionId=void 0,this.onUpdate?.()}}dismiss(){this.state=`idle`,this.creative=void 0,this.onUpdate?.()}};function lh(e,t,n,r,i){let a=n/1e3,[o,s,c]={"sample-acorn":[`#2f4a2a`,`#d99a4e`,`#f5ecd8`],"sample-nimbus":[`#2a5fb0`,`#9fd8ff`,`#ffffff`],"sample-orbit":[`#14101f`,`#b04cff`,`#f2e9ff`],"sample-tidal":[`#0d4f5a`,`#3fe0c5`,`#e9fffb`]}[t.adId]??[`#222`,`#888`,`#fff`],l=e.createLinearGradient(0,0,r,i);l.addColorStop(0,o),l.addColorStop(1,`#000`),e.fillStyle=l,e.fillRect(0,0,r,i);for(let t=0;t<14;t++){let n=a*.6+t*.45,o=r/2+Math.cos(n*(1+t*.07))*r*.38,c=i/2+Math.sin(n*1.3+t)*i*.3;e.globalAlpha=.18,e.fillStyle=s,e.beginPath(),e.arc(o,c,10+30*Math.abs(Math.sin(n+t)),0,Math.PI*2),e.fill()}e.globalAlpha=1;let u=Math.floor(a/4)%3;e.fillStyle=c,e.textAlign=`center`,e.font=`700 ${Math.round(i*.11)}px system-ui, sans-serif`;let d=[t.advertiser.replace(` (fictional)`,``),t.title.replace(` — Sample Spot`,``),`Imagine your message here`];e.globalAlpha=Math.min(1,a%4*1.5),e.fillText(d[u],r/2,i*.52),e.globalAlpha=1,e.fillStyle=`rgba(0,0,0,0.6)`,e.fillRect(8,8,200,28),e.fillStyle=`#ffd34d`,e.font=`700 14px system-ui, sans-serif`,e.textAlign=`left`,e.fillText(`SAMPLE — NOT A REAL AD`,16,27)}var uh=new ep,dh=document.getElementById(`scene`),fh=document.getElementById(`stage`),ph=document.getElementById(`ui`),mh=new kp,hh=new Pp,gh=new Hp(dh),Q=new xp(dh,mh,hh,gh),_h=new th(new $m,Jm.filter(e=>e.free).map(e=>e.id)),vh=sh(),yh=oh(),bh=new ch(vh,yh),$=Cg();Tg();function xh(){let e=Sg();document.documentElement.dataset.screen=e,Q.camera.compact=e===`mini`?1:e===`phone`?.5:0}xh(),addEventListener(`resize`,xh),window.__gutterball={game:Q,audio:mh,haptics:hh,input:gh,entitlements:_h,adServer:vh,playback:bh};var Sh=`menu`,Ch=null,wh=!1;document.addEventListener(`pointerdown`,async()=>{wh||(wh=!0,await mh.unlock(),Q.material&&mh.configure(Q.material),mh.setMusicLevel($.musicLevel),mh.setGenre($.musicGenre),mh.setVolume($.volume))},{capture:!0});function Th(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.innerHTML=n),r}var Eh=(e,t=ph)=>t.querySelector(e),Dh=0;function Oh(e){let t=Eh(`.toast`);t||(t=Th(`div`,`toast`),ph.appendChild(t)),t.textContent=e,t.classList.add(`show`),clearTimeout(Dh),Dh=window.setTimeout(()=>t.classList.remove(`show`),2600)}function kh(e){return`background: radial-gradient(circle at 35% 35%, #fff8, ${`#`+od[e.materialId].visual.tint.toString(16).padStart(6,`0`)} 45%, #0006 100%)`}function Ah(e){let t=Math.floor(e/60);return`${t}:${(e-t*60).toFixed(1).padStart(4,`0`)}`}function jh(e){return e.free?`<span class="badge free">FREE</span>`:_h.isEntitled(e.id)?`<span class="badge owned">OWNED · SIM</span>`:`<span class="badge price">${Xm(e)}</span>`}var Mh={};function Nh(e,t){t.classList.add(`screen`),t.dataset.screen=e,Mh[e]=t,ph.appendChild(t)}function Ph(e){Sh=e;for(let[t,n]of Object.entries(Mh))n.classList.toggle(`on`,t===e||e===`detail`&&t===`hud`);gh.enabled=e===`hud`}{let e=document.createElement(`div`);e.className=`splash`,e.innerHTML=`<img src="./cover.jpg" alt="Gutterball" />`,document.body.appendChild(e);let t=()=>{e.classList.add(`out`),setTimeout(()=>e.remove(),700)};e.addEventListener(`pointerdown`,t),setTimeout(t,new URLSearchParams(location.search).has(`play`)?0:1900)}var Fh=Th(`div`,`menu`);Nh(`menu`,Fh);function Ih(){let e=Ym(`wood`),t=localStorage.getItem(`gb.best.wood`);Fh.innerHTML=`
    <h1 class="logo"><img class="logo-icon" src="./icon-192.png" alt="" />Gutter<span>ball</span></h1>
    <div class="tag">A physical world you can hold in your hands</div>
    <div class="menu-spacer"></div>
    <button class="hero-play" data-act="play" data-id="wood">
      <div><span class="small">World 1 · Wood · Free forever</span><span class="big">${e.name}</span><span class="small">${t?`Best `+Ah(Number(t)):`Start here`}</span></div>
      <span class="go">▶</span>
    </button>
    <div class="section-h"><h2>Physical worlds</h2><small>Tap to preview</small></div>
    <div class="worlds">
      ${Jm.map((e,t)=>`
        <button class="world" data-act="detail" data-id="${e.id}">
          <span class="swatch" style="${kh(e)}"></span>
          <span class="num">${String(t+1).padStart(2,`0`)}</span>
          <span class="wname">${e.world}</span>
          <span class="wtag">${e.tagline}</span>
          ${jh(e)}
        </button>`).join(``)}
    </div>
    <div class="nav">
      <button data-act="adroom">Ad Room<small>Optional</small></button>
      <button data-act="garage">Garage<small>Cosmetics</small></button>
      <button data-act="settings">Settings<small>Controls</small></button>
    </div>
    <div class="footnote">No ads during play · Wood is free forever · Other worlds are optional<br/>Development build — purchases &amp; ad credits are simulated</div>`}var Lh=Th(`div`,`hud passthrough`);Lh.innerHTML=`
  <div class="top"><div class="progress"><i></i></div><div class="clock">0:00.0</div><button class="pausebtn" data-act="pause" aria-label="Pause">❚❚</button></div>
  <div class="preview-tag" style="display:none"><span class="p">PREVIEW</span><span class="d"></span></div>
  <div class="hint"></div>
  <button class="skipbtn" data-act="skipFinale" style="display:none">Skip ›</button>
  <button class="autobtn" data-act="autoToggle" style="display:none" aria-pressed="false"><span class="dot"></span>AUTO</button>
  <label class="autopace" style="display:none"><span>CHILL</span><input type="range" min="0" max="1" step="0.05" data-autopace aria-label="Auto Ball pace"><span>RIP</span><b class="pacev"></b></label>
  <button class="insanebtn" data-act="insaneToggle" style="display:none" aria-pressed="false">INSANE</button>
  <div class="trick"></div>
  <div class="musicdock"><button class="musicbtn" data-act="musicMenu" aria-label="Music">♪</button><div class="musicmenu"></div></div>
  <div class="launch"><div class="arrow">↑</div><div class="txt">Swipe up to launch</div><div class="sub2"></div><button class="ghostbtn" data-act="ghostToggle" style="display:none"></button></div>
  <div class="replaytag" style="display:none">▶ REPLAY</div>

  <div class="bottom">
    <div><div class="speed">0<small>KM/H</small></div><div class="combo"><i></i><i></i><i></i><span class="turbo"></span></div></div>
    <div class="magring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="5"/><circle class="arc" cx="32" cy="32" r="27" fill="none" stroke="#47e6ff" stroke-width="5" stroke-linecap="round" stroke-dasharray="169.6" stroke-dashoffset="0"/></svg><div class="lbl">MAG</div></div>
  </div>`,Nh(`hud`,Lh);function Rh(){let e=Eh(`.musicmenu`,Lh);e.innerHTML=Sp.map(e=>`<button data-act="genre" data-id="${e.id}" class="${$.musicGenre===e.id?`on`:``}">${e.name}</button>`).join(``)+`<label><span>Level</span><input type="range" min="0" max="1" step="0.05" value="${$.musicLevel}" data-set="musicLevel"></label>`,Eh(`.musicbtn`,Lh).classList.toggle(`muted`,$.musicGenre===`off`)}Rh();var zh=0;Q.cb.onHint=e=>{let t=Eh(`.hint`,Lh);t.textContent=e,t.classList.add(`show`),clearTimeout(zh),zh=window.setTimeout(()=>t.classList.remove(`show`),3200)};var Bh=0,Vh=Th(`div`,`plungerpad`);Lh.prepend(Vh);var Hh=Th(`div`,`powermeter`);Hh.innerHTML=`<i></i><span>POWER</span>`,Lh.appendChild(Hh);{let e=-1,t=0,n=!1,r=()=>Math.max(160,innerHeight*.3),i=e=>{Hh.firstChild.style.height=`${Math.round(e*100)}%`},a=r=>{Q.intro&&!Q.paused&&(e=r,t=performance.now(),n=!1)},o=t=>{if(e<0||!Q.intro)return;let a=t-e;a>4&&(n=!0);let o=Math.max(0,Math.min(1,a/r()));Q.intro.setPull(o),i(o)},s=r=>{if(e<0||!Q.intro)return;let i=r-e,a=performance.now()-t;i<-40&&a<400&&!n?Q.intro.fire():Q.intro.pull<.04?Q.cb.onHint?.(`DRAG DOWN TO PULL THE PLUNGER BACK, THEN LET GO`):Q.intro.release(),e=-1};Vh.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),a(e.touches[0].clientY)},{passive:!1}),Vh.addEventListener(`touchmove`,e=>{e.preventDefault(),e.stopPropagation(),o(e.touches[0].clientY)},{passive:!1}),Vh.addEventListener(`touchend`,e=>{e.preventDefault(),e.stopPropagation(),s(e.changedTouches[0].clientY)},{passive:!1}),Vh.addEventListener(`touchcancel`,t=>{t.stopPropagation(),Q.intro&&Q.intro.release(),e=-1}),Vh.addEventListener(`pointerdown`,e=>{e.pointerType===`mouse`&&(e.stopPropagation(),a(e.clientY))}),window.addEventListener(`pointermove`,e=>{e.pointerType===`mouse`&&o(e.clientY)}),window.addEventListener(`pointerup`,e=>{e.pointerType===`mouse`&&s(e.clientY)});let c=e=>e.code===`Space`||e.key===`ArrowDown`||e.key===`s`;window.addEventListener(`keydown`,e=>{Q.intro&&!Q.paused&&c(e)&&Sh===`hud`&&(e.stopImmediatePropagation(),e.preventDefault(),e.repeat||Q.intro.holdKey(!0))},!0),window.addEventListener(`keyup`,e=>{Q.intro&&c(e)&&(e.stopImmediatePropagation(),e.preventDefault(),Q.intro.holdKey(!1))},!0);let l=()=>{Q.intro&&i(Q.intro.pull),requestAnimationFrame(l)};l()}Q.cb.onHud=e=>{let t=performance.now();if(t-Bh<66||(Bh=t,Sh!==`hud`&&Sh!==`detail`))return;Eh(`.progress i`,Lh).style.width=`${(e.progress*100).toFixed(1)}%`,Eh(`.clock`,Lh).textContent=Ah(e.time),Eh(`.speed`,Lh).firstChild.textContent=String(Math.round(e.speedKmh)),Lh.querySelectorAll(`.combo i`).forEach((t,n)=>t.classList.toggle(`on`,e.turboActive||e.turboArmed||n<e.pushCombo));let n=Eh(`.combo .turbo`,Lh);n.textContent=e.turboActive?`TURBO`:e.turboArmed?`FLICK!`:e.pushCombo>=3?`HOLD MAG`:``,Eh(`.combo`,Lh).classList.toggle(`armed`,e.turboArmed),Eh(`.combo`,Lh).classList.toggle(`live`,e.turboActive),Eh(`.magring .arc`,Lh).style.strokeDashoffset=String(169.6*(1-e.magnetEnergy)),Eh(`.magring`,Lh).classList.toggle(`active`,e.magnetActive);let r=Eh(`.launch`,Lh),i=Q.intro?.phase;{let t=Eh(`.autobtn`,Lh);t.style.display=e.mode===`play`&&!Q.replay?`flex`:`none`,t.classList.toggle(`on`,Q.auto),t.setAttribute(`aria-pressed`,String(Q.auto));let n=Eh(`.autopace`,Lh);n.style.display=e.mode===`play`&&!Q.replay?`flex`:`none`,n.classList.toggle(`idle`,!Q.auto),n.classList.toggle(`dim`,Q.insane);let r=Eh(`.insanebtn`,Lh);r.style.display=e.mode===`play`&&!Q.replay?`block`:`none`,r.classList.toggle(`on`,Q.insane),r.setAttribute(`aria-pressed`,String(Q.insane));let i=Eh(`.trick`,Lh),a=e.phase===`running`?Q.autoTrick:``;i.textContent!==a&&(i.textContent=a,i.classList.toggle(`show`,!!a))}r.style.display=e.phase===`ready`&&e.mode===`play`&&(!Q.intro||i===`ready`)?`block`:`none`,Eh(`.launch .txt`,Lh).textContent=Q.intro?`Pull back and let go`:`Swipe up to launch`,Eh(`.launch .arrow`,Lh).textContent=Q.intro?`↓`:`↑`,r.classList.toggle(`plunger`,!!Q.intro),Vh.style.display=Q.intro&&e.mode===`play`&&(i===`ready`||i===`pulling`)?`block`:`none`,Hh.style.display=Q.intro&&e.mode===`play`&&i!==`done`?`flex`:`none`;{let t=Eh(`.ghostbtn`,Lh),n=!!Q.ghost&&e.phase===`ready`&&e.mode===`play`;t.style.display=n?`inline-block`:`none`,n&&(t.textContent=`👻 Ghost ${Ah(Q.ghost.time)} · ${Q.ghostOn?`ON`:`OFF`}`,t.classList.toggle(`off`,!Q.ghostOn)),Eh(`.replaytag`,Lh).style.display=Q.replay?`block`:`none`}Eh(`.pausebtn`,Lh).style.display=e.mode===`play`?`grid`:`none`,Eh(`.skipbtn`,Lh).style.display=e.mode===`play`&&e.phase===`finished`&&Sh===`hud`?`block`:`none`,Eh(`.bottom`,Lh).style.opacity=e.mode===`play`?e.phase===`finished`||Q.intro?`0`:`1`:`0.7`},Q.cb.onFinaleDone=(e,t)=>{Q.mode===`play`&&Jh(e,t)},Q.cb.onPhase=e=>{Q.mode===`play`&&(e===`finished`&&Oh(`FINISH!`),e===`respawning`&&Oh(`Reset!`))};function Uh(){return gh.mode===`tilt`?`Tilt left/right to steer · tilt the top toward you to jump · tilt it away for the magnet`:`← → steer · Space jump · Shift magnet · ↑/↓ propulsion (desktop testing)`}var Wh=Th(`div`,`results`);Nh(`pause`,Wh);function Gh(){Q.mode===`play`&&(Q.replay?(Q.stopReplay(),Q.restart(),Qh()):(Q.paused=!0,Wh.innerHTML=`
    <div class="lbl">Paused</div><div class="big" style="font-size:56px">${Q.course?.world}</div>
    <div class="note" style="margin:10px 0 26px">${Uh()}</div>
    <div class="row" style="width:min(420px,100%);flex-direction:column">
      <button class="btn primary" data-act="resume">Resume</button>
      <div class="row"><button class="btn" data-act="restart">Restart</button><button class="btn" data-act="calibrate">Recalibrate tilt</button></div>
      <div class="row"><button class="btn" data-act="settings">Settings</button><button class="btn" data-act="menu">Quit to menu</button></div>
    </div>`,Ph(`pause`)))}gh.onPause=()=>{Sh===`hud`?Gh():Sh===`pause`&&Kh()};function Kh(){Q.paused=!1,Ph(`hud`)}var qh=Th(`div`,`results`);Nh(`results`,qh);function Jh(e=0,t=``){if(!Q.run||!Q.course)return;let n=Q.run.finishTime,r=`gb.best.${Q.course.id}`,i=Number(localStorage.getItem(r)??`Infinity`),a=Q.autoUsed,o=!a&&n<i;o&&localStorage.setItem(r,String(n));let s=a?`Auto Ball run · not counted${Number.isFinite(i)?` · your best `+Ah(i):``}`:o?`New personal best`:`Best `+Ah(i);qh.innerHTML=`
    <div class="lbl">${Q.course.name} · complete</div>
    <div class="big">${Ah(n)}</div>
    <div class="lbl" style="color:${o?`var(--wood)`:a?`#7fe6ff`:`var(--ink-faint)`}">${s}</div>
    <div class="stats"><div><b>${Q.run.falls}</b>falls</div><div><b>${(Q.track.length/1e3).toFixed(2)} km</b>distance</div>${t===`plinko`?`<div><b>${e.toLocaleString()}</b>Plinko</div>`:``}</div>
    <div class="row"><button class="btn primary" data-act="restart">${a?`Race the Auto Ball`:`Run again`+(Q.lastRun?` vs ghost`:``)}</button><button class="btn" data-act="menu">Menu</button></div>
    <div class="row" style="margin-top:10px">${Yh()}<button class="btn" data-act="savedRuns">Saved runs (${uh.list(Q.course.id).length})</button></div>`,Ph(`results`)}function Yh(){let e=Q.lastRun;return!e||!Q.course?``:Q.autoUsed?`<button class="btn" disabled>Auto runs aren’t saved</button>`:uh.isSaved(e.course,e.date)?`<button class="btn" disabled>Saved ✓</button>`:uh.qualifies(e.course,e.time)?`<button class="btn" data-act="saveRun">Save run</button>`:`<button class="btn" disabled>Not in your 10 best</button>`}var Xh=Th(`div`,`results`);Nh(`saved`,Xh);var Zh=`results`;function Qh(){if(!Q.course)return;let e=uh.list(Q.course.id),t=e=>new Date(e).toLocaleDateString(void 0,{month:`short`,day:`numeric`});Xh.innerHTML=`
    <div class="lbl">${Q.course.world} · your 10 best runs</div>
    <div class="savedlist">${e.length?e.map((e,n)=>`
      <div class="savedrow"><b>${n+1}</b><span class="t">${Ah(e.time)}</span><span class="d">${t(e.date)}${e.falls?` · ${e.falls} fall${e.falls>1?`s`:``}`:``}</span>
        <button class="btn sm primary" data-act="raceSaved" data-id="${e.date}">Race</button><button class="btn sm" data-act="watchSaved" data-id="${e.date}">Watch</button><button class="btn sm x" data-act="delSaved" data-id="${e.date}" aria-label="Delete">✕</button></div>`).join(``):`<div class="note" style="margin:24px 0">No saved runs yet. Finish a run and tap “Save run”.</div>`}</div>
    <div class="row" style="margin-top:18px"><button class="btn" data-act="savedBack">Back</button></div>`,Ph(`saved`)}Q.cb.onReplayDone=()=>{Q.restart(),Qh()};var $h=Th(`div`,`passthrough`);Nh(`detailSheet`,$h);function eg(e){Ch=e,Q.load(e,`preview`);let t=Eh(`.preview-tag`,Lh);t.style.display=`flex`,Eh(`.d`,t).textContent=`${e.world} — ${e.previewFocus}`,tg(),Sh=`detail`;for(let[e,t]of Object.entries(Mh))t.classList.toggle(`on`,e===`hud`||e===`detailSheet`);gh.enabled=!1}function tg(){let e=Ch,t=_h.isEntitled(e.id),n=od[e.materialId];$h.innerHTML=`
    <div class="sheet">
      <div class="grab"></div>
      <h3>${e.world}</h3>
      <p class="sub">${e.name} · ${e.tagline}. ${e.previewFocus}.</p>
      <div class="card">
        <div class="kv"><span>Grip (static / sliding)</span><span>${n.muStatic.toFixed(2)} / ${n.muKinetic.toFixed(2)}</span></div>
        <div class="kv"><span>Rolling resistance</span><span>${n.rollingResistance.toFixed(3)}</span></div>
        <div class="kv"><span>Bounce</span><span>${n.restitution.toFixed(2)}</span></div>
        <div class="kv"><span>Medium</span><span>${n.medium===`none`?`solid surface`:n.medium}</span></div>
        <div class="kv"><span>Course</span><span>${e.status===`designed`?`hand-designed`:`prototype layout`}</span></div>
      </div>
      <div class="row">
        ${t?`<button class="btn primary" data-act="play" data-id="${e.id}">Play</button>`:`<button class="btn primary" data-act="buy" data-id="${e.id}">Buy ${Xm(e)} <span class="sim" style="margin-left:6px">simulated</span></button>`}
        <button class="btn" data-act="closeDetail">Back</button>
      </div>
      <div class="note">${e.free?`Included free, permanently — a complete course, not a trial.`:`Watching the preview never grants ownership. This development build uses a purchase <b>simulator</b>: no money is charged and no store is contacted. Real purchases will use the App Store / Google Play.`}</div>
    </div>`}Q.cb.onPreviewEnd=()=>{Sh===`detail`&&Ch&&Q.load(Ch,`preview`)};var ng=Th(`div`,`passthrough`);Nh(`controls`,ng);var rg=null,ig=()=>matchMedia(`(pointer: coarse)`).matches;function ag(e,t){rg=e;let n=window.top!==window.self;ng.innerHTML=`
    <div class="sheet">
      <div class="grab"></div>
      <h3>${t?`Tilt sensors are off`:`Steer by tilting`}</h3>
      <p class="sub">${t?n?`This page is running inside a preview frame that blocks the motion sensors, so tilt cannot work here. Open the game's own web link in Safari instead.`:`The game needs motion access to steer. Tap "Enable tilt" and choose Allow. If you chose Don't Allow earlier, close this tab, reopen the game link in Safari, and allow it when asked.`:`Hold the device comfortably — that position becomes neutral when you launch.`}</p>
      <div class="card">
        <div class="kv"><span>Steer</span><span>tilt left / right</span></div>
        <div class="kv"><span>Jump</span><span>tilt the top toward you</span></div>
        <div class="kv"><span>Magnet tractor beam</span><span>tilt the top away, hold</span></div>
        <div class="kv"><span>Launch / push faster</span><span>swipe up</span></div>
        <div class="kv"><span>Brake</span><span>swipe back down over the ball</span></div>
        <div class="kv"><span>Shove left / right</span><span>swipe sideways (or diagonally)</span></div>
      </div>
      <div class="row" style="flex-direction:column">
        <button class="btn primary" data-act="useTilt">${t?`Try again`:`Enable tilt and play`}</button>
        <button class="btn" data-act="menu">Back</button>
      </div>
      <div class="note">Tip: turn on Rotation Lock in Control Center so the screen never rotates while you steer.</div>
    </div>`,Ph(`controls`)}async function og(e){_h.isEntitled(e.id)?(Eh(`.preview-tag`,Lh).style.display=`none`,Q.load(e,`play`),Eh(`.launch .sub2`,Lh).textContent=Uh(),Ph(`hud`),Q.cb.onHint?.(gh.mode===`tilt`?`Hold the device comfortably, then swipe up to launch`:`Press ↑ to launch`)):eg(e)}var sg=Th(`div`,`panel`);Nh(`adroom`,sg);var cg=ah[0].adId,lg=0;function ug(){let e=vh.balanceMs(yh)/1e3,t=Km.rewardThresholdSeconds,n=bh.state,r=bh.creative??ah.find(e=>e.adId===cg),i=bh.lastSettlement,a=nh.reduce((e,t)=>e+t.weight,0),o=vh.activeRewards(yh),s=vh.campaignReport(r.campaignId);sg.innerHTML=`
    <div class="panel-head"><button class="back" data-act="menu">←</button><h2>Ad Room</h2><span class="sim">simulation</span></div>
    <div class="adbanner">DEVELOPMENT SIMULATION. These are sample spots for fictional brands — not real advertising. Credits are tracked by an in-app mock server and are <b>not production-verified</b>; no money moves. Ads never appear during gameplay.</div>
    <div class="player"><canvas width="640" height="360"></canvas>
      ${n===`idle`?`<div class="ov"><div><div style="font-weight:700;font-size:18px">${r.title}</div><div class="note" style="margin:6px 0 12px">${r.advertiser} · ${(r.durationMs/1e3).toFixed(0)} s · nothing plays until you press Start</div><button class="btn magnet" data-act="adStart" style="padding:12px 28px">▶ Start</button></div></div>`:``}
      ${n===`ended`?`<div class="ov"><div><div class="lbl" style="font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--ink-dim)">${i?.completed?`WATCHED TO THE END`:`STOPPED`}</div><div style="font-size:40px;font-weight:800">+${((i?.creditedMs??0)/1e3).toFixed(1)} s</div><div class="note">${i?.outcome===`SETTLED`?`credited (simulated)`:`not credited`}${i?.reasons.length?` · `+i.reasons.join(`; `):``}</div><button class="btn" data-act="adDismiss" style="margin-top:12px;padding:10px 24px">Choose another</button></div></div>`:``}
    </div>
    <div class="timers">
      <div><b class="t-el">${(bh.mediaMs/1e3).toFixed(1)}</b><small>played</small></div>
      <div><b class="t-cr">${(bh.serverEligibleMs/1e3).toFixed(1)}</b><small>eligible (server)</small></div>
      <div><b>${e.toFixed(1)}</b><small>balance s</small></div>
    </div>
    ${n===`playing`||n===`paused`?`<div class="row" style="margin-bottom:14px"><button class="btn" data-act="${n===`playing`?`adPause`:`adResume`}">${n===`playing`?`Pause`:`Resume`}</button><button class="btn danger" data-act="adStop">Stop — keep my seconds</button></div>`:``}
    <div class="ads">${ah.map(e=>`<button class="ad ${e.adId===cg?`sel`:``}" data-act="adSelect" data-id="${e.adId}" ${n===`playing`||n===`paused`?`disabled`:``}><div class="t">${e.title.replace(` — Sample Spot`,``)}</div><div class="a">${e.advertiser}</div><div class="d">${(e.durationMs/1e3).toFixed(0)} s · SAMPLE</div></button>`).join(``)}</div>
    <div class="card">
      <h4>Rewards</h4>
      <div class="meter"><i style="width:${Math.min(100,e/t*100).toFixed(1)}%"></i></div>
      <div class="kv"><span>Progress to next reward</span><span>${Math.min(e,t).toFixed(1)} / ${t} s</span></div>
      <button class="btn magnet" style="width:100%;margin-top:10px" data-act="redeem" ${e>=t?``:`disabled`}>Redeem ${t} s for a random ${Km.rewardDurationDays}-day cosmetic</button>
      <div class="note">Odds: ${nh.map(e=>`${e.name} ${(e.weight/a*100).toFixed(0)}%`).join(` · `)}. Cosmetic only — never affects physics. No cash value. Thresholds and durations are provisional.</div>
      ${o.length?`<div style="margin-top:10px">${o.map(e=>`<div class="kv"><span>${e.def.name}</span><span>expires ${new Date(e.expiresAt).toLocaleDateString()}</span></div>`).join(``)}</div>`:``}
    </div>
    <div class="card">
      <h4>Advertiser view <span class="sim">simulated</span></h4>
      <div class="kv"><span>Campaign</span><span>${r.advertiser.replace(` (fictional)`,``)}</span></div>
      <div class="kv"><span>Sessions started</span><span>${s.started}</span></div>
      <div class="kv"><span>Completed / partial views</span><span>${s.completedViews} / ${s.partialViews}</span></div>
      <div class="kv"><span>Invalidated</span><span>${s.invalidated}</span></div>
      <div class="kv"><span>Billable seconds</span><span>${s.billableSeconds.toFixed(1)}</span></div>
      <div class="kv"><span>Avg qualifying watch</span><span>${s.avgWatchSeconds.toFixed(1)} s</span></div>
      <div class="kv"><span>Simulated charges (provisional rate)</span><span>$${(s.chargesMicros/1e6).toFixed(4)}</span></div>
      <div class="note">Advertisers pay only for qualifying seconds actually played — a stop at 11 s of a 25 s spot bills 11 s. Measures playback, not attention.</div>
    </div>
    <div class="card"><h4>Ledger (append-only, simulated)</h4><div class="ledger">${vh.ledger.slice(-14).reverse().map(e=>`#${e.id} ${e.type} ${e.ms===void 0?``:(e.ms/1e3).toFixed(1)+`s`} ${e.micros===void 0?``:`$`+(e.micros/1e6).toFixed(4)} ${e.rewardId??``}`).join(`<br/>`)||`No entries yet.`}</div></div>`,dg()}function dg(){let e=Eh(`.player canvas`,sg);e&&lh(e.getContext(`2d`),bh.creative??ah.find(e=>e.adId===cg),bh.mediaMs,e.width,e.height)}function fg(){if(lg=requestAnimationFrame(fg),bh.tick(),bh.state===`playing`){dg();let e=Eh(`.t-el`,sg);e&&(e.textContent=(bh.mediaMs/1e3).toFixed(1))}}bh.onUpdate=()=>{Sh===`adroom`&&ug()};var pg=Th(`div`,`panel`);Nh(`garage`,pg);var mg={skin:`steel`,beam:`cyan`,trail:!1};function hg(){let e=vh.activeRewards(yh),t=[`steel`,...e.filter(e=>e.def.kind===`skin`).map(e=>e.def.value)],n=[`cyan`,...e.filter(e=>e.def.kind===`beam`).map(e=>e.def.value)],r=e.some(e=>e.def.kind===`trail`);return{skins:[...new Set(t)],beams:[...new Set(n)],trail:r,act:e}}function gg(){let e={...mg};try{e={...e,...JSON.parse(localStorage.getItem(`gb.cosmetics`)??`{}`)}}catch{}let t=hg();t.skins.includes(e.skin)||(e.skin=`steel`),t.beams.includes(e.beam)||(e.beam=`cyan`),t.trail||(e.trail=!1),Q.cosmetics=e,Q.applyCosmetics()}function _g(){let e=hg(),t=Q.cosmetics,n=e=>nh.find(t=>t.value===e)?.name??(e===`steel`?`Polished Steel (standard)`:e===`cyan`?`Cyan (standard)`:e);pg.innerHTML=`
    <div class="panel-head"><button class="back" data-act="menu">←</button><h2>Garage</h2></div>
    <div class="card"><h4>Ball</h4>${e.skins.map(e=>`<label class="set"><span>${n(e)}</span><input type="radio" name="skin" value="${e}" ${t.skin===e?`checked`:``} data-cos="skin"></label>`).join(``)}</div>
    <div class="card"><h4>Tractor beam</h4>${e.beams.map(e=>`<label class="set"><span>${n(e)}</span><input type="radio" name="beam" value="${e}" ${t.beam===e?`checked`:``} data-cos="beam"></label>`).join(``)}</div>
    ${e.trail?`<div class="card"><h4>Effects</h4><label class="set"><span>Aurora rolling trail</span><input class="toggle" type="checkbox" ${t.trail?`checked`:``} data-cos="trail"></label></div>`:``}
    <div class="note">Cosmetics change appearance only — the ball's collision shape, mass and handling never change. Extra options appear here as temporary rewards from the optional Ad Room.</div>`}var vg=Th(`div`,`panel`);Nh(`settings`,vg);var yg=`menu`;function bg(){let e=gh.settings;vg.innerHTML=`
    <div class="panel-head"><button class="back" data-act="settingsBack">←</button><h2>Settings</h2></div>
    <div class="card"><h4>Controls</h4>
      <label class="set"><span>Mode</span><select data-set="mode"><option value="tilt" ${gh.mode===`tilt`?`selected`:``}>Tilt</option><option value="keyboard" ${gh.mode===`keyboard`?`selected`:``}>Keyboard (desktop)</option></select></label>
      <label class="set"><span>Steering sensitivity <span class="note sens-val" style="display:inline">(full lock at ${(e.maxTilt/e.sensitivity).toFixed(0)}°)</span></span><input id="set-sens" type="range" min="0.5" max="3" step="0.05" value="${e.sensitivity}" data-set="sensitivity"></label>
      <label class="set"><span>Tilt dead zone</span><input id="set-dz" type="range" min="0" max="5" step="0.25" value="${e.deadzone}" data-set="deadzone"></label>
      <label class="set"><span>Keep view steady if the screen rotates</span><input id="set-keep" class="toggle" type="checkbox" ${e.keepView?`checked`:``} data-set="keepView"></label>
      <label class="set"><span>Jump flick threshold</span><input type="range" min="8" max="30" step="1" value="${e.jumpThreshold}" data-set="jumpThreshold"></label>
      <label class="set"><span>Magnet tilt threshold</span><input type="range" min="6" max="25" step="1" value="${e.magnetThreshold}" data-set="magnetThreshold"></label>
      <label class="set"><span>Pinball plunger launch</span><input class="toggle" type="checkbox" ${$.pinballIntro===!1?``:`checked`} data-set="pinballIntro"></label>
      <label class="set"><span>Invert steering</span><input class="toggle" type="checkbox" ${e.invertSteer?`checked`:``} data-set="invertSteer"></label>
      <div class="calib" style="margin-top:10px"><div class="dot-area"><div class="dot"></div></div><div style="flex:1"><div class="note" style="margin:0 0 6px">Hold the device the way you like to play, then set neutral. Tilt like a steering wheel.</div><div class="meter" style="margin:0 0 8px;position:relative"><i class="steer-bar" style="position:absolute;left:50%;width:0"></i></div><button class="btn" data-act="enableTilt">Enable tilt sensors</button><button class="btn" style="margin-top:8px;width:100%" data-act="calibrate">Set neutral here</button></div></div>
    </div>
    <div class="card"><h4>Feel</h4>
      <label class="set"><span>Haptics <span class="note" style="display:inline">(${hh.driver.tier===`none`?`no actuator detected`:hh.driver.tier})</span></span><input class="toggle" type="checkbox" ${$.haptics?`checked`:``} data-set="haptics"></label>
      <label class="set"><span>Haptic strength</span><input type="range" min="0.2" max="1" step="0.05" value="${$.hapticStrength}" data-set="hapticStrength"></label>
      <button class="btn" style="width:100%;margin-top:6px" data-act="testHaptic">Test haptics</button>
      <label class="set"><span>Fractal glow on the gutter</span><input id="set-fx" type="range" min="0" max="1" step="0.05" value="${$.fractal}" data-set="fractal"></label>
      <label class="set"><span>Speed effects (blur, shake)</span><input id="set-speedfx" type="range" min="0" max="1" step="0.05" value="${$.speedFx}" data-set="speedFx"></label>
      <label class="set"><span>Volume</span><input type="range" min="0" max="1" step="0.05" value="${$.volume}" data-set="volume"></label>
      <label class="set"><span>Music</span><select data-set="musicGenre">${Sp.map(e=>`<option value="${e.id}" ${$.musicGenre===e.id?`selected`:``}>${e.name}</option>`).join(``)}</select></label>
      <label class="set"><span>Music volume</span><input type="range" min="0" max="1" step="0.05" value="${$.musicLevel}" data-set="musicLevel"></label>
    </div>
    <div class="card"><h4>Graphics</h4>
      <label class="set"><span>Quality</span><select data-set="quality"><option value="high" ${Q.quality===`high`?`selected`:``}>High (shadows)</option><option value="low" ${Q.quality===`low`?`selected`:``}>Battery saver</option></select></label>
      <div class="kv"><span>Frame rate</span><span class="fps">${Q.fps.toFixed(0)} fps</span></div>
    </div>
    <div class="card"><h4>Purchases</h4>
      <button class="btn" style="width:100%" data-act="restore">Restore purchases</button>
      <div class="note">Development build: purchases are simulated locally (${_h.provider.kind}).</div>
      <button class="btn danger" style="width:100%;margin-top:10px" data-act="resetSim">Reset simulated purchases &amp; Ad Room data</button>
    </div>
    <div class="note">Gutterball 0.1.0 · <a href="https://github.com/whitewolfcreativeworks-coder/gutterball-game" style="color:inherit">source</a></div>`}function xg(){if(requestAnimationFrame(xg),Sh!==`settings`)return;let e=Eh(`.calib .dot`,vg);if(!e)return;let t=gh.tiltReadout(),n=Math.max(-1,Math.min(1,t.roll/30))*47,r=Math.max(-1,Math.min(1,-t.pitch/30))*47;e.style.transform=`translate(${n}px, ${r}px)`;let i=Eh(`.steer-bar`,vg);if(i){let e=t.steer;i.style.width=`${Math.abs(e)*50}%`,i.style.left=e<0?`${50-Math.abs(e)*50}%`:`50%`}let a=Eh(`.sens-val`,vg);a&&(a.textContent=`(full lock at ${(gh.settings.maxTilt/gh.settings.sensitivity).toFixed(0)}°)`);let o=Eh(`.fps`,vg);o&&(o.textContent=`${Q.fps.toFixed(0)} fps`)}xg();function Sg(){let e=Math.min(innerWidth,innerHeight),t=Math.max(innerWidth,innerHeight);return e<380||t<700?`mini`:e<500?`phone`:`tablet`}function Cg(){let e=Sg(),t={haptics:!0,hapticStrength:.8,volume:.85,music:!0,musicGenre:`ambient`,musicLevel:.5,fractal:e===`tablet`?.6:e===`phone`?.5:.42,speedFx:e===`tablet`?.8:e===`phone`?.7:.6,pinballIntro:!0,input:void 0,mode:void 0,inputVersion:0};try{return{...t,...JSON.parse(localStorage.getItem(`gb.settings`)??`{}`)}}catch{return t}}function wg(){$.input=gh.settings,$.mode=gh.mode,localStorage.setItem(`gb.settings`,JSON.stringify($))}function Tg(){$.input&&($.input.keepView===void 0||($.inputVersion??0)<6)&&($.input=void 0),$.inputVersion=6,$.input&&(gh.settings={...gh.settings,...$.input}),$.mode===`keyboard`&&!matchMedia(`(pointer: coarse)`).matches&&(gh.mode=`keyboard`),hh.enabled=$.haptics,Q.fractalLevel=$.fractal,Q.speedFx=$.speedFx,Q.introEnabled=$.pinballIntro!==!1,hh.intensity=$.hapticStrength,mh.setVolume($.volume),$.music===!1&&$.musicGenre===`ambient`&&($.musicGenre=`off`),mh.setMusicLevel($.musicLevel),mh.setGenre($.musicGenre)}gh.onLaunch=()=>{let e=Q.launch();return e&&(Eg=Vp(),Og()),e},gh.onRestart=()=>{(Sh===`hud`||Sh===`results`)&&(Q.restart(),Ph(`hud`))},ph.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-act]`);if(!t)return;let n=t.dataset.act,r=t.dataset.id;switch(mh.ui(`tap`),n){case`play`:{let e=Ym(r);if(!_h.isEntitled(e.id)){eg(e);break}if(!ig()){gh.mode=`keyboard`,og(e);break}await gh.requestSensors()?og(e):ag(e,!0);break}case`useTilt`:await gh.requestSensors()?og(rg):ag(rg,!0);break;case`detail`:eg(Ym(r));break;case`closeDetail`:kg();break;case`buy`:{let e=Ym(r);t.setAttribute(`disabled`,``);let n=await _h.purchase(e.id,e.productId);n.ok?(Oh(`${e.world} unlocked (simulated purchase — nothing charged)`),mh.ui(`reward`)):Oh(n.error??`Purchase failed`),tg();break}case`pause`:Gh();break;case`skipFinale`:Q.skipFinale();break;case`musicMenu`:Eh(`.musicdock`,Lh).classList.toggle(`open`),Rh();break;case`genre`:$.musicGenre=r,mh.setGenre(r),wg(),Rh();break;case`resume`:Kh();break;case`insaneToggle`:Q.setInsane(!Q.insane),Oh(Q.insane?`INSANE: physics off the leash. Launch it and hold on`:`INSANE off`);break;case`autoToggle`:Q.setAuto(!Q.auto),Oh(Q.auto?`AUTO BALL on: launch it and kick back`:`AUTO BALL off: you have it`);break;case`ghostToggle`:Q.ghostOn=!Q.ghostOn;break;case`saveRun`:{let e=Q.lastRun;if(e){let t=uh.save(e);Oh(t?`Saved — #${t} of your best runs`:`Couldn’t save (storage full?)`)}Jh();break}case`savedRuns`:Zh=Sh,Qh();break;case`savedBack`:Zh===`results`&&Q.run?.phase===`finished`?Jh():Ph(`hud`);break;case`raceSaved`:{let e=Q.course&&uh.load(Q.course.id,Number(r));e&&(Q.paused=!1,Q.raceGhost(e),Ph(`hud`));break}case`watchSaved`:{let e=Q.course&&uh.load(Q.course.id,Number(r));e&&(Q.paused=!1,Q.watch(e),Ph(`hud`));break}case`delSaved`:Q.course&&(uh.remove(Q.course.id,Number(r)),Qh());break;case`restart`:Q.paused=!1,Q.restart(),Ph(`hud`);break;case`calibrate`:gh.calibrate(),Oh(`Neutral position set`);break;case`enableTilt`:Oh(await gh.requestSensors()?`Tilt sensors on`:`Tilt sensors unavailable on this device`),wg(),bg();break;case`menu`:Q.paused=!1,kg();break;case`adroom`:bh.dismiss(),ug(),Ph(`adroom`),cancelAnimationFrame(lg),fg();break;case`adSelect`:cg=r,ug();break;case`adStart`:bh.start(ah.find(e=>e.adId===cg)),bh.error&&Oh(bh.error);break;case`adPause`:bh.pause();break;case`adResume`:bh.resume();break;case`adStop`:bh.stop();break;case`adDismiss`:bh.dismiss();break;case`redeem`:try{let e=vh.redeem(yh,`${yh}-${Date.now()}`);mh.ui(`reward`),Oh(`You got: ${e.def.name} for ${Km.rewardDurationDays} days — equip it in the Garage`)}catch(e){Oh(e.message)}ug();break;case`garage`:_g(),Ph(`garage`);break;case`settings`:yg=Sh===`pause`?`pause`:`menu`,bg(),Ph(`settings`);break;case`settingsBack`:wg(),yg===`pause`?Gh():kg();break;case`testHaptic`:hh.test(),hh.driver.tier===`none`&&Oh(`No vibration hardware available here — gameplay is unaffected`);break;case`restore`:Oh(`Restored ${(await _h.restore()).length} simulated purchase(s)`);break;case`resetSim`:_h.provider.reset?.(),vh.resetAll(),await _h.refresh(),gg(),Oh(`Simulation data cleared`),bg()}}),ph.addEventListener(`input`,e=>{let t=e.target,n=t.dataset.set;if(n){let e=t.type===`checkbox`?t.checked:t.type===`range`?Number(t.value):t.value;n in gh.settings&&(gh.settings[n]=e),n===`mode`&&(gh.mode=e,e===`tilt`&&gh.requestSensors()),n===`keepView`&&Og(),n===`haptics`&&($.haptics=!!e,hh.enabled=!!e),n===`hapticStrength`&&($.hapticStrength=Number(e),hh.intensity=Number(e)),n===`volume`&&($.volume=Number(e),mh.setVolume(Number(e))),n===`musicGenre`&&($.musicGenre=e,mh.setGenre(e),Rh()),n===`musicLevel`&&($.musicLevel=Number(e),mh.setMusicLevel(Number(e))),n===`quality`&&Q.setQuality(e),n===`fractal`&&($.fractal=Number(e),Q.fractalLevel=Number(e)),n===`speedFx`&&($.speedFx=Number(e),Q.speedFx=Number(e)),n===`pinballIntro`&&($.pinballIntro=!!e,Q.introEnabled=!!e),wg()}let r=t.dataset.cos;if(r){let e={...Q.cosmetics};r===`trail`?e.trail=t.checked:e[r]=t.value,Q.cosmetics=e,localStorage.setItem(`gb.cosmetics`,JSON.stringify(e)),Q.applyCosmetics()}});var Eg=null,Dg=!1;function Og(){let e=0;Eg!==null&&(Sh===`hud`||Sh===`pause`||Sh===`results`)&&gh.settings.keepView&&(e=-((Vp()-Eg+540)%360-180),e===-180&&(e=180)),fh.classList.toggle(`rot90`,e===90),fh.classList.toggle(`rot-90`,e===-90),fh.classList.toggle(`rot180`,e===180),gh.displayRotation=e,Q.resize(),e!==0&&!Dg&&(Dg=!0,Oh(`Tip: turn on Rotation Lock in Control Center so the screen never rotates while you steer`))}addEventListener(`orientationchange`,()=>setTimeout(Og,50)),addEventListener(`resize`,()=>setTimeout(Og,50)),window.screen.orientation?.addEventListener?.(`change`,()=>setTimeout(Og,50));function kg(){Ch=null,Eg=null,Eh(`.preview-tag`,Lh).style.display=`none`,(Q.mode!==`attract`||Q.course?.id!==`wood`)&&Q.load(Ym(`wood`),`attract`),Ih(),Ph(`menu`)}_h.onChange(()=>{Sh===`menu`&&Ih()}),(async()=>{await _h.init(),gg(),kg();let e=new URLSearchParams(location.search);if(e.get(`play`)){gh.mode=e.get(`mode`)??gh.mode,og(Ym(e.get(`play`))),e.get(`launch`)&&setTimeout(()=>{e.get(`intro`)!==`1`&&Q.skipIntro(),Q.launch()},600);let t=Number(e.get(`at`));e.get(`auto`)===`1`&&Q.setAuto(!0),e.get(`insane`)===`1`&&Q.setInsane(!0),t>0&&setTimeout(()=>{Q.skipIntro(),Q.launch(),Q.run?.ball.placeAt(t,Number(e.get(`v`)??18),0,Number(e.get(`branch`)??0)),Q.camera.snap()},700)}else e.get(`preview`)?eg(Ym(e.get(`preview`))):e.get(`screen`)===`adroom`?(ug(),Ph(`adroom`),fg()):e.get(`screen`)===`settings`&&(bg(),Ph(`settings`))})();