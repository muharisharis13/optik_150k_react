import Modal from "../../modals";
import { useForm, useWatch } from "react-hook-form";

const ModalKwitansi = () => {
  const { register, control } = useForm({
    defaultValues: {
      from_datetime: "",
      until_datetime: "",
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
  const boolPengeluaran = useWatch({
    name: "modals.pengeluaran",
  });

  const genereateLink = () => {
    if (boolPengeluaran) {
      return `/view/pengeluaran?from_datetime=${from_datetime}&until_datetime=${until_datetime}`;
    } else {
      return `/view/kwitansi_report?from_datetime=${from_datetime}&until_datetime=${until_datetime}`;
    }
  };

  return (
    <Modal
      title={`Pengeluaran ${boolPengeluaran ? "Pengeluaran" : "Kwitansi"}`}
      idModal="ModalKwitansi"
      size="md"
      childrenFooter={[
        <a className="btn btn-primary" target="__blank" href={genereateLink()}>
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
          required
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
    </Modal>
  );
};

export default ModalKwitansi;
