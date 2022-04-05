import { KartEntity, GroundEntity, CameraEntity } from "./entity";
import { Scene } from "./scene";
import { InputSystem, ThreeRenderSystem, DriveSystem, TerrainSystem } from "./system";

const carSrc = "./testarosa.png";
const grassSrc = "./grass.jpg";

function generateTerrainEntities(
    numEntities: number,
    filePath: string,
    width: number,
    height: number = width): GroundEntity[] {
    const terrainEntities: GroundEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const ground = new GroundEntity(filePath, width, height);
        ground.planeRenderComponent.mesh.position.z -= (height * i);
        terrainEntities.push(ground);
    }
    return terrainEntities;
}

function main() {
    const carEntity = new KartEntity(carSrc, 1);

    const terrainEntities = generateTerrainEntities(10, grassSrc, 10);

    const cameraEntity = new CameraEntity();

    const gameScene = new Scene();
    gameScene.addEntities(carEntity, cameraEntity, ...terrainEntities);

    const renderSystem = new ThreeRenderSystem();
    const inputSystem = new InputSystem();
    const driveSystem = new DriveSystem();
    const terrainSystem = new TerrainSystem();
    gameScene.addSystems(renderSystem, inputSystem, driveSystem, terrainSystem);

    const animate = () => {
        gameScene.update();
        requestAnimationFrame(animate);
    }
    animate();
};

main();