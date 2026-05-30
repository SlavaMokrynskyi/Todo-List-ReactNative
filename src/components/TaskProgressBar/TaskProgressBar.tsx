import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import styles from "./styles";

interface Props {
  value: number;
}

export const TaskProgressBar = ({ value }: Props) => {
  const progress = useSharedValue(value);

  useEffect(() => {
    progress.value = withTiming(value, {
      duration: 650,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [progress, value]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 100],
      ["#bfdbfe", "#1d4ed8"],
    ),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Completed tasks</Text>
          <Text style={styles.value}>{value}%</Text>
        </View>
      </View>

      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
    </View>
  );
};
