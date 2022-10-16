import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import { Environment } from "constants/Environments";
import useConfigStore from "store/configStore";
import useAlert from "store/alertStore";

interface AddConfigFormProps {
  environment: Environment;
}

type AddConfigFormResponse = {
  name: string;
  description: string;
};

const AddConfigForm: React.FC<AddConfigFormProps> = ({ environment }) => {
  const { hideModal } = useModal();
  const { success } = useAlert();
  const { addConfig } = useConfigStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddConfigFormResponse>();

  const onSubmit: SubmitHandler<AddConfigFormResponse> = (data) => {
    console.log(JSON.stringify(data, null, 2));
    addConfig(
      {
        name: data.name,
        description: data.description,
        environment: Environment[environment],
      },
      success
    );
    // addConfig(data);

    hideModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <h4 className='font-medium text-lg mb-4'>New Config</h4>
        <hr />
        <div className='flex justify-between items-center'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Environment
          </label>
          <p
            className='py-2 px-3 text-sm font-medium'
            style={{
              background: "#cbd5e1",
              fontSize: "14px",
              borderRadius: "8px",
              fontWeight: "semibold",
            }}
          >
            {Environment[environment]}
          </p>
        </div>

        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Config Name
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='FRONTEND_TEAM'
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
            placeholder='What is this config for?'
            {...register("description")}
          />
        </div>

        <Button type='submit' onClick={() => {}}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddConfigForm;
