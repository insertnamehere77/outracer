import { ScoreComponent } from "../component";
import { ComponentManager } from "../scene";
import System from "./System";

class ScoreSystem implements System {
    static scoreBoard: HTMLElement = document.getElementById("scoreBoard") as HTMLElement;
    static hiScoreKey = "hiScore";

    scoreComponent: ScoreComponent;
    highScore: number;
    prevScore: number;

    constructor() {
        this.highScore = this.readHiScore();
        this.prevScore = 0;
        this.scoreComponent = new ScoreComponent(-1);
        this.updateScoreBoard();
    }

    registerComponents(componentManager: ComponentManager) {
        this.scoreComponent = componentManager.getComponent(ScoreComponent);
    }

    update(timeDelta: number) {
        const currentScore = this.scoreComponent.getScore()
        const newHighScore = Math.max(currentScore, this.highScore);
        const highScoreNeedsUpdate = newHighScore !== this.highScore;
        if (highScoreNeedsUpdate) {
            this.highScore = newHighScore;
            this.writeHiScore();
        }

        const currentScoreNeedsUpdate = currentScore !== this.prevScore;
        if (currentScoreNeedsUpdate) {
            this.prevScore = currentScore;
        }


        if (highScoreNeedsUpdate || currentScoreNeedsUpdate) {
            this.updateScoreBoard();
        }

    }

    private readHiScore(): number {
        const scoreStr = window.localStorage.getItem(ScoreSystem.hiScoreKey) || '0';
        return parseInt(scoreStr);
    }

    private writeHiScore() {
        window.localStorage.setItem(ScoreSystem.hiScoreKey, this.highScore.toString());
    }

    private updateScoreBoard() {
        ScoreSystem.scoreBoard.innerText = this.getDisplayText();
    }

    private getDisplayText(): string {
        return `HI: ${this.highScore}\nSCORE: ${this.scoreComponent.getScore()}`;
    }
    getUpdatePriority() {
        return 1;
    }

}

export default ScoreSystem;