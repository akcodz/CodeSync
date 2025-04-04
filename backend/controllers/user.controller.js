import User from "../models/user.model.js"
import { validationResult } from "express-validator"

// Register a new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await User.hashPassword(password)
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = newUser.createToken()
    const user = newUser.toObject()
    delete user.password

    res.status(201).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login a user
export const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = user.createToken()
    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password

    res.status(200).json({ token, user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

