import { AppLayoutProps } from "../AppLayout.d";
import Footer from "./Footer";

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;
