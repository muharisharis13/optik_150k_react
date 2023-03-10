import { SelectedProduct } from "../../../../../common_component/select";
import { useWatch } from "react-hook-form";
const FormSearchProduct = ({ register }) => {
  const selectedProduct = useWatch({
    name: "selected.product",
  });
  return (
    <div>
      <div className="row">
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="namaBarang" className="form-label">
              Nama Barang
            </label>
            <SelectedProduct useUUID={true} />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="satuan" className="form-label">
              Satuan
            </label>
            <input
              type="text"
              className="form-control"
              id="satuan"
              placeholder="Satuan"
              aria-describedby="defaultFormControlHelp"
              disabled
              {...register("param.uom")}
            />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="text"
              className="form-control"
              id="stock"
              placeholder="Stock"
              aria-describedby="defaultFormControlHelp"
              disabled
              {...register("param.stock")}
            />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="harga" className="form-label">
              Harga
            </label>
            <input
              type="text"
              className="form-control"
              id="harga"
              placeholder="Harga"
              aria-describedby="defaultFormControlHelp"
              disabled
              {...register("param.price", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="Qty" className="form-label">
              QTY
            </label>
            <input
              type="number"
              className="form-control"
              id="Qty"
              placeholder="Qty"
              aria-describedby="defaultFormControlHelp"
              {...register("param.qty")}
              disabled={selectedProduct?.value ? false : true}
            />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="subtotal" className="form-label">
              Subtotal
            </label>
            <input
              type="text"
              className="form-control"
              id="subtotal"
              placeholder="subtotal"
              aria-describedby="defaultFormControlHelp"
              {...register("param.subtotal")}
              disabled
            />
          </div>
        </div>
        <div className=" col-lg-4 col-md-4 col-sm-4 p-1">
          <div>
            <label htmlFor="keterangan" className="form-label">
              Keterangan
            </label>
            <textarea
              rows={5}
              // cols={5}
              type="text"
              className="form-control"
              id="keterangan"
              placeholder="Keterangan"
              aria-describedby="defaultFormControlHelp"
              {...register("param.notes")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSearchProduct;
