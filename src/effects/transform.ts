import { Dynamic, Dynamify } from "../elements";
import { Keyframe } from "./keyframe";
import { VideoEffect, VideoEffectProperties } from "./videoeffect"

export class TransformEffectProperties extends VideoEffectProperties {
    protected _x : Dynamic<number> = 0;
    public set x(val: Dynamic<number>) {
        this._x = val;
    }
    public get x() : number {
        return this._x instanceof Function ? this._x() : this._x;
    }

    protected _y : Dynamic<number> = 0;
    public set y(val: Dynamic<number>) {
        this._y = val;
    }
    public get y() : number {
        return this._y instanceof Function ? this._y() : this._y;
    }
   
    protected _opacity : Dynamic<number> = 1;
    public set opacity(val: Dynamic<number>) {
        this._opacity = val;
    }
    public get opacity() : number {
        return this._opacity instanceof Function ? this._opacity() : this._opacity;
    }

    protected _scale : Dynamic<number> = 1;
    public set scale(val: Dynamic<number>) {
        this._scale = val;
    }
    public get scale() : number {
        return this._scale instanceof Function ? this._scale() : this._scale;
    }

    protected _rotate : Dynamic<number> = 0;
    public set rotate(val: Dynamic<number>) {
        this._rotate = val;
    }
    public get rotate() : number {
        return this._rotate instanceof Function ? this._rotate() : this._rotate;
    }

    constructor(props? : Partial<TransformEffectProperties>) {
        super();
        props?.x ? this.x = props.x : 0;
        props?.y ? this.y = props.y : 0;
        props?.opacity ? this.opacity = props.opacity : 0;
        props?.scale ? this.scale = props.scale : 0;
    }
}

export class TransformEffect extends VideoEffect<TransformEffectProperties> {
    


    constructor(firstKeyframeProps? : Partial<Dynamify<TransformEffectProperties>>, id? : string) {
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
    

    public set x(val: Dynamic<number>) {
        this.keyframeManager.keyframes[0].properties.x = val;
    }
    public get x() : number {
        return this.keyframeManager.keyframes[0].properties.x;
    }

    public set y(val: Dynamic<number>) {
        this.keyframeManager.keyframes[0].properties.y = val;
    }
    public get y() : number {
        return this.keyframeManager.keyframes[0].properties.y;
    }

    public set opacity(val: Dynamic<number>) {
        this.keyframeManager.keyframes[0].properties.opacity = val;
    }
    public get opacity() : number {
        return this.keyframeManager.keyframes[0].properties.opacity;
    }

    public set scale(val: Dynamic<number>) {
        this.keyframeManager.keyframes[0].properties.scale = val;
    }
    public get scale() : number {
        return this.keyframeManager.keyframes[0].properties.scale;
    }

    public set rotate(val: Dynamic<number>) {
        this.keyframeManager.keyframes[0].properties.rotate = val;
    }
    public get rotate() : number {
        return this.keyframeManager.keyframes[0].properties.rotate;
    }
   
    
}