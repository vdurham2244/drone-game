import * as THREE from 'three';
import { Building } from './Building';

export class HighriseBuilding extends Building {
    createMesh(): void {
        const building = new THREE.Group();

        // Main building body
        const bodyGeometry = new THREE.BoxGeometry(12, 40, 12);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x2F4F4F, // Dark slate gray
            transparent: true,
            opacity: 1,
            shininess: 100
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

        // Glass panels for modern look
        const glassGeometry = new THREE.PlaneGeometry(11, 38);
        const glassMaterial = new THREE.MeshPhongMaterial({
            color: 0x4682B4, // Steel blue
            transparent: true,
            opacity: 0.6,
            shininess: 100,
            side: THREE.DoubleSide
        });

        // Add glass panels to all four sides
        const frontGlass = new THREE.Mesh(glassGeometry, glassMaterial);
        frontGlass.position.set(0, 0, 6.01);
        
        const backGlass = new THREE.Mesh(glassGeometry, glassMaterial);
        backGlass.position.set(0, 0, -6.01);
        backGlass.rotation.y = Math.PI;

        const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
        leftGlass.position.set(-6.01, 0, 0);
        leftGlass.rotation.y = -Math.PI / 2;

        const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
        rightGlass.position.set(6.01, 0, 0);
        rightGlass.rotation.y = Math.PI / 2;

        // Add horizontal dividers for floors
        const floorCount = 12;
        const floorSpacing = 3;
        for (let i = 0; i < floorCount; i++) {
            const y = -18 + (i * floorSpacing);
            const divider = new THREE.Mesh(
                new THREE.BoxGeometry(12.1, 0.2, 12.1),
                new THREE.MeshPhongMaterial({ color: 0x4A4A4A })
            );
            divider.position.y = y;
            building.add(divider);
        }

        // Add vertical supports
        const supportPositions = [
            [-5.5, 0, 6], [5.5, 0, 6],    // Front
            [-5.5, 0, -6], [5.5, 0, -6],  // Back
            [-6, 0, -5.5], [-6, 0, 5.5],  // Left
            [6, 0, -5.5], [6, 0, 5.5]     // Right
        ];

        supportPositions.forEach(pos => {
            const support = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 40, 0.3),
                new THREE.MeshPhongMaterial({ color: 0x2F4F4F })
            );
            support.position.set(pos[0], 0, pos[1]);
            building.add(support);
        });

        // Modern roof structure
        const roofBase = new THREE.Mesh(
            new THREE.BoxGeometry(13, 1, 13),
            new THREE.MeshPhongMaterial({
                color: 0x4A4A4A,
                shininess: 50
            })
        );
        roofBase.position.y = 20.5;

        // Roof details
        const roofDetail = new THREE.Mesh(
            new THREE.BoxGeometry(8, 3, 8),
            new THREE.MeshPhongMaterial({ color: 0x2F4F4F })
        );
        roofDetail.position.y = 22;

        // Modern entrance
        const entranceBase = new THREE.Mesh(
            new THREE.BoxGeometry(8, 4, 2),
            new THREE.MeshPhongMaterial({ color: 0x4A4A4A })
        );
        entranceBase.position.set(0, -18, 7);

        const entranceRoof = new THREE.Mesh(
            new THREE.BoxGeometry(8, 0.3, 3),
            new THREE.MeshPhongMaterial({ color: 0x2F4F4F })
        );
        entranceRoof.position.set(0, -16, 7.5);

        // Glass door
        const door = new THREE.Mesh(
            new THREE.PlaneGeometry(6, 3.5),
            new THREE.MeshPhongMaterial({
                color: 0x4682B4,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            })
        );
        door.position.set(0, -18, 8.1);

        // Combine all elements
        building.add(body);
        building.add(frontGlass);
        building.add(backGlass);
        building.add(leftGlass);
        building.add(rightGlass);
        building.add(roofBase);
        building.add(roofDetail);
        building.add(entranceBase);
        building.add(entranceRoof);
        building.add(door);

        // Position the building
        building.position.copy(this.position);

        this.mesh = building;
    }
} 