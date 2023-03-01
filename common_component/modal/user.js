import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { adminAPI } from "../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const ModalUser = ({ param }) => {
  const queryClient = useQueryClient();
  const { setValue, register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      name: "",
      password: "",
      role: "kasir",
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ username, name, password, role }) => {
      if (param?.uuid) {
        return adminAPI.updateAdmin({
          uuid: param?.uuid,
          body: {
            username,
            name,
            role,
          },
        });
      } else {
        return adminAPI.register({
          body: {
            username,
            name,
            password,
            role,
          },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getListAdmin2");
      $("#ModalUser").modal("hide");
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      Object.entries(param).forEach(([name, value]) => setValue(name, value));
    } else {
      reset();
    }
  }, [param?.uuid]);

  Loading(btnSimpan.isLoading);

  return (
    <Modal
      title={param?.uuid ? `update User ${param?.name}` : "Tambah User"}
      idModal="ModalUser"
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
        <div className="col-md-6 col-lg-6">
          <div>
            <label htmlFor="" className="form-label">
              username
            </label>
            <input
              type="text"
              placeholder="username"
              className="form-control"
              {...register("username")}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <label htmlFor="" className="form-label">
              nama
            </label>
            <input
              type="text"
              placeholder="nama"
              className="form-control"
              {...register("name")}
            />
          </div>
        </div>
        {!param?.uuid ? (
          <div className="col-md-6 col-lg-6">
            <div>
              <label htmlFor="" className="form-label">
                password
              </label>
              <input
                type="password"
                placeholder="nama"
                className="form-control"
                {...register("password")}
              />
            </div>
          </div>
        ) : null}
        <div className="col-md-6 col-lg-6">
          <div>
            <label htmlFor="" className="form-label">
              Akses
            </label>
            <select
              name=""
              id=""
              className="form-control"
              {...register("role")}
            >
              <option value="admin">Admin</option>
              <option value="kasir">kasir</option>
              <option value="penjualan">penjualan</option>
              <option value="pembelian">pembelian</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUser;
