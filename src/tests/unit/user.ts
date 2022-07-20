import chai from "chai"
// import sinonChai from "sinon-chai"
import { addCurrency } from "../../services/typeorm/fetchDB/user"
// import { Wallets } from "../../services/typeorm/entity/wallets"

// chai.use(sinonChai)

describe("Unit tests", () => {
  describe("services > typeorm > fetchDB > user > addCurrency", () => {
    it("should update a wallet currency for a user with the correct amount", async () => {
      const amountToAdd = 123

      const response = await addCurrency("22ef5564-0234-11ed-b939-0242ac120002", "soft_currency", amountToAdd)
      // console.log(response)
      if (!response) throw new Error("Error - invalid response from serviceDB")

      chai.assert(response.walletId === "515f73c2-027d-11ed-b939-0242ac120002", "Should get the correct walletId")
    })
  })
})
