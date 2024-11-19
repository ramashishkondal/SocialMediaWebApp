const STRING: string = "Test";
export { STRING };

const ROUTES = {
  ONBOARDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOMEPAGE: "/home",
  EXPLORE: "/explore",
  NEWSFEED: "/newsfeed",
  BOOKMARKS: "/bookmarks",
  COMMUNITY: "/communities",
  PROFILE: "/profile",
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.ONBOARDING,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  ONBOARDING: {
    path: ROUTES.ONBOARDING,
    title: "Onboarding",
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: "Signup",
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: "Login",
  },
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: "Home",
  },
  EXPLORE: {
    path: ROUTES.EXPLORE,
    title: "Explore",
  },
  NEWSFEED: {
    path: ROUTES.NEWSFEED,
    title: "News Feed",
  },
  BOOKMARKS: {
    path: ROUTES.BOOKMARKS,
    title: "Bookmarks",
  },
  COMMUNITY: {
    path: ROUTES.COMMUNITY,
    title: "Community",
  },
  PROFILE: {
    path: ROUTES.PROFILE,
    title: "Profile",
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
