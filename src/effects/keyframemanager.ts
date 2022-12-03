import { Effect, EffectProperties } from "./effect";
import { Keyframe } from "./keyframe";

export class KeyframeManager<Prop extends EffectProperties>  {
    public effect : Effect<Prop>;
    public _keyframes : Keyframe<Prop>[] = [];

    public get keyframes() : Keyframe<Prop>[] {
        return this._keyframes;
    }

    public add(keyframe : Keyframe<Prop>) {
        keyframe.manager = this;
        this._keyframes.push(keyframe);
    }

    public get<T extends Keyframe<Prop> = Keyframe<Prop>>(id : string) : T {
        return this._keyframes.find(x => x.id == id) as T;
    }

    constructor(effect : Effect<Prop>) {
        this.effect = effect;
    }
}