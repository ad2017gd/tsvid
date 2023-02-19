import { Editor } from "../editor";
import { TextVideoElement } from "../elements";
import { Rectangle } from "../geometry";

export interface RendererOptions {
    outfile : string;
}

export abstract class Renderer {
    public editor : Editor;
    public abstract render(options : Partial<RendererOptions>) : Promise<void> ;
    public abstract fetchTextSize(textElement : TextVideoElement) : Rectangle;
    constructor(editor: Editor) {
        this.editor = editor;
    }
}