import Component from "./Component";

class GroundComponent extends Component {
    public static componentType: string = "GroundComponent";

    width: number;
    height: number;
    constructor(id: number, width: number, height?: number) {
        super(id);
        this.width = width;
        this.height = (height || width);
    }
}

export default GroundComponent;