import { randomBytes } from "crypto";
import { TransformEffect } from "../effects";
import { Element, ElementTiming, ElementTimingSecond } from "../elements";
import { Point, Rectangle } from '../geometry'

export abstract class VideoElementProperties {

}

export abstract class VideoElement extends Element {
    protected _rectangle : Rectangle | undefined;
    public abstract get rectangle() : Rectangle | undefined;
    public abstract properties : VideoElementProperties;
    private _transform : TransformEffect;
    public get transform() {return this._transform};
    public set transform(transform : TransformEffect) {transform.manager = this.effectManager; this._transform = transform; }

    constructor(rectangle? : Rectangle, id? : string) {
        super(id);
        this._transform = new TransformEffect();
        this._transform.manager = this.effectManager;
        this._rectangle = rectangle ?? new Rectangle(0,0,300,200);
    }
}