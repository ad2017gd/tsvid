import * as vidjs from './index';
import fonts from 'node-system-fonts'


const editor = new vidjs.Editor();
editor.fps = 30;


const videoTrack = new vidjs.VideoTrack();
editor.trackManager.add(videoTrack);


const text = new vidjs.TextVideoElement();
text.timing = new vidjs.ElementTimingSecond({
    secondDuration: 5
})
text.properties = new vidjs.TextProperties({
    color: "#ff0000",
    text: "Pulos::''\\',.",
    font: "Comic Sans MS"
})
text.transform = new vidjs.TransformEffect({
    x: 0,
    y: 100,
    opacity: 0.5,
    scale: 2,
})
text.transform.keyframeManager.add(
    new vidjs.Keyframe(vidjs.TransformEffectProperties, {
        properties: new vidjs.TransformEffectProperties({
            x: 1920,
            y: 50,
            scale: 1
        }),
        timing: new vidjs.ElementTimingFrame({
            frameStart: 50
        })
    })
)

text.transform.keyframeManager.add(
    new vidjs.Keyframe(vidjs.TransformEffectProperties, {
        properties: new vidjs.TransformEffectProperties({
            x: 1000,
            y: 500,
            scale: 1
        }),
        timing: new vidjs.ElementTimingFrame({
            frameStart: 80
        })
    })
)



videoTrack.elementManager.add(text);
videoTrack.duration = new vidjs.ElementTimingSecond({secondDuration: 10});

editor.renderer = new vidjs.RendererFFMPEG();
editor.render("test.mp4");