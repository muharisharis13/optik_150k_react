import { useFormContext } from "react-hook-form";

const Search = ({
  btnSearch,
  register = () => null,
  placeholder = "Search",
}) => {
  const newbtnSearch = (e) => {
    e.preventDefault();
    btnSearch();
  };
  return (
    <form onSubmit={newbtnSearch} className="input-group input-group-merge">
      <button
        type="submit"
        className="input-group-text"
        id="basic-addon-search31"
      >
        <i className="bx bx-search"></i>
      </button>
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        {...register("search")}
      />
    </form>
  );
};

export default Search;
