import System from './System';
import { PlaneRenderComponent } from '../component';
import { ComponentManager } from '../scene';

import * as THREE from 'three';


const VIEW_HEIGHT = 400;
const VIEW_WIDTH = 600;

class ThreeRenderSystem implements System {
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.Renderer;

    planeRenderComponents: Map<number, PlaneRenderComponent> | undefined;

    constructor() {
        this.camera =
            new THREE.PerspectiveCamera(70, VIEW_WIDTH / VIEW_HEIGHT, 0.01, 10);
        this.camera.position.z = 1;
        this.camera.position.y = 1;

        this.camera.lookAt(0, 0, 0);
        this.scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0x404040);
        this.scene.add(light);


        const helper = new THREE.AxesHelper(1);
        this.scene.add(helper);

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
    }

    update(timeDelta: number) {
        this.renderer.render(this.scene, this.camera);
    }

};

export default ThreeRenderSystem;