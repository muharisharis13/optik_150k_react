import { Tables } from "../../../../common_component";
import { useQuery } from "react-query";
import { Loading, MoneyFormatZero } from "@utils";
import { reportAPI } from "../../../../API";
import queryString from "query-string";
import { isNumeric } from "jquery";

const PenjualanKasirPage = () => {
  const param = queryString.parse(location.search);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["PenjualanKasirPage"],
    queryFn: () => {
      if (param.view === "DP") {
        return reportAPI.getTransaksiKasirDp(param);
      } else if (param.view === "cabang") {
        return reportAPI.getTransaksiKasirCabang(param);
      } else {
        return reportAPI.getTransaksiKasir(param);
      }
    },
  });

  Loading(isLoading);

  const getObjKey = Object.keys(data ?? {});

  const validateElseTable = (itemObj) => {
    if (data[itemObj].listTransaksi?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateIfTable = (item) => {
    if (item?.listTransaksi?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log({ getObjKey });

  return (
    <div className=" container-fluid">
      {getObjKey
        .filter((filter) => {
          if (param.view === "cabang") {
            return filter !== "caraBayar";
          } else {
            return filter;
          }
        })
        .filter((filter) => {
          if (
            (!param.customerId && param.selected_radio === "customerId") ||
            (!param.cabangId && param.selected_radio === "cabangId")
          ) {
            return filter === "customer";
          } else if (
            !param.categoryId &&
            param.selected_radio === "categoryId"
          ) {
            return filter === "categoryProduct";
          } else if (!param.productId && param.selected_radio === "productId") {
            return filter === "product";
          } else if (
            !param.paymentMethod &&
            param.selected_radio === "payment_method1"
          ) {
            return filter === "caraBayar";
          } else {
            return filter;
          }
        })
        .map((itemObj) => (
          <div>
            <h3 className="text-center mt-5 text-uppercase">
              {!isNumeric(parseInt(itemObj))
                ? itemObj === "customer" && param.view === "cabang"
                  ? param.view
                  : itemObj
                : data[itemObj]?.customer_name ||
                  data[itemObj]?.category_name ||
                  data[itemObj]?.product_name ||
                  data[itemObj]?.cara_bayar_name ||
                  data[itemObj]?.nama_cabang}
            </h3>
            {Array.isArray(data[itemObj]) ? (
              data[itemObj].map((item, idx) => (
                <div key={idx}>
                  {validateIfTable(item) ? (
                    <>
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
                        <div className=" text-capitalize">
                          <label className="form-label" htmlFor="">
                            Nama
                          </label>{" "}
                          :{" "}
                          {item.customer_name ||
                            item.category_name ||
                            item.product_name ||
                            item.cara_bayar_name ||
                            item.nama_cabang}
                        </div>
                      </div>

                      <Tables
                        useNotFound={false}
                        column={column.filter((filter) =>
                          param.view !== "cabang"
                            ? filter.title !== "Cabang"
                            : filter
                        )}
                        isPagination={false}
                        isSearch={false}
                        data={item?.listTransaksi?.map((itemTrans) => ({
                          ...itemTrans,
                          product: {
                            ...itemTrans.product,
                            product_name: itemTrans.product?.product_name ?? "",
                          },
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
                              <th
                                colSpan={column.length - 2}
                                className="text-center"
                              >
                                Total
                              </th>
                              <th>
                                Rp.{" "}
                                {MoneyFormatZero(
                                  item.listTransaksi?.reduce(
                                    (prev, curr) =>
                                      prev + parseInt(curr?.subtotal),
                                    0
                                  )
                                )}
                              </th>
                            </tr>
                          </tfoot>
                        }
                      />
                    </>
                  ) : null}
                </div>
              ))
            ) : (
              <div>
                {validateElseTable(itemObj) ? (
                  <>
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
                      <div className=" text-capitalize">
                        <label className="form-label" htmlFor="">
                          Selected Radio
                        </label>{" "}
                        : {param?.selected_radio}
                      </div>
                    </div>

                    <Tables
                      useNotFound={false}
                      column={column.filter((filter) =>
                        param.view !== "cabang"
                          ? filter.title !== "Cabang"
                          : filter
                      )}
                      isPagination={false}
                      isSearch={false}
                      data={data[itemObj].listTransaksi?.map((itemTrans) => ({
                        ...itemTrans,
                        product: {
                          ...itemTrans.product,
                          product_name: itemTrans.product?.product_name ?? "",
                        },
                        name:
                          data[itemObj].customer_name ||
                          data[itemObj].category_name ||
                          data[itemObj].productCode ||
                          data[itemObj].cara_bayar_name ||
                          data[itemObj].nama_cabang,
                        price: MoneyFormatZero(itemTrans.price),
                        subtotal: MoneyFormatZero(itemTrans.subtotal),
                      }))}
                      tfoot={
                        <tfoot>
                          <tr>
                            <th
                              colSpan={column.length - 2}
                              className="text-center"
                            >
                              Total
                            </th>
                            <th>
                              Rp.{" "}
                              {MoneyFormatZero(
                                data[itemObj].listTransaksi?.reduce(
                                  (prev, curr) =>
                                    prev + parseInt(curr?.subtotal),
                                  0
                                )
                              )}
                            </th>
                          </tr>
                        </tfoot>
                      }
                    />
                  </>
                ) : null}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PenjualanKasirPage;

const column = [
  {
    title: "No Faktur",
    key: "transaksi_info.no_faktur",
  },
  {
    title: "Nama",
    key: "name",
  },
  {
    title: "Cabang",
    key: "transaksi_info.cabang.nama_cabang",
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
    title: "Status",
    key: "transaksi_info.transaksi_status",
  },
  {
    title: "Subtotal",
    key: "subtotal",
  },
];
