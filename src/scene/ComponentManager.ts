import { Component } from '../component';
import { Entity } from '../entity';

//Bit of a hack, but this allows us to specify that a Generic Type <T> is the type itself (via it's constructor) and not an instance of T
type Constructor<T> = new (...args: any) => T;

class ComponentManager {
    private componentMap: Map<string, Map<number, Component>>;

    constructor() {
        this.componentMap = new Map();
    }

    addEntity(entity: Entity) {
        for (const component of entity.getComponents()) {
            const componentType = component.constructor.name;
            const currComponents = this.componentMap.get(componentType) || new Map();
            currComponents.set(component.id, component);
            this.componentMap.set(componentType, currComponents);
        }
    }

    //Bit funky looking, but this function is asking for a subclass of Component (not an instance of the subclass)
    //I chose to go this route instead of just taking a string of the className for a few reasons:
    // 1. We now check at compile time that componentType is a valid Sub Class of Component
    // 3. This allows us to specify in the signature that the function will return a map of the corresponding type
    getComponents<T extends Component>(componentType: Constructor<T>): Map<number, T> {
        const currComponents = this.componentMap.get(componentType.name);
        //If there are no components currently registered, we go ahead and create an map for them
        //This allows systems to registerComponents ahead of time in case those components are added later
        if (!currComponents) {
            const newComponents = new Map();
            this.componentMap.set(componentType.name, newComponents);
            return newComponents;
        }
        return currComponents as Map<number, T>;
    }
};

export default ComponentManager;