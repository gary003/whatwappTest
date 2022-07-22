import { connectionTypeORM } from "../connectionFile"
import { User } from "../user/entity"
import { Wallet } from "../wallet/entity"
import { Donation } from "./entity"
import { v4 as uuidv4 } from "uuid"

export const createDonation = async (recipientId: string, fundingGoal: number): Promise<Donation> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const newDonation: Donation = new Donation()
  newDonation.donationId = uuidv4()
  newDonation.recipientId = recipientId
  newDonation.fundingGoal = fundingGoal

  const newDonationSave: Donation | void = await connection
    .getRepository(Donation)
    .save(newDonation)
    .catch((err) => console.log(err))

  await connection.close()

  if (!newDonationSave) {
    throw new Error("Impossible to save the new Donation in DB")
  }

  return newDonationSave
}

export const makeDonation = async (donationId: string, giverId: string, amount: number): Promise<Donation> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const donationInfo: Donation | void = await connection
    .getRepository(Donation)
    .findOne({ donationId })
    .catch((err) => console.log(err))

  if (!donationInfo) {
    await connection.close()
    throw new Error("impossible to found the requested donation")
  }

  const donationRecipientInfo = await connection
    .getRepository(User)
    .findOne({ userId: donationInfo.recipientId })
    .catch((err) => console.log(err))

  if (!donationRecipientInfo) {
    await connection.close()
    throw new Error("impossible to found the requested donation")
  }

  const giverInfo: any = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallet, "wallets", "wallets.walletId = user.walletId")
    .where("user.userId = :userId", { userId: giverId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  if (!giverInfo) {
    await connection.close()
    throw new Error("impossible to found the giver informations")
  }

  if (donationRecipientInfo.clubId === null || donationRecipientInfo.clubId !== giverInfo.clubId) {
    await connection.close()
    throw new Error("Donation recipients and givers must be from the same club to fund a donation (and not null)")
  }

  if (giverInfo.wallet.soft_currency < amount) {
    await connection.close()
    throw new Error("The giver does not have enough funds")
  }

  const walletToUpdate = await connection.getRepository(Wallet).findOne({ walletId: giverInfo.wallet.walletId })

  const updatedUserWallet: Wallet = connection.getRepository(Wallet).merge(walletToUpdate, { soft_currency: walletToUpdate.soft_currency - amount })

  const resultWalletUpdate: Wallet | void = await connection
    .getRepository(Wallet)
    .save(updatedUserWallet)
    .catch((err) => console.log(err))

  if (!resultWalletUpdate) {
    await connection.close()
    throw new Error("Impossible to fund the donation DB error")
  }

  const updatedDonationRequest: Donation = connection.getRepository(Donation).merge(donationInfo, { currentFund: donationInfo.currentFund + amount })

  const resultDonationUpdate: Donation | void = await connection
    .getRepository(Donation)
    .save(updatedDonationRequest)
    .catch((err) => console.log(err))

  if (!resultDonationUpdate) {
    await connection.close()
    throw new Error("Impossible to add the funds the donation request - DB error")
  }

  if (donationInfo.currentFund >= donationInfo.fundingGoal) {
    const deletedDonationRequest: Donation = await connection.getRepository(Donation).remove(donationInfo)

    if (!deletedDonationRequest) {
      await connection.close()
      throw new Error("Impossible to delete the donation request - DB error")
    }

    const recipientDonationWallet = await connection
      .getRepository(Wallet)
      .findOne({ walletId: donationRecipientInfo.walletId })
      .catch((err) => console.log(err))

    if (!recipientDonationWallet) {
      await connection.close()
      throw new Error("Impossible to found the recipient of the donation")
    }

    const resultFinalFunds = await connection.getRepository(Wallet).merge(recipientDonationWallet, { soft_currency: recipientDonationWallet.soft_currency + deletedDonationRequest.currentFund })

    const transferFunds = await connection
      .getRepository(Wallet)
      .save(resultFinalFunds)
      .catch((err) => console.log(err))

    if (!transferFunds) {
      await connection.close()
      throw new Error("Impossible to transfer the funds for the donation")
    }
  }

  // console.log({ donationInfo, giverInfo, donationRecipientInfo })

  await connection.close()

  return updatedDonationRequest
}

export const listDonationRequests = async (): Promise<Donation[]> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const allDonations = await connection
    .getRepository(Donation)
    .find()
    .catch((err) => console.log(err))

  await connection.close()

  if (!allDonations) throw new Error("Impossible to list the donations")

  return allDonations
}
