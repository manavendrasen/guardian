import { SecretRequestSchema } from "../Schemas/secret.schema";
import prisma from "../utils/connectPrisma";

export const createSecret = async (
  configId: string,
  data: SecretRequestSchema
) => {
  return await prisma.secret.create({
    data: {
      ...data,
      configId,
    },
  });
};
