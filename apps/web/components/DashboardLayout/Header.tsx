import React from "react";
import useDashboardStore from "store/dashboardStore";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { isVisible, setIsVisible } = useDashboardStore();
  return (
    <header className='bg-white'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 -mb-px'>
          <div className='flex'>
            <button
              className='text-slate-500 hover:text-slate-600 lg:hidden'
              aria-controls='sidebar'
              aria-expanded={isVisible}
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(!isVisible);
              }}
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6 fill-current'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect x='4' y='5' width='16' height='2' />
                <rect x='4' y='11' width='16' height='2' />
                <rect x='4' y='17' width='16' height='2' />
              </svg>
            </button>
          </div>
          <div className='flex items-center'>
            <div className='inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600'>
              <span className='font-medium text-gray-600 dark:text-gray-300'>
                JL
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
