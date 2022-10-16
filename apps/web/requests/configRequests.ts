import API from "./api";

export async function addConfig(projectId: string, data: any, config: any) {
  try {
    const res = await API.post(
      `/config/create-config/${projectId}`,
      data,
      config
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllConfigForProject(projectId: string, config: any) {
  try {
    const res = await API.get(`/config/get-all-configs/${projectId}`, config);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
