import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { adminAPI } from "../../../../API";
import { Loading } from "@utils";
import { ModalUser } from "../../../../common_component/modal";

const UserPage = () => {
  const { control, setValue, register, reset } = useForm({
    defaultValues: {
      current_page: 1,
      param: {
        username: "",
        name: "",
        password: "",
        role: "",
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
    mutationFn: (uuid) => adminAPI.getDetail(uuid),
    onSuccess: (onSuccess) => {
      setValue("param", onSuccess);
      $("#ModalUser").modal("show");
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ uuid, name }) => {
      const result = confirm(`Apakah Anda Yakin Hapus ${name}`);
      if (result) adminAPI.deleteAdmin({ uuid });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: dataAdmin,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListAdmin2"],
    queryFn: () =>
      adminAPI.getListAdmin({
        query: {
          size: 10,
          page: current_page,
          column_name: "name",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnDelete.isLoading ||
      btnHandleEdit.isLoading
  );
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary"
              onClick={() => {
                $("#ModalUser").modal("show");

                reset();
              }}
            >
              Tambah User Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama"
              data={dataAdmin?.result?.map((item) => ({
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
                      btnDelete.mutate({ name: item.name, uuid: item.uuid })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataAdmin?.currentPage}
              total_page={dataAdmin?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>
      <ModalUser param={param} />
    </div>
  );
};

export default UserPage;

const column = [
  {
    title: "Username",
    key: "username",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Role",
    key: "role",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
