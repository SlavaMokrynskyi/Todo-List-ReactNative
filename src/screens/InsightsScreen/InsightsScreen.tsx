import { Text, View } from "react-native";

import { useTodosContext } from "../../context/TodosContext";

import styles from "./styles";

const formatCount = (value: number) => value.toString().padStart(2, "0");

export const InsightsScreen = () => {
  const { todos } = useTodosContext();

  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;
  const highPriority = todos.filter((todo) => todo.priority === "high").length;

  return (
    <View style={styles.container}>
      <Text style={styles.overline}>Workspace</Text>
      <Text style={styles.title}>Project insights</Text>
      <Text style={styles.subtitle}>
        A quick snapshot of your current todo backlog.
      </Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total</Text>
          <Text style={styles.cardValue}>{formatCount(todos.length)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Done</Text>
          <Text style={styles.cardValue}>{formatCount(completed)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Open</Text>
          <Text style={styles.cardValue}>{formatCount(remaining)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>High</Text>
          <Text style={styles.cardValue}>{formatCount(highPriority)}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Navigation</Text>
        <Text style={styles.panelText}>
          The tab bar uses Expo Router native tabs to match the iOS-style glass
          treatment while keeping the app structure simple.
        </Text>
      </View>
    </View>
  );
};
