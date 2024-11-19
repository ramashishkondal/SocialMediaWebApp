import { useDispatch, useSelector } from "react-redux";
import { useFetchUserDataByIdQuery } from "../../../Services/Api/module/users";
import { AppLayoutProps } from "../AppLayout.d";
import Drawer from "./Drawer";
import { RootState } from "../../../Store";
import { useEffect } from "react";
import { setLoading } from "../../../Store/Loader";
import { setUser } from "../../../Store/User";

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const id = useSelector((state: RootState) => state.common.token?.user.id);
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, error } = useFetchUserDataByIdQuery(id ?? "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id === "" && id) {
      if (isLoading) {
        dispatch(setLoading(true));
      }
      if (data?.length) {
        console.log("daaaa", data);

        dispatch(setUser(data[0].node));
        dispatch(setLoading(false));
      }
    }
  }, [user, id, data, isLoading, dispatch]);

  if (error) {
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
