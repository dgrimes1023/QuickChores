// Import the Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using the provided URI
 * from environment variables. This function is called when the server starts.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * @throws {Error} If the connection fails, the process will exit with code 1
 */
const connect = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Connected to database!");
    } catch (error) {
        // Log any connection errors and exit the process
        console.log("Database error: ", error.message);
        process.exit(1);
    }
}

export default connect;