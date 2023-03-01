import FormSearchProduct from "./formSearchProduct";
import { Tables } from "../../../../../common_component";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import FormInfoPenjualan from "./formInfoPenjualan";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { penjualanCabangAPI, productAPI } from "../../../../../API";
import { MoneyFormatZero, Loading } from "@utils";
import { ViewPenjualanCabangModal } from "../../../../../common_component/modal/history_penjualan_cabang";

const PenjualanCabangPageDashboard = () => {
  const navigate = useNavigate();
  const { setValue: setValueContext } = useFormContext();
  const { control, setValue, register, resetField, handleSubmit, reset } =
    useForm({
      defaultValues: {
        data: [],
        param: {
          qty: 0,
          uom: "",
          product: "",
          stock: 0,
          price: 0,
          subtotal: 0,
          notes: "",
          productCode: "",
        },
        param_transaksi: {
          total_transaksi_cabang: 0,
          transaksi_status: "CREDIT",
          notes: "",
          uang1: 0,
          uang2: 0,
        },
        resultParam: {
          data: [],
          data_info: {},
        },
      },
    });

  const selectedCaraBayar2 = useWatch({
    name: "selected.cara_bayar_2",
  });

  const selectedCaraBayar1 = useWatch({
    name: "selected.cara_bayar",
  });

  const selectedCabang = useWatch({
    name: "selected.cabang",
  });

  const selectedProduct = useWatch({
    name: "selected.product",
  });

  const resultParam = useWatch({
    control,
    name: "resultParam",
  });

  const data = useWatch({
    control,
    name: "data",
  });

  const paramQty = useWatch({
    name: "param.qty",
    control,
  });
  const paramPrice = useWatch({
    control,
    name: "param.price",
  });

  const param = useWatch({
    control,
    name: "param",
  });

  const param_transaksi = useWatch({
    name: "param_transaksi",
    control,
  });

  const getDetailProduct = useMutation({
    mutationFn: (uuid) => productAPI.getDetailProduct(uuid),
    onSuccess: (onSuccess) => {
      if (onSuccess) {
        return Object.entries(onSuccess).forEach(([name, value]) =>
          setValue(`param.${name}`, value)
        );
      }
    },
  });

  const initTotalTransaksi = () => {
    setValue(
      "param_transaksi.total_transaksi_cabang",
      data?.reduce((prev, curr) => {
        return prev + curr.subtotal;
      }, 0)
    );
  };

  useEffect(() => {
    setValue("param.subtotal", parseInt(paramQty) * parseInt(paramPrice));
  }, [paramQty]);

  useEffect(() => {
    getDetailProduct.mutate(selectedProduct?.value);
  }, [selectedProduct?.value]);

  useEffect(() => {
    initTotalTransaksi();
  }, [data]);

  const btnTambah = () => {
    const findDuplicate = data.find(
      (find) => find?.productCode === param?.productCode
    );
    if (findDuplicate?.productCode) {
      setValue(
        "data",
        data.map((obj) =>
          obj.productCode === findDuplicate?.productCode
            ? { ...obj, qty: parseInt(obj.qty) + parseInt(paramQty) }
            : obj
        )
      );
    } else {
      setValue("data", [
        ...data,
        {
          ...param,
          notes: param?.notes || "-",
        },
      ]);
    }
    resetField("param", {
      qty: 0,
      uom: "",
      product: "",
      stock: 0,
      price: 0,
      subtotal: 0,
      notes: "",
      productCode: "",
    });
    setValueContext("selected.product", "");
  };

  const btnHandleSimpan = useMutation({
    mutationFn: (obj) => {
      const body = {
        total_transaksi_cabang: obj?.param_transaksi?.total_transaksi_cabang,
        uang1: obj?.param_transaksi?.uang1,
        uang2: obj?.param_transaksi?.uang2,
        uang_total:
          parseInt(obj?.param_transaksi?.uang1) +
          parseInt(obj?.param_transaksi?.uang2),
        cabangId: selectedCabang?.value,
        payment_method1: selectedCaraBayar1?.label,
        payment_method2: selectedCaraBayar2?.label,
        discount: 0,
        notes: obj?.param_transaksi?.notes,
        transaksi_status: obj?.param_transaksi?.transaksi_status,
        listProduct: obj?.data?.map((item) => ({
          productId: item.id,
          price: item.price,
          qty: item.qty,
          discount: 0,
          subtotal: item.subtotal,
          notes: item.notes,
        })),
      };
      console.log({ body });
      return penjualanCabangAPI.addPenjualanCabang({
        body,
      });
    },
    onSuccess: (onSuccess) => {
      console.log({ onSuccess });
      $("#ViewPenjualanCabangModal").modal("show");
      setValue("resultParam", {
        data: onSuccess?.data?.listProduct,
        data_info: onSuccess?.data?.result,
      });
      resetField("param", {
        qty: 0,
        uom: "",
        product: "",
        stock: 0,
        price: 0,
        subtotal: 0,
        notes: "",
        productCode: "",
      });
      resetField("data", []);
      resetField("param_transaksi", {
        total_transaksi_cabang: 0,
        transaksi_status: "CREDIT",
        notes: "",
        uang1: 0,
        uang2: 0,
      });
    },
  });

  const btnHandleDelete = (idx) => {
    setValue(
      "data",
      data.filter((filter) => filter.id !== idx)
    );
  };

  Loading(btnHandleSimpan.isLoading);

  console.log({ resultParam });

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <FormSearchProduct register={register} />
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={btnTambah}>
              Tambah
            </button>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <Tables
              data={data.map((item, idx) => ({
                ...item,
                subtotal: item.subtotal,
                price: MoneyFormatZero(item.price),
                qty: (
                  <input
                    className="form-control"
                    type="number"
                    value={item.qty}
                    onChange={(e) => {
                      setValue(`data.${idx}.qty`, e.target.value);
                      setValue(
                        `data.${idx}.subtotal`,
                        parseInt(item.price) * parseInt(e.target.value)
                      );
                    }}
                  />
                ),
                action: [
                  <button
                    className="btn btn-danger"
                    onClick={() => btnHandleDelete(item.id)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              column={column}
              isPagination={false}
              isSearch={false}
            />
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <FormInfoPenjualan
              param_transaksi={param_transaksi}
              register={register}
            />
          </div>
          <div className="card-footer justify-content-end align-items-end text-end">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(btnHandleSimpan.mutate)}
            >
              Simpan
            </button>
            {/* <button
              className="btn btn-success mx-2"
              onClick={btnHandleCetakSuratJalan}
            >
              Cetak Surat Jalan
            </button> */}
          </div>
        </div>
      </div>
      <ViewPenjualanCabangModal
        data={resultParam?.data}
        dataInfo={resultParam?.data_info}
      />
    </div>
  );
};

export default PenjualanCabangPageDashboard;

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
    title: "Satuan Barang",
    key: "uom",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "Keterangan",
    key: "notes",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Sub Total",
    key: "subtotal",
  },
  {
    title: "Action",
    key: "action",
  },
];
