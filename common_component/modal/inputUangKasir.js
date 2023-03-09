import Modal from "../modals";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "react-query";

const InputUangKasirModal = () => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const btnSubmit = (e) => {
    $("#TotalPenjualanModal").modal("show");
    $("#InputUangKasirModal").modal("hide");
    queryClient.invalidateQueries("getListResume");
  };
  return (
    <Modal
      size="sm"
      idModal="InputUangKasirModal"
      title="Upps !! Anda Belum Mengisi Saldo, Mohon Isi Saldo Terlebih Dahulu"
      childrenFooter={[
        <button className="btn btn-primary" onClick={handleSubmit(btnSubmit)}>
          Submit
        </button>,
      ]}
    >
      <div>
        <label htmlFor="" className="form-label">
          Saldo
        </label>
        <input
          type="number"
          placeholder="Saldo"
          className="form-control"
          {...register("saldo_kasir", { required: true })}
        />
        <small className=" text-danger">
          <i>{errors?.saldo_kasir && "Harap Input Saldo Kasir"}</i>
        </small>
      </div>
    </Modal>
  );
};

export default InputUangKasirModal;
