import React from "react";
import EventItem from "./event-item";

export interface EventType {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
}

interface EventListProps {
  items: EventType[];
}

const EventList: React.FC<EventListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
};

export default EventList;
