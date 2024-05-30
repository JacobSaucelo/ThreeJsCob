import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import {
  EffectComposer,
  OrbitControls,
  OutputPass,
  RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPixelatedPass = new RenderPixelatedPass(4, scene, camera);
composer.addPass(renderPixelatedPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxZoom = 2;

const loader = new THREE.TextureLoader();
const texture = pixelTexture(loader.load("/texture2.png"));

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// const radius = 0.7;
// const geometry2 = new THREE.IcosahedronGeometry(radius);
// const crystalMesh = new THREE.Mesh(
//   geometry2,
//   new THREE.MeshPhongMaterial({
//     color: 0x68b7e9,
//     emissive: 0x4f7e8b,
//     shininess: 10,
//     specular: 0xffffff,
//   })
// );
// crystalMesh.receiveShadow = true;
// crystalMesh.castShadow = true;
// scene.add(crystalMesh);

// const geometry3 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const torusKnot = new THREE.Mesh(geometry, material);
// scene.add(torusKnot);

camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  composer.render();
}

function pixelTexture(texture) {
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
