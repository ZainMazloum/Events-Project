import { Event } from "@/app/api/events";

// Note: I am assuming the Event type looks something like this based on usage:
// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   isFeatured: boolean;
//   // ... other properties
// }

export async function getAllEvents(): Promise<Event[]> {
  const url = "http://localhost:4000/events"; // json-server endpoint

  try {
    const response = await fetch(url);

    // If the server responds but the status is 404, we catch it here.
    if (!response.ok) {
      const text = await response.text().catch(()=>'<no body>');
      // Throw the descriptive 404 error
      throw new Error(`Mock fetch failed: ${response.status} ${response.statusText} - ${text}`);
    }

    // Since json-server usually returns an array directly at the endpoint, 
    // we don't need the object transformation, but we'll keep the logic 
    // for compatibility with your existing Firebase-style code.

    const data = await response.json(); 

    // If data is an array (common for json-server), use it directly.
    if (Array.isArray(data)) {
        // We ensure all items have an 'id' property if they are coming from an array
        return data.map(item => ({
            id: item.id || Math.random().toString(),
            ...item
        })) as Event[];
    }

    // If data is a keyed object (like Firebase), transform it.
    const events: Event[] = [];
    for (const key in data) {
      // 💡 FIX: Ensure 'id: key' is explicitly included in the pushed object
      events.push({ 
        ...data[key] as Event 
      });
    }
    return events;
  } catch (err) {
    console.error('getAllEvents (mock) error:', err);
    throw err;
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  // 💡 Updated to be async and fetch data from getAllEvents
  const allEvents = await getAllEvents();
  const featured = allEvents.filter(event => event.isFeatured);
  return featured;
}

export async function getEventById(id : string): Promise<Event | undefined> {
    // 💡 Updated to be async and fetch data from getAllEvents
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: { year: number; month: number }): Promise<Event[]> {
    // 💡 NEW: This function implements the filtering logic from your old utility
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();
    
    const filteredEvents: Event[] = allEvents.filter((event) => {
        const eventDate = new Date(event.date);

        // Convert event month (0-indexed) and filter month (1-indexed)
        const eventYear = eventDate.getFullYear();
        const eventMonth = eventDate.getMonth(); // 0 = Jan, 11 = Dec

        // Filter: checks if year and month (adjusted by -1) match
        return eventYear === year && eventMonth === month - 1;
    });

    return filteredEvents;
}
