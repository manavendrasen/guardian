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
  project: Project | null;
  setProject: (project: Project) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
};

const useProjectStore = create<TProject>((set) => ({
  project: sampleProject,
  projects: sampleProjects,
  setProject: (project: Project) => {
    set((state: TProject) => ({ ...state, project: project }));
  },
  setProjects: (projects: Project[]) => {
    set((state: TProject) => ({ ...state, projects: projects }));
  },
}));

export default useProjectStore;
