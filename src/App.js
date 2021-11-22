import MovieApp from "./Components/MovieApp";
import "bootstrap/dist/css/bootstrap.css";
import "./theme/style.css";
import { MovieAppProvider } from "./Components/MovieApp/context/MovieAppContext";

export default function App() {
  return (
    <MovieAppProvider>
      <MovieApp />
    </MovieAppProvider>
  );
}
