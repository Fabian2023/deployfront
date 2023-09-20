import { all } from "axios";
import {
  ADD_FAV,
  CREATE_USER,
  FILTER_BRANDS,
  FILTER_CATEGORY,
  GET_BRANDS,
  GET_CARS,
  GET_CATEGORYS,
  GET_DETAIL,
  ON_SEARCH,
  ORDER_BY_NAME,
  ORDER_BY_NAME_FAV,
  ORDER_BY_PRICE,
  REMOVE_FAV,

} from "../action/typeAction";
let initialState = {
  allVehiculos: [],
  allCars: [],
  cars: [],
  carsDetail: {},
  onSearch: {},
  category: [],
  brands: [],
  favorites:[],
  userDetail:{}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        allVehiculos: action.payload,
        allCars: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        carsDetail: action.payload,
      };

    case FILTER_CATEGORY:
      let filtro = [];
      if (action.payload === "default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }
      filtro = state.allCars.filter((car) => {
      console.log("Car",car.Category);
      return car.Category.name.toLowerCase().includes(action.payload.toLowerCase())
      });
      return { ...state, cars: filtro };
      
      case FILTER_BRANDS:
        let filter = [];
        if (action.payload === "default") {
          return {
            ...state,
            cars: state.allCars,
          };
        }
        filter = state.allCars.filter((car) =>
        car.brand.toLowerCase().includes(action.payload.toLowerCase())
        );
        
        return {
          ...state,
          cars: filter
        };
        

    case ORDER_BY_NAME:
      if (action.payload === "Default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }

      const sortedName = action.payload === "A-Z"
        ? state.cars.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        : state.cars.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

      return {
        ...state,
        cars: sortedName,
      };

      case ORDER_BY_NAME_FAV:
      if (action.payload === "Default") {
        return {
          ...state,
          favorites: state.favorites
        };
      }

      const sortedNameFav = action.payload === "A-Z"
        ? state.favorites.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        : state.favorites.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

      return {
        ...state,
        favorites: sortedNameFav,
      };

    case ORDER_BY_PRICE:
      if (action.payload === "Default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }

      const sortedPrice =
        action.payload === "min_price"
          ? [...state.cars].sort(
            (a, b) => parseInt(a.price) - parseInt(b.price)
          )
          : [...state.cars].sort(
            (a, b) => parseInt(b.price) - parseInt(a.price)
          );
      console.log(sortedPrice);

      return {
        ...state,
        cars: sortedPrice,
      };
    case ON_SEARCH:
      return {
        ...state,
        onSearch: action.payload,
      };
    case GET_CATEGORYS:
      return {
        ...state,
        category: action.payload,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case ADD_FAV:
    return {
      ...state, 
      favorites:[...state.favorites, action.payload]
    };
    case REMOVE_FAV:
    const arrFav= state.favorites.filter((fav)=> fav.id !== action.payload);
    return {
      ...state, favorites:arrFav
    }

    case CREATE_USER:
      return {
        ...state, userDetail: action.payload
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
