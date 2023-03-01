import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Loading } from "@utils";
import { customerAPI } from "../../API";
import { useEffect } from "react";

const ModalCustomer = ({ param }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      customer_name: "",
      no_hp: "",
      alamat: "",
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ customer_name, no_hp, alamat }) =>
      customerAPI.addCustomer({
        body: {
          customer_name,
          no_hp,
          alamat,
        },
      }),
    onSuccess: (onSuccess) => {
      queryClient.invalidateQueries("getListCustomer");
      queryClient.invalidateQueries("getListNoHpSelect");
      $("#ModalCustomer").modal("hide");
      reset();
    },
  });

  const btnUpdate = useMutation({
    mutationFn: (param) =>
      customerAPI.updateCustomer({
        uuid: param?.uuid,
        body: param,
      }),
    onSuccess: (onSuccess) => {
      queryClient.invalidateQueries("getListCustomer");
      $("#ModalCustomer").modal("hide");
      reset();
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      Object.entries(param).forEach(([name, value]) => setValue(name, value));
    } else {
      reset();
    }
  }, [param?.uuid]);

  Loading(btnSimpan.isLoading || btnUpdate.isLoading);

  return (
    <Modal
      title="Tambah Customer"
      idModal="ModalCustomer"
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
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Customer" className="form-label">
              Nama Customer
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama Customer"
              placeholder="Nama Customer"
              {...register("customer_name")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="No Telp" className="form-label">
              No Telp
            </label>
            <input
              type="text"
              className="form-control"
              id="No Telp"
              placeholder="No Telp"
              {...register("no_hp")}
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

export default ModalCustomer;
