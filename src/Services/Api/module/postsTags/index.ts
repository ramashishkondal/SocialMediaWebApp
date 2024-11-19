import { PostsTags } from "../../../../Shared/types";
import api from "../../api";

type postsTagsCollection = {
  node: PostsTags;
}[];
type postsTagsCollectionJoinUser = {
  node: PostsTags & {
    users: { name: string; profilePictureUrl: string | null };
  };
}[];

type PostResponseJoinUser = {
  data: {
    postsTagsCollection: {
      edges: {
        node: PostsTags & {
          users: { name: string; profilePictureUrl: string | null };
        };
      }[];
    };
  };
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchTagsByPostId: build.query<postsTagsCollectionJoinUser, void>({
      transformResponse: (baseQueryReturn: PostResponseJoinUser) => {
        return baseQueryReturn.data.postsTagsCollection.edges;
      },
      query: () => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              query postsTagsDataByPostId{
                postsTagsCollection{
                  edges{
                    node{
                      postId
                      userName
                      users{
                        name
                        profilePictureUrl
                      }
                    }
                  }
                }
              }
          `,
        }),
      }),
    }),

    storeMultipleTags: build.mutation<
      postsTagsCollection,
      { postId: string; userName: string }[]
    >({
      query: (tagsDataRow) => ({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
              mutation insertManyTags($tagsDataRow:postsTagsInsertInput!){
                insertIntopostsTagsCollection(objects:$tagsDataRow)
              }
          `,
          variables: {
            tagsDataRow,
          },
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFetchTagsByPostIdQuery, useStoreMultipleTagsMutation } =
  userApi;
