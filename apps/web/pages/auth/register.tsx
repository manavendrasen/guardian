import React from "react";
import NextHead from "components/NextHead/NextHead";
import RegisterForm from "features/Auth/Register/RegisterForm";

interface registerProps {}

const register: React.FC<registerProps> = () => {
  return (
    <>
      <NextHead />
      <main className='flex justify-center items-center h-screen'>
        <div className='w-5/6 md:w-1/4'>
          <RegisterForm />
        </div>
      </main>
    </>
  );
};

export default register;
