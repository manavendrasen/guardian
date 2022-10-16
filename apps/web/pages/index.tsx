import React, { useEffect } from "react";
import Button, { SecondaryButton } from "components/Button/Button";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import NextHead from "components/NextHead/NextHead";
import PageHeader from "components/PageHeader/PageHeader";
import ProjectTile from "components/ProjectTile/ProjectTile";
import AddProjectForm from "features/AddProjectForm/AddProjectForm";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import useModal from "store/modalStore";
import useProjectStore from "store/projectStore";
import { getAllProjects } from "common/api/project";
import useAuthStore from "store/authStore";
import { useRouter } from "next/router";

const Web = () => {
  const { showModal } = useModal();
  const { projects, getAllProjects } = useProjectStore();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // if (us) {
    getAllProjects();
    // } else {
    //   router.push("/auth/login");
    // }
  }, []);

  const createNewProjectHandler = () => {
    showModal(<AddProjectForm />);
  };
  return (
    <>
      <NextHead />
      <DashboardLayout>
        <PageHeader title='Projects'>
          <div className='flex gap-4 items-center'>
            <SecondaryButton
              onClick={() => {
                getAllProjects();
              }}
            >
              <FiRefreshCw />
            </SecondaryButton>
            <Button
              onClick={() => {
                createNewProjectHandler();
              }}
            >
              <FiPlus /> Create New Project
            </Button>
          </div>
        </PageHeader>
        <main className='mt-6 grid md:grid-cols-3 gap-4 md:gap-6 grid-cols-1'>
          {projects &&
            projects.map((project) => (
              <ProjectTile
                project={project}
                key={project.id}
                // title={project.name}
                // description={project.description}
                // id={project.id}
              />
            ))}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Web;
