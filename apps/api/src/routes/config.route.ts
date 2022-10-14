import { Router } from "express";
import { createConfigController } from "../controllers/config.controller";
import validate from "../middlewares/validateResources";
import { configValidateRequestSchema } from "../Schemas/config.schema";

const router = Router({ mergeParams: true });

router.post(
  "/create-config/:projectId",
  validate(configValidateRequestSchema),
  createConfigController
);

export default router;
