import { Effect, EffectProperties } from "../effects";
import { Keyframe } from "./keyframe"

export abstract class AudioEffectProperties extends EffectProperties {

}

export abstract class AudioEffect<Prop extends AudioEffectProperties> extends Effect<Prop> {
    
}