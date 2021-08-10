import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saasApi from "../../api/saas";

const initialState = {
  status: "",
  current_period_end: "",
  current_period_start: "",
  amount: "",
  currency: "",
  interval: "",
  plan: "",
  default_payment_method: null,
  cancel_at: "",
  cancel_at_period_end: null,
  canceled_at: "",
  collection_method: "",
};

export const getSubscription = createAsyncThunk(
  "subscription/getSubscription",
  async () => {
    try {
      const { data } = await saasApi.get("/stripe/subscription");
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.current_period_end = action.payload.current_period_end;
      state.current_period_start = action.payload.current_period_start;
      state.amount = action.payload.amount;
      state.currency = action.payload.currency;
      state.interval = action.payload.interval;
      state.plan = action.payload.plan;
      state.default_payment_method = action.payload.default_payment_method;
      state.cancel_at = action.payload.cancel_at;
      state.cancel_at_period_end = action.payload.cancel_at_period_end;
      state.canceled_at = action.payload.canceled_at;
      state.collection_method = action.payload.collection_method;
    });
  },
});

// Action creators are generated for each case reducer function
/* export const { someReducer } = subscriptionSlice.actions; */

export default subscriptionSlice.reducer;
