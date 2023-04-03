import { Tables } from "../../../../common_component";
import { useForm, useWatch } from "react-hook-form";
import {
  CreateKwitansiModal,
  PrintKwitansiModal,
} from "../../../../common_component/modal/kwintansi";
import { useQuery, useMutation } from "react-query";
import { kwitansiAPI } from "../../../../API";
import { Loading } from "@utils";

const KwintansiPage = () => {
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
    control,
    name: "search",
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
    onSuccess: () => refetch(),
  });
  const {
    data: dataKwitansi,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListKwitansi"],
    queryFn: () =>
      kwitansiAPI.getListKwitansi({
        query: {
          size: 10,
          page: current_page,
          column_name: "employee",
          query: search,
        },
      }),
  });

  const btnDetailKwitansi = (item) => {
    console.log({ item });
    setValue("param", item);
    $("#PrintKwitansiModal").modal("show");
  };

  const validateButtonPrint = (createdAt, item) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getUTCFullYear();
    const resultDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;

    console.log({ resultDate });
    if (resultDate !== createdAt.split(" ")[0]) {
      return null;
    } else {
      return (
        <button
          className="btn text-primary"
          onClick={() => btnDetailKwitansi(item)}
        >
          <i className="bx bx-printer"></i>
        </button>
      );
    }
  };

  Loading(isLoading || btnPagination.isLoading);
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary"
              onClick={() => $("#CreateKwintansiModal").modal("show")}
            >
              Tambah Kwintansi Baru
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Karyawan"
              data={dataKwitansi?.result?.map((item) => ({
                ...item,
                action: [validateButtonPrint(item.createdAt, item)],
              }))}
              current_page={dataKwitansi?.currentPage}
              total_page={dataKwitansi?.totalPages}
              btnPagination={btnPagination.mutate}
              registerSearch={register}
              btnSearch={btnSearch.mutate}
            />
          </div>
        </div>
      </div>

      {/* MODAL ===== */}
      <CreateKwitansiModal />
      <PrintKwitansiModal param={param} />
    </div>
  );
};

export default KwintansiPage;

const column = [
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "Kode Kwintansi",
    key: "kwitansi_code",
  },
  {
    title: "Nominal",
    key: "amount",
  },
  {
    title: "Harga",
    key: "price",
  },
  {
    title: "Karyawan",
    key: "employee",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
