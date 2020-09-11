import * as React from "react";
import { View, StyleSheet } from "react-native";
import { PlayerIcon } from "./PlayerIcon";
import { playerPlay, playerPause, playerRestart } from "../../../images";
import { InjectedControlProps } from "../types";

interface MainControlProps extends InjectedControlProps {
  restartButton?: boolean;
}

export const DefaultMainControl: React.FC<MainControlProps> = (props) => (
  <View style={styles.barWrapper}>
    {props.videoPaused ? (
      <PlayerIcon iconSource={playerPlay} onPress={props.setPlaying} />
    ) : (
      <PlayerIcon iconSource={playerPause} onPress={props.setPaused} />
    )}
    {props.restartButton && (
      <PlayerIcon
        iconSource={playerRestart}
        onPress={() => props.setPosition(0)}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 160,
    minWidth: 80,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
  },
  barItem: {
    margin: 5,
  },
});
