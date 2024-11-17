import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/Constants";
import { CustomRouter } from "./RootRoutes";
import NewsFeed from "../Views/NewsFeed";
import Bookmarks from "../Views/Bookmarks";
import Explore from "../Views/Explore";
import Home from "../Views/Home";
import Profile from "../Views/Profile";
import Community from "../Views/Community";

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Home />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Explore />,
    title: ROUTES_CONFIG.EXPLORE.title,
  },
  {
    path: ROUTES_CONFIG.NEWSFEED.path,
    element: <NewsFeed />,
    title: ROUTES_CONFIG.NEWSFEED.title,
  },
  {
    path: ROUTES_CONFIG.BOOKMARKS.path,
    element: <Bookmarks />,
    title: ROUTES_CONFIG.EXPLORE.title,
  },
  {
    path: ROUTES_CONFIG.COMMUNITY.path,
    element: <Community />,
    title: ROUTES_CONFIG.COMMUNITY.title,
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
