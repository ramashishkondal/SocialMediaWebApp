import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/Constants";
import { CustomRouter } from "./RootRoutes";
import NewsFeed from "../Views/NewsFeed";

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: "<ABOUT />",
    title: ROUTES_CONFIG.ABOUT.title,
  },
  {
    path: ROUTES_CONFIG.NEWSFEED.path,
    element: <NewsFeed />,
    title: ROUTES_CONFIG.NEWSFEED.title,
  },
  {
    path: "/wishlist",
    element: "Your wishlist here",
    title: "Dashboard",
  },
  {
    path: "*",
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: "Rendering wildcard",
  },
];
