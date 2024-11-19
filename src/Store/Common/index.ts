import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

const initialState: {
  token: Session | null;
} = {
  token: null,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateAuthTokenRedux: (state, action: PayloadAction<Session | null>) => ({
      ...state,
      token: action.payload,
    }),
  },
});

export const { updateAuthTokenRedux } = common.actions;

export default common.reducer;
