require("dotenv").config()

import express from "express"
import userRoute from "./routes/user/index"
import swaggerUi from "swagger-ui-express"
import swaggerJson from "./services/swagger/config"

import logger from "morgan"
import cors from "cors"

const app = express()

app.use("/apiDoc", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== "production") app.use(logger("dev"))

app.use("/api/user", userRoute)

export default app
