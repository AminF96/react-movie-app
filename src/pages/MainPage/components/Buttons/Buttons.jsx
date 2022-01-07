import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { getChangePageAction } from "../../context/getActionObj";
import { searchParameters } from "../../../../router/searchParams";
import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";

export default function Buttons() {
  const [isDispatchChangePage, setIsDispatchChangePage] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const { pageNum, pagesCount } = useMovieStateContext();

  const dispatch = useMovieDispatcherContext();

  useEffect(() => {
    const page = searchParams.get(searchParameters.PAGE_NUM);

    if (isDispatchChangePage) {
      page && dispatch(getChangePageAction(page));

      setIsDispatchChangePage(false);
    }
  }, [dispatch, searchParams, isDispatchChangePage]);

  const changePageHandler = (type) => {
    const page = type === "next" ? Number(pageNum) + 1 : Number(pageNum) - 1;

    searchParams.append(searchParameters.PAGE_NUM, page);

    const params = Object.fromEntries([...searchParams]);

    setIsDispatchChangePage(true);

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
      {pageNum < pagesCount && (
        <NextBtn
          clickHandler={() => {
            changePageHandler("next");
          }}
        />
      )}
    </div>
  );
}
