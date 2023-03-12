import Modal from "../../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { pengeluaranAPI } from "../../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const EditPengeluaranModal = ({ param }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, resetField, setValue } = useForm({
    defaultValues: {
      param: {
        jenis_pengeluaran: "",
        amount: "",
        keterangan: "",
        employee: "",
      },
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ param }) => {
      if (param.uuid) {
        return pengeluaranAPI.updatePengeluaran({
          uuid: param.uuid,
          body: param,
        });
      } else {
        return pengeluaranAPI.addPengeluaran({
          body: param,
        });
      }
    },
    onSuccess: (onSuccess) => {
      if (onSuccess) {
        queryClient.invalidateQueries("getListPengeluaran");
        $("#EditPengeluaranModal").modal("hide");
      }
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      Object.entries(param).map(([name, value]) =>
        setValue(`param.${name}`, value)
      );
    } else {
      resetField("param", {
        jenis_pengeluaran: "",
        amount: "",
        keterangan: "",
        employee: "",
      });
    }
  }, [param?.uuid]);

  Loading(btnSimpan.isLoading);
  return (
    <Modal
      title="Detail Pengeluaran"
      idModal="EditPengeluaranModal"
      size="md"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={handleSubmit(btnSimpan.mutate)}
        >
          Simpan
        </button>,
      ]}
    >
      <div>
        <label htmlFor="Jenis Pengeluaran" className="form-label">
          Jenis Pengeluaran
        </label>
        <input
          type="text"
          className="form-control"
          id="Jenis Pengeluaran"
          placeholder="Jenis Pengeluaran"
          aria-describedby="defaultFormControlHelp"
          {...register("param.jenis_pengeluaran")}
        />
      </div>
      <div>
        <label htmlFor="Nominal" className="form-label">
          Nominal
        </label>
        <input
          type="number"
          className="form-control"
          id="Nominal"
          placeholder="Nominal"
          aria-describedby="defaultFormControlHelp"
          {...register("param.amount")}
        />
      </div>
      <div>
        <label htmlFor="Karyawan" className="form-label">
          Karyawan
        </label>
        <input
          type="text"
          className="form-control"
          id="Karyawan"
          placeholder="Karyawan"
          aria-describedby="defaultFormControlHelp"
          {...register("param.employee")}
        />
      </div>
      <div>
        <label htmlFor="Keterangan" className="form-label">
          Keterangan
        </label>
        <input
          type="text"
          className="form-control"
          id="Keterangan"
          placeholder="Keterangan"
          aria-describedby="defaultFormControlHelp"
          {...register("param.keterangan")}
        />
      </div>
    </Modal>
  );
};

export default EditPengeluaranModal;
