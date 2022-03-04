import { useSearchParams } from "react-router-dom";
import { useMovieStateContext } from "../../context/MovieAppContext";
import Cards from "../Cards";
import Buttons from "../Buttons";

export default function Result() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, entities, pageNum } = useMovieStateContext();

  return (
    <section id="result" className="col-12 pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Cards moviesList={!searchValue ? entities : entities[pageNum]} />
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
