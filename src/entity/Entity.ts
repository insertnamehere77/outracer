import { Component } from "../component";

function* generateId(): Generator<number, number, number> {
    let val = 0;
    while (true) {
        yield val++;
    }
}

class Entity {
    id: number;
    private static idGenerator = generateId();

    constructor() {
        this.id = Entity.idGenerator.next().value;
    }

    getComponents(): Component[] {
        const fields = Object.values(this);
        const components = fields.filter((field: any) => field instanceof Component) as Component[];
        return components;
    }
};

export default Entity;