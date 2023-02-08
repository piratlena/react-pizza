import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IPizzaSlice, Status, Pizza } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
