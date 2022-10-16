import { useRouter } from "next/router";
import React from "react";
import useConfigStore from "store/configStore";
import { Config } from "types/Config";

interface ConfigTileProps {
  config: Config;
}

const ConfigTile: React.FC<ConfigTileProps> = ({ config }) => {
  const { setConfig } = useConfigStore();
  const router = useRouter();
  const routeToConfigPage = () => {
    setConfig(config);
    router.push(`/config/${config.id}`);
  };
  return (
    <div
      className='bg-slate-100 overflow-hidden flex flex-col gap-2 p-6 rounded-md hover:border-primary border-2 border-slate-200  duration-100'
      onClick={routeToConfigPage}
    >
      <h5 className='font-medium'>{config.name}</h5>
      {/* <p className='text-slate-600 text-sm'>
        Minim id ad incididunt est culpa voluptate ullamco veniam et qui.
      </p> */}
      <p className='text-slate-600  font-medium text-xs uppercase'>
        {config._count?.secrets} Secrets
      </p>
    </div>
  );
};

export default ConfigTile;
