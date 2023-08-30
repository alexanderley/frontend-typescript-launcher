import React, { ReactNode } from "react";

const IsAnon: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default IsAnon;
