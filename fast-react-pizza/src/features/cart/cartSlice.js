import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      pizzaId: 13,
      name: "Peppy Paneer",
      unitPrice: 16,
      quantity: 2,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = id
      state.cart.filter((item) => item.pizzaId !== action.payload.id);
    },
    increaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload.id);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload.id);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, clearCart, decreaseItemQuantity, increaseItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
