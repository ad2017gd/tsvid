import { ElementTiming, ElementTimingFrame } from "./elements";
import { Renderer } from "./renderers/renderer";
import { TrackManager } from "./trackmanager";

export class Editor {
    public trackManager: TrackManager;
    public fps : number = 30;
    public renderer? : Renderer;
    public width : number = 1920;
    public height : number = 1080;

    constructor() {
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

    public render(outfile: string) : void {
        if(!this.renderer) {
            throw "No Renderer assigned to Editor.";
        }
        this.renderer.render(this, outfile);
    }
}