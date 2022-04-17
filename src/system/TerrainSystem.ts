import { ComponentManager } from "../scene";
import { GroundComponent, PlaneRenderComponent, CameraComponent, SceneryComponent } from "../component";
import System from "./System";
import { Vector3 } from "three";

class TerrainSystem implements System {

    groundComponents: Map<number, GroundComponent>;
    sceneryComponents: Map<number, SceneryComponent>;
    planeRenderComponents: Map<number, PlaneRenderComponent>;
    cameraComponent: CameraComponent;
    terrainLengths: Map<number, number>;
    sceneryLength: number;

    constructor() {
        this.groundComponents = new Map();
        this.sceneryComponents = new Map();
        this.planeRenderComponents = new Map();
        this.cameraComponent = new CameraComponent(-1);
        this.terrainLengths = new Map();
        this.sceneryLength = 0;
    }

    registerComponents(componentManager: ComponentManager) {
        this.groundComponents = componentManager.getComponents(GroundComponent);
        this.sceneryComponents = componentManager.getComponents(SceneryComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.cameraComponent = componentManager.getComponent(CameraComponent);
        this.terrainLengths = this.calcTerrainLength();
        this.sceneryLength = this.calcSceneryLength();
    }

    private calcUnseenTerrain(): PlaneRenderComponent[] {
        const allTerrain = [...this.groundComponents.values()];
        const renderComponents: PlaneRenderComponent[] = [];
        allTerrain.forEach(ground => {
            const render = this.planeRenderComponents.get(ground.id);
            if (!render) {
                return;
            }
            const distToEdge = ground.height / 2;
            const pos = render.getPosition();
            const edgePosition = new Vector3(
                pos.x,
                pos.y,
                pos.z - distToEdge);

            if (!this.cameraComponent.canSee(edgePosition)) {
                renderComponents.push(render);
            }
        });

        return renderComponents;
    }

    private calcTerrainLength(): Map<number, number> {
        const lengthMap = new Map<number, number>();
        this.groundComponents.forEach((ground: GroundComponent) => {
            let currLength = lengthMap.get(ground.layer) || 0;
            currLength += ground.height
            lengthMap.set(ground.layer, currLength);
        });
        return lengthMap;
    }

    private calcSceneryLength(): number {
        const zValues = [...this.sceneryComponents.values()].map(scenery => {
            const render = this.planeRenderComponents.get(scenery.id);
            return render && Math.abs(render.getPosition().z);
        })
            .filter(position => position !== undefined) as number[];

        const zMin = Math.min(...zValues);
        const zMax = Math.max(...zValues);

        const sceneryLength = zMax - zMin;
        const numTreePairs = zValues.length / 2;
        const distBetween = sceneryLength / (numTreePairs - 1);

        return sceneryLength + distBetween;
    }

    private getUnseenScenery(): PlaneRenderComponent[] {
        const allScenery = [...this.sceneryComponents.values()];
        const renderComponents: PlaneRenderComponent[] = [];
        allScenery.forEach(scenery => {
            const render = this.planeRenderComponents.get(scenery.id);
            if (!render) {
                return;
            }

            const pos = render.getPosition();
            if (!this.cameraComponent.canSee(pos)) {
                renderComponents.push(render);
            }
        });

        return renderComponents;
    }

    update(timeDelta: number) {
        const unseenTerrain = this.calcUnseenTerrain();
        unseenTerrain.forEach((render: PlaneRenderComponent) => {
            const ground = this.groundComponents.get(render.id);

            if (!ground) {
                return
            }
            const length = this.terrainLengths.get(ground.layer);
            if (!length) {
                return;
            }
            render.translateWorldZ(-length);
        });

        const unseenScenery = this.getUnseenScenery();
        unseenScenery.forEach((render: PlaneRenderComponent) =>
            render.translateWorldZ(-this.sceneryLength));
    }

    getUpdatePriority(): number {
        return 1;
    }

}

export default TerrainSystem;