import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/Constants";
import Dashboard from "../Views/Dashboard";
import LogIn from "../Views/LogIn";
import SignUp from "../Views/SignUp";
import { CustomRouter } from "./RootRoutes";

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ONBOARDING.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.ONBOARDING.title,
  },
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <LogIn />,
  },
  {
    path: `${ROUTES_CONFIG.SIGNUP.path}`,
    title: ROUTES_CONFIG.SIGNUP.title,
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: "Rendering wildcard",
  },
];
