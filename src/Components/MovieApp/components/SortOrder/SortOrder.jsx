import { useRef, useEffect } from "react";
import { sortOrders } from "../../context/sortOrderParams";
import "./style.css";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { getSetSortOrderAction } from "../../context/getActionObj";

export default function SortOrder() {
  const { sortOrder, searchValue } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();
  const dropdownRef = useRef();
  const isNewestDisable = searchValue !== null;

  useEffect(() => {
    !isNewestDisable && dropdownRef.current.click();
  }, [isNewestDisable]);

  const changeSortOrderHandler = (e) => {
    dispatch(getSetSortOrderAction(e.target.id));
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
        <a
          className={`dropdown-item ${
            sortOrder === sortOrders.NEWEST && "active"
          } ${isNewestDisable && "disable"}`}
          href="#"
          id={sortOrders.NEWEST}
          onClick={changeSortOrderHandler}
        >
          Newest
        </a>
        <a
          className={`dropdown-item ${
            sortOrder === sortOrders.POPULARITY && "active"
          }`}
          href="#"
          id={sortOrders.POPULARITY}
          onClick={changeSortOrderHandler}
        >
          Popularity
        </a>
        <a
          className={`dropdown-item ${
            sortOrder === sortOrders.RATING && "active"
          }`}
          href="#"
          id={sortOrders.RATING}
          onClick={changeSortOrderHandler}
        >
          Rating
        </a>
      </div>
    </div>
  );
}
