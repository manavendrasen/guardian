import { Request, Response } from "express";
import { ZodError } from "zod";
import { throwError } from "../helpers/errorHandlers.helpers";
import asyncHandler from "../middlewares/async";
import { ProjectValidateSchema } from "../Schemas/project.schema";
import { createProject, findProjectById, addMemberToProject } from "../service/project.service";

export const createProjectController = asyncHandler(
    async (
        req: Request<{}, {}, ProjectValidateSchema["body"]>,
        res: Response
    ) => {
        const { encProjectKey, ...data } = req.body;
        const user: any = req.user;

        console.log(user.id);

        try {
            if (!user) throwError(404, "Unauthorized User");
            const project = await createProject(user!, data);
            if (!project) throwError(400, "Project not Created");

            const addToMember = addMemberToProject({ email: user!.email, encProjectKey: encProjectKey }, project.id)
            if (!addToMember) throwError(400, "User is not added in Project Team")
            res.send(project);
        } catch (e: any) {
            if (e instanceof ZodError) {
                console.error(e.flatten);
                throwError(400, "Bad data Input");
            } else {
                console.log(e);
                throwError(409, e.message);
            }
        }
    }
);


export const addMemberToProjectController = asyncHandler(async (req: Request<{ projectId: string }>, res: Response) => {
    {
        const { members }: { members: { email: string, encProjectKey: string }[] } = req.body;
        const { projectId } = req.params;
        const user: any = req.user;

        try {
            // console.log("test")
            if (!user) throwError(404, "Unauthorized User");

            const project: any = await findProjectById(projectId);
            if (!project) throwError(404, "Project Id not found")

            if (!(project.ownerId === user.id)) throwError(403, "User is not Owner")

            let response: { email: string, error: null | string }[] = [];
            for (let i = 0; i < members.length; i++) {
                response.push(
                    await addMemberToProject(members[i], projectId)
                )
            }
            res.send(response);
        } catch (e: any) {
            if (e instanceof ZodError) {
                console.error(e.flatten);
                throwError(400, "Bad data Input");
            } else {
                throwError(409, e.message);
            }
        }
    }
})