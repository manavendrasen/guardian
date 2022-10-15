import axios from "axios";

export type ProjectResult = {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  encryptedProjectKey: string;
};

export const createProject = async (
  encryptedProjectKey: string,
  encryptedName: string,
  encryptedDescription: string,
  encryptedWebhook: string,
  accessToken: string
): Promise<ProjectResult> => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/project/create-project",
    {
      name: encryptedName,
      description: encryptedDescription,
      webhookUrl: encryptedWebhook,
      encProjectKey: encryptedProjectKey,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data as ProjectResult;
};

export const getAllProjects = async (
  accessToken: string
): Promise<ProjectResult[]> => {
  const res = await axios.get("http://localhost:5000/api/v1/user/get-project", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
