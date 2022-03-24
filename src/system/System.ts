import { ComponentManager } from '../scene';
interface System {
    registerComponents: (componentManager: ComponentManager) => void;
    update: (timeDelta: number) => void;
};

export default System;