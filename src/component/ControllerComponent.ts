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
        this.acceleration = 1.2;
        this.deceleration = -0.75;
        this.topSpeed = 4;
        this.turnRadius = 0.75;
    }

    setCommands(newCommands: Set<ControllerCommands>) {
        this.commands = newCommands;
    }
}

export default ControllerComponent;