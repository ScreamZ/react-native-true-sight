import * as React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from "react-native";
import Video from "react-native-video";
import * as PropTypes from "prop-types";

import DefaultLoader from "./Loader";
import DefaultMiddleControlsBar from "./MiddleControlsBar";
import DefaultBottomControlsBar from "./BottomControlsBar";

const noop: () => void = () => {};

interface Props {
  source: string;
  autoStart: boolean;

  loader: React.ReactNode;
  middleControlsBar: React.ReactNode;
  middleControlsBarProps: any;
  bottomControlsBar: React.ReactNode;
  bottomControlsBarProps: any;

  onError(err: any): void;
  onProgress(
    meta: ProgressStatus
  ): { currentTime: number; playableDuration: number; totalDuration: number };
  onEnd(): void;
}

interface ProgressStatus {
  currentTime: number;
  playableDuration: number;
}

interface State {
  isLoading: boolean;
  showControls: boolean;
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
}

export default class VideoPlayer extends React.PureComponent<Props, State> {
  static propTypes = {
    // Metadata
    source: PropTypes.string.isRequired,
    autoStart: PropTypes.bool,

    // Customisable components
    loader: PropTypes.node, // Loader component
    // Bar displayed on the middle of the screen.
    middleControlsBar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    middleControlsBarProps: PropTypes.object, // Used to override default component props.
    // Bar displayed on the bottom of the screen.
    bottomControlsBar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    bottomControlsBarProps: PropTypes.object, // Used to override default component props.

    // Hooks
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    onEnd: PropTypes.func
  };

  static defaultProps = {
    autoStart: true,
    onError: noop,
    onProgress: noop,
    onEnd: noop
  };

  public controlsFadeValue: Animated.Value;
  public player: { seek: (position: number) => void };
  public controlsHider: number;
  public toggleControls: () => void;
  public setPosition: (position: number) => void;
  public setNotLoading: () => void;
  public setPlaying: () => void;
  public setPaused: () => void;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // Until buffer loaded.
      showControls: false, // Trigger on mount because we need auto-hide.
      isPaused: !props.autoStart,
      currentTime: 0, // In seconds.
      totalTime: 0 // In seconds.
    };

    this.controlsFadeValue = new Animated.Value(1);

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.toggleControls = () => {
      this.setState(({ showControls }) => ({
        showControls: !showControls
      }));
    };
    this.setPosition = position => {
      this.player.seek(position);
      this.setState({ currentTime: position });
    };
    this.setNotLoading = () => this.setState({ isLoading: false });
    this.setPlaying = () => this.setState({ isPaused: false });
    this.setPaused = () => this.setState({ isPaused: true });
  }

  componentDidMount() {
    this.toggleControls();
  }

  componentWillUnmount() {
    clearTimeout(this.controlsHider);
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    // Fade in/out on controls.
    if (nextState.showControls !== this.state.showControls) {
      Animated.timing(this.controlsFadeValue, {
        toValue: nextState.showControls ? 1 : 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const controlsDisplayed =
      prevState.showControls !== this.state.showControls &&
      this.state.showControls === true;

    // Defined whether of not trigger controls auto-hide.
    switch (true) {
      case controlsDisplayed: // Control are displayed now
      case prevState.isPaused !== this.state.isPaused: // Player is not paused now
        // This reset dismiss on action.
        clearTimeout(this.controlsHider);
        this.controlsHider = this.createControlHider();
        return;
    }
  }

  /**
   * Register a timeout that will hide controls.
   *
   * @param {number} delay In ms
   *
   * @returns {number} Reference to the timeout
   */
  createControlHider(delay = 3000): number {
    return setTimeout(() => {
      if (!this.state.showControls) return;

      this.setState({
        showControls: false
      });
    }, delay);
  }

  onLoad(meta: { duration: number }) {
    this.setNotLoading();
    this.setState({ totalTime: Math.floor(meta.duration) });
  }

  onProgress(meta: ProgressStatus) {
    const currentTime = Math.floor(meta.currentTime);

    if (currentTime !== this.state.currentTime) {
      this.setState({
        currentTime,
        isLoading: currentTime >= meta.playableDuration
      });
    }

    this.props.onProgress(
      Object.assign(meta, { maximumDuration: this.state.totalTime })
    );
  }

  onEnd() {
    // Pause video and reset
    this.setPosition(0);
    this.setNotLoading();

    setTimeout(this.setPaused, 100); // Defer to counter a glitch on iOS where repeat = off isn't working.

    this.props.onEnd();
  }

  render() {
    const {
      loader,
      middleControlsBar,
      middleControlsBarProps,
      bottomControlsBarProps,
      bottomControlsBar,
      source,
      onError
    } = this.props;

    const {
      currentTime,
      totalTime,
      isLoading,
      showControls,
      isPaused
    } = this.state;

    const Loader: any | DefaultLoader = loader || DefaultLoader;
    const MiddleControlsBar: any | DefaultMiddleControlsBar =
      middleControlsBar || DefaultMiddleControlsBar;
    const BottomControlsBar: any | DefaultBottomControlsBar =
      bottomControlsBar || DefaultBottomControlsBar;

    // Those are the default passed.
    const baseControlsBarProps = {
      currentTime,
      totalTime,
      isPaused,
      setPlaying: this.setPlaying,
      setPaused: this.setPaused,
      setPosition: this.setPosition
    };

    return (
      <TouchableWithoutFeedback onPress={this.toggleControls}>
        <View style={styles.wrapper}>
          <View style={styles.loaderWrapper} pointerEvents="none">
            {isLoading ? <Loader /> : null}
          </View>
          <Animated.View
            style={[styles.controls, { opacity: this.controlsFadeValue }]}
            pointerEvents={showControls ? undefined : "none"}
          >
            <View style={styles.middleControlsBar}>
              <MiddleControlsBar
                {...middleControlsBarProps}
                {...baseControlsBarProps}
              />
            </View>
            <View style={styles.bottomControlsBar}>
              <BottomControlsBar
                {...bottomControlsBarProps}
                {...baseControlsBarProps}
              />
            </View>
          </Animated.View>
          <Video
            ref={player => (this.player = player)}
            source={{ uri: source }}
            style={styles.backgroundVideo}
            resizeMode="contain"
            paused={isPaused}
            onError={onError}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5
  },
  loaderWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  middleControlsBar: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundVideo: {
    flex: 1
  },
  bottomControlsBar: {
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
