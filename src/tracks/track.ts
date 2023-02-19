import { randomBytes } from "crypto";
import { TrackManager } from "../trackmanager";
import { Element, ElementTiming, ElementTimingFrame, ElementTimingSecond } from "../elements/element";
import { ElementManager } from "../elementmanager";

export enum RelativeTrackIndex {
    Below = -1,
    Above = 0
}

export class AbsoluteTrackPlacement {
    public index : number = 0;
    constructor(absolutePlacement : AbsoluteTrackPlacement) {
        this.index = absolutePlacement.index;
    }
}
export class RelativeTrackPlacement {
    public relative?: Track;
    public relativeIndex : number | RelativeTrackIndex = 0;

    constructor(relativePlacement : RelativeTrackPlacement) {
        this.relative = relativePlacement.relative;
        this.relativeIndex = relativePlacement.relativeIndex;
    }
}


export abstract class Track {
    private _id : string;
    public manager? : TrackManager;
    public elementManager : ElementManager;

    public get id() { return this._id; };

    private _duration : ElementTiming = new ElementTimingFrame({frameDuration:1});
    public get duration() : ElementTiming {
        let longest = new ElementTimingFrame({frameStart : 0, frameDuration: 0});
        for(let element of this.elementManager.elements) {
            if(element.timing && (element.timing.frameStart + element.timing.frameDuration) > (longest.frameStart + longest.frameDuration))
                longest = new ElementTimingFrame(element.timing);
        }
        return ((this._duration.frameStart + this._duration.frameDuration) > (longest.frameStart + longest.frameDuration)) ?
        this._duration : longest;
    }
    public set duration(timing : ElementTiming) {
        this._duration = timing;
    }

    public abstract get above() : Track | null;
    public abstract get below() : Track | null;

    public move(placement: AbsoluteTrackPlacement | RelativeTrackPlacement): void {
        this.manager?.move(this, placement);
    }

    constructor(id? : string) {
        this.elementManager = new ElementManager(this);
        this._id = id ?? randomBytes(5).toString('hex');
    }
}