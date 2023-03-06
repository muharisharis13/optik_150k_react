import Modal from "../../modals";
import { useForm, useWatch } from "react-hook-form";
import { inputMoney } from "@utils";

const ModalResumeKeuangan = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from_datetime: "",
      until_datetime: "",
      amount: 0,
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

  const amount = useWatch({
    name: "amount",
    control,
  });

  const genereateLink = () => {
    return `/view/resume-keuangan?from_datetime=${from_datetime}&until_datetime=${until_datetime}&amount=${amount}`;
  };

  return (
    <Modal
      title={`Resume Keuangan`}
      idModal="ModalResumeKeuangan"
      size="md"
      childrenFooter={[
        <a className="btn btn-primary" target="__blank" href={genereateLink()}>
          Submit
        </a>,
      ]}
    >
      <div className="mb-2">
        <label htmlFor="" className="form-label">
          Saldo
        </label>
        <input
          type="number"
          name=""
          id=""
          className="form-control"
          required
          {...register("amount", {
            required: true,
          })}
        />
        {errors.amount && (
          <small className="text-danger">
            <i>*Amount Not Zero</i>
          </small>
        )}
      </div>
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

export default ModalResumeKeuangan;
