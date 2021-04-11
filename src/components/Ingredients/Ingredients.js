import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there");
  }
};

const Ingredients = () => {
  /*Initialize*/
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest } = useHttp();
  /*Initialize*/
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", [userIngredients]);
  });
  /*with empty array it operates like componentDidMount */
  /*This removes the infinite loop when setUserIngredients is executed */

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  /*callback reduces rebuilding of 'addingredient' handler functon therefore 'IngredientForm' is not rebuilt*/
  /*Has no external dependencies except dispatchHttp whih is handled by react */
  const addIngredientHandler = useCallBack((ingredient) => {
    sendRequest(
      "https://react-hooks-update-6938c-default-rtdb.firebaseio.com/ingredients.json",
      "SEND"
    );
    //   // setIsLoading(true);
    //   // dispatchHttp({ type: "SEND" });
    //   fetch(
    //     "https://react-hooks-update-6938c-default-rtdb.firebaseio.com/ingredients.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify(ingredient),
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //     .then((response) => {
    //       // setIsLoading(false);
    //       dispatchHttp({ type: "RESPONSE" });
    //       return response.json();
    //     })
    //     .then((responseData) => {
    //       // setUserIngredients((prevIngredients) => [
    //       //   ...prevIngredients,
    //       //   { id: responseData.name, ...ingredient },
    //       // ]);
    //       dispatch({
    //         type: "ADD",
    //         ingredient: { id: responseData.name, ...ingredient },
    //       });
    //     });
  }, []);
  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-hooks-update-6938c-default-rtdb.firebaseio.com/ingredients${ingredientId}.json`,
        "DELETE"
      );
    },
    [sendRequest]
  );
  const clearError = useCallBack(() => {
    // setError(null);
    // dispatchHttp({
    //   type: "CLEAR",
    // });
  }, []);
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={(id) => {
          removeIngredientHandler(id);
        }}
      />
    );
  }, [userIngredients, removeIngredientHandler]);
  /*IngredientList re-renders whenever userIngredients and removeIngredientHandler changes  */
  return (
    <div className="App">
      {/* {error ? <ErrorModal /> : null} */}
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {IngredientList}
      </section>
    </div>
  );
};
/*If you are storing components use React.memo */
/*'useMemo' stores data which you do not want to re-create on each render*/
/*example if you have a component which does a complex calculation */
/*ou do not want it to re-render each time so hence useMemo or React.Memo on the component*/
export default Ingredients;
