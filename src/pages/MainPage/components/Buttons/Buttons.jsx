import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import {
  ChangeSearchedPage,
  fetchAllMoviesHandler,
} from "../../context/moviesSlice";
import { searchParameters } from "../../../../router/searchParams";
import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";

export default function Buttons() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const { pageNum, sortOrder, totalPages, searchValue } =
    useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const changePageHandler = async (type) => {
    const newPage = type === "next" ? Number(pageNum) + 1 : Number(pageNum) - 1;

    if (searchValue) {
      dispatch(ChangeSearchedPage(newPage));
    } else {
      const response = await fetchAllMoviesHandler(
        dispatch,
        navigate,
        sortOrder,
        newPage
      );
    }

    searchParams.append(searchParameters.PAGE_NUM, newPage);
    const params = Object.fromEntries([...searchParams]);
    setSearchParams(params);

    window.scrollTo(0, 0);
  };

  return (
    <div className="btns-container d-flex justify-content-center mt-4">
      {pageNum > 1 && (
        <PrevBtn
          clickHandler={() => {
            changePageHandler("prev");
          }}
        />
      )}
      {pageNum < totalPages && (
        <NextBtn
          clickHandler={() => {
            changePageHandler("next");
          }}
        />
      )}
    </div>
  );
}
