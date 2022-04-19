import { ControllerComponent } from "../component";
import { ControllerCommands } from "../enums";
import { ComponentManager } from "../scene";
import System from "./System";

class DemoSystem implements System {
    static scoreBoard: HTMLElement = document.getElementById("scoreBoard") as HTMLElement;
    static commands: Set<ControllerCommands>;
    static {
        DemoSystem.commands = new Set([ControllerCommands.DRIVE]);
    }

    controllerComponent: ControllerComponent;

    constructor() {
        DemoSystem.scoreBoard.innerText = "DEMO MODE";
        this.controllerComponent = new ControllerComponent(-1);

    }

    registerComponents(componentManager: ComponentManager) {
        this.controllerComponent = componentManager.getComponent(ControllerComponent);
    }

    update(timeDelta: number) {
        this.controllerComponent.setCommands(DemoSystem.commands);
    }

    getUpdatePriority() {
        return 1;
    }
}

export default DemoSystem;