import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Form.module.css";
import { validateField } from "./validationUser";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const FormUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientID =
    "235598000858-au8tkevevdd8slqjhag6gl9td3lljcp5.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Usuario",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value, setErrors, errors);
  };

  let user = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.keys(errors).length > 0;
    const isFormEmpty = Object.values(formData).some((value) => value === "");
    if (!hasErrors && !isFormEmpty) {
      axios
        .get("http://ip-api.com/json")
        .then((locationResponse) => {
          const location = locationResponse.data.city;
          const formDataWithLocation = {
            ...formData,
            location: location,
          };
          // dispatch(postUser)
          axios
            .post(
              "https://vmbv-m.onrender.com/users/user",
              formDataWithLocation
            )
            .then((response) => {
              user = response.data;
              console.log("Usuario registrado con éxito:", user);
              localStorage.setItem("fullName", formData.fullName);
              alert("Usuario creado con éxito");
              navigate("/Home");
              setFormData({
                fullName: "",
                email: "",
                password: "",
                role: "Usuario",
              });
            })
            .catch((error) => {
              if (
                error.response &&
                error.response.data &&
                error.response.data.mensaje
              ) {
                setErrors({ ...errors, email: error.response.data.mensaje });
              } else {
                console.error("Error al registrar el usuario:", error);
              }
            });
        })
        .catch((error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        });
      // localStorage.setItem("fullName", formData.fullName);
      // alert("Usuario creado con éxito");
      // window.location.href = "/Home";
      // setFormData({
      //           fullName: "",
      //           email: "",
      //           password: "",
      //           role: "Usuario",
      //         });
    } else {
      alert("Debes digitar todos los campos.");
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log("Autenticación exitosa con Google:", response.profileObj);
    const { familyName, givenName, googleId, imageUrl, name, email } =
      response.profileObj;

    try {
      const locationResponseGoogle = await axios.get("http://ip-api.com/json");
      const location = locationResponseGoogle.data.city;
      console.log("location google;", location);

      if (
        familyName &&
        givenName &&
        googleId &&
        imageUrl &&
        name &&
        email &&
        location
      ) {
        const formDataForServer = {
          familyName,
          givenName,
          googleId,
          imageUrl,
          name,
          email,
          location, // Añadimos la ubicación al objeto de datos para enviar al servidor
        };

        try {
          const serverResponse = await axios.post(
            "https://vmbv-m.onrender.com/users/user/google",
            formDataForServer
          );
          console.log(
            "Datos del formulario enviados con éxito:",
            serverResponse.data
          );
          const fullName = `${givenName} ${familyName}`;
          alert(`¡Bienvenido, ${fullName}! 🚘`);
          localStorage.setItem("fullName", fullName);
          navigate("/Home");
        } catch (error) {
          console.error(
            "Error al enviar los datos del formulario google:",
            error
          );
        }
      } else {
        console.error("Los datos de perfil de Google están incompletos.");
      }
    } catch (error) {
      console.error("Error al obtener la ubicación del usuario:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    if (error.error === "popup_closed_by_user") {
      alert(
        "La ventana de autenticación de Google fue cerrada por el usuario. Por favor inténtalo de nuevo."
      );
    } else {
      console.error("Error en la autenticación con Google:", error);
    }
  };

  return (
    <div>
      <h2 className={styles.titulo}>Registrarse</h2>
      <div className={styles.formContainer}>
        <img className={styles.fotofoto} src="img/fl.jpg" alt="" />
        <div className={styles.textoSobreImagen}>Tu nuevo auto te espera</div>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="8"
              required
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          {/* <div className={styles.formGroup}>
            <label>Rol:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Usuario">Usuario</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <span className={styles.error}>{errors.role}</span>}
          </div> */}
          <button className={styles.regis} type="submit">
            Registrarse
          </button>
          <GoogleLogin
            className={styles.regiscongugul}
            clientID="235598000858-au8tkevevdd8slqjhag6gl9td3lljcp5.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>

      {/* <MiContexto.Provider value={user}>
          <Detail/>
    </MiContexto.Provider> */}
    </div>
  );
};

export default FormUser;
