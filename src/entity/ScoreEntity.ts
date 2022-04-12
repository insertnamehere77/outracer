import { ScoreComponent } from "../component";
import Entity from "./Entity";

class ScoreEntity extends Entity {
    scoreComponent: ScoreComponent;
    constructor() {
        super();
        this.scoreComponent = new ScoreComponent(this.id);
    }
}

export default ScoreEntity;