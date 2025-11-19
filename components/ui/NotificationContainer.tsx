'use client';
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";
import Notification from "./notifications";

export default function NotificationContainer() {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  if (!activeNotification) return null;

  return (
    <Notification
      title={activeNotification.title}
      message={activeNotification.message}
      status={activeNotification.status}
    />
  );
}
