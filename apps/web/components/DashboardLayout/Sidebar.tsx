import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarLinkGroup from "./SidebarLinkGroup";
import useDashboardStore from "store/dashboardStore";
import { FiZap, FiSettings } from "react-icons/fi";
import useProjectStore from "store/projectStore";

function Sidebar() {
  const { isVisible, setIsVisible } = useDashboardStore();
  const { projects } = useProjectStore();
  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  return (
    <div>
      <div
        className={`fixed inset-0 bg-bg text-white z-40 hidden transition-opacity lg:z-auto  duration-200 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden='true'
      ></div>

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-80 lg:w-24 lg:sidebar-expanded:!w-80 2xl:!w-80 shrink-0 bg-bg p-8 transition-all duration-200 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-6 pr-3 sm:px-2 px-8'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setIsVisible(!isVisible)}
            aria-controls='sidebar'
            aria-expanded={isVisible}
          >
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
          {/* Logo */}
          <Link href='/' className='block'>
            <p className=' text-white font-medium'>guardian</p>
          </Link>
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            {/* <h3 className='text-xs uppercase text-slate-200 font-semibold pl-3'>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                Proe
              </span>
            </h3> */}
            <ul className='mt-3'>
              {/* Dashboard */}
              <SidebarLinkGroup
                activeOn={
                  pathname === "/" ||
                  pathname.includes("project") ||
                  pathname.includes("config")
                }
              >
                {(handleClick: () => void, open: boolean) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-100 hover:text-white truncate transition duration-150 ${
                          (pathname === "/" ||
                            pathname.includes("project") ||
                            pathname.includes("config")) &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <FiZap />
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Projects
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul
                          className={`pl-9 mt-6 flex flex-col gap-2 ${
                            !open && "hidden"
                          }`}
                        >
                          {projects.map((project) => (
                            <li
                              className='mb-1 block text-slate-400 hover:text-slate-200 transition duration-150 truncate'
                              key={project.id}
                            >
                              <Link href={`/project/${project.id}`}>
                                <span
                                  className={`block text-slate-100 hover:text-primary transition duration-150  text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 cursor-pointer ${
                                    id === project.id && "text-primary"
                                  }`}
                                >
                                  {project.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activeOn={pathname.includes("settings")}>
                {(handleClick: () => void, open: boolean) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-100 hover:text-white truncate transition duration-150 ${
                          pathname.includes("settings") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <FiSettings />
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul
                          className={`pl-9 mt-4 flex flex-col gap-4 ${
                            !open && "hidden"
                          }`}
                        >
                          <li className='mb-1 last:mb-0'>
                            <Link
                              href='/'
                              // className={`block text-slate-400 hover:text-slate-200 transition duration-150 truncate
                              //   ${true ? "text-indigo-500" : "text-green-500"}`}
                            >
                              <span className='block text-slate-400 over:text-slate-200 transition duration-150  text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 cursor-pointer'>
                                Main
                              </span>
                            </Link>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <Link
                              href='/'
                              // className={`block text-slate-400 hover:text-slate-200 transition duration-150 truncate
                              //   ${true ? "text-indigo-500" : "text-green-500"}`}
                            >
                              <span className='block text-slate-400 over:text-slate-200 transition duration-150  text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 cursor-pointer'>
                                Main
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
            </ul>
          </div>
          {/* More group */}
        </div>

        {/* Expand / collapse button */}
        {/* <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto'>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className='sr-only'>Expand / collapse sidebar</span>
              <svg
                className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
                viewBox='0 0 24 24'
              >
                <path
                  className='text-slate-400'
                  d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
                />
                <path className='text-slate-600' d='M3 23H1V1h2z' />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
