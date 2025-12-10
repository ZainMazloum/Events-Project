import { getEventByID , getFeaturedEvents } from "@/helpers/api-util"

import EventDetails from "@/components/event-detail/events-detail"
// NOTE: Adjust the path if you saved EventDetails in a different location

import { notFound } from "next/navigation"
import Comments from "@/components/input/comments"; 
// ... (Metadata and Static Params functions remain the same)
interface EventPageProps{
  params:{
    eventID : string;
  }
}
 export async function generateMetadata({params} : EventPageProps){
  const eventID = params.eventID;
  const event = await getEventByID(eventID);
    if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be located.',
    };
  }
  return{
    title : event.title,
    description: event.description,
  }
 }
 export async function generateStaticParams(){
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    eventId : event.id
  }))
  return paths;
 }
const EventDetail = async ({params} : EventPageProps) => {
  const eventID = params.eventID;
  const event = await getEventByID(eventID);
  
  if(!event){
    return notFound();
  }
  
  return (
    <>
      {/* ✅ Replaced EventSummary, EventLogistics, and EventContent 
        with a single EventDetails component.
      */}
      <EventDetails 
        title={event.title}           // From EventSummary
        date={event.date}             // From EventLogistics
        address={event.location}      // From EventLogistics (location maps to address)
        image={event.image}           // From EventLogistics
        imageAlt={event.title}        // From EventLogistics
      >
        <p>{event.description}</p>   {/* From EventContent (passed as children) */}
      </EventDetails>
      
      <Comments eventId={event.id} />
    </>
  )
}

export default EventDetail