import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { authorizedRouter } from "../route/api.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(authorizedRouter);

web.use(errorMiddleware);
