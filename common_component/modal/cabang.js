import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { cabangAPI } from "../../API";
import { Loading } from "@utils";
import $ from "jquery";
import { useEffect } from "react";

const ModalCabang = ({ param }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      nama_cabang: "",
      alamat: "",
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ alamat, nama_cabang }) =>
      cabangAPI.addCabang({
        body: {
          alamat,
          nama_cabang,
        },
      }),
    onSuccess: (onSuccess) => {
      // console.log({ onSuccess });
      $("#ModalCabang").modal("hide");
      queryClient.invalidateQueries("getListCabang");
      queryClient.invalidateQueries("getListCabangSelect");
    },
  });

  const btnUpdate = useMutation({
    mutationFn: ({ nama_cabang, alamat }) =>
      cabangAPI.updateCabang({
        uuid: param?.uuid,
        body: {
          alamat,
          nama_cabang,
        },
      }),
    onSuccess: (onSuccess) => {
      $("#ModalCabang").modal("hide");
      queryClient.invalidateQueries("getListCabang");
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      setValue("alamat", param?.alamat);
      setValue("nama_cabang", param?.nama_cabang);
    } else {
      setValue("alamat", "");
      setValue("nama_cabang", "");
    }
  }, [param?.uuid]);

  Loading(btnSimpan.isLoading || btnUpdate.isLoading);

  return (
    <Modal
      title={
        param?.uuid ? `Edit Cabang ${param?.nama_cabang}` : "Tambah Cabang"
      }
      idModal="ModalCabang"
      size="sm"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={handleSubmit(
            param?.uuid ? btnUpdate.mutate : btnSimpan.mutate
          )}
        >
          Simpan
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Cabang" className="form-label">
              Nama Cabang
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama Cabang"
              placeholder="Nama Cabang"
              {...register("nama_cabang")}
            />
          </div>
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 p-1">
          <div>
            <label htmlFor="Alamat" className="form-label">
              Alamat
            </label>
            <textarea
              rows={10}
              type="text"
              className="form-control"
              id="Alamat"
              placeholder="Alamat"
              {...register("alamat")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCabang;
