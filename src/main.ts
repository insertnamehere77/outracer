import { KartEntity, GroundEntity, CameraEntity, TreeEntity, TrafficEntity } from "./entity";
import { Scene } from "./scene";
import { generateRandomNum } from "./util/random";
import {
    InputSystem,
    ThreeRenderSystem,
    DriveSystem,
    TerrainSystem,
    CollisionSystem,
    RespawnSystem,
    TrafficSystem
} from "./system";

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



function generateTrafficEntities(
    numEntities: number,
    distBetween: number,
    maxDistFromCenter: number
): TrafficEntity[] {
    const trafficEntities: TrafficEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const traffic = new TrafficEntity(1);
        traffic.planeRenderComponent.translateWorldZ((i + 1) * -distBetween);
        const xOffset = generateRandomNum(-maxDistFromCenter, maxDistFromCenter);
        traffic.planeRenderComponent.translateWorldX(xOffset);

        trafficEntities.push(traffic);
    }
    return trafficEntities;
}

const ROAD_WIDTH = 3;
const TRAFFIC_WIDTH = ROAD_WIDTH * 0.75;

function main() {
    const carEntity = new KartEntity(0.75, 0.75);
    const terrainEntities = generateGroundEntities(5, 10);
    const treeEntities = generateTreeEntities(20, 2, ROAD_WIDTH, 1, 2.5);
    const trafficEntities = generateTrafficEntities(10, 5, TRAFFIC_WIDTH);
    const cameraEntity = new CameraEntity();

    const gameScene = new Scene();
    gameScene.addEntities(
        carEntity,
        cameraEntity,
        ...terrainEntities,
        ...treeEntities,
        ...trafficEntities);

    const renderSystem = new ThreeRenderSystem();
    const inputSystem = new InputSystem();
    const driveSystem = new DriveSystem();
    const terrainSystem = new TerrainSystem();
    const collisionSystem = new CollisionSystem();
    const respawnSystem = new RespawnSystem();
    const trafficSystem = new TrafficSystem(TRAFFIC_WIDTH);
    gameScene.addSystems(
        renderSystem,
        inputSystem,
        driveSystem,
        terrainSystem,
        collisionSystem,
        respawnSystem,
        trafficSystem);

    const animate = () => {
        gameScene.update();
        requestAnimationFrame(animate);
    }
    animate();
};

main();