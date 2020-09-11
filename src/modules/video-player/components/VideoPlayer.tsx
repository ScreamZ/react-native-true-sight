import React, { useRef, useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import { useVideoState } from "../hooks/useVideoState";
import { InjectedControlProps, InjectedPlayerProps } from "../types";
import { PlayerLoader } from "./PlayerLoader";

interface PlayerProps {
  autoStart: boolean;
  children(props: InjectedPlayerProps): React.ReactNode;
  mainControl(data: InjectedControlProps): React.ReactNode;
  bottomControl(data: InjectedControlProps): React.ReactNode;
}

interface ProgressStatus {
  currentTime: number;
  playableDuration: number;
}

export const VideoPlayer: React.FC<PlayerProps> = (props) => {
  const playerRef = useRef<Video>(null);
  const controlsHider = useRef(0);
  const controlsFadeValue = useRef(new Animated.Value(1)).current;
  const {
    videoLoading,
    videoPaused,
    setVideoLoading,
    setVideoNotLoading,
    setVideoPlaying,
    setVideoPaused,
  } = useVideoState(props.autoStart);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [playCursorTime, setPlayCursorTime] = useState(0);
  const [videoTotalTime, setVideoTotalTime] = useState(0);

  const toggleControls = () => setShowVideoControls((prev) => !prev);
  const setCursorPosition = (to: number) => {
    playerRef.current?.seek(to);
    setPlayCursorTime(to);
  };

  function onLoad(meta: { duration: number }) {
    setVideoNotLoading();
    setVideoTotalTime(Math.floor(meta.duration));
  }

  function onProgress(meta: ProgressStatus) {
    if (meta.currentTime !== playCursorTime) {
      setPlayCursorTime(Math.floor(meta.currentTime));

      // Update loading state
      meta.currentTime >= meta.playableDuration
        ? setVideoLoading()
        : setVideoNotLoading();
    }
  }

  function onEnd() {
    // Pause video and reset
    setVideoNotLoading();
    setCursorPosition(0);

    // Defer to prevent a glitch on iOS where repeat if video paused to late after cursor, it doesnt pause
    setTimeout(setVideoPaused, 100);
  }

  useEffect(() => {
    // When player is shown, hide controls
    toggleControls();
  }, []);

  // On control changes
  useEffect(() => {
    Animated.timing(controlsFadeValue, {
      toValue: showVideoControls ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    if (showVideoControls) {
      clearTimeout(controlsHider.current);
      controlsHider.current = setTimeout(() => {
        setShowVideoControls(false);
      }, 3000);
    }

    return () => {
      clearTimeout(controlsHider.current);
    };
  }, [showVideoControls]);

  useEffect(() => {
    clearTimeout(controlsHider.current);
    controlsHider.current = setTimeout(() => {
      setShowVideoControls(false);
    }, 3000);

    return () => {
      clearTimeout(controlsHider.current);
    };
  }, [videoPaused]);

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <View style={styles.wrapper}>
        <View style={styles.loaderWrapper} pointerEvents="none">
          {videoLoading ? <PlayerLoader /> : null}
        </View>
        <Animated.View
          style={[styles.controls, { opacity: controlsFadeValue }]}
          pointerEvents={showVideoControls ? undefined : "none"}
        >
          <View style={styles.middleControlsBar}>
            {props.mainControl({
              videoPaused,
              videoLoading,
              playCursorTime,
              videoTotalTime,
              setPlaying: setVideoPlaying,
              setPaused: setVideoPaused,
              setPosition: setCursorPosition,
            })}
          </View>
          <View style={styles.bottomControlsBar}>
            {props.bottomControl({
              videoPaused,
              videoLoading,
              playCursorTime,
              videoTotalTime,
              setPlaying: setVideoPlaying,
              setPaused: setVideoPaused,
              setPosition: setCursorPosition,
            })}
          </View>
        </Animated.View>
        {props.children({
          videoPaused,
          playerRef,
          onLoad,
          onProgress,
          onEnd,
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  loaderWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  middleControlsBar: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    width: "100%",
    aspectRatio: 1,
  },
  bottomControlsBar: {
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
