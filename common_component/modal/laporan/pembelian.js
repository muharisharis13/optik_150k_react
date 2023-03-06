import Modal from "../../modals";
import { useForm, useWatch } from "react-hook-form";
import { SelectedProduct, SelectSupplier } from "../../select";

const ModalPembelian = () => {
  const { register, setValue, control } = useForm({
    defaultValues: {
      from_datetime: "",
      until_datetime: "",
      selected_radio: "supplierId",
    },
  });

  const until_datetime = useWatch({
    name: "until_datetime",
    control,
  });

  const from_datetime = useWatch({
    name: "from_datetime",
    control,
  });

  const selected_radio = useWatch({
    name: "selected_radio",
    control,
  });
  const selected = useWatch({
    name: "selected",
  });

  const generateId = () => {
    if (selected_radio === "supplierId") {
      return `supplierId=${selected?.supplier?.value}`;
    } else {
      return `productId=${selected?.product?.value}`;
    }
  };
  return (
    <Modal
      title="Laporan Pembelian"
      idModal="ModalPembelian"
      size="md"
      childrenFooter={[
        <a
          className="btn btn-primary"
          target="__blank"
          href={`/view/pembelian?from_datetime=${from_datetime}&until_datetime=${until_datetime}&selected_radio=${selected_radio}&${generateId()}`}
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
      {selected_radio === "barangId" ? (
        <div>
          <label htmlFor="" className="form-label">
            Barang
          </label>
          <SelectedProduct />
        </div>
      ) : (
        <div>
          <label htmlFor="" className="form-label">
            Supplier
          </label>
          <SelectSupplier />
        </div>
      )}
      <div>
        <label htmlFor="" className="form-label">
          Tampilkan Berdasarkan
        </label>
        <div class="form-check mt-1">
          <div className="mt-1">
            <input
              name="viewRadio"
              class="form-check-input"
              type="radio"
              value="supplierId"
              id="supplier"
              {...register("selected_radio")}
              checked={"supplierId" === selected_radio ? true : false}
            />
            <label class="form-check-label" htmlFor="supplier">
              supplier
            </label>
          </div>
          <div class=" mt-1">
            <input
              name="viewRadio"
              class="form-check-input"
              type="radio"
              value="barangId"
              id="barang"
              {...register("selected_radio")}
              checked={"barangId" === selected_radio ? true : false}
            />
            <label class="form-check-label" htmlFor="barang">
              Barang
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPembelian;
