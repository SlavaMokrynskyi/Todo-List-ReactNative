import { useEffect } from "react";

import { router, Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DEFAULT_ACTION_IDENTIFIER,
  addNotificationResponseReceivedListener,
} from "expo-notifications/build/NotificationsEmitter";
import { setNotificationHandler } from "expo-notifications/build/NotificationsHandler";

import {
  TODO_DEADLINE_ACTION_SHOW,
  registerTodoNotificationCategory,
} from "../notifications/todoNotifications";

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    void registerTodoNotificationCategory();

    const responseListener = addNotificationResponseReceivedListener((response) => {
      if (
        response.actionIdentifier === TODO_DEADLINE_ACTION_SHOW ||
        response.actionIdentifier === DEFAULT_ACTION_IDENTIFIER
      ) {
        router.replace("/home");
      }
    });

    return () => {
      responseListener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
