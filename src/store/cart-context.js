import React from "react";
import { useReducer } from "react";

const CartContext = React.createContext([]);

export default CartContext;

const cartItemsInitialState = {
  items: [],
};

const cartItemsReducer = (state, action) => {
  if (action.type === "add") {
    const items = state.items;

    const item = {
      id: action.id,
      name: action.name,
      price: action.price,
      amount: action.amount,
    };

    items.push(item);

    return {
      items: items,
    };
  } else if (action.type === "update") {
    const items = state.items;
    const item = items[action.index];
    const amount = item.amount + action.amount;

    if (amount === 0) {
      items.splice(action.index, action.index + 1);
    } else {
      const updatedItem = {
        ...item,
        amount: amount,
      };

      items[action.index] = updatedItem;
    }

    return {
      items: items,
    };
  }
};

export const CartContextProvider = (props) => {
  const [cartItems, dispatchCartItems] = useReducer(
    cartItemsReducer,
    cartItemsInitialState
  );

  const addCartItemHandler = (id, name, price, amount) => {
    const indexOfItem = cartItems.items.findIndex((item) => item.id === id);

    if (indexOfItem === -1) {
      dispatchCartItems({
        type: "add",
        id: id,
        name: name,
        price: price,
        amount: amount,
      });
    } else {
      dispatchCartItems({
        type: "update",
        amount: amount,
        index: indexOfItem,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        onAddCartItem: addCartItemHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
