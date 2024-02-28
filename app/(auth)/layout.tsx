import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="flex justify-center items-center min-h-[80vh]">{children}</div>;
};

export default AuthLayout;
