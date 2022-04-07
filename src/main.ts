import { KartEntity, GroundEntity, CameraEntity, TreeEntity } from "./entity";
import { Scene } from "./scene";
import { InputSystem, ThreeRenderSystem, DriveSystem, TerrainSystem, CollisionSystem, RespawnSystem } from "./system";

function generateTerrainEntities(
    numEntities: number,
    width: number,
    height: number = width): GroundEntity[] {
    const terrainEntities: GroundEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const ground = new GroundEntity(width, height);
        ground.planeRenderComponent.mesh.position.z -= (height * i);
        terrainEntities.push(ground);
    }
    return terrainEntities;
}

function main() {
    const carEntity = new KartEntity(1);
    const treeEntity = new TreeEntity(1, 2);
    const terrainEntities = generateTerrainEntities(3, 10);
    const cameraEntity = new CameraEntity();

    const gameScene = new Scene();
    gameScene.addEntities(carEntity, treeEntity, cameraEntity, ...terrainEntities);

    const renderSystem = new ThreeRenderSystem();
    const inputSystem = new InputSystem();
    const driveSystem = new DriveSystem();
    const terrainSystem = new TerrainSystem();
    const collisionSystem = new CollisionSystem();
    const respawnSystem = new RespawnSystem();
    gameScene.addSystems(renderSystem, inputSystem, driveSystem, terrainSystem, collisionSystem, respawnSystem);

    const animate = () => {
        gameScene.update();
        requestAnimationFrame(animate);
    }
    animate();
};

main();