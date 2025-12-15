export const dynamic = "force-dynamic";

import { getEventByID } from "@/helpers/api-util";
import EventDetails from "@/components/event-detail/events-detail";
import { notFound } from "next/navigation";
import Comments from "@/components/input/comments";

// 1. Update the interface to reflect that params is a Promise
interface EventPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

const EventDetail = async ({ params }: EventPageProps) => {
  // 2. Await the params before accessing properties
  const { eventId } = await params;

  if (!eventId) {
    return notFound();
  }

  // Use the extracted eventId
  const event = await getEventByID(eventId);

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