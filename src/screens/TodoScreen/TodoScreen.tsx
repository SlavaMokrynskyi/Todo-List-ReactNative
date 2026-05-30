import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { TodoItem } from "../../components/TodoItem/TodoItem";
import { TaskProgressBar } from "../../components/TaskProgressBar/TaskProgressBar";
import { TodoForm } from "../../forms/TodoForm/TodoForm";
import { BottomTabInset } from "../../constants/theme";

import { useTodosContext } from "../../context/TodosContext";

import styles from "./styles";

export const TodosScreen = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    todos,
    loading,
    progressPercent,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodosContext();

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Todo List</Text>

          <Pressable
            onPress={() => setIsFormVisible((value) => !value)}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>
              {isFormVisible ? "×" : "+"}
            </Text>
          </Pressable>
        </View>

        {isFormVisible && (
          <View style={styles.formContainer}>
            <TodoForm
              onSubmit={(data) => {
                void addTodo(data.title, data.deadline, data.priority);
                setIsFormVisible(false);
              }}
            />
          </View>
        )}

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: BottomTabInset + 24 }}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
        />
      </View>

      <View style={styles.footer}>
        <TaskProgressBar value={progressPercent} />
      </View>
    </View>
  );
};
