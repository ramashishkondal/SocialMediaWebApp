import { ReactNode } from "react";

export interface AppLayoutProps {
  isAuthenticated?: Boolean;
  children: string | JSX.Element | JSX.Element[] | ReactNode | null;
}
