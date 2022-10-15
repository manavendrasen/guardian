import { Router } from "express";
import { addMemberToProjectController, createProjectController } from "../controllers/project.controller";
import validate from "../middlewares/validateResources";
import { projectValidateSchema } from "../Schemas/project.schema";

const router = Router({ mergeParams: true });

router.post(
  "/create-project",
  validate(projectValidateSchema),
  createProjectController
);

router.post('/add-member/:projectId', addMemberToProjectController)

export default router;
