import { PlaneRenderComponent, ShadowComponent } from "../component";
import { ComponentManager } from "../scene";
import System from "./System";

class ShadowSystem implements System {

    planeRenderComponents: Map<number, PlaneRenderComponent>;
    shadowComponents: Map<number, ShadowComponent>;
    constructor() {
        this.planeRenderComponents = new Map();
        this.shadowComponents = new Map();
    }


    registerComponents(componentManager: ComponentManager) {
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.shadowComponents = componentManager.getComponents(ShadowComponent);

    }

    update(timeDelta: number) {
        this.shadowComponents.forEach(shadow => {
            const render = this.planeRenderComponents.get(shadow.id);
            if (!render) {
                return;
            }
            const position = render.getPosition();
            shadow.setWorldCoords(position.x, position.z);
        });
    }

    getUpdatePriority() {
        return 1;
    }

}

export default ShadowSystem;