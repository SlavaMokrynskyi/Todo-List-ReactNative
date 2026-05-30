import axios from 'axios';
import { Todo } from '../types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(
    'https://dummyjson.com/todos'
  );

  return response.data.todos;
};