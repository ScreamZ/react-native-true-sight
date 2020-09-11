# Extending the controllers

You can extends the default bar by providing your own bar component. I suggest to copy the default component in order to have an example.

For that please clone this repository, and run `npm run build`, this will generate the `build` folder with the typescript compiled code.

- `DefaultBottomControlsBar` is the bar of the bottom of the screen, with timers and timeline.
- `DefaultMainControl` is the bar of the middle of the screen, with video controls buttons.

## Custom components injected props
Both components receive the following props, you can also provide your own if you extends them.

```ts
// Common interface
interface InjectedControlProps {
  playCursorTime: number;
  videoTotalTime: number;
  videoPaused: boolean;
  videoLoading: boolean;
  setPlaying(): void;
  setPaused(): void;
  setPosition(to: number): void;
}

interface MainControlProps extends InjectedControlProps {
  restartButton?: boolean;
}

interface BottomControlProps extends InjectedControlProps {
  barColor?: string;
  joyStickColor?: string;
  navigationDisabled?: boolean;
}
```