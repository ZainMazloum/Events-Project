/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient , ObjectId } from "mongodb";
export interface Event{
    id:string,
    title:string,
    description:string,
    location:string,
    date:string,
    image:string,
    isFeatured:boolean,
}
const MONGODB_URL = process.env.MONGODB_URL;
const DATABASE_NAME = "event-project";
const COLLECTION_NAME = "events";
export async function getAllEvents() : Promise<Event[]>{
let client : MongoClient | null = null;
if(!MONGODB_URL){
    throw new Error("MONGODB_URL environment variable is not set.");
}
try{
client = await MongoClient.connect(MONGODB_URL);
const db = client.db(DATABASE_NAME);
const eventsCollection = db.collection(COLLECTION_NAME);
const events = await eventsCollection.find().toArray();
const mappedEvents : Event[] = events.map(event => ({
    id : event._id.toString(),
    title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            image: event.image,
            isFeatured: event.isFeatured
})) 
return mappedEvents;
}
catch(error){
    console.error("Error fetching events from MongoDB: " + error);
    return [];
}
finally{
if (client) {
            await client.close();
        }
}
}
export async function getFeaturedEvents() : Promise<Event[]>{
let client : MongoClient | null = null;
if(!MONGODB_URL){
    throw new Error("MONGODB_URL environment variable is not set.");
}
 try{
   client = await MongoClient.connect(MONGODB_URL);
        const db = client.db(DATABASE_NAME);
        const eventsCollection = db.collection(COLLECTION_NAME);
  const events = await eventsCollection.find({ isFeatured: true }).toArray();
  const mappedEvents : Event[] = events.map(event => ({
             id : event._id.toString(),
             title: event.title,
             description: event.description,
             location: event.location,
             date: event.date,
             image: event.image,
             isFeatured: event.isFeatured
        })) 
        return mappedEvents;
 } 
 catch(error){
    console.log("The error is " + error)
        return [];
    }
    finally{
        if (client) {
             await client.close();
        }
    } 
}
export async function getEventByID(givenID : string) : Promise<Event | undefined>{
    let client : MongoClient | null = null;
            if(!MONGODB_URL){
    throw new Error("MONGODB_URL environment variable is not set.");
}
    try{
       client = await MongoClient.connect(MONGODB_URL);
        const db = client.db(DATABASE_NAME);
        const eventsCollection = db.collection(COLLECTION_NAME);
        let event: any = null;
        // If the givenID is a valid ObjectId, search by _id, otherwise try to find a document
        // that has a string `id` field (useful when using seed/dummy data).
        if (ObjectId.isValid(givenID)) {
            const objectId = new ObjectId(givenID);
            event = await eventsCollection.findOne({ _id: objectId });
        }
        if (!event) {
            // Try fallback: maybe documents store a string `id` field (e.g. from dummy data)
            event = await eventsCollection.findOne({ id: givenID });
        }
        if(!event){
            return undefined;
        }
        return {
            id : event._id.toString(),
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            image: event.image,
            isFeatured: event.isFeatured
        };
    }
catch{
  return undefined;
}
finally{
        if (client) {
             await client.close();
        }
    }
}
export async function getFiltredEvents(dateFilter : {year : number; month : number}) : Promise<Event[]> {
    try{
const {year , month} = dateFilter;
const allEvents = await getAllEvents();
const filtredEvents : Event[] = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const eventYear = eventDate.getFullYear();
    const eventMonth = eventDate.getMonth();
    return eventYear === year && eventMonth === month - 1;
})
return filtredEvents;
    }
    catch{
        return []
    }
}
