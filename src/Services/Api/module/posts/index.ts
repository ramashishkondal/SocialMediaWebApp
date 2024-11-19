import { Post } from "../../../../Shared/types";
import api from "../../api";

type PostsCollection = {
  node: Post;
}[];
type PostsCollectionJoinUser = {
  node: Post & {
    byUser: { name: string; profilePictureUrl: string | null };
  };
}[];

type PostResponse = {
  data: {
    postsCollection: {
      edges: {
        node: Post;
      }[];
    };
  };
};

type PostResponseJoinUser = {
  data: {
    postsCollection: {
      edges: {
        node: Post & {
          byUser: { name: string; profilePictureUrl: string | null };
        };
      }[];
    };
  };
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchPostsData: build.query<PostsCollectionJoinUser, number>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: (upto) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query postData($upto:Int!) {
                postsCollection(first:$upto) {
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
          variables: {
            upto,
          },
        }),
      }),
    }),
    fetchPostsDataByTime: build.query<PostsCollectionJoinUser, number>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: (upto) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
               query postData($upto:Int!) {
                postsCollection(orderBy:{createdAt:DescNullsLast},first:$upto) {
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
          variables: {
            upto,
          },
        }),
      }),
    }),
    fetchPostsDataById: build.query<PostsCollection, string>({
      transformResponse: (baseQueryReturn: PostResponse) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: (userId) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query postDataById{
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
    fetchPostsDataByFollowedUsers: build.query<
      PostsCollectionJoinUser,
      string[]
    >({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: (followedIds) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
        query GetPostsByFollowedUsers($followedIds: [String!]!) {
          postsCollection(
            filter: { byUserId: { in: $followedIds } }
            orderBy: { createdAt: DescNullsLast }
          ) {
            edges {
              node {
                id
                createdAt
                text
                imageUrl
                byUser{
                  name
                  profilePictureUrl
                }
              }
            }
          }
        }
      `,
          variables: {
            followedIds,
          },
        }),
      }),
    }),

    storePostData: build.mutation<
      PostsCollection,
      { imageUrl: string | null; text: string; byUserId: string }
    >({
      query: (post) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation insertIntoPostsCollection( $byUserId: String!, $text: String!, $imageUrl: String!) {
              insertIntoPostsCollection(objects: [{ byUserId: $byUserId, text: $text, imageUrl: $imageUrl }]) {
                affectedCount
              }
            }
          `,
          variables: {
            imageUrl: post.imageUrl,
            text: post.text,
            byUserId: post.byUserId,
          },
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the hook for use in components
export const {
  useFetchPostsDataByIdQuery,
  useFetchPostsDataQuery,
  useFetchPostsDataByTimeQuery,
  useFetchPostsDataByFollowedUsersQuery,
  useStorePostDataMutation,
} = userApi;
