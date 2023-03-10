import Modal from "../modals";
import { DateFormatMonthName, Loading, MoneyFormatZero } from "../../src/utils";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { caraBayarAPI, PenjualanAPI } from "../../API";

const TotalPenjualanModal = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getListResume"],
    queryFn: () => PenjualanAPI.resumePenjualanPerhari(),
  });
  const saldoKasir = useWatch({
    name: "saldo_kasir",
  });

  console.log({ data });
  const metodePembayaran1 = data?.metodePembayaran1;
  const sumTotalPenjualan = metodePembayaran1?.reduce(
    (prev, curr) => prev + parseInt(curr.total),
    0
  );
  const paymentCash = metodePembayaran1?.find((find) => (find.type == "cash"));

  Loading(isLoading);

  return (
    <Modal
      childrenFooter={[]}
      size="fullscreen"
      idModal="TotalPenjualanModal"
      title={`Tanggal : ${DateFormatMonthName(
        new Date()
      )} (Saldo Di Kasir : ${MoneyFormatZero(saldoKasir)})`}
    >
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Metode Pembayaran</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {metodePembayaran1?.map((item, idx) => (
            <tr>
              <td>{item?.type}</td>
              <td>Rp. {MoneyFormatZero(item?.total)}</td>
            </tr>
          ))}
          <tr className=" bg-danger text-white">
            <th className="text-white">Pengeluaran</th>
            <td>Rp. {MoneyFormatZero(data?.pengeluaran?.total)}</td>
          </tr>
          <tr className=" bg-info text-white">
            <th className="text-white">Total Uang DiKasir</th>
            <td>
              Rp.{" "}
              {MoneyFormatZero(
                parseInt(paymentCash?.total ??0) + parseInt(saldoKasir)
              )}
            </td>
          </tr>
          <tr className=" bg-success text-white">
            <th className="text-white">Total Keseluruhan Penjualan</th>
            <td>Rp. {MoneyFormatZero(sumTotalPenjualan)}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default TotalPenjualanModal;
