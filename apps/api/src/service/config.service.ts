import { ConfigRequestSchema } from "../Schemas/config.schema";
import prisma from "../utils/connectPrisma";

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
