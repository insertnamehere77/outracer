import Component from "./Component";

class GroundComponent extends Component {
    public static componentType: string = "GroundComponent";

    layer: number;
    width: number;
    height: number;
    constructor(id: number, layer: number, width: number, height: number = width) {
        super(id);
        this.layer = layer;
        this.width = width;
        this.height = (height || width);
    }
}

export default GroundComponent;