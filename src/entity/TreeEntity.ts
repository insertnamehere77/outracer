import Entity from "./Entity";
import { PlaneRenderComponent, CollisionComponent, SceneryComponent } from "../component";
import { TextureLoader, Texture } from "three";

class TreeEntity extends Entity {
    static texture: Texture = new TextureLoader().load("./palm.png");

    planeRenderComponent: PlaneRenderComponent;
    collisionComponent: CollisionComponent;
    sceneryComponent: SceneryComponent;

    constructor(width: number, height: number = width) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, TreeEntity.texture, width, height);
        this.planeRenderComponent.translateWorldY(1.5);
        this.planeRenderComponent.setRenderOrder(1);


        this.collisionComponent = new CollisionComponent(this.id, width);
        this.sceneryComponent = new SceneryComponent(this.id);
    }
}

export default TreeEntity;