import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import useProjectStore from "store/projectStore";
import useAlert from "store/alertStore";

interface AddProjectFormProps {}

type AddProjectFormResponse = {
  name: string;
  description: string;
  webhook: string;
};

const AddProjectForm: React.FC<AddProjectFormProps> = () => {
  const { hideModal } = useModal();
  const { success } = useAlert();
  const { addProject } = useProjectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectFormResponse>();

  const onSubmit: SubmitHandler<AddProjectFormResponse> = (data) => {
    addProject(data);
    success("Successfully added project");
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <h4 className='font-medium text-lg mb-4'>New Project</h4>
        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Project Name
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Amazing-New-Project'
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className='text-xs text-red-500 m-2 font-medium'>
              This field is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor='desc'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Description
          </label>
          <textarea
            id='desc'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            rows={4}
            placeholder='Tell us about your project!'
            {...register("description")}
          />
        </div>
        <div>
          <label
            htmlFor='webhook'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Slack Webhook
          </label>
          <input
            type='text'
            id='webhook'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='https://hooks.slack.com/...'
            {...register("webhook")}
          />
        </div>
        {/* <div className='mb-2'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Microsoft Teams Webhook
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Amazing-New-Project'
          />
        </div> */}

        <Button type='submit' onClick={() => {}}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddProjectForm;
