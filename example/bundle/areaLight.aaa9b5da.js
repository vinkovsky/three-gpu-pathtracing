var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequire5b70;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequire5b70=n);var i=n("ilwiq"),r=n("RPVlj"),o=n("5Rd1x"),d=n("4CEV9"),s=n("cVdfP"),l=n("891vQ"),h=n("jiuw3"),g=n("fUhpq"),c=n("7lx9d"),m=n("kp7Te");let u,p,w,C,L,y,b,f,v,I,F,x;const E={controls:!0,areaLight1Enabled:!0,areaLight1IsCircular:!1,areaLight1Intensity:2,areaLight1Color:"#ffffff",areaLight1Width:1,areaLight1Height:1,areaLight2Enabled:!0,areaLight2IsCircular:!1,areaLight2Intensity:10,areaLight2Color:"#ff0000",areaLight2Width:1.25,areaLight2Height:2.75,environmentIntensity:.03,environmentRotation:0,bounces:5,samplesPerFrame:1,resolutionScale:1/window.devicePixelRatio,filterGlossyFactor:.5,tiles:1,multipleImportanceSampling:!0};function M(){L[0].isCircular=E.areaLight1IsCircular,L[0].intensity=E.areaLight1Intensity,L[0].width=E.areaLight1Width,L[0].height=E.areaLight1Height,L[0].color.set(E.areaLight1Color).convertSRGBToLinear(),L[1].isCircular=E.areaLight2IsCircular,L[1].intensity=E.areaLight2Intensity,L[1].width=E.areaLight2Width,L[1].height=E.areaLight2Height,L[1].color.set(E.areaLight2Color).convertSRGBToLinear(),I=[],E.areaLight1Enabled&&I.push(L[0]),E.areaLight2Enabled&&I.push(L[1]),b.material.lights.updateFrom(I),b.reset()}function P(){const e=window.innerWidth,t=window.innerHeight,a=E.resolutionScale,n=window.devicePixelRatio;b.setSize(e*a*n,t*a*n),b.reset(),u.setSize(e,t),u.setPixelRatio(window.devicePixelRatio*a),f.aspect=e/t,f.updateProjectionMatrix()}function S(){requestAnimationFrame(S),b.material.materials.updateFrom(y.materials,y.textures),b.material.lights.updateFrom(I),b.material.filterGlossyFactor=E.filterGlossyFactor,b.material.environmentIntensity=E.environmentIntensity,b.material.environmentBlur=.35,b.material.bounces=E.bounces,f.updateMatrixWorld();for(let e=0,t=E.samplesPerFrame;e<t;e++)b.update();u.autoClear=!1,v.render(u),u.render(C,f),u.autoClear=!0,F.innerText=`Samples: ${Math.floor(b.samples)}`}window.innerWidth/window.innerHeight<.65&&(E.bounces=Math.min(E.bounces,10),E.resolutionScale*=.5,E.tiles=3),async function(){u=new i.WebGLRenderer({antialias:!0}),u.outputEncoding=i.sRGBEncoding,u.toneMapping=i.ACESFilmicToneMapping,document.body.appendChild(u.domElement),f=new i.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.025,500),f.position.set(0,.6,2.65),b=new d.PathTracingRenderer(u),b.camera=f,b.material=new d.PhysicalPathTracingMaterial,b.tiles.set(E.tiles,E.tiles),v=new r.FullScreenQuad(new i.MeshBasicMaterial({map:b.target.texture})),p=new o.OrbitControls(f,u.domElement),p.target.set(0,.33,-.08),f.lookAt(p.target),p.addEventListener("change",(()=>{b.reset()})),p.update(),f.lookAt(-.15,.33,-.08),F=document.getElementById("samples"),x=document.getElementById("loading");const e=(new l.RGBELoader).setDataType(i.FloatType).loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/leadenhall_market_1k.hdr").then((e=>{b.material.envMapInfo.updateFrom(e)})),t=new i.Group,a=new i.Box3,{scene:n}=await(new c.GLTFLoader).setMeshoptDecoder(m.MeshoptDecoder).loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/mercury-about-to-kill-argos/scene.glb");n.traverse((e=>{e.material&&(e.material.map=null)})),n.scale.setScalar(.01),n.position.x=.05,n.updateMatrixWorld(!0),a.setFromObject(n),n.position.y-=a.min.y,t.add(n);const I=new i.CylinderGeometry(3.5,3.5,.05,60),R=new i.MeshPhysicalMaterial({color:new i.Color(10066329),metalness:.2,roughness:.02}),T=new i.Mesh(I,R);T.position.y=-.025,t.add(T),t.updateMatrixWorld();const G=new d.ShapedAreaLight(new i.Color(16777215),5,1,1);G.position.x=1.5,G.position.y=1,G.position.z=-.5,G.rotateZ(-Math.PI/4),G.rotateX(-Math.PI/2),G.isCircular=!1,t.add(G);const W=new d.ShapedAreaLight(new i.Color(16711680),15,1.25,2.75);W.position.y=1.25,W.position.z=-1.5,W.rotateX(Math.PI),W.isCircular=!1,t.add(W),L=[G,W],w=new g.TransformControls(f,u.domElement),w.addEventListener("objectChange",(()=>{b.material.lights.updateFrom(L),b.reset()})),w.addEventListener("dragging-changed",(e=>p.enabled=!e.value)),w.attach(G),w.setSize(.5),window.addEventListener("keydown",(function(e){switch(e.key){case"w":w.setMode("translate");break;case"e":w.setMode("rotate")}})),C=new i.Scene,C.add(w);const k=new s.PathTracingSceneWorker,A=k.generate(t,{onProgress(e){x.innerText=`Generating BVH ${Math.round(100*e)}%`}}).then((e=>{y=e;const{bvh:t,textures:a,materials:n,lights:i}=e,r=t.geometry,o=b.material;o.bvh.updateFrom(t),o.attributesArray.updateFrom(r.attributes.normal,r.attributes.tangent,r.attributes.uv,r.attributes.color),o.materialIndexAttribute.updateFrom(r.attributes.materialIndex),o.textures.setTextures(u,2048,2048,a),o.materials.updateFrom(n,a),o.lights.updateFrom(i),o.lightCount=i.length,k.dispose()}));await Promise.all([A,e]),document.getElementById("loading").remove(),P(),window.addEventListener("resize",P);const B=new h.GUI;B.add(E,"controls").onChange((e=>{w.enabled=e,w.visible=e}));const H=B.addFolder("Path Tracing");H.add(E,"tiles",1,4,1).onChange((e=>{b.tiles.set(e,e)})),H.add(E,"samplesPerFrame",1,10,1),H.add(E,"filterGlossyFactor",0,1).onChange((()=>{b.reset()})),H.add(E,"bounces",1,15,1).onChange((()=>{b.reset()})),H.add(E,"resolutionScale",.1,1).onChange((()=>{P()})),H.add(E,"multipleImportanceSampling").onChange((()=>{b.material.defines.FEATURE_MIS=E.multipleImportanceSampling?1:0,b.material.needsUpdate=!0,b.reset()})),H.close();const j=B.addFolder("Environment");j.add(E,"environmentIntensity",0,3).onChange((()=>{b.reset()})),j.add(E,"environmentRotation",0,2*Math.PI).onChange((e=>{b.material.environmentRotation.makeRotationY(e),b.reset()})),j.close();const z=B.addFolder("Area Light 1");z.add(E,"areaLight1Enabled").name("enable").onChange(M),z.add(E,"areaLight1IsCircular").name("isCircular").onChange(M),z.add(E,"areaLight1Intensity",0,200).name("intensity").onChange(M),z.addColor(E,"areaLight1Color").name("color").onChange(M),z.add(E,"areaLight1Width",0,5).name("width").onChange(M),z.add(E,"areaLight1Height",0,5).name("height").onChange(M);const U=B.addFolder("Area Light 2");U.add(E,"areaLight2Enabled").name("enable").onChange(M),U.add(E,"areaLight2IsCircular").name("isCircular").onChange(M),U.add(E,"areaLight2Intensity",0,200).name("intensity").onChange(M),U.addColor(E,"areaLight2Color").name("color").onChange(M),U.add(E,"areaLight2Width",0,5).name("width").onChange(M),U.add(E,"areaLight2Height",0,5).name("height").onChange(M),M(),S()}();
//# sourceMappingURL=areaLight.aaa9b5da.js.map