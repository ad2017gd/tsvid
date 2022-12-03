import { randomBytes } from "crypto";
import { ElementTiming, ElementTimingFrame } from "../elements";
import { EffectProperties } from "./effect";
import { KeyframeManager } from "./keyframemanager";

export class Keyframe<E extends EffectProperties> {
    private _id : string;
    public get id() { return this._id; };

    public timing! : ElementTiming;
    public properties! : E;
    public manager? : KeyframeManager<E>;
    

    constructor(type : { new(): E ;}, keyframeProps?: Omit<Partial<Keyframe<E>>, "id" | "_id" | "manager">, id? : string) {
        if(keyframeProps?.properties) {
            this.properties = keyframeProps.properties;
        } else {
            this.properties = new type();
        }
        if(keyframeProps?.timing) {
            this.timing = keyframeProps.timing;
        } else {
            this.timing = new ElementTimingFrame({frameDuration:0,frameStart:0});
        }
        this._id = id ?? randomBytes(5).toString('hex');
    }
}