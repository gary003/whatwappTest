import chai from "chai"
import request from "supertest"
import app from "../app"

let testUserId: number = null

describe("API bookmark tests", () => {
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
          done()
        })
    })
  })

  describe("route > user > POST", () => {
    it("should add a new user", (done) => {
      request(app)
        .post("/api/user")
        .send({
          userFirstname: "Erin",
          userLastname: "Lin",
          userUsername: "Erin.Lin",
          userPassword: "az12",
          userMail: "elin@gmail.com",
          userLastNotificationDate: "",
          createdAt: "",
          deletedAt: "",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isNotEmpty(result.body)
          testUserId = result.body.userId
          done()
        })
    })
  })

  describe("route > user > PUT", () => {
    it("should update an existing user", (done) => {
      request(app)
        .put("/api/user")
        .send({
          userId: testUserId,
          userUsername: "new_userUserName_lilin20",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isNotEmpty(result.body)
          done()
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
          //console.log(result.body)
          if (!!err) return done(err)
          chai.assert.exists(result.body.userId)
          chai.assert.exists(result.body.userUsername)
          done()
        })
    })
  })

  describe("route > user > DELETE", () => {
    it("should delete a specified user", (done) => {
      request(app)
        .delete("/api/user/" + testUserId)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, result) => {
          // console.log(result.body)
          if (!!err) return done(err)
          chai.assert.isNotNull(result.body)
          done()
        })
    })
  })
})
