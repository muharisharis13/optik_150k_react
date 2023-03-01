import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { caraBayarAPI } from "../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const ModalCaraBayar = ({ param }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      cara_bayar_name: "",
    },
  });

  const btnSimpan = useMutation({
    mutationFn: (paramProp) => {
      if (param?.uuid) {
        return caraBayarAPI.updateCaraBayar({
          body: paramProp,
          uuid: param?.uuid,
        });
      } else {
        return caraBayarAPI.addCaraBayar({
          body: paramProp,
        });
      }
    },
    onSuccess: () => {
      $("#ModalCaraBayar").modal("hide");
      queryClient.invalidateQueries("getListCaraBayar");
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      setValue("cara_bayar_name", param?.cara_bayar_name);
    }
  }, [param?.uuid]);

  Loading(btnSimpan.isLoading);
  return (
    <Modal
      title="Tambah Cara Bayar"
      idModal="ModalCaraBayar"
      size="sm"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={handleSubmit(btnSimpan.mutate)}
        >
          Simpan
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Cara Bayar" className="form-label">
              Nama Cara Bayar
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama Cara Bayar"
              placeholder="Nama Cara Bayar"
              {...register("cara_bayar_name")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCaraBayar;
