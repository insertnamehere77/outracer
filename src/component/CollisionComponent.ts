import Component from "./Component";

class CollisionComponent extends Component {
    static componentType: string = "CollisionComponent";
    radius: number;
    collisions: Set<number>;
    constructor(id: number, radius: number) {
        super(id);
        this.radius = radius;
        this.collisions = new Set();
    }

    addCollision(id: number) {
        this.collisions.add(id);
    }

    clearCollisions() {
        this.collisions.clear();
    }

    hasCollided(): boolean {
        return this.collisions.size > 0;
    }
}

export default CollisionComponent;