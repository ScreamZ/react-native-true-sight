import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { secondsToMS } from "../logic/utils";
import { InjectedControlProps } from "../types";

interface BottomControlProps extends InjectedControlProps {
  barColor?: string;
  joyStickColor?: string;
  navigationDisabled?: boolean;
}

export const DefaultBottomControlsBar: React.FC<BottomControlProps> = (
  props
) => {
  const wasPausedBeforeSliding = useRef(props.videoPaused);

  return (
    <View style={styles.barWrapper}>
      <Text style={styles.currentTime}>
        {secondsToMS(props.playCursorTime)}
      </Text>
      <Slider
        pointerEvents={props.navigationDisabled ? "none" : undefined}
        style={styles.loadingBar}
        maximumValue={props.videoTotalTime}
        minimumTrackTintColor={props.barColor}
        thumbTintColor={props.joyStickColor}
        value={props.playCursorTime}
        onSlidingStart={() => {
          wasPausedBeforeSliding.current = props.videoPaused; // To know if we need to play after sliding.
          props.setPaused();
        }}
        onSlidingComplete={(val) => {
          props.setPosition(Math.round(val));

          // Mark playing again if not paused before sliding
          if (!wasPausedBeforeSliding.current) {
            props.setPlaying();
          }
        }}
      />
      <Text style={styles.totalTime}>{secondsToMS(props.videoTotalTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 60,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentTime: {
    color: "white",
    width: 40,
  },
  loadingBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  totalTime: {
    color: "white",
    width: 40,
  },
});
