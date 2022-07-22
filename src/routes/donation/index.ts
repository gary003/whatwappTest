import { Router, Request, Response } from "express"
import { Donation } from "../../services/fetchDB/donation/entity"
import { makeDonation, listDonationRequests, createDonation } from "../../services/fetchDB/donation/index"

const donationRouter = Router()

donationRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    const results: Donation[] | void = await listDonationRequests().catch((err) => console.log(err))

    if (!results) return res.status(500).json("Impossible to retreive any donations")

    return res.status(200).json(results)
  })
  .post(async (req: Request, res: Response) => {
    const userId: string = req.body.userId
    const fundingGoal: number = req.body.fundingGoal

    // console.log({ userId, fundingGoal }, req.body)

    if (!userId || !fundingGoal) return res.status(400).json("Wrong data information userId and fundingGoal must be define with a fundingGoal > 0)")

    const result: Donation | void = await createDonation(userId, fundingGoal).catch((err) => console.log(err))

    if (!result) return res.status(500).json("Impossible to create the new donation")

    return res.status(200).json(result)
  })

donationRouter.route("/makeDonation").post(async (req: Request, res: Response) => {
  const donationId: string = req.body.donationId
  const userId: string = req.body.userId
  const amount: number = req.body.amount

  if (!donationId || !userId || !amount) return res.status(400).json("Wrong data information")

  const result: Donation | void = await makeDonation(donationId, userId, amount).catch((err) => console.log(err))

  if (!result) return res.status(500).json("Impossible to make a new donation")

  return res.status(200).json(result)
})

export default donationRouter
