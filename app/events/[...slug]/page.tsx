
"use client"
import {useState , useEffect} from "react"
import { useParams } from "next/navigation"
import { Event } from "@/helpers/api-util"
import EventList from "@/components/EventsList"
const FiltredEvents = () => {
  const params = useParams();
  const filterData = params.slug 
  const [filtredEvents , setFiltredEvents] = useState<Event[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if(!filterData || filterData.length !== 2){
setIsInvalid(true) ;
setIsLoading(false);
return;
    }
    const [filtredYear , filtredMonth] = filterData;
    const numYear = parseInt(filtredYear , 10);
    const numMonth = parseInt(filtredMonth , 10)
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
    setIsInvalid(false);
    setIsLoading(true);
    setNoResults(false);
   async function loadFiltredEvents(){
    try {
      const res = await fetch(`/api/filtredEvents?year=${numYear}&month=${numMonth}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
      }
      const events = await res.json();
      if (!events || events.length === 0) {
        setNoResults(true);
        setFiltredEvents([]);
      } else {
        setFiltredEvents(events);
      }
    } catch (error) {
      console.error("Client-side fetch failed", error);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
    }
  }

    loadFiltredEvents()
  },[filterData])
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl font-medium text-gray-600">Loading filtered events...</p>
      </div>
    );
  }
    if (isInvalid) {
    return (
      <div className="text-center p-8 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md mx-auto max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-2">Invalid Filter Input</h1>
        <p>Please ensure the year is between 2020-2030 and the month is between 1-12.</p>
      </div>
    );
  }
    if (noResults || !filtredEvents || filtredEvents.length === 0) {
    const displayYear = filterData?.[0] || 'N/A';
    const displayMonth = filterData?.[1] || 'N/A';
    
    return (
      <div className="text-center p-8 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md mx-auto max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-4">No Events Found</h1>
        <p>There are no events scheduled for **{displayMonth}/{displayYear}**.</p>
      </div>
    );
  }
    const displayYear = filterData?.[0] || '';
  const displayMonth = filterData?.[1] || '';
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">Events in {displayMonth}/{displayYear}</h1>
      <EventList items={filtredEvents} />
    </div>
  );
}

export default FiltredEvents
