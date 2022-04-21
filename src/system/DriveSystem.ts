import { CameraComponent, ControllerComponent, LifeComponent, PlaneRenderComponent } from "../component";
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
    lifeComponents: Map<number, LifeComponent>;
    cameraComponent: CameraComponent;

    constructor() {
        this.controllerComponents = new Map();
        this.planeRenderComponents = new Map();
        this.lifeComponents = new Map();
        this.cameraComponent = new CameraComponent(-1);
    }

    registerComponents(componentManager: ComponentManager) {
        this.controllerComponents = componentManager.getComponents(ControllerComponent);
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.lifeComponents = componentManager.getComponents(LifeComponent);

        this.cameraComponent = componentManager.getComponent(CameraComponent);
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
        render.translateWorldZ(-distanceDelta);


        const isMoving = controller.currentSpeed > 0;
        const isTurningLeft = commands.has(ControllerCommands.TURN_LEFT);
        const isTurningRight = commands.has(ControllerCommands.TURN_RIGHT);
        const isTurning = ((+isTurningLeft) + (+isTurningRight)) === 1;

        if (isMoving && isTurning) {
            const turnMultiplier = isTurningRight ? 1 : -1;
            const speedRatio = controller.currentSpeed / controller.topSpeed;
            const turnDist = timeDeltaSeconds * controller.turnRadius * turnMultiplier * speedRatio;
            render.translateWorldX(turnDist);
        }



    }

    update(timeDelta: number) {
        this.controllerComponents.forEach(controller => {

            const life = this.lifeComponents.get(controller.id);
            if (!life || !life.isAlive()) {
                return;
            }

            const render = this.planeRenderComponents.get(controller.id);
            if (!render) {
                return;
            }
            this.updateCar(timeDelta, controller, render);

            const pos = render.getPosition();
            this.cameraComponent.setWorldZ(pos.z + 1);
            this.cameraComponent.setWorldX(pos.x);
        });

    }

    getUpdatePriority(): number {
        //Always run right after input system
        return Infinity - 1;
    }

};

export default DriveSystem;