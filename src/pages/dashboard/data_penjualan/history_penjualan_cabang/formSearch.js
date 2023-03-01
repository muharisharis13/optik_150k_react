const FormSearch = ({ selectedRadio, register, btnSearch }) => {
  return (
    <div>
      <form onSubmit={btnSearch} className="row">
        <div className="col-md-4 col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search  No. Faktur, Nama Cabang"
            {...register("search")}
          />
        </div>
        <div className="col-md-8 col-lg-8">
          <button type="submit" className="btn btn-primary font-weight-bold">
            <i className="bx bx-search"></i>
            Find
          </button>
        </div>
      </form>
      <div className="row mt-4">
        <div className="col-md-12 col-lg-12 d-flex gap-2">
          {arrFilter.map((item, idx) => (
            <div className="form-check" key={idx}>
              <input
                name="arrFilterRadio"
                className="form-check-input"
                type="radio"
                value={item.value}
                id={"defaultRadio" + idx}
                defaultChecked={item.value === selectedRadio ? true : false}
                {...register("selectedRadio")}
              />
              <label className="form-check-label" for={"defaultRadio" + idx}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormSearch;

const arrFilter = [
  {
    label: "No. Faktur",
    value: "no_faktur",
  },
  {
    label: "Nama Customer",
    value: "cabang.nama_cabang",
  },
];
