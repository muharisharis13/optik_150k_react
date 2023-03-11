import Modal from "../modals";
import { SelectedCategory } from "../select";

const ModalProducts = ({
  register = () => null,
  submit = () => null,
  param = {},
  ...rest
}) => {
  return (
    <Modal
      title={
        param?.uuid
          ? "Edit Barang " + param?.product_name
          : "Tambah Barang Baru"
      }
      idModal="ModalProducts"
      childrenFooter={[
        <button className="btn btn-primary" onClick={submit}>
          {param?.uuid ? `update ${param?.product_name}` : "Tambah Produk Baru"}
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Barang" className="form-label">
              Nama Barang
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama Barang"
              placeholder="Nama Barang"
              {...register("param.product_name")}
              autoFocus
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Satuan" className="form-label">
              Satuan
            </label>
            <select
              name="Satuan"
              id="Satuan"
              className="form-select"
              {...register("param.uom")}
              {...rest}
            >
              <option value="buah">buah</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Harga Modal" className="form-label">
              Harga Modal
            </label>
            <input
              type="number"
              className="form-control"
              id="Harga Modal"
              placeholder="Harga Modal"
              {...register("param.capital_price")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Harga Jual" className="form-label">
              Harga Jual
            </label>
            <input
              type="number"
              className="form-control"
              id="Harga Jual"
              placeholder="Harga Jual"
              {...register("param.price")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Harga Jual" className="form-label">
              Harga Jual Cabang
            </label>
            <input
              type="number"
              className="form-control"
              id="Harga Jual"
              placeholder="Harga Jual"
              {...register("param.branch_price")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="Stock"
              placeholder="Stock"
              {...register("param.stock")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Min. Stock" className="form-label">
              Min. Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="Min. Stock"
              placeholder="Min. Stock"
              {...register("param.min_stock")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Serial Number" className="form-label">
              Serial Number
            </label>
            <input
              type="text"
              className="form-control"
              id="Serial Number"
              placeholder="Serial Number"
              {...register("param.serial_number")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Select Category" className="form-label">
              Select Category
            </label>
            <SelectedCategory />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProducts;
