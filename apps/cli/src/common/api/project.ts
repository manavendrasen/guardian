import axios from "axios";
import { Config } from "../services/StorageServices";

export type ProjectResult = {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  encProjectKey: string;
};

export type Secret = {
  name: string;
  value: string;
  comment: string;
}

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

export const getAllConfigs = async (
  projectId: string,
  accessToken: string
): Promise<Config[]> => {
  try {

    const res = await axios.get(`http://localhost:5000/api/v1/config/get-all-configs/${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return res.data.getConfigs;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const getSecretsForConfig = async (
  configId: string,
  accessToken: string
): Promise<Secret[]> => {
  const res = await axios.get(`http://localhost:5000/api/v1/config/get-all-secrets/${configId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data.secrets;
};
