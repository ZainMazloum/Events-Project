import { useContext } from 'react';

import classes from "./notifications.module.css"
// NOTE: You must update the path to the TypeScript file for your context
import NotificationContext, { NotificationContextType } from '../../store/notification-context'; 

// --- 1. Define the Component's Props Interface ---

interface NotificationProps {
  // Use the union type for status to restrict allowed strings
  status: string;
  title: string;
  message: string;
}

const Notification = (props: NotificationProps) => {
  // 2. Use the context with the defined type
  const notificationCtx = useContext<NotificationContextType>(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  // Use a switch statement for cleaner conditional logic
  switch (status) {
    case 'success':
      statusClasses = classes.success;
      break;
    case 'error':
      statusClasses = classes.error;
      break;
    case 'pending':
      statusClasses = classes.pending;
      break;
    default:
      // Optionally handle an invalid status gracefully
      statusClasses = ''; 
      break;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
// interface NotificationProps{
//     title : string,
//     message : string,
//     status : string
// }
// export default function Notification(props : NotificationProps){
//     return(
//         <>
//         <div>{props.title}</div>
//         <div>{props.message}</div>
//         <div>{props.status}</div>
//         </>
//     )
// }