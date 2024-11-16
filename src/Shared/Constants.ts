const STRING: string = "Test";
export { STRING };

const ROUTES = {
  HOMEPAGE: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  NEWSFEED: "/newsfeed",
  USERPROFILE: "/userprofile",
  ABOUT: "/about-us",
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.HOMEPAGE,
  PRIVATE: ROUTES.LOGIN,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: "Home",
  },
  SIGNUP: {
    path: ROUTES.SIGNUP,
    title: "Signup",
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: "Login",
  },

  NEWSFEED: {
    path: ROUTES.NEWSFEED,
    title: "News Feed",
  },
  USERPROFILE: {
    path: ROUTES.USERPROFILE,
    title: "User Profile",
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: "About us",
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
