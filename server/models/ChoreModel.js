import mongoose from "mongoose";

const ChoreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    compensation: {
      type: Number,
      required: true,
    },

    choreType: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Chore = mongoose.model("Chore", ChoreSchema);

export default Chore;
