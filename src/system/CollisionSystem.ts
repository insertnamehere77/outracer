import { Vector2, Vector3 } from "three";
import { CollisionComponent, PlaneRenderComponent } from "../component";
import { ComponentManager } from "../scene";
import System from "./System";

class CollisionSystem implements System {
    planeRenderComponents: Map<number, PlaneRenderComponent>;
    collisionComponents: Map<number, CollisionComponent>;

    constructor() {
        this.planeRenderComponents = new Map();
        this.collisionComponents = new Map();
    }

    registerComponents(componentManager: ComponentManager) {
        this.planeRenderComponents = componentManager.getComponents(PlaneRenderComponent);
        this.collisionComponents = componentManager.getComponents(CollisionComponent);
    }

    private getCollisonComponentsExcludingId(id: number) {
        return [...this.collisionComponents.values()].filter(collision => collision.id !== id);
    }

    //This is a naive solution with an O(n^2) runtime
    //For simple shape collisions of a few dozen objects I'm hoping it's sufficient, but might need some optimization
    update(timeDelta: number) {

        this.clearCollisions();
        this.collisionComponents.forEach(collision => {
            const render = this.planeRenderComponents.get(collision.id);
            if (!render) {
                return;
            }
            const position = render.getPosition();
            const otherCollisions = this.getCollisonComponentsExcludingId(collision.id);
            otherCollisions.forEach(otherCollision => {
                const otherRender = this.planeRenderComponents.get(otherCollision.id);
                if (!otherRender) {
                    return;
                }
                const otherPosition = otherRender.getPosition();

                const isColliding = this.componentsIntersect(position, collision.radius, otherPosition, otherCollision.radius);
                if (isColliding) {
                    collision.addCollision(otherCollision.id);
                    otherCollision.addCollision(collision.id);
                }
            })
        });
    }

    private clearCollisions() {
        this.collisionComponents.forEach(collision => collision.clearCollisions());
    }

    private convertVect3ToVect2(vect3D: Vector3): Vector2 {
        //Z value becomes the Y value for collision detection all objects basically have the same y value
        return new Vector2(vect3D.x, vect3D.z);
    }


    // For now it uses a 2d circle collision zone
    // This is mainly to better let the player have more "near misses" compared to a rectangular hit box
    private componentsIntersect(
        pos1: Vector3, radius1: number,
        pos2: Vector3, radius2: number): Boolean {

        const flatPos1 = this.convertVect3ToVect2(pos1);
        const flatPos2 = this.convertVect3ToVect2(pos2);
        const currDist = flatPos1.distanceTo(flatPos2);
        const maxDist = (radius1 / 2) + (radius2 / 2);
        return currDist <= maxDist;
    }

    getUpdatePriority() {
        return 1;
    }

}

export default CollisionSystem;