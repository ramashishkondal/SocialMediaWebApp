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
    fetchPostsData: build.query<PostsCollectionJoinUser, void>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: () => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query postData {
                postsCollection {
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
    fetchPostsDataByTime: build.query<PostsCollectionJoinUser, void>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        // Return only the "edges" array, which contains the users
        return baseQueryReturn.data.postsCollection.edges;
      },
      query: () => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
               query postData {
                postsCollection(orderBy:{createdAt:DescNullsLast}) {
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
  useStorePostDataMutation,
} = userApi;
