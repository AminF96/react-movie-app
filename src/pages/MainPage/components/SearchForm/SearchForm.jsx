import { useSearchParams } from "react-router-dom";
import useFormFields from "../../../../CustomHooks/useFormFields";
import "./style.css";

export default function SearchForm() {
  const { fields, handleChange } = useFormFields({ text: "" });

  let [searchParams, setSearchParams] = useSearchParams();

  const submitHandler = (e) => {
    e.preventDefault();

    const q = fields.text || "";

    setSearchParams({ q });

    // empty input value
    handleChange({ target: { name: "text", value: "" } });
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
