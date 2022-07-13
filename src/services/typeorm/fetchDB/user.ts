import { User } from "../entity/user"
import { connectionTypeORM } from "../connectionFile"

export const getAllUsers = async () => {
  const connection = await connectionTypeORM().catch((err) => console.error(""))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const results: User[] | void = await UserRepository.find().catch((err) => console.error(err))

  await connection.close().catch((err) => console.log(err))

  if (!results) throw new Error("Impossible to retreive any user")

  return results
}

export const getUserById = async (userId: number) => {
  const connection = await connectionTypeORM().catch((err) => console.error(err))

  if (!connection || !connection.isConnected) throw new Error("Not Connected to database")

  const UserRepository = connection.getRepository(User)

  const result: User | void = await UserRepository.findOne({ userId: userId }).catch((err) => console.error(err))

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

  await connection.close().catch((err) => console.log(err))

  if (!result) throw new Error("Impossible to save the new user")

  return result
}

export const deleteUserById = async (userId: number) => {
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
