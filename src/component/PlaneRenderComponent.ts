import Component from "./Component";
import * as THREE from 'three';

class PlaneRenderComponent extends Component {
    static componentType: string = 'PlaneRenderComponent';
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.Material;
    mesh: THREE.Mesh;

    constructor(id: number, textureSrc: string, width: number, height: number) {
        super(id);
        this.texture = new THREE.TextureLoader().load(textureSrc);
        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

export default PlaneRenderComponent;