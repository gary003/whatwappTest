import chai from "chai"
import { createClub, getClub, joinClub, listClubs } from "../../services/typeorm/fetchDB/club"
// import sinonChai from "sinon-chai"

// import { Wallets } from "../../services/typeorm/entity/wallets"

// chai.use(sinonChai)

describe("Unit tests", () => {
  describe("services > typeorm > fetchDB > club > createClub", () => {
    it("Create a new club", async () => {
      const response = await createClub("22ef5564-0234-11ed-b939-0242ac120002").catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a response from the DBService")
    })
  })

  describe("services > typeorm > fetchDB > club > joinClub", () => {
    it("User join a club", async () => {
      const response = await joinClub("22ef5564-0234-11ed-b939-0242ac120002", "77ef5564-0234-11ed-b939-0242ac120002").catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a response from the DBService")
      chai.assert.isString(response.clubId, "The user should now be in a club")
    })
  })

  describe("services > typeorm > fetchDB > club > listClub", () => {
    it("List all clubs", async () => {
      const response = await listClubs().catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a response from the DBService")
      chai.assert.isArray(response, "The response should be in an array format")
    })
  })

  describe("services > typeorm > fetchDB > club > getClub", () => {
    it("Should list a club by id", async () => {
      const clubToCheck = "77ef5564-0234-11ed-b939-0242ac120002"

      const response = await getClub(clubToCheck).catch((err) => console.log(err))
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a response from the DBService")
      chai.assert.exists(response.clubId, "Should get a response from the DBService")
      chai.assert.strictEqual(response.clubId, clubToCheck, "The response should have a clubId")
    })

    it("Should fail listing a club by id (wrong clubId)", async () => {
      const fakeClubToCheck = "99zf5564-0234-11ed-b939-0242ac120002"

      try {
        await getClub(fakeClubToCheck)
        throw new Error("Should never happen")
      } catch (err) {
        chai.assert.isNotNull(err, "Should get an error response from the DBService")
        chai.assert.equal(err, "Error: Impossible to list the requested club")
      }
    })
  })
})
