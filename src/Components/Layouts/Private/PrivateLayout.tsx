import { useDispatch, useSelector } from "react-redux";
import { useLazyFetchUserDataByIdQuery } from "../../../Services/Api/module/users";
import { AppLayoutProps } from "../AppLayout.d";
import Drawer from "./Drawer";
import { RootState } from "../../../Store";
import { useEffect } from "react";
import { setLoading } from "../../../Store/Loader";
import { setUser } from "../../../Store/User";

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const token = useSelector((state: RootState) => state.common.token);
  const user = useSelector((state: RootState) => state.user);
  const [fetchUserData, { isLoading, isError, error }] =
    useLazyFetchUserDataByIdQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id === "" && token) {
      if (isLoading) {
        dispatch(setLoading(true));
      }
      fetchUserData(token.user.id).then(({ data }) => {
        if (data) {
          dispatch(setUser(data[0].node));
          dispatch(setLoading(false));
        }
      });
    }
  }, [user, token, isLoading, dispatch]);

  if (isError) {
    console.error("Error fetching user data:", error);
    return <div>Error loading user data</div>; // Show an error message
  }

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
