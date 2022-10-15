import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import { ConfigValidateRequestSchema } from "../Schemas/config.schema";
import { assignMemberToConfig, createConfig, findConfigByIdWithProject } from "../service/config.service";
import { findProjectById, memberInProject } from "../service/project.service";

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
    const { encConfigKey, ...data } = req.body;
    const user: any = req.user;
    try {
      const project = await findProjectById(projectId);
      if (!project) throwError(404, "Project id not found");

      if (!user) throwError(404, "User Not Found")
      const checkMember = await memberInProject(projectId, user.email!)
      if (!checkMember) throwError(404, "User not found in team")

      const config = await createConfig(projectId, data);
      if (!config) throwError(400, "Config not Created");

      const addToMember = await assignMemberToConfig({ email: user.email, encConfigKey: encConfigKey, role: "OWNER" }, config.id)
      if (!addToMember) throwError(400, "User is not added in Config Team")

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

export const assignMemberToConfigController = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const { configId } = req.params;
    const { members }: { members: { email: string, encConfigKey: string, role?: Role }[] } = req.body;
    const user: any = req.user;
    try {

      if (!user) throwError(404, "Unauthorized User");

      const config = await findConfigByIdWithProject(configId);
      if (!config) throwError(404, "Project id not found");

      if (!(config!.project.ownerId === user.id)) throwError(403, "User is not Owner")
      let response: { email: string, error: null | string }[] = [];
      for (let i = 0; i < members.length; i++) {
        response.push(
          await assignMemberToConfig(members[i], configId)
        )
      }

      res.status(201).send(response);
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
