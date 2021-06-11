import { createContext, useState } from "react";
import { getRestaurants } from "../api/restaurant.api";

const restaurantContext = createContext({});

export function RestaurantProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line
  const [currentRestaurants, setCurrentRestaurants] = useState([]);

  const values = {
    restaurants,
    loadRestaurants,
    currentPage,
    nextPage,
    prevPage,
  };
  return (
    <restaurantContext.Provider value={values}>
      {props.children}
    </restaurantContext.Provider>
  );

  async function loadRestaurants() {
    const restaurants = await getRestaurants();
    setRestaurants(restaurants.data);
    sliceRestaurants(currentPage, restaurants.data);
  }

  async function nextPage() {
    const max = Math.floor(restaurants.length / 10);
    const page = Math.min(currentPage + 1, max);
    setCurrentPage(page);
  }
  async function prevPage() {
    const page = Math.max(currentPage - 1, 0);
    setCurrentPage(page);
  }

  async function sliceRestaurants(page, restaurants) {
    setCurrentRestaurants(restaurants.slice(page * 10, page * 10 + 10));
  }
}

export default restaurantContext;
