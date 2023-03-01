import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { cabangAPI } from "../../../../API";
import { Loading } from "@utils";
import { ModalCabang } from "../../../../common_component/modal";

const CabangPage = () => {
  const { control, setValue, register, reset } = useForm({
    defaultValues: {
      data: [{ branch_name: "PT. Bla bla" }],
      current_page: 1,
      param: {
        alamat: "",
        nama_cabang: "",
      },
      search: "",
    },
  });

  const current_page = useWatch({
    control,
    name: "current_page",
  });
  const search = useWatch({
    control,
    name: "search",
  });
  const param = useWatch({
    control,
    name: "param",
  });

  const btnPagination = useMutation({
    mutationFn: (newPage) => setValue("current_page", newPage),
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

  const btnHandleEdit = useMutation({
    mutationFn: (uuid) => cabangAPI.getDetailCabang({ uuid: uuid }),
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      setValue("param", onSuccess);
      $("#ModalCabang").modal("show");
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ uuid, nameProp }) => {
      const result = confirm(`Apakah Anda Yakin Hapus ${nameProp} ?`);
      if (result) cabangAPI.deleteCabang({ uuid: uuid });
    },
    onSuccess: (onSuccess) => {
      refetch();
    },
  });

  const {
    data: dataCabang,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListCabang"],
    queryFn: () =>
      cabangAPI.getListCabang({
        query: {
          size: 10,
          page: current_page,
          column_name: "nama_cabang",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnHandleEdit.isLoading ||
      btnDelete.isLoading
  );

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary"
              onClick={() => {
                $("#ModalCabang").modal("show");
                reset({
                  param: {
                    alamat: "",
                    nama_cabang: "",
                  },
                });
              }}
            >
              Tambah Cabang Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Cabang"
              data={dataCabang?.result?.map((item) => ({
                ...item,
                action: [
                  <button
                    className="btn text-primary"
                    onClick={() => btnHandleEdit.mutate(item.uuid)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>,
                  <button
                    className="btn text-danger"
                    onClick={() =>
                      btnDelete.mutateAsync({
                        uuid: item.uuid,
                        nameProp: item.nama_cabang,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataCabang?.currentPage}
              total_page={dataCabang?.totalPages}
              btnPagination={btnPagination.mutate}
              btnSearch={btnSearch.mutate}
              registerSearch={register}
            />
          </div>
        </div>
      </div>
      <ModalCabang param={param} />
    </div>
  );
};

export default CabangPage;

const column = [
  {
    title: "Nama Cabang",
    key: "nama_cabang",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
