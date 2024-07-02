import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [], 
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, userId } = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === product._id && item.userId === userId
      );
    
      if (existingIndex >= 0) {
        state.cartItems[existingIndex].cartTotalQuantity += 1;
      } else {
        const tempProduct = { ...product, cartTotalQuantity: 1, userId };
        state.cartItems.push(tempProduct);
      }
    },
    
    removeFromCart: (state, action) => {
      const { _id, userId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== _id || cartItem.userId !== userId
      );
    },
    
    decreaseCart: (state, action) => {
      const { _id, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === _id && cartItem.userId === userId
      );
    
      if (state.cartItems[itemIndex].cartTotalQuantity > 1) {
        state.cartItems[itemIndex].cartTotalQuantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== _id || cartItem.userId !== userId
        );
      }
    },
    clearCart(state, action) {
      state.cartItems = state.cartItems.filter(cartItem => cartItem.userId !== action.payload);
    },
    getCartTotal(state, action) {
      const userId = action.payload;
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          if (cartItem.userId === userId) {
            const { price, cartTotalQuantity } = cartItem;
            const itemTotal = price * cartTotalQuantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cartTotalQuantity;
          }
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
