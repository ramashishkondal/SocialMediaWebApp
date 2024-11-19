import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Shared/types";

const initialState: User = {
  id: "",
  createdAt: "",
  dob: "",
  email: "",
  name: "",
  userName: "",
  profilePictureUrl: null,
};

const loader = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => ({
      ...action.payload,
    }),
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = loader.actions;

export default loader.reducer;
