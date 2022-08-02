import { useState, useEffect } from "react";
import "./App.css";
import { CocktailPane } from "./components/cocktailPane";
import { SearchForm } from "./components/searchForm";

export const App = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [ingredientData, setIngredientData] = useState([]);

  const handleSetIngredients = (ingredients) => {
    setFilteredCocktails(filteredCocktailList(ingredients));
  };

  const getIngredientsFromCocktails = (cocktailList) => {
    let allIngredients = [];
    cocktailList.forEach((c) => {
      c.ingredients.forEach((i) => {
        allIngredients.push(i.name);
      });
    });
    return [...new Set(allIngredients)];
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./cocktails.json");
      const json = await response.json();
      setCocktailData(json);
      setFilteredCocktails(json);
      setIngredientData(getIngredientsFromCocktails(json));
    };
    fetchData().catch(console.error);
  }, []);

  const filteredCocktailList = (ingredients) => {
    if (ingredients.length === 0) {
      return cocktailData;
    } else {
      let filteredCocktails = cocktailData.filter((c) =>
        c.ingredients.some((ci) =>
          ingredients
            .map((il) => il.toLowerCase())
            .includes(ci.name.toLowerCase())
        )
      );
      return filteredCocktails;
    }
  };

  return (
    <div className="App">
      <SearchForm
        ingredientFilterValues={handleSetIngredients}
        allIngredients={ingredientData}
      />
      <div className="cocktail-pane-container">
        {filteredCocktails.map((value, idx) => (
          <CocktailPane key={idx} cocktail={value} />
        ))}
      </div>
    </div>
  );
};

export default App;
