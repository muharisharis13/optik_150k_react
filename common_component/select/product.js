import Select from "react-select/creatable";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import $ from "jquery";
import { useMutation, useQuery } from "react-query";
import { productAPI } from "../../API";
import { ModalProducts } from "../modal";
import { Loading } from "@utils";

const SelectedProduct = ({ useUUID = false }) => {
  const { setValue, control, register, handleSubmit } = useForm({
    defaultValues: {
      data: [
        {
          label: "indomie",
          value: "1",
        },
        {
          label: "indomie 2",
          value: "2",
        },
      ],
      param: {
        product_name: "",
        uom: "buah",
        capital_price: "",
        price: "",
        stock: "",
        min_stock: "",
        serial_number: "",
      },
    },
  });
  const { setValue: setValueContext } = useFormContext();

  const param = useWatch({
    name: "param",
    control,
  });

  const selectedProduct = useWatch({
    name: "selected.product",
  });
  const SelectedCategory = useWatch({
    name: "selected.category",
  });

  const search = useWatch({
    name: "param.product_name",
    control,
  });

  const handleOnchangeSelected = (e) => {
    const isNew = e?.__isNew__;

    console.log({ isNew });
    if (isNew) {
      $("#ModalProducts").modal("show");
    } else {
      setValueContext("selected.product", e);
    }
  };

  const hanledOnInputchange = (e) => {
    setValue("param.product_name", e);
    refetch();
  };

  const btnAddProduct = useMutation({
    mutationFn: ({ param }) =>
      productAPI.addProduct({
        body: {
          ...param,
          category_id: SelectedCategory?.value,
        },
      }),
    onSuccess: (onSuccess) => {
      console.log("berhasil", onSuccess);
      $("#ModalProducts").modal("hide");
      refetch();
    },
  });

  const {
    data: dataProduct2,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListProductSelect"],
    queryFn: () =>
      productAPI.getListProduct({
        query: {
          size: 100,
          column_name: "product_name",
          query: search,
        },
      }),
  });

  Loading(btnAddProduct.isLoading);

  return (
    <div>
      <Select
        isClearable
        placeholder="Select Product"
        value={selectedProduct}
        onChange={handleOnchangeSelected}
        options={dataProduct2?.result
          ?.filter((filter) => filter.price !== 0)
          .map((item) => ({
            value: useUUID ? item?.uuid : item.id,
            label: item.product_name,
          }))}
        onInputChange={hanledOnInputchange}
        isLoading={isLoading}
      />
      <ModalProducts
        param={param}
        register={register}
        submit={handleSubmit(btnAddProduct.mutate)}
      />
    </div>
  );
};

export default SelectedProduct;
