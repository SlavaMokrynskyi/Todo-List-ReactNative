import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const sqlite = openDatabaseSync("todolist.db");

export const db = drizzle(sqlite);

export const initializeDatabase = () => {
  sqlite.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY NOT NULL,
      todo TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      user_id INTEGER NOT NULL,
      deadline TEXT,
      date TEXT,
      priority TEXT,
      notification_id TEXT
    );
  `);

  const columns = sqlite.getAllSync<{ name: string }>(
    "PRAGMA table_info(todos)"
  );
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has("deadline")) {
    sqlite.execSync("ALTER TABLE todos ADD COLUMN deadline TEXT");
    sqlite.execSync(
      "UPDATE todos SET deadline = date WHERE deadline IS NULL AND date IS NOT NULL"
    );
  }

  if (!columnNames.has("notification_id")) {
    sqlite.execSync("ALTER TABLE todos ADD COLUMN notification_id TEXT");
  }
};
