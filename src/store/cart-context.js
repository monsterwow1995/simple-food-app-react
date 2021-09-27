import React from "react";
import { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;

const cartStateInitialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const indexOfItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (indexOfItem === -1) {
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      const updatedItems = state.items;
      const updatetTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const item = updatedItems[indexOfItem];
      item.amount += action.item.amount;

      return {
        items: updatedItems,
        totalAmount: updatetTotalAmount,
      };
    }
  } else if (action.type === "REMOVE") {
    const item = state.items.find((item) => item.id === action.id);
    const updatedTotalAmount = state.totalAmount - item.price;

    const updatedAmountOfItem = item.amount - 1;
    item.amount = updatedAmountOfItem;

    const updatedItems = state.items;

    
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].amount === 0) {
        updatedItems.splice(i, i + 1);
        break;
      }
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartStateInitialState
  );

  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeCartItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
