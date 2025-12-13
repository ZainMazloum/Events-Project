import { NextRequest, NextResponse } from "next/server";
import { MongoClient, SortDirection, ObjectId } from "mongodb";

// --- Type Definitions ---
// Define the structure of the data expected from MongoDB
interface CommentDocument {
    _id: ObjectId; 
    email: string;
    name: string;
    text: string;
    eventId: string;
    createdAt: string; // ISO date string
}

// Define the structure of the response sent to the client
interface CommentResponse {
    _id: string; // String version of ObjectId
    email: string;
    name: string;
    text: string;
    eventId: string;
    createdAt: string;
}

// --- Database Connection ---

const MONGODB_URL = process.env.MONGODB_URL as string;

async function connectToDatabase() {
    if (!MONGODB_URL) throw new Error("MongoDB connection string is missing");
    const client = await MongoClient.connect(MONGODB_URL);
    return client;
}

// --- API Route Handlers ---

// GET handler: Fetches all comments for a specific eventId
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ commentId: string }> }
): Promise<Response> {
    const { commentId } = await context.params;
    let client: MongoClient | null = null;

    try {
        client = await connectToDatabase();
        const db = client.db();

        // Fetch comments and sort by newest first
        const comments = (await db
            .collection("comments")
            .find({ eventId: commentId })
            .sort({ createdAt: -1 as SortDirection })
            .toArray()) as CommentDocument[];

        // Map comments to plain JSON objects with string IDs
        const responseData: CommentResponse[] = comments.map(comment => ({
            _id: comment._id.toString(),
            email: comment.email,
            name: comment.name,
            text: comment.text,
            eventId: comment.eventId,
            createdAt: comment.createdAt
        }));

        return NextResponse.json({ comments: responseData }, { status: 200 });

    } catch (error) {
        console.error("Error in GET handler:", error);
        return NextResponse.json({ message: "Failed to fetch comments." }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}

// POST handler: Adds a new comment
export async function POST(
    request: NextRequest,
    // 💡 FINAL FIX ATTEMPT: Using the literal type directly
    context: { params: Promise<{ commentId: string }> }
): Promise<Response> {
    const { commentId } = await context.params;
    
    // Validate request body
    const body = await request.json();
    const { email, name, text } = body;

    if (!email || !email.includes("@") || !name || name.trim() === '' || !text || text.trim() === '') {
        return NextResponse.json({ message: "Invalid input." }, { status: 422 });
    }

    const newComment = { 
        email, 
        name, 
        text, 
        eventId: commentId, 
        createdAt: new Date().toISOString() 
    };

    let client: MongoClient | null = null;
    try {
        client = await connectToDatabase();
        const db = client.db();
        
        const result = await db.collection("comments").insertOne(newComment);
        
        // Return the added comment with its new ID
        const addedComment: CommentResponse = {
            ...newComment, 
            _id: result.insertedId.toString()
        };

        return NextResponse.json({
            message: "Comment added.",
            comment: addedComment
        }, { status: 201 });
        
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ message: "Failed to add comment." }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}