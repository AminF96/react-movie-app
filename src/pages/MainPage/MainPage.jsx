import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { sortOrders } from "./context/reducer";
import getSearchResultPages from "./movieResults/getSearchResultPages";
import getAllMovies from "./movieResults/getAllMovies";
import { getInfoSuccessAction } from "./context/getActionObj";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "./context/MovieAppContext";
import { paths } from "../../router/paths";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function MainPage() {
  const navigate = useNavigate();

  const { searchValue, sortOrder, isLoading, pageNum } = useMovieStateContext();

  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    if (searchValue === null) {
      getAllMovies(sortOrder, pageNum)
        .then(({ results }) => {
          dispatch(getInfoSuccessAction(results));
        })
        .catch((error) => {
          navigate(paths.ERROR, { replace: true });
        });
    }
  }, [sortOrder, pageNum, searchValue, dispatch, navigate]);

  useEffect(() => {
    if (searchValue !== null) {
      const searchSortParam =
        sortOrder === sortOrders.POPULARITY ? "popularity" : "vote_average";

      getSearchResultPages(searchValue, searchSortParam)
        .then((result) => {
          dispatch(getInfoSuccessAction(result));
        })
        .catch((error) => {
          navigate(paths.ERROR, { replace: true });
        });
    }
  }, [searchValue, sortOrder, dispatch, navigate]);

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
