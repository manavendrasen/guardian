import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import {
  findAllProjectOfTheUser,
  findEncryptedPrivateById,
  findPublicKeyByEmail,
} from "../service/user.service";

export const findEncryptedPrivateByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const data = await findEncryptedPrivateById(id);
      res.send(data);
    } catch (e: any) {
      if (e instanceof ZodError) {
        console.error(e.flatten);
        throwError(400, "Bad data Input");
      } else {
        console.error(e.flatten);
        throwError(409, e.message);
      }
    }
  }
);

export const findPublicKeyByEmailIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const data = await findPublicKeyByEmail(email);
      res.send(data);
    } catch (e: any) {
      if (e instanceof ZodError) {
        console.log(e.flatten);
        throwError(400, "Bad data input");
      } else {
        console.log(e.flatten);
        throwError(409, e.message);
      }
    }
  }
);

export const findAllProjectOfTheUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user: any = req.user;

    try {
      if (!user) throwError(404, "User Not Found");

      const data = await findAllProjectOfTheUser(user.id!);
      res.send(data);
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
