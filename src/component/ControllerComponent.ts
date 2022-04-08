import Component from "./Component";
import { ControllerCommands } from "../enums";

class ControllerComponent extends Component {
    static componentType: string = 'ControllerComponent';
    commands: Set<ControllerCommands>;
    acceleration: number;
    deceleration: number;
    topSpeed: number;
    currentSpeed: number;
    turnRadius: number;

    constructor(id: number) {
        super(id);
        this.commands = new Set();

        this.currentSpeed = 0;
        this.acceleration = 0.6;
        this.deceleration = -0.5;
        this.topSpeed = 2;
        this.turnRadius = 0.5;
    }

    setCommands(newCommands: Set<ControllerCommands>) {
        this.commands = newCommands;
    }
}

export default ControllerComponent;