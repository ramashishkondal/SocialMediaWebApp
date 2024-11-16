import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import DocumentTitle from "./DocumentTitle";
import { authenticatedRoutes, guestRoutes } from "./config";
import AppLayout from "../Components/Layouts/AppLayout";
import type { RootState } from "../Store";
import { useEffect } from "react";
import { supabase } from "../Shared/SupabaseClient";
import { updateAuthTokenRedux } from "../Store/Common";

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  const token = useSelector((state: RootState) => state?.common?.token);
  const dispatch = useDispatch();
  const isAuthenticated = !!token;

  console.log("token is", token);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("seesison", session);

      dispatch(updateAuthTokenRedux({ token: session }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {token ? authenticated : guest}
      </AppLayout>
    </>
  );
}

export default RootRouter;
