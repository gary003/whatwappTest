import { Router, Request, Response } from "express"
import { Club } from "../../services/typeorm/entity/club"
import { User } from "../../services/typeorm/entity/user"
import { createClub, getClub, joinClub, listClubs } from "../../services/typeorm/fetchDB/club"

const clubRouter = Router()

clubRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    const results: Club[] | void = await listClubs().catch((err) => console.log(err))

    if (!results) return res.status(500).json(new Error("Impossible to retreive any club"))

    return res.status(200).json(results)
  })
  .post(async (req: Request, res: Response) => {
    const result: Club | void = await createClub(req.body).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to save the new club"))

    return res.status(200).json(result)
  })

clubRouter
  .route("/:clubId")
  .get(async (req: Request, res: Response) => {
    const result: Club | void = await getClub(req.params.clubId).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to retreive any club"))

    return res.status(200).json(result)
  })
  .put(async (req: Request, res: Response) => {
    const newAdherent: string = req.body.userId
    const clubToJoin: string = req.body.clubId

    if (!newAdherent || !clubToJoin) return res.status(400).json("Invalid data input")

    const result: User | void = await joinClub(newAdherent, clubToJoin).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to retreive any club"))

    return res.status(200).json(result)
  })

export default clubRouter
