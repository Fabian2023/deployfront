import axios from "axios";

import {
  GET_CARS,
  // ADD_REVIEW,
  GET_CATEGORYS,
  GET_BRANDS,
  GET_DETAIL,
  ON_SEARCH,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  FILTER_BRANDS,
  POST_PRODUCT,
  FILTER_CATEGORY,
  ADD_FAV,
  REMOVE_FAV,
  ORDER_BY_NAME_FAV,
  CREATE_USER,
} from "./typeAction";

export const getCars = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://vmbv-m.onrender.com/product/getProduct`
      );
      const cars = response.data;

      dispatch({ type: GET_CARS, payload: cars });
    } catch (error) {
      console.error("Error al obtener datos de los coches:", error);
    }
  };
};

export const getDetail = (idCar) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://vmbv-m.onrender.com/product/${idCar}`
      );

      const detail = response.data;
      console.log("555", detail);
      dispatch({ type: GET_DETAIL, payload: detail });
    } catch (error) {
      console.error("Error");
    }
  };
};

export const onSearch = (name) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://vmbv-m.onrender.com/product/?name=${name}`
    );
    const onSearch = response.data;
    return dispatch({
      type: ON_SEARCH,
      payload: onSearch,
    });
  };
};

export const OrderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const OrderByNameFavs = (payload) => {
  return {
    type: ORDER_BY_NAME_FAV,
    payload,
  };
};

export const OrderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
};
export const getCategorys = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://vmbv-m.onrender.com/category`);
      const category = response.data;
      console.log("category", category);
      return dispatch({ type: GET_CATEGORYS, payload: category });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getBrands = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://vmbv-m.onrender.com/brand");
      const brands = response.data;
      console.log(" Marcas:", brands);
      return dispatch({ type: GET_BRANDS, payload: brands });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const postProduct = (createProduct) => {
  return async function (dispatch) {
    const response = await axios.post(
      `https://vmbv-m.onrender.com/create/product`,
      createProduct
    );
    return dispatch({ type: POST_PRODUCT });
  };
};

export const filterBrands = (payload) => {
  return {
    type: FILTER_BRANDS,
    payload,
  };
};

export const filterCategory = (payload) => {
  return {
    type: FILTER_CATEGORY,
    payload,
  };
};

export const addFav = (car) => {
  return {
    type: ADD_FAV,
    payload: car,
  };
};

export const removeFav = (id) => {
  return {
    type: REMOVE_FAV,
    payload: id,
  };
};

// export const addReview= (createReview)=>{
//   return async function(dispatch){
//     try{
//       const response= await axios.post("http://localhost:3001/create/review", createReview)
//       alert("Review añadida ")
//       return dispatch({type: ADD_REVIEW})
//     } catch(error){
//       console.error(error);
//       alert("Error al crear review")
//     }
//   }
// }

// export const getUserById= ()=>{
//   return async function(dispatch){
//     try {
//       const response= await axios.get("http://localhost:3001/users/getUserById");
//       const user=response.data;
//       return dispatch({type: GET_USERS_BY_ID, payload:user})
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// export const removeUserDetail=()=>{
//   return {type:REMOVE_USER_DETAIL};
// }

export const postUser = (createUser) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "https://vmbv-m.onrender.com/users/user",
        createUser
      );
      const user = response.data;
      console.log("usuario:", user);
      return dispatch({ type: CREATE_USER, payload: user });
    } catch (error) {
      console.error(error);
    }
  };
};

// export const login=()=>{
//   return async function(dispatch){
//     try {

//     } catch (error) {

//     }
//   }
// }
