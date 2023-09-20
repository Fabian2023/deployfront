import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

import "./Graficas.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler
);

const Graficas = () => {
  const [ventas, setVentas] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [comisionesPorDia, setComisionesPorDia] = useState({});
  const [ventasPorMes, setVentasPorMes] = useState({});

  const obtenerDatosDeVentas = async () => {
    try {
      const response = await axios.get(
        "https://vmbv-m.onrender.com/product/getSell"
      );
      if (response.status === 200) {
        const data = response.data;
        setVentas(data);
        setDatosCargados(true);
        const comisionesDia = {};
        data.forEach((venta) => {
          const fecha = venta.fechaVenta;
          if (comisionesDia[fecha]) {
            comisionesDia[fecha] += venta.comision;
          } else {
            comisionesDia[fecha] = venta.comision;
          }
        });
        setComisionesPorDia(comisionesDia);
        const ventasPorMesData = {};

        data.forEach((venta) => {
          const fecha = new Date(venta.fechaVenta);
          const mes = fecha.getMonth(); // Obtiene el mes (0-11)

          if (ventasPorMesData[mes]) {
            ventasPorMesData[mes] += venta.cantidad;
          } else {
            ventasPorMesData[mes] = venta.cantidad;
          }
        });

        setVentasPorMes(ventasPorMesData);
      } else {
        throw new Error("Error al obtener los datos de ventas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerDatosDeVentas();
  }, []);

  // Crear un objeto para almacenar los totales de ventas y comisiones por producto
  const productosTotales = {};

  if (datosCargados) {
    const ventasTotalesPorMes = Array.from(
      { length: 12 },
      (_, mes) => ventasPorMes[mes] || 0
    );

    ventas.forEach((venta) => {
      if (productosTotales[venta.producto]) {
        productosTotales[venta.producto].ventas += venta.monto;
        productosTotales[venta.producto].comisiones += venta.comision;
      } else {
        productosTotales[venta.producto] = {
          ventas: venta.monto,
          comisiones: venta.comision,
        };
      }
    });

    // Obtener nombres de productos y calcular porcentajes
    const productos = Object.keys(productosTotales);
    const ventasPorProducto = productos.map(
      (producto) => productosTotales[producto].ventas
    );
    const comisionesPorProducto = productos.map(
      (producto) => productosTotales[producto].comisiones
    );

    const pieChartData = {
      labels: productos,
      datasets: [
        {
          data: ventasPorProducto,
          backgroundColor: ["rgba(32, 0, 32, 0.6)"],
          label: "Ventas",
        },
        {
          data: comisionesPorProducto,
          backgroundColor: ["rgba(255, 0, 0, 0.6)"],
          label: "Comisiones",
        },
      ],
    };

    const barrasComisionesPorDiaData = {
      labels: Object.keys(comisionesPorDia),
      datasets: [
        {
          label: "Comisiones por Día",
          data: Object.values(comisionesPorDia),
          backgroundColor: "rgba(255, 0, 0, 0.6)",
          barThickness: 60,
        },
      ],
    };

    const barrasVentasPorMesData = {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Vehículos Vendidos",
          data: ventasTotalesPorMes,
          backgroundColor: "rgba(255, 204, 0, 0.6)",
        },
      ],
    };

    return (
      <div className="graficas-container">
        <div className="graficas-section">
          <h1 className="graficas-heading">Ventas Por Marca</h1>
          <div className="miGraficoContainer">
            <Pie data={pieChartData} />
          </div>
        </div>
        <div className="graficas-section">
          <h1 className="graficas-heading">Comisiones Por Día</h1>
          <Bar data={barrasComisionesPorDiaData} />
        </div>
        <div className="graficas-section">
          <h1 className="graficas-heading">Vehículos Vendidos Por Mes</h1>
          <Bar data={barrasVentasPorMesData} />
        </div>
      </div>
    );
  }

  return <div>Loading...</div>; // Puedes mostrar un indicador de carga mientras los datos se cargan.
};

export default Graficas;
