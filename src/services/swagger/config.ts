import ip from "ip"

const localIp = ip.address()

const swaggerJson = {
  swagger: "2.0",
  host: `${localIp}:${process.env.API_PORT}`,
  basePath: "/api",
  info: {
    title: `${process.env.API_TITLE}`,
    version: `${process.env.API_VERSION}`,
  },
  schemes: ["http"],
  // use for model definition
  definitions: {
    User: {
      type: "object",
      properties: {
        userId: {
          description: "id of user",
          type: "string",
        },
        clubId: {
          description: "A user can join a club",
          type: "string",
        },
        walletId: {
          description: "Each user have a wallet",
          type: "string",
        },
      },
      required: ["userId"],
    },
    Club: {
      type: "object",
      properties: {
        clubId: {
          description: "id of a club",
          type: "string",
        },
      },
      required: ["clubId"],
    },
    Message: {
      type: "object",
      properties: {
        messageId: {
          description: "id of a message",
          type: "string",
        },
        userId: {
          description: "userId of the creator of the message ",
          type: "string",
        },
        clubId: {
          description: "clubId of the recipient of mail",
          type: "string",
        },
        content: {
          description: "text message to send in the message",
          type: "string",
        },
      },
      required: ["clubId"],
    },
    Donation: {
      type: "object",
      properties: {
        donationId: {
          description: "id of a donation",
          type: "string",
        },
        recipientId: {
          description: "userId of the recipient of the targeted funds",
          type: "string",
        },
        fundingGoal: {
          description: "target funds",
          type: "number",
        },
        currentFund: {
          description: "funds currently collected",
          type: "number",
        },
      },
      required: ["donationId", "recipientId", "fundingGoal"],
    },
  },
  paths: {
    "/user": {
      get: {
        tags: ["user"],
        summary: "get all users",
        description: "all users will be retreive from DB",
        responses: {
          "200": {
            description: "Successfuly get all users ",
          },
        },
      },
      post: {
        tags: ["user"],
        summary: "Save a new user in database",
        description: "Save a new user in database",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "registered users",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully save new user",
          },
        },
      },
    },
    "/user/{userId}": {
      get: {
        tags: ["user"],
        summary: "Get a single user",
        description: "Get a user from DB by its id",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            type: "string",
            description: "Id of a user (user_id)",
          },
        ],
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
    },
    "/message": {
      post: {
        tags: ["message"],
        summary: "Save a new message in database",
        description: "Save a new message in database",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "new message to save",
            schema: {
              $ref: "#/definitions/Message",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully save new message",
          },
        },
      },
    },
    "/message/{clubId}": {
      get: {
        tags: ["message"],
        summary: "Get all messages for one club",
        description: "All messages from a specified clubId",
        parameters: [
          {
            name: "clubId",
            in: "path",
            required: true,
            type: "string",
            description: "Id of a club (clubId)",
          },
        ],
        responses: {
          "200": {
            description: "Successfuly get all messages for the specified club ",
          },
        },
      },
    },
    "/club": {
      get: {
        tags: ["club"],
        summary: "Get a all clubs informations",
        description: "Get all clubs by its id from DB",
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
      post: {
        tags: ["club"],
        summary: "Create a new club",
        description: "Create a new club",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "donation info needed",
            schema: {
              type: "object",
              required: ["userId"],
              properties: {
                userId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
    },
    "/club/join": {
      put: {
        tags: ["club"],
        summary: "Join a club",
        description: "Join an existing club",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "donation info needed",
            schema: {
              type: "object",
              required: ["clubId", "userId"],
              properties: {
                clubId: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
    },
    "/club/{clubId}": {
      get: {
        tags: ["club"],
        summary: "Get a specific club informations",
        description: "Get a specific club informations by clubId",
        parameters: [
          {
            name: "clubId",
            in: "path",
            required: true,
            type: "string",
            description: "Id of a club (clubId)",
          },
        ],
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
    },
    "/donation": {
      get: {
        tags: ["donation"],
        summary: "Get a all donations",
        description: "Lists all donations from DB",
        responses: {
          "200": {
            description: "Successfully get the requestesd user",
          },
        },
      },
      post: {
        tags: ["donation"],
        summary: "Create a new donation request",
        description: "Create a new donation request",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "donation info",
            schema: {
              type: "object",
              required: ["userId", "fundingGoal"],
              properties: {
                userId: {
                  type: "string",
                },
                fundingGoal: {
                  type: "number",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully add funds to donation",
          },
        },
      },
    },
    "/donation/makeDonation": {
      post: {
        tags: ["donation"],
        summary: "Add funds to an existing donation",
        description: "Add funds to an existing donation - donation of soft_currency from a user in the same club",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "donation info needed",
            schema: {
              type: "object",
              required: ["donationId", "amount"],
              properties: {
                donationId: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
                amount: {
                  type: "number",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Successfully add funds to donation",
          },
        },
      },
    },
  },
}

export default swaggerJson
