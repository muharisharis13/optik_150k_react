import { Tables } from "../../../../common_component";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { reportAPI } from "../../../../API";
import { Loading, MoneyFormatZero } from "@utils";

const BarangByCategory = () => {
  const parameter = queryString.parse(location.search);

  console.log(parameter);

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
    <div className="container align-items-center justify-content-center">
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
