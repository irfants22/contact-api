import { Router } from "express";
import userController from "../controller/user-controller.js";

const publicRouter = Router();

publicRouter.get("/", async (_req, res) => {
  res.status(200).send("Good, the server is running");
});

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
