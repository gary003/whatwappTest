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
      },
      required: ["userId"],
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
      delete: {
        tags: ["user"],
        summary: "Delete a user by id",
        description: "Delete a user by id, the user won't be erase from DB. instead, the deleted_at attribut will be updated",
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
            description: "Successful deletion",
          },
        },
      },
    },
  },
}

export default swaggerJson
