import { Mesh, MeshBasicMaterial, NearestFilter, PlaneGeometry, Texture, TextureLoader } from "three";
import Component from "./Component";

class ShadowComponent extends Component {
    static componentType: string = 'ShadowComponent';
    static texture: Texture;
    static opacity: number = 0.25;
    static {
        this.texture = new TextureLoader().load("./shadow.png");
        this.texture.minFilter = NearestFilter;
        this.texture.magFilter = NearestFilter;
    }


    mesh: Mesh;

    constructor(id: number, width: number, height: number = width) {
        super(id);
        const geometry = new PlaneGeometry(width, height);
        const material = new MeshBasicMaterial({ map: ShadowComponent.texture, transparent: true });
        material.opacity = ShadowComponent.opacity;
        this.mesh = new Mesh(geometry, material);
        this.mesh.renderOrder = 1;
        this.mesh.rotateX(-Math.PI / 2);
        this.mesh.position.y = 0.01;
    }

    setWorldCoords(x: number, z: number) {
        this.mesh.position.x = x;
        this.mesh.position.z = z;
    }
}

export default ShadowComponent;