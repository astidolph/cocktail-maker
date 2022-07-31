import { useEffect, useState } from "react";

export const SearchForm = ({ cocktails }) => {
  const [ingredient, setIngredientText] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [cocktailData, setCocktailData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./cocktails.json");
      const json = await response.json();
      setCocktailData(json);
    };

    fetchData().catch(console.error);
  }, []);

  const filteredCocktailList = () => {
    if (ingredientList.length === 0) {
      return cocktailData;
    } else {
      let filteredCocktails = cocktailData.filter((c) =>
        c.ingredients.some((ci) =>
          ingredientList
            .map((il) => il.toLowerCase())
            .includes(ci.name.toLowerCase())
        )
      );
      return filteredCocktails;
    }
  };

  const addIngredientToFilter = (oldIngredients) => {
    let newIngredientList = [...oldIngredients, ingredient];
    setIngredientText("");
    return newIngredientList;
  };

  const removeFilterValue = (value) => {
    setIngredientList(ingredientList.filter((i) => i !== value));
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
      <button onClick={(_) => cocktails(filteredCocktailList)}>Search</button>
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
