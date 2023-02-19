import { VideoElement, AudioElement, Element } from "./elements";
import { Effect, EffectProperties, VideoEffect, VideoEffectProperties } from "./effects";
import { AudioEffect, AudioEffectProperties } from "./effects/audioeffect";

export class EffectManager {
    public element : Element;
    public _video : VideoEffect<VideoEffectProperties>[];
    public _audio : AudioEffect<AudioEffectProperties>[];

    public get effects() : Effect<EffectProperties>[] {
        return (this._video as Effect<EffectProperties>[]).concat(this._audio as Effect<EffectProperties>[]);
    }

    public add(effect : Effect<EffectProperties>) {
        let collection = effect instanceof VideoEffect ? this._video : this._audio;
        if(collection.some(x=>typeof x == typeof effect ))
        effect.manager = this;
        collection.push(effect);
        return this;
    }

    public get<T extends Effect<EffectProperties> = Effect<EffectProperties>>(id : string) : T {
        return this.effects.find(x => x.id == id) as T;
    }

    constructor(element : Element) {
        this._video = [];
        this._audio = [];
        this.element = element;
    }
}