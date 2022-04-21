import System from './System';
import { CameraComponent, PlaneRenderComponent, ShadowComponent } from '../component';
import { ComponentManager } from '../scene';

import { Scene, CubeTextureLoader, NearestFilter, WebGLRenderer, Renderer } from 'three';


const VIEW_HEIGHT = 400;
const VIEW_WIDTH = 600;

class ThreeRenderSystem implements System {
    scene: Scene;
    renderer: Renderer;

    planeRenderComponents: Map<number, PlaneRenderComponent>;
    shadowComponents: Map<number, ShadowComponent>;
    cameraComponent: CameraComponent;


    constructor() {
        this.scene = new Scene();

        const skyPath = "./sky.png";
        const skyCube = new CubeTextureLoader().load([
            skyPath,
            skyPath,
            skyPath,
            skyPath,
            skyPath,
            skyPath,
        ]);
        skyCube.magFilter = NearestFilter;
        skyCube.minFilter = NearestFilter;

        this.scene.background = skyCube;

        const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
        this.renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
        this.renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);

        this.shadowComponents = new Map();
        this.planeRenderComponents = new Map();
        this.cameraComponent = new CameraComponent(-1);
    }

    registerComponents(componentManager: ComponentManager) {
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.planeRenderComponents.forEach(plane => this.scene.add(plane.mesh));

        this.shadowComponents = componentManager.getComponents(ShadowComponent);
        this.shadowComponents.forEach(shadow => this.scene.add(shadow.mesh));

        this.cameraComponent = componentManager.getComponent(CameraComponent);
    }

    update(timeDelta: number) {
        this.renderer.render(this.scene, this.cameraComponent.camera);
    }

    getUpdatePriority(): number {
        //We always want to render after everything else updates
        return Number.NEGATIVE_INFINITY;
    }

};

export default ThreeRenderSystem;