import User from "../models/user.model.js"
import { validationResult } from "express-validator"

// Register a new user
export const registerUser = async (req, res) => {
  console.log("📥 REGISTER REQUEST RECEIVED")
  console.log("➡️ Request body:", req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array())
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body
  console.log("🔍 Extracted fields:", { username, email, passwordPresent: !!password })

  try {
    console.log("🔎 Checking if user exists...")
    const existingUser = await User.findOne({ email })
    console.log("📄 existingUser:", existingUser)

    if (existingUser) {
      console.log("⚠️ User already exists:", email)
      return res.status(400).json({ message: "User already exists" })
    }

    console.log("🔐 Hashing password...")
    const hashedPassword = await User.hashPassword(password)
    console.log("🔐 Hashed password generated.")

    console.log("📝 Creating new user...")
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    console.log("✅ User created:", newUser._id)

    console.log("🔑 Creating JWT token...")
    const token = newUser.createToken()

    const user = newUser.toObject()
    delete user.password
    console.log("📤 Returning response for new user:", user._id)

    res.status(201).json({ token, user })
  } catch (error) {
    console.error("💥 REGISTER ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}

// Login a user
export const loginUser = async (req, res) => {
  console.log("📥 LOGIN REQUEST RECEIVED")
  console.log("➡️ Request body:", req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array())
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  console.log("🔍 Extracted fields:", { email, passwordPresent: !!password })

  try {
    console.log("🔎 Searching for user...")
    const user = await User.findOne({ email }).select("+password")
    console.log("📄 User found? ", !!user)

    if (!user) {
      console.log("⚠️ Invalid email during login:", email)
      return res.status(400).json({ message: "Invalid email or password" })
    }

    console.log("🔐 Validating password...")
    const isPasswordValid = await user.comparePassword(password)
    console.log("🔐 Password valid:", isPasswordValid)

    if (!isPasswordValid) {
      console.log("⚠️ Incorrect password for user:", email)
      return res.status(400).json({ message: "Invalid email or password" })
    }

    console.log("🔑 Generating JWT token...")
    const token = user.createToken()

    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password
    console.log("📤 Login success user:", user._id)

    res.status(200).json({ token, user: userWithoutPassword })
  } catch (error) {
    console.error("💥 LOGIN ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}
