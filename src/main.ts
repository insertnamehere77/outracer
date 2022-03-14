



interface System {
    registerComponents: (componentManager: ComponentManager) => void;
    update: (timeDelta: number) => void;
};



class TextRenderSystem implements System {

    componentManager: ComponentManager | undefined;

    registerComponents(componentManager: ComponentManager) {
        this.componentManager = componentManager;
    }


    update(timeDelta: number) {
        if (this.componentManager === undefined) {
            throw Error("Didn't register components with text render system buddy");
        }
        const transformComponents =
            this.componentManager.getComponents("TransformComponent") as Map<number, TransformComponent>;
        console.log('time:', timeDelta);
        for (const [id, component] of transformComponents) {
            if (!component) {
                continue;
            }
            console.log(id, component.x, component.y, component.z);
        }

    }

};





class Component {
    id: number;
    className: string;
    constructor(id: number, className: string) {
        this.id = id;
        this.className = className;
    }
};


class TransformComponent extends Component {
    x: number;
    y: number;
    z: number;

    constructor(id: number, x: number, y: number, z: number) {
        super(id, "TransformComponent");
        this.x = x;
        this.y = y;
        this.z = z;
    }
};



class Entity {
    id: number;
    components: Array<Component>;

    constructor(id: number) {
        this.id = id;
        this.components = [];
    }
};






class ComponentManager {
    private componentMap: Map<string, Map<number, Component>>;

    constructor() {
        this.componentMap = new Map();
    }

    addEntity(entity: Entity) {
        for (const component of entity.components) {
            const componentType = component.className;
            const currComponents = this.componentMap.get(componentType) || new Map();
            currComponents.set(component.id, component);
            this.componentMap.set(componentType, currComponents);
        }
    }

    getComponents(componentType: string): Map<number, Component> | undefined {
        return this.componentMap.get(componentType);
    }
};

const MAX_NUM_ENTITIES = 100;

class Scene {
    entities: Array<Entity>;
    systems: Array<System>;
    componentManager: ComponentManager;

    private lastUpdated: number;


    constructor() {
        this.entities = new Array(MAX_NUM_ENTITIES);
        this.systems = [];
        this.componentManager = new ComponentManager();
        this.lastUpdated = 0;
    }


    addEntity(entity: Entity) {
        this.entities[entity.id] = entity;
        this.componentManager.addEntity(entity);
    }


    addSystem(system: System) {
        this.systems.push(system);
        system.registerComponents(this.componentManager);
    }



    update() {
        const now = Date.now();
        const timeDelta = now - this.lastUpdated;
        for (const system of this.systems) {
            system.update(timeDelta);
        }
        this.lastUpdated = now;
    }
};



function main() {
    const testEntity = new Entity(0);
    const testComponent = new TransformComponent(testEntity.id, 0, 0, 0);
    testEntity.components.push(testComponent);

    const testScene = new Scene();
    testScene.addEntity(testEntity);

    const testSystem = new TextRenderSystem();
    testScene.addSystem(testSystem);

    testScene.update();
};

main();