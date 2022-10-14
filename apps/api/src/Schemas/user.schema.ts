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

const userRequestSchema = z
  .object({
    ...user,
    password: z.string({
      required_error: "Password is required",
    }),
    confirmPassword: z.string({
      required_error: "Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const userRequestValidateSchema = z.object({
  body: userRequestSchema,
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
