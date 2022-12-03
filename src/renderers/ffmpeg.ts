
import { Editor } from "../editor";
import { ElementTimingSecond, TextVideoElement, VideoElement } from "../elements";
import { Rectangle } from "../geometry";
import { VideoTrack } from "../tracks";
import { Renderer } from "./renderer";
import fonts from 'node-system-fonts'
import fffmpeg from 'fluent-ffmpeg';
import path from 'path'
import { Effect, EffectProperties } from "../effects";

export class RendererFFMPEG extends Renderer {
    public ffmpegBinary : string = "ffmpeg";
    
    public render(editor: Editor, outfile : string) : void {
        let videoTracks : string[] = [];
        for(let vTrack in editor.trackManager._video) {
            let trackName = `.vtrack${vTrack}.${outfile}`;
            videoTracks.push(trackName);
            this.renderVideoTrack(editor, editor.trackManager._video[vTrack], trackName);
        }
        console.log(videoTracks)
    }
    
    private renderVideoTrack(editor: Editor, track : VideoTrack, outfile : string) : fffmpeg.FilterSpecification[] {
        let filters : fffmpeg.FilterSpecification[] = [];
        let count = 0;
        for(let velement of track.elementManager._video) {
            filters.push(this.renderVideoElement(editor, velement, count));
            count++;
        }
        console.log(filters)
        let ffmpeg = fffmpeg()
        .fps(editor.fps)
        .addOption(`-t ${(new ElementTimingSecond(track.duration)).secondDuration.toFixed(4)}`)
        .addInput(`color=c=black:s=${editor.width}x${editor.height}`)
        .inputFormat("lavfi")
        .output(outfile)
        .complexFilter(filters)
        .map(`jsv${count}`)
    

        console.log(ffmpeg._getArguments());

        ffmpeg.run();
        
        return filters;
    }

    private renderVideoElement(editor: Editor, element : VideoElement, count : number) : fffmpeg.FilterSpecification {
        if(element instanceof TextVideoElement) {
            return {
                filter: "drawtext",
                inputs: count == 0 ? "0:v" : `jsv${count}`,
                outputs: `jsv${count+1}`,
                options: {
                    "x": this.effectToFilter(element.transform, "x"),
                    "y": this.effectToFilter(element.transform, "y"),
                    "text": this.ffmpegEscape(element.properties.text),
                    "fontfile": fonts.findFontSync({family:element.properties.font}).path.split(path.sep).join(path.posix.sep),
                    "fontsize": `${element.properties.size} * (${this.effectToFilter(element.transform, "scale")})`,
                    "alpha": this.effectToFilter(element.transform, "opacity"),
                    "fontcolor": element.properties.color,
                    "enable": `between(n, ${element.timing.frameStart}, ${element.timing.frameStart + element.timing.frameDuration})`
                }
            }
        }
        throw `Failed to render element ${element} using the ${this} renderer!`;
    }

    public fetchTextSize(textElement: TextVideoElement): Rectangle {
        let font = fonts.findFontSync({family: textElement.properties.font});
        return new Rectangle();
    }
    
    private effectToFilter(effect : Effect<EffectProperties>, keyframeProp : string) {
        return effect.keyframeManager.keyframes.slice(0,-1).map((x,i)=>
        {
            let kp = `((n - ${x.timing.frameStart})/${effect.keyframeManager.keyframes[i+1].timing.frameStart - x.timing.frameStart})`;
            let ki = `(lerp(${(x.properties as any)[keyframeProp]}, ${(effect.keyframeManager.keyframes[i+1].properties as any)[keyframeProp]}, ${kp}))`;
            return `if(lte(1,${kp}), `
        }
        ).join("") + `${(effect.keyframeManager.keyframes.slice(-1)[0].properties as any)[keyframeProp]}` +
        effect.keyframeManager.keyframes.slice(0,-1).map((x,i)=>
        {
            let kp = `((n - ${x.timing.frameStart})/${effect.keyframeManager.keyframes[i+1].timing.frameStart - x.timing.frameStart})`;
            let ki = `(lerp(${(x.properties as any)[keyframeProp]}, ${(effect.keyframeManager.keyframes[i+1].properties as any)[keyframeProp]}, ${kp}))`;
            return `, ${ki})`
        }
        ).reverse().join("")
        }

    private ffmpegEscape(str : string) : string {
        return str.replace(/[\[\]\,\:\']/g, "\\$&");
    }
}