import { Tables } from "../../../../common_component";
import { useFormContext } from "react-hook-form";

const LaporanPage = () => {
  const { setValue } = useFormContext();
  const data = [
    {
      laporan_name: "Stok Barang",
      action: [
        <div className="d-flex align-items-end justify-content-end">
          <button
            className="btn text-info"
            onClick={() => $("#ModalSelectCategory").modal("show")}
          >
            <i className="bx bx-edit"></i>
          </button>

          <a
            target="__blank"
            href="/view/barang-all-category"
            className="btn text-primary"
          >
            <i className="bx bx-printer"></i>
          </a>
        </div>,
      ],
    },
    {
      laporan_name: "Penjualan Kasir",
      action: [
        <button
          className="btn text-primary"
          onClick={() => {
            $("#ModalPenjualanKasir").modal("show");
            setValue("showOf", "");
          }}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Penjualan Kasir DP",
      action: [
        <button
          className="btn text-primary"
          onClick={() => {
            $("#ModalPenjualanKasir").modal("show");
            setValue("showOf", "DP");
          }}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Penjualan Cabang",
      action: [
        <button
          className="btn text-primary"
          onClick={() => {
            $("#ModalPenjualanKasir").modal("show");
            setValue("showOf", "cabang");
          }}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Pembelian",
      action: [
        <button
          className="btn text-primary"
          onClick={() => $("#ModalPembelian").modal("show")}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Kwitansi",
      action: [
        <button
          className="btn text-primary"
          onClick={() => {
            $("#ModalKwitansi").modal("show");
            setValue("modals.pengeluaran", false);
          }}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Pengeluaran Toko",
      action: [
        <button
          className="btn text-primary"
          onClick={() => {
            $("#ModalKwitansi").modal("show");
            setValue("modals.pengeluaran", true);
          }}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
    {
      laporan_name: "Resume Keuangan",
      action: [
        <button
          className="btn text-primary"
          onClick={() => $("#ModalResumeKeuangan").modal("show")}
        >
          <i className="bx bx-printer"></i>
        </button>,
      ],
    },
  ];
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <Tables
              column={column}
              isSearch={false}
              isPagination={false}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanPage;

const column = [
  {
    title: "Nama Laporan",
    key: "laporan_name",
  },
  {
    title: "Aksi",
    key: "action",
    className: "text-end",
  },
];
