import { Tables } from "../../../../common_component";
import { reportAPI } from "../../../../API";
import queryString from "query-string";
import { useQuery } from "react-query";
import { MoneyFormatZero } from "@utils";

const ResumeKeuangan = () => {
  const parameter = queryString.parse(location.search);

  const { data } = useQuery({
    queryKey: ["resumeKeuangan-report"],
    queryFn: () => reportAPI.getResumeKeuangan(parameter),
  });

  const sumTransaksi = data?.transaksi
    ?.filter((filter) => filter.cara_bayar_name.toLowerCase().includes("cash"))
    ?.map((item) => parseInt(item?.totalTransaksi))
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="container align-items-center justify-content-center">
      <h4 className="text-center text-uppercase">Resume Keuangan Report</h4>
      <div>
        <div className="form-group mb-2 mt-2">
          <div>
            <label className="form-label" htmlFor="">
              Dari Tanggal
            </label>{" "}
            : {parameter?.from_datetime}
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Sampai Tanggal
            </label>{" "}
            : {parameter?.until_datetime}
          </div>
          <div>
            <label className="form-label" htmlFor="">
              Saldo
            </label>{" "}
            : {MoneyFormatZero(parameter?.amount)}
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Metode Penjualan</th>
                <th className="text-end" style={{ textAlign: "end" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.transaksi?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.cara_bayar_name}</td>
                  <td style={{ textAlign: "end" }}>
                    {MoneyFormatZero(parseInt(item.totalTransaksi))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* <tr>
                <th>Total Transaksi Semua Metode</th>
                <td style={{ textAlign: "end" }}>
                  {MoneyFormatZero(
                    data?.transaksi
                      ?.map((item) => parseInt(item?.totalTransaksi))
                      .reduce((prev, curr) => prev + curr, 0)
                  )}
                </td>
              </tr> */}
              <tr>
                <th>Pengeluaran</th>
                <td style={{ textAlign: "end" }}>
                  {MoneyFormatZero(data?.pengeluaran)}
                </td>
              </tr>
              <tr>
                <th>Total Di Kasir</th>
                <td style={{ textAlign: "end" }}>
                  {MoneyFormatZero(
                    parseInt(parameter?.amount) +
                      sumTransaksi -
                      parseInt(data?.pengeluaran)
                  )}
                </td>
              </tr>
              <tr>
                <th>Total Keseluruhan Penjualan</th>
                <td style={{ textAlign: "end" }}>
                  {MoneyFormatZero(
                    data?.transaksi
                      ?.map((item) => parseInt(item?.totalTransaksi))
                      .reduce((prev, curr) => prev + curr, 0)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ResumeKeuangan;

const column = [
  {
    title: "Jenis Pengeluaran",
    key: "jenis_pengeluaran",
  },
  {
    title: "Penerima",
    key: "employee",
  },
  {
    title: "Keterangan",
    key: "keterangan",
  },
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "Nominal",
    key: "amount",
  },
];
