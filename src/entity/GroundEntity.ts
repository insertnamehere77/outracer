import Entity from "./Entity";
import { PlaneRenderComponent, GroundComponent } from "../component";
import { Texture, TextureLoader } from "three";

class GroundEntity extends Entity {
    static texture: Texture = new TextureLoader().load("grass.jpg");
    planeRenderComponent: PlaneRenderComponent;
    groundComponent: GroundComponent;
    constructor(width: number, height: number = width) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, GroundEntity.texture, width, height);
        this.planeRenderComponent.mesh.rotateX(-Math.PI / 2);
        this.groundComponent = new GroundComponent(this.id, width, height);
    }
}

export default GroundEntity;