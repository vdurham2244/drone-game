import * as THREE from 'three';
import { Building } from './Building';

export class IndustrialTank extends Building {
    createMesh(): void {
        const silo = new THREE.Group();

        // Main cylindrical body (taller and wider)
        const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 15, 32);
        const siloBody = new THREE.Mesh(
            cylinderGeometry,
            new THREE.MeshPhongMaterial({
                color: 0xC0C0C0, // Lighter silver color
                transparent: true,
                opacity: 1,
                shininess: 100
            })
        );

        // Conical top
        const coneGeometry = new THREE.ConeGeometry(3, 4, 32);
        const cone = new THREE.Mesh(
            coneGeometry,
            new THREE.MeshPhongMaterial({
                color: 0xB8B8B8,
                transparent: true,
                opacity: 1,
                shininess: 100
            })
        );
        cone.position.y = 9.5;

        // Base ring
        const baseRingGeometry = new THREE.TorusGeometry(3.2, 0.3, 16, 32);
        const baseRing = new THREE.Mesh(
            baseRingGeometry,
            new THREE.MeshPhongMaterial({ color: 0x808080 })
        );
        baseRing.rotation.x = Math.PI / 2;
        baseRing.position.y = -7.5;

        // Top ring
        const topRing = baseRing.clone();
        topRing.position.y = 7.5;

        // Support structure
        const supportGeometry = new THREE.CylinderGeometry(3.5, 4.5, 2, 8);
        const support = new THREE.Mesh(
            supportGeometry,
            new THREE.MeshPhongMaterial({ color: 0x606060 })
        );
        support.position.y = -8;

        // Add vertical detail lines
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const detailGeometry = new THREE.BoxGeometry(0.2, 15, 0.2);
            const detail = new THREE.Mesh(
                detailGeometry,
                new THREE.MeshPhongMaterial({ color: 0xA8A8A8 })
            );
            detail.position.set(
                Math.cos(angle) * 3.1,
                0,
                Math.sin(angle) * 3.1
            );
            silo.add(detail);
        }

        // Add all elements to the silo group
        silo.add(siloBody);
        silo.add(cone);
        silo.add(baseRing);
        silo.add(topRing);
        silo.add(support);

        // Position the silo
        silo.position.copy(this.position);

        this.mesh = silo;
    }
} 