import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import { ProjectValidateSchema } from "../Schemas/project.schema";
import { createProject } from "../service/project.service";

export const createProjectController = asyncHandler(
    async (
        req: Request<{}, {}, ProjectValidateSchema["body"]>,
        res: Response
    ) => {
        const body = req.body;
        const user: any = req.user;

        try {
            // console.log("test")
            if (!user) throwError(404, "Unauthorized User");
            const project = await createProject(user, body);
            res.send(project);
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
