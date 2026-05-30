export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;

  deadline?: string;
  date?: string;
  priority?: Priority;
  notificationId?: string;
}
