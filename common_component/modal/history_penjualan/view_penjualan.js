import Modal from "../../modals";
import { Tables } from "../..";
import { MoneyFormatZero, DateFormatMonthNameID } from "../../../src/utils";
import ModalPelunasan from "./pelunasan";
import { useMutation } from "react-query";
import { PenjualanAPI } from "../../../API";
import { useNavigate } from "react-router-dom";

const ViewPenjualanModal = ({ data = [], dataInfo = {} }) => {
  const navigate = useNavigate();
  const btnCancelTransaksi = useMutation({
    mutationFn: () =>
      PenjualanAPI.cancelPenjualan({
        uuid: dataInfo?.uuid,
      }),
    onSuccess: () => {
      window.location.reload();
    },
  });
  return (
    <Modal
      title="Detail Penjualan"
      idModal="ViewPenjualanModal"
      size="fullscreen"
      childrenFooter=""
    >
      <div className="card">
        <div className="card-header gap-2 d-flex">
          {dataInfo?.transaksi_status === "DP" ? (
            <button
              className="btn btn-primary"
              onClick={() => $("#ModalPelunasan").modal("show")}
            >
              Selesaikan Pembayaran
            </button>
          ) : null}
          {dataInfo?.transaksi_status === "CANCEL" ? null : (
            <button
              className="btn btn-danger"
              onClick={btnCancelTransaksi.mutate}
            >
              <i className="bx bx-trash"></i>
              Cancel
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate(`/print/penjualan?uuid=${dataInfo.uuid}`);
              $("#ViewPenjualanModal").modal("hide");
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
            data={data?.map((item) => ({
              ...item,
              subtotal: "Rp. " + MoneyFormatZero(item.subtotal),
              price: "Rp. " + MoneyFormatZero(item.price),
              product: {
                ...item.product,
                productCode: item?.product?.productCode ?? "",
              },
            }))}
            isPagination={false}
          />
        </div>
      </div>
      <ModalPelunasan uuid={dataInfo?.uuid} dataInfo={dataInfo} />
    </Modal>
  );
};

export default ViewPenjualanModal;

const FormInfo = ({ data }) => {
  let result = parseInt(data?.total_uang) - parseInt(data?.total_transaksi);
  data = {
    ...data,
    total_uang: "Rp. " + MoneyFormatZero(data?.total_uang),
    total_transaksi: "Rp. " + MoneyFormatZero(data?.total_transaksi),
    createdAt: DateFormatMonthNameID(data?.createdAt),
    [result > 0 ? "kembalian" : "kurang"]: "Rp. " + MoneyFormatZero(result),
  };

  return (
    <div className="card-body">
      <h4>Info Penjualan</h4>

      <div className="container-info-penjualan">
        {columnFormInfo
          .filter((filter) => {
            if (result > 0) {
              return filter.key !== "kurang";
            } else {
              return filter.key !== "kembalian";
            }
          })
          .map((item, idx) => {
            Object.byString = function (o, s) {
              s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
              s = s.replace(/^\./, ""); // strip a leading dot
              var a = s.split(".");
              for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                  o = o[k];
                } else {
                  return;
                }
              }
              return o;
            };
            return (
              <div className={`row mt-4 `}>
                <div className="col-md-2 col-lg-2">{item.title}</div>
                <div className="col-md-4 col-lg-4">
                  {item.key === "transaksi_status" ? (
                    <div>
                      :&nbsp;
                      <span
                        class={`badge  rounded-pill ${
                          data.transaksi_status === "COMPLETE"
                            ? "bg-success"
                            : data.transaksi_status === "DP"
                            ? "bg-info"
                            : ""
                        }`}
                      >
                        {Object.byString(data, item.key || "-") || "-"}
                      </span>
                    </div>
                  ) : (
                    <div>
                      :&nbsp;{Object.byString(data, item.key || "-") || "-"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const columnFormInfo = [
  {
    title: "No. Faktur",
    key: "no_faktur",
  },
  {
    title: "Tanggal Penjualan",
    key: "createdAt",
  },
  {
    title: "Nama Customer",
    key: "customer.customer_name",
  },
  {
    title: "Payment Method 1",
    key: "payment_method1",
  },
  {
    title: "Payment Method 2",
    key: "payment_method2",
  },
  {
    title: "Total Penjualan",
    key: "total_transaksi",
  },
  {
    title: "Uang Yang Telah Di Bayarkan",
    key: "total_uang",
  },
  {
    title: "Kurang",
    key: "kurang",
  },
  {
    title: "Kembalian",
    key: "kembalian",
  },
  {
    title: "Status Penjualan",
    key: "transaksi_status",
  },
  {
    title: "Desc. Penjualan",
    key: "notes",
  },
];

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
    title: "Total Harga Produk",
    key: "subtotal",
  },
  {
    title: "Deskripsi Produk",
    key: "notes",
  },
];
