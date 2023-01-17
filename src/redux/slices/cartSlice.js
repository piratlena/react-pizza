import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
  items: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {

    addItem (state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload.id)

        if (findItem) {
            findItem.count++
        } else {
            state.items.push({
                ...action.payload,
            count: 1,
        })
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
               }, 0)
    },
    removeItem (state, action) {
        state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems (state, action) {
        state.items = []
        state.totalPrice = 0
    },
    plusItem (state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload)
        
        if (findItem) {
            findItem.count++
        }
    },
    minusItem (state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload)
        
        if (findItem) {
            findItem.count--
            if (findItem.count < 0) {
                findItem.count = 0
            }
        }
    }
}
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer