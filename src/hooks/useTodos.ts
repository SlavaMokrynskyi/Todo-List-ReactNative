import { useEffect, useState } from "react";

import { Todo } from "../types/todo";
import {
  cancelTodoDeadlineNotification,
  scheduleTodoDeadlineNotification,
} from "../notifications/todoNotifications";

import {
  addTodoRow,
  readTodos,
  removeTodoRow,
  syncTodosFromSeed,
  updateTodoNotificationId,
  updateTodoCompleted,
} from "../db/todosRepository";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      await syncTodosFromSeed();
      const data = await readTodos();

      const hydratedTodos = await Promise.all(
        data.map(async (todo) => {
          if (todo.deadline && !todo.notificationId) {
            const notificationId = await scheduleTodoDeadlineNotification(todo);

            if (notificationId) {
              await updateTodoNotificationId(todo.id, notificationId);

              return {
                ...todo,
                notificationId,
              };
            }
          }

          return todo;
        }),
      );

      setTodos(hydratedTodos);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (
    title: string,
    deadline: string,
    priority: "low" | "medium" | "high",
  ) => {
    const todo: Todo = {
      id: Date.now(),
      todo: title,
      completed: false,
      userId: 0,
      deadline,
      date: deadline,
      priority,
    };

    await addTodoRow(todo);

    const notificationId = await scheduleTodoDeadlineNotification(todo);

    if (notificationId) {
      await updateTodoNotificationId(todo.id, notificationId);
    }

    setTodos((prev) => [
      {
        ...todo,
        notificationId: notificationId ?? undefined,
      },
      ...prev,
    ]);
  };

  const toggleTodo = async (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (!currentTodo) {
      return;
    }

    const completed = !currentTodo.completed;

    await updateTodoCompleted(id, completed);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed,
            }
          : todo,
      ),
    );
  };

  const deleteTodo = async (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    await cancelTodoDeadlineNotification(currentTodo?.notificationId);
    await removeTodoRow(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const totalTodosCount = todos.length;
  const progressPercent = totalTodosCount
    ? Math.round((completedTodosCount / totalTodosCount) * 100)
    : 0;

  return {
    todos,
    loading,
    progressPercent,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
