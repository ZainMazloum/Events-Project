import React, { ReactNode } from 'react';
import classes from './event-content.module.css';

// Define the shape of the component's props
// It expects 'children' which can be any valid React node.
interface EventContentProps {
  children: ReactNode;
}

// Convert to a TypeScript functional component using React.FC or by typing the props directly
const EventContent: React.FC<EventContentProps> = (props) => {
// OR: const EventContent = ({ children }: EventContentProps) => { // Destructured option
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default EventContent;