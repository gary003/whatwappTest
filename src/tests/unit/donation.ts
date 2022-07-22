import chai from "chai"
import { makeDonation } from "../../services/fetchDB/donation/index"

describe("Unit tests donation", () => {
  describe("services > fetchDB > club > index > makeDonation", () => {
    it("Should fund a donation", async () => {
      const amountToGive: number = 140

      const response = await makeDonation("45698-0234-11ed-b939-0242ac120002", "22ef5564-0234-11ed-b939-0242ac120002", amountToGive).catch((err) => console.log(err))
      // console.log(response)

      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a response from the DBService")
    })

    it("Should fail making a donation (insuficient funds)", async () => {
      try {
        const amountToGive: number = 2500
        await makeDonation("45698-0234-11ed-b939-0242ac120002", "22ef5564-0234-11ed-b939-0242ac120002", amountToGive)
        throw new Error("Should fail above")
      } catch (err) {
        chai.assert.isNotNull(err, "Should get an err response from the DBService")
        chai.assert.equal(err, "Error: The giver does not have enough funds")
      }
    })

    it("Should fail making a donation (different clubs or club = null)", async () => {
      try {
        const amountToGive: number = 5
        await makeDonation("45698-0234-11ed-b939-0242ac120002", "68965564-0234-11ed-b939-0242ac120002", amountToGive)
        throw new Error("Should fail above")
      } catch (err) {
        chai.assert.isNotNull(err, "Should get an err response from the DBService")
        chai.assert.equal(err, "Error: Donation recipients and givers must be from the same club to fund a donation (and not null)")
      }
    })
  })
})
