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
        return this;
    }

    private lerp(a : number, b : number, f : number)
    {
        return a + f * (b - a);
    }

    private findKeyframeForFrame(frame : number) : Keyframe<Prop> {
        let keyframe : Keyframe<Prop> | null = null;
        for(let kf of this._keyframes) {
            if(kf.timing.frameStart <= frame && ((kf.next == null || kf.next == undefined) || kf.next.timing.frameStart > frame)) {
                keyframe = kf;
                break;
            }
        }
        if(keyframe == null) {
            keyframe = this._keyframes[this._keyframes.length-1];
        }
        return keyframe;
    }

    public interpolateProperties(frame : number) : Prop {
        let finalProps = this.keyframes[0].properties;
        let keyFrameToInterpolate = this.findKeyframeForFrame(frame);
        let keyFrameToInterpolateTo = keyFrameToInterpolate.next;
        if(keyFrameToInterpolateTo == null) return keyFrameToInterpolate.properties;

        for(let prop in keyFrameToInterpolate.properties) {
            if(typeof keyFrameToInterpolate.properties[prop] == "number") {
                (finalProps[prop] as number) = this.lerp(keyFrameToInterpolate.properties[prop] as number, keyFrameToInterpolateTo.properties[prop] as number, 
                    (frame - keyFrameToInterpolate.timing.frameStart)/(keyFrameToInterpolateTo.timing.frameStart - keyFrameToInterpolate.timing.frameStart)); 
                
            }
        }

        return <Prop>finalProps;
    }

    public get<T extends Keyframe<Prop> = Keyframe<Prop>>(id : string) : T {
        return this._keyframes.find(x => x.id == id) as T;
    }

    constructor(effect : Effect<Prop>) {
        this.effect = effect;
    }
}