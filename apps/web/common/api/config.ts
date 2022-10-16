import axios from "axios";
import useProjectStore from "store/projectStore";

export const createConfig = async (
  encryptedName: string,
  encryptedEnvironment: string,
  encryptedConfigKey: string,
  accessToken: string
) => {
  const { project } = useProjectStore.getState();
  const id = project?.id;
  const res = await axios.post(
    `http://localhost:5000/api/v1/config/create-config/${id}`,
    {
      name: encryptedName,
      environment: encryptedEnvironment,
      encConfigKey: encryptedConfigKey,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
