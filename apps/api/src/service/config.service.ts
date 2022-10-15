import { Role } from "@prisma/client";
import { ConfigRequestSchema } from "../Schemas/config.schema";
import prisma from "../utils/connectPrisma";
import { findUserByEmail } from "./user.service";

export const createConfig = async (
  projectId: string,
  data: ConfigRequestSchema
) => {
  return await prisma.config.create({
    data: {
      ...data,
      projectId,
    },
  });
};

export const findConfigById = async (id: string) => {
  return await prisma.config.findUnique({
    where: {
      id,
    },
  });
};


export const findConfigByIdWithProject = async (id: string) => {
  return await prisma.config.findUnique({
    where: {
      id
    },
    select: {
      project: true
    }
  })
}

export const assignMembersToConfig = async ({ email, encConfigKey, role }: { email: string, encConfigKey: string, role?: Role }, configId: string) => {
  const member = await findUserByEmail(email);
  if (!member) return { email, error: "User Not Registered" }

  try {
    await prisma.configTeam.create({
      data: {
        encConfigKey,
        configId,
        role: role,
        memberId: member.id
      }
    });
    return { email, error: null }
  } catch (error) {
    return { email, error: "User already assigned to same Config" }
  }
}