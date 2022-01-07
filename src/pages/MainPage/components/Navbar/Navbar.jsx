import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import {
  getSetAllMoviesAction,
  getSetSearchSubmitAction,
} from "../../context/getActionObj";
import { sortOrders } from "../../context/reducer";
import { searchParameters } from "../../../../router/searchParams";
import SearchForm from "../SearchForm";
import SortOrder from "../SortOrder";

export default function Navbar() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { searchValue } = useMovieStateContext();

  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    const query = searchParams.get(searchParameters.SEARCH_QUERY);

    const sort =
      searchParams.get(searchParameters.SORT_ORDER) === sortOrders.NEWEST
        ? sortOrders.POPULARITY
        : searchParams.get(searchParameters.SORT_ORDER);

    query && dispatch(getSetSearchSubmitAction(query, sort));
  }, [dispatch, searchParams]);

  const allMoviesClickHandler = () => {
    setSearchParams({});

    dispatch(getSetAllMoviesAction());
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
