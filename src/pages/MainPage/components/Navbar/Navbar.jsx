import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { fetchAllMoviesHandler,sortOrders } from "../../context/moviesSlice";
import SearchForm from "../SearchForm";
import SortOrder from "../SortOrder";

export default function Navbar() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const { searchValue } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const allMoviesClickHandler = async () => {
    if (searchValue) {
      setSearchParams({});
      const response = await fetchAllMoviesHandler(
        dispatch,
        navigate,
        sortOrders.NEWEST,
        "1"
      );
    }
  };

  return (
    <section id="navbar" className="col-12">
      <div className="container">
        <div className="row wrapper">
          <div className="col-12">
            <div className="row pt-2">
              <div className="col-12 col-md-4 pt-1 mb-3 mb-md-0 d-flex justify-content-around">
                <h2 id="logo">Movie App</h2>
                <button
                  id="all-movies"
                  className={!searchValue ? "active" : ""}
                  onClick={allMoviesClickHandler}
                >
                  All Movies
                </button>
              </div>
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-12 col-md-8 mt-1 mb-md-0 d-flex justify-content-center">
                    <SearchForm />
                  </div>
                  <div className="col-12 col-md-4 mt-3 mt-md-1 text-center">
                    <SortOrder />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
