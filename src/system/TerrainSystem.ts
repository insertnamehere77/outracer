import { ComponentManager } from "../scene";
import { GroundComponent, PlaneRenderComponent, CameraComponent } from "../component";
import System from "./System";
import { Vector3 } from "three";

class TerrainSystem implements System {

    groundComponents: Map<number, GroundComponent>;
    planeRenderComponents: Map<number, PlaneRenderComponent>;
    cameraComponent: CameraComponent;
    terrainLength: number;

    constructor() {
        this.groundComponents = new Map();
        this.planeRenderComponents = new Map();
        this.cameraComponent = new CameraComponent(-1);
        this.terrainLength = 0;
    }

    registerComponents(componentManager: ComponentManager) {
        this.groundComponents = componentManager.getComponents(GroundComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.cameraComponent = componentManager.getComponent(CameraComponent);
        this.terrainLength = this.getTerrainLength();
    }

    private getUnseenTerrain(): PlaneRenderComponent[] {
        const allTerrain = [...this.groundComponents.values()];
        const renderComponents: PlaneRenderComponent[] = [];
        allTerrain.forEach(ground => {
            const render = this.planeRenderComponents.get(ground.id);
            if (!render) {
                return;
            }
            const distToEdge = ground.height / 2;
            const edgePosition = new Vector3(
                render.mesh.position.x,
                render.mesh.position.y,
                render.mesh.position.z - distToEdge);

            if (!this.cameraComponent.canSee(edgePosition)) {
                renderComponents.push(render);
            }
        });

        return renderComponents;
    }

    private getTerrainLength(): number {
        let length = 0;
        this.groundComponents.forEach((ground: GroundComponent) => length += ground.height);
        return length;
    }

    update(timeDelta: number) {
        const unseenTerrain = this.getUnseenTerrain();
        unseenTerrain.forEach((render: PlaneRenderComponent) =>
            render.mesh.position.z -= this.terrainLength);
    }

    getUpdatePriority(): number {
        return 1;
    }

}

export default TerrainSystem;