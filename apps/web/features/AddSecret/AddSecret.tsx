import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import { Environment } from "constants/Environments";
import useAlert from "store/alertStore";
import useSecretStore from "store/secretStore";

interface AddSecretFormProps {}

type AddSecretFormResponse = {
  name: string;
  value: string;
  comment: string;
};

const AddSecretForm: React.FC<AddSecretFormProps> = () => {
  const { hideModal } = useModal();
  const { success } = useAlert();
  const { addSecret } = useSecretStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSecretFormResponse>();

  const onSubmit: SubmitHandler<AddSecretFormResponse> = (data) => {
    console.log(JSON.stringify(data, null, 2));
    addSecret({
      name: data.name,
      value: data.value,
      comment: data.comment,
    });
    success(`Successfully Added Secret`);
    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <h4 className='font-medium text-lg mb-4'>New Secret</h4>
        <hr />

        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Secret Name
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='VARIABLE_NAME'
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
            htmlFor='value'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Secret Name
          </label>
          <input
            type='text'
            id='value'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='**********'
            {...register("value", { required: true })}
          />
          {errors.name && (
            <span className='text-xs text-red-500 m-2 font-medium'>
              This field is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor='comment'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Comment
          </label>
          <textarea
            id='comment'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            rows={4}
            placeholder='What is this secret for?'
            {...register("comment")}
          />
        </div>

        <Button type='submit' onClick={() => {}}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddSecretForm;
