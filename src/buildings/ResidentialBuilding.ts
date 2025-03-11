import * as THREE from 'three';
import { Building } from './Building';

export class ResidentialBuilding extends Building {
    createMesh(): void {
        const mansion = new THREE.Group();
        
        // Main building body
        const mainBody = new THREE.Mesh(
            new THREE.BoxGeometry(20, 15, 15),
            new THREE.MeshPhongMaterial({ 
                color: 0xF5E6D3,
                transparent: false,
                opacity: 1
            })
        );

        // Stone foundation
        const foundation = new THREE.Mesh(
            new THREE.BoxGeometry(21, 1, 16),
            new THREE.MeshPhongMaterial({ 
                color: 0x7B7B7B
            })
        );
        foundation.position.y = -7.5;

        // Side wings
        const leftWing = new THREE.Mesh(
            new THREE.BoxGeometry(8, 8, 12),
            new THREE.MeshPhongMaterial({ 
                color: 0xF5E6D3,
                transparent: false,
                opacity: 1
            })
        );
        leftWing.position.set(-14, -2, 0);

        const rightWing = leftWing.clone();
        rightWing.position.set(14, -2, 0);

        // Flat black roof with thicker height
        const mainRoof = new THREE.Mesh(
            new THREE.BoxGeometry(21, 2, 16),  // Increased height to 2
            new THREE.MeshPhongMaterial({ 
                color: 0x000000,
                transparent: false,
                opacity: 1
            })
        );
        mainRoof.position.y = 7.5;

        // Create VWD text using box geometries
        const letterMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            transparent: false,
            opacity: 1
        });

        // V
        const vLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2, 0.5),
            letterMaterial
        );
        vLeft.position.set(-3, 7, 8.1);
        vLeft.rotation.z = Math.PI * 0.1;
        
        const vRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2, 0.5),
            letterMaterial
        );
        vRight.position.set(-2, 7, 8.1);
        vRight.rotation.z = -Math.PI * 0.1;

        // W
        const w1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2.5, 0.5),  // Taller outer stroke
            letterMaterial
        );
        w1.position.set(-0.8, 7, 8.1);
        w1.rotation.z = Math.PI * 0.1;

        const w2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1.5, 0.5),  // Shorter inner stroke
            letterMaterial
        );
        w2.position.set(0.2, 6.5, 8.1);  // Lowered position
        w2.rotation.z = -Math.PI * 0.1;

        const w3 = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1.5, 0.5),  // Shorter inner stroke
            letterMaterial
        );
        w3.position.set(1.2, 6.5, 8.1);  // Lowered position
        w3.rotation.z = Math.PI * 0.1;

        const w4 = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2.5, 0.5),  // Taller outer stroke
            letterMaterial
        );
        w4.position.set(2.2, 7, 8.1);
        w4.rotation.z = -Math.PI * 0.1;

        // D
        const dStem = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 2.5, 0.5),
            letterMaterial
        );
        dStem.position.set(3.8, 7, 8.1);

        const dCurve = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1.5, 0.5, 16, 1, false, -Math.PI/2, Math.PI),
            letterMaterial
        );
        dCurve.rotation.x = Math.PI/2;
        dCurve.rotation.y = Math.PI/2;
        dCurve.position.set(3.8, 7, 8.1);

        // Wing roofs (flat black and thicker)
        const wingRoofGeometry = new THREE.BoxGeometry(9, 2, 13);  // Increased height to 2
        const wingRoofMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const leftWingRoof = new THREE.Mesh(wingRoofGeometry, wingRoofMaterial);
        leftWingRoof.position.set(-14, 2, 0);

        const rightWingRoof = leftWingRoof.clone();
        rightWingRoof.position.set(14, 2, 0);

        // Windows
        const windowGeometry = new THREE.BoxGeometry(2.5, 4, 0.2);
        const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xADD8E6,
            transparent: true,
            opacity: 0.7
        });

        // Window frames
        const frameGeometry = new THREE.BoxGeometry(3, 4.5, 0.3);
        const frameMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

        // Window positions
        const windowPositions = [
            // Front windows
            [-7, 0, 7.6], [-2.3, 0, 7.6], [2.3, 0, 7.6], [7, 0, 7.6],
            // Second floor front
            [-7, 5, 7.6], [-2.3, 5, 7.6], [2.3, 5, 7.6], [7, 5, 7.6],
            // Side windows
            [-10.1, 0, 0], [-10.1, 5, 0], [10.1, 0, 0], [10.1, 5, 0],
            // Wing windows
            [-14, 0, 4], [-14, 0, -4], [14, 0, 4], [14, 0, -4]
        ];

        windowPositions.forEach((pos, index) => {
            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            
            frame.position.set(pos[0], pos[1], pos[2]);
            window.position.set(pos[0], pos[1], pos[2] + 0.1);
            
            if (index >= 8 && index < 12) {
                frame.rotation.y = Math.PI / 2;
                window.rotation.y = Math.PI / 2;
            }
            
            mansion.add(frame);
            mansion.add(window);
        });

        // Simple entrance
        const entrance = new THREE.Mesh(
            new THREE.BoxGeometry(6, 8, 1),
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
        );
        entrance.position.set(0, -2, 7.6);

        // Add all elements
        mansion.add(mainBody);
        mansion.add(foundation);
        mansion.add(leftWing);
        mansion.add(rightWing);
        mansion.add(mainRoof);
        mansion.add(leftWingRoof);
        mansion.add(rightWingRoof);
        mansion.add(entrance);
        mansion.add(vLeft);
        mansion.add(vRight);
        mansion.add(w1);
        mansion.add(w2);
        mansion.add(w3);
        mansion.add(w4);  // Added fourth stroke for W
        mansion.add(dStem);
        mansion.add(dCurve);

        // Position the mansion
        mansion.position.copy(this.position);

        this.mesh = mansion;
    }
} 