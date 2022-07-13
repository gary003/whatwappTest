import { createConnection } from "typeorm"
import { v4 as uuidv4 } from "uuid"

export const connectionTypeORM = async () => {
  const connectionData = JSON.stringify({
    name: uuidv4(),
    type: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [__dirname + "/entity/*.*s"],
    synchronize: false,
  })

  const connection = await createConnection(JSON.parse(connectionData)).catch((err) => console.log(err))

  if (!connection || !connection.isConnected) throw new Error("Impossible to connect to DB")

  return connection
}
