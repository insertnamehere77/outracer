import { CameraComponent, ControllerComponent, PlaneRenderComponent } from "../component";
import { ControllerCommands } from "../enums";
import { ComponentManager } from "../scene";
import System from "./System";


function clampNum(currNum: number, min: number, max: number): number {
    const currOrMin = Math.max(currNum, min);
    return Math.min(currOrMin, max);
}


class DriveSystem implements System {

    controllerComponents: Map<number, ControllerComponent>;
    planeRenderComponents: Map<number, PlaneRenderComponent>;
    cameraComponent: CameraComponent | undefined;

    constructor() {
        this.controllerComponents = new Map();
        this.planeRenderComponents = new Map();
    }

    registerComponents(componentManager: ComponentManager) {
        this.controllerComponents = componentManager.getComponents(ControllerComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);

        const cameraComponents = componentManager.getComponents(CameraComponent);
        cameraComponents.forEach(camera => this.cameraComponent = camera);
    }

    private updateCar(timeDelta: number, controller: ControllerComponent, render: PlaneRenderComponent) {
        const commands = controller.commands;


        const timeDeltaSeconds = timeDelta / 1000;
        const isDriving = commands.has(ControllerCommands.DRIVE);

        const speedDiff = timeDeltaSeconds * (isDriving ?
            controller.acceleration :
            controller.deceleration);

        controller.currentSpeed = clampNum(controller.currentSpeed + speedDiff, 0, controller.topSpeed);
        const distanceDelta = timeDeltaSeconds * controller.currentSpeed;
        render.mesh.translateZ(-distanceDelta);



    }

    update(timeDelta: number) {
        this.controllerComponents.forEach(controller => {
            const render = this.planeRenderComponents.get(controller.id);
            // console.log('drivin', controller, render);
            if (!render) {
                return;
            }
            this.updateCar(timeDelta, controller, render);
            if (this.cameraComponent) {
                this.cameraComponent.camera.position.setZ(render.mesh.position.z + 1);
            }

        });

    }

    getUpdatePriority(): number {
        //Always run right after input system
        return Infinity - 1;
    }

};

export default DriveSystem;