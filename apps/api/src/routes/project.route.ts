import { Router } from "express";
import { createProjectController } from "../controllers/project.controller";
import validate from "../middlewares/validateResources";
import { projectValidateSchema } from "../Schemas/project.schema";

const router = Router({ mergeParams: true });

router.post(
  "/create-project",
  validate(projectValidateSchema),
  createProjectController
);

export default router;
