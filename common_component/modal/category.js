import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { categoryAPI } from "../../API";
import $ from "jquery";
import { useEffect } from "react";
import { Loading } from "@utils";

const ModalCategory = ({ param }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      category_name: "",
    },
  });

  const btnSimpan = useMutation({
    mutationFn: (param) =>
      categoryAPI.addCategory({
        body: {
          category_name: param.category_name,
        },
      }),
    onSuccess: (onSuccess) => {
      if (onSuccess.code === 200) {
        queryClient.invalidateQueries("getListCategorySelect");
        queryClient.invalidateQueries("getListCategory");
        $("#ModalCategory").modal("hide");
      }
    },
  });

  const btnUpdateCategory = useMutation({
    mutationFn: ({ category_name }) =>
      categoryAPI.updateCategory({
        uuid: param?.uuid,
        body: {
          category_name: category_name,
        },
      }),
    onSuccess: (onSuccess) => {
      $("#ModalCategory").modal("hide");
      queryClient.invalidateQueries("getListCategory");
    },
  });

  useEffect(() => {
    if (param?.uuid) setValue("category_name", param?.category_name);
  }, [param?.uuid]);

  Loading(btnUpdateCategory.isLoading);

  return (
    <Modal
      title="Tambah Category"
      idModal="ModalCategory"
      size="sm"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={
            param?.uuid
              ? handleSubmit(btnUpdateCategory.mutate)
              : handleSubmit(btnSimpan.mutateAsync)
          }
        >
          Simpan
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Category" className="form-label">
              Nama Category
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama Category"
              placeholder="Nama Category"
              {...register("category_name")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCategory;
