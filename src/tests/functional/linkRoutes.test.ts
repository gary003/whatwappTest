import chai from "chai"
import request from "supertest"
import app from "../../app"

let testUserId: string = "cc2c90b6-029c-11ed-b939-0242ac120002"

describe("Functional Tests API", () => {
  describe("route > user > POST", () => {
    it("should add a new user", (done) => {
      request(app)
        .post("/api/user")
        .send({
          userId: testUserId,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isNotEmpty(result.body)
          chai.assert.isNotEmpty(result.body.userId)
          testUserId = result.body.userId
          return done()
        })
    })
  })

  describe("route > user > GET", () => {
    it("should return an array", (done) => {
      // with Mocha don't use return (return request(app)) !
      request(app)
        .get("/api/user")
        .set("Accept", "application/json")
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isArray(result.body)
          if (result.body.length > 0) {
            chai.assert.exists(result.body[0].userId)
          }
          return done()
        })
    })
  })

  describe("route > user > GET", () => {
    it("should return a single user", (done) => {
      // with Mocha don't use return (return request(app)) !
      request(app)
        .get("/api/user/" + testUserId)
        .set("Accept", "application/json")
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.exists(result.body.userId)
          return done()
        })
    })
  })

  describe("route > user > DELETE", () => {
    it("should delete a specified user", (done) => {
      request(app)
        .delete("/api/user/" + testUserId)
        .set("Accept", "application/json")
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isNotNull(result.body)
          return done()
        })
    })
  })
})
