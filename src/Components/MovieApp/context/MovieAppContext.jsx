import { createContext, useReducer } from "react";
import useContextProducer from "../../../CustomHooks/useContextProducer";
import { reducer, initState } from "./reducer";

const movieStateContext = createContext();
const movieDispatcherContext = createContext();

export const useMovieStateContext = () => {
  return useContextProducer(movieStateContext);
};

export const useMovieDispatcherContext = () => {
  return useContextProducer(movieDispatcherContext);
};

export function MovieAppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <movieStateContext.Provider value={state}>
      <movieDispatcherContext.Provider value={dispatch}>
        {children}
      </movieDispatcherContext.Provider>
    </movieStateContext.Provider>
  );
}
