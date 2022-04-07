import { Texture, TextureLoader } from "three";
import { LifeStatus } from "../enums";
import Component from "./Component";
import PlaneRenderComponent from "./PlaneRenderComponent";

class LifeComponent extends Component {
    static componentType: string = "LifeComponent";
    status: LifeStatus;
    aliveTexture: Texture;
    deadTexture: Texture;


    constructor(id: number, status: LifeStatus, aliveTexturePath: string, deadTexturePath: string) {
        super(id);
        this.status = status;

        const loader = new TextureLoader();
        this.aliveTexture = loader.load(aliveTexturePath);
        this.deadTexture = loader.load(deadTexturePath);
    }

    kill(render: PlaneRenderComponent) {
        render.setTexture(this.deadTexture);
        this.status = LifeStatus.DEAD;
    }

    revive(render: PlaneRenderComponent) {
        render.setTexture(this.aliveTexture);
        this.status = LifeStatus.ALIVE;
    }

    isAlive(): boolean {
        return this.status === LifeStatus.ALIVE;
    }

}

export default LifeComponent;