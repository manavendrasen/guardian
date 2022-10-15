import React, { useState, useEffect, useRef } from "react";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import { FiX } from "react-icons/fi";
import useProjectStore from "store/projectStore";

interface AddMemberToProjectFormProps {}

const AddMemberToProjectForm: React.FC<AddMemberToProjectFormProps> = () => {
  const { hideModal } = useModal();
  const { project, addMembersToProject } = useProjectStore();
  const [input, setInput] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const deleteMember = (index: number) => {
    setMembers((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !members.includes(trimmedInput)
    ) {
      e.preventDefault();
      setMembers((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (
      key === "Backspace" &&
      !input.length &&
      members.length &&
      isKeyReleased
    ) {
      const tagsCopy = [...members];
      const poppedMember = tagsCopy.pop();
      e.preventDefault();
      setMembers(tagsCopy);
      setInput(poppedMember!);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const submitForm = () => {
    addMembersToProject(members)
  };

  return (
    <form>
      <div className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Add Member Emails
          </label>

          <input
            type='email'
            id='email'
            value={input}
            placeholder='Enter a tag'
            onKeyDown={onKeyDown}
            onChange={onChange}
            onKeyUp={onKeyUp}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        <div
          style={{
            maxHeight: "200px",
            overflowY: "scroll",
          }}
        >
          {members.length > 0 ? (
            <>
              <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Members ({members.length})
              </p>
              <div className='flex flex-col gap-2'>
                {members.map((tag, index) => (
                  <div
                    className='w-min flex gap-2 py-2 px-4 rounded-sm justify-between items-center'
                    style={{
                      background: "#e2e8f0",
                      borderRadius: "4px",
                    }}
                  >
                    <p className='block font-medium pb-1'>{tag}</p>
                    <button onClick={() => deleteMember(index)}>
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <p className='text-slate-600 text-sm'>
                Enter the email to add member
              </p>
            </div>
          )}
        </div>

        <Button onClick={submitForm}>Save</Button>
      </div>
    </form>
  );
};

export default AddMemberToProjectForm;
