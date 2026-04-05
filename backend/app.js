import { config } from "dotenv"
config()
import express from "express"
import cors from "cors"
import connectDb from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js"
import aiRoutes from "./routes/ai.routes.js"
import chatRoutes from "./routes/chat.routes.js"

const app = express()
connectDb()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world")
})

app.use('/users',userRoutes)
app.use('/projects',projectRoutes)
app.use('/chats',chatRoutes)
app.use('/ai',aiRoutes)

export default app

