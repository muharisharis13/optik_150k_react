import { Tables } from "../../../../../common_component";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import FormSearch from "./formSearch";
import $ from "jquery";
import { ViewPenjualanModal } from "../../../../../common_component/modal/history_penjualan";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { PenjualanAPI } from "../../../../../API";
import { Loading, MoneyFormatZero, DateFormatMonthName } from "@utils";
import { useEffect } from "react";

const HistoryPenjualan = () => {
  const queryClient = useQueryClient();
  const { control, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      current_page: 1,
      search: "",
      param: {
        data_info: {},
        listProduct: [],
      },
      selectedRadio: "customer.no_hp",
    },
  });

  const current_page = useWatch({
    control,
    name: "current_page",
  });

  const param = useWatch({
    control,
    name: "param",
  });

  const selectedRadio = useWatch({
    control,
    name: "selectedRadio",
  });

  const search = useWatch({
    name: "search",
    control,
  });

  const role = localStorage.getItem("role");

  const btnPagination = useMutation({
    mutationFn: (newPage) => setValue("current_page", newPage),
    onSuccess: () => {
      dataPenjualan.mutate();
    },
  });

  const btnModalDetail = useMutation({
    mutationKey: ["btnModalDetailHistoryPenjualan"],
    mutationFn: (uuid) => PenjualanAPI.getDetailPenjualan(uuid),
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      $("#ViewPenjualanModal").modal("show");
      setValue("param", onSuccess);
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      dataPenjualan.mutate();
    },
  });

  const dataPenjualan = useMutation({
    mutationKey: ["getListPenjualan"],
    mutationFn: () =>
      PenjualanAPI.getListPenjualan({
        query: {
          size: 10,
          page: current_page,
          column_name: selectedRadio,
          query: search,
        },
      }),
  });

  useEffect(() => {
    if (role === "admin") {
      dataPenjualan.mutate();
    }
  }, []);

  Loading(
    dataPenjualan.isLoading ||
      btnPagination.isLoading ||
      btnModalDetail.isLoading ||
      btnSearch.isLoading
  );

  console.log({ dataPenjualan: dataPenjualan?.data });

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <FormSearch
              selectedRadio={selectedRadio}
              register={register}
              btnSearch={handleSubmit(btnSearch.mutate)}
            />
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              data={dataPenjualan?.data?.result?.map((item) => ({
                ...item,
                createdAt: DateFormatMonthName(item.createdAt),
                total_uang: "Rp. " + MoneyFormatZero(item.total_uang),
                transaksi_status: item.transaksi_status ? (
                  <span
                    className={`badge w-100 rounded-pill ${
                      item.transaksi_status === "COMPLETE"
                        ? "bg-success"
                        : item.transaksi_status === "DP"
                        ? "bg-info"
                        : "bg-danger"
                    }`}
                  >
                    {item.transaksi_status}
                  </span>
                ) : (
                  item.transaksi_status
                ),
                action: (
                  <button
                    className="btn text-primary"
                    onClick={() => btnModalDetail.mutate(item.uuid)}
                  >
                    <i className="bx bx-edit"></i>
                    View
                  </button>
                ),
              }))}
              registerSearch={role === "admin" ? register : null}
              btnSearch={role === "admin" ? btnSearch.mutate : null}
              btnPagination={btnPagination.mutate}
              current_page={dataPenjualan?.data?.currentPage ?? 1}
              total_page={dataPenjualan?.data?.totalPages ?? 1}
              isSearch={false}
            />
          </div>
        </div>
      </div>

      {/* MODAL ====== */}
      <ViewPenjualanModal data={param.listProduct} dataInfo={param.data_info} />
    </div>
  );
};

export default HistoryPenjualan;

const column = [
  {
    title: "Nama Pelanggan",
    key: "customer.customer_name",
  },
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "No. HP",
    key: "customer.no_hp",
  },
  {
    title: "No. Faktur",
    key: "no_faktur",
  },
  {
    title: "Total Transaksi",
    key: "total_transaksi",
  },
  {
    title: "Status",
    key: "transaksi_status",
  },
  {
    title: "Action",
    key: "action",
  },
];
