import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "https://api.green-api.com/";

const initialState = {
  isAuth: false,
  IdInstance: "",
  apiTokenInstance: "",
  senderNumber:false,
};
export const signIn = createAsyncThunk(
  "authUserSlice/authUser",
  async (params) => {
    await fetch(
      BASE_URL +
        `waInstance${params.IdInstance}/getStateInstance/${params.apiTokenInstance}`
    );
    return params;
  }
);
const authSlice = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    signOut(state) {
      state.isAuth = false;
      state.IdInstance = "";
      state.apiTokenInstance = "";
      state.senderNumber=false;
    },
    addSenderNumber(state,action) {
      state.senderNumber = action.payload.number;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.IdInstance = action.payload.IdInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    });
  },
});

export const { signOut, addSenderNumber } = authSlice.actions;
export default authSlice.reducer;
