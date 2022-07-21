require("dotenv").config()

import express from "express"
import userRoute from "./routes/user/index"
import userMessage from "./routes/message/index"
import userClub from "./routes/club/index"
import swaggerUi from "swagger-ui-express"
import swaggerJson from "./services/swagger/config"

import cors from "cors"

const app = express()

app.use("/apiDoc", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/message", userMessage)
app.use("/api/club", userClub)

export default app
