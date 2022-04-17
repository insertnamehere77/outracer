import System from './System';
import { CameraComponent, PlaneRenderComponent, ShadowComponent } from '../component';
import { ComponentManager } from '../scene';

import * as THREE from 'three';


const VIEW_HEIGHT = 400;
const VIEW_WIDTH = 600;

class ThreeRenderSystem implements System {
    scene: THREE.Scene;
    renderer: THREE.Renderer;

    planeRenderComponents: Map<number, PlaneRenderComponent> | undefined;
    shadowComponents: Map<number, ShadowComponent>;
    cameraComponent: CameraComponent | undefined;


    constructor() {
        this.scene = new THREE.Scene();

        const skyPath = "./sky.png";
        const skyCube = new THREE.CubeTextureLoader().load([
            skyPath,
            skyPath,
            skyPath,
            skyPath,
            skyPath,
            skyPath,
        ]);


        skyCube.magFilter = THREE.NearestFilter;
        skyCube.minFilter = THREE.NearestFilter;

        this.scene.background = skyCube;

        const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        this.renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);

        this.shadowComponents = new Map();
    }

    registerComponents(componentManager: ComponentManager) {
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.planeRenderComponents.forEach(plane => this.scene.add(plane.mesh));

        this.shadowComponents = componentManager.getComponents(ShadowComponent);
        this.shadowComponents.forEach(shadow => this.scene.add(shadow.mesh));

        this.cameraComponent = componentManager.getComponent(CameraComponent);
    }

    update(timeDelta: number) {
        if (!this.planeRenderComponents || !this.cameraComponent) {
            console.warn('Render system didnt register its components');
            return;
        }
        this.renderer.render(this.scene, this.cameraComponent.camera);
    }

    getUpdatePriority(): number {
        //We always want to render after everything else updates
        return Number.NEGATIVE_INFINITY;
    }

};

export default ThreeRenderSystem;