import { z } from "zod";

export const paramIdSchemaProject = z.object({
  projectId: z.string({
    required_error: "Project id required",
  }),
});

export const paramIdSchemaConfig = z.object({
  configId: z.string({
    required_error: "Project id required",
  }),
});

export type ParamIdSchemaProject = z.infer<typeof paramIdSchemaProject>;

export type ParamIdSchemaConfig = z.infer<typeof paramIdSchemaConfig>;
