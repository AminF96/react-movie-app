import SearchForm from "../../../SearchForm";
import SortOrder from "../SortOrder";
import "./style.css";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import {
  getSetAllMoviesAction,
  getSetSearchSubmitAction,
} from "../../context/getActionObj";

export default function Navbar() {
  const { searchValue } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const allMoviesClickHandler = () => {
    dispatch(getSetAllMoviesAction());
  };

  const searchSubmitHandler = (movieTitle) => {
    dispatch(getSetSearchSubmitAction(movieTitle));
  };

  return (
    <section id="navbar" className="col-12">
      <div className="container">
        <div className="row wrapper">
          <div className="col-12">
            <div className="row pt-2">
              <div className="col-12 col-md-4 pt-1 mb-3 mb-md-0 d-flex justify-content-around">
                <h2 id="logo">Movie App</h2>
                <a
                  href="#"
                  id="all-movies"
                  className={!searchValue ? "active" : ""}
                  onClick={allMoviesClickHandler}
                >
                  All Movies
                </a>
              </div>
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-12 col-md-8 mt-1 mb-md-0 d-flex justify-content-center">
                    <SearchForm searchHandler={searchSubmitHandler} />
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
