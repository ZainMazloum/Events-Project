// import { NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';
// // Interface for the URL parameters (the dynamic segment [eventId])
// interface Params {
//   params: {
//     eventId: string;
//   };
// }
// const MONGODB_URI = process.env.MONGODB_URL || "mongodb+srv://ZainMazloum:sese123212@cluster0.0rr2nal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// async function connectToDatabase() : Promise<MongoClient>{
// if(!MONGODB_URI) {
//   throw new Error("MONGODB_URI environment variable is not set.")
// }
//    const client = await MongoClient.connect(MONGODB_URI);
//   return client;
// }
// // ------------------------------------------------------------------
// // 1. POST Request Handler (Creating a New Comment)
// // ------------------------------------------------------------------
// export async function POST(request: Request, { params }: Params) {
//   const eventId = params.eventId;

//   // 1. Get the request body
//   const { email, name, text } = await request.json();

//   // 2. Validation from your original code
//   if (!email || !email.includes('@') || !name || name.trim() === '' || !text) {
//     return NextResponse.json(
//       { message: 'Invalid input.' },
//       { status: 422 } // Status 422: Unprocessable Entity
//     );
//   }

//   // 3. Process/Log the data
//   console.log(email, name, text);

//   // 4. Create the new comment object
//   const newComment = {
//     id: new Date().toISOString(), // Use a full ISO string for ID creation
//     email,
//     name,
//     text,
//     eventId, // Include the event ID from the URL
//   };
// let client : MongoClient | null = null;
// try{
//   client = await connectToDatabase()
//   const db = client.db("comments")
//   const resault = await db.collection("comments").insertOne(newComment)
// }
// //STOP HERE:
// return NextResponse.json({ })
//   // 5. Send the successful response
//   return NextResponse.json(
//     { message: 'Added comment.', comment: newComment },
//     { status: 201 } // Status 201: Created
//   );
// }

// // ------------------------------------------------------------------
// // 2. GET Request Handler (Fetching All Comments for an Event)
// // ------------------------------------------------------------------
// export async function GET(request: Request, { params }: Params) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let client: MongoClient | null = null; 
//   const eventId = params.eventId;
// try{
//   client = await connectToDatabase();
//   const db = client.db("comments")
//   const comments = await db.collection("comments").find({}).toArray();
//   return NextResponse.json({comments : comments})
//   }
//   catch(error){
//     console.error("MongoDB GET error:", error)
//     return NextResponse.json({message: "Failed to fetch data from database."} , { status : 500})
//   }
// finally{
//   if(client){
//     await client.close()
//   }
// }

//   // Since you only had dummy data, we'll keep that.
//   // In a real app, you would fetch comments for the `eventId` here.
//   const dummyList = [
//     { id: 'c1', name: 'Max', text: 'A first comment!' },
//     { id: 'c2', name: 'Manuel', text: 'A second comment!' },
//     // You might want to filter this list by eventId in a real application
//   ];

//   // Send the successful response
//   return NextResponse.json(
//     { comments: dummyList },
//     { status: 200 } // Status 200: OK
//   );
// }

// // old code:
// import { MongoClient } from "mongodb";
// async function handler(req , res){

//     const eventId = req.query.eventId;
// const client = await MongoClient.connect("mongodb+srv://ZainMazloum:sese123212@cluster0.0rr2nal.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0")
//     if(req.method === "POST"){

//                 const {email , name , text} = req.body;

//     }

// if(!email.includes("@") || !name || name.trim() === "" || !text){

//     res.status(422).json({message:"invalid input."})

// return;

// }
// console.log(email , name , text)

// const newComment = {

//     email,
//     name,
//     text,
//     eventId,

// }
// const db = client.db();
// const resault = db.collection("comment").insertOne(newComment);
// console.log(resault)
// newComment.id = result.insertedId;
// res.status(201).json({message : "Added comment." , comment : newComment})

// if(req.method === "GET"){

// const dummyList = [

//     {id : "c1" , name: "Max" , text:"A first comment!"}

//     {id : "c2" , name: "Manuel" , text:"A second comment!"}

// ]

// res.status(200).json({comments : dummyList})

// }
// client.close()
// }

// the correct code:
import { NextResponse } from 'next/server';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MongoClient, ObjectId, SortDirection } from 'mongodb';

// Interface for the URL parameters (the dynamic segment [eventId])
interface Params {
  params: {
    commentId: string;   
  };
}

// ⚠️ IMPORTANT: Ensure your environment variable is named MONGODB_URI (not MONGODB_URL)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ZainMazloum:sese123212@cluster0.0rr2nal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// --- CONNECTION HELPER FUNCTION ---
/**
 * Connects to the MongoDB database using the global URI.
 * @returns A connected MongoClient instance.
 */
async function connectToDatabase(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  // The database name 'comments' will be created/selected here.
  const client = await MongoClient.connect(MONGODB_URI);
  return client;
}

// ------------------------------------------------------------------
// 1. POST Request Handler (Creating a New Comment)
// ------------------------------------------------------------------
export async function POST(request: Request, { params }: Params) {
  const eventId = params.commentId;

  // 1. Get the request body
  const { email, name, text } = await request.json();

  // 2. Validation
  if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
    return NextResponse.json(
      { message: 'Invalid input. Please check email, name, and comment text.' },
      { status: 422 } // Status 422: Unprocessable Entity
    );
  }

  // 3. Create the new comment object with the eventId and timestamp
  const newComment = {
    email,
    name,
    text,
    eventId: eventId, // <-- CRUCIAL: Link the comment to the specific event
    createdAt: new Date(), // Add timestamp for sorting
  };

  let client: MongoClient | null = null;
  try {
    client = await connectToDatabase();
    // Select the 'comments' database
    const db = client.db("comments"); 
    
    // Insert the new comment into the 'comments' collection
    const result = await db.collection("comments").insertOne(newComment);
    
    // Return success response, including the MongoDB-generated ID
    return NextResponse.json({
      message: "Success! Comment added.",
      id: result.insertedId.toString(),
      comment: newComment,
    }, { status: 201 });

  } catch (error) {
    console.error("MongoDB POST error:", error);
    // Log the actual error for debugging, but return a safe message to the client
    return NextResponse.json({ message: "Failed to save comment to database." }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// ------------------------------------------------------------------
// 2. GET Request Handler (Fetching All Comments for an Event)
// ------------------------------------------------------------------
export async function GET(request: Request, { params }: Params) {
  const eventId = params.commentId;
  let client: MongoClient | null = null;

  try {
    client = await connectToDatabase();
    const db = client.db("comments");

    // 💡 CRUCIAL FIX: Filter the comments by the eventId from the URL
    // and sort them by the creation date (newest first).
    const comments = await db
      .collection("comments")
      .find({ eventId: eventId }) // Filter by the specific eventId
      .sort({ createdAt: -1 as SortDirection }) // Sort by newest first (-1 is descending)
      .toArray();

    // 4. Send the successful response
    return NextResponse.json({ comments: comments }, { status: 200 });
    
  } catch (error) {
    console.error("MongoDB GET error:", error);
    return NextResponse.json({ message: "Failed to fetch data from database." }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}