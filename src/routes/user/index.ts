import { Router, Request, Response } from "express"
import { User } from "../../services/typeorm/entity/user"
import { deleteUserById, getAllUsers, getUserById, saveNewUser } from "../../services/typeorm/fetchDB/user"

const userRouter = Router()

userRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    const results: User[] | void = await getAllUsers().catch((err) => console.log(err))

    if (!results) return res.status(500).json(new Error("Impossible to retreive any user"))

    return res.status(200).json(results)
  })
  .post(async (req: Request, res: Response) => {
    const result: User | void = await saveNewUser(req.body).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to save the new user"))

    return res.status(200).json(result)
  })

userRouter
  .route("/:userId")
  .get(async (req: Request, res: Response) => {
    const result: User | void = await getUserById(Number(req.params.userId)).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to retreive any user"))

    return res.status(200).json(result)
  })
  .delete(async (req: Request, res: Response) => {
    const result: User | void = await deleteUserById(Number(req.params.userId)).catch((err) => console.log(err))

    if (!result) return res.status(500).json(new Error("Impossible to update delete_at for the user"))

    return res.status(200).json(result)
  })

export default userRouter
