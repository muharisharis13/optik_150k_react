import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import { CreateSupplierModal } from "../../../../common_component/modal/supplier";
import $ from "jquery";
import { useQuery, useMutation } from "react-query";
import { supplierAPI } from "../../../../API";
import { Loading } from "@utils";

const SupplierPage = () => {
  const { control, setValue, register } = useForm({
    defaultValues: {
      current_page: 1,
      search: "",
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
    mutationFn: (uuid) => supplierAPI.getDetailSupplier(uuid),
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      $("#CreateSupplierModal").modal("show");
    },
  });

  const btnHandleDelete = useMutation({
    mutationFn: ({ uuid, name }) => {
      const result = confirm("Apakah Anda Yakin untuk hapus " + name + "?");

      if (result) supplierAPI.deleteSupplier(uuid);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: dataSupplier,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListSupplier"],
    queryFn: () =>
      supplierAPI.getListSupplier({
        query: {
          size: 10,
          page: current_page,
          column_name: "supplier_name",
          query: search,
        },
      }),
  });

  Loading(
    isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnHandleEdit.isLoading ||
      btnHandleDelete?.isLoading
  );

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary"
              onClick={() => $("#CreateSupplierModal").modal("show")}
            >
              Tambah Supplier Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Supplier"
              data={dataSupplier?.result?.map((item) => ({
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
                      btnHandleDelete.mutate({
                        uuid: item?.uuid,
                        name: item?.supplier_name,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataSupplier?.currentPage}
              total_page={dataSupplier?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>
      {/* MODAL ------ */}
      <CreateSupplierModal param={btnHandleEdit?.data} />
    </div>
  );
};

export default SupplierPage;

const column = [
  {
    title: "Nama Supplier",
    key: "supplier_name",
  },
  {
    title: "Alamat Supplier",
    key: "supplier_address",
  },
  {
    title: "No. HP Supplier",
    key: "supplier_phone",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
