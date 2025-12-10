import React, { ReactNode } from "react";

interface LogisticsItemProps {
  children: React.ReactNode;
  className?: string;
}

const LogisticsItem: React.FC<LogisticsItemProps> = ({ children }) => {
  return (
    <li
      className="
        flex items-center gap-4 
        text-gray-700 bg-white border border-gray-100 
        rounded-md shadow-sm p-3
      "
    >
      <span className="text-base font-medium">{children}</span>
    </li>
  );
};

export default LogisticsItem;
