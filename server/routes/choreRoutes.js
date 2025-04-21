import express from "express";
import { createChore, getChores, getChoresByUser, searchChores, applyToChore, likeChore, getChoreById, deleteChore } from "../controllers/choreController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/chores", protect, createChore);
router.get("/chores", getChores);
router.get("/chores/user/:id", protect, getChoresByUser);



router.get("/chores/search", searchChores);


router.put("/chores/apply/:id", protect, applyToChore);

router.put("/chores/like/:id", protect, likeChore);

router.get("/chores/:id", protect, getChoreById);

router.delete("/chores/:id", protect, deleteChore);

export default router; 