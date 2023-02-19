import { VideoElement, AudioElement, Element } from "./elements";
import { Track } from "./tracks";

export class ElementManager {
    public track : Track;
    public _video : VideoElement[];
    public _audio : AudioElement[];

    public get elements() : Element[] {
        return (this._video as Element[]).concat(this._audio as Element[]);
    }

    public add(element : Element) {
        let collection = element instanceof VideoElement ? this._video : this._audio;
        element.elementManager = this;
        collection.push(element);
        return this;
    }

    public get<T extends Element = Element>(id : string) : T {
        return this.elements.find(x => x.id == id) as T;
    }

    constructor(track : Track) {
        this._video = [];
        this._audio = [];
        this.track = track;
    }
}