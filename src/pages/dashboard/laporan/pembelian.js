const { Tables } = require("../../../../common_component");

import { reportAPI } from "../../../../API";
import queryString from "query-string";
import { useQuery } from "react-query";
import { MoneyFormatZero } from "@utils";

const PembelianLaporanPage = () => {
  const parameter = queryString.parse(location.search);

  const { data } = useQuery({
    queryKey: ["pembelian-report"],
    queryFn: () => reportAPI.getTransaksiPembelian(parameter),
  });

  return (
    <div className="container align-items-center justify-content-center">
      <h4 className="text-center text-uppercase">Pembelian Report</h4>
      {data?.map((item, idx) => (
        <div key={idx}>
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
            data={item?.listBeli?.map((item) => ({
              ...item,
              price: MoneyFormatZero(item?.price),
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default PembelianLaporanPage;

const column = [
  {
    title: "Nama Barang",
    key: "product.product_name",
  },
  {
    title: "Satuan",
    key: "product.uom",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "QTY",
    key: "qty",
  },
];
