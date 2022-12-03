import { Track } from "./track";
import { VideoElement, Element } from "../elements";

export class VideoTrack extends Track {
    public get above(): VideoTrack | null {
        return this.manager?.getTrackAbove(this) as VideoTrack;
    }
    public get below(): VideoTrack | null {
        return this.manager?.getTrackBelow(this) as VideoTrack;
    }
}