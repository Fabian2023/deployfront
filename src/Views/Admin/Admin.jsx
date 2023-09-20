import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/action/action";
import axios from "axios";
import Graficas from "../../Components/Graficas/Graficas";

import "./Admin.css";

const Admin = () => {
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const [usersData, setUsersData] = useState([]); // Declarar usersData en el estado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://vmbv-m.onrender.com/users/getUsers"
        );
        const usersData = response.data; // Suponiendo que los datos se encuentran en la propiedad "data" de la respuesta
        console.log("users", usersData);
        // Actualiza el estado con los datos de usuarios
        setUsersData(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleTogglePublish = async (id, isPublished) => {
    try {
      await axios.put(
        `https://vmbv-m.onrender.com/product/productAdmin/${id}`,
        {
          isPublished: !isPublished,
        }
      );
      dispatch(getCars());
    } catch (error) {
      console.error("Error al actualizar el estado de publicación:", error);
    }
  };

  const handleBanUser = async (id, isBanned) => {
    try {
      await axios.put(`https://vmbv-m.onrender.com/users/adminUser/${id}`, {
        isBanned: !isBanned,
      });
      // Actualiza la lista de usuarios después de banear/desbanear
      const updatedUsers = usersData.map((user) => {
        if (user.id === id) {
          return { ...user, isBanned: !isBanned };
        }
        return user;
      });
      setUsersData(updatedUsers);
    } catch (error) {
      console.error("Error al banear/desbanear el usuario:", error);
    }
  };
  const [car, setCars] = useState([]);

  return (
    <div>
      <div>
        <Graficas />
      </div>
      <div className="container">
        <div className="admin user-card">
          <h1>Usuarios</h1>
          {usersData.map((user) => (
            <div key={user.id} className="users-section">
              <h3>{user.fullName || user.givenName}</h3>
              <p>{user.id}</p>
              <p>{user.email}</p>
              <button
                onClick={() => {
                  console.log("userId:", user.id);
                  handleBanUser(user.id, user.isBanned);
                }}
                className="buttonAdmin"
              >
                {user.isBanned ? "Desbanear" : "Banear"}
              </button>
            </div>
          ))}
        </div>
        <div className="admin user-card">
          <h1>Publicaciones</h1>
          {cars.map((car) => (
            <div key={car.id} className="posts-section">
              <h3>{car.name}</h3>
              <p>{car.id}</p>
              <button
                onClick={() => {
                  console.log("productId:", car.id);
                  handleTogglePublish(car.id, car.isPublished);
                }}
                className="buttonAdmin"
              >
                {car.isPublished ? "Despublicar" : "Publicar"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
