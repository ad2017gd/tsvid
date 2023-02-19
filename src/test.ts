import * as vidjs from './index';
import fonts from 'node-system-fonts'
import { CanvasRenderer, CanvasRendererOptions } from './renderers/canvas';
import { randomBytes } from 'crypto';
process.env.UV_THREADPOOL_SIZE='64'

const editor = new vidjs.Editor();
editor.fps = 30;
editor.width = 1920;
editor.height = 1080;

const videoTrack = new vidjs.VideoTrack();
const textTrack = new vidjs.VideoTrack();
editor.trackManager.add(videoTrack);
editor.trackManager.add(textTrack);

const text = new vidjs.TextVideoElement();
text.timing = new vidjs.ElementTimingSecond({
    secondDuration: 5
})
text.properties = new vidjs.TextProperties({
    color: "#ff0000",
    text: () => `${randomBytes(8).toString('hex')}`,
    font: "Comic Sans MS"
})


text.transform = new vidjs.TransformEffect({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
})
text.transform.keyframeManager
.add(
    new vidjs.Keyframe(vidjs.TransformEffectProperties, {
        properties: new vidjs.TransformEffectProperties({
            x: 1920,
            y: 50,
            scale: 1
        }),
        timing: new vidjs.ElementTimingSecond({
            secondStart: 1
        })
    })
)
.add(
    new vidjs.Keyframe(vidjs.TransformEffectProperties, {
        properties: new vidjs.TransformEffectProperties({
            x: 1000,
            y: 500,
            scale: 1
        }),
        timing: new vidjs.ElementTimingSecond({
            secondStart: 3
        })
    })
)

console.dir(text.transform.keyframeManager._keyframes)


const videoSource = new vidjs.VideoSourceElement();
videoSource.properties.path = "caca.mp4"
videoSource.transform.x = () => Math.random() * 30;
videoSource.transform.y = 0;

videoTrack.elementManager.add(videoSource);
textTrack.elementManager.add(text);
videoSource.timing = new vidjs.ElementTimingSecond({secondDuration: 5});

editor
.createRenderer(CanvasRenderer)
.render({outfile:"test.mp4"});