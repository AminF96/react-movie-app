import { useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import { sortOrders } from "./context/sortOrderParams";
import getSearchResultPages from "./movieResults/getSearchResultPages";
import getAllMovies from "./movieResults/getAllMovies";
import { getInfoSuccessAction } from "./context/getActionObj";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "./context/MovieAppContext";

export default function MovieApp() {
  const { searchValue, sortOrder, isLoading, pageNum } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    const manageAllMoviesInfo = async () => {
      const data = await getAllMovies(sortOrder, pageNum);
      dispatch(getInfoSuccessAction(data.results));
    };

    searchValue === null && manageAllMoviesInfo();
  }, [sortOrder, pageNum, searchValue, dispatch]);

  useEffect(() => {
    if (searchValue !== null) {
      const searchSortParam =
        sortOrder === sortOrders.POPULARITY ? "popularity" : "vote_average";

      getSearchResultPages(searchValue, searchSortParam).then((result) => {
        dispatch(getInfoSuccessAction(result));
      });
    }
  }, [searchValue, sortOrder, dispatch]);

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
