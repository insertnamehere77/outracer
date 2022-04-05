import { ComponentManager } from "../scene";
import System from "./System";
import { ControllerComponent } from '../component';
import { ControllerCommands } from '../enums';

class InputSystem implements System {

    private activeKeys: Set<string>;
    private controllerComponents: Map<number, ControllerComponent>;

    private static keyToCommandMap = new Map([
        ['Space', ControllerCommands.DRIVE],
        ['ArrowLeft', ControllerCommands.TURN_LEFT],
        ['ArrowRight', ControllerCommands.TURN_RIGHT]
    ]);

    constructor() {
        this.activeKeys = new Set();
        this.controllerComponents = new Map();
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        document.addEventListener('keyup', this.handleKeyup.bind(this));
    }

    private handleKeydown(event: KeyboardEvent) {
        this.activeKeys.add(event.code);
    }

    private handleKeyup(event: KeyboardEvent) {
        this.activeKeys.delete(event.code);
    }

    private getActiveCommands(): Set<ControllerCommands> {
        const commands: Set<ControllerCommands> = new Set();
        this.activeKeys.forEach(key => {
            const command = InputSystem.keyToCommandMap.get(key);
            if (command !== undefined) {
                commands.add(command);
            }
        });
        return commands;
    }

    registerComponents(componentManager: ComponentManager) {
        this.controllerComponents = componentManager.getComponents(ControllerComponent);
    }

    update(timeDelta: number) {
        const commands = this.getActiveCommands();
        this.controllerComponents.forEach(component => component.setCommands(commands));
    }

    getUpdatePriority(): number {
        //Always read input first
        return Infinity;
    }

}

export default InputSystem;