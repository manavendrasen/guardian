import axios from "axios";

const loginUser = async (email: string, mPass: string) => {
  const masterPass = await axios.post("https://localhost:5000/auth/login", {
    email: "bleh@test.com",
    password: "ajhgajkf",
  });
};
