import Modal from "../../modals";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  SelectedNoHP,
  SelectedCategory,
  SelectedProduct,
  SelectCaraBayar,
  SelectCabang,
} from "../../select";

const ModalPenjualanKasir = () => {
  const { control, register, setValue } = useForm({
    defaultValues: {
      from_datetime: "",
      until_datetime: "",
      selected_radio: "all",
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
  const showOf = useWatch({
    name: "showOf",
  });

  const generatedId = () => {
    if (selected_radio === "customerId") {
      return `customerId=${selected?.noHp?.value ?? ""}`;
    } else if (selected_radio === "categoryId") {
      return `categoryId=${selected?.category?.value ?? ""}`;
    } else if (selected_radio === "productId") {
      return `productId=${selected?.product?.value ?? ""}`;
    } else if (selected_radio === "payment_method1") {
      return `paymentMethod=${selected?.cara_bayar?.value ?? ""}`;
    } else if (selected_radio === "cabangId") {
      return `cabangId=${selected?.cabang?.value ?? ""}`;
    } else {
      return "";
    }
  };

  const validateFilter = () => {
    if (showOf === "DP") {
      return arrDP.map((item, idx) => (
        <div class="form-check mt-3" key={idx}>
          <input
            name="filter-radio"
            class="form-check-input"
            type="radio"
            value={item.key}
            id={item.key}
            onChange={(e) => setValue("selected_radio", e.target.value)}
            // {...register("selected_radio")}
            checked={item.key === selected_radio ? true : false}
          />
          <label class="form-check-label" for={item.key}>
            {" "}
            {item.title}{" "}
          </label>
        </div>
      ));
    } else {
      return showOf === "cabang"
        ? arrCabang.map((item, idx) => (
            <div class="form-check mt-3" key={idx}>
              <input
                name="filter-radio"
                class="form-check-input"
                type="radio"
                value={item.key}
                id={item.key}
                onChange={(e) => setValue("selected_radio", e.target.value)}
                checked={item.key === selected_radio ? true : false}
              />
              <label class="form-check-label" for={item.key}>
                {" "}
                {item.title}{" "}
              </label>
            </div>
          ))
        : arrRadio.map((item, idx) => (
            <div class="form-check mt-3" key={idx}>
              <input
                name="filter-radio"
                class="form-check-input"
                type="radio"
                value={item.key}
                id={item.key}
                onChange={(e) => setValue("selected_radio", e.target.value)}
                // {...register("selected_radio")}
                checked={item.key === selected_radio ? true : false}
              />
              <label class="form-check-label" for={item.key}>
                {" "}
                {item.title}{" "}
              </label>
            </div>
          ));
    }
  };

  useEffect(() => {
    if (showOf === "DP") {
      setValue("selected_radio", "customerId");
    } else {
      setValue("selected_radio", "all");
    }
  }, [showOf]);

  return (
    <Modal
      title={"Penjualan Kasir " + showOf}
      idModal="ModalPenjualanKasir"
      size="md"
      childrenFooter={[
        <a
          target="__blank"
          className="btn btn-primary"
          href={`/view/penjualan-kasir?from_datetime=${from_datetime}&until_datetime=${until_datetime}&selected_radio=${selected_radio}&${generatedId()}${
            showOf == "DP"
              ? "&view=DP"
              : showOf == "cabang"
              ? "&view=cabang"
              : ""
          }`}
          disabled={true}
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
        ) : selected_radio === "payment_method1" ? (
          <SelectCaraBayar />
        ) : selected_radio === "cabangId" ? (
          <SelectCabang />
        ) : null}
      </div>
      <div>
        <label htmlFor="" className="form-label">
          tampilkan berdasarkan
        </label>
        {validateFilter()}
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
  {
    title: "Semua",
    key: "all",
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
  {
    title: "Semua",
    key: "all",
  },
];

const arrDP = [
  {
    title: "Customer",
    key: "customerId",
  },
];
