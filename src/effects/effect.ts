import { first } from "cheerio/lib/api/traversing";
import { randomBytes } from "crypto";
import { EffectManager } from "../effectmanager";
import { Keyframe } from "./keyframe";
import { KeyframeManager } from "./keyframemanager";

export abstract class EffectProperties {
    *[Symbol.iterator](): Iterator<any> {
        for (let val of Object.values(this)) {
            yield val;
        }
    }
}

export abstract class Effect<Prop extends EffectProperties> {
    public keyframeManager : KeyframeManager<Prop>;
    private _id : string;
    public get id() { return this._id; };

    public manager? : EffectManager;

    constructor(id? : string) {
        this._id = id ?? randomBytes(5).toString('hex');
        this.keyframeManager = new KeyframeManager<Prop>(this);
    }
}