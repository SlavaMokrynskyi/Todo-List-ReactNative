import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Todo } from "../../types/todo";

import styles from "./styles";

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  const { width } = useWindowDimensions();
  const actionWidth = Math.min(112, width * 0.26);
  const deadlineText = todo.deadline ?? todo.date;

  const handleShow = () => {
    Alert.alert(
      todo.todo,
      [
        deadlineText ? `Deadline: ${deadlineText}` : "No deadline set",
        todo.priority ? `Priority: ${todo.priority}` : "Priority: not set",
        todo.completed ? "Status: completed" : "Status: active",
      ].join("\n"),
    );
  };

  const renderRightActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={handleShow}
        style={[styles.showButton, { width: actionWidth }]}
      >
        <Text style={styles.actionText}>Show</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDelete}
        style={[styles.deleteButton, { width: actionWidth }]}
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      friction={2}
      overshootRight={false}
      rightThreshold={actionWidth * 0.75}
      containerStyle={styles.swipeContainer}
      childrenContainerStyle={styles.childrenContainer}
      renderRightActions={renderRightActions}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.container, todo.completed && styles.completedCard]}
      >
        <View>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.todo}
          </Text>

          {deadlineText && <Text style={styles.date}>{deadlineText}</Text>}

          {todo.priority && <Text style={styles.priority}>{todo.priority}</Text>}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
