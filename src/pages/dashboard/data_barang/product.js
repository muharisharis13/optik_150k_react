import { Tables } from "../../../../common_component";
import { productAPI } from "../../../../API";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { Loading } from "../../../utils";
import { ModalProducts } from "../../../../common_component/modal";
import { useMutation, useQuery } from "react-query";

const ProductPage = () => {
  const { setValue: setValueContext } = useFormContext();
  const { control, setValue, register, handleSubmit, reset } = useForm({
    defaultValues: {
      current_page: 1,
      param: {
        product_name: "",
        uom: "",
        capital_price: "",
        price: "",
        stock: "",
        min_stock: "",
        serial_number: "",
      },
      search: "",
    },
  });

  const search = useWatch({
    control,
    name: "search",
  });
  const current_page = useWatch({
    control,
    name: "current_page",
  });

  const selectedCategory = useWatch({
    name: "selected.category",
  });
  const param = useWatch({
    control,
    name: "param",
  });

  const btnPagination = useMutation(
    (newPage) => setValue("current_page", newPage),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const btnCreateProduct = useMutation(
    async ({ param }) =>
      await productAPI.addProduct({
        body: {
          product_name: param.product_name,
          uom: param.uom,
          capital_price: param.capital_price,
          price: param.price,
          stock: param.stock,
          min_stock: param.min_stock,
          category_id: selectedCategory?.value,
          serial_number: param.serial_number,
        },
      }),
    {
      onSuccess: (onSuccess) => {
        // console.log({ onSuccess });
        if (onSuccess.code == 200) {
          refetch();
          reset();
          $("#ModalProducts").modal("hide");
        }
      },
    }
  );

  const btnUpdateProduct = useMutation({
    mutationFn: ({ param }) =>
      productAPI.updateProduct({
        uuid: param?.uuid,
        body: {
          ...param,
          category_id: selectedCategory?.value,
        },
      }),
    onSuccess: (onSuccess) => {
      refetch();
      reset();
      $("#ModalProducts").modal("hide");
    },
  });

  const btnHandleEdit = useMutation({
    mutationKey: ["btnHandleEdit"],
    mutationFn: (uuid) => productAPI.getDetailProduct(uuid),
    onSuccess: (onSuccess) => {
      // console.log({ onSuccess });
      setValue("param", onSuccess);
      setValueContext("selected.category", {
        value: onSuccess?.category?.id,
        label: onSuccess?.category?.category_name,
      });
      $("#ModalProducts").modal("show");
    },
  });

  // const btnSearch = useMutation(() => {}, {
  //   onSuccess: () => {
  //     setValue("current_page", 1);
  //     refetch();
  //   },
  // });
  const btnSearch = useMutation({
    mutationFn: ({ search }) => setValue("current_page", 1),
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: dataQuery,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getListProdcut"],
    queryFn: () =>
      productAPI.getListProduct({
        query: {
          size: 10,
          page: current_page,
          column_name: "product_name",
          query: search,
        },
      }),
  });

  const btnDeleteProduct = useMutation({
    mutationFn: (param, name) => {
      const result = confirm(`Apakah Anda Yakin Hapus ${name} ?`);
      if (result) {
        return productAPI.deleteProduct(param);
      }
      // console.log({ result });
    },

    onSuccess: (onSuccess) => {
      // console.log("hasi", onSuccess);
      refetch();
    },
  });
  const btnDownloadData = useMutation({
    mutationFn: () => productAPI.downloadProductList,
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
    },
  });

  Loading(
    isLoading ||
      btnCreateProduct.isLoading ||
      btnPagination.isLoading ||
      btnSearch.isLoading ||
      btnUpdateProduct.isLoading ||
      btnDeleteProduct.isLoading ||
      btnDownloadData.isLoading
  );

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body gap-2 d-flex">
            <button
              id="btnAddProduct"
              className="btn btn-primary"
              onClick={() => {
                $("#ModalProducts").modal("show");
                reset();
                setValueContext("selected.category", "");
              }}
            >
              Tambah Produk Baru
            </button>
            <a
              className="btn btn-secondary"
              target="__blank"
              href="http://localhost:3002/api/v1/product/export/csv"
            >
              Download Product
            </a>

            <button
              className="btn btn-success"
              onClick={() => $("#ModalUploadCsv").modal("show")}
            >
              Upload Product
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              column={column}
              placeholderSearch="Search Nama Produk"
              data={dataQuery?.result?.map((item) => ({
                ...item,
                action: [
                  <button
                    className="btn text-primary"
                    onClick={() => btnHandleEdit.mutateAsync(item.uuid)}
                  >
                    <i className="bx bx-edit"></i>
                  </button>,
                  <button
                    className="btn text-danger"
                    onClick={() =>
                      btnDeleteProduct.mutate(item.uuid, item.product_name)
                    }
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              current_page={dataQuery?.currentPage}
              total_page={dataQuery?.totalPages}
              btnPagination={(newPage) => btnPagination.mutate(newPage)}
              registerSearch={register}
              btnSearch={handleSubmit(btnSearch.mutate)}
            />
          </div>
        </div>
        {/* Modal ==== */}
        <ModalProducts
          register={register}
          submit={handleSubmit(
            param?.uuid
              ? btnUpdateProduct.mutateAsync
              : btnCreateProduct.mutateAsync
          )}
          param={param}
        />
      </div>
    </div>
  );
};

export default ProductPage;

const column = [
  {
    title: "Kode Produk",
    key: "productCode",
  },
  {
    title: "Nama Barang",
    key: "product_name",
  },
  {
    title: "Stock",
    key: "stock",
  },
  {
    title: "Min. Stock",
    key: "min_stock",
  },
  {
    title: "Harga Modal",
    key: "capital_price",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
