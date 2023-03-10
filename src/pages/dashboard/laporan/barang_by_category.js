import { Tables } from "../../../../common_component";
import queryString from "query-string";
import { useQuery } from "react-query";
import { reportAPI } from "../../../../API";
import { Loading, MoneyFormatZero } from "@utils";

const BarangByCategory = () => {
  const parameter = queryString.parse(location.search);

  const { isLoading, data } = useQuery({
    queryKey: ["barang-by-category"],
    queryFn: () =>
      reportAPI.getProductByCategory({
        body: {
          categoryId: parameter?.category_id,
        },
      }),
  });

  console.log({ data });

  Loading(isLoading);
  return (
    <div className="container align-items-center justify-content-center mt-5">
      <h4 className="text-center text-uppercase">Barang By Category Report {parameter?.category_name}</h4>
      <Tables
        column={column}
        isPagination={false}
        isSearch={false}
        data={data?.data?.map((item) => ({
          ...item,
          price: MoneyFormatZero(item?.price),
        }))}
      />
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
