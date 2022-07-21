import { connectionTypeORM } from "../connectionFile"
import { User } from "../user/entity"
import { Wallet } from "../wallet/entity"
import { Club } from "./entity"
import { v4 as uuidv4 } from "uuid"

export const createClub = async (userId: string): Promise<Club> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const creatorUser: any = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallet, "wallets", "wallets.walletId = user.walletId")
    .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  if (!creatorUser) throw new Error("Impossible to find the user for club creation")

  const clubCreationCost: number = 50

  if (creatorUser.wallet.hard_currency < clubCreationCost) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("not enough funds to create club")
  }

  const newClub: Club = new Club()
  newClub.clubId = uuidv4()

  const resultNewClub: Club | void = await connection
    .getRepository(Club)
    .save(newClub)
    .catch((err) => console.log(err))

  if (!resultNewClub) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("Impossible to create a new club")
  }

  const userNewFunds: number = creatorUser.wallet.hard_currency - clubCreationCost

  const walletToUpdate: Wallet = await connection.getRepository(Wallet).findOne(creatorUser.walletId)

  const updateUserWallet: Wallet = connection.getRepository(Wallet).merge(walletToUpdate, { hard_currency: userNewFunds })

  const resultUpdate: Wallet | void = await connection
    .getRepository(Wallet)
    .save(updateUserWallet)
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!resultUpdate) console.error("Warning the user wallet hasn't been updated")

  return resultNewClub
}

export const joinClub = async (userId: string, clubId: string): Promise<User> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const clubToJoin: Club | void = await connection
    .getRepository(Club)
    .findOne({ clubId })
    .catch((err) => console.log(err))

  if (!clubToJoin) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("This club doesn't exists")
  }

  const clubMembers = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.clubId = :clubId", { clubId })
    .getMany()
    .catch((err) => console.log(err))

  if (!clubMembers) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("Impossible to retreive member")
  }

  const maxMember: number = 50

  if (clubMembers.length > maxMember) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("The club is already at max capacity")
  }

  const newClubUser: any = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallet, "wallet", "wallet.walletId = user.walletId")
    .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  if (!newClubUser) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("Impossible to find the user for club affiliation")
  }
  if (newClubUser.wallet.soft_currency < 100) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("Not enough funds to join the club")
  }

  const userToUpdate: User = await connection.getRepository(User).findOne(newClubUser.userId)

  const newMember: User = connection.getRepository(User).merge(userToUpdate, { clubId })

  const resultUpdate: User | void = await connection
    .getRepository(User)
    .save(newMember)
    .catch((err) => console.log(err))

  if (!resultUpdate) {
    await connection.close().catch((err) => console.log(err))
    throw new Error("Impossible to add the new user to the club")
  }

  const clubAffiliationCost = 100

  const userNewFunds: number = newClubUser.wallet.soft_currency - clubAffiliationCost

  const walletToUpdate: Wallet = await connection.getRepository(Wallet).findOne(newClubUser.walletId)

  const updateUserWallet: Wallet = connection.getRepository(Wallet).merge(walletToUpdate, { soft_currency: userNewFunds })

  const resultWalletUpdate: Wallet | void = await connection
    .getRepository(Wallet)
    .save(updateUserWallet)
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!resultWalletUpdate) console.error("Warning the user wallet hasn't been updated")

  return newMember
}

export const listClubs = async (): Promise<Club[]> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const allClubs: Club[] | void = await connection
    .getRepository(Club)
    .find()
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!allClubs) throw new Error("Impossible to list the clubs")

  return allClubs
}

export const getClub = async (clubId: string): Promise<Club> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const club: Club | void = await connection
    .getRepository(Club)
    .findOne({ clubId })
    .catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!club) throw new Error("Impossible to list the requested club")

  return club
}
