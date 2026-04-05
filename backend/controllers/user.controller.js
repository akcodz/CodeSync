import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { upsertStreamUser } from "../utils/stream.js";

// Register a new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = newUser.createToken();

    const user = newUser.toObject();
    delete user.password;

    await upsertStreamUser({
      id: user._id.toString(),
      name: newUser.username,
    })

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = user.createToken();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    await upsertStreamUser({
      id: userWithoutPassword._id.toString(),
      name: userWithoutPassword.username,
    })

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};