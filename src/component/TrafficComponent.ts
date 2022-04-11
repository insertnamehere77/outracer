import Component from "./Component";

class TrafficComponent extends Component {
    currentSpeed: number;
    constructor(id: number, speed: number) {
        super(id);
        this.currentSpeed = speed;
    }

    setSpeed(speed: number) {
        this.currentSpeed = speed;
    }

    getSpeed(): number {
        return this.currentSpeed;
    }
}

export default TrafficComponent;