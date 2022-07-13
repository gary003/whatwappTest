import { User } from "../entity/user"
import { v4 as uuidv4 } from "uuid"
import { connectionTypeORM } from "../connectionFile"
import { Wallets } from "../entity/wallets"

export const getAllUsers = async () => {
  const connection = await connectionTypeORM().catch((err) => console.error(""))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const results: User[] | void = await UserRepository.createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallets, "wallet", "wallet.userId = user.userId")
    .getMany()
    .catch((err) => console.log(err.sqlMessage))

  await connection.close().catch((err) => console.log(err))

  if (!results) throw new Error("Impossible to retreive any user")

  return results
}

export const getUserById = async (userId: string) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.createQueryBuilder("user")
    .innerJoinAndMapOne("user.wallet", Wallets, "wallet", "wallet.userId = user.userId")
    .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to retreive any user")

  return result
}

export const saveNewUser = async (user: User) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const newUser = new User()
  newUser.userId = user.userId

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.save(newUser).catch((err) => console.error(err))

  if (!result) throw new Error("Impossible to save the new user")

  const newWallet = new Wallets()
  newWallet.walletId = uuidv4()
  newWallet.userId = user.userId
  newWallet.hard_currency = Math.floor(Math.random() * 95) + 5
  newWallet.soft_currency = Math.floor(Math.random() * 990) + 10

  const WalletRepository = connection.getRepository(Wallets)

  const resultWallet: Wallets | void = await WalletRepository.save(newWallet).catch((err) => console.error(err))

  await connection.close().catch((err) => console.log(err))

  if (!resultWallet) throw new Error("Impossible to save the wallet for new user")

  return result
}

export const deleteUserById = async (userId: string) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const userToDelete: User | void = await UserRepository.findOne({ userId: userId }).catch((err) => console.error(err))

  if (!userToDelete) throw new Error("Impossible to found the requested user to delete")

  await UserRepository.delete(userToDelete)

  const result: User | void = await UserRepository.save(userToDelete).catch((err) => console.log(err))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to update delete_at for the user")

  return result
}
