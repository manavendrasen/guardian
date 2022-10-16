import { useRouter } from "next/router";
import React from "react";
import useConfigStore from "store/configStore";
import useProjectStore from "store/projectStore";
import { Project } from "types/Project";

interface ProjectTileProps {
  project: Project;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  const router = useRouter();
  const { getAllConfigsForProject } = useConfigStore();
  const { setProject } = useProjectStore();
  const routeToProjectPage = () => {
    setProject(project);
    router.push(`/project/${project.id}`);
    // getAllConfigsForProject(project.id, router);
  };;
  return (
    <div
      className='bg-slate-100 flex flex-col gap-2 p-6 rounded-md hover:border-primary focus:border-2 hover:border-2 duration-100'
      onClick={routeToProjectPage}
    >
      <h5 className='text-lg font-medium'>{project.name}</h5>
      <p className='text-slate-500'>{project.description}</p>
    </div>
  );
};

export default ProjectTile;
