import Project from "../models/project.model.js"
import axios from "axios";
import { validationResult } from "express-validator"
import { customAlphabet } from "nanoid"

// Create a new project
export const createProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, description = "" ,language} = req.body
  const userId = req.user._id
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5)
  const joinCode = nanoid() // Generate a 5-character join code

  try {
    const newProject = await Project.create({ name, description,language, users: [userId], joinCode })
    res.status(201).json({ project: newProject })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch all projects for a specific user
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id
    const projects = await Project.find({ users: userId })
    res.status(200).json({ projects })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a project by ID
export const deleteProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  try {
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    res.status(200).json({ message: "Project deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Join a project using a code
export const joinProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { joinCode } = req.body
  const userId = req.user._id

  try {
    const project = await Project.findOne({ joinCode })
    if (!project) {
      return res.status(404).json({ message: "Invalid join code" })
    }

    // Check if the user is already a member of the project
    if (project.users.includes(userId)) {
      return res.status(400).json({ message: "User already a member of the project" })
    }

    // Add the user to the project's users array
    project.users.push(userId)
    await project.save()

    res.status(200).json({ message: "User joined the project successfully", project })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const saveCode = async (req, res) => {
  const { projectId, code } = req.body;
  try {
    let existingProject = await Project.findOne({_id: projectId });

    if (existingProject) {
      if (existingProject.code !== code) {
        existingProject.code = code;
        existingProject.updatedAt = Date.now();
        await existingProject.save();
        return res.status(201).json({ success: true, message: "Code updated successfully" });
      } else {
        return res.status(200).json({ success: true, message: "No changes detected" });
      }
    } 
    }
  catch (err) {
    console.error("Error saving code:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};


export const getCode =async (req, res) => {
  try {
    const { projectId } = req.params;
    const existingProject = await Project.findOne({_id: projectId });

    if (existingProject) {

      res.json({ success: true, code: existingProject.code, language: existingProject.language });
    } else {
      res.json({ success: false, message: "No code found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}



const getPistonRuntimes = async () => {
  const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
  return response.data;
};

const getLatestVersion = (runtimes, language) => {
  const runtime = runtimes.find(rt => rt.language === language.toLowerCase());
  return runtime ? runtime.version : "latest";
};

export const runCode = async (req, res) => {
  const { code, language, input = "", args = [] } = req.body;
  try {
    const runtimes = await getPistonRuntimes();
    const version = getLatestVersion(runtimes, language);

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version,
      files: [{ name: "main", content: code }],
      stdin: input,
      args: args,
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });

    const output = response.data.run.output || "No output";
    res.json({ success: true, output });
  } catch (err) {
    console.error("Error executing code:", err.message || err);
    res.status(500).json({ success: false, error: "Execution error" });
  }
};

