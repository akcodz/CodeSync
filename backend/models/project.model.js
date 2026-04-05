import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    joinCode: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String, 
      default: "", 
    },
    language: {
      type: String, 
      default: "",
    },

    callId: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
