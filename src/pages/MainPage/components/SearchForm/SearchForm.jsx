import { useNavigate, useSearchParams } from "react-router-dom";
import useFormFields from "../../../../CustomHooks/useFormFields";
import { searchParameters } from "../../../../router/searchParams";
import { useMovieDispatcherContext } from "../../context/MovieAppContext";
import {
  fetchSearchedMoviesHandler,
  sortOrders,
} from "../../context/moviesSlice";
import "./style.css";

export default function SearchForm() {
  const { fields, handleChange } = useFormFields({ text: "" });
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useMovieDispatcherContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    const query = fields.text;
    if (query) {
      const response = await fetchSearchedMoviesHandler(
        dispatch,
        navigate,
        query,
        sortOrders.POPULARITY
      );

      setSearchParams({ [searchParameters.SEARCH_QUERY]: query });
     
      // empty input value
       handleChange({ target: { name: "text", value: "" } });
    }
  };

  return (
    <form action="#" id="search-form" onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          name="text"
          className="form-control border-0"
          placeholder="Search for Movies..."
          value={fields.text}
          onChange={handleChange}
        />
        <div className="input-group-append border-0">
          <button className="btn border-0" type="submit" id="button-addon2">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
