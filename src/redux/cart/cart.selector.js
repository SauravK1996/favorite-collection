// import { createStore } from 'redux';
import {createSelector} from 'reselect';

// input selector: it's a function that takes the whole state and returns a slice of it.
const selectCart = state => state.cart;
// const selectUser = state => state.user;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems 
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price,0)
)