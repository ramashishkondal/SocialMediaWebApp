export type User = {
  id: string;
  createdAt: string;
  name: string;
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
