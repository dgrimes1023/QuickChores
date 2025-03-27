/**
 * QuickChores Server
 * 
 * This is the main server file that sets up an Express application with Auth0 authentication,
 * CORS support, and dynamic route loading. It provides the backend API for the QuickChores
 * application.
 */

// Import required packages
import express from "express";             // Web server framework
import { auth } from "express-openid-connect"; // Auth0 authentication middleware
import dotenv from "dotenv";               // Environment variable loader
import cookieParser from "cookie-parser";  // Parse cookies from request headers
import cors from "cors";                   // Cross-Origin Resource Sharing middleware
import connect from "./db/connect.js";     // Database connection function
import asyncHandler from "express-async-handler";
import fs from "fs";                       // File system module for reading route files
import User from "./models/UserModel.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

/**
 * Auth0 Configuration
 * 
 * Sets up authentication parameters for the Auth0 service.
 * This includes settings for authentication requirements, logout behavior,
 * and necessary Auth0 credentials from environment variables.
 */
const config = {
    authRequired: false,  // Not all routes require authentication
    auth0Logout: true,    // Enable Auth0 logout functionality
    secret: process.env.SECRET,            // Secret key for session cookie signing
    baseURL: process.env.BASE_URL,         // Base URL of the application (for callbacks)
    clientID: process.env.CLIENT_ID,       // Auth0 application client ID
    issuerBaseURL: process.env.ISSUER_BASE_URL // Auth0 domain URL
};

/**
 * Middleware Configuration
 * 
 * Sets up various middleware functions to handle:
 * - CORS (Cross-Origin Resource Sharing)
 * - Request body parsing
 * - Cookie parsing
 * - Authentication
 */

// Configure CORS middleware to restrict API access
app.use(cors({
    origin: process.env.CLIENT_URL,  // Only allow requests from our frontend
    credentials: true                // Allow cookies and authentication headers
}));

// Body parsing middleware setup
app.use(express.json());                      // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser());                      // Parse cookies

// Set up Auth0 authentication middleware
app.use(auth(config));

// function to check if user exists in the database
const ensureUserInDB = asyncHandler(async(user) => {
    try {
        const existingUser = await User.findOne({auth0Id:user.sub});

        if(!existingUser){

            // create a new user document
            const newUser = new User({
                auth0Id: user.sub,
                email: user.email,
                name: user.name,
                role: "choreWorker",
                profilePicture: user.profilePicture,
            });

            await newUser.save();

            console.log("User added to database: ", user);
        }
        else{
            console.log("User already exists in database: ", existingUser);
        }
    } catch (error) {
        console.log("Error checking or adding user to database: ", error.message)
    }
})

app.get("/", async (req, res) => {
    if (req.oidc.isAuthenticated()) {
        //check if Auth0 user exists in the database
        await ensureUserInDB(req.oidc.user);

        // redirect to the frontend 
        return res.redirect(process.env.CLIENT_URL);
    }
    else{
        return res.send("Logged out");
    }
})

/**
 * Dynamic Route Loading
 * 
 * Automatically loads all route files from the routes directory.
 * This allows for modular route organization and easier route management.
 */
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
    // Import and register each route module
    import(`./routes/${file}`).then((route) => {
        app.use("/api/v1/", route.default);
    }).catch((error) => {
        console.log("Error importing route: ", error.message);
    })
});

/**
 * Server Startup Function
 * 
 * Initializes the database connection and starts the Express server.
 * Handles any startup errors that might occur during this process.
 */
const server = async () => {
    try {
        // Connect to the database
        await connect();
        
        // Start the server on the specified port
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        // Handle any server startup errors
        console.log("Server error: ", error.message);
        process.exit(1); // Exit the process with an error code
    }
};

// Start the server
server();