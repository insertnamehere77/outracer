
import Entity from "./Entity";
import { PlaneRenderComponent } from "../component";
import { ControllerComponent } from '../component';

class KartEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    controllerComponent: ControllerComponent;
    constructor(spriteSrc: string, width: number, height?: number) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, spriteSrc, width, (height || width));
        this.planeRenderComponent.mesh.position.y += 0.35;
        this.planeRenderComponent.mesh.renderOrder = 1;
        this.controllerComponent = new ControllerComponent(this.id);
    }
}

export default KartEntity;