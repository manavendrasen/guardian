import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.error(e.issues);
      throwError(400, e.flatten);
    }
  };

export default validate;
