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

  const getObj = Object.keys(data ?? {});

  console.log({ data, getObj });

  return (
    <div className="container-fluid align-items-center justify-content-center">
      {Array.isArray(data) ? (
        <div className="mb-5">
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
                <div className=" text-capitalize">
                  <label className="form-label" htmlFor="">
                    {parameter.selected_radio}
                  </label>{" "}
                  :{" "}
                  {item.product_name ||
                    item.category_name ||
                    item.supplier_name}
                </div>
              </div>
              <div className="mb-5">
                <Tables
                  useNotFound={false}
                  column={column}
                  isPagination={false}
                  isSearch={false}
                  data={item?.listBeli?.map((item) => ({
                    ...item,
                    price: MoneyFormatZero(item?.price),
                    product: {
                      ...item.product,
                      product_name: item.product?.product_name ?? "-",
                    },
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        getObj
          .filter((filter) => {
            if (
              parameter.selected_radio === "supplierId" &&
              !parameter.supplierId
            ) {
              return filter === "supplier";
            } else if (
              parameter.selected_radio === "barangId" &&
              !parameter.productId
            ) {
              return filter === "product";
            } else {
              return filter;
            }
          })
          .map((itemObj) => (
            <div className="mb-5">
              <h4 className="text-center text-uppercase">
                Pembelian Report {itemObj}
              </h4>
              {data[itemObj]?.map((item, idx) => (
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
                    <div className=" text-capitalize">
                      <label className="form-label" htmlFor="">
                        {itemObj}
                      </label>{" "}
                      :{" "}
                      {item.product_name ||
                        item.category_name ||
                        item.supplier_name}
                    </div>
                  </div>
                  <div className="mb-5">
                    <Tables
                      useNotFound={false}
                      column={column}
                      isPagination={false}
                      isSearch={false}
                      data={item?.listBeli?.map((item) => ({
                        ...item,
                        price: MoneyFormatZero(item?.price),
                        product: {
                          ...item.product,
                          product_name: item.product?.product_name ?? "-",
                        },
                      }))}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
      )}
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
    title: "Supplier",
    key: "beli_info.supplier.supplier_name",
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
  {
    title: "Tanggal",
    key: "createdAt",
  },
];
