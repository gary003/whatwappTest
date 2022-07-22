import chai from "chai"
import { addCurrency, getAllUsers, getUserById } from "../../services/fetchDB/user/index"

describe("Unit tests user", () => {
  describe("services > fetchDB > user > index > addCurrency", () => {
    it("should update a wallet currency for a user with the correct amount", async () => {
      const amountToAdd = 123

      const response = await addCurrency("22ef5564-0234-11ed-b939-0242ac120002", "soft_currency", amountToAdd).catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("Error - invalid response from serviceDB")

      chai.assert(response.walletId === "515f73c2-027d-11ed-b939-0242ac120002", "Should get the correct walletId")
    })

    it("should fail because of negative amount", async () => {
      const amountToAdd = -55

      try {
        await addCurrency("22ef5564-0234-11ed-b939-0242ac120002", "soft_currency", amountToAdd)
        throw new Error("Should never happen")
      } catch (err) {
        // console.log(response)
        chai.assert.isNotNull(err, "Should get an error")
        chai.assert.equal(err, "Error: The amount to add must be at least equal to 1")
      }
    })
  })

  describe("services > fetchDB > user > index > getAllUsers", () => {
    it("should retreive all the users from DB", async () => {
      const response = await getAllUsers().catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("Error - invalid response from serviceDB")

      chai.assert.isArray(response, "Should get the list in an array format")
    })
  })

  describe("services > fetchDB > user > index > getUserById", () => {
    it("should retreive a single user from DB", async () => {
      const userToFetch: string = "22ef5564-0234-11ed-b939-0242ac120002"

      const response = await getUserById(userToFetch).catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("Error - invalid response from serviceDB")

      chai.assert.exists(response, "Should get a valid response from DB")
      chai.assert.equal(response.userId, userToFetch, "Should get a valid response with a userId")
    })

    it("should fail retreiving a single user (user does not exists in DB)", async () => {
      const userToFetch: string = "22ef5564-0234-11ed-b939-0242ac1200026"

      try {
        await getUserById(userToFetch)
        throw new Error("Should never happen")
      } catch (err) {
        // console.log(response)
        chai.assert.exists(err, "Should get an err from DB")
        chai.assert.equal(err, "Error: Impossible to retreive any user")
      }
    })
  })
})
