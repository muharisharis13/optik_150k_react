import { MoneyFormatZero } from "@utils";
import {
  SelectedNoHP,
  SelectCaraBayar,
} from "../../../../../common_component/select";

const FormInfoPenjualan = ({
  dataCustomer = {},
  dataListFreeProduct = [],
  onChangeHandleCheckBoxFreeItem,
  paramTransaksi = {},
  register,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Select No HP</label>
              <SelectedNoHP useUUID={true} />
            </div>
            <div className="col-12 p-2">
              <div className="row">
                <div className="col-md-4">
                  <strong>Kode Customer</strong>
                </div>
                <div className="col-md-4">
                  : {dataCustomer?.kdCustomer || "-"}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <strong>Nama Customer</strong>
                </div>
                <div className="col-md-4">
                  : {dataCustomer?.customer_name || "-"}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <strong>Alamat Customer</strong>
                </div>
                <div className="col-md-4">: {dataCustomer?.alamat || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-2">
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Total Belanja</label>
          <input
            type="text"
            disabled
            className="form-control"
            value={paramTransaksi?.total_transaksi}
          />
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Cara Bayar 1</label>
          <SelectCaraBayar />
          {/* <select
            name=""
            id=""
            className="form-select"
            {...register("paramTransaksi.payment_method1")}
          >
            {caraBayar.map((item, idx) => (
              <option key={idx}>{item}</option>
            ))}
          </select> */}
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Cara Bayar 2</label>
          {/* <select
            name=""
            id=""
            className="form-select"
            {...register("paramTransaksi.payment_method2")}
          >
            {caraBayar.map((item, idx) => (
              <option key={idx}>{item}</option>
            ))}
          </select> */}
          <SelectCaraBayar caraBayar2={true} />
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Status</label>
          <select
            name=""
            id=""
            className="form-select"
            {...register("paramTransaksi.transaksi_status")}
          >
            {statusArr.map((item, idx) => (
              <option key={idx}>{item}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label htmlFor="" className="form-label">
            Keterangan
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="form-control"
            placeholder="Keterangan"
            {...register("paramTransaksi.notes")}
          ></textarea>
        </div>
      </div>
      <hr />
      <div className="list-addtional d-flex gap-5">
        {dataListFreeProduct?.map((item, idx) => {
          return (
            <div className="form-check align-items-center d-flex" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                value={item.id}
                id={idx}
                onChange={onChangeHandleCheckBoxFreeItem}
              />
              <label className="form-check-label" for={idx}>
                {item?.product_name}
              </label>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="container-total">
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Total Yang Harus Dibayar</strong>
          </div>
          <div className="col-md-10">
            : Rp {MoneyFormatZero(paramTransaksi?.total_transaksi)}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Tunai 1</strong>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            :&nbsp;
            <input
              type="number"
              placeholder="Tunai 1"
              className="form-control form-control-sm"
              {...register("paramTransaksi.tunai1")}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Tunai 2</strong>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            : &nbsp;
            <input
              type="number"
              placeholder="Tunai 2"
              className="form-control form-control-sm"
              {...register("paramTransaksi.tunai2")}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>
              {parseInt(paramTransaksi.tunai1) +
                parseInt(paramTransaksi.tunai2) -
                paramTransaksi.total_transaksi >
              0
                ? "Kembalian"
                : "Kurang"}
            </strong>
          </div>
          <div className="col-md-10">
            : Rp.
            {MoneyFormatZero(
              parseInt(paramTransaksi.tunai1) +
                parseInt(paramTransaksi.tunai2) -
                paramTransaksi.total_transaksi || 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInfoPenjualan;

const statusArr = ["Lunas", "DP"];
