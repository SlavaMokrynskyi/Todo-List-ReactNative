import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';

import { TodoItem } from '../../components/TodoItem/TodoItem';
import { useTodos } from '../../hooks/useTodos';

import styles from './styles';

export const TodosScreen = () => {
  const { todos, loading } = useTodos();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};