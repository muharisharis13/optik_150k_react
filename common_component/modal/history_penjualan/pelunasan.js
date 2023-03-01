import Modal from "../../modals";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { PenjualanAPI } from "../../../API";
import { Loading } from "@utils";
import { MoneyFormatZero } from "@utils";
import { useNavigate } from "react-router-dom";
import { SelectCaraBayar } from "../../select";

const ModalPelunasan = ({ dataInfo }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      payment_method2: "Cash",
      uang2: "",
    },
  });
  let result =
    parseInt(dataInfo?.total_transaksi) - parseInt(dataInfo?.total_uang);

  const uang2 = useWatch({
    control,
    name: "uang2",
  });

  const selectedCaraBayar = useWatch({
    name: "selected.cara_bayar",
  });

  const btnSimpan = useMutation({
    mutationFn: ({ payment_method2, uang2 }) =>
      PenjualanAPI.pelunasanPenjualan({
        uuid: dataInfo?.uuid,
        body: {
          payment_method2: selectedCaraBayar?.label,
          uang2,
        },
      }),
    onSuccess: () => {
      $("#ModalPelunasan").modal("hide");
      $("#ViewPenjualanModal").modal("hide");
      queryClient.invalidateQueries("btnModalDetailHistoryPenjualan");
      queryClient.invalidateQueries("getListPenjualan");

      window.location.reload();
    },
  });

  Loading(btnSimpan.isLoading);
  return (
    <Modal
      title={
        "Selesaikan Pembayaran Anda Sebesar Rp. " + MoneyFormatZero(result)
      }
      idModal="ModalPelunasan"
      size="md"
      childrenFooter={[
        <button
          className="btn btn-primary"
          onClick={handleSubmit(btnSimpan.mutate)}
          disabled={parseInt(uang2) < parseInt(result) ? true : false}
        >
          {parseInt(uang2) < parseInt(result) ? "Masih Kurang" : "Simpan"}
        </button>,
      ]}
    >
      <div className="row">
        <div className="col-md-12 col-lg-12 p-1">
          <label htmlFor="">Select Method</label>
          <SelectCaraBayar />
        </div>
        <div className="col-md-12 col-lg-12 p-1">
          <label htmlFor="">Masukkan Nominal</label>
          <input
            type="number"
            name=""
            placeholder="Nominal"
            id=""
            className="form-control"
            {...register("uang2", { required: true })}
          />
          {errors.uang2 && (
            <small className="text-danger">
              <i>Harap Masukkan Nominal</i>
            </small>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalPelunasan;
