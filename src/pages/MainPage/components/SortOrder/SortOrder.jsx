import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { sortOrders } from "../../context/reducer";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { getSetSortOrderAction } from "../../context/getActionObj";
import { searchParameters } from "../../../../router/searchParams";
import "./style.css";

export default function SortOrder() {
  const { sortOrder, searchValue } = useMovieStateContext();

  const dispatch = useMovieDispatcherContext();

  const dropdownRef = useRef();

  const isNewestDisable = searchValue !== null;

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    !isNewestDisable && dropdownRef.current.click();

    const sortOrder = searchParams.get(searchParameters.SORT_ORDER);

    sortOrder &&
      dispatch(
        getSetSortOrderAction(searchParams.get(searchParameters.SORT_ORDER))
      );
  }, [isNewestDisable, searchParams, dispatch]);

  const changeSortOrderHandler = (e) => {
    const sort = e.target.id;

    if (searchValue) {
      const q = searchParams.get(searchParameters.SEARCH_QUERY);

      setSearchParams({ q, sort });
    } else {
      setSearchParams({ sort });
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
