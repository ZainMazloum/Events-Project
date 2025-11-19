import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import { notFound } from "next/navigation";
import Comments from "@/components/input/comments";
// Define the structure of the path parameters for TypeScript
interface EventPageProps {
  params: {
    eventId: string;
  };
}

// 💡 1. REPLACEMENT FOR getStaticPaths: generateStaticParams
// This function tells Next.js which pages to pre-render (SSG) at build time.
// Since 'fallback: false' was used in the old code, we return ALL possible paths.
export async function generateMetadata({ params }: EventPageProps) {
  const eventId = params.eventId;
  
  // You must fetch the data here to get the dynamic title
  const event = await getEventById(eventId);
  
  // Handle case where event is not found for metadata (optional, but robust)
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be located.',
    };
  }

  return {
    title: event.title,
    description: event.description, // Use the real description for better SEO
  };
}
// export async function generateStaticParams() {
//   // Fetch all events using the existing helper function
//   const events = await getFeaturedEvents(); 

//   // Map the events to the required format: [{ eventId: 'e1' }, { eventId: 'e2' }, ...]
//   const paths = events.map(event => ({
//     eventId: event.id
//   }));

//   return paths;
// }
export async function generateStaticParams(){
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    eventId : event.id
  }))
  return paths
}

// 💡 2. REPLACEMENT FOR getStaticProps: The Server Component (async function)
// The data fetching logic from getStaticProps moves directly into the component.
const EventPage = async ({params} : EventPageProps) => {
  const eventId = params.eventId;
  
  // Data fetching happens here, just like in the old getStaticProps
  const event = await getEventById(eventId);

  // If the component is being rendered and the event is not found (shouldn't 
  // happen often with generateStaticParams, but good for safety), 
  // we use Next.js's native notFound() helper.
  if(!event){
    return notFound();
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics 
        date={event.date} 
        address={event.location} 
        image={event.image} 
        imageAlt={event.title} 
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

// 💡 3. OPTIONAL: Revalidate for ISR
// This is the App Router's way of enabling Incremental Static Regeneration (ISR).
// If you want the page to update periodically (e.g., every hour/3600 seconds)
// after the initial build, add this line. If you want true 'fallback: false' 
// behavior (never revalidate), simply remove this line.
export const revalidate = 3600; 

export default EventPage;
