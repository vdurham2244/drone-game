import * as THREE from 'three';
import { Building } from './Building';

export class ResidentialBuilding extends Building {
    createMesh(): void {
        const mansion = new THREE.Group();
        
        // Main building body (larger and more grand)
        const mainBody = new THREE.Mesh(
            new THREE.BoxGeometry(20, 15, 15),  // Increased height to 15 for better proportions
            new THREE.MeshPhongMaterial({ 
                color: 0xF5E6D3, // Elegant cream color
                transparent: true,
                opacity: 1
            })
        );

        // Stone foundation with texture
        const foundation = new THREE.Mesh(
            new THREE.BoxGeometry(21, 1, 16),
            new THREE.MeshPhongMaterial({ 
                color: 0x7B7B7B
            })
        );
        foundation.position.y = -7.5;  // Adjusted for new building height

        // Side wings
        const leftWing = new THREE.Mesh(
            new THREE.BoxGeometry(8, 8, 12),
            new THREE.MeshPhongMaterial({ 
                color: 0xF5E6D3,
                transparent: true,
                opacity: 1
            })
        );
        leftWing.position.set(-14, -2, 0);

        const rightWing = leftWing.clone();
        rightWing.position.set(14, -2, 0);

        // Main roof (fixed geometry)
        const roofGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -10.5, 7.5, -8,    // front left
            10.5, 7.5, -8,     // front right
            0, 15, 0,        // top front
            -10.5, 7.5, 8,     // back left
            10.5, 7.5, 8,      // back right
            0, 15, 0         // top back
        ]);
        const indices = new Uint16Array([
            0, 1, 2,    // front triangle
            3, 4, 5,    // back triangle
            0, 3, 4,    // bottom rectangle part 1
            0, 4, 1     // bottom rectangle part 2
        ]);
        roofGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        roofGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
        roofGeometry.computeVertexNormals();

        const mainRoof = new THREE.Mesh(
            roofGeometry,
            new THREE.MeshPhongMaterial({ 
                color: 0x4A4A4A,
                side: THREE.DoubleSide,  // Added to ensure both sides render
                transparent: true,
                opacity: 1
            })
        );

        // Wing roofs
        const wingRoofGeometry = new THREE.BoxGeometry(9, 2, 13);
        const leftWingRoof = new THREE.Mesh(
            wingRoofGeometry,
            new THREE.MeshPhongMaterial({ color: 0x4A4A4A })
        );
        leftWingRoof.position.set(-14, 3, 0);

        const rightWingRoof = leftWingRoof.clone();
        rightWingRoof.position.set(14, 3, 0);

        // Grand entrance portico
        const portico = new THREE.Group();

        // Portico columns
        const columnGeometry = new THREE.CylinderGeometry(0.6, 0.6, 10, 16);
        const columnMaterial = new THREE.MeshPhongMaterial({ color: 0xF0F0F0 });
        const columnPositions = [
            [-4, -1, 8],
            [-1.33, -1, 8],
            [1.33, -1, 8],
            [4, -1, 8]
        ];

        columnPositions.forEach(pos => {
            const column = new THREE.Mesh(columnGeometry, columnMaterial);
            column.position.set(pos[0], pos[1], pos[2]);
            
            // Add column capital
            const capital = new THREE.Mesh(
                new THREE.BoxGeometry(1.2, 0.4, 1.2),
                columnMaterial
            );
            capital.position.set(pos[0], 4, pos[2]);
            
            // Add column base
            const base = new THREE.Mesh(
                new THREE.BoxGeometry(1.2, 0.4, 1.2),
                columnMaterial
            );
            base.position.set(pos[0], -5.8, pos[8]);
            
            portico.add(column);
            portico.add(capital);
            portico.add(base);
        });

        // Portico roof
        const porticoRoof = new THREE.Mesh(
            new THREE.BoxGeometry(12, 1, 4),
            new THREE.MeshPhongMaterial({ color: 0x4A4A4A })
        );
        porticoRoof.position.set(0, 4.5, 8);
        portico.add(porticoRoof);

        // Grand entrance steps
        const steps = new THREE.Group();
        for (let i = 0; i < 5; i++) {
            const step = new THREE.Mesh(
                new THREE.BoxGeometry(10, 0.3, 1),
                new THREE.MeshPhongMaterial({ color: 0x909090 })
            );
            step.position.set(0, -5.85 + (i * 0.3), 7 + (i * 0.5));
            steps.add(step);
        }

        // Large windows
        const windowGeometry = new THREE.BoxGeometry(2.5, 4, 0.2);
        const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xADD8E6,
            shininess: 100,
            transparent: true,
            opacity: 0.7
        });

        // Window frames
        const frameGeometry = new THREE.BoxGeometry(3, 4.5, 0.3);
        const frameMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

        // Window positions (main building and wings)
        const windowPositions = [
            // Front windows
            [-7, 0, 7.6], [-2.3, 0, 7.6], [2.3, 0, 7.6], [7, 0, 7.6],
            // Second floor front
            [-7, 5, 7.6], [-2.3, 5, 7.6], [2.3, 5, 7.6], [7, 5, 7.6],
            // Side windows (main building)
            [-10.1, 0, 0], [-10.1, 5, 0], [10.1, 0, 0], [10.1, 5, 0],
            // Wing windows
            [-14, 0, 4], [-14, 0, -4], [14, 0, 4], [14, 0, -4]
        ];

        windowPositions.forEach((pos, index) => {
            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            
            frame.position.set(pos[0], pos[1], pos[2]);
            window.position.set(pos[0], pos[1], pos[2] + 0.1);
            
            // Rotate side windows
            if (index >= 8 && index < 12) {
                frame.rotation.y = Math.PI / 2;
                window.rotation.y = Math.PI / 2;
            }
            
            mansion.add(frame);
            mansion.add(window);

            // Add decorative window arch
            const arch = new THREE.Mesh(
                new THREE.CylinderGeometry(1.5, 1.5, 0.3, 16, 1, false, 0, Math.PI),
                frameMaterial
            );
            arch.rotation.z = Math.PI / 2;
            arch.position.set(pos[0], pos[1] + 2.25, pos[2] + 0.1);
            if (index >= 8 && index < 12) {
                arch.rotation.y = Math.PI / 2;
            }
            mansion.add(arch);
        });

        // Decorative chimneys
        const chimneyGeometry = new THREE.BoxGeometry(1.5, 4, 1.5);
        const chimneyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        const chimneyPositions = [
            [-8, 8, -2], [8, 8, -2],
            [-8, 8, 2], [8, 8, 2]
        ];

        chimneyPositions.forEach(pos => {
            const chimney = new THREE.Group();
            
            const base = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
            
            const top = new THREE.Mesh(
                new THREE.BoxGeometry(2, 0.5, 2),
                chimneyMaterial
            );
            top.position.y = 2.25;
            
            chimney.add(base);
            chimney.add(top);
            chimney.position.set(pos[0], pos[1], pos[2]);
            mansion.add(chimney);
        });

        // Add all elements
        mansion.add(mainBody);
        mansion.add(foundation);
        mansion.add(leftWing);
        mansion.add(rightWing);
        mansion.add(mainRoof);
        mansion.add(leftWingRoof);
        mansion.add(rightWingRoof);
        mansion.add(portico);
        mansion.add(steps);

        // Position the mansion
        mansion.position.copy(this.position);

        this.mesh = mansion;
    }
} 