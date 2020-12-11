//import * as THREE from 'three';
//import ViewCubeControls from './ViewCubeControls';
import * as THREE from './threejs/build/three.module.js';
import ViewCubeControls from './ViewCubeControls.js';

// <Scene>
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.querySelector('#app').appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 20, 0);
scene.add(new THREE.GridHelper(100, 10, 0xfffffff));
scene.add(new THREE.AxesHelper(30));
// </Scene>

// <CubeScene>
const cubeRenderer = new THREE.WebGLRenderer({ alpha: 1 });
cubeRenderer.setSize(150, 150);
document.querySelector('#cube-scene').appendChild(cubeRenderer.domElement);

const cubeScene = new THREE.Scene();
const cubeCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
cubeCamera.position.set(0, 0, 70);
cubeCamera.lookAt(0, 0, 0);

const viewCube = new ViewCubeControls(cubeCamera, undefined, undefined, cubeRenderer.domElement);
cubeScene.add(viewCube.getObject());
viewCube.addEventListener('angle-change', ({ quaternion }) => {
  camera.setRotationFromQuaternion(quaternion.inverse());
});
// </CubeScene>

function update() {
  requestAnimationFrame(update);
  viewCube.update();
  renderer.render(scene, camera);
  cubeRenderer.render(cubeScene, cubeCamera);
}

update();