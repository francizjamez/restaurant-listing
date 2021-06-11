import { useContext, useEffect } from "react";
import restaurantContext from "../contexts/restaurant.context";

function App() {
  const { loadRestaurants, restaurants, currentPage, nextPage, prevPage } =
    useContext(restaurantContext);
  useEffect(() => {
    loadRestaurants();
    return () => {};
  }, [loadRestaurants]);

  return (
    <div className="flex-col items-center h-screen justify-between">
      <h1>Restaurant Listings</h1>
      <table className="container">
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Phone number</th>
          <th>genres</th>
        </tr>
        {restaurants
          .slice(currentPage * 10, currentPage * 10 + 10)
          .sort((a, b) => {
            return ("" + a.name).localeCompare(b.name);
          })
          .map(({ name, city, state, telephone, genre }) => (
            <tr>
              <th>{name}</th>
              <th>{city}</th>
              <th>{state}</th>
              <th>{telephone}</th>
              <th>{genre}</th>
            </tr>
          ))}
      </table>

      <div className="flex-col gap-1 items-center p-1">
        <h2>Page {currentPage + 1} of 4</h2>
        <div className="flex gap-1">
          <button className="p-1 rounded" onClick={() => prevPage()}>
            Prev
          </button>
          <button className="p-1 rounded" onClick={() => nextPage()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
