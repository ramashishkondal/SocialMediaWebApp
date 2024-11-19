import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { CustomLoaderProps } from "./types";

function CustomLoader({ children }: Readonly<CustomLoaderProps>) {
  // redux use
  const { isLoading } = useSelector((state: RootState) => state.loader);

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#80808080] z-50">
          <span className="loader" />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default CustomLoader;
