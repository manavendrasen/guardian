import { addMemberToProject } from "requests/projectRequests";
import { Project } from "types/Project";
import create from "zustand";
import { StorageService } from "common/services/StorageServices";
import useAuthStore from "./authStore";
import { CryptoServices } from "common/services/CryptoServices";
import * as REQUESTS from "requests/authRequests";

type AddProjectFormResponse = {
  name: string;
  description: string;
  webhook: string;
};

type TProject = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  project: Project | null;
  setProject: (project: Project) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addMembersToProject: (members: string[]) => void;
  addProject: (payload: AddProjectFormResponse) => void;
  getAllProjects: () => void;
};

const useProjectStore = create<TProject>((set, get) => ({
  loading: false,
  project: null,
  projects: [],
  setProject: (project: Project) => {
    set((state: TProject) => ({ ...state, project: project }));
  },
  setProjects: (projects: Project[]) => {
    set((state: TProject) => ({ ...state, projects: projects }));
  },
  setLoading: (loading) => {
    set((state: TProject) => ({ ...state, loading }));
  },
  addMembersToProject: async (members: string[]) => {
    get().setLoading(true);
    const { user } = useAuthStore.getState();

    const project = get().project;
    if (project && user) {
      const { id } = project;
      const emailKeyPairs = [];

      for (let i = 0; i < members.length; i++) {
        const email = members[i];
        const publicKeys = await REQUESTS.getPublicKeyForUser(email, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        emailKeyPairs.push({
          email,
          publicKeys,
        });
      }

      console.log(emailKeyPairs);

      // // TODO: add encrypted project key
      // const cs = new CryptoServices(window.crypto);

      // const membersWithEncKey = members.map((member, index) => {
      //   // const encProjectKey;
      //   return {
      //     email: member,
      //     encProjectKey: index,
      //   };
      // });

      // if (user) {
      //   await addMemberToProject(id, membersWithEncKey, {
      //     headers: { Authorization: `Bearer ${user.accessToken}` },
      //   });
      // } else {
      //   console.error("User not found");
      // }

      // return res.statusCode === 200;
    } else {
      get().setLoading(false);
      // return false;
    }
  },
  addProject: (payload: AddProjectFormResponse) => {
    const { user } = useAuthStore.getState();
    if (user) {
      const ss = new StorageService(user);
      ss.createNewProject(payload);
      console.log("created new project, refetching");

      get().getAllProjects();
      // console.log();
    } else {
      console.error("User not found.");
    }
  },
  getAllProjects: async () => {
    const { masterPasswordKey, user } = useAuthStore.getState();
    console.log("User detets", user, masterPasswordKey);

    if (masterPasswordKey && user) {
      const ss = new StorageService(user);
      const res = await ss.getAllProjects(masterPasswordKey);
      get().setProjects(res);
      console.log("getAllProjects", res);
    } else {
      console.error("User and master password not found.");
    }
  },
}));

export default useProjectStore;
