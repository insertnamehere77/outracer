import { KartEntity, GroundEntity, CameraEntity, TreeEntity } from "./entity";
import { Scene } from "./scene";
import { InputSystem, ThreeRenderSystem, DriveSystem, TerrainSystem, CollisionSystem, RespawnSystem } from "./system";

function generateGroundEntities(
    numEntities: number,
    width: number,
    height: number = width): GroundEntity[] {

    const terrains: GroundEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const ground = new GroundEntity(width, height);
        ground.planeRenderComponent.mesh.position.z -= (height * i);
        terrains.push(ground);
    }
    return terrains;
}


function generateTreeEntities(
    numEntities: number,
    distBetween: number,
    distFromCenter: number,
    width: number,
    height: number = width): TreeEntity[] {

    const trees: TreeEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const tree1 = new TreeEntity(width, height);
        tree1.planeRenderComponent.translateWorldX(-distFromCenter);
        tree1.planeRenderComponent.translateWorldZ(-distBetween * i);
        trees.push(tree1);

        const tree2 = new TreeEntity(width, height);
        tree2.planeRenderComponent.translateWorldX(distFromCenter);
        tree2.planeRenderComponent.translateWorldZ(-distBetween * i);
        trees.push(tree2);
    }

    return trees;
}

function main() {
    const carEntity = new KartEntity(0.75, 0.75);
    const terrainEntities = generateGroundEntities(3, 10);
    const treeEntities = generateTreeEntities(10, 2, 3, 1, 2.5);
    const cameraEntity = new CameraEntity();

    const gameScene = new Scene();
    gameScene.addEntities(carEntity, cameraEntity, ...terrainEntities, ...treeEntities);

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