import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import { SecretValidateRequestSchema } from "../Schemas/secret.schema";
import { findConfigById } from "../service/config.service";
import { createSecret } from "../service/secret.service";

export const createSecretController = asyncHandler(
  async (
    req: Request<
      SecretValidateRequestSchema["params"],
      {},
      SecretValidateRequestSchema["body"]
    >,
    res: Response
  ) => {
    const { configId } = req.params;
    const body = req.body;
    try {
      const config = await findConfigById(configId);
      if (!config) throwError(404, "Config Not Found");

      const secret = await createSecret(configId, body);
      res.status(201).send(secret);
    } catch (e: any) {
      if (e instanceof ZodError) {
        console.error(e.flatten);
        throwError(400, "Bad data Input");
      } else {
        console.log(e);
        throwError(409, e);
      }
    }
  }
);
