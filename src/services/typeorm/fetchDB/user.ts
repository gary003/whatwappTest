import { User } from "../entity/user"
import { v4 as uuidv4 } from "uuid"
import { connectionTypeORM } from "../connectionFile"
import { Wallets } from "../entity/wallets"

export const getAllUsers = async () => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const results: User[] | void = await UserRepository.createQueryBuilder("user")
    // .innerJoinAndMapOne("user.wallet", Wallets, "wallets", "wallets.walletId = user.walletId")
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
    .innerJoinAndMapOne("user.wallet", Wallets, "wallets", "wallets.walletId = user.walletId")
    // .where("user.userId = :userId", { userId: userId })
    .getOne()
    .catch((err) => console.log(err.sqlMessage))

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to retreive any user")

  return result
}

export const saveNewUser = async (user: User) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const newWallet = new Wallets()
  newWallet.walletId = uuidv4()
  newWallet.hard_currency = Math.floor(Math.random() * 95) + 5
  newWallet.soft_currency = Math.floor(Math.random() * 990) + 10

  const WalletRepository = connection.getRepository(Wallets)

  const resultWallet: Wallets | void = await WalletRepository.save(newWallet).catch((err) => console.error(err))

  if (!resultWallet) throw new Error("Impossible to save the wallet for new user")

  const newUser = new User()
  newUser.userId = user.userId
  newUser.walletId = newWallet.walletId

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.save(newUser).catch((err) => console.error(err))

  if (!result) throw new Error("Impossible to save the new user")

  await connection.close().catch((err) => console.log(err))

  return result
}

export const deleteUserById = async (userId: string) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const userToDelete: User | void = await UserRepository.findOne({ where: { userId: userId } }).catch((err) => console.error(err))

  if (!userToDelete) throw new Error("Impossible to found the requested user to delete")

  const deletedUser = await UserRepository.remove(userToDelete)

  if (!deletedUser) throw new Error("Impossible to delete the user")

  const WalletsRepository = connection.getRepository(Wallets)

  const WalletToDelete: Wallets | void = await WalletsRepository.findOne({ where: { walletId: deletedUser.walletId } }).catch((err) => console.error(err))

  if (!WalletToDelete) throw new Error("Impossible to found the requested wallet to delete")

  const deletedWallet = await WalletsRepository.delete(WalletToDelete)

  if (!deletedWallet) throw new Error("Impossible to delete the wallet")

  await connection.close().catch((err) => console.log(err))

  return deletedUser
}
