import React, { useEffect, useState } from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartImage from "../Cart/CartImage";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartItemsNumber, setCartItemsNumber] = useState(
    cartCtx.items.length
  );
  const [btnIsBumped, setBtnIsBumped] = useState(false);

  const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ""}`;

  useEffect(() => {
    setCartItemsNumber(cartCtx.items.length);

    if (cartCtx.items.length === 0) return;

    setBtnIsBumped(true);

    setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);
  }, [cartCtx.items.length]);

  return (
    <React.Fragment>
      <button className={btnClasses} onClick={props.onShow}>
        <span className={classes.icon}>
          <CartImage />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartItemsNumber}</span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
