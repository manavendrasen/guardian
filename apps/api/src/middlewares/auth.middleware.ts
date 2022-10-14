import { NextFunction, Request } from "express";
import { throwError } from "../helpers/errorHandlers.helpers";
import { verifyToken } from "../service/auth.service";
import asyncHandler from "./async";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Request, next: NextFunction) => {
    try {
      req.user = verifyToken(req.headers.authorization?.substring(7) || "") || undefined;
      next();
    } catch (error) {
      throwError(401, "Unauthorised User");
    }
  }
);
