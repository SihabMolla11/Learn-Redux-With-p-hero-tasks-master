import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isError: false,
  error: '',
};

export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {
    displayName: name,
  });


  return {
    email: data.user.email,
    name: data.user.displayName,
  }
});

export const loginUser = createAsyncThunk('userSlice/loginUser', async ({ email, password }) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  console.log(data);
  return {
    email: data.user.email,
    name: data.user.displayName,
  }
})

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logOut: (state) => {
      state.name = '';
      state.email = '';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.name = '';
      state.email = '';
      state.error = '';
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.name = payload.name;
      state.email = payload.email;
      state.error = '';
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.name = '';
      state.email = '';
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.name = '';
      state.email = '';
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.name = payload.name;
      state.email = payload.email;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.name = '';
      state.email = '';
      state.error = action.error.message;
    });

  }
});

export const { setUser, toggleLoading, logOut } = userSlice.actions;

export default userSlice.reducer;