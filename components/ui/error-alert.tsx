import { ReactNode } from 'react';

import classes from './error-alert.module.css';

// 1. Define the props interface
interface ErrorAlertProps {
  // 'children' is the content nested inside the component
  children: ReactNode; 
}

// 2. Type the component using the interface
const ErrorAlert = (props: ErrorAlertProps) => {
  // We can also destructure the props here if preferred:
  // const ErrorAlert = ({ children }: ErrorAlertProps) => { ... }
  
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;