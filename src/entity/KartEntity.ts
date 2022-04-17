
import Entity from "./Entity";
import { PlaneRenderComponent, ControllerComponent, CollisionComponent, LifeComponent, ShadowComponent } from "../component";
import { LifeStatus } from "../enums";

class KartEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    controllerComponent: ControllerComponent;
    collisionComponent: CollisionComponent;
    lifeComponent: LifeComponent;
    shadowComponent: ShadowComponent;

    constructor(width: number, height: number = width) {
        super();
        this.lifeComponent = new LifeComponent(this.id, LifeStatus.ALIVE,
            "./sports_car.png", "./sports_car_fire.png");
        this.planeRenderComponent = new PlaneRenderComponent(this.id, this.lifeComponent.aliveTexture, width, height);;
        this.planeRenderComponent.translateWorldY(0.4);
        this.planeRenderComponent.setRenderOrder(1);
        this.controllerComponent = new ControllerComponent(this.id);

        this.collisionComponent = new CollisionComponent(this.id, width);

        this.shadowComponent = new ShadowComponent(this.id, width, height * 0.5);
    }
}

export default KartEntity;