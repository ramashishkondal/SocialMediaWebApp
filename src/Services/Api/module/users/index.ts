import { User } from "../../../../Shared/types";
import api from "../../api";

type UsersCollection = {
  node: User;
}[];

type UsersResponse = {
  data: {
    usersCollection: {
      edges: {
        node: User;
      }[];
    };
  };
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchUsersData: build.query<UsersCollection, void>({
      transformResponse: (baseQueryReturn: UsersResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.usersCollection.edges;
      },
      query: () => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query usersData {
                usersCollection {
                  edges {
                    node {
                      name
                      id
                      createdAt
                      profilePictureUrl
                    }
                  }
                }
              }
          `,
        }),
      }),
    }),
    fetchUserDataById: build.query<UsersCollection, string>({
      transformResponse: (baseQueryReturn: UsersResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.usersCollection.edges;
      },
      query: (userId) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query userDataById{
                usersCollection(filter:{id:{eq:"${userId}"}}){
                  edges{
                    node{
                      name
                      id
                      createdAt
                      email
                      dob
                      profilePictureUrl
                    }
                  }
                }
              }
          `,
        }),
      }),
    }),
    storeUserData: build.mutation<
      UsersCollection,
      {
        id: string;
        name: string;
        email: string;
        dob: string;
        profilePictureUrl: string | null;
      }
    >({
      query: (user) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation insertUserData($id: String!, $name: String!, $email: String!, $dob: String!,$profilePictureUrl: String!) {
              insertIntousersCollection(objects: [{ id: $id, name: $name, email: $email, dob: $dob, profilePictureUrl: $profilePictureUrl }]) {
                affectedCount
              }
            }
          `,
          variables: {
            id: user.id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            profilePictureUrl: user.profilePictureUrl,
          },
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the hook for use in components
export const {
  useFetchUsersDataQuery,
  useFetchUserDataByIdQuery,
  useStoreUserDataMutation,
} = userApi;
