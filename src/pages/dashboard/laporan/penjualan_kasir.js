import { Tables } from "../../../../common_component";
import { useQuery } from "react-query";
import { Loading, MoneyFormatZero } from "@utils";
import { reportAPI } from "../../../../API";
import queryString from "query-string";

const PenjualanKasirPage = () => {
  const param = queryString.parse(location.search);

  const { data, isLoading } = useQuery({
    queryKey: ["PenjualanKasirPage"],
    queryFn: () => {
      if (param.penjualanDp == "true") {
        return reportAPI.getTransaksiKasirDp(param);
      } else if (param.penjualanCabang == "true") {
        return reportAPI.getTransaksiKasirCabang(param);
      } else {
        return reportAPI.getTransaksiKasir(param);
      }
    },
  });

  Loading(isLoading);

  console.log(param);

  return (
    <div className=" container-fluid">
      <h3 className="text-center mt-5">
        {param?.selected_radio === "customerId"
          ? "Customer"
          : param?.selected_radio === "categoryId"
          ? "Category"
          : param?.selected_radio === "productId"
          ? "Product"
          : param?.selected_radio === "payment_method1"
          ? "Cara Bayar"
          : param?.selected_radio === "cabangId"
          ? "Cabang"
          : null}
      </h3>
      {data?.map((item, idx) => (
        <div key={idx}>
          <div className="form-group mb-2 mt-2">
            <div>
              <label className="form-label" htmlFor="">
                Dari Tanggal
              </label>{" "}
              : {param?.from_datetime}
            </div>
            <div>
              <label className="form-label" htmlFor="">
                Sampai Tanggal
              </label>{" "}
              : {param?.until_datetime}
            </div>
          </div>
          <Tables
            column={column}
            isPagination={false}
            isSearch={false}
            data={item?.listTransaksi?.map((itemTrans) => ({
              ...itemTrans,
              name:
                item.customer_name ||
                item.category_name ||
                item.productCode ||
                item.cara_bayar_name ||
                item.nama_cabang,
              price: MoneyFormatZero(itemTrans.price),
              subtotal: MoneyFormatZero(itemTrans.subtotal),
            }))}
            tfoot={
              <tfoot>
                <tr>
                  <th colSpan={column.length - 1} className="text-center">
                    Total
                  </th>
                  <th>
                    Rp.{" "}
                    {MoneyFormatZero(
                      item.listTransaksi?.reduce(
                        (prev, curr) => prev + parseInt(curr?.subtotal),
                        0
                      )
                    )}
                  </th>
                </tr>
              </tfoot>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default PenjualanKasirPage;

const param = queryString.parse(location.search);

const column = [
  {
    title: "No Faktur",
    key: "transaksi_info.no_faktur",
  },
  {
    title:
      param?.selected_radio == "customerId"
        ? "Nama Customer"
        : param?.selected_radio == "categoryId"
        ? "Category"
        : param?.selected_radio == "productId"
        ? "Product Code"
        : param?.selected_radio == "payment_method1"
        ? "Cara Bayar"
        : param?.selected_radio == "cabangId"
        ? "Cabang"
        : null,
    key: "name",
  },
  {
    title: "Tanggal",
    key: "createdAt",
  },
  {
    title: "Nama Produk",
    key: "product.product_name",
  },
  {
    title: "Satuan Produk",
    key: "product.uom",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Keterangan",
    key: "notes",
  },
  {
    title: "Subtotal",
    key: "subtotal",
  },
];
