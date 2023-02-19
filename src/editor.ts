import { randomBytes } from "crypto";
import { ElementTiming, ElementTimingFrame } from "./elements";
import { Renderer, RendererOptions } from "./renderers/renderer";
import { TrackManager } from "./trackmanager";



export class Editor {
    public trackManager: TrackManager;
    public fps : number = 30;
    public renderer? : Renderer;
    public width : number = 1920;
    public height : number = 1080;

    private _id : string;
    public get id() { return this._id; };

    constructor() {
        this._id = randomBytes(5).toString('hex');
        this.trackManager = new TrackManager(this);
    }

    public get duration() : ElementTiming {
        let longest = new ElementTimingFrame({frameStart : 0, frameDuration: 0});
        for(let track of this.trackManager.tracks) {
            if((track.duration.frameStart + track.duration.frameDuration) > (longest.frameStart + longest.frameDuration))
                longest = new ElementTimingFrame(track.duration);
        }
        return longest as ElementTiming;
    }

    public createRenderer<T extends Renderer>(type : { new(editor:Editor): T ;}) : Renderer {
        return this.renderer = new type(this);
    }
}