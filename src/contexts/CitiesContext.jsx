import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fzouqeqlynrbcbnulyby.supabase.co";
const supabase = createClient(supabaseUrl, import.meta.env.VITE_SUPABASE_KEY);

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Unhandled action type`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "cities/loading" });

      try {
        const { data } = await supabase.from("cities").select("*");

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return;

      dispatch({ type: "cities/loading" });

      try {
        // data we got back is in an array, so we need to get the first element
        const { data } = await supabase.from("cities").select("*").eq("id", id);

        dispatch({ type: "city/loaded", payload: data[0] });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "cities/loading" });

    try {
      const { cityName, country, emoji, date, notes, position } = newCity;

      // data we got back is in an array, so we need to get the first element
      const { data } = await supabase
        .from("cities")
        .insert([
          {
            city_name: cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat: position.lat, lng: position.lng },
          },
        ])
        .select();

      dispatch({ type: "city/created", payload: data[0] });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "cities/loading" });

    try {
      const { error } = await supabase.from("cities").delete().eq("id", id);

      if (error) throw new Error(error.message);

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
