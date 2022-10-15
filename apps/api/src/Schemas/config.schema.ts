import { z } from "zod";
import { paramIdSchemaProject } from "./common.schema";

const configRequestSchema = z.object({
  name: z.string({
    required_error: "Config Name Required",
  }),
  environment: z.enum(["PRODUCTION", "STAGING", "DEVELOPMENT"]).optional(),
  encConfigKey: z.string()
});

export const configValidateRequestSchema = z.object({
  body: configRequestSchema,
  params: paramIdSchemaProject,
});

export type ConfigValidateRequestSchema = z.infer<
  typeof configValidateRequestSchema
>;

export type ConfigRequestSchema = z.infer<typeof configRequestSchema>;
