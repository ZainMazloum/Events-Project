"use client"
import { createContext, useState, ReactNode , useEffect } from "react";

// 1. Define the type for a Notification item
interface NotificationData {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}

// 2. Define the type for the entire Context object
export interface NotificationContextType {
  notification: NotificationData | null;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
}

// Initial dummy values for the context
const initialContext: NotificationContextType = {
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
};

// 3. Create the Context with the defined type and initial values
const NotificationContext = createContext<NotificationContextType>(initialContext);

// Type for the Provider's props
interface NotificationContextProviderProps {
  children: ReactNode;
}

// 4. Implement the Context Provider
export function NotificationContextProvider({ children }: NotificationContextProviderProps) {
  // State to hold the active notification data
  const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);
  useEffect(() => {
    if(activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")){
      const timer = setTimeout(() => {
setActiveNotification(null)
      } , 3000)
      return () => {
        clearTimeout(timer);
      }
    }
  } , [activeNotification])

  // Function to show a notification (without useCallback)
  const showNotification = (notificationData: NotificationData) => {
    setActiveNotification(notificationData);
  };

  // Function to hide the notification (without useCallback)
  const hideNotification = () => {
    setActiveNotification(null);
  };

  // The object that will be passed as the 'value' to consumers
  const contextValue: NotificationContextType = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;