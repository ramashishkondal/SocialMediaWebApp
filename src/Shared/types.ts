export type User = {
  id: string;
  createdAt: string;
  name: string;
  userName: string;
  email: string;
  dob: string;
  profilePictureUrl: string | null;
};

export type Post = {
  id: string;
  createdAt: string;
  byUserId: string;
  text: string;
  imageUrl: string | null;
};

export type Following = {
  id: string;
  createdAt: string;
  followerId: string;
  followedId: string;
};

export type PostsTags = {
  id: string;
  createdAt: string;
  postId: string;
  userName: string;
};
