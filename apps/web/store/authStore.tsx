import create from "zustand";
import * as REQUESTS from "requests/authRequests";

type TAuth = {
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
};

const useAuthStore = create<TAuth>((set) => ({
  login: async (email: string, password: string) => {
    await REQUESTS.login({
      email,
      // masterKeyHash: TODO
    });
  },
  register: (email: string, password: string) => {},
}));

export default useAuthStore;
