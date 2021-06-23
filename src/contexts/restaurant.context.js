import { createContext, useState } from "react";
import { getRestaurants } from "../api/restaurant.api";

const restaurantContext = createContext({});

export function RestaurantProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRestaurants, setCurrentRestaurants] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All");

  const values = {
    loadRestaurants,
    currentPage,
    nextPage,
    prevPage,
    currentRestaurants,
    genres,
    filterRestaurants,
    filteredRestaurants,
    searchRestaurants,
    reset,
  };

  return (
    <restaurantContext.Provider value={values}>
      {props.children}
    </restaurantContext.Provider>
  );

  async function loadRestaurants() {
    const res = await getRestaurants();
    const sortedRestaurants = res.data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setRestaurants(sortedRestaurants);
    const findGenres = new Set();
    res.data.forEach((val) => {
      val.genre.split(",").forEach((genreVal) => findGenres.add(genreVal));
    });
    setGenres(["All", ...findGenres]);
    setFilteredRestaurants(sortedRestaurants);
    sliceRestaurants(currentPage, res.data);
  }

  async function nextPage() {
    const max = Math.floor(filteredRestaurants.length / 10);
    const page = Math.min(currentPage + 1, max);
    setCurrentPage(page);
    sliceRestaurants(page, [...filteredRestaurants]);
  }

  async function prevPage() {
    const page = Math.max(currentPage - 1, 0);
    setCurrentPage(page);
    sliceRestaurants(page, [...filteredRestaurants]);
  }

  async function sliceRestaurants(page, filteredRestaurants) {
    setCurrentRestaurants(filteredRestaurants.slice(page * 10, page * 10 + 10));
  }

  async function filterRestaurants(filterType) {
    if (filterType === "All") {
      setFilteredRestaurants(restaurants);
      sliceRestaurants(0, restaurants);
    } else {
      const filtered = restaurants
        .slice()
        .filter((val) => val.genre.split(",").includes(filterType));
      setFilteredRestaurants(filtered);
      sliceRestaurants(0, filtered);
    }
    setCurrentPage(0);
    setCurrentGenre(filterType);
  }

  async function searchRestaurants(text, e) {
    e.preventDefault();
    if (text === "") {
      setFilteredRestaurants(restaurants);
      sliceRestaurants(0, restaurants);
    } else {
      const searched = filteredRestaurants.filter(
        (val) =>
          val.name.toLowerCase().split(" ").includes(text.toLowerCase()) ||
          val.name.toLowerCase() === text.toLowerCase() ||
          val.city.toLowerCase().split(" ").includes(text.toLowerCase()) ||
          val.state.toLowerCase().split(" ").includes(text.toLowerCase()) ||
          val.genre.toLowerCase().split(",").includes(text.toLowerCase())
      );
      setFilteredRestaurants(searched);
      sliceRestaurants(0, searched);
    }
    setCurrentPage(0);
  }

  async function reset(e) {
    if (e.target.value === "") {
      filterRestaurants(currentGenre);
      sliceRestaurants(currentPage, restaurants);
    }
  }
}

export default restaurantContext;
