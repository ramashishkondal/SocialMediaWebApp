import { User } from "../../../../Shared/types";
import api from "../../api";

type UsersCollection = {
  node: User; // no email and dob
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
    fetchUsersData: build.query<
      UsersCollection,
      { userId: string; fetchRecordsUpto: number }
    >({
      transformResponse: (baseQueryReturn: UsersResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.usersCollection.edges;
      },
      query: ({ userId, fetchRecordsUpto }) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query usersData {
                usersCollection(filter:{id:{neq:"${userId}"}},first:${fetchRecordsUpto}) {
                  edges {
                    node {
                      name
                      userName
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
              query userDataById($userId: string!){
                usersCollection(filter:{id:{eq:$userId}}){
                  edges{
                    node{
                      name
                      id
                      createdAt
                      email
                      dob
                      profilePictureUrl
                      userName
                    }
                  }
                }
              }
          `,
          variables: {
            userId,
          },
        }),
      }),
    }),
    fetchUserDataByUserName: build.query<UsersCollection, string>({
      transformResponse: (baseQueryReturn: UsersResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.usersCollection.edges;
      },
      query: (userName) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query userDataById{
                usersCollection(filter:{userName:{eq:"${userName}"}}){
                  edges{
                    node{
                      name
                      id
                      createdAt
                      email
                      dob
                      profilePictureUrl
                      userName
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
        userName: string;
      }
    >({
      query: ({ dob, email, id, name, profilePictureUrl, userName }) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation insertUserData($id: String!, $name: String!, $email: String!, $dob: String!,$profilePictureUrl: String!, $userName: String!) {
              insertIntousersCollection(objects: [{ id: $id, name: $name, email: $email, dob: $dob, profilePictureUrl: $profilePictureUrl, userName: $userName }]) {
                affectedCount
              }
            }
          `,
          variables: {
            id,
            name,
            email,
            dob,
            profilePictureUrl,
            userName,
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
  useFetchUserDataByUserNameQuery,
  useLazyFetchUserDataByUserNameQuery,
  useLazyFetchUserDataByIdQuery,
  useStoreUserDataMutation,
} = userApi;
