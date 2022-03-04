import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  changeSearchedMoviesSortOrder,
  fetchAllMoviesHandler,
  sortOrders,
} from "../../context/moviesSlice";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { searchParameters } from "../../../../router/searchParams";
import "./style.css";

export default function SortOrder() {
  const navigate = useNavigate();
  const dropdownRef = useRef();
  let [searchParams, setSearchParams] = useSearchParams();

  const { entities, sortOrder, searchValue } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const isNewestDisable = searchValue !== null;

  const changeSortOrderHandler = async (e) => {
    const sort = e.target.id;

    if (searchValue) {
      dispatch(changeSearchedMoviesSortOrder(entities, sort));

      const query = searchParams.get(searchParameters.SEARCH_QUERY);

      setSearchParams({
        [searchParameters.SEARCH_QUERY]: query,
        [searchParameters.SORT_ORDER]: sort,
      });
    } else {
      const response = await fetchAllMoviesHandler(
        dispatch,
        navigate,
        sort,
        "1"
      );

      setSearchParams({ [searchParameters.SORT_ORDER]: sort });
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        ref={dropdownRef}
      >
        Sort By
      </button>
      <div className="dropdown-menu m-0">
        <button
          className={`dropdown-item ${
            sortOrder === sortOrders.NEWEST && "active"
          } ${isNewestDisable && "disable"}`}
          id={sortOrders.NEWEST}
          onClick={changeSortOrderHandler}
        >
          Newest
        </button>
        <button
          className={`dropdown-item ${
            sortOrder === sortOrders.POPULARITY && "active"
          }`}
          id={sortOrders.POPULARITY}
          onClick={changeSortOrderHandler}
        >
          Popularity
        </button>
        <button
          className={`dropdown-item ${
            sortOrder === sortOrders.RATING && "active"
          }`}
          id={sortOrders.RATING}
          onClick={changeSortOrderHandler}
        >
          Rating
        </button>
      </div>
    </div>
  );
}
