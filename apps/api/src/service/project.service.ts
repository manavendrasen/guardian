import { ProjectRequestSchema } from "../Schemas/project.schema";
import { UserResponseSchema } from "../Schemas/user.schema";
import prisma from "../utils/connectPrisma";

export const createProject = async (
  user: UserResponseSchema,
  data: ProjectRequestSchema
) => {
  return await prisma.project.create({
    data: {
      ...data,
      ownerId: user.id,
    },
  });
};

export const findProjectById = async (id: string) => {
  return await prisma.project.findUnique({
    where: {
      id,
    },
  });
};
