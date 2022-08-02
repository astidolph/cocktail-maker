export const CocktailPane = ({ cocktail }) => {
  return (
    <div className="cocktail-pane">
      <div>
        <h3>{cocktail.name}</h3>
        {cocktail.ingredients.map((i) => (
          <ul>
            <li>{i.name}</li>
          </ul>
        ))}
      </div>
      <div>
        <img src={cocktail.image} alt={cocktail.imgAlt} />
      </div>
    </div>
  );
};
