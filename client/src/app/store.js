import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feautures/user/userSlice";
import subscriptionReducer from "../feautures/subscription/subscriptionSlice";

import { firebaseReducer } from "react-redux-firebase";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
    firebase: firebaseReducer,
  },
});
