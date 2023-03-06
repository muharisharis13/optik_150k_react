import { Tables } from "../../../../common_component";
import queryString from "query-string";
import { useQuery } from "react-query";
import { reportAPI } from "../../../../API";
import { Loading, MoneyFormatZero } from "@utils";

const BarangByCategory = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["barang-all-category"],
    queryFn: () => reportAPI.getProductAllCategory(),
  });

  Loading(isLoading);
  return (
    <div className="container align-items-center justify-content-center">
      <h4 className="text-center text-uppercase">Barang All Category Report</h4>
      {data?.map((item, idx) => (
        <div className="mb-4" key={idx}>
          <label htmlFor="" className="form-label">
            {item?.category_name}
          </label>
          <Tables
            column={column}
            isPagination={false}
            isSearch={false}
            data={item?.listProduct?.map((item) => ({
              ...item,
              price: MoneyFormatZero(item?.price),
            }))}
          />
        </div>
      ))}
    </div>
  );
};

export default BarangByCategory;

const column = [
  {
    title: "Nama Barang",
    key: "product_name",
  },
  {
    title: "Satuan",
    key: "uom",
  },
  {
    title: "Harga Jual",
    key: "price",
  },
  {
    title: "Stock",
    key: "stock",
  },
];
