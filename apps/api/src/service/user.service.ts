import { throwError } from "../helpers/errorHandlers.helpers";
import {
  UserRequestSchema,
  UserEncryptedKeyRequestSchema,
  UserEncryptedKeyResponseSchema,
} from "../Schemas/user.schema";
import prisma from "../utils/connectPrisma";

export const createUser = async (body: UserRequestSchema) => {
  const data = body;
  try {
    return await prisma.user.create({
      data,
    });
  } catch (e: any) {
    throwError(502, e.error);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (e: any) {
    throwError(502, e.error);
  }
};

export const authenticateUser = async (
  email: string,
  masterKeyHash: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.masterKeyHash == masterKeyHash) return user;
  } catch (e) {
    console.log("error", e);
    // throwError(502, e.error);
  }
};

export const findUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (e: any) {
    throwError(502, e.error);
  }
};

export const findEncryptedPrivateById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        encPrivateKey: true,
      },
    });
  } catch (e: any) {
    throwError(502, e.error);
  }
};

export const findPublicKeyByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        publicKey: true,
      },
    });
  } catch (e: any) {
    throwError(502, e.error);
  }
};

export const findAllProjectOfTheUser = async (id: string) => {
  try {
    console.log(id);
    const result = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        projectShared: {
          where: {
            member: {
              id,
            },
          },
          select: {
            encProjectKey: true,

          },
        },
      },
    });

    return result?.projectShared.map((p) => {
      return {
        encProjectKey: p.encProjectKey,
      };
    });
  } catch (e: any) {
    console.log(e);
    throwError(502, e.error);
  }
};
