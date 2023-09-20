import { useSelector } from "react-redux";
import Card from "./Card/Card";
import "./styles.css";
import Page from "../../Views/Paginado/Page";
import { useEffect, useState } from "react";

const CardsContainer = ({ currentPage }) => {
  const cars = useSelector((state) => state.cars);
  const [cardsPerPage, setCardsPerPage] = useState(8);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  const searchResults = useSelector((state) => state.onSearch);
  let displayedCars =
    searchResults && searchResults.length > 0 ? searchResults : cars;

  const carsToRender = displayedCars
    .filter((car) => car.isPublished) // Filtrar solo las cars con isPublished en true
    .slice(firstIndex, lastIndex);

  useEffect(() => {
    if (searchResults.length === 0) {
    }
  }, [searchResults]);

  return (
    <div>
      <div className="cards">
        {carsToRender?.map((car) => (
          <Card key={car.id} id={car.id} image={car.image[0]} name={car.name} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default CardsContainer;
