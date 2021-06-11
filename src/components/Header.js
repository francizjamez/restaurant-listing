import React, { useContext, useRef } from "react";
import restaurantContext from "../contexts/restaurant.context";

export default function Header() {
  const { filterRestaurants, genres, searchRestaurants, reset } =
    useContext(restaurantContext);
  const inputRef = useRef();
  return (
    <div className="flex-col items-center">
      <h1>Restaurant Listings</h1>
      <div className="flex gap-1">
        <form
          className="flex gap-2"
          onSubmit={(e) => searchRestaurants(inputRef.current.value, e)}
        >
          <input
            className="p-1"
            type="text"
            ref={inputRef}
            onChange={reset}
          ></input>
          <button type="submit" className="rounded px-1">
            Search
          </button>
        </form>
        <label className="pos-center-y text-md">Genre:</label>
        <select
          className="text-md"
          onChange={(e) => filterRestaurants(e.target.value)}
        >
          {genres.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
