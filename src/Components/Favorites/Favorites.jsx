import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/Card/Card";
import style from "./Favorites.module.css";
import { OrderByNameFavs } from "../../redux/action/action";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const [order, setOrder] = useState("");

  const handleOrder = (event) => {
    event.preventDefault();
    dispatch(OrderByNameFavs(event.target.value));
    setOrder(event.target.value);
  };

  return (
    <div>
      <h1 className={style.h1}>Tus vehículos de preferencia</h1>

      <div>
        <select onChange={handleOrder}>
          <option value="default">Default</option>
          <option value="A-Z">A - Z </option>
          <option value="Z-A">Z - A </option>
        </select>
      </div>
      {favorites.map((fav) => {
        return (
          <Card key={fav.id} id={fav.id} image={fav.image} name={fav.name} />
        );
      })}
    </div>
  );
};

export default Favorites;
