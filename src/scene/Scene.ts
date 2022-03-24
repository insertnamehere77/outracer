import ComponentManager from "./ComponentManager";
import { Entity } from '../entity';
import { System } from '../system';

class Scene {
    entities: Array<Entity>;
    systems: Array<System>;
    componentManager: ComponentManager;

    private lastUpdated?: number;


    constructor() {
        this.entities = new Array();
        this.systems = [];
        this.componentManager = new ComponentManager();
    }


    addEntity(entity: Entity) {
        this.entities.push(entity);
        this.componentManager.addEntity(entity);
    }


    addSystem(system: System) {
        this.systems.push(system);
        system.registerComponents(this.componentManager);
    }



    update() {
        const now = Date.now();
        const timeDelta = now - (this.lastUpdated || now);
        for (const system of this.systems) {
            system.update(timeDelta);
        }
        this.lastUpdated = now;
    }
};

export default Scene;