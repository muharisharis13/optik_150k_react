import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import { ViewDetailPembelian } from "../../../../common_component/modal/history_pembelian";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { pembelianAPI, supplierAPI } from "../../../../API";
import { Loading } from "@utils";

const HistoryPembelian = () => {
  const { control, setValue, register } = useForm({
    defaultValues: {
      current_page: 1,
      search: "",
      param: {
        data_info: {},
        dataTable: [],
      },
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
  const param = useWatch({
    name: "param",
    control,
  });
  const btnPagination = useMutation({
    mutationFn: (newPage) => setValue("current_page", newPage),
    onSuccess: () => {
      refetch();
    },
  });
  const btnHandleView = useMutation({
    mutationFn: (uuid) => pembelianAPI.getDetailPembelian(uuid),
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      setValue("param", {
        data_info: onSuccess?.dataInfo,
        dataTable: onSuccess?.listProduct,
      });
      $("#ViewDetailPembelian").modal("show");
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: dataPembelian,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () =>
      pembelianAPI.getListPembelian({
        query: {
          size: 10,
          page: current_page,
          column_name: "supplier.supplier_name",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnHandleView.isLoading
  );
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <Tables
              placeholderSearch={"Search Supplier Name"}
              column={column}
              data={dataPembelian?.result?.map((item) => ({
                ...item,
                supplier: item?.supplier ? item.supplier : {},
                action: [
                  <button
                    className="btn text-primary"
                    onClick={() => btnHandleView.mutate(item.uuid)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>,
                ],
              }))}
              current_page={dataPembelian?.currentPage}
              total_page={dataPembelian?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      <ViewDetailPembelian
        data_info={param.data_info}
        dataTable={param.dataTable}
      />
    </div>
  );
};
export default HistoryPembelian;

const column = [
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "Kode Pembelian",
    key: "no_faktur_beli",
  },
  {
    title: "Nama Supplier",
    key: "supplier.supplier_name",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
