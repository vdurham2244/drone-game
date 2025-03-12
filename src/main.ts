// Import Three.js and its types
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

type OrbitControlsType = typeof OrbitControls;

import { ResidentialBuilding } from './buildings/ResidentialBuilding';
import { ChurchBuilding } from './buildings/ChurchBuilding';
import { IndustrialTank } from './buildings/IndustrialTank';
import { HighriseBuilding } from './buildings/HighriseBuilding';
import { Building } from './buildings/Building';
import { WaterTower } from './buildings/WaterTower';

class Game {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private fpvCamera: THREE.PerspectiveCamera;
    private followCamera: THREE.PerspectiveCamera;
    private activeCamera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private drone: THREE.Object3D | null = null;
    private buildings: Building[] = [];
    private controls: any;
    private cleaningRadius = 2;
    private cleaningPower = 1;
    private isSprayOn: boolean = false;
    private spraySystem: THREE.Points | null = null;
    private propellers: THREE.Object3D[] = [];
    private propellerSpeed = 1.1;
    private warningTimeout: number | null = null;
    private cameraMode: 'orbit' | 'fpv' | 'follow' = 'follow';
    private keysPressed: { [key: string]: boolean } = {};
    private lastFrameTime: number = performance.now();
    private logos: THREE.Mesh[] = [];
    private score: number = 0;
    private hasWon: boolean = false;
    private gameStarted: boolean = false;
    private gameMode: 'learning' | 'speed' | null = null;
    private startScreenContainer: HTMLDivElement | null = null;
    private isMobile: boolean = false;
    private touchControls: { [key: string]: boolean } = {};

    constructor() {
        // Check if device is mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Sky blue

        // Orbit camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 15, 30);

        // FPV camera
        this.fpvCamera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Follow camera
        this.followCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.activeCamera = this.followCamera;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "default"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // @ts-ignore
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        document.body.appendChild(this.renderer.domElement);

        // Create and show start screen immediately
        this.createStartScreen();

        // Orbit controls (disabled initially in follow mode)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;
        this.controls.enabled = false;

        // Start animation loop
        this.animate();
    }

    private createStartScreen(): void {
        // Create container
        this.startScreenContainer = document.createElement('div');
        this.startScreenContainer.style.position = 'fixed';
        this.startScreenContainer.style.top = '0';
        this.startScreenContainer.style.left = '0';
        this.startScreenContainer.style.width = '100%';
        this.startScreenContainer.style.height = '100%';
        this.startScreenContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        this.startScreenContainer.style.display = 'flex';
        this.startScreenContainer.style.flexDirection = 'column';
        this.startScreenContainer.style.alignItems = 'center';
        this.startScreenContainer.style.justifyContent = 'center';
        this.startScreenContainer.style.zIndex = '1000';

        // Add logo
        const logo = document.createElement('img');
        logo.src = import.meta.env.BASE_URL + 'start.png';
        logo.style.width = '400px';
        logo.style.marginBottom = '40px';
        this.startScreenContainer.appendChild(logo);

        // Create mode buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.gap = '20px';

        // Learning Mode Button
        const learningButton = this.createModeButton(
            'Learning Mode',
            'Learn about Lucid Bots while flying the drone',
            'learning'
        );
        buttonsContainer.appendChild(learningButton);

        // Speed Mode Button
        const speedButton = this.createModeButton(
            'Speed Mode',
            'Test your drone piloting skills',
            'speed'
        );
        buttonsContainer.appendChild(speedButton);

        this.startScreenContainer.appendChild(buttonsContainer);
        document.body.appendChild(this.startScreenContainer);
    }

    private createModeButton(title: string, description: string, mode: 'learning' | 'speed'): HTMLDivElement {
        const button = document.createElement('div');
        button.style.backgroundColor = '#00B4D8';
        button.style.padding = '20px 40px';
        button.style.borderRadius = '10px';
        button.style.cursor = 'pointer';
        button.style.textAlign = 'center';
        button.style.transition = 'transform 0.2s, background-color 0.2s';
        button.style.width = '400px';

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.color = 'white';
        titleElement.style.margin = '0 0 10px 0';
        titleElement.style.fontFamily = 'Arial, sans-serif';

        const descElement = document.createElement('p');
        descElement.textContent = description;
        descElement.style.color = 'white';
        descElement.style.margin = '0';
        descElement.style.fontFamily = 'Arial, sans-serif';

        button.appendChild(titleElement);
        button.appendChild(descElement);

        // Hover effects
        button.onmouseover = () => {
            button.style.backgroundColor = '#0096B4';
            button.style.transform = 'scale(1.05)';
        };
        button.onmouseout = () => {
            button.style.backgroundColor = '#00B4D8';
            button.style.transform = 'scale(1)';
        };

        // Click handler
        button.onclick = () => this.startGame(mode);

        return button;
    }

    private startGame(mode: 'learning' | 'speed'): void {
        this.gameMode = mode;
        this.gameStarted = true;
        
        // Remove start screen
        if (this.startScreenContainer) {
            document.body.removeChild(this.startScreenContainer);
            this.startScreenContainer = null;
        }

        // Initialize game components
        this.setupLighting();
        this.setupControlsUI();
        if (this.isMobile) {
            this.setupMobileControls();
        }
        this.loadDroneModel();
        this.addBuildings();
        this.addGround();
        this.addLogos();
        this.updateScoreDisplay();
        this.createWarningPopup();

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        if (!this.isMobile) {
            document.addEventListener('keydown', this.onKeyDown.bind(this));
            document.addEventListener('keyup', this.onKeyUp.bind(this));
        }

        // Update UI based on game mode
        this.updateUIForGameMode();
    }

    private updateUIForGameMode(): void {
        const infoElement = document.getElementById('info');
        if (!infoElement) return;

        if (this.gameMode === 'learning') {
            infoElement.innerHTML += `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid white;">
                    <p style="margin: 0;">Learning Mode: Collect logos to learn about Lucid Bots!</p>
                </div>
            `;
        } else {
            infoElement.innerHTML += `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid white;">
                    <p style="margin: 0;">Speed Mode: Collect all logos as fast as you can!</p>
                    <p id="timer" style="margin: 5px 0 0 0;">Time: 0:00</p>
                </div>
            `;
            this.startSpeedModeTimer();
        }
    }

    private startSpeedModeTimer(): void {
        if (this.gameMode !== 'speed') return;
        
        const startTime = Date.now();
        const timerElement = document.getElementById('timer');
        
        const updateTimer = () => {
            if (!this.hasWon && timerElement) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                timerElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                requestAnimationFrame(updateTimer);
            }
        };
        
        updateTimer();
    }

    private setupLighting(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        this.scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        this.scene.add(hemisphereLight);
    }

    // Creates a fixed, styled UI panel for game controls and score.
    private setupControlsUI(): void {
        let infoElement = document.getElementById('info');
        if (!infoElement) {
            infoElement = document.createElement('div');
            infoElement.id = 'info';
            document.body.appendChild(infoElement);
        }
        infoElement.style.position = 'fixed';
        infoElement.style.top = '10px';
        infoElement.style.right = '10px';
        infoElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        infoElement.style.color = 'white';
        infoElement.style.padding = '10px';
        infoElement.style.borderRadius = '8px';
        infoElement.style.fontFamily = 'Arial, sans-serif';

        if (this.isMobile) {
            infoElement.innerHTML = `
                <h3 style="margin:0; font-size:18px;">Game Controls</h3>
                <ul style="list-style:none; padding:0; margin:5px 0;">
                    <li>Left Pad: Altitude & Rotation</li>
                    <li>Right Pad: Movement</li>
                    <li>Spray Button: Toggle Sprayer</li>
                    <li>Camera Button: Switch View</li>
                </ul>
                <p id="score-display" style="margin:0; font-weight:bold;">Score: 0/5 Logos Collected!</p>
            `;
        } else {
            infoElement.innerHTML = `
                <h3 style="margin:0; font-size:18px;">Game Controls</h3>
                <ul style="list-style:none; padding:0; margin:5px 0;">
                    <li>Arrow Keys: Move Drone</li>
                    <li>A/D: Yaw Left/Right</li>
                    <li>W/S: Up/Down</li>
                    <li>Space: Toggle Sprayer</li>
                    <li>C: Clean (when sprayer is on)</li>
                    <li>V: Toggle Camera</li>
                    <li>Mouse: Orbit Camera (if enabled)</li>
                </ul>
                <p id="score-display" style="margin:0; font-weight:bold;">Score: 0/5 Logos Collected!</p>
            `;
        }
    }

    private setupMobileControls(): void {
        const mobileControls = document.getElementById('mobileControls');
        if (mobileControls) {
            mobileControls.style.display = 'block';
        }

        // Setup touch event handlers for all control buttons
        const buttons = {
            'upLeft': 'w',
            'downLeft': 's',
            'leftLeft': 'a',
            'rightLeft': 'd',
            'upRight': 'arrowup',
            'downRight': 'arrowdown',
            'leftRight': 'arrowleft',
            'rightRight': 'arrowright'
        };

        // Add touch handlers for movement buttons
        Object.entries(buttons).forEach(([buttonId, key]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.touchControls[key] = true;
                    this.keysPressed[key] = true;
                });
                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.touchControls[key] = false;
                    this.keysPressed[key] = false;
                });
            }
        });

        // Add spray button handler
        const sprayButton = document.getElementById('sprayButton');
        if (sprayButton) {
            sprayButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.isSprayOn = !this.isSprayOn;
                if (this.isSprayOn && !this.spraySystem) {
                    this.createSpraySystem();
                }
                sprayButton.style.backgroundColor = this.isSprayOn ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)';
            });
        }

        // Add camera toggle button handler
        const cameraButton = document.getElementById('cameraButton');
        if (cameraButton) {
            cameraButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.toggleCamera();
            });
        }

        // Prevent default touch behavior to avoid scrolling
        document.addEventListener('touchmove', (e) => {
            if (this.gameStarted) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    private loadDroneModel(): void {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        console.log('Attempting to load drone model...');
        loader.load(
            import.meta.env.BASE_URL + 'sherpaModel.glb',
            (gltf: GLTF) => {
                console.log('Drone model loaded successfully:', gltf);
                if (gltf.scene) {
                    const droneHolder = new THREE.Object3D();
                    const droneModel = gltf.scene;
                    // Rotate so it faces forward
                    droneModel.rotation.x = -Math.PI / 2;
                    droneModel.scale.set(0.5, 0.5, 0.5);
                    
                    // Traverse to set shadow properties and find propellers
                    droneModel.traverse((child: THREE.Object3D) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            if (child.material && child.material.transparent) {
                                child.material.opacity = 0.9;
                                child.material.side = THREE.DoubleSide;
                            }
                            if (child.name.toLowerCase().includes('propeller') || 
                                child.name.toLowerCase().includes('prop') || 
                                child.name.toLowerCase().includes('rotor')) {
                                console.log('Found propeller:', child.name);
                                this.propellers.push(child);
                            }
                        }
                    });

                    droneHolder.add(droneModel);
                    droneHolder.position.set(0, 5, 0);

                    // Add drone lights
                    const droneSpotLight = new THREE.SpotLight(0xffffff, 1);
                    droneSpotLight.position.set(0, 0.5, 0);
                    droneSpotLight.angle = Math.PI / 6;
                    droneSpotLight.penumbra = 0.5;
                    droneSpotLight.decay = 2;
                    droneSpotLight.distance = 10;
                    droneHolder.add(droneSpotLight);
                    const dronePointLight = new THREE.PointLight(0xffffff, 0.5, 5);
                    droneHolder.add(dronePointLight);

                    this.drone = droneHolder;
                    this.scene.add(this.drone);
                    console.log('Drone added to scene at position:', this.drone.position);

                    dracoLoader.dispose();
                } else {
                    console.error('No scene found in the loaded model');
                }
            },
            (progress: { loaded: number; total: number }) => {
                const percentComplete = Math.round((progress.loaded / progress.total) * 100);
                console.log(`Loading progress: ${percentComplete}%`);
            },
            (err: unknown) => {
                console.error('Error loading drone model:', err);
                const droneHolder = new THREE.Object3D();
                const geometry = new THREE.BoxGeometry(2, 1, 2);
                const material = new THREE.MeshPhongMaterial({
                    color: 0x3366ff,
                    transparent: true,
                    opacity: 0.8
                });
                const fallbackCube = new THREE.Mesh(geometry, material);
                droneHolder.add(fallbackCube);
                droneHolder.position.set(0, 5, 0);
                const droneLight = new THREE.PointLight(0xffffff, 0.5, 10);
                droneHolder.add(droneLight);
                this.drone = droneHolder;
                this.scene.add(this.drone);
                console.log('Fallback drone cube added to scene');
            }
        );
    }

    private addBuildings(): void {
        const house = new ResidentialBuilding(new THREE.Vector3(-20, 3, -15));
        house.createMesh();
        this.scene.add(house.getMesh());
        this.buildings.push(house);

        const church = new ChurchBuilding(new THREE.Vector3(20, 4, -15));
        church.createMesh();
        this.scene.add(church.getMesh());
        this.buildings.push(church);

        const tank = new IndustrialTank(new THREE.Vector3(-20, 8, 15));
        tank.createMesh();
        this.scene.add(tank.getMesh());
        this.buildings.push(tank);

        const highrise = new HighriseBuilding(new THREE.Vector3(20, 20, 15));
        highrise.createMesh();
        this.scene.add(highrise.getMesh());
        this.buildings.push(highrise);

        const waterTower = new WaterTower(new THREE.Vector3(-40, 12, -35));
        waterTower.createMesh();
        this.scene.add(waterTower.getMesh());
        this.buildings.push(waterTower);
    }

    private addGround(): void {
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x90EE90,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.fpvCamera.aspect = window.innerWidth / window.innerHeight;
        this.fpvCamera.updateProjectionMatrix();
        this.followCamera.aspect = window.innerWidth / window.innerHeight;
        this.followCamera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private onKeyDown(event: KeyboardEvent): void {
        this.keysPressed[event.key.toLowerCase()] = true;
        switch (event.key.toLowerCase()) {
            case ' ':
                // Toggle the sprayer
                this.isSprayOn = !this.isSprayOn;
                if (this.isSprayOn && !this.spraySystem) {
                    this.createSpraySystem();
                }
                break;
            case 'c':
                if (this.isSprayOn) {
                    this.clean();
                }
                break;
            case 'v':
                this.toggleCamera();
                break;
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        this.keysPressed[event.key.toLowerCase()] = false;
    }

    // Drone movement using a smaller bounding sphere for collision.
    private updateDroneMovement(delta: number): void {
        if (!this.drone) return;

        const translationSpeed = 5;
        const rotationSpeed = 1.5;
        const droneRadius = 0.8;

        // Yaw rotation (A/D or touch controls)
        if (this.keysPressed['a']) {
            this.drone.rotation.y += rotationSpeed * delta;
        }
        if (this.keysPressed['d']) {
            this.drone.rotation.y -= rotationSpeed * delta;
        }

        // Horizontal movement (arrow keys/touch controls)
        let moveX = 0, moveZ = 0;
        if (this.keysPressed['arrowdown']) moveZ -= 1;
        if (this.keysPressed['arrowup']) moveZ += 1;
        if (this.keysPressed['arrowleft']) moveX += 1;
        if (this.keysPressed['arrowright']) moveX -= 1;

        // Vertical movement (W/S or touch controls)
        let moveY = 0;
        if (this.keysPressed['w']) moveY += 1;
        if (this.keysPressed['s']) moveY -= 1;

        const horizontalMovement = new THREE.Vector3(moveX, 0, moveZ);
        if (horizontalMovement.length() > 0) {
            horizontalMovement.normalize();
            horizontalMovement.multiplyScalar(translationSpeed * delta);
            horizontalMovement.applyEuler(new THREE.Euler(0, this.drone.rotation.y, 0));
        }
        const verticalMovement = moveY * translationSpeed * delta;

        const newPosition = this.drone.position.clone();
        newPosition.add(horizontalMovement);
        newPosition.y = Math.max(2, newPosition.y + verticalMovement);

        // Collision detection with buildings.
        const droneSphere = new THREE.Sphere(newPosition, droneRadius);
        let willCollide = false;
        for (const building of this.buildings) {
            const buildingMesh = building.getMesh();
            const buildingBox = new THREE.Box3().setFromObject(buildingMesh);
            if (buildingBox.intersectsSphere(droneSphere)) {
                willCollide = true;
                this.showCollisionWarning();
                break;
            }
        }
        if (!willCollide) {
            this.drone.position.copy(newPosition);
        }
    }

    private createSpraySystem(): void {
        if (!this.drone) return;
        const particleCount = 1500;
        const particles = new Float32Array(particleCount * 3);
        const particleGeometry = new THREE.BufferGeometry();
        const spriteMaterial = new THREE.PointsMaterial({
            color: 0x0088ff,
            size: 0.12,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Initialize particles in a wide cone.
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const progress = (i / particleCount) * 25;
            particles[i3] = (Math.random() - 0.5) * (0.4 + progress * 0.15);
            particles[i3 + 1] = (Math.random() - 0.5) * (0.4 + progress * 0.15);
            particles[i3 + 2] = -progress;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        this.spraySystem = new THREE.Points(particleGeometry, spriteMaterial);
        const sprayContainer = new THREE.Object3D();
        sprayContainer.rotation.x = -Math.PI;
        sprayContainer.add(this.spraySystem);
        this.drone.add(sprayContainer);
        this.spraySystem.position.set(-0.15, 0, 0);
    }

    // Update spray system; if sprayer is off, remove it.
    private updateSpraySystem(): void {
        if (!this.spraySystem) return;

        if (!this.isSprayOn) {
            if (this.spraySystem.parent) {
                this.drone?.remove(this.spraySystem.parent);
            }
            this.spraySystem.geometry.dispose();
            (this.spraySystem.material as THREE.PointsMaterial).dispose();
            this.spraySystem = null;
            return;
        }

        const positions = (this.spraySystem.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        const particleCount = positions.length / 3;
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3 + 2] -= 0.3;
            if (positions[i3 + 2] < -10) {
                positions[i3] = (Math.random() - 0.5) * 0.05;
                positions[i3 + 1] = (Math.random() - 0.5) * 0.05;
                positions[i3 + 2] = 0;
            }
            positions[i3] *= 0.99;
            positions[i3 + 1] *= 0.99;
        }
        (this.spraySystem.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    private updateCameras(): void {
        if (!this.drone) return;
        if (this.cameraMode === 'fpv') {
            const dronePosition = new THREE.Vector3();
            this.drone.getWorldPosition(dronePosition);
            this.fpvCamera.position.copy(dronePosition);
            const offset = new THREE.Vector3(-0.15, 0.20, 0.15);
            offset.applyQuaternion(this.drone.quaternion);
            this.fpvCamera.position.add(offset);
            this.fpvCamera.rotation.set(0, this.drone.rotation.y + Math.PI, 0);
        }
        if (this.cameraMode === 'follow') {
            const dronePosition = new THREE.Vector3();
            this.drone.getWorldPosition(dronePosition);
            const offset = new THREE.Vector3(0, 1.5, -2);
            offset.applyQuaternion(this.drone.quaternion);
            this.followCamera.position.copy(dronePosition).add(offset);
            const forward = new THREE.Vector3(0, 0, 1);
            forward.applyQuaternion(this.drone.quaternion);
            const target = dronePosition.clone().add(forward);
            this.followCamera.lookAt(target);
        }
    }

    // Added missing checkCollisions method.
    private checkCollisions(): void {
        if (!this.drone) return;
        const dronePosition = new THREE.Vector3();
        this.drone.getWorldPosition(dronePosition);
        const droneSphere = new THREE.Sphere(dronePosition, 0.5);
        for (const building of this.buildings) {
            const buildingMesh = building.getMesh();
            const buildingBox = new THREE.Box3().setFromObject(buildingMesh);
            if (buildingBox.intersectsSphere(droneSphere)) {
                this.showCollisionWarning();
                break;
            }
        }
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));
        
        if (!this.gameStarted) {
            // Just render the scene with the start screen
            this.renderer.render(this.scene, this.camera);
            return;
        }

        const currentTime = performance.now();
        const delta = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        
        // Animate propellers.
        if (this.propellers.length > 0) {
            this.propellers.forEach((propeller, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                propeller.rotation.y += this.propellerSpeed * direction;
            });
        }
        
        // Update systems.
        this.updateDroneMovement(delta);
        if (this.spraySystem) {
            this.updateSpraySystem();
        }
        this.updateCameras();
        this.checkCollisions();
        this.checkLogoCollection();
        
        // Animate logos (rotate and float).
        this.logos.forEach(logo => {
            if (!logo.userData.collected) {
                logo.quaternion.copy(this.activeCamera.quaternion);
                logo.rotateZ(logo.userData.rotationSpeed);
                const floatOffset = Math.sin(currentTime * 0.002) * 0.5;
                logo.position.y = logo.userData.initialY + floatOffset;
            }
        });
        
        this.controls.update();
        this.renderer.render(this.scene, this.activeCamera);
    }

    private clean(): void {
        if (!this.drone || !this.isSprayOn) return;
        this.buildings.forEach(building => {
            const buildingPos = building.getMesh().position;
            const dronePos = this.drone!.position;
            const distance = new THREE.Vector3(buildingPos.x, buildingPos.y, buildingPos.z).distanceTo(dronePos);
            if (distance < this.cleaningRadius) {
                building.clean(this.cleaningPower);
            }
        });
    }

    private toggleCamera(): void {
        switch (this.cameraMode) {
            case 'orbit':
                this.cameraMode = 'fpv';
                this.activeCamera = this.fpvCamera;
                this.controls.enabled = false;
                break;
            case 'fpv':
                this.cameraMode = 'follow';
                this.activeCamera = this.followCamera;
                this.controls.enabled = false;
                break;
            case 'follow':
                this.cameraMode = 'orbit';
                this.activeCamera = this.camera;
                this.controls.enabled = true;
                break;
        }
    }

    private createWarningPopup(): void {
        if (!document.getElementById('warning-popup')) {
            const warningElement = document.createElement('div');
            warningElement.id = 'warning-popup';
            warningElement.style.position = 'fixed';
            warningElement.style.top = '50%';
            warningElement.style.left = '50%';
            warningElement.style.transform = 'translate(-50%, -50%)';
            warningElement.style.backgroundColor = 'rgba(255, 200, 200, 0.95)';
            warningElement.style.padding = '20px';
            warningElement.style.borderRadius = '10px';
            warningElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
            warningElement.style.display = 'none';
            warningElement.style.zIndex = '1000';
            warningElement.style.fontFamily = 'Arial, sans-serif';
            warningElement.style.fontSize = '16px';
            warningElement.style.color = '#333';
            warningElement.style.border = '2px solid #ff6b6b';
            warningElement.style.maxWidth = '400px';
            warningElement.style.textAlign = 'center';
            document.body.appendChild(warningElement);
        }
    }

    private showCollisionWarning(): void {
        const warningElement = document.getElementById('warning-popup');
        if (warningElement && warningElement.style.display !== 'block') {
            warningElement.textContent = "The Sherpa drone is built with a forward facing collision radar to prevent the drone from drifting into buildings";
            warningElement.style.display = 'block';
            if (this.warningTimeout !== null) {
                window.clearTimeout(this.warningTimeout);
            }
            this.warningTimeout = window.setTimeout(() => {
                if (warningElement) {
                    warningElement.style.display = 'none';
                }
                this.warningTimeout = null;
            }, 3000);
        }
    }

    // New coin collection: check if any spray particle hits a coin.
    private checkLogoCollection(): void {
        if (!this.drone || !this.spraySystem || !this.isSprayOn || this.hasWon) return;

        const sprayContainer = this.spraySystem.parent;
        if (!sprayContainer) return;
        sprayContainer.updateMatrixWorld();
        const matrixWorld = sprayContainer.matrixWorld;

        const positions = (this.spraySystem.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        const particleCount = positions.length / 3;
        const collisionThreshold = 0.5;

        this.logos.forEach((logo) => {
            if (!logo.userData.collected) {
                const coinPos = logo.position.clone();
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    const localParticlePos = new THREE.Vector3(
                        positions[i3],
                        positions[i3 + 1],
                        positions[i3 + 2]
                    );
                    const worldParticlePos = localParticlePos.applyMatrix4(matrixWorld);
                    if (worldParticlePos.distanceTo(coinPos) < collisionThreshold) {
                        logo.userData.collected = true;
                        this.scene.remove(logo);
                        logo.geometry.dispose();
                        if (logo.material instanceof THREE.Material) {
                            logo.material.dispose();
                        }
                        this.score++;
                        this.playCollectionEffect(logo.position.clone());
                        this.updateScoreDisplay();
                        
                        // Show learning popup in learning mode
                        if (this.gameMode === 'learning' && logo.userData.info) {
                            this.showLearningPopup(logo.userData.info);
                        }
                        
                        if (this.score >= 5) {
                            this.showWinMessage();
                        }
                        break;
                    }
                }
            }
        });
    }

    private playCollectionEffect(position: THREE.Vector3): void {
        const sparkleCount = 50;
        const sparkleGeometry = new THREE.BufferGeometry();
        const sparklePositions = new Float32Array(sparkleCount * 3);
        const sparkleVelocities: THREE.Vector3[] = [];

        for (let i = 0; i < sparkleCount; i++) {
            const i3 = i * 3;
            sparklePositions[i3] = position.x;
            sparklePositions[i3 + 1] = position.y;
            sparklePositions[i3 + 2] = position.z;
            sparkleVelocities.push(new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                Math.random() * 2,
                (Math.random() - 0.5) * 2
            ));
        }
        sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
        const sparkleMaterial = new THREE.PointsMaterial({
            color: 0xffff00,
            size: 0.1,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });
        const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
        this.scene.add(sparkles);

        let lifetime = 0;
        const animateSparkles = () => {
            if (lifetime > 1) {
                this.scene.remove(sparkles);
                sparkleGeometry.dispose();
                sparkleMaterial.dispose();
                return;
            }
            const positions = (sparkleGeometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
            for (let i = 0; i < sparkleCount; i++) {
                const i3 = i * 3;
                positions[i3] += sparkleVelocities[i].x * 0.1;
                positions[i3 + 1] += sparkleVelocities[i].y * 0.1;
                positions[i3 + 2] += sparkleVelocities[i].z * 0.1;
            }
            sparkleGeometry.attributes.position.needsUpdate = true;
            sparkleMaterial.opacity = 1 - lifetime;
            lifetime += 0.05;
            requestAnimationFrame(animateSparkles);
        };
        animateSparkles();
    }

    private updateScoreDisplay(): void {
        const scoreElement = document.getElementById('score-display');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}/5 Logos Collected!`;
        }
    }

    private showWinMessage(): void {
        this.hasWon = true;
        const winElement = document.createElement('div');
        winElement.style.position = 'fixed';
        winElement.style.top = '50%';
        winElement.style.left = '50%';
        winElement.style.transform = 'translate(-50%, -50%)';
        winElement.style.backgroundColor = '#00B4D8'; // Lucid Bots blue
        winElement.style.padding = '30px';
        winElement.style.borderRadius = '15px';
        winElement.style.color = 'white';
        winElement.style.fontSize = '24px';
        winElement.style.fontWeight = 'bold';
        winElement.style.textAlign = 'center';
        winElement.style.zIndex = '1000';
        winElement.style.maxWidth = '500px';

        // Add logo image at the top
        const logoImg = document.createElement('img');
        logoImg.src = import.meta.env.BASE_URL + 'logo.png';
        logoImg.style.width = '120px';
        logoImg.style.marginBottom = '20px';
        winElement.appendChild(logoImg);

        // Create message container
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '20px';
        
        let message = 'Congratulations! You\'ve collected all logos!';
        if (this.gameMode === 'speed') {
            const timerElement = document.getElementById('timer');
            const finalTime = timerElement ? timerElement.textContent?.replace('Time: ', '') : '0:00';
            message += `\nYour time: ${finalTime}`;
        } else if (this.gameMode === 'learning') {
            // Add the final learning message
            message += '\n\nRemember:';
            messageDiv.innerHTML = message + '<br><br>' + 
                '"We believe in responsible robotics, paving the way to better lives for everyone.';
        }
        
        messageDiv.style.lineHeight = '1.4';
        if (this.gameMode === 'speed') {
            messageDiv.textContent = message;
        }
        winElement.appendChild(messageDiv);

        // Add website link
        const linkDiv = document.createElement('div');
        linkDiv.style.fontSize = '18px';
        linkDiv.style.marginTop = '20px';
        const link = document.createElement('a');
        link.href = 'https://lucidbots.com';
        link.textContent = 'Visit lucidbots.com to learn more!';
        link.style.color = 'white';
        link.style.textDecoration = 'underline';
        link.target = '_blank';
        linkDiv.appendChild(link);
        winElement.appendChild(linkDiv);

        // Add "Play Again" button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.style.marginTop = '20px';
        playAgainButton.style.padding = '10px 20px';
        playAgainButton.style.fontSize = '18px';
        playAgainButton.style.borderRadius = '5px';
        playAgainButton.style.border = 'none';
        playAgainButton.style.backgroundColor = 'white';
        playAgainButton.style.color = '#00B4D8';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.transition = 'transform 0.2s';
        playAgainButton.onmouseover = () => playAgainButton.style.transform = 'scale(1.05)';
        playAgainButton.onmouseout = () => playAgainButton.style.transform = 'scale(1)';
        playAgainButton.onclick = () => window.location.reload();
        winElement.appendChild(playAgainButton);

        document.body.appendChild(winElement);

        setTimeout(() => {
            document.body.removeChild(winElement);
        }, 10000);
    }

    // Create a coin (logo) with glow effect.
    private createLogo(): THREE.Mesh {
        const logoGeometry = new THREE.CircleGeometry(1.5, 32);
        const textureLoader = new THREE.TextureLoader();
        const logoTexture = textureLoader.load(import.meta.env.BASE_URL + 'logo.png');
        logoTexture.minFilter = THREE.LinearFilter;
        logoTexture.magFilter = THREE.LinearFilter;
        
        const logoMaterial = new THREE.MeshStandardMaterial({
            map: logoTexture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            emissive: 0xffffff,
            emissiveMap: logoTexture,
            emissiveIntensity: 0.8
        });
        
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        const logoLight = new THREE.PointLight(0xffffff, 1, 5);
        logoLight.position.set(0, 0, 0.1);
        logo.add(logoLight);
        const backLight = new THREE.PointLight(0xffffff, 1, 5);
        backLight.position.set(0, 0, -0.1);
        logo.add(backLight);
        
        logo.userData = { 
            collected: false,
            initialY: 0,
            rotationSpeed: 0.02
        };
        return logo;
    }

    private addLogos(): void {
        const house = this.buildings[0];
        const church = this.buildings[1];
        const tank = this.buildings[2];
        const highrise = this.buildings[3];
        const waterTower = this.buildings[4];

        const logoPositions = [
            // Lower the house logo position for better visibility
            { building: house, offsetY: 18, offsetX: 0, offsetZ: 0, info: "Lucid Bots Inc. is an AI robotics company that builds productive and responsible robots for the exterior cleaning, concrete, and construction industries." },
            // Church steeple
            { building: church, offsetY: 25, offsetX: 0, offsetZ: 0, info: "Our drones use advanced AI to learn and navigate complex environments safely." },
            // Above silo
            { building: tank, offsetY: 16, offsetX: 0, offsetZ: 0, info: "Lucid Bots' Sherpa drone could clean any of these buildings in reality as well!" },
            // Highrise
            { building: highrise, offsetY: 30, offsetX: 0, offsetZ: 4, info: "Our mission at Lucid Bots is to elevate efficiency, safety, and humanity by creating the world's most productive drones." },
            // Water tower
            { building: waterTower, offsetY: 22, offsetX: 0, offsetZ: 0, info: "We also have a surface cleaning robot, known as the Lavobot" }
        ];

        logoPositions.forEach(({ building, offsetY, offsetX, offsetZ, info }) => {
            const buildingPos = building.getMesh().position;
            const logo = this.createLogo();
            logo.position.set(
                buildingPos.x + offsetX,
                buildingPos.y + offsetY,
                buildingPos.z + offsetZ
            );
            logo.userData.initialY = buildingPos.y + offsetY;
            logo.userData.info = info; // Store the info message
            this.logos.push(logo);
            this.scene.add(logo);
        });
    }

    private showLearningPopup(info: string): void {
        const popupElement = document.createElement('div');
        popupElement.style.position = 'fixed';
        popupElement.style.top = '50%';
        popupElement.style.left = '50%';
        popupElement.style.transform = 'translate(-50%, -50%)';
        popupElement.style.backgroundColor = 'rgba(0, 180, 216, 0.95)'; // Lucid Bots blue
        popupElement.style.padding = '20px';
        popupElement.style.borderRadius = '10px';
        popupElement.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        popupElement.style.color = 'white';
        popupElement.style.fontSize = '18px';
        popupElement.style.fontFamily = 'Arial, sans-serif';
        popupElement.style.textAlign = 'center';
        popupElement.style.maxWidth = '400px';
        popupElement.style.zIndex = '1000';
        popupElement.style.animation = 'fadeIn 0.3s ease-in-out';

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(style);

        // Add logo image
        const logoImg = document.createElement('img');
        logoImg.src = import.meta.env.BASE_URL + 'logo.png';
        logoImg.style.width = '100px';
        logoImg.style.marginBottom = '15px';
        popupElement.appendChild(logoImg);

        // Add info text
        const textElement = document.createElement('p');
        textElement.textContent = info;
        textElement.style.margin = '0';
        textElement.style.lineHeight = '1.5';
        popupElement.appendChild(textElement);

        // Add continue button
        const button = document.createElement('button');
        button.textContent = 'Continue';
        button.style.marginTop = '15px';
        button.style.padding = '8px 20px';
        button.style.fontSize = '16px';
        button.style.backgroundColor = 'white';
        button.style.color = '#00B4D8';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.2s';
        button.onmouseover = () => button.style.transform = 'scale(1.05)';
        button.onmouseout = () => button.style.transform = 'scale(1)';
        button.onclick = () => document.body.removeChild(popupElement);
        popupElement.appendChild(button);

        document.body.appendChild(popupElement);
    }
}

// Start the game
new Game();