import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saasApi from "../../api/saas";

const initialState = {
  name: "",
  email: "",
  photoURL: "",
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const { data } = await saasApi.get("/user");
    console.log("DATA getUser", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
});

export const updatePhotoURL = createAsyncThunk(
  "user/updatePhotoURL",
  async (photoTargetUrl, callback) => {
    try {
      const { data } = await saasApi.put("/user/update-photo-url", {
        photoURL: photoTargetUrl,
      });
      callback();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
    });
    builder.addCase(updatePhotoURL.fulfilled, (state, action) => {
      state.photoURL = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
/* export const { someReducer } = userSlice.actions; */

export default userSlice.reducer;
