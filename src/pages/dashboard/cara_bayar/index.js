import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { caraBayarAPI } from "../../../../API";
import { Loading } from "@utils";
import { ModalCaraBayar } from "../../../../common_component/modal";
const CaraBayarPage = () => {
  const { control, setValue, register } = useForm({
    defaultValues: {
      current_page: 1,
      search: "",
      param: {},
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

  const btnHandleEdit = useMutation({
    mutationFn: (uuid) => caraBayarAPI.getDetailCaraBayar(uuid),
    onSuccess: (onSuccess) => {
      setValue("param", onSuccess);
      $("#ModalCaraBayar").modal("show");
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ uuid, name }) => {
      const result = confirm(`Apakah Anda Yakin Untuk Hapus ${name} ?`);

      if (result) caraBayarAPI.deleteCaraBayar(uuid);
    },
    onSuccess: () => {
      refetch();
      window.location.reload();
    },
  });

  const {
    isLoading,
    data: dataCaraBayar,
    refetch,
  } = useQuery({
    queryKey: ["getListCaraBayar"],
    queryFn: () =>
      caraBayarAPI.getListCaraBayar({
        query: {
          size: 10,
          page: current_page,
          column_name: "cara_bayar_name",
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
                $("#ModalCaraBayar").modal("show");
                setValue("param", {});
              }}
            >
              Tambah Cara Bayar Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Cara Bayar"
              data={dataCaraBayar?.result?.map((item) => ({
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
                      btnDelete.mutate({
                        uuid: item.uuid,
                        name: item.cara_bayar_name,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataCaraBayar?.currentPage}
              total_page={dataCaraBayar?.totalPages}
              btnPagination={btnPagination.mutate}
              btnSearch={btnSearch.mutate}
              registerSearch={register}
            />
          </div>
        </div>
      </div>
      <ModalCaraBayar param={param} />
    </div>
  );
};

export default CaraBayarPage;

const column = [
  {
    title: "Nama Cara Bayar",
    key: "cara_bayar_name",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
