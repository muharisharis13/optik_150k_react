import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { customerAPI } from "../../../../API";
import { useQuery, useMutation } from "react-query";
import { Loading } from "@utils";
import { ModalCustomer } from "../../../../common_component/modal";

const CustomerPage = () => {
  const { control, setValue, register, reset } = useForm({
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
    mutationFn: (uuid) => customerAPI.getDetailCustomer(uuid),
    onSuccess: (onSuccess) => {
      setValue("param", onSuccess);
      $("#ModalCustomer").modal("show");
    },
  });

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ name, uuid }) => {
      const result = confirm(`Apakah Anda Yakin Hapus ${name} ?`);

      if (result) customerAPI.deleteCustomer(uuid);
    },
    onSuccess: () => {
      refetch();
      location.reload();
    },
  });

  const {
    isLoading,
    data: dataCustomer,
    refetch,
  } = useQuery({
    queryKey: ["getListCustomer"],
    queryFn: () =>
      customerAPI.getListCustomer({
        query: {
          size: 10,
          page: current_page,
          column_name: "customer_name",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination?.isLoading ||
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
                $("#ModalCustomer").modal("show");
                reset();
              }}
            >
              Tambah Customer Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Cabang"
              data={dataCustomer?.result?.map((item) => ({
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
                        name: item.customer_name,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataCustomer?.currentPage}
              total_page={dataCustomer?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>
      <ModalCustomer param={param} />
    </div>
  );
};

export default CustomerPage;

const column = [
  {
    title: "Kode Customer",
    key: "kdCustomer",
  },
  {
    title: "Nama Customer",
    key: "customer_name",
  },
  {
    title: "No. HP",
    key: "no_hp",
  },
  {
    title: "Alamat Customer",
    key: "alamat",
    className: "text-truncate w-25",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
