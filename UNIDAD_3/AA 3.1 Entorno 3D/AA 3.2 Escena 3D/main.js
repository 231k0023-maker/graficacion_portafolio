import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;


const canvasElement = document.querySelector('#mi-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const geometry = new THREE.SphereGeometry(1.3, 32, 32);


const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ffcc, 
    wireframe: true  
});


const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff0055, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.015;
    sphere.rotation.z += 0.005;

    renderer.render(scene, camera);
}

animate();