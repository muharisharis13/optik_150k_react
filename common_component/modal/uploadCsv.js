import Modal from "../modals";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { productAPI } from "../../API";
import { Loading } from "@utils";

const ModalUploadCsv = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      csv_file: "",
    },
  });

  const btnUpload = useMutation({
    mutationFn: ({ csv_file }) => {
      const formData = new FormData();

      console.log({ csv_file: csv_file[0] });
      formData.append("csv_file", csv_file[0]);

      return productAPI.uploadProductList(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getListProdcut");
      $("#ModalUploadCsv").modal("hide");
      resetField("csv_file", "");
    },
  });

  Loading(btnUpload.isLoading);
  return (
    <Modal
      title={"Upload Product CSV"}
      idModal="ModalUploadCsv"
      size="sm"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={handleSubmit(btnUpload.mutate)}
        >
          Submit
        </button>,
      ]}
    >
      <div>
        <label htmlFor="" className="form-label">
          Upload File
        </label>
        <input
          type="file"
          name=""
          accept=".csv"
          id=""
          className="form-control"
          {...register("csv_file")}
        />
      </div>
    </Modal>
  );
};

export default ModalUploadCsv;
