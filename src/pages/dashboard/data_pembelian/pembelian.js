import {
  SelectSupplier,
  SelectedProduct,
} from "../../../../common_component/select";
import { Tables } from "../../../../common_component";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { pembelianAPI, productAPI } from "../../../../API";
import { useEffect } from "react";
import { Loading } from "@utils";
import { useNavigate } from "react-router-dom";

const PembelianPage = () => {
  const navigate = useNavigate();
  const { setValue: setValueContext } = useFormContext();
  const { control, setValue, register, handleSubmit, resetField } = useForm({
    defaultValues: {
      param: {
        beli_tanggal: new Date(),
        listProduct: [],
      },
      paramInput: {
        product_name: "",
        uom: "",
        capital_price: "",
        price: "",
        qty: 0,
      },
    },
  });

  const param = useWatch({
    name: "param",
    control,
  });
  const selectedProduct = useWatch({
    name: "selected.product",
  });

  const selectedSupplier = useWatch({
    name: "selected.supplier",
  });

  const paramListProduct = useWatch({
    name: "param.listProduct",
    control,
  });

  const getDetailProduct = useMutation({
    mutationFn: (uuid) => productAPI.getDetailProduct(uuid),
    onSuccess: (onSuccess) => setValue("paramInput", onSuccess),
  });

  useEffect(() => {
    getDetailProduct.mutate(selectedProduct?.value);
  }, [selectedProduct?.value]);

  const btnTambah = useMutation({
    mutationFn: ({ paramInput }) => {
      const findDuplicate = paramListProduct?.find(
        (find) => find?.productCode === paramInput?.productCode
      );

      if (findDuplicate?.productCode) {
        setValue(
          "param.listProduct",
          paramListProduct.map((obj) =>
            obj.productCode === findDuplicate?.productCode
              ? {
                  ...obj,
                  qty: parseInt(obj.qty) + parseInt(paramInput?.qty),
                }
              : obj
          )
        );
      } else {
        setValue("param.listProduct", [
          ...paramListProduct,
          {
            ...paramInput,
            subtotal: parseInt(paramInput?.qty) * parseInt(paramInput?.price),
          },
        ]);
      }
      resetField("paramInput", {
        product_name: "",
        uom: "",
        capital_price: "",
        price: "",
        qty: "",
      });
      setValueContext("selected.product", "");
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ param }) => {
      const body = {
        beli_tanggal: param?.beli_tanggal,
        supplierId: selectedSupplier?.value,
        listProduct: param?.listProduct?.map((item) => ({
          productId: item?.id,
          price: item?.price,
          qty: item?.qty,
          subtotal: item?.subtotal,
        })),
      };

      console.log({ param });

      return pembelianAPI.addPembelian({
        body,
      });
    },
    onSuccess: (onSuccess) => {
      console.log(onSuccess);
      navigate("/dashboard/dataPembelian/history");
    },
  });

  const btnDelete = useMutation({
    mutationFn: (id) =>
      setValue(
        "param.listProduct",
        paramListProduct.filter((filter) => filter.productId !== id)
      ),
  });

  Loading(getDetailProduct.isLoading || btnSimpan.isLoading);

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <div>
                  <label htmlFor="" className="form-label">
                    Supplier
                  </label>
                  <SelectSupplier />
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div>
                  <label htmlFor="" className="form-label">
                    Tanggal Beli
                  </label>
                  <input type="date" name="" id="" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 col-lg-3">
                <div>
                  <label htmlFor="" className="form-label">
                    Select Barang
                  </label>
                  <SelectedProduct useUUID={true} />
                </div>
              </div>
              <div className="col-auto">
                <div>
                  <label htmlFor="" className="form-label">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Barang"
                    className="form-control"
                    disabled
                    {...register("paramInput.product_name")}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div>
                  <label htmlFor="" className="form-label">
                    Satuan
                  </label>
                  <input
                    type="text"
                    placeholder="Satuan"
                    className="form-control"
                    disabled
                    {...register("paramInput.uom")}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div>
                  <label htmlFor="" className="form-label">
                    Harga Pokok
                  </label>
                  <input
                    type="number"
                    placeholder="Harga Pokok"
                    className="form-control"
                    {...register("paramInput.capital_price")}
                  />
                </div>
              </div>
              <div className="col-auto">
                <div>
                  <label htmlFor="" className="form-label">
                    Harga Jual
                  </label>
                  <input
                    type="number"
                    placeholder="Harga Jual"
                    className="form-control"
                    {...register("paramInput.price")}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 col-lg-3">
                <div>
                  <label htmlFor="" className="form-label">
                    Jumlah
                  </label>
                  <input
                    type="number"
                    placeholder="Jumlah"
                    className="form-control"
                    {...register("paramInput.qty")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(btnTambah.mutate)}
            >
              Tambah
            </button>
          </div>
        </div>

        <div className="card mt-2">
          <div className="card-body">
            <Tables
              isSearch={false}
              column={column}
              data={param?.listProduct.map((item, idx) => ({
                ...item,
                qty: (
                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    onChange={(e) => {
                      setValue(`param.listProduct.${idx}.qty`, e.target.value);
                      setValue(
                        `param.listProduct.${idx}.subtotal`,
                        parseInt(item.price) * parseInt(e.target.value)
                      );
                    }}
                  />
                ),
                action: [
                  <button
                    className="btn text-danger"
                    onClick={() => btnDelete.mutate(item.productId)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              isPagination={false}
            />
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(btnSimpan.mutate)}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PembelianPage;

const column = [
  {
    title: "Kode Barang",
    key: "productCode",
  },
  {
    title: "Nama Barang",
    key: "product_name",
  },
  {
    title: "Satuan",
    key: "uom",
  },
  {
    title: "Harga Pokok",
    key: "capital_price",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Subtotal",
    key: "subtotal",
  },
  {
    title: "Aksi",
    key: "action",
  },
];
