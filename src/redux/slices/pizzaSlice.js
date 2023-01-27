import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, categoryId, sortType, search } = params;
    const { data } = await axios.get(
      `https://634cd045acb391d34a8c8718.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=desc${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});
export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
