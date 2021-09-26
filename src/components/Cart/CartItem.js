import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${(props.price).toFixed(2)}`;

  const increaseAmountHandler = () => {
      props.onAdd(props.id, props.name, props.price, 1);
  }

  const decreaseAmountHandler = () => {
    props.onRemove(props.id, props.name, props.price, -1);
}

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={decreaseAmountHandler}>−</button>
        <button onClick={increaseAmountHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;