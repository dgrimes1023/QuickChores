import express from "express";
import { createChore, getChores, getChoresByUser, searchChores, applyToChore } from "../controllers/choreController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/chores", protect, createChore);
router.get("/chores", getChores);
router.get("/chores/user/:id", protect, getChoresByUser);



router.get("/chores/search", searchChores);


router.put("/chores/apply/:id", protect, applyToChore);

export default router; 