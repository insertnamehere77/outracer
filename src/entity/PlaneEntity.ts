import Entity from "./Entity";
import { PlaneRenderComponent } from "../component";

class PlaneEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    constructor(spriteSrc: string, width: number, height?: number) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, spriteSrc, width, (height || width));
    }
}

export default PlaneEntity;