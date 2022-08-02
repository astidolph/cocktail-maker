import { useEffect, useState } from "react";
import { FilterEntry } from "./FilterEntry";

export const SearchForm = (props) => {
  const [ingredientText, setIngredientText] = useState("");
  const [selectedIngredients, setIngredientFilterValues] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  useEffect(() => {
    setAllIngredients(props.allIngredients);
    setFilteredIngredients(props.allIngredients);
  }, [props]);

  const addIngredientToFilter = (oldIngredients) => {
    let filteredIngredientValues = [...oldIngredients, ingredientText];
    props.selectedIngredients(filteredIngredientValues);
    setIngredientText("");
    return filteredIngredientValues;
  };

  const filterIngredientSelection = (textValue) => {
    setIngredientText(textValue);
    setFilteredIngredients(
      allIngredients.filter((i) =>
        i.toLowerCase().startsWith(textValue.toLowerCase())
      )
    );
  };

  const removeFilterValue = (value) => {
    let filteredIngredientList = selectedIngredients.filter((i) => i !== value);
    setIngredientFilterValues(filteredIngredientList);
    props.selectedIngredients(filteredIngredientList);
  };

  return (
    <div className="search-form">
      <h2>What ingredients do you have?</h2>
      <input
        type="text"
        value={ingredientText}
        onChange={(e) => filterIngredientSelection(e.target.value)}
      />
      {ingredientText !== "" && (
        <ul>
          {filteredIngredients.map((i) => (
            <li>{i}</li>
          ))}
        </ul>
      )}
      <button
        onClick={(_) =>
          setIngredientFilterValues((oldIngredients) =>
            addIngredientToFilter(oldIngredients)
          )
        }
      >
        Add Ingredient
      </button>
      {selectedIngredients.map((il) => (
        <FilterEntry filterValue={il} onClick={removeFilterValue} />
      ))}
    </div>
  );
};
