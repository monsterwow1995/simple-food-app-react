import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./CartModal.module.css";

const CartModal = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartItems] = useState(cartCtx.cartItems.items);

  const getTotalAmount = () => {
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += (cartItems[i].price * cartItems[i].amount);
    }

    return totalPrice.toFixed(2);
  };

  const addOrDecreaseAmountHandler = (id, name, price, amount) => {
      cartCtx.onAddCartItem(id, name, price, amount);
  }

  const backdrop = (
    <div className={classes.backdrop} onClick={props.onClose}></div>
  );
  const modal = (
    <div className={classes.modal}>
      <ul className={classes["cart-items"]}>
        {cartItems.map((item) => (
          <CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={addOrDecreaseAmountHandler} onRemove={addOrDecreaseAmountHandler}/>
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${getTotalAmount()}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );

  ReactDOM.createPortal(backdrop, document.getElementById("backdrop-root"));
  ReactDOM.createPortal(modal, document.getElementById("modal-root"));

  return (
    <React.Fragment>
      {backdrop}
      {modal}
    </React.Fragment>
  );
};

export default CartModal;
