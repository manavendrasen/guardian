import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  placeHolder: string;
  id: string;
  required: boolean;
  onChange: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  onChange,
  placeHolder,
  required,
  value,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
      >
        {label}
      </label>
      <input
        type='text'
        id={id}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeHolder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
