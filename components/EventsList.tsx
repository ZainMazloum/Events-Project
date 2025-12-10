
import React from "react";
import EventItem from "./EventItem";

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
    <ul className="grid grid-cols-1 gap-8 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
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