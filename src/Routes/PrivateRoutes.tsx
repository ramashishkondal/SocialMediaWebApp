import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/Constants";
import { CustomRouter } from "./RootRoutes";
import NewsFeed from "../Views/NewsFeed";
import Home from "../Views/Home";
import Profile from "../Views/Profile";

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Home />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },

  {
    path: ROUTES_CONFIG.NEWSFEED.path,
    element: <NewsFeed />,
    title: ROUTES_CONFIG.NEWSFEED.title,
  },

  {
    path: ROUTES_CONFIG.PROFILE.path,
    element: <Profile />,
    title: ROUTES_CONFIG.PROFILE.title,
  },
  {
    path: "*",
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: "Rendering wildcard",
  },
];
