import Cards from "../Cards";
import Buttons from "../Buttons";
import { useMovieStateContext } from "../../context/MovieAppContext";

export default function Result() {
  const { searchValue, result, pageNum } = useMovieStateContext();

  return (
    <section id="result" className="col-12 pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Cards moviesList={!searchValue ? result : result[pageNum]} />
            <div className="row">
              <div className="col-12">
                <Buttons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
