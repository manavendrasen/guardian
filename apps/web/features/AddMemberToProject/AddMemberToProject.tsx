import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "components/Button/Button";
import useModal from "store/modalStore";

interface AddMemberToProjectFormProps {}

type AddMemberToProjectFormResponse = {
  name: string;
  description: string;
  webhookUrl: string;
};

const AddMemberToProjectForm: React.FC<AddMemberToProjectFormProps> = () => {
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberToProjectFormResponse>();

  const onSubmit: SubmitHandler<AddMemberToProjectFormResponse> = (data) => {
    console.log(JSON.stringify(data, null, 2));
    // TODO: add project logic
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Add Member
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

        <Button type='submit' onClick={() => {}}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddMemberToProjectForm;
