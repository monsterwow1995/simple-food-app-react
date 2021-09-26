import React, { useEffect, useState } from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartImage from "../Cart/CartImage";
import CartModal from "../Cart/CartModal";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const cartCtx = useContext(CartContext);
  const [cartItemsNumber, setCartItemsNumber] = useState(
    cartCtx.cartItems.items.length
  );
  const [btnIsBumped, setBtnIsBumped] = useState(false);
  
  const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ""}`;
  
  useEffect(() => {
    setCartItemsNumber(cartCtx.cartItems.items.length);

    if (cartCtx.cartItems.items.length === 0) return;

    setBtnIsBumped(true);

    setTimeout(() => {
      setBtnIsBumped(false);
    }, 300)
  }, [cartCtx.cartItems.items.length]);

  const showModalHandler = () => {
    setIsClicked(true);
  };

  const closeModalHandler = () => {
    setIsClicked(false);
  };

  return (
    <React.Fragment>
      <button
        className={btnClasses}
        onClick={showModalHandler}
      >
        <span className={classes.icon}>
          <CartImage />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartItemsNumber}</span>
      </button>
      {isClicked && <CartModal onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default HeaderCartButton;
