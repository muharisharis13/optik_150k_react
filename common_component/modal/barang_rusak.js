import Modal from "../modals";
import SelectProduct from "../select/product";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { barangRusakAPI } from "../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const ModalBarangRusak = ({ param }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      qty: "",
      notes: "",
    },
  });
  const { setValue: setValueContext } = useFormContext();
  const selectedProduct = useWatch({
    name: "selected.product",
  });

  const btnSimpan = useMutation({
    mutationFn: ({ qty, notes }) => {
      if (param?.uuid) {
        return barangRusakAPI.updateBarangRusak({
          uuid: param?.uuid,
          body: {
            qty,
            notes,
            productId: selectedProduct?.value,
          },
        });
      } else {
        return barangRusakAPI.addBarangRusak({
          body: {
            qty,
            notes,
            productId: selectedProduct?.value,
          },
        });
      }
    },
    onSuccess: () => {
      reset();
      $("#ModalBarangRusak").modal("hide");
      queryClient.invalidateQueries("getListBarangRusak");
      setValueContext("selected.product", "");
    },
  });

  Loading(btnSimpan.isLoading);

  useEffect(() => {
    if (param?.uuid) {
      Object.entries(param)?.forEach(([name, value]) => setValue(name, value));
    }
    setValueContext("selected.product", {
      value: param?.product?.id,
      label: param?.product?.product_name,
    });
  }, [param?.uuid]);
  return (
    <Modal
      title="Tambah Barang Rusak"
      idModal="ModalBarangRusak"
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
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Nama Cabang" className="form-label">
              Nama Barang
            </label>
            <SelectProduct />
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 p-1">
          <div>
            <label htmlFor="Qty" className="form-label">
              Qty
            </label>
            <input
              rows={10}
              type="text"
              className="form-control"
              id="Qty"
              placeholder="Qty"
              {...register("qty")}
            />
          </div>
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 p-1">
          <div>
            <label htmlFor="Keterangan" className="form-label">
              Keterangan
            </label>
            <textarea
              rows={10}
              type="text"
              className="form-control"
              id="Keterangan"
              placeholder="Keterangan"
              {...register("notes")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBarangRusak;
