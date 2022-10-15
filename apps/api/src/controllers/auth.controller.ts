import { User } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import {
  UserRequestValidateSchema,
  userResponseSchema,
} from "../Schemas/user.schema";
import { createJwtForUser } from "../service/auth.service";
import { authenticateUser, createUser } from "../service/user.service";

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const user: User | undefined = await createUser(req.body);
      res.status(201).send(user);
    } catch (e: any) {
      console.log(e);
      throwError(409, e.message);
    }
  }
);

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, masterKeyHash } = req.body;
    const user: User | null | undefined = await authenticateUser(
      email,
      masterKeyHash
    );
    if (user) {
      const jwt = createJwtForUser(user);
      const loginResponse = userResponseSchema.parse({
        token: jwt,
        ...user,
      });
      res.status(200).send(loginResponse);
    }
  } catch (error) {
    throwError(401, "Authentication Error");
  }
});

export const userLogout = asyncHandler(async (req: Request, res: Response) => {
  try {
    req.logOut((err) => {
      if (err) throw err;
    });
    res.status(201).json("Logged Out Sucessfully.");
  } catch (error) {
    throwError(502, "Error logging out");
  }
});
