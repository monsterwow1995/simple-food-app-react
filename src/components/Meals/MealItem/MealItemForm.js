import React, { createRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props, ref) => {
    const input = {
        id: "amount",
        type: "number",
        min: "1",
        max: "5",
        step: "1",
        defaultValue: "1"
    }

    const amountRef = createRef();

    // useImperativeHandle(ref, () => {
    //     return {
    //       amount: () => {
    //         return parseInt(amountRef.current.value);
    //       }
    //     };
    //   });

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAdd(amountRef.current.amount());
    }
  return <form className={classes.form} onSubmit={submitHandler}>
      <Input input={input} ref={amountRef} label="Amount:" />
      <button type="submit">+ Add</button>
  </form>;
};

export default MealItemForm;
