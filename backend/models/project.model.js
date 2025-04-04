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
      type: String, // Stores the latest version of the code
      default: "", // Default empty code when a project is created
    },
    language: {
      type: String, // Stores the programming language
      default: "",
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
