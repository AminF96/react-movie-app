import { createContext, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import useContextProducer from "../../../CustomHooks/useContextProducer";
import { reducer } from "./reducer";
import { sortOrders } from "./reducer";

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

  const query = searchParams.get("q");

  const initState = {
    searchValue: query,
    sortOrder: query ? sortOrders.POPULARITY : sortOrders.NEWEST,
    isLoading: true,
    pageNum: 1,
    pagesCount: 0,
    result: null,
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
