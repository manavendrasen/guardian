import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import { webHookLogger } from "../helpers/webhooks";
import asyncHandler from "../middlewares/async";
import { ConfigValidateRequestSchema } from "../Schemas/config.schema";
import {
  assignMemberToConfig,
  createConfig,
  findConfigByIdWithProject,
  getAllConfigById,
  getAllConfigs,
  getAllSecretsFromNameForConfig,
} from "../service/config.service";

import {
  findProjectById,
  findWebHookUrlOfTheUser,
  memberInProject,
} from "../service/project.service";

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

      if (!user) throwError(404, "User Not Found");
      const checkMember = await memberInProject(projectId, user.email!);
      if (!checkMember) throwError(404, "User not found in team");

      const config = await createConfig(projectId, data);
      console.log(config, "config");
      if (!config) throwError(400, "Config not Created");

      const addToMember = await assignMemberToConfig(
        { email: user.email, encConfigKey: encConfigKey, role: "OWNER" },
        config.id
      );
      console.log(addToMember, "add to member");

      if (!addToMember) throwError(400, "User is not added in Config Team");

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
  async (req: Request, res: Response) => {
    const { configId } = req.params;
    const {
      members,
    }: { members: { email: string; encConfigKey: string; role?: Role }[] } =
      req.body;
    const user: any = req.user;
    try {
      if (!user) throwError(404, "Unauthorized User");

      const config = await findConfigByIdWithProject(configId);
      if (!config) throwError(404, "Project id not found");

      if (!(config!.project.ownerId === user.id))
        throwError(403, "User is not Owner");
      let response: { email: string; error: null | string }[] = [];
      for (let i = 0; i < members.length; i++) {
        response.push(await assignMemberToConfig(members[i], configId));
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

export const getConfigSecretsByNameController = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectName, configName } = req.body;
    const user: any = req.user;
    try {
      const secrets = await getAllSecretsFromNameForConfig(
        projectName,
        configName
      );
      // const { webHookUrl }: any = await findWebHookUrlOfTheUser(projectName);
      // console.log(webHookUrl);

      // webHookLogger(
      //   webHookUrl,
      //   `${user.email!} requested for config secrets for ${configName}`
      // );

      res.send(secrets);
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

export const getAllConfigByConfigIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { configId } = req.params;
    try {
      const getConfigs = await getAllConfigById(configId);
      res.send(getConfigs);
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

export const getAllConfigsController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("hello");

    const { projectId } = req.params;
    console.log(projectId, "projectId");
    const user: any = req.user;
    console.log(user, "user");
    try {
      console.log(projectId, user.id);

      const getConfigs = await getAllConfigs(projectId, user.id);

      console.log(getConfigs);

      res.status(201).send({ projectId, getConfigs });
    } catch (e: any) {
      if (e instanceof ZodError) {
        console.error(e.flatten);
        throwError(400, "Bad data Input");
      } else {
        console.log(e.message);

        throwError(404, e.message);
      }
    }
  }
);
