import { configureStore } from "@reduxjs/toolkit";
import filter from "./filters/filterSlice";
import cart from "./cart/cartSlice";
import pizzas from "./pizzas/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filter,
    cart: cart,
    pizzas: pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
