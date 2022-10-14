import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-100 font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center items-center gap-2'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
