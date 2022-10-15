import { Role } from "@prisma/client";
import prisma from "../utils/connectPrisma";
import { findUserByEmail } from "./user.service";

export const createConfig = async (
  projectId: string,
  data: any
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

export const assignMemberToConfig = async ({ email, encConfigKey, role }: { email: string, encConfigKey: string, role?: Role }, configId: string) => {
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

export const getAllConfigs = async (projectId: string, memberId: string) => {
  return await prisma.config.findMany({
    where: {
      configMember: {
        some: {
          memberId
        }
      },
      projectId
    },
    select: {
      id: true,
      environment: true,
      name: true,
      _count: {
        select: {
          secrets: true
        }
      }
    }
  })
}