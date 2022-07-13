require("dotenv").config()

import * as http from "http"
import app from "../app"

const port = process.env.API_PORT || 8888

const server = http.createServer(app)

server.on("error", (error) => {
  console.log(error)
  process.exit(1)
})

server.on("listening", () => {
  console.log(`listen on ${port}`)
})

server.listen(port)
