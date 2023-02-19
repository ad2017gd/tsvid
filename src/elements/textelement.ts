import { Rectangle } from "../geometry";
import { Dynamic, Dynamify, ElementTiming, ElementTimingFrame } from "./element";
import { VideoElement, VideoElementProperties } from "./videoelement";


export class TextProperties extends VideoElementProperties {
    
    // text
    protected _text : Dynamic<string> = "Example Text";
    public set text(val: Dynamic<string>) {
        this._text = val;
    }
    public get text() : string {
        return this._text instanceof Function ? this._text() : this._text;
    }

    // color
    protected _color : Dynamic<string> = "#000000";
    public set color(val: Dynamic<string>) {
        this._color = val;
    }
    public get color() : string {
        return this._color instanceof Function ? this._color() : this._color;
    }

    // font
    protected _font : Dynamic<string> = "Helvetica";
    public set font(val: Dynamic<string>) {
        this._font = val;
    }
    public get font() : string {
        return this._font instanceof Function ? this._font() : this._font;
    }


    protected _size : Dynamic<number> = 32;
    public set size(val: Dynamic<number>) {
        this._size = val;
    }
    public get size() : number {
        return this._size instanceof Function ? this._size() : this._size;
    }


    constructor(properties? : Partial<Dynamify<TextProperties>>) {
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