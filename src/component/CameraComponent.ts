import * as THREE from 'three';
import Component from "./Component";


const VIEW_HEIGHT = 400;
const VIEW_WIDTH = 600;
class CameraComponent extends Component {
    camera: THREE.Camera;

    constructor(id: number) {
        super(id);

        this.camera =
            new THREE.PerspectiveCamera(70, VIEW_WIDTH / VIEW_HEIGHT, 0.01, 10);
        this.camera.position.z = 1;
        this.camera.position.y = 1;

        this.camera.lookAt(0, 0, 0);
    }
}

export default CameraComponent;