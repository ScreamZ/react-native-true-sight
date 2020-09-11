import Video, { OnLoadData, OnProgressData } from "react-native-video";

export interface InjectedControlProps {
  playCursorTime: number;
  videoTotalTime: number;
  videoPaused: boolean;
  videoLoading: boolean;
  setPlaying(): void;
  setPaused(): void;
  setPosition(to: number): void;
}

export interface InjectedPlayerProps {
  videoPaused: boolean;
  playerRef: React.MutableRefObject<Video | null>;
  onLoad: (data: OnLoadData) => void;
  onProgress: (data: OnProgressData) => void;
  onEnd: () => void;
}
