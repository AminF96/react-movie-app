import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";
import {
  useMovieStateContext,
  useMovieDispatcherContext,
} from "../../context/MovieAppContext";
import { getChangePageAction } from "../../context/getActionObj";

export default function Buttons() {
  const { pageNum, pagesCount } = useMovieStateContext();
  const dispatch = useMovieDispatcherContext();

  const changePageHandler = (type) => {
    switch (type) {
      case "next":
        dispatch(getChangePageAction(pageNum + 1));
        break;

      case "prev":
        dispatch(getChangePageAction(pageNum - 1));
        break;

      default:
        break;
    }

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
