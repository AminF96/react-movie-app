import { useContext } from "react";

export default function useContextProducer(initContext) {
  const context = useContext(initContext);

  if (!context) {
    throw new Error("Context can't be used without a provider!");
  }

  return context;
}
