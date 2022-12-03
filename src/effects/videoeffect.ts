import { Effect, EffectProperties } from "../effects";
import { Keyframe } from "./keyframe"

export abstract class VideoEffectProperties extends EffectProperties {

}

export abstract class VideoEffect<Prop extends VideoEffectProperties> extends Effect<Prop>  {
}