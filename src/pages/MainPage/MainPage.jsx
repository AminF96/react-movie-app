import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchParameters } from "../../router/searchParams";
import {
  fetchAllMoviesHandler,
  fetchSearchedMoviesHandler,
  sortOrders,
} from "./context/moviesSlice";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "./context/MovieAppContext";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function MainPage() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const { isLoading } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    (async () => {
      const query = searchParams.get(searchParameters.SEARCH_QUERY);
      const sortBy = searchParams.get(searchParameters.SORT_ORDER);
      const page = searchParams.get(searchParameters.PAGE_NUM);

      if (query) {
        const sortParam = sortBy || sortOrders.POPULARITY;

        const response = await fetchSearchedMoviesHandler(
          dispatch,
          navigate,
          query,
          sortParam,
          page
        );
        console.log(response);
      } else {
        const sort = sortBy || sortOrders.NEWEST;
        const pageNum = page || "1";

        const response = await fetchAllMoviesHandler(
          dispatch,
          navigate,
          sort,
          pageNum
        );
      }
    })();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        {isLoading ? (
          <div
            id="loading"
            className="d-flex justify-content-center align-items-center"
          >
            <Loader type="ThreeDots" color="#c32bad" height={150} width={150} />
          </div>
        ) : (
          <Result />
        )}
      </div>
    </div>
  );
}
