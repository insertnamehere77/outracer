
import Entity from "./Entity";
import { PlaneRenderComponent, ControllerComponent, CollisionComponent, LifeComponent } from "../component";
import { LifeStatus } from "../enums";

class KartEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    controllerComponent: ControllerComponent;
    collisionComponent: CollisionComponent;
    lifeComponent: LifeComponent;
    constructor(width: number, height: number = width) {
        super();
        this.lifeComponent = new LifeComponent(this.id, LifeStatus.ALIVE,
            "./sports_car.png", "./sports_car_fire.png");
        this.planeRenderComponent = new PlaneRenderComponent(this.id, this.lifeComponent.aliveTexture, width, height);;
        this.planeRenderComponent.translateWorldY(0.5);
        this.planeRenderComponent.setRenderOrder(1);
        this.controllerComponent = new ControllerComponent(this.id);

        this.collisionComponent = new CollisionComponent(this.id, width);

    }
}

export default KartEntity;