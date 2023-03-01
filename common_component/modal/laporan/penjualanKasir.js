import Modal from "../../modals";
import { useForm, useWatch } from "react-hook-form";
import {
  SelectedNoHP,
  SelectedCategory,
  SelectedProduct,
  SelectCaraBayar,
  SelectCabang,
} from "../../select";

const ModalPenjualanKasir = () => {
  const { control, register } = useForm({
    defaultValues: {
      from_datetime: "",
      until_datetime: "",
      selected_radio: "customerId",
    },
  });
  const selected_radio = useWatch({
    name: "selected_radio",
    control,
  });

  const from_datetime = useWatch({
    control,
    name: "from_datetime",
  });
  const until_datetime = useWatch({
    control,
    name: "until_datetime",
  });

  const selected = useWatch({
    name: "selected",
  });
  const paramReport = useWatch({
    name: "paramReport",
  });

  const generatedId = () => {
    if (selected_radio === "customerId") {
      return `customerId=${selected?.noHp?.value}`;
    } else if (selected_radio === "categoryId") {
      return `categoryId=${selected?.category?.value}`;
    } else if (selected_radio === "productId") {
      return `productId=${selected?.product?.value}`;
    } else if (selected_radio === "payment_method1") {
      if (paramReport.penjualanDp == true || paramReport.penjualanCabang) {
        return;
      } else {
        return `paymentMethod=${selected?.cara_bayar?.value}`;
      }
    } else if (selected_radio === "cabangId") {
      return `cabangId=${selected?.cabang?.value}`;
    } else {
      return;
    }
  };

  return (
    <Modal
      title="Penjualan Kasir"
      idModal="ModalPenjualanKasir"
      size="md"
      childrenFooter={[
        <a
          target="__blank"
          className="btn btn-primary"
          href={`/view/penjualan-kasir?from_datetime=${from_datetime}&until_datetime=${until_datetime}&selected_radio=${selected_radio}&${generatedId()}&penjualanDp=${
            paramReport.penjualanDp
          }&penjualanCabang=${paramReport.penjualanCabang}`}
        >
          Submit
        </a>,
      ]}
    >
      <div className="mb-2">
        <label htmlFor="" className="form-label">
          Dari Tanggal
        </label>
        <input
          type="date"
          name=""
          id=""
          className="form-control"
          {...register("from_datetime")}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="" className="form-label">
          Sampai Tanggal
        </label>
        <input
          type="date"
          name=""
          id=""
          className="form-control"
          {...register("until_datetime")}
          min={from_datetime}
        />
      </div>
      <div className="mb-2">
        {selected_radio === "customerId" ? (
          <SelectedNoHP />
        ) : selected_radio === "categoryId" ? (
          <SelectedCategory />
        ) : selected_radio === "productId" ? (
          <SelectedProduct />
        ) : paramReport.penjualanDp ==
          true ? null : paramReport.penjualanCabang == true ? (
          <SelectCabang />
        ) : (
          <SelectCaraBayar />
        )}
      </div>
      <div>
        <label htmlFor="" className="form-label">
          tampilkan berdasarkan
        </label>
        {paramReport.penjualanCabang
          ? arrCabang.map((item, idx) => (
              <div class="form-check mt-1" key={idx}>
                <input
                  name="viewRadio"
                  class="form-check-input"
                  type="radio"
                  value={item.key}
                  id={item.title}
                  {...register("selected_radio")}
                  checked={item.key === selected_radio ? true : false}
                />
                <label class="form-check-label" for={item.title}>
                  {item.title}
                </label>
              </div>
            ))
          : arrRadio
              .filter((filter) =>
                paramReport.penjualanDp === true
                  ? filter.key !== "payment_method1"
                  : filter
              )
              .map((item, idx) => (
                <div class="form-check mt-1" key={idx}>
                  <input
                    name="viewRadio"
                    class="form-check-input"
                    type="radio"
                    value={item.key}
                    id={item.title}
                    {...register("selected_radio")}
                    checked={item.key === selected_radio ? true : false}
                  />
                  <label class="form-check-label" for={item.title}>
                    {item.title}
                  </label>
                </div>
              ))}
      </div>
    </Modal>
  );
};

export default ModalPenjualanKasir;

const arrCabang = [
  {
    title: "Cabang",
    key: "cabangId",
  },

  {
    title: "Category",
    key: "categoryId",
  },
  {
    title: "Barang",
    key: "productId",
  },
];
const arrRadio = [
  {
    title: "Customer",
    key: "customerId",
  },
  {
    title: "Category",
    key: "categoryId",
  },
  {
    title: "Barang",
    key: "productId",
  },
  {
    title: "Cara Bayar",
    key: "payment_method1",
  },
];
