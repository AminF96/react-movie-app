import { MovieAppProvider } from "./pages/MainPage/context/MovieAppContext";
import { Route, Routes } from "react-router-dom";
import { paths } from "./router/paths";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import "bootstrap/dist/css/bootstrap.css";
import "./theme/style.css";

export default function App() {
  return (
    <MovieAppProvider>
      <Routes>
        <Route path={paths.MAIN} element={<MainPage />} />

        <Route path={paths.ERROR} element={<ErrorPage />} />

        <Route path={paths.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </MovieAppProvider>
  );
}
