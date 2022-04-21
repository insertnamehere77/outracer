import ComponentManager from "./ComponentManager";
import { Entity } from '../entity';
import { System } from '../system';

class Scene {
    entities: Array<Entity>;
    systems: Array<System>;
    componentManager: ComponentManager;

    private lastUpdated?: number;


    constructor() {
        this.entities = [];
        this.systems = [];
        this.componentManager = new ComponentManager();
    }


    addEntity(entity: Entity) {
        this.entities.push(entity);
        this.componentManager.addEntity(entity);
    }

    addEntities(...entities: Entity[]) {
        for (const entity of entities) {
            this.addEntity(entity);
        }
    }


    addSystem(system: System) {
        this.systems.push(system);
        system.registerComponents(this.componentManager);
        this.sortSystems();
    }

    addSystems(...systems: System[]) {
        for (const system of systems) {
            this.systems.push(system);
            system.registerComponents(this.componentManager);
        }
        this.sortSystems();
    }

    //TODO: Consider swapping out this.systems to use an Array implementation that always maintains it's sort order internally
    private sortSystems() {
        //Higher priority number updates first
        this.systems.sort((sysA: System, sysB: System) => {
            const priorityA = sysA.getUpdatePriority();
            const priorityB = sysB.getUpdatePriority();

            if (priorityA > priorityB) {
                return -1;
            }

            if (priorityA < priorityB) {
                return 1;
            }

            return 0;
        });
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