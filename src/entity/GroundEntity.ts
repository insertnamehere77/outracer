import Entity from "./Entity";
import { PlaneRenderComponent, GroundComponent } from "../component";

class GroundEntity extends Entity {
    planeRenderComponent: PlaneRenderComponent;
    groundComponent: GroundComponent;
    constructor(spriteSrc: string, width: number, height?: number) {
        super();
        this.planeRenderComponent = new PlaneRenderComponent(this.id, spriteSrc, width, (height || width));
        this.planeRenderComponent.mesh.rotateX(-Math.PI / 2);
        this.groundComponent = new GroundComponent(this.id, width, height);
    }
}

export default GroundEntity;