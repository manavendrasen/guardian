import { z } from "zod";

const project = {
  name: z.string({
    required_error: "Please Provide a Name",
  }),
  description: z.string({
    required_error: "Please provide a description",
  }),
  webhookUrl: z.string().url("Invalid Url"),
  encProjectKey: z.string({
    required_error: "Project Key not sent"
  })
};

export const projectRequestSchema = z.object({
  ...project,
});

const projectSchema = z.object({
  id: z.string(),
  ...project,
});

export const projectValidateSchema = z.object({
  body: projectRequestSchema,
});

export type ProjectValidateSchema = z.infer<typeof projectValidateSchema>;

export type ProjectRequestSchema = z.infer<typeof projectRequestSchema>;
