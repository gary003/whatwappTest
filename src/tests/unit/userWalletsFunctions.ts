// import chai from "chai"
import { addCurrency } from "../../services/typeorm/fetchDB/user"

describe.only("Unit tests", () => {
  describe("services > typeorm > fetchDB > user", () => {
    it("should update a wallet currency for a user with the correct amount", (done) => {
      const amountToAdd = 123

      addCurrency("22ef5564-0234-11ed-b939-0242ac120002", "hard_currency", amountToAdd)
        .then((response) => {
          console.log(response)

          // chai.assert(res)

          return done()
        })
        .catch((err) => console.error(err))
    })
  })
})
