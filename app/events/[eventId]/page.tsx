import { getEventByID , getFeaturedEvents } from "@/helpers/api-util";
import EventDetails from "@/components/event-detail/events-detail";
import { notFound } from "next/navigation";
import Comments from "@/components/input/comments";

interface EventPageProps {
  params: {
    eventID: string;
  };
}

export async function generateMetadata({ params }: EventPageProps) {
  const eventID = params.eventID;
  const event = await getEventByID(eventID);
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be located.',
    };
  }
  return {
    title: event.title,
    description: event.description,
  };
}

// FIXED: Correct param name to match folder [eventID]
export async function generateStaticParams() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    eventID: event.id,   // ✅ must match [eventID] in folder name
  }));
  return paths;
}

const EventDetail = async ({ params }: EventPageProps) => {
  const eventID = params.eventID;
  const event = await getEventByID(eventID);

  if (!event) {
    return notFound();
  }

  return (
    <>
      <EventDetails
        title={event.title}
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      >
        <p>{event.description}</p>
      </EventDetails>

      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetail;
