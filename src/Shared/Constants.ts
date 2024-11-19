const STRING: string = "Test";
export { STRING };

const ROUTES = {
  ONBOARDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOMEPAGE: "/home",
  NEWSFEED: "/newsfeed",
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

  NEWSFEED: {
    path: ROUTES.NEWSFEED,
    title: "News Feed",
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
