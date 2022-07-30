import { useEffect, useState } from 'react';

export const SearchForm = ({cocktails}) => {
    const [ingredient, setName] = useState("");
    const [cocktailData, setCocktailData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./cocktails.json');
            const json = await response.json();
            setCocktailData(json);
        }

        fetchData().catch(console.error);
    }, []);

    const filteredCocktailList = () => {
        if (ingredient === "") {
            return cocktailData;
        } else {
            let filteredCocktails = cocktailData.filter(c => c.ingredients.some(ci => ci.name === ingredient));
            return filteredCocktails;
        }
    };

    return (
        <div className="search-form">
            <h2>What ingredients do you have?</h2>
            <input type="text"
            value={ingredient}
            onChange={(e) => setName(e.target.value)} />
            <button onClick={event => cocktails(event, filteredCocktailList)}>Search</button>
        </div>
    )
}