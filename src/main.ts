import { KartEntity, GroundEntity, CameraEntity, TreeEntity, TrafficEntity, ScoreEntity, Entity } from "./entity";
import { Scene } from "./scene";
import { generateRandomNum } from "./util/random";
import {
    InputSystem,
    ThreeRenderSystem,
    DriveSystem,
    TerrainSystem,
    CollisionSystem,
    RespawnSystem,
    TrafficSystem,
    ScoreSystem,
    ShadowSystem,
    DemoSystem,
    System
} from "./system";
import { RepeatWrapping, Texture, TextureLoader, Vector2 } from "three";


function createRepeatingTexture(srcPath: string, horizRepeat: number, vertRepeat: number): Texture {
    const texture = new TextureLoader().load(srcPath);
    texture.repeat = new Vector2(horizRepeat, vertRepeat);
    texture.wrapT = RepeatWrapping;
    texture.wrapS = RepeatWrapping;
    return texture;
}


function generateGroundEntities(
    terrainTexture: Texture,
    layer: number,
    numEntities: number,
    width: number,
    height: number = width): GroundEntity[] {
    const terrains: GroundEntity[] = [];
    for (let i = 0; i < numEntities; i++) {
        const ground = new GroundEntity(terrainTexture, layer, width, height);
        ground.planeRenderComponent.translateWorldZ(-(height * i));
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

const NUM_TERRAIN = 10;
const TERRAIN_WIDTH = 50;
const TERRAIN_LENGTH = 5;

function createEntities(): Entity[] {
    const carEntity = new KartEntity(0.75, 0.75);
    const roadTexture = new TextureLoader().load("./road.png");
    const roadEntities = generateGroundEntities(roadTexture, 0, NUM_TERRAIN, 4, TERRAIN_LENGTH);
    const terrainTexture = createRepeatingTexture("sand.jpg", TERRAIN_WIDTH, TERRAIN_LENGTH);
    const sandEntities = generateGroundEntities(terrainTexture, 1, NUM_TERRAIN, TERRAIN_WIDTH, TERRAIN_LENGTH);
    const treeEntities = generateTreeEntities(20, 2, ROAD_WIDTH, 1, 3);
    const trafficEntities = generateTrafficEntities(10, 5, TRAFFIC_WIDTH);
    const scoreEntity = new ScoreEntity();
    const cameraEntity = new CameraEntity();

    return [
        carEntity,
        cameraEntity,
        scoreEntity,
        ...roadEntities,
        ...sandEntities,
        ...treeEntities,
        ...trafficEntities
    ];
}


function createSystems(isMobile: boolean): System[] {
    //For mobile devices we switch to Demo mode since there aren't mobile controls (yet?)
    const playerSystems = isMobile ? [new DemoSystem()] : [new InputSystem(), new ScoreSystem()];
    const renderSystem = new ThreeRenderSystem();
    const driveSystem = new DriveSystem();
    const terrainSystem = new TerrainSystem();
    const collisionSystem = new CollisionSystem();
    const respawnSystem = new RespawnSystem();
    const trafficSystem = new TrafficSystem(TRAFFIC_WIDTH);
    const shadowSystem = new ShadowSystem();

    return [
        ...playerSystems,
        renderSystem,
        driveSystem,
        terrainSystem,
        collisionSystem,
        respawnSystem,
        trafficSystem,
        shadowSystem
    ];
}

const MAX_MOBILE_WIDTH = 1000;

function main() {
    const gameScene = new Scene();
    gameScene.addEntities(...createEntities());
    gameScene.addSystems(...createSystems(window.innerWidth <= MAX_MOBILE_WIDTH));

    const animate = () => {
        gameScene.update();
        requestAnimationFrame(animate);
    }
    animate();
};

main();