import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Button, { SecondaryButton } from "components/Button/Button";
import ConfigTile from "components/ConfigTile/ConfigTile";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import NextHead from "components/NextHead/NextHead";
import PageHeader from "components/PageHeader/PageHeader";
import { Environment } from "constants/Environments";
import AddConfigForm from "features/AddConfig/AddConfig";
import AddMemberToProjectForm from "features/AddMemberToProject/AddMemberToProject";
import { FiPlus, FiGlobe, FiUsers, FiSettings } from "react-icons/fi";
import useModal from "store/modalStore";
import useProjectStore from "store/projectStore";
import useConfigStore from "store/configStore";

interface ProjectIdProps {}

const ProjectId: React.FC<ProjectIdProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project } = useProjectStore();
  const {
    developmentConfigs,
    productionConfig,
    stagingConfigs,
    getAllConfigsForProject,
  } = useConfigStore();
  const { showModal } = useModal();

  useEffect(() => {
    getAllConfigsForProject(id as string);
  }, []);

  return (
    <>
      <NextHead />
      <DashboardLayout>
        <PageHeader title={`Projects > ${project?.name}`}>
          <div className='flex gap-2 items-center'>
            <SecondaryButton onClick={() => {}}>
              <FiSettings /> Settings
            </SecondaryButton>
            <SecondaryButton
              onClick={() => {
                showModal(<AddMemberToProjectForm />);
              }}
            >
              <FiUsers /> Members
            </SecondaryButton>
            <SecondaryButton onClick={() => {}}>
              <FiGlobe /> Integrations
            </SecondaryButton>
          </div>
        </PageHeader>
        <main className='mt-6 grid md:grid-cols-3 gap-4 md:gap-8 grid-cols-1 h-full'>
          <div className=' w-full rounded-lg flex flex-col gap-4'>
            <h6 className='font-medium'>Development</h6>
            <hr />
            <SecondaryButton
              onClick={() => {
                showModal(
                  <AddConfigForm environment={Environment.DEVELOPMENT} />
                );
              }}
            >
              <FiPlus />
            </SecondaryButton>
            {developmentConfigs &&
              developmentConfigs.map((config) => (
                <ConfigTile config={config} />
              ))}
          </div>
          <div className=' w-full rounded-lg flex flex-col  gap-4'>
            <h6 className='font-medium'>Staging</h6>
            <hr />
            <SecondaryButton
              onClick={() => {
                showModal(<AddConfigForm environment={Environment.STAGING} />);
              }}
            >
              <FiPlus />
            </SecondaryButton>
            {stagingConfigs &&
              stagingConfigs.map((config) => <ConfigTile config={config} />)}
          </div>
          <div className=' w-full rounded-lg flex flex-col  gap-4'>
            <h6 className='font-medium'>Production</h6>
            <hr />
            <SecondaryButton
              onClick={() => {
                showModal(
                  <AddConfigForm environment={Environment.PRODUCTION} />
                );
              }}
            >
              <FiPlus />
            </SecondaryButton>
            {productionConfig &&
              productionConfig.map((config) => <ConfigTile config={config} />)}
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default ProjectId;
