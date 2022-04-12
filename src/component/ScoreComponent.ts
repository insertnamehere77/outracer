import Component from "./Component";

class ScoreComponent extends Component {
    currScore: number;
    constructor(id: number) {
        super(id);
        this.currScore = 0;
    }

    increase(diff: number) {
        this.currScore += diff;
    }

    reset() {
        this.currScore = 0;
    }

    getScore(): number {
        return this.currScore;
    }
}

export default ScoreComponent;