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
import {
  authenticateUser,
  createUser
} from "../service/user.service";

export const createUserController = asyncHandler(
  async (
    req: Request<{}, {}, UserRequestValidateSchema["body"]>,
    res: Response
  ) => {
    try {
      const user = await createUser(req.body);
      const userResponse = userResponseSchema.parse(user);
      res.status(201).send(userResponse);
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
