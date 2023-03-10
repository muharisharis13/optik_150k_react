import Modal from "../../modals";
import { Tables } from "../..";
import PelunasanCabangModal from "./pelunasan";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { penjualanCabangAPI } from "../../../API";
import { MoneyFormatZero } from "@utils";

const ViewPenjualanCabangModal = ({ data = [], dataInfo = {} }) => {
  const navigate = useNavigate();

  const btnCancelTransaksiCabang = useMutation({
    mutationFn: () =>
      penjualanCabangAPI.cancelPenjualanCabang({
        uuid: dataInfo?.uuid,
      }),
    onSuccess: () => {
      window.location.reload();
    },
  });

  return (
    <Modal
      title="Detail Penjualan Cabang"
      idModal="ViewPenjualanCabangModal"
      size="fullscreen"
      childrenFooter=""
    >
      <div className="card">
        <div className="card-header d-flex gap-2">
          {dataInfo?.transaksi_status === "CREDIT" ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                $("#ModalPelunasanCabang").modal("show");
              }}
            >
              Selesaikan Pembayaran
            </button>
          ) : null}
          {dataInfo?.transaksi_status === "CANCEL" ? null : (
            <button
              className="btn btn-danger"
              onClick={btnCancelTransaksiCabang.mutate}
            >
              <i className="bx bx-trash"></i>
              Cancel
            </button>
          )}
          <button
            className="btn btn-success"
            onClick={() => {
              navigate(`/print/surat_jalan?uuid=${dataInfo.uuid}`);
              $("#ViewPenjualanCabangModal").modal("hide");
            }}
          >
            Cetak Surat Jalan
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate(`/print/penjualan_cabang?uuid=${dataInfo.uuid}`);
              $("#ViewPenjualanCabangModal").modal("hide");
            }}
          >
            Cetak Faktur
          </button>
        </div>
        <FormInfo data={dataInfo} />
      </div>
      <div className="card mt-5">
        <div className="card-header">
          <h4>Daftar Product</h4>
        </div>
        <div className="card-body">
          <Tables
            isSearch={false}
            column={column}
            data={data}
            isPagination={false}
          />
        </div>
      </div>
      <PelunasanCabangModal dataInfo={dataInfo} />
    </Modal>
  );
};

export default ViewPenjualanCabangModal;

const FormInfo = ({ data }) => {

  const validateViewFormInfo = (value,name)=>{
    if(name==="total_transaksi_cabang" ||name==="uang1" || name==="uang2" || name==="uang_total"){
      return MoneyFormatZero(value)
    }else{
      return value
    }
  }
  return (
    <div className="card-body">
      <h4>Info Penjualan</h4>
      <div className="container-info-penjualan">
        {Object.entries(data).map(([name, value]) => {
          return (
            <div className="row mt-4">
              <div className="col-md-2 col-lg-2">{name}</div>
              <div className="col-md-4 col-lg-4">
                : {value?.nama_cabang ?? validateViewFormInfo(value,name)}
              </div>
            </div>
          );
        })}
        {/* <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Tanggal Penjualan</div>
          <div className="col-md-4 col-lg-4">: {data?.createdAt}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Customer Name</div>
          <div className="col-md-4 col-lg-4">: {data?.customer_name}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Deskripsi Penjualan</div>
          <div className="col-md-4 col-lg-4">: {data?.desc_selling}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Total Penjualan</div>
          <div className="col-md-4 col-lg-4">: {data?.total_selling}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Uang Yang Telah Di Bayar</div>
          <div className="col-md-4 col-lg-4">: {data?.total_selling}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Kurang</div>
          <div className="col-md-4 col-lg-4">: {data?.total_selling}</div>
        </div>
        <div className="row mt-1">
          <div className="col-md-2 col-lg-2">Status Penjualan</div>
          <div className="col-md-4 col-lg-4">
            :{" "}
            <span class="badge rounded-pill bg-success">
              {data.status_selling}
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const column = [
  {
    title: "Kode Produk",
    key: "product.productCode",
  },
  {
    title: "Nama Produk",
    key: "product.product_name",
  },
  {
    title: "Harga",
    key: "price",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Deskripsi Produk",
    key: "notes",
  },
  {
    title: "Total Harga Produk",
    key: "subtotal",
  },
];
