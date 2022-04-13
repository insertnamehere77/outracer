import Entity from "./Entity";
import { PlaneRenderComponent, CollisionComponent, TrafficComponent } from "../component";
import { TextureLoader } from "three";

class TrafficEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    collisisonComponent: CollisionComponent;
    trafficComponent: TrafficComponent;

    constructor(speed: number) {
        super();
        const texture = new TextureLoader().load("./sedan.png");
        this.planeRenderComponent = new PlaneRenderComponent(this.id, texture, 1, 1);
        this.planeRenderComponent.translateWorldY(0.5);
        this.planeRenderComponent.setRenderOrder(1);
        this.collisisonComponent = new CollisionComponent(this.id, 1);
        this.trafficComponent = new TrafficComponent(this.id, speed);
    }
}

export default TrafficEntity;