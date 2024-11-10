import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

//Scene
const canvas = document.getElementById("mainDisp");
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

//Load Texture
const woodTexture = "./assets/textures/wood1.jpg";
const cubeTexture = new THREE.TextureLoader();

//Cube Mesh
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    map: cubeTexture.load(woodTexture)
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, 2, 0);
cubeMesh.castShadow = true;

scene.add(cubeMesh);

//Plane Mesh
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.receiveShadow = true;

scene.add(planeMesh)

//Sphere Mesh
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0099FF
})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(5, 2, 5);
sphereMesh.castShadow = true;

scene.add(sphereMesh);

//Cylinder Mesh
const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 4, 50);
const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0xB80013
});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(5, 3, -5);
cylinderMesh.castShadow = true;

scene.add(cylinderMesh);

//Spotlight
const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(10, 5, 5);
spotLight.intensity = 50;
spotLight.castShadow = true;

scene.add(spotLight);

//Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

//GUI | Change Mesh Properties
const gui = new GUI();
const properties = {
    "Sphere Color": "#0099ff",
    "Cube Color": "#ffffff",
    "Cylinder Color": "#b80019",
    "Wireframe": false
};

gui.addColor(properties, "Sphere Color").onChange(function(e){
    sphereMesh.material.color.set(e);
});

gui.addColor(properties, "Cube Color").onChange(function(e){
    cubeMesh.material.color.set(e);
});

gui.addColor(properties, "Cylinder Color").onChange(function(e){
    cylinderMesh.material.color.set(e);
});

gui.add(properties, "Wireframe").onChange(function(e){
    sphereMesh.material.wireframe = e;
    cubeMesh.material.wireframe = e;
    cylinderMesh.material.wireframe = e;
});

//Loop Animation
function animate() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.z += 0.01;
    renderer.render(scene, camera);
    controls.update();
}

renderer.setAnimationLoop(animate);

//Shadow
renderer.shadowMap.enabled = true;

//Update window
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});