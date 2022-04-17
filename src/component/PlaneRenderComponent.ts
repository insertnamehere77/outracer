import Component from "./Component";
import { NearestFilter, Texture, PlaneGeometry, MeshBasicMaterial, Mesh, MeshLambertMaterial, Vector3, MeshPhongMaterial } from "three";

class PlaneRenderComponent extends Component {
    static componentType: string = 'PlaneRenderComponent';
    texture: Texture;
    geometry: PlaneGeometry;
    material: MeshBasicMaterial;
    mesh: Mesh;

    constructor(id: number, texture: Texture, width: number, height: number) {
        super(id);
        this.texture = texture;
        this.texture.magFilter = NearestFilter;
        this.texture.minFilter = NearestFilter;
        this.geometry = new PlaneGeometry(width, height);
        this.material = new MeshBasicMaterial({ map: this.texture, transparent: true });
        this.mesh = new Mesh(this.geometry, this.material);
    }

    getPosition(): Vector3 {
        return this.mesh.position;
    }

    setTexture(texture: Texture) {
        this.material.map = texture;
        texture.magFilter = NearestFilter;
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

    setWorldX(diff: number) {
        this.mesh.position.x = diff;
    }

    setWorldY(diff: number) {
        this.mesh.position.y = diff;
    }

    setWorldZ(diff: number) {
        this.mesh.position.z = diff;
    }

    setRenderOrder(order: number) {
        this.mesh.renderOrder = order;
    }
}

export default PlaneRenderComponent;