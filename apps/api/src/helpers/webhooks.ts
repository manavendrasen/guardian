import axios, { Axios } from "axios";

export const webHookLogger = async (webHookUrl: string, log: string) => {
  const params = {
    username: "Logs",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/2621/2621231.png",
    content: log,
  };
  try {
    const { data } = await axios.post(webHookUrl, params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
