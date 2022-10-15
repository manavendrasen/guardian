import React from "react";
import Button from "components/Button/Button";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import NextHead from "components/NextHead/NextHead";
import PageHeader from "components/PageHeader/PageHeader";
import { FiPlus } from "react-icons/fi";
import useConfigStore from "store/configStore";

interface ConfigIdProps {}

const ConfigId: React.FC<ConfigIdProps> = () => {
  const { config } = useConfigStore();
  return (
    <>
      <NextHead />
      <DashboardLayout>
        <PageHeader title={`Project > ${config?.name}`}>
          <Button
            onClick={() => {
              // createNewConfigHandler();
            }}
          >
            <FiPlus /> Add New Variable
          </Button>
        </PageHeader>
        <main className='mt-6 grid md:grid-cols-3 gap-4 md:gap-6 grid-cols-1'>
          hello
        </main>
      </DashboardLayout>
    </>
  );
};

export default ConfigId;
