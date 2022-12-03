import { Editor } from "../editor";
import { TextVideoElement } from "../elements";
import { Rectangle } from "../geometry";

export abstract class Renderer {
    public abstract render(editor : Editor, outfile : string) : void;
    public abstract fetchTextSize(textElement : TextVideoElement) : Rectangle;
}