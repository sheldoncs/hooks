import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo((props) => {
  const [inputState, setInputState] = useState({ title: "", amount: "" });
  /*Alternative*/
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  /*Alternative*/
  /*since it is not an object they keep their own states if a change is made*/

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={(event) => {
                setEnteredTitle(event.target.value);
                // newTitle = event.target.value;
                // setInputState((prevInputState) => {
                //   return {
                //     title: newTitle,
                //     amount: prevInputState.amount,
                //   };
                // });
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(event) => {
                setEnteredAmount(event.target.value);
                // const newAmount = event.target.value;
                // setInputState((prevInputState) => {
                //   return {
                //     amount: newAmount,
                //     title: prevInputState.title,
                //   };
                // });
                /*Return */
                // inputState[1]((prevInputState) => ({
                //   amount: event.target.value,
                //   title: prevInputState.title,
                // }))
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.Loading ? <LoadingIndicator /> : null}
            {/* {props.Loading && <LoadingIndicator />} */}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
