import create from "zustand";
import { AuthServices } from "common/services/AuthServices";
import { User } from "types/User";

type TAuth = {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  masterPasswordKey: string | null;
  setMasterPasswordKey: (masterPasswordKey: string) => void;
  setUser: (user: User) => void;
  loginUser: (email: string, password: string, router: any) => void;
  registerUser: (email: string, password: string) => void;
};

const useAuthStore = create<TAuth>((set, get) => ({
  user: null,
  accessToken: null,
  masterPasswordKey: null,
  setAccessToken: (accessToken: string) => {
    set((state: TAuth) => ({ ...state, accessToken: accessToken }));
  },
  setUser: (user: User) => {
    set((state: TAuth) => ({ ...state, user: user }));
  },
  loginUser: async (email: string, password: string, router: any) => {
    const as = new AuthServices();
    const res = await as.login(email, password);

    get().setUser(res.tokens!);
    get().setAccessToken(res.tokens!.accessToken);
    const mKey = await as.cs.createMasterPasswordKey(email, password);
    get().setMasterPasswordKey(mKey);

    console.log("login", get().user);
    router.push("/");
  },
  registerUser: async (email: string, password: string) => {
    const as = new AuthServices();
    const res = await as.signUp(email, password);
    console.log(res);
  },
  setMasterPasswordKey: (masterPasswordKey: string) => {
    set((state: TAuth) => ({ ...state, masterPasswordKey: masterPasswordKey }));
  },
}));

export default useAuthStore;
