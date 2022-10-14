import NextHead from "components/NextHead/NextHead";
import LoginForm from "features/Auth/Login/LoginForm";
import React from "react";

interface loginProps {}

const login: React.FC<loginProps> = () => {
  return (
    <>
      <NextHead />
      <main className='flex justify-center items-center h-screen'>
        <div className='w-5/6 md:w-1/4'>
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default login;
