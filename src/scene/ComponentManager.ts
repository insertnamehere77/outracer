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
            const componentType = (component.constructor as typeof Component).componentType
            const currComponents = this.componentMap.get(componentType) || new Map();
            currComponents.set(component.id, component);
            this.componentMap.set(componentType, currComponents);
        }
    }

    //Bit funky looking, but this function is asking for a subclass of Component (not an instance of the subclass)
    //I chose to go this route instead of just taking a string of the className for a few reasons:
    // 1. We now check at compile time that componentType is a valid Sub Class of Component
    // 3. This allows us to specify in the signature that the function will return a map of the corresponding type
    getComponents<T extends Component>(componentConstructor: Constructor<T>): Map<number, T> {
        const componentClass = componentConstructor as unknown as typeof Component;
        const currComponents = this.componentMap.get(componentClass.componentType);
        //If there are no components currently registered, we go ahead and create an map for them
        //This allows systems to registerComponents ahead of time in case those components are added later
        if (!currComponents) {
            const newComponents = new Map();
            this.componentMap.set(componentClass.componentType, newComponents);
            return newComponents;
        }
        return currComponents as Map<number, T>;
    }

    //Very similar to the above func, but this one returns a single component
    //This is useful for singleton components (think camera or controller)
    //An important note: because this returns the component itself and not a map, the component MUST be registered before this can be called
    getComponent<T extends Component>(componentConstructor: Constructor<T>): T {
        const componentClass = componentConstructor as unknown as typeof Component;
        const currComponents = this.componentMap.get(componentClass.componentType);
        const component = currComponents?.values().next().value;
        if (!component) {
            throw new Error(`Component type ${componentClass.componentType} not registered before calling getComponent`);
        }
        return component;
    }
};

export default ComponentManager;