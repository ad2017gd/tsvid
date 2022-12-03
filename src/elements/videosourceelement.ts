import { Rectangle } from "../geometry";
import { ElementTiming, ElementTimingFrame } from "./element";
import { VideoElement, VideoElementProperties } from "./videoelement";

export class VideoSourceProperties extends VideoElementProperties {
    private _path : string = "";
    public get path() : string {
        return this._path;
    }
    public set path(val : string) {
        this._path = val;

    }
    constructor(properties? : Partial<VideoSourceProperties>) {
        super();
        properties?.path ? this.path = properties.path : 0;
    }
}

export class VideoSourceElement extends VideoElement {
    private _sourceVideoTiming : ElementTiming = new ElementTimingFrame({frameDuration:0,frameStart:0});

    public properties: VideoSourceProperties = new VideoSourceProperties();
    public get rectangle(): Rectangle {
        return this._rectangle;
    }

    public get timing(): ElementTiming {
        return this._timing ?? this._sourceVideoTiming;
    }
    public set timing(timing: ElementTiming) {
        this._timing = timing;
    }
}