import React from "react";
import Button, { SecondaryButton } from "components/Button/Button";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import NextHead from "components/NextHead/NextHead";
import PageHeader from "components/PageHeader/PageHeader";
import { FiEdit, FiPlus, FiTool } from "react-icons/fi";
import useConfigStore from "store/configStore";
import useModal from "store/modalStore";
import AddSecretForm from "features/AddSecret/AddSecret";
import useSecretStore from "store/secretStore";

interface ConfigIdProps {}

const ConfigId: React.FC<ConfigIdProps> = () => {
  const { config } = useConfigStore();
  const { showModal } = useModal();
  const { secrets } = useSecretStore();
  return (
    <>
      <NextHead />
      <DashboardLayout>
        <PageHeader title={`Project > ${config?.name}`}>
          <div className='flex gap-4'>
            <SecondaryButton
              onClick={() => {
                showModal(<AddSecretForm />);
              }}
            >
              <FiTool /> Access Control
            </SecondaryButton>
            <Button
              onClick={() => {
                showModal(<AddSecretForm />);
              }}
            >
              <FiPlus /> Add New Variable
            </Button>
          </div>
        </PageHeader>
        <main className='flex flex-col mt-8 gap-2'>
          {secrets.map((secret) => (
            <div className='flex gap-6 items-center' key={secret.name}>
              <p className='w-2/6'>{secret.name}</p>
              <div className='w-3/6 flex-grow bg-slate-50 px-4 py-2 blur-sm hover:blur-none'>
                <p>{secret.value}</p>
              </div>

              <div className='justify-self-end ml-auto'>
                <SecondaryButton onClick={() => {}}>
                  <FiEdit />
                </SecondaryButton>
              </div>
            </div>
          ))}
        </main>
      </DashboardLayout>
    </>
  );
};

export default ConfigId;
