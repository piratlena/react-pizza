import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name:'популярности', 
    sortProperty:'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryId (state, action) {
      state.categoryId = action.payload
    },
    setSort (state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters (state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    }
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer