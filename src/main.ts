import { PlaneEntity } from "./entity";
import { Scene } from "./scene";
import { ThreeRenderSystem } from "./system";

const carSrc = "./testarosa.png";
const grassSrc = "./grass.jpg";

function main() {
    const carEntity = new PlaneEntity(carSrc, 1);
    carEntity.planeRenderComponent.mesh.translateY(0.35);

    const grassEntity = new PlaneEntity(grassSrc, 5);
    grassEntity.planeRenderComponent.mesh.rotateX(-Math.PI / 2);

    const testScene = new Scene();
    testScene.addEntity(carEntity);
    testScene.addEntity(grassEntity);

    const testSystem = new ThreeRenderSystem();
    testScene.addSystem(testSystem);

    testScene.update();
    setInterval(() => {
        testScene.update();
    }, 1000);
};

main();