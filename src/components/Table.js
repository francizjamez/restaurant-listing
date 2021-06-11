import { useContext } from "react";
import restaurantContext from "../contexts/restaurant.context";

export default function Table() {
  const { currentRestaurants } = useContext(restaurantContext);

  if (!currentRestaurants.length) {
    return <h1>No match found</h1>;
  }
  return (
    <table className="container">
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>State</th>
        <th>Phone number</th>
        <th>genres</th>
      </tr>
      {currentRestaurants.map(({ name, city, state, telephone, genre }) => (
        <tr>
          <th>{name}</th>
          <th>{city}</th>
          <th>{state}</th>
          <th>{telephone}</th>
          <th>{genre}</th>
        </tr>
      ))}
    </table>
  );
}
