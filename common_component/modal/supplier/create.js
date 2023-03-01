import Modals from "../../modals";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { supplierAPI } from "../../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const CreateSupplierModal = ({ param }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      param: {
        supplier_name: "",
        supplier_address: "",
        supplier_phone: "",
      },
    },
  });

  const btnSubmit = useMutation({
    mutationFn: ({ param }) => {
      if (param?.uuid) {
        supplierAPI.updateSupplier({
          uuid: param?.uuid,
          body: {
            supplier_name: param?.supplier_name,
            supplier_address: param?.supplier_address,
            supplier_phone: param?.supplier_phone,
          },
        });
      } else {
        supplierAPI.addSupplier({
          body: {
            supplier_name: param?.supplier_name,
            supplier_address: param?.supplier_address,
            supplier_phone: param?.supplier_phone,
          },
        });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getListSupplier");
      await queryClient.invalidateQueries("getListSupplierSelect");
      $("#CreateSupplierModal").modal("hide");
      // window.location.reload();
    },
  });

  useEffect(() => {
    if (param?.uuid) {
      Object.entries(param).map(([name, value]) =>
        setValue(`param.${name}`, value)
      );
    } else {
    }
  }, [param?.uuid]);

  Loading(btnSubmit.isLoading);

  return (
    <Modals
      title="Create Kwitansi"
      idModal="CreateSupplierModal"
      size="md"
      childrenFooter={[
        <button
          className=" btn btn-primary"
          onClick={handleSubmit(btnSubmit.mutate)}
        >
          Submit
        </button>,
      ]}
    >
      <div>
        <label htmlFor="" className="form-label">
          Nama Supplier
        </label>
        <input
          type="text"
          placeholder="Nama Supplier"
          className="form-control"
          {...register("param.supplier_name", { required: true })}
        />
        {errors.param?.supplier_name && (
          <small className=" text-danger">
            <i>*Please complete this form</i>
          </small>
        )}
      </div>
      <div>
        <label htmlFor="" className="form-label">
          Alamat Supplier
        </label>
        <textarea
          rows={10}
          type="text"
          placeholder="Alamat"
          className="form-control"
          {...register("param.supplier_address", { required: true })}
        />
        {errors.param?.supplier_address && (
          <small className=" text-danger">
            <i>*Please complete this form</i>
          </small>
        )}
      </div>
      <div>
        <label htmlFor="" className="form-label">
          No. HP
        </label>
        <input
          type="text"
          placeholder="No. HP"
          className="form-control"
          {...register("param.supplier_phone", { required: true })}
        />
        {errors.param?.supplier_phone && (
          <small className=" text-danger">
            <i>*Please complete this form</i>
          </small>
        )}
      </div>
    </Modals>
  );
};

export default CreateSupplierModal;
