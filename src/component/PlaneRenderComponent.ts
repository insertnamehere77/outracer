import Component from "./Component";
import * as THREE from 'three';

class PlaneRenderComponent extends Component {
    static componentType: string = 'PlaneRenderComponent';
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;

    constructor(id: number, texture: THREE.Texture, width: number, height: number) {
        super(id);
        this.texture = texture;
        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    getPosition(): THREE.Vector3 {
        return this.mesh.position;
    }

    setTexture(texture: THREE.Texture) {
        this.material.map = texture;
        this.material.transparent = true;
        this.material.needsUpdate = true;
    }

    translateWorldX(diff: number) {
        this.mesh.position.x += diff;
    }

    translateWorldY(diff: number) {
        this.mesh.position.y += diff;
    }

    translateWorldZ(diff: number) {
        this.mesh.position.z += diff;
    }

    setRenderOrder(order: number) {
        this.mesh.renderOrder = order;
    }
}

export default PlaneRenderComponent;