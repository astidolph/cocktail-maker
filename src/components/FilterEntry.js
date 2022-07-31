export const FilterEntry = (props) => {
  return (
    <span>
      {props.filterValue}{" "}
      <span onClick={(_) => props.onClick(props.filterValue)}>x</span>
    </span>
  );
};
