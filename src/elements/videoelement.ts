import { randomBytes } from "crypto";
import { TransformEffect } from "../effects";
import { Element, ElementTiming, ElementTimingSecond } from "../elements";
import { Point, Rectangle } from '../geometry'

export abstract class VideoElementProperties {

}

export abstract class VideoElement extends Element {
    protected _rectangle : Rectangle;
    public abstract get rectangle() : Rectangle;
    public abstract properties : VideoElementProperties;
    public transform : TransformEffect;

    constructor(rectangle? : Rectangle, id? : string) {
        super(id);
        this.transform = new TransformEffect();
        this.transform.manager = this.effectManager;
        this._rectangle = rectangle ?? new Rectangle(0,0,300,200);
    }
}