import { useContext, useEffect } from "react";
import Table from "./Table";
import Header from "./Header";
import Pagination from "./Pagination";
import restaurantContext from "../contexts/restaurant.context";

function App() {
  const { loadRestaurants } = useContext(restaurantContext);
  useEffect(() => {
    loadRestaurants();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex-col items-center min-h-screen justify-between">
      <Header />
      <Table />
      <Pagination />
    </div>
  );
}

export default App;
