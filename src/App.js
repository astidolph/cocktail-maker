import { useState, useEffect } from "react";
import "./App.css";
import { CocktailPane } from "./components/cocktailPane";
import { SearchForm } from "./components/searchForm";

export const App = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);

  const handleSetIngredients = (ingredients) => {
    setFilteredCocktails(filteredCocktailList(ingredients));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./cocktails.json");
      const json = await response.json();
      setCocktailData(json);
      setFilteredCocktails(json);
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
      <SearchForm ingredientList={handleSetIngredients} />
      <div className="cocktail-pane-container">
        {filteredCocktails.map((value, idx) => (
          <CocktailPane key={idx} cocktail={value} />
        ))}
      </div>
    </div>
  );
};

export default App;
