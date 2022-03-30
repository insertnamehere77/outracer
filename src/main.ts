import { KartEntity, GroundEntity, CameraEntity } from "./entity";
import { Scene } from "./scene";
import { InputSystem, ThreeRenderSystem, DriveSystem } from "./system";

const carSrc = "./testarosa.png";
const grassSrc = "./grass.jpg";

function main() {
    const carEntity = new KartEntity(carSrc, 1);
    carEntity.planeRenderComponent.mesh.translateY(0.35);

    const grassEntity = new GroundEntity(grassSrc, 10);
    grassEntity.planeRenderComponent.mesh.rotateX(-Math.PI / 2);

    const cameraEntity = new CameraEntity();

    const gameScene = new Scene();
    gameScene.addEntities(carEntity, grassEntity, cameraEntity);

    const renderSystem = new ThreeRenderSystem();
    const inputSystem = new InputSystem();
    const driveSystem = new DriveSystem();
    gameScene.addSystems(renderSystem, inputSystem, driveSystem);

    const animate = () => {
        gameScene.update();
        requestAnimationFrame(animate);
    }
    animate();
};

main();