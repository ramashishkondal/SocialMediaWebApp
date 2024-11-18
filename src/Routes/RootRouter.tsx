import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import DocumentTitle from "./DocumentTitle";
import { authenticatedRoutes, guestRoutes } from "./config";
import AppLayout from "../Components/Layouts/AppLayout";
import type { RootState } from "../Store";
import { useEffect } from "react";
import { supabase } from "../Shared/SupabaseClient";
import { updateAuthTokenRedux } from "../Store/Common";
import CustomLoader from "../Components/Molecules/CustomLoader";

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  const token = useSelector((state: RootState) => state?.common?.token);
  const dispatch = useDispatch();
  const isAuthenticated = !!token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateAuthTokenRedux(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <CustomLoader>
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {token ? authenticated : guest}
      </AppLayout>
    </CustomLoader>
  );
}

export default RootRouter;
