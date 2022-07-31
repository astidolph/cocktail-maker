import { useState } from 'react';
import './App.css';
import {CocktailPane} from './components/cocktailPane';
import {SearchForm} from './components/searchForm';

export const App = () => {
  const [cocktails, setCocktails] = useState([]);

  const handleSetCocktails = (cocktails) => {
    setCocktails(cocktails);
  }

  return (
    <div className="App">
      <SearchForm cocktails={handleSetCocktails} />
      <div className="cocktail-pane-container">
        {cocktails.map((value, idx) => <CocktailPane key={idx} cocktail={value} />)}
      </div>
    </div>
  );
}

export default App;
