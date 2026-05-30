import { View, Text } from 'react-native';
import { Todo } from '../../types/todo';
import styles from './styles';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          todo.completed && styles.completed,
        ]}
      >
        {todo.todo}
      </Text>
    </View>
  );
};