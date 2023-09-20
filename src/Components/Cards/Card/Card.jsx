import "./styles.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFav, addFav } from "../../../redux/action/action";

const Card = ({ id, image, name }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav === true) {
      setIsFav(false);
      dispatch(removeFav(id));
    } else {
      setIsFav(true);
      dispatch(addFav({ id, image, name, addFav, removeFav }));
    }
  };

  useEffect(() => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === id) {
        setIsFav(true);
      }
    }
  }, [favorites]);

  return (
    <div className="card">
      <div className="card-details">
        <NavLink to={`/detail/${id}`}>
          <img src={image} alt={name}></img>{" "}
        </NavLink>
        <h1 className="title">{name}</h1>
        {/* <button className="aymicorazon" onClick={handleFavorite}>
          {isFav ? "❤️" : "🤍"}
        </button>{" "} */}
      </div>
    </div>
  );
};

export default Card;
