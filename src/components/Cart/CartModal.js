import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import classes from "./CartModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <ul className={classes["cart-items"]}>{props.children}</ul>
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${props.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

const CartModal = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartItems] = useState(cartCtx.items);

  const getTotalAmount = () => {
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price * cartItems[i].amount;
    }

    return totalPrice.toFixed(2);
  };

  const addAmountHandler = (id, name, price) => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: 1
    });
  };

  const removeAmountHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const backdrop = <Backdrop onClose={props.onClose} />;

  const modalOverlay = (
    <ModalOverlay totalAmount={getTotalAmount()} onClose={props.onClose}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addAmountHandler}
          onRemove={removeAmountHandler}
        />
      ))}
    </ModalOverlay>
  );

  ReactDOM.createPortal(backdrop, document.getElementById("backdrop-root"));
  ReactDOM.createPortal(modalOverlay, document.getElementById("modal-root"));

  return <React.Fragment>
    {backdrop}
    {modalOverlay}
  </React.Fragment>;
};

export default CartModal;
