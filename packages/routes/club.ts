import { Router } from "express";
import { body } from "express-validator";
import {
  IClubController,
  IFeedController,
  IUserController,
} from "../controller";
import Docs from "../docs";
import { Role } from "../models";
import { validator } from "../middleware";

const clubRoutes = (
  clubController: IClubController,
  userController: IUserController,
  feedController: IFeedController
) => {
  const router = Router();

  router
    .route("/")
    .get(clubController.findAll)
    .post(
      body("name").isString(),
      body("description").isString(),
      body("capacity").isNumeric(),
      body("sex").isBoolean(),
      body("minimum_age").isNumeric(),
      body("maximum_age").isNumeric(),
      validator,
      clubController.create
    );
  router
    .route("/:id")
    .get(clubController.find)
    .put(clubController.update)
    .delete(clubController.delete);
  router
    .route("/:id/users")
    .get(userController.findAllByClub)
    .post(clubController.join);
  router
    .route("/:id/users/:userId")
    .put(
      body("role").isIn(Object.values(Role)),
      validator,
      clubController.setRole
    );
  router
    .route("/:id/feeds")
    .get(feedController.findAllByClub)
    .post(
      body("title").isString(),
      body("content").isString(),
      body("is_private").isBoolean(),
      validator,
      feedController.create
    );

  return router;
};

export default clubRoutes;

const swagger = Docs.getInstance();
swagger.add({
  "/clubs": {
    get: {
      summary: "Get all club",
      tags: ["Clubs"],
      responses: { 200: { $ref: "#/components/responses/clubsResponse" } },
    },
    post: {
      summary: "Create a club",
      tags: ["Clubs"],
      parameters: [{ $ref: "#/components/parameters/clubCreate" }],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
  },
  "/clubs/{id}": {
    get: {
      summary: "Get a club",
      tags: ["Clubs"],
      responses: { 200: { $ref: "#/components/responses/clubResponse" } },
    },
    put: {
      summary: "Update a club",
      tags: ["Clubs"],
      parameters: [{ $ref: "#/components/parameters/clubUpdate" }],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
    delete: {
      summary: "Delete a club",
      tags: ["Clubs"],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
  },
  "/clubs/{id}/users": {
    get: {
      summary: "Get all user of a club",
      tags: ["Clubs"],
      parameters: [{ $ref: "#/components/parameters/roleQueryParams" }],
      responses: { 200: { $ref: "#/components/responses/userInClubResponse" } },
    },
    post: {
      summary: "Join a club",
      tags: ["Clubs"],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
  },
  "/clubs/{id}/users/{userId}": {
    put: {
      summary: "Set role of a user in a club",
      tags: ["Clubs"],
      parameters: [{ $ref: "#/components/parameters/userSetRole" }],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
  },
  "/clubs/{id}/feeds": {
    get: {
      summary: "Get all feed of a club",
      tags: ["Clubs"],
      parameters: [
        { $ref: "#/components/parameters/cursorParam" },
        { $ref: "#/components/parameters/limitParam" },
      ],
      responses: { 200: { $ref: "#/components/responses/feedsResponse" } },
    },
    post: {
      summary: "Create a feed",
      tags: ["Clubs"],
      parameters: [{ $ref: "#/components/parameters/feedCreate" }],
      responses: { 200: { $ref: "#/components/responses/numberResponse" } },
    },
  },
});
