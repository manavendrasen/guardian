import Button from "components/Button/Button";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import NextHead from "components/NextHead/NextHead";
import PageHeader from "components/PageHeader/PageHeader";
import ProjectTile from "components/ProjectTile/ProjectTile";
import AddProjectForm from "features/AddProjectForm/AddProjectForm";
import { FiPlus } from "react-icons/fi";
import useModal from "store/modalStore";

const projects = [
  {
    id: "1",
    name: "Poptalk",
    description: "Eu mollit id sit cupidatat aliqua.",
  },
  {
    id: "2",
    name: "Vinyl",
    description: "Eu mollit id sit cupidatat aliqua.",
  },
];

const Web = () => {
  const { showModal } = useModal();
  const createNewProjectHandler = () => {
    showModal(<AddProjectForm />);
  };
  return (
    <>
      <NextHead />
      <DashboardLayout>
        <PageHeader title='Projects'>
          <Button
            onClick={() => {
              createNewProjectHandler();
            }}
          >
            <FiPlus /> Create New Project
          </Button>
        </PageHeader>
        <main className='mt-6 grid md:grid-cols-3 gap-4 md:gap-6 grid-cols-1'>
          {projects &&
            projects.map((project) => (
              <ProjectTile
                key={project.id}
                title={project.name}
                description={project.description}
                id={project.id}
              />
            ))}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Web;
