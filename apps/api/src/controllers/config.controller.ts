import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import { ConfigValidateRequestSchema } from "../Schemas/config.schema";
import { createConfig } from "../service/config.service";
import { findProjectById } from "../service/project.service";

export const createConfigController = asyncHandler(
  async (
    req: Request<
      ConfigValidateRequestSchema["params"],
      {},
      ConfigValidateRequestSchema["body"]
    >,
    res: Response
  ) => {
    const { projectId } = req.params;
    const body = req.body;
    try {
      const project = await findProjectById(projectId);
      if (!project) throwError(404, "Project id not found");

      //Check the user authority

      const config = await createConfig(projectId, body);
      res.status(201).send(config);
    } catch (e: any) {
      if (e instanceof ZodError) {
        console.error(e.flatten);
        throwError(400, "Bad data Input");
      } else {
        throwError(409, e.message);
      }
    }
  }
);
