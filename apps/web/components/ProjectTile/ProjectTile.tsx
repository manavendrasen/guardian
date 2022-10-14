import Link from "next/link";
import React from "react";

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
  return (
    <Link href={`/project/${id}`}>
      <div
        className='bg-slate-100 flex flex-col gap-2 p-6 rounded-md hover:border-primary focus:border-2 hover:border-2 duration-100'
        onClick={() => {}}
      >
        <h5 className='text-lg font-medium'>{title}</h5>
        <p className='text-slate-500'>{description}</p>
      </div>
    </Link>
  );
};

export default ProjectTile;
