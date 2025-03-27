import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

/**
 * Route to check user authentication status
 * GET /check-auth
 * 
 * This endpoint verifies if a user is currently authenticated through Auth0.
 * It returns the authentication status and user information if authenticated,
 * or false if not authenticated.
 * 
 * @returns {Object} JSON response containing authentication status and user info
 */
router.get("/check-auth", (req, res) => {
    if (req.oidc.isAuthenticated()) {
        // Return authentication status and user info if authenticated
        return res.status(200).json({
            isAuthenticated: true,
            user: req.oidc.user,
        });
    } else {
        // Return false if user is not authenticated
        return res.status(200).json(false);
    }
});

router.get("/user/:id", getUserProfile);

export default router;