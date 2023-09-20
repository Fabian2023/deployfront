import React from "react";
import styles from "./Home.module.css";
import Page from "../Paginado/Page";
import Cards from "../../Components/Cards/Cards";
import {
  OrderByName,
  OrderByPrice,
  getCars,
  filterBrands,
  getBrands,
  getCategorys,
  filterCategory,
} from "../../redux/action/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const cars = useSelector((state) => state.cars);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCars());
    dispatch(getBrands());
    dispatch(getCategorys());
  }, []);
  const vehiculos = useSelector((state) => state.allVehiculos);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrder(`Ordenado${e.target.value}`);
  };
  const handleOrderByPrice = (e) => {
    e.preventDefault();
    dispatch(OrderByPrice(e.target.value));
    setOrder(`Ordenado${e.target.value}`);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBrands = (e) => {
    e.preventDefault();
    dispatch(filterBrands(e.target.value));
    setOrder(`Ordenado${e.target.value}`);
  };

  const handleCategorys = (e) => {
    e.preventDefault();
    dispatch(filterCategory(e.target.value));
    setOrder(`Ordenado${e.target.value}`);
  };

  return (
    <div className={styles.container}>
      <div>
        {/* <select ></select> */}
        <div className={`${styles.filtros}`}>
          <select onChange={handleOrderByName}>
            <option value="Default">Ordenar por </option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </select>
          <select onChange={handleOrderByPrice}>
            <option value="Default"> Ordenar por </option>
            <option value="max_price">Mayor precio</option>
            <option value="min_price">Menor precio</option>
          </select>
          <select onChange={handleBrands}>
            <option value="default">Filtrar por Marca</option>
            {brands?.map((brand) => (
              <option
                key={brand.id && brand.id}
                value={brand.name && brand.name}
              >
                {brand.name && brand.name}
              </option>
            ))}
          </select>
          <select onChange={handleCategorys}>
            <option value="default">Filtrar por tipo</option>
            {category?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className={styles.SubTitle}>Todos los Vehiculos</h2>
        </div>
        <Cards currentPage={currentPage} />
      </div>
      <div className={styles.page}>
        <Page
          cardsPerPage={8}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} // Pasa setCurrentPage como prop
          totalCars={cars.length}
        />
      </div>
    </div>
  );
}
