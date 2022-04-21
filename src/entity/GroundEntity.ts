import Entity from "./Entity";
import { PlaneRenderComponent, GroundComponent } from "../component";
import { Texture, TextureLoader, Vector2, RepeatWrapping } from "three";

const LAYER_DIFF = -0.01;
class GroundEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    groundComponent: GroundComponent;
    constructor(texture: Texture, layer: number, width: number, height: number = width) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, texture, width, height);
        this.planeRenderComponent.rotateX(-Math.PI / 2)
        this.planeRenderComponent.setWorldY(layer * LAYER_DIFF);
        this.groundComponent = new GroundComponent(this.id, layer, width, height);
    }
}

export default GroundEntity;