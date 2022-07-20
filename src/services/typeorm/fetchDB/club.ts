// CreateClub: the user can create a Club, which is a group of users. Every club has a maximum number of members (default: 50). When creating a club, the user spends 50 hard_currency;
// JoinClub: the user can join an existing club by sending the club id. If the maximum number of members is already reached an error must be returned to the user. When successfully joining a club the user spends 100 soft_currency
// ListClubs: it returns a list of existing clubs
// GetClub: given the club id, it returns the details of a single club
// SendMessage: the user can send a message to its club
// GetClubMessages: it returns the list of messages shared in the club

import { connectionTypeORM } from "../connectionFile"
import { User } from "../entity/user"
import { Wallets } from "../entity/wallets"
import { Club } from "../entity/club"
import { v4 as uuidv4 } from "uuid"

export const createClub = async (userId: string): Promise<Club> => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const creatorUser: any = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallets, "wallets", "wallets.walletId = user.walletId")
    .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  if (!creatorUser) throw new Error("Impossible to find the user for club creation")

  const clubCreationCost: number = 50
  const maxAdherent: number = 50

  if (creatorUser.wallet.hard_currency < clubCreationCost) throw new Error("not enough funds to create club")

  const newClub: Club = new Club()
  newClub.clubId = uuidv4()
  newClub.maxUserNum = maxAdherent

  const resultNewClub: Club | void = await connection
    .getRepository(Club)
    .save(newClub)
    .catch((err) => console.log(err))

  if (!resultNewClub) throw new Error("Impossible to create a new club")

  const userNewFunds: number = creatorUser.wallet.hard_currency - clubCreationCost

  const walletToUpdate: Wallets = await connection.getRepository(Wallets).findOne(creatorUser.walletId)

  const updateUserWallet: Wallets = connection.getRepository(Wallets).merge(walletToUpdate, { hard_currency: userNewFunds })

  const resultUpdate: Wallets | void = await connection
    .getRepository(Wallets)
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

  if (!clubToJoin) throw new Error("This club doesn't exists")

  const newClubUser: any = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallets, "wallets", "wallets.walletId = user.walletId")
    .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  if (!newClubUser) throw new Error("Impossible to find the user for club affiliation")
  if (newClubUser.wallet.soft_currency < 100) throw new Error("Not enough funds to join the club")

  const userToUpdate: User = await connection.getRepository(User).findOne(newClubUser.userId)

  const newMember: User = connection.getRepository(User).merge(userToUpdate, { clubId })

  const resultUpdate: User | void = await connection
    .getRepository(User)
    .save(newMember)
    .catch((err) => console.log(err))

  if (!resultUpdate) throw new Error("Impossible to add the new user to the club")

  const clubAffiliationCost = 100

  const userNewFunds: number = newClubUser.wallet.soft_currency - clubAffiliationCost

  const walletToUpdate: Wallets = await connection.getRepository(Wallets).findOne(newClubUser.walletId)

  const updateUserWallet: Wallets = connection.getRepository(Wallets).merge(walletToUpdate, { soft_currency: userNewFunds })

  const resultWalletUpdate: Wallets | void = await connection
    .getRepository(Wallets)
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
