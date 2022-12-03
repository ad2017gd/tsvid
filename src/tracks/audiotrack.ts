import { Element } from "../elements";
import { Track } from "./track";


export class AudioTrack extends Track {
    public get above(): AudioTrack | null {
        return this.manager?.getTrackAbove(this) as AudioTrack;
    }
    public get below(): AudioTrack | null {
        return this.manager?.getTrackBelow(this) as AudioTrack;
    }
}