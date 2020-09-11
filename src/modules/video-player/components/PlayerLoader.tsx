import React from "react";
import { View, ActivityIndicator, Platform, StyleSheet } from "react-native";

interface Props {
  color?: string;
}

export const PlayerLoader: React.FC<Props> = ({ color }) => (
  <View style={styles.progressBar}>
    <ActivityIndicator
      size="large"
      color={color ?? (Platform.OS === "ios" ? "white" : "#EA0000")}
    />
  </View>
);

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: "center",
  },
});
