import { NextResponse } from "next/server";
import { MongoClient , SortDirection } from "mongodb";
interface ParamsType{
    commentId : string;
}
const MONGODB_URL = process.env.MONGODB_URL as string;
async function connectToDatabase(){
    if(!MONGODB_URL){
        throw new Error("MongoDB connection string is not defined in environment variables.");
    }
    const client = await MongoClient.connect(MONGODB_URL);
    return client;
}
export async function POST(request: Request , {params} : {params : ParamsType}){
    const { commentId } = params.commentId ? params : { commentId: "" };
    const {email , name , text} = await request.json();
    if(!email || !email.includes("@") || !name || name.trim() === "" || !text || text.trim() === ""){
        return NextResponse.json({message : "Invalid input."} , {status : 422});
    }
    const newComment = {
        email,
        name,
        text,
        eventId : commentId ,
        createdAt : new Date().toISOString()
    }
    let client : MongoClient | null = null;
    try{
        client = await connectToDatabase();
        const db = client.db();
        const result = await db.collection("comments").insertOne(newComment);
        return NextResponse.json({message : "Comment added." , comment : {...newComment , id : result.insertedId}} , {status : 201});
    }
    catch(error){
        console.error("Failed to insert comment:", error);
        return NextResponse.json({message : "Inserting comment failed."} , {status : 500});
    }
    finally{
        if(client){
            await client.close();
        }
    }
}
export async function GET(request : Request , {params} : {params : ParamsType}){
    const { commentId } = params.commentId ? params : { commentId: "" };
    let client : MongoClient | null = null;
    try{
        client = await connectToDatabase();
        const db = client.db();
        const comments = await db.collection("comments").find({eventId : commentId}).sort({createdAt : -1 as SortDirection}).toArray();
        return NextResponse.json(comments , {status : 200});
    }
    catch(error){
        console.error("Failed to fetch comments:", error);
        return NextResponse.json({message : "Fetching comments failed."} , {status : 500});
    }
    finally{
        if(client){
            await client.close();
        }
    }
}