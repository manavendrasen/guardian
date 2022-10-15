import { Router } from "express";
import { assignMemberToConfigController, createConfigController, getAllConfigsController } from "../controllers/config.controller";
import validate from "../middlewares/validateResources";
import { configValidateRequestSchema } from "../Schemas/config.schema";

const router = Router({ mergeParams: true });

router.post('/assign-roles/:configId', assignMemberToConfigController)

router.post(
  "/create-config/:projectId",
  validate(configValidateRequestSchema),
  createConfigController
);

router.get('/get-all-configs/:projectId', getAllConfigsController)


export default router;
