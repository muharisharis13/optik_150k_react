import { Tables } from "../../../../../common_component";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import FormSearch from "./formSearch";
import $ from "jquery";
import { ViewPenjualanCabangModal } from "../../../../../common_component/modal/history_penjualan_cabang";
import { useQuery, useMutation } from "react-query";
import { penjualanCabangAPI } from "../../../../../API";
import { Loading } from "@utils";

const HistoryPenjualanCabang = () => {
  const { control, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      current_page: 1,
      search: "",
      param: {
        dataInfo: {},
        listProduct: [],
      },
      selectedRadio: "no_faktur",
    },
  });

  const current_page = useWatch({
    control,
    name: "current_page",
  });

  const search = useWatch({
    name: "search",
    control,
  });

  const selectedCabang = useWatch({
    control,
    name: "selectedRadio",
  });

  const param = useWatch({
    control,
    name: "param",
  });

  const btnPagination = useMutation({
    mutationFn: (newPage) => setValue("current_page", newPage),
    onSuccess: () => {
      dataCabang.mutate();
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      dataCabang.mutate();
      refetch();
    },
  });

  const btnHandleModal = useMutation({
    mutationFn: (uuid) => penjualanCabangAPI.getDetailPenjualanCabang(uuid),
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      setValue("param", onSuccess);
      $("#ViewPenjualanCabangModal").modal("show");
    },
  });

  const dataCabang = useMutation({
    mutationKey: ["getListHistoryCabang"],
    mutationFn: () =>
      penjualanCabangAPI.getListPenjualanCabang({
        query: {
          size: 10,
          page: current_page,
          column_name: selectedCabang,
          query: search,
        },
      }),
  });

  Loading(
    dataCabang?.isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnHandleModal.isLoading
  );

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <FormSearch
              selectedRadio={selectedCabang}
              register={register}
              btnSearch={handleSubmit(btnSearch.mutate)}
            />
          </div>
        </div>
        {dataCabang?.data?.result?.length > 0 ? (
          <div className="card mt-2">
            <div className="card-body">
              <Tables
                column={column}
                data={dataCabang?.data?.result
                  ?.map((item) => ({
                    ...item,
                    cabang: item?.cabang?.nama_cabang ? item.cabang : {},
                  }))
                  .map((item) => ({
                    ...item,
                    status_selling: (
                      <span class="badge rounded-pill bg-success">
                        {item.status_selling}
                      </span>
                    ),
                    action: (
                      <button
                        className="btn text-primary"
                        onClick={() => btnHandleModal.mutate(item.uuid)}
                      >
                        <i className="bx bx-edit"></i>
                        View
                      </button>
                    ),
                  }))}
                btnPagination={btnPagination.mutate}
                current_page={dataCabang?.data?.currentPage}
                total_page={dataCabang?.data?.totalPages}
                isSearch={false}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* MODAL ====== */}
      <ViewPenjualanCabangModal
        dataInfo={param?.dataInfo}
        data={param?.listProduct}
      />
    </div>
  );
};

export default HistoryPenjualanCabang;

const column = [
  {
    title: "Nama Cabang",
    key: "cabang.nama_cabang",
  },
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "No. Faktur",
    key: "no_faktur",
  },
  {
    title: "Total",
    key: "total_transaksi_cabang",
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
