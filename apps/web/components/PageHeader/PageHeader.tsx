import React from "react";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className='flex justify-between items-center'>
      <h3 className='text-2xl font-medium'>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default PageHeader;
