require("dotenv").config()

import express from "express"
import userRoute from "./routes/user/index"
import messageRoute from "./routes/message/index"
import clubRoute from "./routes/club/index"
import donationRoute from "./routes/donation/index"

import swaggerUi from "swagger-ui-express"
import swaggerJson from "./services/swagger/config"

import cors from "cors"

const app = express()

app.use("/apiDoc", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)
app.use("/api/club", clubRoute)
app.use("/api/donation", donationRoute)

export default app
