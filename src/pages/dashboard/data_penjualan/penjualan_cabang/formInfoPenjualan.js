import { MoneyFormatZero } from "@utils";
import {
  SelectCabang,
  SelectCaraBayar,
} from "../../../../../common_component/select";

const FormInfoPenjualan = ({ param_transaksi, register }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Select Cabang</label>
              <SelectCabang />
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
            value={MoneyFormatZero(param_transaksi.total_transaksi_cabang)}
          />
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Cara Bayar 1</label>
          <SelectCaraBayar />
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Cara Bayar 2</label>
          <SelectCaraBayar caraBayar2={true} />
        </div>
        <div className="col-md-3 col-lg-3 p-1">
          <label className="form-label">Status</label>
          <select
            name=""
            id=""
            className="form-select"
            {...register("param_transaksi.transaksi_status")}
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
            {...register("param_transaksi.notes")}
          ></textarea>
        </div>
      </div>
      {/* <small className="text-danger">
        <i>
          *Cetak Faktur ( Cetak Surat Jalan dan Faktur ) , Cetak Surat Jalan
          hanya cetak surat jalan
        </i>
      </small> */}
      <hr />
      <div className="container-total">
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Total Yang Harus Dibayar</strong>
          </div>
          <div className="col-md-10">
            : {MoneyFormatZero(param_transaksi.total_transaksi_cabang)}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>Tunai 1</strong>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            :&nbsp;
            <input
              type="text"
              placeholder="Tunai 1"
              className="form-control form-control-sm"
              {...register("param_transaksi.uang1")}
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
              type="text"
              placeholder="Tunai 2"
              className="form-control form-control-sm"
              {...register("param_transaksi.uang2")}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <strong>
              {parseInt(param_transaksi.uang1) +
                parseInt(param_transaksi.uang2) -
                param_transaksi.total_transaksi_cabang >
              0
                ? "Kembalian"
                : "Kurang"}
            </strong>
          </div>
          <div className="col-md-10">
            :
            {MoneyFormatZero(
              parseInt(param_transaksi.uang1) +
                parseInt(param_transaksi.uang2) -
                param_transaksi.total_transaksi_cabang || 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInfoPenjualan;

const statusArr = ["CREDIT", "DP", "LUNAS"];
