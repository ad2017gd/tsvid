import { Editor } from "./editor";
import { VideoTrack, AudioTrack, Track, AbsoluteTrackPlacement, RelativeTrackPlacement } from "./tracks";


export class TrackManager {
    public editor : Editor;
    public _video : VideoTrack[];
    public _audio : AudioTrack[];

    public get tracks() : Track[] {
        return (this._video as Track[]).concat(this._audio as Track[]);
    }

    constructor(editor : Editor) {
        this._video = [];
        this._audio = [];
        this.editor = editor;
    }

    public add(track : Track, placement? : AbsoluteTrackPlacement | RelativeTrackPlacement) : void {
        track.manager = this;
        let collection = track instanceof VideoTrack ? this._video : this._audio;

        if(!placement) {
            placement = new AbsoluteTrackPlacement({index:0});
        }
        if(placement instanceof AbsoluteTrackPlacement) {
            collection.splice(placement.index, 0, track);
        } else {
            let relativeIndex =  this.getIndexOwn(placement.relative ?? track);
            if(relativeIndex == null) {
                throw "Relative track not found in TrackManager.";
            }
            let index = relativeIndex - (placement.relativeIndex);

            collection.splice(index, 0, track);
        }
    }

    public get<T extends Track = Track>(id : string) : T {
        return this.tracks.find(x => x.id == id) as T;
    }

    public getTrackBelow(track : Track) : Track | null {
        let index = this.getIndexOwn(track);
        let collection = track instanceof VideoTrack ? this._video : this._audio;

        if(index == null) {
            return null;
        }

        return collection[index + 1];
    }

    public getTrackAbove(track : Track) : Track | null {
        let index = this.getIndexOwn(track);
        let collection = track instanceof VideoTrack ? this._video : this._audio;

        if(index == null) {
            return null;
        }

        return collection[index - 1];
    }
    
    public move(track : Track, placement : RelativeTrackPlacement | AbsoluteTrackPlacement) {
        let index = this.getIndexOwn(track);
        let collection = track instanceof VideoTrack ? this._video : this._audio;

        if(index == null) {
            throw "Track does not belong to this TrackManager.";
        }

        if(placement instanceof RelativeTrackPlacement) {
            let relativeIndex = this.getIndexOwn(placement.relative ?? track);
            if(relativeIndex == null) {
                throw "Relative track not found in TrackManager.";
            }
            let targetIndex = relativeIndex - (placement.relativeIndex);
            
            index >= targetIndex
            ? collection.splice(targetIndex, 0, collection.splice(index, 1)[0]) 
            : collection.splice(targetIndex - 1, 0, collection.splice(index, 1)[0]);
        } else {
            index >= placement.index
            ? collection.splice(placement.index, 0, collection.splice(index, 1)[0]) 
            : collection.splice(placement.index - 1, 0, collection.splice(index, 1)[0]);
        }

    }

    public getIndexOwn(track : Track) : number | null {
        let collection = track instanceof VideoTrack ? this._video : this._audio;
        let index = collection.findIndex(x => x.id == track.id);
        return index == -1 ? null : index;
        
    }

    public remove(track : Track) : void {
        track.manager = undefined;
        if(track instanceof VideoTrack) {
            this._video = this._video.filter(x => x.id == track.id);
        } else {
            this._audio = this._audio.filter(x => x.id == track.id);
        }
        
    }
}