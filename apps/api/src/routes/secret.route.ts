import { Router } from "express";
import { createSecretController } from "../controllers/secret.controller";
import validate from "../middlewares/validateResources";
import { secretValidateRequestSchema } from "../Schemas/secret.schema";

const router = Router({ mergeParams: true });

router.post(
  "/create-secret/:configId",
  validate(secretValidateRequestSchema),
  createSecretController
);

export default router;
