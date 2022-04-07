import Entity from "./Entity";
import { PlaneRenderComponent, CollisionComponent } from "../component";
import { TextureLoader, Texture } from "three";

class TreeEntity extends Entity {
    static texture: Texture = new TextureLoader().load("./tree.png");

    planeRenderComponent: PlaneRenderComponent;
    collisionComponent: CollisionComponent;

    constructor(width: number, height: number = width) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, TreeEntity.texture, width, height);
        this.planeRenderComponent.mesh.position.y += 0.35;
        this.planeRenderComponent.mesh.position.z -= 5;


        this.collisionComponent = new CollisionComponent(this.id, width);
    }
}

export default TreeEntity;