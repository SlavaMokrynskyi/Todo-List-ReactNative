import { createContext, ReactNode, useContext } from "react";

import { useTodos } from "../hooks/useTodos";

type TodosContextValue = ReturnType<typeof useTodos>;

const TodosContext = createContext<TodosContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const todosState = useTodos();

  return (
    <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodosContext must be used within TodosProvider");
  }

  return context;
};
