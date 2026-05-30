import { Platform } from "react-native";
import { AndroidImportance } from "expo-notifications/build/NotificationChannelManager.types";
import { SchedulableTriggerInputTypes } from "expo-notifications/build/Notifications.types";
import { getPermissionsAsync, requestPermissionsAsync } from "expo-notifications/build/NotificationPermissions";
import setNotificationChannelAsync from "expo-notifications/build/setNotificationChannelAsync";
import setNotificationCategoryAsync from "expo-notifications/build/setNotificationCategoryAsync";
import scheduleNotificationAsync from "expo-notifications/build/scheduleNotificationAsync";
import cancelScheduledNotificationAsync from "expo-notifications/build/cancelScheduledNotificationAsync";

import { Todo } from "../types/todo";

export const TODO_DEADLINE_CATEGORY = "TODO_DEADLINE";
export const TODO_DEADLINE_ACTION_SHOW = "SHOW";
export const TODO_DEADLINE_CHANNEL = "todo-deadlines";

export const registerTodoNotificationCategory = async () => {
  await setNotificationCategoryAsync(TODO_DEADLINE_CATEGORY, [
    {
      identifier: TODO_DEADLINE_ACTION_SHOW,
      buttonTitle: "Show",
      options: {
        opensAppToForeground: true,
      },
    },
  ]);

  if (Platform.OS === "android") {
    await setNotificationChannelAsync(TODO_DEADLINE_CHANNEL, {
      name: "Todo deadlines",
      importance: AndroidImportance.HIGH,
      enableVibrate: true,
      enableLights: true,
      vibrationPattern: [0, 250, 250],
    });
  }
};

const ensureNotificationPermission = async () => {
  const permission = await getPermissionsAsync();

  if (permission.status === "granted") {
    return true;
  }

  const requested = await requestPermissionsAsync();

  return requested.status === "granted";
};

const parseDeadline = (deadline: string) => {
  const parsedDeadline = new Date(deadline);

  if (Number.isNaN(parsedDeadline.getTime())) {
    return null;
  }

  if (parsedDeadline.getTime() <= Date.now()) {
    return null;
  }

  return parsedDeadline;
};

export const scheduleTodoDeadlineNotification = async (todo: Pick<Todo, "id" | "todo" | "deadline">) => {
  if (!todo.deadline) {
    return null;
  }

  const deadlineDate = parseDeadline(todo.deadline);

  if (!deadlineDate) {
    return null;
  }

  const hasPermission = await ensureNotificationPermission();

  if (!hasPermission) {
    return null;
  }

  return await scheduleNotificationAsync({
    content: {
      title: "Task deadline",
      body: `${todo.todo} is due now.`,
      data: {
        todoId: todo.id,
      },
      categoryIdentifier: TODO_DEADLINE_CATEGORY,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date: deadlineDate,
      channelId:
        Platform.OS === "android" ? TODO_DEADLINE_CHANNEL : undefined,
    },
  });
};

export const cancelTodoDeadlineNotification = async (
  notificationId?: string | null,
) => {
  if (!notificationId) {
    return;
  }

  try {
    await cancelScheduledNotificationAsync(notificationId);
  } catch {
    return;
  }
};
