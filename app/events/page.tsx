import EventList from "@/components/EventsList"
import { getAllEvents } from "@/helpers/api-util"
import { Event } from "@/helpers/api-util"
import EventsSearch from "./events-search";
export const revalidate = 60;
export const metadata = {
  title : "All Events",
  description : "Such a good events"
}
export default async function AllEventPage(){
  const events : Event[] = await getAllEvents();
  if(!events || events.length === 0){
    return (
      <div className="p-4 text-center">
              <p className="mt-8 text-red-500">No events found. Check your database.</p>
      </div>

    )
  }
  return (
    <div className="space-y-6 p-4">
      <EventsSearch />
      <EventList items = {events} />
    </div>
  )
}
