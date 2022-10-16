import { useRouter } from "next/router";
import React from "react";

interface ConfigTileProps {
  id: string;
  title: string;
  description: string;
  count: number;
}

const ConfigTile: React.FC<ConfigTileProps> = ({
  id,
  title,
  description,
  count,
}) => {
  const router = useRouter();
  const routeToConfigPage = () => {
    // fetch product details
    router.push(`/config/${id}`);
  };
  return (
    <div
      className='bg-slate-100 flex flex-col gap-2 p-6 rounded-md hover:border-primary border-2 border-slate-200  duration-100'
      onClick={routeToConfigPage}
    >
      <h5 className='font-medium'>{title}</h5>
      <p className='text-slate-600 text-sm'>{description}</p>
      <p className='text-slate-600  font-medium text-xs uppercase'>
        {count} Secrets
      </p>
    </div>
  );
};

export default ConfigTile;
