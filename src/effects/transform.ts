import { Keyframe } from "./keyframe";
import { VideoEffect, VideoEffectProperties } from "./videoeffect"

export class TransformEffectProperties extends VideoEffectProperties {
    public x : number = 0;
    public y : number = 0;
    public opacity : number = 1;
    public scale : number = 1;
    constructor(props? : Partial<TransformEffectProperties>) {
        super();
        props?.x ? this.x = props.x : 0;
        props?.y ? this.y = props.y : 0;
        props?.opacity ? this.opacity = props.opacity : 0;
        props?.scale ? this.scale = props.scale : 0;
    }
}

export class TransformEffect extends VideoEffect<TransformEffectProperties> implements TransformEffectProperties {

    public get x() : number {
        return this.keyframeManager.keyframes[0].properties.x;
    }
    public get y() : number {
        return this.keyframeManager.keyframes[0].properties.y;
    }
    public get opacity() : number {
        return this.keyframeManager.keyframes[0].properties.opacity;
    }
    public get scale() : number {
        return this.keyframeManager.keyframes[0].properties.scale;
    }

    public set x(val: number) {
        this.keyframeManager.keyframes[0].properties.x = val;
    }
    public set y(val: number) {
        this.keyframeManager.keyframes[0].properties.y = val;
    }
    public set opacity(val: number) {
        this.keyframeManager.keyframes[0].properties.opacity = val;
    }
    public set scale(val: number) {
        this.keyframeManager.keyframes[0].properties.scale = val;
    }


    constructor(firstKeyframeProps? : Partial<TransformEffectProperties>, id? : string) {
        super(id);
        let keyframe = new Keyframe(TransformEffectProperties);

        if(firstKeyframeProps) {
            firstKeyframeProps.opacity ? keyframe.properties.opacity = firstKeyframeProps.opacity : 0;
            firstKeyframeProps.scale ? keyframe.properties.scale = firstKeyframeProps.scale : 0;
            firstKeyframeProps.x ? keyframe.properties.x = firstKeyframeProps.x : 0;
            firstKeyframeProps.y ? keyframe.properties.y = firstKeyframeProps.y : 0;
        }
        this.keyframeManager.add(keyframe);
    }
}