// import { getFilteredEvents } from '@/helpers/api-util';
// import EventList from '@/components/event-list';
// import { notFound } from 'next/navigation'; // Utility for 404 handling
// import { Event } from '@/api/events'; // Assuming Event type is imported

// // 💡 NEW: Configuration for Dynamic Rendering
// // Setting this to 'force-dynamic' ensures the component fetches and renders fresh data 
// // on every single request, directly replicating the behavior of getServerSideProps.
// export const dynamic = 'force-dynamic';

// // Define the shape of the props, which includes the dynamic 'slug' array
// interface FilteredEventsPageProps {
//   params: {
//     // 'slug' is an array of strings representing the dynamic path segments (e.g., ['2025', '10'])
//     slug: string[]; 
//   };
// }

// // 💡 FIX: The functional component is now the single source of truth for data fetching.
// const FilteredEventsPage = async ({ params }: FilteredEventsPageProps) => {
//   const filterData = params.slug;

//   // Since this component is dynamically rendered, there is no "Loading" state 
//   // and filterData should be immediately available.
//   if (!filterData || filterData.length === 0) {
//     // This case usually implies an incomplete URL, depending on how the route is defined.
//     return notFound(); 
//   }
  
//   // The 'slug' array is [year, month]
//   // We use destructuring and array indexing to extract the parameters.
//   const [filteredYear, filteredMonth] = filterData;

//   // 1. Data Validation and Type Conversion
//   // Convert strings to numbers using parseInt() for safer validation
//   const numYear = parseInt(filteredYear, 10);
//   const numMonth = parseInt(filteredMonth, 10);

//   // 2. Validation Check
//   // We assume getFilteredEvents is now async and returns Promise<Event[]>
//   const isValidFilter = 
//     !isNaN(numYear) && 
//     !isNaN(numMonth) && 
//     numYear >= 2020 && 
//     numYear <= 2030 && 
//     numMonth >= 1 && 
//     numMonth <= 12;

//   if (!isValidFilter) {
//     // Use the notFound utility to trigger the 404 page for invalid input
//     return notFound(); 
//   }
  
//   // 3. Data Fetching (Server-Side, executed on every request)
//   const filteredEvents: Event[] = await getFilteredEvents({ // 💡 Await the async function
//     year: numYear,
//     month: numMonth,
//   });

//   // 4. No Events Found Check
//   if (!filteredEvents || filteredEvents.length === 0) {
//     // The route is valid, but the result set is empty, so we display a custom message.
//     return (
//       <div className="text-center p-8">
//         <h1 className="text-2xl font-bold mb-4">No Events Found</h1>
//         <p>There are no events scheduled for {numMonth}/{numYear}.</p>
//       </div>
//     );
//   }

//   // 5. Render the List
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-center my-6">Events in {numMonth}/{numYear}</h1>
//       <EventList items={filteredEvents} />
//     </div>
//   );
// };

// // 💡 NOTE: getServerSideProps is COMPLETELY REMOVED.
// export default FilteredEventsPage;
"use client"; // 💡 REQUIRED: Marks this as a Client Component

import EventList from '@/components/event-list';
import { getFilteredEvents } from '@/helpers/api-util';
import { useState, useEffect } from 'react'; // 💡 NEW: State and Effect hooks
import { useParams } from 'next/navigation'; // 💡 NEW: Hook to access URL parameters
import { Event } from '@/app/api/events'; // Assuming Event type is imported

// 💡 Removed: async keyword
// 💡 Removed: export const dynamic = 'force-dynamic';
// 💡 Removed: notFound import (we now handle errors via state)
export default function FilteredEventsPage() {
  // Use the hook to get the URL parameters array
  const params = useParams();
  const filterData = params.slug as string[] | undefined;

  // State to manage data, loading, and any errors
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
  // Effect runs when the component mounts or when filterData (URL slug) changes
  useEffect(() => {
    // This check handles initial render where 'params' might not be fully available,
    // though Next.js generally provides it on mount for Client Components in dynamic routes.
    if (!filterData || filterData.length !== 2) {
      setIsInvalid(true);
      setIsLoading(false);
      return;
    }
    const [filteredYear, filteredMonth] = filterData;

    // 1. Data Validation and Type Conversion
    const numYear = parseInt(filteredYear, 10);
    const numMonth = parseInt(filteredMonth, 10);

    // 2. Validation Check (Same as original logic)
    const isValidFilter = 
      !isNaN(numYear) && 
      !isNaN(numMonth) && 
      numYear >= 2020 && 
      numYear <= 2030 && 
      numMonth >= 1 && 
      numMonth <= 12;

    if (!isValidFilter) {
      setIsInvalid(true);
      setIsLoading(false);
      return;
    }

    // Reset state and start loading
    setIsInvalid(false);
    setIsLoading(true);
    setNoResults(false);

    // 3. Client-Side Data Fetching
    async function loadFilteredEvents() {
      try {
        // The API call is now awaited inside the useEffect hook
        const events = await getFilteredEvents({ year: numYear, month: numMonth });
        
        if (!events || events.length === 0) {
          setNoResults(true);
          setFilteredEvents([]);
        } else {
          setFilteredEvents(events);
        }
      } catch (err) {
        console.error("Client-side fetch failed:", err);
        setIsInvalid(true); // Treat fetch error as an invalid state
      } finally {
        setIsLoading(false);
      }
    }

    loadFilteredEvents();
  }, [filterData]); // Dependency ensures re-fetch if URL changes

  // --- Render Logic ---

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl font-medium text-gray-600">Loading filtered events...</p>
      </div>
    );
  }

  // 2. Invalid Input/Error State (equivalent to server-side notFound)
  if (isInvalid) {
    return (
      <div className="text-center p-8 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md mx-auto max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-2">Invalid Filter Input</h1>
        <p>Please ensure the year is between 2020-2030 and the month is between 1-12.</p>
      </div>
    );
  }
  
  // 3. No Results Found State
  if (noResults || !filteredEvents || filteredEvents.length === 0) {
    const displayYear = filterData?.[0] || 'N/A';
    const displayMonth = filterData?.[1] || 'N/A';
    
    return (
      <div className="text-center p-8 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md mx-auto max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-4">No Events Found</h1>
        <p>There are no events scheduled for **{displayMonth}/{displayYear}**.</p>
      </div>
    );
  }

  // 4. Final Render
  const displayYear = filterData?.[0] || '';
  const displayMonth = filterData?.[1] || '';

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">Events in {displayMonth}/{displayYear}</h1>
      <EventList items={filteredEvents} />
    </div>
  );
}
