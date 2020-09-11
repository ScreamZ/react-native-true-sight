import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  iconSource: number;
  onPress: () => void;
  iconColor?: string;
}

export const PlayerIcon: React.FC<Props> = (props) => (
  <View style={styles.iconWrapper}>
    <TouchableOpacity onPress={props.onPress}>
      <Image
        resizeMode="contain"
        source={props.iconSource}
        style={[styles.icon, { tintColor: props.iconColor ?? "#fafafa" }]}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 5,
  },
  icon: {
    margin: 15,
    width: 30,
    height: 30,
  },
});
