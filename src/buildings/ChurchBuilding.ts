import * as THREE from 'three';
import { Building } from './Building';

export class ChurchBuilding extends Building {
    createMesh(): void {
        const church = new THREE.Group();

        // Main church body (larger)
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(10, 8, 16),
            new THREE.MeshPhongMaterial({
                color: 0xF5F5DC, // Beige stone color
                transparent: true,
                opacity: 1
            })
        );

        // Steeple base (taller)
        const steepleBase = new THREE.Mesh(
            new THREE.BoxGeometry(4, 12, 4),
            new THREE.MeshPhongMaterial({
                color: 0xE8E8E8,
                transparent: true,
                opacity: 1
            })
        );
        steepleBase.position.set(0, 10, -4);

        // Steeple roof (taller pyramid)
        const steepleRoofGeometry = new THREE.ConeGeometry(3, 6, 4);
        const steepleRoof = new THREE.Mesh(
            steepleRoofGeometry,
            new THREE.MeshPhongMaterial({
                color: 0x8B4513,
                transparent: true,
                opacity: 1
            })
        );
        steepleRoof.position.set(0, 19, -4);

        // Larger cross
        const crossVertical = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 2, 0.4),
            new THREE.MeshPhongMaterial({ color: 0xFFD700 })
        );
        const crossHorizontal = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.4, 0.4),
            new THREE.MeshPhongMaterial({ color: 0xFFD700 })
        );
        const cross = new THREE.Group();
        cross.add(crossVertical);
        cross.add(crossHorizontal);
        cross.position.set(0, 23, -4);

        // Larger, more ornate windows
        const windowGeometry = new THREE.BoxGeometry(1.2, 4, 0.2);
        const windowMaterial = new THREE.MeshPhongMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.8
        });

        // Add windows on both sides
        for (let i = -5; i <= 5; i += 5) {
            const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
            leftWindow.position.set(-5.1, 0, i);
            leftWindow.rotation.y = Math.PI / 2;
            church.add(leftWindow);

            const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
            rightWindow.position.set(5.1, 0, i);
            rightWindow.rotation.y = Math.PI / 2;
            church.add(rightWindow);
        }

        // Large front window (rose window)
        const roseWindowGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 16);
        const roseWindow = new THREE.Mesh(
            roseWindowGeometry,
            new THREE.MeshPhongMaterial({
                color: 0x87CEEB,
                transparent: true,
                opacity: 0.8
            })
        );
        roseWindow.rotation.x = Math.PI / 2;
        roseWindow.position.set(0, 4, 8.1);

        // Main door (larger, more ornate)
        const doorFrame = new THREE.Mesh(
            new THREE.BoxGeometry(4, 6, 0.5),
            new THREE.MeshPhongMaterial({ color: 0x8B4513 })
        );
        doorFrame.position.set(0, -1, 8.1);

        const door = new THREE.Mesh(
            new THREE.BoxGeometry(3.6, 5.6, 0.2),
            new THREE.MeshPhongMaterial({ color: 0x4A3520 })
        );
        door.position.set(0, -1, 8.3);

        // Steps
        const steps = new THREE.Mesh(
            new THREE.BoxGeometry(6, 1, 2),
            new THREE.MeshPhongMaterial({ color: 0x808080 })
        );
        steps.position.set(0, -4, 9);

        // Roof details
        const roofGeometry = new THREE.BoxGeometry(11, 0.5, 17);
        const roof = new THREE.Mesh(
            roofGeometry,
            new THREE.MeshPhongMaterial({ color: 0x8B4513 })
        );
        roof.position.y = 4.25;

        // Combine all elements
        church.add(body);
        church.add(steepleBase);
        church.add(steepleRoof);
        church.add(cross);
        church.add(doorFrame);
        church.add(door);
        church.add(steps);
        church.add(roof);
        church.add(roseWindow);

        // Position the church
        church.position.copy(this.position);

        this.mesh = church;
    }
} 