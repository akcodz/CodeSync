import express from "express";
import { check } from "express-validator";
import { 
  createProject, 
  getUserProjects, 
  deleteProject, 
  joinProject, 
  saveCode, 
  getCode, 
  runCode
} from "../controllers/project.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new project
router.post(
  "/create",
  authMiddleware,
  [check("name", "Project name is required").trim().not().isEmpty()],
  createProject
);

// Route to fetch all projects for a specific user
router.get("/user-projects", authMiddleware, getUserProjects);

// Route to delete a project by ID
router.delete(
  "/:id",
  authMiddleware,
  [check("id", "Project ID is required and must be a valid MongoDB ID").isMongoId()],
  deleteProject
);

// Route to join a project using a code
router.post(
  "/join",
  authMiddleware,
  [check("joinCode", "Join code is required").trim().not().isEmpty()],
  joinProject
);

// Route to save code (Validating required fields)
router.post(
  "/save-code/:id",
  authMiddleware,
  [
    check("projectId", "Project ID is required and must be a valid MongoDB ID").isMongoId(),
    check("code", "Code cannot be empty").trim().not().isEmpty(),
    check("language", "Language is required").trim().not().isEmpty(),
  ],
  saveCode
);

// Route to fetch saved code (Validating projectId)
router.get(
  "/get-code/:id",
  authMiddleware,
  [check("projectId", "Project ID is required and must be a valid MongoDB ID").isMongoId()],
  getCode
);
router.post(
  "/run-code",
  authMiddleware,
  runCode
);

export default router;
