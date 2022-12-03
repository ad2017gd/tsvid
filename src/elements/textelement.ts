import { Rectangle } from "../geometry";
import { ElementTiming, ElementTimingFrame } from "./element";
import { VideoElement, VideoElementProperties } from "./videoelement";

export class TextProperties extends VideoElementProperties {
    public text : string = "Example Text";
    public color : string = "#ffffff";
    public font : string = "Arial";
    public size : number = 32;
    constructor(properties? : Partial<TextProperties>) {
        super();
        properties?.text ? this.text = properties.text : 0;
        properties?.color ? this.color = properties.color: 0;
        properties?.font ? this.font = properties.font: 0;
        properties?.size ? this.size = properties.size: 0;
    }
}

export class TextVideoElement extends VideoElement {
    public get timing(): ElementTiming {
        return this._timing ?? new ElementTimingFrame({frameDuration:0, frameStart: 0});
    }
    public set timing(timing: ElementTiming) {
        this._timing = timing;
    }
    public properties: TextProperties = new TextProperties();
    public get rectangle(): Rectangle {
        return new Rectangle(this.transform.x, this.transform.y);
    }
}