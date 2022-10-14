import { z } from "zod";
import { paramIdSchemaConfig } from "./common.schema";

const secretRequestSchema = z.object({
  name: z.string({
    required_error: "Please Provide a Name",
  }),
  value: z.string({
    required_error: "Please provide a value",
  }),
  comment: z.string({
    required_error: "Please provide a comment",
  }),
});

export const secretValidateRequestSchema = z.object({
  body: secretRequestSchema,
  params: paramIdSchemaConfig,
});

export type SecretRequestSchema = z.infer<typeof secretRequestSchema>;

export type SecretValidateRequestSchema = z.infer<
  typeof secretValidateRequestSchema
>;
