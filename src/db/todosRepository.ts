import { desc, eq } from "drizzle-orm";

import { getTodos as getTodosFromApi } from "../api/todosApi";
import { Todo } from "../types/todo";

import { db, initializeDatabase } from "./database";
import { appMetaTable, todosTable } from "./schema";

const SEED_FLAG = "seeded";

type TodoRow = typeof todosTable.$inferSelect;

const mapRowToTodo = (row: TodoRow): Todo => ({
  id: row.id,
  todo: row.todo,
  completed: row.completed,
  userId: row.userId,
  deadline: row.deadline ?? row.date ?? undefined,
  date: row.date ?? undefined,
  priority: row.priority ?? undefined,
  notificationId: row.notificationId ?? undefined,
});

const mapTodoToRow = (todo: Todo) => ({
  id: todo.id,
  todo: todo.todo,
  completed: todo.completed,
  userId: todo.userId,
  deadline: todo.deadline ?? todo.date ?? null,
  date: todo.deadline ?? todo.date ?? null,
  priority: todo.priority ?? null,
  notificationId: todo.notificationId ?? null,
});

const hasSeeded = async () => {
  const result = await db
    .select({ value: appMetaTable.value })
    .from(appMetaTable)
    .where(eq(appMetaTable.key, SEED_FLAG))
    .limit(1);

  return result.length > 0;
};

export const readTodos = async () => {
  initializeDatabase();

  const rows = await db.select().from(todosTable).orderBy(desc(todosTable.id));

  return rows.map(mapRowToTodo);
};

export const syncTodosFromSeed = async () => {
  initializeDatabase();

  if (await hasSeeded()) {
    return;
  }

  const apiTodos = await getTodosFromApi();

  db.transaction((tx) => {
    if (apiTodos.length) {
      tx.insert(todosTable).values(apiTodos.map(mapTodoToRow));
    }

    tx.insert(appMetaTable).values({
      key: SEED_FLAG,
      value: "true",
    });
  });
};

export const addTodoRow = async (todo: Todo) => {
  initializeDatabase();

  await db.insert(todosTable).values(mapTodoToRow(todo));
};

export const updateTodoNotificationId = async (
  id: number,
  notificationId: string | null,
) => {
  initializeDatabase();

  await db
    .update(todosTable)
    .set({ notificationId })
    .where(eq(todosTable.id, id));
};

export const updateTodoCompleted = async (id: number, completed: boolean) => {
  initializeDatabase();

  await db.update(todosTable).set({ completed }).where(eq(todosTable.id, id));
};

export const removeTodoRow = async (id: number) => {
  initializeDatabase();

  await db.delete(todosTable).where(eq(todosTable.id, id));
};
