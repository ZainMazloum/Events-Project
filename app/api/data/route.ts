// // old code:
// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";
// import { MongoClient } from "mongodb";
// interface EmailType{
//     id: string;
//     email: string;
// }

// function buildRegisterPath(){
//     return path.join(process.cwd(), "data", "register.json");
// }

// async function extractRegister(): Promise<EmailType[]> {
//   try {
//     const fileData = await fs.readFile(buildRegisterPath(), "utf-8");
//     if (!fileData.trim()) return [];
//     return JSON.parse(fileData);
//   } catch {
//     return [];
//   }
// }

// export async function GET(){
//     const data = await extractRegister();
//     return NextResponse.json({email : data})
// }

// export async function POST(request: Request) {
//     const reqBody: { email: string } = await request.json();
//     const submittedEmail = reqBody.email?.trim() ?? '';

//     if (!submittedEmail || !submittedEmail.includes("@")) {
//         return NextResponse.json({ message: "Invalid input." }, { status: 422 });
//     }

//     const newEmail: EmailType = {
//         id: new Date().toISOString(),
//         email: submittedEmail,
//     };

//     try {
//         const data = await extractRegister();
//         data.push(newEmail);
//         await fs.writeFile(buildRegisterPath(), JSON.stringify(data));
//     } catch (error) {
//         console.error("File write error:", error);
//         return NextResponse.json({ message: "Failed to save data." }, { status: 500 });
//     }
// const client = await MongoClient.connect(
//     "mongodb+srv://ZainMazloum:sese123212@cluster0.0rr2nal.mongodb.net/?appName=Cluster0"
// )
// const db = client.db();
// await db.collection("emails").insertOne({email : userEmail});
// client.close();
//     return NextResponse.json({
//         message: "Success! Email registered.",
//         email: newEmail,
//     }, { status: 201 });
// }
// new code:
import { NextResponse } from "next/server";
import { MongoClient} from "mongodb";
const MONGODB_URI = process.env.MONGODB_URL || "mongodb+srv://ZainMazloum:sese123212@cluster0.0rr2nal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectToDatabase() : Promise<MongoClient> {
    if(!MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not set.")
    }
    const client = await MongoClient.connect(MONGODB_URI);
    return client
}
export async function GET(){
    let client : MongoClient | null = null;
    try{
        client = await connectToDatabase();
        const db = client.db("newsletter_registration")
        const emails = await db.collection("email").find({}).toArray();
        return NextResponse.json({emails : emails});
    }
    catch(error){
        console.error("MongoDB GET error:", error)
        return NextResponse.json({message : "Failed to fetch data from database"})
    }
    finally{
        if(client){
            await client.close()
        }
    }
}
export async function POST(request : Request){
    const reqBody : {email : string} = await request.json();
    const submittedEmail = reqBody.email?.trim() ?? "";
    if(!submittedEmail || !submittedEmail.includes("@")){
        return NextResponse.json({message : "Invalid email format."} , {status : 422})
    }
    const newDocument = {
        email : submittedEmail,
        timestamp : new Date(),
    }
    let client : MongoClient | null = null;
    try {
        client = await connectToDatabase();
        const db = client.db("newsletter_registration");
        const result = await db.collection("emails").insertOne(newDocument);
        return NextResponse.json({
            message : "Success! Email registered.",
            id : result.insertedId.toString(),
            email:submittedEmail,
        } , {status : 201})
    }
    catch(error){
        console.error("MongoDB POST error:", error);
        return NextResponse.json({message : "Failed to save email to database."} , {status : 500})
    }
    finally{
        if(client){
            await client.close();
        }
    }
}