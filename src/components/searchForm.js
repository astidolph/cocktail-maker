import { useState } from "react";

export const SearchForm = (props) => {
  const [ingredient, setIngredientText] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const addIngredientToFilter = (oldIngredients) => {
    let filteredIngredientList = [...oldIngredients, ingredient];
    props.ingredientList(filteredIngredientList);
    setIngredientText("");
    return filteredIngredientList;
  };

  const removeFilterValue = (value) => {
    let filteredIngredientList = ingredientList.filter((i) => i !== value);
    setIngredientList(filteredIngredientList);
    props.ingredientList(filteredIngredientList);
  };

  return (
    <div className="search-form">
      <h2>What ingredients do you have?</h2>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredientText(e.target.value)}
      />
      <button
        onClick={(_) =>
          setIngredientList((oldIngredients) =>
            addIngredientToFilter(oldIngredients)
          )
        }
      >
        Add Ingredient
      </button>
      {ingredientList.map((il) => (
        <FilterEntry filterValue={il} onClick={removeFilterValue} />
      ))}
    </div>
  );
};

export const FilterEntry = (props) => {
  return (
    <span>
      {props.filterValue}{" "}
      <span onClick={(_) => props.onClick(props.filterValue)}>x</span>
    </span>
  );
};
