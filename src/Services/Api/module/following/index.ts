import { Following } from "../../../../Shared/types";
import api from "../../api";

type FollowingCollection = {
  node: Following;
}[];
type FollowingCollectionJoinUser = {
  node: Following & {
    byUser: { name: string; profilePictureUrl: string | null };
  };
}[];

type FollowingResponse = {
  data: {
    followingCollection: {
      edges: {
        node: Following;
      }[];
    };
  };
};
type PostResponseJoinUser = {
  data: {
    followingCollection: {
      edges: {
        node: Following & {
          byUser: { name: string; profilePictureUrl: string | null };
        };
      }[];
    };
  };
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchFollowingData: build.query<FollowingCollectionJoinUser, void>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.followingCollection.edges;
      },
      query: () => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query followingData {
                followingCollection {
                  edges {
                    node {
                        id    
                        createdAt
                        byUser{
                          name
                          profilePictureUrl
                        }
                        text
                        imageUrl
                    }
                  }
                }
              }
          `,
        }),
      }),
    }),
    checkIfFollowingUserById: build.query<
      FollowingCollectionJoinUser,
      { followerId: string; followedId: string }
    >({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.followingCollection.edges;
      },
      query: ({ followerId, followedId }) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query followingData( $followerId: String!, $followedId: String!){
                followingCollection(filter: {followedId:{eq:$followedId}, followerId: {eq:$followerId}}){
                  edges{
                    node{
                      id
                    createdAt
                    }
                  }
                }
              }
          `,
          variables: {
            followerId,
            followedId,
          },
        }),
      }),
    }),
    fetchFollowingDataById: build.query<FollowingCollection, string>({
      transformResponse: (baseQueryReturn: FollowingResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.followingCollection.edges;
      },
      query: (userId) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query followingDataById{
                postsCollection(filter:{id:{eq:"${userId}"}}){
                  edges{
                    node{
                        id    
                        createdAt
                        byUserId
                        text
                        imageUrl
                    }
                  }
                }
              }
          `,
        }),
      }),
    }),
    fetchFollowedUsers: build.query<FollowingCollection, string>({
      transformResponse: (baseQueryReturn: FollowingResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.followingCollection.edges;
      },
      query: (userId) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
        query GetFollowedUsers($followerId: String!) {
          followingCollection(filter: { followerId: { eq: $followerId } }) {
            edges {
              node {
                followedId
              }
            }
          }
        }
          `,
          variables: {
            followerId: userId,
          },
        }),
      }),
    }),
    storeFollowingData: build.mutation<
      FollowingCollection,
      { followerId: string; followedId: string }
    >({
      query: ({ followerId, followedId }) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation insertIntoFollowingCollection( $followerId: String!, $followedId: String!) {
              insertIntoFollowingCollection(objects: [{ followerId: $followerId, followedId: $followedId}]) {
                affectedCount
              }
            }
          `,
          variables: {
            followerId,
            followedId,
          },
        }),
      }),
    }),
    unfollow: build.mutation<
      FollowingCollection,
      { followerId: string; followedId: string }
    >({
      query: ({ followerId, followedId }) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
           mutation unFollow( $followerId: String!, $followedId: String!){
            deleteFromFollowingCollection(filter:{followerId:{eq:$followerId}, followedId:{eq:$followedId}}){
              affectedCount
            }
          }
          `,
          variables: {
            followerId,
            followedId,
          },
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the hook for use in components
export const {
  useFetchFollowingDataByIdQuery,
  useFetchFollowingDataQuery,
  useStoreFollowingDataMutation,
  useFetchFollowedUsersQuery,
  useCheckIfFollowingUserByIdQuery,
  useUnfollowMutation,
} = userApi;
