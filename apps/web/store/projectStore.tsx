import { addMemberToProject } from "requests/projectRequests";
import { Project } from "types/Project";
import create from "zustand";

const sampleProject = {
  id: "1",
  name: "Poptalk",
  description: "Eu mollit id sit cupidatat aliqua.",
} as Project;

const sampleProjects = [
  {
    id: "1",
    name: "Poptalk",
    description: "Eu mollit id sit cupidatat aliqua.",
  } as Project,
  {
    id: "2",
    name: "Vinyl",
    description: "Eu mollit id sit cupidatat aliqua.",
  } as Project,
];

type TProject = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  project: Project | null;
  setProject: (project: Project) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addMembersToProject: (members: string[]) => void;
};

const useProjectStore = create<TProject>((set, get) => ({
  loading: false,
  project: sampleProject,
  projects: sampleProjects,
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

    const project = get().project;
    if (project) {
      const { id } = project;

      // TODO: add encrypted project key
      const membersWithEncKey = members.map((member, index) => {
        return {
          email: member,
          encProjectKey: index,
        };
      });

      const res = await addMemberToProject(id, membersWithEncKey);
      // return res.statusCode === 200;
    } else {
      get().setLoading(false);
      // return false;
    }
  },
}));

export default useProjectStore;
