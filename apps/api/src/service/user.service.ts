import { throwError } from "../helpers/errorHandlers.helpers";
import { UserRequestSchema } from "../Schemas/user.schema";
import prisma from "../utils/connectPrisma";

export const createUser = async (body: UserRequestSchema) => {
    const { confirmPassword, ...data } = body;
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

        if (user?.password == masterKeyHash) return user;
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
