import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Chore from "../models/ChoreModel.js";

export const createChore = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      title,
      description,
      location,
      compensation,
      choreType,
      tags,
      skills,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    if (!compensation) {
      return res.status(400).json({
        message: "Compensation is required",
      });
    }

    if (!choreType) {
      return res.status(400).json({
        message: "Chore type is required",
      });
    }

    if (!tags) {
      return res.status(400).json({
        message: "Tags are required",
      });
    }

    if (!skills) {
      return res.status(400).json({
        message: "Skills are required",
      });
    }

    const chore = new Chore({
      title,
      description,
      location,
      compensation,
      choreType,
      tags,
      skills,
      createdBy: user._id,
    });

    await chore.save();

    return res.status(201).json(chore);
  } catch (error) {
    console.log("Error in createChore: ", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const getChores = asyncHandler(async (req, res) => {
  try {
    const chores = await Chore.find({})
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 }); // Sort by most recent

    return res.status(200).json(chores);
  } catch (error) {
    console.log("Error in getChores: ", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const getChoresByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const chores = await Chore.find({ createdBy: user._id }).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(chores);
  } catch (error) {
    console.log("Error in getChoresByUser: ", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export const searchChores = asyncHandler(async (req, res) => {
  try {
    const { tags, location, title } = req.query;

    let query = {};

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const chores = await Chore.find(query).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(chores);
  } catch (error) {
    console.log("Error in searchChores: ", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


export const applyToChore = asyncHandler(async (req, res) => {
  try{
    const chore = await Chore.findById(req.params.id);

    if(!chore){
      return res.status(404).json({
        message: "Chore not found"
      });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if(!user){
      return res.status(401).json({
        message: "User not found"
      });
    }

    if(chore.applicants.includes(user._id)){
      return res.status(400).json({
        message: "You have already applied for this chore!"
      });
    }

    chore.applicants.push(user._id);

    await chore.save();

    return res.status(200).json(chore);

  } catch (error) { 
    console.log("Error in applyToChore: ", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}); 