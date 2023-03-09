import FormSearchProduct from "./formSearchProduct";
import { Tables } from "../../../../../common_component";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import FormInfoPenjualan from "./formInfoPenjualan";
import { useEffect } from "react";
import { customerAPI, PenjualanAPI, productAPI } from "../../../../../API";
import { useMutation, useQuery } from "react-query";
import { Loading } from "@utils";
import { useNavigate } from "react-router-dom";
import { ViewPenjualanModal } from "../../../../../common_component/modal/history_penjualan";

const PenjualanPageDashboard = () => {
  const navigate = useNavigate();
  const { setValue: setValueContext } = useFormContext();
  const { control, setValue, register, resetField, handleSubmit } = useForm({
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
      paramTransaksi: {
        total_transaksi: 0,
        payment_method1: "Cash",
        payment_method2: "Cash",
        transaksi_status: "Lunas",
        notes: "",
        uang_total: "",
        tunai1: 0,
        tunai2: 0,
      },
      dataCustomer: {
        id: "",
        no_hp: "",
        customer_name: "",
        alamat: "",
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

  const selectedProduct = useWatch({
    name: "selected.product",
  });
  const selectedNoHp = useWatch({
    name: "selected.noHp",
  });

  const param = useWatch({
    control,
    name: "param",
  });

  const paramQty = useWatch({
    name: "param.qty",
    control,
  });
  const paramPrice = useWatch({
    control,
    name: "param.price",
  });

  const data = useWatch({
    control,
    name: "data",
  });

  const dataCustomer = useWatch({
    control,
    name: "dataCustomer",
  });
  const paramTransaksi = useWatch({
    control,
    name: "paramTransaksi",
  });

  const resultParam = useWatch({
    name: "resultParam",
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

  const getDetailCustomer = useMutation({
    mutationFn: (uuid) => customerAPI.getDetailCustomer(uuid),
    onSuccess: (onSuccess) => {
      Object.entries(onSuccess).forEach(([name, value]) =>
        setValue(`dataCustomer.${name}`, value)
      );
    },
  });

  const { data: dataListFreeProduct } = useQuery({
    queryFn: () => productAPI.getListFreeProduct(),
  });

  const initTotalTransaksi = () => {
    setValue(
      "paramTransaksi.total_transaksi",
      data?.reduce((prev, curr) => {
        return prev + curr.subtotal;
      }, 0)
    );
  };

  useEffect(() => {
    getDetailCustomer.mutate(selectedNoHp?.value);
  }, [selectedNoHp?.value]);

  useEffect(() => {
    getDetailProduct.mutate(selectedProduct?.value);
  }, [selectedProduct?.value]);

  useEffect(() => {
    setValue("param.subtotal", parseInt(paramQty) * parseInt(paramPrice));
  }, [paramQty]);

  useEffect(() => {
    initTotalTransaksi();
  }, [data]);

  const btnTambah = (e) => {
    console.log({ e: e.param });
    const findDuplicate = data.find(
      (find) => find?.productCode === param?.productCode
    );
    if (e?.param["qty"] != 0 && selectedProduct.value) {
      if (findDuplicate?.productCode) {
        setValue(
          "data",
          data.map((obj) =>
            obj.productCode === findDuplicate?.productCode
              ? {
                  ...obj,
                  qty: parseInt(obj.qty) + parseInt(paramQty),
                  subtotal:
                    (parseInt(obj.qty) + parseInt(paramQty)) *
                    parseInt(obj.price),
                }
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
    } else {
      alert("Please Check Your Input");
    }
  };

  const onChangeHandleCheckBoxFreeItem = (e) => {
    const valueId = e.target.value;
    const valueCheck = e.target.checked;
    const getObjData = dataListFreeProduct?.result?.find(
      (find) => find?.id === parseInt(valueId)
    );

    if (valueCheck) {
      setValue("data", [
        ...data,
        {
          ...getObjData,
          qty: 1,
          subtotal: 0,
        },
      ]);
    } else {
      setValue(
        "data",
        data.filter((filter) => filter?.id !== parseInt(valueId))
      );
    }
  };

  const btnHandleSimpanTransaksi = useMutation({
    mutationFn: (obj) => {
      if (obj?.paramTransaksi?.tunai1 !== 0 && obj?.dataCustomer?.id) {
        const body = {
          total_transaksi: obj?.paramTransaksi?.total_transaksi,
          uang1: obj?.paramTransaksi?.tunai1,
          uang2: obj?.paramTransaksi?.tunai2,
          total_uang:
            parseInt(obj?.paramTransaksi.tunai1) +
            parseInt(obj?.paramTransaksi.tunai2),
          customerId: obj?.dataCustomer?.id,
          payment_method1: selectedCaraBayar1?.label,
          payment_method2: selectedCaraBayar2?.label ?? "-",
          discount: 0,
          listProduct: obj?.data?.map((item) => ({
            productId: item.id,
            price: item.price,
            qty: item.qty,
            discount: 0,
            subtotal: item.subtotal,
            notes: item.notes,
          })),
          notes: obj?.paramTransaksi?.notes,
          transaksi_status: obj?.paramTransaksi?.transaksi_status,
        };

        return PenjualanAPI.addPenjualan({
          body,
        });
      } else {
        alert("Please Check Your Input Information");
      }
    },
    onSuccess: async (onSuccess) => {
      console.log({ onSuccess });
      if (onSuccess) {
        $("#ViewPenjualanModal").modal("show");
        const result = await PenjualanAPI.getDetailPenjualan(
          onSuccess?.data?.result?.uuid
        );
        console.log({ result });
        setValue("resultParam", {
          data: result?.listProduct,
          data_info: result?.data_info,
        });
        resetField("paramTransaksi", {
          total_transaksi: 0,
          payment_method1: "Cash",
          payment_method2: "Cash",
          transaksi_status: "Lunas",
          notes: "",
          uang_total: "",
          tunai1: 0,
          tunai2: 0,
        });
        resetField("data", []);
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
      }
    },
  });

  const btnDeleteProduct = useMutation({
    mutationFn: (uuid) => {
      setValue(
        "data",
        data.filter((filter) => filter.uuid !== uuid)
      );
    },
  });

  Loading(btnHandleSimpanTransaksi.isLoading);

  console.log({ data });

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="card-body">
            <FormSearchProduct register={register} />
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(btnTambah)}
            >
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
                qty: (
                  <input
                    onInput={(value) => Math.abs(value)}
                    className="form-control"
                    type="number"
                    min={1}
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
                    onClick={() => btnDeleteProduct.mutate(item.uuid)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>,
                ],
              }))}
              column={column}
              registerSearch={register}
              isPagination={false}
              isSearch={false}
            />
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body">
            <FormInfoPenjualan
              dataCustomer={dataCustomer}
              dataListFreeProduct={dataListFreeProduct?.result}
              onChangeHandleCheckBoxFreeItem={onChangeHandleCheckBoxFreeItem}
              paramTransaksi={paramTransaksi}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="card-footer justify-content-end align-items-end text-end">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(btnHandleSimpanTransaksi.mutate)}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <ViewPenjualanModal
        data={resultParam?.data}
        dataInfo={resultParam?.data_info}
      />
    </div>
  );
};

export default PenjualanPageDashboard;

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
