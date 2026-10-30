import * as THREE from 'three';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141826);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// RENDERIZADOR WEBGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// --- 1. SEMÁFORO ---
const semaforoGroup = new THREE.Group();

// Base rectangular
const baseGeo = new THREE.BoxGeometry(1.2, 3.8, 0.8);
const baseMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const baseMesh = new THREE.Mesh(baseGeo, baseMat);
semaforoGroup.add(baseMesh);

// Esferas (Luces)
const esferaGeo = new THREE.SphereGeometry(0.4, 32, 32);

const luzRoja = new THREE.Mesh(esferaGeo, new THREE.MeshStandardMaterial({ color: 0xff0000 }));
luzRoja.position.y = 1.2;
semaforoGroup.add(luzRoja);

const luzAmarilla = new THREE.Mesh(esferaGeo, new THREE.MeshStandardMaterial({ color: 0xffff00 }));
luzAmarilla.position.y = 0;
semaforoGroup.add(luzAmarilla);

const luzVerde = new THREE.Mesh(esferaGeo, new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
luzVerde.position.y = -1.2;
semaforoGroup.add(luzVerde);

semaforoGroup.position.x = -2.2;
scene.add(semaforoGroup);

// --- 2. CORAZÓN (CUBO WIREFRAME) ---
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: true
});
const cubo = new THREE.Mesh(geometry, material);
cubo.position.x = 2.2;
scene.add(cubo);

// ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);

  // Animación de rotación y palpitación
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;

  let escala = 1 + Math.sin(Date.now() * 0.003) * 0.3; 
  cubo.scale.set(escala, escala, escala);

  renderer.render(scene, camera);
}

animate();

// RESPONSIVIDAD 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});