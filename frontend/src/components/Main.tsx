import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return <main className={className}>{children}</main>;
}

export default Main;
