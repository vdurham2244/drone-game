import * as THREE from 'three';
import { Building } from './Building';

export class WaterTower extends Building {
    createMesh(): void {
        const tower = new THREE.Group();

        // Main tank (larger and more cylindrical)
        const tankGeometry = new THREE.CylinderGeometry(4, 4, 6, 32);
        const tankMaterial = new THREE.MeshPhongMaterial({
            color: 0x505050, // Darker gray
            transparent: true,
            opacity: 1,
            shininess: 60
        });
        const tank = new THREE.Mesh(tankGeometry, tankMaterial);
        tank.position.y = 15;

        // Bottom curved part of tank
        const bottomCurveGeometry = new THREE.SphereGeometry(4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const bottomCurve = new THREE.Mesh(bottomCurveGeometry, tankMaterial);
        bottomCurve.position.y = 12;

        // Top curved part of tank
        const topCurveGeometry = new THREE.SphereGeometry(4, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
        const topCurve = new THREE.Mesh(topCurveGeometry, tankMaterial);
        topCurve.position.y = 18;

        // Conical roof with overhang
        const roofGeometry = new THREE.ConeGeometry(4.5, 2.5, 32);
        const roofMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B0000, // Dark red
            shininess: 30
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 19.5;

        // Central support column
        const centralColumnGeometry = new THREE.CylinderGeometry(0.8, 0.8, 24, 12);
        const supportMaterial = new THREE.MeshPhongMaterial({
            color: 0x2F2F2F,
            shininess: 30
        });
        const centralColumn = new THREE.Mesh(centralColumnGeometry, supportMaterial);
        centralColumn.position.y = 0;

        // Main support beams (thicker and more detailed)
        const mainSupportPositions = [
            [-2.5, 0, -2.5],
            [2.5, 0, -2.5],
            [-2.5, 0, 2.5],
            [2.5, 0, 2.5]
        ];

        mainSupportPositions.forEach(pos => {
            const support = new THREE.Mesh(
                new THREE.CylinderGeometry(0.4, 0.4, 24, 8),
                supportMaterial
            );
            support.position.set(pos[0], 0, pos[1]);
            tower.add(support);
        });

        // Add horizontal support rings at different heights
        const ringHeights = [-6, -2, 2, 6, 10];
        ringHeights.forEach(height => {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(3.5, 0.2, 16, 32),
                supportMaterial
            );
            ring.rotation.x = Math.PI / 2;
            ring.position.y = height;
            tower.add(ring);
        });

        // Add diagonal cross braces
        const braceGeometry = new THREE.CylinderGeometry(0.15, 0.15, 7.5, 8);
        const braceHeights = [-4, 0, 4, 8];
        
        braceHeights.forEach(height => {
            // Create X-shaped braces on all four sides
            for (let rotation = 0; rotation < Math.PI * 2; rotation += Math.PI/2) {
                const brace1 = new THREE.Mesh(braceGeometry, supportMaterial);
                brace1.position.y = height;
                brace1.rotation.z = Math.PI / 4;
                brace1.rotation.y = rotation;
                tower.add(brace1);

                const brace2 = new THREE.Mesh(braceGeometry, supportMaterial);
                brace2.position.y = height;
                brace2.rotation.z = -Math.PI / 4;
                brace2.rotation.y = rotation;
                tower.add(brace2);
            }
        });

        // Add maintenance platform
        const platformGeometry = new THREE.CylinderGeometry(4.5, 4.5, 0.3, 32);
        const platform = new THREE.Mesh(platformGeometry, supportMaterial);
        platform.position.y = 11;

        // Add railing to the platform
        const railingGeometry = new THREE.TorusGeometry(4.5, 0.05, 8, 32);
        const railing = new THREE.Mesh(railingGeometry, supportMaterial);
        railing.rotation.x = Math.PI / 2;
        railing.position.y = 12;

        // Add vertical railing supports
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
            const railSupport = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 1, 4),
                supportMaterial
            );
            railSupport.position.set(
                4.5 * Math.cos(angle),
                11.5,
                4.5 * Math.sin(angle)
            );
            tower.add(railSupport);
        }

        // Add access ladder
        const ladderHeight = 24;
        const ladderWidth = 0.6;
        const rungSpacing = 1;

        // Ladder side rails
        const sideRailGeometry = new THREE.CylinderGeometry(0.05, 0.05, ladderHeight, 4);
        const leftRail = new THREE.Mesh(sideRailGeometry, supportMaterial);
        const rightRail = new THREE.Mesh(sideRailGeometry, supportMaterial);
        leftRail.position.set(-ladderWidth/2, ladderHeight/2 - 12, 4.2);
        rightRail.position.set(ladderWidth/2, ladderHeight/2 - 12, 4.2);
        tower.add(leftRail);
        tower.add(rightRail);

        // Ladder rungs
        for (let i = 0; i < ladderHeight; i += rungSpacing) {
            const rung = new THREE.Mesh(
                new THREE.CylinderGeometry(0.025, 0.025, ladderWidth, 4),
                supportMaterial
            );
            rung.rotation.x = Math.PI / 2;
            rung.position.set(0, i - 12, 4.2);
            tower.add(rung);
        }

        // Add all main elements
        tower.add(tank);
        tower.add(bottomCurve);
        tower.add(topCurve);
        tower.add(roof);
        tower.add(centralColumn);
        tower.add(platform);
        tower.add(railing);

        // Position the tower
        tower.position.copy(this.position);

        this.mesh = tower;
    }
} 