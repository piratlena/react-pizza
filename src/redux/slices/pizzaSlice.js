import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',async (params) => {
  const {
    currentPage,
    categoryId,
    sortType,
    search
  } = params;
    const {data} = await axios.get(`https://634cd045acb391d34a8c8718.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : '' }&sortBy=${sortType.sortProperty}&order=desc${search}`)
    return data
  }
)

const initialState = {
  items: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
     setItems (state, action) {
        state.items = action.payload;
   }
 },
 extraReducers: {
  [fetchPizzas.pending] : (state, action) => {
    console.log("Идет отправка запроса")
      },
  [fetchPizzas.fulfilled] : (state, action) => {
console.log("Запрос обработан",state)
  },
  [fetchPizzas.rejected] : (state, action) => {
    console.log("Произошла ошибка")
      }
 }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer