import { CameraComponent, PlaneRenderComponent, TrafficComponent } from "../component";
import { ComponentManager } from "../scene";
import { generateRandomNum } from "../util/random";
import System from "./System";

class TrafficSystem implements System {
    trafficComponents: Map<number, TrafficComponent>;
    planeRenderComponents: Map<number, PlaneRenderComponent>;
    cameraComponent: CameraComponent;

    trafficLength: number;
    trafficWidth: number;

    constructor(trafficWidth: number) {
        this.trafficComponents = new Map();
        this.planeRenderComponents = new Map();
        this.cameraComponent = new CameraComponent(-1);
        this.trafficLength = 0;
        this.trafficWidth = trafficWidth;
    }

    registerComponents(componentManager: ComponentManager) {
        this.trafficComponents = componentManager.getComponents(TrafficComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.cameraComponent = componentManager.getComponent(CameraComponent);
        this.trafficLength = this.calcTrafficLength();
    }

    private calcTrafficLength(): number {
        const zValues = [...this.trafficComponents.values()].map(scenery => {
            const render = this.planeRenderComponents.get(scenery.id);
            return render && Math.abs(render.getPosition().z);
        })
            .filter(position => position !== undefined) as number[];

        const zMin = Math.min(...zValues);
        const zMax = Math.max(...zValues);

        const trafficLength = zMax - zMin;
        const distBetween = trafficLength / (zValues.length - 1);

        return trafficLength + distBetween;
    }

    private getUnseenTraffic(): PlaneRenderComponent[] {
        const allTraffic = [...this.trafficComponents.values()];
        const renderComponents: PlaneRenderComponent[] = [];
        allTraffic.forEach(traffic => {
            const render = this.planeRenderComponents.get(traffic.id);
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

    private recycleUnseenTraffic() {
        const unseenTraffic = this.getUnseenTraffic();
        unseenTraffic.forEach(render => {
            render.translateWorldZ(-this.trafficLength);
            const xOffset = generateRandomNum(-this.trafficWidth, this.trafficWidth);
            render.setWorldX(xOffset);
        });
    }

    private updateTrafficPosition(timeDelta: number) {
        this.trafficComponents.forEach(traffic => {
            const render = this.planeRenderComponents.get(traffic.id);
            if (!render) {
                return;
            }


            const timeDeltaSeconds = timeDelta / 1000;
            const distDiff = timeDeltaSeconds * traffic.getSpeed();
            render.translateWorldZ(-distDiff);
        });
    }

    update(timeDelta: number) {
        this.recycleUnseenTraffic();
        this.updateTrafficPosition(timeDelta);
    }
    getUpdatePriority() {
        return 1;
    }

}

export default TrafficSystem;