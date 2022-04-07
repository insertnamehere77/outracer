import { CollisionComponent, LifeComponent, PlaneRenderComponent } from "../component";
import { ComponentManager } from "../scene";
import System from "./System";

class RespawnSystem implements System {
    lifeComponents: Map<Number, LifeComponent>;
    collisionComponents: Map<Number, CollisionComponent>;
    planeRenderComponents: Map<number, PlaneRenderComponent>;

    constructor() {
        this.lifeComponents = new Map();
        this.collisionComponents = new Map();
        this.planeRenderComponents = new Map();
    }

    registerComponents(componentManager: ComponentManager) {
        this.lifeComponents = componentManager.getComponents(LifeComponent);
        this.collisionComponents = componentManager.getComponents(CollisionComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
    }

    update(timeDelta: number) {
        this.collisionComponents.forEach(collision => {

            if (!collision.hasCollided()) {
                return;
            }

            const life = this.lifeComponents.get(collision.id);
            const render = this.planeRenderComponents.get(collision.id);
            if (!life || !render) {
                return;
            }

            life.kill(render);
        })
    }

    getUpdatePriority() {
        return 1;
    }

}

export default RespawnSystem;