import { useRouter } from "next/router";
import React from "react";
import useConfigStore from "store/configStore";

interface ProjectTileProps {
  id: string;
  title: string;
  description: string;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
  id,
  title,
  description,
}) => {
  const router = useRouter();
  const { getAllConfigsForProject } = useConfigStore();
  const routeToProjectPage = () => {
    getAllConfigsForProject(id);
    router.push(`/project/${id}`);
  };
  return (
    <div
      className='bg-slate-100 flex flex-col gap-2 p-6 rounded-md hover:border-primary focus:border-2 hover:border-2 duration-100'
      onClick={routeToProjectPage}
    >
      <h5 className='text-lg font-medium'>{title}</h5>
      <p className='text-slate-500'>{description}</p>
    </div>
  );
};

export default ProjectTile;
