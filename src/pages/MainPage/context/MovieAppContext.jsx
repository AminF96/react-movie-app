import { createContext, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import useContextProducer from "../../../CustomHooks/useContextProducer";
import reducer from "./moviesSlice";

const movieStateContext = createContext();

const movieDispatcherContext = createContext();

export const useMovieStateContext = () => {
  return useContextProducer(movieStateContext);
};

export const useMovieDispatcherContext = () => {
  return useContextProducer(movieDispatcherContext);
};

export function MovieAppProvider({ children }) {
  let [searchParams] = useSearchParams();

  const initState = {
    searchValue:null,
    sortOrder:null,
    isLoading: false,
    pageNum: 1,
    totalPages: 0,
    entities: null,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <movieStateContext.Provider value={state}>
      <movieDispatcherContext.Provider value={dispatch}>
        {children}
      </movieDispatcherContext.Provider>
    </movieStateContext.Provider>
  );
}
