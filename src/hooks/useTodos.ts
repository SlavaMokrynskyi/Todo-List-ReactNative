import { useEffect, useState } from 'react';
import { getTodos } from '../api/todosApi';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
  };
};