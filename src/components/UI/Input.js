import React, { createRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const amountRef = createRef();
  useImperativeHandle(ref, () => {
    return {
      amount: () => {
        return parseInt(amountRef.current.value);
      }
    };
  });
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={amountRef} {...props.input}></input>
    </div>
  );
});

export default Input;
