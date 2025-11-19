import EventList from "@/components/event-list";
import EventsSearch from "./events-search";
import { getAllEvents } from "@/helpers/api-util";
import { Event } from "@/app/api/events";

// Configuration for Incremental Static Regeneration (ISR)
// This fetches data on the server and re-validates (refreshes) every 60 seconds.
// This is the chosen Server-Side strategy, similar to using getServerSideProps + revalidate.
export const revalidate = 60; 
export const metadata = {
  title: 'All Events',
  description: 'Such a good events',
};
// The component is async to allow for direct server-side data fetching.
export default async function AllEventPage() {
  
  // Data fetching is done directly on the server.
  const events: Event[] = await getAllEvents();

  // Handle No Data State (Server-side)
  if (!events || events.length === 0) {
    return (
      <div className="p-4 text-center">
        {/* EventsSearch must be a separate "use client" component 
            to handle navigation */}
        <EventsSearch />
        <p className="mt-8 text-red-500">No events found. Check your database.</p>
      </div>
    );
  }

  // 1. Render the Client Component (EventsSearch)
  // 2. Render the Server-Fetched Data Component (EventList)
  return (
    <div className="space-y-6 p-4">
      {/* This component will use "use client" internally to handle the router.push() logic */}
      <EventsSearch /> 
      <EventList items={events} />
    </div>
  );
}
