import { ScoreComponent } from "../component";
import { ComponentManager } from "../scene";
import System from "./System";

class ScoreSystem implements System {
    static scoreBoard: HTMLElement = document.getElementById("scoreBoard") as HTMLElement;
    static hiScoreKey = "hiScore";

    scoreComponent: ScoreComponent;

    highScore: number;

    constructor() {
        this.highScore = this.readHiScore();
        this.scoreComponent = new ScoreComponent(-1);
    }

    registerComponents(componentManager: ComponentManager) {
        this.scoreComponent = componentManager.getComponent(ScoreComponent);
    }

    update(timeDelta: number) {
        this.highScore = Math.max(this.scoreComponent.getScore(), this.highScore);
        this.writeHiScore();
        ScoreSystem.scoreBoard.innerText = this.getDisplayText();
    }

    private readHiScore(): number {
        const scoreStr = window.localStorage.getItem(ScoreSystem.hiScoreKey) || '0';
        return parseInt(scoreStr);
    }

    private writeHiScore() {
        window.localStorage.setItem(ScoreSystem.hiScoreKey, this.highScore.toString());
    }

    private getDisplayText(): string {
        return `Hi: ${this.highScore}\nScore: ${this.scoreComponent.getScore()}`;
    }
    getUpdatePriority() {
        return 1;
    }

}

export default ScoreSystem;