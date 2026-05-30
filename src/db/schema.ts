import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  todo: text("todo").notNull(),
  completed: integer("completed", { mode: "boolean" })
    .notNull()
    .default(false),
  userId: integer("user_id").notNull(),
  deadline: text("deadline"),
  date: text("date"),
  priority: text("priority", { enum: ["low", "medium", "high"] }),
  notificationId: text("notification_id"),
});

export const appMetaTable = sqliteTable("app_meta", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
