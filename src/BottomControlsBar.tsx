// @ts-ignore peer deps
import Slider from "@react-native-community/slider";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as PropTypes from "prop-types";

interface Props {
  currentTime: number;
  totalTime: number;
  isPaused: boolean;
  navigationAllowed: boolean;
  setPlaying(): void;
  setPaused(): void;
  setPosition(position: number): void;
  barColor: string;
  joyStickColor: string;
}

export default class BottomControlsBar extends React.PureComponent<Props, null> {
  static propTypes: PropTypes.ValidationMap<Props> = {
    // Metadata
    currentTime: PropTypes.number.isRequired, // In seconds
    totalTime: PropTypes.number.isRequired, // In seconds
    isPaused: PropTypes.bool.isRequired,

    navigationAllowed: PropTypes.bool, // If user can move timeline

    // Controls
    setPlaying: PropTypes.func.isRequired, // Trigger play action
    setPaused: PropTypes.func.isRequired, // Trigger pause action
    setPosition: PropTypes.func.isRequired, // Move video to the given time (in seconds).

    // Styles
    barColor: PropTypes.string, // Already completed bar color
    joyStickColor: PropTypes.string // Bar current position color
  };

  static defaultProps = {
    navigationAllowed: true
  };

  public hasMovedSlider: boolean;
  public wasPausedBeforeSlide: boolean;

  constructor(props) {
    super(props);

    this.hasMovedSlider = false;
    this.wasPausedBeforeSlide = null;

    this.onSliderTouch = this.onSliderTouch.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  /**
   * Transform seconds to text giving 08:05 for the example.
   *
   * @param {number} seconds The number of seconds to transform.
   *
   * @returns {string}
   */
  secondsToMS(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }

  onSliderTouch(val) {
    if (!this.hasMovedSlider) {
      this.hasMovedSlider = true;
      this.wasPausedBeforeSlide = this.props.isPaused; // To know if we need to play after sliding.
      this.props.setPaused();
    }
  }

  onSlidingComplete(val) {
    this.hasMovedSlider = false;
    this.props.setPosition(Math.round(val));

    if (!this.wasPausedBeforeSlide) {
      this.props.setPlaying();
    }
  }

  render() {
    return (
      <View style={styles.barWrapper}>
        <Text style={styles.currentTime}>{this.secondsToMS(this.props.currentTime)}</Text>
        <Slider
          pointerEvents={this.props.navigationAllowed ? undefined : "none"}
          style={styles.loadingBar}
          maximumValue={this.props.totalTime}
          minimumTrackTintColor={this.props.barColor}
          thumbTintColor={this.props.joyStickColor}
          value={this.props.currentTime}
          onValueChange={this.onSliderTouch}
          onSlidingComplete={this.onSlidingComplete}
        />
        <Text style={styles.totalTime}>{this.secondsToMS(this.props.totalTime)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  currentTime: {
    color: "white",
    width: 40
  },
  loadingBar: {
    flex: 1,
    marginHorizontal: 10
  },
  totalTime: {
    color: "white",
    width: 40
  }
});
