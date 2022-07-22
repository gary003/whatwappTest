import chai from "chai"
import { Message } from "../../services/fetchDB/message/entity"
import { getClubMessages, sendMessage } from "../../services/fetchDB/message/index"

describe("Unit tests message", () => {
  describe("services > fetchDB > message > index > sendMessage", () => {
    it("should create a new message with all the correct parameters", async () => {
      const senderId: string = "22ef5564-0234-11ed-b939-0242ac120002"
      const clubRecipient: string = "77ef5564-0234-11ed-b939-0242ac120002"
      const messageContent: string = "this is a test message"

      const response: Message = await sendMessage(senderId, clubRecipient, messageContent)
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a valid response from service DB")
      chai.assert.strictEqual(response.senderId, senderId, "Should have the correct senderId (userId)")
      chai.assert.strictEqual(response.clubId, clubRecipient, "Should have the correct clubId")
      chai.assert.strictEqual(response.content, messageContent, "Should have the correct clubId")
    })

    it("should fail creating a new message (wrong userId)", async () => {
      const senderId: string = "85478564-0234-11ed-b939-0242ac120002"
      const clubRecipient: string = "77ef5564-0234-11ed-b939-0242ac120002"
      const messageContent: string = "this is a test message"

      try {
        await sendMessage(senderId, clubRecipient, messageContent)
        throw new Error("test fail, this should never happen")
      } catch (err) {
        // console.log({ err })
        chai.assert.equal(err, "Error: this user does not exist in DB")
      }
    })

    it("should fail creating a new message (wrong clubId)", async () => {
      const senderId: string = "22ef5564-0234-11ed-b939-0242ac120002"
      const clubRecipient: string = "78965564-0234-11ed-b939-0242ac120002"
      const messageContent: string = "this is a test message"

      try {
        await sendMessage(senderId, clubRecipient, messageContent)
        throw new Error("test fail, this should never happen")
      } catch (err) {
        // console.log({ err })
        chai.assert.equal(err, "Error: this club does not exist in DB")
      }
    })
  })

  describe("services > fetchDB > message > index > getClubMessages", () => {
    it("should render a list of messages", async () => {
      const clubId = "77ef5564-0234-11ed-b939-0242ac120002"

      const response: Message[] | void = await getClubMessages(clubId)
      // console.log(response)
      if (!response) throw new Error("invalid response from serviceDB")

      chai.assert.isNotNull(response, "Should get a valid response from service DB")
      chai.assert.isArray(response, "Should have an array format for the list of messages")
    })
  })
})
