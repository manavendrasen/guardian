import { ProjectRequestSchema } from "../Schemas/project.schema";
import { UserResponseSchema } from "../Schemas/user.schema";
import prisma from "../utils/connectPrisma";
import { findUserByEmail } from "./user.service";

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

export const isMemberAddedToProject = async ({ email, encProjectKey }: { email: string, encProjectKey: string }, projectId: string) => {
  const member = await findUserByEmail(email);
  if (!member) return { email, error: "User Not Registered" }
  try {
    await prisma.projectTeam.create({
      data: {
        encProjectKey,
        projectId,
        memberId: member.id
      }
    });
    return { email, error: null }
  } catch (error) {
    return { email, error: "User already assigned to same project" }
  }
}
