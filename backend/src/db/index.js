import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URI;
// console.log(process.env.MONGODB_URL, "here is mongo db url");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectMongoDB = async () => {
    if (!MONGODB_URL) {
        // console.error("CRITICAL ERROR: MONGODB_URL environment variable is undefined!");
        throw new Error("MONGODB_URL environment variable is missing on the server environment.");
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL);
    }

    cached.conn = await cached.promise;
    // console.log(cached.conn, "connection created ");
    return cached.conn;
};