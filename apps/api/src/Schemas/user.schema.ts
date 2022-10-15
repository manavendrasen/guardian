import { z } from "zod";

const user = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .email(),
  publicKey: z.string({
    required_error: "Required Field",
  }),
  encPrivateKey: z.string({
    required_error: "Required Field",
  }),
};

export const userResponseSchema = z.object({
  id: z.string({
    invalid_type_error: "Id is required",
  }),
  token: z.string({
    invalid_type_error: "token required",
    required_error: "token required",
  }),
  ...user,
});

const userRequestSchema = z.object({
  ...user,
  masterKeyHash: z.string({
    required_error: "Password is required",
  }),
});

export const userRequestValidateSchema = z.object({
  body: userRequestSchema,
});

const userEncryptedKeyRequestSchema = z.object({
  id: z.string({
    required_error: "Required Field",
  }),
});

const userEncryptedKeyResponseSchema = z.object({
  encPrivateKey: z.string({
    invalid_type_error: "Correct Id is required",
  }),
});

export const userEncryptedKeyValidateSchema = z.object({
  body: userEncryptedKeyRequestSchema,
});

const userPublicKeyRequestSchema = z.object({
  email: z.string({
    required_error: "Required Field",
  }),
});

const userPublicKeyResponseSchema = z.object({
  publicKey: z.string({
    invalid_type_error: "Correct email is required",
  }),
});

export const userPublicKeyValidateSchema = z.object({
  body: userPublicKeyRequestSchema,
});

// const userSchema = z.object({
//     id: z.string(),
//     ...user,
//     password: z.string()
// })

export type UserRequestValidateSchema = z.infer<
  typeof userRequestValidateSchema
>;

export type UserResponseSchema = z.infer<typeof userResponseSchema>;

export type UserRequestSchema = z.infer<typeof userRequestSchema>;

export type UserEncryptedKeyRequestSchema = z.infer<
  typeof userEncryptedKeyRequestSchema
>;

export type UserEncryptedKeyResponseSchema = z.infer<
  typeof userEncryptedKeyResponseSchema
>;

export type UserEncryptedKeyValidateSchema = z.infer<
  typeof userEncryptedKeyValidateSchema
>;

export type UserPublicKeyRequestSchema = z.infer<
  typeof userPublicKeyRequestSchema
>;

export type UserPublicKeyResponseSchema = z.infer<
  typeof userPublicKeyResponseSchema
>;

export type UserPublicKeyValidateSchema = z.infer<
  typeof userPublicKeyValidateSchema
>;
