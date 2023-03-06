import { Tables } from "../../../../common_component";
import { reportAPI } from "../../../../API";
import queryString from "query-string";
import { useQuery } from "react-query";
import { MoneyFormatZero } from "@utils";

const PengeluaranReport = () => {
  const parameter = queryString.parse(location.search);

  const { data } = useQuery({
    queryKey: ["pengeluaran-report"],
    queryFn: () => reportAPI.getPengeluaran(parameter),
  });

  console.log({ data });
  return (
    <div className="container align-items-center justify-content-center">
      <h4 className="text-center text-uppercase">Pengeluaran Report</h4>
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
        </div>
        <Tables
          column={column}
          isPagination={false}
          isSearch={false}
          data={data?.map((item) => ({
            ...item,
            amount: MoneyFormatZero(item?.amount),
          }))}
        />
      </div>
    </div>
  );
};
export default PengeluaranReport;

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
