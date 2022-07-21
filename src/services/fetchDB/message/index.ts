import { connectionTypeORM } from "../connectionFile"
import { Message } from "./entity"
import { v4 as uuidv4 } from "uuid"
import { User } from "../user/entity"
import { Club } from "../club/entity"

export const sendMessage = async (senderUserId: string, recipientClubId: string, messageToSend: string): Promise<Message> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const isValidUser: User | void = await connection
    .getRepository(User)
    .findOne({ userId: senderUserId })
    .catch((err) => console.log(err))

  if (!isValidUser) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("this user does not exist in DB")
  }
  const isValidClub: Club | void = await connection
    .getRepository(Club)
    .findOne({ clubId: recipientClubId })
    .catch((err) => console.log(err))

  if (!isValidClub) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("this club does not exist in DB")
  }

  const newMessage: Message = new Message()
  newMessage.messageId = uuidv4()
  newMessage.senderId = senderUserId
  newMessage.clubId = recipientClubId
  newMessage.content = messageToSend

  const messageSaved = await connection
    .getRepository(Message)
    .save(newMessage)
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!messageSaved) throw new Error("impossible to save new message")

  return newMessage
}

export const getClubMessages = async (clubId: string): Promise<Message[]> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const isValidClub: Club | void = await connection
    .getRepository(Club)
    .findOne({ clubId })
    .catch((err) => console.log(err))

  if (!isValidClub) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("this club does not exist in DB")
  }

  const clubMessages: Message[] | void = await connection
    .getRepository(Message)
    .find({ clubId })
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!clubMessages) throw new Error("impossible to retreive any messages")

  return clubMessages
}
