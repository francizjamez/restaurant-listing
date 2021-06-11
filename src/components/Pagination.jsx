import React, { useContext } from "react";
import restaurantContext from "../contexts/restaurant.context";

export default function Pagination() {
  const { currentPage, nextPage, prevPage, filteredRestaurants } =
    useContext(restaurantContext);
  return (
    <div className="flex-col gap-1 items-center p-1">
      <h2>
        Page {currentPage + 1} of{" "}
        {Math.floor(filteredRestaurants.length / 10) + 1}
      </h2>
      <div className="flex gap-1">
        <button className="p-1 rounded" onClick={() => prevPage()}>
          Prev
        </button>
        <button className="p-1 rounded" onClick={() => nextPage()}>
          Next
        </button>
      </div>
    </div>
  );
}
