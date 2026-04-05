import Project from "../models/project.model.js";
import { validationResult } from "express-validator";
import { customAlphabet } from "nanoid";
import { executeCode } from "../services/codeExecution.service.js";

// Create a new project
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, description = "", language } = req.body;
  const userId = req.user._id;

  try {
    // ✅ Normalize input
    name = name.trim();
    description = description.trim();

    // ✅ Prevent duplicate project names per user
    const existingProject = await Project.findOne({
      name,
      owner: userId,
    });

    if (existingProject) {
      return res.status(409).json({
        message: "You already have a project with this name",
      });
    }

    // ✅ Generate unique joinCode
    let joinCode;
    let isUnique = false;

    while (!isUnique) {
      joinCode = nanoid();
      const exists = await Project.findOne({ joinCode });
      if (!exists) isUnique = true;
    }

    // ✅ Generate callId (can be same generator)
    const callId = nanoid();

    // ✅ Create project
    const newProject = await Project.create({
      name,
      description,
      language,
      owner: userId,
      users: [userId],
      joinCode,
      callId,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Fetch all projects for a specific user
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ users: userId });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found or unauthorized",
      });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join a project using a code
export const joinProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { joinCode } = req.body;
  const userId = req.user._id;

  try {
    const project = await Project.findOne({ joinCode });
    if (!project) {
      return res.status(404).json({ message: "Invalid join code" });
    }

    // Check if the user is already a member of the project
    if (project.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already a member of the project" });
    }

    // Add the user to the project's users array
    project.users.push(userId);
    await project.save();

    res
      .status(200)
      .json({ message: "User joined the project successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveCode = async (req, res) => {
  const { projectId, code } = req.body;
  try {
    let existingProject = await Project.findOne({ _id: projectId });

    if (existingProject) {
      if (existingProject.code !== code) {
        existingProject.code = code;
        existingProject.updatedAt = Date.now();
        await existingProject.save();
        return res
          .status(201)
          .json({ success: true, message: "Code updated successfully" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "No changes detected" });
      }
    }
  } catch (err) {
    console.error("Error saving code:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getCode = async (req, res) => {
  try {
    const { projectId } = req.params;
    const existingProject = await Project.findOne({ _id: projectId });

    if (existingProject) {
      res.json({
        success: true,
        code: existingProject.code,
        language: existingProject.language,
      });
    } else {
      res.json({ success: false, message: "No code found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const runCode = async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        error: "Code and language are required",
      });
    }

    if (!isLanguageSupported(language)) {
      return res.status(400).json({
        error: "Unsupported programming language",
      });
    }

    const result = await executeCode({
      code,
      language,
      stdin: stdin || "",
    });

    if (!result.success) {
      return res.status(400).json({
        error: result.error || "Execution failed",
      });
    }

    return res.json({
      output: result.output || "No output",
      executionTime: result.executionTime,
      memory: result.memory,
    });
  } catch (err) {
    console.error("Execution Error:", err.message);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "cpp",
  "java",
  "go",
];

function isLanguageSupported(language) {
  return SUPPORTED_LANGUAGES.includes(language);
}
