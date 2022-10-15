import API from "./api";

export async function addConfig(projectId: string, data: any) {
  try {
    const res = await API.post(`/config/create-config/${projectId}`, {
      ...data,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllConfigForProject(projectId: string) {
  try {
    const res = await API.get(`/config/get-all-configs/${projectId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
