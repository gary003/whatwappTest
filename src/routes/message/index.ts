import { Router, Request, Response } from "express"
import { Message } from "../../services/fetchDB/message/entity"
import { getClubMessages, sendMessage } from "../../services/fetchDB/message/index"

const messageRouter = Router()

messageRouter.route("/").post(async (req: Request, res: Response) => {
  const userId: string = req.body.userId
  const clubId: string = req.body.clubId
  const content: string = req.body.content

  if (!userId || !clubId || !content) return res.status(400).json("Wrong data information")

  const result: Message | void = await sendMessage(userId, clubId, content).catch((err) => console.log(err))

  if (!result) return res.status(500).json("Impossible to save the new message")

  return res.status(200).json(result)
})

messageRouter.route("/:clubId").get(async (req: Request, res: Response) => {
  const results: Message[] | void = await getClubMessages(req.params.clubId).catch((err) => console.log(err))

  if (!results) return res.status(500).json("Impossible to retreive any message")

  return res.status(200).json(results)
})

export default messageRouter
