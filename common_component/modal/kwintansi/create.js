import Modals from "../../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { kwitansiAPI } from "../../../API";
import { Loading } from "@utils";

const CreateKwintansiModal = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      param: {
        amount: "",
        price: "",
        employee: "",
      },
    },
  });

  const btnSimpan = useMutation({
    mutationFn: ({ param }) =>
      kwitansiAPI.addKwitansi({
        body: param,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("getListKwitansi");
      $("#CreateKwintansiModal").modal("hide");
    },
  });
  Loading(btnSimpan.isLoading);
  return (
    <Modals
      title="Create Kwitansi"
      idModal="CreateKwintansiModal"
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
        <label htmlFor="" className="form-label">
          Nominal
        </label>
        <input
          type="text"
          placeholder="Nominal"
          className="form-control"
          {...register("param.amount")}
        />
        <small className="text-danger">
          <i>Nominal Yang akan ditulis</i>
        </small>
      </div>
      <div>
        <label htmlFor="" className="form-label">
          Harga jual kwitansi
        </label>
        <input
          type="text"
          placeholder="Harga"
          className="form-control"
          {...register("param.price")}
        />
      </div>
      <div>
        <label htmlFor="" className="form-label">
          Karyawan
        </label>
        <input
          type="text"
          placeholder="Karyawan"
          className="form-control"
          {...register("param.employee")}
        />
      </div>
    </Modals>
  );
};

export default CreateKwintansiModal;
