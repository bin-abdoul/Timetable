import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  firsName: string;
  lastName: string;
  email: string;
  uid: string;
  photoURL?: string;
};

const initialState: User = {
  firsName: "",
  lastName: "",
  email: "",
  uid: "",
  photoURL: "",
};
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.firsName = action.payload.firsName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
    },
    resetUser: (state) => {
      state.firsName = "";
      state.lastName = "";
      state.email = "";
      state.uid = "";
      state.photoURL = "";
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
