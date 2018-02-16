# Extending the controllers

You can extends the default bar by providing your own bar component. I suggest to copy the default component in order to have an example.

For that please clone this repository, and run `npm run build`, this will generate the `build` folder with the typescript compiled code.

- `BottomControlsBar` is the bar of the bottom of the screen, with timers and timeline.
- `MiddleControlsBar` is the bar of the middle of the screen, with video controls buttons.

## Custom components injected props
Both components receive the following props after the props you provided using what we described in the [Personnalize default commands bar](./personnalize-default-cmd-bar.md) chapter.

- **currentTime** - The current time of the video, in seconds.
- **totalTime** - The video total duration, in seconds.
- **isPaused** - A boolean indicating if the video is currently paused.
- **setPlaying** -  A function that will make the video playing.
- **setPaused** - A function that will pause the video
- **setPosition** - A function taking a number representing the seconds as argument of which you want to place the video cursor.