import { PerspectiveCamera, Vector3 } from 'three';
import Component from "./Component";


const VIEW_HEIGHT = 480;
const VIEW_WIDTH = 640;
class CameraComponent extends Component {
    camera: THREE.Camera;
    static componentType: string = 'CameraComponent';
    constructor(id: number) {
        super(id);

        this.camera =
            new PerspectiveCamera(60, VIEW_WIDTH / VIEW_HEIGHT, 0.01, 40);
        this.camera.position.z = 1;
        this.camera.position.y = 0.75;

        this.camera.lookAt(0, 0.5, 0);
    }

    //This will only work for the "behind-the-back always moving forward" sprite scaling games
    //It should be sufficient (and efficient) for my usecase
    //But if anything more sophisticated is needed, this will need to be re-written
    canSee(pos: Vector3): boolean {
        return this.camera.position.z > pos.z;
    }

    setWorldZ(z: number) {
        this.camera.position.setZ(z);
    }

    setWorldX(x: number) {
        this.camera.position.setX(x);
    }
}

export default CameraComponent;