import { useCallback, useState } from "react";

export function useVideoState(shouldAutoStart: boolean) {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoPaused, setVideoPaused] = useState(!shouldAutoStart);

  return {
    videoLoading,
    videoPaused,
    setVideoPlaying: useCallback(() => setVideoPaused(false), []),
    setVideoPaused: useCallback(() => setVideoPaused(true), []),
    setVideoLoading: useCallback(() => setVideoLoading(true), []),
    setVideoNotLoading: useCallback(() => setVideoLoading(false), []),
  };
}
