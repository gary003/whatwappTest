import { Router, Request, Response } from "express"
import { Club } from "../../services/fetchDB/club/entity"
import { User } from "../../services/fetchDB/user/entity"
import { createClub, getClub, joinClub, listClubs } from "../../services/fetchDB/club/index"

const clubRouter = Router()

clubRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    const results: Club[] | void = await listClubs().catch((err) => console.log(err))

    if (!results) return res.status(500).json("Impossible to retreive any club")

    return res.status(200).json(results)
  })
  .post(async (req: Request, res: Response) => {
    const userId: string = req.body.userId

    const result: Club | void = await createClub(userId).catch((err) => console.log(err))

    if (!result) return res.status(500).json("Impossible to save the new club")

    return res.status(200).json(result)
  })

clubRouter.route("/join").put(async (req: Request, res: Response) => {
  const userId: string = req.body.userId
  const clubId: string = req.body.clubId

  if (!userId || !clubId) return res.status(400).json("Invalid data input")

  const result: User | void = await joinClub(userId, clubId).catch((err) => console.log(err))

  if (!result) return res.status(500).json("Impossible to retreive any club")

  return res.status(200).json(result)
})

clubRouter.route("/:clubId").get(async (req: Request, res: Response) => {
  const result: Club | void = await getClub(req.params.clubId).catch((err) => console.log(err))

  if (!result) return res.status(500).json("Impossible to retreive any club")

  return res.status(200).json(result)
})

export default clubRouter
