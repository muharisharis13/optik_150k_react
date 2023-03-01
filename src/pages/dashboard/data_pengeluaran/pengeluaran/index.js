import { Tables } from "../../../../../common_component";
import { EditPengeluaranModal } from "../../../../../common_component/modal/pengeluaran";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { pengeluaranAPI } from "../../../../../API";
import { Loading } from "@utils";

const PengeluaranDashboardPage = () => {
  const { control, setValue, register } = useForm({
    defaultValues: {
      current_page: 1,
      total_page: 10,
      param: {},
      search: "",
    },
  });

  const current_page = useWatch({
    control,
    name: "current_page",
  });
  const param = useWatch({
    name: "param",
    control,
  });
  const search = useWatch({
    name: "search",
    control,
  });
  const btnPagination = useMutation({
    mutationFn: (newPage) => setValue("current_page", newPage),
    onSuccess: () => {
      refetch();
    },
  });
  const btnDelete = useMutation({
    mutationFn: ({ name, uuid }) => {
      const result = confirm(`Apakah Anda Yakin Hapus ${name} ?`);
      if (result) pengeluaranAPI.deletePengeluaran(uuid);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const btnHandleAdd = () => {
    $("#EditPengeluaranModal").modal("show");
    setValue("param", {});
  };

  const btnHandleEdit = useMutation({
    mutationFn: (uuid) => pengeluaranAPI.getDetailPengeluaran(uuid),
    onSuccess: (onSuccess) => {
      console.log(onSuccess);
      setValue("param", onSuccess);
      $("#EditPengeluaranModal").modal("show");
    },
  });

  const {
    refetch,
    isLoading,
    data: dataPengeluaran,
  } = useQuery({
    queryKey: ["getListPengeluaran"],
    queryFn: () =>
      pengeluaranAPI.getListPengeluaran({
        query: {
          size: 10,
          page: current_page,
          column_name: "employee",
          query: search,
        },
      }),
  });
  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnHandleEdit.isLoading ||
      btnSearch.isLoading ||
      btnDelete.isLoading
  );
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-auto">
                <button className="btn btn-primary" onClick={btnHandleAdd}>
                  Tambah Pengeluaran Baru
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Karyawan"
              data={dataPengeluaran?.result?.map((item) => ({
                ...item,
                action: [
                  <button
                    className="btn text-danger"
                    onClick={() =>
                      btnDelete.mutate({
                        name: item?.jenis_pengeluaran,
                        uuid: item.uuid,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                  <button
                    className="btn text-primary"
                    // data-bs-toggle="modal"
                    // data-bs-target="#EditPengeluaranModal"
                    onClick={() => btnHandleEdit.mutate(item?.uuid)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>,
                ],
              }))}
              total_page={dataPengeluaran?.totalPages}
              current_page={dataPengeluaran?.currentPage}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>

      {/* MODAL ====== */}
      <EditPengeluaranModal register={register} param={param} />
    </div>
  );
};

export default PengeluaranDashboardPage;

const column = [
  {
    title: "Jenis Pengeluaran",
    key: "jenis_pengeluaran",
  },
  {
    title: "Total",
    key: "amount",
  },
  {
    title: "Karyawan",
    key: "employee",
  },
  {
    title: "Deskripsi",
    key: "keterangan",
  },
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
