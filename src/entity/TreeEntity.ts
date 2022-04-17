import Entity from "./Entity";
import { PlaneRenderComponent, CollisionComponent, SceneryComponent, ShadowComponent } from "../component";
import { TextureLoader, Texture } from "three";

class TreeEntity extends Entity {
    static texture: Texture = new TextureLoader().load("./palm.png");

    planeRenderComponent: PlaneRenderComponent;
    collisionComponent: CollisionComponent;
    sceneryComponent: SceneryComponent;
    shadowComponent: ShadowComponent;

    constructor(width: number, height: number = width) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, TreeEntity.texture, width, height);
        this.planeRenderComponent.translateWorldY(1.5);
        this.planeRenderComponent.setRenderOrder(1);


        this.collisionComponent = new CollisionComponent(this.id, width);
        this.sceneryComponent = new SceneryComponent(this.id);

        this.shadowComponent = new ShadowComponent(this.id, 1.5, 1.5);
    }
}

export default TreeEntity;