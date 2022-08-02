import { useEffect, useState } from "react";
import { FilterEntry } from "./FilterEntry";

export const SearchForm = (props) => {
  const [ingredient, setIngredientText] = useState("");
  const [ingredientFilterValues, setIngredientFilterValues] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    setAllIngredients(props.allIngredients);
  }, [props]);

  const addIngredientToFilter = (oldIngredients) => {
    let filteredIngredientValues = [...oldIngredients, ingredient];
    props.ingredientFilterValues(filteredIngredientValues);
    setIngredientText("");
    return filteredIngredientValues;
  };

  const removeFilterValue = (value) => {
    let filteredIngredientList = ingredientFilterValues.filter(
      (i) => i !== value
    );
    setIngredientFilterValues(filteredIngredientList);
    props.ingredientFilterValues(filteredIngredientList);
  };

  return (
    <div className="search-form">
      <h2>What ingredients do you have?</h2>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredientText(e.target.value)}
      />
      {allIngredients.map((i) => (
        <span>{i}</span>
      ))}
      <button
        onClick={(_) =>
          setIngredientFilterValues((oldIngredients) =>
            addIngredientToFilter(oldIngredients)
          )
        }
      >
        Add Ingredient
      </button>
      {ingredientFilterValues.map((il) => (
        <FilterEntry filterValue={il} onClick={removeFilterValue} />
      ))}
    </div>
  );
};
