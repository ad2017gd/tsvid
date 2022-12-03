import { randomBytes } from "crypto";
import { EffectManager } from "../effectmanager";
import { ElementManager } from "../elementmanager";

export abstract class ElementTiming {
    public abstract get frameStart(): number;
    public abstract get frameDuration(): number;

    public abstract set frameStart(val : number);
    public abstract set frameDuration(val : number);

    public element? : Element;

    protected get fps() : number {
        return this.element?.elementManager?.track.manager?.editor.fps ?? 30;
    }

}

export class ElementTimingFrame extends ElementTiming {
    private _frameStart : number = 0;
    private _frameDuration : number = 0;

    public get frameStart(): number {
        return this._frameStart;
    }
    public set frameStart(val: number) {
        this._frameStart = val;
    }
    public get frameDuration(): number {
        return this._frameDuration;
    }
    public set frameDuration(val: number) {
        this._frameDuration = val;
    }
    constructor(timing : Omit<Partial<ElementTiming>, "element">) {
        super();
        this.frameDuration = timing.frameDuration ?? 0;
        this.frameStart = timing.frameStart ?? 0;
    }
}

export class ElementTimingSecond extends ElementTiming {
    public secondStart : number = 0;
    public secondDuration : number = 0;

    public get frameStart(): number {
        return this.secondStart * this.fps;
    }
    public set frameStart(val: number) {
        this.secondStart = val / this.fps;
    }
    public get frameDuration(): number {
        return this.secondDuration * this.fps;
    }
    public set frameDuration(val: number) {
        this.secondDuration = val / this.fps;
    }
    constructor(timing : Omit<Partial<ElementTimingSecond>, "element">) {
        super();
        this.frameDuration = timing.frameDuration ?? 0;
        this.frameStart = timing.frameStart ?? 0;
        timing.secondDuration ? this.secondDuration = timing.secondDuration : 0;
        timing.secondStart ? this.secondStart = timing.secondStart : 0;
    }
}

export class ElementTimingMillisecond extends ElementTiming {
    public millisecondStart : number = 0;
    public millisecondDuration : number = 0;

    public get frameStart(): number {
        return (this.millisecondStart / 1000) * this.fps;
    }
    public set frameStart(val: number) {
        this.millisecondStart = (val / this.fps) * 1000;
    }
    public get frameDuration(): number {
        return (this.millisecondDuration / 1000) * this.fps;
    }
    public set frameDuration(val: number) {
        this.millisecondDuration = (val / this.fps) * 1000;
    }
    constructor(timing : Omit<Partial<ElementTimingMillisecond>, "element">) {
        super();
        this.frameDuration = timing.frameDuration ?? 0;
        this.frameStart = timing.frameStart ?? 0;
        timing.millisecondDuration ? this.millisecondDuration = timing.millisecondDuration : 0;
        timing.millisecondStart ? this.millisecondStart = timing.millisecondStart : 0;
    }
}

export class ElementTimingMinute extends ElementTiming {
    public minuteStart : number = 0;
    public minuteDuration : number = 0;

    public get frameStart(): number {
        return this.minuteStart * 60 * this.fps;
    }
    public set frameStart(val: number) {
        this.minuteStart = (val / this.fps) / 60;
    }
    public get frameDuration(): number {
        return this.minuteDuration * 60 * this.fps;
    }
    public set frameDuration(val: number) {
        this.minuteDuration = (val / this.fps) / 60;
    }
    constructor(timing : Omit<Partial<ElementTimingMinute>, "element">) {
        super();
        this.frameDuration = timing.frameDuration ?? 0;
        this.frameStart = timing.frameStart ?? 0;
        timing.minuteDuration ? this.minuteDuration = timing.minuteDuration : 0;
        timing.minuteStart ? this.minuteStart = timing.minuteStart : 0;
    }
}


export abstract class Element {
    protected _id : string;
    public elementManager? : ElementManager;
    public effectManager : EffectManager;
    protected _timing? : ElementTiming;

    public abstract get timing() : ElementTiming;
    public abstract set timing(timing : ElementTiming);

    public get id() { return this._id; };
    constructor(id? : string) {
        this._id = id ?? randomBytes(5).toString('hex');
        this.effectManager = new EffectManager(this);
    }
}