import * as THREE from 'three';

export abstract class Building {
    protected mesh!: THREE.Object3D;
    protected dirtyLevel: number = 100;
    protected position: THREE.Vector3;

    constructor(position: THREE.Vector3) {
        this.position = position;
    }

    abstract createMesh(): void;

    getMesh(): THREE.Object3D {
        return this.mesh;
    }

    clean(amount: number): void {
        this.dirtyLevel = Math.max(0, this.dirtyLevel - amount);
        // Update material opacity based on dirt level
        this.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
                if (child.material.transparent) {
                    child.material.opacity = 0.3 + (this.dirtyLevel / 100) * 0.7;
                }
            }
        });
    }

    getDirtLevel(): number {
        return this.dirtyLevel;
    }

    isClean(): boolean {
        return this.dirtyLevel === 0;
    }
} 