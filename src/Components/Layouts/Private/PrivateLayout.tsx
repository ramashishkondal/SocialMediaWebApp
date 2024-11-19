import { AppLayoutProps } from "../AppLayout.d";
import Drawer from "./Drawer";

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <Drawer />
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100">{children}</div>
    </div>
  );
}

export default PrivateLayout;
