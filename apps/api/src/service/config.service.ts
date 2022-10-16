import { Role } from "@prisma/client";
import prisma from "../utils/connectPrisma";
import { findWebHookUrlOfTheUser } from "./project.service";
import { findUserByEmail } from "./user.service";

export const createConfig = async (projectId: string, data: any) => {
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
      id,
    },
    select: {
      project: true,
    },
  });
};

export const assignMemberToConfig = async (
  {
    email,
    encConfigKey,
    role,
  }: { email: string; encConfigKey: string; role?: Role },
  configId: string
) => {
  const member = await findUserByEmail(email);
  if (!member) return { email, error: "User Not Registered" };

  try {
    await prisma.configTeam.create({
      data: {
        encConfigKey,
        configId,
        role: role,
        memberId: member.id,
      },
    });
    return { email, error: null };
  } catch (error) {
    return { email, error: "User already assigned to same Config" };
  }
};

export const getAllConfigs = async (projectId: string, memberId: string) => {
  return await prisma.config.findMany({
    where: {
      configMember: {
        some: {
          memberId,
        },
      },
      projectId,
    },
    select: {
      id: true,
      environment: true,
      name: true,
      configMember: {
        where: {
          memberId,
        },
        select: {
          encConfigKey: true,
          role: true,
        },
      },
      _count: {
        select: {
          secrets: true,
        },
      },
    },
  });
};
export const getAllSecretsFromNameForConfig = async (
  projectName: string,
  configName: string
) => {
  const project = await prisma.project.findUnique({
    where: {
      name: projectName,
    },
    select: {
      id: true,
    },
  });

  const config = await prisma.config.findMany({
    where: {
      projectId: project!.id,
      name: configName,
    },
    select: {
      id: true,
    },
  });

  return Promise.all(
    config.map(async (ele: any) => {
      return await prisma.secret.findMany({
        where: {
          configId: ele!.id,
        },
      });
    })
  );
};

export const getAllConfigById = async (configId: string) => {
  return await prisma.config.findUnique({
    where: {
      id: configId,
    },
    select: {
      secrets: true,
    },
  });
};
