import React, { useState } from "react";
interface SidebarLinkGroupProps {
  activeOn: boolean;
  children: any;
}

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({
  children,
  activeOn,
}) => {
  const [open, setOpen] = useState(activeOn);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`p-4 rounded-lg mb-0.5 last:mb-0 ${activeOn && "bg-sec-bg"}`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;
