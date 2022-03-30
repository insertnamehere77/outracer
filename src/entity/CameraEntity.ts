import { CameraComponent } from "../component";
import Entity from "./Entity";

class CameraEntity extends Entity {
    cameraComponent: CameraComponent;
    constructor() {
        super();
        this.cameraComponent = new CameraComponent(this.id);
    }
}

export default CameraEntity;