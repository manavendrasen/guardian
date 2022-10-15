import { Router } from "express";
import { assignMemberToConfigController, createConfigController } from "../controllers/config.controller";
import validate from "../middlewares/validateResources";
import { configValidateRequestSchema } from "../Schemas/config.schema";

const router = Router({ mergeParams: true });

router.post('/assign-roles/:configId', assignMemberToConfigController)

router.post(
  "/create-config/:projectId",
  validate(configValidateRequestSchema),
  createConfigController
);



export default router;
