import API from "./api";

export async function addMemberToProject(projectId: string, data: any) {
  try {
    const res = await API.post(`/project/add-member/${projectId}`, {
      ...data,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
