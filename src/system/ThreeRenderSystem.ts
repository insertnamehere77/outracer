import System from './System';
import { CameraComponent, PlaneRenderComponent } from '../component';
import { ComponentManager } from '../scene';

import * as THREE from 'three';


const VIEW_HEIGHT = 400;
const VIEW_WIDTH = 600;

class ThreeRenderSystem implements System {
    scene: THREE.Scene;
    renderer: THREE.Renderer;

    planeRenderComponents: Map<number, PlaneRenderComponent> | undefined;
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
    }

    registerComponents(componentManager: ComponentManager) {
        this.planeRenderComponents =
            componentManager.getComponents(PlaneRenderComponent);

        for (const [_id, component] of this.planeRenderComponents) {
            this.scene.add(component.mesh);
        }

        //TODO: This should only ever have one camera
        const cameraComponents = componentManager.getComponents(CameraComponent);
        for (const [_id, component] of cameraComponents) {
            this.cameraComponent = component;
        }
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