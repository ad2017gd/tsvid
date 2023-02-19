import { Editor } from "../editor";
import { TextVideoElement, VideoElement, VideoSourceElement } from "../elements";
import { Rectangle } from "../geometry";
import { Renderer, RendererOptions } from "./renderer";
import fs from "fs";
import canvas, { Canvas, registerFont } from 'canvas'
import { Logger } from "../logger";
import { randomBytes } from "crypto";
import Semaphore from 'ts-semaphore'
import * as StreamPromises from "stream/promises";
import { PassThrough, Stream } from "stream";
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from "child_process";
import fffmpeg from 'fluent-ffmpeg';
import path from "path";
import fonts from 'node-system-fonts'

export interface CanvasRendererOptions extends RendererOptions {
    maxParallel : number
    maxParallelFilesystem : number
}

const rootOutput = "tsvid_canvasffmpeg";

export class CanvasRenderer extends Renderer {
    private logger : Logger = new Logger("CanvasRenderer");
    private outfolder : string = "";
    private canvas! : canvas.Canvas;
    private frames! : number;
    private ffmpeg! : fffmpeg.FfmpegCommand;
    private passthru! : PassThrough;

    constructor(editor:Editor) {
        super(editor);
    }

    public async render(options : Partial<CanvasRendererOptions>) {
        
        this.canvas = new Canvas(this.editor.width, this.editor.height);
        this.frames = this.editor.duration.frameDuration;

        this.logger.print(`Started rendering for file "${options.outfile}"`);

        if(!fs.existsSync(rootOutput)) await fs.promises.mkdir(rootOutput);

        this.outfolder = `${this.editor.id}_${Math.floor(Date.now()/1000)}`;
        await fs.promises.mkdir(`${rootOutput}/${this.outfolder}`);
        await fs.promises.mkdir(`${rootOutput}/${this.outfolder}/render`);

        this.logger.print(`Extracting frames from all source videos to folder "${this.outfolder}"`);
        await this.extractAllFrames();
        this.passthru = new PassThrough();
        this.passthru.setMaxListeners(Infinity);
        this.logger.print(`Rendering frames...`);
        this.ffmpeg = fffmpeg()
        .addInput(this.passthru)
        .inputFormat("image2pipe")
        .inputFPS(this.editor.fps)
        .outputFPS(this.editor.fps)
        .addOutput(`${rootOutput}/${this.outfolder}/render/rendered${path.extname(options.outfile ?? "Untitled.mp4")}`)
        .on('stderr', (e) => this.logger.print(e))
        this.ffmpeg.run();   
        await this.renderAllFrames();
        this.passthru.end()
        this.logger.print(`\n\nOK!`);

        //await fs.promises.rm(`${rootOutput}/${this.outfolder}`, {recursive:true});
    }

    private async extractAllFrames() : Promise<void> {
        for(let track of this.editor.trackManager.tracks) {
            for(let element of track.elementManager.elements) {
                if(element instanceof VideoSourceElement) {
                    await fs.promises.mkdir(`${rootOutput}/${this.outfolder}/${element.id}_frames`);
                    this.logger.print(`Extracting frames from "${(element as VideoSourceElement).properties.path}"`);
                    await new Promise((res, rej)=>{
                        let ffmpeg = fffmpeg()
                        .input((element as VideoSourceElement).properties.path)
                        .FPSOutput(this.editor.fps)
                        .output(`${rootOutput}/${this.outfolder}/${element.id}_frames/frame%05d.png`)
                        .on('end', () => res(null))
                        .on('error', (err) => rej(err));
                        this.logger.print(ffmpeg._getArguments().join(" "))
                        ffmpeg.run()
                    })
                    this.logger.print(`Done extracting frames from "${(element as VideoSourceElement).properties.path}"`);
                }
            }
        }
    }

    private async renderAllFrames() {
        for(let frame = 0; frame < this.frames; frame++) {
            await this.renderFrame(frame);
        }
    }

    private async renderFrame(frame : number) {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,this.canvas.width, this.canvas.height);


        for(let track of this.editor.trackManager.tracks.reverse()) {
            for(let element of track.elementManager._video) {
                await this.renderVideoElementFrame(element, ctx, frame);
            }
        }


        this.passthru.write(this.canvas.toBuffer('image/jpeg'))
        this.logger.printnl(`Rendered frame ${frame.toString().padStart(this.frames.toString().length, "0")}/${this.frames} (${Math.floor(frame/this.frames * 100)}%)\r`);
    }

    /**
     * @todo KEYFRAMES!!! KEYFRAMES!!!
     */
    private async renderVideoElementFrame(element: VideoElement, ctx : canvas.CanvasRenderingContext2D, frame: number) {
        ctx.save();

        let transform = element.transform.keyframeManager.interpolateProperties(frame);

        ctx.scale(transform.scale, transform.scale);
        ctx.rotate(transform.rotate);
        if(element instanceof TextVideoElement) {
            ctx.fillStyle = element.properties.color;
            ctx.strokeStyle = element.properties.color;

            ctx.font = `${element.properties.size}px "${element.properties.font}"`;
            ctx.fillText(element.properties.text, transform.x, transform.y + element.properties.size);
        }
        if(element instanceof VideoSourceElement) {
            ctx.drawImage(
                await canvas.loadImage(`${rootOutput}/${this.outfolder}/${element.id}_frames/frame${(frame+1).toString().padStart(5,"0")}.png`), 
                transform.x,
                transform.y
            );
        }
        ctx.restore();
    }

    public fetchTextSize(textElement : TextVideoElement) : Rectangle {
        return new Rectangle();
    }
}