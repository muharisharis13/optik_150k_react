import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { categoryAPI } from "../../../../API";
import { Loading } from "@utils";
import { ModalCategory } from "../../../../common_component/modal";

const CategoryPage = () => {
  const { control, setValue, register, reset } = useForm({
    defaultValues: {
      data: [{ category_name: "PT. Bla bla" }],
      current_page: 1,
      total_page: 1,
      search: "",
      param: {
        category_name: "",
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

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const btnHandleEdit = useMutation({
    mutationFn: (uuid) => categoryAPI.getDetailCategory(uuid),
    onSuccess: (onSuccess) => {
      if (!btnHandleEdit.isLoading) {
        setValue("param", onSuccess);
        $("#ModalCategory").modal("show");
      }
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ param, name }) => {
      console.log({ param, name });
      const result = confirm(`APakah Anda Yakin Untuk Hapus ${name} ? `);

      if (result) categoryAPI.deleteCategory(param);
    },
    onSuccess: (onSuccess) => {
      refetch();
    },
  });

  const {
    isLoading,
    data: dataCategory,
    refetch,
  } = useQuery({
    queryKey: ["getListCategory"],
    queryFn: () =>
      categoryAPI.getListCategory({
        query: {
          size: 10,
          page: current_page,
          column_name: "category_name",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnHandleEdit.isLoading
  );

  console.log(dataCategory);

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary"
              onClick={() => {
                $("#ModalCategory").modal("show");
                reset();
              }}
            >
              Tambah Kategori Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Category"
              data={dataCategory?.result?.map((item) => ({
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
                        param: item.uuid,
                        name: item.category_name,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataCategory?.currentPage}
              total_page={dataCategory?.totalPages}
              btnPagination={btnPagination.mutate}
              btnSearch={btnSearch.mutate}
              registerSearch={register}
            />
          </div>
        </div>
      </div>
      <ModalCategory param={param} />
    </div>
  );
};

export default CategoryPage;

const column = [
  {
    title: "Nama Kategory",
    key: "category_name",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
