import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import Link from "next/link";

interface LoginFormProps {}

type LoginFormResponse = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormResponse>();

  const onSubmit: SubmitHandler<LoginFormResponse> = (data) => {
    console.log(JSON.stringify(data, null, 2));
    // TODO: add logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <p className='font-semibold text-2xl mb-6'>Log In</p>
        <hr />
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Email
          </label>
          <input
            type='text'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='johndoe@example.com'
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className='text-xs text-red-500 m-2 font-medium'>
              This field is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='********'
            {...register("password", { required: true })}
          />
        </div>
        <div className='text-center text-subtext w-full flex justify-center items-center gap-2'>
          <p>Don’t have an account? </p>
          <Link href='/auth/register'>
            <p className='text-blue-500 underline'>Sign Up</p>
          </Link>
        </div>

        <Button type='submit' onClick={() => {}}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
