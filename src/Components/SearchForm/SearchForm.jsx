import useFormFields from "../../CustomHooks/useFormFields";
import "./style.css";

export default function SearchForm({ searchHandler }) {
  const { fields, handleChange } = useFormFields({ text: "" });

  return (
    <form
      action="#"
      id="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler(fields.text);
        handleChange({ target: { name: "text", value: "" } });
      }}
    >
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
