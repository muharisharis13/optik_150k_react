import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import $ from "jquery";
import { ModalBarangRusak } from "../../../../common_component/modal";
import { useQuery, useMutation } from "react-query";
import { barangRusakAPI } from "../../../../API";
import { Loading } from "@utils";

const BarangRusakPage = () => {
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

  const btnSearch = useMutation({
    mutationFn: () => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const btnDelete = useMutation({
    mutationFn: ({ name, uuid }) => {
      const result = confirm(`Apakah Anda Yakin Untuk Hapus ${name} ? `);

      if (result) barangRusakAPI.deleteBarangRusak({ uuid });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const btnHandleEdit = useMutation({
    mutationFn: (uuid) =>
      barangRusakAPI.getDetailBarangRusak({
        uuid: uuid,
      }),
    onSuccess: (onSuccess) => {
      setValue("param", onSuccess);
      $("#ModalBarangRusak").modal("show");
    },
  });

  const {
    data: dataBarangRusak,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListBarangRusak"],
    queryFn: () =>
      barangRusakAPI.getListBarangRusak({
        query: {
          size: 10,
          page: current_page,
          column_name: "product.product_name",
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
                $("#ModalBarangRusak").modal("show");
              }}
            >
              Tambah Barang Rusak Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Barang"
              data={dataBarangRusak?.result?.map((item) => ({
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
                        name: item.product?.product_name,
                      })
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataBarangRusak?.currentPage}
              total_page={dataBarangRusak?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>
      {/* Modal ====== */}
      <ModalBarangRusak param={param} isLoading={btnHandleEdit.isLoading} />
    </div>
  );
};

export default BarangRusakPage;

const column = [
  {
    title: "Kode Barang",
    key: "product.productCode",
  },
  {
    title: "UUID",
    key: "uuid",
  },
  {
    title: "Nama Barang",
    key: "product.product_name",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Deskripsi",
    key: "notes",
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
