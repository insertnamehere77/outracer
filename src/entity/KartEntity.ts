
import Entity from "./Entity";
import { PlaneRenderComponent } from "../component";
import { ControllerComponent } from '../component';

class KartEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    controllerComponent: ControllerComponent;
    constructor(spriteSrc: string, width: number, height?: number) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, spriteSrc, width, (height || width));
        this.controllerComponent = new ControllerComponent(this.id);
    }
}

export default KartEntity;